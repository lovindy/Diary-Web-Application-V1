// Function to navigate between pages
function navigateTo(page, id = "") {
  const url = id ? `${page}?id=${id}` : page;
  window.location.href = url;
}

// Function to handle user signup
function handleSignUp() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (username && password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.username === username)) {
      alert("Username already exists");
      return;
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign up successful! You can now log in.");
    navigateTo("login.html");
  } else {
    alert("Please fill out all fields.");
  }
}

// Function to handle user login
function handleLogin() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (username && password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigateTo("../index.html");
    } else {
      alert("Invalid username or password.");
    }
  } else {
    alert("Please fill out all fields.");
  }
}

// Function to check if user is authenticated
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    navigateTo("pages/login.html");
  }
}

// Load cards from local storage on the main page
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/"
) {
  window.addEventListener("load", () => {
    checkAuth();
    loadCardsFromLocalStorage();
  });
}

// Add card on create page
if (window.location.pathname.endsWith("create.html")) {
  document.getElementById("addCardBtn").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const note = document.getElementById("note").value;
    const category = document.getElementById("category").value;

    if (title && note && category) {
      addCard(title, note, category);
      navigateTo("../index.html");
    } else {
      alert("Please fill out all fields.");
    }
  });
}

// Update card on edit page
if (window.location.pathname.endsWith("edit.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const card = getCardFromLocalStorage(id);
  if (card) {
    document.getElementById("title").value = card.title;
    document.getElementById("note").value = card.note;
    document.getElementById("category").value = card.category;
    document.getElementById("cardId").value = card.id;
  }

  document.getElementById("updateCardBtn").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const note = document.getElementById("note").value;
    const category = document.getElementById("category").value;

    if (title && note && category) {
      updateCard(id, title, note, category);
      navigateTo("../index.html");
    } else {
      alert("Please fill out all fields.");
    }
  });
}

// Confirm delete on delete page
if (window.location.pathname.endsWith("delete.html")) {
  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    deleteCard(id);
    navigateTo("../index.html");
  });
}

// Sign up page
if (window.location.pathname.endsWith("signup.html")) {
  document.getElementById("signupBtn").addEventListener("click", handleSignUp);
}

// Login page
if (window.location.pathname.endsWith("login.html")) {
  document.getElementById("loginBtn").addEventListener("click", handleLogin);
}
