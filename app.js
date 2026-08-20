/** @typedef {{strength:number,agility:number,intelligence:number,charisma:number,constitution:number,wisdom:number}} Attributes */

const RACES = {
  human: { name: "인간", description: "어떤 길도 스스로 개척하는 적응자", bonus: { charisma: 1, wisdom: 1 } },
  elf: { name: "엘프", description: "마력과 감각에 예민한 숲의 민족", bonus: { agility: 1, intelligence: 2 } },
  dwarf: { name: "드워프", description: "불꽃과 돌을 아는 강인한 장인", bonus: { strength: 1, constitution: 2 } },
  beastfolk: { name: "수인", description: "예리한 본능을 지닌 사냥꾼", bonus: { agility: 2, wisdom: 1 } }
};

const ITEMS = {
  fieldKnife: { id: "fieldKnife", name: "야전 나이프", type: "tool" },
  ironPot: { id: "ironPot", name: "철 솥", type: "tool" },
  slimeGel: { id: "slimeGel", name: "점액괴의 젤", type: "ingredient", tags: ["수분", "단맛"], toxicity: 0 },
  boarMeat: { id: "boarMeat", name: "뿔멧돼지 고기", type: "ingredient", tags: ["육류", "기름"], toxicity: 0 },
  bitterCap: { id: "bitterCap", name: "쓴갓 버섯", type: "ingredient", tags: ["버섯", "해독"], toxicity: 1 }
};

window.ITEMS = ITEMS;

class GameEngine {
  constructor() {
    this.player = this.createPlayer("리아", "human");
    this.scene = "camp";
    this.enemy = null;
    this.gameOver = false;
    this.logs = ["당신은 잿불 길드의 야영지에서 모험을 시작했다."];
    this.cooking = new CookingSystem(this);
    this.combat = new CombatSystem(this);
  }
  createPlayer(name, raceId) {
    const base = { strength: 3, agility: 3, intelligence: 3, charisma: 3, constitution: 3, wisdom: 3 };
    const race = RACES[raceId];
    for (const [stat, value] of Object.entries(race.bonus)) base[stat] += value;
    return { name, raceId, level: 1, xp: 0, gold: 35, hp: 24, maxHp: 24, stamina: 12, maxStamina: 12, hunger: 78, attributes: base, statusEffects: [], inventory: ["fieldKnife", "ironPot", "slimeGel", "bitterCap"] };
  }
  log(message) { this.logs.unshift(message); this.logs = this.logs.slice(0, 30); }
  clamp() {
    const p = this.player;
    p.hp = Math.max(0, Math.min(p.maxHp, p.hp)); p.stamina = Math.max(0, Math.min(p.maxStamina, p.stamina)); p.hunger = Math.max(0, Math.min(100, p.hunger));
    if (!this.gameOver && (p.hp === 0 || p.stamina === 0)) this.defeat(p.hp === 0 ? "체력이 다해 쓰러졌다." : "기력이 완전히 바닥났다.");
  }
  advanceTurn() {
    const p = this.player;
    const effects = p.statusEffects || [];
    p.statusEffects = effects.filter(effect => {
      if (effect.permanent) return true;
      if (effect.hpPerTurn) p.hp += effect.hpPerTurn;
      effect.turns -= 1;
      if (effect.turns > 0) return true;
      this.log(`${effect.name || effect.id} 효과가 사라졌다.`);
      return false;
    });
    window.refreshPlayerStats?.();
    this.clamp();
  }
  check(stat, difficulty, label) { const value = this.player.attributes[stat]; const roll = Math.floor(Math.random() * 20) + 1; const success = roll + value >= difficulty; this.log(`${label}: d20(${roll}) + ${value} ${success ? "성공" : "실패"}.`); return success; }
  explore() {
    if (this.enemy) return;
    this.player.stamina -= 2; this.player.hunger -= 5; this.clamp();
    if (this.gameOver) return;
    const event = Math.random();
    if (event < .52) { this.enemy = { name: "이끼 점액괴", hp: 15, maxHp: 15, atk: 5, def: 1, drops: ["slimeGel"] }; this.scene = "combat"; this.log("축축한 바위 틈에서 이끼 점액괴가 미끄러져 나왔다!"); }
    else if (event < .76) { this.player.inventory.push("bitterCap"); this.log("쓴갓 버섯을 찾았다. 요리하면 독성을 중화할 수 있을지도 모른다."); }
    else { const success = this.check("wisdom", 13, "고대 길의 흔적을 읽는다"); if (success) { this.player.xp += 4; this.log("안전한 지름길을 찾아 경험치 4를 얻었다."); } else this.player.hp -= 2; }
    this.clamp();
  }
  rest() { if (this.enemy) return; this.player.hp += 7; this.player.stamina += 6; this.player.hunger -= 10; this.clamp(); this.log("불가에 앉아 짧게 휴식했다."); }
  defeat(reason = "모험을 계속할 힘이 없다.") {
    if (this.gameOver) return;
    this.gameOver = true; this.enemy = null; this.scene = "camp";
    this.player = this.createPlayer("리아", "human");
    this.logs = [`GAME OVER — ${reason}`, "기록되지 않은 여정은 안개 속으로 사라졌다. 새 모험가를 등록해 다시 시작할 수 있다."];
    window.clearGameSave?.(); this.render();
    if (window.showGameOver) window.showGameOver(reason); else setTimeout(() => window.showCharacterCreator?.(), 0);
  }
  render() { render(this); }
}

