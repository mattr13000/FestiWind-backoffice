
const API_URL = "http://127.0.0.1:8080";

const workshopId = new URLSearchParams(window.location.search).get("id");

const workshopTitle = document.querySelector("#workshop-title");
const workshopInfo = document.querySelector("#workshop-info");
const workshopCard = document.querySelector(".workshop-card");

const updateButton = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const updateSection = document.querySelector("#update-section");
const updateForm = document.querySelector("#update-form");
const cancelUpdate = document.querySelector("#cancel-update");

const nameInput = document.querySelector("#update-name");
const descriptionInput = document.querySelector("#update-description");
const startInput = document.querySelector("#update-start");
const endInput = document.querySelector("#update-end");
const capacityInput = document.querySelector("#update-capacity");
const categoryInput = document.querySelector("#update-category");

const message = document.querySelector("#message");

let currentWorkshop = null;
let categories = [];

function showMessage(text, type = "") {
    message.textContent = text;
    message.className = type;
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
}

function toDateTimeLocal(date) {
    const d = new Date(date);
    const local = new Date(
        d.getTime() - d.getTimezoneOffset() * 60000
    );
    return local.toISOString().slice(0, 16);
}

function formatDate(date) {
    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function createDetail(label, value) {
    const item = document.createElement("div");

    item.append(
        createElement("span", "detail-label", label),
        createElement("p", "detail-value", String(value))
    );

    return item;
}

/* CATEGORIES */

async function loadCategories() {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
        throw new Error("Unable to load categories.");
    }

    categories = await response.json();

    categoryInput.replaceChildren();

    categoryInput.add(
        new Option("Select a category", "")
    );

    categories.forEach(category => {
        categoryInput.add(
            new Option(category.name, category.id)
        );
    });
}

/* LOAD WORKSHOP */

async function loadWorkshop() {
    if (!workshopId) {
        showMessage("Workshop ID is missing.", "error");
        return null;
    }

    try {
        const response = await fetch(
            `${API_URL}/workshops/${workshopId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const workshop = await response.json();
        currentWorkshop = workshop;

        workshopTitle.textContent = "Workshop Details";
        workshopInfo.replaceChildren();

        const name = createElement(
            "h2",
            "workshop-name",
            workshop.name
        );

        const grid = document.createElement("div");
        grid.className = "workshop-details-grid";

        const category = categories.find(
            item => item.id === workshop.categoryID
        );

        grid.append(
            createDetail(
                "Category",
                category?.name ?? "Not specified"
            ),
            createDetail(
                "Number of seats",
                `${workshop.totalSubscribers ?? 0}/${workshop.capacityMax}`
            ),
            createDetail(
                "Start time",
                formatDate(workshop.startTime)
            ),
            createDetail(
                "End time",
                formatDate(workshop.endTime)
            )
        );

        const descriptionSection = document.createElement("div");
        descriptionSection.className = "workshop-description";

        descriptionSection.append(
            createElement("span", "detail-label", "Description"),
            createElement("p", "", workshop.description)
        );

        workshopInfo.append(
            name,
            grid,
            descriptionSection
        );

        return workshop;

    } catch (error) {
        console.error("Load error:", error);
        showMessage("Error loading workshop.", "error");
        return null;
    }
}

/* UPDATE WORKSHOP */

updateButton.addEventListener("click", async () => {
    const workshop = currentWorkshop ?? await loadWorkshop();

    if (!workshop) return;

    nameInput.value = workshop.name;
    descriptionInput.value = workshop.description;
    startInput.value = toDateTimeLocal(workshop.startTime);
    endInput.value = toDateTimeLocal(workshop.endTime);
    capacityInput.value = workshop.capacityMax;

    try {
        await loadCategories();

        const categoryId =
            workshop.categoryID ??
            workshop.categoryId ??
            workshop.category?.id;

        if (categoryId) {
            categoryInput.value = categoryId;
        }

    } catch (error) {
        showMessage(error.message, "error");
        return;
    }

    updateSection.hidden = false;
    workshopCard.hidden = true;
    showMessage("");
});

updateForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!currentWorkshop) {
        showMessage("Workshop not loaded.", "error");
        return;
    }

    if (!categoryInput.value) {
        showMessage("Please select a category.", "error");
        return;
    }

    if (!startInput.value || !endInput.value) {
        showMessage("Start and end times are required.", "error");
        return;
    }

    const updatedWorkshop = {
        name: nameInput.value.trim(),
        description: descriptionInput.value.trim(),
        startTime: new Date(startInput.value).toISOString(),
        endTime: new Date(endInput.value).toISOString(),
        capacityMax: Number(capacityInput.value),
        totalSubscribers: currentWorkshop.totalSubscribers ?? 0,
        category: {
            id: categoryInput.value
        }
    };

    if (!updatedWorkshop.name || !updatedWorkshop.description) {
        showMessage("Name and description are required.", "error");
        return;
    }

    if (
        new Date(updatedWorkshop.endTime) <=
        new Date(updatedWorkshop.startTime)
    ) {
        showMessage(
            "End time must be after start time.",
            "error"
        );
        return;
    }

    if (
        updatedWorkshop.capacityMax <
        updatedWorkshop.totalSubscribers
    ) {
        showMessage(
            "Maximum capacity cannot be lower than the number of subscribers.",
            "error"
        );
        return;
    }

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Please log in again.");
        }

        const response = await fetch(
            `${API_URL}/workshops/${workshopId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedWorkshop)
            }
        );

        if (!response.ok) {
            const errorDetails = await response.text();

            console.error("Vapor error:", errorDetails);

            throw new Error(
                `Update failed: HTTP ${response.status}`
            );
        }

        updateSection.hidden = true;
        workshopCard.hidden = false;

        await loadWorkshop();

        showMessage(
            "Changes saved successfully!",
            "success"
        );

    } catch (error) {
        console.error("Update error:", error);
        showMessage(error.message, "error");
    }
});

/* CANCEL UPDATE */

cancelUpdate.addEventListener("click", () => {
    updateSection.hidden = true;
    workshopCard.hidden = false;
    showMessage("");
});

/* DELETE WORKSHOP */

deleteButton.addEventListener("click", async () => {
    const confirmation = confirm(
        "Are you sure you want to delete this workshop?"
    );

    if (!confirmation) return;

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Please log in again.");
        }

        const response = await fetch(
            `${API_URL}/workshops/${workshopId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            const errorDetails = await response.text();

            console.error("Delete error:", errorDetails);

            throw new Error(
                `Delete failed: HTTP ${response.status}`
            );
        }

        window.location.href = "workshop-list.html";

    } catch (error) {
        console.error("Delete error:", error);
        showMessage(error.message, "error");
    }
});

/* INITIALIZATION */

loadWorkshop();
