const DB_NAME = "clip-bloom";
const DB_VERSION = 1;
const STORE = "videos";

const i18n = {
  vi: {
    appTitle: "Nền tảng video của bạn",
    tagline: "Tải lên và xem lại video ngay trên trình duyệt",
    search: "Tìm video...",
    upload: "＋ Tải lên",
    emptyUpload: "＋ Tải video đầu tiên",
    sectionTitle: "Thư viện của bạn",
    sectionSaved: "Video đã lưu",
    sectionHistory: "Lịch sử đã xem",
    filterAll: "Tất cả",
    filterSaved: "Đã lưu",
    filterHistory: "Lịch sử",
    empty: "Chưa có video nào. Hãy tải lên video đầu tiên!",
    emptySearch: "Không tìm thấy video phù hợp.",
    emptySaved: "Chưa có video nào được lưu. Bấm ★ Lưu khi xem video.",
    emptyHistory: "Chưa có lịch sử xem. Hãy mở một video để bắt đầu.",
    clearHistory: "Xóa lịch sử",
    confirmClearHistory: "Xóa toàn bộ lịch sử đã xem?",
    historyCleared: "Đã xóa lịch sử xem.",
    watchedAt: (rel) => `Xem ${rel}`,
    count: (n) => `${n} video`,
    savedBadge: "Đã lưu",
    uploadTitle: "Tải video lên",
    dropHint: "Chọn hoặc kéo thả file video vào đây",
    labelTitle: "Tiêu đề",
    labelDesc: "Mô tả",
    titlePh: "Tên video của bạn",
    descPh: "Mô tả ngắn (không bắt buộc)",
    formHint: "Video được lưu trên máy bạn (IndexedDB), không gửi lên server.",
    cancel: "Hủy",
    submit: "Đăng video",
    submitting: "Đang lưu...",
    playerHeading: "Đang phát",
    delete: "Xóa video",
    confirmDelete: "Bạn chắc chắn muốn xóa video này?",
    noFile: "Vui lòng chọn một file video.",
    tooLarge: "File quá lớn (tối đa khoảng 80MB trên hầu hết trình duyệt).",
    saveError: "Không lưu được video. Thử file nhỏ hơn hoặc trình duyệt khác.",
    views: (n) => `${formatCount(n)} lượt xem`,
    likes: (n) => `${formatCount(n)} thích`,
    qualityLabel: "Chất lượng",
    qualityBadge: (q) => (q === "auto" ? "Auto" : `${q}p`),
    speedLabel: "Tốc độ",
    subtitleLabel: "Phụ đề",
    subtitleOff: "Tắt",
    subtitleVi: "Tiếng Việt",
    subtitleEn: "English",
    subtitleKo: "한국어",
    subtitleUploadTitle: "Phụ đề (tuỳ chọn · .vtt / .srt)",
    addSubLabel: "Thêm / đổi phụ đề",
    subAdded: "Đã cập nhật phụ đề!",
    subInvalid: "File phụ đề không hợp lệ. Dùng .vtt hoặc .srt.",
    like: "Thích",
    dislike: "Không thích",
    share: "Chia sẻ",
    save: "Lưu",
    saved: "Đã lưu",
    download: "Tải xuống",
    saveAdded: "Đã lưu video vào danh sách!",
    saveRemoved: "Đã bỏ lưu video.",
    downloadDone: "Đang tải video xuống máy...",
    downloadFail: "Không tải xuống được. Thử lại sau.",
    shareCopied: "Đã sao chép thông tin video vào clipboard!",
    shareDone: "Đã mở cửa sổ chia sẻ.",
    shareFileDone: "Đã chia sẻ file video.",
    shareFail: "Không chia sẻ được. Thử lại hoặc sao chép thủ công.",
    commentsHeading: "Bình luận",
    commentCount: (n) => `${n} bình luận`,
    labelAuthor: "Tên của bạn",
    labelComment: "Nội dung",
    authorPh: "Tên hiển thị",
    commentPh: "Viết bình luận...",
    submitComment: "Gửi bình luận",
    commentEmpty: "Chưa có bình luận nào. Hãy là người đầu tiên!",
    commentRequired: "Vui lòng nhập nội dung bình luận.",
    defaultAuthor: "Bạn",
    deleteComment: "Xóa",
    confirmDeleteComment: "Xóa bình luận này?",
    authOpen: "Đăng ký",
    logout: "Thoát",
    authTitleRegister: "Đăng ký Clip Bloom",
    authTitleLogin: "Đăng nhập Clip Bloom",
    authDescRegister: "Tạo tài khoản để tham gia trang và nhận thông báo.",
    authDescLogin: "Đăng nhập để tham gia và quản lý thông báo.",
    tabRegister: "Đăng ký",
    tabLogin: "Đăng nhập",
    labelName: "Tên hiển thị",
    labelEmail: "Email",
    labelPassword: "Mật khẩu",
    namePh: "Tên của bạn",
    emailPh: "email@example.com",
    passwordPh: "Ít nhất 4 ký tự",
    authSubmitRegister: "Tạo tài khoản",
    authSubmitLogin: "Đăng nhập",
    authNeedName: "Vui lòng nhập tên hiển thị.",
    authNeedEmail: "Vui lòng nhập email hợp lệ.",
    authNeedPassword: "Mật khẩu cần ít nhất 4 ký tự.",
    authExists: "Email này đã được đăng ký. Hãy đăng nhập.",
    authInvalid: "Email hoặc mật khẩu không đúng.",
    authWelcome: "Chào mừng bạn đến Clip Bloom!",
    channelMetaGuest: "Tham gia để nhận thông báo video mới",
    channelMetaJoined: (n) => `Đã tham gia · ${n} thành viên`,
    join: "Tham gia",
    joined: "Đã tham gia",
    leave: "Rời trang",
    notifyToggle: "Nhận thông báo",
    needLoginJoin: "Hãy đăng ký / đăng nhập để tham gia trang.",
    joinSuccess: "Bạn đã tham gia Clip Bloom!",
    leaveSuccess: "Đã rời trang Clip Bloom.",
    notifyOn: "Đã bật nhận thông báo.",
    notifyOff: "Đã tắt nhận thông báo.",
    notifTitle: "Thông báo",
    notifEmpty: "Chưa có thông báo nào.",
    markAllRead: "Đọc tất cả",
    notifJoinTitle: "Tham gia thành công",
    notifJoinBody: "Bạn sẽ nhận thông báo khi có video mới.",
    notifVideoTitle: "Video mới",
    notifVideoBody: (title) => `“${title}” vừa được đăng lên Clip Bloom.`,
    notifWelcomeTitle: "Chào mừng",
    notifWelcomeBody: (name) => `Xin chào ${name}! Hãy tham gia trang để nhận thông báo.`,
    justNow: "Vừa xong",
    minutesAgo: (n) => `${n} phút trước`,
    hoursAgo: (n) => `${n} giờ trước`,
    daysAgo: (n) => `${n} ngày trước`,
  },
  ko: {
    appTitle: "나만의 영상 플랫폼",
    tagline: "브라우저에서 바로 업로드하고 재생해요",
    search: "영상 검색...",
    upload: "＋ 업로드",
    emptyUpload: "＋ 첫 영상 올리기",
    sectionTitle: "내 라이브러리",
    sectionSaved: "저장한 영상",
    sectionHistory: "시청 기록",
    filterAll: "전체",
    filterSaved: "저장됨",
    filterHistory: "기록",
    empty: "아직 영상이 없어요. 첫 영상을 올려 보세요!",
    emptySearch: "검색 결과가 없어요.",
    emptySaved: "저장한 영상이 없어요. 재생 중 ★ 저장을 눌러 보세요.",
    emptyHistory: "시청 기록이 없어요. 영상을 열어 보세요.",
    clearHistory: "기록 지우기",
    confirmClearHistory: "시청 기록을 모두 지울까요?",
    historyCleared: "시청 기록을 지웠어요.",
    watchedAt: (rel) => `${rel} 시청`,
    count: (n) => `영상 ${n}개`,
    savedBadge: "저장됨",
    uploadTitle: "영상 업로드",
    dropHint: "영상 파일을 선택하거나 여기에 끌어다 놓으세요",
    labelTitle: "제목",
    labelDesc: "설명",
    titlePh: "영상 제목",
    descPh: "짧은 설명 (선택)",
    formHint: "영상은 이 기기에만 저장됩니다 (IndexedDB). 서버로 전송되지 않아요.",
    cancel: "취소",
    submit: "게시하기",
    submitting: "저장 중...",
    playerHeading: "재생 중",
    delete: "영상 삭제",
    confirmDelete: "이 영상을 삭제할까요?",
    noFile: "영상 파일을 선택해 주세요.",
    tooLarge: "파일이 너무 커요 (대부분의 브라우저에서 약 80MB까지).",
    saveError: "저장에 실패했어요. 더 작은 파일이나 다른 브라우저를 시도해 보세요.",
    views: (n) => `조회수 ${formatCount(n)}회`,
    likes: (n) => `좋아요 ${formatCount(n)}`,
    qualityLabel: "화질",
    qualityBadge: (q) => (q === "auto" ? "Auto" : `${q}p`),
    speedLabel: "배속",
    subtitleLabel: "자막",
    subtitleOff: "끄기",
    subtitleVi: "베트남어",
    subtitleEn: "영어",
    subtitleKo: "한국어",
    subtitleUploadTitle: "자막 (선택 · .vtt / .srt)",
    addSubLabel: "자막 추가 / 변경",
    subAdded: "자막을 업데이트했어요!",
    subInvalid: "자막 파일이 올바르지 않아요. .vtt 또는 .srt를 사용해 주세요.",
    like: "좋아요",
    dislike: "싫어요",
    share: "공유",
    save: "저장",
    saved: "저장됨",
    download: "다운로드",
    saveAdded: "영상을 저장 목록에 넣었어요!",
    saveRemoved: "저장을 취소했어요.",
    downloadDone: "영상을 기기로 내려받는 중...",
    downloadFail: "다운로드에 실패했어요. 다시 시도해 주세요.",
    shareCopied: "영상 정보를 클립보드에 복사했어요!",
    shareDone: "공유 창을 열었어요.",
    shareFileDone: "영상 파일을 공유했어요.",
    shareFail: "공유에 실패했어요. 다시 시도하거나 직접 복사해 주세요.",
    commentsHeading: "댓글",
    commentCount: (n) => `댓글 ${n}개`,
    labelAuthor: "이름",
    labelComment: "내용",
    authorPh: "표시 이름",
    commentPh: "댓글을 남겨 보세요...",
    submitComment: "댓글 달기",
    commentEmpty: "아직 댓글이 없어요. 첫 댓글을 남겨 보세요!",
    commentRequired: "댓글 내용을 입력해 주세요.",
    defaultAuthor: "나",
    deleteComment: "삭제",
    confirmDeleteComment: "이 댓글을 삭제할까요?",
    authOpen: "회원가입",
    logout: "로그아웃",
    authTitleRegister: "Clip Bloom 회원가입",
    authTitleLogin: "Clip Bloom 로그인",
    authDescRegister: "계정을 만들고 채널에 참여해 알림을 받으세요.",
    authDescLogin: "로그인하고 참여·알림을 관리하세요.",
    tabRegister: "회원가입",
    tabLogin: "로그인",
    labelName: "표시 이름",
    labelEmail: "이메일",
    labelPassword: "비밀번호",
    namePh: "이름",
    emailPh: "email@example.com",
    passwordPh: "4자 이상",
    authSubmitRegister: "계정 만들기",
    authSubmitLogin: "로그인",
    authNeedName: "표시 이름을 입력해 주세요.",
    authNeedEmail: "올바른 이메일을 입력해 주세요.",
    authNeedPassword: "비밀번호는 4자 이상이어야 해요.",
    authExists: "이미 가입된 이메일이에요. 로그인해 주세요.",
    authInvalid: "이메일 또는 비밀번호가 올바르지 않아요.",
    authWelcome: "Clip Bloom에 오신 것을 환영해요!",
    channelMetaGuest: "참여하고 새 영상 알림을 받으세요",
    channelMetaJoined: (n) => `참여 중 · 멤버 ${n}명`,
    join: "참여",
    joined: "참여 중",
    leave: "나가기",
    notifyToggle: "알림 받기",
    needLoginJoin: "참여하려면 회원가입 / 로그인이 필요해요.",
    joinSuccess: "Clip Bloom에 참여했어요!",
    leaveSuccess: "Clip Bloom에서 나갔어요.",
    notifyOn: "알림을 켰어요.",
    notifyOff: "알림을 껐어요.",
    notifTitle: "알림",
    notifEmpty: "아직 알림이 없어요.",
    markAllRead: "모두 읽음",
    notifJoinTitle: "참여 완료",
    notifJoinBody: "새 영상이 올라오면 알려드릴게요.",
    notifVideoTitle: "새 영상",
    notifVideoBody: (title) => `“${title}” 영상이 등록되었어요.`,
    notifWelcomeTitle: "환영합니다",
    notifWelcomeBody: (name) => `${name}님, 안녕하세요! 채널에 참여해 알림을 받아 보세요.`,
    justNow: "방금",
    minutesAgo: (n) => `${n}분 전`,
    hoursAgo: (n) => `${n}시간 전`,
    daysAgo: (n) => `${n}일 전`,
  },
};

