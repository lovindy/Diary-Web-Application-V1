// Function to create the button HTML
function createBTN(title, customClass) {
  return `<button class="button ${customClass}">${title}</button>`;
}

// Define the custom element
class CreateButtonComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const type = this.getAttribute("type");

    let customClass = "";
    switch (type) {
      case "primary":
        customClass = "button-primary";
        break;
      case "secondary":
        customClass = "button-secondary";
        break;
      case "danger":
        customClass = "button-danger";
        break;
      case "success":
        customClass = "button-success";
        break;
      case "warning":
        customClass = "button-warning";
        break;
      default:
        customClass = "button-default";
        break;
    }

    this.innerHTML = createBTN(title, customClass);
  }
}

// Register the custom element
customElements.define("button-component", CreateButtonComponent);
