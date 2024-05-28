export class ApiFetch {
  constructor(filePath) {
    this.filePath = filePath;
    this.cache = null;
  }

  async fetchData() {
    if (this.cache) {
      return this.cache;
    }
    try {
      const response = await fetch(this.filePath);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la lecture du fichier : " + response.statusText
        );
      }
      this.cache = await response.json();
      return this.cache;
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
      throw error;
    }
  }
}
