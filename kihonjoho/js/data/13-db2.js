/* =============================================================
   コレダケ基本情報 カリキュラム — 13 SQL応用・データベース応用
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-sql", domain: "データベース", icon: "🔎", title: "SQLの応用（結合・集計・副問合せ）",
    intro: "JOIN、GROUP BY/HAVING、副問合せ、ビュー、インデックス。SQLの読み取り問題に強くなる。",
    understand: [
      {
        h: "抽出・並べ替え・集計",
        body:
          "<p>基本は <strong>SELECT 列 FROM 表 WHERE 条件</strong>。<strong>ORDER BY</strong>で並べ替え（ASC昇順／DESC降順）、<strong>DISTINCT</strong>で重複除去。</p>" +
          "<p>グループ集計は <strong>GROUP BY</strong> でまとめ、<strong>集計関数（COUNT・SUM・AVG・MAX・MIN）</strong>を使います。集計後の絞り込みは <strong>WHERE ではなく HAVING</strong> を使う点が頻出です。</p>",
      },
      {
        h: "結合（JOIN）——共通の列で表をつなぐ",
        body:
          "<p>関係データベースでは、データを目的別に複数の表に分けて持ちます。分けたままでは「社員ごとの部門名」のように<strong>複数表にまたがる情報</strong>が取り出せないので、<strong>共通の列（キー）を手がかりに表をつなぐ</strong>のが<strong>結合（JOIN）</strong>です。下の図では、社員表と部門表を共通の<strong>部門ID</strong>でつないで、1つの結果表にまとめています。</p>" +
          "<p>つなぐ条件は <code>ON</code> で指定します（例：<code>社員表 JOIN 部門表 ON 社員表.部門ID = 部門表.部門ID</code>）。両方に一致する行だけを取る<strong>内部結合</strong>のほか、一致しない行も残す<strong>外部結合</strong>もあります。</p>",
        diagram:
          '<svg viewBox="0 0 580 250" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">結合（JOIN）：共通の列で表をつなぐ</text>' +
          (function () {
            function table(x, y, title, widths, rows, accent, headFill) {
              var total = 0, i; for (i = 0; i < widths.length; i++) total += widths[i];
              var s = '<text x="' + (x + total / 2) + '" y="' + (y - 6) + '" fill="#23252b" font-size="11" font-weight="800" text-anchor="middle">' + title + "</text>";
              var rh = 24;
              rows.forEach(function (row, ri) {
                var cx = x, isHead = ri === 0;
                row.forEach(function (cell, ci) {
                  var w = widths[ci], fill = isHead ? headFill : "#ffffff";
                  s += '<rect x="' + cx + '" y="' + (y + ri * rh) + '" width="' + w + '" height="' + rh + '" fill="' + fill + '" stroke="' + accent + '"/>';
                  s += '<text x="' + (cx + w / 2) + '" y="' + (y + ri * rh + 16) + '" fill="#23252b" font-size="10.5" ' + (isHead ? 'font-weight="700" ' : "") + 'text-anchor="middle">' + cell + "</text>";
                  cx += w;
                });
              });
              return s;
            }
            var s = "";
            s += table(24, 56, "社員表", [64, 60], [["社員", "部門ID"], ["佐藤", "D1"], ["鈴木", "D2"]], "#4a7fa8", "#dce8f3");
            s += table(24, 172, "部門表", [64, 64], [["部門ID", "部門名"], ["D1", "営業"], ["D2", "開発"]], "#b28a2e", "#f2e7cd");
            s += table(350, 108, "結合結果", [56, 56, 56], [["社員", "部門ID", "部門名"], ["佐藤", "D1", "営業"], ["鈴木", "D2", "開発"]], "#5c9160", "#dcecdd");
            s += '<line x1="150" y1="92" x2="346" y2="140" stroke="#8a8f98" stroke-width="1.6"/><polygon points="346,140 336,137 339,147" fill="#8a8f98"/>';
            s += '<line x1="154" y1="200" x2="346" y2="152" stroke="#8a8f98" stroke-width="1.6"/><polygon points="346,152 339,145 336,155" fill="#8a8f98"/>';
            s += '<text x="250" y="112" fill="#3f7a45" font-size="11" font-weight="700" text-anchor="middle">部門IDで結合</text>';
            return s;
          })() +
          "</svg>",
        cap: "社員表と部門表を共通の部門IDでつなぎ、社員ごとの部門名を1つの表にまとめる。条件はONで指定。",
      },
      {
        h: "副問合せとインデックス・ビュー",
        body:
          "<p>あるSQLの結果を別のSQLの条件に使うのが<strong>副問合せ（サブクエリ）</strong>で、<code>IN</code> や比較演算子と組み合わせます（例：平均単価を副問合せで求め、それより高い商品を抽出）。</p>" +
          "<p><strong>インデックス（索引）</strong>は、特定の列に作ると<strong>検索が高速化</strong>します。ただし更新時に索引を作り直すコストがかかるため、<strong>更新が多い列には不向き</strong>です。実表から定義した表示専用の仮想表が<strong>ビュー</strong>で、データ自体は持たず、複雑な検索を簡単に使い回せます。</p>",
      },
    ],
    memorize: [
      { k: "WHERE / HAVING", v: "WHERE=行の絞り込み。HAVING=<strong>集計後(GROUP BY後)</strong>の絞り込み。" },
      { k: "集計関数", v: "COUNT件数・SUM合計・AVG平均・MAX最大・MIN最小。" },
      { k: "GROUP BY", v: "指定列の値ごとにグループ化して集計。" },
      { k: "JOIN（結合）", v: "複数の表を共通の列でつなぐ。" },
      { k: "副問合せ", v: "SQLの結果を別のSQLの条件に使う（IN・比較演算子）。" },
      { k: "インデックス", v: "列に索引を作り検索を高速化。更新が多い列には不向き。" },
      { k: "ビュー", v: "実表から定義した仮想表。データ自体は持たない。" },
    ],
    flashcards: [
      { q: "GROUP BYで集計した結果をさらに絞り込むには、WHEREとHAVINGどちらを使う？", a: "HAVING（集計後の条件）。WHEREは集計前の行の絞り込み。" },
      { q: "インデックスの長所と短所は？", a: "検索が高速化する（長所）が、更新時に索引の維持コストがかかる（短所）。" },
      { q: "副問合せ（サブクエリ）とは？", a: "あるSELECT文の結果を、別のSELECT文の条件として利用する入れ子のSQL。" },
      { q: "重複行を除いて抽出するSQLのキーワードは？", a: "DISTINCT。" },
    ],
    quiz: [
      {
        q: "SQLで、GROUP BYによってグループ化した後の集計結果に対して条件を指定し、絞り込むために用いる句はどれか。",
        choices: ["WHERE", "HAVING", "ORDER BY", "DISTINCT"],
        answer: 1,
        explain: "集計後（GROUP BY後）の絞り込みは<strong>HAVING</strong>。行単位の絞り込みはWHERE。",
      },
      {
        q: "データベースの表の特定の列にインデックス（索引）を設定する主な目的はどれか。",
        choices: [
          "データの重複を防ぐ",
          "その列を条件とする検索を高速化する",
          "データを暗号化する",
          "表のバックアップを取る",
        ],
        answer: 1,
        explain: "インデックスは<strong>検索の高速化</strong>が目的。ただし更新時の維持コストに注意。",
      },
      {
        q: "SQL「SELECT 商品名 FROM 商品 WHERE 単価 > (SELECT AVG(単価) FROM 商品)」が取り出す結果はどれか。",
        choices: [
          "全商品の商品名",
          "単価が平均より高い商品の商品名",
          "単価が最も高い商品だけ",
          "平均単価の値",
        ],
        answer: 1,
        explain: "副問合せで平均単価を求め、それより単価が高い商品を抽出 → <strong>単価が平均より高い商品名</strong>。",
      },
    ],
  },
  {
    id: "fe-dbapp", domain: "データベース", icon: "🏢", title: "データベース応用（NoSQL・DWH・ビッグデータ）",
    intro: "分散データベース、NoSQL、データウェアハウス、ビッグデータとその活用。",
    understand: [
      {
        h: "分散データベースとNoSQL",
        body:
          "<p>データを複数のサーバに分けて置くのが<strong>分散データベース</strong>。どこか1か所でも更新に失敗したら全部取り消す<strong>2相コミット</strong>で整合性を保ちます。</p>" +
          "<p>関係データベース（表形式）に限定せず、<strong>キーバリュー型・ドキュメント型</strong>など柔軟な構造で大量データを扱うのが<strong>NoSQL</strong>。Webやビッグデータ向けに広く使われます。</p>",
      },
      {
        h: "データウェアハウスとビッグデータ活用",
        body:
          "<p>現場の業務システム（販売・在庫・会計など）にあるデータを、<strong>分析のために1か所へ時系列で大量に蓄積する倉庫</strong>が<strong>データウェアハウス(DWH)</strong>です。各システムからデータを取り出し、形式をそろえて格納する処理を<strong>ETL（抽出・変換・格納）</strong>といいます。特定用途に絞った小型版が<strong>データマート</strong>です。</p>" +
          "<p>蓄積したデータは、多次元で自在に集計・分析する<strong>OLAP</strong>（ドリルダウン等）や、隠れた規則・相関を発掘する<strong>データマイニング</strong>で活用します。量・多様性・速度が大きい<strong>ビッグデータ</strong>を統計とITで分析し価値を生む人材が<strong>データサイエンティスト</strong>、分析前に誤り・重複・表記ゆれを整える前処理が<strong>データクレンジング</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">データウェアハウスと分析の流れ</text>' +
          '<rect x="18" y="44" width="112" height="26" rx="4" fill="#eef4f9" stroke="#9db8cd"/><text x="74" y="61" fill="#23252b" font-size="10.5" text-anchor="middle">販売システム</text>' +
          '<rect x="18" y="76" width="112" height="26" rx="4" fill="#eef4f9" stroke="#9db8cd"/><text x="74" y="93" fill="#23252b" font-size="10.5" text-anchor="middle">在庫システム</text>' +
          '<rect x="18" y="108" width="112" height="26" rx="4" fill="#eef4f9" stroke="#9db8cd"/><text x="74" y="125" fill="#23252b" font-size="10.5" text-anchor="middle">会計システム</text>' +
          '<text x="74" y="152" fill="#6b6e76" font-size="9" text-anchor="middle">業務システム（現場）</text>' +
          '<line x1="130" y1="90" x2="184" y2="90" stroke="#8a8f98" stroke-width="1.8"/><polygon points="184,90 175,85 175,95" fill="#8a8f98"/>' +
          '<text x="157" y="80" fill="#6b6e76" font-size="9.5" font-weight="700" text-anchor="middle">ETL</text><text x="157" y="106" fill="#6b6e76" font-size="8" text-anchor="middle">抽出・変換</text>' +
          '<rect x="187" y="58" width="152" height="64" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="263" y="86" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">データウェアハウス</text><text x="263" y="106" fill="#34567a" font-size="9.5" text-anchor="middle">時系列で大量に蓄積</text>' +
          '<line x1="339" y1="90" x2="393" y2="90" stroke="#8a8f98" stroke-width="1.8"/><polygon points="393,90 384,85 384,95" fill="#8a8f98"/>' +
          '<rect x="396" y="52" width="166" height="76" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="479" y="74" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">分析・活用</text><text x="479" y="94" fill="#3f7a45" font-size="10" text-anchor="middle">OLAP（多次元集計）</text><text x="479" y="112" fill="#3f7a45" font-size="10" text-anchor="middle">データマイニング</text>' +
          "</svg>",
        cap: "現場のデータをETLでDWHに集約・蓄積し、OLAPやデータマイニングで分析・活用する。",
      },
    ],
    memorize: [
      { k: "2相コミット", v: "分散DBで、全サイトが準備OKなら確定、1つでも失敗なら全取消。" },
      { k: "NoSQL", v: "非リレーショナルなDB群(キーバリュー・ドキュメント型)。大量・柔軟。" },
      { k: "データウェアハウス", v: "分析用に時系列で大量蓄積する倉庫。小型版がデータマート。" },
      { k: "データマイニング", v: "大量データから隠れた規則・相関を発掘する。" },
      { k: "OLAP", v: "多次元でデータを集計・分析する（ドリルダウン等）。" },
      { k: "データクレンジング", v: "分析前にデータの誤り・重複・表記ゆれを整える前処理。" },
    ],
    flashcards: [
      { q: "NoSQLとは？", a: "関係データベース以外の、キーバリュー型やドキュメント型など柔軟な構造で大量データを扱うデータベースの総称。" },
      { q: "データウェアハウスとデータマイニングの違いは？", a: "データウェアハウスは分析用にデータを蓄積する倉庫、データマイニングはそこから規則性を発掘する分析。" },
      { q: "分散データベースで整合性を保つコミット方式は？", a: "2相コミット（全サイトが準備できたら確定、1つでも失敗なら全取消）。" },
      { q: "分析前にデータの誤りや重複を整える作業は？", a: "データクレンジング。" },
    ],
    quiz: [
      {
        q: "関係データベースのように表形式に限定せず、キーバリュー型やドキュメント型などの柔軟なデータ構造で大量のデータを扱うデータベースの総称はどれか。",
        choices: ["NoSQL", "DWH", "RDB", "OLTP"],
        answer: 0,
        explain: "非リレーショナルで柔軟な構造のDB群は<strong>NoSQL</strong>。",
      },
      {
        q: "意思決定支援のために、企業内の様々なデータを時系列で大量に蓄積したデータベースはどれか。",
        choices: ["データマート", "データウェアハウス", "データディクショナリ", "データクレンジング"],
        answer: 1,
        explain: "分析用に大量蓄積する倉庫は<strong>データウェアハウス</strong>。特定用途の小型版がデータマート。",
      },
      {
        q: "分散データベースにおいて、複数サイトの更新をすべて確定するか、すべて取り消すかを保証するための制御方式はどれか。",
        choices: ["排他制御", "2相コミット", "ロールフォワード", "チェックポイント"],
        answer: 1,
        explain: "分散DBの整合性を保つのは<strong>2相コミット</strong>。",
      },
    ],
  }
);
