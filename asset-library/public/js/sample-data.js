/**
 * Client-side sample data + helpers for the design asset library prototype.
 *
 * This module is the single source of truth for the (static) prototype: it is
 * imported by the browser (login.js, gallery.js) and by the Node test runner.
 * It has NO Node/browser-only dependencies, so it works in both. All data is
 * fake sample data — there are no real files or real credentials here.
 */

export const CATEGORIES = [
  { id: "ALL", label: "ALL", description: "전체 작업물" },
  { id: "DFAS", label: "DFAS", description: "DFAS 프로젝트" },
  { id: "MCQ", label: "MCQ", description: "MCQ 프로젝트" },
  { id: "GM", label: "GM", description: "GM 프로젝트" },
  { id: "Homepage", label: "Homepage", description: "홈페이지" },
  { id: "인쇄물", label: "인쇄물", description: "브로슈어 / 백월" },
  { id: "콘텐츠", label: "콘텐츠", description: "블로그 / 유튜브" },
  { id: "기타", label: "기타", description: "기타 작업물" },
];

/** Category id -> accent color (UROCK Design System palette). */
export const CATEGORY_COLORS = {
  DFAS: "#628cf5",
  MCQ: "#8246af",
  GM: "#ffc60a",
  Homepage: "#11bcc7",
  인쇄물: "#4663ae",
  콘텐츠: "#ee4c54",
  기타: "#93b0f8",
};

/** Permission matrix for the three access levels. */
export const PERMISSIONS = {
  viewer: { view: true, download: false, edit: false, label: "보기" },
  downloader: { view: true, download: true, edit: false, label: "다운로드" },
  admin: { view: true, download: true, edit: true, label: "관리자" },
};

/** Sample-only accounts (fake demo credentials, not real secrets). */
export const USERS = [
  { id: "u_viewer", username: "viewer", password: "viewer123", name: "김보기", team: "브랜드디자인팀", role: "viewer" },
  { id: "u_download", username: "download", password: "download123", name: "이다운", team: "콘텐츠제작팀", role: "downloader" },
  { id: "u_admin", username: "admin", password: "admin123", name: "박관리", team: "디자인애셋운영", role: "admin" },
];

function makeAsset(i, fileName, project, category, sizeBytes, createdAt, colors, shape, dims) {
  return {
    id: `asset_${String(i).padStart(3, "0")}`,
    fileName,
    project,
    category,
    sizeBytes,
    createdAt,
    colors,
    shape,
    width: dims[0],
    height: dims[1],
  };
}

