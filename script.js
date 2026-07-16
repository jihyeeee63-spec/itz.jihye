const STORAGE_KEY = "jihye-ledger-v1";
const LANG_KEY = "jihye-ledger-lang";

const CATEGORIES = {
  food: { icon: "🍱", color: "#ff8fab", key: "food" },
  transport: { icon: "🚌", color: "#5dade2", key: "transport" },
  shopping: { icon: "🛍️", color: "#f4a261", key: "shopping" },
  other: { icon: "✨", color: "#a78bfa", key: "other" },
};

/** Recommended max % of daily income per category */
const BUDGET_RATIO = {
  food: 0.35,
  transport: 0.15,
  shopping: 0.2,
  other: 0.15,
};

const i18n = {
  vi: {
    brand: "Jihye Ledger",
    appTitle: "Sổ chi tiêu của Jihye",
    tagline: "Theo dõi thu nhập mỗi ngày, chi tiêu khôn ngoan hơn",
    labelDailyIncome: "Thu nhập ngày",
    labelDailyExpense: "Chi tiêu ngày",
    labelRemain: "Còn lại hôm nay",
    incomePanelTitle: "Thu nhập",
    expensePanelTitle: "Thêm chi tiêu",
    labelSalary: "Lương / thu nhập ngày",
    labelOtherIncome: "Thu nhập khác",
    saveIncomeBtn: "💾 Lưu thu nhập",
    incomeHint: "Thu nhập ngày = lương ngày + thu nhập khác. Còn lại = thu nhập − chi tiêu.",
    labelCategory: "Loại chi tiêu",
    labelAmount: "Số tiền",
    labelNote: "Ghi chú",
    notePlaceholder: "VD: cơm trưa, vé xe buýt...",
    addExpenseBtn: "➕ Thêm chi tiêu",
    chartTitle: "Biểu đồ chi tiêu hôm nay",
    chartEmptyText: "Chưa có chi tiêu nào hôm nay",
    listTitle: "Danh sách đã thanh toán",
    emptyList: "Hãy thêm khoản chi đầu tiên nhé 🌷",
    tipsTitle: "Gợi ý chi tiêu hợp lý",
    footerText: "Làm với ♥ dành cho Jihye",
    locale: "vi-VN",
    currency: "VND",
    currencySymbol: "₫",
    cats: {
      food: "Thực phẩm",
      transport: "Phí di chuyển",
      shopping: "Mua sắm",
      other: "Khác",
    },
    alertOverspend: "Ôi không! Jihye đã tiêu quá thu nhập hôm nay 😱",
    alertNear: "Cẩn thận — gần hết ngân sách ngày rồi!",
    alertCategory: (name) => `Loại「${name}」đang tiêu hơi nhiều so với mức hợp lý.`,
    tipOverspend:
      "Hôm nay nên dừng mua sắm không cần thiết, ưu tiên ăn uống tiết kiệm và đi lại bằng phương tiện công cộng.",
    tipNear:
      "Còn ít tiền — hãy kiểm tra lại các khoản mua sắm và chỉ giữ chi tiêu thiết yếu.",
    tipCategory: (name) =>
      `Hãy giảm chi cho「${name}」: lập danh sách trước khi mua, so sánh giá, và tránh mua impulse.`,
    tipHealthy: "Tuyệt! Jihye đang giữ ngân sách tốt. Tiếp tục ghi chép mỗi khoản nhé 💖",
    tips: [
      "🍱 Thực phẩm ~35% thu nhập ngày — nấu ăn tại nhà giúp tiết kiệm rõ rệt.",
      "🚌 Di chuyển ~15% — ưu tiên đi bộ / xe buýt / tàu thay vì gọi xe thường xuyên.",
      "🛍️ Mua sắm ~20% — chờ 24 giờ trước khi mua đồ không cần thiết.",
      "✨ Khác ~15% — để dành một phần cho quỹ dự phòng nhỏ mỗi ngày.",
      "💰 Quy tắc vàng: còn lại ≥ 15% thu nhập ngày trước khi ngủ.",
    ],
    confirmClear: "Xóa toàn bộ chi tiêu ngày này?",
    ofIncome: "của thu nhập",
    used: "đã dùng",
  },
  ko: {
    brand: "Jihye Ledger",
    appTitle: "지혜의 가계부",
    tagline: "하루 수입을 기록하고, 더 현명하게 써요",
    labelDailyIncome: "오늘의 수입",
    labelDailyExpense: "오늘의 지출",
    labelRemain: "오늘 남은 금액",
    incomePanelTitle: "수입",
    expensePanelTitle: "지출 추가",
    labelSalary: "급여 / 하루 수입",
    labelOtherIncome: "기타 수입",
    saveIncomeBtn: "💾 수입 저장",
    incomeHint: "하루 수입 = 급여 + 기타 수입. 남은 금액 = 수입 − 지출.",
    labelCategory: "지출 카테고리",
    labelAmount: "금액",
    labelNote: "메모",
    notePlaceholder: "예: 점심, 버스비...",
    addExpenseBtn: "➕ 지출 추가",
    chartTitle: "오늘 지출 차트",
    chartEmptyText: "아직 오늘 지출이 없어요",
    listTitle: "결제된 내역",
    emptyList: "첫 지출을 추가해 보세요 🌷",
    tipsTitle: "현명한 소비 팁",
    footerText: "지혜를 위해 ♥ 로 만들었어요",
    locale: "ko-KR",
    currency: "KRW",
    currencySymbol: "₩",
    cats: {
      food: "식비",
      transport: "교통비",
      shopping: "쇼핑",
      other: "기타",
    },
    alertOverspend: "앗! 오늘 수입보다 더 많이 썼어요 😱",
    alertNear: "조심해요 — 하루 예산이 거의 다 찼어요!",
    alertCategory: (name) => `「${name}」항목이 권장 비율보다 많아요.`,
    tipOverspend:
      "오늘은 불필요한 쇼핑을 멈추고, 식비는 절약하고 대중교통을 이용해 보세요.",
    tipNear: "남은 금액이 적어요 — 쇼핑을 다시 확인하고 꼭 필요한 지출만 남겨요.",
    tipCategory: (name) =>
      `「${name}」지출을 줄여보세요: 장보기 전 목록 작성, 가격 비교, 충동구매 피하기.`,
    tipHealthy: "좋아요! 예산을 잘 지키고 있어요. 계속 기록해 주세요 💖",
    tips: [
      "🍱 식비는 하루 수입의 약 35% — 집밥이 큰 절약이 돼요.",
      "🚌 교통비는 약 15% — 걸어서 / 버스 / 지하철을 자주 타 보세요.",
      "🛍️ 쇼핑은 약 20% — 불필요한 물건은 24시간 기다려 보세요.",
      "✨ 기타는 약 15% — 작은 비상금도 매일 조금씩 남겨 두세요.",
      "💰 황금 규칙: 잠들기 전 하루 수입의 15% 이상 남겨 두기.",
    ],
    confirmClear: "오늘 지출을 모두 삭제할까요?",
    ofIncome: "수입 대비",
    used: "사용",
  },
};

