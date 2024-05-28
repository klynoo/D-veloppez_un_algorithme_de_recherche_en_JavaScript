import {
  NameDescriptionFilter,
  IngredientFilter,
  UtensilFilter,
} from "./filters.js";

export class SearchAlgorithm {
  search(word, data, options = {}) {
    if (!Array.isArray(data)) {
      return [];
    }

    const filters = [
      new NameDescriptionFilter(word),
      new IngredientFilter(options.includeIngredient),
      new UtensilFilter(options.includeUstensil),
    ];

    return data.filter((recipe) =>
      filters.every((filter) => filter.matches(recipe))
    );
  }
}
