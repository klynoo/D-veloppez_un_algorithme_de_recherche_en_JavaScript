import { ApiFetch } from "./api/ApiFetch.js";
import { createMainAlgo } from "./algo/mainAlgo.js";
import { Dropdown } from "./component/dropdown.js";
import { recipeTemplate } from "./template/templateIndex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const apiFetcher = new ApiFetch("./asset/data/recipes.json");
  let globalData = null;
  let mainAlgoInstance = createMainAlgo();

  try {
    const recipesData = await apiFetcher.fetchData();
    if (recipesData && recipesData.length > 0) {
      console.log("Data fetched successfully:", recipesData);
      globalData = recipesData;
      mainAlgoInstance.initialize(recipesData, {
        includeDescription: true,
        includeIngredients: false,
      });
      console.log("Initialization complete");
      const mainRecipe = document.getElementById("main-recipe");

      // Parcourir toutes les recettes et les ajouter au DOM
      recipesData.forEach((recipe) => {
        const recipeElement = recipeTemplate(recipe);
        mainRecipe.appendChild(recipeElement);
      });
    } else {
      console.log("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error in fetching data:", error);
  }

  // Configuration pour les dropdowns
  const configs = [
    {
      dropdownSelector: "#dropdown-ingredients",
      buttonSelector: "#dropdown__btn-ingredients",
      contentSelector: "#myDropdown-ingredients",
      searchInputSelector: "#ingredients-search",
    },
    {
      dropdownSelector: "#dropdown-appliance",
      buttonSelector: "#dropdown__btn-appliance",
      contentSelector: "#myDropdown-appliance",
      searchInputSelector: "#appliance-search",
    },
    {
      dropdownSelector: "#dropdown-ustensiles",
      buttonSelector: "#dropdown__btn-ustensiles",
      contentSelector: "#myDropdown-ustensiles",
      searchInputSelector: "#ustensiles-search",
    },
  ];

  const dropdowns = configs.map((config) => new Dropdown(config));

  document.addEventListener(
    "click",
    (event) => {
      Dropdown.closeAllDropdowns(event, dropdowns);
    },
    false
  );
});
