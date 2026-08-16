(() => {
  const catalog = {
    human: [1, 2, 3].map(id => ({ id: `human-${id}`, label: `인간 외형 ${id}`, src: `assets/portraits/variants/human-${id}.png` })),
    elf: [1, 2, 3].map(id => ({ id: `elf-${id}`, label: `엘프 외형 ${id}`, src: `assets/portraits/variants/elf-${id}.png` })),
    dwarf: [1, 2, 3].map(id => ({ id: `dwarf-${id}`, label: `드워프 외형 ${id}`, src: `assets/portraits/variants/dwarf-${id}.png` })),
    beastfolk: [
      { id: "dragon", label: "용인", src: "assets/portraits/variants/dragonkin-1.png" },
      { id: "wolf", label: "늑대 수인", src: "assets/portraits/beastfolk/wolf.png" },
      { id: "fox", label: "여우 수인", src: "assets/portraits/beastfolk/fox.png" },
      { id: "cat", label: "고양이 수인", src: "assets/portraits/beastfolk/cat.png" },
      { id: "rabbit", label: "토끼 수인", src: "assets/portraits/beastfolk/rabbit.png" },
      { id: "bear", label: "곰 수인", src: "assets/portraits/beastfolk/bear.png" }
    ]
  };
  const choices = { human: "human-1", elf: "elf-1", dwarf: "dwarf-1", beastfolk: "dragon" };
  const race = () => document.querySelector(".race-choice.is-selected")?.dataset.race || "human";
  const selected = selectedRace => catalog[selectedRace].find(item => item.id === choices[selectedRace]) || catalog[selectedRace][0];
  const apply = layout => { const image = layout.querySelector(".portrait-overlay"); if (image) image.src = selected(race()).src; };
  function renderPicker(layout) {
    const selectedRace = race();
    if (layout.dataset.portraitRace === selectedRace && layout.querySelector(".portrait-variants")) { apply(layout); return; }
    layout.querySelector(".portrait-variants")?.remove();
    layout.dataset.portraitRace = selectedRace;
    const picker = document.createElement("div"); picker.className = "portrait-variants";
    picker.innerHTML = `<div class="portrait-variant-head"><span>기존 초상화 선택</span><button type="button" data-portrait-random>🎲 무작위 외형</button></div><div class="portrait-variant-grid">${catalog[selectedRace].map(option => `<button type="button" data-portrait-key="${option.id}" class="${choices[selectedRace] === option.id ? "is-selected" : ""}" title="${option.label}"><img src="${option.src}" alt="${option.label}" /><small>${option.label}</small></button>`).join("")}</div>`;
    picker.querySelectorAll("[data-portrait-key]").forEach(button => button.onclick = () => { choices[race()] = button.dataset.portraitKey; delete layout.dataset.portraitRace; renderPicker(layout); apply(layout); });
    picker.querySelector("[data-portrait-random]").onclick = () => { const options = catalog[race()]; choices[race()] = options[Math.floor(Math.random() * options.length)].id; delete layout.dataset.portraitRace; renderPicker(layout); apply(layout); };
    layout.append(picker); apply(layout);
  }
  function refresh() { document.querySelectorAll(".portrait-layout").forEach(renderPicker); }
  window.getSelectedPortraitKey = selectedRace => choices[selectedRace] || choices.human;
  document.addEventListener("click", event => { if (event.target.closest(".creator-confirm")) setTimeout(() => { if (window.game) window.game.player.portraitVariant = choices[race()] || "human-1"; }, 0); });
  document.addEventListener("DOMContentLoaded", () => { new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true }); refresh(); });
})();
