import { describe, it, expect } from "vitest";
import { SearchAlgorithm } from "../src/script/algo/searchAlgorithm";

describe("SearchAlgorithm Tests", () => {
  const searchAlgorithm = new SearchAlgorithm();
  const mockData = [
    {
      name: "Pomme",
      description: "Une pomme rouge",
      ingredients: [{ ingredient: "pomme" }],
      ustensils: ["verres"],
    },
    {
      name: "Banane",
      description: "Un fruit jaune",
      ingredients: [{ ingredient: "banane" }],
      ustensils: ["fourchette", "verres"],
    },
    {
      name: "Cerise",
      description: "Petit fruit rond",
      ingredients: [{ ingredient: "cerise" }],
      ustensils: ["couteau"],
    },
  ];

  it("search doit retourner les bonnes correspondances", () => {
    // Test pour 'pomme'
    const results1 = searchAlgorithm.search("pomme", mockData);
    expect(results1).toHaveLength(1);
    expect(results1[0].name).toBe("Pomme");

    // Test pour 'e'
    const results2 = searchAlgorithm.search("e", mockData);
    expect(results2).toHaveLength(3);
    expect(results2.map((item) => item.name)).toEqual(
      expect.arrayContaining(["Pomme", "Banane", "Cerise"])
    );

    // Test pour 'e' avec option ingredient "cerise"
    const results3 = searchAlgorithm.search("e", mockData, {
      includeIngredient: "cerise",
    });
    expect(results3).toHaveLength(1);
    expect(results3.map((item) => item.name)).toEqual(
      expect.arrayContaining(["Cerise"])
    );

    // Test pour 'n' avec option ingredient "cerise"
    const results4 = searchAlgorithm.search("n", mockData, {
      includeIngredient: "cerise",
    });
    expect(results4).toHaveLength(1);
    expect(results4.map((item) => item.name)).toEqual(
      expect.arrayContaining(["Cerise"])
    );

    // Test pour 'n' avec option ustensil "verres"
    const results5 = searchAlgorithm.search("n", mockData, {
      includeUstensil: "verres",
    });
    expect(results5).toHaveLength(2);
    expect(results5.map((item) => item.name)).toEqual(
      expect.arrayContaining(["Banane"])
    );

    // Test pour 'e' avec option ingredient "cerise" et ustensil "verres"
    const results6 = searchAlgorithm.search("e", mockData, {
      includeIngredient: "cerise",
      includeUstensil: "verres",
    });
    expect(results6).toHaveLength(0);
  });

  it("should handle edge cases gracefully", () => {
    // Test avec une chaîne vide
    const results1 = searchAlgorithm.search("", mockData);
    expect(results1).toHaveLength(0);

    // Test avec des données vides
    const results2 = searchAlgorithm.search("pomme", []);
    expect(results2).toHaveLength(0);

    // Test avec des options vides
    const results3 = searchAlgorithm.search("pomme", mockData, {});
    expect(results3).toHaveLength(1);
    expect(results3[0].name).toBe("Pomme");
  });
});