const REACTIONS_KEY = "clip-bloom-reactions";
const SAVED_KEY = "clip-bloom-saved";
const HISTORY_KEY = "clip-bloom-history";
const QUALITY_KEY = "clip-bloom-quality";
const SPEED_KEY = "clip-bloom-speed";
const SUBTITLE_KEY = "clip-bloom-subtitle";
const USERS_KEY = "clip-bloom-users";
const SESSION_KEY = "clip-bloom-session";
const MEMBERS_KEY = "clip-bloom-members";
const NOTIFS_KEY = "clip-bloom-notifications";
const HISTORY_LIMIT = 100;
const SPEED_OPTIONS = ["0.5", "0.75", "1", "1.5", "2"];

const SUB_LANGS = [
  { code: "vi", labelKey: "subtitleVi" },
  { code: "en", labelKey: "subtitleEn" },
  { code: "ko", labelKey: "subtitleKo" },
];

function formatCount(n) {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(num);
}

let lang = localStorage.getItem("clip-bloom-lang") || localStorage.getItem("jihye-hub-lang") || "vi";
let videos = [];
let activeId = null;
let libraryFilter = "all";
let objectUrls = new Map();
let trackUrls = [];
let pendingFile = null;
let previewUrl = null;
let currentQuality = localStorage.getItem(QUALITY_KEY) || "auto";
let currentSpeed = SPEED_OPTIONS.includes(localStorage.getItem(SPEED_KEY))
  ? localStorage.getItem(SPEED_KEY)
  : "1";
