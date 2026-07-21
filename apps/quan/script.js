/**
 * Ô ăn quan — board indices
 * dir +1 = sang phải (clockwise on visual board loop)
 * dir -1 = sang trái
 *
 * Visual:
 *        [10] [9] [8] [7] [6]     player 2 (top)
 *   [11 Q]                   [5 Q]
 *        [0]  [1] [2] [3] [4]     player 1 (bottom)
 */

const PIT_COUNT = 12;
const QUAN_INDEXES = new Set([5, 11]);
const P1_PITS = [0, 1, 2, 3, 4];
const P2_PITS = [6, 7, 8, 9, 10];

const i18n = {
  vi: {
    appTitle: "Ô ăn quan",
    tagline: "Rải dân, ăn quan — trò chơi dân gian Việt Nam",
    newGame: "Ván mới",
    setupTitle: "Thiết lập ván chơi",
    setupHint: "Đặt tên hai người chơi rồi bắt đầu",
    labelP1: "Người chơi 1 (dưới)",
    labelP2: "Người chơi 2 (trên)",
    start: "Bắt đầu",
    points: "điểm",
    turn: (name) => `Lượt: ${name}`,
    choose: "Chọn một ô dân của bạn để rải",
    pickDir: "Chọn hướng rải cho ô này",
    sowing: "Đang rải quân...",
    relay: "Ô tiếp theo còn quân — rải tiếp!",
    capture: "Ăn quân!",
    captureQuan: "Ăn được Quan!",
    noMove: "Không còn nước đi — sang lượt kia",
    borrowed: "Hết dân — mượn 5 dân từ đối phương",
    help: "Chạm ô dân bên bạn, rồi chọn hướng trái hoặc phải. Ô Quan không chọn để rải.",
    quan: "Quan",
    boardRibbon: "Ô ăn quan",
    dirEyebrow: "Chọn hướng rải",
    dirTitle: "Rải quân đi đâu?",
    dirDesc: "Bạn có thể chọn bất kỳ hướng nào",
    dirLeft: "Sang trái",
    dirRight: "Sang phải",
    dirLeftHint: "Ngược chiều kim đồng hồ",
    dirRightHint: "Theo chiều kim đồng hồ",
    dirCancel: "Hủy",
    winEyebrow: "Kết quả",
    winTitle: (name) => `${name} thắng!`,
    winDraw: "Hòa!",
    winDesc: (a, b) => `Tỷ số ${a} — ${b}`,
    playAgain: "Chơi lại",
  },
  ko: {
    appTitle: "오안콴",
    tagline: "베트남 전통 만칼라 · 씨를 뿌리고 점수를 모아요",
    newGame: "새 게임",
    setupTitle: "게임 설정",
    setupHint: "두 플레이어 이름을 정해주세요",
    labelP1: "플레이어 1 (아래)",
    labelP2: "플레이어 2 (위)",
    start: "시작",
    points: "점",
    turn: (name) => `차례: ${name}`,
    choose: "자신의 칸을 골라 씨를 뿌려요",
    pickDir: "이 칸의 방향을 고르세요",
    sowing: "뿌리는 중...",
    relay: "다음 칸에 씨가 있어 계속!",
    capture: "획득!",
    captureQuan: "콴을 먹었어요!",
    noMove: "둘 수 없어요 — 상대 차례",
    borrowed: "씨가 없어 상대에게서 5개를 빌려요",
    help: "자기 칸을 누른 뒤 왼쪽/오른쪽 방향을 고르세요. 콴 칸은 선택할 수 없어요.",
    quan: "콴",
    boardRibbon: "오안콴",
    dirEyebrow: "방향 선택",
    dirTitle: "어느 쪽으로 뿌릴까요?",
    dirDesc: "원하는 방향을 자유롭게 고르세요",
    dirLeft: "왼쪽",
    dirRight: "오른쪽",
    dirLeftHint: "반시계 방향",
    dirRightHint: "시계 방향",
    dirCancel: "취소",
    winEyebrow: "결과",
    winTitle: (name) => `${name} 승리!`,
    winDraw: "무승부!",
    winDesc: (a, b) => `점수 ${a} — ${b}`,
    playAgain: "다시 하기",
  },
};

let lang = localStorage.getItem("quan-bloom-lang") || localStorage.getItem("jihye-hub-lang") || "vi";
let state = null;
let busy = false;
let pendingPit = null;

const $ = (id) => document.getElementById(id);
const L = () => i18n[lang];

function makePit(dan = 0, quan = 0) {
  return { dan, quan };
}

function pitValue(pit) {
  return pit.dan + pit.quan * 10;
}

