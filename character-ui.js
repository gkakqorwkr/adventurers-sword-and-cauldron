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
    rustSword: { name: "낡은 길드 검", icon: "⚔", slot: "weapon", label: "무기", mods: { strength: 1 }, price: 24, description: "길드가 초보 모험가에게 지급한 단검." },
    leatherCoat: { name: "여행자 가죽 코트", icon: "🧥", slot: "armor", label: "방어구", mods: { constitution: 1 }, price: 28, description: "비바람과 작은 상처를 막아 준다." },
    amberCharm: { name: "호박 부적", icon: "📿", slot: "accessory", label: "장신구", mods: { wisdom: 1 }, price: 26, description: "마음의 중심을 잡아 주는 작은 부적." },
    boarSpear: { name: "뿔멧돼지 사냥창", icon: "🔱", slot: "weapon", label: "무기", mods: { strength: 2 }, price: 45, description: "뿔을 박아 만든 묵직한 사냥창." },
    emberDagger: { name: "잿불 단검", icon: "🗡", slot: "weapon", label: "무기", mods: { agility: 1, intelligence: 1 }, price: 70, description: "불도마뱀 비늘을 벼려 만든 날카로운 칼." },
    spiderSilkVest: { name: "거미줄 조끼", icon: "🥋", slot: "armor", label: "방어구", mods: { agility: 2 }, price: 60, description: "가볍고 질긴 동굴거미 실로 엮었다." },
    mossAegis: { name: "이끼거북 방패", icon: "🛡", slot: "armor", label: "방어구", mods: { constitution: 2 }, price: 80, description: "무거운 등갑으로 만든 든든한 방패." },
    moonRing: { name: "달빛나방 반지", icon: "💍", slot: "accessory", label: "장신구", mods: { wisdom: 2 }, price: 75, description: "달빛이 스며든 날개 조각을 세공했다." },
    mimicLocket: { name: "미믹 자물쇠 목걸이", icon: "🔐", slot: "accessory", label: "장신구", mods: { charisma: 2 }, price: 90, description: "기묘한 울림으로 협상 상대의 시선을 붙든다." }
  };
  Object.assign(GEAR, {
    hunterBow:{name:"안개 사냥꾼의 활",icon:"🏹",slot:"weapon",label:"무기",mods:{agility:2},price:65,description:"짙은 안개 속에서도 목표를 놓치지 않는 활."},
    runeStaff:{name:"푸른 룬 지팡이",icon:"🪄",slot:"weapon",label:"무기",mods:{intelligence:2},price:85,description:"룬을 새겨 마력의 흐름을 안정시키는 지팡이."},
    sageWand:{name:"현자의 완드",icon:"✨",slot:"weapon",label:"무기",mods:{intelligence:1,wisdom:1},price:95,description:"지식과 직관을 함께 벼린 짧은 완드."},
    oakMaul:{name:"참나무 전투망치",icon:"🔨",slot:"weapon",label:"무기",mods:{strength:2,constitution:1},price:90,description:"나무뿌리처럼 묵직한 드워프식 망치."},
    crystalRapier:{name:"수정 세검",icon:"🗡️",slot:"weapon",label:"무기",mods:{agility:1,intelligence:2},price:125,description:"수정사슴의 뿔 조각을 심은 날렵한 세검."},
    frostSickle:{name:"서리 초승낫",icon:"🌙",slot:"weapon",label:"무기",mods:{agility:2,wisdom:1},price:115,description:"차가운 달빛을 머금은 곡선 날."},
    drakeLance:{name:"새끼용 창",icon:"🔱",slot:"weapon",label:"무기",mods:{strength:2,intelligence:1},price:140,description:"화염샘을 단단히 고정한 용 사냥창."},
    shadowKnife:{name:"그림자 단검",icon:"🔪",slot:"weapon",label:"무기",mods:{agility:2,charisma:1},price:110,description:"어둠 속의 위협과 협박에 모두 어울린다."},
    mossAxe:{name:"이끼 전투도끼",icon:"🪓",slot:"weapon",label:"무기",mods:{strength:2,wisdom:1},price:105,description:"습지의 나무를 베며 길을 찾는 도끼."},
    thunderHammer:{name:"천둥 망치",icon:"⚒️",slot:"weapon",label:"무기",mods:{strength:3},price:160,description:"한 번의 일격에 바위를 울리는 무거운 망치."},
    pilgrimCenser:{name:"순례자의 향로",icon:"🕯️",slot:"weapon",label:"무기",mods:{wisdom:2,charisma:1},price:130,description:"향기와 기도로 아군의 마음을 다잡는 향로."},
    starSeekerStaff:{name:"별추적자 지팡이",icon:"🔭",slot:"weapon",label:"무기",mods:{intelligence:2,wisdom:2},price:210,description:"별빛의 규칙을 읽는 고급 마법사 지팡이."},
    scaleMail:{name:"비늘 갑주",icon:"🥋",slot:"armor",label:"방어구",mods:{constitution:2,strength:1},price:105,description:"불도마뱀 비늘을 덧댄 튼튼한 갑주."},
    emberMantle:{name:"잿불 망토",icon:"🧣",slot:"armor",label:"방어구",mods:{intelligence:1,constitution:1},price:95,description:"열기에 강한 실로 짠 여행 망토."},
    frostCloak:{name:"서리날개 망토",icon:"🧥",slot:"armor",label:"방어구",mods:{wisdom:2,agility:1},price:120,description:"차가운 바람을 읽고 소리를 죽이는 망토."},
    runicRobe:{name:"룬 직조 로브",icon:"👘",slot:"armor",label:"방어구",mods:{intelligence:3},price:150,description:"마법진의 선을 따라 은실을 엮은 로브."},
    bardicCoat:{name:"음유시인의 코트",icon:"🎻",slot:"armor",label:"방어구",mods:{charisma:2,agility:1},price:115,description:"사람들의 눈길과 이야기를 끌어오는 화려한 코트."},
    thornHarness:{name:"가시 덩굴 하네스",icon:"🌿",slot:"armor",label:"방어구",mods:{constitution:2,strength:1},price:125,description:"습지의 가시덩굴을 굳혀 만든 방어구."},
    mistVeil:{name:"안개 장막",icon:"🫥",slot:"armor",label:"방어구",mods:{agility:2,intelligence:1},price:135,description:"윤곽을 흐려 적의 시선을 피하게 한다."},
    ironbarkPlate:{name:"철목 판금",icon:"🛡️",slot:"armor",label:"방어구",mods:{constitution:3},price:170,description:"나무의 유연함과 철의 강도를 함께 지녔다."},
    velvetDuelist:{name:"벨벳 결투복",icon:"🎩",slot:"armor",label:"방어구",mods:{charisma:3},price:145,description:"우아한 몸짓 하나로 상대의 기세를 꺾는다."},
    dragonskinVest:{name:"용가죽 조끼",icon:"🐉",slot:"armor",label:"방어구",mods:{strength:1,constitution:2},price:175,description:"새끼용의 허물을 겹겹이 덧댄 전투 조끼."},
    moonweaveDress:{name:"달실 로브",icon:"🌌",slot:"armor",label:"방어구",mods:{wisdom:1,intelligence:2},price:165,description:"달빛나방의 실로 지은 마법사 전용 로브."},
    wandererBoots:{name:"방랑자의 장화",icon:"🥾",slot:"armor",label:"방어구",mods:{agility:3},price:130,description:"미끄러운 늪과 험한 바위를 가볍게 넘는다."},
    scholarLens:{name:"학자의 단안경",icon:"🔍",slot:"accessory",label:"장신구",mods:{intelligence:2},price:70,description:"룬과 문서를 선명하게 읽어 주는 렌즈."},
    compassCharm:{name:"길잡이 나침반",icon:"🧭",slot:"accessory",label:"장신구",mods:{wisdom:2},price:65,description:"갈림길에서 흔들리지 않는 방향 감각을 준다."},
    gamblersCoin:{name:"도박꾼의 동전",icon:"🪙",slot:"accessory",label:"장신구",mods:{charisma:2,agility:1},price:85,description:"위험한 협상에서 미소를 잃지 않게 해 준다."},
    boarTuskPendant:{name:"멧돼지 엄니 펜던트",icon:"🦷",slot:"accessory",label:"장신구",mods:{strength:2},price:60,description:"돌진의 기세를 품은 거친 펜던트."},
    vitalityBrooch:{name:"활력 브로치",icon:"🩺",slot:"accessory",label:"장신구",mods:{constitution:2},price:75,description:"오래 걷는 모험가의 호흡을 고르게 한다."},
    swiftFeather:{name:"신속의 깃털",icon:"🪶",slot:"accessory",label:"장신구",mods:{agility:2},price:70,description:"발끝을 가볍게 하는 바람 깃털."},
    runeEarCuff:{name:"룬 귀걸이",icon:"📎",slot:"accessory",label:"장신구",mods:{intelligence:1,wisdom:1},price:100,description:"마력의 잡음을 가라앉히는 작은 룬 조각."},
    courageMedal:{name:"용기의 훈장",icon:"🏅",slot:"accessory",label:"장신구",mods:{strength:1,charisma:1},price:90,description:"위협 앞에서 목소리를 높일 힘을 준다."},
    whisperingShell:{name:"속삭임 조개",icon:"🐚",slot:"accessory",label:"장신구",mods:{charisma:2,wisdom:1},price:115,description:"멀리서 들리는 말의 결을 잡아낸다."},
    dwarvenSeal:{name:"드워프 인장",icon:"⚙️",slot:"accessory",label:"장신구",mods:{strength:1,constitution:1},price:80,description:"장인의 신뢰를 증명하는 무거운 인장."},
    phoenixPin:{name:"불새 핀",icon:"🔥",slot:"accessory",label:"장신구",mods:{intelligence:1,charisma:1},price:110,description:"불꽃처럼 눈에 띄는 마도 장신구."},
    shadowBead:{name:"그림자 구슬",icon:"⚫",slot:"accessory",label:"장신구",mods:{agility:1,intelligence:1},price:105,description:"빛을 흡수해 은밀한 움직임을 돕는다."},
    tidePearl:{name:"조수 진주",icon:"🫧",slot:"accessory",label:"장신구",mods:{wisdom:1,constitution:1},price:95,description:"호흡과 마음의 파도를 고르게 만든다."},
    oracleCards:{name:"예언자의 카드",icon:"🃏",slot:"accessory",label:"장신구",mods:{wisdom:2,charisma:1},price:140,description:"선택의 기로에서 직감과 말재주를 북돋운다."},
    sunMedallion:{name:"태양 메달",icon:"☀️",slot:"accessory",label:"장신구",mods:{strength:1,wisdom:1},price:100,description:"어두운 던전에서도 마음을 흔들리지 않게 한다."},
    alchemyVial:{name:"연금술 약병",icon:"⚗️",slot:"accessory",label:"장신구",mods:{intelligence:2,constitution:1},price:135,description:"독성과 회복 재료의 반응을 기록한 약병."},
    frostSigil:{name:"서리 인장",icon:"❄️",slot:"accessory",label:"장신구",mods:{wisdom:1,agility:1},price:90,description:"차가운 감각으로 위험을 한 박자 먼저 읽는다."}
  });
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
  function item(id) { return GEAR[id] || window.ITEMS?.[id] || ITEMS[id] || { name: id, icon: "?", type: "미확인" }; }
  function stacks(inventory) { return inventory.reduce((out, id) => (out[id] = (out[id] || 0) + 1, out), {}); }
  function modifiersText(mods) { return Object.entries(mods).map(([key, value]) => `${STAT_NAMES[key]} +${value}`).join(" · "); }
  function recompute(player) {
    const race = RACES[player.raceId]; const base = player.baseAttributes || (player.baseAttributes = { ...player.attributes });
    const attributes = { ...base };
    Object.entries(race.bonus).forEach(([key, value]) => attributes[key] += value);
    Object.values(player.equipment || {}).filter(Boolean).forEach(id => Object.entries(GEAR[id].mods).forEach(([key, value]) => attributes[key] += value));
    (player.statusEffects || []).filter(effect => effect.turns > 0).forEach(effect => Object.entries(effect.mods || {}).forEach(([key, value]) => attributes[key] += value));
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
    const p = game.player; const current = stacks(p.inventory.filter(id => !GEAR[id]));
    const cells = Object.entries(current).map(([id, qty]) => { const data = item(id); return `<article class="item-cell"><span class="item-cell__icon">${data.icon}</span><strong>${data.name}</strong><small>${data.type}</small><b>×${qty}</b></article>`; });
    while (cells.length < 12) cells.push(`<div class="empty-cell">+<br>빈 칸</div>`);
    openModal("여행 가방", `${Object.keys(current).length} / 12 SLOTS`, `<p class="modal-note">식재료, 도구, 마물 부산물을 보관합니다. 장비는 하단의 장비 탭에서 관리할 수 있습니다.</p><div class="inventory-cells">${cells.join("")}</div>`);
  }
  function openEquipment() {
    const p = game.player; const current = stacks(p.inventory.filter(id => GEAR[id])); const equipped = p.equipment || {};
    const slots = ["weapon", "armor", "accessory"].map(slot => `<div class="equip-slot"><small>${({ weapon: "무기", armor: "방어구", accessory: "장신구" })[slot]}</small><b>${equipped[slot] ? `${GEAR[equipped[slot]].icon} ${GEAR[equipped[slot]].name}` : "비어 있음"}</b></div>`).join("");
    const cells = Object.entries(current).map(([id, qty]) => { const gear = GEAR[id]; return `<article class="item-cell"><span class="item-cell__icon">${gear.icon}</span><strong>${gear.name}</strong><small>${gear.label} · ${modifiersText(gear.mods)}</small><b>×${qty}</b><button type="button" data-equip="${id}">${equipped[gear.slot] === id ? "장착 해제" : "장착"}</button></article>`; });
    while (cells.length < 6) cells.push(`<div class="empty-cell">+<br>장비 칸</div>`);
    openModal("장비 관리", `${Object.keys(current).length} 종류 · ${p.gold || 0} G`, `<p class="modal-note">장비를 장착하면 능력치와 전투 판정에 즉시 반영됩니다. 여분 장비는 마을 상점에서 판매할 수 있습니다.</p><div class="equip-slots">${slots}</div><div class="inventory-cells">${cells.join("")}</div>`);
    modal.querySelectorAll("[data-equip]").forEach(button => button.onclick = () => equip(button.dataset.equip));
  }
  function equip(id) {
    const p = game.player, gear = GEAR[id]; p.equipment ||= { weapon: null, armor: null, accessory: null };
    p.equipment[gear.slot] = p.equipment[gear.slot] === id ? null : id;
    recompute(p); game.log(`${gear.name}${p.equipment[gear.slot] ? "을 장착했다" : "을 해제했다"}. ${modifiersText(gear.mods)}`); game.render(); openEquipment();
  }
  function openBook() {
    const monsters = MONSTERS.map(row => `<article class="monster-entry"><div class="monster-entry__icon">${row[1]}</div><div><p class="entry-meta">${row[2]} · 위협도 ${row[3]}</p><h4>${row[0]}</h4><p>${row[4]}</p><p class="drop-tag">획득: ${row[5]}</p></div></article>`).join("");
    const recipes = RECIPES.map(row => `<article class="recipe-entry"><div class="recipe-entry__top"><span>${row[1]}</span><div><p class="entry-meta">난이도 ${row[2]} · 철 솥</p><h4>${row[0]}</h4></div></div><p class="ingredient-line">${row[3]}</p><p>${row[4]}</p><strong class="recipe-effect">${row[5]}</strong></article>`).join("");
    openModal("마물과 솥의 도감", "BESTIARY & COOKBOOK", `<section class="book-section"><h3>마물 도감 <span>${MONSTERS.length}종</span></h3>${monsters}</section><section class="book-section"><h3>요리 레시피북 <span>${RECIPES.length}개</span></h3>${recipes}</section>`);
  }
  function openGrowth() {
    const p = game.player; const rows = Object.keys(STAT_NAMES).map(key => `<div class="growth-row"><span>${STAT_NAMES[key]} <small>${STAT_HELP[key]}</small></span><b>${p.attributes[key]}</b><button type="button" data-grow="${key}" ${p.unspentPoints ? "" : "disabled"}>+</button></div>`).join("");
    const effects = (p.statusEffects || []).filter(effect => effect.turns > 0);
    const effectList = effects.length ? effects.map(effect => `<li><b>${effect.name || effect.id}</b><span>${effect.effect || "효과 적용 중"} · ${effect.turns}턴 남음</span></li>`).join("") : `<li class="effect-empty">현재 지속 효과가 없습니다.</li>`;
    openModal("성장과 능력치", "LEVEL ${p.level} · XP ${p.xp}/${p.nextLevelXp}", `<p class="growth-summary">사용 가능한 성장 포인트: <strong>${p.unspentPoints || 0}</strong></p><div class="growth-list">${rows}</div><section class="effect-panel"><h3>지속 효과</h3><ul>${effectList}</ul></section>`);
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
    const p = game.player; p.name = state.name.trim() || "이름 없는 모험가"; p.raceId = state.race; p.baseAttributes = { ...state.stats }; p.appearance = { ...state.appearance }; p.level = 1; p.xp = 0; p.gold = 35; p.nextLevelXp = 10; p.unspentPoints = 0; p.statusEffects = []; p.equipment = { weapon: "rustSword", armor: "leatherCoat", accessory: "amberCharm" }; p.inventory = ["fieldKnife", "ironPot", "slimeGel", "bitterCap", "bitterCap", "rustSword", "leatherCoat", "amberCharm"]; p.hp = 999; p.stamina = 999; p.hunger = 78; recompute(p); game.log(`${p.name}, ${RACES[p.raceId].name} 모험가가 길드에 등록되었다.`); creator.hidden = true; game.render();
  }
  function showCreator() { if (!state) state = { name: "리아", race: "human", stats: { strength: 2, agility: 2, intelligence: 2, charisma: 2, constitution: 2, wisdom: 2 }, points: 8, appearance: { skin: "#c88864", hair: "#342019", eyes: "#6fbd9c" } }; creator.hidden = false; renderCreator(); }
  function boot() {
    game = window.game; if (!game) return;
    window.GEAR = GEAR;
    window.refreshPlayerStats = () => recompute(game.player);
    const originalRender = game.render.bind(game); game.render = () => { syncLevel(); originalRender(); };
    createCreator(); modal = createModal();
    dock = document.createElement("nav"); dock.className = "system-dock"; dock.innerHTML = `<button type="button" data-pack>🎒 가방</button><button type="button" data-equipment>🛡 장비</button><button type="button" data-book>📖 도감</button><button type="button" data-growth>✦ 성장</button>`; document.querySelector(".log-card")?.before(dock);
    dock.querySelector("[data-pack]").onclick = openInventory; dock.querySelector("[data-equipment]").onclick = openEquipment; dock.querySelector("[data-book]").onclick = openBook; dock.querySelector("[data-growth]").onclick = openGrowth;
    document.addEventListener("click", event => { const button = event.target.closest("button"); if (button && button.textContent.includes("가방 확인")) { event.preventDefault(); event.stopPropagation(); openInventory(); } }, true);
    window.showCharacterCreator = showCreator; updateDock();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
