const addWorkshopForm = document.querySelector("#add-workshop-form");

addWorkshopForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postWorkshop(e.target);
    console.log("FORM SUBMITTED")
});


async function postWorkshop(form) {
    const url = "http://127.0.0.1:8080/workshop";
    try {
        const reponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: form.elements["name"].value,
                category: form.elements["category"].value,
                "start-time": form.elements["start-time"].value,
                "end-time": form.elements["end-time"].value,
                description: form.elements["description"].value,
                "max-capacity": form.elements["max-capacity"].value
            })
        });

        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }

        const result = await reponse.text();
        console.log("Server response :", result);
    } catch (erreur) {
        console.error("Error :", erreur.message);
    }
}