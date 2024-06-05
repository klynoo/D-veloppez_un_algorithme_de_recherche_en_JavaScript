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

  inputElement.addEventListener("input", triggerCallback);

  [
    ingredientSelectElement,
    ustensilSelectElement,
    applianceSelectElement,
  ].forEach((selectElement) => {
    selectElement.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        event.target.classList.toggle("selected");
        triggerCallback();
      }
    });
  });
}
