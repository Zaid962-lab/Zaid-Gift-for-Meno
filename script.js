/* ==========================================================
   ROMANTIC GIFT — script.js
   ----------------------------------------------------------
   EDIT ONLY THE "CONFIG" OBJECT BELOW to personalize the gift.
   Every line marked  ✏️ CUSTOMIZE  is meant for you to change.
   Text is always inserted safely (never as HTML), so you can
   type characters like < & > without breaking anything.
   ========================================================== */

const CONFIG = {
  // ✏️ CUSTOMIZE — names
  senderName: "Your Husbind Zaid",
  recipientName: "Maaaaaaa Wifeeee",

  // ✏️ CUSTOMIZE — welcome screen. {name} is replaced by recipientName.
  welcomeHeading: "Hey, {name} 💗",
  welcomeSubtitle: "I made something special for you…",

  // ✏️ CUSTOMIZE — love question
  questionText: "Do you love me? 💗",
  yesLabel: "YES 💖",
  noLabel: "NO 🙈",
  yesResponse: "I knew it! You just made my whole day, {name}. 🥰",
  // Funny replies shown one after another when NO is pressed (the last one repeats).
  noResponses: [
    "Hmm… that button must be broken. Try again? 😏",
    "Are you sure? Think about it… 🥺",
    "The NO button is shy and ran away! 🙈",
    "Okay okay, I see you're teasing me. 😤💗",
    "Fine, I'll stop chasing it. Just press YES, please? 🥹"
  ],
  // How many times NO runs away before it stays still (it never disappears).
  noDodgeCount: 4,

  // ✏️ CUSTOMIZE — secret code (digits recommended; leading zeros like "0143" work).
  // NOTE: a static website cannot truly hide this code. See README.md.
  secretCode: "2411",
  secretHint: "Hint: it's Four little numbers that mean “You Are My Life”.",
  codeWrongMessage: "Not quite, cutie! Try again 💕",
  codeEmptyMessage: "Type the secret code first 💗",
  unlockedMessage: "I Know U Will Do it Maaaaa Wife and Maaaaa Swwetheart 🎉\nYou're my favorite person in the whole world.",

  // ✏️ CUSTOMIZE — music section
  songTitle: "Love Song",
  songArtist: "Adele",
  // One short ORIGINAL sentence of your own (do not paste full lyrics).
  songLine: "I Will Love U ForEver Meeeeeeeeno .",
  musicDescription: "I choose This One for U. Press play when you're ready. 🎵",
  // Optional audio YOU have the right to use. Put the file in /assets and write its name,
  // e.g. "our-song.mp3". Leave "" to show the no-audio fallback instead.
  audioFile: "our-song.m4a",
  // Optional legal link, e.g. the official artist/YouTube page. Leave "" to hide it.
  songLink: "",
  songLinkLabel: "Listen on an official source ↗",
  // Optional short excerpt you are permitted to use (leave "" for none).
  lyricExcerpt: "",

  // ✏️ CUSTOMIZE — FINAL LETTER (this is the one to write!)
  // Use a blank line between paragraphs.
  finalLetter: `أمنية كيف اقدر اعبر عن حبي لك وكيف اقدر اعبر عن جمالك كيف اقدر اعبر واقولك بسم الله ما شاء الله شعرك احبه احبه احبه احبه واحبك بعد يروحي اهخخخخخ جمالك واناقتك و جمالك يوج وج ما شاء الله تبارك الله الله يحميكي يا حبيبتي احبك احبك احبك ولله انك حلوه شديد بعدين يعيوني احبك تدري اني احبك واعشقك تدري ولا ما تدري يا حبيبة قلبي ويا عيوني ويا روحي ويا دروبي ايش هالجمااااااااااااااااال شو هالرررررررررتاااااااابه ولله انك مزييييييييييييونه احبك احبك احبك الحمدلله اهخخخ متى امشط شعرك بايدي وبالمشط ومتى امسك هالخدود الحلوين متى متى متىىىىىىى  اهخخخخ بسم الله ما شاء الله الله يحميكي ويحفظك حبيبتي والله يخليكي لي ويجعلك من نصيبي ولا يحرمني منك اهخخخخخ و عيونك الحلوه شكلهم لونهم الرموش الحواجب الانف الشعر الوجه كل شي بيرفكت ولله ولله بيرفكت احبك ولله احبك انتي جميله ما شاء الله ما شاء الله حبيبتي احبك الله يحفظك احبك احبك احبك الله يخليلي اياكي ولله شعرك ودي بس امسكه والعب بيه ودي امسك هالخدود واقول شو هالكياته وشو هالجمال ودي اسرح لك شعرك ودي احضنك الان هسا كيف ودي اجي اخطبك اليوم كيف اهخخخخ أمنية انا كثير احبك الله يخليلي اياكي ولا يحرمني منك احبك واحب جمالك واحب شعرك واحب اناقتك واحب ذوقك واحبك كلك انتي كلك احبك اعشقك اموت فيكي يا زوجتي يا ام عيالي اهخخخخخ اعشقك حبيبتي اموت فيييييييكي الله لا يحرمني منك ويخليلي اياكي`,
  // The preview warning appears only while the letter is empty or still has this marker.
  letterPlaceholderMarker: "[WRITE YOUR PERSONAL LETTER HERE]",
  signaturePrefix: "Forever yours,",

  // ✏️ CUSTOMIZE — closing screen
  closingMessage: "Thank you for opening my little gift. I love you, Meeeeennnnnnnoooooooooo. 💗",

  // ✏️ CUSTOMIZE — theme colors (any CSS color)
  theme: {
    blush: "#ffd6e0",
    rose: "#ffe9ef",
    cream: "#fff8f0",
    burgundy: "#8c1c3d",
    gold: "#d4a94f"
  }
};

