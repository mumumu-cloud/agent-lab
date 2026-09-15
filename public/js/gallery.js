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
};

// Client-side prototype edits (admin). Server data is static sample data.
const overrides = new Map();
const deleted = new Set();

const el = (id) => document.getElementById(id);

// ---------------------------------------------------------------- helpers

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

// Generate an abstract SVG thumbnail (data URI) from an asset's colors/shape.
function thumbFor(asset) {
  const [c1, c2] = asset.colors || ["#6366f1", "#22d3ee"];
  const id = asset.id;
  let shapes = "";
  switch (asset.shape) {
    case 1: // grid
      for (let y = 0; y < 4; y++)
        for (let x = 0; x < 6; x++)
          shapes += `<rect x="${x * 60}" y="${y * 60}" width="52" height="52" rx="8" fill="#fff" opacity="${0.08 + ((x + y) % 3) * 0.06}"/>`;
      break;
    case 2: // concentric circles
      shapes = `<circle cx="180" cy="135" r="110" fill="none" stroke="#fff" stroke-width="10" opacity="0.18"/>
        <circle cx="180" cy="135" r="72" fill="none" stroke="#fff" stroke-width="10" opacity="0.28"/>
        <circle cx="180" cy="135" r="34" fill="#fff" opacity="0.4"/>`;
      break;
    case 3: // diagonal stripes
      for (let i = -2; i < 10; i++)
        shapes += `<rect x="${i * 44}" y="-40" width="20" height="360" fill="#fff" opacity="0.12" transform="rotate(20 180 135)"/>`;
      break;
    case 4: // scattered dots
      for (let i = 0; i < 14; i++) {
        const cx = (i * 97) % 340 + 12;
        const cy = ((i * 53) % 240) + 20;
        shapes += `<circle cx="${cx}" cy="${cy}" r="${6 + (i % 4) * 5}" fill="#fff" opacity="0.16"/>`;
      }
      break;
    default: // blobs
      shapes = `<circle cx="110" cy="90" r="90" fill="#fff" opacity="0.16"/>
        <circle cx="250" cy="180" r="120" fill="#fff" opacity="0.12"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="270" viewBox="0 0 360 270">
    <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect width="360" height="270" fill="url(#g${id})"/>${shapes}
  </svg>`;
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
  const bg = document.createElementNS(ns, "circle");
  bg.setAttribute("cx", "21");
  bg.setAttribute("cy", "21");
  bg.setAttribute("r", "15.915");
  bg.setAttribute("fill", "none");
  bg.setAttribute("stroke", "var(--color-surface-2)");
  bg.setAttribute("stroke-width", "5");
  svg.appendChild(bg);

  let offset = 25; // start at top
  for (const c of real) {
    if (!c.count) continue;
    const pct = (c.count / total) * 100;
    const seg = document.createElementNS(ns, "circle");
    seg.setAttribute("cx", "21");
    seg.setAttribute("cy", "21");
    seg.setAttribute("r", "15.915");
    seg.setAttribute("fill", "none");
    seg.setAttribute("stroke", catColor(c.id));
    seg.setAttribute("stroke-width", "5");
    seg.setAttribute("stroke-dasharray", `${pct} ${100 - pct}`);
    seg.setAttribute("stroke-dashoffset", String(offset));
    seg.style.transition = "stroke-dasharray .4s ease";
    svg.appendChild(seg);
    offset -= pct;
  }

  const value = document.createElementNS(ns, "text");
  value.setAttribute("x", "21");
  value.setAttribute("y", "20");
  value.setAttribute("text-anchor", "middle");
  value.setAttribute("class", "donut__center-value");
  value.textContent = String(total);
  svg.appendChild(value);

  const label = document.createElementNS(ns, "text");
  label.setAttribute("x", "21");
  label.setAttribute("y", "26");
  label.setAttribute("text-anchor", "middle");
  label.setAttribute("class", "donut__center-label");
  label.textContent = "작업물";
  svg.appendChild(label);

  const legend = el("donut-legend");
  legend.replaceChildren();
  for (const c of real) {
    const li = document.createElement("li");
    li.className = "donut__legend-item";
    const pct = total ? Math.round((c.count / total) * 100) : 0;
    li.innerHTML =
      `<span class="donut__legend-dot" style="background:${catColor(c.id)}"></span>` +
      `<span class="donut__legend-label">${escapeHtml(c.label)}</span>` +
      `<span class="donut__legend-count">${c.count} (${pct}%)</span>`;
    legend.appendChild(li);
  }
}

function renderSummary() {
  const real = state.categories.filter((c) => c.id !== "ALL");
  const total = state.categories.find((c) => c.id === "ALL")?.count || 0;
  const topCat = real.slice().sort((a, b) => b.count - a.count)[0];
  const items = [
    { value: total, label: "전체 작업물" },
    { value: real.length, label: "카테고리 수" },
    { value: topCat ? topCat.label : "—", label: "최다 카테고리" },
    { value: state.me?.permissions?.label || "—", label: "내 권한" },
  ];
  const box = el("summary");
  box.replaceChildren();
  for (const it of items) {
    const div = document.createElement("div");
    div.className = "summary__item";
    div.innerHTML = `<div class="summary__value">${escapeHtml(String(it.value))}</div><div class="summary__label">${escapeHtml(it.label)}</div>`;
    box.appendChild(div);
  }
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
        <img src="${thumbFor(a)}" alt="${escapeHtml(a.fileName)} 미리보기" loading="lazy" />
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

async function loadAssets() {
  const params = new URLSearchParams({
    search: state.search,
    category: state.category,
    sort: state.sort,
    order: state.order,
  });
  const res = await fetch(`/api/assets?${params.toString()}`);
  if (res.status === 401) {
    window.location.href = "/login";
    return;
  }
  const data = await res.json();
  state.assets = data.assets || [];
  renderAssets();
}

async function bootstrap() {
  const meRes = await fetch("/api/me");
  if (meRes.status === 401) {
    window.location.href = "/login";
    return;
  }
  state.me = (await meRes.json()).user;

  const catRes = await fetch("/api/categories");
  const catData = await catRes.json();
  state.categories = catData.categories || [];
  state.colors = catData.colors || {};

  // Header user info
  el("user-name").textContent = state.me.name;
  el("user-role").textContent = state.me.permissions.label + " 권한";
  el("user-avatar").textContent = state.me.name.slice(0, 1);

  // Edit modal category options
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
  await loadAssets();
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

// Theme toggle
function syncThemeIcon() {
  const theme = document.documentElement.getAttribute("data-theme");
  el("theme-icon").textContent = theme === "dark" ? "☀️" : "🌙";
}
el("theme-toggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  syncThemeIcon();
});
syncThemeIcon();

// Logout
el("logout-btn").addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/login";
});

// Mobile sidebar
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

// Card actions (download / edit / delete) via delegation
let editingId = null;
el("gallery").addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  const asset = view(state.assets.find((a) => a.id === id));
  if (!asset) return;

  if (action === "download") {
    const res = await fetch(`/api/assets/${id}/download`);
    if (!res.ok) {
      showToast("다운로드 권한이 없습니다.");
      return;
    }
    const blob = await res.blob();
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