let currentSubtitle = localStorage.getItem(SUBTITLE_KEY) || "off";
let authMode = "register";
let currentUser = null;

const $ = (id) => document.getElementById(id);

const libraryView = $("libraryView");
const uploadView = $("uploadView");
const playerView = $("playerView");
const videoGrid = $("videoGrid");
const emptyState = $("emptyState");
const searchInput = $("searchInput");
const mainPlayer = $("mainPlayer");
const dropzone = $("dropzone");
const videoFile = $("videoFile");
const previewVideo = $("previewVideo");
const formError = $("formError");

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => {
      const list = (req.result || []).sort((a, b) => b.createdAt - a.createdAt);
      resolve(list);
    };
    req.onerror = () => reject(req.error);
  });
}

async function dbPut(record) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbDelete(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function L() {
  return i18n[lang];
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function formatRelative(ts) {
  const t = L();
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return t.justNow;
  if (mins < 60) return t.minutesAgo(mins);
  const hours = Math.floor(mins / 60);
  if (hours < 24) return t.hoursAgo(hours);
  return t.daysAgo(Math.floor(hours / 24));
}

function revokeUrl(id) {
  const url = objectUrls.get(id);
  if (url) {
    URL.revokeObjectURL(url);
    objectUrls.delete(id);
  }
}

function getBlobUrl(video) {
  if (!objectUrls.has(video.id)) {
    objectUrls.set(video.id, URL.createObjectURL(video.blob));
  }
  return objectUrls.get(video.id);
}

function clearTracks() {
  [...mainPlayer.querySelectorAll("track")].forEach((track) => track.remove());
  trackUrls.forEach((url) => URL.revokeObjectURL(url));
  trackUrls = [];
}

function showView(name) {
  libraryView.classList.toggle("hidden", name !== "library");
  uploadView.classList.toggle("hidden", name !== "upload");
  playerView.classList.toggle("hidden", name !== "player");
  if (name !== "player") {
    mainPlayer.pause();
    clearTracks();
    mainPlayer.removeAttribute("src");
    mainPlayer.load();
  }
}

function openUpload() {
  clearUploadForm();
  showView("upload");
}

function readJson(key, fallback) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");
    return raw == null ? fallback : raw;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getUsers() {
  const list = readJson(USERS_KEY, []);
  return Array.isArray(list) ? list : [];
}

function saveUsers(users) {
  writeJson(USERS_KEY, users);
}

function getMembers() {
  const map = readJson(MEMBERS_KEY, {});
  return map && typeof map === "object" ? map : {};
}

function saveMembers(map) {
  writeJson(MEMBERS_KEY, map);
}

function getAllNotifications() {
  const map = readJson(NOTIFS_KEY, {});
  return map && typeof map === "object" ? map : {};
}

function getUserNotifications(userId) {
  const all = getAllNotifications();
  return Array.isArray(all[userId]) ? all[userId] : [];
}

function saveUserNotifications(userId, list) {
  const all = getAllNotifications();
  all[userId] = list.slice(0, 50);
  writeJson(NOTIFS_KEY, all);
}

function loadSession() {
  const id = localStorage.getItem(SESSION_KEY);
  currentUser = getUsers().find((u) => u.id === id) || null;
  if (!currentUser) localStorage.removeItem(SESSION_KEY);
}

function setSession(user) {
  currentUser = user;
  if (user) localStorage.setItem(SESSION_KEY, user.id);
  else localStorage.removeItem(SESSION_KEY);
  updateAccountUI();
  updateChannelUI();
  renderNotifications();
}

function isMember(userId = currentUser?.id) {
  return Boolean(userId && getMembers()[userId]);
}

function memberCount() {
  return Object.keys(getMembers()).length;
}

function unreadCount() {
  if (!currentUser) return 0;
  return getUserNotifications(currentUser.id).filter((n) => !n.read).length;
}

function pushNotification(userId, title, body, type = "info") {
  if (!userId) return;
  const list = getUserNotifications(userId);
  list.unshift({
    id: crypto.randomUUID(),
    title,
    body,
    type,
    read: false,
    createdAt: Date.now(),
  });
  saveUserNotifications(userId, list);
}

function notifyMembers(title, body, type = "video") {
  const members = getMembers();
  Object.entries(members).forEach(([userId, meta]) => {
    if (meta?.notify === false) return;
    pushNotification(userId, title, body, type);
    if (meta?.browserNotify && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(title, { body });
      } catch (_) {
        /* ignore */
      }
    }
  });
  if (currentUser) renderNotifications();
}

function updateAccountUI() {
  const t = L();
  const loggedIn = Boolean(currentUser);
  $("authOpenBtn").classList.toggle("hidden", loggedIn);
  $("userChip").classList.toggle("hidden", !loggedIn);
  $("authOpenBtn").textContent = t.authOpen;
  $("logoutBtn").textContent = t.logout;
  if (loggedIn) {
    $("userNameLabel").textContent = currentUser.name;
    $("userAvatar").textContent = (currentUser.name || "?").trim().charAt(0).toUpperCase() || "?";
    if (!$("commentAuthor").value.trim()) {
      $("commentAuthor").value = currentUser.name;
    }
  }
  const unread = unreadCount();
  $("notifDot").classList.toggle("hidden", !unread);
  $("notifDot").textContent = unread > 9 ? "9+" : String(unread || "");
}

function updateChannelUI() {
  const t = L();
  const joined = isMember();
  const count = memberCount();
  $("channelMeta").textContent = joined ? t.channelMetaJoined(count) : t.channelMetaGuest;
  $("joinBtn").textContent = joined ? t.leave : t.join;
  $("joinBtn").classList.toggle("joined", joined);
  $("notifyToggleWrap").classList.toggle("hidden", !joined || !currentUser);
  $("notifyToggleLabel").textContent = t.notifyToggle;
  if (joined && currentUser) {
    $("notifyToggle").checked = getMembers()[currentUser.id]?.notify !== false;
  }
}

function updateAuthModalUI() {
  const t = L();
  const isRegister = authMode === "register";
  $("authTitle").textContent = isRegister ? t.authTitleRegister : t.authTitleLogin;
  $("authDesc").textContent = isRegister ? t.authDescRegister : t.authDescLogin;
  $("tabRegister").textContent = t.tabRegister;
  $("tabLogin").textContent = t.tabLogin;
  $("tabRegister").classList.toggle("active", isRegister);
  $("tabLogin").classList.toggle("active", !isRegister);
  $("nameFieldWrap").classList.toggle("hidden", !isRegister);
  $("labelName").textContent = t.labelName;
  $("labelEmail").textContent = t.labelEmail;
  $("labelPassword").textContent = t.labelPassword;
  $("authName").placeholder = t.namePh;
  $("authEmail").placeholder = t.emailPh;
  $("authPassword").placeholder = t.passwordPh;
  $("authName").required = isRegister;
  $("authSubmit").textContent = isRegister ? t.authSubmitRegister : t.authSubmitLogin;
  $("authError").classList.add("hidden");
}

function openAuthModal(mode = "register") {
  authMode = mode;
  updateAuthModalUI();
  $("authModal").classList.remove("hidden");
  $("authName").value = "";
  $("authEmail").value = "";
  $("authPassword").value = "";
  (mode === "register" ? $("authName") : $("authEmail")).focus();
}

function closeAuthModal() {
  $("authModal").classList.add("hidden");
  $("authError").classList.add("hidden");
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const t = L();
  const email = $("authEmail").value.trim().toLowerCase();
  const password = $("authPassword").value;
  const name = $("authName").value.trim();
  const error = $("authError");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = t.authNeedEmail;
    error.classList.remove("hidden");
    return;
  }
  if (password.length < 4) {
    error.textContent = t.authNeedPassword;
    error.classList.remove("hidden");
    return;
  }

  const users = getUsers();
  const passwordHash = await hashPassword(password);

  if (authMode === "register") {
    if (!name) {
      error.textContent = t.authNeedName;
      error.classList.remove("hidden");
      return;
    }
    if (users.some((u) => u.email === email)) {
      error.textContent = t.authExists;
      error.classList.remove("hidden");
      return;
    }
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: Date.now(),
    };
    users.push(user);
    saveUsers(users);
    setSession(user);
    pushNotification(user.id, t.notifWelcomeTitle, t.notifWelcomeBody(user.name), "welcome");
    closeAuthModal();
    showShareToast(t.authWelcome);
    renderNotifications();
    return;
  }

  const user = users.find((u) => u.email === email && u.passwordHash === passwordHash);
  if (!user) {
    error.textContent = t.authInvalid;
    error.classList.remove("hidden");
    return;
  }
  setSession(user);
  closeAuthModal();
  showShareToast(t.authWelcome);
}

