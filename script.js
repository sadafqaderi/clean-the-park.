


// 🎮 Variables
let level = 1;
let trashCount = 3;
let recycled = 0;
const trashTypes = ["🍌","🥤","🍫","🍎","🍟","🍼","🍺"];

const messageEl = document.getElementById("message");
const levelEl = document.getElementById("level");
const binEl = document.getElementById("bin");

// 🎵 Sounds
const bgMusic = document.getElementById("bg-music");
const catchSound = document.getElementById("catch-sound");

let gameStarted = false;

// 🎲 Create Trash
function createTrash(num) {
  for (let i=0; i<num; i++) {
    const trash = document.createElement("div");
    trash.classList.add("trash");
    trash.textContent = trashTypes[Math.floor(Math.random() * trashTypes.length)];
    
    // random position
    trash.style.left = Math.random() * (window.innerWidth - 50) + "px";
    trash.style.top = Math.random() * (window.innerHeight - 200) + "px";
    
    // drag functionality
    trash.draggable = true;
    trash.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", "trash");
      e.dataTransfer.setDragImage(new Image(), 0, 0);
      trash.dataset.dragging = "true";
    });
    trash.addEventListener("dragend", () => trash.dataset.dragging = "false");
    
    // escape mouse
    trash.addEventListener("mousemove", () => {
      if(Math.random() < 0.1) {
        trash.style.left = Math.random() * (window.innerWidth - 50) + "px";
        trash.style.top = Math.random() * (window.innerHeight - 200) + "px";
      }
    });

    document.body.appendChild(trash);
  }
}

// 🗑️ Bin Drag & Drop
binEl.addEventListener("dragover", e => e.preventDefault());
binEl.addEventListener("drop", e => {
  const dragging = document.querySelector(".trash[data-dragging='true']");
  if(dragging) {
    dragging.remove();
    recycled++;
    catchSound.play();
    binEl.classList.add("active");
    setTimeout(() => binEl.classList.remove("active"), 200);
    
    if(recycled >= trashCount) {
      nextLevel();
    }
  }
});

// 📈 Next Level
function nextLevel() {
  level++;
  recycled = 0;
  trashCount += 2;
  messageEl.textContent = "Level up! New trash incoming...";
  levelEl.textContent = "Level: " + level;
  setTimeout(() => createTrash(trashCount), 1000);
}

// 🐾 Chaos (cat paw)
function randomChaos() {
  if(Math.random() < 0.002) {
    const paw = document.createElement("div");
    paw.textContent = "🐾";
    paw.classList.add("cat-paw");
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 1000);
    
    document.querySelectorAll(".trash").forEach(trash => {
      trash.style.left = Math.random() * (window.innerWidth - 50) + "px";
      trash.style.top = Math.random() * (window.innerHeight - 200) + "px";
    });
  }
  requestAnimationFrame(randomChaos);
}
randomChaos();

// 🏁 Start
document.body.addEventListener("click", () => {
  if(!gameStarted) {
    gameStarted = true;
    bgMusic.play();

    messageEl.textContent = "Catch and drag the trash into the bin!";
    createTrash(trashCount);
  }
});




