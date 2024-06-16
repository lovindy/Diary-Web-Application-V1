// Function to create the button HTML
function createBTN(title, customClass) {
  const baseClasses = "px-4 py-2 font-semibold focus:outline-none rounded-full";
  const classList = `${baseClasses} ${customClass}`;
  return `<button class="${classList}">${title}</button>`;
}

// Define the custom element
class CreateButtonComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const type = this.getAttribute("type");

    let customClass = "";
    switch (type) {
      case "primary":
        customClass =
          "bg-teal-400 border border-black hover:border-white hover:bg-teal-500 text-black hover:text-white duration-300";
        break;
      case "secondary":
        customClass =
          "bg-black border border-white hover:border-black hover:bg-white text-white hover:text-black duration-300";
        break;
      case "danger":
        customClass = "bg-red-500 hover:bg-red-700 text-white";
        break;
      case "success":
        customClass = "bg-green-500 hover:bg-green-700 text-white";
        break;
      case "warning":
        customClass = "bg-yellow-500 hover:bg-yellow-700 text-white";
        break;
      default:
        customClass = "bg-blue-500 hover:bg-blue-700 text-white"; // default to primary
        break;
    }

    this.innerHTML = createBTN(title, customClass);
  }
}

// Register the custom element
customElements.define("button-component", CreateButtonComponent);