class CombatSystem {
  constructor(game) { this.game = game; }
  attack(style = "normal") {
    const { player: p, enemy } = this.game; if (!enemy) return;
    const critical = Math.random() * 20 + 1 + p.attributes.agility >= 22;
    const satietyMod = p.hunger >= 90 ? 2 : p.hunger >= 75 ? 1 : p.hunger <= 10 ? -3 : p.hunger <= 25 ? -2 : p.hunger <= 45 ? -1 : 0;
    const power = p.attributes.strength + Math.floor(Math.random() * 6) + 2 + satietyMod + (style === "careful" ? 1 : 0);
    const enemyEvade = !critical && enemy.agility && Math.random() * 20 + 1 + enemy.agility >= 25;
    const damage = Math.max(1, power - enemy.def) * (critical ? 2 : 1); if (!enemyEvade) enemy.hp -= damage; p.stamina -= 1;
    this.game.log(enemyEvade ? `${enemy.name}이(가) 날렵하게 공격을 피했다.` : `${critical ? "치명타! " : ""}${enemy.name}에게 ${damage} 피해를 주었다.`);
    if (enemy.hp <= 0) {
      const rewards = enemy.drops || [];
      rewards.forEach(id => p.inventory.push(id));
      p.xp += 8;
      const rewardNames = rewards.map(id => ITEMS[id]?.name || window.GEAR?.[id]?.name || id).join(", ") || "아무것도";
      this.game.log(`${enemy.name}을(를) 쓰러뜨렸다. ${rewardNames}을(를) 획득했다.`);
      this.game.enemy = null;
      this.game.scene = "wild";
      return this.game.clamp();
    }
    const evade = Math.random() * 20 + 1 + p.attributes.agility >= 16;
    if (evade) this.game.log("민첩하게 반격을 피했다."); else { const hit = Math.max(1, enemy.atk - Math.floor(p.attributes.constitution / 2)); p.hp -= hit; this.game.log(`${enemy.name}의 반격! ${hit} 피해.`); }
    this.game.clamp();
  }
  flee() { const success = this.game.check("agility", 14, "도주"); if (success) { this.game.enemy = null; this.game.scene = "wild"; this.game.log("수풀 사이로 빠져나왔다."); } else this.attack("careful"); }
}

class CookingSystem {
  constructor(game) { this.game = game; }
  cook() {
    const { player: p } = this.game; const ingredients = p.inventory.filter(id => ITEMS[id]?.type === "ingredient");
    if (!ingredients.length) return this.game.log("솥에 넣을 식재료가 없다.");
    const selected = ingredients.slice(0, 2); selected.forEach(id => p.inventory.splice(p.inventory.indexOf(id), 1));
    const tags = selected.flatMap(id => ITEMS[id].tags); const toxic = selected.some(id => ITEMS[id].toxicity) && !tags.includes("해독");
    const duplicate = selected.length === 2 && selected[0] === selected[1]; const difficulty = duplicate ? 16 : toxic ? 15 : 10;
    const success = this.game.check("intelligence", difficulty, "마물 요리");
    if (!success || toxic) { p.hp -= 4; p.statusEffects.push({ id: "stomachache", turns: 2, effect: "-2 HP/turn" }); this.game.log("요리가 실패했다. 속이 뒤집히며 복통 상태가 되었다."); }
    else { const restore = tags.includes("육류") ? 18 : 11; p.hunger += restore; p.hp += 3; this.game.log(`낯선 향의 마물 요리를 완성했다. 허기가 ${restore} 회복되고 체력이 3 회복된다.`); }
    this.game.clamp();
  }
}

