export class Dropdown {
  constructor(config) {
    this.config = config;
    this.dropdownElement = document.querySelector(config.dropdownSelector);
    this.dropdownButton = this.dropdownElement.querySelector(
      config.buttonSelector
    );
    this.dropdownContent = this.dropdownElement.querySelector(
      config.contentSelector
    );
    this.searchInput = this.dropdownElement.querySelector(
      config.searchInputSelector
    );

    this.initEvents();
  }

  initEvents() {
    this.dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.toggleDropdown();
    });

    this.searchInput.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  toggleDropdown() {
    this.dropdownContent.classList.toggle("show");
    console.log(
      "Dropdown visibility toggled. Current state:",
      this.dropdownContent.classList.contains("show") ? "Visible" : "Hidden"
    );
  }

  static closeAllDropdowns(event, dropdownInstances) {
    dropdownInstances.forEach((dropdown) => {
      const dropdownButton = dropdown.dropdownButton;
      const searchInput = dropdown.searchInput;
      const dropdownContent = dropdown.dropdownContent;

      if (
        !dropdownButton.contains(event.target) &&
        !searchInput.contains(event.target) &&
        dropdownContent.classList.contains("show")
      ) {
        dropdownContent.classList.remove("show");
        console.log("Dropdown closed due to click outside.");
      }
    });
  }
}