const raw = [
  ["DFAS_메인_비주얼_v3.png", "DFAS 리브랜딩", "DFAS", 4820000, "2026-08-21", ["#6366f1", "#22d3ee"], 0, [1920, 1080]],
  ["DFAS_아이콘_세트.svg", "DFAS 리브랜딩", "DFAS", 184000, "2026-08-19", ["#6366f1", "#a855f7"], 2, [800, 800]],
  ["DFAS_배너_1200x628.jpg", "DFAS 캠페인", "DFAS", 640000, "2026-07-30", ["#4f46e5", "#06b6d4"], 3, [1200, 628]],
  ["DFAS_키비주얼_원본.psd", "DFAS 리브랜딩", "DFAS", 128500000, "2026-08-05", ["#4338ca", "#0ea5e9"], 1, [3000, 2000]],
  ["MCQ_포스터_A2.pdf", "MCQ 런칭", "MCQ", 9200000, "2026-08-12", ["#ec4899", "#f472b6"], 4, [1240, 1754]],
  ["MCQ_로고_가로형.ai", "MCQ 브랜딩", "MCQ", 2600000, "2026-06-28", ["#db2777", "#fb7185"], 2, [1600, 600]],
  ["MCQ_인스타_카드_01.png", "MCQ SNS", "MCQ", 780000, "2026-08-25", ["#ec4899", "#f59e0b"], 0, [1080, 1080]],
  ["MCQ_모션_썸네일.jpg", "MCQ 영상", "MCQ", 540000, "2026-08-01", ["#be185d", "#f472b6"], 3, [1280, 720]],
  ["GM_대시보드_UI_시안.fig", "GM 웹서비스", "GM", 15800000, "2026-08-18", ["#f59e0b", "#fbbf24"], 1, [2400, 1600]],
  ["GM_아이콘팩.svg", "GM 웹서비스", "GM", 96000, "2026-07-14", ["#d97706", "#fcd34d"], 2, [512, 512]],
  ["GM_배경_패턴.png", "GM 브랜딩", "GM", 1320000, "2026-08-09", ["#f59e0b", "#ef4444"], 4, [1600, 1600]],
  ["Homepage_히어로_섹션.png", "공식 홈페이지", "Homepage", 3600000, "2026-08-27", ["#10b981", "#34d399"], 0, [1920, 900]],
  ["Homepage_반응형_목업.jpg", "공식 홈페이지", "Homepage", 2100000, "2026-08-15", ["#059669", "#6ee7b7"], 3, [1600, 1000]],
  ["Homepage_푸터_컴포넌트.fig", "공식 홈페이지", "Homepage", 4200000, "2026-07-22", ["#10b981", "#06b6d4"], 1, [1440, 400]],
  ["Homepage_OG_이미지.png", "공식 홈페이지", "Homepage", 410000, "2026-08-03", ["#0d9488", "#34d399"], 2, [1200, 630]],
  ["브로슈어_3단접지_내지.pdf", "회사소개 브로슈어", "인쇄물", 22400000, "2026-08-11", ["#3b82f6", "#60a5fa"], 4, [2480, 3508]],
  ["백월_전시부스_5x3.ai", "박람회 백월", "인쇄물", 68000000, "2026-07-19", ["#2563eb", "#93c5fd"], 1, [5000, 3000]],
  ["리플릿_양면_시안.pdf", "제품 리플릿", "인쇄물", 8600000, "2026-08-22", ["#1d4ed8", "#60a5fa"], 3, [1748, 2480]],
  ["명함_템플릿.ai", "사내 명함", "인쇄물", 1400000, "2026-06-30", ["#3b82f6", "#38bdf8"], 2, [1004, 650]],
  ["블로그_썸네일_08월.png", "블로그 콘텐츠", "콘텐츠", 720000, "2026-08-26", ["#ef4444", "#f87171"], 0, [1200, 630]],
  ["유튜브_인트로_모션.mp4", "유튜브 채널", "콘텐츠", 48500000, "2026-08-14", ["#dc2626", "#fb7185"], 3, [1920, 1080]],
  ["유튜브_썸네일_3화.jpg", "유튜브 채널", "콘텐츠", 610000, "2026-08-20", ["#ef4444", "#f59e0b"], 4, [1280, 720]],
  ["블로그_인포_카드.png", "블로그 콘텐츠", "콘텐츠", 900000, "2026-07-27", ["#b91c1c", "#f87171"], 2, [1080, 1350]],
  ["콘텐츠_배너_모음.zip", "콘텐츠 아카이브", "콘텐츠", 132000000, "2026-08-07", ["#dc2626", "#f472b6"], 1, [0, 0]],
  ["사내행사_포스터.jpg", "워크숍 2026", "기타", 3100000, "2026-08-16", ["#8b5cf6", "#c4b5fd"], 0, [1240, 1754]],
  ["템플릿_PPT_표지.pptx", "사내 템플릿", "기타", 5400000, "2026-07-10", ["#7c3aed", "#a78bfa"], 1, [1280, 720]],
  ["이모지_스티커팩.png", "사내 커뮤니케이션", "기타", 340000, "2026-08-24", ["#8b5cf6", "#f0abfc"], 2, [1024, 1024]],
  ["가이드라인_표지.pdf", "브랜드 가이드", "기타", 6800000, "2026-06-25", ["#6d28d9", "#c4b5fd"], 4, [1748, 2480]],
  ["DFAS_소개영상_v1.mp4", "DFAS 캠페인", "DFAS", 52000000, "2026-08-28", ["#4f46e5", "#22d3ee"], 3, [1920, 1080]],
  ["DFAS_리플릿_시안.pdf", "DFAS 캠페인", "DFAS", 5400000, "2026-08-02", ["#6366f1", "#0ea5e9"], 4, [1748, 2480]],
  ["DFAS_인스타_카드_02.png", "DFAS SNS", "DFAS", 690000, "2026-08-24", ["#4338ca", "#22d3ee"], 0, [1080, 1080]],
  ["MCQ_배너_모바일.png", "MCQ SNS", "MCQ", 420000, "2026-08-27", ["#ec4899", "#f59e0b"], 1, [750, 1334]],
  ["MCQ_키비주얼.psd", "MCQ 브랜딩", "MCQ", 96000000, "2026-08-06", ["#db2777", "#f472b6"], 1, [3000, 2000]],
  ["MCQ_유튜브_썸네일.jpg", "MCQ 영상", "MCQ", 560000, "2026-08-22", ["#be185d", "#fb7185"], 4, [1280, 720]],
  ["GM_로고_세로형.ai", "GM 브랜딩", "GM", 2200000, "2026-07-30", ["#f59e0b", "#fbbf24"], 2, [600, 900]],
  ["GM_배너_웹.png", "GM 웹서비스", "GM", 880000, "2026-08-19", ["#d97706", "#fbbf24"], 0, [1600, 600]],
  ["GM_소개서.pdf", "GM 웹서비스", "GM", 7200000, "2026-08-08", ["#f59e0b", "#fcd34d"], 4, [1748, 2480]],
  ["GM_아이콘_추가.svg", "GM 웹서비스", "GM", 120000, "2026-08-21", ["#d97706", "#fcd34d"], 2, [512, 512]],
  ["Homepage_모바일_메뉴.fig", "공식 홈페이지", "Homepage", 3100000, "2026-08-25", ["#10b981", "#06b6d4"], 1, [390, 844]],
  ["Homepage_배너_이벤트.png", "공식 홈페이지", "Homepage", 1200000, "2026-08-18", ["#059669", "#34d399"], 0, [1920, 600]],
  ["Homepage_아이콘팩.svg", "공식 홈페이지", "Homepage", 88000, "2026-07-28", ["#0d9488", "#6ee7b7"], 2, [512, 512]],
  ["포스터_A1_시안.pdf", "전시 포스터", "인쇄물", 18500000, "2026-08-23", ["#3b82f6", "#60a5fa"], 4, [2384, 3370]],
  ["배너_거치대_시안.ai", "박람회 배너", "인쇄물", 9400000, "2026-08-04", ["#2563eb", "#93c5fd"], 1, [900, 2000]],
  ["봉투_템플릿.ai", "사내 봉투", "인쇄물", 760000, "2026-07-12", ["#1d4ed8", "#38bdf8"], 2, [324, 229]],
  ["블로그_썸네일_09월.png", "블로그 콘텐츠", "콘텐츠", 760000, "2026-09-01", ["#ef4444", "#f87171"], 0, [1200, 630]],
  ["유튜브_쇼츠_01.mp4", "유튜브 채널", "콘텐츠", 38000000, "2026-08-29", ["#dc2626", "#fb7185"], 3, [1080, 1920]],
  ["블로그_배너_시리즈.png", "블로그 콘텐츠", "콘텐츠", 980000, "2026-08-17", ["#b91c1c", "#f59e0b"], 1, [1200, 400]],
  ["사내_뉴스레터_템플릿.psd", "사내 커뮤니케이션", "기타", 14000000, "2026-08-13", ["#8b5cf6", "#c4b5fd"], 1, [1200, 1800]],
  ["행사_배너_시안.png", "워크숍 2026", "기타", 1500000, "2026-08-19", ["#7c3aed", "#a78bfa"], 0, [1600, 600]],
  ["명패_템플릿.ai", "사내 행사", "기타", 540000, "2026-07-15", ["#6d28d9", "#c4b5fd"], 2, [900, 300]],
];

