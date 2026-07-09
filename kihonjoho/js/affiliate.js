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
      name: "キタミ式イラストIT塾 基本情報技術者",
      desc: "図解が豊富な定番の入門テキスト。仕組みからやさしく理解したい人向け。",
      url: "https://www.amazon.co.jp/s?k=キタミ式イラストIT塾+基本情報技術者&tag=YOUR_ASSOCIATE_ID-22",
    },
    {
      icon: "📗",
      name: "出るとこだけ！基本情報技術者［科目B］",
      desc: "科目Bの擬似言語・アルゴリズムに特化した問題演習書。",
      url: "https://www.amazon.co.jp/s?k=出るとこだけ+基本情報技術者+科目B&tag=YOUR_ASSOCIATE_ID-22",
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