async function toggleMembership() {
  const t = L();
  if (!currentUser) {
    openAuthModal("register");
    showShareToast(t.needLoginJoin);
    return;
  }

  const members = getMembers();
  if (members[currentUser.id]) {
    delete members[currentUser.id];
    saveMembers(members);
    updateChannelUI();
    showShareToast(t.leaveSuccess);
    return;
  }

  members[currentUser.id] = {
    joinedAt: Date.now(),
    notify: true,
    browserNotify: false,
  };
  saveMembers(members);
  pushNotification(currentUser.id, t.notifJoinTitle, t.notifJoinBody, "join");
  updateChannelUI();
  renderNotifications();
  showShareToast(t.joinSuccess);

  if ("Notification" in window && Notification.permission === "default") {
    try {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        members[currentUser.id].browserNotify = true;
        saveMembers(members);
      }
    } catch (_) {
      /* ignore */
    }
  } else if ("Notification" in window && Notification.permission === "granted") {
    members[currentUser.id].browserNotify = true;
    saveMembers(members);
  }
}

async function toggleNotifySetting() {
  const t = L();
  if (!currentUser || !isMember()) return;
  const members = getMembers();
  const enabled = $("notifyToggle").checked;
  members[currentUser.id] = {
    ...members[currentUser.id],
    notify: enabled,
  };

  if (enabled && "Notification" in window) {
    if (Notification.permission === "default") {
      try {
        const perm = await Notification.requestPermission();
        members[currentUser.id].browserNotify = perm === "granted";
      } catch (_) {
        members[currentUser.id].browserNotify = false;
      }
    } else {
      members[currentUser.id].browserNotify = Notification.permission === "granted";
    }
  } else {
    members[currentUser.id].browserNotify = false;
  }

  saveMembers(members);
  showShareToast(enabled ? t.notifyOn : t.notifyOff);
}

function renderNotifications() {
  const t = L();
  const listEl = $("notifList");
  const emptyEl = $("notifEmpty");
  $("notifTitle").textContent = t.notifTitle;
  $("markAllReadBtn").textContent = t.markAllRead;
  listEl.innerHTML = "";

  if (!currentUser) {
    emptyEl.textContent = t.needLoginJoin;
    emptyEl.classList.remove("hidden");
    $("notifDot").classList.add("hidden");
    return;
  }

  const items = getUserNotifications(currentUser.id);
  updateAccountUI();

  if (!items.length) {
    emptyEl.textContent = t.notifEmpty;
    emptyEl.classList.remove("hidden");
    return;
  }

  emptyEl.classList.add("hidden");
  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `notif-item${item.read ? "" : " unread"}`;
    btn.innerHTML = `<strong></strong><p></p><span></span>`;
    btn.querySelector("strong").textContent = item.title;
    btn.querySelector("p").textContent = item.body;
    btn.querySelector("span").textContent = formatRelative(item.createdAt);
    btn.addEventListener("click", () => {
      const next = getUserNotifications(currentUser.id).map((n) =>
        n.id === item.id ? { ...n, read: true } : n
      );
      saveUserNotifications(currentUser.id, next);
      renderNotifications();
    });
    listEl.appendChild(btn);
  });
}

function markAllNotificationsRead() {
  if (!currentUser) return;
  const next = getUserNotifications(currentUser.id).map((n) => ({ ...n, read: true }));
  saveUserNotifications(currentUser.id, next);
  renderNotifications();
}

function toggleNotifPanel() {
  if (!currentUser) {
    openAuthModal("login");
    showShareToast(L().needLoginJoin);
    return;
  }
  $("notifPanel").classList.toggle("hidden");
  if (!$("notifPanel").classList.contains("hidden")) renderNotifications();
}

