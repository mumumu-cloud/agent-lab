import {
  CATEGORY_COLORS,
  categoriesWithCounts,
  queryAssets,
} from "./sample-data.js";

const state = {
  search: "",
  category: "ALL",
  sort: "date",
  order: "desc",
  view: "grid",
  me: null,
  categories: [],
  colors: {},
  assets: [],
  donutMetric: "count", // "count" (N건) or "percent" (X%)
  selectedCategory: null, // clicked donut category shown in the summary panel
};

// Client-side prototype edits (admin). Sample data is embedded; edits/deletes
// are kept in-session only.
const overrides = new Map();
const deleted = new Set();

const el = (id) => document.getElementById(id);

// ---------------------------------------------------------------- helpers

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem("agentlab_user") || "null");
  } catch {
    return null;
  }
}

function formatSize(bytes) {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n >= 10 || i === 0 ? Math.round(n) : n.toFixed(1)} ${units[i]}`;
}

function formatDate(iso) {
  const d = new Date(iso);
  const p = (x) => String(x).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

function extOf(fileName) {
  const idx = fileName.lastIndexOf(".");
  return idx > -1 ? fileName.slice(idx + 1).toUpperCase() : "FILE";
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

// Self-contained, photo-like SVG thumbnail (no network needed — reliable on an
// internal/closed network). Each asset gets a stylized "scene" over its colors.
function thumbFor(asset) {
  const [c1, c2] = asset.colors || ["#6366f1", "#22d3ee"];
  const id = asset.id;
  const v = (asset.shape ?? 0) % 5;
  let scene = "";
  if (v === 0) {
    scene = `<circle cx="288" cy="66" r="30" fill="#fff" opacity="0.9"/>
      <path d="M0 205 Q90 160 180 200 T360 195 V270 H0Z" fill="#0b1020" opacity="0.20"/>
      <path d="M0 235 Q120 190 240 225 T360 220 V270 H0Z" fill="#0b1020" opacity="0.33"/>`;
  } else if (v === 1) {
    scene = `<circle cx="80" cy="90" r="46" fill="#fff" opacity="0.14"/>
      <circle cx="150" cy="150" r="26" fill="#fff" opacity="0.20"/>
      <circle cx="250" cy="80" r="60" fill="#fff" opacity="0.12"/>
      <circle cx="300" cy="180" r="34" fill="#fff" opacity="0.16"/>`;
  } else if (v === 2) {
    scene = `<polygon points="0,270 110,120 210,270" fill="#0b1020" opacity="0.22"/>
      <polygon points="150,270 250,140 360,270" fill="#0b1020" opacity="0.30"/>
      <circle cx="300" cy="70" r="26" fill="#fff" opacity="0.85"/>`;
  } else if (v === 3) {
    scene = `<path d="M0 150 Q90 120 180 150 T360 150 V270 H0Z" fill="#fff" opacity="0.10"/>
      <path d="M0 190 Q90 160 180 190 T360 190 V270 H0Z" fill="#fff" opacity="0.12"/>
      <path d="M0 230 Q90 200 180 230 T360 230 V270 H0Z" fill="#0b1020" opacity="0.18"/>`;
  } else {
    scene = `<circle cx="180" cy="135" r="96" fill="none" stroke="#fff" stroke-width="14" opacity="0.14"/>
      <circle cx="180" cy="135" r="58" fill="none" stroke="#fff" stroke-width="14" opacity="0.20"/>
      <circle cx="180" cy="135" r="24" fill="#fff" opacity="0.30"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="270" viewBox="0 0 360 270"><defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><radialGradient id="v${id}" cx="50%" cy="42%" r="75%"><stop offset="58%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.30"/></radialGradient></defs><rect width="360" height="270" fill="url(#g${id})"/>${scene}<rect width="360" height="270" fill="url(#v${id})"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function view(asset) {
  const o = overrides.get(asset.id);
  return o ? { ...asset, ...o } : asset;
}

function catColor(catId) {
  return state.colors[catId] || "#6366f1";
}

function showToast(message) {
  const t = el("toast");
  t.textContent = message;
  t.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("is-visible"), 2200);
}

