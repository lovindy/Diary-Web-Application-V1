// entry.js
const entries = [];

const addEntry = (title, text) => {
  const entry = {
    id: Date.now(),
    title,
    text,
  };
  entries.push(entry);
  saveEntries();
  return entry;
};

const deleteEntry = (id) => {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    entries.splice(index, 1);
    saveEntries();
  }
};

const saveEntries = () => {
  localStorage.setItem("entries", JSON.stringify(entries));
};

const loadEntries = () => {
  const storedEntries = localStorage.getItem("entries");
  if (storedEntries) {
    entries.push(...JSON.parse(storedEntries));
    entries.forEach(renderEntry);
  }
};
