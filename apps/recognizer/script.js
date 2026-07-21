const MODEL_URL = "https://teachablemachine.withgoogle.com/models/VLpAcbNB8/";
const DEFAULT_LABELS = ["dog", "cat", "snake", "rabbit", "elephant"];

const CLASS_META = {
  dog: { emoji: "🐶", vi: "Chó", ko: "강아지" },
  cat: { emoji: "🐱", vi: "Mèo", ko: "고양이" },
  snake: { emoji: "🐍", vi: "Rắn", ko: "뱀" },
  rabbit: { emoji: "🐰", vi: "Thỏ", ko: "토끼" },
  elephant: { emoji: "🐘", vi: "Voi", ko: "코끼리" },
};

const i18n = {
  vi: {
    brandName: "Lens Buddy",
    appTitle: "Nhận diện bằng camera / ảnh",
    tagline: "Mở camera hoặc tải ảnh — AI đoán dog / cat / snake / rabbit / elephant",
    placeholder: "Bấm “Camera” hoặc “Tải ảnh”",
    resultLabel: "Kết quả",
    start: "▶ Camera",
    upload: "🖼 Tải ảnh",
    stop: "■ Dừng",
    loading: "Đang tải model…",
    ready: "Model sẵn sàng — đang nhận diện",
    stopped: "Đã dừng",
    askingCam: "Đang xin quyền camera…",
    camDenied: "Không mở được camera. Hãy cho phép quyền truy cập.",
    loadFail: "Không tải được model. Kiểm tra mạng rồi thử lại.",
    predicting: "Đang nhận diện ảnh…",
    imageReady: "Đã nhận diện ảnh",
    badImage: "Không đọc được ảnh. Hãy chọn file khác.",
    confidence: (n) => `Độ tin cậy ${n}%`,
    waiting: "—",
    modelNote: "Model: Teachable Machine · VLpAcbNB8",
  },
  ko: {
    brandName: "Lens Buddy",
    appTitle: "카메라 / 사진으로 인식",
    tagline: "카메라 또는 사진 업로드 — AI가 dog / cat / snake / rabbit / elephant를 맞혀요",
    placeholder: "“카메라” 또는 “사진 업로드”를 누르세요",
    resultLabel: "결과",
    start: "▶ 카메라",
    upload: "🖼 사진 업로드",
    stop: "■ 중지",
    loading: "모델을 불러오는 중…",
    ready: "모델 준비됨 — 인식 중",
    stopped: "중지했어요",
    askingCam: "카메라 권한을 요청하는 중…",
    camDenied: "카메라를 열 수 없어요. 권한을 허용해 주세요.",
    loadFail: "모델을 불러오지 못했어요. 네트워크를 확인하세요.",
    predicting: "사진을 인식하는 중…",
    imageReady: "사진 인식 완료",
    badImage: "사진을 읽을 수 없어요. 다른 파일을 골라 주세요.",
    confidence: (n) => `신뢰도 ${n}%`,
    waiting: "—",
    modelNote: "모델: Teachable Machine · VLpAcbNB8",
  },
};

let lang = localStorage.getItem("jihye-hub-lang") || "vi";
let model = null;
let webcam = null;
let maxPredictions = 0;
let running = false;
let lastTop = "";
let mode = "idle"; // idle | camera | image

const els = {
  brandName: document.getElementById("brandName"),
  appTitle: document.getElementById("appTitle"),
  tagline: document.getElementById("tagline"),
  placeholderText: document.getElementById("placeholderText"),
  placeholder: document.getElementById("placeholder"),
  resultLabel: document.getElementById("resultLabel"),
  resultName: document.getElementById("resultName"),
  resultConfidence: document.getElementById("resultConfidence"),
  labelContainer: document.getElementById("label-container"),
  startBtn: document.getElementById("startBtn"),
  uploadBtn: document.getElementById("uploadBtn"),
  fileInput: document.getElementById("fileInput"),
  stopBtn: document.getElementById("stopBtn"),
  status: document.getElementById("status"),
  modelNote: document.getElementById("modelNote"),
  webcamContainer: document.getElementById("webcam-container"),
  webcamShell: document.querySelector(".webcam-shell"),
  scanLine: document.getElementById("scanLine"),
  uploadPreview: document.getElementById("uploadPreview"),
};

