import {
  updateSelectedFiltersDisplay,
  getSelectedValues,
} from "../component/dropDown/dropdownUI.js";

// Nettoie l'entrée en créant un élément temporaire et en définissant son innerText sur la valeur de l'entrée
export function sanitizeInput(input) {
  console.log("Sanitizing input:", input);
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
}

// Configure le suivi de l'entrée en attribuant des écouteurs d'événements et des fonctions de rappel
export function setupInputTracker(callback) {
  const inputElement = document.getElementById("wordInput");
  const ingredientSelectElement = document.getElementById("ingredients-select");
  const ustensilSelectElement = document.getElementById("ustensils-select");
  const applianceSelectElement = document.getElementById("appliance-select");

  // Vérifie si tous les éléments DOM nécessaires sont présents
  if (
    !inputElement ||
    !ingredientSelectElement ||
    !ustensilSelectElement ||
    !applianceSelectElement
  ) {
    console.error("Un ou plusieurs éléments DOM requis sont manquants.");
    return;
  }

  // Déclenche la fonction de rappel à chaque changement d'entrée
  function triggerCallback() {
    const currentWord = sanitizeInput(inputElement.value);

    // Met à jour l'affichage des filtres sélectionnés pour chaque menu déroulant
    updateSelectedFiltersDisplay(
      ingredientSelectElement,
      "selected-ingredients",
      triggerCallback
    );
    updateSelectedFiltersDisplay(
      ustensilSelectElement,
      "selected-ustensils",
      triggerCallback
    );
    updateSelectedFiltersDisplay(
      applianceSelectElement,
      "selected-appliances",
      triggerCallback
    );

    // Récupère les valeurs sélectionnées de chaque menu déroulant
    const selectedIngredients = getSelectedValues(ingredientSelectElement);
    const selectedUstensils = getSelectedValues(ustensilSelectElement);
    const selectedAppliances = getSelectedValues(applianceSelectElement);

    // Appelle la fonction de rappel s'il y a un mot actuel ou des filtres sélectionnés
    if (currentWord.length === 0 || currentWord.length > 2) {
      callback(
        currentWord,
        selectedIngredients,
        selectedUstensils,
        selectedAppliances
      );
    }
  }

  // Ajoute un écouteur d'événements à l'élément d'entrée pour les changements d'entrée
  inputElement.addEventListener("input", triggerCallback);

  // Ajoute des écouteurs d'événements à chaque élément de menu déroulant pour les événements de clic
  [
    { element: ingredientSelectElement, id: "ingredients" },
    { element: ustensilSelectElement, id: "ustensils" },
    { element: applianceSelectElement, id: "appliances" },
  ].forEach(({ element, id }) => {
    element.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        // Bascule la classe "selected" de l'élément LI cliqué
        event.target.classList.toggle("selected");
        // Met à jour l'affichage des filtres sélectionnés pour le menu déroulant correspondant
        updateSelectedFiltersDisplay(
          element,
          `selected-${id}`,
          triggerCallback
        );
        // Déclenche la fonction de rappel
        triggerCallback();
      }
    });
  });
}
