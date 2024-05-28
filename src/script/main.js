import { ApiFetch } from "./api/ApiFetch.js";
import { createMainAlgo } from "./algo/mainAlgo.js";

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
