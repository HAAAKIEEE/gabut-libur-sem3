const board = document.querySelector(".board");
const scoreElement = document.querySelector(".score");
const highScoreElemet = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

// 12
let gameOver = false;
// 1
let foodX, foodY;
// 3
let snakeX = 5,
  snakeY = 5;
// 5
let velocityX = 0,
  velocityY = 0;
// 8
let snakeBody = [];
let setIntervalId; //13
let score = 0;

//14 15 Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElemet.innerText = `High Score: ${highScore}`;

// highScoreElement.innerText = `High Score: ${highScore}`;
// 2
const changeFoodPosition = () => {
  // mengacak random dari 0 -30 untuk psosisi x dan y nya food
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
// 13
const handelGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game over Mau Main lagi?.....");
  location.reload();
};

// 5
const changeDirection = (e) => {
  // console.log(e);
  // 6
  if (e.key == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key == "ArrowRight" && velocityX != 1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key == "ArrowLeft" && velocityX != -1) {
    velocityX = -1;
    velocityY = 0;
  }
  //tambahkan ini untuk mencek initGame();
};
// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach((button) =>
button.addEventListener("click", () =>
changeDirection({ key: button.dataset.key })
)
);

//    1
// untuk  pemanggilan snake food dan snake

const initGame = () => {
  // 12
  if (gameOver) return handelGameOver();
  let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
  //    7
  // untuk ketika snake memakan fodd maka food berpindah posisi
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    // 8
    snakeBody.push([foodX, foodY]); //menambah panjang ketika makan ke array
    // console.log(snakeBody);
    // 13
    score++; // increment score by 1
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    // highScoreElement.innerText = `High Score: ${highScore}`;
  }
  //    6
  // mengupdate posisi snake
  snakeX += velocityX;
  snakeY += velocityY;

  //11
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]; //11 Memindahkan nilai elemen pada tubuh ular satu per satu
  }
  snakeBody[0] = [snakeX, snakeY]; //10 Seting firt elemen dari body snake untuk menentukan posisi

  // 12 mencek kepala snake menyentuh dinding
  if (snakeX <= 0 || snakeX >= 31 || snakeY <= 0 || snakeY >= 31) {
    return (gameOver = true);
  }

  
  // 9
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;

    //saat kepala menyentuh badan
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  // 3
  // htmlMarkup +=`<div class="head" style="grid-area:${snakeY}/${snakeX}"></div>`;
  board.innerHTML = htmlMarkup;
};
// 2
changeFoodPosition();
//    1
// initGame();
// 6
setIntervalId = setInterval(initGame, 100);
// 4
document.addEventListener("keyup", changeDirection);