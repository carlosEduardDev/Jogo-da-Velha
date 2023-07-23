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
    checkWinner(btn) {
        this.heldPositions[Number(btn.dataset.i)] = this.currentPlayer;
        const itens = this.heldPositions
            .map((item, i) => [item, i])
            .filter((item) => item[0] === this.currentPlayer)
            .map((item) => item[1]);
        setTimeout(() => {
            for (let pos of this.winningPositions) {
                if (pos.every((item) => itens.includes(item))) {
                    this.finishGame();
                }
            }
            this.aTie();
        }, 200);
    }
    finishGame() {
        if (this.turn) {
            this.turn.innerText = "o jogador " + this.currentPlayer + " ganhou !";
            this.markupFields.forEach((btn) => {
                btn.removeEventListener("click", this.turnPlayer);
                setTimeout(() => {
                    this.init();
                    this.currentPlayer = "X";
                    this.heldPositions = [];
                    if (this.turn)
                        this.turn.innerText = "Vez do Jogador: O";
                    this.markupFields.forEach((btn) => {
                        btn.style.backgroundImage = "";
                        btn.classList.remove("filled");
                    });
                }, 2000);
            });
        }
    }
    aTie() {
        if (this.heldPositions.filter((item) => item).length === 9) {
            if (this.turn)
                this.turn.innerText = "Empate";
            setTimeout(() => {
                this.init();
                this.currentPlayer = "X";
                this.heldPositions = [];
                if (this.turn)
                    this.turn.innerText = "Vez do Jogador: O";
                this.markupFields.forEach((btn) => {
                    btn.style.backgroundImage = "";
                    btn.classList.remove("filled");
                });
            }, 2000);
        }
    }
    turnPlayer({ currentTarget }) {
        this.currentPlayer === "X"
            ? (this.currentPlayer = "O")
            : (this.currentPlayer = "X");
        if (currentTarget instanceof HTMLButtonElement && this.turn) {
            this.turn.innerText = `Vez do Jogador: ${this.currentPlayer === "X" ? "O" : "X"}`;
            if (this.currentPlayer === "X") {
                currentTarget.style.backgroundImage = "url(../assets/x.png)";
            }
            else if (this.currentPlayer === "O") {
                currentTarget.style.backgroundImage = "url(../assets/o.png)";
            }
            currentTarget.classList.add("filled");
            currentTarget.removeEventListener("click", this.turnPlayer);
            this.checkWinner(currentTarget);
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