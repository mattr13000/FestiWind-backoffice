const workshopsGrid = document.querySelector("#workshops-grid");

getWorkshops();

async function getWorkshops() {
    try {
        const response = await fetch("http://127.0.0.1:8080/workshops");

        if (!response.ok) {
            throw new Error(response.status);
        }

        const workshops = await response.json();
        console.log(workshops)

        workshops.forEach(workshop => {
            const card = document.createElement("div")
            const title = document.createElement("h2");
            const description = document.createElement("p");
            const button = document.createElement("button");

            title.textContent = workshop.name;
            description.textContent = workshop.description;
            button.textContent = "More";

            button.addEventListener("click", () => {
                window.location.href = `../view/workshop-details.html?id=${workshop.id}`;
            });

            card.append(title, description, button);
            
            workshopsGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Error :", error.message);
    }
}

