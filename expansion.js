(() => {
  const extraItems = {
    emberTail:{name:"불도마뱀 꼬리",icon:"🌶",type:"ingredient",tags:["육류","화염"],toxicity:0},
    spiderLeg:{name:"동굴거미 다리",icon:"🕷",type:"ingredient",tags:["육류","독"],toxicity:1},
    mossShell:{name:"이끼거북 등갑",icon:"🛡",type:"ingredient",tags:["광물","수분"],toxicity:0},
    boarHorn:{name:"뿔멧돼지 뿔",icon:"🦴",type:"material",tags:["뼈","단단함"],toxicity:0},
    emberScale:{name:"불도마뱀 비늘",icon:"🔶",type:"ingredient",tags:["화염","광물"],toxicity:0},
    venomSac:{name:"동굴거미 독주머니",icon:"🧪",type:"ingredient",tags:["독","향신"],toxicity:2},
    swampMoss:{name:"이끼거북 수생이끼",icon:"🌿",type:"ingredient",tags:["수분","해독"],toxicity:0},
    batWing:{name:"서리 날개막",icon:"🪽",type:"ingredient",tags:["육류","냉기"],toxicity:0}, frostFang:{name:"서리박쥐 송곳니",icon:"🦷",type:"material",tags:["냉기","뼈"],toxicity:0},
    blackMane:{name:"검은 갈기",icon:"🦁",type:"ingredient",tags:["육류","화염"],toxicity:0}, charcoalClaw:{name:"흑염소 사자 발톱",icon:"🖤",type:"material",tags:["화염","뼈"],toxicity:0},
    crystalShard:{name:"수정 뿔 조각",icon:"💎",type:"ingredient",tags:["광물","마력"],toxicity:0}, venison:{name:"수정사슴 안심",icon:"🥩",type:"ingredient",tags:["육류","마력"],toxicity:0},
    mimicTooth:{name:"미믹 이빨",icon:"🦷",type:"ingredient",tags:["광물","단맛"],toxicity:0}, mimicLock:{name:"미믹 자물쇠핵",icon:"🔒",type:"material",tags:["광물","마력"],toxicity:0},
    drakeScale:{name:"새끼용 비늘",icon:"🐉",type:"ingredient",tags:["화염","광물"],toxicity:0}, dragonGland:{name:"새끼용 화염샘",icon:"🔥",type:"ingredient",tags:["화염","육류"],toxicity:1},
    mothDust:{name:"달빛나방 가루",icon:"🌙",type:"ingredient",tags:["향신","마력"],toxicity:0}, moonWing:{name:"달빛나방 날개",icon:"🦋",type:"material",tags:["마력","섬유"],toxicity:0},
    golemCore:{name:"골렘 심핵",icon:"🪨",type:"ingredient",tags:["광물","수분"],toxicity:0}, clayChunk:{name:"움직이는 점토",icon:"🟤",type:"material",tags:["광물","수분"],toxicity:0}
  };
  const monsters = [
    ["이끼 점액괴","🫧","안개 낀 숲길","낮음","습한 돌틈에 숨어 장비를 녹이는 젤리형 마물.","점액괴의 젤"],["뿔멧돼지","🐗","잿불 초원","보통","옆으로 굽은 뿔로 돌진하는 거대 멧돼지.","뿔멧돼지 고기 · 뿔멧돼지 뿔"],["불도마뱀","🦎","재의 협곡","보통","화산의 열기를 먹고 사는 붉은 도마뱀.","불도마뱀 꼬리 · 불도마뱀 비늘"],["동굴거미","🕷","폐광 심층","높음","진동으로 먹잇감을 찾는 거대 거미.","동굴거미 다리 · 독주머니"],["이끼거북","🐢","고목 습지","낮음","등 위에 작은 생태계를 이고 다니는 거북 마물.","이끼거북 등갑 · 수생이끼"],["서리박쥐","🦇","푸른 얼음굴","보통","무리로 날아들어 체온을 빼앗는 박쥐.","서리 날개막 · 송곳니"],["흑염소 사자","🦁","황혼 초원","높음","갈기 사이에서 검은 불꽃을 피우는 포식자.","검은 갈기 · 사자 발톱"],["수정 사슴","🦌","별빛 숲","낮음","뿔에 맑은 마력을 모으는 신비한 초식 마물.","수정 뿔 조각 · 안심"],["미믹","🧰","버려진 유적","높음","보물상자로 위장해 탐욕스러운 모험가를 기다린다.","미믹 이빨 · 자물쇠핵"],["새끼용","🐉","용의 둥지","매우 높음","아직 작지만 숨결만큼은 결코 가볍지 않다.","새끼용 비늘 · 화염샘"],["달빛나방","🦋","달그림 습지","보통","은은한 가루로 여행자를 잠에 빠뜨린다.","달빛나방 가루 · 날개"],["진흙 골렘","🪨","무너진 사원","높음","사원 바닥의 진흙이 오래된 명령에 따라 움직인다.","골렘 심핵 · 움직이는 점토"]
  ];
  const recipes = [
    {id:"slimeSoup",name:"점액괴 맑은 수프",icon:"🥣",need:["slimeGel"],difficulty:"쉬움",effect:"포만감 +11 · HP +3",hunger:11,hp:3,note:"탱글한 젤을 맑게 끓여낸 초보 모험가의 한 그릇."},{id:"boarStew",name:"뿔멧돼지 진한 스튜",icon:"🍲",need:["boarMeat","bitterCap"],difficulty:"보통",effect:"포만감 +25 · HP +8",hunger:25,hp:8,note:"쓴갓의 쌉쌀함이 기름진 고기의 풍미를 살린다."},{id:"emberSkewer",name:"불도마뱀 꼬리 꼬치",icon:"🍢",need:["emberTail"],difficulty:"보통",effect:"포만감 +16 · 화염 저항",hunger:16,hp:4,note:"스스로 익어 가는 뜨거운 별미."},{id:"spiderFritter",name:"동굴거미 다리 튀김",icon:"🍤",need:["spiderLeg","bitterCap"],difficulty:"어려움",effect:"포만감 +20 · 민첩 버프",hunger:20,hp:5,note:"해독 버섯으로 독을 누르고 바삭하게 튀긴다."},{id:"batJerky",name:"서리박쥐 육포",icon:"🥓",need:["batWing"],difficulty:"보통",effect:"포만감 +13 · 냉기 저항",hunger:13,hp:3,note:"차가운 날개막을 오래 말린 보존식."},{id:"lionRoast",name:"흑염소 사자 갈기구이",icon:"🍖",need:["blackMane","bitterCap"],difficulty:"어려움",effect:"포만감 +28 · 힘 버프",hunger:28,hp:7,note:"검은 불꽃의 잔열을 가둔 호화로운 구이."},{id:"crystalTea",name:"수정 뿔 차",icon:"🍵",need:["crystalShard"],difficulty:"쉬움",effect:"기력 +6 · 지혜 버프",hunger:4,hp:0,stamina:6,note:"미세한 마력 결정이 물 위에서 별빛처럼 빛난다."},{id:"tortoiseBroth",name:"이끼거북 등갑 육수",icon:"🍜",need:["mossShell","slimeGel"],difficulty:"보통",effect:"HP +10 · 독 저항",hunger:8,hp:10,note:"등갑의 미네랄을 천천히 우려낸 회복 국물."},{id:"mimicToast",name:"미믹 이빨 토스트",icon:"🍞",need:["mimicTooth","slimeGel"],difficulty:"어려움",effect:"포만감 +21 · 카리스마 버프",hunger:21,hp:4,note:"바삭한 이빨 조각이 의외의 식감을 준다."},{id:"drakeCurry",name:"새끼용 비늘 카레",icon:"🍛",need:["drakeScale","emberTail"],difficulty:"어려움",effect:"포만감 +24 · 화염 저항",hunger:24,hp:6,note:"화끈한 비늘 향신료가 오래 남는다."},{id:"mothHoney",name:"달빛나방 꿀절임",icon:"🍯",need:["mothDust"],difficulty:"보통",effect:"기력 +8 · 민첩 버프",hunger:7,hp:0,stamina:8,note:"은은한 날개 가루가 혀끝에서 녹는다."},{id:"golemBiscuit",name:"골렘 돌가루 비스킷",icon:"🍪",need:["golemCore","slimeGel"],difficulty:"어려움",effect:"포만감 +18 · 건강 버프",hunger:18,hp:5,note:"돌가루를 곱게 갈아 만든 든든한 간식."}
  ];
  // 첫 번째 재료는 주 드롭(70%), 두 번째 재료는 희귀 부산물(30%)입니다.
  const combatTable = [
    ["이끼 점액괴",15,5,1,["slimeGel"]],
    ["뿔멧돼지",23,7,2,["boarMeat","boarHorn"],"boarSpear"],
    ["불도마뱀",19,8,2,["emberTail","emberScale"],"emberDagger"],
    ["동굴거미",21,8,3,["spiderLeg","venomSac"],"spiderSilkVest"],
    ["이끼거북",25,5,5,["mossShell","swampMoss"],"mossAegis"],
    ["서리박쥐",14,6,1,["batWing","frostFang"]],
    ["흑염소 사자",31,10,3,["blackMane","charcoalClaw"],"boarSpear"],
    ["수정 사슴",18,6,4,["crystalShard","venison"],"moonRing"],
    ["미믹",27,9,4,["mimicTooth","mimicLock"],"mimicLocket"],
    ["새끼용",34,11,4,["drakeScale","dragonGland"],"emberDagger"],
    ["달빛나방",16,7,2,["mothDust","moonWing"],"moonRing"],
    ["진흙 골렘",36,9,6,["golemCore","clayChunk"],"mossAegis"]
  ];
  const npcs = [
    {id:"herbalist",name:"에나",role:"습지의 약초꾼",text:"안개에 젖은 망토를 털던 약초꾼이 당신을 바라본다. ‘버섯의 독을 다루는 법을 알고 싶나?’",choices:[{label:"약초 바구니를 함께 옮긴다",story:"에나를 도와 늪지 약초를 길드에 전달했다.",recipe:"boarStew",item:"bitterCap",followup:"herbCache"},{label:"버섯 정보를 사 달라고 흥정한다",story:"에나와 거래를 택했다. 다음에는 더 좋은 값이 필요할 것이다.",item:"bitterCap"}]},
    {id:"cartographer",name:"브론",role:"드워프 지도 제작자",text:"바위 위에 지도를 펼친 브론이 말한다. ‘길을 알려 줄 수도 있고, 위험한 곳을 표시해 줄 수도 있지.’",choices:[{label:"안전한 길을 묻는다",story:"브론의 안전한 길을 따르기로 했다.",recipe:"tortoiseBroth",xp:4},{label:"숨겨진 보물길을 택한다",story:"브론의 위험한 보물길을 택했다.",xp:7,followup:"treasurePath"}]},
    {id:"scout",name:"사일라",role:"엘프 정찰병",text:"활시위를 늦춘 정찰병이 숲 너머를 가리킨다. ‘불도마뱀이 둥지를 옮기고 있어. 사냥꾼을 도울 생각은?’",choices:[{label:"둥지를 피해 달라는 부탁을 들어준다",story:"사일라와 함께 불도마뱀의 둥지를 비켜 갔다.",recipe:"emberSkewer",xp:4},{label:"사냥터 위치를 길드에 알린다",story:"사일라의 사냥터 정보를 길드에 보고했다.",item:"emberTail",xp:5,followup:"hunterTrail"}]},
    {id:"chef",name:"마렉",role:"떠돌이 조리사",text:"검은 솥을 닦던 마렉이 미소 짓는다. ‘마물 고기는 겁먹은 사람보다 용감한 요리사를 좋아하지.’",choices:[{label:"그의 조리 시범을 돕는다",story:"마렉의 솥 옆에서 마물 요리의 기본을 배웠다.",recipe:"spiderFritter",item:"bitterCap"},{label:"내 방식의 레시피를 들려준다",story:"마렉과 서로의 레시피를 교환했다.",recipe:"batJerky",xp:3,followup:"cookoff"}]}
  ];
  const townStock = ["boarSpear", "emberDagger", "spiderSilkVest", "mossAegis", "moonRing", "mimicLocket"];
  const worldEvents = [
    {title:"묻힌 보물상자",role:"갈림길의 속삭임",text:"낡은 이정표 아래로 반쯤 묻힌 보물상자가 보인다. 열쇠 구멍은 아직 따뜻하다.",choices:[{label:"표시된 오솔길을 따라간다",story:"이정표의 화살표를 따라 보물길로 들어섰다.",followup:"treasurePath"},{label:"상자를 두고 안전한 길을 택한다",story:"욕심을 누르고 안전한 길을 선택했다.",xp:4}]},
    {title:"사라진 사냥꾼의 발자국",role:"젖은 숲바닥",text:"피 묻은 발자국과 부러진 화살이 이어진다. 누군가 마물에게 쫓기고 있었던 모양이다.",choices:[{label:"발자국을 추적한다",story:"사라진 사냥꾼의 흔적을 추적하기로 했다.",followup:"hunterTrail"},{label:"화살을 챙기고 야영지로 알린다",story:"위험한 흔적을 길드에 알리기로 했다.",gold:12,xp:3}]},
    {title:"무너진 돌다리",role:"비 내린 계곡",text:"건너편에서 종소리가 들린다. 돌다리 아래에는 희미한 빛이 반짝인다.",choices:[{label:"다리 아래의 빛을 살핀다",story:"차가운 물살을 헤치고 빛을 확인하러 갔다.",followup:"herbCache"},{label:"돌을 쌓아 다리를 보수한다",story:"지나는 이들을 위해 무너진 다리에 돌을 얹었다.",xp:6}]}
  ];
  const followups = {
    treasurePath: [
      {title:"보물길의 끝",text:"이끼 낀 석상 뒤에서 오래된 금화 주머니를 발견했다.",gold:42},
      {title:"보물길의 끝",text:"보물상자가 이빨을 드러냈다. 미믹이 길을 막아섰다!",enemy:["미믹",27,9,4,["mimicTooth","mimicLock"],"mimicLocket"]},
      {title:"보물길의 끝",text:"상자는 비어 있었지만, 바닥의 지도를 읽어 숨은 길을 배웠다.",xp:9}
    ],
    hunterTrail: [
      {title:"사냥꾼의 흔적",text:"사냥꾼은 다친 채 숨었지만 살아 있었다. 감사의 금화를 건넸다.",gold:28,xp:5},
      {title:"사냥꾼의 흔적",text:"발자국 끝에는 굶주린 뿔멧돼지가 있었다.",enemy:["뿔멧돼지",23,7,2,["boarMeat","boarHorn"],"boarSpear"]},
      {title:"사냥꾼의 흔적",text:"사냥꾼은 떠난 뒤였지만, 남겨진 가방에서 쓸 만한 재료를 찾았다.",item:"bitterCap",xp:6}
    ],
    herbCache: [
      {title:"숨은 약초밭",text:"바위틈의 약초밭에서 쓴갓 버섯과 금화를 챙겼다.",item:"bitterCap",gold:16},
      {title:"숨은 약초밭",text:"약초밭을 지키던 이끼거북이 천천히 고개를 들었다.",enemy:["이끼거북",25,5,5,["mossShell","swampMoss"],"mossAegis"]},
      {title:"숨은 약초밭",text:"비는 내렸지만, 새로운 약초를 구분하는 법을 익혔다.",xp:8}
    ],
    cookoff: [
      {title:"마렉의 다음 편지",text:"마렉이 남긴 조리 대결 초대장을 따라가 금화를 벌었다.",gold:25,xp:4},
      {title:"마렉의 다음 편지",text:"대결 장소의 재료 상자에서 미믹이 튀어나왔다!",enemy:["미믹",27,9,4,["mimicTooth","mimicLock"],"mimicLocket"]},
      {title:"마렉의 다음 편지",text:"마렉은 떠났지만, 독특한 손질법을 적어 두었다.",recipe:"mimicToast",xp:5}
    ]
  };
  let game, modal;
  const esc = text => String(text).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const itemData = id => window.GEAR?.[id] || window.ITEMS?.[id] || extraItems[id] || {name:id,icon:"?"};
  const itemName = id => itemData(id).name;
  const itemIcon = id => itemData(id).icon || "?";
  function ensure() { const p=game.player; p.gold ??= 35; p.discoveredMonsters ||= []; p.discoveredRecipes ||= ["slimeSoup"]; p.story ||= []; p.pendingPlots ||= []; return p; }
  function close() { modal.classList.remove("open"); }
  function open(title,kicker,html) { modal.querySelector("h2").textContent=title; modal.querySelector(".exp-modal__head p").textContent=kicker; modal.querySelector(".exp-modal__body").innerHTML=html; modal.classList.add("open"); }
  function record(title,detail) { const p=ensure(); p.story.unshift({title,detail}); p.story=p.story.slice(0,20); game.log(detail); }
  function discoverMonster(name) { const p=ensure(); if (!p.discoveredMonsters.includes(name)) { p.discoveredMonsters.push(name); game.log(`${name}이(가) 마물 도감에 기록되었다.`); } }
  function unlockRecipe(id,reason) { const p=ensure(); if (!p.discoveredRecipes.includes(id)) { p.discoveredRecipes.push(id); game.log(`${recipes.find(recipe=>recipe.id===id).name} 레시피를 배웠다. ${reason||""}`); } }
  function recipeIngredients(recipe) { return recipe.need.map(id=>`${itemIcon(id)} ${itemName(id)}`).join(" + "); }
  function canCook(recipe) { const stock={}; ensure().inventory.forEach(id=>stock[id]=(stock[id]||0)+1); return recipe.need.every(id=>stock[id]-- > 0); }
  function openBook() { const p=ensure(), knownMonsters=monsters.filter(row=>p.discoveredMonsters.includes(row[0])), knownRecipes=recipes.filter(recipe=>p.discoveredRecipes.includes(recipe.id)); const monsterHtml=knownMonsters.length ? knownMonsters.map(row=>`<article class="discover-card"><div class="discover-card__icon">${row[1]}</div><div><p class="discover-meta">${row[2]} · 위협도 ${row[3]}</p><h4>${row[0]}</h4><p>${row[4]}</p><p class="cook-ingredients">획득: ${row[5]}</p></div></article>`).join("") : `<p class="empty-journal">아직 기록한 마물이 없습니다.<br>탐험에서 마물을 조우하면 도감에 추가됩니다.</p>`; const recipeHtml=knownRecipes.length ? knownRecipes.map(recipe=>recipeCard(recipe,false)).join("") : `<p class="empty-journal">아직 배운 요리법이 없습니다.<br>NPC에게 배우거나 이야기를 진행해 보세요.</p>`; open("마물과 솥의 도감","DISCOVERED ONLY",`<section class="discover-section"><h3>발견한 마물 <span>${knownMonsters.length}</span></h3>${monsterHtml}</section><section class="discover-section"><h3>발견한 레시피 <span>${knownRecipes.length}</span></h3>${recipeHtml}</section>`); }
  function recipeCard(recipe,selectable) { return `<article class="cook-card"><div class="cook-card__top"><span>${recipe.icon}</span><div><p class="discover-meta">난이도 ${recipe.difficulty} · 철 솥</p><h4>${recipe.name}</h4></div></div><p class="cook-ingredients">${recipeIngredients(recipe)}</p><p>${recipe.note}</p><strong class="cook-effect">${recipe.effect}</strong>${selectable?`<button type="button" class="cook-select" data-cook="${recipe.id}" ${canCook(recipe)?"":"disabled"}>${canCook(recipe)?"이 요리 만들기":"재료가 부족합니다"}</button>`:""}</article>`; }
  function openCooking() { const known=recipes.filter(recipe=>ensure().discoveredRecipes.includes(recipe.id)); open("솥 위의 선택","COOK ONE RECIPE",known.length?`<p class="empty-journal">만들 요리를 하나 고르세요. 필요한 재료는 조리 후 가방에서 사라집니다.</p>${known.map(recipe=>recipeCard(recipe,true)).join("")}`:`<p class="empty-journal">알고 있는 레시피가 없습니다.<br>탐험에서 NPC를 만나 요리를 배워 보세요.</p>`); modal.querySelectorAll("[data-cook]").forEach(button=>button.onclick=()=>cook(button.dataset.cook)); }
  function cook(id) { const recipe=recipes.find(row=>row.id===id), p=ensure(); if (!canCook(recipe)) return; recipe.need.forEach(need=>p.inventory.splice(p.inventory.indexOf(need),1)); p.hunger+=recipe.hunger; p.hp+=recipe.hp; p.stamina+=recipe.stamina||0; game.clamp(); record("새로운 한 끼",`${recipe.name}을(를) 완성했다. ${recipe.effect}`); close(); game.render(); }
  function openNpc(npc) { open(`${npc.name}과의 만남`,npc.role.toUpperCase(),`<article class="npc-card"><h3 class="npc-card__name">${npc.name}</h3><p class="npc-card__role">${npc.role}</p><p class="npc-card__text">${npc.text}</p><div class="npc-choices">${npc.choices.map((choice,index)=>`<button type="button" data-choice="${index}">${choice.label}</button>`).join("")}</div></article>`); modal.querySelectorAll("[data-choice]").forEach(button=>button.onclick=()=>chooseNpc(npc,npc.choices[Number(button.dataset.choice)])); }
  function queueFollowup(id) { if (!id) return; const p=ensure(); p.pendingPlots.push(id); game.log("선택의 여파가 다음 여정에서 이어질 것이다."); }
  function applyChoice(title, choice) { const p=ensure(); if(choice.item) p.inventory.push(choice.item); if(choice.xp) p.xp+=choice.xp; if(choice.gold) p.gold+=choice.gold; if(choice.recipe) unlockRecipe(choice.recipe,`(${title}에게서 배움)`); if(choice.followup) queueFollowup(choice.followup); record(title,choice.story); close(); game.render(); }
  function chooseNpc(npc,choice) { applyChoice(npc.name, choice); }
  function openStory() { const p=ensure(); open("갈림길의 기록","YOUR ADVENTURE",p.story.length?`<ol class="story-log">${p.story.map(entry=>`<li><b>${esc(entry.title)}</b>${esc(entry.detail)}</li>`).join("")}</ol>`:`<p class="empty-journal">아직 당신의 이야기는 첫 장입니다.<br>탐험 중 만나는 사람과 마물에게 선택을 남겨 보세요.</p>`); }
  function openWorldEvent(event) { open(event.title,event.role.toUpperCase(),`<article class="npc-card"><h3 class="npc-card__name">${event.title}</h3><p class="npc-card__role">${event.role}</p><p class="npc-card__text">${event.text}</p><div class="npc-choices">${event.choices.map((choice,index)=>`<button type="button" data-world-choice="${index}">${choice.label}</button>`).join("")}</div></article>`); modal.querySelectorAll("[data-world-choice]").forEach(button=>button.onclick=()=>applyChoice(event.title,event.choices[Number(button.dataset.worldChoice)])); }
  function resolveFollowup(id) {
    const outcomes = followups[id]; if (!outcomes?.length) return false;
    const outcome = outcomes[Math.floor(Math.random()*outcomes.length)], p=ensure();
    if (outcome.item) p.inventory.push(outcome.item);
    if (outcome.gold) p.gold+=outcome.gold;
    if (outcome.xp) p.xp+=outcome.xp;
    if (outcome.recipe) unlockRecipe(outcome.recipe,"(후속 이야기에서 발견)");
    record(outcome.title,outcome.text);
    if (outcome.enemy) { const [name,hp,atk,def,dropPool,gearId]=outcome.enemy; game.enemy={name,hp,maxHp:hp,atk,def,drops:rollDrops(dropPool,gearId)}; game.scene="combat"; discoverMonster(name); game.log(`${name}이(가) 후속 플롯의 끝에서 나타났다!`); return true; }
    open(outcome.title,"후속 플롯",`<article class="npc-card"><p class="npc-card__text">${outcome.text}</p><div class="npc-choices"><button type="button" data-plot-close>여정을 계속한다</button></div></article>`); modal.querySelector("[data-plot-close]").onclick=()=>{close();game.render();}; return true;
  }
  function shopCard(id, mode) {
    const gear = window.GEAR?.[id];
    if (!gear) return "";
    const price = mode === "buy" ? gear.price : Math.floor(gear.price / 2);
    return `<article class="shop-card"><span>${gear.icon}</span><div><h4>${gear.name}</h4><p>${gear.label} · ${Object.entries(gear.mods).map(([stat,value])=>`${({strength:"힘",agility:"민첩",intelligence:"지능",charisma:"카리스마",constitution:"건강",wisdom:"지혜"})[stat]} +${value}`).join(" · ")}</p><small>${gear.description}</small></div><button type="button" data-${mode}="${id}">${mode === "buy" ? `${price} G 구매` : `${price} G 판매`}</button></article>`;
  }
  function openTown() {
    const p = ensure();
    const owned = [...new Set(p.inventory.filter(id => window.GEAR?.[id]?.price))];
    open("연기골 마을", `장비 상점 · ${p.gold} G`, `<p class="town-copy">숯 냄새가 감도는 작은 길목 마을이다. 대장장이 루카가 모험가의 장비를 살피며 손을 흔든다.</p><section class="shop-section"><h3>루카의 장비 상점</h3>${townStock.map(id=>shopCard(id,"buy")).join("")}</section><section class="shop-section"><h3>내 장비 판매</h3>${owned.length ? owned.map(id=>shopCard(id,"sell")).join("") : `<p class="empty-journal">판매할 장비가 없습니다.</p>`}</section>`);
    modal.querySelectorAll("[data-buy]").forEach(button => button.onclick = () => buyGear(button.dataset.buy));
    modal.querySelectorAll("[data-sell]").forEach(button => button.onclick = () => sellGear(button.dataset.sell));
  }
  function buyGear(id) {
    const p = ensure(), gear = window.GEAR?.[id];
    if (!gear || p.gold < gear.price) { game.log("금화가 부족하다."); return openTown(); }
    p.gold -= gear.price; p.inventory.push(id);
    game.log(`${gear.name}을(를) ${gear.price} G에 구매했다.`);
    openTown(); game.render();
  }
  function sellGear(id) {
    const p = ensure(), gear = window.GEAR?.[id], index = p.inventory.indexOf(id);
    if (!gear || index < 0) return openTown();
    Object.keys(p.equipment || {}).forEach(slot => { if (p.equipment[slot] === id) p.equipment[slot] = null; });
    p.inventory.splice(index, 1); p.gold += Math.floor(gear.price / 2);
    window.refreshPlayerStats?.();
    game.log(`${gear.name}을(를) ${Math.floor(gear.price / 2)} G에 판매했다.`);
    openTown(); game.render();
  }
  function rollDrops(dropPool, gearId) {
    if (dropPool.length === 1) return [...dropPool];
    // 주 드롭은 항상, 희귀 부산물은 30% 확률로 추가됩니다.
    return [dropPool[0], ...(Math.random() < .30 ? [dropPool[1]] : []), ...(gearId && Math.random() < .15 ? [gearId] : [])];
  }
  function explore() { const p=ensure(); if(game.enemy) return; game.advanceTurn(); p.stamina-=2; p.hunger-=5; game.clamp(); if(!p.hp) return game.defeat(); const pending=p.pendingPlots.shift(); if(pending) return resolveFollowup(pending); const roll=Math.random(); if(roll<.25){ openTown(); game.log("연기골 마을의 장터에 도착했다."); return; } if(roll<.48){ const unused=npcs.filter(npc=>!p.story.some(entry=>entry.title===npc.name)); openNpc((unused.length?unused:npcs)[Math.floor(Math.random()*(unused.length?unused:npcs).length)]); game.log("숲길에서 누군가의 발자국을 발견했다."); return; } if(roll<.70){ const event=worldEvents[Math.floor(Math.random()*worldEvents.length)]; openWorldEvent(event); game.log(`${event.title} 사건과 조우했다.`); return; } if(roll<.92){ const max=Math.min(combatTable.length,4+Math.floor(p.level/2)); const row=combatTable[Math.floor(Math.random()*max)], enemy={name:row[0],hp:row[1],maxHp:row[1],atk:row[2],def:row[3],drops:rollDrops(row[4],row[5])}; game.enemy=enemy; game.scene="combat"; discoverMonster(enemy.name); game.log(`${enemy.name}이(가) 길을 막아섰다!`); return; } const finds=["bitterCap","slimeGel","bitterCap"]; const found=finds[Math.floor(Math.random()*finds.length)]; p.inventory.push(found); game.log(`${itemName(found)}을(를) 발견했다.`); }
  function upgradePortrait(node) { if(node.tagName==="CANVAS") return; const canvas=document.createElement("canvas"); canvas.width=112; canvas.height=132; canvas.className="portrait"; node.replaceWith(canvas); const ctx=canvas.getContext("2d"), cs=getComputedStyle(node), skin=cs.getPropertyValue("--skin").trim()||"#c88864", hair=cs.getPropertyValue("--hair").trim()||"#342019", eyes=cs.getPropertyValue("--eyes").trim()||"#6fbd9c"; const race=document.querySelector(".race-choice.is-selected strong")?.textContent||"인간", seed=(skin+hair+eyes).split("").reduce((sum,char)=>sum+char.charCodeAt(0),0), style=seed%3; ctx.imageSmoothingEnabled=false; ctx.fillStyle="#18100e";ctx.fillRect(0,0,112,132);ctx.fillStyle="#3f281f";ctx.fillRect(8,8,96,116);ctx.fillStyle="#513225";ctx.fillRect(13,13,86,84);ctx.fillStyle="#2a1b18";ctx.fillRect(0,95,112,37);ctx.fillStyle=skin;ctx.fillRect(31,33,50,57);ctx.fillRect(36,88,40,19); if(race==="엘프"){ctx.fillRect(22,49,10,16);ctx.fillRect(80,49,10,16);} if(race==="수인"){ctx.fillStyle=hair;ctx.fillRect(27,19,16,20);ctx.fillRect(69,19,16,20);} ctx.fillStyle=hair;if(style===0){ctx.fillRect(26,22,60,28);ctx.fillRect(31,45,50,11);}else if(style===1){ctx.fillRect(27,20,56,20);ctx.fillRect(25,37,17,29);ctx.fillRect(70,37,17,29);}else{ctx.fillRect(25,22,62,16);ctx.fillRect(30,35,53,12);ctx.fillRect(25,43,12,19);}ctx.fillStyle="#271917";ctx.fillRect(41,58,8,5);ctx.fillRect(63,58,8,5);ctx.fillStyle=eyes;ctx.fillRect(43,59,4,4);ctx.fillRect(65,59,4,4);ctx.fillStyle="#7b4738";ctx.fillRect(52,72,9,3);ctx.fillStyle="#d8a27a";ctx.fillRect(28,107,56,5);ctx.fillStyle="#b1783f";ctx.fillRect(16,114,80,12);ctx.fillStyle="#e1b86c";ctx.fillRect(51,117,10,10);ctx.strokeStyle="#d3954c";ctx.lineWidth=3;ctx.strokeRect(3,3,106,126); }
  function boot() { game=window.game; if(!game) return; Object.assign(window.ITEMS,extraItems); modal=document.createElement("div");modal.className="exp-modal";modal.innerHTML='<div class="exp-modal__shade"></div><section class="exp-modal__panel"><header class="exp-modal__head"><div><p></p><h2></h2></div><button class="exp-modal__close" type="button">×</button></header><div class="exp-modal__body"></div></section>';document.body.append(modal);modal.querySelector(".exp-modal__shade").onclick=close;modal.querySelector(".exp-modal__close").onclick=close;const previousRender=game.render.bind(game);game.render=()=>{ensure();if(game.enemy)discoverMonster(game.enemy.name);previousRender();};const originalRest=game.rest.bind(game);game.rest=()=>{originalRest();game.advanceTurn();};const originalAttack=game.combat.attack.bind(game.combat);game.combat.attack=(...args)=>{if(!game.enemy)return;originalAttack(...args);game.advanceTurn();};game.explore=explore;game.cooking.cook=openCooking;const dock=document.querySelector(".system-dock");if(dock){dock.querySelector("[data-book]").onclick=openBook;const town=document.createElement("button");town.type="button";town.className="town-button";town.textContent="🏘 마을";town.onclick=openTown;const story=document.createElement("button");story.type="button";story.className="story-button";story.textContent="📜 이야기";story.onclick=openStory;dock.append(town,story);} }
  document.addEventListener("DOMContentLoaded",boot);
})();
