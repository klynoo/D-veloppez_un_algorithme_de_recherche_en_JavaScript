export class SearchAlgorithm {
  search(word, data) {
    const lowerCaseWord = word.toLowerCase();
    console.log("Mot de recherche:", lowerCaseWord);

    return data.filter((recipe) => {
      const nameMatch = recipe.name.toLowerCase().includes(lowerCaseWord);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(lowerCaseWord);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(lowerCaseWord)
      );

      console.log("Vérification de la recette:", recipe.name);
      console.log("Description:", recipe.description);
      console.log("Description Match:", descriptionMatch);

      return nameMatch || descriptionMatch || ingredientsMatch;
    });
  }
}

export class SelectionBasedSearch extends searchAlgorithm {
  constructor(selectId) {
    this.select = document.getElementById(selectId);
  }

  getSelectedValue() {
    if (this.select.selectedIndex !== -1) {
      return this.select.options[this.select.selectedIndex].value;
    }
    return null;
  }

  performSearch(data) {
    const selectedValue = this.getSelectedValue();
    console.log(selectedValue);
    if (selectedValue) {
      return searchAlgorithm.search(selectedValue, data);
    } else {
      console.error("No selection made.");
      return [];
    }
  }
}
