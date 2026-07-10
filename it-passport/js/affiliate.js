/* =============================================================
   コレダケ学習 — おすすめ教材（アフィリエイト枠）
   各商品に Amazon / 楽天 のリンクを用意できる（片方だけでも可）。
   img に書影URL（楽天のpicttext画像URL等）を入れると表紙が表示される。
   ============================================================= */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      img: "https://hbb.afl.rakuten.co.jp/hgb/559afb6f.ebd0b732.559afb70.f3d91611/?me_id=1213310&item_id=21788381&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbook%2Fcabinet%2F8207%2F9784815638207_1_2.jpg%3F_ex%3D128x128&s=128x128&t=picttext",
      name: "【令和8年度】いちばんやさしい ITパスポート 絶対合格の教科書＋出る順問題集",
      author: "高橋 京介",
      tag: "教科書＋問題集",
      desc: "コレダケ学習（無料）で図解理解 → この1冊の「出る順」問題集で反復すれば、初学者でも最短で合格圏へ。1冊で教科書と問題集がそろう鉄板書。",
      amazon: "https://amzn.to/4piQyIu",
      rakuten: "https://hb.afl.rakuten.co.jp/ichiba/559afb6f.ebd0b732.559afb70.f3d91611/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18432510%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIxMjh4MTI4IiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    },
  ];

  function esc(u) { return String(u).replace(/&/g, "&amp;"); }

  function render() {
    var wrap = document.getElementById("affiliate-products");
    if (!wrap) return;
    // 商品が1つのときは横長1カラムで大きく見せる
    wrap.className = "affiliate-grid" + (PRODUCTS.length === 1 ? " affiliate-grid-single" : "");
    var html = "";
    PRODUCTS.forEach(function (p) {
      var thumb =
        '<span class="affiliate-emoji" aria-hidden="true">' + (p.icon || "📘") + "</span>" +
        (p.img ? '<img src="' + esc(p.img) + '" alt="" loading="lazy" onerror="this.remove()" />' : "");
      var btns = "";
      if (p.amazon) {
        btns += '<a class="affiliate-btn amazon" href="' + esc(p.amazon) +
          '" target="_blank" rel="sponsored nofollow noopener">Amazonで見る</a>';
      }
      if (p.rakuten) {
        btns += '<a class="affiliate-btn rakuten" href="' + esc(p.rakuten) +
          '" target="_blank" rel="sponsored nofollow noopener">楽天で見る</a>';
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
