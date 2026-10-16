
const API_URL = "http://localhost:8080/workshop";
const workshopId = new URLSearchParams(location.search).get("id");

const workshopInfo = document.querySelector("#workshop-info");
const message = document.querySelector("#message");

async function loadWorkshop() {
  if (!workshopId) {
    message.textContent = "Workshop ID is missing";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${workshopId}`);

    if (!response.ok) {
      throw new Error("Workshop not found");
    }

    const workshop = await response.json();

    workshopInfo.innerHTML = `
      <h2>Workshop ${workshop.id}</h2>
      <p><strong>Name:</strong> ${workshop.name}</p>
      <p><strong>Category:</strong> ${workshop.category}</p>
      <p><strong>Start Time:</strong> ${workshop.startTime}</p>
      <p><strong>End Time:</strong> ${workshop.endTime}</p>
      <p><strong>Description:</strong> ${workshop.description}</p>
    `;
  } catch (error) {
    message.textContent = error.message;
  }
}

loadWorkshop();
