
const addWorkshopForm = document.querySelector("#add-workshop-form");
const categoryList = document.querySelector("#categories");
const formMessage = document.querySelector("#form-message");
const submitButton = document.querySelector("#submit");

const API_URL = "http://127.0.0.1:8080";

getCategories();

addWorkshopForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postWorkshop(e.target);
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.hidden = false;
}

async function postWorkshop(form) {
    const token = localStorage.getItem("token");

    if (!token) {
        showMessage("Please log in before creating a workshop.", "error");
        return;
    }

    const startTimeValue = form.elements["start-time"].value;
    const endTimeValue = form.elements["end-time"].value;

    const startDate = new Date(startTimeValue);
    const endDate = new Date(endTimeValue);

    if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime()) ||
        endDate <= startDate
    ) {
        showMessage("End time must be later than start time.", "error");
        return;
    }

    const startTimeISO = startDate.toISOString()
        .replace(/\.\d{3}Z$/, "Z");

    const endTimeISO = endDate.toISOString()
        .replace(/\.\d{3}Z$/, "Z");

    submitButton.disabled = true;
    submitButton.textContent = "Creating...";

    formMessage.hidden = true;

    try {
        const response = await fetch(`${API_URL}/workshops`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: form.elements["name"].value.trim(),
                categoryID: form.elements["categories"].value,
                startTime: startTimeISO,
                endTime: endTimeISO,
                description: form.elements["description"].value.trim(),
                totalSubscribers: 0,
                capacityMax: Number(form.elements["max-capacity"].value)
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Session expired. Please log in again.");
            }

            if (response.status === 403) {
                throw new Error("You are not authorized to create workshops.");
            }

            throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();

        console.log("Workshop created:", result);

        if (!result.id) {
            showMessage(
                "Workshop created, but the server did not return its ID.",
                "error"
            );
            return;
        }

        showMessage(
            "Workshop successfully created! Redirecting...",
            "success"
        );

        setTimeout(() => {
            window.location.href =
                `workshop-details.html?id=${encodeURIComponent(result.id)}`;
        }, 1500);

    } catch (error) {
        console.error("Error:", error.message);
        showMessage(error.message, "error");

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create workshop";
    }
}

async function getCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const categories = await response.json();

        categories.forEach(category => {
            const categoryOption = document.createElement("option");

            categoryOption.value = category.id;
            categoryOption.textContent = category.name;

            categoryList.appendChild(categoryOption);
        });

    } catch (error) {
        console.error("Error:", error.message);
        showMessage("Unable to load categories.", "error");
    }
}
