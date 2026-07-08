/* =============================================================
   コレダケ学習 基本情報 科目B — 09 演習問題（本番形式・過去問レベル）
   ※ 問題のみ。選択肢を選ぶと採点＋解説が出る。理解/暗記フェーズは無し。
   ※ すべてオリジナル作問（標準的アルゴリズムを本番形式・本番難度で出題）。
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];

/* クラスのメンバ変数説明テーブル（本番の表を再現するヘルパ） */
function CLASSTBL(rows, cap) {
  var s = "<div class='pcode'><table style='width:100%'>";
  s += "<tr><td class='pc-c' style='font-weight:700;border-bottom:1px solid var(--border)'>メンバ変数</td>" +
       "<td class='pc-c' style='font-weight:700;border-bottom:1px solid var(--border)'>型</td>" +
       "<td class='pc-c' style='font-weight:700;border-bottom:1px solid var(--border)'>説明</td></tr>";
  rows.forEach(function (r) {
    s += "<tr><td class='pc-c'>" + r[0] + "</td><td class='pc-c'>" + r[1] + "</td><td class='pc-c'>" + r[2] + "</td></tr>";
  });
  s += "</table>" + (cap ? "<div class='pc-cap'>" + cap + "</div>" : "") + "</div>";
  return s;
}

/* 配列の内容を『要素番号つきの表』で示すヘルパ（図1のような見せ方） */
function ARRVIEW(name, cells, cap) {
  var s = "<div class='pcode'><table><tr><td class='pc-n'>要素番号</td>";
  cells.forEach(function (_, i) { s += "<td class='pc-c' style='text-align:center'>" + (i + 1) + "</td>"; });
  s += "</tr><tr><td class='pc-n'>" + name + "</td>";
  cells.forEach(function (v) {
    s += "<td class='pc-c' style='text-align:center'>" + (v === null ? "<span style='color:var(--text-dim)'>未定義</span>" : v) + "</td>";
  });
  s += "</tr></table>" + (cap ? "<div class='pc-cap'>" + cap + "</div>" : "") + "</div>";
  return s;
}

