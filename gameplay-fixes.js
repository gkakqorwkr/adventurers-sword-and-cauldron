(() => {
  const recipes = [
    {id:"slimeSoup",name:"점액괴 맑은 수프",need:["slimeGel"],hunger:11,hp:3,effect:"포만감 +11 · HP +3"},{id:"boarStew",name:"뿔멧돼지 진한 스튜",need:["boarMeat","bitterCap"],hunger:25,hp:8,effect:"포만감 +25 · HP +8"},{id:"emberSkewer",name:"불도마뱀 꼬리 꼬치",need:["emberTail"],hunger:16,hp:4,effect:"포만감 +16 · 화염 저항"},{id:"spiderFritter",name:"동굴거미 다리 튀김",need:["spiderLeg","bitterCap"],hunger:20,hp:5,effect:"포만감 +20 · 민첩 버프"},{id:"batJerky",name:"서리박쥐 육포",need:["batWing"],hunger:13,hp:3,effect:"포만감 +13 · 냉기 저항"},{id:"lionRoast",name:"흑염소 사자 갈기구이",need:["blackMane","bitterCap"],hunger:28,hp:7,effect:"포만감 +28 · 힘 버프"},{id:"crystalTea",name:"수정 뿔 차",need:["crystalShard"],hunger:4,hp:0,stamina:6,effect:"기력 +6 · 지혜 버프"},{id:"tortoiseBroth",name:"이끼거북 등갑 육수",need:["mossShell","slimeGel"],hunger:8,hp:10,effect:"HP +10 · 독 저항"},{id:"mimicToast",name:"미믹 이빨 토스트",need:["mimicTooth","slimeGel"],hunger:21,hp:4,effect:"포만감 +21 · 카리스마 버프"},{id:"drakeCurry",name:"새끼용 비늘 카레",need:["drakeScale","emberTail"],hunger:24,hp:6,effect:"포만감 +24 · 화염 저항"},{id:"mothHoney",name:"달빛나방 꿀절임",need:["mothDust"],hunger:7,hp:0,stamina:8,effect:"기력 +8 · 민첩 버프"},{id:"golemBiscuit",name:"골렘 돌가루 비스킷",need:["golemCore","slimeGel"],hunger:18,hp:5,effect:"포만감 +18 · 건강 버프"}
  ];
  const buffs = {
    emberSkewer: { id:"fireWard", name:"화염 저항", effect:"화염 피해 감소", turns:5 },
    spiderFritter: { id:"nimbleSteps", name:"민첩 강화", effect:"민첩 +1", turns:4, mods:{agility:1} },
    batJerky: { id:"coldWard", name:"냉기 저항", effect:"냉기 피해 감소", turns:5 },
    lionRoast: { id:"hunterMight", name:"사냥꾼의 기세", effect:"힘 +1", turns:3, mods:{strength:1} },
    crystalTea: { id:"clearMind", name:"맑은 정신", effect:"지혜 +1", turns:5, mods:{wisdom:1} },
    tortoiseBroth: { id:"antidote", name:"독 저항", effect:"독성 피해 감소", turns:5 },
    mimicToast: { id:"silverTongue", name:"은빛 혀", effect:"카리스마 +1", turns:3, mods:{charisma:1} },
    drakeCurry: { id:"dragonHeat", name:"용의 열기", effect:"화염 저항", turns:5 },
    mothHoney: { id:"moonstep", name:"달빛 걸음", effect:"민첩 +1", turns:3, mods:{agility:1} },
    golemBiscuit: { id:"stoneSkin", name:"돌가죽", effect:"건강 +1", turns:4, mods:{constitution:1} }
  };
  let game, modal, picked=[];
  const data = id => window.ITEMS[id] || {name:id,icon:"?",type:"ingredient"};
  const count = list => list.reduce((out,id)=>(out[id]=(out[id]||0)+1,out),{});
  function bag() { return game.player.inventory.filter(id => (window.ITEMS[id] || {}).type === "ingredient"); }
  function sameIngredients(a,b) { const x=[...a].sort(),y=[...b].sort(); return x.length===y.length && x.every((id,index)=>id===y[index]); }
  function applyBuff(player, recipeId) {
    const buff = buffs[recipeId];
    if (!buff) return;
    player.statusEffects ||= [];
    const existing = player.statusEffects.find(effect => effect.id === buff.id);
    if (existing) Object.assign(existing, buff);
    else player.statusEffects.push({ ...buff });
    window.refreshPlayerStats?.();
  }
  function close(){modal.classList.remove("open");}
  function open(){modal.classList.add("open");render();}
  function render(){const stock=count(bag()), chosen=count(picked), cells=Object.entries(stock).map(([id,quantity])=>`<button type="button" class="mix-item ${chosen[id]?"selected":""}" data-item="${id}"><span class="mix-item__icon">${data(id).icon||"?"}</span><strong>${data(id).name}</strong><small>${data(id).type === "ingredient" ? "식재료" : "재료"}</small><b>×${quantity}</b></button>`).join("");const selected=picked.length?picked.map(id=>`${data(id).icon||"?"} ${data(id).name}`).join(" + "):"아직 고른 재료가 없습니다.";modal.querySelector(".mix-modal__body").innerHTML=`<p class="mix-note">가방의 재료를 1~3개 선택해 솥에 넣으세요. 처음 성공한 조합은 새로운 레시피로 기록됩니다.</p><div class="mix-grid">${cells||"<p>조리할 식재료가 없습니다.</p>"}</div><p class="mix-selected">${selected}</p><button type="button" class="mix-cook" data-mix ${picked.length?"":"disabled"}>선택한 재료를 섞어 요리하기</button>`;modal.querySelectorAll("[data-item]").forEach(button=>button.onclick=()=>toggle(button.dataset.item));modal.querySelector("[data-mix]").onclick=cook;}
  function toggle(id){const available=bag().filter(item=>item===id).length,selected=picked.filter(item=>item===id).length;if(selected<available&&picked.length<3)picked.push(id);else {const index=picked.lastIndexOf(id);if(index>=0)picked.splice(index,1);}render();}
  function cook(){if(!picked.length)return;const recipe=recipes.find(row=>sameIngredients(row.need,picked)),p=game.player;picked.forEach(id=>p.inventory.splice(p.inventory.indexOf(id),1));if(recipe){p.discoveredRecipes ||= [];const fresh=!p.discoveredRecipes.includes(recipe.id);if(fresh)p.discoveredRecipes.push(recipe.id);p.hunger+=recipe.hunger;p.hp+=recipe.hp;p.stamina+=recipe.stamina||0;applyBuff(p,recipe.id);game.clamp();const duration=buffs[recipe.id]?`<p>${buffs[recipe.id].name}: ${buffs[recipe.id].turns}턴 동안 적용</p>`:"";modal.querySelector(".mix-modal__body").innerHTML=`<div class="mix-result"><p>${fresh?"새 레시피를 발견했다!":"익숙한 조리법을 다시 완성했다."}</p><h3>${recipe.name}</h3><p>${recipe.effect}</p>${duration}<button type="button" class="mix-cook" data-close>솥을 정리한다</button></div>`;game.log(`${recipe.name}을(를) 만들었다. ${fresh?"레시피북에 기록했다.":""}`);}else{p.hunger+=4;p.hp=Math.max(1,p.hp-1);game.clamp();modal.querySelector(".mix-modal__body").innerHTML=`<div class="mix-result"><p>아직 이름 없는 실험 요리.</p><h3>수상한 마물 볶음</h3><p>포만감 +4 · HP -1</p><button type="button" class="mix-cook" data-close>다음 조합을 생각한다</button></div>`;game.log("실험 요리는 어딘가 미묘했지만, 조합의 단서를 얻었다.");}modal.querySelector("[data-close]").onclick=()=>{close();game.render();};}
  function removeDuplicateBag(){document.querySelectorAll("#action-list button").forEach(button=>{if(button.textContent.includes("가방"))button.remove();});}
  function boot(){game=window.game;if(!game)return;modal=document.createElement("div");modal.className="mix-modal";modal.innerHTML='<div class="mix-modal__shade"></div><section class="mix-modal__panel"><header class="mix-modal__head"><div><p>EXPERIMENTAL COOKING</p><h2>마물 요리 솥</h2></div><button type="button" class="mix-modal__close">×</button></header><div class="mix-modal__body"></div></section>';document.body.append(modal);modal.querySelector(".mix-modal__shade").onclick=close;modal.querySelector(".mix-modal__close").onclick=close;game.cooking.cook=()=>{picked=[];open();};const prior=game.render.bind(game);game.render=()=>{prior();removeDuplicateBag();};new MutationObserver(removeDuplicateBag).observe(document.querySelector("#action-list"),{childList:true});removeDuplicateBag();}
  document.addEventListener("DOMContentLoaded",boot);
})();