let currentLang = localStorage.getItem(LANG_KEY) || "vi";
let store = loadStore();

const els = {
  brand: document.getElementById("brand"),
  appTitle: document.getElementById("appTitle"),
  tagline: document.getElementById("tagline"),
  labelDailyIncome: document.getElementById("labelDailyIncome"),
  labelDailyExpense: document.getElementById("labelDailyExpense"),
  labelRemain: document.getElementById("labelRemain"),
  dailyIncomeValue: document.getElementById("dailyIncomeValue"),
  dailyExpenseValue: document.getElementById("dailyExpenseValue"),
  remainValue: document.getElementById("remainValue"),
  remainCard: document.getElementById("remainCard"),
  remainIcon: document.getElementById("remainIcon"),
  alertBanner: document.getElementById("alertBanner"),
  alertTitle: document.getElementById("alertTitle"),
  alertTips: document.getElementById("alertTips"),
  incomePanelTitle: document.getElementById("incomePanelTitle"),
  expensePanelTitle: document.getElementById("expensePanelTitle"),
  labelSalary: document.getElementById("labelSalary"),
  labelOtherIncome: document.getElementById("labelOtherIncome"),
  saveIncomeBtn: document.getElementById("saveIncomeBtn"),
  incomeHint: document.getElementById("incomeHint"),
  labelCategory: document.getElementById("labelCategory"),
  labelAmount: document.getElementById("labelAmount"),
  labelNote: document.getElementById("labelNote"),
  noteInput: document.getElementById("noteInput"),
  addExpenseBtn: document.getElementById("addExpenseBtn"),
  chartTitle: document.getElementById("chartTitle"),
  chartEmptyText: document.getElementById("chartEmptyText"),
  chartEmpty: document.getElementById("chartEmpty"),
  listTitle: document.getElementById("listTitle"),
  emptyList: document.getElementById("emptyList"),
  tipsTitle: document.getElementById("tipsTitle"),
  tipsList: document.getElementById("tipsList"),
  budgetBars: document.getElementById("budgetBars"),
  footerText: document.getElementById("footerText"),
  datePicker: document.getElementById("datePicker"),
  dateLabel: document.getElementById("dateLabel"),
  salaryInput: document.getElementById("salaryInput"),
  otherIncomeInput: document.getElementById("otherIncomeInput"),
  categorySelect: document.getElementById("categorySelect"),
  amountInput: document.getElementById("amountInput"),
  expenseList: document.getElementById("expenseList"),
  chartLegend: document.getElementById("chartLegend"),
  expenseChart: document.getElementById("expenseChart"),
  incomeForm: document.getElementById("incomeForm"),
  expenseForm: document.getElementById("expenseForm"),
  prevDay: document.getElementById("prevDay"),
  nextDay: document.getElementById("nextDay"),
  clearDayBtn: document.getElementById("clearDayBtn"),
  sparkles: document.getElementById("sparkles"),
};

