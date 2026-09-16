import { authenticate, publicUser } from "./sample-data.js";

const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");
const button = form.querySelector("button[type=submit]");

form.addEventListener("submit", (event) => {
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

  // Static prototype: authenticate against the embedded sample users.
  const user = authenticate(username, password);
  if (!user) {
    errorEl.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
    button.disabled = false;
    button.textContent = "로그인";
    return;
  }

  sessionStorage.setItem("agentlab_user", JSON.stringify(publicUser(user)));
  window.location.href = "/";
});
