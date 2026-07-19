
const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");

const SIZE = 4;
const TOTAL = SIZE * SIZE;

// Palitan ito kung iba ang filename ng image mo
const IMAGE = "file_00000000dab07208bef9dfc27fdec606.png";

let order = [...Array(TOTAL).keys()];

// Fisher-Yates Shuffle
for (let i = order.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [order[i], order[j]] = [order[j], order[i]];
}

let first = null;

function drawBoard() {
  puzzle.innerHTML = "";

  for (let i = 0; i < TOTAL; i++) {
    const piece = document.createElement("div");
    piece.className = "piece";

    const img = order[i];

    piece.style.backgroundImage = `url(${IMAGE})`;
    piece.style.backgroundSize = "400px 400px";
    piece.style.backgroundPosition =
      `${-(img % SIZE) * 100}px ${-Math.floor(img / SIZE) * 100}px`;

    piece.onclick = () => clickPiece(i);

    puzzle.appendChild(piece);
  }
}

function clickPiece(i) {
  if (first === null) {
    first = i;
    puzzle.children[i].style.outline = "3px solid #ff4081";
    return;
  }

  puzzle.children[first].style.outline = "";

  [order[first], order[i]] = [order[i], order[first]];
  first = null;

  drawBoard();
  checkWin();
}

function launchHearts() {
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");

      heart.textContent = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight + "px";
      heart.style.fontSize = (20 + Math.random() * 20) + "px";
      heart.style.zIndex = "9999";
      heart.style.pointerEvents = "none";
      heart.style.transition = "all 4s linear";
      heart.style.opacity = "1";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.style.top = "-100px";
        heart.style.opacity = "0";
      }, 50);

      setTimeout(() => {
        heart.remove();
      }, 4000);

    }, i * 100);
  }
}

function checkWin() {
  for (let i = 0; i < TOTAL; i++) {
    if (order[i] !== i) return;
  }

  if (typeof confetti === "function") {
    confetti({
      particleCount: 220,
      spread: 90,
      origin: { y: 0.6 }
    });
  }

  launchHearts();

  setTimeout(() => {
    puzzle.style.display = "none";
    message.classList.remove("hidden");
  }, 1800);
}

drawBoard();
