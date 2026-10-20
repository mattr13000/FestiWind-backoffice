async function getWorkshops() {
    try {
        const response = await fetch("http://127.0.0.1:8080/workshops");

        if (!response.ok) {
            throw new Error(response.status);
        }

        const workshops = await response.json();
        const container = document.getElementById("workshops-container");
        
        container.innerHTML = "";

        workshops.forEach(workshop => {
            const card = document.createElement("div");
            const title = document.createElement("h2");
            const description = document.createElement("p");
            const button = document.createElement("button");

            title.textContent = workshop.title;
            description.textContent = workshop.description;
            button.textContent = "More";

            button.addEventListener("click", () => {
                window.location.href = `/workshop.html?id=${workshop.id}`;
            });

            card.append(title, description, button);
            
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error :", error.message);
    }
}