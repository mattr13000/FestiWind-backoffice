const arrayBody = document.querySelector('#reservations-body');

let currentPage = 1;
const rowsPerPage = 10;
let allRows = [];

loadReservation();


async function loadReservation() {
    try {
        const response = await fetch("http://127.0.0.1:8080/reservations");
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const reservations = await response.json();
        allRows = [];

        reservations.forEach(reservation => {
            const row = document.createElement("tr");

            const values = [
                reservation.workshopName,
                reservation.userName,
                formatDate(reservation.startTime),
                formatDate(reservation.endTime),
            ]

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            const statusClass = reservation.status;
            const statusTd = document.createElement("td");
            statusTd.textContent = capitalizeFirstLetter(reservation.status);
            statusTd.className = `status-${statusClass}`;
            row.appendChild(statusTd);

            const trashImg = document.createElement("img");
            trashImg.src = "../assets/images/trash.svg";
            trashImg.alt = "Supprimer";
            trashImg.style.filter = trashImg.style.filter = "invert(16%) sepia(98%) saturate(4777%)";

            trashImg.addEventListener("click", () => {
                const confirmation = confirm(
                    "Voulez-vous vraiment supprimer cette réservation ?"
                );
                if (confirmation) {
                    deleteReservation(reservation.id, row);
                }
            });

            const actionCell = document.createElement("td");
            actionCell.classList.add("trashIconContainer");
            actionCell.appendChild(trashImg);
            row.appendChild(actionCell);

            allRows.push(row);
        });
    } catch (error) {
        console.error(error);
        statut.textContent = "loading error.";
    }
    displayPage();
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

function displayPage() {
    arrayBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    allRows.slice(start, end).forEach(row => {
        arrayBody.appendChild(row);
    });

    document.querySelector('#page-info').textContent =
        `Page ${currentPage} of ${Math.max(1, Math.ceil(allRows.length / rowsPerPage))}`;

    document.querySelector('#btn-prev').disabled = currentPage === 1;

    document.querySelector('#btn-next').disabled =
        currentPage >= Math.ceil(allRows.length / rowsPerPage);
}

document.querySelector('#btn-prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage();
    }
});

document.querySelector('#btn-next').addEventListener('click', () => {
    if (currentPage < Math.ceil(allRows.length / rowsPerPage)) {
        currentPage++;
        displayPage();
    }
});

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
