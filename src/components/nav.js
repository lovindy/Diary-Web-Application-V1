// Function to create the navigation HTML
function createNavHTML() {
  const links = [
    { href: "#", text: "Home" },
    { href: "#", text: "About Us" },
    { href: "#", text: "My Diary" },
    { href: "#", text: "Explore" },
    { href: "#", text: "Plans" },
  ];

  let navHTML = `
    <nav class="nav-container">
      <!-- Logo -->
      <div class="logo"><img src="../assets/icons/Diary.svg" alt="Diary Logo" /></div>
      <!-- Link List to other pages -->
      <ul class="nav-links">
  `;
  links.forEach((link) => {
    navHTML += `<li class="nav-link"> <a href="${link.href}" class="underline-animation">${link.text}</a> </li>`;
  });

  navHTML += `
      </ul>
      <!-- Login & Sign Up Button -->
      <div class="nav-buttons">
        <button-component title="Login" type="primary"></button-component>
        <button-component title="Sign Up" type="secondary"></button-component>
      </div>
      <div class="menu-icon">
        <img src="../assets/icons/menu-icon.svg" alt="Diary Logo" />
      </div>
    </nav>
  `;
  return navHTML;
}

// Define the custom element
class NavComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = createNavHTML();
  }
}

// Register the custom element
customElements.define("nav-component", NavComponent);
