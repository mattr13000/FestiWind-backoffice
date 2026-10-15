
/*const formulaire = document.querySelector("#inscription-form");
const messagePara = document.querySelector("#message");
const passwordInput = document.querySelector("#password");


formulaire.addEventListener("submit", (e) => {
        e.preventDefault();

        if (passwordInput.value.length < 10) {
            messagePara.textContent = "Le mot de passe doit contenir au moins 10 caractères.";
            messagePara.classList.add("erreur");
            messagePara.classList.remove("succes");
        } else {
            messagePara.textContent = "Inscription réussis.";
            messagePara.classList.add("succes");
            messagePara.classList.remove("erreur");
        }
        
});


fetch("https://jsonplaceholder.typicode.com/users/1")
.then(response => {
    if (!response.ok) {
        throw new Error("Erreur réseau");
    }
    return response.json();
})
.then(data => console.log(data.name))
.catch(error => console.error("probleme :", error));
*/
const loadBtn = document.querySelector("#btn-charger");
const statut = document.querySelector("#statut");
const listUser = document.querySelector("#liste-utilisateurs");


async function loadUser() {
    try {
        statut.textContent = "chargement en cours.";
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const users = await response.json();
        listUser.textContent = ""
        users.forEach(user => {
            const newListElement = document.createElement("li");
            newListElement.textContent += (`${user.name} ${user.email}`); 
            listUser.appendChild(newListElement)
            statut.textContent = ""
        });
    } catch (error) {
        console.error(error);
    }
}

loadBtn.addEventListener("click", () => {
    loadUser();
})

const array = document.querySelectorAll('thread')

async function loadReservation(){
    try {
        statut.textContent = "chargement en cours.";
        const response = await fetch("#");
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const reservations = await response.json();
        reservations.forEach(reservation => {
            const newListElement = document.createElement("th");
            newListElement.textContent += `${reservation.workshopName}`;
            newListElement.textContent += `${reservation.Username}`;
            newListElement.textContent += `${reservation.date}`;
            newListElement.textContent += `${reservation.hour}`;
            newListElement.textContent += `${reservation.status}`;
            newListElement.textContent += `${reservation.action}`;
        })
    }
}