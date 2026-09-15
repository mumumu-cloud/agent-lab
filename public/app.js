const form = document.getElementById("prompt-form");
const input = document.getElementById("prompt-input");
const button = form.querySelector(".prompt__button");
const statusEl = document.getElementById("status");
const result = document.getElementById("result");
const replyEl = document.getElementById("result-reply");
const metaEl = document.getElementById("result-meta");

async function checkHealth() {
  try {
    const res = await fetch("/api/health");
    if (!res.ok) throw new Error(`status ${res.status}`);
    await res.json();
    statusEl.textContent = "서버 연결됨";
    statusEl.dataset.state = "ok";
  } catch (err) {
    statusEl.textContent = "서버에 연결할 수 없음";
    statusEl.dataset.state = "error";
  }
}

function renderMeta(insights) {
  const rows = [
    ["의도", currentIntent],
    ["단어 수", insights.words],
    ["글자 수", insights.characters],
    ["역순", insights.reversed || "—"],
  ];
  metaEl.replaceChildren();
  for (const [label, value] of rows) {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = String(value);
    metaEl.append(dt, dd);
  }
}

let currentIntent = "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const prompt = input.value.trim();
  if (prompt === "") {
    input.focus();
    return;
  }

  button.disabled = true;
  button.textContent = "실행 중…";

  try {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();

    currentIntent = data.intent;
    replyEl.textContent = data.reply;
    renderMeta(data.insights);
    result.hidden = false;
  } catch (err) {
    replyEl.textContent = "요청을 처리하지 못했습니다.";
    metaEl.replaceChildren();
    result.hidden = false;
  } finally {
    button.disabled = false;
    button.textContent = "실행";
  }
});

checkHealth();