/* ==========================================================
   APPLICATION CODE — you normally don't need to edit below.
   ========================================================== */
(function () {
  "use strict";

  const ORDER = ["welcome", "question", "code", "surprise", "music", "letter", "closing"];
  const LEAVE_MS = 260;

  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    current: "welcome",
    transitioning: false,
    opening: false,
    noCount: 0,
    unlocking: false,
    timers: new Set()
  };

  function later(fn, ms) {
    const id = setTimeout(() => { state.timers.delete(id); fn(); }, ms);
    state.timers.add(id);
    return id;
  }
  function clearTimers() {
    state.timers.forEach(clearTimeout);
    state.timers.clear();
  }

  const fill = (tpl) => String(tpl == null ? "" : tpl).replace(/\{name\}/g, CONFIG.recipientName || "");
  const setText = (id, text) => { const el = $(id); if (el) el.textContent = text; };

  /* ---------- Theme ---------- */
  function applyTheme() {
    const t = CONFIG.theme || {};
    const root = document.documentElement.style;
    ["blush", "rose", "cream", "burgundy", "gold"].forEach((k) => {
      if (t[k]) root.setProperty("--" + k, t[k]);
    });
  }

  /* ---------- Effects ---------- */
  function buildBackgroundHearts() {
    const wrap = $("bgHearts");
    if (!wrap || reduceMotion) return;
    for (let i = 0; i < 14; i++) {
      const h = document.createElement("span");
      h.className = "bg-heart";
      h.textContent = "♥";
      h.style.left = Math.round(Math.random() * 96) + "%";
      h.style.fontSize = 14 + Math.round(Math.random() * 26) + "px";
      h.style.opacity = (0.08 + Math.random() * 0.2).toFixed(2);
      h.style.animationDuration = 14 + Math.round(Math.random() * 16) + "s";
      h.style.animationDelay = "-" + Math.round(Math.random() * 20) + "s";
      wrap.appendChild(h);
    }
  }

  function burst(count, originEl) {
    const layer = $("fxLayer");
    if (!layer) return;
    const n = reduceMotion ? Math.min(count, 6) : count;
    let ox = window.innerWidth / 2, oy = window.innerHeight / 2;
    if (originEl && originEl.getBoundingClientRect) {
      const r = originEl.getBoundingClientRect();
      ox = r.left + r.width / 2; oy = r.top + r.height / 2;
    }
    const glyphs = ["💗", "💖", "✨", "♥", "💕"];
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "burst";
      s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      const ang = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 140;
      s.style.left = ox + "px";
      s.style.top = oy + "px";
      s.style.fontSize = 14 + Math.round(Math.random() * 16) + "px";
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist - 40 + "px");
      s.style.setProperty("--rot", Math.round(Math.random() * 60 - 30) + "deg");
      layer.appendChild(s);
      later(() => s.remove(), 1300);
    }
  }

  /* ---------- Navigation ---------- */
  function updateProgress() {
    const bar = $("progressBar"), wrap = $("progress");
    if (!bar || !wrap) return;
    const idx = ORDER.indexOf(state.current);
    wrap.hidden = idx <= 0;
    bar.style.width = Math.round((idx / (ORDER.length - 1)) * 100) + "%";
  }

  function showScreen(name, opts) {
    const immediate = opts && opts.immediate;
    if (ORDER.indexOf(name) === -1) return;
    if (state.transitioning && !immediate) return;
    const from = $("screen-" + state.current);
    const to = $("screen-" + name);
    if (!to) return;

    const finish = () => {
      document.querySelectorAll(".screen").forEach((s) => {
        s.hidden = s !== to;
        s.classList.remove("is-leaving");
      });
      state.current = name;
      state.transitioning = false;
      updateProgress();
      onEnter(name);
      const h = to.querySelector("h1, h2");
      if (h) { h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      window.scrollTo(0, 0);
    };

    if (immediate || !from || from === to || from.hidden) {
      finish();
      return;
    }
    state.transitioning = true;
    from.classList.add("is-leaving");
    later(finish, reduceMotion ? 0 : LEAVE_MS);
  }

  const goNext = () => { const i = ORDER.indexOf(state.current); if (i < ORDER.length - 1) showScreen(ORDER[i + 1]); };
  const goBack = () => { const i = ORDER.indexOf(state.current); if (i > 0) showScreen(ORDER[i - 1]); };

  function onEnter(name) {
    if (name === "music") prepareAudio();
    if (name !== "music") pauseAudio();
    if (name === "surprise") burst(18, document.querySelector("#screen-surprise .big-heart"));
    if (name === "closing") burst(28);
  }

  /* ---------- Screen 1: welcome ---------- */
  function openGift() {
    if (state.opening) return;
    state.opening = true;
    const btn = $("openBtn");
    btn.disabled = true;
    $("envelope").classList.add("is-open");
    burst(16, $("envelope"));
    later(() => { state.opening = false; showScreen("question"); }, reduceMotion ? 100 : 1000);
  }

  /* ---------- Screen 2: question ---------- */
  function onYes() {
    const resp = $("questionResponse");
    resp.classList.remove("is-error");
    resp.textContent = fill(CONFIG.yesResponse);
    $("yesBtn").disabled = true;
    $("noBtn").hidden = true;
    $("questionNext").hidden = false;
    burst(26, $("yesBtn"));
    $("questionNext").focus({ preventScroll: true });
  }

  function onNo() {
    const list = Array.isArray(CONFIG.noResponses) && CONFIG.noResponses.length ? CONFIG.noResponses : ["Aww, try again 💗"];
    const msg = list[Math.min(state.noCount, list.length - 1)];
    state.noCount++;
    const resp = $("questionResponse");
    resp.classList.remove("is-error");
    resp.textContent = fill(msg);
    const area = $("qaArea"), no = $("noBtn");
    no.classList.remove("shake");
    void no.offsetWidth;
    no.classList.add("shake");
    burst(4, no);
    if (state.noCount <= (CONFIG.noDodgeCount || 0)) dodge(area, no);
    else resetNoPosition();
  }

  function dodge(area, btn) {
    // Take NO out of the flow first, then measure, so we never land on top of YES.
    btn.classList.add("is-dodging");
    const a = area.getBoundingClientRect();
    const y = $("yesBtn").getBoundingClientRect();
    const w = btn.offsetWidth, h = btn.offsetHeight;
    const maxL = Math.max(0, a.width - w), maxT = Math.max(0, a.height - h);
    const pad = 10;
    for (let i = 0; i < 40; i++) {
      const left = Math.round(Math.random() * maxL), top = Math.round(Math.random() * maxT);
      const L = a.left + left, T = a.top + top;
      const overlaps = L < y.right + pad && L + w > y.left - pad && T < y.bottom + pad && T + h > y.top - pad;
      if (!overlaps) { btn.style.left = left + "px"; btn.style.top = top + "px"; return; }
    }
    resetNoPosition(); // no safe spot found: stay put (never block YES)
  }
  function resetNoPosition() {
    const no = $("noBtn");
    no.classList.remove("is-dodging");
    no.style.left = "";
    no.style.top = "";
  }

  /* ---------- Screen 3: code ---------- */
  const normalizeCode = (v) => String(v == null ? "" : v).trim();

  function setCodeMessage(text, isError) {
    const m = $("codeMsg");
    m.textContent = text;
    m.classList.toggle("is-error", !!isError);
  }

  function submitCode(e) {
    if (e) e.preventDefault();
    if (state.unlocking) return;
    const input = $("codeInput");
    const entered = normalizeCode(input.value);
    if (!entered) { setCodeMessage(CONFIG.codeEmptyMessage, true); input.focus(); return; }
    if (entered === normalizeCode(CONFIG.secretCode)) {
      state.unlocking = true;
      $("unlockBtn").disabled = true;
      setCodeMessage("Unlocked! 💖", false);
      $("lock").classList.add("is-open");
      burst(20, $("lock"));
      later(() => { state.unlocking = false; showScreen("surprise"); }, reduceMotion ? 100 : 800);
    } else {
      setCodeMessage(CONFIG.codeWrongMessage, true);
      input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
      input.value = "";
      input.focus();
    }
  }

  function onKeypad(e) {
    const key = e.target.closest("[data-key]");
    if (!key) return;
    const input = $("codeInput");
    const k = key.getAttribute("data-key");
    if (k === "clear") input.value = "";
    else if (k === "back") input.value = input.value.slice(0, -1);
    else if (input.value.length < input.maxLength) input.value += k;
    setCodeMessage("", false);
  }

  /* ---------- Screen 5: audio ---------- */
  const audio = () => $("audio");
  let audioPrepared = false;

  const fmt = (s) => {
    if (!isFinite(s) || s < 0) s = 0;
    return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  };

  function showAudioFallback(text) {
    $("player").hidden = true;
    const fb = $("audioFallback");
    fb.textContent = text;
    fb.hidden = false;
  }

  function prepareAudio() {
    const file = normalizeCode(CONFIG.audioFile);
    if (!file) {
      showAudioFallback("(No audio file added yet. See the README to add a song you have the right to use.)");
      return;
    }
    if (audioPrepared) return;
    audioPrepared = true;
    const a = audio();
    a.preload = "metadata";
    a.src = "assets/" + encodeURIComponent(file).replace(/%2F/g, "/");
    a.load();
  }

  function setPlayingUI(playing) {
    const btn = $("playBtn");
    btn.innerHTML = playing ? "&#10074;&#10074;" : "&#9654;";
    btn.setAttribute("aria-label", playing ? "Pause" : "Play");
    $("vinyl").classList.toggle("is-playing", playing);
    $("eq").classList.toggle("is-playing", playing);
  }

  function pauseAudio() {
    const a = audio();
    if (a && !a.paused) a.pause();
    setPlayingUI(false);
  }

  function togglePlay() {
    const a = audio();
    if (a.paused) {
      const p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => { setPlayingUI(false); showAudioFallback("Couldn't play the audio on this device. You can use the link below instead."); });
      }
    } else {
      a.pause();
    }
  }

  function bindAudio() {
    const a = audio(), seek = $("seek");
    a.addEventListener("loadedmetadata", () => {
      $("player").hidden = false;
      $("audioFallback").hidden = true;
      seek.disabled = false;
      $("timeTotal").textContent = fmt(a.duration);
    });
    a.addEventListener("timeupdate", () => {
      $("timeNow").textContent = fmt(a.currentTime);
      if (a.duration) seek.value = String((a.currentTime / a.duration) * 100);
    });
    a.addEventListener("play", () => setPlayingUI(true));
    a.addEventListener("pause", () => setPlayingUI(false));
    a.addEventListener("ended", () => { setPlayingUI(false); a.currentTime = 0; seek.value = "0"; });
    a.addEventListener("error", () => {
      audioPrepared = false;
      showAudioFallback("(The audio file couldn't be loaded. Check the filename in CONFIG.audioFile.)");
    });
    seek.addEventListener("input", () => { if (a.duration) a.currentTime = (seek.value / 100) * a.duration; });
    $("playBtn").addEventListener("click", togglePlay);
  }

  /* ---------- Screen 6: letter ---------- */
  function renderLetter() {
    const text = String(CONFIG.finalLetter == null ? "" : CONFIG.finalLetter).trim();
    const marker = CONFIG.letterPlaceholderMarker;
    const isPlaceholder = !text || (marker && text.indexOf(marker) !== -1);
    const body = $("letterBody");
    body.textContent = "";
    body.classList.toggle("is-placeholder", !!isPlaceholder);
    const paras = (text || "(The letter is empty.)").split(/\n\s*\n/);
    paras.forEach((p) => {
      const el = document.createElement("p");
      el.setAttribute("dir", "auto"); // Arabic/Hebrew paragraphs read right-to-left automatically
      el.textContent = p; // textContent: never interpreted as HTML; CSS keeps single line breaks
      body.appendChild(el);
    });
    const warn = $("devWarning");
    warn.hidden = !isPlaceholder;
    if (isPlaceholder) warn.textContent = "PREVIEW WARNING: your final letter is still the placeholder. Edit CONFIG.finalLetter in script.js. This note disappears once you replace it.";
    setText("letterSign", [CONFIG.signaturePrefix, CONFIG.senderName].filter(Boolean).join(" "));
  }

  function openLetter() {
    $("letterPaper").hidden = false;
    $("letterOpen").hidden = true;
    $("letterOpen").setAttribute("aria-expanded", "true");
    $("letterNext").hidden = false;
    burst(14, $("letterPaper"));
  }

  /* ---------- Restart ---------- */
  function resetState() {
    clearTimers();
    state.opening = false;
    state.unlocking = false;
    state.transitioning = false;
    state.noCount = 0;
    pauseAudio();
    const a = audio();
    try { a.currentTime = 0; } catch (e) { /* not loaded */ }
    $("seek").value = "0";
    $("timeNow").textContent = "0:00";

    $("envelope").classList.remove("is-open");
    $("openBtn").disabled = false;

    $("yesBtn").disabled = false;
    $("noBtn").hidden = false;
    resetNoPosition();
    $("questionResponse").textContent = "";
    $("questionNext").hidden = true;

    $("codeInput").value = "";
    setCodeMessage("", false);
    $("unlockBtn").disabled = false;
    $("lock").classList.remove("is-open");

    $("letterPaper").hidden = true;
    $("letterOpen").hidden = false;
    $("letterOpen").setAttribute("aria-expanded", "false");
    $("letterNext").hidden = true;
    $("fxLayer").textContent = "";
  }

  function restart() {
    resetState();
    showScreen("welcome", { immediate: true });
  }

  /* ---------- Content + init ---------- */
  function populate() {
    setText("welcomeTitle", fill(CONFIG.welcomeHeading));
    setText("welcomeSub", fill(CONFIG.welcomeSubtitle));
    setText("questionTitle", fill(CONFIG.questionText));
    setText("yesBtn", CONFIG.yesLabel);
    setText("noBtn", CONFIG.noLabel);
    setText("codeHint", CONFIG.secretHint || "");
    setText("surpriseText", fill(CONFIG.unlockedMessage));
    setText("songTitle", CONFIG.songTitle);
    setText("songArtist", CONFIG.songArtist);
    setText("songLine", CONFIG.songLine || "");
    setText("songNote", [CONFIG.musicDescription, CONFIG.lyricExcerpt].filter(Boolean).join("\n"));
    setText("closingText", fill(CONFIG.closingMessage));
    document.title = "A gift for " + (CONFIG.recipientName || "you");

    const link = $("songLink");
    const url = normalizeCode(CONFIG.songLink);
    if (url && /^https?:\/\//i.test(url)) {
      link.href = url;
      link.textContent = CONFIG.songLinkLabel || "Listen ↗";
      link.hidden = false;
    } else {
      link.hidden = true;
    }
    renderLetter();
  }

  function init() {
    applyTheme();
    populate();
    buildBackgroundHearts();
    bindAudio();

    $("openBtn").addEventListener("click", openGift);
    $("yesBtn").addEventListener("click", onYes);
    $("noBtn").addEventListener("click", onNo);
    $("questionNext").addEventListener("click", goNext);
    $("codeForm").addEventListener("submit", submitCode);
    $("keypad").addEventListener("click", onKeypad);
    $("codeInput").addEventListener("input", (e) => {
      const code = normalizeCode(CONFIG.secretCode);
      if (/^\d+$/.test(code)) e.target.value = e.target.value.replace(/\D/g, "");
      setCodeMessage("", false);
    });
    $("letterOpen").addEventListener("click", openLetter);
    $("letterNext").addEventListener("click", goNext);
    $("replayBtn").addEventListener("click", restart);

    // Delegated back/next buttons (one listener, bound once, so restart can't duplicate it).
    $("stage").addEventListener("click", (e) => {
      if (e.target.closest("[data-back]")) goBack();
      else if (e.target.closest("[data-next]")) goNext();
    });

    showScreen("welcome", { immediate: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
