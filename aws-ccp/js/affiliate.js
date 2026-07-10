/* =============================================================
   コレダケ学習 — おすすめ教材（アフィリエイト枠）
   Amazon / 楽天 / Udemy のリンクを用意できる（あるものだけボタン表示）。
   img に書影/サムネURLを入れると画像が表示される（無ければ絵文字）。
   ============================================================= */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      icon: "🎓",
      tag: "Udemy 模擬試験講座",
      name: "【CLF-C02版】AWS認定クラウドプラクティショナー 模擬試験問題集",
      author: "",
      desc: "コレダケ学習で基礎を固めたら、本番形式の模擬試験で総仕上げ。合格ラインに届いているかを、試験そっくりの環境で確認できます。",
      udemy: "https://trk.udemy.com/QYG1YY",
    },
  ];

  function esc(u) { return String(u).replace(/&/g, "&amp;"); }

  function render() {
    var wrap = document.getElementById("affiliate-products");
    if (!wrap) return;
    wrap.className = "affiliate-grid" + (PRODUCTS.length === 1 ? " affiliate-grid-single" : "");
    var html = "";
    PRODUCTS.forEach(function (p) {
      var thumb =
        '<span class="affiliate-emoji" aria-hidden="true">' + (p.icon || "📘") + "</span>" +
        (p.img ? '<img src="' + esc(p.img) + '" alt="" loading="lazy" onerror="this.remove()" />' : "");
      var btns = "";
      if (p.amazon) btns += '<a class="affiliate-btn amazon" href="' + esc(p.amazon) + '" target="_blank" rel="sponsored nofollow noopener">Amazonで見る</a>';
      if (p.rakuten) btns += '<a class="affiliate-btn rakuten" href="' + esc(p.rakuten) + '" target="_blank" rel="sponsored nofollow noopener">楽天で見る</a>';
      if (p.udemy) btns += '<a class="affiliate-btn udemy" href="' + esc(p.udemy) + '" target="_blank" rel="sponsored nofollow noopener">Udemyで見る</a>';
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
