/* =============================================================
   コレダケ学習 ネットワーク — 共通フッター部品（全サイト共通・同一ファイル）
   新しい資格サイトを公開したら SITES に1行足すだけ。
   「このサイト」判定は URL のホスト名から自動で行うので、
   このファイルは全サイトへそのままコピーして使い回せる。
   ============================================================= */
(function () {
  "use strict";

  /* ---- 姉妹サイト一覧（ここを編集して増やす。全サイト同一にする） ----
     url が空 or soon:true は「準備中」表示。公開したら url を入れて soon を外す。 */
  var SITES = [
    { name: "コレダケ学習AWS SAA", tag: "AWS認定SAA-C03", url: "https://koredakegakusyu.github.io/aws-saa/" },
    { name: "コレダケ学習AWS CCP", tag: "AWS認定CLF-C02", url: "https://koredakegakusyu.github.io/aws-ccp/" },
    { name: "コレダケ学習ITパスポート", tag: "国家試験・iパス", url: "https://koredakegakusyu.github.io/it-passport/" },
    { name: "コレダケ学習基本情報", tag: "基本情報技術者", url: "https://koredakegakusyu.github.io/kihonjoho/" },
    { name: "コレダケ学習応用情報", tag: "応用情報技術者", url: "", soon: true },
  ];

  /* 同一ドメイン配下にサブフォルダで複数サイトを置く構成（例: GitHub Pagesの
     koredakegakusyu.github.io/aws-saa/ 等）では、ホスト名だけでは全サイトが
     一致してしまう。ホスト名に加え、パスの一致（ルート運用なら完全一致、
     サブフォルダ運用なら前方一致）まで見て「このサイト」かどうかを判定する。 */
  function isCurrentSite(url) {
    try {
      var u = new URL(url);
      if (u.hostname !== location.hostname) return false;
      var targetPath = u.pathname.replace(/\/?$/, "/");
      var herePath = location.pathname.replace(/\/?$/, "/");
      if (targetPath === "/") return herePath === "/";
      return herePath.indexOf(targetPath) === 0;
    } catch (e) {
      return false;
    }
  }

  function render() {
    var ul = document.getElementById("footer-sites");
    if (ul) {
      var html = "";
      SITES.forEach(function (s) {
        var isCurrent = !!s.url && isCurrentSite(s.url);
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
