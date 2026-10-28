const loginForm = document.querySelector("#login-form");
const API_URL = "http://127.0.0.1:8080/users/login";
const TOKEN_KEY = "token";
const message = document.querySelector("#message-login");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    signIn(email, password);
});

async function signIn() {
  try {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginForm.elements["email"].value,
                password: loginForm.elements["password"].value,
            })
        });
    if (!response.ok) {
        throw new Error("Email or password invalid.");  
    }

    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    window.location.href = "view/workshop-list.html";
  } catch (error) {
    console.log(error);
    message.textContent = error.message;
  }
}