// Floating tooltip used by the donut chart (segments + legend).
let _chartTooltip;
function chartTooltip() {
  if (!_chartTooltip) {
    _chartTooltip = document.createElement("div");
    _chartTooltip.className = "chart-tooltip";
    document.body.appendChild(_chartTooltip);
  }
  return _chartTooltip;
}
function showTooltip(text, x, y) {
  const t = chartTooltip();
  t.textContent = text;
  t.style.left = `${x}px`;
  t.style.top = `${y}px`;
  t.classList.add("is-visible");
}
function hideTooltip() {
  if (_chartTooltip) _chartTooltip.classList.remove("is-visible");
}

// ---------------------------------------------------------------- rendering

function renderCategories() {
  const list = el("category-list");
  list.replaceChildren();
  for (const c of state.categories) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "category-item" + (c.id === state.category ? " is-active" : "");
    btn.innerHTML =
      `<span class="category-item__dot" style="background:${c.id === "ALL" ? "var(--color-text-subtle)" : catColor(c.id)}"></span>` +
      `<span class="category-item__label">${escapeHtml(c.label)}</span>` +
      `<span class="category-item__count">${c.count}</span>`;
    btn.addEventListener("click", () => {
      state.category = c.id;
      renderCategories();
      closeSidebar();
      const c2 = state.categories.find((x) => x.id === c.id);
      el("page-subtitle").textContent =
        c.id === "ALL" ? "전체 작업물을 이미지 갤러리로 살펴보세요." : `${c2.label} · ${c2.description}`;
      loadAssets();
    });
    li.appendChild(btn);
    list.appendChild(li);
  }
}

