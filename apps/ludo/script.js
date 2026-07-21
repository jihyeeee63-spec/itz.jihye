const PATH = [
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
  [0, 7],
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
  [7, 14],
  [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
  [14, 7],
  [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  [7, 0],
  [6, 0],
];

const HOME = {
  red: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  green: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  yellow: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
  blue: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
};

const START = { red: 0, green: 13, yellow: 26, blue: 39 };
const SAFE_PATH = new Set([0, 8, 13, 21, 26, 34, 39, 47]);

const YARD = {
  red: [[10, 1], [10, 2], [11, 1], [11, 2]],
  green: [[1, 1], [1, 2], [2, 1], [2, 2]],
  yellow: [[1, 11], [1, 12], [2, 11], [2, 12]],
  blue: [[10, 11], [10, 12], [11, 11], [11, 12]],
};

const COLORS = ["red", "green", "yellow", "blue"];
const COLOR_HEX = {
  red: "#e84855",
  green: "#2f9e74",
  yellow: "#e6a317",
  blue: "#3d7bc8",
};

const i18n = {
  vi: {
    appTitle: "Cờ cá ngựa",
    tagline: "Gieo 1 hoặc 6 để xuất quân — về đích nhận cúp & thứ hạng",
    newGame: "Ván mới",
    setupTitle: "Thiết lập ván chơi",
    setupHint: "Chọn số người chơi và đặt tên",
    labelPlayers: "Số người chơi",
    start: "Bắt đầu",
    playerName: (c) => `Người chơi ${c}`,
    turn: (name) => `Lượt: ${name}`,
    rollHint: "Chạm để gieo",
    rolling: "Đang gieo...",
    rolled: (n) => `Bạn gieo được ${n}`,
    needExit: "Cần 1 hoặc 6 để xuất quân",
    exited: (n) => `Gieo ${n} — xuất được 1 ngựa!`,
    choosePiece: "Chạm vào ngựa bạn muốn đi",
    noMove: "Không có nước đi — sang lượt khác",
    extraTurn: "Gieo được 6 — được gieo thêm!",
    captured: "Đá ngựa khác màu về chuồng — phải xuất lại!",
    home: "Ngựa vào đường về đích!",
    finished: (rank) => `🏆 Về đích — hạng #${rank}!`,
    finishRank: (rank) => `Hạng #${rank}`,
    finishTitle: "Ngựa về đích!",
    finishDesc: (name, piece, rank) => `${name} · Ngựa #${piece} về đích thứ ${rank}`,
    finishOk: "Tiếp tục",
    homeCount: (n) => `${n}/4 về đích`,
    rankingTitle: "Bảng về đích",
    rankLine: (rank, name, piece) => `#${rank} · ${name} · Ngựa ${piece}`,
    winEyebrow: "Chiến thắng",
    winTitle: (name) => `${name} thắng!`,
    winDesc: "Tất cả ngựa đã về đích. Xem thứ tự về đích bên dưới.",
    playAgain: "Chơi lại",
    colorName: { red: "Đỏ", green: "Xanh lá", yellow: "Vàng", blue: "Xanh dương" },
  },
  ko: {
    appTitle: "말 경주 보드",
    tagline: "1 또는 6이 나오면 출발 — 골인 시 트로피와 순위",
    newGame: "새 게임",
    setupTitle: "게임 설정",
    setupHint: "인원과 이름을 정해주세요",
    labelPlayers: "플레이어 수",
    start: "시작",
    playerName: (c) => `플레이어 ${c}`,
    turn: (name) => `차례: ${name}`,
    rollHint: "눌러서 굴리기",
    rolling: "굴리는 중...",
    rolled: (n) => `${n}이(가) 나왔어요`,
    needExit: "출발하려면 1 또는 6이 필요해요",
    exited: (n) => `${n}! 말 한 마리가 출발해요`,
    choosePiece: "이동할 말을 눌러 주세요",
    noMove: "둘 수 없어요 — 다음 차례",
    extraTurn: "6! 한 번 더 굴리세요",
    captured: "다른 색 말을 집으로 보냈어요! 다시 출발해야 해요",
    home: "골인 길로 들어갔어요!",
    finished: (rank) => `🏆 골인 — ${rank}위!`,
    finishRank: (rank) => `${rank}위`,
    finishTitle: "말이 골인했어요!",
    finishDesc: (name, piece, rank) => `${name} · 말 #${piece} · ${rank}위 골인`,
    finishOk: "계속",
    homeCount: (n) => `골인 ${n}/4`,
    rankingTitle: "골인 순위",
    rankLine: (rank, name, piece) => `${rank}위 · ${name} · 말 ${piece}`,
    winEyebrow: "승리",
    winTitle: (name) => `${name} 승리!`,
    winDesc: "모든 말이 골인했습니다. 아래 순위를 확인하세요.",
    playAgain: "다시 하기",
    colorName: { red: "빨강", green: "초록", yellow: "노랑", blue: "파랑" },
  },
};

let lang = localStorage.getItem("horse-dash-lang") || localStorage.getItem("jihye-hub-lang") || "vi";
let state = null;

const $ = (id) => document.getElementById(id);
const L = () => i18n[lang];

function cellKey(r, c) {
  return `${r}-${c}`;
}

function coordsFor(color, progress) {
  if (progress < 0) return null;
  if (progress <= 50) {
    const idx = (START[color] + progress) % 52;
    return PATH[idx];
  }
  if (progress <= 56) return HOME[color][progress - 51];
  return [7, 7];
}

function buildBoard() {
  const board = $("board");
  board.innerHTML = "";

  for (let r = 0; r < 15; r++) {
    for (let c = 0; c < 15; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.id = `cell-${r}-${c}`;

      if (r >= 9 && c <= 5) cell.classList.add("yard-red");
      if (r <= 5 && c <= 5) cell.classList.add("yard-green");
      if (r <= 5 && c >= 9) cell.classList.add("yard-yellow");
      if (r >= 9 && c >= 9) cell.classList.add("yard-blue");

      if (r >= 6 && r <= 8 && c >= 6 && c <= 8) cell.classList.add("center");

      HOME.red.forEach(([hr, hc]) => {
        if (hr === r && hc === c) cell.classList.add("home-red");
      });
      HOME.green.forEach(([hr, hc]) => {
        if (hr === r && hc === c) cell.classList.add("home-green");
      });
      HOME.yellow.forEach(([hr, hc]) => {
        if (hr === r && hc === c) cell.classList.add("home-yellow");
      });
      HOME.blue.forEach(([hr, hc]) => {
        if (hr === r && hc === c) cell.classList.add("home-blue");
      });

      PATH.forEach(([pr, pc], i) => {
        if (pr === r && pc === c) {
          cell.classList.add("path");
          cell.classList.add(i % 2 === 0 ? "path-a" : "path-b");
          if (SAFE_PATH.has(i)) cell.classList.add("safe");
          if (i === START.red) cell.classList.add("start-red");
          if (i === START.green) cell.classList.add("start-green");
          if (i === START.yellow) cell.classList.add("start-yellow");
          if (i === START.blue) cell.classList.add("start-blue");
        }
      });

      board.appendChild(cell);
    }
  }
}

function defaultNames(count) {
  const t = L();
  const palette = COLORS.slice(0, count);
  if (count === 2) return [COLORS[0], COLORS[2]].map((c) => t.colorName[c]);
  return palette.map((c) => t.colorName[c]);
}

function colorsForCount(count) {
  if (count === 2) return ["red", "yellow"];
  if (count === 3) return ["red", "green", "yellow"];
  return [...COLORS];
}

function renderNameInputs() {
  const count = Number($("playerCount").value);
  const colors = colorsForCount(count);
  const names = defaultNames(count);
  const grid = $("nameGrid");
  grid.innerHTML = "";

  colors.forEach((color, i) => {
    const card = document.createElement("label");
    card.className = "name-card";
    card.innerHTML = `
      <span><i class="swatch" style="background:${COLOR_HEX[color]}"></i>${L().colorName[color]}</span>
      <input type="text" maxlength="20" data-color="${color}" value="${names[i]}" />
    `;
    grid.appendChild(card);
  });
}

function createGame(count, names) {
  const colors = colorsForCount(count);
  return {
    colors,
    players: colors.map((color, i) => ({
      color,
      name: names[i] || L().colorName[color],
      pieces: [-1, -1, -1, -1],
      pieceRanks: [null, null, null, null],
    })),
    turn: 0,
    dice: null,
    phase: "roll",
    selectable: [],
    winner: null,
    sixStreak: 0,
    nextRank: 1,
    finishOrder: [],
    pendingAfterFinish: null,
  };
}

function currentPlayer() {
  return state.players[state.turn];
}

function piecesAtCell(r, c) {
  const found = [];
  state.players.forEach((p, pi) => {
    p.pieces.forEach((progress, pieceIndex) => {
      if (progress < 0 || progress > 56) return;
      const pos = coordsFor(p.color, progress);
      if (pos && pos[0] === r && pos[1] === c) {
        found.push({ pi, pieceIndex, color: p.color, progress });
      }
    });
  });
  return found;
}

function destination(color, progress, steps) {
  if (progress < 0) {
    if (steps !== 1 && steps !== 6) return null;
    return 0;
  }
  if (progress >= 57) return null;

  const next = progress + steps;
  if (progress <= 50) {
    if (next <= 50) return next;
    const intoHome = next - 51;
    if (intoHome <= 5) return 51 + intoHome;
    if (intoHome === 6) return 57;
    return null;
  }
  if (next <= 56) return next;
  if (next === 57) return 57;
  return null;
}

function canLandOn(color, pieceIndex, dest) {
  if (dest == null || dest >= 57) return true;
  const pos = coordsFor(color, dest);
  if (!pos) return false;
  const [r, c] = pos;
  const occupants = piecesAtCell(r, c).filter(
    (x) => !(x.color === color && x.pieceIndex === pieceIndex)
  );

  // Không cho trùng ô với ngựa cùng màu
  if (occupants.some((x) => x.color === color)) return false;

  // Đường về đích / ô thường: ngựa khác màu trên đường chính sẽ bị đá
  // (không có ngựa khác màu trên đường về đích của mình)
  return true;
}

function legalMoves(playerIndex, dice) {
  const player = state.players[playerIndex];
  const moves = [];

  player.pieces.forEach((progress, pieceIndex) => {
    const dest = destination(player.color, progress, dice);
    if (dest == null) return;
    if (!canLandOn(player.color, pieceIndex, dest)) return;
    moves.push({ pieceIndex, from: progress, to: dest });
  });

  return moves;
}

function applyCapture(color, progress) {
  // Đá mọi ngựa khác màu đang đứng cùng ô trên đường chính → về chuồng
  if (progress < 0 || progress > 50) return false;
  const [r, c] = coordsFor(color, progress);
  let captured = false;

  state.players.forEach((p) => {
    if (p.color === color) return;
    p.pieces = p.pieces.map((prog, idx) => {
      if (prog < 0 || prog > 50) return prog;
      const pos = coordsFor(p.color, prog);
      if (pos && pos[0] === r && pos[1] === c) {
        captured = true;
        p.pieceRanks[idx] = null;
        return -1;
      }
      return prog;
    });
  });

  return captured;
}

function finishedCount(player) {
  return player.pieces.filter((p) => p >= 57).length;
}

function setStatus(text) {
  $("statusLine").textContent = text;
}

function updateTurnUI() {
  const t = L();
  const p = currentPlayer();
  $("turnLine").textContent = t.turn(p.name);
  $("turnLine").style.color = COLOR_HEX[p.color];
  renderPlayersPanel();
}

function renderPlayersPanel() {
  const t = L();
  const panel = $("playersPanel");
  panel.innerHTML = "";

  state.players.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = `player-card${i === state.turn ? " active" : ""}`;
    card.style.color = COLOR_HEX[p.color];
    card.innerHTML = `
      <span class="dot" style="background:${COLOR_HEX[p.color]}"></span>
      <div class="meta">
        <strong></strong>
        <span></span>
      </div>
    `;
    card.querySelector("strong").textContent = p.name;
    card.querySelector("span").textContent = t.homeCount(finishedCount(p));
    panel.appendChild(card);
  });
}

