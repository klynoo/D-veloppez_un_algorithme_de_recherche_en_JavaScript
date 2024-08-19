export class Dropdown {
  static instances = [];

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
    Dropdown.instances.push(this);
  }

  initEvents() {
    this.dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation();
      Dropdown.closeAllDropdowns(this);
      this.toggleDropdown();
    });

    this.searchInput.addEventListener("click", (event) =>
      event.stopPropagation()
    );

    // Ajouter un gestionnaire d'événements pour les clics sur les éléments <li>
    this.dropdownContent.querySelectorAll("ul").forEach((ul) => {
      ul.addEventListener("click", (event) => event.stopPropagation());
    });

    document.addEventListener("click", Dropdown.closeAllDropdowns);
  }

  toggleDropdown() {
    this.dropdownContent.classList.toggle("show");
  }

  static closeAllDropdowns(currentDropdown = null) {
    Dropdown.instances.forEach((dropdown) => {
      if (
        dropdown !== currentDropdown &&
        dropdown.dropdownContent.classList.contains("show")
      ) {
        dropdown.dropdownContent.classList.remove("show");
      }
    });
  }
}

