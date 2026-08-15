(() => {
  const source = { human: "human", elf: "elf", dwarf: "dwarf", beastfolk: "dragonkin" };
  function addPortraitAsset(canvas) {
    if (canvas.nextElementSibling?.classList.contains("portrait-overlay")) return;
    const race = document.querySelector(".race-choice.is-selected")?.dataset.race || "human";
    const image = document.createElement("img");
    image.className = "portrait-overlay";
    image.src = `assets/portraits/${source[race]}.png`;
    image.alt = "선택한 종족의 도트 초상화";
    canvas.insertAdjacentElement("afterend", image);
  }
  function refresh() { document.querySelectorAll("canvas.portrait").forEach(addPortraitAsset); }
  document.addEventListener("DOMContentLoaded", () => {
    new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
    refresh();
  });
})();
