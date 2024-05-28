import { DynamicSelect } from "./dropDownSearch.js";
import { SearchAlgorithm } from "./searchAlgorithm.js";
import { setupInputTracker } from "./setupInputTracker.js";

export function createMainAlgo() {
  let selectors = [];
  let searchAlgorithm = new SearchAlgorithm();

  function initialize(data, searchOptions) {
    selectors.push(
      new DynamicSelect("ingredients-select", data, "ingredients")
    );
    selectors.push(new DynamicSelect("ustensils-select", data, "ustensils"));

    setupInputTracker((word, selectedIngredients, selectedUstensils) => {
      const results = searchAlgorithm.search(word, data, {
        ...searchOptions,
        includeIngredient: selectedIngredients,
        includeUstensil: selectedUstensils,
      });

      console.log(`Résultats de recherche pour : ${word}`);
      console.log("Recettes trouvées :", results);
      console.log("Ingrédients sélectionnés :", selectedIngredients);
      console.log("Ustensiles sélectionnés :", selectedUstensils);
    });
  }

  return { initialize };
}
