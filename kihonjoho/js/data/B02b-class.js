/* =============================================================
   コレダケ学習 基本情報 科目B — 02b クラス・メソッド・大域変数（本番頻出のOOP擬似言語）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "feb-class", domain: "【科目B】第1章 擬似言語の記述", icon: "🏛️", title: "クラス・メソッド・大域変数",
    intro: "本番の連結リスト・キュー問題はほぼこの形式。クラス／インスタンス／メンバ参照『.』／大域変数／未定義を、実際のサンプル問題と同じ書き方で読めるようにする。",
    understand: [
      {
        h: "なぜ必須か——本番はクラスで書かれている",
        body:
          "<p>IPA公式のサンプル問題（単方向リスト）では、リストの各要素が<strong>クラス</strong>で表現され、<code>curr ← ListElement(qVal)</code> や <code>prev.next</code>、<code>大域: listHead</code> といった<strong>オブジェクト指向の書き方</strong>が当然のように出てきます。ここを知らないと問題文が読めません。逆に、<strong>この記法さえ読めれば、あとは普通のトレース</strong>です。難しそうな見た目に負けないことが合格の分かれ目です。</p>" +
          "<p>覚える記法は次の4つだけ。<strong>①クラスとインスタンス ②メンバ参照『.』 ③インスタンス生成 ④大域変数と未定義</strong>。順に見ます。</p>",
      },
      {
        h: "① クラスとインスタンス——『設計図』と『実物』",
        body:
          "<p><strong>クラス</strong>は『データ（メンバ変数）と操作（メソッド）をまとめた設計図』です。設計図から作った実物を<strong>インスタンス</strong>と呼びます。たとえば『座標』クラスから、点A・点Bという複数のインスタンスを作れます。</p>" +
          "<p>本番では下のような<strong>表でクラスの説明が与えられます</strong>。この表を読む練習が超重要です（下は例。要素＝ノードを表すクラス）。</p>" +
          "<div class='pcode'><table style='width:100%'>" +
          "<tr><td class='pc-c' style='font-weight:700;border-bottom:1px solid var(--border)'>メンバ変数</td><td class='pc-c' style='font-weight:700;border-bottom:1px solid var(--border)'>型</td><td class='pc-c' style='font-weight:700;border-bottom:1px solid var(--border)'>説明</td></tr>" +
          "<tr><td class='pc-c'>val</td><td class='pc-c'>整数型</td><td class='pc-c'>この要素が持つ値。</td></tr>" +
          "<tr><td class='pc-c'>next</td><td class='pc-c'>Node</td><td class='pc-c'>次の要素の参照。初期状態は未定義。</td></tr>" +
          "<tr><td class='pc-c' style='font-weight:700;border-top:1px solid var(--border)'>コンストラクタ</td><td class='pc-c' style='border-top:1px solid var(--border)'></td><td class='pc-c' style='font-weight:700;border-top:1px solid var(--border)'>説明</td></tr>" +
          "<tr><td class='pc-c'>Node(整数型: v)</td><td class='pc-c'></td><td class='pc-c'>引数 v でメンバ変数 val を初期化する。</td></tr>" +
          "</table><div class='pc-cap'>クラス Node の説明（本番と同じ形式の表）</div></div>" +
          "<p><strong>コンストラクタ</strong>は『インスタンスを作るときに最初に走る初期化処理』。上の表なら <code>Node(5)</code> と書くと、val＝5・next＝未定義 の新しい要素が1つできます。</p>",
      },
      {
        h: "② メンバ参照『.』と ③ インスタンス生成",
        body:
          "<p>インスタンスが持つメンバ変数やメソッドには<strong>『.（ドット）』でアクセス</strong>します。<code>x.val</code> は「xという要素の val」、<code>x.next</code> は「xの次の要素の参照」。メソッド呼び出しも <code>words.freq(\"n\")</code> のように書きます。</p>" +
          "<p><strong>インスタンス生成</strong>は <code>変数 ← クラス名(引数)</code>。新しい実物を1つ作り、その<strong>参照（＝実物の場所を指す矢印）</strong>を変数に入れます。連結リストの各ノードは、この生成でひとつずつ作られます。</p>" +
          PCODE(
            "Node: p          // Node型の変数（まだ何も指していない）\n" +
            "p ← Node(5)      // val=5, next=未定義 の要素を生成し、pが指す\n" +
            "p.val            // → 5   （pの持つ値）\n" +
            "p.next           // → 未定義（まだ次が無い）\n" +
            "\n" +
            "Node: q\n" +
            "q ← Node(8)      // 別の要素（val=8）を生成\n" +
            "p.next ← q       // pの「次」を q にする → 5 → 8 とつながった",
            "『.』でメンバにアクセス、クラス名(引数)で生成。p.next←q でノードを連結する。"
          ),
      },
      {
        h: "④ 大域変数と『未定義』——リストの先頭を保持する",
        body:
          "<p><strong>大域変数（グローバル変数）</strong>は、プログラム全体で共有される変数で、<code>大域: Node: listHead</code> のように宣言されます。連結リストでは、<strong>先頭要素の参照を大域変数 listHead に持たせる</strong>のが定番です。手続の外で保持されるので、何度呼び出しても値が引き継がれます（局所変数は手続を抜けると消える）。</p>" +
          "<p><strong>未定義（null）</strong>は『まだ何も指していない』状態。<strong>リストが空なら listHead は未定義</strong>、<strong>最後の要素の next は未定義</strong>——この2つが判定の要になります。下は、リスト末尾に新要素を追加する本番型の手続です。</p>" +
          PCODE(
            "大域: Node: listHead ← 未定義   // 空リスト（先頭なし）\n" +
            "\n" +
            "○append(整数型: v)              // 末尾に値 v を追加する手続\n" +
            "  Node: prev, curr\n" +
            "  curr ← Node(v)               // 追加する新要素を生成\n" +
            "  if (listHead が 未定義)        // リストが空なら\n" +
            "    listHead ← curr            // 新要素を先頭にする\n" +
            "  else\n" +
            "    prev ← listHead\n" +
            "    while (prev.next が 未定義でない)  // 末尾まで進む\n" +
            "      prev ← prev.next\n" +
            "    endwhile\n" +
            "    prev.next ← curr           // 末尾の次に新要素をつなぐ\n" +
            "  endif",
            "空なら先頭に、そうでなければ末尾まで進めてつなぐ。IPAサンプル問3と同じ骨格。"
          ),
      },
    ],
    memorize: [
      { k: "クラス / インスタンス", v: "クラス=設計図、インスタンス=そこから作った実物。1つのクラスから複数作れる。" },
      { k: "メンバ変数 / メソッド", v: "インスタンスが持つデータ=メンバ変数、操作=メソッド。" },
      { k: "コンストラクタ", v: "インスタンス生成時に走る初期化処理。クラス名(引数)で呼ばれる。" },
      { k: "メンバ参照『.』", v: "x.val=xのval、x.next=xの次の参照、obj.method()=メソッド呼び出し。" },
      { k: "インスタンス生成", v: "変数 ← クラス名(引数)。新しい実物を作り、その参照を変数へ。" },
      { k: "参照", v: "実物そのものでなく『実物の場所を指す矢印』。未定義は何も指さない状態。" },
      { k: "大域変数", v: "大域: で宣言。プログラム全体で共有・保持される。連結リストの先頭保持に多用。" },
      { k: "未定義(null)の要所", v: "空リスト→先頭が未定義／末尾の要素→nextが未定義。判定の決め手。" },
    ],
    flashcards: [
      { q: "擬似言語で新しいインスタンスを作る書き方は？", a: "変数 ← クラス名(引数)。例：curr ← Node(5)。コンストラクタが走り初期化される。" },
      { q: "x.next が表すものは？（xがリストのノード）", a: "ノード x が指す『次のノードの参照』。最後のノードでは未定義。" },
      { q: "連結リストで大域変数 listHead は何を保持する？", a: "リストの先頭要素の参照。リストが空のときは未定義。" },
      { q: "『参照』と『未定義（null）』の違いは？", a: "参照は実物の場所を指す矢印。未定義はまだ何も指していない状態（空・末尾を表す）。" },
      { q: "大域変数と局所変数の違いは？", a: "大域はプログラム全体で共有・保持。局所は手続を抜けると消える。" },
    ],
    quiz: [
      {
        q:
          "単方向リストの各要素はクラス Node（メンバ変数 val:値、next:次要素の参照）で表す。大域変数 listHead はリスト先頭の参照で、空のときは未定義。次の手続 append は末尾に値を追加する。空欄 <b>a</b>・<b>b</b> に入れる正しい組合せはどれか。" +
          PCODE(
            "大域: Node: listHead ← 未定義\n" +
            "○append(整数型: v)\n" +
            "  Node: prev, curr\n" +
            "  curr ← Node(v)\n" +
            "  if (listHead が " + BLANK("a") + ")\n" +
            "    listHead ← curr\n" +
            "  else\n" +
            "    prev ← listHead\n" +
            "    while (prev.next が 未定義でない)\n" +
            "      prev ← prev.next\n" +
            "    endwhile\n" +
            "    prev.next ← " + BLANK("b") + "\n" +
            "  endif"
          ),
        choices: [
          "a：未定義 ／ b：curr",
          "a：未定義 ／ b：listHead",
          "a：未定義でない ／ b：curr",
          "a：未定義でない ／ b：curr.next",
        ],
        answer: 0,
        explain: "リストが空（先頭が<strong>未定義</strong>）なら新要素を先頭に。空でなければ末尾まで進み、末尾の next に<strong>新要素 curr</strong> をつなぐ。よって a=未定義、b=curr。",
      },
      {
        q:
          "クラス Node（val, next）で作った要素を次のように操作した。最後に <code>a.next.next.val</code> が表す値はどれか。" +
          PCODE(
            "Node: a ← Node(10)\n" +
            "Node: b ← Node(20)\n" +
            "Node: c ← Node(30)\n" +
            "a.next ← b\n" +
            "b.next ← c"
          ),
        choices: ["10", "20", "30", "未定義"],
        answer: 2,
        explain: "a→b→c と連結。a.next=b、b.next=c、c.val=<strong>30</strong>。『.next』を2回たどった先の val。",
      },
      {
        q:
          "次の手続 lengthOf は、大域変数 listHead を先頭とする単方向リストの要素数を返そうとしている。空欄 <b>a</b> に入れる正しい記述はどれか。（要素が無いときは0を返す）" +
          PCODE(
            "整数型: lengthOf()\n" +
            "  整数型: cnt ← 0\n" +
            "  Node: p ← listHead\n" +
            "  while (p が 未定義でない)\n" +
            "    cnt ← cnt + 1\n" +
            "    p ← " + BLANK("a") + "\n" +
            "  endwhile\n" +
            "  return cnt"
          ),
        choices: ["listHead", "p.next", "p.val", "cnt"],
        answer: 1,
        explain: "先頭から次々に『次の要素』へ進めて数えるので p を <strong>p.next</strong> に更新する。listHead に戻すと無限ループ、p.val は値なので誤り。",
      },
      {
        q: "オブジェクト指向の擬似言語で <code>curr ← Node(5)</code> と書いたときに起こることとして正しいものはどれか。",
        choices: [
          "既存のインスタンス curr の val を5に書き換える",
          "コンストラクタが走り、新しいインスタンス（val=5）を生成して、その参照を curr に代入する",
          "整数5を curr にそのまま代入する",
          "クラス Node の定義そのものを変更する",
        ],
        answer: 1,
        explain: "<code>変数 ← クラス名(引数)</code> は<strong>新しいインスタンスを生成</strong>し、コンストラクタで初期化して、その<strong>参照</strong>を変数に入れる操作。",
      },
    ],
  }
);
