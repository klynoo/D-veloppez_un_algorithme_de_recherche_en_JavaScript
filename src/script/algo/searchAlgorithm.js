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

export class SearchAlgorithm {
  // Fonction principale de recherche
  search(
    input,
    data,
    options = ["name", "description", "ingredients", "appliance", "ustensils"]
  ) {
    if (input.length < 2) {
      console.log("La taille est inférieure à 3 caractères.");
      return [];
    }

    console.log("La taille fait 3 caractères ou plus.");
    const searchQuery = input.toLowerCase();

    const results = data.filter((item) => {
      return options.some((option) => {
        const filterFunction = filterFunctions[option];
        return filterFunction ? filterFunction(item, searchQuery) : false;
      });
    });

    console.log("Résultats trouvés:", results);
    return results;
  }

  // Fonctions spécialisées pour chaque type de filtre
  searchIngredients(input, data) {
    return this.search(input, data, ["ingredients"]);
  }

  searchAppliances(input, data) {
    return this.search(input, data, ["appliance"]);
  }

  searchUstensils(input, data) {
    return this.search(input, data, ["ustensils"]);
  }

  searchGeneral(input, data) {
    return this.search(input, data, ["name", "description"]);
  }
}
