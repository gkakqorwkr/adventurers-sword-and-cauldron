(() => {
  const gearIds = [
    "rustSword", "leatherCoat", "amberCharm", "boarSpear", "emberDagger", "spiderSilkVest", "mossAegis", "moonRing", "mimicLocket", "hunterBow",
    "runeStaff", "sageWand", "oakMaul", "crystalRapier", "frostSickle", "drakeLance", "shadowKnife", "mossAxe", "thunderHammer", "pilgrimCenser",
    "starSeekerStaff", "scaleMail", "emberMantle", "frostCloak", "runicRobe", "bardicCoat", "thornHarness", "mistVeil", "ironbarkPlate", "velvetDuelist",
    "dragonskinVest", "moonweaveDress", "wandererBoots", "scholarLens", "compassCharm", "gamblersCoin", "boarTuskPendant", "vitalityBrooch", "swiftFeather", "runeEarCuff",
    "courageMedal", "whisperingShell", "dwarvenSeal", "phoenixPin", "shadowBead", "tidePearl", "oracleCards", "sunMedallion", "alchemyVial", "frostSigil"
  ];
  const itemIds = [
    "fieldKnife", "ironPot", "slimeGel", "bitterCap", "boarMeat", "emberTail", "spiderLeg", "mossShell", "boarHorn", "emberScale",
    "venomSac", "swampMoss", "batWing", "frostFang", "blackMane", "charcoalClaw", "crystalShard", "venison", "mimicTooth", "mimicLock",
    "drakeScale", "dragonGland", "mothDust", "moonWing", "golemCore", "clayChunk", "wolfLoin", "goblinHerb", "ravenWing", "wispOil",
    "fungalCap", "serpentFillet", "mireCore", "nectarPod", "leechPearl", "ramRib", "cinderMeat", "emberHeart", "beetleShell", "scorpionClaw"
  ];
  const relatedItemArt = { boneMarrow: 25, rustOil: 30, wormMeat: 27, magmaCore: 25, wyvernWing: 24, trollMeat: 37, volcanicEel: 32, cinderEssence: 38, harpyFeather: 29 };
  const sprite = (folder, index, label) => `<img class="item-visual__sprite" src="assets/${folder}/${folder === "equipment" ? "g" : "i"}${String(index).padStart(2, "0")}.png" alt="${label}" />`;
  function setArt(collection, id, folder, index) { if (collection?.[id]) collection[id].icon = sprite(folder, index, collection[id].name || id); }
  function boot() {
    if (!window.GEAR || !window.ITEMS) return setTimeout(boot, 50);
    gearIds.forEach((id, index) => setArt(window.GEAR, id, "equipment", index + 1));
    itemIds.forEach((id, index) => setArt(window.ITEMS, id, "items", index + 1));
    Object.entries(relatedItemArt).forEach(([id, index]) => setArt(window.ITEMS, id, "items", index));
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
