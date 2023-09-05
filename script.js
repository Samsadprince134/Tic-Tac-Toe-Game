const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");



let currentPlayer = "X";
let grid = ["", "", "", "", "", "", "", "", ""];

function Gameinit() {
    currentPlayer = "X";
    grid = ["", "", "", "", "", "", "", "", ""];
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box, index) => {
        boxes[index].innerText = "";
        boxes[index].style.cssText = 'pointer-events'

    });
    boxes.forEach((box, index) => {
        box.classList.remove("win");
    })
    newGameBtn.classList.remove("active");
}
Gameinit();
const winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

function handleClick(index) {
    if (grid[index] === "") {
        grid[index] = currentPlayer;
        boxes[index].innerText = `${currentPlayer}`;
        boxes[index].style.cssText = 'pointer-events: none'
    }
    swapTurn();
    gameOver();
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", () => {
    Gameinit();
});

function gameOver() {
    let answer = "";
    winningPos.forEach((position) => {
        if ((grid[position[0]] !== "" || grid[position[1]] !== "" || grid[position[2]] !== "") && (grid[position[0]] === grid[position[1]]) && (grid[position[1]] === grid[position[2]])) {

            if (grid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });
    if (answer !== "") {
        gameInfo.innerText = `Hurrah!!! The Winner is - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    let cnt = 0;
    grid.forEach((box) => {
        if (box !== "") {
            cnt++;
        }
    })
    if (cnt === 9) {
        gameInfo.innerText = "Oops!! Its a Tie";
        newGameBtn.classList.add("active");
    }
}