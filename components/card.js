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
        <button class="edit-btn bg-blue-500 text-white px-4 py-2 rounded" onclick="navigateTo('pages/edit.html', '${id}')">Edit</button>
        <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded" onclick="navigateTo('pages/delete.html', '${id}')">Delete</button>
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
}

// Function to handle card updating
function updateCard(id, title, note, category) {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const dateTime = `${date} ${time}`;

  const cardElement = document.querySelector(`.card[data-id="${id}"]`);
  cardElement.querySelector("h2").textContent = title;
  cardElement.querySelector(".card-body p").textContent = note;
  cardElement.querySelector(
    ".card-body p + p"
  ).textContent = `Category: ${category}`;
  cardElement.querySelector(".card-header span").textContent = dateTime;

  updateCardInLocalStorage(id, title, note, category, dateTime);
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

function updateCardInLocalStorage(
  id,
  newTitle,
  newNote,
  newCategory,
  dateTime
) {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const cardIndex = cards.findIndex((card) => card.id === id);
  if (cardIndex !== -1) {
    cards[cardIndex].title = newTitle;
    cards[cardIndex].note = newNote;
    cards[cardIndex].category = newCategory;
    cards[cardIndex].date = dateTime;
    localStorage.setItem("cards", JSON.stringify(cards));
  }
}

function removeCardFromLocalStorage(id) {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards = cards.filter((card) => card.id !== id);
  localStorage.setItem("cards", JSON.stringify(cards));
}

function loadCardsFromLocalStorage() {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.forEach((card) => {
    const cardHTML = createCardHTML(
      card.id,
      card.title,
      card.note,
      card.date,
      card.category
    );
    document
      .getElementById("cardsContainer")
      .insertAdjacentHTML("beforeend", cardHTML);
  });
}

function getCardFromLocalStorage(id) {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  return cards.find((card) => card.id === id);
}
