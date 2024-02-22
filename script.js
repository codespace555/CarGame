const score = document.getElementById("scoreCard");
const PopScreen = document.querySelector(".WaringPOp");
const gameScreen = document.querySelector(".gameScreen");

PopScreen.addEventListener("click", gameStart);
document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.code === "Space") {
    gameStart();
  }


});

// KeyboardEvent
let keyevent = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false, 
};
////////////////////////////////////////////////////////////
document.addEventListener("keydown", function (e) {
  e.preventDefault();
  keyevent[e.key] = true;
});
/////////////////////////////////////////////////////////////////
document.addEventListener("keyup", function (e) {
  e.preventDefault();
  keyevent[e.key] = false;
});
///////////////////////////////////////////////////////////////
let player = { speed: 6, score: 0 }; // player want to start game or not
///////////////////////////////////////////////////////////////

function gamePlay() {
  let car = document.querySelector(".car");
  let roadArea = gameScreen.getBoundingClientRect();
  if (player.start) {
    moveLine();
    moveEnemyCar(car);
    let speed = player.speed;
    if (keyevent["ArrowUp"] && player.y > 150) {
      player.y -= speed;
    }
    if (keyevent["ArrowDown"] && player.y < roadArea.height - 40) {
      player.y += speed;
    }
    if (keyevent["ArrowRight"] && player.x < roadArea.width - 600) {
      player.x += speed;
    }
    if (keyevent["ArrowLeft"] && player.x > 0) {
      player.x -= speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    window.requestAnimationFrame(gamePlay); //animation on loop
    player.score++
    score.innerText = `Score : ${player.score}`;
    if(player.score == 600){
      player.speed = 8
    }
    console.log(player.speed)
  }
}

///////////////////////////////////////////////////////////////
function moveLine() {
  const line = document.querySelectorAll(".line");
  line.forEach((element) => {
    if (element.y >= 700) {
      element.y -= 950;
    }
    element.y += player.speed;
    element.style.top = element.y + "px";
  });
}
///////////////////////////////////////////////////////////////

function moveEnemyCar(car) {
  const enemyCar = document.querySelectorAll(".enemyCar");
  enemyCar.forEach((element) => {
    if (gameOver(car, element)) {
      endGame();
    }

    if (element.y >= 700) {
      element.y -= 850;
      element.style.left = Math.floor((Math.random()) * 350) + "px";

    }
    element.y += player.speed;
    element.style.top = element.y + "px";
  });
}
///////////////////////////////////////////////////////////////


function gameStart() {
  gameScreen.classList.remove("hide");
  PopScreen.classList.add("hide");
  player.score = 0;

  player.start = true;
  window.requestAnimationFrame(gamePlay);
 

  // for road line
  for (let x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.className = "line";
    roadLine.y = x * 250;
    roadLine.style.top = roadLine.y + "px";
    gameScreen.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.className = "car";
  
  // car.innerHTML= '<img src="Untitled-4.png" alt="">'
  gameScreen.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (let x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.className = "enemyCar";
    // enemyCar.innerHTML = '<img src="Untitled-5.png" alt="">'
    enemyCar.y = ((x + 1) * 350) * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";


    gameScreen.appendChild(enemyCar);
    
  }
}
///////////////////////////////////////////////////////////////

function gameOver(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !((aRect.bottom <= bRect.top) || (aRect.top >= bRect.bottom) || (
    aRect.right <= bRect.left) || (aRect.left >= bRect.right))
}

function endGame() {

  player.start = false
  if (!player.start) {
    setTimeout(() => {
      PopScreen.classList.remove("hide");
      gameScreen.innerHTML = " ";
      PopScreen.innerHTML = "Game Over <br> Hit Space To Start Again";
      
    },400);
    
  }
 


}