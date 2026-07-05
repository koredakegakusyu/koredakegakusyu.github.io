/* =============================================================
   コレダケ ネットワーク — 共通フッター部品（全サイト共通・同一ファイル）
   新しい資格サイトを公開したら SITES に1行足すだけ。
   「このサイト」判定は URL のホスト名から自動で行うので、
   このファイルは全サイトへそのままコピーして使い回せる。
   ============================================================= */
(function () {
  "use strict";

  /* ---- 姉妹サイト一覧（ここを編集して増やす。全サイト同一にする） ----
     url が空 or soon:true は「準備中」表示。公開したら url を入れて soon を外す。 */
  var SITES = [
    { name: "コレダケAWS SAA", tag: "AWS認定SAA-C03", url: "https://koredakegakusyu.github.io/aws-saa/" },
    { name: "コレダケITパスポート", tag: "国家試験・iパス", url: "https://koredakegakusyu.github.io/it-passport/" },
    { name: "コレダケ基本情報", tag: "基本情報技術者", url: "https://koredakegakusyu.github.io/kihonjoho/" },
    { name: "コレダケ応用情報", tag: "応用情報技術者", url: "", soon: true },
  ];

  function hostOf(url) {
    try { return new URL(url).hostname; } catch (e) { return ""; }
  }

  function render() {
    var ul = document.getElementById("footer-sites");
    if (ul) {
      var here = location.hostname;
      var html = "";
      SITES.forEach(function (s) {
        var isCurrent = s.url && hostOf(s.url) === here && here !== "";
        if (isCurrent) {
          html +=
            '<li class="fnet-item is-current">' +
            '<span class="fnet-name">' + s.name + "</span>" +
            '<span class="fnet-tag">' + s.tag + "</span>" +
            '<span class="fnet-badge">このサイト</span></li>';
        } else if (s.soon || !s.url) {
          html +=
            '<li class="fnet-item is-soon">' +
            '<span class="fnet-name">' + s.name + "</span>" +
            '<span class="fnet-tag">' + s.tag + "</span>" +
            '<span class="fnet-badge soon">準備中</span></li>';
        } else {
          html +=
            '<li class="fnet-item"><a class="fnet-link" href="' + s.url + '">' +
            '<span class="fnet-name">' + s.name + "</span>" +
            '<span class="fnet-tag">' + s.tag + "</span>" +
            '<span class="fnet-go" aria-hidden="true">›</span></a></li>';
        }
      });
      ul.innerHTML = html;
    }
    var y = document.getElementById("footer-year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
