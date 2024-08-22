import { beforeEach, describe, expect, test } from "vitest";
import { SearchAlgorithmLoops } from "../src/script/algo/searchAlgorithm";

const recipes = [
  {
    name: "Tarte aux pommes",
    description: "Une délicieuse tarte avec des pommes et du sucre.",
    ingredients: [
      { ingredient: "Pomme" },
      { ingredient: "Sucre" },
      { ingredient: "Farine" },
    ],
    appliance: "Four",
    ustensils: ["Moule", "Couteau"],
  },
  {
    name: "Poisson grillé",
    description: "Un poisson grillé avec des herbes.",
    ingredients: [
      { ingredient: "Poisson" },
      { ingredient: "Herbes" },
      { ingredient: "Citron" },
    ],
    appliance: "Grill",
    ustensils: ["Grille", "Couteau"],
  },
  {
    name: "Salade de fruits",
    description: "Un mélange de fruits frais.",
    ingredients: [
      { ingredient: "Pomme" },
      { ingredient: "Banane" },
      { ingredient: "Orange" },
    ],
    appliance: "Saladier",
    ustensils: ["Couteau", "Cuillère"],
  },
];

describe("SearchAlgorithmLoops", () => {
  let searchAlgo;

  beforeEach(() => {
    searchAlgo = new SearchAlgorithmLoops();
  });

  test("Cas nominal: Recherche par texte", () => {
    const result = searchAlgo.search(recipes, "tarte");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Tarte aux pommes");
  });

  test("Cas alternatif A1: Aucune recette ne correspond à la recherche", () => {
    const result = searchAlgo.search(recipes, "chocolat");
    expect(result.length).toBe(0);
  });

  test("Cas alternatif A2: Recherche par tag (ingrédient)", () => {
    const result = searchAlgo.search(recipes, "", ["pomme"]);
    expect(result.length).toBe(2); // Devrait retourner "Tarte aux pommes" et "Salade de fruits"
  });

  test("Cas alternatif A3: Recherche avancée avec plusieurs tags", () => {
    const result = searchAlgo.search(
      recipes,
      "",
      ["pomme"],
      ["four"],
      ["moule"]
    );
    expect(result.length).toBe(1); // Devrait retourner seulement "Tarte aux pommes"
  });

  test("Recherche avec plusieurs mots-clés dans différents champs", () => {
    const result = searchAlgo.search(
      recipes,
      "grill",
      [],
      ["grill"],
      ["grille"]
    );
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Poisson grillé");
  });

  test("Filtrage par plusieurs mots-clés d'ingrédients", () => {
    const result = searchAlgo.search(recipes, "", ["pomme", "sucre"]);
    expect(result.length).toBe(1); // Devrait retourner "Tarte aux pommes"
  });

  test("Filtrage par plusieurs ustensiles", () => {
    const result = searchAlgo.search(recipes, "", [], [], ["couteau"]);
    expect(result.length).toBe(3); // Devrait retourner toutes les recettes car toutes utilisent un couteau
  });

  test("Filtrage par appareil spécifique", () => {
    const result = searchAlgo.search(recipes, "", [], ["four"]);
    expect(result.length).toBe(1); // Devrait retourner seulement "Tarte aux pommes"
  });

  test("Filtrage par combinaison d'appareils et d'ingrédients", () => {
    const result = searchAlgo.search(recipes, "", ["pomme"], ["four"], []);
    expect(result.length).toBe(1); // Devrait retourner "Tarte aux pommes"
  });

  test("Recherche avec combinaison de texte et tags", () => {
    const result = searchAlgo.search(
      recipes,
      "grill",
      ["poisson"],
      ["grill"],
      ["grille"]
    );
    expect(result.length).toBe(1); // Devrait retourner "Poisson grillé"
  });
});
