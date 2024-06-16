// Function to create the card HTML
function createCardHTML(id, title, note, date, category) {
  return `
        <div class="card bg-white shadow-md rounded-lg p-4 mb-4" data-id="${id}">
          <div class="card-header flex justify-between items-center">
            <h2 class="text-xl font-bold">${title}</h2>
            <span class="text-sm text-gray-500">${date}</span>
          </div>
          <div class="card-body mt-2">
            <p class="text-gray-700">${note}</p>
            <p class="text-sm text-gray-500">Category: ${category}</p>
          </div>
          <div class="card-footer mt-4 flex justify-end space-x-2">
            <button class="edit-btn bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </div>
      `;
}

// Function to handle card creation
function addCard(title, note, category) {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const dateTime = `${date} ${time}`;
  const id = Date.now().toString();
  const cardHTML = createCardHTML(id, title, note, dateTime, category);
  document
    .getElementById("cardsContainer")
    .insertAdjacentHTML("beforeend", cardHTML);
  saveCardToLocalStorage(id, title, note, dateTime, category);

  // Add event listeners for edit and delete buttons
  const cardElement = document.querySelector(`.card[data-id="${id}"]`);
  cardElement
    .querySelector(".edit-btn")
    .addEventListener("click", () => editCard(id));
  cardElement
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteCard(id));
}

// Function to handle card editing
function editCard(id) {
  const cardElement = document.querySelector(`.card[data-id="${id}"]`);
  const titleElement = cardElement.querySelector("h2");
  const noteElement = cardElement.querySelector(".card-body p");
  const categoryElement = cardElement.querySelector(".card-body p + p");

  const newTitle = prompt("Edit Title:", titleElement.textContent);
  const newNote = prompt("Edit Note:", noteElement.textContent);
  const newCategory = prompt(
    "Edit Category:",
    categoryElement.textContent.replace("Category: ", "")
  );

  if (newTitle !== null) titleElement.textContent = newTitle;
  if (newNote !== null) noteElement.textContent = newNote;
  if (newCategory !== null)
    categoryElement.textContent = `Category: ${newCategory}`;

  updateCardInLocalStorage(id, newTitle, newNote, newCategory);
}

// Function to handle card deletion
function deleteCard(id) {
  const cardElement = document.querySelector(`.card[data-id="${id}"]`);
  cardElement.remove();
  removeCardFromLocalStorage(id);
}

// Local Storage Functions
function saveCardToLocalStorage(id, title, note, date, category) {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.push({ id, title, note, date, category });
  localStorage.setItem("cards", JSON.stringify(cards));
}

function updateCardInLocalStorage(id, newTitle, newNote, newCategory) {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const cardIndex = cards.findIndex((card) => card.id === id);
  if (cardIndex !== -1) {
    cards[cardIndex].title = newTitle;
    cards[cardIndex].note = newNote;
    cards[cardIndex].category = newCategory;
    localStorage.setItem("cards", JSON.stringify(cards));
  }
}

function removeCardFromLocalStorage(id) {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const updatedCards = cards.filter((card) => card.id !== id);
  localStorage.setItem("cards", JSON.stringify(updatedCards));
}

function loadCardsFromLocalStorage() {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.forEach((card) => {
    const { id, title, note, date, category } = card;
    const cardHTML = createCardHTML(id, title, note, date, category);
    document
      .getElementById("cardsContainer")
      .insertAdjacentHTML("beforeend", cardHTML);

    // Add event listeners for edit and delete buttons
    const cardElement = document.querySelector(`.card[data-id="${id}"]`);
    cardElement
      .querySelector(".edit-btn")
      .addEventListener("click", () => editCard(id));
    cardElement
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteCard(id));
  });
}

// Initialize the app and handle form submission
document.getElementById("addCardBtn").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const note = document.getElementById("note").value;
  const category = document.getElementById("category").value;

  if (title && note && category) {
    addCard(title, note, category);
    document.getElementById("title").value = "";
    document.getElementById("note").value = "";
    document.getElementById("category").value = "";
  } else {
    alert("Please fill out all fields.");
  }
});

// Load cards from local storage on page load
window.addEventListener("load", loadCardsFromLocalStorage);
