(() => {
  const catalog = {
    human: [1, 2, 3].map(id => ({ id: `human-${id}`, label: `인간 외형 ${id}`, src: `assets/portraits/variants/human-${id}.png` })),
    elf: [1, 2, 3].map(id => ({ id: `elf-${id}`, label: `엘프 외형 ${id}`, src: `assets/portraits/variants/elf-${id}.png` })),
    dwarf: [1, 2, 3].map(id => ({ id: `dwarf-${id}`, label: `드워프 외형 ${id}`, src: `assets/portraits/variants/dwarf-${id}.png` })),
    beastfolk: [
      { id: "dragon", label: "용인", src: "assets/portraits/pixel/dragonkin-1.png" },
      { id: "wolf", label: "늑대 수인", src: "assets/portraits/pixel/beast-wolf.png" },
      { id: "fox", label: "여우 수인", src: "assets/portraits/pixel/beast-fox.png" },
      { id: "cat", label: "고양이 수인", src: "assets/portraits/pixel/beast-cat.png" },
      { id: "rabbit", label: "토끼 수인", src: "assets/portraits/pixel/beast-rabbit.png" },
      { id: "bear", label: "곰 수인", src: "assets/portraits/pixel/beast-bear.png" }
    ]
  };
  const choices = { human: "human-1", elf: "elf-1", dwarf: "dwarf-1", beastfolk: "dragon" };
  const generated = {};
  // 무작위 선택 뒤에도 어떤 수인 계열을 고른 상태였는지 유지한다.
  let selectedBeastfolk = "dragon";
  const premiumRandomPool = {
    human: [
      { label:"무작위 생성 · 인간", traits:"갈색 피부 · 검은 곱슬머리 · 푸른 눈", src:"assets/portraits/random/human-1.png" },
      { label:"무작위 생성 · 인간", traits:"창백한 주근깨 피부 · 백금 장발 · 회색 눈", src:"assets/portraits/random/human-2.png" },
      { label:"무작위 생성 · 인간", traits:"올리브 피부 · 적갈색 단발 · 녹색 눈", src:"assets/portraits/random/human-3.png" }
    ],
    elf: [
      { label:"무작위 생성 · 엘프", traits:"창백한 피부 · 은발 · 보랏빛 눈 · 길고 넓은 귀", src:"assets/portraits/random/elf-1.png" },
      { label:"무작위 생성 · 엘프", traits:"올리브 피부 · 흑발 녹색 줄무늬 · 호박색 눈 · 날카로운 귀", src:"assets/portraits/random/elf-2.png" },
      { label:"무작위 생성 · 엘프", traits:"구릿빛 피부 · 짧은 백발 · 청록색 눈 · 가느다란 귀", src:"assets/portraits/random/elf-3.png" }
    ],
    dwarf: [
      { label:"무작위 생성 · 드워프", traits:"넓은 얼굴 · 큰 둥근 코 · 붉은 땋은 수염 · 푸른 눈", src:"assets/portraits/random/dwarf-1.png" },
      { label:"무작위 생성 · 드워프", traits:"짙은 피부 · 매부리코 · 은빛 수염 · 호박색 눈", src:"assets/portraits/random/dwarf-2.png" },
      { label:"무작위 생성 · 드워프", traits:"창백한 피부 · 큰 코 · 금발 수염 · 녹색 눈", src:"assets/portraits/random/dwarf-3.png" }
    ],
    // 수인은 선택한 동물 종류 안에서만 외형이 바뀐다.
    beastfolk: {
      dragon: [
        { label:"무작위 생성 · 푸른 용인", traits:"푸른 비늘 · 황금 눈 · 굵은 뿔 · 남색 망토", src:"assets/portraits/pixel/dragonkin-2.png" },
        { label:"무작위 생성 · 숲의 용인", traits:"녹색 비늘 · 청록 눈 · 뒤로 굽은 뿔 · 깃털 장식", src:"assets/portraits/pixel/dragonkin-3.png" }
      ],
      wolf: [
        { label:"무작위 생성 · 검은 늑대 수인", traits:"검은 털 · 흰 가슴털 · 얼음빛 눈 · 찢어진 귀", src:"assets/portraits/pixel/random-beast-wolf.png" },
        { label:"무작위 생성 · 은빛 늑대 수인", traits:"은회색 털 · 호박색 눈 · 풍성한 갈기 · 푸른 여행 망토", src:"assets/portraits/pixel/random-beast-wolf-2.png" }
      ],
      fox: [
        { label:"무작위 생성 · 은여우 수인", traits:"은백색 털 · 에메랄드 눈 · 곧게 선 귀 · 청록 망토", src:"assets/portraits/pixel/random-beast-fox-2.png" },
        { label:"무작위 생성 · 붉은 여우 수인", traits:"붉은 털 · 푸른 눈 · 긴 귀 · 푸른 여행 망토", src:"assets/portraits/pixel/beast-fox.png" }
      ],
      cat: [{ label:"무작위 생성 · 고양이 수인", traits:"황갈색 털 · 푸른 눈 · 한쪽 접힌 귀", src:"assets/portraits/pixel/random-beast-cat.png" }],
      rabbit: [{ label:"무작위 생성 · 토끼 수인", traits:"갈색 털 · 검은 눈 · 긴 롭이어", src:"assets/portraits/pixel/random-beast-rabbit.png" }],
      bear: [{ label:"무작위 생성 · 곰 수인", traits:"크림색 털 · 녹색 눈 · 둥근 귀", src:"assets/portraits/pixel/random-beast-bear.png" }]
    }
  };
  const race = () => document.querySelector(".race-choice.is-selected")?.dataset.race || "human";
  const selected = selectedRace => catalog[selectedRace].find(item => item.id === choices[selectedRace]) || catalog[selectedRace][0];
  const random = list => list[Math.floor(Math.random() * list.length)];
  function createPremiumPortrait(selectedRace) {
    const pool = selectedRace === "beastfolk" ? premiumRandomPool.beastfolk[selectedBeastfolk] || premiumRandomPool.beastfolk.dragon : premiumRandomPool[selectedRace];
    const previous = generated[selectedRace]?.src;
    const alternatives = pool.filter(option => option.src !== previous);
    return { id:"random", ...random(alternatives.length ? alternatives : pool) };
  }
  function createGeneratedPortrait(selectedRace) {
    const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), scale = 2, unit = value => value * scale;
    canvas.width = unit(64); canvas.height = unit(72); ctx.imageSmoothingEnabled = false;
    const palette = {
      skin: random(["#efbb91", "#c98663", "#9e5e45", "#6e3c31"]), hair: random(["#2b1a16", "#6b3925", "#c27636", "#e1c5a0", "#7b2828"]), eye: random(["#4d9e72", "#568dc7", "#d3a53d", "#9e75bd", "#553a2b"]), cloth: random(["#385a75", "#63412d", "#4f6f47", "#6e3141", "#594776"]), fur: random(["#e6d8bb", "#7a513b", "#363941", "#b8773d", "#29201e"])
    };
    const px = (color,x,y,w,h) => { ctx.fillStyle=color; ctx.fillRect(unit(x),unit(y),unit(w),unit(h)); };
    const outline = "#1d1413", light = "#f5e4c4", shadow = "#56372e";
    px("#1b1211",0,0,64,72); px("#3b251d",4,4,56,64); px("#553429",7,7,50,48); px(outline,12,53,40,15); px(palette.cloth,15,55,34,13); px(light,29,34,6,3);
    const eye = x => { px(outline,x,31,8,6); px(light,x+1,32,6,3); px(palette.eye,x+3,32,2,3); };
    if (selectedRace === "beastfolk") {
      const animal = random(["늑대 수인", "여우 수인", "고양이 수인", "토끼 수인", "곰 수인"]), earStyle = random([0,1,2]);
      if (animal === "토끼 수인") { const lop = earStyle === 2; px(outline,15,10,9,27); px(palette.fur,17,11,5,24); px(outline,40,10,9,27); px(palette.fur,42,11,5,24); if(lop){px(outline,10,24,7,17);px(palette.fur,11,25,5,14);px(outline,47,24,7,17);px(palette.fur,48,25,5,14);} }
      else if (animal === "곰 수인") { px(outline,11,15,13,12);px(palette.fur,13,16,9,9);px(outline,40,15,13,12);px(palette.fur,42,16,9,9); }
      else { px(outline,12,10,15,18);px(palette.fur,15,12,9,13);px(outline,37,10,15,18);px(palette.fur,40,12,9,13); if(animal === "여우 수인") { px(palette.hair,18,15,5,6);px(palette.hair,43,15,5,6); } }
      px(outline,16,22,32,27); px(palette.fur,18,23,28,24); px(shadow,21,40,22,6); eye(20); eye(36); px(outline,29,39,7,5); px("#e4a092",31,39,3,2); px(light,26,42,12,4);
      return { id:"random", label:`무작위 생성 · ${animal}`, src:canvas.toDataURL("image/png") };
    }
    if (selectedRace === "elf") { px(outline,8,26,11,11);px(palette.skin,9,27,9,8);px(outline,45,26,11,11);px(palette.skin,46,27,9,8); }
    if (selectedRace === "dwarf") { px(outline,13,20,38,35);px(palette.hair,15,22,34,31);px(shadow,26,34,12,14); }
    px(outline,18,18,28,33); px(palette.skin,20,20,24,29); px(palette.hair,17,15,30,14); px(palette.hair,20,27,24,5); eye(22); eye(35); px(shadow,28,39,8,3); px(light,27,43,10,2);
    const label = selectedRace === "human" ? "인간" : selectedRace === "elf" ? "엘프" : "드워프";
    return { id:"random", label:`무작위 생성 · ${label}`, src:canvas.toDataURL("image/png") };
  }
  const active = selectedRace => choices[selectedRace] === "random" && generated[selectedRace] ? generated[selectedRace] : selected(selectedRace);
  const apply = layout => { const image = layout.querySelector(".portrait-overlay"); if (image) image.src = active(race()).src; };
  function renderPicker(layout) {
    const selectedRace = race();
    if (layout.dataset.portraitRace === selectedRace && layout.querySelector(".portrait-variants")) { apply(layout); return; }
    layout.querySelector(".portrait-variants")?.remove();
    layout.dataset.portraitRace = selectedRace;
    const picker = document.createElement("div"); picker.className = "portrait-variants";
    const profile = choices[selectedRace] === "random" ? active(selectedRace) : null;
    picker.innerHTML = `<div class="portrait-variant-head"><div><span>${profile ? profile.label : "기존 초상화 선택"}</span>${profile ? `<small class="appearance-profile">${profile.traits}</small>` : ""}</div><button type="button" data-portrait-random>🎲 새 무작위 외형 생성</button></div><div class="portrait-variant-grid">${catalog[selectedRace].map(option => `<button type="button" data-portrait-key="${option.id}" class="${choices[selectedRace] === option.id ? "is-selected" : ""}" title="${option.label}"><img src="${option.src}" alt="${option.label}" /><small>${option.label}</small></button>`).join("")}</div>`;
    picker.querySelectorAll("[data-portrait-key]").forEach(button => button.onclick = () => { if (race() === "beastfolk") selectedBeastfolk = button.dataset.portraitKey; choices[race()] = button.dataset.portraitKey; delete layout.dataset.portraitRace; renderPicker(layout); apply(layout); });
    picker.querySelector("[data-portrait-random]").onclick = () => { generated[race()] = createPremiumPortrait(race()); choices[race()] = "random"; delete layout.dataset.portraitRace; renderPicker(layout); apply(layout); };
    layout.append(picker); apply(layout);
  }
  function refresh() { document.querySelectorAll(".portrait-layout").forEach(renderPicker); }
  window.getSelectedPortraitKey = selectedRace => choices[selectedRace] || choices.human;
  window.getSelectedPortraitSrc = selectedRace => active(selectedRace).src;
  document.addEventListener("click", event => { if (event.target.closest(".creator-confirm")) setTimeout(() => { if (window.game) { window.game.player.portraitVariant = choices[race()] || "human-1"; window.game.player.portraitImage = active(race()).src; } }, 0); });
  document.addEventListener("DOMContentLoaded", () => { new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true }); refresh(); });
})();
