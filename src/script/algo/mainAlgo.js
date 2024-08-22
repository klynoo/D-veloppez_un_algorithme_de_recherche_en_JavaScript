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

  function performSearch(data) {
    let results = data;

    results = searchAlgorithm.search(
      results,
      wordFilter,
      ingredientFilters,
      applianceFilters,
      ustensilFilters
    );

    // Afficher les résultats de recherche et les filtres sélectionnés
    console.log(`Résultats de recherche pour : ${wordFilter}`);
    console.log("Recettes trouvées :", results);
    console.log("Ingrédients sélectionnés :", ingredientFilters);
    console.log("Ustensiles sélectionnés :", ustensilFilters);
    console.log("Appareils sélectionnés :", applianceFilters);

    const mainRecipe = document.getElementById("main-recipe");

    // Supprimer le contenu existant de l'élément mainRecipe
    while (mainRecipe.firstChild) {
      mainRecipe.removeChild(mainRecipe.firstChild);
    }

    // Vérifier s'il y a des résultats
    if (results.length === 0) {
      // Si aucun résultat n'est trouvé, afficher un message personnalisé
      const noResultMessage = document.createElement("p");
      noResultMessage.textContent = `Aucune recette ne contient '${wordFilter}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
      mainRecipe.appendChild(noResultMessage);
    } else {
      // Parcourir toutes les recettes et les ajouter au DOM
      results.forEach((recipe) => {
        const recipeElement = recipeTemplate(recipe);
        mainRecipe.appendChild(recipeElement);
      });
    }

    // Mettre à jour le compteur de recettes
    const CompteurRecipe = document.getElementById("number-recipe");
    if (!CompteurRecipe) {
      console.error("Element non trouvé");
    }
    CompteurRecipe.innerHTML = "";
    CompteurRecipe.innerHTML = `${results.length} recette${
      results.length > 1 ? "s" : ""
    }`;
  }

  function initialize(data) {
    console.log("Initialisation de l'algorithme principal");
    // Initialiser les menus déroulants dynamiques
    ["ingredients", "appliance", "ustensils"].forEach((type) => {
      new DynamicSelect(`${type}-select`, data, type);
      new SearchFilter(`${type}-select`, data, type);
    });
    // Configurer le suivi des entrées utilisateur
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
