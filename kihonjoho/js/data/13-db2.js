/* =============================================================
   コレダケ基本情報 カリキュラム — 13 SQL応用・データベース応用
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];

/* クイズで「表＋SQL文を読み取って答える」過去問形式を作るためのヘルパー */
function qTable(title, headers, rows) {
  var s = '<div style="overflow-x:auto;margin:0.5rem 0 0.9rem;">';
  if (title) s += '<div style="font-weight:700;font-size:0.85rem;color:var(--text-muted);margin-bottom:4px;">' + title + "</div>";
  s += '<table style="border-collapse:collapse;font-size:0.88rem;">';
  s += "<tr>";
  headers.forEach(function (h) {
    s += '<th style="border:1px solid var(--border);background:var(--bg-elev-2);padding:4px 14px;font-weight:700;white-space:nowrap;">' + h + "</th>";
  });
  s += "</tr>";
  rows.forEach(function (row) {
    s += "<tr>";
    row.forEach(function (cell) {
      s += '<td style="border:1px solid var(--border);padding:4px 14px;white-space:nowrap;">' + cell + "</td>";
    });
    s += "</tr>";
  });
  s += "</table></div>";
  return s;
}
function qSql(sql) {
  return '<div style="font-family:Consolas,\'SFMono-Regular\',monospace;background:var(--bg-elev-2);border:1px solid var(--border);border-radius:8px;padding:8px 14px;margin:0.3rem 0 0.7rem;font-size:0.86rem;white-space:pre-wrap;">' + sql + "</div>";
}