function applyI18n() {
  const t = L();
  document.documentElement.lang = lang;
  $("appTitle").textContent = t.appTitle;
  $("tagline").textContent = t.tagline;
  searchInput.placeholder = t.search;
  $("uploadBtn").textContent = t.upload;
  $("emptyUploadBtn").textContent = t.emptyUpload;
  $("sectionTitle").textContent = sectionTitleForFilter();
  $("filterAll").textContent = t.filterAll;
  $("filterSaved").textContent = t.filterSaved;
  $("filterHistory").textContent = t.filterHistory;
  $("clearHistoryBtn").textContent = t.clearHistory;
  $("uploadTitle").textContent = t.uploadTitle;
  $("dropHint").textContent = t.dropHint;
  $("labelTitle").textContent = t.labelTitle;
  $("labelDesc").textContent = t.labelDesc;
  $("videoTitle").placeholder = t.titlePh;
  $("videoDesc").placeholder = t.descPh;
  $("formHint").textContent = t.formHint;
  $("subtitleUploadTitle").textContent = t.subtitleUploadTitle;
  $("labelSubVi").textContent = t.subtitleVi;
  $("labelSubEn").textContent = t.subtitleEn;
  $("labelSubKo").textContent = t.subtitleKo;
  $("cancelUpload").textContent = t.cancel;
  $("submitUpload").textContent = t.submit;
  $("playerHeading").textContent = t.playerHeading;
  $("deleteBtn").textContent = t.delete;
  $("likeLabel").textContent = t.like;
  $("dislikeLabel").textContent = t.dislike;
  $("shareLabel").textContent = t.share;
  $("downloadLabel").textContent = t.download;
  $("qualityLabel").textContent = t.qualityLabel;
  $("speedLabel").textContent = t.speedLabel;
  $("subtitleLabel").textContent = t.subtitleLabel;
  $("addSubLabel").textContent = t.addSubLabel;
  fillSelectOptions();
  $("commentsHeading").textContent = t.commentsHeading;
  $("labelAuthor").textContent = t.labelAuthor;
  $("labelComment").textContent = t.labelComment;
  $("commentAuthor").placeholder = t.authorPh;
  $("commentText").placeholder = t.commentPh;
  $("submitComment").textContent = t.submitComment;
  $("commentEmpty").textContent = t.commentEmpty;
  if (!$("commentAuthor").value.trim()) {
    $("commentAuthor").value =
      currentUser?.name || localStorage.getItem("clip-bloom-author") || "";
  }
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
  document.querySelectorAll(".library-tabs .filter-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.filter === libraryFilter);
  });
  updateAuthModalUI();
  updateAccountUI();
  updateChannelUI();
  renderNotifications();
  updateSaveUI();
  renderGrid();
  if (activeId) {
    const v = videos.find((x) => x.id === activeId);
    if (v) {
      fillPlayerMeta(v);
      updateReactionUI(v);
      applyQuality();
      applySpeed();
      applySubtitleChoice();
      renderComments(v);
    }
  }
}

function fillSelectOptions() {
  const t = L();
  const quality = $("qualitySelect");
  const speed = $("speedSelect");
  const subtitle = $("subtitleSelect");
  const addLang = $("addSubLang");
  const qVal = quality.value || currentQuality;
  const spVal = SPEED_OPTIONS.includes(speed.value) ? speed.value : currentSpeed;
  const sVal = subtitle.value || currentSubtitle;
  const aVal = addLang.value || "vi";

  quality.innerHTML = `
    <option value="auto">Auto</option>
    <option value="1080">1080p</option>
    <option value="720">720p</option>
    <option value="480">480p</option>
    <option value="360">360p</option>
  `;
  quality.value = qVal;

  speed.innerHTML = SPEED_OPTIONS.map(
    (v) => `<option value="${v}">${v}x</option>`
  ).join("");
  speed.value = spVal;

  subtitle.innerHTML = `
    <option value="off">${t.subtitleOff}</option>
    <option value="vi">${t.subtitleVi}</option>
    <option value="en">${t.subtitleEn}</option>
    <option value="ko">${t.subtitleKo}</option>
  `;
  subtitle.value = sVal;

  addLang.innerHTML = `
    <option value="vi">${t.subtitleVi}</option>
    <option value="en">${t.subtitleEn}</option>
    <option value="ko">${t.subtitleKo}</option>
  `;
  addLang.value = aVal;
}

function getSavedIds() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function isSaved(videoId) {
  return getSavedIds().includes(videoId);
}

function setSaved(videoId, saved) {
  const set = new Set(getSavedIds());
  if (saved) set.add(videoId);
  else set.delete(videoId);
  localStorage.setItem(SAVED_KEY, JSON.stringify([...set]));
}

function updateSaveUI() {
  const t = L();
  const saved = activeId ? isSaved(activeId) : false;
  $("saveLabel").textContent = saved ? t.saved : t.save;
  $("saveBtn").classList.toggle("active", saved);
  $("saveBtn").setAttribute("aria-pressed", saved ? "true" : "false");
}

function toggleSaveVideo() {
  const t = L();
  if (!activeId) return;
  const next = !isSaved(activeId);
  setSaved(activeId, next);
  updateSaveUI();
  showShareToast(next ? t.saveAdded : t.saveRemoved);
  renderGrid();
}

function videoFileName(video) {
  const mime = video.mimeType || video.blob?.type || "video/webm";
  const ext = mime.includes("mp4") ? "mp4" : mime.includes("ogg") ? "ogv" : "webm";
  const safeTitle = (video.title || "clip").replace(/[\\/:*?"<>|]+/g, "_").slice(0, 60);
  return { name: `${safeTitle}.${ext}`, mime };
}

function downloadVideo() {
  const t = L();
  const video = videos.find((v) => v.id === activeId);
  if (!video?.blob) {
    showShareToast(t.downloadFail);
    return;
  }

  try {
    const { name } = videoFileName(video);
    const url = URL.createObjectURL(video.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showShareToast(t.downloadDone);
  } catch (_) {
    showShareToast(t.downloadFail);
  }
}

function sectionTitleForFilter() {
  const t = L();
  if (libraryFilter === "saved") return t.sectionSaved;
  if (libraryFilter === "history") return t.sectionHistory;
  return t.sectionTitle;
}

function getHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((item) => item && typeof item.id === "string" && Number.isFinite(item.watchedAt))
      .sort((a, b) => b.watchedAt - a.watchedAt);
  } catch {
    return [];
  }
}

function setHistory(entries) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, HISTORY_LIMIT)));
}

function addToHistory(videoId) {
  const next = [
    { id: videoId, watchedAt: Date.now() },
    ...getHistory().filter((item) => item.id !== videoId),
  ];
  setHistory(next);
}

function removeFromHistory(videoId) {
  setHistory(getHistory().filter((item) => item.id !== videoId));
}

function clearWatchHistory() {
  const t = L();
  if (!getHistory().length) return;
  if (!confirm(t.confirmClearHistory)) return;
  setHistory([]);
  showShareToast(t.historyCleared);
  renderGrid();
}

function getWatchedAt(videoId) {
  return getHistory().find((item) => item.id === videoId)?.watchedAt || null;
}

function updateHistoryControls() {
  const clearBtn = $("clearHistoryBtn");
  const show = libraryFilter === "history" && getHistory().some((h) => videos.some((v) => v.id === h.id));
  clearBtn.classList.toggle("hidden", !show);
}

function filteredVideos() {
  const q = searchInput.value.trim().toLowerCase();
  let list = videos;

  if (libraryFilter === "saved") {
    const saved = new Set(getSavedIds());
    list = list.filter((v) => saved.has(v.id));
  } else if (libraryFilter === "history") {
    const byId = new Map(videos.map((v) => [v.id, v]));
    list = getHistory()
      .map((item) => {
        const video = byId.get(item.id);
        return video ? { ...video, watchedAt: item.watchedAt } : null;
      })
      .filter(Boolean);
  }

  if (!q) return list;
  return list.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      (v.description || "").toLowerCase().includes(q)
  );
}

