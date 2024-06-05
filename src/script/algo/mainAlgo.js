import { DynamicSelect } from "./dropDownSearch.js";
import { SearchAlgorithm } from "./searchAlgorithm.js";
import { setupInputTracker } from "./setupInputTracker.js";

export function createMainAlgo() {
  const searchAlgorithm = new SearchAlgorithm();
  let wordFilter = "";
  let ingredientFilters = [];
  let ustensilFilters = [];
  let applianceFilters = [];

  function performSearch(data) {
    let results = data;

    if (wordFilter.length > 2) {
      results = searchAlgorithm.searchGeneral(wordFilter, results);
    }

    if (ingredientFilters.length > 0) {
      results = results.filter((recipe) =>
        ingredientFilters.every((ing) =>
          recipe.ingredients.some((i) => i.ingredient.toLowerCase() === ing)
        )
      );
    }

    if (ustensilFilters.length > 0) {
      results = results.filter((recipe) =>
        ustensilFilters.every((ust) =>
          recipe.ustensils.some((u) => u.toLowerCase() === ust)
        )
      );
    }

    if (applianceFilters.length > 0) {
      results = results.filter((recipe) =>
        applianceFilters.includes(recipe.appliance.toLowerCase())
      );
    }

    console.log(`Résultats de recherche pour : ${wordFilter}`);
    console.log("Recettes trouvées :", results);
    console.log("Ingrédients sélectionnés :", ingredientFilters);
    console.log("Ustensiles sélectionnés :", ustensilFilters);
    console.log("Appareils sélectionnés :", applianceFilters);
  }

  function initialize(data) {
    ["ingredients", "appliance", "ustensils"].forEach((type) => {
      new DynamicSelect(`${type}-select`, data, type);
    });

    setupInputTracker(
      (word, selectedIngredients, selectedUstensils, selectedAppliances) => {
        wordFilter = word;
        ingredientFilters = selectedIngredients;
        ustensilFilters = selectedUstensils;
        applianceFilters = selectedAppliances;

        performSearch(data);
      }
    );
  }

  return { initialize };
}
