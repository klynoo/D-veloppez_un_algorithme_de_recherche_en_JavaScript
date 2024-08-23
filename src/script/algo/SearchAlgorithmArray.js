// Filtrage par nom
function filterByName(item, searchQuery) {
  return item.name.toLowerCase().includes(searchQuery);
}

// Filtrage par description
function filterByDescription(item, searchQuery) {
  return item.description.toLowerCase().includes(searchQuery);
}

// Filtrage par ingrédients
function filterByIngredients(item, searchQuery) {
  return item.ingredients.some((ingredient) =>
    ingredient.ingredient.toLowerCase().includes(searchQuery)
  );
}

// Filtrage par appareils
function filterByAppliance(item, searchQuery) {
  return item.appliance.toLowerCase().includes(searchQuery);
}

// Filtrage par ustensiles
function filterByUstensils(item, searchQuery) {
  return item.ustensils.some((ustensil) =>
    ustensil.toLowerCase().includes(searchQuery)
  );
}

// Map des options vers leurs fonctions de filtrage respectives
const filterFunctions = {
  name: filterByName,
  description: filterByDescription,
  ingredients: filterByIngredients,
  appliance: filterByAppliance,
  ustensils: filterByUstensils,
};

export class SearchAlgorithmArray {
  // Fonction principale de recherche
  search(
    recipes,
    text = "",
    ingredientsKeywords = [],
    appliancesKeywords = [],
    ustensilsKeywords = []
  ) {
    const searchQuery = text.toLowerCase();

    let results = recipes;

    // Recherche par le texte principal
    if (text.length > 2) {
      results = recipes.filter((item) => {
        return (
          filterFunctions.name(item, searchQuery) ||
          filterFunctions.description(item, searchQuery) ||
          filterFunctions.ingredients(item, searchQuery) ||
          filterFunctions.appliance(item, searchQuery) ||
          filterFunctions.ustensils(item, searchQuery)
        );
      });
    }

    // Filtrer par ingrédients
    if (ingredientsKeywords.length > 0) {
      results = results.filter((recipe) =>
        ingredientsKeywords.every((ing) =>
          recipe.ingredients.some((i) => i.ingredient.toLowerCase() === ing)
        )
      );
    }

    // Filtrer par ustensiles
    if (ustensilsKeywords.length > 0) {
      results = results.filter((recipe) =>
        ustensilsKeywords.every((ust) =>
          recipe.ustensils.some((u) => u.toLowerCase() === ust)
        )
      );
    }

    // Filtrer par appareils
    if (appliancesKeywords.length > 0) {
      results = results.filter((recipe) =>
        appliancesKeywords.includes(recipe.appliance.toLowerCase())
      );
    }

    console.log("Résultats trouvés:", results);
    return results;
  }
}