function pitUnits(pit) {
  return pit.dan + (pit.quan > 0 ? 10 : 0);
}

function createBoard() {
  const board = Array.from({ length: PIT_COUNT }, (_, i) =>
    QUAN_INDEXES.has(i) ? makePit(0, 1) : makePit(5, 0)
  );
  return board;
}

function createGame(name1, name2) {
  return {
    board: createBoard(),
    names: [name1, name2],
    scores: [0, 0],
    turn: 0,
    winner: null,
  };
}

function sidePits(player) {
  return player === 0 ? P1_PITS : P2_PITS;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function buildDanPits() {
  const top = $("rowTop");
  const bottom = $("rowBottom");
  top.innerHTML = "";
  bottom.innerHTML = "";

  // Top visual left→right: 10,9,8,7,6 (CSS direction:rtl on row makes buttons order ok if we append 6..10)
  // With direction:rtl, first appended appears on the right. Append 6,7,8,9,10 → visual LTR 10..6. Good.
  P2_PITS.forEach((index) => {
    top.appendChild(createDanButton(index));
  });
  P1_PITS.forEach((index) => {
    bottom.appendChild(createDanButton(index));
  });
}

function createDanButton(index) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "pit dan";
  btn.dataset.index = String(index);
  btn.id = `pit-${index}`;
  btn.innerHTML = `
    <div class="stones" id="stones-${index}"></div>
    <span class="count" id="count-${index}">5</span>
  `;
  btn.addEventListener("click", () => {
    onPitClick(index).catch(() => {
      busy = false;
    });
  });
  return btn;
}

function renderPit(index) {
  const pit = state.board[index];
  const stonesEl = $(`stones-${index}`);
  const countEl = $(`count-${index}`);
  if (!stonesEl || !countEl) return;

  stonesEl.innerHTML = "";
  const showDan = Math.min(pit.dan, 12);
  for (let i = 0; i < showDan; i++) {
    const s = document.createElement("span");
    s.className = "stone";
    s.style.animationDelay = `${i * 0.02}s`;
    stonesEl.appendChild(s);
  }
  if (pit.quan > 0) {
    const q = document.createElement("span");
    q.className = "stone quan-stone";
    stonesEl.appendChild(q);
  }

  countEl.textContent = String(pitValue(pit));
}

function renderAll() {
  for (let i = 0; i < PIT_COUNT; i++) renderPit(i);
  $("score1").textContent = String(state.scores[0]);
  $("score2").textContent = String(state.scores[1]);
  $("scoreName1").textContent = state.names[0];
  $("scoreName2").textContent = state.names[1];
  updateTurnUI();
  highlightPlayable();
}

function updateTurnUI() {
  const t = L();
  $("turnLine").textContent = t.turn(state.names[state.turn]);
  $("scoreCard1").classList.toggle("active", state.turn === 0 && !busy);
  $("scoreCard2").classList.toggle("active", state.turn === 1 && !busy);
}

function highlightPlayable() {
  document.querySelectorAll(".pit").forEach((el) => {
    el.classList.remove("playable", "glow");
  });
  if (!state || busy || state.winner != null) return;

  const mines = sidePits(state.turn);
  mines.forEach((i) => {
    if (state.board[i].dan > 0) {
      $(`pit-${i}`)?.classList.add("playable");
    }
  });
}

function setStatus(text) {
  $("statusLine").textContent = text;
}

function hasMove(player) {
  return sidePits(player).some((i) => state.board[i].dan > 0);
}

function tryBorrow(player) {
  if (hasMove(player)) return false;
  const opp = 1 - player;
  // Borrow 5 dân from opponent's richest pit, or from score if needed
  let best = -1;
  let bestDan = 0;
  sidePits(opp).forEach((i) => {
    if (state.board[i].dan > bestDan) {
      bestDan = state.board[i].dan;
      best = i;
    }
  });

  if (best >= 0 && bestDan > 0) {
    const take = Math.min(5, state.board[best].dan);
    state.board[best].dan -= take;
    // distribute to empty side starting leftmost
    let left = take;
    sidePits(player).forEach((i) => {
      if (left <= 0) return;
      state.board[i].dan += 1;
      left -= 1;
    });
    while (left > 0) {
      state.board[sidePits(player)[0]].dan += 1;
      left -= 1;
    }
    return true;
  }

  if (state.scores[opp] >= 5) {
    state.scores[opp] -= 5;
    sidePits(player).forEach((i, idx) => {
      if (idx < 5) state.board[i].dan += 1;
    });
    return true;
  }

  return false;
}

