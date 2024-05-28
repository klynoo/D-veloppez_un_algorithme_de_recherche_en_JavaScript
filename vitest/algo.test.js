import { describe, it, expect } from "vitest";
import { SearchAlgorithm } from "../src/script/algo/searchAlgorithm";

describe("SearchAlgorithm Tests", () => {
  it("search doit retourner les bonnes correspondances", () => {
    const searchAlgorithm = new SearchAlgorithm();
    const mockData = [
      {
        name: "Pomme",
        description: "Une pomme rouge",
        ingredients: [{ ingredient: "pomme" }],
      },
      {
        name: "Banane",
        description: "Un fruit jaune",
        ingredients: [{ ingredient: "banane" }],
      },
      {
        name: "Cerise",
        description: "Petit fruit rond",
        ingredients: [{ ingredient: "cerise" }],
      },
    ];

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
  });
});