function renderDonut() {
  const real = state.categories.filter((c) => c.id !== "ALL");
  const total = real.reduce((s, c) => s + c.count, 0);
  const svg = el("donut-chart");
  svg.replaceChildren();

  const ns = "http://www.w3.org/2000/svg";
  const R = 15.915;
  const STROKE = 4.5;
  const GAP = 1.4; // small gap between segments for a clean, separated look

  const bg = document.createElementNS(ns, "circle");
  bg.setAttribute("cx", "21");
  bg.setAttribute("cy", "21");
  bg.setAttribute("r", String(R));
  bg.setAttribute("fill", "none");
  bg.setAttribute("stroke", "var(--color-surface-2)");
  bg.setAttribute("stroke-width", String(STROKE));
  svg.appendChild(bg);

  const segByCat = {};
  const hitAreas = [];
  let offset = 25; // start at 12 o'clock
  for (const c of real) {
    if (!c.count) continue;
    const pct = (c.count / total) * 100;
    const dash = Math.max(pct - GAP, 0.5); // leave a gap; keep tiny slices visible

    const seg = document.createElementNS(ns, "circle");
    seg.setAttribute("cx", "21");
    seg.setAttribute("cy", "21");
    seg.setAttribute("r", String(R));
    seg.setAttribute("fill", "none");
    seg.setAttribute("stroke", catColor(c.id));
    seg.setAttribute("stroke-width", String(STROKE));
    seg.setAttribute("stroke-linecap", "round");
    seg.setAttribute("stroke-dasharray", `${dash} ${100 - dash}`);
    seg.setAttribute("stroke-dashoffset", String(offset));
    seg.style.transition = "stroke-width .15s ease, opacity .15s ease";
    seg.style.pointerEvents = "none";
    svg.appendChild(seg);
    segByCat[c.id] = { seg, pct };

    // Wider transparent hit area so even thin slices are easy to hover.
    const hit = document.createElementNS(ns, "circle");
    hit.setAttribute("cx", "21");
    hit.setAttribute("cy", "21");
    hit.setAttribute("r", String(R));
    hit.setAttribute("fill", "none");
    hit.setAttribute("stroke", "transparent");
    hit.setAttribute("stroke-width", "9");
    hit.setAttribute("stroke-dasharray", `${dash} ${100 - dash}`);
    hit.setAttribute("stroke-dashoffset", String(offset));
    hit.setAttribute("pointer-events", "stroke");
    hit.style.cursor = "pointer";
    hit.addEventListener("mouseenter", () => setActive(c.id));
    hit.addEventListener("mousemove", (e) =>
      showTooltip(`${c.label} · ${Math.round(pct)}%`, e.clientX, e.clientY),
    );
    hit.addEventListener("mouseleave", () => {
      setActive(null);
      hideTooltip();
    });
    hit.addEventListener("click", () => selectCategory(c.id));
    hitAreas.push(hit);

    offset -= pct;
  }

  // Center text is an HTML overlay for reliable sizing.
  const value = el("donut-value");
  const label = el("donut-label");
  value.textContent = String(total);
  label.textContent = "작업물";

  // Hit areas on top so hovering any slice (even tiny ones) is reliable.
  for (const hit of hitAreas) svg.appendChild(hit);

  const legend = el("donut-legend");
  legend.replaceChildren();
  const liByCat = {};
  for (const c of real) {
    const li = document.createElement("li");
    li.className = "donut__legend-item";
    li.dataset.cat = c.id;
    if (c.id === state.selectedCategory) li.classList.add("is-selected");
    const pct = total ? Math.round((c.count / total) * 100) : 0;
    const metricText = state.donutMetric === "percent" ? `${pct}%` : `${c.count}건`;
    li.innerHTML =
      `<span class="donut__legend-dot" style="background:${catColor(c.id)}"></span>` +
      `<span class="donut__legend-label">${escapeHtml(c.label)}</span>` +
      `<span class="donut__legend-count">${metricText}</span>`;
    li.addEventListener("mouseenter", () => setActive(c.id));
    li.addEventListener("mousemove", (e) =>
      showTooltip(`${c.label} · ${pct}%`, e.clientX, e.clientY),
    );
    li.addEventListener("mouseleave", () => {
      setActive(null);
      hideTooltip();
    });
    li.addEventListener("click", () => selectCategory(c.id));
    legend.appendChild(li);
    liByCat[c.id] = li;
  }

  // Emphasize one category (segment + legend) and show its % in the center.
  function setActive(id) {
    for (const [cid, { seg }] of Object.entries(segByCat)) {
      seg.setAttribute("stroke-width", cid === id ? String(STROKE + 1.5) : String(STROKE));
      seg.style.opacity = id === null || cid === id ? "1" : "0.28";
    }
    for (const [cid, li] of Object.entries(liByCat)) {
      li.classList.toggle("is-active", cid === id);
    }
    if (id && segByCat[id]) {
      value.textContent = `${Math.round(segByCat[id].pct)}%`;
      label.textContent = state.categories.find((c) => c.id === id)?.label || "";
    } else {
      value.textContent = String(total);
      label.textContent = "작업물";
    }
  }
}

function statsGrid(items) {
  const grid = document.createElement("div");
  grid.className = "summary";
  for (const it of items) {
    const div = document.createElement("div");
    div.className = "summary__item";
    div.innerHTML = `<div class="summary__value">${escapeHtml(String(it.value))}</div><div class="summary__label">${escapeHtml(it.label)}</div>`;
    grid.appendChild(div);
  }
  return grid;
}