window.CURRICULUM.push(
  {
    id: "fe-sql", domain: "データベース", icon: "🔎", title: "SQLの応用（SELECT・WHERE・JOIN・GROUP BY）",
    intro: "SELECT/FROM/WHERE、ORDER BY、GROUP BY/HAVING、JOIN。頻出の基本構文だけを1つずつ図で押さえる。",
    understand: [
      {
        h: "SELECT・FROM——表から必要な列を取り出す",
        body:
          "<p>SQLの基本形は <strong>SELECT 列 FROM 表</strong> です。<code>FROM</code>で<strong>どの表を見るか</strong>を指定し、<code>SELECT</code>で<strong>その表のどの列を取り出すか</strong>を指定します。下の図のように、元の表は全部の列を持っていますが、SELECTで指定した列だけが結果として抜き出されます。</p>" +
          "<p>全部の列がほしいときは <code>SELECT * FROM 表</code> のように <code>*</code>（アスタリスク）を使います。</p>",
        diagram:
          '<svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">SELECT 氏名 FROM 社員</text>' +
          (function () {
            var head = ["社員ID", "氏名", "部門", "年齢"], w = [46, 50, 50, 44];
            var rows = [["1", "佐藤", "営業", "34"], ["2", "鈴木", "開発", "28"], ["3", "高橋", "営業", "45"], ["4", "田中", "開発", "31"]];
            var x0 = 26, y0 = 48, rh = 24;
            var s = '<text x="' + (x0 + 95) + '" y="' + (y0 - 8) + '" fill="#6b6e76" font-size="10.5" text-anchor="middle">元の表「社員」</text>';
            var xs = [x0]; for (var i = 0; i < w.length; i++) xs.push(xs[i] + w[i]);
            head.forEach(function (h, ci) {
              var isSel = ci === 1;
              s += '<rect x="' + xs[ci] + '" y="' + y0 + '" width="' + w[ci] + '" height="' + rh + '" fill="' + (isSel ? "#dce8f3" : "#eceff3") + '" stroke="' + (isSel ? "#4a7fa8" : "#c7ccd2") + '" stroke-width="' + (isSel ? "2" : "1") + '"/>';
              s += '<text x="' + (xs[ci] + w[ci] / 2) + '" y="' + (y0 + 16) + '" fill="#23252b" font-size="10.5" font-weight="700" text-anchor="middle">' + h + "</text>";
            });
            rows.forEach(function (row, ri) {
              var y = y0 + (ri + 1) * rh;
              row.forEach(function (cell, ci) {
                var isSel = ci === 1;
                s += '<rect x="' + xs[ci] + '" y="' + y + '" width="' + w[ci] + '" height="' + rh + '" fill="' + (isSel ? "#eef4f9" : "#ffffff") + '" stroke="' + (isSel ? "#4a7fa8" : "#d8dbe0") + '" stroke-width="' + (isSel ? "2" : "1") + '"/>';
                s += '<text x="' + (xs[ci] + w[ci] / 2) + '" y="' + (y + 16) + '" fill="#23252b" font-size="10.5" text-anchor="middle">' + cell + "</text>";
              });
            });
            s += '<line x1="' + (xs[4] + 20) + '" y1="' + (y0 + 60) + '" x2="' + (xs[4] + 70) + '" y2="' + (y0 + 60) + '" stroke="#8a8f98" stroke-width="1.8"/><polygon points="' + (xs[4] + 70) + ',' + (y0 + 60) + " " + (xs[4] + 61) + ',' + (y0 + 55) + " " + (xs[4] + 61) + ',' + (y0 + 65) + '" fill="#8a8f98"/>';
            var rx = xs[4] + 76;
            s += '<text x="' + (rx + 34) + '" y="' + (y0 - 8) + '" fill="#34567a" font-size="10.5" font-weight="700" text-anchor="middle">SELECTの結果</text>';
            s += '<rect x="' + rx + '" y="' + y0 + '" width="68" height="' + rh + '" fill="#dce8f3" stroke="#4a7fa8" stroke-width="2"/><text x="' + (rx + 34) + '" y="' + (y0 + 16) + '" fill="#23252b" font-size="10.5" font-weight="700" text-anchor="middle">氏名</text>';
            rows.forEach(function (row, ri) {
              var y = y0 + (ri + 1) * rh;
              s += '<rect x="' + rx + '" y="' + y + '" width="68" height="' + rh + '" fill="#eef4f9" stroke="#4a7fa8"/><text x="' + (rx + 34) + '" y="' + (y + 16) + '" fill="#23252b" font-size="10.5" text-anchor="middle">' + row[1] + "</text>";
            });
            return s;
          })() +
          "</svg>",
        cap: "FROMで表を指定し、SELECTで欲しい列だけを取り出す。ここでは「氏名」列だけが結果に残る。",
      },
      {
        h: "WHERE——条件に合う行だけを絞り込む",
        body:
          "<p><code>WHERE</code>は<strong>行の絞り込み</strong>を行います。<code>SELECT 列 FROM 表 WHERE 条件</code>の形で、条件に一致する行だけが結果に残ります。SELECTが「どの列（縦）を残すか」なのに対し、WHEREは「どの行（横）を残すか」という違いを意識すると混同しません。</p>" +
          "<p>条件には<code>=</code>（等しい）のほか、<code>&gt;</code>・<code>&lt;</code>（比較）、<code>AND</code>・<code>OR</code>（複数条件の組合せ）、<code>LIKE</code>（あいまい検索）などを使います。</p>",
        diagram:
          '<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">WHERE 部門 = \'開発\'</text>' +
          (function () {
            var head = ["社員ID", "氏名", "部門", "年齢"], w = [46, 50, 50, 44];
            var rows = [["1", "佐藤", "営業", "34"], ["2", "鈴木", "開発", "28"], ["3", "高橋", "営業", "45"], ["4", "田中", "開発", "31"]];
            var match = [false, true, false, true];
            var x0 = 26, y0 = 48, rh = 24;
            var xs = [x0]; for (var i = 0; i < w.length; i++) xs.push(xs[i] + w[i]);
            var s = '<text x="' + (x0 + 95) + '" y="' + (y0 - 8) + '" fill="#6b6e76" font-size="10.5" text-anchor="middle">元の表「社員」</text>';
            head.forEach(function (h, ci) {
              s += '<rect x="' + xs[ci] + '" y="' + y0 + '" width="' + w[ci] + '" height="' + rh + '" fill="#eceff3" stroke="#c7ccd2"/>';
              s += '<text x="' + (xs[ci] + w[ci] / 2) + '" y="' + (y0 + 16) + '" fill="#23252b" font-size="10.5" font-weight="700" text-anchor="middle">' + h + "</text>";
            });
            rows.forEach(function (row, ri) {
              var y = y0 + (ri + 1) * rh, isRowMatch = match[ri];
              row.forEach(function (cell, ci) {
                s += '<rect x="' + xs[ci] + '" y="' + y + '" width="' + w[ci] + '" height="' + rh + '" fill="' + (isRowMatch ? "#eef4f9" : "#ffffff") + '" stroke="' + (isRowMatch ? "#4a7fa8" : "#d8dbe0") + '" stroke-width="' + (isRowMatch ? "2" : "1") + '"/>';
                s += '<text x="' + (xs[ci] + w[ci] / 2) + '" y="' + (y + 16) + '" fill="#23252b" font-size="10.5" text-anchor="middle">' + cell + "</text>";
              });
            });
            s += '<line x1="' + (xs[4] + 20) + '" y1="' + (y0 + 60) + '" x2="' + (xs[4] + 70) + '" y2="' + (y0 + 60) + '" stroke="#8a8f98" stroke-width="1.8"/><polygon points="' + (xs[4] + 70) + ',' + (y0 + 60) + " " + (xs[4] + 61) + ',' + (y0 + 55) + " " + (xs[4] + 61) + ',' + (y0 + 65) + '" fill="#8a8f98"/>';
            var rx = xs[4] + 76;
            s += '<text x="' + (rx + 60) + '" y="' + (y0 - 8) + '" fill="#34567a" font-size="10.5" font-weight="700" text-anchor="middle">WHEREの結果</text>';
            var w2 = [46, 50, 50, 44], xs2 = [rx]; for (var j = 0; j < w2.length; j++) xs2.push(xs2[j] + w2[j]);
            head.forEach(function (h, ci) {
              s += '<rect x="' + xs2[ci] + '" y="' + y0 + '" width="' + w2[ci] + '" height="' + rh + '" fill="#dce8f3" stroke="#4a7fa8" stroke-width="2"/><text x="' + (xs2[ci] + w2[ci] / 2) + '" y="' + (y0 + 16) + '" fill="#23252b" font-size="10.5" font-weight="700" text-anchor="middle">' + h + "</text>";
            });
            var matched = rows.filter(function (r, i) { return match[i]; });
            matched.forEach(function (row, ri) {
              var y = y0 + (ri + 1) * rh;
              row.forEach(function (cell, ci) {
                s += '<rect x="' + xs2[ci] + '" y="' + y + '" width="' + w2[ci] + '" height="' + rh + '" fill="#eef4f9" stroke="#4a7fa8"/><text x="' + (xs2[ci] + w2[ci] / 2) + '" y="' + (y + 16) + '" fill="#23252b" font-size="10.5" text-anchor="middle">' + cell + "</text>";
              });
            });
            s += '<text x="290" y="182" fill="#6b6e76" font-size="10.5" text-anchor="middle">部門が「開発」の行（鈴木・田中）だけが残る。条件に合わない行は消える。</text>';
            return s;
          })() +
          "</svg>",
        cap: "WHEREは行の絞り込み。条件（部門='開発'）に一致する行だけが結果に残る。",
      },
      {
        h: "ORDER BY——結果を並べ替える",
        body:
          "<p><code>ORDER BY 列</code>で、結果を指定した列の値順に並べ替えます。<strong>ASC（昇順・小さい→大きい、省略時のデフォルト）</strong>と<strong>DESC（降順・大きい→小さい）</strong>を使い分けます。複数の列を指定すると、最初の列で同じ値のときに次の列で並べ替えます。</p>",
        diagram:
          '<svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">ORDER BY 年齢 DESC（年齢の高い順）</text>' +
          (function () {
            var before = [["佐藤", "34"], ["鈴木", "28"], ["高橋", "45"], ["田中", "31"]];
            var after = [["高橋", "45"], ["佐藤", "34"], ["田中", "31"], ["鈴木", "28"]];
            function tbl(x0, y0, title, rows, accent, fillH) {
              var w = [70, 50], rh = 24;
              var s = '<text x="' + (x0 + 60) + '" y="' + (y0 - 8) + '" fill="#6b6e76" font-size="10.5" text-anchor="middle">' + title + "</text>";
              s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + w[0] + '" height="' + rh + '" fill="' + fillH + '" stroke="' + accent + '"/><text x="' + (x0 + w[0] / 2) + '" y="' + (y0 + 16) + '" fill="#23252b" font-size="10.5" font-weight="700" text-anchor="middle">氏名</text>';
              s += '<rect x="' + (x0 + w[0]) + '" y="' + y0 + '" width="' + w[1] + '" height="' + rh + '" fill="' + fillH + '" stroke="' + accent + '"/><text x="' + (x0 + w[0] + w[1] / 2) + '" y="' + (y0 + 16) + '" fill="#23252b" font-size="10.5" font-weight="700" text-anchor="middle">年齢</text>';
              rows.forEach(function (row, ri) {
                var y = y0 + (ri + 1) * rh;
                s += '<rect x="' + x0 + '" y="' + y + '" width="' + w[0] + '" height="' + rh + '" fill="#ffffff" stroke="#d8dbe0"/><text x="' + (x0 + w[0] / 2) + '" y="' + (y + 16) + '" fill="#23252b" font-size="10.5" text-anchor="middle">' + row[0] + "</text>";
                s += '<rect x="' + (x0 + w[0]) + '" y="' + y + '" width="' + w[1] + '" height="' + rh + '" fill="#ffffff" stroke="#d8dbe0"/><text x="' + (x0 + w[0] + w[1] / 2) + '" y="' + (y + 16) + '" fill="#23252b" font-size="10.5" text-anchor="middle">' + row[1] + "</text>";
              });
              return s;
            }
            var s = tbl(40, 50, "並べ替え前", before, "#c7ccd2", "#eceff3");
            s += tbl(340, 50, "並べ替え後（DESC）", after, "#4a7fa8", "#dce8f3");
            s += '<line x1="200" y1="70" x2="330" y2="70" stroke="#8a8f98" stroke-width="1.8"/><polygon points="330,70 321,65 321,75" fill="#8a8f98"/>';
            s += '<text x="290" y="176" fill="#6b6e76" font-size="10.5" text-anchor="middle">年齢の大きい順（45→34→31→28）に並べ替わる。</text>';
            return s;
          })() +
          "</svg>",
        cap: "ORDER BY 年齢 DESCで、年齢が大きい順に並べ替わる。ASCなら小さい順（デフォルト）。",
      },
      {
        h: "GROUP BY・HAVING——グループごとに集計する",
        body:
          "<p><code>GROUP BY 列</code>は、指定した列の値が同じ行どうしを1つのグループにまとめ、<strong>集計関数（COUNT・SUM・AVG・MAX・MIN）</strong>でグループごとの値を求めます。</p>" +
          "<p>できあがったグループを条件でさらに絞り込むのが<code>HAVING</code>です。<strong>WHEREは行を選ぶ「集計前」の条件、HAVINGはグループを選ぶ「集計後」の条件</strong>という順序の違いが最頻出のポイントです。下の図では、担当者ごとの合計金額を求めたあと、<code>HAVING SUM(金額) &gt;= 25000</code>で基準に満たない担当者を除いています。</p>",
        diagram:
          '<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">GROUP BY 担当者 → HAVING SUM(金額) &gt;= 25000</text>' +
          (function () {
            var groups = [
              { name: "佐藤", rows: ["20000", "30000"], sum: 50000, pass: true },
              { name: "鈴木", rows: ["15000", "10000"], sum: 25000, pass: true },
              { name: "高橋", rows: ["5000"], sum: 5000, pass: false },
            ];
            var s = "";
            var x0 = 30, gw = 160, gap = 16;
            groups.forEach(function (g, gi) {
              var x = x0 + gi * (gw + gap);
              var boxFill = g.pass ? "#dcecdd" : "#f2e3dc", boxStroke = g.pass ? "#5c9160" : "#c7ccd2";
              s += '<text x="' + (x + gw / 2) + '" y="42" fill="#23252b" font-size="11.5" font-weight="800" text-anchor="middle">' + g.name + "</text>";
              g.rows.forEach(function (v, ri) {
                s += '<rect x="' + x + '" y="' + (52 + ri * 26) + '" width="' + gw + '" height="22" fill="#ffffff" stroke="#d8dbe0"/><text x="' + (x + gw / 2) + '" y="' + (67 + ri * 26) + '" fill="#23252b" font-size="10.5" text-anchor="middle">金額 ' + v + "</text>";
              });
              var sumY = 52 + g.rows.length * 26 + 6;
              s += '<rect x="' + x + '" y="' + sumY + '" width="' + gw + '" height="30" rx="6" fill="' + boxFill + '" stroke="' + boxStroke + '" stroke-width="2"/>';
              s += '<text x="' + (x + gw / 2) + '" y="' + (sumY + 20) + '" fill="#23252b" font-size="11.5" font-weight="800" text-anchor="middle">SUM = ' + g.sum + "</text>";
              s += '<text x="' + (x + gw / 2) + '" y="' + (sumY + 50) + '" fill="' + (g.pass ? "#3f7a45" : "#8a8f98") + '" font-size="11" font-weight="700" text-anchor="middle">' + (g.pass ? "✓ HAVING条件を満たす" : "✗ 基準未満で除外") + "</text>";
            });
            s += '<text x="290" y="216" fill="#6b6e76" font-size="10.5" text-anchor="middle">合計が25000以上の佐藤・鈴木だけが結果に残り、高橋(5000)は除外される。</text>';
            return s;
          })() +
          "</svg>",
        cap: "GROUP BYでグループ化→集計関数で値を求める→HAVINGで条件に満たないグループを除外。",
      },
      {
        h: "結合（JOIN）——内部結合と外部結合",
        body:
          "<p>関係データベースでは、データを目的別に複数の表に分けて持ちます。分けたままでは「社員ごとの部門名」のように<strong>複数表にまたがる情報</strong>が取り出せないので、<strong>共通の列（キー）を手がかりに表をつなぐ</strong>のが<strong>結合（JOIN）</strong>です。つなぐ条件は<code>ON</code>で指定します（例：<code>社員表 JOIN 部門表 ON 社員表.部門ID = 部門表.部門ID</code>）。</p>" +
          "<p>結合には2種類あり、<strong>「一致しない行をどう扱うか」</strong>で区別します。</p>" +
          "<ul>" +
          "<li><strong>内部結合（INNER JOIN）</strong>：<strong>両方の表で条件に一致する行だけ</strong>を残す。部門が割り当てられていない社員は結果に出てこない。</li>" +
          "<li><strong>外部結合（OUTER JOIN）</strong>：<strong>一致しない行も残し、相手側の列はNULLで埋める</strong>。基準にする表を左右どちらに置くかで<strong>LEFT（左外部結合）</strong>／<strong>RIGHT（右外部結合）</strong>を使い分ける。「部門未定の社員も一覧に出したい」ときはLEFT JOINを使う。</li>" +
          "</ul>" +
          "<p>下の図は、内部結合と外部結合（LEFT）で<strong>結果の行数が変わる</strong>様子を比較したものです。部門IDが無い社員（鈴木）が、内部結合では消え、外部結合ではNULLとともに残ります。</p>",
        diagram:
          '<svg viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">内部結合 と 外部結合（LEFT）の違い</text>' +
          (function () {
            function table(x, y, title, widths, rows, accent, headFill, nullRow) {
              var total = 0, i; for (i = 0; i < widths.length; i++) total += widths[i];
              var s = '<text x="' + (x + total / 2) + '" y="' + (y - 6) + '" fill="#23252b" font-size="11" font-weight="800" text-anchor="middle">' + title + "</text>";
              var rh = 24;
              rows.forEach(function (row, ri) {
                var cx = x, isHead = ri === 0, isNull = nullRow === ri;
                row.forEach(function (cell, ci) {
                  var w = widths[ci], fill = isHead ? headFill : (isNull ? "#f7dfd6" : "#ffffff");
                  var stroke = isNull ? "#c26b4a" : accent;
                  s += '<rect x="' + cx + '" y="' + (y + ri * rh) + '" width="' + w + '" height="' + rh + '" fill="' + fill + '" stroke="' + stroke + '"/>';
                  s += '<text x="' + (cx + w / 2) + '" y="' + (y + ri * rh + 16) + '" fill="' + (isNull ? "#8a4626" : "#23252b") + '" font-size="10.5" ' + (isHead || isNull ? 'font-weight="700" ' : "") + 'text-anchor="middle">' + cell + "</text>";
                  cx += w;
                });
              });
              return s;
            }
            var s = "";
            s += '<text x="20" y="50" fill="#6b6e76" font-size="10.5">元の表：社員表(佐藤=D1, 鈴木=部門未定) ＋ 部門表(D1=営業)</text>';
            s += '<text x="140" y="76" fill="#34567a" font-size="12" font-weight="800" text-anchor="middle">内部結合（INNER JOIN）</text>';
            s += table(30, 88, "", [70, 70, 60], [["社員", "部門ID", "部門名"], ["佐藤", "D1", "営業"]], "#4a7fa8", "#dce8f3", -1);
            s += '<text x="140" y="160" fill="#6b6e76" font-size="10" text-anchor="middle">一致する行だけ残る（鈴木は消える）</text>';
            s += '<text x="440" y="76" fill="#b0532f" font-size="12" font-weight="800" text-anchor="middle">外部結合（LEFT JOIN）</text>';
            s += table(330, 88, "", [70, 70, 60], [["社員", "部門ID", "部門名"], ["佐藤", "D1", "営業"], ["鈴木", "NULL", "NULL"]], "#4a7fa8", "#dce8f3", 2);
            s += '<text x="440" y="185" fill="#6b6e76" font-size="10" text-anchor="middle">一致しない行も残り、NULLで埋まる</text>';
            s += '<line x1="290" y1="60" x2="290" y2="210" stroke="#e2e4e8" stroke-width="1"/>';
            s += '<text x="290" y="230" fill="#6b6e76" font-size="10.5" text-anchor="middle">左の社員表を基準にすべて残すのがLEFT JOIN。基準側は「左に書いた表」。</text>';
            return s;
          })() +
          "</svg>",
        cap: "内部結合は一致した行だけ、外部結合(LEFT)は基準側の全行を残し不一致はNULLで埋める。",
      },
    ],
    memorize: [
      { k: "SELECT / FROM", v: "FROMで表を指定、SELECTで取り出す列を指定。全列は<code>SELECT *</code>。" },
      { k: "WHERE", v: "行の絞り込み条件。<code>=・&gt;・&lt;・AND・OR・LIKE</code>などを使う。" },
      { k: "ORDER BY", v: "並べ替え。ASC=昇順(既定)、DESC=降順。" },
      { k: "DISTINCT", v: "重複する行を除いて抽出する。" },
      { k: "GROUP BY", v: "指定列の値ごとにグループ化して集計する。" },
      { k: "集計関数", v: "COUNT件数・SUM合計・AVG平均・MAX最大・MIN最小。COUNT(*)=全行、COUNT(列)=NULL以外。" },
      { k: "WHERE / HAVING", v: "WHERE=行の絞り込み(集計前)。HAVING=<strong>集計後(GROUP BY後)</strong>の絞り込み。" },
      { k: "NULL", v: "値が無いことを表す特別な状態。<code>=NULL</code>では絶対に一致せず、<code>IS NULL</code>で判定。" },
      { k: "内部結合(INNER JOIN)", v: "両方の表で<strong>条件に一致する行だけ</strong>を残す。" },
      { k: "外部結合(OUTER JOIN)", v: "<strong>一致しない行も残し</strong>相手側はNULLで埋める。LEFT/RIGHT/FULLがある。" },
      { k: "副問合せ", v: "SQLの中に別のSELECT文を埋め込む。IN・比較演算子と組み合わせて条件に使う。" },
      { k: "インデックス", v: "列に索引を作り検索を高速化。更新のたびに作り直すため更新はやや遅くなる。" },
      { k: "ビュー", v: "実表から定義した仮想表。データ自体は持たず参照時に実表を問い合わせる。" },
    ],
    flashcards: [
      { q: "SELECTとWHEREの役割の違いは？", a: "SELECTは取り出す「列」を指定、WHEREは残す「行」を条件で絞り込む。" },
      { q: "ORDER BYでDESCを付けるとどう並ぶ？", a: "指定した列の値が大きい順（降順）に並ぶ。省略時や ASC は小さい順（昇順）。" },
      { q: "GROUP BYで集計した結果をさらに絞り込むには、WHEREとHAVINGどちらを使う？", a: "HAVING（集計後の条件）。WHEREは集計前の行の絞り込み。" },
      { q: "COUNT(*)とCOUNT(列名)の違いは？", a: "COUNT(*)は全行数、COUNT(列名)はその列がNULLでない行だけを数える。" },
      { q: "内部結合と外部結合(LEFT)の違いは？", a: "内部結合は両方に一致する行だけ残す。外部結合(LEFT)は左側の表の行を全て残し、一致しない右側はNULLで埋める。" },
      { q: "重複行を除いて抽出するSQLのキーワードは？", a: "DISTINCT。" },
    ],
    quiz: [
      {
        q:
          "次の「社員」表に対して、次のSQL文を実行した結果として得られる氏名の組合せはどれか。" +
          qTable("社員", ["社員ID", "氏名", "部門", "年齢"], [["1", "佐藤", "営業", "34"], ["2", "鈴木", "開発", "28"], ["3", "高橋", "営業", "45"], ["4", "田中", "開発", "31"]]) +
          qSql("SELECT 氏名 FROM 社員 WHERE 部門 = '開発'"),
        choices: ["佐藤, 高橋", "鈴木, 田中", "佐藤, 鈴木, 高橋, 田中", "該当する氏名はない"],
        answer: 1,
        explain: "部門が「開発」の行は鈴木・田中の2件。<strong>WHEREは行の絞り込み</strong>で、条件に合う行だけが残る。",
      },
      {
        q:
          "次の「社員」表に対して、次のSQL文を実行したとき、氏名が出力される順序はどれか。" +
          qTable("社員", ["氏名", "年齢"], [["佐藤", "34"], ["鈴木", "28"], ["高橋", "45"], ["田中", "31"]]) +
          qSql("SELECT 氏名 FROM 社員 ORDER BY 年齢 DESC"),
        choices: ["佐藤 → 鈴木 → 高橋 → 田中", "高橋 → 佐藤 → 田中 → 鈴木", "鈴木 → 田中 → 佐藤 → 高橋", "田中 → 高橋 → 鈴木 → 佐藤"],
        answer: 1,
        explain: "<strong>DESC（降順）</strong>なので年齢の大きい順。45(高橋)→34(佐藤)→31(田中)→28(鈴木)。",
      },
      {
        q:
          "次の「受注」表に対して、次のSQL文を実行した結果、出力される担当者はどれか。" +
          qTable("受注", ["受注ID", "担当者", "金額"], [["101", "佐藤", "20000"], ["102", "鈴木", "15000"], ["103", "佐藤", "30000"], ["104", "鈴木", "10000"], ["105", "高橋", "5000"]]) +
          qSql("SELECT 担当者, SUM(金額)\nFROM 受注\nGROUP BY 担当者\nHAVING SUM(金額) >= 25000"),
        choices: ["佐藤のみ", "佐藤と鈴木", "佐藤と鈴木と高橋（全員）", "高橋のみ"],
        answer: 1,
        explain: "担当者ごとの合計は 佐藤=50000、鈴木=25000、高橋=5000。<strong>HAVING SUM(金額)&gt;=25000</strong>を満たすのは佐藤と鈴木（鈴木は25000ちょうどなので含まれる）。",
      },
      {
        q: "SQLで、GROUP BYによってグループ化した後の集計結果に対して条件を指定し、絞り込むために用いる句はどれか。",
        choices: ["WHERE", "HAVING", "ORDER BY", "DISTINCT"],
        answer: 1,
        explain: "集計後（GROUP BY後）の絞り込みは<strong>HAVING</strong>。行単位の絞り込みはWHERE。",
      },
      {
        q:
          "次の「社員」表と「部門」表に対して、次のSQL文を実行した結果は何行になるか。" +
          qTable("社員", ["氏名", "部門ID"], [["佐藤", "D1"], ["鈴木", "D2"], ["高橋", "（未設定）"]]) +
          qTable("部門", ["部門ID", "部門名"], [["D1", "営業"], ["D2", "開発"]]) +
          qSql("SELECT 氏名, 部門名\nFROM 社員 INNER JOIN 部門\nON 社員.部門ID = 部門.部門ID"),
        choices: ["1行", "2行", "3行", "4行"],
        answer: 1,
        explain: "<strong>内部結合(INNER JOIN)</strong>は一致する行だけ残る。高橋は部門IDが未設定で一致しないため除外され、佐藤・鈴木の<strong>2行</strong>になる。",
      },
      {
        q:
          "上と同じ「社員」表・「部門」表に対して、次のSQL文を実行した結果は何行になるか。" +
          qSql("SELECT 氏名, 部門名\nFROM 社員 LEFT JOIN 部門\nON 社員.部門ID = 部門.部門ID"),
        choices: ["1行", "2行", "3行", "4行"],
        answer: 2,
        explain: "<strong>LEFT JOIN(外部結合)</strong>は左の社員表の行を全て残す。高橋も部門名がNULLの状態で残るため<strong>3行</strong>になる。",
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
