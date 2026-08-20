(() => {
  const SAVE_KEY = "adventurers-sword-and-cauldron.save.v1";
  let game, deathModal;
  const clone = value => JSON.parse(JSON.stringify(value));

  function saveGame() {
    if (!game || game.gameOver) return;
    const data = { version: 1, savedAt: new Date().toISOString(), player: game.player, scene: game.scene, enemy: game.enemy, logs: game.logs };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      game.log("현재 모험을 기기에 저장했다."); game.render();
    } catch { game.log("저장에 실패했다. 브라우저의 저장 공간을 확인해 달라."); game.render(); }
  }

  function loadGame() {
    let data;
    try { data = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); } catch { data = null; }
    if (!data?.player) { game.log("불러올 저장 기록이 없다."); return game.render(); }
    game.player = clone(data.player); game.scene = data.scene || "wild"; game.enemy = data.enemy || null; game.logs = Array.isArray(data.logs) ? data.logs : [];
    game.gameOver = false; game.player.statusEffects ||= []; game.player.inventory ||= []; game.player.equipment ||= {}; game.player.equipment.accessory2 ??= null;
    window.refreshPlayerStats?.(); game.clamp();
    if (!game.gameOver) { game.log("저장한 모험을 불러왔다."); game.render(); }
    deathModal?.remove(); deathModal = null;
  }

  function clearGameSave() {
    try { localStorage.removeItem(SAVE_KEY); } catch { /* 브라우저 저장 공간이 막힌 경우에도 새 여정은 시작한다. */ }
  }

  function showGameOver(reason) {
    deathModal?.remove();
    deathModal = document.createElement("div"); deathModal.className = "death-modal";
    deathModal.innerHTML = `<section><p>THE CHRONICLE ENDS</p><h2>게임 오버</h2><strong>${reason}</strong><span>이번 여정의 저장 기록은 사라졌습니다.<br>새 모험가를 등록해 처음부터 다시 시작하세요.</span><button type="button">새 여정 시작</button></section>`;
    document.body.append(deathModal);
    deathModal.querySelector("button").onclick = () => { deathModal.remove(); deathModal = null; window.showCharacterCreator?.(); };
  }

  function boot() {
    game = window.game; if (!game) return setTimeout(boot, 40);
    window.clearGameSave = clearGameSave; window.showGameOver = showGameOver;
    const dock = document.querySelector(".system-dock"); if (!dock || dock.querySelector("[data-save]")) return;
    const save = document.createElement("button"); save.type = "button"; save.className = "save-button"; save.dataset.save = ""; save.textContent = "💾 저장"; save.onclick = saveGame;
    const load = document.createElement("button"); load.type = "button"; load.className = "save-button"; load.dataset.load = ""; load.textContent = "📂 불러오기"; load.onclick = loadGame;
    dock.append(save, load);
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
