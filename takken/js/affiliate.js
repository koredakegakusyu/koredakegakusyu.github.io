/* =============================================================
   コレダケ学習 — おすすめ教材（アフィリエイト枠）
   宅建の教材リンクが用意でき次第、PRODUCTS に追加する。
   amazon / rakuten / udemy のリンクを持てる（あるものだけボタン表示）。
   商品が0件のときは枠ごと非表示にする。
   ============================================================= */
(function () {
  "use strict";

  var PRODUCTS = [
    // 例: { icon:"📘", tag:"教科書", name:"...", author:"...", desc:"...", amazon:"...", rakuten:"...", img:"..." }
  ];

  function esc(u) { return String(u).replace(/&/g, "&amp;"); }

  function render() {
    var section = document.querySelector(".affiliate-section");
    var wrap = document.getElementById("affiliate-products");
    if (!wrap) return;
    if (!PRODUCTS.length) { if (section) section.hidden = true; return; }
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
