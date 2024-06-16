// Function to create the card HTML
function createCardHTML(id, title, note, date, category) {
  return `
          <div class="card bg-white shadow-md rounded-lg p-4 mb-4" data-id="${id}">
            <div class="card-header flex justify-between items-center">
              <h2 class="text-xl font-bold title-text">${title}</h2>
              <span class="text-sm text-gray-500 date-text">${date}</span>
            </div>
            <div class="card-body mt-2">
              <input type="text" class="form-input hidden title-input" value="${title}">
              <p class="text-gray-700 note-text">${note}</p>
              <textarea class="form-textarea hidden note-input">${note}</textarea>
              <p class="text-sm text-gray-500 category-text">Category: ${category}</p>
              <input type="text" class="form-input hidden category-input" value="${category}">
              <input type="date" class="form-input hidden date-input" value="${date}">
            </div>
            <div class="card-footer mt-4 flex justify-end space-x-2">
              <button class="edit-btn bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
              <button class="save-btn hidden bg-green-500 text-white px-4 py-2 rounded">Save</button>
              <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        `;
}

// Function to handle card editing
function editCard(id) {
  const cardElement = document.querySelector(`.card[data-id="${id}"]`);
  const editBtn = cardElement.querySelector(".edit-btn");
  const saveBtn = cardElement.querySelector(".save-btn");
  const titleText = cardElement.querySelector(".title-text");
  const titleInput = cardElement.querySelector(".title-input");
  const noteText = cardElement.querySelector(".note-text");
  const noteInput = cardElement.querySelector(".note-input");
  const categoryText = cardElement.querySelector(".category-text");
  const categoryInput = cardElement.querySelector(".category-input");
  const dateText = cardElement.querySelector(".date-text");
  const dateInput = cardElement.querySelector(".date-input");

  // Toggle visibility of text and input fields
  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
  titleText.classList.add("hidden");
  titleInput.classList.remove("hidden");
  noteText.classList.add("hidden");
  noteInput.classList.remove("hidden");
  categoryText.classList.add("hidden");
  categoryInput.classList.remove("hidden");
  dateText.classList.add("hidden");
  dateInput.classList.remove("hidden");

  // Set initial input field values
  titleInput.value = titleText.textContent;
  noteInput.value = noteText.textContent;
  categoryInput.value = categoryText.textContent.replace("Category: ", "");
  dateInput.value = dateText.textContent;

  // Save button functionality
  saveBtn.addEventListener("click", () => {
    const newTitle = titleInput.value;
    const newNote = noteInput.value;
    const newCategory = categoryInput.value;
    const newDate = dateInput.value;

    titleText.textContent = newTitle;
    noteText.textContent = newNote;
    categoryText.textContent = `Category: ${newCategory}`;
    dateText.textContent = newDate;

    // Update local storage
    updateCardInLocalStorage(id, newTitle, newNote, newCategory, newDate);

    // Toggle back to view mode
    editBtn.classList.remove("hidden");
    saveBtn.classList.add("hidden");
    titleText.classList.remove("hidden");
    titleInput.classList.add("hidden");
    noteText.classList.remove("hidden");
    noteInput.classList.add("hidden");
    categoryText.classList.remove("hidden");
    categoryInput.classList.add("hidden");
    dateText.classList.remove("hidden");
    dateInput.classList.add("hidden");
  });
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

function updateCardInLocalStorage(id, newTitle, newNote, newCategory, newDate) {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const cardIndex = cards.findIndex((card) => card.id === id);
  if (cardIndex !== -1) {
    cards[cardIndex].title = newTitle;
    cards[cardIndex].note = newNote;
    cards[cardIndex].category = newCategory;
    cards[cardIndex].date = newDate;
    localStorage.setItem("cards", JSON.stringify(cards));
  }
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