function t() {
  return i18n[currentLang];
}

function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { days: {} };
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function ensureDay(key) {
  if (!store.days[key]) {
    store.days[key] = {
      salary: 0,
      otherIncome: 0,
      expenses: [],
    };
  }
  return store.days[key];
}

function formatMoney(n) {
  const L = t();
  const value = Math.round(Number(n) || 0);
  try {
    return new Intl.NumberFormat(L.locale, {
      style: "currency",
      currency: L.currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString(L.locale)} ${L.currencySymbol}`;
  }
}

function getSelectedDate() {
  return els.datePicker.value || todayKey();
}

function dayTotals(day) {
  const income = (Number(day.salary) || 0) + (Number(day.otherIncome) || 0);
  const expense = day.expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const byCat = { food: 0, transport: 0, shopping: 0, other: 0 };
  for (const e of day.expenses) {
    if (byCat[e.category] != null) byCat[e.category] += Number(e.amount) || 0;
  }
  return { income, expense, remain: income - expense, byCat };
}

function applyLanguage() {
  const L = t();
  document.documentElement.lang = currentLang;

  const map = [
    ["brand", L.brand],
    ["appTitle", L.appTitle],
    ["tagline", L.tagline],
    ["labelDailyIncome", L.labelDailyIncome],
    ["labelDailyExpense", L.labelDailyExpense],
    ["labelRemain", L.labelRemain],
    ["incomePanelTitle", L.incomePanelTitle],
    ["expensePanelTitle", L.expensePanelTitle],
    ["labelSalary", L.labelSalary],
    ["labelOtherIncome", L.labelOtherIncome],
    ["saveIncomeBtn", L.saveIncomeBtn],
    ["incomeHint", L.incomeHint],
    ["labelCategory", L.labelCategory],
    ["labelAmount", L.labelAmount],
    ["labelNote", L.labelNote],
    ["addExpenseBtn", L.addExpenseBtn],
    ["chartTitle", L.chartTitle],
    ["chartEmptyText", L.chartEmptyText],
    ["listTitle", L.listTitle],
    ["tipsTitle", L.tipsTitle],
    ["footerText", L.footerText],
  ];

  for (const [id, text] of map) {
    if (els[id]) els[id].textContent = text;
  }

  els.noteInput.placeholder = L.notePlaceholder;
  els.emptyList.textContent = L.emptyList;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  fillCategorySelect();
  renderTips();
  render();
}

function fillCategorySelect() {
  const L = t();
  const current = els.categorySelect.value;
  els.categorySelect.innerHTML = Object.keys(CATEGORIES)
    .map((key) => {
      const c = CATEGORIES[key];
      return `<option value="${key}">${c.icon} ${L.cats[key]}</option>`;
    })
    .join("");
  if (current && CATEGORIES[current]) els.categorySelect.value = current;
}

function renderTips() {
  const L = t();
  els.tipsList.innerHTML = L.tips.map((tip) => `<li>${tip}</li>`).join("");
}

function updateDateLabel() {
  const L = t();
  const key = getSelectedDate();
  const date = new Date(key + "T12:00:00");
  els.dateLabel.textContent = date.toLocaleDateString(L.locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function render() {
  const key = getSelectedDate();
  const day = ensureDay(key);
  const { income, expense, remain, byCat } = dayTotals(day);
  const L = t();

  els.salaryInput.value = day.salary || "";
  els.otherIncomeInput.value = day.otherIncome || "";

  els.dailyIncomeValue.textContent = formatMoney(income);
  els.dailyExpenseValue.textContent = formatMoney(expense);
  els.remainValue.textContent = formatMoney(remain);

  els.remainCard.classList.remove("ok", "warn", "danger");
  if (income > 0 && remain < 0) {
    els.remainCard.classList.add("danger");
    els.remainIcon.textContent = "🚨";
  } else if (income > 0 && remain / income < 0.15) {
    els.remainCard.classList.add("warn");
    els.remainIcon.textContent = "😮";
  } else {
    els.remainCard.classList.add("ok");
    els.remainIcon.textContent = remain >= 0 ? "✨" : "😮";
  }

  renderAlert(income, expense, remain, byCat);
  renderList(day);
  renderChart(byCat, expense);
  renderBudgetBars(income, byCat);
  updateDateLabel();
}

function renderAlert(income, expense, remain, byCat) {
  const L = t();
  let title = "";
  let tip = "";
  let tone = "warn";

  const overCats = Object.keys(byCat).filter((k) => {
    if (!income) return false;
    return byCat[k] / income > BUDGET_RATIO[k] + 0.02;
  });

  if (income > 0 && remain < 0) {
    title = L.alertOverspend;
    tip = L.tipOverspend;
    tone = "danger";
  } else if (income > 0 && remain / income < 0.15 && expense > 0) {
    title = L.alertNear;
    tip = L.tipNear;
    tone = "warn";
  } else if (overCats.length) {
    const name = L.cats[overCats[0]];
    title = L.alertCategory(name);
    tip = L.tipCategory(name);
    tone = "warn";
  } else if (expense > 0 && income > 0) {
    title = L.tipHealthy;
    tip = L.tips[4];
    tone = "ok";
  }

  els.alertBanner.classList.remove("tone-ok", "tone-warn", "tone-danger");

  if (title) {
    els.alertBanner.classList.remove("hidden");
    els.alertBanner.classList.add(`tone-${tone}`);
    els.alertTitle.textContent = title;
    els.alertTips.textContent = tip;
  } else {
    els.alertBanner.classList.add("hidden");
  }
}

function renderList(day) {
  const L = t();
  const items = [...day.expenses].reverse();

  if (!items.length) {
    els.expenseList.innerHTML = "";
    els.emptyList.classList.remove("hidden");
    return;
  }

  els.emptyList.classList.add("hidden");
  els.expenseList.innerHTML = items
    .map((e) => {
      const cat = CATEGORIES[e.category] || CATEGORIES.other;
      const name = L.cats[e.category] || L.cats.other;
      return `
        <li class="expense-item" data-id="${e.id}">
          <div class="cat-icon" style="background:${cat.color}22">${cat.icon}</div>
          <div class="meta">
            <div class="name">${name}</div>
            <div class="note">${e.note ? escapeHtml(e.note) : "—"}</div>
          </div>
          <div class="amount">−${formatMoney(e.amount)}</div>
          <button type="button" class="delete-btn" data-delete="${e.id}" title="Delete">✕</button>
        </li>
      `;
    })
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderChart(byCat, total) {
  const canvas = els.expenseChart;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const entries = Object.keys(CATEGORIES)
    .map((k) => ({ key: k, value: byCat[k] || 0, ...CATEGORIES[k] }))
    .filter((e) => e.value > 0);

  const L = t();

  if (!entries.length || total <= 0) {
    els.chartEmpty.classList.remove("hidden");
    els.chartLegend.innerHTML = "";
    return;
  }

  els.chartEmpty.classList.add("hidden");

  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const inner = 62;
  let start = -Math.PI / 2;

  entries.forEach((entry, i) => {
    const slice = (entry.value / total) * Math.PI * 2;
    const end = start + slice;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = entry.color;
    ctx.globalAlpha = 0.92;
    ctx.fill();

    // soft separator
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, start, end);
    ctx.stroke();

    start = end;

    // animate feel via slight delay styling on legend only
    entry._i = i;
  });

  // donut hole
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = "#fffaf6";
  ctx.fill();

  ctx.fillStyle = "#2d2438";
  ctx.font = "800 18px Nunito, Noto Sans KR, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(formatMoney(total), cx, cy - 8);
  ctx.font = "700 12px Nunito, Noto Sans KR, sans-serif";
  ctx.fillStyle = "#7a6f86";
  ctx.fillText(L.labelDailyExpense, cx, cy + 14);

  els.chartLegend.innerHTML = entries
    .map((e) => {
      const pct = Math.round((e.value / total) * 100);
      return `
        <li>
          <span class="left">
            <span class="dot" style="background:${e.color}"></span>
            ${e.icon} ${L.cats[e.key]}
          </span>
          <span>${formatMoney(e.value)} · ${pct}%</span>
        </li>
      `;
    })
    .join("");
}

function renderBudgetBars(income, byCat) {
  const L = t();
  els.budgetBars.innerHTML = Object.keys(CATEGORIES)
    .map((key) => {
      const cat = CATEGORIES[key];
      const spent = byCat[key] || 0;
      const limit = income > 0 ? income * BUDGET_RATIO[key] : 0;
      const ratio = income > 0 ? spent / income : 0;
      const pctOfIncome = Math.min(100, Math.round(ratio * 100));
      const fillPct =
        limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : spent > 0 ? 100 : 0;
      const over = income > 0 && ratio > BUDGET_RATIO[key];

      return `
        <div class="budget-row">
          <div class="top">
            <span>${cat.icon} ${L.cats[key]} · ≤ ${Math.round(BUDGET_RATIO[key] * 100)}%</span>
            <span>${pctOfIncome}% ${L.ofIncome}${over ? " ⚠️" : ""}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill ${over ? "over" : ""}" style="width:${fillPct}%; background:${cat.color}"></div>
          </div>
        </div>
      `;
    })
    .join("");

  // trigger width animation
  requestAnimationFrame(() => {
    els.budgetBars.querySelectorAll(".bar-fill").forEach((el) => {
      const w = el.style.width;
      el.style.width = "0";
      requestAnimationFrame(() => {
        el.style.width = w;
      });
    });
  });
}

function shiftDay(delta) {
  const current = new Date(getSelectedDate() + "T12:00:00");
  current.setDate(current.getDate() + delta);
  els.datePicker.value = todayKey(current);
  render();
}

function spawnSparkles() {
  const icons = ["✦", "✧", "♡", "·"];
  els.sparkles.innerHTML = "";
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.textContent = icons[i % icons.length];
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 3}s`;
    s.style.fontSize = `${0.6 + Math.random() * 0.9}rem`;
    els.sparkles.appendChild(s);
  }
}

/* —— Events —— */
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem(LANG_KEY, currentLang);
    applyLanguage();
  });
});

