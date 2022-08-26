const O_CLASS = "o";
const X_CLASS = "x";
const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll(".cell");
const resultText = document.querySelector(".result-text");
const resultMessageBlock = document.querySelector(".result-message");
const playAgainButton = document.querySelector(".play-again-btn");
let OsTurn = false;

const checkWin = () => {
  return WIN_COMBINATIONS.some((comb) => {
    return comb.every((i) =>
      cellElements[i].classList.contains(OsTurn ? O_CLASS : X_CLASS)
    );
  });
};

const checkDraw = () => {
  return [...cellElements].every(
    (el) => el.classList.contains(O_CLASS) || el.classList.contains(X_CLASS)
  );
};

const clickHandler = (e) => {
  e.target.classList.add(OsTurn ? O_CLASS : X_CLASS);

  if (checkWin()) {
    resultText.textContent = `${OsTurn ? "O's" : "X's"} win!`;
    resultMessageBlock.classList.add("show");
  } else if (checkDraw()) {
    resultText.textContent = "Draw!";
    resultMessageBlock.classList.add("show");
  } else {
    OsTurn = !OsTurn;
  }
};

const resetGame = () => {
  resultMessageBlock.classList.remove("show");
  cellElements.forEach((el) => {
    el.removeEventListener("click", clickHandler);
    el.classList.remove(O_CLASS);
    el.classList.remove(X_CLASS);
  });

  startGame();
};

playAgainButton.addEventListener("click", resetGame);

const startGame = () => {
  cellElements.forEach((el) => {
    el.addEventListener("click", clickHandler, { once: true });
  });
};

startGame();
