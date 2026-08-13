const startButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");

function startAdventure() {
  document.body.classList.remove("is-locked");
  startScreen.setAttribute("aria-hidden", "true");
  startButton.blur();
}

startButton.addEventListener("click", startAdventure);
startButton.addEventListener("touchend", event => {
  event.preventDefault();
  startAdventure();
}, { passive: false });