function renderGrid() {
  const t = L();
  const list = filteredVideos();
  const totalForFilter =
    libraryFilter === "saved"
      ? videos.filter((v) => isSaved(v.id)).length
      : libraryFilter === "history"
        ? getHistory().filter((h) => videos.some((v) => v.id === h.id)).length
        : videos.length;

  $("sectionTitle").textContent = sectionTitleForFilter();
  $("videoCount").textContent = totalForFilter ? t.count(list.length) : "";
  updateHistoryControls();
  videoGrid.innerHTML = "";

  if (!list.length) {
    emptyState.classList.remove("hidden");
    if (!videos.length) {
      $("emptyText").textContent = t.empty;
      $("emptyUploadBtn").classList.remove("hidden");
    } else if (libraryFilter === "saved" && !searchInput.value.trim()) {
      $("emptyText").textContent = t.emptySaved;
      $("emptyUploadBtn").classList.add("hidden");
    } else if (libraryFilter === "history" && !searchInput.value.trim()) {
      $("emptyText").textContent = t.emptyHistory;
      $("emptyUploadBtn").classList.add("hidden");
    } else {
      $("emptyText").textContent = t.emptySearch;
      $("emptyUploadBtn").classList.add("hidden");
    }
    return;
  }

  emptyState.classList.add("hidden");

  list.forEach((video, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "video-card";
    card.style.animationDelay = `${Math.min(i, 8) * 0.04}s`;

    const url = getBlobUrl(video);
    const saved = isSaved(video.id);
    const watchedAt = video.watchedAt || getWatchedAt(video.id);
    card.innerHTML = `
      <div class="thumb-wrap">
        <video src="${url}#t=0.1" muted preload="metadata" playsinline></video>
        <div class="thumb-play">▶</div>
        <span class="duration">${formatDuration(video.duration)}</span>
        ${saved ? `<span class="saved-badge"></span>` : ""}
      </div>
      <div class="card-body">
        <h3></h3>
        <p></p>
      </div>
    `;
    card.querySelector("h3").textContent = video.title;
    card.querySelector("p").textContent =
      libraryFilter === "history" && watchedAt
        ? `${t.watchedAt(formatRelative(watchedAt))} · ${t.views(video.views || 0)}`
        : `${t.views(video.views || 0)} · ${t.likes(video.likes || 0)} · ${formatRelative(video.createdAt)}`;
    const badge = card.querySelector(".saved-badge");
    if (badge) badge.textContent = t.savedBadge;
    card.addEventListener("click", () => openPlayer(video.id));
    videoGrid.appendChild(card);
  });
}

function fillPlayerMeta(video) {
  const t = L();
  $("playerTitle").textContent = video.title;
  $("viewStat").textContent = t.views(video.views || 0);
  $("likeStat").textContent = t.likes(video.likes || 0);
  $("qualityBadge").textContent = t.qualityBadge(currentQuality);
  $("playerMeta").textContent = formatRelative(video.createdAt);
  $("playerDesc").textContent = video.description || "";
}

