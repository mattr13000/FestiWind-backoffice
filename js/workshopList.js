const workshopsGrid = document.querySelector("#workshops-grid");
const pagination = document.querySelector("#pagination");

const workshopsPerPage = 6;

let workshops = [];
let currentPage = 1;

getWorkshops();

async function getWorkshops() {
    try {
        const response = await fetch("http://127.0.0.1:8080/workshops");

        if (!response.ok) {
            throw new Error(response.status);
        }

        workshops = await response.json();
        console.log(workshops);

        displayWorkshops();
        displayPagination();

    } catch (error) {
        console.error("Error :", error.message);
    }
}

function displayWorkshops() {
    workshopsGrid.replaceChildren();

    const start = (currentPage - 1) * workshopsPerPage;
    const end = start + workshopsPerPage;

    const currentWorkshops = workshops.slice(start, end);

    currentWorkshops.forEach(workshop => {
        const card = document.createElement("div");
        card.classList.add("workshop-card");

        const title = document.createElement("h2");
        const description = document.createElement("p");
        const button = document.createElement("button");

        title.textContent = workshop.name;
        description.textContent = workshop.description;
        button.textContent = "More";

        button.addEventListener("click", () => {
            window.location.href =
                `../view/workshop-details.html?id=${workshop.id}`;
        });

        card.append(title, description, button);
        workshopsGrid.appendChild(card);
    });
}

function displayPagination() {
    pagination.replaceChildren();

    const totalPages = Math.ceil(workshops.length / workshopsPerPage);

    if (totalPages <= 1) {
        return;
    }

    const previous = createPageButton("← Previous", currentPage - 1);
    previous.disabled = currentPage === 1;
    pagination.appendChild(previous);

    for (let page = 1; page <= totalPages; page++) {
        const button = createPageButton(page, page);

        if (page === currentPage) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }

        pagination.appendChild(button);
    }

    const next = createPageButton("Next →", currentPage + 1);
    next.disabled = currentPage === totalPages;
    pagination.appendChild(next);
}

function createPageButton(text, page) {
    const button = document.createElement("button");

    button.textContent = text;
    button.type = "button";

    button.addEventListener("click", () => {
        currentPage = page;
        displayWorkshops();
        displayPagination();
    });

    return button;
}
