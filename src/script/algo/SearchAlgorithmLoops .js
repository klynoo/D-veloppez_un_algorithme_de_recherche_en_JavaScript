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

export class SearchAlgorithmLoops {
  // Fonction principale de recherche
  search(
    recipes,
    text = "",
    ingredientsKeywords = [],
    appliancesKeywords = [],
    ustensilsKeywords = []
  ) {
    const searchQuery = text.toLowerCase();
    let results = recipes; // Initialiser avec toutes les recettes

    // Recherche par le texte principal
    if (text.length > 2) {
      const tempResults = [];
      for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (
          filterFunctions.name(item, searchQuery) ||
          filterFunctions.description(item, searchQuery) ||
          filterFunctions.ingredients(item, searchQuery) ||
          filterFunctions.appliance(item, searchQuery) ||
          filterFunctions.ustensils(item, searchQuery)
        ) {
          tempResults.push(item);
        }
      }
      results = tempResults;
    }

    // Filtrer par ingrédients
    if (ingredientsKeywords.length > 0) {
      const tempResults = [];
      for (let i = 0; i < results.length; i++) {
        const recipe = results[i];
        let allIngredientsMatch = true;
        for (let j = 0; j < ingredientsKeywords.length; j++) {
          const ing = ingredientsKeywords[j].toLowerCase();
          if (
            !recipe.ingredients.some((i) => i.ingredient.toLowerCase() === ing)
          ) {
            allIngredientsMatch = false;
            break;
          }
        }
        if (allIngredientsMatch) {
          tempResults.push(recipe);
        }
      }
      results = tempResults;
    }

    // Filtrer par ustensiles
    if (ustensilsKeywords.length > 0) {
      const tempResults = [];
      for (let i = 0; i < results.length; i++) {
        const recipe = results[i];
        let allUstensilsMatch = true;
        for (let j = 0; j < ustensilsKeywords.length; j++) {
          const ust = ustensilsKeywords[j].toLowerCase();
          if (!recipe.ustensils.some((u) => u.toLowerCase() === ust)) {
            allUstensilsMatch = false;
            break;
          }
        }
        if (allUstensilsMatch) {
          tempResults.push(recipe);
        }
      }
      results = tempResults;
    }

    // Filtrer par appareils
    if (appliancesKeywords.length > 0) {
      const tempResults = [];
      for (let i = 0; i < results.length; i++) {
        const recipe = results[i];
        if (appliancesKeywords.includes(recipe.appliance.toLowerCase())) {
          tempResults.push(recipe);
        }
      }
      results = tempResults;
    }

    console.log("Résultats trouvés:", results);
    return results;
  }
}