function t() {
  return i18n[lang];
}

function displayName(className) {
  const meta = CLASS_META[className];
  if (!meta) return className;
  return `${meta.emoji} ${meta[lang] || className}`;
}

function applyI18n() {
  const L = t();
  document.documentElement.lang = lang;
  els.brandName.textContent = L.brandName;
  els.appTitle.textContent = L.appTitle;
  els.tagline.textContent = L.tagline;
  els.placeholderText.textContent = L.placeholder;
  els.resultLabel.textContent = L.resultLabel;
  els.startBtn.textContent = L.start;
  els.uploadBtn.textContent = L.upload;
  els.stopBtn.textContent = L.stop;
  els.modelNote.textContent = L.modelNote;

  if (mode === "idle") {
    els.resultName.textContent = L.waiting;
    els.resultConfidence.textContent = "";
  } else if (lastTop) {
    els.resultName.textContent = displayName(lastTop);
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  els.labelContainer.querySelectorAll(".bar-row").forEach((row) => {
    const key = row.dataset.class;
    const emoji = row.querySelector(".bar-emoji");
    if (emoji && CLASS_META[key]) emoji.textContent = CLASS_META[key].emoji;
  });
}

function setStatus(message, type = "") {
  els.status.textContent = message;
  els.status.className = "status" + (type ? ` ${type}` : "");
}

function buildBars(classNames) {
  els.labelContainer.innerHTML = "";
  classNames.forEach((name) => {
    const meta = CLASS_META[name] || { emoji: "✨" };
    const row = document.createElement("div");
    row.className = "bar-row";
    row.dataset.class = name;
    row.innerHTML = `
      <span class="bar-emoji" title="${name}">${meta.emoji}</span>
      <div class="bar-track"><div class="bar-fill"></div></div>
      <span class="bar-pct">0%</span>
    `;
    els.labelContainer.appendChild(row);
  });
}

function resetBars() {
  els.labelContainer.querySelectorAll(".bar-row").forEach((row) => {
    row.querySelector(".bar-fill").style.width = "0%";
    row.querySelector(".bar-pct").textContent = "0%";
  });
}

function clearPreview() {
  if (els.uploadPreview.src) {
    URL.revokeObjectURL(els.uploadPreview.src);
  }
  els.uploadPreview.removeAttribute("src");
  els.uploadPreview.hidden = true;
}

function stopWebcamOnly() {
  running = false;
  els.scanLine.hidden = true;
  if (webcam) {
    webcam.stop();
    if (webcam.canvas?.parentNode) {
      webcam.canvas.parentNode.removeChild(webcam.canvas);
    }
    webcam = null;
  }
}

async function ensureModel() {
  if (model) return model;
  setStatus(t().loading, "loading");
  const modelURL = MODEL_URL + "model.json";
  const metadataURL = MODEL_URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const labels =
    model.getMetadata?.()?.labels ||
    model._metadata?.labels ||
    DEFAULT_LABELS;

  buildBars(labels.slice(0, maxPredictions));
  return model;
}

async function start() {
  els.startBtn.disabled = true;
  els.uploadBtn.disabled = true;
  try {
    clearPreview();
    await ensureModel();
    setStatus(t().askingCam, "loading");

    const flip = true;
    webcam = new tmImage.Webcam(320, 320, flip);
    await webcam.setup();
    await webcam.play();

    els.placeholder.hidden = true;
    els.webcamContainer.appendChild(webcam.canvas);
    els.scanLine.hidden = false;

    running = true;
    mode = "camera";
    els.stopBtn.disabled = false;
    els.uploadBtn.disabled = false;
    setStatus(t().ready);
    window.requestAnimationFrame(loop);
  } catch (err) {
    console.error(err);
    els.startBtn.disabled = false;
    els.uploadBtn.disabled = false;
    els.stopBtn.disabled = true;
    running = false;
    mode = "idle";
    const msg = String(err?.message || err).toLowerCase();
    if (msg.includes("permission") || msg.includes("notallowed") || msg.includes("denied")) {
      setStatus(t().camDenied, "error");
    } else if (!model) {
      setStatus(t().loadFail, "error");
    } else {
      setStatus(t().camDenied, "error");
    }
  }
}

function stop() {
  stopWebcamOnly();
  clearPreview();
  mode = "idle";
  els.placeholder.hidden = false;
  els.stopBtn.disabled = true;
  els.startBtn.disabled = false;
  els.uploadBtn.disabled = false;
  els.fileInput.value = "";
  els.resultName.textContent = t().waiting;
  els.resultConfidence.textContent = "";
  lastTop = "";
  resetBars();
  setStatus(t().stopped);
}

async function loop() {
  if (!running || !webcam) return;
  webcam.update();
  await predictFrom(webcam.canvas);
  window.requestAnimationFrame(loop);
}

async function predictFrom(source) {
  if (!model || !source) return;
  const prediction = await model.predict(source);

  let top = prediction[0];
  prediction.forEach((p) => {
    if (p.probability > top.probability) top = p;
  });

  prediction.forEach((p) => {
    const row = els.labelContainer.querySelector(`.bar-row[data-class="${p.className}"]`);
    if (!row) return;
    const pct = Math.round(p.probability * 100);
    row.querySelector(".bar-fill").style.width = `${pct}%`;
    row.querySelector(".bar-pct").textContent = `${pct}%`;
  });

  const topPct = Math.round(top.probability * 100);
  const name = displayName(top.className);
  if (top.className !== lastTop) {
    els.resultName.textContent = name;
    els.resultName.classList.remove("pop");
    void els.resultName.offsetWidth;
    els.resultName.classList.add("pop");
    lastTop = top.className;
  } else {
    els.resultName.textContent = name;
  }
  els.resultConfidence.textContent = t().confidence(topPct);
}

async function classifyFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    setStatus(t().badImage, "error");
    return;
  }

  els.uploadBtn.disabled = true;
  els.startBtn.disabled = true;

  try {
    stopWebcamOnly();
    clearPreview();
    await ensureModel();
    setStatus(t().predicting, "loading");

    const url = URL.createObjectURL(file);
    els.uploadPreview.src = url;
    els.uploadPreview.hidden = false;
    els.placeholder.hidden = true;
    els.scanLine.hidden = true;

    await new Promise((resolve, reject) => {
      els.uploadPreview.onload = () => resolve();
      els.uploadPreview.onerror = () => reject(new Error("bad image"));
    });

    mode = "image";
    els.stopBtn.disabled = false;
    await predictFrom(els.uploadPreview);
    setStatus(t().imageReady);
  } catch (err) {
    console.error(err);
    clearPreview();
    els.placeholder.hidden = false;
    mode = "idle";
    els.stopBtn.disabled = true;
    if (!model) setStatus(t().loadFail, "error");
    else setStatus(t().badImage, "error");
  } finally {
    els.uploadBtn.disabled = false;
    els.startBtn.disabled = false;
    els.fileInput.value = "";
  }
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    lang = btn.dataset.lang;
    localStorage.setItem("jihye-hub-lang", lang);
    applyI18n();
  });
});

els.startBtn.addEventListener("click", start);
els.stopBtn.addEventListener("click", stop);

els.uploadBtn.addEventListener("click", () => els.fileInput.click());
els.fileInput.addEventListener("change", () => {
  const file = els.fileInput.files?.[0];
  if (file) classifyFile(file);
});

["dragenter", "dragover"].forEach((evt) => {
  els.webcamShell.addEventListener(evt, (e) => {
    e.preventDefault();
    els.webcamShell.classList.add("is-drop");
  });
});

["dragleave", "drop"].forEach((evt) => {
  els.webcamShell.addEventListener(evt, (e) => {
    e.preventDefault();
    els.webcamShell.classList.remove("is-drop");
  });
});

els.webcamShell.addEventListener("drop", (e) => {
  const file = e.dataTransfer?.files?.[0];
  if (file) classifyFile(file);
});

applyI18n();
buildBars(DEFAULT_LABELS);
