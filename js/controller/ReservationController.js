const arrayBody = document.querySelector('#reservations-body');

loadReservation();


async function loadReservation() {
    try {
        const response = await fetch("http://127.0.0.1:8080/reservations");
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const reservations = await response.json();

        reservations.forEach(reservation => {
            const row = document.createElement("tr");

            const values = [
                reservation.workshopName,
                reservation.userName,
                formatDate(reservation.startTime),
                formatDate(reservation.endTime),
                reservation.status,
            ]

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });


            const trashImg = document.createElement("img");
            trashImg.src = "../assets/images/trash.svg";
            trashImg.alt = "Supprimer";
            trashImg.width = 30;

            trashImg.addEventListener("click", () => {
                const confirmation = confirm(
                    "Voulez-vous vraiment supprimer cette réservation ?"
                );
                if (confirmation) {
                    deleteReservation(reservation.id, row);
                }
            });

            const actionCell = document.createElement("td");
            actionCell.appendChild(trashImg);
            row.appendChild(actionCell);

            arrayBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        statut.textContent = "loading error.";
    }
}

async function deleteReservation(id, row) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/reservations/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Remove the reservation's row
        row.remove();

    } catch (error) {
        console.error(error);
    }
}

const formatDate = (isoString) => {
    if (!isoString) return '';

    const date = new Date(isoString);

    return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};