const game = new GameEngine();
window.game = game;
function bar(label, value, max, className = "") { return `<div class="meter"><div class="meter-label"><span>${label}</span><span>${value}/${max}</span></div><div class="bar ${className}"><span style="width:${(value / max) * 100}%"></span></div></div>`; }
function render(g) {
  const p = g.player; const race = RACES[p.raceId];
  document.querySelector("#location").textContent = g.scene === "camp" ? "잿불 길드의 야영지" : g.scene === "combat" ? "안개 낀 숲길 — 전투" : "안개 낀 숲길";
  const activeEffects = (p.statusEffects || []).filter(effect => !effect.permanent && effect.turns > 0);
  const satietyMod = p.hunger >= 90 ? 2 : p.hunger >= 75 ? 1 : p.hunger <= 10 ? -3 : p.hunger <= 25 ? -2 : p.hunger <= 45 ? -1 : 0;
  const satietyText = satietyMod ? `🍽 ${p.hunger >= 75 ? "든든함" : "허기"}: 공격 ${satietyMod > 0 ? "+" : ""}${satietyMod}` : "🍽 평상시 포만감";
  const effectText = `<p class="active-effects">${satietyText}${activeEffects.length ? ` · ${activeEffects.map(effect => `✦ ${effect.name || effect.id} ${effect.permanent ? "영구" : `${effect.turns}턴`}`).join(" · ")}` : ""}</p>`;
  document.querySelector("#hero-card").innerHTML = `<div><h2 class="hero-name">${p.name} <span class="muted">Lv.${p.level} · ${race.name}</span></h2><p class="hero-meta">${race.description}</p>${bar("HP", p.hp, p.maxHp)}${bar("STAMINA", p.stamina, p.maxStamina, "stamina")}${bar("SATIETY", p.hunger, 100, "hunger")}${effectText}</div><div class="stats"><strong>힘 ${p.attributes.strength}</strong><span>민첩 ${p.attributes.agility}</span><span>지능 ${p.attributes.intelligence}</span><span>매력 ${p.attributes.charisma}</span><span>건강 ${p.attributes.constitution}</span><span>지혜 ${p.attributes.wisdom}</span><span class="muted">가방 ${p.inventory.length}</span><span class="muted">XP ${p.xp}</span><span class="muted">금화 ${p.gold || 0}</span></div>`;
  const scene = document.querySelector("#scene");
  scene.innerHTML = g.enemy ? `<h2>${g.enemy.name}</h2><p>${g.enemy.role ? `${g.enemy.role} · ` : ""}HP ${Math.max(0, g.enemy.hp)}/${g.enemy.maxHp} · 공격 ${g.enemy.atk} · 방어 ${g.enemy.def}${g.enemy.agility ? ` · 민첩 ${g.enemy.agility}` : ""}</p><p>저 괴물은 요리 가능한 재료를 품고 있다. 검을 들 것인가, 도망칠 것인가?</p>` : g.scene === "camp" ? `<h2>야영지의 작은 불꽃</h2><p>길드의 의뢰 게시판은 비어 있다. 그러나 북쪽 숲에는 사라진 사냥꾼과 기묘한 마물 요리의 소문이 떠돈다.</p>` : `<h2>안개 낀 숲길</h2><p>젖은 흙길과 낡은 돌무더기가 이어진다. 발자국, 약초, 위험이 모두 안개 속에 섞여 있다.</p>`;
  const actions = g.enemy ? [["⚔ 공격", () => g.combat.attack()], ["🏃 도주", () => g.combat.flee()]] : [["🧭 탐험", () => { g.scene = "wild"; g.explore(); }], ["🍲 요리", () => g.cooking.cook()], ["🔥 휴식", () => g.rest()], ["🎒 가방 확인", () => g.log(`가방: ${p.inventory.map(id => ITEMS[id].name).join(", ") || "비어 있음"}`)]];
  const list = document.querySelector("#action-list"); list.replaceChildren(...actions.map(([label, handler]) => { const button = document.createElement("button"); button.textContent = label; if (label.includes("공격")) button.classList.add("danger"); if (label.includes("요리") || label.includes("휴식")) button.classList.add("utility"); button.addEventListener("click", () => { handler(); g.render(); }); return button; }));
  document.querySelector("#log").innerHTML = g.logs.map(entry => `<li>${entry}</li>`).join("");
}
render(game);
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js");
