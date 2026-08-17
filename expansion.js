(() => {
  const extraItems = {
    healthPotion:{name:"붉은 회복 물약",icon:"🧪",type:"소모품",effect:"HP +18",hpRestore:18,price:28,description:"전투 중 생긴 상처를 빠르게 봉합하는 선홍빛 물약."},
    staminaPotion:{name:"푸른 기력 물약",icon:"⚗️",type:"소모품",effect:"기력 +10",staminaRestore:10,price:24,description:"지친 다리에 다시 힘을 불어넣는 맑은 푸른 물약."},
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
    ["뿔멧돼지",23,7,2,["boarMeat","boarHorn"],["boarSpear","oakMaul","boarTuskPendant","courageMedal"]],
    ["불도마뱀",19,8,2,["emberTail","emberScale"],["emberDagger","emberMantle","phoenixPin","drakeLance"]],
    ["동굴거미",21,8,3,["spiderLeg","venomSac"],["spiderSilkVest","shadowKnife","mistVeil","hunterBow"]],
    ["이끼거북",25,5,5,["mossShell","swampMoss"],["mossAegis","mossAxe","thornHarness","vitalityBrooch"]],
    ["서리박쥐",14,6,1,["batWing","frostFang"],["frostSickle","frostCloak","frostSigil","swiftFeather"]],
    ["흑염소 사자",31,10,3,["blackMane","charcoalClaw"],["velvetDuelist","thunderHammer","pilgrimCenser","courageMedal"]],
    ["수정 사슴",18,6,4,["crystalShard","venison"],["crystalRapier","scholarLens","runeStaff","starSeekerStaff"]],
    ["미믹",27,9,4,["mimicTooth","mimicLock"],["mimicLocket","gamblersCoin","shadowBead","oracleCards"]],
    ["새끼용",34,11,4,["drakeScale","dragonGland"],["drakeLance","dragonskinVest","emberMantle","sunMedallion"]],
    ["달빛나방",16,7,2,["mothDust","moonWing"],["moonRing","moonweaveDress","compassCharm","tidePearl"]],
    ["진흙 골렘",36,9,6,["golemCore","clayChunk"],["mossAegis","ironbarkPlate","dwarvenSeal","alchemyVial"]]
  ];
  const npcs = [
    {id:"herbalist",name:"에나",role:"습지의 약초꾼",text:"안개에 젖은 망토를 털던 약초꾼이 당신을 바라본다. ‘버섯의 독을 다루는 법을 알고 싶나?’",choices:[{label:"약초 바구니를 함께 옮긴다",story:"에나를 도와 늪지 약초를 길드에 전달했다.",recipe:"boarStew",item:"bitterCap",followup:"herbCache"},{label:"버섯 정보를 사 달라고 흥정한다",story:"에나와 거래를 택했다. 다음에는 더 좋은 값이 필요할 것이다.",item:"bitterCap"}]},
    {id:"cartographer",name:"브론",role:"드워프 지도 제작자",text:"바위 위에 지도를 펼친 브론이 말한다. ‘길을 알려 줄 수도 있고, 위험한 곳을 표시해 줄 수도 있지.’",choices:[{label:"안전한 길을 묻는다",story:"브론의 안전한 길을 따르기로 했다.",recipe:"tortoiseBroth",xp:4},{label:"숨겨진 보물길을 택한다",story:"브론의 위험한 보물길을 택했다.",xp:7,followup:"treasurePath"}]},
    {id:"scout",name:"사일라",role:"엘프 정찰병",text:"활시위를 늦춘 정찰병이 숲 너머를 가리킨다. ‘불도마뱀이 둥지를 옮기고 있어. 사냥꾼을 도울 생각은?’",choices:[{label:"둥지를 피해 달라는 부탁을 들어준다",story:"사일라와 함께 불도마뱀의 둥지를 비켜 갔다.",recipe:"emberSkewer",xp:4},{label:"사냥터 위치를 길드에 알린다",story:"사일라의 사냥터 정보를 길드에 보고했다.",item:"emberTail",xp:5,followup:"hunterTrail"}]},
    {id:"chef",name:"마렉",role:"떠돌이 조리사",text:"검은 솥을 닦던 마렉이 미소 짓는다. ‘마물 고기는 겁먹은 사람보다 용감한 요리사를 좋아하지.’",choices:[{label:"그의 조리 시범을 돕는다",story:"마렉의 솥 옆에서 마물 요리의 기본을 배웠다.",recipe:"spiderFritter",item:"bitterCap"},{label:"내 방식의 레시피를 들려준다",story:"마렉과 서로의 레시피를 교환했다.",recipe:"batJerky",xp:3,followup:"cookoff"}]}
  ];
  // 보스 고유 장비는 처치 보상으로만 얻는다. 상점은 일반 장비만 취급한다.
  const regionRank = player => Math.max(0, window.REGIONS?.findIndex(row => row.id === player.currentRegionId) ?? 0);
  const gearTier = player => [[0, 70], [60, 105], [90, 140], [115, 175], [140, Infinity]][Math.min(regionRank(player), 4)];
  const townStock = player => {
    const [min, max] = gearTier(player);
    const all = Object.keys(window.GEAR || {}).filter(id => {
      const gear = window.GEAR[id];
      return gear.price && !gear.unique && gear.price >= min && gear.price <= max;
    });
    const pool = all.length ? all : Object.keys(window.GEAR || {}).filter(id => window.GEAR[id].price && !window.GEAR[id].unique);
    return pool.sort(() => Math.random() - .5).slice(0, Math.min(8, pool.length));
  };
  const potionStock = () => ["healthPotion", "staminaPotion"].filter(() => Math.random() < .58);
  const worldEvents = [
    {title:"묻힌 보물상자",role:"갈림길의 속삭임",text:"낡은 이정표 아래로 반쯤 묻힌 보물상자가 보인다. 열쇠 구멍은 아직 따뜻하다.",choices:[{label:"표시된 오솔길을 따라간다",story:"이정표의 화살표를 따라 보물길로 들어섰다.",followup:"treasurePath"},{label:"상자를 두고 안전한 길을 택한다",story:"욕심을 누르고 안전한 길을 선택했다.",xp:4}]},
    {title:"사라진 사냥꾼의 발자국",role:"젖은 숲바닥",text:"피 묻은 발자국과 부러진 화살이 이어진다. 누군가 마물에게 쫓기고 있었던 모양이다.",choices:[{label:"발자국을 추적한다",story:"사라진 사냥꾼의 흔적을 추적하기로 했다.",followup:"hunterTrail"},{label:"화살을 챙기고 야영지로 알린다",story:"위험한 흔적을 길드에 알리기로 했다.",gold:12,xp:3}]},
    {title:"무너진 돌다리",role:"비 내린 계곡",text:"건너편에서 종소리가 들린다. 돌다리 아래에는 희미한 빛이 반짝인다.",choices:[{label:"다리 아래의 빛을 살핀다",story:"차가운 물살을 헤치고 빛을 확인하러 갔다.",followup:"herbCache"},{label:"돌을 쌓아 다리를 보수한다",story:"지나는 이들을 위해 무너진 다리에 돌을 얹었다.",xp:6}]}
  ];
  // 안개 낀 숲길의 사건 풀: NPC 4종과 아래 환경 사건 13종이 무작위로 등장합니다.
  worldEvents.push(
    {title:"까마귀의 대가",role:"검은 날개",text:"금빛 단추를 문 까마귀가 세 번 울고는, 깊은 숲으로 날아간다.",choices:[{label:"반짝이는 것을 따라간다",story:"까마귀가 남긴 깃털을 따라갔다.",followup:"ravenTrade"},{label:"먹이를 남기고 길을 지킨다",story:"까마귀에게 먹이를 놓고 안전한 길을 골랐다.",xp:4}]},
    {title:"이끼 낀 제단",role:"잊힌 신앙",text:"비에 젖은 제단의 홈에서 푸른 불꽃이 깜박인다. 손바닥 크기의 돌문양이 보인다.",choices:[{label:"문양에 손을 얹는다",story:"차가운 제단의 문양에 손을 얹었다.",followup:"moonShrine"},{label:"제단 주변을 조사한다",story:"제단을 건드리지 않고 주변의 흔적을 살폈다.",xp:5,item:"bitterCap"}]},
    {title:"버려진 수레",role:"진흙길",text:"한쪽 바퀴가 빠진 수레와 찢긴 천막이 길을 막고 있다. 수레 바닥에는 긁힌 자국이 선명하다.",choices:[{label:"끌고 간 흔적을 추적한다",story:"수레를 끌고 간 존재의 흔적을 따라갔다.",followup:"wagonTracks"},{label:"쓸 만한 부품을 챙긴다",story:"수레에서 쓸 만한 물건을 챙겼다.",gold:10,xp:3}]},
    {title:"속삭이는 우물",role:"안개 속 물소리",text:"폐허의 우물 안에서 누군가 당신의 이름을 부른다. 물 위에는 은빛 원이 퍼진다.",choices:[{label:"밧줄을 내려보낸다",story:"우물 아래의 목소리에 답하기로 했다.",followup:"wellWhispers"},{label:"우물을 봉인하고 떠난다",story:"돌을 얹어 우물의 입을 막았다.",xp:6}]},
    {title:"사슴뿔 그림자",role:"숲의 경계",text:"수정처럼 빛나는 뿔이 나무 사이를 스친다. 발밑에는 별가루 같은 흔적이 남는다.",choices:[{label:"별가루 흔적을 따른다",story:"수정 사슴의 흔적을 조심스럽게 따랐다.",followup:"stagChase"},{label:"숨을 죽이고 길을 비킨다",story:"숲의 주인을 방해하지 않기로 했다.",xp:4}]},
    {title:"밀렵꾼의 덫",role:"녹슨 쇠사슬",text:"상처 난 짐승의 울음소리와 함께, 나무마다 밀렵꾼의 덫이 걸려 있다.",choices:[{label:"덫의 주인을 찾아간다",story:"밀렵꾼의 야영지를 찾기로 했다.",followup:"poacherCamp"},{label:"덫을 해체하고 짐승을 놓아준다",story:"덫을 하나씩 해체해 숲의 짐승을 풀어줬다.",xp:7}]},
    {title:"균사체 원",role:"버섯의 숨결",text:"거대한 버섯들이 원을 이루고 있다. 원의 한가운데에는 아직 따뜻한 발자국이 있다.",choices:[{label:"원 안으로 들어간다",story:"버섯 원 한가운데로 발을 들였다.",followup:"sporeCircle"},{label:"바깥의 버섯만 채집한다",story:"위험한 원을 피하고 바깥 버섯을 채집했다.",item:"bitterCap",xp:3}]},
    {title:"무너진 감시탑",role:"옛 길드의 흔적",text:"반쯤 기울어진 감시탑 꼭대기에서 신호 거울이 반짝인다. 아래에는 어두운 지하 입구가 있다.",choices:[{label:"탑 꼭대기에 오른다",story:"부서진 계단을 밟고 감시탑을 올랐다.",followup:"watchtowerSignal"},{label:"지하 입구를 표시하고 돌아간다",story:"위험한 입구를 지도에 표시했다.",gold:14,xp:4}]},
    {title:"길 잃은 꼬마 여우",role:"붉은 꼬리",text:"작은 여우가 당신의 가방을 킁킁대며 숲 안쪽을 바라본다. 목에는 낡은 리본이 묶여 있다.",choices:[{label:"여우를 따라간다",story:"꼬마 여우가 가리킨 오솔길을 따라갔다.",followup:"foxTrail"},{label:"먹이를 나누고 떠난다",story:"여우에게 먹이를 나누고 길을 재촉했다.",xp:4}]},
    {title:"밤의 등불 행렬",role:"달 없는 밤",text:"안개 너머로 등불을 든 사람들의 행렬이 지나간다. 발자국은 진흙 위에 남지 않는다.",choices:[{label:"등불 행렬에 합류한다",story:"이름 없는 등불 행렬의 뒤를 따랐다.",followup:"lanternPath"},{label:"불을 피우고 아침까지 기다린다",story:"낯선 행렬을 피하고 야영했다.",xp:3}]}
  );
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
  Object.assign(followups, {
    ravenTrade:[
      {title:"까마귀의 둥지",text:"까마귀 둥지에서 길드 인장이 든 주머니를 찾아 금화를 얻었다.",gold:24},
      {title:"까마귀의 둥지",text:"둥지 아래의 상자는 미믹의 먹이통이었다.",enemy:["미믹",27,9,4,["mimicTooth","mimicLock"],"mimicLocket"]},
      {title:"까마귀의 둥지",text:"까마귀는 아무것도 주지 않았지만, 숨은 샛길을 알려 주었다.",xp:8}
    ],
    moonShrine:[
      {title:"푸른 제단의 응답",text:"제단의 불꽃이 사그라들며 달빛나방의 가루를 남겼다.",item:"mothDust",xp:5},
      {title:"푸른 제단의 응답",text:"제단을 지키던 달빛나방 떼가 잠을 깨웠다.",enemy:["달빛나방",16,7,2,["mothDust","moonWing"],"moonRing"]},
      {title:"푸른 제단의 응답",text:"아무 일도 일어나지 않았지만, 오래된 기도문을 읽으며 마음을 다잡았다.",xp:9}
    ],
    wagonTracks:[
      {title:"수레를 끌고 간 자",text:"도둑들은 이미 떠났지만, 진흙 속에서 금화 주머니를 떨어뜨렸다.",gold:30},
      {title:"수레를 끌고 간 자",text:"수레를 끌던 것은 동굴거미였다. 거미줄이 길을 막았다.",enemy:["동굴거미",21,8,3,["spiderLeg","venomSac"],"spiderSilkVest"]},
      {title:"수레를 끌고 간 자",text:"흔적은 빗물에 사라졌지만, 수레바퀴 자국을 읽는 법을 배웠다.",xp:7}
    ],
    wellWhispers:[
      {title:"우물 아래의 목소리",text:"우물 속 은빛 물고기가 오래된 금화를 밀어 올렸다.",gold:36},
      {title:"우물 아래의 목소리",text:"목소리는 물에 숨어 있던 점액괴의 유인이었다.",enemy:["이끼 점액괴",15,5,1,["slimeGel"]]},
      {title:"우물 아래의 목소리",text:"목소리는 사라졌지만, 물 위의 별자리를 읽어 지혜를 얻었다.",xp:10}
    ],
    stagChase:[
      {title:"별가루 오솔길",text:"수정 사슴이 떨어뜨린 뿔 조각을 발견했다.",item:"crystalShard",xp:4},
      {title:"별가루 오솔길",text:"사슴을 노리던 굶주린 뿔멧돼지가 돌진해 왔다.",enemy:["뿔멧돼지",23,7,2,["boarMeat","boarHorn"],"boarSpear"]},
      {title:"별가루 오솔길",text:"사슴은 숲 깊은 곳으로 사라졌지만, 별가루가 숨은 길을 밝혀 주었다.",gold:18,xp:4}
    ],
    poacherCamp:[
      {title:"밀렵꾼의 야영지",text:"도망친 밀렵꾼의 상자에서 장비값으로 쓸 금화를 챙겼다.",gold:38},
      {title:"밀렵꾼의 야영지",text:"밀렵꾼이 키우던 흑염소 사자가 쇠사슬을 끊고 달려들었다.",enemy:["흑염소 사자",31,10,3,["blackMane","charcoalClaw"],"boarSpear"]},
      {title:"밀렵꾼의 야영지",text:"야영지는 비어 있었지만, 덫을 피하는 방법을 익혔다.",xp:9}
    ],
    sporeCircle:[
      {title:"버섯 원의 중심",text:"버섯 원 중앙에서 해독 성분이 짙은 쓴갓을 찾았다.",item:"bitterCap",gold:14},
      {title:"버섯 원의 중심",text:"균사체를 밟자 거대한 동굴거미가 잠에서 깨어났다.",enemy:["동굴거미",21,8,3,["spiderLeg","venomSac"],"spiderSilkVest"]},
      {title:"버섯 원의 중심",text:"환각은 오래가지 않았지만, 마물 식재료의 독성을 분별하는 감각을 얻었다.",xp:11}
    ],
    watchtowerSignal:[
      {title:"감시탑의 신호",text:"신호 거울 뒤에서 옛 길드의 금화 상자를 발견했다.",gold:46},
      {title:"감시탑의 신호",text:"거울빛에 이끌린 서리박쥐 떼가 탑 안으로 몰려들었다.",enemy:["서리박쥐",14,6,1,["batWing","frostFang"]]},
      {title:"감시탑의 신호",text:"아무도 오지 않았지만, 멀리 연기골 마을의 방향을 정확히 확인했다.",xp:8}
    ],
    foxTrail:[
      {title:"여우가 가리킨 굴",text:"여우는 반짝이는 동전이 든 둥지를 보여 주고 사라졌다.",gold:22},
      {title:"여우가 가리킨 굴",text:"굴에는 새끼용의 허물이 걸려 있었고, 곧 화난 새끼용이 나타났다.",enemy:["새끼용",34,11,4,["drakeScale","dragonGland"],"emberDagger"]},
      {title:"여우가 가리킨 굴",text:"굴은 비어 있었지만, 여우의 재빠른 발걸음을 흉내 내며 민첩한 길찾기를 익혔다.",xp:9}
    ],
    lanternPath:[
      {title:"등불 행렬의 종착지",text:"행렬은 오래된 순례자들의 기억이었다. 사라진 자리에 금화가 남았다.",gold:34},
      {title:"등불 행렬의 종착지",text:"등불이 한꺼번에 꺼지고, 폐허의 미믹이 길을 가로막았다.",enemy:["미믹",27,9,4,["mimicTooth","mimicLock"],"mimicLocket"]},
      {title:"등불 행렬의 종착지",text:"행렬은 안개 속으로 녹아들었지만, 당신의 이야기에 새로운 한 줄이 남았다.",xp:12}
    ]
  });
  Object.assign(followups, {
    strengthRoute:[
      {title:"힘으로 연 숨은 길",text:"바위를 밀어내자 오래된 길드 상자가 드러났다.",gold:32},
      {title:"힘으로 연 숨은 길",text:"바위 뒤에서 잠자던 뿔멧돼지가 튀어나왔다.",enemy:["뿔멧돼지",23,7,2,["boarMeat","boarHorn"],"boarSpear"]},
      {title:"힘으로 연 숨은 길",text:"길은 막혀 있었지만, 몸을 단련할 수 있는 바위 지형을 기억했다.",xp:9}
    ],
    agilityRoute:[
      {title:"민첩하게 넘은 덫길",text:"덫 사이에서 밀렵꾼이 떨어뜨린 금화 주머니를 발견했다.",gold:26},
      {title:"민첩하게 넘은 덫길",text:"덫에 걸린 먹이를 노리던 동굴거미가 모습을 드러냈다.",enemy:["동굴거미",21,8,3,["spiderLeg","venomSac"],"spiderSilkVest"]},
      {title:"민첩하게 넘은 덫길",text:"아무것도 얻지 못했지만, 발을 디딜 곳을 읽는 감각이 날카로워졌다.",xp:10}
    ],
    intelligenceRoute:[
      {title:"해독한 룬의 방",text:"룬 상자 안에는 마력 결정과 조리 메모가 남아 있었다.",item:"crystalShard",recipe:"crystalTea",xp:5},
      {title:"해독한 룬의 방",text:"룬의 마지막 글자는 미믹을 깨우는 명령이었다.",enemy:["미믹",27,9,4,["mimicTooth","mimicLock"],"mimicLocket"]},
      {title:"해독한 룬의 방",text:"상자는 비었지만, 지식을 조합해 숨은 통로를 그려 냈다.",xp:12}
    ],
    charismaRoute:[
      {title:"설득으로 얻은 소문",text:"숨어 있던 떠돌이가 미안하다며 금화와 장신구 재료를 내놓았다.",gold:30,item:"mimicLock"},
      {title:"설득으로 얻은 소문",text:"상대가 거짓말을 하던 사이, 뒤편의 미믹이 덮쳐 왔다.",enemy:["미믹",27,9,4,["mimicTooth","mimicLock"],"mimicLocket"]},
      {title:"설득으로 얻은 소문",text:"상대는 떠났지만, 당신의 말은 숲길의 다른 여행자들에게 퍼졌다.",xp:11}
    ],
    constitutionRoute:[
      {title:"독안개 너머",text:"독안개 속에서 희귀한 해독 버섯과 금화를 발견했다.",item:"bitterCap",gold:20},
      {title:"독안개 너머",text:"독안개를 피난처 삼던 이끼거북이 길을 막았다.",enemy:["이끼거북",25,5,5,["mossShell","swampMoss"],"mossAegis"]},
      {title:"독안개 너머",text:"아무것도 없었지만, 몸이 독기를 견디는 법을 기억했다.",xp:10}
    ],
    wisdomRoute:[
      {title:"직감이 가리킨 길",text:"직감이 이끈 곳에서 달빛나방의 가루를 찾아냈다.",item:"mothDust",gold:16},
      {title:"직감이 가리킨 길",text:"불길함의 정체는 나뭇가지에 매달린 서리박쥐 무리였다.",enemy:["서리박쥐",14,6,1,["batWing","frostFang"]]},
      {title:"직감이 가리킨 길",text:"길은 평범했지만, 위험을 피하는 감각이 한층 또렷해졌다.",xp:13}
    ]
  });
  const statTrials = [
    {label:"[힘] 장애물을 부수고 길을 낸다",check:{stat:"strength",difficulty:13,label:"힘으로 길 개척",success:{story:"쓰러진 나무를 밀어내고 숨은 길로 들어섰다.",followup:"strengthRoute",xp:4},failure:{story:"무리하게 나무를 밀다 어깨를 부딪혔다.",damage:3}}},
    {label:"[민첩] 위험한 틈을 재빠르게 넘는다",check:{stat:"agility",difficulty:13,label:"민첩한 돌파",success:{story:"낙엽과 덫을 밟지 않고 흔적을 따라갔다.",followup:"agilityRoute",xp:4},failure:{story:"발을 헛디뎌 거친 덤불에 긁혔다.",damage:2}}},
    {label:"[지능] 남겨진 흔적을 논리적으로 해독한다",check:{stat:"intelligence",difficulty:14,label:"지능으로 흔적 해독",success:{story:"기호의 규칙을 풀고 비밀 장소를 찾아냈다.",followup:"intelligenceRoute",xp:5},failure:{story:"기호를 잘못 읽어 시간을 허비했다.",stamina:-2}}},
    {label:"[카리스마] 숨어 있는 이를 설득해 정보를 얻는다",check:{stat:"charisma",difficulty:14,label:"카리스마로 설득",success:{story:"경계하던 이가 마음을 풀고 비밀을 털어놓았다.",followup:"charismaRoute",gold:8},failure:{story:"상대는 당신을 믿지 않고 숲속으로 사라졌다."}}},
    {label:"[건강] 독안개를 견디며 가까이 다가간다",check:{stat:"constitution",difficulty:13,label:"건강으로 독안개 견디기",success:{story:"독안개를 견뎌내고 안쪽의 흔적을 조사했다.",followup:"constitutionRoute",xp:4},failure:{story:"독안개에 기침을 하며 뒤로 물러났다.",damage:4}}},
    {label:"[지혜] 직감으로 가장 안전한 발자국을 고른다",check:{stat:"wisdom",difficulty:14,label:"지혜로 위험 감지",success:{story:"직감이 이끄는 길을 따라 숨은 장소를 발견했다.",followup:"wisdomRoute",xp:5},failure:{story:"불길한 느낌을 늦게 알아차려 길을 돌아갔다.",stamina:-2}}}
  ];
  const poacherEvent = worldEvents.find(event => event.title === "밀렵꾼의 덫");
  poacherEvent.choices.push({label:"[카리스마] 밀렵꾼에게 사과와 보상을 요구한다",check:{stat:"charisma",difficulty:15,label:"밀렵꾼 설득",success:{story:"밀렵꾼은 얼굴을 붉히며 사과하고, 죄책감에 장비 재료와 금화를 내놓았다.",item:"boarHorn",gold:28,xp:6},failure:{story:"밀렵꾼은 비웃으며 덫을 끊고 숲으로 달아났다."}}});
  worldEvents.forEach((event,index) => { if (event.choices.length < 3) { const trial=statTrials[index % statTrials.length]; event.choices.push({label:trial.label,check:{...trial.check,success:{...trial.check.success},failure:{...trial.check.failure}}}); } });
  npcs.find(npc=>npc.id==="herbalist").choices.push({label:"[지능] 독성균을 직접 감별한다",check:{stat:"intelligence",difficulty:13,label:"독성균 감별",success:{story:"독성의 결을 정확히 구분해 에나를 놀라게 했다.",item:"bitterCap",recipe:"spiderFritter",xp:5},failure:{story:"독성균을 잘못 만져 손끝이 저렸다.",damage:3}}});
  npcs.find(npc=>npc.id==="cartographer").choices.push({label:"[지혜] 지도 없이 바람의 흐름을 읽는다",check:{stat:"wisdom",difficulty:14,label:"바람으로 길 찾기",success:{story:"바람과 새소리에서 길을 읽어냈다.",followup:"wisdomRoute",xp:6},failure:{story:"안개에 속아 빙 돌아왔다.",stamina:-2}}});
  npcs.find(npc=>npc.id==="scout").choices.push({label:"[민첩] 절벽길로 몰래 정찰한다",check:{stat:"agility",difficulty:14,label:"절벽길 정찰",success:{story:"발소리 하나 없이 절벽길을 건넜다.",followup:"agilityRoute",xp:6},failure:{story:"미끄러져 무릎을 다쳤다.",damage:3}}});
  npcs.find(npc=>npc.id==="chef").choices.push({label:"[카리스마] 마렉에게 비밀 조리법을 설득해 낸다",check:{stat:"charisma",difficulty:14,label:"조리사 설득",success:{story:"마렉은 웃으며 숨겨 둔 조리 비법을 알려 주었다.",recipe:"mimicToast",gold:15,xp:5},failure:{story:"마렉은 웃기만 하며 솥뚜껑을 닫았다."}}});
  let game, modal;
  const esc = text => String(text).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const itemData = id => window.GEAR?.[id] || window.ITEMS?.[id] || extraItems[id] || {name:id,icon:"?"};
  const itemName = id => itemData(id).name;
  const itemIcon = id => itemData(id).icon || "?";
  function ensure() { const p=game.player; p.gold ??= 35; p.discoveredMonsters ||= []; p.discoveredRecipes ||= ["slimeSoup"]; p.story ||= []; p.pendingPlots ||= []; return p; }
  function close() { modal.classList.remove("open"); window.restoreWorldBackdrop?.(); }
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
  function applyChoice(title, choice) {
    const p=ensure(); let outcome=choice;
    if (choice.check) {
      const test=choice.check;
      const success=game.check(test.stat,test.difficulty,test.label || title);
      outcome={...choice,...(success ? test.success : test.failure)};
      game.log(success ? `${title}: 능력치 판정에 성공했다.` : `${title}: 능력치 판정에 실패했다.`);
    }
    if(outcome.item) p.inventory.push(outcome.item);
    if(outcome.xp) p.xp+=outcome.xp;
    if(outcome.gold) p.gold+=outcome.gold;
    if(outcome.damage) p.hp-=outcome.damage;
    if(outcome.stamina) p.stamina+=outcome.stamina;
    if(outcome.recipe) unlockRecipe(outcome.recipe,`(${title}에게서 배움)`);
    if(outcome.followup) queueFollowup(outcome.followup);
    game.clamp(); record(title,outcome.story || choice.story); close(); game.render();
  }
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
    const price = mode === "buy" ? shopPrice(gear) : Math.floor(gear.price / 2);
    return `<article class="shop-card"><span>${gear.icon}</span><div><h4>${gear.name}</h4><p>${gear.label} · ${Object.entries(gear.mods).map(([stat,value])=>`${({strength:"힘",agility:"민첩",intelligence:"지능",charisma:"카리스마",constitution:"건강",wisdom:"지혜"})[stat]} +${value}`).join(" · ")}</p><small>${gear.description}</small></div><button type="button" data-${mode}="${id}">${mode === "buy" ? `${price} G 구매` : `${price} G 판매`}</button></article>`;
  }
  function shopPrice(gear) { return Math.ceil(gear.price * (1 + regionRank(ensure()) * .2)); }
  function potionCard(id) {
    const potion = window.ITEMS?.[id];
    if (!potion) return "";
    return `<article class="shop-card"><span>${potion.icon}</span><div><h4>${potion.name}</h4><p>${potion.type} · ${potion.effect}</p><small>${potion.description}</small></div><button type="button" data-buy-potion="${id}">${potion.price} G 구매</button></article>`;
  }
  function sellableCount(player, id) {
    const owned = player.inventory.filter(item => item === id).length;
    const equipped = Object.values(player.equipment || {}).filter(item => item === id).length;
    return Math.max(0, owned - equipped);
  }
  const towns = {
    mistwood:{ name:"안개등 마을", shop:"이끼등 대장간", copy:"안개 속 등불이 길을 밝히는 숲 가장자리의 작은 마을이다. 약초와 사냥 장비가 오간다." },
    swamp:{ name:"갈대물결 촌", shop:"갈대늪 공방", copy:"수상 가옥과 갈대 배가 늘어선 늪지 마을이다. 젖은 장비를 손보는 장인의 망치 소리가 들린다." },
    prairie:{ name:"재바람 장터", shop:"잿불 대장간", copy:"따뜻한 바람과 짐마차가 오가는 초원의 장터다. 화염에 강한 장비를 찾는 모험가가 많다." },
    mine:{ name:"푸른광맥 거점", shop:"심층 광부 공방", copy:"수정 등불 아래 광부와 룬술사가 모이는 지하 거점이다. 마력이 깃든 도구를 고를 수 있다." },
    canyon:{ name:"현무암 요새", shop:"용암철 대장간", copy:"협곡의 바람을 막는 현무암 성벽 안쪽에 선 요새 마을이다. 고급 용암철 장비가 거래된다." }
  };
  function openTown(refreshStock=false) {
    const p = ensure();
    const town = towns[p.currentRegionId] || towns.mistwood;
    window.setWorldBackdrop?.(`town-${p.currentRegionId || "mistwood"}`);
    // 이전 저장 데이터에 남아 있을 수 있는 고유 장비도 즉시 상점 재고에서 정리한다.
    p.townStock = (p.townStock || []).filter(id => window.GEAR?.[id]?.price && !window.GEAR[id].unique);
    if (refreshStock || !p.townStock.length) p.townStock = townStock(p);
    if (refreshStock || !Array.isArray(p.townPotions)) p.townPotions = potionStock();
    const stock = p.townStock;
    const potions = p.townPotions;
    const owned = [...new Set(p.inventory.filter(id => window.GEAR?.[id]?.price))].filter(id => sellableCount(p,id) > 0);
    open(town.name, `장비 상점 · ${p.gold} G`, `<p class="town-copy">${town.copy}</p><section class="shop-section"><h3>${town.shop}</h3><p class="discover-meta">이 지역의 위협도에 맞춘 장비를 취급합니다.</p>${stock.map(id=>shopCard(id,"buy")).join("")}</section><section class="shop-section"><h3>여행 물약</h3>${potions.length ? potions.map(potionCard).join("") : `<p class="empty-journal">오늘은 물약 상인이 다른 길을 택한 듯합니다.</p>`}</section><section class="shop-section"><h3>내 장비 판매</h3>${owned.length ? owned.map(id=>shopCard(id,"sell")).join("") : `<p class="empty-journal">판매할 여분 장비가 없습니다.<br>착용 중인 장비는 판매 목록에 표시되지 않습니다.</p>`}</section>`);
    modal.querySelectorAll("[data-buy]").forEach(button => button.onclick = () => buyGear(button.dataset.buy));
    modal.querySelectorAll("[data-buy-potion]").forEach(button => button.onclick = () => buyPotion(button.dataset.buyPotion));
    modal.querySelectorAll("[data-sell]").forEach(button => button.onclick = () => sellGear(button.dataset.sell));
  }
  function buyGear(id) {
    const p = ensure(), gear = window.GEAR?.[id];
    if (!gear || gear.unique) { game.log("보스 고유 장비는 상점에서 살 수 없다. 수호자를 쓰러뜨려 획득해야 한다."); return openTown(); }
    const price = shopPrice(gear);
    if (p.gold < price) { game.log("금화가 부족하다."); return openTown(); }
    p.gold -= price; p.inventory.push(id);
    game.log(`${gear.name}을(를) ${price} G에 구매했다.`);
    openTown(); game.render();
  }
  function sellGear(id) {
    const p = ensure(), gear = window.GEAR?.[id], index = p.inventory.lastIndexOf(id);
    if (!gear || index < 0) return openTown();
    if (sellableCount(p,id) < 1) { game.log("착용 중인 장비는 먼저 장비 탭에서 해제해야 판매할 수 있다."); return openTown(); }
    p.inventory.splice(index, 1); p.gold += Math.floor(gear.price / 2);
    game.log(`${gear.name}을(를) ${Math.floor(gear.price / 2)} G에 판매했다.`);
    openTown(); game.render();
  }
  function buyPotion(id) {
    const p = ensure(), potion = window.ITEMS?.[id];
    if (!potion?.price || !["healthPotion", "staminaPotion"].includes(id)) return openTown();
    if (p.gold < potion.price) { game.log("금화가 부족하다."); return openTown(); }
    p.gold -= potion.price; p.inventory.push(id);
    game.log(`${potion.name}을(를) ${potion.price} G에 구매했다. 가방에서 필요할 때 사용할 수 있다.`);
    openTown(); game.render();
  }
  function rollDrops(dropPool, gearId) {
    if (dropPool.length === 1) return [...dropPool];
    // 주 드롭은 항상, 희귀 부산물은 30% 확률로 추가됩니다.
    const gear = Array.isArray(gearId) ? gearId[Math.floor(Math.random()*gearId.length)] : gearId;
    return [dropPool[0], ...(Math.random() < .30 ? [dropPool[1]] : []), ...(gear && Math.random() < .18 ? [gear] : [])];
  }
  function explore() { const p=ensure(); if(game.enemy) return; game.advanceTurn(); p.stamina-=2; p.hunger-=5; game.clamp(); if(!p.hp) return game.defeat(); const pending=p.pendingPlots.shift(); if(pending) return resolveFollowup(pending); const roll=Math.random(); if(roll<.25){ openTown(true); game.log("연기골 마을의 장터에 도착했다."); return; } if(roll<.48){ const unused=npcs.filter(npc=>!p.story.some(entry=>entry.title===npc.name)); openNpc((unused.length?unused:npcs)[Math.floor(Math.random()*(unused.length?unused:npcs).length)]); game.log("숲길에서 누군가의 발자국을 발견했다."); return; } if(roll<.70){ const event=worldEvents[Math.floor(Math.random()*worldEvents.length)]; openWorldEvent(event); game.log(`${event.title} 사건과 조우했다.`); return; } if(roll<.92){ const max=Math.min(combatTable.length,4+Math.floor(p.level/2)); const row=combatTable[Math.floor(Math.random()*max)], enemy={name:row[0],hp:row[1],maxHp:row[1],atk:row[2],def:row[3],drops:rollDrops(row[4],row[5])}; game.enemy=enemy; game.scene="combat"; discoverMonster(enemy.name); game.log(`${enemy.name}이(가) 길을 막아섰다!`); return; } const finds=["bitterCap","slimeGel","bitterCap"]; const found=finds[Math.floor(Math.random()*finds.length)]; p.inventory.push(found); game.log(`${itemName(found)}을(를) 발견했다.`); }
  function upgradePortrait(node) { if(node.tagName==="CANVAS") return; const canvas=document.createElement("canvas"); canvas.width=112; canvas.height=132; canvas.className="portrait"; node.replaceWith(canvas); const ctx=canvas.getContext("2d"), cs=getComputedStyle(node), skin=cs.getPropertyValue("--skin").trim()||"#c88864", hair=cs.getPropertyValue("--hair").trim()||"#342019", eyes=cs.getPropertyValue("--eyes").trim()||"#6fbd9c"; const race=document.querySelector(".race-choice.is-selected strong")?.textContent||"인간", seed=(skin+hair+eyes).split("").reduce((sum,char)=>sum+char.charCodeAt(0),0), style=seed%3; ctx.imageSmoothingEnabled=false; ctx.fillStyle="#18100e";ctx.fillRect(0,0,112,132);ctx.fillStyle="#3f281f";ctx.fillRect(8,8,96,116);ctx.fillStyle="#513225";ctx.fillRect(13,13,86,84);ctx.fillStyle="#2a1b18";ctx.fillRect(0,95,112,37);ctx.fillStyle=skin;ctx.fillRect(31,33,50,57);ctx.fillRect(36,88,40,19); if(race==="엘프"){ctx.fillRect(22,49,10,16);ctx.fillRect(80,49,10,16);} if(race==="수인"){ctx.fillStyle=hair;ctx.fillRect(27,19,16,20);ctx.fillRect(69,19,16,20);} ctx.fillStyle=hair;if(style===0){ctx.fillRect(26,22,60,28);ctx.fillRect(31,45,50,11);}else if(style===1){ctx.fillRect(27,20,56,20);ctx.fillRect(25,37,17,29);ctx.fillRect(70,37,17,29);}else{ctx.fillRect(25,22,62,16);ctx.fillRect(30,35,53,12);ctx.fillRect(25,43,12,19);}ctx.fillStyle="#271917";ctx.fillRect(41,58,8,5);ctx.fillRect(63,58,8,5);ctx.fillStyle=eyes;ctx.fillRect(43,59,4,4);ctx.fillRect(65,59,4,4);ctx.fillStyle="#7b4738";ctx.fillRect(52,72,9,3);ctx.fillStyle="#d8a27a";ctx.fillRect(28,107,56,5);ctx.fillStyle="#b1783f";ctx.fillRect(16,114,80,12);ctx.fillStyle="#e1b86c";ctx.fillRect(51,117,10,10);ctx.strokeStyle="#d3954c";ctx.lineWidth=3;ctx.strokeRect(3,3,106,126); }
  function boot() { game=window.game; if(!game) return; Object.assign(window.ITEMS,extraItems); modal=document.createElement("div");modal.className="exp-modal";modal.innerHTML='<div class="exp-modal__shade"></div><section class="exp-modal__panel"><header class="exp-modal__head"><div><p></p><h2></h2></div><button class="exp-modal__close" type="button">×</button></header><div class="exp-modal__body"></div></section>';document.body.append(modal);modal.querySelector(".exp-modal__shade").onclick=close;modal.querySelector(".exp-modal__close").onclick=close;const previousRender=game.render.bind(game);game.render=()=>{ensure();if(game.enemy)discoverMonster(game.enemy.name);previousRender();};const originalRest=game.rest.bind(game);game.rest=()=>{originalRest();game.advanceTurn();};const originalAttack=game.combat.attack.bind(game.combat);game.combat.attack=(...args)=>{if(!game.enemy)return;originalAttack(...args);game.advanceTurn();};game.explore=explore;game.cooking.cook=openCooking;const dock=document.querySelector(".system-dock");if(dock){dock.querySelector("[data-book]").onclick=openBook;const story=document.createElement("button");story.type="button";story.className="story-button";story.textContent="📜 이야기";story.onclick=openStory;dock.append(story);} }
  document.addEventListener("DOMContentLoaded",()=>{window.TRPG_TOWN=()=>openTown(true);});
  document.addEventListener("DOMContentLoaded",boot);
})();
