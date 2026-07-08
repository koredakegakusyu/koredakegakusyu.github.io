/* =============================================================
   コレダケ学習 基本情報 科目B — 06 連結リスト
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "feb-linked-list", domain: "【科目B】第2章 データ構造とアルゴリズム", icon: "🔗", title: "連結リスト",
    intro: "『値＋次への矢印』でつなぐ連結リスト。挿入・削除が得意な理由と、ポインタのつなぎ替えを図で理解する。",
    understand: [
      {
        h: "連結リストとは——値と『次の場所』をセットで持つ",
        body:
          "<p><strong>連結リスト</strong>は、データを<strong>ノード（節）</strong>という箱に入れて<strong>矢印（ポインタ）でつなげた</strong>データ構造です。各ノードは<strong>『値』と『次のノードを指す情報（next）』</strong>を持ちます。先頭を指す変数（先頭ポインタ）から、next をたどって順にアクセスします。最後のノードの next は『無い（未定義／null）』です。</p>" +
          "<p>配列と違い、メモリ上でバラバラの場所にあってもよく、<strong>途中への挿入・削除が速い</strong>のが利点です（矢印のつなぎ替えだけで済む）。逆に<strong>『先頭からたどるしかない』ため、n番目に直接飛べない（ランダムアクセスが苦手）</strong>という弱点があります。</p>",
        diagram:
          '<svg viewBox="0 0 580 150" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">連結リスト（値 ＋ next でつなぐ）</text>' +
          '<text x="40" y="70" fill="#a85733" font-size="10.5" font-weight="700" text-anchor="middle">先頭</text><line x1="40" y1="76" x2="40" y2="95" stroke="#a85733" stroke-width="1.6"/><polygon points="40,95 35,86 45,86" fill="#a85733"/>' +
          (function () {
            var nodes = ["10", "20", "30"];
            var s = "", x0 = 66;
            nodes.forEach(function (v, i) {
              var x = x0 + i * 160;
              s += '<rect x="' + x + '" y="60" width="120" height="44" rx="6" fill="#dce8f3" stroke="#4a7fa8"/>';
              s += '<line x1="' + (x + 78) + '" y1="60" x2="' + (x + 78) + '" y2="104" stroke="#4a7fa8"/>';
              s += '<text x="' + (x + 39) + '" y="87" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">' + v + "</text>";
              s += '<text x="' + (x + 99) + '" y="80" fill="#6b6e76" font-size="9" text-anchor="middle">next</text>';
              if (i < nodes.length - 1) {
                s += '<line x1="' + (x + 120) + '" y1="82" x2="' + (x + 160) + '" y2="82" stroke="#8a8f98" stroke-width="1.8"/><polygon points="' + (x + 160) + ',82 ' + (x + 150) + ',77 ' + (x + 150) + ',87" fill="#8a8f98"/>';
              } else {
                s += '<text x="' + (x + 99) + '" y="95" fill="#c26b4a" font-size="12" font-weight="700" text-anchor="middle">✕</text>';
                s += '<text x="' + (x + 60) + '" y="128" fill="#6b6e76" font-size="9.5" text-anchor="middle">最後のnextは無し(null)</text>';
              }
            });
            return s;
          })() +
          "</svg>",
        cap: "各ノードは値とnext（次への矢印）を持つ。先頭からnextをたどって進む。最後のnextは無し。",
      },
      {
        h: "リストをたどる（探索）——nextで順に進む",
        body:
          "<p>連結リストの要素を順に見るには、<strong>『今見ているノード』を表す変数を、next で次々に進めていく</strong>のが基本です。ここでは <code>ノード.値</code> でそのノードの値、<code>ノード.next</code> で次のノードを表します（メンバ参照『.』）。</p>" +
          PCODE(
            "// 先頭 から順にたどり、目的の値を探す\n" +
            "現在 ← 先頭\n" +
            "while (現在 が 未定義でない)\n" +
            "  if (現在.値 = 目的)\n" +
            "    return 現在        // 見つかった\n" +
            "  endif\n" +
            "  現在 ← 現在.next     // 次のノードへ進む\n" +
            "endwhile\n" +
            "return 未定義          // 最後まで無かった",
            "『現在』を先頭から next で進めながら値を調べる。末尾（next無し）で終わる。"
          ),
      },
      {
        h: "挿入・削除——矢印をつなぎ替えるだけ",
        body:
          "<p>連結リストの強みは<strong>途中への挿入・削除が速い</strong>ことです。配列だと後ろの要素を全部ずらす必要がありますが、リストは<strong>矢印（next）を2〜3本つなぎ替えるだけ</strong>で済みます。</p>" +
          "<p>例：ノード P の直後に新ノード X を挿入するには、<strong>①X.next に P.next（＝Pの次）を入れ、②P.next に X を入れる</strong>——この順番が重要です。逆にすると P の次の情報が消えてしまいます。削除も同様に、削除したいノードの1つ前の next を、その先へ付け替えます。</p>" +
          PCODE(
            "// ノード P の直後に 新ノード X を挿入する\n" +
            "X.next ← P.next   // ① まず X が「Pの次」を指す\n" +
            "P.next ← X        // ② 次に P が X を指す\n" +
            "// ①②の順を逆にすると P.next が失われる",
            "①でXに続きをつないでから、②でPをXにつなぐ。順番を守るのが鉄則。"
          ),
      },
    ],
    memorize: [
      { k: "連結リスト", v: "ノード（値＋next）を矢印でつないだ構造。先頭からnextでたどる。" },
      { k: "ノード.next", v: "次のノードを指す。最後のノードのnextは無し（未定義/null）。" },
      { k: "リストの長所", v: "途中の挿入・削除が速い（矢印のつなぎ替えだけ）。" },
      { k: "リストの短所", v: "n番目に直接飛べない（先頭から順にたどる必要がある）。" },
      { k: "挿入の順番", v: "①新ノードのnextを『続き』に、②前のノードのnextを新ノードに。逆は不可。" },
      { k: "双方向リスト", v: "next（次）だけでなくprev（前）も持つ。前後どちらにもたどれる。" },
    ],
    flashcards: [
      { q: "連結リストの各ノードは何を持っている？", a: "値と、次のノードを指す情報（next）。" },
      { q: "連結リストが配列より優れている点は？", a: "途中への挿入・削除が速い（矢印のつなぎ替えだけで、後ろをずらす必要がない）。" },
      { q: "連結リストが配列より苦手なことは？", a: "n番目の要素に直接飛べない（先頭からnextを順にたどる必要がある）。" },
      { q: "ノードPの直後に新ノードXを挿入する正しい手順は？", a: "①X.next←P.next（Xが続きを指す）、②P.next←X（PがXを指す）。この順番を守る。" },
    ],
    quiz: [
      {
        q:
          "連結リストが 先頭→A→B→C（各ノードのnextで連結、Cのnextは無し）とつながっている。次の操作を行った後、先頭からたどると要素はどう並ぶか。新ノードXの値は『新』とする。" +
          PCODE(
            "X.next ← A.next   // A.next は B\n" +
            "A.next ← X"
          ),
        choices: ["A → X → B → C", "X → A → B → C", "A → B → X → C", "A → B → C → X"],
        answer: 0,
        explain: "Aの直後にXを挿入する操作。X.nextがB、A.nextがXになるので<strong>A→X→B→C</strong>。",
      },
      {
        q: "連結リストと配列の比較として、連結リストの特徴に当てはまるものはどれか。",
        choices: [
          "要素番号を指定して任意の要素へ一定時間で直接アクセスできる",
          "途中への要素の挿入・削除が、後続要素をずらさずに行えて速い",
          "メモリ上で必ず連続した領域に配置される",
          "要素数があらかじめ固定される",
        ],
        answer: 1,
        explain: "連結リストは<strong>挿入・削除が速い</strong>（つなぎ替えだけ）。直接アクセスや連続配置は配列の特徴。",
      },
      {
        q:
          "先頭→10→20→30 とつながった連結リストを、次のプログラムでたどる。出力される値の順はどれか。" +
          PCODE(
            "現在 ← 先頭\n" +
            "while (現在 が 未定義でない)\n" +
            "  現在.値 を出力\n" +
            "  現在 ← 現在.next\n" +
            "endwhile"
          ),
        choices: ["10, 20, 30", "30, 20, 10", "10 だけ", "30 だけ"],
        answer: 0,
        explain: "先頭からnextで順にたどるので<strong>10, 20, 30</strong>の順に出力される。",
      },
      {
        q: "各ノードが『次』へのポインタに加えて『前』へのポインタも持ち、前後どちらの方向にもたどれる連結リストを何と呼ぶか。",
        choices: ["単方向リスト", "双方向リスト", "循環リスト", "2分木"],
        answer: 1,
        explain: "前後両方向にたどれるのは<strong>双方向リスト</strong>（各ノードがnextとprevを持つ）。",
      },
      {
        q:
          "大域変数 listHead を先頭とする単方向リスト（各要素はクラス Node、メンバ val・next）から、先頭でない要素 target を削除する。target の1つ前の要素 prev は分かっているものとする。空欄 <b>a</b> に入れる正しい記述はどれか。" +
          PCODE(
            "// prev.next が target を指している状態\n" +
            "prev.next ← " + BLANK("a") + "   // targetを飛ばしてつなぎ替える"
          ),
        choices: ["target.next", "target.val", "prev.next", "未定義"],
        answer: 0,
        explain: "削除は『前の要素の next を、削除要素の次へ付け替える』。prev.next に <strong>target.next</strong> を入れると target が链から外れる（飛ばされる）。これが連結リスト削除の定石。",
      },
      {
        q:
          "単方向リストが 先頭→A→B→C→D とつながっている。次の操作を順に行った後、先頭からたどった並びはどれか。（各要素はクラス Node、prevBはBを指す変数）" +
          PCODE(
            "Node: X ← Node('X')\n" +
            "X.next ← prevB.next   // prevB.next は B\n" +
            "prevB.next ← X        // AとBの間にX挿入\n" +
            "B.next ← D            // Cを飛ばす（Cを削除）"
          ),
        choices: ["A → X → B → D", "A → X → B → C → D", "A → B → X → C → D", "A → X → B → C"],
        answer: 0,
        explain: "AとBの間にXを挿入（A→X→B）。さらにB.nextをDにしてCを削除（B→D）。結果は<strong>A→X→B→D</strong>。挿入と削除のポインタ操作を続けて追う本番型。",
      },
    ],
  }
);
