const fruits = ["apple", "pear", "lemon", "cherry", "apricot"];
const fruitImages = {
  apple: "picture1.png",
  pear: "picture2.png",
  lemon: "picture3.png",
  cherry: "picture4.png",
  apricot: "picture5.png"
};

let attempt = 1;
let winCount = 0;

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const generateBtn = document.getElementById("generateBtn");
const resultEl = document.getElementById("result");
const attemptsEl = document.getElementById("attempts");
const userNameEl = document.getElementById("userName");

let name = prompt("Введіть ваше ім’я:");
if (!name || name.trim() === "") name = "Гравець";
userNameEl.textContent = "Користувач: " + name;

function getUniqueFruits() {
  const copy = [...fruits];
  return Array.from({ length: 3 }, () => {
    const index = Math.floor(Math.random() * copy.length);
    return copy.splice(index, 1)[0];
  });
}

function renderReel(reel, fruitList) {
  reel.innerHTML = "";
  fruitList.forEach(fruit => {
    const img = document.createElement("img");
    img.src = "img/" + fruitImages[fruit];
    img.alt = fruit;
    img.onerror = () => {
      img.src = "img/.png";
      img.alt = fruit + " (немає зображення)";
    };
    reel.appendChild(img);
  });
}

function checkWin(f1, f2, f3) {
  return f1.some((fruit, i) => fruit === f2[i] && fruit === f3[i]);
}

generateBtn.addEventListener("click", () => {
  if (attempt > 3) return;

  const f1 = getUniqueFruits();
  const f2 = getUniqueFruits();
  const f3 = getUniqueFruits();

  renderReel(reel1, f1);
  renderReel(reel2, f2);
  renderReel(reel3, f3);

  if (checkWin(f1, f2, f3)) winCount++;

  attemptsEl.textContent = `Спроба ${attempt} з 3`;
  attempt++;

  if (attempt > 3) {
    generateBtn.disabled = true;
    resultEl.textContent = winCount > 0
      ? `${name} переміг! `
      : "Немає виграшних комбінацій";
  }
});