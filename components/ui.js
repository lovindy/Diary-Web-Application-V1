// ui.js
const entryContainer = document.getElementById("entries");

const setupEntryForm = () => {
  const entryForm = document.getElementById("entryForm");
  entryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const text = e.target.text.value;
    const entry = addEntry(title, text);
    renderEntry(entry);
    entryForm.reset();
  });
};

const renderEntry = (entry) => {
  const entryElement = document.createElement("article");
  entryElement.className = "entry";
  entryElement.innerHTML = `
    <header>
      <h2 class="entry__title">${entry.title}</h2>
    </header>
    <section class="entry__text">${entry.text}</section>
    <footer class="entry__actions">
      <button onclick="editEntry(${entry.id})">Edit</button>
      <button onclick="deleteEntry(${entry.id})">Delete</button>
    </footer>`;
  entryContainer.appendChild(entryElement);
};

const editEntry = (id) => {
  const entry = entries.find((entry) => entry.id === id);
  if (entry) {
    document.getElementById("title").value = entry.title;
    document.getElementById("text").value = entry.text;
    deleteEntry(id);
  }
};

const deleteEntry = (id) => {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    entries.splice(index, 1);
    saveEntries();
    entryContainer.innerHTML = "";
    entries.forEach(renderEntry);
  }
};
