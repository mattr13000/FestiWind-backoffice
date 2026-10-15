const array = document.querySelectorAll('thead')

async function loadReservation(){
    try {
        statut.textContent = "chargement en cours.";
        const response = await fetch("#url-api");
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
        });
    } catch (error) {
        console.error(error);
    }
}