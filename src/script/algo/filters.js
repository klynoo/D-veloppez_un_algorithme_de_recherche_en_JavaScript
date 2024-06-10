// class Filter {
//   matches(recipe) {
//     throw new Error("Method 'matches' must be implemented.");
//   }
// }

// export class NameDescriptionFilter extends Filter {
//   constructor(word) {
//     super();
//     this.word = word ? word.toLowerCase() : "";
//   }

//   matches(recipe) {
//     const searchFields = [recipe.name, recipe.description];
//     return this.word
//       ? searchFields.some((field) => field?.toLowerCase().includes(this.word))
//       : true;
//   }
// }

// export class IngredientFilter extends Filter {
//   constructor(ingredient) {
//     super();
//     this.ingredient = ingredient ? ingredient.toLowerCase() : null;
//   }

//   matches(recipe) {
//     return this.ingredient
//       ? recipe.ingredients.some(
//           (ing) => ing.ingredient?.toLowerCase() === this.ingredient
//         )
//       : true;
//   }
// }

// export class UstensilFilter extends Filter {
//   constructor(ustensil) {
//     super();
//     this.ustensil = ustensil ? ustensil.toLowerCase() : null;
//   }

//   matches(recipe) {
//     return this.ustensil
//       ? recipe.ustensils.some(
//           (ustensil) => ustensil?.toLowerCase() === this.ustensil
//         )
//       : true;
//   }
// }