function renderPieces() {
  $("board").querySelectorAll(".piece").forEach((el) => el.remove());

  const groups = new Map();

  state.players.forEach((p, pi) => {
    p.pieces.forEach((progress, pieceIndex) => {
      let r;
      let c;
      if (progress < 0) {
        [r, c] = YARD[p.color][pieceIndex];
      } else if (progress >= 57) {
        r = 7;
        c = 7;
      } else {
        [r, c] = coordsFor(p.color, progress);
      }

      const key = cellKey(r, c);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ pi, pieceIndex, color: p.color, progress, r, c });
    });
  });

  groups.forEach((list) => {
    list.forEach((item, stackIndex) => {
      const piece = document.createElement("button");
      piece.type = "button";
      piece.className = `piece ${item.color}`;
      if (list.length > 1) piece.classList.add(`stacked-${(stackIndex % 4) + 1}`);

      const selectable = state.selectable.some(
        (m) => m.pieceIndex === item.pieceIndex && state.players[state.turn].color === item.color
      );
      if (selectable && state.phase === "move") {
        piece.classList.add("selectable");
        piece.addEventListener("click", () => movePiece(item.pieceIndex));
      }

      const rank = state.players[item.pi].pieceRanks[item.pieceIndex];
      if (item.progress >= 57 && rank) {
        piece.classList.add("finished");
        piece.innerHTML = `
          <span class="horse-face" aria-hidden="true">🐴</span>
          <span class="piece-cup">🏆</span>
          <span class="piece-rank">#${rank}</span>
        `;
        piece.title = `${state.players[item.pi].name} · #${rank}`;
      } else {
        piece.innerHTML = `
          <span class="horse-face" aria-hidden="true">🐴</span>
          <span class="horse-num">${item.pieceIndex + 1}</span>
        `;
        piece.title = `${state.players[item.pi].name} · Ngựa ${item.pieceIndex + 1}`;
      }

      const cell = $(`cell-${item.r}-${item.c}`);
      if (!cell) return;
      cell.style.position = "relative";
      piece.style.left = "11%";
      piece.style.top = "11%";
      cell.appendChild(piece);
    });
  });
}

