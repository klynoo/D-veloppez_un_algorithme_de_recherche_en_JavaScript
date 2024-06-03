import { ApiFetch } from "./api/ApiFetch.js";
import { createMainAlgo } from "./algo/mainAlgo.js";
import { Dropdown } from "./component/dropdow.js";

const apiFetcher = new ApiFetch("./asset/data/recipes.json");

let globalData = null;

// Algorithm de recherche
let mainAlgoInstance = createMainAlgo();

apiFetcher.fetchData((data) => {
  globalData = data;
  mainAlgoInstance.initialize(data, {
    includeDescription: true,
    includeIngredients: false,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Configuration pour le premier dropdown
  const dropdownConfig = {
    dropdownSelector: ".dropdown",
    buttonSelector: "#dropdown__btn",
    contentSelector: ".dropdown-content",
    searchInputSelector: "#ingredients-search",
  };

  const dropdown1 = new Dropdown(dropdownConfig);

  const dropdowns = [dropdown1];

  document.addEventListener(
    "click",
    (event) => {
      Dropdown.closeAllDropdowns(event, dropdowns);
    },
    false
  );
});
