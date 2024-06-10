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

// Filtrage par ustensils
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
  ustensils: filterByUstensils,
};

// Fonction principale de recherche
export function searchAlgorithm(
  input,
  data,
  options = ["name", "description", "ingredients", "ustensils"]
) {
  if (input.length < 3) {
    console.log("La taille est inférieure à 3 caractères.");
    return [];
  }

  console.log("La taille fait 3 caractères ou plus.");
  const searchQuery = input.toLowerCase();

  const results = data.filter((item) => {
    return options.some((option) => {
      const filterFunction = filterFunctions[option];
      if (filterFunction) {
        return filterFunction(item, searchQuery);
      }
      return false;
    });
  });

  console.log("Résultats trouvés:", results);
  return results;
}