function nextTurn(extra = false) {
  if (!extra) {
    state.turn = (state.turn + 1) % state.players.length;
    state.sixStreak = 0;
  }
  state.dice = null;
  state.phase = "roll";
  state.selectable = [];
  $("diceBtn").disabled = false;
  $("diceHint").textContent = L().rollHint;
  updateTurnUI();
  renderPieces();
}

async function rollDice() {
  if (!state || state.phase !== "roll" || state.winner) return;
  const t = L();
  const btn = $("diceBtn");
  btn.disabled = true;
  btn.classList.add("rolling");
  setStatus(t.rolling);

  let value = 1;
  for (let i = 0; i < 10; i++) {
    value = 1 + Math.floor(Math.random() * 6);
    $("diceFace").textContent = value;
    await new Promise((r) => setTimeout(r, 45));
  }
  btn.classList.remove("rolling");

  state.dice = value;
  setStatus(t.rolled(value));

  const moves = legalMoves(state.turn, value);
  if (!moves.length) {
    const allInYard = currentPlayer().pieces.every((p) => p < 0);
    if (allInYard && value !== 1 && value !== 6) setStatus(t.needExit);
    else setStatus(t.noMove);
    await new Promise((r) => setTimeout(r, 700));
    if (value === 6 && state.sixStreak < 2) {
      state.sixStreak += 1;
      nextTurn(true);
      setStatus(t.extraTurn);
    } else {
      nextTurn(false);
    }
    return;
  }

  state.phase = "move";
  state.selectable = moves;
  setStatus(`${t.rolled(value)}. ${t.choosePiece}`);
  renderPieces();
}

