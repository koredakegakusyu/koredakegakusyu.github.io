/* =============================================================
   SAA Forge — アプリ本体
   ナビ生成 / ハッシュルーティング / フラッシュカード / クイズ採点
   （進捗ゲーミフィケーションは持たない。落ち着いた学習ツールに徹する）
   ============================================================= */
(function () {
  "use strict";

  var DATA = window.CURRICULUM || [];
  var moduleById = {};
  DATA.forEach(function (m) { moduleById[m.id] = m; });
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 頻出度（★） ---------- */
  var FREQ = window.FREQ || {};
  function freqLevel(id) { return FREQ[id] || 2; }
  function freqStars(id) {
    var n = freqLevel(id);
    var label = n >= 3 ? "頻出（必ず得点したい）" : (n === 2 ? "標準" : "出題は少なめ");
    var stars = "★★★".slice(0, n) + "☆☆☆".slice(0, 3 - n);
    return '<span class="freq freq-' + n + '" title="頻出度：' + label + '" aria-label="頻出度' + n + '">' + stars + "</span>";
  }

  /* ---------- サイドバー生成 ---------- */
  function buildNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var order = [];
    var groups = {};
    DATA.forEach(function (m) {
      if (!groups[m.domain]) { groups[m.domain] = []; order.push(m.domain); }
      groups[m.domain].push(m);
    });
    var html = '<a class="nav-link nav-special" data-id="compare" href="#compare"><span class="nav-icon" aria-hidden="true">🗂</span><span>サービス早見表</span></a>';
    order.forEach(function (domain) {
      html += '<div class="nav-domain">' + domain + "</div>";
      groups[domain].forEach(function (m) {
        html +=
          '<a class="nav-link" data-id="' + m.id + '" href="#' + m.id + '">' +
          '<span class="nav-icon" aria-hidden="true">' + m.icon + "</span>" +
          '<span class="nav-title">' + m.title + "</span>" +
          freqStars(m.id) + "</a>";
      });
    });
    nav.innerHTML = html;
  }

  /* ---------- カリキュラム一覧生成 ---------- */
  function buildDashboard() {
    var dash = document.getElementById("dashboard");
    if (!dash) return;
    var html = "";
    DATA.forEach(function (m, i) {
      html +=
        '<a class="dash-card" data-id="' + m.id + '" href="#' + m.id + '">' +
        '<span class="dc-no">' + (i + 1) + "</span>" +
        '<div class="dc-icon" aria-hidden="true">' + m.icon + "</div>" +
        '<div class="dc-domain">' + m.domain + "</div>" +
        '<div class="dc-title">' + m.title + "</div>" +
        '<div class="dc-freq">' + freqStars(m.id) + "</div></a>";
    });
    dash.innerHTML = html;
  }

  /* ---------- 科目ビュー生成 ---------- */
  function renderModule(m) {
    var idx = DATA.indexOf(m);
    var next = DATA[idx + 1];
    var prev = DATA[idx - 1];

    var html = "";
    html += '<div class="module-header">';
    html += '<div class="crumb"><a href="#home" data-nav>ホーム</a> ／ ' + m.domain + "</div>";
    html += '<span class="module-domain">' + m.icon + " " + m.domain + "</span>";
    html += '<h1 class="module-title">' + m.title + "</h1>";
    html += '<div class="module-freq">頻出度 ' + freqStars(m.id) + "</div>";
    html += '<p class="module-intro">' + m.intro + "</p>";
    html += "</div>";

    // 理解
    html += '<section class="sec sec-understand">';
    html += '<div class="sec-head"><span class="sec-badge" aria-hidden="true">◐</span><div><h2>理解する</h2><div class="sec-tag">仕組みと選定理由を図解で（青）</div></div></div>';
    m.understand.forEach(function (u) {
      html += '<div class="concept"><h3>' + u.h + "</h3>" + u.body;
      if (u.diagram) {
        html += '<div class="diagram">' + u.diagram +
          (u.cap ? '<div class="diagram-cap">' + u.cap + "</div>" : "") + "</div>";
      }
      html += "</div>";
    });
    html += "</section>";

    // 暗記
    html += '<section class="sec sec-memorize">';
    html += '<div class="sec-head"><span class="sec-badge" aria-hidden="true">◆</span><div><h2>要点を暗記する</h2><div class="sec-tag">覚えるしかない要点だけ（橙）</div></div></div>';
    html += '<div class="memo-grid">';
    m.memorize.forEach(function (mm) {
      html += '<div class="memo"><div class="memo-key">' + mm.k + '</div><div class="memo-val">' + mm.v + "</div></div>";
    });
    html += "</div></section>";

    // フラッシュカード
    html += '<section class="sec sec-cards">';
    html += '<div class="sec-head"><span class="sec-badge" aria-hidden="true">▤</span><div><h2>フラッシュカード</h2><div class="sec-tag">クリックで答え。左右で移動</div></div></div>';
    html += '<div class="flash-wrap" data-flash="' + m.id + '">';
    html += '<div class="flash-toolbar"><span class="flash-counter"><span class="fc-cur">1</span> / ' + m.flashcards.length + "</span></div>";
    html += '<div class="flashcard" tabindex="0" role="button" aria-label="クリックで答えを表示">';
    html += '<div class="flashcard-inner">';
    html += '<div class="flash-face flash-front"><span class="flash-side">Q</span><div class="flash-q"></div><span class="flash-hint">クリックで答えを見る</span></div>';
    html += '<div class="flash-face flash-back"><span class="flash-side">A</span><div class="flash-a"></div><span class="flash-hint">クリックで問題に戻る</span></div>';
    html += "</div></div>";
    html += '<div class="flash-nav"><button class="flash-btn fb-prev" type="button" aria-label="前のカード">‹</button><button class="flash-btn fb-next" type="button" aria-label="次のカード">›</button></div>';
    html += "</div></section>";

    // 確認テスト（本番想定）
    html += '<section class="sec sec-test">';
    html += '<div class="sec-head"><span class="sec-badge" aria-hidden="true">◇</span><div><h2>確認テスト（本番型）</h2><div class="sec-tag">選ぶと即採点＋解説</div></div></div>';
    html += '<div class="quiz" data-quiz="' + m.id + '">';
    m.quiz.forEach(function (q, qi) {
      html += '<div class="q-card" data-qi="' + qi + '">';
      html += '<div class="q-num">問 ' + (qi + 1) + "</div>";
      html += '<div class="q-text">' + q.q + "</div>";
      html += '<div class="q-choices">';
      q.choices.forEach(function (c, ci) {
        var mark = String.fromCharCode(65 + ci);
        html += '<button class="q-choice" type="button" data-ci="' + ci + '"><span class="q-mark">' + mark + '</span><span>' + c + "</span></button>";
      });
      html += "</div>";
      html += '<div class="q-explain"></div>';
      html += "</div>";
    });
    html += "</div></section>";

    // フッター（前後の科目へ）
    html += '<div class="module-foot">';
    html += prev ? '<a class="foot-link" href="#' + prev.id + '">← ' + prev.title + "</a>" : '<a class="foot-link" href="#home" data-nav>← ホーム</a>';
    html += next ? '<a class="foot-link" href="#' + next.id + '">' + next.title + " →</a>" : '<a class="foot-link" href="#home" data-nav>ホームへ戻る →</a>';
    html += "</div>";

    var view = document.getElementById("view-module");
    view.innerHTML = html;

    attachFlashcards(view, m);
    attachQuiz(view);
  }

  /* ---------- フラッシュカード ---------- */
  function attachFlashcards(scope, m) {
    var wrap = scope.querySelector('[data-flash="' + m.id + '"]');
    if (!wrap) return;
    var cards = m.flashcards;
    var i = 0;
    var card = wrap.querySelector(".flashcard");
    var qEl = wrap.querySelector(".flash-q");
    var aEl = wrap.querySelector(".flash-a");
    var curEl = wrap.querySelector(".fc-cur");

    function show() {
      card.classList.remove("flipped");
      qEl.textContent = cards[i].q;
      aEl.textContent = cards[i].a;
      curEl.textContent = String(i + 1);
    }
    function flip() { card.classList.toggle("flipped"); }
    card.addEventListener("click", flip);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
    wrap.querySelector(".fb-prev").addEventListener("click", function () {
      i = (i - 1 + cards.length) % cards.length; show();
    });
    wrap.querySelector(".fb-next").addEventListener("click", function () {
      i = (i + 1) % cards.length; show();
    });
    show();
  }

  /* ---------- クイズ採点 ---------- */
  function attachQuiz(scope) {
    scope.querySelectorAll("[data-quiz]").forEach(function (quiz) {
      var m = moduleById[quiz.getAttribute("data-quiz")];
      quiz.querySelectorAll(".q-card").forEach(function (qc) {
        var qi = parseInt(qc.getAttribute("data-qi"), 10);
        var q = m.quiz[qi];
        var answered = false;
        var choices = qc.querySelectorAll(".q-choice");
        var explain = qc.querySelector(".q-explain");
        choices.forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (answered) return;
            answered = true;
            var ci = parseInt(btn.getAttribute("data-ci"), 10);
            choices.forEach(function (b) { b.disabled = true; });
            choices[q.answer].classList.add("correct");
            var ok = ci === q.answer;
            if (!ok) btn.classList.add("wrong");
            var verdict = ok
              ? '<span class="q-verdict ok">正解</span>'
              : '<span class="q-verdict ng">不正解</span>正解は ' + String.fromCharCode(65 + q.answer) + "。";
            explain.innerHTML = verdict + " " + q.explain;
            explain.classList.add("show");
          });
        });
      });
    });
  }

  /* ---------- ルーティング ---------- */
  var viewHome = document.getElementById("view-home");
  var viewModule = document.getElementById("view-module");

  function setActiveNav(id) {
    document.querySelectorAll(".nav-link").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-id") === id);
    });
  }

  function showHome(scrollToId) {
    viewModule.hidden = true;
    viewHome.hidden = false;
    setActiveNav(null);
    if (scrollToId) {
      var t = document.getElementById(scrollToId);
      if (t) t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  function showModule(m) {
    viewHome.hidden = true;
    viewModule.hidden = false;
    renderModule(m);
    setActiveNav(m.id);
    window.scrollTo({ top: 0, behavior: "auto" });
    closeSidebar();
    document.title = m.title + " | コレダケ学習AWS CCP";
  }

  /* ---------- サービス早見表 ---------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function showCompare() {
    viewHome.hidden = true;
    viewModule.hidden = false;
    renderCompare();
    setActiveNav("compare");
    window.scrollTo({ top: 0, behavior: "auto" });
    closeSidebar();
    document.title = "サービス早見表 | コレダケ学習AWS CCP";
  }

  function renderCompare() {
    var rows = window.COMPARE || [];
    var versus = window.VERSUS || [];
    var cats = [];
    rows.forEach(function (r) { if (cats.indexOf(r.cat) === -1) cats.push(r.cat); });

    var html = "";
    html += '<div class="cmp-head"><div class="crumb"><a href="#home" data-nav>ホーム</a> ／ 早見表</div>';
    html += "<h1>🗂 サービス早見表</h1>";
    html += "<p>全" + rows.length + "サービスを一覧。検索とカテゴリで絞り込み、<strong>サービス名をクリックすると解説ページへ移動</strong>します。下部に「紛らわしいペアの決め手」も。</p></div>";

    html += '<div class="cmp-toolbar"><input type="search" class="cmp-search" id="cmp-search" placeholder="🔍 検索（例: 暗号化 / 低遅延 / キャッシュ / 移行）" aria-label="サービスを検索"><span class="cmp-count" id="cmp-count"></span></div>';
    html += '<div class="cmp-chips" id="cmp-chips"><button class="cmp-chip active" data-cat="all">すべて</button>';
    cats.forEach(function (c) { html += '<button class="cmp-chip" data-cat="' + esc(c) + '">' + esc(c) + "</button>"; });
    html += "</div>";

    html += '<div class="cmp-wrap"><table class="cmp-table"><thead><tr><th>サービス</th><th>役割（一言）</th><th>こう来たら選ぶ</th><th>要点・ひっかけ</th></tr></thead><tbody id="cmp-body">';
    var links = window.COMPARE_LINK || {};
    rows.forEach(function (r) {
      var text = (r.n + " " + r.role + " " + r.sig + " " + r.key + " " + r.cat).toLowerCase();
      var link = links[r.n] || "";
      var nameCell = link
        ? '<a class="c-name" href="#' + esc(link) + '">' + esc(r.n) + '<span class="c-go" aria-hidden="true"> ›</span></a>'
        : '<div class="c-name">' + esc(r.n) + "</div>";
      html += '<tr data-cat="' + esc(r.cat) + '" data-text="' + esc(text) + '" data-link="' + esc(link) + '">';
      html += '<td data-label="サービス">' + nameCell + '<span class="cmp-catbadge">' + esc(r.cat) + "</span></td>";
      html += '<td data-label="役割">' + esc(r.role) + "</td>";
      html += '<td data-label="合図">' + esc(r.sig) + "</td>";
      html += '<td data-label="要点" class="c-key">' + esc(r.key) + "</td>";
      html += "</tr>";
    });
    html += '</tbody></table><div class="cmp-empty" id="cmp-empty" style="display:none">該当するサービスがありません</div></div>';

    html += '<section class="sec sec-cards" style="margin-top:3rem"><div class="sec-head"><span class="sec-badge" aria-hidden="true">⚖️</span><div><h2>紛らわしいペアの決め手</h2><div class="sec-tag">試験で迷いやすい比較を一行で</div></div></div>';
    html += '<div class="versus-grid">';
    versus.forEach(function (v) {
      html += '<div class="versus-card"><h3>' + esc(v.q) + "</h3>";
      v.items.forEach(function (it) {
        html += '<div class="versus-opt"><span class="vo-n">' + esc(it.n) + '</span><span class="vo-w">' + esc(it.w) + "</span></div>";
      });
      html += '<div class="versus-tip">決め手: ' + esc(v.tip) + "</div></div>";
    });
    html += "</div></section>";

    viewModule.innerHTML = html;
    attachCompare();
  }

  /* ---------- お問い合わせ ---------- */
  function showContact() {
    viewHome.hidden = true;
    viewModule.hidden = false;
    renderContact();
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: "auto" });
    closeSidebar();
    document.title = "お問い合わせ | コレダケ学習AWS CCP";
  }

  function renderContact() {
    var mail = "koredakegakusyu@gmail.com";
    var html = '<div class="cmp-head"><div class="crumb"><a href="#home" data-nav>ホーム</a> ／ お問い合わせ</div>';
    html += "<h1>✉️ お問い合わせ</h1>";
    html += "<p>内容の誤り・ご要望・ご感想など、お気軽にご連絡ください。コレダケ学習シリーズ共通の窓口です。</p></div>";
    html += '<div class="feature-grid"><div class="feature-card"><h3>メールでのお問い合わせ</h3>' +
      '<p><a href="mailto:' + mail + '">' + mail + "</a></p>" +
      "<p>上記アドレス宛にメールをお送りください。内容確認のうえ対応いたします（返信をお約束するものではありません）。</p></div></div>";
    viewModule.innerHTML = html;
  }

  function attachCompare() {
    var search = document.getElementById("cmp-search");
    var body = document.getElementById("cmp-body");
    var count = document.getElementById("cmp-count");
    var empty = document.getElementById("cmp-empty");
    var chips = document.getElementById("cmp-chips");
    if (!body) return;
    var rows = Array.prototype.slice.call(body.querySelectorAll("tr"));
    var activeCat = "all";
    function apply() {
      var q = (search.value || "").trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (tr) {
        var okCat = activeCat === "all" || tr.getAttribute("data-cat") === activeCat;
        var okText = !q || tr.getAttribute("data-text").indexOf(q) !== -1;
        var show = okCat && okText;
        tr.style.display = show ? "" : "none";
        if (show) shown++;
      });
      count.textContent = shown + " / " + rows.length + " 件";
      empty.style.display = shown ? "none" : "block";
    }
    search.addEventListener("input", apply);
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".cmp-chip");
      if (!b) return;
      activeCat = b.getAttribute("data-cat");
      chips.querySelectorAll(".cmp-chip").forEach(function (c) { c.classList.toggle("active", c === b); });
      apply();
    });
    // 行クリックで解説ページへ（サービス名リンク以外の場所をクリックしても飛ぶ）
    body.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      var tr = e.target.closest("tr");
      if (!tr) return;
      var link = tr.getAttribute("data-link");
      if (link) location.hash = "#" + link;
    });
    apply();
  }

  function route() {
    var hash = (location.hash || "").replace("#", "");
    if (hash === "compare") {
      showCompare();
    } else if (hash === "contact") {
      showContact();
    } else if (moduleById[hash]) {
      showModule(moduleById[hash]);
    } else {
      document.title = "コレダケ学習AWS CCP｜完全無料でCLF-C02に合格する図解学習サイト";
      showHome(hash === "how" || hash === "curriculum" ? hash : null);
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------- モバイルメニュー ---------- */
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("sidebar-overlay");
  var menuBtn = document.getElementById("menu-btn");
  function openSidebar() {
    sidebar.classList.add("open");
    overlay.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
  }
  function closeSidebar() {
    if (!sidebar.classList.contains("open")) return;
    sidebar.classList.remove("open");
    overlay.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn) menuBtn.addEventListener("click", function () {
    if (sidebar.classList.contains("open")) closeSidebar(); else openSidebar();
  });
  if (overlay) overlay.addEventListener("click", closeSidebar);
  if (sidebar) sidebar.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeSidebar();
  });

  /* ---------- to-top ---------- */
  var toTop = document.getElementById("to-top");
  window.addEventListener("scroll", function () {
    if (toTop) toTop.hidden = window.scrollY < 500;
  });
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- ヒーロー統計（動的） ---------- */
  function fillStats() {
    var q = 0, c = 0;
    DATA.forEach(function (m) { q += (m.quiz || []).length; c += (m.flashcards || []).length; });
    var sm = document.getElementById("stat-modules");
    var sq = document.getElementById("stat-questions");
    var sc = document.getElementById("stat-cards");
    if (sm) sm.textContent = String(DATA.length);
    if (sq) sq.textContent = String(q);
    if (sc) sc.textContent = String(c);
  }

  /* ---------- 初期化 ---------- */
  fillStats();
  buildNav();
  buildDashboard();
  route();
})();
