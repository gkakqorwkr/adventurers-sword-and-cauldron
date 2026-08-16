(() => {
  const regions = [
    { id: "mistwood", name: "안개 낀 숲길", monsters: [
      ["mossSlime", "이끼 점액괴", 15, 5, 1, "mossGel", "이끼 젤"], ["hornBoar", "뿔멧돼지", 23, 7, 2, "boarMeat", "뿔멧돼지 고기"], ["caveSpider", "동굴거미", 21, 8, 3, "spiderLeg", "동굴거미 다리"], ["moonMoth", "달빛나방", 16, 7, 2, "mothDust", "달빛나방 가루"], ["forestWolf", "안개늑대", 19, 7, 2, "wolfLoin", "안개늑대 등심"], ["mossGoblin", "이끼 고블린", 17, 6, 1, "goblinHerb", "고블린 향초"], ["shadeRaven", "그림자 까마귀", 14, 8, 1, "ravenWing", "그림자 날개"]
    ], recipes: [
      ["mossGelSoup", "이끼 젤 맑은 수프", ["mossGel"], 12, 3, "포만감 +12 · HP +3"], ["boarHerbStew", "뿔멧돼지 약초 스튜", ["boarMeat", "bitterCap"], 25, 8, "포만감 +25 · HP +8"], ["spiderFritter", "동굴거미 다리 튀김", ["spiderLeg", "bitterCap"], 20, 5, "포만감 +20 · HP +5"], ["mothHoneyTea", "달빛나방 향차", ["mothDust"], 7, 0, "포만감 +7 · 기력 +7", 7], ["wolfJerky", "안개늑대 육포", ["wolfLoin"], 18, 4, "포만감 +18 · HP +4"], ["goblinRisotto", "고블린 향초 리소토", ["goblinHerb", "mossGel"], 16, 4, "포만감 +16 · HP +4"], ["ravenSkewer", "그림자 날개 꼬치", ["ravenWing", "boarMeat"], 22, 5, "포만감 +22 · HP +5"], ["mistwoodPie", "안개숲 고기 파이", ["boarMeat", "mothDust"], 24, 6, "포만감 +24 · HP +6"], ["forestBroth", "숲의 진한 육수", ["mossGel", "wolfLoin"], 20, 7, "포만감 +20 · HP +7"], ["shadowSalad", "그림자 풀잎 샐러드", ["ravenWing", "goblinHerb"], 11, 2, "포만감 +11 · HP +2"]
    ] },
    { id: "swamp", name: "고목 습지", monsters: [
      ["mossTurtle", "이끼거북", 25, 5, 5, "mossShell", "이끼거북 등갑"], ["bogWisp", "늪불 도깨비불", 17, 9, 1, "wispOil", "도깨비불 기름"], ["fungusSovereign", "균사 군주", 28, 8, 3, "fungalCap", "군주 버섯갓"], ["swampSerpent", "습지비단뱀", 26, 9, 2, "serpentFillet", "습지뱀 살코기"], ["mireGolem", "진흙 골렘", 31, 8, 5, "mireCore", "진흙 심장"], ["carnivorousPlant", "포식 꽃", 22, 9, 2, "nectarPod", "달콤한 꿀주머니"], ["leechSwarm", "검은 거머리 떼", 18, 8, 2, "leechPearl", "거머리 진주"]
    ], recipes: [
      ["shellBroth", "이끼 등갑 육수", ["mossShell", "mossGel"], 9, 10, "포만감 +9 · HP +10"], ["wispOilSoup", "도깨비불 오일 수프", ["wispOil"], 10, 2, "포만감 +10 · HP +2"], ["fungalGratin", "군주 버섯 그라탱", ["fungalCap"], 19, 5, "포만감 +19 · HP +5"], ["serpentNoodles", "습지뱀 국수", ["serpentFillet", "fungalCap"], 23, 6, "포만감 +23 · HP +6"], ["mireBiscuit", "진흙 심장 비스킷", ["mireCore", "mossGel"], 17, 5, "포만감 +17 · HP +5"], ["nectarTart", "꿀주머니 타르트", ["nectarPod"], 14, 2, "포만감 +14 · 기력 +5", 5], ["leechPearlTea", "거머리 진주차", ["leechPearl"], 6, 1, "포만감 +6 · 기력 +8", 8], ["swampCurry", "늪지 향신 카레", ["serpentFillet", "fungalCap"], 26, 8, "포만감 +26 · HP +8"], ["mossRoll", "습지 이끼말이", ["mossShell", "goblinHerb"], 15, 4, "포만감 +15 · HP +4"], ["fogHotpot", "안개 늪 전골", ["wispOil", "serpentFillet"], 22, 7, "포만감 +22 · HP +7"]
    ] },
    { id: "prairie", name: "잿불 초원", monsters: [
      ["fireLizard", "불도마뱀", 24, 9, 2, "emberTail", "불도마뱀 꼬리"], ["ashRam", "재뿔 숫양", 28, 10, 3, "ramRib", "재뿔 양갈비"], ["cinderHyena", "잿가루 하이에나", 22, 9, 2, "cinderMeat", "하이에나 살코기"], ["emberElemental", "불씨 정령", 26, 11, 2, "emberHeart", "불씨 심장"], ["fireBeetle", "화염 딱정벌레", 19, 8, 4, "beetleShell", "불딱정벌레 껍질"], ["charcoalLion", "숯갈기 사자", 33, 11, 3, "blackMane", "검은 갈기"], ["lavaScorpion", "용암 전갈", 27, 10, 4, "scorpionClaw", "용암 전갈 집게"]
    ], recipes: [
      ["emberSkewer", "불도마뱀 꼬리 꼬치", ["emberTail"], 16, 4, "포만감 +16 · HP +4"], ["ramRoast", "재뿔 양갈비 구이", ["ramRib"], 27, 8, "포만감 +27 · HP +8"], ["hyenaStew", "잿가루 하이에나 스튜", ["cinderMeat", "bitterCap"], 23, 6, "포만감 +23 · HP +6"], ["elementalTea", "불씨 심장 차", ["emberHeart"], 5, 0, "포만감 +5 · 기력 +9", 9], ["beetleChips", "화염 껍질 칩", ["beetleShell"], 12, 3, "포만감 +12 · HP +3"], ["lionManeRoast", "숯갈기 사자 갈기구이", ["blackMane", "bitterCap"], 28, 7, "포만감 +28 · HP +7"], ["scorpionCurry", "용암 전갈 카레", ["scorpionClaw", "emberTail"], 25, 7, "포만감 +25 · HP +7"], ["prairieBarbecue", "잿불 초원 바비큐", ["ramRib", "cinderMeat"], 30, 9, "포만감 +30 · HP +9"], ["ashPorridge", "재가루 죽", ["beetleShell", "mossGel"], 14, 4, "포만감 +14 · HP +4"], ["lavaStew", "용암빛 전골", ["emberHeart", "scorpionClaw"], 24, 8, "포만감 +24 · HP +8"]
    ] },
    { id: "mine", name: "폐광 심층", monsters: [
      ["mimic", "미믹", 27, 9, 4, "mimicTooth", "미믹 이빨"], ["crystalDeer", "수정사슴", 25, 9, 3, "crystalShard", "수정 뿔 조각"], ["skeletonMiner", "해골 광부", 24, 10, 3, "boneMarrow", "광부의 골수"], ["oreGolem", "광석 골렘", 35, 9, 6, "golemCore", "광석 심장"], ["caveBat", "동굴박쥐", 16, 7, 1, "batWing", "동굴박쥐 날개"], ["rustAutomaton", "녹슨 자동인형", 29, 9, 5, "rustOil", "광부 기름"], ["blindWorm", "눈먼 광맥지렁이", 23, 8, 2, "wormMeat", "광맥지렁이 살"]
    ], recipes: [
      ["mimicToast", "미믹 이빨 토스트", ["mimicTooth", "mossGel"], 21, 4, "포만감 +21 · HP +4"], ["crystalTea", "수정 뿔 차", ["crystalShard"], 4, 0, "포만감 +4 · 기력 +6", 6], ["marrowRamen", "광부 골수 라면", ["boneMarrow", "bitterCap"], 24, 7, "포만감 +24 · HP +7"], ["golemBiscuit", "광석 심장 비스킷", ["golemCore", "mossGel"], 18, 5, "포만감 +18 · HP +5"], ["batJerky", "동굴박쥐 육포", ["batWing"], 13, 3, "포만감 +13 · HP +3"], ["oilPasta", "광부 기름 파스타", ["rustOil", "fungalCap"], 20, 5, "포만감 +20 · HP +5"], ["wormSkewer", "광맥지렁이 꼬치", ["wormMeat"], 17, 4, "포만감 +17 · HP +4"], ["minePizza", "폐광 화덕 피자", ["mimicTooth", "fungalCap"], 26, 6, "포만감 +26 · HP +6"], ["crystalRisotto", "수정 리소토", ["crystalShard", "boneMarrow"], 22, 6, "포만감 +22 · HP +6"], ["deepPie", "심층 광부 파이", ["wormMeat", "rustOil"], 23, 7, "포만감 +23 · HP +7"]
    ] },
    { id: "canyon", name: "재의 협곡", monsters: [
      ["youngDragon", "새끼용", 34, 11, 4, "drakeScale", "새끼용 비늘"], ["magmaGolem", "마그마 골렘", 38, 11, 6, "magmaCore", "마그마 핵"], ["canyonWyvern", "협곡 와이번", 32, 12, 4, "wyvernWing", "와이번 날개"], ["basaltTroll", "현무암 트롤", 40, 12, 5, "trollMeat", "트롤 등심"], ["volcanicSerpent", "화산뱀장어", 30, 11, 3, "volcanicEel", "화산 뱀장어"], ["fireWraith", "불꽃 망령", 28, 13, 2, "cinderEssence", "불씨 정수"], ["ashHarpy", "재빛 하피", 29, 11, 3, "harpyFeather", "하피 깃털"]
    ], recipes: [
      ["drakeCurry", "새끼용 비늘 카레", ["drakeScale", "emberTail"], 24, 6, "포만감 +24 · HP +6"], ["magmaScone", "마그마 핵 스콘", ["magmaCore"], 15, 5, "포만감 +15 · HP +5"], ["wyvernSoup", "와이번 날개 수프", ["wyvernWing", "bitterCap"], 25, 8, "포만감 +25 · HP +8"], ["trollSteak", "현무암 트롤 스테이크", ["trollMeat"], 31, 10, "포만감 +31 · HP +10"], ["eelSkewer", "화산 뱀장어 꼬치", ["volcanicEel"], 22, 6, "포만감 +22 · HP +6"], ["cinderSorbet", "불씨 정수 셔벗", ["cinderEssence"], 8, 1, "포만감 +8 · 기력 +10", 10], ["harpyPie", "재빛 하피 파이", ["harpyFeather", "trollMeat"], 27, 7, "포만감 +27 · HP +7"], ["volcanoRamen", "화산 협곡 라면", ["volcanicEel", "magmaCore"], 26, 8, "포만감 +26 · HP +8"], ["dragonHotpot", "용비늘 전골", ["drakeScale", "wyvernWing"], 29, 9, "포만감 +29 · HP +9"], ["ashBowl", "재의 협곡 덮밥", ["harpyFeather", "cinderEssence"], 20, 5, "포만감 +20 · HP +5"]
    ] }
  ];

  let monsterImage = 0;
  const monsters = regions.flatMap(region => region.monsters.map(spec => {
    const [id, name, hp, atk, def, dropId, dropName] = spec;
    monsterImage += 1;
    return { id, name, hp, atk, def, dropId, dropName, region: region.id, image: `assets/monsters-v2/m${String(monsterImage).padStart(2, "0")}.png` };
  }));
  let recipeImage = 0;
  const recipes = regions.flatMap(region => region.recipes.map(spec => {
    const [id, name, need, hunger, hp, effect, stamina = 0] = spec;
    recipeImage += 1;
    return { id, name, need, hunger, hp, stamina, effect, region: region.id, image: `assets/foods/r${String(recipeImage).padStart(2, "0")}.png` };
  }));
  const additions = [
    { region: "mistwood", monsters: [["thornStag", "가시등 사슴", 27, 8, 3, "thornVenison", "가시등 사슴 고기"], ["whisperFox", "속삭임 여우", 20, 9, 2, "foxTail", "속삭임 여우 꼬리"], ["barkTreant", "나무껍질 트렌트", 34, 8, 6, "barkSap", "빛나는 나무 수액"]], recipes: [["thornStagRoast", "가시 사슴 숯불구이", ["thornVenison", "bitterCap"], 26, 8, "포만감 +26 · HP +8"], ["whisperFoxTea", "속삭임 여우 꼬리차", ["foxTail"], 8, 1, "포만감 +8 · 기력 +8", 8], ["barkSapJelly", "나무 수액 젤리", ["barkSap", "mossGel"], 14, 4, "포만감 +14 · HP +4"], ["mistwoodHotpot", "안개숲 사냥 전골", ["wolfLoin", "thornVenison"], 29, 9, "포만감 +29 · HP +9"]] },
    { region: "swamp", monsters: [["bogCroc", "늪악어", 36, 10, 4, "crocMeat", "늪악어 고기"], ["reedSiren", "갈대 세이렌", 29, 11, 3, "sirenScale", "갈대 세이렌 비늘"], ["frogKing", "늪개구리왕", 33, 9, 5, "frogLeg", "개구리왕 다리"]], recipes: [["crocRoast", "늪악어 훈제구이", ["crocMeat"], 28, 8, "포만감 +28 · HP +8"], ["sirenPickle", "갈대 세이렌 비늘절임", ["sirenScale"], 13, 4, "포만감 +13 · HP +4"], ["frogLegRoast", "개구리왕 다리구이", ["frogLeg"], 23, 6, "포만감 +23 · HP +6"], ["swampBouillabaisse", "습지 왕국 부야베스", ["crocMeat", "serpentFillet"], 30, 10, "포만감 +30 · HP +10"]] },
    { region: "prairie", monsters: [["emberSalamander", "불꽃 샐러맨더", 31, 12, 3, "salamanderMeat", "불꽃 샐러맨더 살"], ["ashVulture", "재빛 독수리", 25, 11, 2, "vultureWing", "재빛 독수리 날개"], ["coalBuffalo", "석탄 들소", 41, 12, 5, "buffaloRib", "석탄 들소 갈비"]], recipes: [["salamanderRoast", "불꽃 샐러맨더 화덕구이", ["salamanderMeat"], 27, 8, "포만감 +27 · HP +8"], ["vultureSteam", "재빛 독수리 날개찜", ["vultureWing"], 20, 5, "포만감 +20 · HP +5"], ["buffaloRibs", "석탄 들소 갈비찜", ["buffaloRib"], 32, 10, "포만감 +32 · HP +10"], ["prairieGrill", "초원 모닥불 모둠구이", ["salamanderMeat", "buffaloRib"], 34, 11, "포만감 +34 · HP +11"]] },
    { region: "mine", monsters: [["lanternWraith", "등불 망령", 30, 13, 2, "ghostFlame", "망령의 푸른 불꽃"], ["crystalSpider", "수정 거미", 32, 12, 5, "crystalThread", "수정 거미 실"], ["tunnelMole", "터널 두더지", 35, 10, 4, "moleMeat", "터널 두더지 고기"]], recipes: [["ghostFlameSoup", "등불 망령 불꽃 수프", ["ghostFlame"], 12, 5, "포만감 +12 · HP +5"], ["crystalThreadPasta", "수정 거미 실 파스타", ["crystalThread"], 24, 7, "포만감 +24 · HP +7"], ["moleOreStew", "두더지 광맥 스튜", ["moleMeat"], 27, 8, "포만감 +27 · HP +8"], ["minerLunchbox", "심층 채굴자 도시락", ["moleMeat", "boneMarrow"], 30, 9, "포만감 +30 · HP +9"]] },
    { region: "canyon", monsters: [["obsidianBasilisk", "흑요석 바실리스크", 43, 14, 6, "basiliskEye", "흑요석 바실리스크 눈"], ["ashChimera", "재빛 키메라", 46, 15, 5, "chimeraMeat", "재빛 키메라 등심"], ["sunScorpion", "태양 전갈", 39, 14, 6, "sunScorpionShell", "태양 전갈 껍질"]], recipes: [["basiliskCanape", "흑요석 바실리스크 눈 카나페", ["basiliskEye"], 16, 6, "포만감 +16 · HP +6"], ["chimeraSteak", "재빛 키메라 스테이크", ["chimeraMeat"], 34, 11, "포만감 +34 · HP +11"], ["sunScorpionGrill", "태양 전갈 껍질 구이", ["sunScorpionShell"], 24, 7, "포만감 +24 · HP +7"], ["canyonHotpot", "협곡 황혼 전골", ["chimeraMeat", "volcanicEel"], 36, 12, "포만감 +36 · HP +12"]] }
  ];
  let addedMonsterImage = 36, addedRecipeImage = 51;
  additions.forEach(addition => {
    const region = regions.find(row => row.id === addition.region);
    addition.monsters.forEach(spec => { const [id, name, hp, atk, def, dropId, dropName] = spec; region.monsters.push(spec); monsters.push({ id, name, hp, atk, def, dropId, dropName, region: region.id, image: `assets/monsters-v3/m${String(addedMonsterImage++).padStart(2, "0")}.png` }); });
    addition.recipes.forEach(spec => { const [id, name, need, hunger, hp, effect, stamina = 0] = spec; region.recipes.push(spec); recipes.push({ id, name, need, hunger, hp, stamina, effect, region: region.id, image: `assets/foods/r${String(addedRecipeImage++).padStart(2, "0")}.png` }); });
  });
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);

  function currentRegion(player) { return regions.find(region => region.id === player.currentRegionId) || (player.level < 3 ? regions[0] : player.level < 5 ? regions[1] : player.level < 7 ? regions[2] : player.level < 9 ? regions[3] : regions[4]); }
  function ensure(player) { player.discoveredRegionalMonsters ||= []; player.discoveredRecipes ||= []; }
  function addIngredients() { monsters.forEach(monster => { if (!window.ITEMS[monster.dropId]) window.ITEMS[monster.dropId] = { id: monster.dropId, name: monster.dropName, type: "ingredient", tags: ["마물", "육류"], toxicity: 0 }; }); }
  function makeModal() {
    const modal = document.createElement("div"); modal.className = "regional-modal";
    modal.innerHTML = '<div class="regional-modal__shade"></div><section class="regional-modal__panel"><header><div><p>BESTIARY & COOKBOOK</p><h2>발견의 도감</h2></div><button type="button" aria-label="닫기">×</button></header><div class="regional-modal__body"></div></section>';
    document.body.append(modal); const close = () => modal.classList.remove("open"); modal.querySelector(".regional-modal__shade").onclick = close; modal.querySelector("header button").onclick = close; return { modal, close };
  }
  function openBook(ui, game) {
    const player = game.player; ensure(player); const body = ui.modal.querySelector(".regional-modal__body");
    const section = region => {
      const seenMonsters = monsters.filter(monster => monster.region === region.id && player.discoveredRegionalMonsters.includes(monster.id));
      const seenRecipes = recipes.filter(recipe => recipe.region === region.id && player.discoveredRecipes.includes(recipe.id));
      const monsterCards = seenMonsters.length ? seenMonsters.map(monster => `<article class="regional-card"><img src="${monster.image}" alt="${escape(monster.name)}" /><div><h3>${escape(monster.name)}</h3><p>HP ${monster.hp} · 공격 ${monster.atk} · 방어 ${monster.def}</p><small>식재료: ${escape(monster.dropName)}</small></div></article>`).join("") : '<p class="regional-empty">아직 이 지역에서 발견한 마물이 없습니다.</p>';
      const recipeCards = seenRecipes.length ? seenRecipes.map(recipe => `<article class="regional-card recipe"><img src="${recipe.image}" alt="${escape(recipe.name)}" /><div><h3>${escape(recipe.name)}</h3><p>${recipe.need.map(id => escape(window.ITEMS[id]?.name || id)).join(" + ")}</p><small>${escape(recipe.effect)}</small></div></article>`).join("") : '<p class="regional-empty">아직 이 지역에서 완성한 요리가 없습니다.</p>';
      return `<section class="regional-section"><h3>${region.name}</h3><p class="regional-count">마물 ${seenMonsters.length}/${region.monsters.length} · 요리 ${seenRecipes.length}/${region.recipes.length}</p><h4>발견한 마물</h4><div class="regional-grid">${monsterCards}</div><h4>발견한 요리</h4><div class="regional-grid">${recipeCards}</div></section>`;
    };
    body.innerHTML = `<p class="regional-intro">마물은 조우해야, 요리는 재료를 정확히 섞어야 기록됩니다. 미발견 항목은 모습을 드러내지 않습니다.</p>${regions.map(section).join("")}`; ui.modal.classList.add("open");
  }
  function boot() {
    const game = window.game; if (!game || !window.ITEMS) return setTimeout(boot, 50); addIngredients(); window.REGIONAL_RECIPES = recipes; window.REGIONAL_MONSTERS = monsters; window.REGIONS = regions; ensure(game.player); game.player.currentRegionId ||= "mistwood";
    const ui = makeModal(); const previousRender = game.render.bind(game);
    game.render = () => { previousRender(); const region = currentRegion(game.player); const location = document.querySelector("#location"); if (location) location.textContent = game.scene === "camp" ? "잿불 길드의 야영지" : `${region.name}${game.enemy ? " — 전투" : ""}`; const regionalMonster = monsters.find(monster => monster.name === game.enemy?.name); const image = game.enemy?.image || regionalMonster?.image; if (image) { const scene = document.querySelector("#scene"), heading = scene.querySelector("h2"); if (heading && !scene.querySelector(".scene-monster-art")) heading.insertAdjacentHTML("beforebegin", `<img class="scene-monster-art" src="${image}" alt="${escape(game.enemy?.name || regionalMonster?.name || "마물")}" />`); } };
    const previousExplore = game.explore.bind(game);
    game.explore = () => { if (game.enemy || Math.random() > .58) return previousExplore(); const player = game.player; game.advanceTurn(); player.stamina -= 2; player.hunger -= 5; game.clamp(); if (!player.hp) return game.defeat(); const region = currentRegion(player), pool = monsters.filter(monster => monster.region === region.id), monster = pool[Math.floor(Math.random() * pool.length)]; player.discoveredRegionalMonsters.push(monster.id); game.enemy = { name: monster.name, hp: monster.hp, maxHp: monster.hp, atk: monster.atk, def: monster.def, drops: [monster.dropId] }; game.scene = "combat"; game.log(`${region.name}에서 ${monster.name}이(가) 길을 막아섰다! ${monster.dropName}을(를) 노려볼 수 있다.`); };
    const book = document.querySelector(".system-dock [data-book]"); if (book) book.onclick = () => openBook(ui, game); game.render();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