window.CURRICULUM.push(
  {
    id: "feb-jissen", domain: "【科目B】第3章 演習問題", icon: "🎯", title: "演習問題",
    intro: "本番と同じ形式・同じ難度の実戦問題。1問あたり約5分、紙にトレース表を書いて解く前提。選択肢を選ぶと採点と解説が出ます。",
    understand: [],
    memorize: [],
    flashcards: [],
    quiz: [
      /* ---- 1. 単方向リストの要素削除（クラス・ポインタ操作） ---- */
      {
        q:
          "手続 removeAt は、単方向リストから、引数 k で指定された位置の要素を削除する。k はリストの要素数以下の正の整数で、先頭の位置を1とする。各要素はクラス Cell で表し、大域変数 head にはリストの先頭要素の参照が格納されている。空欄 <b></b> に入れる正しい答えはどれか。" +
          CLASSTBL([
            ["value", "整数型", "要素の値。"],
            ["next", "Cell", "次の要素の参照。次が無いときは未定義。"],
          ], "クラス Cell のメンバ変数") +
          PCODE(
            "大域: Cell: head   // 先頭要素の参照が格納されている\n" +
            "\n" +
            "○removeAt(整数型: k)\n" +
            "  Cell: cur\n" +
            "  整数型: i\n" +
            "  if (k が 1 と等しい)\n" +
            "    head ← head.next\n" +
            "  else\n" +
            "    cur ← head\n" +
            "    // k−1 番目の要素まで cur を進める\n" +
            "    for (i を 1 から k − 2 まで 1 ずつ増やす)\n" +
            "      cur ← cur.next\n" +
            "    endfor\n" +
            "    cur.next ← " + BLANK() + "\n" +
            "  endif"
          ),
        choices: ["cur.next", "cur.next.next", "head.next", "cur.value"],
        answer: 1,
        explain: "for を抜けた時点で cur は<strong>削除したい要素の1つ手前（k−1番目）</strong>を指す。cur.next が削除対象（k番目）なので、その<strong>次（cur.next.next）を cur.next につなぎ替える</strong>と、削除対象が链から外れる。これが単方向リスト削除の定石。",
      },

      /* ---- 2. 配列2つで単方向リストを表現（静的リスト） ---- */
      {
        q:
          "単方向リストを、値の配列 value と『次の要素番号』の配列 link の二つで表現する。value[p] が要素の値、link[p] が次の要素の要素番号で、次が無いときは未定義である。リストの先頭は要素番号1とする。図の内容のとき、関数 collect（先頭からたどって値を順に集めた配列を返す）の空欄 <b>a</b> に入れる正しい答えはどれか。要素番号は1から始まる。" +
          ARRVIEW("value", [60, 20, 40, 10, null]) +
          ARRVIEW("link", [3, null, 4, 2, null], "先頭=1。1→3→4→2 とたどる（値は 60→40→10→20）") +
          PCODE(
            "○整数型の配列: collect()\n" +
            "  整数型の配列: result ← {}   // 要素数0の配列\n" +
            "  整数型: p ← 1               // 先頭の要素番号\n" +
            "  while (p が 未定義でない)\n" +
            "    result の末尾に value[p] を追加する\n" +
            "    p ← " + BLANK("a") + "\n" +
            "  endwhile\n" +
            "  return result"
          ),
        choices: ["value[p]", "link[p]", "p + 1", "link[1]"],
        answer: 1,
        explain: "『次の要素』へ進むには、今いる要素番号 p に対応する<strong>次の要素番号 link[p]</strong> を p に入れる。value[p]は値なので誤り、p+1は隣の番号であって链の順ではない。実際 p は 1→link[1]=3→link[3]=4→link[4]=2→link[2]=未定義 と進み、値は60,40,10,20 が集まる。",
      },

      /* ---- 3. 2分木の走査（配列の配列で表現・再帰） ---- */
      {
        q:
          "大域配列 tree は2分木を表す。tree[n] は節 n の子の節番号を<strong>左の子・右の子の順</strong>に並べた配列で、葉（子が無い節）では要素数0の配列 {} である。例えば tree[1]＝{2, 3} は、節1の左の子が節2・右の子が節3であることを表す。手続 visit を visit(1) として呼び出したとき、節番号が出力される順序はどれか。" +
          PCODE(
            "大域: 整数型配列の配列: tree ←\n" +
            "  { {2, 3}, {4, 5}, {6, 7}, {}, {}, {}, {} }\n" +
            "\n" +
            "○visit(整数型: n)\n" +
            "  if (tree[n]の要素数 が 2 と等しい)\n" +
            "    visit(tree[n][1])   // 左の子\n" +
            "    n を出力\n" +
            "    visit(tree[n][2])   // 右の子\n" +
            "  else\n" +
            "    n を出力            // 葉\n" +
            "  endif"
          ),
        choices: [
          "1, 2, 4, 5, 3, 6, 7",
          "4, 2, 5, 1, 6, 3, 7",
          "4, 5, 2, 6, 7, 3, 1",
          "1, 2, 3, 4, 5, 6, 7",
        ],
        answer: 1,
        explain: "『左→自分→右』の<strong>中間順（間順）</strong>走査。visit(1)→visit(2)→visit(4)で葉4→2→visit(5)で5→1→visit(3)→6→3→7。結果は<strong>4, 2, 5, 1, 6, 3, 7</strong>。アは先行順、ウは後行順、エは節番号順（幅優先）。",
      },

      /* ---- 4. 2分探索木への挿入（空欄補充） ---- */
      {
        q:
          "2分探索木に値を挿入する手続 insert の空欄 <b></b> に入れる正しい答えはどれか。各節はクラス Node（value・left・right、子は初期状態で未定義）で表し、大域変数 root は木の根（空のときは未定義）。2分探索木は『どの節も、左の部分木の値＜自分＜右の部分木の値』を満たす。" +
          PCODE(
            "○insert(整数型: v)\n" +
            "  if (root が 未定義)\n" +
            "    root ← Node(v)\n" +
            "    return\n" +
            "  endif\n" +
            "  Node: cur ← root\n" +
            "  while (true)\n" +
            "    if (v が cur.value より小さい)\n" +
            "      if (cur.left が 未定義)\n" +
            "        cur.left ← Node(v)\n" +
            "        return\n" +
            "      endif\n" +
            "      cur ← " + BLANK() + "\n" +
            "    else\n" +
            "      if (cur.right が 未定義)\n" +
            "        cur.right ← Node(v)\n" +
            "        return\n" +
            "      endif\n" +
            "      cur ← cur.right\n" +
            "    endif\n" +
            "  endwhile"
          ),
        choices: ["cur.left", "cur.right", "root", "Node(v)"],
        answer: 0,
        explain: "2分探索木は『小さければ左』。v が cur.value より小さく、左の子がすでに存在するなら、<strong>cur ← cur.left</strong> で左の子へ降りて空きを探し続ける。右側と対になっている（cur.right へ降りる）ことからも判断できる。",
      },

      /* ---- 5. ユークリッドの互除法（再帰トレース） ---- */
      {
        q:
          "次の再帰関数 gcd（ユークリッドの互除法で最大公約数を求める）を gcd(54, 24) で呼び出したときの戻り値はどれか。ここで『a mod b』は a を b で割った余りを表す。" +
          PCODE(
            "○整数型: gcd(整数型: a, 整数型: b)\n" +
            "  if (b が 0 と等しい)\n" +
            "    return a\n" +
            "  endif\n" +
            "  return gcd(b, a mod b)"
          ),
        choices: ["3", "6", "9", "12"],
        answer: 1,
        explain: "gcd(54,24)→gcd(24, 54 mod 24=6)→gcd(6, 24 mod 6=0)→b=0 で 6 を返す。54と24の最大公約数は<strong>6</strong>。余りが0になった時の『割る数』が答え。",
      },

      /* ---- 6. ビット中の1の個数（論理・繰返し） ---- */
      {
        q:
          "非負整数 x を受け取り、ある値を返す関数 f がある。f(45) の戻り値はどれか。『÷ の商』は小数点以下切り捨てを表す。" +
          PCODE(
            "○整数型: f(整数型: x)\n" +
            "  整数型: r ← 0\n" +
            "  while (x が 0 より大きい)\n" +
            "    r ← r + (x mod 2)\n" +
            "    x ← x ÷ 2 の商\n" +
            "  endwhile\n" +
            "  return r"
          ),
        choices: ["3", "4", "5", "45"],
        answer: 1,
        explain: "x を2で割りながら余り（最下位ビット）を足す＝<strong>2進数での1の個数</strong>。45＝101101₂ なので1は<strong>4</strong>個。r は 1→1→2→3→3→4 と増える。",
      },

      /* ---- 7. 10進→2進変換（文字列・繰返し） ---- */
      {
        q:
          "正の整数 n を2進数の文字列に変換する関数 toBin に、toBin(22) を渡したときの戻り値はどれか。文字列の ＋ は連結を、『÷ の商』は切り捨てを表す。" +
          PCODE(
            "○文字列型: toBin(整数型: n)\n" +
            "  文字列型: s ← \"\"\n" +
            "  while (n が 0 より大きい)\n" +
            "    s ← (n mod 2 の文字列) ＋ s   // 先頭に桁を足す\n" +
            "    n ← n ÷ 2 の商\n" +
            "  endwhile\n" +
            "  return s"
          ),
        choices: ["\"01011\"", "\"10110\"", "\"11010\"", "\"01101\""],
        answer: 1,
        explain: "余りを<strong>先頭に</strong>足すのがポイント。n:22(余0)→11(余1)→5(余1)→2(余0)→1(余1)→0。先頭に足すので \"1\"→\"01\"→\"101\"→\"0101\"→\"10110\"。22＝<strong>\"10110\"</strong>。末尾に足すと逆順になる引っかけ。",
      },

      /* ---- 8. 整列済み配列のマージ（空欄補充） ---- */
      {
        q:
          "昇順に整列済みの二つの配列 A, B を併合して、一つの昇順配列を作る関数 merge の空欄 <b></b> に入れる正しい答えはどれか。要素番号は1から始まる。" +
          PCODE(
            "○整数型の配列: merge(整数型の配列: A, 整数型の配列: B)\n" +
            "  整数型: i ← 1, j ← 1\n" +
            "  整数型の配列: C ← {}\n" +
            "  while ((i ≦ Aの要素数) and (j ≦ Bの要素数))\n" +
            "    if (A[i] ≦ B[j])\n" +
            "      Cの末尾に A[i] を追加する\n" +
            "      i ← i + 1\n" +
            "    else\n" +
            "      Cの末尾に B[j] を追加する\n" +
            "      " + BLANK() + "\n" +
            "    endif\n" +
            "  endwhile\n" +
            "  // どちらかが残ったら順に C の末尾へ追加（省略）\n" +
            "  return C"
          ),
        choices: ["j ← j + 1", "i ← i + 1", "i ← i + 1, j ← j + 1", "j ← 1"],
        answer: 0,
        explain: "この else 節は B[j] を取り出して C に入れた場合。進めるのは<strong>B 側の読み位置だけ</strong>なので <strong>j ← j + 1</strong>。i を進めると A の要素を1つ飛ばしてしまう。A・B のどちらか小さい方を取り出しては、その側だけ進めるのがマージの基本。",
      },

      /* ---- 9. 逆ポーランド記法の計算（スタック応用・トレース） ---- */
      {
        q:
          "逆ポーランド記法（後置記法）で書かれた式を、スタックを使って計算する。数値はスタックに push し、演算子が来たら上位2つを pop して計算し結果を push する。式 <code>6 2 − 4 ×</code>（＝(6−2)×4）を処理したとき、最後にスタックに残る値はどれか。減算は『下の値 − 上の値』とする。" +
          PCODE(
            "6 を push          // [6]\n" +
            "2 を push          // [6, 2]\n" +
            "− : b←pop(2), a←pop(6), (a − b) を push   // [4]\n" +
            "4 を push          // [4, 4]\n" +
            "× : b←pop, a←pop, (a × b) を push"
          ),
        choices: ["8", "12", "16", "24"],
        answer: 2,
        explain: "[6]→[6,2]→−で 6−2=4 を push [4]→[4,4]→×で 4×4=<strong>16</strong>。中置に直すと (6−2)×4＝16。減算・除算は<strong>pop する順（先に出た方が右側の b）</strong>に注意。",
      },

      /* ---- 10. 回文判定（2ポインタ・空欄補充） ---- */
      {
        q:
          "文字列 s が回文（前から読んでも後ろから読んでも同じ）かどうかを判定する関数 isPalindrome の空欄 <b></b> に入れる正しい条件式はどれか。s[k] は s の k 文字目、length(s) は文字数を返す。要素番号は1から始まる。" +
          PCODE(
            "○論理型: isPalindrome(文字列型: s)\n" +
            "  整数型: i ← 1\n" +
            "  整数型: j ← length(s)\n" +
            "  while (" + BLANK() + ")\n" +
            "    if (s[i] ≠ s[j])\n" +
            "      return false\n" +
            "    endif\n" +
            "    i ← i + 1\n" +
            "    j ← j − 1\n" +
            "  endwhile\n" +
            "  return true"
          ),
        choices: ["i が j より小さい", "i が j 以上", "i が j と等しい", "i が length(s) より小さい"],
        answer: 0,
        explain: "両端 i（左）と j（右）を内側へ寄せながら比較する<strong>2ポインタ法</strong>。すれ違う前、すなわち <strong>i が j より小さい</strong>間だけ繰り返す。i≧j や i＝j では最初からループに入らず、正しく判定できない。",
      },
    ],
  }
);
