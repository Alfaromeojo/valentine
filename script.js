// ===== ELEMENTS =====
const storyText = document.getElementById("storyText");
const nextBtn = document.getElementById("nextBtn");
const storyImage = document.getElementById("storyImage");

const valentine = document.getElementById("valentine");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalScreen = document.getElementById("final");

const playBtn = document.getElementById("playBtn");
const changeBtn = document.getElementById("changeBtn");
const bgMusic = document.getElementById("bgMusic");

// ===== MUSIC =====
let musicPlaying = false;
let songIndex = 0;

const songs = [
  "music/Ed Sheeran — Photograph.m4a",
  "music/ZAYN — There You Are.m4a"
];

// ===== STORY =====
let step = 0;

const story = [
  "Once upon a time,\nthere was Eden.\nSmart. Kind. konjo.\nDangerously good at everything.",

  "She met a rooster 🐓\nwho pretended to be confident.\nhe named her mouse🐭.\nSo she named him rooster 🐓.",

  "They learned architecture.\nThey learned love.\n. and life was going good.\nThen life added 1000km.\n\nVery rude (🖕 life).",

  "Future spoiler:\n and finally they made it.\nSame house, Same city.\nA mouse.\nA rooster.\n\nAnd …\n12 kids.\n\nDon’t panic😜."
];

function showStory() {
  storyText.classList.remove("show");

  setTimeout(() => {
    storyText.innerText = story[step];
    storyText.classList.add("show");

    if (step === 1) {
      storyImage.src = "image/mouse.png";
      storyImage.classList.remove("hidden");
      storyImage.classList.add("show");
    }

    step++;

    if (step === story.length) {
      nextBtn.style.display = "none";
      setTimeout(() => valentine.classList.remove("hidden"), 600);
    }
  }, 300);
}

nextBtn.addEventListener("click", showStory);

// ===== RUNAWAY BUTTON (STABLE PHYSICS) =====

// relative offset from anchor
let offsetX = 0;
let offsetY = 0;

let velX = 0;
let velY = 0;

const repelRadius = 140;
const repelStrength = 35;
const friction = 0.85;
const maxOffset = 220; // HARD LIMIT (prevents infinite escape)

document.addEventListener("mousemove", (e) => {
  if (noBtn.classList.contains("hidden")) return;

  const rect = noBtn.getBoundingClientRect();
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const dx = btnX - e.clientX;
  const dy = btnY - e.clientY;
  const dist = Math.hypot(dx, dy);

  if (dist < repelRadius) {
    const force = (repelRadius - dist) / repelRadius;
    velX += (dx / dist) * force * repelStrength;
    velY += (dy / dist) * force * repelStrength;
  }
});

function animateNoBtn() {
  velX *= friction;
  velY *= friction;

  offsetX += velX;
  offsetY += velY;

  // clamp movement
  offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
  offsetY = Math.max(-maxOffset, Math.min(maxOffset, offsetY));

  // stop jitter at edges
  if (Math.abs(offsetX) === maxOffset) velX = 0;
  if (Math.abs(offsetY) === maxOffset) velY = 0;

  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

  requestAnimationFrame(animateNoBtn);
}

animateNoBtn();

// ===== YES =====
yesBtn.addEventListener("click", () => {
  document.querySelector(".container").innerHTML = "";
  finalScreen.classList.remove("hidden");
  document.body.appendChild(finalScreen);
});

// ===== MUSIC =====
playBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    bgMusic.volume = 0.4;
    bgMusic.play();
    playBtn.innerText = "Pause ❚❚";
    musicPlaying = true;
  } else {
    bgMusic.pause();
    playBtn.innerText = "Play ♫";
    musicPlaying = false;
  }
});

changeBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  bgMusic.src = songs[songIndex];
  if (musicPlaying) bgMusic.play();
});

// ===== INIT =====
showStory();