function renderSummary() {
  const body = el("summary-body");
  const title = el("summary-title");
  const back = el("summary-back");
  body.replaceChildren();

  const real = state.categories.filter((c) => c.id !== "ALL");
  const total = state.categories.find((c) => c.id === "ALL")?.count || 0;

  if (!state.selectedCategory) {
    // Overall summary
    title.textContent = "요약";
    back.hidden = true;
    const topCat = real.slice().sort((a, b) => b.count - a.count)[0];
    body.appendChild(
      statsGrid([
        { value: total, label: "전체 작업물" },
        { value: real.length, label: "카테고리 수" },
        { value: topCat ? topCat.label : "—", label: "최다 카테고리" },
        { value: state.me?.permissions?.label || "—", label: "내 권한" },
      ]),
    );
    const hint = document.createElement("p");
    hint.className = "summary__hint";
    hint.textContent = "왼쪽 그래프의 카테고리를 클릭하면 관련 파일을 볼 수 있어요.";
    body.appendChild(hint);
    return;
  }

  // Category detail
  const cat = state.categories.find((c) => c.id === state.selectedCategory);
  const files = queryAssets({ category: state.selectedCategory, sort: "date", order: "desc" });
  const pct = total ? Math.round((files.length / total) * 100) : 0;
  const totalBytes = files.reduce((s, f) => s + f.sizeBytes, 0);

  title.textContent = `요약 · ${cat ? cat.label : ""}`;
  back.hidden = false;

  body.appendChild(
    statsGrid([
      { value: `${files.length}건`, label: "작업물 수" },
      { value: `${pct}%`, label: "전체 대비 비율" },
      { value: formatSize(totalBytes), label: "총 용량" },
      { value: cat ? cat.description : "—", label: "설명" },
    ]),
  );

  const listTitle = document.createElement("div");
  listTitle.className = "summary-detail__section-title";
  listTitle.textContent = `관련 파일 (${files.length})`;
  body.appendChild(listTitle);

  const list = document.createElement("ul");
  list.className = "file-list";
  for (const f of files) {
    const li = document.createElement("li");
    li.className = "file-list__item";
    li.innerHTML =
      `<span class="file-list__badge" style="background:${catColor(f.category)}">${escapeHtml(extOf(f.fileName))}</span>` +
      `<span class="file-list__name">${escapeHtml(f.fileName)}</span>` +
      `<span class="file-list__size">${formatSize(f.sizeBytes)}</span>`;
    list.appendChild(li);
  }
  body.appendChild(list);
}

function selectCategory(id) {
  state.selectedCategory = id;
  renderSummary();
  document.querySelectorAll("#donut-legend .donut__legend-item").forEach((li) => {
    li.classList.toggle("is-selected", li.dataset.cat === id);
  });
}

function renderAssets() {
  const gallery = el("gallery");
  gallery.className = "gallery" + (state.view === "list" ? " is-list" : "");
  gallery.replaceChildren();

  const perms = state.me?.permissions || {};
  const visible = state.assets.filter((a) => !deleted.has(a.id)).map(view);

  el("result-count").textContent = `${visible.length}개의 작업물`;
  el("empty-state").hidden = visible.length !== 0;

  for (const a of visible) {
    const card = document.createElement("article");
    card.className = "asset-card";

    const actions = [];
    if (perms.download) {
      actions.push(`<button class="button button--sm" data-action="download" data-id="${a.id}">다운로드</button>`);
    }
    if (perms.edit) {
      actions.push(`<button class="button button--sm" data-action="edit" data-id="${a.id}">편집</button>`);
      actions.push(`<button class="button button--sm" data-action="delete" data-id="${a.id}">삭제</button>`);
    }

    card.innerHTML =
      `<div class="asset-card__thumb">
        <img class="asset-card__img" src="${thumbFor(a)}" alt="${escapeHtml(a.fileName)} 미리보기" loading="lazy" />
        <span class="asset-card__badge">${escapeHtml(extOf(a.fileName))}</span>
        <span class="asset-card__cat" style="background:${catColor(a.category)}">${escapeHtml(a.category)}</span>
      </div>
      <div class="asset-card__body">
        <span class="asset-card__name">${escapeHtml(a.fileName)}</span>
        <span class="asset-card__project">${escapeHtml(a.project)}</span>
        <span class="asset-card__meta">
          <span>${escapeHtml(extOf(a.fileName))}</span>
          <span>·</span>
          <span>${formatSize(a.sizeBytes)}</span>
          <span>·</span>
          <span>${formatDate(a.createdAt)}</span>
        </span>
      </div>` +
      (actions.length ? `<div class="asset-card__actions">${actions.join("")}</div>` : "");

    gallery.appendChild(card);
  }
}

// ---------------------------------------------------------------- data

function loadAssets() {
  state.assets = queryAssets({
    search: state.search,
    category: state.category,
    sort: state.sort,
    order: state.order,
  });
  renderAssets();
}

