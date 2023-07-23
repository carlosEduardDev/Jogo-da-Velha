class Game {
  markupFields: HTMLButtonElement[];
  currentPlayer: string;
  winningPositions: number[][];
  heldPositions: number[] | string[];
  turn: HTMLHeadElement | null;
  constructor(markupFields: string, turn: string) {
    this.markupFields = Array.from(document.querySelectorAll(markupFields));
    this.currentPlayer = "X";
    this.turn = document.querySelector(turn);
    this.winningPositions = [
      [1, 2, 3],
      [1, 4, 7],
      [1, 5, 9],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];
    this.heldPositions = [];

    this.turnPlayer = this.turnPlayer.bind(this);
  }

  checkWinner(btn: HTMLButtonElement) {
    this.heldPositions[Number(btn.dataset.i)] = this.currentPlayer;
    const itens = this.heldPositions
      .map((item, i) => [item, i])
      .filter((item) => item[0] === this.currentPlayer)
      .map((item) => item[1]);

    setTimeout(() => {
      for (let pos of this.winningPositions) {
        if (pos.every((item) => itens.includes(item))) {
          if (this.turn) {
            this.turn.innerText =
              "o jogador " + this.currentPlayer + " ganhou !";
            this.markupFields.forEach((btn) => {
              btn.removeEventListener("click", this.turnPlayer);
              setTimeout(() => {
                this.init();
                this.currentPlayer = "X";
                this.heldPositions = [];
                this.markupFields.forEach((btn) => {
                  btn.innerText = "";
                  if (this.turn) this.turn.innerText = "Vez do Jogador: O";
                  btn.classList.remove("filled");
                });
              }, 2000);
            });
          }
        }
      }
      if (this.heldPositions.filter((item: number) => item).length === 9) {
        if (this.turn) this.turn.innerText = "EMPATE";
        setTimeout(() => {
          this.init();
          this.currentPlayer = "X";
          this.heldPositions = [];
          this.markupFields.forEach((btn) => {
            btn.innerText = "";
            btn.classList.remove("filled");
          });
          if (this.turn) this.turn.innerText = "Vez do Jogador: O";
        }, 2000);
      }
    }, 200);
  }

  turnPlayer({ currentTarget }: Event) {
    if (
      this.currentPlayer === "X" &&
      currentTarget instanceof HTMLButtonElement
    ) {
      this.currentPlayer = "O";
      currentTarget.style.color = "rgb(0, 137, 161)";
    } else {
      this.currentPlayer = "X";
      if (currentTarget instanceof HTMLButtonElement)
        currentTarget.style.color = "rgb(219, 40, 40)";
    }

    if (currentTarget instanceof HTMLButtonElement && this.turn) {
      this.turn.innerText = `Vez do Jogador: ${
        this.currentPlayer === "X" ? "O" : "X"
      }`;
      currentTarget.innerText = this.currentPlayer;
      currentTarget.classList.add("filled");
      currentTarget.removeEventListener("click", this.turnPlayer);

      this.checkWinner(currentTarget);
    }
  }

  addEvents(fields: HTMLButtonElement[]) {
    fields.forEach((btn) => {
      btn.addEventListener("click", this.turnPlayer);
    });
  }

  init() {
    this.addEvents(this.markupFields);
    return this;
  }
}

const game = new Game("button", "h2");
game.init();
