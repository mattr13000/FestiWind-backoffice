const addWorkshopForm = document.querySelector("#add-workshop-form");

addWorkshopForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postWorkshop(e.target);
    console.log("FORM SUBMITTED");
});


async function postWorkshop(form) {
    const url = "http://127.0.0.1:8080/workshop";
    
    const startTimeValue = form.elements["start-time"].value;
    const endTimeValue = form.elements["end-time"].value;

    const startTimeISO = startTimeValue ? new Date(startTimeValue).toISOString() : null;
    const endTimeISO = endTimeValue ? new Date(endTimeValue).toISOString() : null;

    try {
        const reponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: form.elements["name"].value,
                category: form.elements["category"].value,
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