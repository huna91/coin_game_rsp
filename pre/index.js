/*
1. 코인 넣기
2. 회수 충전
3. 시작 누르기
4. 게임시작(음악 나오기)


*/

const val = {};

function compare(one, two) {
  const _win = 1;
  const _draw = 2;
  const _lose = 3;
  if (
    (one === "rock" && two === "sissor") ||
    (one === "sissor" && two === "paper") ||
    (one === "paper" && two === "rock")
  ) {
    return _win;
  } else if (
    (one === "paper" && two === "paper") ||
    (one === "rock" && two === "rock") ||
    (one === "sissor" && two === "sissor")
  ) {
    return _draw;
  } else if (
    (one === "sissor" && two === "rock") ||
    (one === "paper" && two === "sissor") ||
    (one === "rock" && two === "paper")
  ) {
    return _lose;
  }
}

// const roll = document.querySelector("container_game_roll>img");
//--------------------------중앙 화면-------------------------
let count = 1;
function img_roll(_img) {
  let _count = count % 3;
  if (!_img && _count === 1) {
    roll_img.src = "./images/paper.JPG";
  } else if (_count === 2) {
    roll_img.src = "./images/rock.JPG";
  } else if (_count === 0) {
    roll_img.src = "./images/sissor.JPG";
  }
  count++;
}
let interval = setInterval(img_roll, 500);

function stop() {
  clearInterval(interval);
}

//--------------------------게임돌아가는 화면-------------------------
const data = document.querySelectorAll(".roll_num");
const back = document.querySelector(".container_game_roll");

let w = back.clientWidth;
let h = back.clientHeight;
console.log(Math.PI);
let angle = 0;

let radian = (angle) => (angle * Math.PI) / 180;

const BASE_X = w / 2 - 30;
const BASE_Y = h / 2 - 30;

const Radius = 230;

//BASE_X,BASE_Y 기준으로 RADIUS 반지름을 가진 원 형태로
const draw = (element, angle) => {
  const x = Math.cos(radian(angle)) * Radius + BASE_X;
  const y = Math.sin(radian(angle)) * Radius + BASE_Y;

  element.style.transform = `translate(${x}px, ${y}px)`;
};
for (let i = 0; i < data.length; i++) {
  draw(data[i], angle + (360 / data.length) * i);
}
let k = 0;
function roll_coin() {
  let _clock = k % 10;
  let _clock2 = (k - 1) % 10;
  if (_clock2 !== -1) {
    data[_clock2].style.backgroundColor = "white";
  }
  data[_clock].style.backgroundColor = "pink";
  k++;
}
let interval_coin = setInterval(roll_coin, 300);

//--------------------------코인 컨트롤-------------------------
// const _coin = document.querySelectorAll(".coin");
let _target = null;
let _Coin_count = 0;
// 음악 넣고싶으면 여기에 넣어주고 아래 컨트롤
// const audio1 = new Audio("./audio/audio1.mp3");

// 코인 선택 활성화
document.onmouseenter = (e) => {
  if (e.target.classList.contains("coin")) {
    e.target.style.transform = "scale(1.2,1.2)";
  }
};
document.ondragstart = (e) => {
  if (e.target.classList.contains("coin")) {
    _target = e.target;
    e.target.style.backgroundColor = "rgb(255,212,0)";
  }
};
document.ondragend = (e) => {
  _target = null;
  if (e.target.classList.contains("coin")) {
    e.target.style.backgroundColor = "rgb(241, 238, 11)";
  }
};

