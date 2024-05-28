class Filter {
  matches(recipe) {
    throw new Error("Method 'matches' must be implemented.");
  }
}

export class NameDescriptionFilter extends Filter {
  constructor(word) {
    super();
    this.word = word.toLowerCase();
  }

  matches(recipe) {
    const searchFields = [recipe.name, recipe.description];
    return this.word
      ? searchFields.some((field) => field.toLowerCase().includes(this.word))
      : true;
  }
}

export class IngredientFilter extends Filter {
  constructor(ingredient) {
    super();
    this.ingredient = ingredient ? ingredient.toLowerCase() : null;
  }

  matches(recipe) {
    return this.ingredient
      ? recipe.ingredients.some(
          (ing) => ing.ingredient.toLowerCase() === this.ingredient
        )
      : true;
  }
}

export class UtensilFilter extends Filter {
  constructor(utensil) {
    super();
    this.utensil = utensil ? utensil.toLowerCase() : null;
  }

  matches(recipe) {
    return this.utensil
      ? recipe.utensils.some(
          (utensil) => utensil.toLowerCase() === this.utensil
        )
      : true;
  }
}