function continueAfterMove(captured) {
  const t = L();
  const player = currentPlayer();

  if (finishedCount(player) === 4) {
    state.winner = player;
    showWin(player);
    return;
  }

  const extra = state.dice === 6 || captured;
  if (extra && state.dice === 6) {
    if (state.sixStreak >= 2) {
      nextTurn(false);
    } else {
      state.sixStreak += 1;
      nextTurn(true);
      setStatus(t.extraTurn);
    }
  } else if (captured) {
    nextTurn(true);
  } else {
    nextTurn(false);
  }
}

function showFinishCelebration(entry) {
  const t = L();
  $("finishRank").textContent = t.finishRank(entry.rank);
  $("finishTitle").textContent = t.finishTitle;
  $("finishDesc").textContent = t.finishDesc(entry.name, entry.pieceIndex + 1, entry.rank);
  $("finishOkBtn").textContent = t.finishOk;
  $("finishModal").classList.remove("hidden");
}

function closeFinishCelebration() {
  $("finishModal").classList.add("hidden");
  const pending = state?.pendingAfterFinish;
  state.pendingAfterFinish = null;
  if (!pending) return;
  if (pending.won) {
    showWin(pending.player);
    return;
  }
  continueAfterMove(pending.captured);
}

function movePiece(pieceIndex) {
  if (!state || state.phase !== "move") return;
  const move = state.selectable.find((m) => m.pieceIndex === pieceIndex);
  if (!move) return;

  const t = L();
  const player = currentPlayer();
  const prev = player.pieces[pieceIndex];
  player.pieces[pieceIndex] = move.to;

  let message = t.rolled(state.dice);
  if (prev < 0 && move.to === 0) message = t.exited(state.dice);
  if (move.to >= 51 && move.to <= 56 && prev <= 50) message = t.home;

  let justFinished = null;
  if (move.to >= 57 && prev < 57) {
    const rank = state.nextRank++;
    player.pieceRanks[pieceIndex] = rank;
    justFinished = {
      rank,
      name: player.name,
      color: player.color,
      pieceIndex,
    };
    state.finishOrder.push(justFinished);
    message = t.finished(rank);
  }

  const captured = applyCapture(player.color, move.to);
  if (captured) message = t.captured;

  setStatus(message);
  state.selectable = [];
  state.phase = "wait";
  renderPieces();
  updateTurnUI();

  if (justFinished) {
    state.pendingAfterFinish = {
      captured,
      player,
      won: finishedCount(player) === 4,
    };
    if (state.pendingAfterFinish.won) state.winner = player;
    showFinishCelebration(justFinished);
    return;
  }

  setTimeout(() => continueAfterMove(captured), 450);
}

