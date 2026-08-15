(() => {
  const raceToAsset = { human: "human", elf: "elf", dwarf: "dwarf", beastfolk: "dragonkin" };
  const choices = { human: 1, elf: 1, dwarf: 1, beastfolk: 1 };
  function race() { return document.querySelector(".race-choice.is-selected")?.dataset.race || "human"; }
  function apply(layout) {
    const selectedRace = race();
    const variant = choices[selectedRace] || 1;
    const image = layout.querySelector(".portrait-overlay");
    if (image) image.src = `assets/portraits/variants/${raceToAsset[selectedRace]}-${variant}.png`;
  }
  function render(layout) {
    if (layout.querySelector(".portrait-variants")) { apply(layout); return; }
    const selectedRace = race();
    const picker = document.createElement("div");
    picker.className = "portrait-variants";
    picker.setAttribute("aria-label", "초상화 외형 선택");
    picker.innerHTML = [1, 2, 3].map(variant => `<button type="button" data-portrait-variant="${variant}" class="${choices[selectedRace] === variant ? "is-selected" : ""}"><img src="assets/portraits/variants/${raceToAsset[selectedRace]}-${variant}.png" alt="외형 ${variant}" /></button>`).join("");
    picker.querySelectorAll("[data-portrait-variant]").forEach(button => button.addEventListener("click", () => {
      choices[race()] = Number(button.dataset.portraitVariant);
      picker.querySelectorAll("button").forEach(choice => choice.classList.toggle("is-selected", choice === button));
      apply(layout);
    }));
    layout.append(picker);
    apply(layout);
  }
  function refresh() { document.querySelectorAll(".portrait-layout").forEach(render); }
  document.addEventListener("click", event => {
    if (!event.target.closest(".creator-confirm")) return;
    setTimeout(() => { if (window.game) window.game.player.portraitVariant = choices[race()] || 1; }, 0);
  });
  document.addEventListener("DOMContentLoaded", () => {
    new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
    refresh();
  });
})();
