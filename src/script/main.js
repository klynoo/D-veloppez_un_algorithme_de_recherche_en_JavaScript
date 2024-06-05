import { ApiFetch } from "./api/ApiFetch.js";
import { createMainAlgo } from "./algo/mainAlgo.js";
import { Dropdown } from "./component/dropdow.js";

document.addEventListener("DOMContentLoaded", async () => {
  const apiFetcher = new ApiFetch("./asset/data/recipes.json");
  let globalData = null;
  let mainAlgoInstance = createMainAlgo();

  try {
    const data = await apiFetcher.fetchData();
    if (data) {
      console.log("Data fetched successfully:", data);
      globalData = data;
      mainAlgoInstance.initialize(data, {
        includeDescription: true,
        includeIngredients: false,
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
