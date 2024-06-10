import { recipeTemplate } from "../src/script/template/templateIndex";

describe("Tests for recipeTemplate", () => {
  const data = {
    name: "Pomme",
    description: "Une pomme rouge",
    ingredients: [
      { ingredient: "pomme", quantity: 1, unit: "unit" },
      { ingredient: "sucre", quantity: 2, unit: "tbsp" },
    ],
  };

  it("should generate the correct structure for the recipe", () => {
    const result = recipeTemplate(data);

    // Check if the article element is created
    expect(result.tagName).toBe("ARTICLE");
    expect(result.classList.contains("recipe")).toBeTruthy();

    // Check if the image container and image element are created
    const imgContainer = result.querySelector(".recipe__img");
    expect(imgContainer).toBeTruthy();
    const img = imgContainer.querySelector("img");
    expect(img).toBeTruthy();
    expect(img.alt).toBe(data.name);

    // Check if the container element is created
    const container = result.querySelector(".recipe__container");
    expect(container).toBeTruthy();

    // Check if the title, subtitle, and description elements are created
    const title = container.querySelector("h2");
    expect(title).toBeTruthy();
    expect(title.textContent).toBe(data.name);
    const subtitle = container.querySelector("h3");
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent).toBe("Recette");
    const description = container.querySelector("p");
    expect(description).toBeTruthy();
    expect(description.textContent).toBe(data.description);

    // Check if the ingredients container and list are created
    const ingredientsContainer = container.querySelector(
      ".recipe__ingredients"
    );
    expect(ingredientsContainer).toBeTruthy();
    const ul = ingredientsContainer.querySelector("ul");
    expect(ul).toBeTruthy();

    // Check if the ingredients list items are created correctly
    const liElements = ul.querySelectorAll("li");
    expect(liElements.length).toBe(data.ingredients.length);
    liElements.forEach((li, index) => {
      const ing = data.ingredients[index];
      let expectedText = ing.ingredient;
      if (ing.quantity) {
        expectedText += `: ${ing.quantity}`;
      }
      if (ing.unit) {
        expectedText += ` ${ing.unit}`;
      }
      expect(li.textContent).toBe(expectedText);
    });
  });
});
