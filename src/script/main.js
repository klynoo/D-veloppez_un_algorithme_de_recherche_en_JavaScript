import { ApiFetch } from "./api/ApiFetch.js";
import {
  SearchAlgorithm,
  SelectionBasedSearch,
} from "./algo/searchAlgorithm.js";
import { setupInputTracker } from "./algo/setupInputTracker.js";
import { DynamicSelect } from "./algo/dropDownSearch.js";

// Initialisation de l'API fetcher avec le chemin vers vos données JSON
const apiFetcher = new ApiFetch("./asset/data/recipes.json");
const searchAlgorithm = new SearchAlgorithm();

let globalData = null;

apiFetcher.fetchData((data) => {
  globalData = data;

  new DynamicSelect("ingredients-select", data, "ingredients");
  new DynamicSelect("ustensils-select", data, "ustensils");

  setupInputTracker((word) => {
    const results = searchAlgorithm.search(word, data);
    const resultCountElement = document.getElementById("resultCount");
    resultCountElement.textContent = `${results.length} résultats trouvés`;
    console.log(
      "Résultats de recherche :",
      results.length,
      "résultats trouvés"
    );
    console.log("Détails :", results);
  });
});

document.addEventListener("click", () => {
  if (!globalData) {
    console.error("Données non chargées !");
    return;
  }

  const selectionBasedSearch = new SelectionBasedSearch("ingredients-select");
  const results = selectionBasedSearch.performSearch(globalData);
  console.log("Résultats de recherche par sélection :", results);
});
