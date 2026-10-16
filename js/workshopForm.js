const addWorkshopForm = document.querySelector("#add-workshop-form");
const categoryList = document.querySelector("#categories")

getCategories();

addWorkshopForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postWorkshop(e.target);
    console.log("FORM SUBMITTED");
});


async function postWorkshop(form) {
    const url = "http://127.0.0.1:8080/workshops";
    
    const startTimeValue = form.elements["start-time"].value;
    const endTimeValue = form.elements["end-time"].value;

    const startTimeISO = startTimeValue ? new Date(startTimeValue).toISOString().replace(/\.\d{3}Z$/, "Z") : null;
    const endTimeISO = endTimeValue ? new Date(endTimeValue).toISOString().replace(/\.\d{3}Z$/, "Z") : null;

    try {
        const reponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: form.elements["name"].value,
                categoryID: form.elements["categories"].value,
                startTime: startTimeISO,
                endTime: endTimeISO,
                description: form.elements["description"].value,
                totalSubscribers: 0,
                capacityMax: Number(form.elements["max-capacity"].value)
            })
        });

        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }

        const result = await reponse.text();
        console.log("Server response :", result);
    } catch (error) {
        console.error("Error :", error.message);
    }
}

async function getCategories() {
    try {
        const response = await fetch("http://127.0.0.1:8080/categories");

        if (!response.ok) {
            throw new Error(response.status);
        }

        const categories = await response.json();

        categories.forEach(category => {
            const categoryOption = document.createElement("option");
            categoryOption.value = category.id
            categoryOption.textContent = category.name
            categoryList.append(categoryOption)
        });

    } catch (error) {
        console.error("Error :", error.message);
    }
}