function formatVttTime(seconds) {
  const total = Math.max(1, Math.floor(Number(seconds) || 1));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}.000`;
}

function makeAutoVtt(video, code) {
  const end = formatVttTime(video.duration || 12);
  const title = video.title || "Clip Bloom";
  const desc = video.description || "";
  const lines = {
    vi: [title, desc || "Phụ đề tự động · Clip Bloom"].filter(Boolean),
    en: [title, desc || "Auto captions · Clip Bloom"].filter(Boolean),
    ko: [title, desc || "자동 자막 · Clip Bloom"].filter(Boolean),
  };
  const body = (lines[code] || lines.vi).join("\n");
  return `WEBVTT\n\n00:00:00.000 --> ${end}\n${body}\n`;
}

function srtToVtt(text) {
  let body = String(text || "").replace(/\r+/g, "").trim();
  if (!body) return "";
  if (/^WEBVTT/i.test(body)) return body;
  body = body
    .replace(/^\d+\s*$/gm, "")
    .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2");
  return `WEBVTT\n\n${body}\n`;
}

async function readSubtitleFile(file) {
  if (!file) return "";
  const name = (file.name || "").toLowerCase();
  const ok =
    name.endsWith(".vtt") ||
    name.endsWith(".srt") ||
    file.type.includes("vtt") ||
    file.type.startsWith("text/");
  if (!ok) throw new Error("invalid-sub");
  const text = await file.text();
  const vtt = srtToVtt(text);
  if (!vtt.trim()) throw new Error("invalid-sub");
  return vtt;
}

function ensureSubtitles(video) {
  if (!video.subtitles || typeof video.subtitles !== "object") {
    video.subtitles = {};
  }
  for (const { code } of SUB_LANGS) {
    if (!video.subtitles[code]) {
      video.subtitles[code] = makeAutoVtt(video, code);
    }
  }
  return video.subtitles;
}

function attachSubtitles(video) {
  clearTracks();
  const subs = ensureSubtitles(video);
  const t = L();

  SUB_LANGS.forEach(({ code, labelKey }) => {
    const text = subs[code];
    if (!text) return;
    const url = URL.createObjectURL(new Blob([text], { type: "text/vtt" }));
    trackUrls.push(url);
    const track = document.createElement("track");
    track.kind = "subtitles";
    track.label = t[labelKey];
    track.srclang = code;
    track.src = url;
    if (code === currentSubtitle) track.default = true;
    mainPlayer.appendChild(track);
  });

  const apply = () => applySubtitleChoice();
  if (mainPlayer.textTracks?.length) apply();
  else mainPlayer.addEventListener("loadedmetadata", apply, { once: true });
}

function applySubtitleChoice() {
  const choice = $("subtitleSelect").value || "off";
  currentSubtitle = choice;
  localStorage.setItem(SUBTITLE_KEY, choice);
  [...mainPlayer.textTracks].forEach((track) => {
    const match = choice !== "off" && (track.language === choice || track.language?.startsWith(choice));
    track.mode = match ? "showing" : "hidden";
  });
}

function applyQuality() {
  const shell = $("playerShell");
  const value = $("qualitySelect").value || currentQuality || "auto";
  currentQuality = value;
  localStorage.setItem(QUALITY_KEY, value);
  shell.dataset.quality = value;
  $("qualityBadge").textContent = L().qualityBadge(value);
}

function applySpeed() {
  const raw = $("speedSelect").value || currentSpeed || "1";
  const value = SPEED_OPTIONS.includes(raw) ? raw : "1";
  currentSpeed = value;
  localStorage.setItem(SPEED_KEY, value);
  $("speedSelect").value = value;
  mainPlayer.playbackRate = Number(value);
}

async function addSubtitleToActive() {
  const t = L();
  const video = videos.find((v) => v.id === activeId);
  const file = $("addSubFile").files?.[0];
  if (!video || !file) return;

  try {
    const vtt = await readSubtitleFile(file);
    const code = $("addSubLang").value || "vi";
    ensureSubtitles(video);
    video.subtitles[code] = vtt;
    await dbPut(video);
    attachSubtitles(video);
    $("subtitleSelect").value = code;
    applySubtitleChoice();
    $("addSubFile").value = "";
    showShareToast(t.subAdded);
  } catch (_) {
    showShareToast(t.subInvalid);
  }
}

function getReactions() {
  try {
    return JSON.parse(localStorage.getItem(REACTIONS_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function setReaction(videoId, value) {
  const map = getReactions();
  if (value) map[videoId] = value;
  else delete map[videoId];
  localStorage.setItem(REACTIONS_KEY, JSON.stringify(map));
}

function getMyReaction(videoId) {
  return getReactions()[videoId] || null;
}

function updateReactionUI(video) {
  const mine = getMyReaction(video.id);
  $("likeCount").textContent = String(video.likes || 0);
  $("dislikeCount").textContent = String(video.dislikes || 0);
  $("likeBtn").classList.toggle("active", mine === "like");
  $("dislikeBtn").classList.toggle("active", mine === "dislike");
  $("likeBtn").setAttribute("aria-pressed", mine === "like" ? "true" : "false");
  $("dislikeBtn").setAttribute("aria-pressed", mine === "dislike" ? "true" : "false");
}

async function setVideoReaction(kind) {
  const video = videos.find((v) => v.id === activeId);
  if (!video) return;

  const prev = getMyReaction(video.id);
  let next = kind;
  if (prev === kind) next = null;

  video.likes = video.likes || 0;
  video.dislikes = video.dislikes || 0;

  if (prev === "like") video.likes = Math.max(0, video.likes - 1);
  if (prev === "dislike") video.dislikes = Math.max(0, video.dislikes - 1);
  if (next === "like") video.likes += 1;
  if (next === "dislike") video.dislikes += 1;

  setReaction(video.id, next);

  try {
    await dbPut(video);
  } catch (_) {
    /* keep UI even if persist fails */
  }

  updateReactionUI(video);
  fillPlayerMeta(video);
  renderGrid();
}

function showShareToast(message) {
  const toast = $("shareToast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(showShareToast._timer);
  showShareToast._timer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

function buildShareText(video) {
  const t = L();
  const parts = [`Clip Bloom · ${video.title}`];
  if (video.description) parts.push(video.description);
  parts.push(`${t.views(video.views || 0)} · ${t.likes(video.likes || 0)}`);
  parts.push(location.href.split("#")[0]);
  return parts.join("\n");
}

async function shareVideo() {
  const t = L();
  const video = videos.find((v) => v.id === activeId);
  if (!video) return;

  const text = buildShareText(video);
  const { name, mime } = videoFileName(video);
  const file = video.blob
    ? new File([video.blob], name, { type: mime })
    : null;

  try {
    if (file && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: video.title,
        text: video.description || text,
      });
      showShareToast(t.shareFileDone);
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: video.title,
        text,
        url: location.href.split("#")[0],
      });
      showShareToast(t.shareDone);
      return;
    }
  } catch (err) {
    if (err?.name === "AbortError") return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showShareToast(t.shareCopied);
  } catch (_) {
    showShareToast(t.shareFail);
  }
}

function getComments(video) {
  return Array.isArray(video.comments) ? video.comments : [];
}

function authorInitial(name) {
  const ch = (name || "?").trim().charAt(0);
  return ch ? ch.toUpperCase() : "?";
}

function renderComments(video) {
  const t = L();
  const list = getComments(video).slice().sort((a, b) => b.createdAt - a.createdAt);
  const commentList = $("commentList");
  const commentEmpty = $("commentEmpty");

  $("commentCount").textContent = t.commentCount(list.length);
  commentList.innerHTML = "";

  if (!list.length) {
    commentEmpty.classList.remove("hidden");
    return;
  }

  commentEmpty.classList.add("hidden");

  list.forEach((c, i) => {
    const item = document.createElement("article");
    item.className = "comment-item";
    item.style.animationDelay = `${Math.min(i, 6) * 0.04}s`;

    const avatar = document.createElement("div");
    avatar.className = "comment-avatar";
    avatar.textContent = authorInitial(c.author);
    avatar.setAttribute("aria-hidden", "true");

    const body = document.createElement("div");
    body.className = "comment-body";

    const head = document.createElement("div");
    head.className = "comment-head";

    const name = document.createElement("strong");
    name.textContent = c.author || t.defaultAuthor;

    const time = document.createElement("span");
    time.textContent = formatRelative(c.createdAt);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "comment-delete";
    del.textContent = t.deleteComment;
    del.addEventListener("click", () => deleteComment(video.id, c.id));

    head.append(name, time, del);

    const text = document.createElement("p");
    text.textContent = c.text;

    body.append(head, text);
    item.append(avatar, body);
    commentList.appendChild(item);
  });
}

async function deleteComment(videoId, commentId) {
  if (!confirm(L().confirmDeleteComment)) return;
  const video = videos.find((v) => v.id === videoId);
  if (!video) return;

  video.comments = getComments(video).filter((c) => c.id !== commentId);
  try {
    await dbPut(video);
    renderComments(video);
  } catch (_) {
    $("commentError").textContent = L().saveError;
    $("commentError").classList.remove("hidden");
  }
}

async function openPlayer(id) {
  const video = videos.find((v) => v.id === id);
  if (!video) return;

  activeId = id;
  if (!Array.isArray(video.comments)) video.comments = [];
  video.likes = video.likes || 0;
  video.dislikes = video.dislikes || 0;
  video.views = (video.views || 0) + 1;
  ensureSubtitles(video);
  addToHistory(id);
  try {
    await dbPut(video);
  } catch (_) {
    /* ignore view count write errors */
  }

  showView("player");
  fillPlayerMeta(video);
  updateReactionUI(video);
  updateSaveUI();
  renderComments(video);
  $("commentError").classList.add("hidden");
  $("shareToast").classList.add("hidden");
  $("commentText").value = "";
  $("qualitySelect").value = currentQuality;
  $("speedSelect").value = currentSpeed;
  $("subtitleSelect").value = currentSubtitle;
  clearTracks();
  mainPlayer.src = getBlobUrl(video);
  attachSubtitles(video);
  applyQuality();
  applySpeed();
  mainPlayer.play().catch(() => {});
  renderGrid();
}

function clearUploadForm() {
  $("uploadForm").reset();
  pendingFile = null;
  formError.classList.add("hidden");
  formError.textContent = "";
  $("fileName").textContent = "";
  ["subFileVi", "subFileEn", "subFileKo"].forEach((id) => {
    if ($(id)) $(id).value = "";
  });
  previewVideo.classList.add("hidden");
  previewVideo.removeAttribute("src");
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  dropzone.querySelector(".dropzone-inner").classList.remove("hidden");
}

function setPendingFile(file) {
  if (!file || !file.type.startsWith("video/")) {
    formError.textContent = L().noFile;
    formError.classList.remove("hidden");
    return;
  }

  const maxBytes = 80 * 1024 * 1024;
  if (file.size > maxBytes) {
    formError.textContent = L().tooLarge;
    formError.classList.remove("hidden");
    return;
  }

  pendingFile = file;
  formError.classList.add("hidden");
  $("fileName").textContent = file.name;

  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(file);
  previewVideo.src = previewUrl;
  previewVideo.classList.remove("hidden");
  dropzone.querySelector(".dropzone-inner").classList.add("hidden");

  if (!$("videoTitle").value.trim()) {
    $("videoTitle").value = file.name.replace(/\.[^.]+$/, "");
  }
}

function readDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const el = document.createElement("video");
    el.preload = "metadata";
    el.onloadedmetadata = () => {
      const d = el.duration;
      URL.revokeObjectURL(url);
      resolve(Number.isFinite(d) ? d : 0);
    };
    el.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
    el.src = url;
  });
}

async function loadVideos() {
  videos = (await dbAll()).map((v) => {
    const normalized = {
      ...v,
      comments: Array.isArray(v.comments) ? v.comments : [],
      likes: v.likes || 0,
      dislikes: v.dislikes || 0,
      views: v.views || 0,
      subtitles: v.subtitles && typeof v.subtitles === "object" ? v.subtitles : {},
    };
    ensureSubtitles(normalized);
    return normalized;
  });
  const existing = new Set(videos.map((v) => v.id));
  setHistory(getHistory().filter((item) => existing.has(item.id)));
  renderGrid();
}

function bindEvents() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang;
      localStorage.setItem("clip-bloom-lang", lang);
      applyI18n();
    });
  });

  $("authOpenBtn").addEventListener("click", () => openAuthModal("register"));
  $("authCloseBtn").addEventListener("click", () => closeAuthModal());
  $("authModal").addEventListener("click", (e) => {
    if (e.target === $("authModal")) closeAuthModal();
  });
  $("tabRegister").addEventListener("click", () => {
    authMode = "register";
    updateAuthModalUI();
  });
  $("tabLogin").addEventListener("click", () => {
    authMode = "login";
    updateAuthModalUI();
  });
  $("authForm").addEventListener("submit", (e) => {
    handleAuthSubmit(e).catch(() => {
      $("authError").textContent = L().saveError;
      $("authError").classList.remove("hidden");
    });
  });
  $("logoutBtn").addEventListener("click", () => {
    setSession(null);
    $("notifPanel").classList.add("hidden");
    showShareToast(L().logout);
  });
  $("joinBtn").addEventListener("click", () => {
    toggleMembership().catch(() => {});
  });
  $("notifyToggle").addEventListener("change", () => {
    toggleNotifySetting().catch(() => {});
  });
  $("notifBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleNotifPanel();
  });
  $("markAllReadBtn").addEventListener("click", () => markAllNotificationsRead());
  document.addEventListener("click", (e) => {
    const panel = $("notifPanel");
    if (panel.classList.contains("hidden")) return;
    if (panel.contains(e.target) || $("notifBtn").contains(e.target)) return;
    panel.classList.add("hidden");
  });

  $("uploadBtn").addEventListener("click", openUpload);
  $("emptyUploadBtn").addEventListener("click", openUpload);

  $("backFromUpload").addEventListener("click", () => {
    clearUploadForm();
    showView("library");
  });

  $("cancelUpload").addEventListener("click", () => {
    clearUploadForm();
    showView("library");
  });

  $("backFromPlayer").addEventListener("click", () => {
    activeId = null;
    showView("library");
    renderGrid();
  });

  searchInput.addEventListener("input", renderGrid);

  videoFile.addEventListener("change", () => {
    const file = videoFile.files?.[0];
    if (file) setPendingFile(file);
  });

  ["dragenter", "dragover"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) setPendingFile(file);
  });

  $("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const t = L();
    if (!pendingFile) {
      formError.textContent = t.noFile;
      formError.classList.remove("hidden");
      return;
    }

    const title = $("videoTitle").value.trim();
    if (!title) return;

    const submitBtn = $("submitUpload");
    submitBtn.disabled = true;
    submitBtn.textContent = t.submitting;

    try {
      const duration = await readDuration(pendingFile);
      const subtitles = {};
      const subFiles = [
        ["vi", $("subFileVi").files?.[0]],
        ["en", $("subFileEn").files?.[0]],
        ["ko", $("subFileKo").files?.[0]],
      ];
      for (const [code, file] of subFiles) {
        if (!file) continue;
        try {
          subtitles[code] = await readSubtitleFile(file);
        } catch (_) {
          formError.textContent = t.subInvalid;
          formError.classList.remove("hidden");
          submitBtn.disabled = false;
          submitBtn.textContent = t.submit;
          return;
        }
      }

      const record = {
        id: crypto.randomUUID(),
        title,
        description: $("videoDesc").value.trim(),
        blob: pendingFile,
        mimeType: pendingFile.type,
        size: pendingFile.size,
        duration,
        views: 0,
        likes: 0,
        dislikes: 0,
        comments: [],
        subtitles,
        createdAt: Date.now(),
      };
      ensureSubtitles(record);
      await dbPut(record);
      videos.unshift(record);
      notifyMembers(t.notifVideoTitle, t.notifVideoBody(title), "video");
      clearUploadForm();
      showView("library");
      renderGrid();
    } catch (_) {
      formError.textContent = t.saveError;
      formError.classList.remove("hidden");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = t.submit;
    }
  });

  $("likeBtn").addEventListener("click", () => setVideoReaction("like"));
  $("dislikeBtn").addEventListener("click", () => setVideoReaction("dislike"));
  $("saveBtn").addEventListener("click", () => toggleSaveVideo());
  $("downloadBtn").addEventListener("click", () => downloadVideo());
  $("shareBtn").addEventListener("click", () => shareVideo());
  $("qualitySelect").addEventListener("change", () => applyQuality());
  $("speedSelect").addEventListener("change", () => applySpeed());
  $("subtitleSelect").addEventListener("change", () => applySubtitleChoice());
  $("addSubFile").addEventListener("change", () => addSubtitleToActive());
  mainPlayer.addEventListener("ratechange", () => {
    const rate = String(mainPlayer.playbackRate);
    if (SPEED_OPTIONS.includes(rate) && $("speedSelect").value !== rate) {
      currentSpeed = rate;
      $("speedSelect").value = rate;
      localStorage.setItem(SPEED_KEY, rate);
    }
  });

  document.querySelectorAll(".library-tabs .filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      libraryFilter = btn.dataset.filter || "all";
      document.querySelectorAll(".library-tabs .filter-btn").forEach((b) => {
        b.classList.toggle("active", b.dataset.filter === libraryFilter);
      });
      renderGrid();
    });
  });

  $("clearHistoryBtn").addEventListener("click", () => clearWatchHistory());

  $("deleteBtn").addEventListener("click", async () => {
    if (!activeId || !confirm(L().confirmDelete)) return;
    const removedId = activeId;
    await dbDelete(removedId);
    revokeUrl(removedId);
    setReaction(removedId, null);
    setSaved(removedId, false);
    removeFromHistory(removedId);
    videos = videos.filter((v) => v.id !== removedId);
    activeId = null;
    showView("library");
    renderGrid();
  });

  $("commentForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const t = L();
    const video = videos.find((v) => v.id === activeId);
    if (!video) return;

    const text = $("commentText").value.trim();
    if (!text) {
      $("commentError").textContent = t.commentRequired;
      $("commentError").classList.remove("hidden");
      return;
    }

    const author = $("commentAuthor").value.trim() || t.defaultAuthor;
    localStorage.setItem("clip-bloom-author", $("commentAuthor").value.trim());

    const comment = {
      id: crypto.randomUUID(),
      author,
      text,
      createdAt: Date.now(),
    };

    video.comments = [comment, ...getComments(video)];
    $("commentError").classList.add("hidden");

    try {
      await dbPut(video);
      $("commentText").value = "";
      renderComments(video);
    } catch (_) {
      $("commentError").textContent = t.saveError;
      $("commentError").classList.remove("hidden");
    }
  });
}

async function init() {
  loadSession();
  bindEvents();
  applyI18n();
  try {
    await loadVideos();
  } catch (err) {
    console.error(err);
    emptyState.classList.remove("hidden");
    $("emptyText").textContent = L().saveError;
  }
}

init();
