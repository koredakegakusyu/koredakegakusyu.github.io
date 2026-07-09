/* =============================================================
   コレダケ学習 — おすすめ教材（アフィリエイト枠）
   各商品に Amazon / 楽天 のリンクを用意できる（片方だけでも可）。
   下の amazon / rakuten を、ご自身のアフィリエイトリンクに置き換える。
   img に書影URL（楽天のpicttext画像URL等）を入れると表紙が表示される。
   ============================================================= */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      icon: "📘",
      tag: "テキスト",
      name: "キタミ式イラストIT塾 ITパスポート",
      author: "",
      desc: "図解が豊富な定番の入門テキスト。仕組みからやさしく理解したい人向け。",
      amazon: "https://www.amazon.co.jp/s?k=キタミ式イラストIT塾+ITパスポート&tag=YOUR_ASSOCIATE_ID-22",
      rakuten: "",
    },
    {
      icon: "📗",
      tag: "問題集",
      name: "ITパスポート試験 対策テキスト＆問題集",
      author: "",
      desc: "頻出分野を絞った実戦演習で、直前の総仕上げに。",
      amazon: "https://www.amazon.co.jp/s?k=ITパスポート試験+対策テキスト+問題集&tag=YOUR_ASSOCIATE_ID-22",
      rakuten: "",
    },
  ];

  function esc(u) { return String(u).replace(/&/g, "&amp;"); }

  function render() {
    var wrap = document.getElementById("affiliate-products");
    if (!wrap) return;
    var html = "";
    PRODUCTS.forEach(function (p) {
      var thumb =
        '<span class="affiliate-emoji" aria-hidden="true">' + (p.icon || "📘") + "</span>" +
        (p.img ? '<img src="' + esc(p.img) + '" alt="" loading="lazy" onerror="this.remove()" />' : "");
      var btns = "";
      if (p.amazon) {
        btns += '<a class="affiliate-btn amazon" href="' + esc(p.amazon) +
          '" target="_blank" rel="sponsored nofollow noopener">Amazon</a>';
      }
      if (p.rakuten) {
        btns += '<a class="affiliate-btn rakuten" href="' + esc(p.rakuten) +
          '" target="_blank" rel="sponsored nofollow noopener">楽天</a>';
      }
      html +=
        '<div class="affiliate-card">' +
        '<div class="affiliate-thumb">' + thumb + "</div>" +
        '<div class="affiliate-body">' +
        (p.tag ? '<span class="affiliate-cat">' + p.tag + "</span>" : "") +
        '<span class="affiliate-name">' + p.name + "</span>" +
        (p.author ? '<span class="affiliate-author">' + p.author + "</span>" : "") +
        (p.desc ? '<span class="affiliate-desc">' + p.desc + "</span>" : "") +
        '<div class="affiliate-btns">' + btns + "</div>" +
        "</div></div>";
    });
    wrap.innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
