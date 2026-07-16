const API_STORAGE_KEY = "weather-bloom-api-key";
const LANG_KEY = "weather-bloom-lang";
const LAST_CITY_KEY = "weather-bloom-city";

const i18n = {
  vi: {
    appTitle: "Weather Bloom",
    tagline: "Dự báo dễ thương cho ngày của bạn",
    placeholder: "Nhập tên thành phố...",
    humidity: "Độ ẩm",
    wind: "Gió",
    pressure: "Áp suất",
    visibility: "Tầm nhìn",
    forecastTitle: "Dự báo 5 ngày",
    feelsLike: (t) => `Cảm giác như ${t}°C`,
    apiHint: "Đã kết nối OpenWeatherMap",
    apiDialogTitle: "Nhập API Key",
    apiDialogDesc: "Lấy miễn phí tại openweathermap.org → My API keys",
    apiSave: "Lưu",
    apiCancel: "Hủy",
    loading: "Đang tải thời tiết...",
    locating: "Đang lấy vị trí...",
    needKey: "Vui lòng nhập API key trước nhé!",
    notFound: "Không tìm thấy thành phố này 😢",
    networkError: "Lỗi kết nối. Thử lại sau nhé!",
    locateError: "Không lấy được vị trí của bạn",
    invalidKey: "API key không hợp lệ",
    windUnit: "m/s",
    days: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    locale: "vi-VN",
    owmLang: "vi",
  },
  ko: {
    appTitle: "Weather Bloom",
    tagline: "귀여운 날씨 예보와 함께해요",
    placeholder: "도시 이름을 입력하세요...",
    humidity: "습도",
    wind: "바람",
    pressure: "기압",
    visibility: "가시거리",
    forecastTitle: "5일 예보",
    feelsLike: (t) => `체감 온도 ${t}°C`,
    apiHint: "OpenWeatherMap에 연결됨",
    apiDialogTitle: "API 키 입력",
    apiDialogDesc: "openweathermap.org → My API keys에서 무료로 발급",
    apiSave: "저장",
    apiCancel: "취소",
    loading: "날씨를 불러오는 중...",
    locating: "위치를 찾는 중...",
    needKey: "먼저 API 키를 입력해 주세요!",
    notFound: "도시를 찾을 수 없어요 😢",
    networkError: "연결 오류. 다시 시도해 주세요!",
    locateError: "위치를 가져올 수 없어요",
    invalidKey: "API 키가 올바르지 않아요",
    windUnit: "m/s",
    days: ["일", "월", "화", "수", "목", "금", "토"],
    locale: "ko-KR",
    owmLang: "kr",
  },
};

const DEFAULT_API_KEY = "ac2c26205b27b1d2a53de3669c467aa4";

let currentLang = localStorage.getItem(LANG_KEY) || "vi";
let apiKey = localStorage.getItem(API_STORAGE_KEY) || DEFAULT_API_KEY;

