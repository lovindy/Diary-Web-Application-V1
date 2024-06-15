// storage.js
const getEntries = () => {
  return JSON.parse(localStorage.getItem("entries")) || [];
};

const setEntries = (entries) => {
  localStorage.setItem("entries", JSON.stringify(entries));
};
