const markupFields: HTMLButtonElement[] = Array.from(
  document.querySelectorAll(".game button")
);
const turn = document.querySelector(".turn");
const imgTurn = turn?.querySelector("img");
const positions = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

let scoreX = document.querySelector(".scoreX");
let scoreO = document.querySelector(".scoreO");
let x = 1;
let o = 1;
let heldPositions: any[] | number[] = [];
let currentPlayer = "X";

const addEvents = (fields: HTMLButtonElement[]) => {
  fields.forEach((btn) => {
    btn.addEventListener("click", turnPlayer);
  });
};

function turnPlayer({ currentTarget }: Event) {
  currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");

  if (currentTarget instanceof HTMLButtonElement && turn && imgTurn) {
    turn.innerHTML = `Vez do Jogador: <img src="${
      currentPlayer === "X"
        ? (imgTurn.src = "../assets/o.png")
        : (imgTurn.src = "../assets/x.png")
    }" alt="player"/>`;

    if (imgTurn instanceof HTMLImageElement && currentPlayer === "X") {
      currentTarget.style.backgroundImage = "url(../assets/x.png)";
      imgTurn.src = "../assets/x.png";
    } else if (currentPlayer === "O" && imgTurn instanceof HTMLImageElement) {
      currentTarget.style.backgroundImage = "url(../assets/o.png)";
      imgTurn.src = "../assets/o.png";
    }

    currentTarget.classList.add("filled");
    currentTarget.removeEventListener("click", turnPlayer);

    checkWinner(currentTarget);
  }
}

function checkWinner(btn: HTMLButtonElement) {
  heldPositions[Number(btn.dataset.i)] = currentPlayer;
  const itens = heldPositions
    .map((item, i) => [item, i])
    .filter((item) => item[0] === currentPlayer)
    .map((item) => item[1]);
  tie();
  for (const pos of positions) {
    if (pos.every((item) => itens.includes(item))) {
      finishGame();
    }
  }
}

function finishGame() {
  if (
    turn &&
    imgTurn &&
    scoreO instanceof HTMLElement &&
    scoreX instanceof HTMLElement
  ) {
    turn.innerHTML = `O jogador <img src="${
      currentPlayer === "X"
        ? (imgTurn.src = "../assets/x.png")
        : (imgTurn.src = "../assets/o.png")
    }" alt="player"/> venceu!`;
    currentPlayer === "X"
      ? (scoreX.innerText = String(x++))
      : (scoreO.innerText = String(o++));
    markupFields.forEach((btn) => {
      btn.removeEventListener("click", turnPlayer);
      setTimeout(() => {
        addEvents(markupFields);
        currentPlayer = "X";
        heldPositions = [];
        if (turn && imgTurn)
          turn.innerHTML = `Vez do Jogador: <img src="${
            currentPlayer === "X"
              ? (imgTurn.src = "../assets/o.png")
              : (imgTurn.src = "../assets/x.png")
          }" alt="player"/>`;
        markupFields.forEach((btn) => {
          btn.style.backgroundImage = "";
          btn.classList.remove("filled");
        });
      }, 1500);
    });
  }
}

function tie() {
  if (heldPositions.filter((item: number) => item).length === 9) {
    if (turn instanceof HTMLElement) turn.innerText = "Empate";

    setTimeout(() => {
      addEvents(markupFields);
      currentPlayer = "X";
      heldPositions = [];
      if (turn && imgTurn)
        turn.innerHTML = `Vez do Jogador: <img src="${
          currentPlayer === "X"
            ? (imgTurn.src = "../assets/o.png")
            : (imgTurn.src = "../assets/x.png")
        }" alt="player"/>`;
      markupFields.forEach((btn) => {
        btn.style.backgroundImage = "";
        btn.classList.remove("filled");
      });
    }, 1500);
  }
}

addEvents(markupFields);
