/* =============================================================
   コレダケITパスポート カリキュラム — 08 データベース（テクノロジ系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "db-kiso", domain: "データベース", icon: "🗄️", title: "データベースの基礎とSQL",
    intro: "関係データベース、E-R図、正規化、SQLの基本。表の考え方をしっかり理解する。",
    understand: [
      {
        h: "関係データベースとDBMS",
        body: "<p>大量のデータを整理して保管・検索するのが<strong>データベース</strong>。最も一般的なのが<strong>関係データベース（RDB）</strong>で、データを<strong>表（テーブル）</strong>の形（行＝レコード、列＝フィールド）で管理する。データベースを管理する専用ソフトが<strong>DBMS</strong>で、複数人の同時利用、障害からの回復、アクセス権の管理などを担う。</p><p>各行を一意に識別する列が<strong>主キー</strong>（重複・空欄は不可）。別の表の主キーを参照して表同士をつなぐ列が<strong>外部キー</strong>。表と表の関係（1対多など）を図にしたのが<strong>E-R図</strong>で、設計段階でデータの構造を整理するのに使う。</p>",
      },
      {
        h: "正規化——重複をなくして矛盾を防ぐ",
        body: "<p>1つの表に情報を詰め込みすぎると、同じデータが何度も現れ（重複）、更新漏れで<strong>矛盾</strong>が起きる。これを防ぐため表を適切に分割するのが<strong>正規化</strong>。段階的に、繰り返し項目をなくす<strong>第1正規形</strong>、主キーの一部にだけ依存する項目を分ける<strong>第2正規形</strong>、主キー以外への依存を分ける<strong>第3正規形</strong>と進める。正規化すると重複が減り更新の矛盾を防げる（一方、表が分かれるので検索時に結合が増える）。</p>",
        diagram:
          '<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          (function () {
            function table(x, y, title, tcolor, rows) {
              var w = 190, rh = 26, s = "";
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="26" rx="6" fill="' + tcolor + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 18) + '" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">' + title + "</text>";
              rows.forEach(function (r, i) {
                var ry = y + 26 + i * rh;
                var fill = i === 0 ? "#eef4f9" : "#ffffff";
                s += '<rect x="' + x + '" y="' + ry + '" width="' + w + '" height="' + rh + '" fill="' + fill + '" stroke="#d7d0c0"/>';
                s += '<text x="' + (x + 12) + '" y="' + (ry + 17) + '" fill="' + (r.c || "#23252b") + '" font-size="11" font-weight="' + (r.b ? "700" : "400") + '">' + r.t + "</text>";
              });
              return s;
            }
            var s = "";
            s += table(40, 34, "社員表", "#4a7fa8", [
              { t: "社員番号  主キー", b: true },
              { t: "氏名" },
              { t: "部門コード  外部キー", b: true, c: "#2f6d97" },
            ]);
            s += table(370, 34, "部門表", "#5c9160", [
              { t: "部門コード  主キー", b: true, c: "#366b3c" },
              { t: "部門名" },
              { t: "所在地" },
            ]);
            s += '<path d="M230 125 C 300 125, 300 73, 370 73" fill="none" stroke="#a85733" stroke-width="2"/>';
            s += '<polygon points="370,73 359,68 360,79" fill="#a85733"/>';
            s += '<text x="300" y="106" fill="#a85733" font-size="11" font-weight="700" text-anchor="middle">参照</text>';
            return s;
          })() +
          '<text x="300" y="206" fill="#6b6e76" font-size="11" text-anchor="middle">社員表の「部門コード」（外部キー）が、部門表の「部門コード」（主キー）を指す</text>' +
          "</svg>",
        cap: "主キーで各行を識別し、外部キーで別の表を参照して2つの表をつなぐ。",
      },
      {
        h: "SQL——データを操作する言語",
        body: "<p>データベースを操作する言語が<strong>SQL</strong>。データを取り出す<strong>SELECT</strong>、条件を指定する<strong>WHERE</strong>、並べ替える<strong>ORDER BY</strong>、集計する<strong>GROUP BY</strong>、追加・更新・削除の<strong>INSERT / UPDATE / DELETE</strong>が基本。iパスでは複雑な文法より、『どの命令が何をするか』『表から条件に合う行を選ぶ』といった意味の理解が問われる。</p>",
      },
    ],
    memorize: [
      { k: "主キー", v: "行を一意に識別する列。重複・空値(NULL)は不可。" },
      { k: "外部キー", v: "他の表の主キーを参照し、表同士を関連づける列。" },
      { k: "E-R図", v: "エンティティ（実体）間の関連（1対多など）を表す設計図。" },
      { k: "正規化", v: "表を分割し重複を排除、更新時の矛盾を防ぐ。第1〜第3正規形。" },
      { k: "DBMS", v: "データベース管理システム。同時実行制御・障害回復・権限管理。" },
      { k: "SELECT / WHERE", v: "SELECT=データ抽出、WHERE=条件指定。" },
    ],
    flashcards: [
      { q: "主キーの条件は？", a: "各行を一意に識別できること。値の重複や空値（NULL）は許されない。" },
      { q: "外部キーの役割は？", a: "他の表の主キーを参照し、表と表を関連づける。" },
      { q: "正規化の目的は？", a: "データの重複を排除し、更新時の矛盾（不整合）を防ぐこと。" },
      { q: "SQLでデータを抽出する命令と、条件を指定する句は？", a: "SELECT（抽出）とWHERE（条件指定）。" },
      { q: "エンティティ間の関連を表す設計図を何という？", a: "E-R図。" },
    ],
    quiz: [
      {
        q: "関係データベースにおいて、表の各行（レコード）を一意に識別するために設定する列はどれか。",
        choices: ["外部キー", "主キー", "インデックス", "ビュー"],
        answer: 1,
        explain: "行を一意に識別するのは<strong>主キー</strong>。重複・NULLは不可。他表を参照するのは外部キー。",
      },
      {
        q: "データベースの正規化を行う主な目的はどれか。",
        choices: [
          "検索速度を必ず向上させるため",
          "データの重複を排除し、更新時の矛盾を防ぐため",
          "表の数を1つにまとめるため",
          "データを暗号化するため",
        ],
        answer: 1,
        explain: "正規化の目的は<strong>重複排除と更新矛盾の防止</strong>。表は分割される（検索は結合が増えることも）。",
      },
      {
        q: "SQLにおいて、表から特定の条件を満たす行だけを取り出すために用いる句はどれか。",
        choices: ["ORDER BY", "GROUP BY", "WHERE", "INSERT"],
        answer: 2,
        explain: "条件を指定して行を絞り込むのは<strong>WHERE</strong>句。",
      },
      {
        q: "ある表の列が、別の表の主キーを参照して2つの表を関連づけている。この列を何と呼ぶか。",
        choices: ["主キー", "外部キー", "候補キー", "スーパーキー"],
        answer: 1,
        explain: "他表の主キーを参照して関連づける列は<strong>外部キー</strong>。",
      },
    ],
  },
  {
    id: "db-transaction", domain: "データベース", icon: "🔐", title: "トランザクションと障害回復",
    intro: "同時アクセスの制御（排他制御）、ACID特性、障害からの回復。DBの信頼性を支える仕組み。",
    understand: [
      {
        h: "トランザクションとACID特性",
        body: "<p>『銀行の振込（引き落とし＋入金）』のように、<strong>まとめて完了させるべき一連の処理</strong>が<strong>トランザクション</strong>。途中で失敗したら全部なかったことにする必要がある。信頼できるトランザクションが満たすべき性質が<strong>ACID</strong>——<strong>原子性（Atomicity：全部成功か全部取消）・一貫性（Consistency）・独立性（Isolation：同時実行でも互いに干渉しない）・耐久性（Durability：完了後は障害でも失われない）</strong>。正常終了で確定するのが<strong>コミット</strong>、失敗して取り消すのが<strong>ロールバック</strong>だ。</p>",
      },
      {
        h: "排他制御とデッドロック",
        body: "<p>複数の人が同時に同じデータを更新すると矛盾が起きる。これを防ぐのが<strong>排他制御（ロック）</strong>——誰かが更新中のデータに<strong>鍵をかけ</strong>、他の人を待たせる。ただし、AさんがXをロックしてYを待ち、BさんがYをロックしてXを待つと、下の図のように互いに永遠に待ち合う<strong>デッドロック（膠着状態）</strong>が起きる。DBMSはこれを検出して一方を強制終了するなどで解消する。</p><p>障害でデータが壊れても復旧できるよう、DBMSは変更の記録（<strong>ログ／ジャーナル</strong>）を残す。完了済みの処理をログから再実行して復旧するのが<strong>ロールフォワード</strong>、未完了の処理を取り消すのが<strong>ロールバック</strong>だ。</p>",
        diagram:
          '<svg viewBox="0 0 560 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">デッドロック（互いに待ち合う）</text>' +
          '<rect x="28" y="82" width="120" height="44" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="88" y="109" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">トランザクションA</text>' +
          '<rect x="412" y="82" width="120" height="44" rx="8" fill="#f3ddcd" stroke="#c1855c"/><text x="472" y="109" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">トランザクションB</text>' +
          '<rect x="225" y="30" width="110" height="36" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="280" y="53" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">データX</text>' +
          '<rect x="225" y="138" width="110" height="36" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="280" y="161" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">データY</text>' +
          '<line x1="148" y1="92" x2="222" y2="56" stroke="#5c9160" stroke-width="2"/><polygon points="222,56 210,55 216,65" fill="#5c9160"/>' +
          '<text x="150" y="72" fill="#3f7a45" font-size="9.5" font-weight="700">Xをロック中</text>' +
          '<line x1="148" y1="116" x2="222" y2="150" stroke="#c26b4a" stroke-width="2" stroke-dasharray="5 3"/><polygon points="222,150 210,146 214,157" fill="#c26b4a"/>' +
          '<text x="150" y="140" fill="#b0532f" font-size="9.5" font-weight="700">Yを待つ</text>' +
          '<line x1="412" y1="116" x2="338" y2="150" stroke="#5c9160" stroke-width="2"/><polygon points="338,150 350,146 346,157" fill="#5c9160"/>' +
          '<text x="410" y="140" fill="#3f7a45" font-size="9.5" font-weight="700" text-anchor="end">Yをロック中</text>' +
          '<line x1="412" y1="92" x2="338" y2="56" stroke="#c26b4a" stroke-width="2" stroke-dasharray="5 3"/><polygon points="338,56 350,55 344,65" fill="#c26b4a"/>' +
          '<text x="410" y="72" fill="#b0532f" font-size="9.5" font-weight="700" text-anchor="end">Xを待つ</text>' +
          '<text x="280" y="196" fill="#6b6e76" font-size="10.5" text-anchor="middle">AはB保有のYを、BはA保有のXを待ち、互いに進めない＝デッドロック（緑=ロック中／赤=待ち）</text>' +
          "</svg>",
        cap: "AがX・BがYをロックし、互いに相手のロックを待ち合う循環が生じると処理が進まない＝デッドロック。",
      },
    ],
    memorize: [
      { k: "トランザクション", v: "分けられない一連の処理。全部成功か、全部取消。" },
      { k: "ACID", v: "原子性・一貫性・独立性・耐久性。信頼できるトランザクションの条件。" },
      { k: "コミット / ロールバック", v: "コミット=確定。ロールバック=取り消して元に戻す。" },
      { k: "排他制御(ロック)", v: "同時更新の矛盾を防ぐ。更新中データに鍵をかけ他を待たせる。" },
      { k: "デッドロック", v: "互いに相手のロック解除を待ち合い処理が進まない状態。" },
      { k: "ロールフォワード", v: "ログを使い完了済み処理を再実行して障害から復旧。" },
    ],
    flashcards: [
      { q: "トランザクションの原子性（Atomicity）とは？", a: "処理を全部成功させるか、全部なかったことにするか（中途半端を許さない）。" },
      { q: "ACID特性の4つは？", a: "原子性・一貫性・独立性・耐久性。" },
      { q: "コミットとロールバックの違いは？", a: "コミットは処理を確定、ロールバックは処理を取り消して元に戻す。" },
      { q: "デッドロックとは？", a: "複数の処理が互いに相手のロック解除を待ち合い、どちらも進めなくなる状態。" },
      { q: "同時更新による矛盾を防ぐ仕組みは？", a: "排他制御（ロック）。更新中のデータに鍵をかける。" },
    ],
    quiz: [
      {
        q: "トランザクション処理のACID特性のうち、『処理は全部実行されるか、まったく実行されないかのどちらかである』ことを表すものはどれか。",
        choices: ["一貫性(Consistency)", "原子性(Atomicity)", "独立性(Isolation)", "耐久性(Durability)"],
        answer: 1,
        explain: "全部か無かは<strong>原子性(Atomicity)</strong>。途中失敗ならロールバックで全取消。",
      },
      {
        q: "2つのトランザクションが、互いに相手が確保している資源のロック解除を待ち続け、処理が進まなくなる状態はどれか。",
        choices: ["ロールバック", "デッドロック", "コミット", "リカバリ"],
        answer: 1,
        explain: "互いにロックを待ち合う膠着状態は<strong>デッドロック</strong>。",
      },
      {
        q: "複数の利用者が同時に同じデータを更新しようとするときに、データの矛盾を防ぐための仕組みはどれか。",
        choices: ["排他制御", "正規化", "バックアップ", "暗号化"],
        answer: 0,
        explain: "同時更新の矛盾を防ぐのは<strong>排他制御（ロック）</strong>。",
      },
    ],
  }
);
