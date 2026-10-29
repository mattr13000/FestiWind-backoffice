const API_URL = "http://localhost:8080/workshops";
const workshopId = new URLSearchParams(location.search).get("id") || "550e8400-e29b-41d4-a716-4466554400P2";
const updateButton = document.querySelector("#update-button");
const updateSection = document.querySelector("#update-section");
const updateForm = document.querySelector("#update-form");
const cancelUpdate = document.querySelector("#cancel-update");

const nameInput = document.querySelector("#update-name");
const descriptionInput = document.querySelector("#update-description");
const startInput = document.querySelector("#update-start");
const endInput = document.querySelector("#update-end");
const capacityInput = document.querySelector("#update-capacity");

const workshopCard = document.querySelector(".workshop-card");
// Tests
// const workshopId = "2be7d198c9b04806a8cb5126cfa93a4f";

const workshopInfo = document.querySelector("#workshop-info");
const message = document.querySelector("#message");

const deleteButton = document.querySelector("#delete-button");


function createWorkshopElement(element, value) {
  let e = document.createElement(element);
  e.textContent = value;
  workshopInfo.append(e);
}

async function loadWorkshop() {
  if (!workshopId) {
    console.log("Workshop ID is missing");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${workshopId}`);
    // Test
    // const response = await fetch("http://127.0.0.1:8080/workshops/0374D6C8-3066-42BE-AD97-4E09A5C4C09F");
    if (!response.ok) {
      throw new Error("Workshop not found");
    }

    const workshop = await response.json();
    console.log(workshop)
    
    createWorkshopElement("p", workshop.name);
    createWorkshopElement("p", workshop.category);
    createWorkshopElement("p", toDateTimeLocal(workshop.startTime).replace('T', ', '));
    createWorkshopElement("p", toDateTimeLocal(workshop.endTime).replace('T', ', '));
    createWorkshopElement("p", workshop.description);

  } catch (error) {
    console.log(error);
  }
}

loadWorkshop();




 // *****************UPDATE WORKSHOP***********************************
// Convertir une date API en date pour datetime-local
function toDateTimeLocal(date) {
  const d = new Date(date);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

// 1. Afficher le formulaire avec les données existantes
updateButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_URL}/${workshopId}`);

    if (!response.ok) {
      throw new Error("Workshop not found");
    }

    const workshop = await response.json();

    nameInput.value = workshop.name;
    descriptionInput.value = workshop.description;
    startInput.value = toDateTimeLocal(workshop.startTime);
    endInput.value = toDateTimeLocal(workshop.endTime);
    capacityInput.value = workshop.capacityMax;

    updateSection.hidden = false;
    workshopCard.hidden = true;
    message.textContent = "";

  } catch (error) {
    message.textContent = "Error loading workshop";
  }
});

// 2. Enregistrer les modifications
updateForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updatedWorkshop = {
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    startTime: new Date(startInput.value).toISOString(),
    endTime: new Date(endInput.value).toISOString(),
    capacityMax: Number(capacityInput.value),
  };

  if (!updatedWorkshop.name || !updatedWorkshop.description) {
    message.textContent = "Name and description are required";
    return;
  }

  if (new Date(updatedWorkshop.endTime) <= new Date(updatedWorkshop.startTime)) {
    message.textContent = "End time must be after start time";
    return;
  }


  try {
    const response = await fetch(`${API_URL}/${workshopId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedWorkshop)
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    updateSection.hidden = true;
    workshopCard.hidden = false;

    // Rafraîchir les détails avec ta méthode existante
    workshopInfo.replaceChildren();
    await loadWorkshop();

    message.textContent = "Workshop updated successfully!";

  } catch (error) {
    console.error(error);
    message.textContent = "Error updating workshop";
  }
});

// 3. Annuler la modification
cancelUpdate.addEventListener("click", () => {
  updateSection.hidden = true;
  workshopCard.hidden = false;
});


// ***************DELETE WORKSHOP******************************
deleteButton.addEventListener("click", async () => {
  const confirmation = confirm("Are you sure you want to delete this workshop?");

  if (!confirmation) return;

  try {
    const response = await fetch(`${API_URL}/${workshopId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    alert("Workshop deleted successfully!");

    window.location.href = "../view/index.html";

  } catch (error) {
    console.error(error);
    alert("Error deleting workshop");
  }
});