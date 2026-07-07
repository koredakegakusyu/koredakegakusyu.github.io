/* =============================================================
   コレダケ学習 基本情報 科目B — 擬似言語の表示ヘルパー
   PCODE(src): 行番号つきの擬似言語コードブロックを描画する。
     - src は改行区切りの文字列。インデントの半角スペースはそのまま表示される。
     - コード中の比較演算子 < > は必ず &lt; &gt; と書くこと（HTMLとして描画されるため）。
   BLANK(label): 空欄（穴埋め）を橙色のバッジで表示する。
   ============================================================= */
function PCODE(src, cap) {
  var lines = String(src).replace(/^\n+/, "").replace(/\n+$/, "").split("\n");
  var s = '<div class="pcode"><table>';
  lines.forEach(function (ln, i) {
    s += '<tr><td class="pc-n">' + (i + 1) + '</td><td class="pc-c">' + (ln === "" ? "&nbsp;" : ln) + "</td></tr>";
  });
  s += "</table>" + (cap ? '<div class="pc-cap">' + cap + "</div>" : "") + "</div>";
  return s;
}
function BLANK(label) {
  return '<span class="pc-blank">' + (label || "&nbsp;&nbsp;") + "</span>";
}
