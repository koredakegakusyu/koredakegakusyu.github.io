/* =============================================================
   コレダケ学習 — おすすめ教材（アフィリエイト枠）
   宅建の教材リンクが用意でき次第、PRODUCTS に追加する。
   amazon / rakuten / udemy のリンクを持てる（あるものだけボタン表示）。
   商品が0件のときは枠ごと非表示にする。
   ============================================================= */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      icon: "📘",
      img: "https://hbb.afl.rakuten.co.jp/hgb/559afb6f.ebd0b732.559afb70.f3d91611/?me_id=1213310&item_id=21752266&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbook%2Fcabinet%2F9273%2F9784300119273_1_16.jpg%3F_ex%3D128x128&s=128x128&t=picttext",
      name: "2026年度版 みんなが欲しかった！宅建士の教科書",
      author: "滝澤 ななみ（TAC出版）",
      tag: "教科書",
      desc: "コレダケ学習で論点を固めたら、定番の教科書で全体像と細部を補強。図解で理解した知識の“紙の総まとめ”に。",
      amazon: "https://amzn.to/4w4OR40",
      rakuten: "https://hb.afl.rakuten.co.jp/ichiba/559afb6f.ebd0b732.559afb70.f3d91611/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18387271%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIxMjh4MTI4IiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    },
    {
      icon: "📗",
      img: "https://hbb.afl.rakuten.co.jp/hgb/55af49bd.5678c813.55af49be.ef7a7d81/?me_id=1285657&item_id=13074363&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbookfan%2Fcabinet%2F01174%2Fbk4300119287.jpg%3F_ex%3D128x128&s=128x128&t=picttext",
      name: "2026年度版 みんなが欲しかった！宅建士の論点別過去問題集",
      author: "滝澤 ななみ（TAC出版）",
      tag: "過去問題集",
      desc: "本サイトの論点整理と相性抜群。本物の過去問を分野別に繰り返し解いて、得点力を仕上げたい人に。",
      amazon: "https://www.amazon.co.jp/dp/4300119287?tag=koredakegakus-22",
      rakuten: "https://hb.afl.rakuten.co.jp/ichiba/55af49bd.5678c813.55af49be.ef7a7d81/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbookfan%2Fbk-4300119287%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIxMjh4MTI4IiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    },
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
