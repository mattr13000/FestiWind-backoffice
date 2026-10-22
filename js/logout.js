const TOKEN_KEY = "token"; // voir avec Mathieu nom du jwt
const logoutBtn = document.querySelector("#logout-btn");

function signout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "index.html";
}

logoutBtn.addEventListener("click", signout);