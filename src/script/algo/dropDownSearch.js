// class pour créer un menu deroulant

export class DynamicSelect {
  constructor(id, recipes, type) {
    this.selectElement = document.getElementById(id);
    if (!this.selectElement) {
      console.error("L'élément select avec l'ID spécifié n'existe pas :", id);
      return;
    }
    this.recipes = recipes;
    this.type = type;
    this.populateSelect();
  }

  extractElements() {
    const allElements = new Set();
    this.recipes.forEach((recipe) => {
      if (this.type === "ingredients") {
        recipe.ingredients.forEach((ingredients) => {
          allElements.add(ingredients.ingredient);
        });
      } else if (this.type === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          allElements.add(ustensil);
        });
      } else if (this.type === "appliances") {
        allElements.add(recipe.appliance);
      }
    });
    return Array.from(allElements);
  }

  // Ajouter des options au select basé sur les éléments extraits
  addOptions(options) {
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText.toLowerCase();
      option.textContent = optionText;
      this.selectElement.appendChild(option);
    });
  }

  // Fonction pour initialiser et remplir le select
  populateSelect() {
    const elements = this.extractElements();
    this.addOptions(elements);
  }
}