els.datePicker.addEventListener("change", render);
els.prevDay.addEventListener("click", () => shiftDay(-1));
els.nextDay.addEventListener("click", () => shiftDay(1));

els.incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const day = ensureDay(getSelectedDate());
  day.salary = Math.max(0, Number(els.salaryInput.value) || 0);
  day.otherIncome = Math.max(0, Number(els.otherIncomeInput.value) || 0);
  saveStore();
  render();
});

els.expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = Number(els.amountInput.value);
  if (!Number.isFinite(amount) || amount <= 0) return;

  const day = ensureDay(getSelectedDate());
  day.expenses.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    category: els.categorySelect.value,
    amount,
    note: els.noteInput.value.trim(),
    createdAt: Date.now(),
  });
  saveStore();
  els.amountInput.value = "";
  els.noteInput.value = "";
  render();
});

els.expenseList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-delete]");
  if (!btn) return;
  const id = btn.getAttribute("data-delete");
  const day = ensureDay(getSelectedDate());
  day.expenses = day.expenses.filter((x) => x.id !== id);
  saveStore();
  render();
});

els.clearDayBtn.addEventListener("click", () => {
  if (!confirm(t().confirmClear)) return;
  const day = ensureDay(getSelectedDate());
  day.expenses = [];
  saveStore();
  render();
});

window.addEventListener("resize", () => {
  const day = ensureDay(getSelectedDate());
  const { byCat, expense } = dayTotals(day);
  renderChart(byCat, expense);
});

/* —— Init —— */
els.datePicker.value = todayKey();
spawnSparkles();
applyLanguage();
