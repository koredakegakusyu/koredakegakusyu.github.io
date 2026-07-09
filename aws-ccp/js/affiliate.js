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
      name: "AWS認定資格試験テキスト＆問題集 クラウドプラクティショナー",
      desc: "CLF-C02対応。初めてのAWS認定でも迷わず学べる定番教材。",
      url: "https://www.amazon.co.jp/s?k=AWS認定+クラウドプラクティショナー+テキスト&tag=YOUR_ASSOCIATE_ID-22",
    },
    {
      icon: "📗",
      name: "AWS認定クラウドプラクティショナー 実践問題集",
      desc: "本番形式の演習問題で仕上げたい人向けの問題集。",
      url: "https://www.amazon.co.jp/s?k=AWS認定+クラウドプラクティショナー+問題集&tag=YOUR_ASSOCIATE_ID-22",
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