function stepIndex(index, dir) {
  return (index + dir + PIT_COUNT) % PIT_COUNT;
}

async function sowUnits(startIndex, units, dir) {
  let index = startIndex;
  for (let u = 0; u < units; u++) {
    index = stepIndex(index, dir);
    state.board[index].dan += 1;
    $(`pit-${index}`)?.classList.add("glow");
    renderPit(index);
    await sleep(160);
    $(`pit-${index}`)?.classList.remove("glow");
  }
  return index;
}

function capturePit(index, player) {
  const pit = state.board[index];
  const gained = pitValue(pit);
  const gotQuan = pit.quan > 0;
  state.scores[player] += gained;
  state.board[index] = makePit(0, 0);
  return { gained, gotQuan };
}

async function resolveAfter(lastIndex, player, dir) {
  const t = L();
  let i = lastIndex;

  while (true) {
    const next = stepIndex(i, dir);
    const nextPit = state.board[next];

    // Ô tiếp theo còn dân → lấy tiếp và rải cùng hướng
    if (nextPit.dan > 0) {
      setStatus(t.relay);
      const units = nextPit.dan;
      state.board[next].dan = 0;
      renderPit(next);
      await sleep(200);
      i = await sowUnits(next, units, dir);
      continue;
    }

    // Ô tiếp theo trống → ăn ô kế theo cùng hướng
    let probe = next;
    while (pitValue(state.board[probe]) === 0) {
      const captureIdx = stepIndex(probe, dir);
      if (pitValue(state.board[captureIdx]) <= 0) break;

      const { gotQuan } = capturePit(captureIdx, player);
      setStatus(gotQuan ? t.captureQuan : t.capture);
      renderPit(captureIdx);
      $("score1").textContent = String(state.scores[0]);
      $("score2").textContent = String(state.scores[1]);
      $(`pit-${captureIdx}`)?.classList.add("glow");
      await sleep(380);
      $(`pit-${captureIdx}`)?.classList.remove("glow");

      probe = stepIndex(captureIdx, dir);
      if (pitValue(state.board[probe]) !== 0) break;
    }

    break;
  }
}

function bothQuanGone() {
  return state.board[5].quan === 0 && state.board[11].quan === 0 &&
    pitValue(state.board[5]) === 0 && pitValue(state.board[11]) === 0;
}

function collectRemaining() {
  // End game: each player takes dân left on their side
  P1_PITS.forEach((i) => {
    state.scores[0] += state.board[i].dan;
    state.board[i].dan = 0;
  });
  P2_PITS.forEach((i) => {
    state.scores[1] += state.board[i].dan;
    state.board[i].dan = 0;
  });
  // leftover in quan pits (dân only) split? give to nobody / each quan pit dân to? add to both scores 0 — give to current
  [5, 11].forEach((i) => {
    if (state.board[i].dan > 0) {
      state.scores[0] += Math.ceil(state.board[i].dan / 2);
      state.scores[1] += Math.floor(state.board[i].dan / 2);
      state.board[i].dan = 0;
    }
  });
}

function checkEnd() {
  if (bothQuanGone()) return true;
  const totalDan =
    state.board.reduce((s, p) => s + p.dan, 0);
  if (totalDan === 0) return true;
  return false;
}

function showWin() {
  const t = L();
  collectRemaining();
  renderAll();
  const a = state.scores[0];
  const b = state.scores[1];
  $("winEyebrow").textContent = t.winEyebrow;
  if (a === b) {
    $("winTitle").textContent = t.winDraw;
    $("winTitle").style.color = varInk();
  } else {
    const winner = a > b ? 0 : 1;
    state.winner = winner;
    $("winTitle").textContent = t.winTitle(state.names[winner]);
    $("winTitle").style.color = winner === 0 ? "#2f9e74" : "#e84855";
  }
  $("winDesc").textContent = t.winDesc(a, b);
  $("winAgainBtn").textContent = t.playAgain;
  $("winModal").classList.remove("hidden");
}

function varInk() {
  return "#2d2438";
}

function openDirModal(index) {
  pendingPit = index;
  const t = L();
  $("dirEyebrow").textContent = t.dirEyebrow;
  $("dirTitle").textContent = t.dirTitle;
  $("dirDesc").textContent = t.dirDesc;
  $("dirLeftLabel").textContent = t.dirLeft;
  $("dirRightLabel").textContent = t.dirRight;
  $("dirLeftHint").textContent = t.dirLeftHint;
  $("dirRightHint").textContent = t.dirRightHint;
  $("dirCancelBtn").textContent = t.dirCancel;
  $("dirModal").classList.remove("hidden");
  setStatus(t.pickDir);
  document.querySelectorAll(".pit").forEach((el) => el.classList.remove("playable"));
  $(`pit-${index}`)?.classList.add("glow");
}

