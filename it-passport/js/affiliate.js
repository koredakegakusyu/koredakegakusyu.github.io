/* =============================================================
   コレダケ学習 — おすすめ教材（アフィリエイト枠）
   商品・画像・リンクは自由に差し替え可。
   URL中の tag=YOUR_ASSOCIATE_ID-22 は、ご自身の
   Amazonアソシエイト トラッキングIDに置き換えてください。
   ============================================================= */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      icon: "📘",
      name: "キタミ式イラストIT塾 ITパスポート",
      desc: "図解が豊富な定番の入門テキスト。仕組みからやさしく理解したい人向け。",
      url: "https://www.amazon.co.jp/s?k=キタミ式イラストIT塾+ITパスポート&tag=YOUR_ASSOCIATE_ID-22",
    },
    {
      icon: "📗",
      name: "ITパスポート試験 対策テキスト＆問題集",
      desc: "頻出分野を絞った実戦演習で、直前の総仕上げに。",
      url: "https://www.amazon.co.jp/s?k=ITパスポート試験+対策テキスト+問題集&tag=YOUR_ASSOCIATE_ID-22",
    },
  ];

  function render() {
    var wrap = document.getElementById("affiliate-products");
    if (!wrap) return;
    var html = "";
    PRODUCTS.forEach(function (p) {
      html +=
        '<a class="affiliate-card" href="' + p.url + '" target="_blank" rel="sponsored noopener">' +
        '<span class="affiliate-thumb" aria-hidden="true">' + p.icon + "</span>" +
        '<span class="affiliate-body">' +
        '<span class="affiliate-name">' + p.name + "</span>" +
        '<span class="affiliate-desc">' + p.desc + "</span>" +
        '<span class="affiliate-cta">Amazonで見る ›</span>' +
        "</span></a>";
    });
    wrap.innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
