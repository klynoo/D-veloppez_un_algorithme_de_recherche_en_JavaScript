export class DynamicSelect {
  constructor(id, recipes, type) {
    this.selectElement = document.getElementById(id);
    if (!this.selectElement) {
      console.error("L'élément select avec l'ID spécifié n'existe pas :", id);
      return;
    }
    this.recipes = recipes;
    this.type = type;
    this.populateSelect();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  extractElements() {
    const allElements = new Set();
    this.recipes.forEach((recipe) => {
      if (this.type === "ingredients") {
        recipe.ingredients.forEach((ingredient) =>
          allElements.add(ingredient.ingredient.toLowerCase())
        );
      } else if (this.type === "ustensils") {
        recipe.ustensils.forEach((ustensil) =>
          allElements.add(ustensil.toLowerCase())
        );
      } else if (this.type === "appliance") {
        allElements.add(recipe.appliance.toLowerCase());
      }
    });
    return Array.from(allElements).map((element) =>
      this.capitalizeFirstLetter(element)
    );
  }

  addOptions(options) {
    options.forEach((optionText) => {
      const option = document.createElement("li");
      option.value = optionText.toLowerCase();
      option.textContent = optionText;
      this.selectElement.appendChild(option);
    });
  }

  populateSelect() {
    const elements = this.extractElements();
    this.addOptions(elements);
  }
}

export class SearchFilter extends DynamicSelect {
  constructor(id, recipes, type) {
    super(id, recipes, type);
    this.inputElement = document.getElementById(`${type}-search`);
    if (!this.inputElement) {
      console.error(
        "L'élément input avec l'ID spécifié n'existe pas :",
        `${type}-search`
      );
      return;
    }
    this.inputElement.addEventListener(
      "input",
      this.handleInputChange.bind(this)
    );
  }

  handleInputChange() {
    const inputValue = this.inputElement.value.toLowerCase();
    const filteredOptions = this.extractElements().filter((option) =>
      option.toLowerCase().includes(inputValue)
    );
    this.selectElement.innerHTML = "";
    this.addOptions(filteredOptions);
  }
}

export function getSelectedValues(selectElement) {
  return Array.from(selectElement.querySelectorAll("li.selected")).map((item) =>
    item.textContent.trim().toLowerCase()
  );
}

export function updateSelectedFiltersDisplay(
  selectElement,
  containerId,
  triggerCallback
) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const allSelectedItems = selectElement.querySelectorAll("li.selected");
  allSelectedItems.forEach((item) => {
    const badge = document.createElement("div");
    badge.className = "filter-badge";
    const badgeP = document.createElement("p");
    badgeP.textContent = item.textContent.trim();
    const badgeX = document.createElement("span");
    badgeX.textContent = " X";

    badge.addEventListener("click", function () {
      item.classList.remove("selected");
      updateSelectedFiltersDisplay(selectElement, containerId, triggerCallback);
      triggerCallback();
      updateSelectedDropdownItems();
    });
    badge.appendChild(badgeP);
    badge.appendChild(badgeX);

    container.appendChild(badge);

    function updateSelectedDropdownItems() {
      const dropdownItems = selectElement.querySelectorAll("li");
      dropdownItems.forEach((item) => {
        if (item.textContent.trim() === badgeP.textContent) {
          item.classList.remove("selected");
        }
      });
      updateSelectedFiltersDisplay(selectElement, containerId, triggerCallback);
      triggerCallback();
    }
  });
}