const els = {
  cityInput: document.getElementById("cityInput"),
  searchBtn: document.getElementById("searchBtn"),
  locateBtn: document.getElementById("locateBtn"),
  status: document.getElementById("status"),
  weatherCard: document.getElementById("weatherCard"),
  forecastSection: document.getElementById("forecastSection"),
  forecastList: document.getElementById("forecastList"),
  cityName: document.getElementById("cityName"),
  dateText: document.getElementById("dateText"),
  temp: document.getElementById("temp"),
  desc: document.getElementById("desc"),
  feels: document.getElementById("feels"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind"),
  pressure: document.getElementById("pressure"),
  visibility: document.getElementById("visibility"),
  weatherIcon: document.getElementById("weatherIcon"),
  mascot: document.getElementById("mascot"),
  brandIcon: document.getElementById("brandIcon"),
  appTitle: document.getElementById("appTitle"),
  tagline: document.getElementById("tagline"),
  forecastTitle: document.getElementById("forecastTitle"),
  labelHumidity: document.getElementById("labelHumidity"),
  labelWind: document.getElementById("labelWind"),
  labelPressure: document.getElementById("labelPressure"),
  labelVisibility: document.getElementById("labelVisibility"),
  apiHint: document.getElementById("apiHint"),
  apiKeyBtn: document.getElementById("apiKeyBtn"),
  apiDialog: document.getElementById("apiDialog"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  apiDialogTitle: document.getElementById("apiDialogTitle"),
  apiDialogDesc: document.getElementById("apiDialogDesc"),
  apiSaveBtn: document.getElementById("apiSaveBtn"),
  apiCancelBtn: document.getElementById("apiCancelBtn"),
  apiForm: document.getElementById("apiForm"),
  clouds: document.getElementById("clouds"),
  rain: document.getElementById("rain"),
  snow: document.getElementById("snow"),
};

function t() {
  return i18n[currentLang];
}

function applyLanguage() {
  const L = t();
  document.documentElement.lang = currentLang === "ko" ? "ko" : "vi";
  els.appTitle.textContent = L.appTitle;
  els.tagline.textContent = L.tagline;
  els.cityInput.placeholder = L.placeholder;
  els.labelHumidity.textContent = L.humidity;
  els.labelWind.textContent = L.wind;
  els.labelPressure.textContent = L.pressure;
  els.labelVisibility.textContent = L.visibility;
  els.forecastTitle.textContent = L.forecastTitle;
  els.apiHint.textContent = L.apiHint;
  els.apiDialogTitle.textContent = L.apiDialogTitle;
  els.apiDialogDesc.textContent = L.apiDialogDesc;
  els.apiSaveBtn.textContent = L.apiSave;
  els.apiCancelBtn.textContent = L.apiCancel;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function setStatus(message, type = "") {
  els.status.textContent = message || "";
  els.status.className = "status" + (type ? ` ${type}` : "");
}

function ensureApiKey() {
  if (apiKey) return true;
  setStatus(t().needKey, "error");
  els.apiDialog.showModal();
  return false;
}

function buildUrl(endpoint, params) {
  const url = new URL(`https://api.openweathermap.org/data/2.5/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", t().owmLang);
  return url.toString();
}

async function fetchWeather(params) {
  if (!ensureApiKey()) return;

  setStatus(t().loading, "loading");
  els.weatherCard.classList.add("hidden");
  els.forecastSection.classList.add("hidden");

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(buildUrl("weather", params)),
      fetch(buildUrl("forecast", params)),
    ]);

    if (currentRes.status === 401) {
      setStatus(t().invalidKey, "error");
      els.apiDialog.showModal();
      return;
    }
    if (currentRes.status === 404) {
      setStatus(t().notFound, "error");
      return;
    }
    if (!currentRes.ok || !forecastRes.ok) {
      setStatus(t().networkError, "error");
      return;
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    renderCurrent(current);
    renderForecast(forecast);
    applyTheme(current);
    setStatus("");
    localStorage.setItem(LAST_CITY_KEY, current.name);
  } catch {
    setStatus(t().networkError, "error");
  }
}

function searchCity() {
  const city = els.cityInput.value.trim();
  if (!city) return;
  fetchWeather({ q: city });
}

function locateMe() {
  if (!ensureApiKey()) return;
  if (!navigator.geolocation) {
    setStatus(t().locateError, "error");
    return;
  }

  setStatus(t().locating, "loading");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      fetchWeather({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    },
    () => setStatus(t().locateError, "error"),
    { timeout: 10000 }
  );
}

function mascotFor(weatherId, temp) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return temp >= 30 ? "🔥" : "☀️";
  if (weatherId > 800) return "☁️";
  return "🌤️";
}

function themeFor(weatherId, temp, isNight) {
  if (isNight && weatherId === 800) return "night";
  if (weatherId >= 200 && weatherId < 300) return "storm";
  if (weatherId >= 300 && weatherId < 600) return "rain";
  if (weatherId >= 600 && weatherId < 700) return "snow";
  if (weatherId >= 700 && weatherId < 800) return "clouds";
  if (weatherId === 800 && temp >= 28) return "hot";
  if (weatherId === 800) return "clear";
  if (weatherId > 800) return "clouds";
  return "clear";
}

function renderCurrent(data) {
  const L = t();
  const weather = data.weather[0];
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const icon = weather.icon;

  els.cityName.textContent = `${data.name}${data.sys?.country ? `, ${data.sys.country}` : ""}`;
  els.dateText.textContent = new Date().toLocaleDateString(L.locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  els.temp.textContent = `${temp}°`;
  els.desc.textContent = weather.description;
  els.feels.textContent = L.feelsLike(feels);
  els.humidity.textContent = `${data.main.humidity}%`;
  els.wind.textContent = `${data.wind.speed} ${L.windUnit}`;
  els.pressure.textContent = `${data.main.pressure} hPa`;
  els.visibility.textContent = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : "—";
  els.weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  els.weatherIcon.alt = weather.description;
  els.mascot.textContent = mascotFor(weather.id, temp);
  els.brandIcon.textContent = mascotFor(weather.id, temp);

  els.weatherCard.classList.remove("hidden");
}

function renderForecast(data) {
  const L = t();
  const byDay = new Map();

  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const key = date.toISOString().slice(0, 10);
    const hour = date.getHours();
    if (!byDay.has(key)) {
      byDay.set(key, item);
    } else {
      const existing = byDay.get(key);
      const existingHour = new Date(existing.dt * 1000).getHours();
      if (Math.abs(hour - 12) < Math.abs(existingHour - 12)) {
        byDay.set(key, item);
      }
    }
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  const days = [...byDay.entries()]
    .filter(([key]) => key !== todayKey)
    .slice(0, 5);

  els.forecastList.innerHTML = days
    .map(([key, item], i) => {
      const date = new Date(item.dt * 1000);
      const dayName = L.days[date.getDay()];
      const temp = Math.round(item.main.temp);
      const icon = item.weather[0].icon;
      const desc = item.weather[0].description;
      return `
        <div class="forecast-item" style="animation-delay: ${i * 0.08}s">
          <div class="f-day">${dayName}</div>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
          <div class="f-temp">${temp}°</div>
          <div class="f-desc">${desc}</div>
        </div>
      `;
    })
    .join("");

  els.forecastSection.classList.remove("hidden");
}

function applyTheme(data) {
  const weather = data.weather[0];
  const temp = data.main.temp;
  const isNight = weather.icon.includes("n");
  const theme = themeFor(weather.id, temp, isNight);
  document.body.dataset.theme = theme;
  spawnEffects(theme);
}

function clearEffects() {
  els.clouds.innerHTML = "";
  els.rain.innerHTML = "";
  els.snow.innerHTML = "";
}

function spawnEffects(theme) {
  clearEffects();

  const cloudCount =
    theme === "clouds" || theme === "rain" || theme === "storm"
      ? 6
      : theme === "clear" || theme === "hot"
        ? 2
        : 3;

  for (let i = 0; i < cloudCount; i++) {
    const cloud = document.createElement("div");
    cloud.className = "cloud";
    const w = 80 + Math.random() * 120;
    cloud.style.width = `${w}px`;
    cloud.style.height = `${w * 0.35}px`;
    cloud.style.top = `${8 + Math.random() * 45}%`;
    cloud.style.left = `${-20 + Math.random() * 40}%`;
    cloud.style.animationDuration = `${28 + Math.random() * 40}s`;
    cloud.style.animationDelay = `${-Math.random() * 30}s`;
    cloud.style.opacity = theme === "storm" ? "0.55" : "";
    els.clouds.appendChild(cloud);
  }

  if (theme === "rain" || theme === "storm") {
    const count = theme === "storm" ? 70 : 45;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement("div");
      drop.className = "drop";
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.top = `${-10 - Math.random() * 20}%`;
      drop.style.animationDuration = `${0.55 + Math.random() * 0.7}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      els.rain.appendChild(drop);
    }
  }

  if (theme === "snow") {
    for (let i = 0; i < 40; i++) {
      const flake = document.createElement("div");
      flake.className = "flake";
      const size = 4 + Math.random() * 8;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.top = `${-10 - Math.random() * 20}%`;
      flake.style.animationDuration = `${4 + Math.random() * 6}s`;
      flake.style.animationDelay = `${Math.random() * 5}s`;
      els.snow.appendChild(flake);
    }
  }
}

/* —— Events —— */
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem(LANG_KEY, currentLang);
    applyLanguage();
    const city = els.cityInput.value.trim() || localStorage.getItem(LAST_CITY_KEY);
    if (city && apiKey) {
      els.cityInput.value = city;
      fetchWeather({ q: city });
    }
  });
});

els.searchBtn.addEventListener("click", searchCity);
els.cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchCity();
});
els.locateBtn.addEventListener("click", locateMe);

els.apiKeyBtn.addEventListener("click", () => {
  els.apiKeyInput.value = apiKey;
  els.apiDialog.showModal();
});

els.apiForm.addEventListener("submit", (e) => {
  const submitter = e.submitter;
  if (submitter && submitter.value === "save") {
    const key = els.apiKeyInput.value.trim() || DEFAULT_API_KEY;
    apiKey = key;
    localStorage.setItem(API_STORAGE_KEY, apiKey);
    setStatus("");
    const city = els.cityInput.value.trim() || localStorage.getItem(LAST_CITY_KEY) || "Hanoi";
    els.cityInput.value = city;
    fetchWeather({ q: city });
  }
});

/* —— Init —— */
applyLanguage();
spawnEffects("clear");
localStorage.setItem(API_STORAGE_KEY, apiKey);

const savedCity = localStorage.getItem(LAST_CITY_KEY) || "Hanoi";
els.cityInput.value = savedCity;
fetchWeather({ q: savedCity });
