const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");
const button = form.querySelector("button[type=submit]");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorEl.textContent = "";

  const username = form.username.value.trim();
  const password = form.password.value;
  if (!username || !password) {
    errorEl.textContent = "아이디와 비밀번호를 모두 입력하세요.";
    return;
  }

  button.disabled = true;
  button.textContent = "로그인 중…";

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      errorEl.textContent = data.error || "로그인에 실패했습니다.";
      return;
    }
    window.location.href = "/";
  } catch (err) {
    errorEl.textContent = "서버에 연결할 수 없습니다.";
  } finally {
    button.disabled = false;
    button.textContent = "로그인";
  }
});
