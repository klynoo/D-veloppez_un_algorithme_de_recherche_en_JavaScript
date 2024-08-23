import {
  DynamicSelect,
  SearchFilter,
} from "../component/dropDown/dropdownUI.js";
import {
  SearchAlgorithmArray,
  SearchAlgorithmLoops,
} from "./searchAlgorithm.js";
import { setupInputTracker } from "./setupInputTracker.js";
import { recipeTemplate } from "../template/templateIndex.js";

export function createMainAlgo() {
  const searchAlgorithm = new SearchAlgorithmArray();
  let wordFilter = "";
  let ingredientFilters = [];
  let ustensilFilters = [];
  let applianceFilters = [];

  let ingredientDropdown, applianceDropdown, ustensilDropdown;

  function performSearch(data) {
    let results = data;

    results = searchAlgorithm.search(
      results,
      wordFilter,
      ingredientFilters,
      applianceFilters,
      ustensilFilters
    );

    const mainRecipe = document.getElementById("main-recipe");

    // Supprimer le contenu existant de l'élément mainRecipe
    while (mainRecipe.firstChild) {
      mainRecipe.removeChild(mainRecipe.firstChild);
    }

    // Vérifier s'il y a des résultats
    if (results.length === 0) {
      const noResultMessage = document.createElement("p");
      noResultMessage.textContent = `Aucune recette ne contient '${wordFilter}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
      mainRecipe.appendChild(noResultMessage);
    } else {
      results.forEach((recipe) => {
        const recipeElement = recipeTemplate(recipe);
        mainRecipe.appendChild(recipeElement);
      });
    }

    const CompteurRecipe = document.getElementById("number-recipe");
    if (!CompteurRecipe) {
      console.error("Element non trouvé");
    }
    CompteurRecipe.innerHTML = "";
    CompteurRecipe.innerHTML = `${results.length} recette${
      results.length > 1 ? "s" : ""
    }`;

    // Rafraîchir les filtres dynamiques en fonction des recettes restantes
    ingredientDropdown.refresh(results);
    applianceDropdown.refresh(results);
    ustensilDropdown.refresh(results);
  }

  function initialize(data) {
    console.log("Initialisation de l'algorithme principal");

    ingredientDropdown = new SearchFilter(
      "ingredients-select",
      data,
      "ingredients"
    );
    applianceDropdown = new SearchFilter("appliance-select", data, "appliance");
    ustensilDropdown = new SearchFilter("ustensils-select", data, "ustensils");

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
