function sanitizeInput(input) {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
}

export function setupInputTracker(callback) {
  const inputElement = document.getElementById("wordInput");

  inputElement.addEventListener("input", (event) => {
    let currentWord = inputElement.value;
    currentWord = sanitizeInput(currentWord);
    inputElement.value = currentWord;

    console.log("Current word:", currentWord);
    callback(currentWord);
  });
}

document.addEventListener("DOMContentLoaded", () =>
  setupInputTracker((word) => {
    console.log(`Mot actuel: ${word}`);
  })
);
