(() => {
  const RACES = {
    human: { name: "인간", bonus: { charisma: 1, wisdom: 1 }, text: "어떤 길도 개척하는 적응자" },
    elf: { name: "엘프", bonus: { agility: 1, intelligence: 2 }, text: "마력과 감각에 예민한 숲의 민족" },
    dwarf: { name: "드워프", bonus: { strength: 1, constitution: 2 }, text: "불꽃과 돌을 아는 강인한 장인" },
    beastfolk: { name: "수인", bonus: { agility: 2, wisdom: 1 }, text: "예리한 본능을 지닌 사냥꾼" }
  };
  const STAT_NAMES = { strength: "힘", agility: "민첩", intelligence: "지능", charisma: "카리스마", constitution: "건강", wisdom: "지혜" };
  const STAT_HELP = { strength: "공격력과 신체 능력", agility: "회피와 치명타", intelligence: "마력과 지식 판정", charisma: "설득과 위협", constitution: "체력과 내성", wisdom: "기력과 직관" };
  const GEAR = {
    rustSword: { name: "낡은 길드 검", icon: "⚔", slot: "weapon", label: "무기", mods: { strength: 1 }, description: "길드가 초보 모험가에게 지급한 단검." },
    leatherCoat: { name: "여행자 가죽 코트", icon: "🧥", slot: "armor", label: "방어구", mods: { constitution: 1 }, description: "비바람과 작은 상처를 막아 준다." },
    amberCharm: { name: "호박 부적", icon: "📿", slot: "accessory", label: "장신구", mods: { wisdom: 1 }, description: "마음의 중심을 잡아 주는 작은 부적." }
  };
  const ITEMS = {
    fieldKnife: { name: "야전 나이프", icon: "🔪", type: "도구", description: "마물 손질에 쓰는 날카로운 칼." },
    ironPot: { name: "철 솥", icon: "⚱", type: "도구", description: "야영지의 기본 조리 도구." },
    slimeGel: { name: "점액괴의 젤", icon: "🫧", type: "식재료", description: "맑게 끓이면 달큰한 수프가 된다." },
    bitterCap: { name: "쓴갓 버섯", icon: "🍄", type: "식재료", description: "독을 중화하는 쌉쌀한 버섯." },
    boarMeat: { name: "뿔멧돼지 고기", icon: "🥩", type: "식재료", description: "기름진 붉은 고기." },
    emberTail: { name: "불도마뱀 꼬리", icon: "🌶", type: "식재료", description: "열기를 품은 꼬리살." },
    spiderLeg: { name: "동굴거미 다리", icon: "🕷", type: "식재료", description: "독주머니를 제거해야 한다." },
    mossShell: { name: "이끼거북 등갑", icon: "🛡", type: "소재", description: "튼튼한 수선 소재." }
  };
  const MONSTERS = [
    ["이끼 점액괴", "🫧", "안개 낀 숲길", "낮음", "습한 돌틈에 숨어 장비를 녹이는 젤리형 마물.", "점액괴의 젤"],
    ["뿔멧돼지", "🐗", "잿불 초원", "보통", "옆으로 굽은 뿔로 돌진하는 거대 멧돼지.", "뿔멧돼지 고기"],
    ["불도마뱀", "🦎", "재의 협곡", "보통", "화산의 열기를 먹고 사는 붉은 도마뱀.", "불도마뱀 꼬리"],
    ["동굴거미", "🕷", "폐광 심층", "높음", "진동으로 먹잇감을 찾는 거대 거미.", "동굴거미 다리"],
    ["이끼거북", "🐢", "고목 습지", "낮음", "등 위에 작은 생태계를 이고 다니는 거북 마물.", "이끼거북 등갑"],
    ["서리박쥐", "🦇", "푸른 얼음굴", "보통", "무리로 날아들어 체온을 빼앗는 박쥐.", "서리 날개막"],
    ["흑염소 사자", "🦁", "황혼 초원", "높음", "갈기 사이에서 검은 불꽃을 피우는 포식자.", "검은 갈기"],
    ["수정 사슴", "🦌", "별빛 숲", "낮음", "뿔에 맑은 마력을 모으는 신비한 초식 마물.", "수정 뿔 조각"]
  ];
  const RECIPES = [
    ["점액괴 맑은 수프", "🥣", "쉬움", "점액괴의 젤", "탱글한 젤을 맑게 끓여낸 초보 모험가의 한 그릇.", "포만감 +11 · HP +3"],
    ["뿔멧돼지 진한 스튜", "🍲", "보통", "뿔멧돼지 고기 + 쓴갓 버섯", "쓴갓의 쌉쌀함이 기름진 고기의 풍미를 살린다.", "포만감 +25 · HP +8"],
    ["불도마뱀 꼬리 꼬치", "🍢", "보통", "불도마뱀 꼬리", "살짝 그을리기만 해도 스스로 익어 가는 뜨거운 별미.", "포만감 +16 · 화염 저항"],
    ["동굴거미 다리 튀김", "🍤", "어려움", "동굴거미 다리 + 쓴갓 버섯", "해독 버섯으로 독을 눌러 바삭하게 조리한다.", "포만감 +20 · 민첩 버프"],
    ["이끼거북 등갑 육수", "🍵", "보통", "이끼거북 등갑 + 점액괴의 젤", "등갑의 미네랄을 천천히 우려낸 회복용 국물.", "HP +10 · 독 저항"],
    ["별빛 버섯 리조또", "🍚", "어려움", "쓴갓 버섯 + 점액괴의 젤", "발견되지 않은 조합도 솥 위에서 새로운 레시피가 된다.", "포만감 +18 · 지혜 버프"]
  ];
  let game, modal, dock, creator, state;

  function esc(value) { return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char])); }
  function item(id) { return GEAR[id] || ITEMS[id] || { name: id, icon: "?", type: "미확인" }; }
  function stacks(inventory) { return inventory.reduce((out, id) => (out[id] = (out[id] || 0) + 1, out), {}); }
  function modifiersText(mods) { return Object.entries(mods).map(([key, value]) => `${STAT_NAMES[key]} +${value}`).join(" · "); }
  function recompute(player) {
    const race = RACES[player.raceId]; const base = player.baseAttributes || player.attributes;
    const attributes = { ...base };
    Object.entries(race.bonus).forEach(([key, value]) => attributes[key] += value);
    Object.values(player.equipment || {}).filter(Boolean).forEach(id => Object.entries(GEAR[id].mods).forEach(([key, value]) => attributes[key] += value));
    player.attributes = attributes;
    player.maxHp = 14 + attributes.constitution * 3;
    player.maxStamina = 6 + attributes.wisdom * 2;
    player.hp = Math.min(player.maxHp, player.hp || player.maxHp);
    player.stamina = Math.min(player.maxStamina, player.stamina || player.maxStamina);
  }
  function syncLevel() {
    const p = game.player; if (!p.nextLevelXp) p.nextLevelXp = 10;
    while (p.xp >= p.nextLevelXp) { p.xp -= p.nextLevelXp; p.level += 1; p.nextLevelXp += 6; p.unspentPoints = (p.unspentPoints || 0) + 2; game.log(`레벨 ${p.level}에 도달했다. 성장 포인트 2를 얻었다.`); }
    updateDock();
  }
  function createModal() {
    const el = document.createElement("div"); el.className = "game-modal"; el.innerHTML = `<div class="game-modal__shade"></div><section class="game-modal__panel"><header class="game-modal__head"><div><p></p><h2></h2></div><button type="button" class="game-modal__close" aria-label="닫기">×</button></header><div class="game-modal__body"></div></section>`;
    document.body.append(el); el.querySelector(".game-modal__shade").onclick = closeModal; el.querySelector(".game-modal__close").onclick = closeModal; return el;
  }
  function closeModal() { modal.classList.remove("is-open"); }
  function openModal(title, kicker, body) { modal.querySelector("h2").textContent = title; modal.querySelector(".game-modal__head p").textContent = kicker; modal.querySelector(".game-modal__body").innerHTML = body; modal.classList.add("is-open"); }
  function openInventory() {
    const p = game.player; const current = stacks(p.inventory); const equipped = p.equipment || {};
    const slots = ["weapon", "armor", "accessory"].map(slot => `<div class="equip-slot"><small>${({ weapon: "무기", armor: "방어구", accessory: "장신구" })[slot]}</small><b>${equipped[slot] ? `${GEAR[equipped[slot]].icon} ${GEAR[equipped[slot]].name}` : "비어 있음"}</b></div>`).join("");
    const cells = Object.entries(current).map(([id, qty]) => { const data = item(id), gear = GEAR[id]; return `<article class="item-cell"><span class="item-cell__icon">${data.icon}</span><strong>${data.name}</strong><small>${gear ? `${gear.label} · ${modifiersText(gear.mods)}` : data.type}</small><b>×${qty}</b>${gear ? `<button type="button" data-equip="${id}">${equipped[gear.slot] === id ? "장착 해제" : "장착"}</button>` : ""}</article>`; });
    while (cells.length < 12) cells.push(`<div class="empty-cell">+<br>빈 칸</div>`);
    openModal("여행 가방", `${Object.keys(current).length} / 12 SLOTS`, `<p class="modal-note">같은 아이템은 한 칸에 쌓입니다. 장비를 눌러 장착하면 실제 능력치와 전투 판정에 반영됩니다.</p><div class="equip-slots">${slots}</div><div class="inventory-cells">${cells.join("")}</div>`);
    modal.querySelectorAll("[data-equip]").forEach(button => button.onclick = () => equip(button.dataset.equip));
  }
  function equip(id) {
    const p = game.player, gear = GEAR[id]; p.equipment ||= { weapon: null, armor: null, accessory: null };
    p.equipment[gear.slot] = p.equipment[gear.slot] === id ? null : id;
    recompute(p); game.log(`${gear.name}${p.equipment[gear.slot] ? "을 장착했다" : "을 해제했다"}. ${modifiersText(gear.mods)}`); game.render(); openInventory();
  }
  function openBook() {
    const monsters = MONSTERS.map(row => `<article class="monster-entry"><div class="monster-entry__icon">${row[1]}</div><div><p class="entry-meta">${row[2]} · 위협도 ${row[3]}</p><h4>${row[0]}</h4><p>${row[4]}</p><p class="drop-tag">획득: ${row[5]}</p></div></article>`).join("");
    const recipes = RECIPES.map(row => `<article class="recipe-entry"><div class="recipe-entry__top"><span>${row[1]}</span><div><p class="entry-meta">난이도 ${row[2]} · 철 솥</p><h4>${row[0]}</h4></div></div><p class="ingredient-line">${row[3]}</p><p>${row[4]}</p><strong class="recipe-effect">${row[5]}</strong></article>`).join("");
    openModal("마물과 솥의 도감", "BESTIARY & COOKBOOK", `<section class="book-section"><h3>마물 도감 <span>${MONSTERS.length}종</span></h3>${monsters}</section><section class="book-section"><h3>요리 레시피북 <span>${RECIPES.length}개</span></h3>${recipes}</section>`);
  }
  function openGrowth() {
    const p = game.player; const rows = Object.keys(STAT_NAMES).map(key => `<div class="growth-row"><span>${STAT_NAMES[key]} <small>${STAT_HELP[key]}</small></span><b>${p.attributes[key]}</b><button type="button" data-grow="${key}" ${p.unspentPoints ? "" : "disabled"}>+</button></div>`).join("");
    openModal("성장과 능력치", "LEVEL ${p.level} · XP ${p.xp}/${p.nextLevelXp}", `<p class="growth-summary">사용 가능한 성장 포인트: <strong>${p.unspentPoints || 0}</strong></p><div class="growth-list">${rows}</div>`);
    modal.querySelectorAll("[data-grow]").forEach(button => button.onclick = () => { if (!p.unspentPoints) return; p.baseAttributes[button.dataset.grow] += 1; p.unspentPoints -= 1; recompute(p); game.log(`${STAT_NAMES[button.dataset.grow]}이 1 올랐다.`); game.render(); openGrowth(); });
  }
  function updateDock() { if (!dock || !game) return; const p = game.player; const growth = dock.querySelector("[data-growth]"); growth.textContent = p.unspentPoints ? `✦ 성장 +${p.unspentPoints}` : "✦ 성장"; growth.classList.toggle("growth-ready", !!p.unspentPoints); }
  function createCreator() {
    creator = document.createElement("section"); creator.className = "character-creator"; creator.hidden = true; document.body.append(creator);
  }
  function portraitStyle() { return `--skin:${state.appearance.skin};--hair:${state.appearance.hair};--eyes:${state.appearance.eyes}`; }
  function renderCreator() {
    const race = RACES[state.race]; const total = Object.values(state.stats).reduce((sum, value) => sum + value, 0);
    creator.innerHTML = `<div class="creator-shell"><p class="creator-subtitle">THE FIRST PAGE OF YOUR ADVENTURE</p><h2 class="creator-title">모험가 기록 작성</h2><p class="creator-subtitle">당신의 이름과 타고난 재능이 앞으로의 길을 바꿉니다.</p><div class="creator-layout"><section class="creator-card"><h3>이름</h3><input class="creator-name" maxlength="14" value="${esc(state.name)}" placeholder="모험가의 이름" data-name></section><section class="creator-card"><h3>종족</h3><div class="race-grid">${Object.entries(RACES).map(([id, data]) => `<button type="button" class="race-choice ${state.race === id ? "is-selected" : ""}" data-race="${id}"><strong>${data.name}</strong><small>${data.text}</small></button>`).join("")}</div></section><section class="creator-card"><h3>초상화</h3><div class="portrait-layout"><div class="portrait" style="${portraitStyle()}"><span class="eye left"></span><span class="eye right"></span></div><div class="appearance-controls">${appearanceRow("피부", "skin", ["#c88864", "#e1ad7c", "#9b624b", "#704134"])}${appearanceRow("머리", "hair", ["#342019", "#7d4b2a", "#d6ad54", "#d6d2c4"])}${appearanceRow("눈", "eyes", ["#6fbd9c", "#6d9bd0", "#b67c5e", "#a594d4"])}<button type="button" class="random-portrait" data-random>✦ 초상화 다시 생성</button></div></div></section><section class="creator-card"><h3>초기 능력치</h3><p class="stat-points">배분 가능 포인트 ${state.points} · 기본 합계 ${total}</p><div class="stat-builder">${Object.keys(STAT_NAMES).map(key => `<div class="stat-row"><label>${STAT_NAMES[key]} <small>${STAT_HELP[key]}</small></label><button type="button" data-minus="${key}">−</button><b>${state.stats[key]} + ${race.bonus[key] || 0}</b><button type="button" data-plus="${key}">+</button></div>`).join("")}</div></section></div><button type="button" class="creator-confirm" data-confirm>이 모험가로 출발하기</button></div>`;
    creator.querySelector("[data-name]").oninput = event => state.name = event.target.value;
    creator.querySelectorAll("[data-race]").forEach(button => button.onclick = () => { state.race = button.dataset.race; renderCreator(); });
    creator.querySelectorAll("[data-swatch]").forEach(button => button.onclick = () => { state.appearance[button.dataset.part] = button.dataset.swatch; renderCreator(); });
    creator.querySelectorAll("[data-plus]").forEach(button => button.onclick = () => { if (state.points) { state.stats[button.dataset.plus] += 1; state.points -= 1; renderCreator(); } });
    creator.querySelectorAll("[data-minus]").forEach(button => button.onclick = () => { if (state.stats[button.dataset.minus] > 1) { state.stats[button.dataset.minus] -= 1; state.points += 1; renderCreator(); } });
    creator.querySelector("[data-random]").onclick = randomPortrait; creator.querySelector("[data-confirm]").onclick = confirmCreator;
  }
  function appearanceRow(label, part, colors) { return `<div class="appearance-row"><label>${label}</label><div class="swatches">${colors.map(color => `<button type="button" class="swatch ${state.appearance[part] === color ? "is-selected" : ""}" style="--swatch:${color}" data-part="${part}" data-swatch="${color}"></button>`).join("")}</div></div>`; }
  function randomPortrait() { const picks = { skin: ["#c88864", "#e1ad7c", "#9b624b", "#704134"], hair: ["#342019", "#7d4b2a", "#d6ad54", "#d6d2c4"], eyes: ["#6fbd9c", "#6d9bd0", "#b67c5e", "#a594d4"] }; Object.keys(picks).forEach(key => state.appearance[key] = picks[key][Math.floor(Math.random() * picks[key].length)]); renderCreator(); }
  function confirmCreator() {
    const p = game.player; p.name = state.name.trim() || "이름 없는 모험가"; p.raceId = state.race; p.baseAttributes = { ...state.stats }; p.appearance = { ...state.appearance }; p.level = 1; p.xp = 0; p.nextLevelXp = 10; p.unspentPoints = 0; p.equipment = { weapon: "rustSword", armor: "leatherCoat", accessory: "amberCharm" }; p.inventory = ["fieldKnife", "ironPot", "slimeGel", "bitterCap", "bitterCap", "rustSword", "leatherCoat", "amberCharm"]; p.hp = 999; p.stamina = 999; p.hunger = 78; recompute(p); game.log(`${p.name}, ${RACES[p.raceId].name} 모험가가 길드에 등록되었다.`); creator.hidden = true; game.render();
  }
  function showCreator() { if (!state) state = { name: "리아", race: "human", stats: { strength: 2, agility: 2, intelligence: 2, charisma: 2, constitution: 2, wisdom: 2 }, points: 8, appearance: { skin: "#c88864", hair: "#342019", eyes: "#6fbd9c" } }; creator.hidden = false; renderCreator(); }
  function boot() {
    game = window.game; if (!game) return;
    const originalRender = game.render.bind(game); game.render = () => { syncLevel(); originalRender(); };
    createCreator(); modal = createModal();
    dock = document.createElement("nav"); dock.className = "system-dock"; dock.innerHTML = `<button type="button" data-pack>🎒 가방</button><button type="button" data-book>📖 도감</button><button type="button" data-growth>✦ 성장</button>`; document.querySelector(".log-card")?.before(dock);
    dock.querySelector("[data-pack]").onclick = openInventory; dock.querySelector("[data-book]").onclick = openBook; dock.querySelector("[data-growth]").onclick = openGrowth;
    document.addEventListener("click", event => { const button = event.target.closest("button"); if (button && button.textContent.includes("가방 확인")) { event.preventDefault(); event.stopPropagation(); openInventory(); } }, true);
    window.showCharacterCreator = showCreator; updateDock();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
