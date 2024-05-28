export class ApiFetch {
  constructor(filePath) {
    this.filePath = filePath;
  }

  fetchData(callback) {
    fetch(this.filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la lecture du fichier : " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la lecture du fichier :", error)
      );
  }
}
