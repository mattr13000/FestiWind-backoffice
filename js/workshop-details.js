const API_URL = "http://127.0.0.1:8080/workshops";
const workshopId = new URLSearchParams(location.search).get("id");

// Tests
// const workshopId = "2be7d198c9b04806a8cb5126cfa93a4f";

const workshopInfo = document.querySelector("#workshop-info");
const message = document.querySelector("#message");

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
    createWorkshopElement("p", workshop.startTime);
    createWorkshopElement("p", workshop.endTime);
    createWorkshopElement("p", workshop.description);

  } catch (error) {
    console.log(error);
  }
}

loadWorkshop();