function closeDirModal({ resume = true } = {}) {
  $("dirModal").classList.add("hidden");
  if (pendingPit != null) {
    $(`pit-${pendingPit}`)?.classList.remove("glow");
  }
  pendingPit = null;
  if (resume && state && !busy) {
    setStatus(L().choose);
    highlightPlayable();
  }
}

function onPitClick(index) {
  if (!state || busy || state.winner != null) return;
  const mines = sidePits(state.turn);
  if (!mines.includes(index)) return;
  if (state.board[index].dan <= 0) return;
  openDirModal(index);
}

async function playMove(index, dir) {
  if (!state || busy || state.winner != null) return;
  const t = L();
  const mines = sidePits(state.turn);
  if (!mines.includes(index) || state.board[index].dan <= 0) return;

  closeDirModal({ resume: false });
  busy = true;
  highlightPlayable();
  setStatus(t.sowing);

  const units = state.board[index].dan;
  state.board[index].dan = 0;
  renderPit(index);
  await sleep(120);

  const last = await sowUnits(index, units, dir);
  await resolveAfter(last, state.turn, dir);

  if (checkEnd()) {
    busy = false;
    showWin();
    return;
  }

  state.turn = 1 - state.turn;
  if (!hasMove(state.turn)) {
    if (tryBorrow(state.turn)) {
      setStatus(t.borrowed);
      renderAll();
      await sleep(500);
    }
  }

  if (!hasMove(state.turn) && !hasMove(1 - state.turn)) {
    busy = false;
    showWin();
    return;
  }

  if (!hasMove(state.turn)) {
    setStatus(t.noMove);
    state.turn = 1 - state.turn;
  }

  busy = false;
  setStatus(t.choose);
  renderAll();
}

function startGame() {
  const name1 = ($("name1").value || "").trim() || "Jihye";
  const name2 = ($("name2").value || "").trim() || "Bạn";
  state = createGame(name1, name2);
  busy = false;
  $("setupView").classList.add("hidden");
  $("gameView").classList.remove("hidden");
  $("winModal").classList.add("hidden");
  buildDanPits();
  setStatus(L().choose);
  renderAll();
}

function showSetup() {
  state = null;
  busy = false;
  pendingPit = null;
  $("gameView").classList.add("hidden");
  $("setupView").classList.remove("hidden");
  $("winModal").classList.add("hidden");
  $("dirModal").classList.add("hidden");
}

function applyI18n() {
  const t = L();
  document.documentElement.lang = lang;
  $("appTitle").textContent = t.appTitle;
  $("tagline").textContent = t.tagline;
  $("newGameBtn").textContent = t.newGame;
  $("setupTitle").textContent = t.setupTitle;
  $("setupHint").textContent = t.setupHint;
  $("labelP1").textContent = t.labelP1;
  $("labelP2").textContent = t.labelP2;
  $("startBtn").textContent = t.start;
  $("scoreUnit1").textContent = t.points;
  $("scoreUnit2").textContent = t.points;
  $("helpText").textContent = t.help;
  $("quanLeftLabel").textContent = t.quan;
  $("quanRightLabel").textContent = t.quan;
  $("boardRibbon").textContent = t.boardRibbon;
  $("winAgainBtn").textContent = t.playAgain;
  $("dirCancelBtn").textContent = t.dirCancel;
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });

  if (state) {
    setStatus(busy ? t.sowing : pendingPit != null ? t.pickDir : t.choose);
    renderAll();
  }
}

function bindEvents() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang;
      localStorage.setItem("quan-bloom-lang", lang);
      applyI18n();
    });
  });
  $("startBtn").addEventListener("click", startGame);
  $("newGameBtn").addEventListener("click", showSetup);
  $("winAgainBtn").addEventListener("click", showSetup);
  $("dirCancelBtn").addEventListener("click", () => closeDirModal());
  $("dirModal").addEventListener("click", (e) => {
    if (e.target === $("dirModal")) closeDirModal();
  });
  $("dirLeftBtn").addEventListener("click", () => {
    if (pendingPit == null) return;
    const index = pendingPit;
    playMove(index, -1).catch(() => {
      busy = false;
    });
  });
  $("dirRightBtn").addEventListener("click", () => {
    if (pendingPit == null) return;
    const index = pendingPit;
    playMove(index, 1).catch(() => {
      busy = false;
    });
  });
}

bindEvents();
applyI18n();
showSetup();
