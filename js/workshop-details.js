const API_URL = "http://localhost:3000/workshops/1";

async function chargerWorkshop() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Workshop introuvable");
        }

        const workshop = await response.json();

        document.getElementById("category").value = workshop.category ?? "";
        document.getElementById("startTime").value = workshop.startTime ?? "";
        document.getElementById("name").value = workshop.name ?? "";
        document.getElementById("endTime").value = workshop.endTime ?? "";
        document.getElementById("description").value = workshop.description ?? "";

        document.querySelector("h1").textContent =
            `Workshop ${workshop.id}`;

    } catch (error) {
        console.error("Erreur API :", error);
    }
}

chargerWorkshop();