function renderFinishBoard(listEl) {
  const t = L();
  listEl.innerHTML = "";
  if (!state?.finishOrder?.length) return;

  const title = document.createElement("p");
  title.className = "finish-board-title";
  title.textContent = t.rankingTitle;
  listEl.appendChild(title);

  state.finishOrder.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="cup">🏆</span><span></span>`;
    li.style.setProperty("--c", COLOR_HEX[entry.color]);
    li.querySelector("span:last-child").textContent = t.rankLine(
      entry.rank,
      entry.name,
      entry.pieceIndex + 1
    );
    listEl.appendChild(li);
  });
}

function showWin(player) {
  const t = L();
  $("winEyebrow").textContent = t.winEyebrow;
  $("winTitle").textContent = t.winTitle(player.name);
  $("winTitle").style.color = COLOR_HEX[player.color];
  $("winDesc").textContent = t.winDesc;
  $("winAgainBtn").textContent = t.playAgain;
  renderFinishBoard($("finishBoard"));
  $("winModal").classList.remove("hidden");
  $("diceBtn").disabled = true;
}

function startGame() {
  const count = Number($("playerCount").value);
  const colors = colorsForCount(count);
  const names = colors.map((color) => {
    const input = document.querySelector(`#nameGrid input[data-color="${color}"]`);
    return (input?.value || "").trim() || L().colorName[color];
  });

  state = createGame(count, names);
  $("setupView").classList.add("hidden");
  $("gameView").classList.remove("hidden");
  $("winModal").classList.add("hidden");
  $("finishModal").classList.add("hidden");
  $("diceFace").textContent = "?";
  buildBoard();
  updateTurnUI();
  setStatus(L().rollHint);
  $("diceBtn").disabled = false;
  renderPieces();
}

function showSetup() {
  state = null;
  $("gameView").classList.add("hidden");
  $("setupView").classList.remove("hidden");
  $("winModal").classList.add("hidden");
  $("finishModal").classList.add("hidden");
  renderNameInputs();
}

function applyI18n() {
  const t = L();
  document.documentElement.lang = lang;
  $("appTitle").textContent = t.appTitle;
  $("tagline").textContent = t.tagline;
  $("newGameBtn").textContent = t.newGame;
  $("setupTitle").textContent = t.setupTitle;
  $("setupHint").textContent = t.setupHint;
  $("labelPlayers").textContent = t.labelPlayers;
  $("startBtn").textContent = t.start;
  $("diceHint").textContent = t.rollHint;
  $("winAgainBtn").textContent = t.playAgain;
  $("finishOkBtn").textContent = t.finishOk;
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });

  if (!state) renderNameInputs();
  else {
    updateTurnUI();
    renderPieces();
  }
}

function bindEvents() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang;
      localStorage.setItem("horse-dash-lang", lang);
      applyI18n();
    });
  });

  $("playerCount").addEventListener("change", renderNameInputs);
  $("startBtn").addEventListener("click", startGame);
  $("newGameBtn").addEventListener("click", showSetup);
  $("winAgainBtn").addEventListener("click", showSetup);
  $("finishOkBtn").addEventListener("click", closeFinishCelebration);
  $("diceBtn").addEventListener("click", () => {
    rollDice().catch(() => {});
  });
}

bindEvents();
applyI18n();
showSetup();
