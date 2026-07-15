const PERIODS = ["morning", "noon", "afternoon"];
const STORAGE_KEY = "todo-tasks-shared-v1";

const i18n = {
  vi: {
    title: "Danh sách việc cần làm",
    subtitle: "Hôm nay bạn muốn làm gì nào?",
    placeholder: "Nhập công việc mới...",
    addBtn: "＋ Thêm",
    progress: (done, total) => `${done} / ${total} hoàn thành`,
    empty: "Chưa có việc nào trong khung này",
    periods: {
      morning: { label: "Sáng", icon: "🌅", hint: "Buổi sáng" },
      noon: { label: "Trưa", icon: "☀️", hint: "Buổi trưa" },
      afternoon: { label: "Chiều", icon: "🌤️", hint: "Buổi chiều" },
    },
  },
  ko: {
    title: "할 일 목록",
    subtitle: "오늘 뭐 할 거예요?",
    placeholder: "새 할 일 입력...",
    addBtn: "＋ 추가",
    progress: (done, total) => `${done} / ${total} 완료`,
    empty: "이 시간대에 할 일이 없어요",
    periods: {
      morning: { label: "아침", icon: "🌅", hint: "오전" },
      noon: { label: "점심", icon: "☀️", hint: "낮" },
      afternoon: { label: "오후", icon: "🌤️", hint: "오후" },
    },
  },
};

const DEFAULT_TASKS = [
  { textVi: "Tập thể dục", textKo: "운동하기", time: "morning" },
  { textVi: "Ăn uống", textKo: "식사하기", time: "morning" },
  { textVi: "Nấu ăn", textKo: "요리하기", time: "noon" },
  { textVi: "Học tiếng Hàn", textKo: "한국어 공부하기", time: "afternoon" },
];

let currentLang = localStorage.getItem("todo-lang") || "vi";
let tasks = loadTasks();

const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const taskInput = document.getElementById("taskInput");
const timeSelect = document.getElementById("timeSelect");
const addBtn = document.getElementById("addBtn");
const timeSections = document.getElementById("timeSections");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const langBtns = document.querySelectorAll(".lang-btn");

function createDefaults() {
  return DEFAULT_TASKS.map((item, i) => ({
    id: String(i + 1),
    textVi: item.textVi,
    textKo: item.textKo,
    time: item.time,
    done: false,
  }));
}

function getTaskText(task) {
  if (currentLang === "ko") {
    return task.textKo || task.textVi || task.text || "";
  }
  return task.textVi || task.textKo || task.text || "";
}

function normalizeTasks(list) {
  return list.map((task, i) => {
    const textVi = task.textVi || task.text || "";
    const textKo = task.textKo || task.text || textVi;
    return {
      id: task.id || String(i + 1),
      textVi,
      textKo,
      time: PERIODS.includes(task.time) ? task.time : "morning",
      done: Boolean(task.done),
    };
  });
}

function loadTasks() {
  const shared = localStorage.getItem(STORAGE_KEY);
  if (shared) {
    try {
      return normalizeTasks(JSON.parse(shared));
    } catch {
      return createDefaults();
    }
  }

  // Gộp dữ liệu cũ (nếu có) rồi chuyển sang lưu chung
  const oldVi = localStorage.getItem("todo-tasks-v2-vi") || localStorage.getItem("todo-tasks-vi");
  const oldKo = localStorage.getItem("todo-tasks-v2-ko") || localStorage.getItem("todo-tasks-ko");

  if (oldVi || oldKo) {
    try {
      const viList = oldVi ? JSON.parse(oldVi) : [];
      const koList = oldKo ? JSON.parse(oldKo) : [];
      const merged = mergeOldLists(viList, koList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch {
      return createDefaults();
    }
  }

  return createDefaults();
}

function mergeOldLists(viList, koList) {
  const maxLen = Math.max(viList.length, koList.length);
  if (maxLen === 0) return createDefaults();

  const result = [];
  for (let i = 0; i < maxLen; i++) {
    const vi = viList[i];
    const ko = koList[i];
    const textVi = (vi && (vi.textVi || vi.text)) || (ko && (ko.textVi || ko.text)) || "";
    const textKo = (ko && (ko.textKo || ko.text)) || (vi && (vi.textKo || vi.text)) || textVi;
    result.push({
      id: (vi && vi.id) || (ko && ko.id) || String(i + 1),
      textVi,
      textKo,
      time: PERIODS.includes((vi && vi.time) || (ko && ko.time))
        ? (vi && vi.time) || (ko && ko.time)
        : "morning",
      done: Boolean((vi && vi.done) || (ko && ko.done)),
    });
  }
  return result;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function applyLanguage() {
  const t = i18n[currentLang];
  titleEl.textContent = t.title;
  subtitleEl.textContent = t.subtitle;
  taskInput.placeholder = t.placeholder;
  addBtn.textContent = t.addBtn;
  document.documentElement.lang = currentLang === "ko" ? "ko" : "vi";

  PERIODS.forEach((period) => {
    const option = timeSelect.querySelector(`option[value="${period}"]`);
    if (option) {
      option.textContent = `${t.periods[period].icon} ${t.periods[period].label}`;
    }
  });
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-item" + (task.done ? " done" : "");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.done;
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = getTaskText(task);

  const del = document.createElement("button");
  del.type = "button";
  del.className = "delete-btn";
  del.textContent = "×";
  del.setAttribute("aria-label", "Delete");
  del.addEventListener("click", () => deleteTask(task.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(del);
  return li;
}

function render() {
  const t = i18n[currentLang];
  timeSections.innerHTML = "";

  PERIODS.forEach((period) => {
    const sectionTasks = tasks.filter((task) => task.time === period);
    const doneCount = sectionTasks.filter((task) => task.done).length;

    const section = document.createElement("section");
    section.className = `time-section time-${period}`;

    const header = document.createElement("div");
    header.className = "time-header";
    header.innerHTML = `
      <div class="time-title">
        <span class="time-icon">${t.periods[period].icon}</span>
        <div>
          <h2>${t.periods[period].label}</h2>
          <p>${t.periods[period].hint}</p>
        </div>
      </div>
      <span class="time-count">${doneCount}/${sectionTasks.length}</span>
    `;

    const list = document.createElement("ul");
    list.className = "task-list";

    if (sectionTasks.length === 0) {
      const empty = document.createElement("li");
      empty.className = "empty-msg small";
      empty.textContent = t.empty;
      list.appendChild(empty);
    } else {
      sectionTasks.forEach((task) => {
        list.appendChild(createTaskElement(task));
      });
    }

    section.appendChild(header);
    section.appendChild(list);
    timeSections.appendChild(section);
  });

  const done = tasks.filter((x) => x.done).length;
  const total = tasks.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  progressFill.style.width = pct + "%";
  progressText.textContent = t.progress(done, total);
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }

  // Thêm vào cả 2 bản: cùng nội dung cho Việt và Hàn
  tasks.unshift({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    textVi: text,
    textKo: text,
    time: timeSelect.value,
    done: false,
  });

  saveTasks();
  render();
  taskInput.value = "";
  taskInput.focus();
}

function toggleTask(id) {
  const task = tasks.find((x) => x.id === id);
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((x) => x.id !== id);
  saveTasks();
  render();
}

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem("todo-lang", lang);
  // Không load lại danh sách riêng — dùng chung 1 list
  langBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  applyLanguage();
  render();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

langBtns.forEach((btn) => {
  btn.classList.toggle("active", btn.dataset.lang === currentLang);
  btn.addEventListener("click", () => switchLang(btn.dataset.lang));
});

applyLanguage();
render();
