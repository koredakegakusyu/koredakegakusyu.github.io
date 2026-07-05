/* =============================================================
   コレダケ基本情報 カリキュラム — 01 基礎理論（数値表現・論理演算）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-radix", domain: "基礎理論", icon: "🔢", title: "基数変換と数値表現",
    intro: "2進・8進・16進の変換、2の補数、浮動小数点と誤差。FEの計算問題で毎回問われる土台。",
    understand: [
      {
        h: "2進数・16進数と基数変換",
        body:
          "<p>コンピュータは0と1の<strong>2進数</strong>で動きます。桁が多く読みにくいので、<strong>4桁ずつまとめて16進数</strong>（0〜9とA〜F）で表すのが定番です。</p>" +
          "<p><strong>2進数→10進数</strong>は各桁の重み（…8,4,2,1）を足すだけ。<strong>10進→2進</strong>は2で割った余りを下から並べます。</p>" +
          "<p>下図のように、<strong>2進4桁＝16進1桁</strong>がぴったり対応します。</p>",
        diagram:
          '<svg viewBox="0 0 580 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">2進数 → 16進数（4桁ずつまとめる）</text>' +
          '<rect x="70" y="50" width="180" height="44" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="160" y="79" fill="#23252b" font-size="20" font-weight="800" text-anchor="middle">1010</text>' +
          '<rect x="330" y="50" width="180" height="44" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="420" y="79" fill="#23252b" font-size="20" font-weight="800" text-anchor="middle">1111</text>' +
          '<text x="160" y="118" fill="#a85733" font-size="15" font-weight="800" text-anchor="middle">A</text>' +
          '<text x="420" y="118" fill="#a85733" font-size="15" font-weight="800" text-anchor="middle">F</text>' +
          '<text x="160" y="138" fill="#6b6e76" font-size="11" text-anchor="middle">8+2=10 → A</text>' +
          '<text x="420" y="138" fill="#6b6e76" font-size="11" text-anchor="middle">8+4+2+1=15 → F</text>' +
          '<rect x="150" y="152" width="280" height="30" rx="7" fill="#f2e7cd" stroke="#b28a2e"/><text x="290" y="172" fill="#7a5e17" font-size="14" font-weight="800" text-anchor="middle">2進 10101111 ＝ 16進 AF</text>' +
          "</svg>",
        cap: "2進数を右から4桁ずつ区切り、各4桁を16進1桁に置き換えるだけ。10101111 → AF。",
      },
      {
        h: "「桁上がり」で比べる——2進数・10進数・16進数",
        body:
          "<p>16進数が最初はとっつきにくいのは、<strong>9の次がAになる</strong>という見慣れない桁上がりのせいです。実は<strong>「その基数で使える数字を使い切ったら1桁繰り上がる」というルールはどの基数でも同じ</strong>です。3つを並べて数えてみると、法則がそろって見えてきます。</p>" +
          "<ul>" +
          "<li><strong>2進数</strong>：使える数字は<strong>0と1の2種類</strong>だけ。1の次でもう使い切るので、<strong>すぐ繰り上がる</strong>（1 → 10 → 11 → 100…）。</li>" +
          "<li><strong>10進数</strong>：使える数字は<strong>0〜9の10種類</strong>。9の次で繰り上がる（ふだん使っている数え方）。</li>" +
          "<li><strong>16進数</strong>：使える数字は<strong>0〜9とA〜Fの16種類</strong>（A=10, B=11, C=12, D=13, E=14, F=15の意味）。<strong>Fの次で</strong>ようやく繰り上がる。</li>" +
          "</ul>" +
          "<p>つまり16進数は「9の後にまだ6種類（10〜15）を1桁で表したいから、A〜Fというアルファベットを借りてきている」だけです。下の対応表で、10進の0〜16が2進・16進でどう変わるか、繰り上がる場所（色を変えた行）を見比べてください。</p>",
        diagram:
          '<svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="230" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">桁上がりの比較（10進・2進・16進）</text>' +
          (function () {
            var rows = [
              [0, "0", "0"], [1, "1", "1"], [2, "10", "2"], [3, "11", "3"],
              [4, "100", "4"], [5, "101", "5"], [6, "110", "6"], [7, "111", "7"],
              [8, "1000", "8"], [9, "1001", "9"], [10, "1010", "A"], [11, "1011", "B"],
              [12, "1100", "C"], [13, "1101", "D"], [14, "1110", "E"], [15, "1111", "F"],
              [16, "10000", "10"],
            ];
            var colW = [70, 170, 170], x0 = 30, y0 = 36, rowH = 21.2;
            var s = "";
            var heads = ["10進", "2進", "16進"];
            var cx = x0;
            for (var c = 0; c < 3; c++) {
              s += '<rect x="' + cx + '" y="' + y0 + '" width="' + colW[c] + '" height="' + rowH + '" fill="#eceff3" stroke="#b9c0c8"/>';
              s += '<text x="' + (cx + colW[c] / 2) + '" y="' + (y0 + 15) + '" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">' + heads[c] + "</text>";
              cx += colW[c];
            }
            rows.forEach(function (row, i) {
              var y = y0 + (i + 1) * rowH;
              var carry2 = (row[0] > 0) && ((row[0] & (row[0] - 1)) === 0);
              var carry16 = row[0] === 16;
              var rowFillDec = "#ffffff", rowFillBin = carry2 ? "#dce8f3" : "#ffffff", rowFillHex = carry16 ? "#f2e7cd" : "#ffffff";
              var cells = [String(row[0]), row[1], row[2]];
              var fills = [rowFillDec, rowFillBin, rowFillHex];
              var cx2 = x0;
              for (var c2 = 0; c2 < 3; c2++) {
                s += '<rect x="' + cx2 + '" y="' + y + '" width="' + colW[c2] + '" height="' + rowH + '" fill="' + fills[c2] + '" stroke="#d8dbe0"/>';
                s += '<text x="' + (cx2 + colW[c2] / 2) + '" y="' + (y + 15) + '" fill="#23252b" font-size="11" font-family="monospace" text-anchor="middle">' + cells[c2] + "</text>";
                cx2 += colW[c2];
              }
            });
            return s;
          })() +
          '<text x="230" y="440" fill="#6b6e76" font-size="10.5" text-anchor="middle">青＝2進が繰り上がる行（1の次からすぐ）、橙＝16進が繰り上がる行（Fの次でやっと）</text>' +
          "</svg>",
        cap: "同じ10進の0〜16を、2進・16進で並べた対応表。2進はすぐ繰り上がり、16進はFまで粘ってから繰り上がる。",
      },
      {
        h: "負の数は「2の補数」で表す",
        body:
          "<p>コンピュータでマイナスの数を表すのが<strong>2の補数</strong>です。作り方は、<strong>全ビットを反転（0↔1）して1を足す</strong>だけ。</p>" +
          "<p>例：8ビットで −5 を作るなら、5＝00000101 → 反転 11111010 → +1 で <strong>11111011</strong>。これで足し算だけで引き算が実現できます。</p>" +
          "<div class='point'><span>nビットの2の補数で表せる範囲は <strong>−2ⁿ⁻¹ 〜 2ⁿ⁻¹−1</strong>（8ビットなら −128〜127）。</span></div>",
      },
      {
        h: "浮動小数点数と「誤差」",
        body:
          "<p>小数は<strong>浮動小数点数</strong>（符号・指数・仮数）で近似的に表します。2進で正確に表せない小数があるため、計算に<strong>誤差</strong>が生じます。</p>" +
          "<ul>" +
          "<li><strong>丸め誤差</strong>：表せない桁を切り捨て・四捨五入して生じる。</li>" +
          "<li><strong>桁落ち</strong>：ほぼ等しい2数の差で有効桁が失われる。</li>" +
          "<li><strong>情報落ち</strong>：絶対値が大きく違う数の加減で小さい方が無視される。</li>" +
          "<li><strong>オーバーフロー（桁あふれ）</strong>：表せる最大を超える。</li>" +
          "</ul>",
      },
    ],
    memorize: [
      { k: "2進4桁＝16進1桁", v: "0000〜1111 が 0〜F に対応。8421の重みで即変換。" },
      { k: "2の補数", v: "負数表現。<strong>全ビット反転して+1</strong>。引き算を足し算で行える。" },
      { k: "8ビットの範囲", v: "符号なし0〜255。2の補数（符号つき）は −128〜127。" },
      { k: "丸め誤差", v: "表現できない下位桁を丸めて生じる誤差。" },
      { k: "桁落ち", v: "ほぼ等しい数どうしの引き算で有効桁数が減る誤差。" },
      { k: "情報落ち", v: "絶対値の大きく異なる数の加減算で、小さい値が反映されない誤差。" },
    ],
    flashcards: [
      { q: "2進数 11010110 を16進数にすると？", a: "4桁ずつ 1101 / 0110 → D / 6 → D6。" },
      { q: "8ビットの2の補数で −1 はどう表す？", a: "1＝00000001 を反転11111110 +1 → 11111111（全ビット1）。" },
      { q: "16進数 A の10進数と2進数は？", a: "10進10、2進1010。" },
      { q: "ほぼ等しい2つの数の引き算で有効数字が減る誤差は？", a: "桁落ち。" },
      { q: "8ビットの2の補数で表せる整数の範囲は？", a: "−128 〜 +127。" },
    ],
    quiz: [
      {
        q: "16進数 2F を10進数で表したものはどれか。",
        choices: ["31", "45", "47", "63"],
        answer: 2,
        explain: "2F＝2×16 + F(15)＝32+15＝<strong>47</strong>。",
      },
      {
        q: "10進数 100 を16進数で表したものはどれか。",
        choices: ["64", "6A", "A0", "C4"],
        answer: 0,
        explain: "100÷16＝6余り4 → <strong>64</strong>（16進）。6×16+4＝100で確認。",
      },
      {
        q: "8ビットの2の補数表現で、10進数 −6 を表したものはどれか。",
        choices: ["11111010", "11111001", "00000110", "10000110"],
        answer: 0,
        explain: "6＝00000110 → 反転11111001 → +1 → <strong>11111010</strong>。",
      },
      {
        q: "絶対値の大きさが極端に異なる2つの浮動小数点数を加算したとき、小さいほうの値が結果にほとんど反映されない現象はどれか。",
        choices: ["桁落ち", "情報落ち", "丸め誤差", "オーバーフロー"],
        answer: 1,
        explain: "大小差が極端な数の加減で小さい値が消えるのは<strong>情報落ち</strong>。近い数の差で桁が減るのは桁落ち。",
      },
      {
        q: "2進数 1011 と 2進数 110 を加算した結果を2進数で表したものはどれか。",
        choices: ["10001", "10000", "1111", "10010"],
        answer: 0,
        explain: "1011(11)+110(6)＝17＝<strong>10001</strong>（16+1）。",
      },
    ],
  },
  {
    id: "fe-logic", domain: "基礎理論", icon: "⚙️", title: "論理演算とシフト演算",
    intro: "AND/OR/NOT/XOR、シフト演算（×2・÷2）、ド・モルガン。ビット操作はFEの定番。",
    understand: [
      {
        h: "論理演算とビット演算",
        body:
          "<p>0と1に対する演算が<strong>論理演算</strong>。ビットごとに適用します。</p>" +
          "<ul>" +
          "<li><strong>AND（論理積）</strong>：両方1で1。特定ビットを取り出す<strong>マスク</strong>に使う。</li>" +
          "<li><strong>OR（論理和）</strong>：どちらか1で1。特定ビットを1にする。</li>" +
          "<li><strong>NOT（否定）</strong>：0↔1反転。</li>" +
          "<li><strong>XOR（排他的論理和）</strong>：異なると1。特定ビットを反転する。</li>" +
          "</ul>" +
          "<p>否定を分配する<strong>ド・モルガンの法則</strong>：not(A and B) = notA or notB、not(A or B) = notA and notB。</p>",
      },
      {
        h: "シフト演算——ビットをずらすと×2・÷2",
        body:
          "<p>ビット列を左右にずらすのが<strong>シフト演算</strong>。</p>" +
          "<p><strong>左へ1ビットシフト＝2倍</strong>、<strong>右へ1ビットシフト＝1/2（÷2）</strong>になります。nビットずらせば 2ⁿ 倍／÷2ⁿ です。</p>" +
          "<p>符号を考えない<strong>論理シフト</strong>と、符号ビットを保つ<strong>算術シフト</strong>があります。</p>",
        diagram:
          '<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">左1ビットシフト＝2倍</text>' +
          (function () {
            function bits(x, y, arr, hi) {
              var s = "", w = 34;
              arr.forEach(function (b, i) {
                var bx = x + i * (w + 4);
                var f = (hi && hi.indexOf(i) >= 0) ? "#f2e7cd" : "#dce8f3";
                var st = (hi && hi.indexOf(i) >= 0) ? "#b28a2e" : "#4a7fa8";
                s += '<rect x="' + bx + '" y="' + y + '" width="' + w + '" height="34" rx="5" fill="' + f + '" stroke="' + st + '"/>';
                s += '<text x="' + (bx + w / 2) + '" y="' + (y + 23) + '" fill="#23252b" font-size="15" font-weight="700" text-anchor="middle">' + b + "</text>";
              });
              return s;
            }
            var s = "";
            s += bits(120, 44, ["0", "0", "0", "0", "1", "0", "1", "1"]);
            s += '<text x="70" y="66" fill="#6b6e76" font-size="12">元</text><text x="470" y="66" fill="#6b6e76" font-size="12">= 11</text>';
            s += '<text x="280" y="104" fill="#a85733" font-size="18" text-anchor="middle">↓ 左へ1つずらす</text>';
            s += bits(120, 116, ["0", "0", "0", "1", "0", "1", "1", "0"], [7]);
            s += '<text x="70" y="138" fill="#6b6e76" font-size="12">後</text><text x="470" y="138" fill="#6b6e76" font-size="12">= 22</text>';
            return s;
          })() +
          "</svg>",
        cap: "全ビットを左へ1つずらし右端に0を入れると値は2倍（11→22）。右シフトなら÷2。",
      },
    ],
    memorize: [
      { k: "AND（マスク）", v: "両方1で1。特定ビットだけ取り出す（0でマスク）。" },
      { k: "OR", v: "どちらか1で1。特定ビットを1にセット。" },
      { k: "XOR", v: "異なると1。特定ビットを反転／同じ値のXORは0。" },
      { k: "左シフトn", v: "値は <strong>2ⁿ 倍</strong>。右シフトnは ÷2ⁿ。" },
      { k: "算術シフト", v: "符号ビットを保ったままシフト（符号つき数の×2・÷2）。" },
      { k: "ド・モルガン", v: "not(A and B)=notA or notB。not(A or B)=notA and notB。" },
    ],
    flashcards: [
      { q: "2進数を左へ3ビットシフトすると値は何倍になる？", a: "2の3乗＝8倍。右へ3ビットなら1/8。" },
      { q: "AND演算の主な使い道は？", a: "マスク処理（特定のビットだけを取り出す・残りを0にする）。" },
      { q: "同じビット列どうしのXORの結果は？", a: "すべて0（各ビットが同じ値なのでXORは0）。" },
      { q: "ド・モルガンの法則で not(A and B) は？", a: "notA or notB。" },
      { q: "論理シフトと算術シフトの違いは？", a: "論理は符号を考えない、算術は符号ビットを保持する（符号つき数の×2・÷2に使う）。" },
    ],
    quiz: [
      {
        q: "8ビットの2進数 00101100 と 00001111 のビットごとの論理積(AND)はどれか。",
        choices: ["00001100", "00101111", "00100000", "00000011"],
        answer: 0,
        explain: "各ビットで両方1のときだけ1。→ <strong>00001100</strong>（下位4ビットのマスクで1100が残る）。",
      },
      {
        q: "2進数 00000110 を左に2ビット論理シフトした結果を10進数で表すといくらか。",
        choices: ["12", "18", "24", "3"],
        answer: 2,
        explain: "元は6。左2ビット＝×2²＝×4。6×4＝<strong>24</strong>（2進00011000）。",
      },
      {
        q: "あるビット列の特定のビットだけを反転させたい。用いる論理演算はどれか。",
        choices: ["AND", "OR", "XOR", "NOT"],
        answer: 2,
        explain: "反転したいビットを1にした値と<strong>XOR</strong>すると、そのビットだけ反転する。",
      },
      {
        q: "論理式 not(A or B) と等しいものはどれか（ド・モルガンの法則）。",
        choices: ["notA or notB", "notA and notB", "A and B", "A or B"],
        answer: 1,
        explain: "ド・モルガンより not(A or B) = <strong>notA and notB</strong>。",
      },
    ],
  }
);
