/* =============================================================
   コレダケ学習 — おすすめ教材（アフィリエイト枠）
   各商品に Amazon / 楽天 の2つのリンクを用意し、好きな方から購入できる。
   商品を差し替えるときは PRODUCTS を編集する。
   ============================================================= */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      img: "https://hbb.afl.rakuten.co.jp/hgb/559afb6f.ebd0b732.559afb70.f3d91611/?me_id=1213310&item_id=21788388&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbook%2Fcabinet%2F8214%2F9784815638214_1_2.jpg%3F_ex%3D128x128&s=128x128&t=picttext",
      name: "【令和8年度】いちばんやさしい 基本情報技術者 絶対合格の教科書＋出る順問題集",
      author: "高橋 京介",
      tag: "科目A対策",
      desc: "やさしい解説と「出る順」問題集がセット。まずは科目Aの土台固めに。",
      amazon: "https://amzn.to/3Tqc1D7",
      rakuten: "https://hb.afl.rakuten.co.jp/ichiba/559afb6f.ebd0b732.559afb70.f3d91611/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18432509%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIxMjh4MTI4IiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    },
    {
      img: "https://hbb.afl.rakuten.co.jp/hgb/559afb6f.ebd0b732.559afb70.f3d91611/?me_id=1213310&item_id=21265310&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbook%2Fcabinet%2F2711%2F9784297142711_1_2.jpg%3F_ex%3D128x128&s=128x128&t=picttext",
      name: "［改訂新版］基本情報技術者【科目B】アルゴリズム×擬似言語トレーニングブック",
      author: "大滝 みや子",
      tag: "科目B対策",
      desc: "難関の科目B（アルゴリズム・擬似言語）をトレーニング形式で徹底対策。",
      amazon: "https://amzn.to/4vlugqO",
      rakuten: "https://hb.afl.rakuten.co.jp/ichiba/559afb6f.ebd0b732.559afb70.f3d91611/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F17871243%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIxMjh4MTI4IiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    },
  ];

  function esc(u) { return String(u).replace(/&/g, "&amp;"); }

  function render() {
    var wrap = document.getElementById("affiliate-products");
    if (!wrap) return;
    var html = "";
    PRODUCTS.forEach(function (p) {
      // 絵文字を背面に置き、書影画像を前面に重ねる。画像が読めなければ onerror で絵文字を表示。
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
