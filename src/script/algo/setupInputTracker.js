function sanitizeInput(input) {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
}

export function setupInputTracker(callback) {
  const inputElement = document.getElementById("wordInput");
  const ingredientSelectElement = document.getElementById("ingredients-select");
  const ustensilSelectElement = document.getElementById("ustensils-select");
  const applianceSelectElement = document.getElementById("appliance-select");

  if (
    !inputElement ||
    !ingredientSelectElement ||
    !ustensilSelectElement ||
    !applianceSelectElement
  ) {
    console.error(
      "Un ou plusieurs éléments DOM nécessaires sont introuvables."
    );
    return;
  }

  function triggerCallback() {
    const currentWord = sanitizeInput(inputElement.value);
    updateSelectedFiltersDisplay(
      ingredientSelectElement,
      "selected-ingredients"
    );
    updateSelectedFiltersDisplay(ustensilSelectElement, "selected-ustensils");
    updateSelectedFiltersDisplay(applianceSelectElement, "selected-appliances");

    const selectedIngredients = getSelectedValues(ingredientSelectElement);
    const selectedUstensils = getSelectedValues(ustensilSelectElement);
    const selectedAppliances = getSelectedValues(applianceSelectElement);

    if (
      currentWord.length > 2 ||
      selectedIngredients.length > 0 ||
      selectedUstensils.length > 0 ||
      selectedAppliances.length > 0
    ) {
      callback(
        currentWord,
        selectedIngredients,
        selectedUstensils,
        selectedAppliances
      );
    }
  }

  function getSelectedValues(selectElement) {
    return Array.from(selectElement.querySelectorAll("li.selected")).map(
      (item) => item.textContent.trim().toLowerCase()
    );
  }

  function updateSelectedFiltersDisplay(selectElement, containerId) {
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
        updateSelectedFiltersDisplay(selectElement, containerId);
        triggerCallback();
      });
      badge.appendChild(badgeP);
      badge.appendChild(badgeX);

      container.appendChild(badge);
    });
  }

  inputElement.addEventListener("input", triggerCallback);

  [
    { element: ingredientSelectElement, id: "ingredients" },
    { element: ustensilSelectElement, id: "ustensils" },
    { element: applianceSelectElement, id: "appliances" },
  ].forEach(({ element, id }) => {
    element.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        event.target.classList.toggle("selected");
        updateSelectedFiltersDisplay(element, `selected-${id}`);
        triggerCallback();
      }
    });
  });
}