export const ASSETS = raw.map((r, i) => makeAsset(i + 1, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]));

export function fileExtension(fileName) {
  const idx = fileName.lastIndexOf(".");
  return idx > -1 ? fileName.slice(idx + 1).toLowerCase() : "";
}

export function queryAssets({ search = "", category = "ALL", sort = "date", order = "desc" } = {}) {
  const term = String(search).trim().toLowerCase();
  let list = ASSETS.slice();

  if (category && category !== "ALL") {
    list = list.filter((a) => a.category === category);
  }
  if (term) {
    list = list.filter(
      (a) =>
        a.fileName.toLowerCase().includes(term) ||
        a.project.toLowerCase().includes(term),
    );
  }

  const dir = order === "asc" ? 1 : -1;
  list.sort((a, b) => {
    let cmp = 0;
    if (sort === "name") cmp = a.fileName.localeCompare(b.fileName, "ko");
    else if (sort === "size") cmp = a.sizeBytes - b.sizeBytes;
    else cmp = new Date(a.createdAt) - new Date(b.createdAt);
    return cmp * dir;
  });

  return list;
}

export function categoryCounts() {
  const counts = {};
  for (const c of CATEGORIES) {
    if (c.id === "ALL") continue;
    counts[c.id] = 0;
  }
  for (const a of ASSETS) {
    if (a.category in counts) counts[a.category] += 1;
  }
  return counts;
}

export function categoriesWithCounts() {
  const counts = categoryCounts();
  return CATEGORIES.map((c) => ({
    ...c,
    color: CATEGORY_COLORS[c.id] || null,
    count: c.id === "ALL" ? ASSETS.length : counts[c.id] || 0,
  }));
}

export function getPermissions(role) {
  return PERMISSIONS[role] || PERMISSIONS.viewer;
}

export function authenticate(username, password) {
  const user = USERS.find(
    (u) => u.username === String(username).trim() && u.password === password,
  );
  return user || null;
}

export function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    team: user.team,
    role: user.role,
    permissions: getPermissions(user.role),
  };
}
