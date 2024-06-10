import {
  DOMBuilder,
  InnerHTMLManager,
  SimpleElementCreator,
} from "../lib/domBuilder.js";

const creator = new SimpleElementCreator();
const contentManager = new InnerHTMLManager();
const builder = new DOMBuilder(creator, contentManager);

// Fonction pour générer la structure de la recette
export function recipeTemplate(data) {
  const { name, description, /* image */ ingredients } = data;

  // Création de l'article principal pour la recette
  const article = creator.createElement("article", "", ["recipe"]);
  const imgContainer = creator.createElement("div", "", ["recipe__img"]);
  const img = creator.createElement("img");
  /*   img.src = image; */
  img.alt = name;
  imgContainer.appendChild(img);
  article.appendChild(imgContainer);

  const container = creator.createElement("div", "", ["recipe__container"]);
  article.appendChild(container);

  // Ajout du titre, sous-titre et description
  builder.buildAndAppend(container, "h2", name);
  builder.buildAndAppend(container, "h3", "Recette");
  builder.buildAndAppend(container, "p", description);

  // Création du conteneur pour les ingrédients
  const ingredientsContainer = builder.buildAndAppend(
    container,
    "div",
    null,
    "",
    ["recipe__ingredients"]
  );
  builder.buildAndAppend(ingredientsContainer, "h3", "Ingrédients");

  const ul = creator.createElement("ul");
  ingredients.forEach((ing) => {
    const li = creator.createElement("li");
    // Gestion des unités et quantités pour chaque ingrédient
    let text = ing.ingredient;
    if (ing.quantity) {
      text += `: ${ing.quantity}`;
    }
    if (ing.unit) {
      text += ` ${ing.unit}`;
    }
    li.textContent = text;
    ul.appendChild(li);
  });
  ingredientsContainer.appendChild(ul);
  return article;
}
