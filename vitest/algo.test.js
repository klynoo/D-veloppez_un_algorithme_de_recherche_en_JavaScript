import { describe, it, expect } from "vitest";
import { SearchAlgorithm } from "../src/script/algo/searchAlgorithm";

// Initialisation de la classe SearchAlgorithm
const searchAlgorithm = new SearchAlgorithm();

describe("Tests de SearchAlgorithm", () => {
  const donneesTest = [
    {
      name: "Pomme",
      description: "Une pomme rouge",
      ingredients: [{ ingredient: "pomme" }],
      ustensils: ["verre"],
      appliance: "blender",
    },
    {
      name: "Banane",
      description: "Un fruit jaune",
      ingredients: [{ ingredient: "banane" }],
      ustensils: ["fourchette", "verre"],
      appliance: "mixeur",
    },
    {
      name: "Cerise",
      description: "Petit fruit rond",
      ingredients: [{ ingredient: "cerise" }],
      ustensils: ["couteau"],
      appliance: "robot",
    },
    {
      name: "gateau pomme poire",
      description: "Une pomme rouge",
      ingredients: [{ ingredient: "pomme" }, { ingredient: "poire" }],
      ustensils: ["verre"],
      appliance: "four",
    },
  ];

  it("ne doit pas retourner de résultats si l'entrée contient moins de 2 caractères", () => {
    const resultats = searchAlgorithm.search("p", donneesTest);
    expect(resultats).toHaveLength(0);
  });

  it("doit filtrer les recettes contenant 'pomme' dans les ingrédients", () => {
    const resultats = searchAlgorithm.searchIngredients("pomme", donneesTest);
    expect(resultats).toHaveLength(2);
    expect(resultats.some((r) => r.name === "Pomme")).toBeTruthy();
    expect(resultats.some((r) => r.name === "gateau pomme poire")).toBeTruthy();
  });

  it("doit filtrer les recettes contenant 'pomme' dans les ingrédients et 'Une' dans la description", () => {
    const resultats = searchAlgorithm.searchGeneral("pomme", donneesTest);
    const resultatsFinaux = resultats.filter((r) =>
      r.description.toLowerCase().includes("une")
    );
    expect(resultatsFinaux).toHaveLength(2);
    expect(resultatsFinaux.some((r) => r.name === "Pomme")).toBeTruthy();
    expect(
      resultatsFinaux.some((r) => r.name === "gateau pomme poire")
    ).toBeTruthy();
  });

  it("doit filtrer les recettes contenant 'pomme' dans les ingrédients, 'Une' dans la description, et 'verre' dans les ustensiles", () => {
    const resultats = searchAlgorithm.search("pomme", donneesTest, [
      "ingredients",
      "description",
      "ustensils",
    ]);
    const resultatsFinaux = resultats.filter(
      (r) =>
        r.description.toLowerCase().includes("une") &&
        r.ustensils.includes("verre")
    );
    expect(resultatsFinaux).toHaveLength(2);
    expect(resultatsFinaux.some((r) => r.name === "Pomme")).toBeTruthy();
    expect(
      resultatsFinaux.some((r) => r.name === "gateau pomme poire")
    ).toBeTruthy();
  });

  it("doit filtrer les recettes contenant 'pomme' dans les ingrédients et à la fois 'verre' et 'couteau' dans les ustensiles", () => {
    const resultats = searchAlgorithm.search("pomme", donneesTest, [
      "ingredients",
      "ustensils",
    ]);
    const resultatsFinaux = resultats.filter(
      (r) => r.ustensils.includes("verre") && r.ustensils.includes("couteau")
    );
    expect(resultatsFinaux).toHaveLength(0);
  });

  it("doit filtrer les recettes contenant 'blender' comme appareil", () => {
    const resultats = searchAlgorithm.searchAppliances("blender", donneesTest);
    expect(resultats).toHaveLength(1);
    expect(resultats.some((r) => r.name === "Pomme")).toBeTruthy();
  });
});