function bootstrap() {
  state.me = getCurrentUser();
  if (!state.me) {
    window.location.href = "/login";
    return;
  }
  state.categories = categoriesWithCounts();
  state.colors = CATEGORY_COLORS;

  el("user-name").textContent = state.me.name;
  el("user-role").textContent = state.me.permissions.label + " 권한";
  el("user-avatar").textContent = state.me.name.slice(0, 1);

  const editCat = el("edit-category");
  editCat.replaceChildren();
  for (const c of state.categories.filter((c) => c.id !== "ALL")) {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.label;
    editCat.appendChild(opt);
  }

  renderCategories();
  renderDonut();
  renderSummary();
  loadAssets();
}

// ---------------------------------------------------------------- events

let searchTimer;
el("search-input").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  const val = e.target.value;
  searchTimer = setTimeout(() => {
    state.search = val;
    loadAssets();
  }, 200);
});

el("sort-select").addEventListener("change", (e) => {
  state.sort = e.target.value;
  loadAssets();
});
el("order-select").addEventListener("change", (e) => {
  state.order = e.target.value;
  loadAssets();
});

// Summary "back to overall" button
el("summary-back").addEventListener("click", () => {
  state.selectedCategory = null;
  renderSummary();
  document
    .querySelectorAll("#donut-legend .donut__legend-item")
    .forEach((li) => li.classList.remove("is-selected"));
});

// Donut legend metric toggle (갯수 / %)
document.querySelectorAll("#donut-metric .segmented__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.donutMetric = btn.dataset.metric;
    document
      .querySelectorAll("#donut-metric .segmented__btn")
      .forEach((b) => b.classList.toggle("is-active", b === btn));
    renderDonut();
  });
});

el("view-grid").addEventListener("click", () => {
  state.view = "grid";
  el("view-grid").classList.add("is-active");
  el("view-list").classList.remove("is-active");
  renderAssets();
});
el("view-list").addEventListener("click", () => {
  state.view = "list";
  el("view-list").classList.add("is-active");
  el("view-grid").classList.remove("is-active");
  renderAssets();
});

function syncThemeIcon() {
  const isDark = document.documentElement.classList.contains("dark");
  el("theme-icon").textContent = isDark ? "☀️" : "🌙";
}
el("theme-toggle").addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  syncThemeIcon();
});
syncThemeIcon();

el("logout-btn").addEventListener("click", () => {
  sessionStorage.removeItem("agentlab_user");
  window.location.href = "/login";
});

function openSidebar() {
  el("sidebar").classList.add("is-open");
  el("scrim").hidden = false;
}
function closeSidebar() {
  el("sidebar").classList.remove("is-open");
  el("scrim").hidden = true;
}
el("menu-btn").addEventListener("click", openSidebar);
el("scrim").addEventListener("click", closeSidebar);

let editingId = null;
el("gallery").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  const asset = view(state.assets.find((a) => a.id === id));
  if (!asset) return;

  if (action === "download") {
    const payload =
      `# ${asset.fileName}\n` +
      `project: ${asset.project}\n` +
      `category: ${asset.category}\n` +
      `size: ${asset.sizeBytes} bytes (sample)\n` +
      `NOTE: 샘플 프로토타입 데이터이며 실제 파일이 아닙니다.\n`;
    const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${asset.fileName}.sample.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(`다운로드 시작: ${asset.fileName}`);
  } else if (action === "edit") {
    editingId = id;
    el("edit-name").value = asset.fileName;
    el("edit-category").value = asset.category;
    el("edit-modal").hidden = false;
  } else if (action === "delete") {
    deleted.add(id);
    renderAssets();
    showToast("작업물을 삭제했습니다. (프로토타입)");
  }
});

el("edit-cancel").addEventListener("click", () => {
  el("edit-modal").hidden = true;
  editingId = null;
});
el("edit-save").addEventListener("click", () => {
  if (!editingId) return;
  overrides.set(editingId, {
    fileName: el("edit-name").value.trim() || "이름없음",
    category: el("edit-category").value,
  });
  el("edit-modal").hidden = true;
  editingId = null;
  renderAssets();
  showToast("변경 사항을 저장했습니다. (프로토타입)");
});
el("edit-modal").addEventListener("click", (e) => {
  if (e.target === el("edit-modal")) {
    el("edit-modal").hidden = true;
    editingId = null;
  }
});

bootstrap();
