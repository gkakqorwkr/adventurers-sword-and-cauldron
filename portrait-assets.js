(() => {
  const source = { human: "human", elf: "elf", dwarf: "dwarf", beastfolk: "dragonkin" };
  function addPortraitAsset(placeholder) {
    if (placeholder.tagName === "IMG") return;
    const race = document.querySelector(".race-choice.is-selected")?.dataset.race || "human";
    const image = document.createElement("img");
    image.className = "portrait portrait-overlay";
    image.src = `assets/portraits/${source[race]}.png`;
    image.alt = "선택한 종족의 도트 초상화";
    placeholder.replaceWith(image);
  }
  function refresh() { document.querySelectorAll(".portrait:not(img)").forEach(addPortraitAsset); }
  document.addEventListener("DOMContentLoaded", () => {
    new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
    refresh();
  });
})();
