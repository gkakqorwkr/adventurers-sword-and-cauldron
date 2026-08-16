(() => {
  const bossData = {
    mistwood: ["안개숲의 뿔왕", "hornBoar", 3, 6, 3],
    swamp: ["고목 늪의 균사 여왕", "fungusSovereign", 3, 6, 3],
    prairie: ["잿불 갈기왕", "charcoalLion", 3, 6, 3],
    mine: ["광맥의 철거인", "oreGolem", 3, 6, 3],
    canyon: ["용암 심장룡", "youngDragon", 3, 7, 4]
  };
  const npcLines = [
    ["길 잃은 정찰병", "낡은 지도를 펼쳐 길을 묻는다.", "지도 읽기를 돕는다", "안전한 쉼터를 알려 준다", "경계를 나눠 맡는다"],
    ["재료 수집가", "마물 부산물의 향을 맡고 조리법을 궁금해한다.", "재료 정보를 나눈다", "값을 흥정한다", "함께 채집한다"],
    ["상처 입은 길드원", "다음 길목의 위험을 경고한다.", "응급 처치를 돕는다", "경고를 자세히 듣는다", "호위를 제안한다"]
  ];
  let game, modal;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" })[char]);
  const region = () => window.REGIONS.find(row => row.id === game.player.currentRegionId) || window.REGIONS[0];
  const monsters = () => window.REGIONAL_MONSTERS || [];
  function ensure() {
    const p = game.player;
    p.currentRegionId ||= "mistwood";
    p.regionBattles ||= 0;
    p.regionNpcInteractions ||= 0;
    p.regionGateState ||= "exploring";
    return p;
  }
  function open(title, kicker, body) { modal.querySelector("h2").textContent = title; modal.querySelector("header p").textContent = kicker; modal.querySelector(".progress-modal__body").innerHTML = body; modal.classList.add("open"); }
  function close() { modal.classList.remove("open"); }
  function progressText() { const p = ensure(); return `전투 ${p.regionBattles}/20 · 인물 교류 ${p.regionNpcInteractions}/10`; }
  function gearDrops(index, guaranteed = false) {
    const pool = Object.keys(window.GEAR || {}).filter(id => window.GEAR[id].price);
    if (!pool.length || (!guaranteed && Math.random() >= .2)) return [];
    const start = Math.min(pool.length - 1, index * 8);
    return [pool[(start + Math.floor(Math.random() * Math.min(12, pool.length - start))) % pool.length]];
  }
  function markGate() { const p = ensure(); if (p.regionGateState === "exploring" && (p.regionBattles >= 20 || p.regionNpcInteractions >= 10)) { p.regionGateState = "shaman"; game.log("낯선 주술사의 징표가 길가에 나타났다. 다음 탐험에서 그를 만날 수 있다."); } }
  function spawnMonster() {
    const p = ensure(), here = region(), pool = monsters().filter(row => row.region === here.id), monster = pool[Math.floor(Math.random() * pool.length)];
    p.discoveredRegionalMonsters.push(monster.id);
    const regionIndex = window.REGIONS.indexOf(here);
    game.enemy = { name: monster.name, hp: monster.hp, maxHp: monster.hp, atk: monster.atk, def: monster.def, drops: [monster.dropId, ...gearDrops(regionIndex)], image: monster.image, regionId: here.id };
    game.scene = "combat";
    game.log(`${here.name}에서 ${monster.name}이(가) 나타났다. ${monster.dropName}을(를) 노려볼 수 있다.`);
  }
  function spawnBoss() {
    const p = ensure(), here = region(), [name, baseId, hpMult, atkBonus, defBonus] = bossData[here.id], base = monsters().find(row => row.id === baseId), index = window.REGIONS.indexOf(here);
    game.enemy = { name, hp: base.hp * hpMult, maxHp: base.hp * hpMult, atk: base.atk + atkBonus, def: base.def + defBonus, drops: [base.dropId, ...gearDrops(index, true)], image: base.image, regionalBoss: true, regionId: here.id };
    game.scene = "combat"; p.regionGateState = "boss"; game.log(`${name}이(가) 주술사의 부름에 응답했다. 다음 길을 열려면 쓰러뜨려야 한다.`);
  }
  function openShaman() {
    const here = region();
    open("길목의 주술사", "TURNING POINT · " + progressText(), `<article class="progress-card"><p>낡은 가면을 쓴 주술사가 ${here.name}의 경계를 가리킨다.</p><h3>“길은 수호자의 피를 기억한다.”</h3><p>이 지역의 보스급 수호자를 쓰러뜨리면 다음 지역을 선택할 수 있다.</p><button type="button" data-boss>수호자에게 도전한다</button><button type="button" data-close>아직 준비가 필요하다</button></article>`);
    modal.querySelector("[data-boss]").onclick = () => { close(); spawnBoss(); game.render(); };
    modal.querySelector("[data-close]").onclick = close;
  }
  function resetCycle(note) { const p = ensure(); p.regionBattles = 0; p.regionNpcInteractions = 0; p.regionGateState = "exploring"; game.log(note); }
  function openRoutes(source = "수호자의 흔적") {
    const here = region(), options = window.REGIONS.filter(row => row.id !== here.id);
    open("갈림길의 선택", source.toUpperCase(), `<article class="progress-card"><p>${source}이(가) 새로운 길을 드러냈다. 떠날 곳을 직접 고를 수 있다.</p><div class="progress-choices">${options.map(row => `<button type="button" data-route="${row.id}">${esc(row.name)}로 향한다</button>`).join("")}<button type="button" data-stay>아직 ${esc(here.name)}에 남는다</button></div></article>`);
    modal.querySelectorAll("[data-route]").forEach(button => button.onclick = () => { const destination = window.REGIONS.find(row => row.id === button.dataset.route); ensure().currentRegionId = destination.id; resetCycle(`${destination.name}로 향하는 길을 선택했다.`); close(); game.scene = "wild"; game.render(); });
    modal.querySelector("[data-stay]").onclick = () => { resetCycle(`${here.name}에 더 머물기로 했다. 수호자는 다시 20회 전투 또는 10회 인물 교류 뒤에 모습을 드러낼 것이다.`); close(); game.render(); };
  }
  function interactNpc() {
    const p = ensure(), npc = npcLines[Math.floor(Math.random() * npcLines.length)];
    open(`${npc[0]}과의 만남`, "NPC INTERACTION · " + progressText(), `<article class="progress-card"><p>${npc[1]}</p><div class="progress-choices">${npc.slice(2).map((choice, index) => `<button type="button" data-npc="${index}">${choice}</button>`).join("")}</div></article>`);
    modal.querySelectorAll("[data-npc]").forEach(button => button.onclick = () => { p.regionNpcInteractions += 1; const reward = Number(button.dataset.npc) === 1 ? 8 : 3; p.xp += reward; game.log(`${npc[0]}과(와) 교류했다. 경험치 ${reward} 획득. ${progressText()}`); markGate(); close(); game.render(); });
  }
  function openMerchant() {
    open("떠돌이 상인", "TRADE EVENT", `<article class="progress-card"><p>수레를 끄는 상인이 장비 꾸러미와 금화 주머니를 내보인다.</p><div class="progress-choices"><button type="button" data-trade>장비를 사고팔기</button><button type="button" data-rumor>다음 길의 소문을 듣기</button><button type="button" data-close>거래하지 않는다</button></div></article>`);
    modal.querySelector("[data-trade]").onclick = () => { close(); window.TRPG_TOWN?.(); };
    modal.querySelector("[data-rumor]").onclick = () => { game.player.xp += 3; game.log("상인이 수호자와 다음 길에 관한 소문을 들려줬다. 경험치 3 획득."); close(); game.render(); };
    modal.querySelector("[data-close]").onclick = close;
  }
  function explore() {
    const p = ensure(); if (game.enemy) return; game.advanceTurn(); p.stamina -= 2; p.hunger -= 5; game.clamp(); if (!p.hp) return game.defeat();
    if (p.regionGateState === "shaman") return openShaman();
    const roll = Math.random();
    if (roll < .03) return openRoutes("길 잃은 요정들의 안내");
    if (roll < .15) { game.log("작은 마을의 장터를 발견했다."); return window.TRPG_TOWN?.(); }
    if (roll < .28) return openMerchant();
    if (roll < .53) return interactNpc();
    if (roll < .93) return spawnMonster();
    const supply = ["bitterCap", ...monsters().filter(row => row.region === region().id).map(row => row.dropId)]; const found = supply[Math.floor(Math.random() * supply.length)]; p.inventory.push(found); game.log(`${window.ITEMS[found]?.name || found}을(를) 발견했다.`);
  }
  function boot() {
    game = window.game; if (!game || !window.REGIONS) return setTimeout(boot, 50); ensure();
    modal = document.createElement("div"); modal.className = "progress-modal"; modal.innerHTML = '<div class="progress-modal__shade"></div><section class="progress-modal__panel"><header><div><p></p><h2></h2></div><button type="button" aria-label="닫기">×</button></header><div class="progress-modal__body"></div></section>'; document.body.append(modal); modal.querySelector(".progress-modal__shade").onclick = close; modal.querySelector("header button").onclick = close;
    game.explore = explore;
    const previousAttack = game.combat.attack.bind(game.combat);
    game.combat.attack = (...args) => { const enemy = game.enemy; previousAttack(...args); if (!enemy || enemy.hp > 0) return; const p = ensure(); if (enemy.regionalBoss) { openRoutes("수호자 격파"); return; } if (enemy.regionId === region().id) { p.regionBattles += 1; game.log(`${region().name} 전투 기록: ${progressText()}`); markGate(); } };
    game.render();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
