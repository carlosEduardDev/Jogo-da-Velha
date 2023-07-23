"use strict";
class Game {
    markupFields;
    currentPlayer;
    winningPositions;
    heldPositions;
    turn;
    constructor(markupFields, turn) {
        this.markupFields = Array.from(document.querySelectorAll(markupFields));
        this.currentPlayer = "X";
        this.turn = document.querySelector(turn);
        this.winningPositions = [
            [1, 2, 3],
            [1, 4, 7],
            [1, 5, 8],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];
        this.heldPositions = [];
        this.turnPlayer = this.turnPlayer.bind(this);
    }
    turnPlayer({ currentTarget }) {
        this.currentPlayer === "X"
            ? (this.currentPlayer = "O")
            : (this.currentPlayer = "X");
        if (currentTarget instanceof HTMLButtonElement && this.turn) {
            this.turn.innerText = `Vez do Jogador: ${this.currentPlayer === "X" ? "O" : "X"}`;
            currentTarget.innerText = this.currentPlayer;
            currentTarget.classList.add("filled");
            currentTarget.removeEventListener("click", this.turnPlayer);
        }
    }
    addEvents(fields) {
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
//# sourceMappingURL=script.js.map