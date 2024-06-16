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
      <nav class="flex max-w-[1440px] mx-auto justify-between items-center px-16">
        <!-- Logo -->
        <div class="logo"><img src="../asset/Diary.svg" alt="" /></div>
  
        <!-- Link List to other pages -->
        <ul class="flex space-x-4 text-white">
    `;

  links.forEach((link) => {
    navHTML += `
        <li class="hover:scale-110 duration-300 scale-100 relative">
          <a href="${link.href}" class="underline-animation">${link.text}</a>
        </li>
      `;
  });

  navHTML += `
        </ul>
  
        <!-- Login & Sign Up Button -->
        <div class="flex space-x-4">
          <button-component title="Login" type="primary"></button-component>
          <button-component title="Sign Up" type="secondary"></button-component>
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
