(() => {
  "use strict";

  const STORAGE_KEY = "vocab-island-v1";
  const QUIZ_LEN = 8;
  const MAX_HEARTS = 3;

  const DEFAULT_VOCAB = [
    { ko: "안녕하세요", vi: "Xin chào" },
    { ko: "감사합니다", vi: "Cảm ơn" },
    { ko: "사랑", vi: "Tình yêu" },
    { ko: "친구", vi: "Bạn bè" },
    { ko: "가족", vi: "Gia đình" },
    { ko: "학교", vi: "Trường học" },
    { ko: "물", vi: "Nước" },
    { ko: "밥", vi: "Cơm" },
    { ko: "집", vi: "Nhà" },
    { ko: "고양이", vi: "Mèo" },
    { ko: "강아지", vi: "Chó" },
    { ko: "꽃", vi: "Hoa" },
    { ko: "바다", vi: "Biển" },
    { ko: "하늘", vi: "Bầu trời" },
    { ko: "산", vi: "Núi" },
    { ko: "책", vi: "Sách" },
    { ko: "음악", vi: "Âm nhạc" },
    { ko: "영화", vi: "Phim" },
    { ko: "커피", vi: "Cà phê" },
    { ko: "빵", vi: "Bánh mì" },
    { ko: "사과", vi: "Táo" },
    { ko: "행복", vi: "Hạnh phúc" },
    { ko: "오늘", vi: "Hôm nay" },
    { ko: "내일", vi: "Ngày mai" },
    { ko: "어제", vi: "Hôm qua" },
    { ko: "아침", vi: "Buổi sáng" },
    { ko: "밤", vi: "Đêm" },
    { ko: "여행", vi: "Du lịch" },
    { ko: "섬", vi: "Hòn đảo" },
    { ko: "도시", vi: "Thành phố" },
  ];

  const BUILDINGS = [
    {
      id: "tree",
      emoji: "🌳",
      cost: { wood: 2, flower: 1 },
      name: { vi: "Cây xanh", ko: "나무" },
    },
    {
      id: "house",
      emoji: "🏠",
      cost: { wood: 4, stone: 2, coin: 1 },
      name: { vi: "Nhà nhỏ", ko: "작은 집" },
    },
    {
      id: "shop",
      emoji: "🏪",
      cost: { wood: 3, stone: 3, coin: 2 },
      name: { vi: "Cửa hàng", ko: "상점" },
    },
    {
      id: "garden",
      emoji: "🌻",
      cost: { flower: 3, wood: 1 },
      name: { vi: "Vườn hoa", ko: "꽃밭" },
    },
    {
      id: "tower",
      emoji: "🗼",
      cost: { stone: 5, coin: 2, wood: 1 },
      name: { vi: "Tháp", ko: "탑" },
    },
    {
      id: "castle",
      emoji: "🏰",
      cost: { stone: 6, wood: 4, coin: 4, flower: 2 },
      name: { vi: "Lâu đài", ko: "성" },
    },
    {
      id: "boat",
      emoji: "⛵",
      cost: { wood: 3, coin: 2 },
      name: { vi: "Thuyền", ko: "배" },
    },
    {
      id: "cafe",
      emoji: "☕",
      cost: { wood: 2, stone: 2, flower: 1, coin: 2 },
      name: { vi: "Quán cà phê", ko: "카페" },
    },
  ];

  const MATERIALS = [
    { key: "wood", emoji: "🪵", label: { vi: "Gỗ", ko: "나무" } },
    { key: "stone", emoji: "🪨", label: { vi: "Đá", ko: "돌" } },
    { key: "flower", emoji: "🌸", label: { vi: "Hoa", ko: "꽃" } },
    { key: "coin", emoji: "🪙", label: { vi: "Xu", ko: "코인" } },
  ];

  const i18n = {
    vi: {
      brandName: "Vocab Island",
      brandSub: "Học từ · Xây đảo",
      islandTip: "Trả lời đúng để nhận vật liệu, rồi xây đảo của bạn!",
      statXpLabel: "XP",
      statStreakLabel: "Chuỗi",
      statWordsLabel: "Từ",
      btnStartQuizText: "Bắt đầu học",
      btnBuildText: "Xây đảo",
      btnUploadText: "Tải file",
      quizDir: "Chọn nghĩa đúng",
      promptHintKoToVi: "Chọn bản dịch tiếng Việt",
      promptHintViToKo: "Chọn bản dịch tiếng Hàn",
      promptLangKo: "한국어",
      promptLangVi: "Tiếng Việt",
      feedbackOk: "Chính xác!",
      feedbackBad: "Chưa đúng rồi",
      feedbackNoReward: "Không nhận vật liệu lần này",
      btnNextText: "Tiếp tục",
      btnFinishText: "Về đảo",
      buildTitle: "Xây đảo",
      buildDesc: "Chọn công trình, rồi chạm ô trống trên đảo để xây.",
      selectedNone: "Chưa chọn công trình",
      selectedReady: "Đã chọn: {name} — chạm ô trống để xây",
      needMore: "Chưa đủ vật liệu!",
      cellTaken: "Ô này đã có công trình",
      built: "Đã xây {name}!",
      uploadTitle: "Tải từ vựng",
      uploadLead: "Kéo thả Word / PDF hoặc nhấn để chọn",
      uploadNote: "Mỗi dòng: 한국어 - tiếng Việt (hoặc dùng / · |). Hỗ trợ .docx, .doc, .pdf",
      btnPickFileText: "Chọn file Word / PDF",
      previewTitle: "Từ vựng hiện có",
      btnResetVocabText: "Khôi phục mẫu",
      parseOk: "Đã thêm {n} từ từ file. Tổng: {total} từ.",
      parseEmpty: "Không tìm thấy cặp từ Hàn–Việt. Thử định dạng: 안녕 - Xin chào",
      parseFail: "Không đọc được file. Hãy dùng .docx hoặc .pdf.",
      parseReading: "Đang đọc file...",
      parseUnsupported: "Chỉ hỗ trợ Word (.docx, .doc) hoặc PDF.",
      resetOk: "Đã khôi phục bộ từ mẫu.",
      needWords: "Cần ít nhất 4 từ để chơi quiz.",
      rewardLine: "+1 {emoji} {name}",
    },
    ko: {
      brandName: "단어 섬",
      brandSub: "단어 공부 · 섬 건설",
      islandTip: "정답을 맞히면 자원을 받고 섬을 지어요!",
      statXpLabel: "XP",
      statStreakLabel: "연속",
      statWordsLabel: "단어",
      btnStartQuizText: "학습 시작",
      btnBuildText: "섬 짓기",
      btnUploadText: "파일 올리기",
      quizDir: "올바른 뜻을 고르세요",
      promptHintKoToVi: "베트남어 뜻을 고르세요",
      promptHintViToKo: "한국어 뜻을 고르세요",
      promptLangKo: "한국어",
      promptLangVi: "베트남어",
      feedbackOk: "정답!",
      feedbackBad: "아쉬워요",
      feedbackNoReward: "이번엔 자원을 받지 못했어요",
      btnNextText: "계속",
      btnFinishText: "섬으로",
      buildTitle: "섬 짓기",
      buildDesc: "건물을 고른 뒤 빈 칸을 눌러 지으세요.",
      selectedNone: "건물을 선택하세요",
      selectedReady: "선택: {name} — 빈 칸을 누르세요",
      needMore: "자원이 부족해요!",
      cellTaken: "이미 건물이 있어요",
      built: "{name}을(를) 지었어요!",
      uploadTitle: "단어장 올리기",
      uploadLead: "Word / PDF를 끌어오거나 눌러서 선택",
      uploadNote: "각 줄: 한국어 - 베트남어 (/ · | 도 가능). .docx, .doc, .pdf 지원",
      btnPickFileText: "Word / PDF 선택",
      previewTitle: "현재 단어",
      btnResetVocabText: "기본 단어로",
      parseOk: "파일에서 {n}개 추가. 총 {total}개.",
      parseEmpty: "한-베 단어 쌍을 찾지 못했어요. 예: 안녕 - Xin chào",
      parseFail: "파일을 읽지 못했어요. .docx 또는 .pdf를 사용해 주세요.",
      parseReading: "파일 읽는 중...",
      parseUnsupported: "Word(.docx, .doc) 또는 PDF만 지원해요.",
      resetOk: "기본 단어장으로 돌아갔어요.",
      needWords: "퀴즈를 하려면 단어가 4개 이상 필요해요.",
      rewardLine: "+1 {emoji} {name}",
    },
  };

  const $ = (id) => document.getElementById(id);

  const state = loadState();
  let lang = state.lang || localStorage.getItem("jihye-hub-lang") || "vi";
  let selectedBuilding = null;
  let quiz = null;

  function defaultResources() {
    return { wood: 0, stone: 0, flower: 0, coin: 0 };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createFreshState();
      const data = JSON.parse(raw);
      return {
        vocab: Array.isArray(data.vocab) && data.vocab.length ? data.vocab : [...DEFAULT_VOCAB],
        resources: { ...defaultResources(), ...(data.resources || {}) },
        grid: normalizeGrid(data.grid),
        xp: Number(data.xp) || 0,
        streak: Number(data.streak) || 0,
        bestStreak: Number(data.bestStreak) || 0,
        lang: data.lang || "vi",
      };
    } catch {
      return createFreshState();
    }
  }

  function createFreshState() {
    return {
      vocab: [...DEFAULT_VOCAB],
      resources: defaultResources(),
      grid: Array(12).fill(null),
      xp: 0,
      streak: 0,
      bestStreak: 0,
      lang: "vi",
    };
  }

  function normalizeGrid(grid) {
    const next = Array(12).fill(null);
    if (!Array.isArray(grid)) return next;
    for (let i = 0; i < 12; i++) next[i] = grid[i] || null;
    return next;
  }

  function saveState() {
    state.lang = lang;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function t(key, vars = {}) {
    let text = i18n[lang][key] || i18n.vi[key] || key;
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replaceAll(`{${k}}`, String(v));
    });
    return text;
  }

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((el) => {
      el.classList.toggle("active", el.id === id);
    });
    $("feedbackSheet").hidden = true;
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    const map = [
      "brandName",
      "brandSub",
      "islandTip",
      "statXpLabel",
      "statStreakLabel",
      "statWordsLabel",
      "btnStartQuizText",
      "btnBuildText",
      "btnUploadText",
      "quizDir",
      "buildTitle",
      "buildDesc",
      "uploadTitle",
      "uploadLead",
      "uploadNote",
      "btnPickFileText",
      "previewTitle",
      "btnResetVocabText",
    ];
    map.forEach((key) => {
      const el = $(key);
      if (el) el.textContent = t(key);
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    updateSelectedHint();
    renderCatalog();
  }

  function updateResourcesUI(popKey) {
    $("resWood").textContent = state.resources.wood;
    $("resStone").textContent = state.resources.stone;
    $("resFlower").textContent = state.resources.flower;
    $("resCoin").textContent = state.resources.coin;
    if (popKey) {
      const el = document.querySelector(`.res.${popKey}`);
      if (el) {
        el.classList.remove("pop");
        void el.offsetWidth;
        el.classList.add("pop");
      }
    }
  }

  function updateStatsUI() {
    $("statXp").textContent = state.xp;
    $("statStreak").textContent = state.streak;
    $("statWords").textContent = state.vocab.length;
  }

  function renderGrid(containerId, interactive) {
    const grid = $(containerId);
    if (!grid) return;
    grid.innerHTML = "";
    state.grid.forEach((cell, index) => {
      const div = document.createElement("button");
      div.type = "button";
      div.className = "cell" + (cell ? " filled" : "");
      div.dataset.index = String(index);
      if (cell) {
        const building = BUILDINGS.find((b) => b.id === cell);
        div.textContent = building ? building.emoji : "🏠";
      } else {
        div.textContent = "";
      }
      if (interactive) {
        div.addEventListener("click", () => placeBuilding(index));
      } else {
        div.tabIndex = -1;
        div.style.pointerEvents = "none";
      }
      grid.appendChild(div);
    });
  }

  function canAfford(cost) {
    return Object.entries(cost).every(([k, v]) => (state.resources[k] || 0) >= v);
  }

  function spend(cost) {
    Object.entries(cost).forEach(([k, v]) => {
      state.resources[k] -= v;
    });
  }

  function formatCost(cost) {
    return Object.entries(cost)
      .map(([k, v]) => {
        const m = MATERIALS.find((x) => x.key === k);
        return `${m.emoji}${v}`;
      })
      .join(" ");
  }

  function renderCatalog() {
    const catalog = $("catalog");
    if (!catalog) return;
    catalog.innerHTML = "";
    BUILDINGS.forEach((b) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "item-card";
      if (selectedBuilding === b.id) btn.classList.add("selected");
      if (!canAfford(b.cost)) btn.classList.add("locked");
      btn.innerHTML = `
        <span class="ico">${b.emoji}</span>
        <span class="name">${b.name[lang]}</span>
        <div class="cost">${formatCost(b.cost)}</div>
      `;
      btn.addEventListener("click", () => {
        selectedBuilding = b.id;
        renderCatalog();
        updateSelectedHint();
      });
      catalog.appendChild(btn);
    });
  }

  function updateSelectedHint() {
    const el = $("selectedHint");
    if (!el) return;
    if (!selectedBuilding) {
      el.textContent = t("selectedNone");
      return;
    }
    const b = BUILDINGS.find((x) => x.id === selectedBuilding);
    el.textContent = t("selectedReady", { name: b.name[lang] });
  }

  function placeBuilding(index) {
    if (!selectedBuilding) {
      $("selectedHint").textContent = t("selectedNone");
      return;
    }
    if (state.grid[index]) {
      $("selectedHint").textContent = t("cellTaken");
      return;
    }
    const b = BUILDINGS.find((x) => x.id === selectedBuilding);
    if (!canAfford(b.cost)) {
      $("selectedHint").textContent = t("needMore");
      return;
    }
    spend(b.cost);
    state.grid[index] = b.id;
    saveState();
    updateResourcesUI();
    renderGrid("buildGridActive", true);
    renderGrid("buildGrid", false);
    renderCatalog();
    $("selectedHint").textContent = t("built", { name: b.name[lang] });
  }

  function renderWordList() {
    const list = $("wordList");
    list.innerHTML = "";
    state.vocab.forEach((w) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="ko">${escapeHtml(w.ko)}</span><span class="sep">·</span><span class="vi">${escapeHtml(w.vi)}</span>`;
      list.appendChild(li);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickWrongAnswers(correct, pool, key, count) {
    const others = pool.filter((w) => w[key] !== correct[key]);
    return shuffle(others).slice(0, count).map((w) => w[key]);
  }

  function startQuiz() {
    if (state.vocab.length < 4) {
      alert(t("needWords"));
      return;
    }
    const questions = shuffle(state.vocab).slice(0, Math.min(QUIZ_LEN, state.vocab.length));
    quiz = {
      questions,
      index: 0,
      hearts: MAX_HEARTS,
      correctCount: 0,
      finished: false,
    };
    showScreen("screen-quiz");
    renderQuestion();
  }

  function renderHearts() {
    const filled = "❤️".repeat(quiz.hearts);
    const empty = "🖤".repeat(MAX_HEARTS - quiz.hearts);
    $("hearts").textContent = filled + empty;
  }

  function renderQuestion() {
    const q = quiz.questions[quiz.index];
    const koToVi = Math.random() > 0.45;
    const prompt = koToVi ? q.ko : q.vi;
    const answer = koToVi ? q.vi : q.ko;
    const answerKey = koToVi ? "vi" : "ko";
    const wrongs = pickWrongAnswers(q, state.vocab, answerKey, 3);
    const options = shuffle([answer, ...wrongs]);

    quiz.current = { q, koToVi, answer, options };

    $("quizProgress").style.width = `${(quiz.index / quiz.questions.length) * 100}%`;
    renderHearts();
    $("promptLang").textContent = koToVi ? t("promptLangKo") : t("promptLangVi");
    $("promptWord").textContent = prompt;
    $("promptHint").textContent = koToVi ? t("promptHintKoToVi") : t("promptHintViToKo");

    const box = $("choices");
    box.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.textContent = opt;
      btn.addEventListener("click", () => answerQuestion(opt, btn));
      box.appendChild(btn);
    });
  }

  function grantMaterial() {
    const mat = MATERIALS[Math.floor(Math.random() * MATERIALS.length)];
    state.resources[mat.key] += 1;
    return mat;
  }

  function answerQuestion(choice, btn) {
    if (!quiz || quiz.finished) return;
    const { answer, q, koToVi } = quiz.current;
    const buttons = [...$("choices").querySelectorAll(".choice")];
    buttons.forEach((b) => (b.disabled = true));

    const ok = choice === answer;
    btn.classList.add(ok ? "correct" : "wrong");
    if (!ok) {
      buttons.find((b) => b.textContent === answer)?.classList.add("correct");
    }

    let reward = null;
    if (ok) {
      quiz.correctCount += 1;
      state.xp += 10;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      reward = grantMaterial();
      updateResourcesUI(reward.key);
    } else {
      quiz.hearts -= 1;
      state.streak = 0;
      renderHearts();
    }

    saveState();
    updateStatsUI();

    const detail = koToVi ? `${q.ko} = ${q.vi}` : `${q.vi} = ${q.ko}`;
    showFeedback(ok, detail, reward);
  }

  function showFeedback(ok, detail, reward) {
    const sheet = $("feedbackSheet");
    const card = $("feedbackCard");
    sheet.hidden = false;
    card.className = "feedback-card " + (ok ? "ok" : "bad");
    $("feedbackEmoji").textContent = ok ? "🎉" : "💧";
    $("feedbackTitle").textContent = ok ? t("feedbackOk") : t("feedbackBad");
    $("feedbackDetail").textContent = detail;

    const rewardEl = $("feedbackReward");
    if (ok && reward) {
      rewardEl.hidden = false;
      rewardEl.textContent = t("rewardLine", {
        emoji: reward.emoji,
        name: reward.label[lang],
      });
    } else {
      rewardEl.hidden = false;
      rewardEl.textContent = t("feedbackNoReward");
    }

    const last = quiz.index >= quiz.questions.length - 1 || quiz.hearts <= 0;
    $("btnNextText").textContent = last ? t("btnFinishText") : t("btnNextText");
  }

  function nextAfterFeedback() {
    $("feedbackSheet").hidden = true;
    if (!quiz) {
      showScreen("screen-home");
      return;
    }
    if (quiz.hearts <= 0 || quiz.index >= quiz.questions.length - 1) {
      quiz.finished = true;
      $("quizProgress").style.width = "100%";
      showScreen("screen-home");
      renderGrid("buildGrid", false);
      updateStatsUI();
      return;
    }
    quiz.index += 1;
    renderQuestion();
  }

  function hasHangul(s) {
    return /[\uAC00-\uD7A3]/.test(s);
  }

  function hasVietnamese(s) {
    return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s)
      || (/[a-zA-Z]/.test(s) && !hasHangul(s));
  }

  function parseVocabText(text) {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const pairs = [];
    const seen = new Set();

    const splitters = [" - ", " – ", " — ", " / ", " | ", " · ", "\t", ":"];

    for (const line of lines) {
      let parts = null;
      for (const sep of splitters) {
        if (line.includes(sep)) {
          const chunks = line.split(sep).map((x) => x.trim()).filter(Boolean);
          if (chunks.length >= 2) {
            parts = [chunks[0], chunks.slice(1).join(" ")];
            break;
          }
        }
      }

      if (!parts) {
        const m = line.match(/^([\uAC00-\uD7A3\s]+)\s+(.+)$/);
        if (m) parts = [m[1].trim(), m[2].trim()];
      }

      if (!parts || parts.length < 2) continue;

      let [a, b] = parts;
      a = a.replace(/^[\d.)\-]+\s*/, "").trim();
      b = b.trim();
      if (!a || !b || a.length > 40 || b.length > 60) continue;

      let ko;
      let vi;
      if (hasHangul(a) && hasVietnamese(b)) {
        ko = a;
        vi = b;
      } else if (hasHangul(b) && hasVietnamese(a)) {
        ko = b;
        vi = a;
      } else if (hasHangul(a) && /[a-zA-ZÀ-ỹ]/.test(b)) {
        ko = a;
        vi = b;
      } else {
        continue;
      }

      const key = `${ko}||${vi}`.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push({ ko, vi });
    }

    return pairs;
  }

  function fileExt(name) {
    const m = String(name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
    return m ? m[1] : "";
  }

  function detectFileKind(file) {
    const ext = fileExt(file.name);
    const type = (file.type || "").toLowerCase();
    if (ext === "pdf" || type === "application/pdf") return "pdf";
    if (
      ext === "docx" ||
      type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "docx";
    }
    if (ext === "doc" || type === "application/msword") return "doc";
    return null;
  }

  async function extractPdfText(file) {
    if (!window.pdfjsLib) throw new Error("pdf.js missing");
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      text += pageText + "\n";
    }
    return text;
  }

  async function extractDocxText(file) {
    if (!window.mammoth) throw new Error("mammoth missing");
    const buf = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buf });
    return result.value || "";
  }

  async function extractDocText(file) {
    // Old .doc is binary; try UTF-16LE / latin1 text scrape as a best effort.
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let text = "";
    try {
      text = new TextDecoder("utf-16le").decode(bytes);
    } catch {
      text = "";
    }
    if (!hasHangul(text)) {
      try {
        text = new TextDecoder("utf-8").decode(bytes);
      } catch {
        text = Array.from(bytes, (b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : " ")).join("");
      }
    }
    // Keep readable runs; drop long binary noise.
    return text
      .replace(/[^\uAC00-\uD7A3a-zA-ZÀ-ỹ0-9\s\-\/|·:.\u2013\u2014]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function extractFileText(file) {
    const kind = detectFileKind(file);
    if (kind === "pdf") return extractPdfText(file);
    if (kind === "docx") return extractDocxText(file);
    if (kind === "doc") return extractDocText(file);
    return null;
  }

  function setUploadStatus(msg, isError) {
    const el = $("uploadStatus");
    el.hidden = false;
    el.textContent = msg;
    el.classList.toggle("error", !!isError);
  }

  async function handleVocabFile(file) {
    if (!file) return;
    const kind = detectFileKind(file);
    if (!kind) {
      setUploadStatus(t("parseUnsupported"), true);
      return;
    }
    try {
      setUploadStatus(t("parseReading"), false);
      const text = await extractFileText(file);
      if (text == null) {
        setUploadStatus(t("parseUnsupported"), true);
        return;
      }
      let pairs = parseVocabText(text);
      if (!pairs.length) {
        // pdf.js / binary .doc sometimes flatten line breaks
        pairs = parseVocabText(text.replace(/\s{2,}/g, "\n"));
      }
      if (!pairs.length) {
        setUploadStatus(t("parseEmpty"), true);
        return;
      }
      mergeVocab(pairs);
    } catch (err) {
      console.error(err);
      setUploadStatus(t("parseFail"), true);
    }
  }

  function mergeVocab(pairs) {
    const existing = new Set(state.vocab.map((w) => `${w.ko}||${w.vi}`.toLowerCase()));
    let added = 0;
    pairs.forEach((p) => {
      const key = `${p.ko}||${p.vi}`.toLowerCase();
      if (!existing.has(key)) {
        state.vocab.push(p);
        existing.add(key);
        added += 1;
      }
    });
    saveState();
    updateStatsUI();
    renderWordList();
    setUploadStatus(t("parseOk", { n: added, total: state.vocab.length }), false);
  }

  function bindEvents() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        lang = btn.dataset.lang;
        saveState();
        applyI18n();
        if (quiz && !quiz.finished && $("screen-quiz").classList.contains("active")) {
          $("promptHint").textContent = quiz.current.koToVi
            ? t("promptHintKoToVi")
            : t("promptHintViToKo");
          $("promptLang").textContent = quiz.current.koToVi
            ? t("promptLangKo")
            : t("promptLangVi");
          $("quizDir").textContent = t("quizDir");
        }
      });
    });

    $("btnStartQuiz").addEventListener("click", startQuiz);
    $("btnQuitQuiz").addEventListener("click", () => {
      quiz = null;
      showScreen("screen-home");
    });
    $("btnNext").addEventListener("click", nextAfterFeedback);

    $("btnBuild").addEventListener("click", () => {
      selectedBuilding = null;
      showScreen("screen-build");
      renderCatalog();
      renderGrid("buildGridActive", true);
      updateSelectedHint();
    });

    $("btnUpload").addEventListener("click", () => {
      showScreen("screen-upload");
      renderWordList();
    });

    $("btnBackHome1").addEventListener("click", () => {
      showScreen("screen-home");
      renderGrid("buildGrid", false);
    });
    $("btnBackHome2").addEventListener("click", () => showScreen("screen-home"));

    $("btnPickFile").addEventListener("click", () => $("fileInput").click());
    $("fileInput").addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      handleVocabFile(file);
      e.target.value = "";
    });

    const zone = $("dropZone");
    ["dragenter", "dragover"].forEach((ev) => {
      zone.addEventListener(ev, (e) => {
        e.preventDefault();
        zone.classList.add("drag");
      });
    });
    ["dragleave", "drop"].forEach((ev) => {
      zone.addEventListener(ev, (e) => {
        e.preventDefault();
        zone.classList.remove("drag");
      });
    });
    zone.addEventListener("drop", (e) => {
      const file = e.dataTransfer?.files?.[0];
      if (file) handleVocabFile(file);
    });

    $("btnResetVocab").addEventListener("click", () => {
      state.vocab = [...DEFAULT_VOCAB];
      saveState();
      updateStatsUI();
      renderWordList();
      setUploadStatus(t("resetOk"), false);
    });
  }

  function init() {
    bindEvents();
    applyI18n();
    updateResourcesUI();
    updateStatsUI();
    renderGrid("buildGrid", false);
    renderWordList();
  }

  init();
})();
