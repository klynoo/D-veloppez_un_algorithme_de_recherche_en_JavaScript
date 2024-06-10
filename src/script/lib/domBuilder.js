// Classe pour créer des éléments HTML
export class SimpleElementCreator {
  createElement(tagName, id = "", classes = []) {
    const element = document.createElement(tagName);
    if (id) element.id = id;
    classes.forEach((cls) => element.classList.add(cls));
    return element;
  }
}

// Classe pour gérer le contenu des éléments HTML
export class InnerHTMLManager {
  setContent(element, content) {
    element.innerHTML = content;
  }
}

// Classe principale pour construire et manipuler le DOM
export class DOMBuilder {
  constructor(elementCreator, contentManager) {
    this.elementCreator = elementCreator;
    this.contentManager = contentManager;
  }

  buildAndAppend(parent, tagName, content, id = "", classes = []) {
    const element = this.elementCreator.createElement(tagName, id, classes);
    this.contentManager.setContent(element, content);
    parent.appendChild(element);
    return element;
  }
}

// // Exemple d'utilisation
// const creator = new SimpleElementCreator();
// const manager = new InnerHTMLManager();
// const builder = new DOMBuilder(creator, manager);

// // Supposons que nous avons un élément parent disponible
// const parentElement = document.getElementById("content");

// // Construire et ajouter un nouvel élément
// builder.buildAndAppend(parent, "div", "Hello, world!", "newElement", [
//   "my-class",
// ]);
