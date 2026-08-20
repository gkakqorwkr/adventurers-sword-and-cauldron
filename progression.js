(() => {
  const bossData = {
    mistwood: ["안개숲의 뿔왕", "hornBoar", 3, 6, 3, "hornKingSpear"],
    swamp: ["고목 늪의 균사 여왕", "fungusSovereign", 3, 6, 3, "myceliumCrown"],
    prairie: ["잿불 갈기왕", "charcoalLion", 3, 6, 3, "emberManeBlade"],
    mine: ["광맥의 철거인", "oreGolem", 3, 6, 3, "deepcoreStaff"],
    canyon: ["용암 심장룡", "youngDragon", 3, 7, 4, "lavaHeartAegis"]
  };
  const npcLines = [
    { name: "길 잃은 정찰병", text: "낡은 지도를 펼쳐 길을 묻는다.", choices: [["지능", "지도 읽기를 돕는다", "intelligence", 13, "gold"], ["지혜", "안전한 쉼터를 알려 준다", "wisdom", 12, "recipe"], ["민첩", "경계를 나눠 맡는다", "agility", 14, "gear"]] },
    { name: "재료 수집가", text: "마물 부산물의 향을 맡고 조리법을 궁금해한다.", choices: [["카리스마", "값을 흥정한다", "charisma", 13, "gold"], ["지능", "재료 정보를 나눈다", "intelligence", 14, "recipe"], ["민첩", "함께 채집한다", "agility", 12, "supply"]] },
    { name: "상처 입은 길드원", text: "다음 길목의 위험을 경고한다.", choices: [["건강", "응급 처치를 돕는다", "constitution", 12, "gold"], ["지혜", "경고를 자세히 듣는다", "wisdom", 14, "recipe"], ["힘", "호위를 제안한다", "strength", 14, "gear"]] },
    { traveler:true, name: "떠돌이 조리사 마렉", portrait:"assets/portraits/variants/human-1.png", affinity:true, text: "검은 솥을 닦으며 마물 부산물의 조합을 시험하고 있다.", choices: [["지능", "재료의 반응을 함께 분석한다", "intelligence", 13, "recipe"], ["카리스마", "맛을 설득력 있게 평한다", "charisma", 13, "gold"], ["지혜", "불꽃의 세기를 가늠한다", "wisdom", 14, "recipe"]] },
    { region:"mistwood", name:"엘린 이끼 약초꾼", portrait:"assets/portraits/variants/elf-2.png", affinity:true, text:"안개에 젖은 약초를 말리며 독성의 변화를 기록한다.", choices:[["지능","안개 약초의 성질을 분석한다","intelligence",13,"recipe"],["지혜","안전한 채집터를 찾아 준다","wisdom",12,"supply"],["카리스마","길드에 약초꾼을 소개하겠다고 약속한다","charisma",14,"gold"]] },
    { region:"mistwood", name:"토르안 길목 수호자", portrait:"assets/portraits/variants/dwarf-2.png", affinity:true, text:"쓰러진 표지석을 붙들고 길 잃은 아이를 찾고 있다.", choices:[["힘","표지석을 함께 세운다","strength",12,"gear"],["민첩","안개 속 흔적을 빠르게 추적한다","agility",14,"gold"],["건강","끝까지 수색을 돕는다","constitution",13,"supply"]] },
    { region:"swamp", name:"네르 갈대 의술사", portrait:"assets/portraits/variants/human-2.png", affinity:true, text:"물에 잠긴 약병을 건져 올리며 치료법을 시험한다.", choices:[["지능","약병의 성분을 분류한다","intelligence",14,"recipe"],["건강","독성 있는 뿌리를 견딘다","constitution",13,"gold"],["지혜","늪의 물길을 읽어 약초를 찾는다","wisdom",12,"supply"]] },
    { region:"swamp", name:"바렌 늪배 사공", portrait:"assets/portraits/variants/dwarf-3.png", text:"기울어진 배 위에서 사라진 화물을 찾고 있다.", choices:[["민첩","갈대 사이로 밧줄을 건넨다","agility",13,"gear"],["카리스마","화주를 달래 운임을 받는다","charisma",13,"gold"],["힘","빠진 화물을 끌어올린다","strength",12,"supply"]] },
    { region:"prairie", name:"릴라 재목동", portrait:"assets/portraits/variants/human-3.png", affinity:true, text:"잿불 양 떼가 겁을 먹고 흩어져 있다.", choices:[["카리스마","피리 소리로 양 떼를 달랜다","charisma",12,"gold"],["민첩","흩어진 양을 빠르게 몰아넣는다","agility",14,"gear"],["지혜","바람을 읽고 안전한 목초지를 찾는다","wisdom",13,"recipe"]] },
    { region:"prairie", name:"코르 화염 사육사", portrait:"assets/portraits/variants/dragonkin-2.png", text:"불도마뱀 둥지 근처에서 알을 지키고 있다.", choices:[["지능","알의 온도를 조절한다","intelligence",14,"recipe"],["건강","뜨거운 모래를 견디며 둥지를 정돈한다","constitution",13,"supply"],["힘","무너진 돌무더기를 옮긴다","strength",13,"gear"]] },
    { region:"mine", name:"브롬 광맥 측량사", portrait:"assets/portraits/variants/dwarf-1.png", affinity:true, text:"수정 광맥의 균열을 앞에 두고 지도를 펼쳤다.", choices:[["지능","룬이 새긴 균열을 해독한다","intelligence",14,"gear"],["지혜","광맥의 울림으로 안전한 길을 고른다","wisdom",13,"recipe"],["힘","막힌 갱도를 넓힌다","strength",14,"gold"]] },
    { region:"mine", name:"세라 룬 해독사", portrait:"assets/portraits/variants/elf-3.png", text:"빛나는 석판의 문장을 조용히 베껴 쓰고 있다.", choices:[["지능","잊힌 룬을 함께 번역한다","intelligence",12,"recipe"],["카리스마","후원자를 설득해 보상을 받는다","charisma",14,"gold"],["민첩","무너지는 석판을 먼저 받친다","agility",14,"gear"]] },
    { region:"canyon", name:"이아 불꽃 전령", portrait:"assets/portraits/variants/dragonkin-3.png", affinity:true, text:"불길한 붉은 연기를 보고 봉화대를 고치고 있다.", choices:[["지혜","연기의 방향으로 위험을 읽는다","wisdom",13,"recipe"],["건강","열기를 견디며 봉화를 세운다","constitution",14,"gear"],["카리스마","협곡 부족에게 경고를 전달한다","charisma",13,"gold"]] },
    { region:"canyon", name:"카드린 협곡 대장장이", portrait:"assets/portraits/variants/dwarf-2.png", text:"식은 용암 철을 두드리며 좋은 광석을 찾고 있다.", choices:[["힘","모루를 함께 두드린다","strength",13,"gear"],["지능","금속의 결을 분석한다","intelligence",14,"recipe"],["민첩","불똥을 피해 담금질한다","agility",13,"supply"]] },
    { traveler:true, name:"수레꾼 도렌", portrait:"assets/portraits/variants/dwarf-3.png", text:"먼 길을 가는 수레의 바퀴가 진흙에 빠졌다.", choices:[["힘","수레를 밀어 올린다","strength",12,"gear"],["카리스마","다른 여행자에게 도움을 청한다","charisma",13,"gold"],["건강","짐을 나르며 길을 낸다","constitution",13,"supply"]] },
    { traveler:true, name:"별노래 리라", portrait:"assets/portraits/variants/elf-1.png", affinity:true, text:"모닥불 곁에서 다음 지역의 전설을 노래하고 있다.", choices:[["카리스마","노래에 화음을 보탠다","charisma",12,"gold"],["지혜","전설 속 경고를 새겨 듣는다","wisdom",13,"recipe"],["민첩","사라진 악보 조각을 찾아온다","agility",14,"gear"]] }
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
    p.npcAffection ||= {};
    return p;
  }
  function open(title, kicker, body) { modal.querySelector("h2").textContent = title; modal.querySelector("header p").textContent = kicker; modal.querySelector(".progress-modal__body").innerHTML = body; modal.classList.add("open"); }
  function close() { modal.classList.remove("open"); }
  function recordStory(title, detail) { const p = ensure(); p.story ||= []; p.story.unshift({ title, detail }); p.story = p.story.slice(0, 20); }
  function grantRecipe() { const p = ensure(); p.discoveredRecipes ||= []; const choices = (window.REGIONAL_RECIPES || []).filter(recipe => recipe.region === region().id && !p.discoveredRecipes.includes(recipe.id)); if (!choices.length) return "새로운 조리법의 단서는 이미 모두 익숙하다."; const recipe = choices[Math.floor(Math.random() * choices.length)]; p.discoveredRecipes.push(recipe.id); return `${recipe.name} 레시피를 배웠다.`; }
  function gearDrops(index, guaranteed = false) {
    const tiers = [[0, 70], [60, 105], [90, 140], [115, 175], [140, Infinity]];
    const [min, max] = tiers[Math.max(0, Math.min(index, tiers.length - 1))];
    const eligible = Object.keys(window.GEAR || {}).filter(id => {
      const gear = window.GEAR[id];
      return gear.price && !gear.unique && gear.price >= min && gear.price <= max;
    });
    const pool = eligible.length ? eligible : Object.keys(window.GEAR || {}).filter(id => window.GEAR[id].price && !window.GEAR[id].unique);
    if (!pool.length || (!guaranteed && Math.random() >= .2)) return [];
    return [pool[Math.floor(Math.random() * pool.length)]];
  }
  function markGate() {
    const p = ensure();
    if (p.regionGateState === "exploring" && (p.regionBattles >= 20 || p.regionNpcInteractions >= 10)) {
      p.regionGateState = "shaman";
      game.log("낯선 주술사의 징표가 길가에 나타났다. 다음 탐험에서 주술사를 만날 수 있다.");
      return true;
    }
    return p.regionGateState === "shaman";
  }
  function ingredientDrop(monster) { return Math.random() < .5 ? [monster.dropId] : []; }
  function spawnMonster() {
    const p = ensure(), here = region(), pool = monsters().filter(row => row.region === here.id), monster = pool[Math.floor(Math.random() * pool.length)];
    p.discoveredRegionalMonsters.push(monster.id);
    const regionIndex = window.REGIONS.indexOf(here);
    const ingredients = ingredientDrop(monster);
    const threat = 1 + Math.max(0, regionIndex) * .16;
    const hp = Math.round(monster.hp * threat), atk = monster.atk + Math.max(0, regionIndex), def = monster.def + Math.floor(Math.max(0, regionIndex) / 2);
    game.enemy = { name: monster.name, hp, maxHp: hp, atk, def, agility: monster.agility, role: monster.role, drops: [...ingredients, ...gearDrops(regionIndex)], image: monster.image, regionId: here.id };
    game.scene = "combat";
    game.log(`${here.name}에서 ${monster.name}이(가) 나타났다. ${ingredients.length ? `${monster.dropName}을(를) 노려볼 수 있다.` : "이번에는 조리 재료를 지니고 있지 않은 듯하다."}`);
  }
  function spawnBoss() {
    const p = ensure(), here = region(), [name, baseId, hpMult, atkBonus, defBonus, uniqueGear] = bossData[here.id], base = monsters().find(row => row.id === baseId), index = window.REGIONS.indexOf(here);
    game.enemy = { name, hp: base.hp * hpMult, maxHp: base.hp * hpMult, atk: base.atk + atkBonus, def: base.def + defBonus, agility: base.agility + 2, role: "보스", drops: [...ingredientDrop(base), uniqueGear, ...gearDrops(index, true)], image: base.image, regionalBoss: true, regionId: here.id };
    game.scene = "combat"; p.regionGateState = "boss"; game.log(`${name}이(가) 주술사의 부름에 응답했다. 다음 길을 열려면 쓰러뜨려야 한다.`);
  }
  function openShaman() {
    const here = region();
    open("길목의 주술사", "TURNING POINT", `<article class="progress-card"><p>낡은 가면을 쓴 주술사가 ${here.name}의 경계를 가리킨다.</p><h3>“길은 수호자의 피를 기억한다.”</h3><p>이 지역의 보스급 수호자를 쓰러뜨리면, 정해진 다음 지역으로 향할 길이 열린다.</p><button type="button" data-boss>수호자에게 도전한다</button><button type="button" data-close>아직 준비가 필요하다</button></article>`);
    modal.querySelector("[data-boss]").onclick = () => { close(); spawnBoss(); game.render(); };
    modal.querySelector("[data-close]").onclick = () => { resetCycle("주술사는 당신의 준비가 아직 부족하다며 안개 속으로 사라졌다."); close(); game.render(); };
  }
  function resetCycle(note) { const p = ensure(); p.regionBattles = 0; p.regionNpcInteractions = 0; p.regionGateState = "exploring"; game.log(note); }
  function openRoutes(source = "수호자의 흔적") {
    const here = region(), index = window.REGIONS.indexOf(here), destination = window.REGIONS[index + 1];
    if (!destination) {
      open("협곡 끝의 이정표", source.toUpperCase(), `<article class="progress-card"><p>${source}이(가) 길의 끝을 비춘다. 지금은 ${esc(here.name)} 너머로 이어진 여정이 없다.</p><div class="progress-choices"><button type="button" data-stay>이 지역을 더 탐험한다</button></div></article>`);
      modal.querySelector("[data-stay]").onclick = () => { resetCycle(`${here.name}의 끝자락을 다시 살피기로 했다.`); close(); game.render(); };
      return;
    }
    open("다음 여정", source.toUpperCase(), `<article class="progress-card"><p>${source}이(가) ${esc(destination.name)}으로 이어지는 길을 드러냈다.</p><h3>${esc(destination.name)}으로 출발하겠는가?</h3><p>더 깊은 지역에서는 더 강한 마물과 더 값진 장비가 기다린다.</p><div class="progress-choices"><button type="button" data-route="${destination.id}">${esc(destination.name)}으로 향한다</button><button type="button" data-stay>아직 ${esc(here.name)}에 남는다</button></div></article>`);
    modal.querySelector("[data-route]").onclick = () => { ensure().currentRegionId = destination.id; resetCycle(`${destination.name}으로 향하는 길을 떠났다.`); close(); game.scene = "wild"; game.render(); };
    modal.querySelector("[data-stay]").onclick = () => { resetCycle(`${here.name}에 더 머물기로 했다. 수호자가 다시 당신의 행적을 지켜볼 것이다.`); close(); game.render(); };
  }
  function interactNpc() {
    const p = ensure(), local = npcLines.filter(entry => entry.region === region().id || entry.traveler), pool = local.length ? local : npcLines, npc = pool[Math.floor(Math.random() * pool.length)], affection = p.npcAffection[npc.name] || 0, rank = affection >= 80 ? "친밀" : affection >= 50 ? "신뢰" : affection >= 20 ? "호의" : "낯섦";
    const portrait = npc.portrait ? `<img class="npc-portrait" src="${npc.portrait}" alt="${esc(npc.name)} 초상화">` : "";
    const bond = npc.affinity ? `<p class="npc-affection">♥ 호감도 ${affection}/100 · ${rank}</p>` : "";
    open(`${npc.name}과의 만남`, "NPC INTERACTION", `<article class="progress-card"><div class="npc-intro">${portrait}<div><p>${npc.text}</p>${bond}</div></div><div class="progress-choices">${npc.choices.map((choice, index) => `<button type="button" data-npc="${index}">[${choice[0]} 판정] ${choice[1]}</button>`).join("")}</div></article>`);
    modal.querySelectorAll("[data-npc]").forEach(button => button.onclick = () => {
      const choice = npc.choices[Number(button.dataset.npc)], success = game.check(choice[2], choice[3], `${npc.name}의 부탁`);
      p.regionNpcInteractions += 1; let detail;
      if (success) {
        const index = window.REGIONS.indexOf(region());
        if (choice[4] === "gold") { const gold = 12 + Math.floor(Math.random() * 14); p.gold += gold; detail = `금화 ${gold}G를 받았다.`; }
        else if (choice[4] === "recipe") detail = grantRecipe();
        else if (choice[4] === "supply") { const supplies = monsters().filter(row => row.region === region().id); const found = supplies[Math.floor(Math.random() * supplies.length)].dropId; p.inventory.push(found); detail = `${window.ITEMS[found]?.name || found}을(를) 받았다.`; }
        else { const drop = gearDrops(index, Math.random() < .45); if (drop.length) { p.inventory.push(...drop); detail = `${window.GEAR[drop[0]].name}을(를) 받았다.`; } else { p.gold += 15; detail = "금화 15G를 받았다."; } queueFollowup(); }
        if (npc.affinity) { const gain = 7 + Math.floor(Math.random() * 4); p.npcAffection[npc.name] = Math.min(100, affection + gain); detail += ` 호감도 +${gain} (${p.npcAffection[npc.name]}/100).`; }
        p.xp += 6;
      } else { p.xp += 2; detail = "도움에는 실패했지만 경험치 2를 얻었다."; }
      game.clamp(); recordStory(npc.name, `${choice[1]} — ${success ? "성공" : "실패"}. ${detail}`); game.log(`${npc.name}과(와) 교류했다. ${detail}`); markGate(); close(); game.render();
    });
  }
  function openRecipeEncounter() {
    const p = ensure();
    const choices = [["지능", "재료의 성질을 함께 분석한다", "intelligence", 13], ["지혜", "불과 향의 균형을 가늠한다", "wisdom", 13], ["카리스마", "시식평으로 조리사의 마음을 연다", "charisma", 14]];
    open("떠돌이 조리사와의 만남", "RECIPE DISCOVERY", `<article class="progress-card"><p>낡은 솥을 멘 조리사가 ${region().name}의 마물 재료를 손질하고 있다. 당신의 조언을 기다리는 눈치다.</p><div class="progress-choices">${choices.map((choice, index) => `<button type="button" data-recipe-plot="${index}">[${choice[0]} 판정] ${choice[1]}</button>`).join("")}</div></article>`);
    modal.querySelectorAll("[data-recipe-plot]").forEach(button => button.onclick = () => {
      const choice = choices[Number(button.dataset.recipePlot)], success = game.check(choice[2], choice[3], "조리사의 실험");
      p.regionNpcInteractions += 1;
      let detail;
      if (success) { detail = grantRecipe(); if (detail.includes("이미 모두")) { p.gold += 10; detail = "새 조리법은 모두 익혔지만, 조리사가 금화 10G를 건넸다."; } p.xp += 6; }
      else { detail = "불 조절에는 실패했지만, 조리사는 다음에 다시 함께하자고 했다. 경험치 2를 얻었다."; p.xp += 2; }
      recordStory("떠돌이 조리사", `${choice[1]} — ${success ? "성공" : "실패"}. ${detail}`);
      game.log(`떠돌이 조리사와 조리법을 나눴다. ${detail}`);
      markGate(); close(); game.render();
    });
  }
  function openMerchant() {
    open("떠돌이 상인", "TRADE EVENT", `<article class="progress-card"><p>수레를 끄는 상인이 장비 꾸러미와 금화 주머니를 내보인다.</p><div class="progress-choices"><button type="button" data-trade>장비를 사고팔기</button><button type="button" data-rumor>다음 길의 소문을 듣기</button><button type="button" data-close>거래하지 않는다</button></div></article>`);
    modal.querySelector("[data-trade]").onclick = () => { close(); window.TRPG_TOWN?.(); };
    modal.querySelector("[data-rumor]").onclick = () => { game.player.xp += 3; game.log("상인이 수호자와 다음 길에 관한 소문을 들려줬다. 경험치 3 획득."); close(); game.render(); };
    modal.querySelector("[data-close]").onclick = close;
  }
  function walkOn() {
    const lines = ["바람에 흔들리는 나뭇잎 소리만 들리는 길을 한참 걸었다.", "비가 그친 흙길에 낯선 발자국이 남아 있었지만, 끝내 누구도 만나지 못했다.", "멀리서 종소리가 들렸지만 길은 조용했고, 당신은 발걸음을 이어갔다.", "해가 기울어 갈 무렵, 아무 일 없이 다음 이정표를 지나쳤다."];
    const detail = lines[Math.floor(Math.random() * lines.length)]; recordStory("고요한 여정", detail); game.log(detail);
  }
  function openInn() {
    const p = ensure();
    open("길목의 작은 여관", "RARE REST EVENT", `<article class="progress-card"><p>따뜻한 수프 냄새가 새어 나오는 작은 여관을 발견했다. 하룻밤을 묵고 든든한 식사로 허기까지 완전히 해결할 수 있다.</p><div class="progress-choices"><button type="button" data-inn>8G로 휴식과 만찬</button><button type="button" data-close>지금은 길을 재촉한다</button></div></article>`);
    modal.querySelector("[data-inn]").onclick = () => { if (p.gold < 8) { game.log("여관비가 부족해 따뜻한 물만 얻어 마셨다."); p.stamina += 3; } else { p.gold -= 8; p.hp += 14; p.stamina += 12; p.hunger = 100; game.log("여관에서 푹 쉬고 만찬을 먹어 허기를 완전히 채웠다."); } game.clamp(); recordStory("길목의 작은 여관", "따뜻한 식사로 허기를 완전히 채우고 몸을 돌봤다."); close(); game.render(); };
    modal.querySelector("[data-close]").onclick = close;
  }
  function queueFollowup() { const p = ensure(); p.regionalFollowups ||= []; p.regionalFollowups.push({ regionId: region().id }); game.log("작은 도움의 여파가 훗날 다시 돌아올지도 모른다."); }
  function resolveFollowup() {
    const p = ensure(), event = p.regionalFollowups.shift(), here = window.REGIONS.find(row => row.id === event.regionId) || region(); let title, detail, reward;
    if (here.id === "prairie") { title = "샐러맨더 둥지의 답례"; if (Math.random() < .5) { window.ITEMS.fireOrb ||= { id:"fireOrb", name:"불의 보주", type:"ingredient", icon:window.ITEMS.emberHeart?.icon, tags:["화염","마력"], toxicity:0 }; p.inventory.push("fireOrb"); detail = "지나쳤던 샐러맨더의 어미가 불의 보주를 발치에 놓고 사라졌다."; reward = "불의 보주를 얻었다."; } else { detail = "샐러맨더의 어미는 당신을 잠시 바라보다가 조용히 길을 비켜 주었다."; p.xp += 8; reward = "경험치 8을 얻었다."; } }
    else { title = "도움의 여파"; if (Math.random() < .5) { p.gold += 18; detail = `${here.name}에서 도왔던 여행자가 다시 나타나 금화 주머니를 건넸다.`; reward = "금화 18G를 얻었다."; } else { const found = monsters().find(row => row.region === here.id); p.inventory.push(found.dropId); detail = `${here.name}에서 만났던 이가 희귀한 마물 재료를 답례로 보냈다.`; reward = `${window.ITEMS[found.dropId]?.name || found.dropId}을(를) 얻었다.`; } }
    recordStory(title, detail); game.log(`${detail} ${reward}`); open(title, "FOLLOW-UP STORY", `<article class="progress-card"><p>${detail}</p><p>${reward}</p><button type="button" data-close>여정을 계속한다</button></article>`); modal.querySelector("[data-close]").onclick = () => { close(); game.render(); };
  }
  function explore() {
    const p = ensure(); if (game.enemy || game.gameOver) return; game.advanceTurn(); if (game.gameOver) return; p.stamina -= 2; p.hunger -= 5; game.clamp(); if (game.gameOver) return;
    if (markGate()) return openShaman();
    if (p.regionalFollowups?.length) return resolveFollowup();
    const roll = Math.random();
    if (roll < .005) return openRoutes("길 잃은 요정들의 안내");
    if (roll < .08) return openInn();
    if (roll < .18) { game.log("작은 마을의 장터를 발견했다."); return window.TRPG_TOWN?.(); }
    if (roll < .30) return openMerchant();
    if (roll < .48) return interactNpc();
    if (roll < .58) return openRecipeEncounter();
    if (roll < .82) return spawnMonster();
    if (roll < .94) return walkOn();
    const supply = ["bitterCap", ...monsters().filter(row => row.region === region().id).map(row => row.dropId)]; const found = supply[Math.floor(Math.random() * supply.length)]; p.inventory.push(found); game.log(`${window.ITEMS[found]?.name || found}을(를) 발견했다.`);
  }
  function boot() {
    game = window.game; if (!game || !window.REGIONS) return setTimeout(boot, 50); ensure();
    modal = document.createElement("div"); modal.className = "progress-modal"; modal.innerHTML = '<div class="progress-modal__shade"></div><section class="progress-modal__panel"><header><div><p></p><h2></h2></div><button type="button" aria-label="닫기">×</button></header><div class="progress-modal__body"></div></section>'; document.body.append(modal); modal.querySelector(".progress-modal__shade").onclick = close; modal.querySelector("header button").onclick = close;
    game.explore = explore;
    const previousAttack = game.combat.attack.bind(game.combat);
    game.combat.attack = (...args) => { const enemy = game.enemy; previousAttack(...args); if (game.gameOver || !enemy || enemy.hp > 0) return; const p = ensure(); if (enemy.regionalBoss) { recordStory("수호자 격파", `${enemy.name}을(를) 쓰러뜨리고 새로운 길을 마주했다.`); openRoutes("수호자 격파"); return; } if (enemy.regionId) { p.regionBattles += 1; recordStory("마물 사냥", `${region().name}에서 ${enemy.name}을(를) 쓰러뜨렸다.`); markGate(); } };
    game.render();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
