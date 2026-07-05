/* =============================================================
   コレダケ基本情報 カリキュラム — 05 データベース
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-db", domain: "データベース", icon: "🗄️", title: "関係データベースとSQL",
    intro: "正規化、主キー・外部キー、関係演算、SQL。設計とSQLの読み取りがFEの得点源。",
    understand: [
      {
        h: "関係データベースと正規化",
        body:
          "<p>データを<strong>表（行＝レコード、列＝属性）</strong>で管理するのが<strong>関係データベース</strong>。各行を一意に識別する列が<strong>主キー</strong>、他の表の主キーを参照する列が<strong>外部キー</strong>です。</p>" +
          "<p>重複や更新の矛盾を防ぐため表を分割するのが<strong>正規化</strong>。繰り返しをなくす<strong>第1正規形</strong>、主キーの一部への部分関数従属を除く<strong>第2正規形</strong>、主キー以外への推移的関数従属を除く<strong>第3正規形</strong>と進みます。</p>",
        diagram:
          '<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          (function () {
            function table(x, y, title, tcolor, rows) {
              var w = 190, rh = 26, s = "";
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="26" rx="6" fill="' + tcolor + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 18) + '" fill="#fff" font-size="12" font-weight="800" text-anchor="middle">' + title + "</text>";
              rows.forEach(function (r, i) {
                var ry = y + 26 + i * rh;
                s += '<rect x="' + x + '" y="' + ry + '" width="' + w + '" height="' + rh + '" fill="' + (i === 0 ? "#eef4f9" : "#fff") + '" stroke="#d7d0c0"/>';
                s += '<text x="' + (x + 12) + '" y="' + (ry + 17) + '" fill="' + (r.c || "#23252b") + '" font-size="11" font-weight="' + (r.b ? "700" : "400") + '">' + r.t + "</text>";
              });
              return s;
            }
            var s = table(40, 34, "社員表", "#4a7fa8", [
              { t: "社員番号（主キー）", b: true },
              { t: "氏名" },
              { t: "部門コード（外部キー）", b: true, c: "#2f6d97" },
            ]) + table(370, 34, "部門表", "#5c9160", [
              { t: "部門コード（主キー）", b: true, c: "#366b3c" },
              { t: "部門名" },
              { t: "所在地" },
            ]);
            s += '<path d="M230 125 C 300 125, 300 73, 370 73" fill="none" stroke="#a85733" stroke-width="2"/><polygon points="370,73 359,68 360,79" fill="#a85733"/><text x="300" y="106" fill="#a85733" font-size="11" font-weight="700" text-anchor="middle">参照</text>';
            return s;
          })() +
          '<text x="300" y="190" fill="#6b6e76" font-size="11" text-anchor="middle">外部キーが別の表の主キーを参照して2つの表をつなぐ</text>' +
          "</svg>",
        cap: "主キーで行を識別し、外部キーで別表を参照。正規化で重複と更新の矛盾を防ぐ。",
      },
      {
        h: "関係演算とSQL",
        body:
          "<p>表を操作する<strong>関係演算</strong>：条件で行を選ぶ<strong>選択</strong>、列を取り出す<strong>射影</strong>、表を結び付ける<strong>結合</strong>。</p>" +
          "<p><strong>SQL</strong>は、抽出の<strong>SELECT〜FROM〜WHERE</strong>、並べ替えの<strong>ORDER BY</strong>、集計の<strong>GROUP BY／HAVING</strong>、集計関数<strong>COUNT・SUM・AVG・MAX・MIN</strong>を押さえます。表示だけの仮想表が<strong>ビュー</strong>です。</p>",
      },
    ],
    memorize: [
      { k: "主キー / 外部キー", v: "主キー＝行を一意に識別(重複・NULL不可)。外部キー＝他表の主キーを参照。" },
      { k: "正規化", v: "第1(繰り返し除去)→第2(部分関数従属除去)→第3(推移的関数従属除去)。" },
      { k: "選択・射影・結合", v: "選択=行を絞る、射影=列を取り出す、結合=表をつなぐ。" },
      { k: "SQL基本", v: "SELECT〜FROM〜WHERE。並べ替えORDER BY、集計GROUP BY。" },
      { k: "集計関数", v: "COUNT件数・SUM合計・AVG平均・MAX最大・MIN最小。" },
      { k: "ビュー", v: "実表から定義した仮想の表。元データは持たない。" },
    ],
    flashcards: [
      { q: "第3正規形で除くのは何か？", a: "主キー以外の項目への推移的関数従属。" },
      { q: "関係演算の選択・射影の違いは？", a: "選択は条件に合う『行』を取り出す、射影は特定の『列』を取り出す。" },
      { q: "SQLで条件を指定し、部門ごとに件数を集計する句は？", a: "WHERE（条件）とGROUP BY（グループ集計）。集計はCOUNT等。" },
      { q: "主キーに設定できない値は？", a: "重複する値とNULL（空値）。" },
    ],
    quiz: [
      {
        q: "関係データベースで、ある表から特定の条件を満たす行だけを取り出す関係演算はどれか。",
        choices: ["射影", "選択", "結合", "和"],
        answer: 1,
        explain: "条件に合う『行』を取り出すのは<strong>選択</strong>。『列』を取り出すのは射影。",
      },
      {
        q: "SQL文「SELECT 部門, COUNT(*) FROM 社員 GROUP BY 部門」が求める結果はどれか。",
        choices: [
          "全社員の一覧",
          "部門ごとの社員数",
          "社員数の合計だけ",
          "部門名の重複を含む一覧",
        ],
        answer: 1,
        explain: "GROUP BY 部門 で部門ごとにまとめ、COUNT(*)で件数を数える → <strong>部門ごとの社員数</strong>。",
      },
      {
        q: "データベースの正規化を行う主な目的はどれか。",
        choices: [
          "検索速度を必ず向上させる",
          "データの重複を排除し、更新時の矛盾を防ぐ",
          "表を1つに統合する",
          "データを暗号化する",
        ],
        answer: 1,
        explain: "正規化は<strong>重複排除と更新矛盾の防止</strong>が目的。",
      },
    ],
  },
  {
    id: "fe-transaction", domain: "データベース", icon: "🔐", title: "トランザクションと障害回復",
    intro: "ACID特性、排他制御とデッドロック、障害回復（ロールバック／ロールフォワード）。",
    understand: [
      {
        h: "トランザクションとACID",
        body:
          "<p>銀行の振込のように、「引き落とし」と「入金」を<strong>ひとまとめで完了させるべき一連の処理</strong>が<strong>トランザクション</strong>です。途中で失敗したら、全部なかったことにしないと困ります。</p>" +
          "<p>信頼できるトランザクションが満たすべき4つの性質が<strong>ACID</strong>——<strong>原子性</strong>（全部成功か全部取消）・<strong>一貫性</strong>・<strong>独立性</strong>（同時実行でも互いに干渉しない）・<strong>耐久性</strong>（完了後は障害でも失われない）。正常終了で結果を確定するのが<strong>コミット</strong>、失敗して取り消すのが<strong>ロールバック</strong>です。</p>",
      },
      {
        h: "排他制御とデッドロック",
        body:
          "<p>複数の人が<strong>同時に同じデータを更新</strong>すると、片方の更新が消えるなどの矛盾が起きます。これを防ぐのが<strong>排他制御（ロック）</strong>。更新中のデータに鍵をかけ、他の人を待たせます。読み取りだけ許す<strong>共有ロック</strong>と、読み書きを禁止する<strong>専有ロック</strong>があります。</p>" +
          "<p>ただしロックのかけ合いで問題が起きることも。下図のように、<strong>AさんとBさんが互いに相手のロック解除を待ち続けて、どちらも進めなくなる</strong>状態が<strong>デッドロック</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="270" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">デッドロック（互いに待ち続ける）</text>' +
          '<rect x="40" y="45" width="120" height="46" rx="9" fill="#dce8f3" stroke="#4a7fa8"/><text x="100" y="65" fill="#34567a" font-size="13" font-weight="800" text-anchor="middle">Aさん</text><text x="100" y="82" fill="#6b6e76" font-size="10" text-anchor="middle">データXをロック中</text>' +
          '<rect x="380" y="45" width="120" height="46" rx="9" fill="#dcecdd" stroke="#5c9160"/><text x="440" y="65" fill="#366b3c" font-size="13" font-weight="800" text-anchor="middle">Bさん</text><text x="440" y="82" fill="#6b6e76" font-size="10" text-anchor="middle">データYをロック中</text>' +
          '<rect x="215" y="120" width="110" height="30" rx="6" fill="#f2e7cd" stroke="#b28a2e"/><text x="270" y="140" fill="#7a5e17" font-size="11" font-weight="700" text-anchor="middle">Y と X</text>' +
          '<path d="M160 78 C 220 120, 220 128, 213 132" fill="none" stroke="#a85733" stroke-width="2"/><polygon points="213,132 224,131 218,122" fill="#a85733"/><text x="150" y="118" fill="#a85733" font-size="10" font-weight="700">Yの解除を待つ</text>' +
          '<path d="M380 78 C 320 120, 320 128, 327 132" fill="none" stroke="#a85733" stroke-width="2"/><polygon points="327,132 322,122 316,131" fill="#a85733"/><text x="330" y="118" fill="#a85733" font-size="10" font-weight="700">Xの解除を待つ</text>' +
          '<text x="270" y="172" fill="#6b6e76" font-size="11" text-anchor="middle">お互いが相手の鍵の解放を待ち、永遠に進まない</text>' +
          "</svg>",
        cap: "AはYを、BはXを待つが、どちらも自分の鍵を離さないので永久に止まる＝デッドロック。",
      },
      {
        h: "障害回復",
        body:
          "<p>DBMSは変更を<strong>ログ（ジャーナル）</strong>に記録し、障害から回復します。</p>" +
          "<ul>" +
          "<li><strong>ロールバック</strong>：未完了のトランザクションを取り消して整合性を保つ。</li>" +
          "<li><strong>ロールフォワード</strong>：バックアップに、コミット済みのログを再適用して復旧する。</li>" +
          "</ul>",
      },
    ],
    memorize: [
      { k: "ACID", v: "原子性・一貫性・独立性・耐久性。トランザクションの4性質。" },
      { k: "コミット / ロールバック", v: "コミット=確定、ロールバック=取消して元に戻す。" },
      { k: "共有ロック / 専有ロック", v: "共有=読み取り可。専有=読み書き禁止（更新用）。" },
      { k: "デッドロック", v: "互いに相手のロック解除を待ち合い処理が進まない状態。" },
      { k: "ロールフォワード", v: "バックアップ＋コミット済みログの再適用で復旧。" },
      { k: "ロールバック(回復)", v: "未完了のトランザクションを取り消す。" },
    ],
    flashcards: [
      { q: "ACIDの原子性とは？", a: "トランザクションは全部実行するか、まったく実行しないかのどちらか。" },
      { q: "ロールバックとロールフォワードの違いは？", a: "ロールバックは未完了処理を取り消す、ロールフォワードはコミット済み処理をログから再適用して復旧する。" },
      { q: "デッドロックとは？", a: "複数のトランザクションが互いに相手のロック解除を待ち続け、処理が進まなくなる状態。" },
      { q: "更新のためにかける、読み書きを禁止するロックは？", a: "専有ロック（排他ロック）。" },
    ],
    quiz: [
      {
        q: "トランザクションのACID特性のうち、「一連の処理がすべて実行されるか、まったく実行されないかのいずれかである」ことを表すものはどれか。",
        choices: ["一貫性", "原子性", "独立性", "耐久性"],
        answer: 1,
        explain: "全部か無かは<strong>原子性(Atomicity)</strong>。",
      },
      {
        q: "データベースの障害回復で、バックアップ取得後にコミットされたトランザクションのログを再度反映させて、障害直前の状態に復旧する方法はどれか。",
        choices: ["ロールバック", "ロールフォワード", "チェックポイント", "コミット"],
        answer: 1,
        explain: "コミット済みのログを再適用するのは<strong>ロールフォワード</strong>。未完了を取り消すのがロールバック。",
      },
      {
        q: "2つのトランザクションが互いに相手のロックしている資源を要求し、両方とも待ち続けて処理が進まなくなる状態はどれか。",
        choices: ["スラッシング", "デッドロック", "ロールバック", "フラグメンテーション"],
        answer: 1,
        explain: "互いにロックを待ち合う状態は<strong>デッドロック</strong>。",
      },
    ],
  }
);
