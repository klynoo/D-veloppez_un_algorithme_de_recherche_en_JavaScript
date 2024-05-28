function sanitizeInput(input) {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
}

export function setupInputTracker(callback) {
  const inputElement = document.getElementById("wordInput");
  const ingredientSelectElement = document.getElementById("ingredients-select");
  const ustensilSelectElement = document.getElementById("ustensils-select");

  function triggerCallback() {
    const currentWord = sanitizeInput(inputElement.value);
    const selectedIngredients = ingredientSelectElement.value;
    const selectedUstensils = ustensilSelectElement.value;
    callback(currentWord, selectedIngredients, selectedUstensils);
  }

  inputElement.addEventListener("input", triggerCallback);
  ingredientSelectElement.addEventListener("change", triggerCallback);
  ustensilSelectElement.addEventListener("change", triggerCallback);
}

document.addEventListener("DOMContentLoaded", () =>
  setupInputTracker((word, selectedIngredients, selectedUstensils) => {})
);
