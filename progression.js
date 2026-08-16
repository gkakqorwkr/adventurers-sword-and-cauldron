(() => {
  const bossData = {
    mistwood: ["안개숲의 뿔왕", "hornBoar", 3, 6, 3],
    swamp: ["고목 늪의 균사 여왕", "fungusSovereign", 3, 6, 3],
    prairie: ["잿불 갈기왕", "charcoalLion", 3, 6, 3],
    mine: ["광맥의 철거인", "oreGolem", 3, 6, 3],
    canyon: ["용암 심장룡", "youngDragon", 3, 7, 4]
  };
  const npcLines = [
    { name: "길 잃은 정찰병", text: "낡은 지도를 펼쳐 길을 묻는다.", choices: [["지능", "지도 읽기를 돕는다", "intelligence", 13, "gold"], ["지혜", "안전한 쉼터를 알려 준다", "wisdom", 12, "recipe"], ["민첩", "경계를 나눠 맡는다", "agility", 14, "gear"]] },
    { name: "재료 수집가", text: "마물 부산물의 향을 맡고 조리법을 궁금해한다.", choices: [["카리스마", "값을 흥정한다", "charisma", 13, "gold"], ["지능", "재료 정보를 나눈다", "intelligence", 14, "recipe"], ["민첩", "함께 채집한다", "agility", 12, "supply"]] },
    { name: "상처 입은 길드원", text: "다음 길목의 위험을 경고한다.", choices: [["건강", "응급 처치를 돕는다", "constitution", 12, "gold"], ["지혜", "경고를 자세히 듣는다", "wisdom", 14, "recipe"], ["힘", "호위를 제안한다", "strength", 14, "gear"]] },
    { name: "떠돌이 조리사 마렉", text: "검은 솥을 닦으며 마물 부산물의 조합을 시험하고 있다.", choices: [["지능", "재료의 반응을 함께 분석한다", "intelligence", 13, "recipe"], ["카리스마", "맛을 설득력 있게 평한다", "charisma", 13, "gold"], ["지혜", "불꽃의 세기를 가늠한다", "wisdom", 14, "recipe"]] }
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
  function recordStory(title, detail) { const p = ensure(); p.story ||= []; p.story.unshift({ title, detail }); p.story = p.story.slice(0, 20); }
  function grantRecipe() { const p = ensure(); p.discoveredRecipes ||= []; const choices = (window.REGIONAL_RECIPES || []).filter(recipe => recipe.region === region().id && !p.discoveredRecipes.includes(recipe.id)); if (!choices.length) return "새로운 조리법의 단서는 이미 모두 익숙하다."; const recipe = choices[Math.floor(Math.random() * choices.length)]; p.discoveredRecipes.push(recipe.id); return `${recipe.name} 레시피를 배웠다.`; }
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
    open("길목의 주술사", "TURNING POINT", `<article class="progress-card"><p>낡은 가면을 쓴 주술사가 ${here.name}의 경계를 가리킨다.</p><h3>“길은 수호자의 피를 기억한다.”</h3><p>이 지역의 보스급 수호자를 쓰러뜨리면 다음 지역을 선택할 수 있다.</p><button type="button" data-boss>수호자에게 도전한다</button><button type="button" data-close>아직 준비가 필요하다</button></article>`);
    modal.querySelector("[data-boss]").onclick = () => { close(); spawnBoss(); game.render(); };
    modal.querySelector("[data-close]").onclick = close;
  }
  function resetCycle(note) { const p = ensure(); p.regionBattles = 0; p.regionNpcInteractions = 0; p.regionGateState = "exploring"; game.log(note); }
  function openRoutes(source = "수호자의 흔적") {
    const here = region(), options = window.REGIONS.filter(row => row.id !== here.id);
    open("갈림길의 선택", source.toUpperCase(), `<article class="progress-card"><p>${source}이(가) 새로운 길을 드러냈다. 떠날 곳을 직접 고를 수 있다.</p><div class="progress-choices">${options.map(row => `<button type="button" data-route="${row.id}">${esc(row.name)}로 향한다</button>`).join("")}<button type="button" data-stay>아직 ${esc(here.name)}에 남는다</button></div></article>`);
    modal.querySelectorAll("[data-route]").forEach(button => button.onclick = () => { const destination = window.REGIONS.find(row => row.id === button.dataset.route); ensure().currentRegionId = destination.id; resetCycle(`${destination.name}로 향하는 길을 선택했다.`); close(); game.scene = "wild"; game.render(); });
    modal.querySelector("[data-stay]").onclick = () => { resetCycle(`${here.name}에 더 머물기로 했다. 수호자가 다시 당신의 행적을 지켜볼 것이다.`); close(); game.render(); };
  }
  function interactNpc() {
    const p = ensure(), npc = npcLines[Math.floor(Math.random() * npcLines.length)];
    open(`${npc.name}과의 만남`, "NPC INTERACTION", `<article class="progress-card"><p>${npc.text}</p><div class="progress-choices">${npc.choices.map((choice, index) => `<button type="button" data-npc="${index}">[${choice[0]} 판정] ${choice[1]}</button>`).join("")}</div></article>`);
    modal.querySelectorAll("[data-npc]").forEach(button => button.onclick = () => {
      const choice = npc.choices[Number(button.dataset.npc)], success = game.check(choice[2], choice[3], `${npc.name}의 부탁`);
      p.regionNpcInteractions += 1; let detail;
      if (success) {
        const index = window.REGIONS.indexOf(region());
        if (choice[4] === "gold") { const gold = 12 + Math.floor(Math.random() * 14); p.gold += gold; detail = `금화 ${gold}G를 받았다.`; }
        else if (choice[4] === "recipe") detail = grantRecipe();
        else if (choice[4] === "supply") { const supplies = monsters().filter(row => row.region === region().id); const found = supplies[Math.floor(Math.random() * supplies.length)].dropId; p.inventory.push(found); detail = `${window.ITEMS[found]?.name || found}을(를) 받았다.`; }
        else { const drop = gearDrops(index, Math.random() < .45); if (drop.length) { p.inventory.push(...drop); detail = `${window.GEAR[drop[0]].name}을(를) 받았다.`; } else { p.gold += 15; detail = "금화 15G를 받았다."; } }
        p.xp += 6;
      } else { p.xp += 2; detail = "도움에는 실패했지만 경험치 2를 얻었다."; }
      game.clamp(); recordStory(npc.name, `${choice[1]} — ${success ? "성공" : "실패"}. ${detail}`); game.log(`${npc.name}과(와) 교류했다. ${detail}`); markGate(); close(); game.render();
    });
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
    game.combat.attack = (...args) => { const enemy = game.enemy; previousAttack(...args); if (!enemy || enemy.hp > 0) return; const p = ensure(); if (enemy.regionalBoss) { recordStory("수호자 격파", `${enemy.name}을(를) 쓰러뜨리고 새로운 길을 마주했다.`); openRoutes("수호자 격파"); return; } if (enemy.regionId === region().id) { p.regionBattles += 1; recordStory("마물 사냥", `${region().name}에서 ${enemy.name}을(를) 쓰러뜨렸다.`); markGate(); } };
    game.render();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
