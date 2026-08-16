(() => {
  const gearIds = [
    "rustSword", "leatherCoat", "amberCharm", "boarSpear", "emberDagger", "spiderSilkVest", "mossAegis", "moonRing", "mimicLocket", "hunterBow",
    "runeStaff", "sageWand", "oakMaul", "crystalRapier", "frostSickle", "drakeLance", "shadowKnife", "mossAxe", "thunderHammer", "pilgrimCenser",
    "starSeekerStaff", "scaleMail", "emberMantle", "frostCloak", "runicRobe", "bardicCoat", "thornHarness", "mistVeil", "ironbarkPlate", "velvetDuelist",
    "dragonskinVest", "moonweaveDress", "wandererBoots", "scholarLens", "compassCharm", "gamblersCoin", "boarTuskPendant", "vitalityBrooch", "swiftFeather", "runeEarCuff",
    "courageMedal", "whisperingShell", "dwarvenSeal", "phoenixPin", "shadowBead", "tidePearl", "oracleCards", "sunMedallion", "alchemyVial", "frostSigil"
  ];
  // 인벤토리도 배열 순서가 아니라 아이템 의미에 맞는 도트 번호를 명시한다.
  const itemArt = {
    fieldKnife: 1, ironPot: 2, slimeGel: 3, bitterCap: 4, boarMeat: 5, emberTail: 6, spiderLeg: 7, mossShell: 8, boarHorn: 9, emberScale: 10,
    venomSac: 11, swampMoss: 12, batWing: 13, frostFang: 14, blackMane: 15, charcoalClaw: 16, crystalShard: 17, venison: 18, mimicTooth: 19, mimicLock: 20,
    drakeScale: 21, dragonGland: 22, mothDust: 24, moonWing: 24, golemCore: 25, clayChunk: 26, wolfLoin: 27, goblinHerb: 28, ravenWing: 29, wispOil: 30,
    fungalCap: 31, serpentFillet: 32, mireCore: 26, nectarPod: 34, leechPearl: 35, ramRib: 36, cinderMeat: 37, emberHeart: 38, beetleShell: 39, scorpionClaw: 40,
    thornVenison: 41, foxTail: 42, barkSap: 43, crocMeat: 44, sirenScale: 45, frogLeg: 46, salamanderMeat: 47, vultureWing: 48, buffaloRib: 49, ghostFlame: 50,
    crystalThread: 51, moleMeat: 52, basiliskEye: 53, chimeraMeat: 54, sunScorpionShell: 55,
    boneMarrow: 52, rustOil: 30, wormMeat: 36, magmaCore: 38, wyvernWing: 24, trollMeat: 37, volcanicEel: 32, cinderEssence: 50, harpyFeather: 48, mossGel: 56
  };
  const sprite = (folder, index, label) => `<img class="item-visual__sprite" src="assets/${folder}/${folder === "equipment" ? "g" : "i"}${String(index).padStart(2, "0")}.png" alt="${label}" />`;
  function setArt(collection, id, folder, index) { if (collection?.[id]) collection[id].icon = sprite(folder, index, collection[id].name || id); }
  function applyItemVisuals() {
    if (!window.GEAR || !window.ITEMS) return;
    gearIds.forEach((id, index) => setArt(window.GEAR, id, "equipment", index + 1));
    Object.entries(itemArt).forEach(([id, index]) => setArt(window.ITEMS, id, "items", index));
  }
  function boot() {
    if (!window.GEAR || !window.ITEMS) return setTimeout(boot, 50);
    window.applyItemVisuals = applyItemVisuals;
    applyItemVisuals();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