// 코인 넣는곳에 가져오면
document.ondragenter = (e) => {
  if (e.target.classList.contains("coin_in") && _target !== null) {
    e.target.style.transform = "scale(1.2,1.2)";
    e.target.style.background = "radial-gradient(rgb(237,195,155), #696969)";
  }
};
document.ondragleave = (e) => {
  if (e.target.classList.contains("coin_in") && _target !== null) {
    e.target.style.transform = "scale(1,1)";
    e.target.style.background = "radial-gradient(#59ece5, #696969)";
  }
};
document.ondragover = function (e) {
  if (e.target.classList.contains("coin_in") && _target !== null) {
    e.preventDefault();
  }
};
document.ondrop = (e) => {
  console.log("dd");
  if (e.target.classList.contains("coin_in") && _target !== null) {
    _Coin_count++;
    coin_count.innerHTML = `${_Coin_count}`;
    e.target.style.transform = "scale(1,1)";
    e.target.style.background = "radial-gradient(#59ece5, #696969)";

    // 음악 컨트롤
    // audio1.volume = 0.7;
    // audio1.loop = true;
    // audio1.play();
  }
};

//--------------------------버튼 컨트롤-------------------------
let _playing = 0;
let userValue;
let gameStart = document.querySelectorAll(".dis_play");
let game_result;
function random_coin() {
  let _ranNum_coin = Math.floor(Math.random() * 29 + 20);
  return _ranNum_coin;
}
function random() {
  let _ranNum = Math.floor(Math.random() * 3 + 1);
  if (_ranNum === 1) {
    stop();
    roll_img.src = "./images/sissor.JPG";
    setTimeout(() => {
      interval = setInterval(img_roll, 500);
    }, 1000);
    return "rock";
  } else if (_ranNum === 2) {
    stop();
    roll_img.src = "./images/paper.JPG";
    setTimeout(() => {
      interval = setInterval(img_roll, 500);
    }, 1000);
    return "sissor";
  } else if (_ranNum === 3) {
    stop();
    roll_img.src = "./images/rock.JPG";
    setTimeout(() => {
      interval = setInterval(img_roll, 500);
    }, 1000);
    return "paper";
  }
}

function game(val) {
  let _comData = random();
  let _userData = val;
  let _game_result = compare(_userData, _comData);

  if (game_result === 1) {
    console.log("이겼");
    gameStart[2].className += " active_display";
    setTimeout(() => {
      gameStart[2].classList.remove("active_display");
    }, 500);
    random_coin();
    game_result = 0;
    _playing = 0;
  } else if (game_result === 2) {
    console.log("비겼");
    gameStart[3].className += " active_display";
    setTimeout(() => {
      gameStart[3].classList.remove("active_display");
    }, 500);
    game_result = 0;
    _playing = 0;
  } else if (game_result === 3) {
    console.log("너 없어");
    gameStart[4].className += " active_display";
    setTimeout(() => {
      gameStart[4].classList.remove("active_display");
    }, 500);
    game_result = 0;
    _playing = 0;
  }

  return _game_result;
}

rock_btn.addEventListener("click", () => {
  if (_playing === 1) {
    userValue = "rock";
    game_result = game(userValue);
    console.log("rock btn");
  }
});
scissors_btn.addEventListener("click", () => {
  if (_playing === 1) {
    userValue = "sissor";
    game_result = game(userValue);
    console.log("sissor btn");
  }
});
paper_btn.addEventListener("click", () => {
  if (_playing === 1) {
    userValue = "paper";
    game_result = game(userValue);
    console.log("paper btn");
  }
});
start_btn.addEventListener("click", () => {
  console.log("start button");
  if (_Coin_count !== 0) {
    _Coin_count--;
    coin_count.innerHTML = `${_Coin_count}`;
    _playing = 1;

    gameStart[0].className += " active_display";
    setTimeout(() => {
      gameStart[0].classList.remove("active_display");
    }, 1000);

    // setTimeout(() => {
    //   _playing = 0;
    // }, 7000);
  } else if (_Coin_count == 0) {
    gameStart[1].className += " active_display";
    setTimeout(() => {
      gameStart[1].classList.remove("active_display");
    }, 1000);
  }
});

//--------------------------게임 컨트롤-------------------------
