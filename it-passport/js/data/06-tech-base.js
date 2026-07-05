/* =============================================================
   コレダケITパスポート カリキュラム — 06 基礎理論・アルゴリズム（テクノロジ系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "kiso-riron", domain: "基礎理論", icon: "🔢", title: "2進数・論理演算・確率統計",
    intro: "コンピュータの数の数え方（2進数）や論理演算、確率・統計。計算問題の土台を、図でやさしく。",
    understand: [
      {
        h: "コンピュータは「0」と「1」だけで数える",
        body:
          "<p>コンピュータは電気の<strong>ON（1）</strong>と<strong>OFF（0）</strong>で動きます。</p>" +
          "<p>だから数も<strong>0と1の2種類だけ</strong>で表します。これが<strong>2進数</strong>です。ふだん私たちが使う0〜9の10種類は10進数です。</p>" +
          "<p>情報の最小単位が<strong>1ビット</strong>（0か1）。これを8個集めた<strong>1バイト</strong>で、256通り（0〜255）を表せます。</p>",
      },
      {
        h: "2進数を10進数に直す（超重要）",
        body:
          "<p>2進数を10進数に直すには、<strong>各桁に「重み」を掛けて合計</strong>します。</p>" +
          "<p>重みは右から <code>1, 2, 4, 8, 16…</code> と2倍ずつ増えます。下の図を見れば一目でわかります。</p>" +
          "<div class='point'><span>桁が多くて読みにくいときは、4桁ずつまとめた<strong>16進数</strong>（0〜9とA〜F）でも表します。</span></div>",
        diagram:
          '<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="26" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">2進数 1011 を10進数に直す</text>' +
          (function () {
            var bits = [{ b: "1", w: "8" }, { b: "0", w: "4" }, { b: "1", w: "2" }, { b: "1", w: "1" }];
            var x0 = 150, w = 70, y = 50, s = "";
            bits.forEach(function (d, i) {
              var x = x0 + i * (w + 6);
              var on = d.b === "1";
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="52" rx="8" fill="' + (on ? "#dce8f3" : "#efe9dc") + '" stroke="' + (on ? "#4a7fa8" : "#cfc6b2") + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 34) + '" fill="#23252b" font-size="22" font-weight="800" text-anchor="middle">' + d.b + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 78) + '" fill="#a85733" font-size="13" font-weight="700" text-anchor="middle">×' + d.w + "</text>";
            });
            return s;
          })() +
          '<line x1="150" y1="150" x2="454" y2="150" stroke="#b7ad99" stroke-width="1"/>' +
          '<text x="302" y="182" fill="#4a7a4e" font-size="17" font-weight="800" text-anchor="middle">8 ＋ 0 ＋ 2 ＋ 1 ＝ 11</text>' +
          "</svg>",
        cap: "「1が立っている桁の重み」を足すだけ。1011 なら 8＋2＋1 ＝ 11。",
      },
      {
        h: "論理演算と、確率・統計の基本",
        body:
          "<p>0（偽）と1（真）に対する計算が<strong>論理演算</strong>です。</p>" +
          "<ul>" +
          "<li><strong>AND（論理積）</strong>：両方1のとき1。</li>" +
          "<li><strong>OR（論理和）</strong>：どちらか1なら1。</li>" +
          "<li><strong>NOT（否定）</strong>：0と1を反転。</li>" +
          "<li><strong>XOR（排他的論理和）</strong>：2つが違うとき1（同じなら0）。</li>" +
          "</ul>" +
          "<p>統計では、中心を表す<strong>平均値・中央値・最頻値</strong>を区別します。<strong>中央値</strong>は「大きさ順に並べた真ん中」で、極端な外れ値の影響を受けにくいのが特徴です。</p>",
      },
    ],
    memorize: [
      { k: "ビット/バイト", v: "1ビット=0か1。1バイト=8ビット=256通り(0〜255)。" },
      { k: "2進→10進", v: "各桁の重み(…8,4,2,1)×桁の値を合計。" },
      { k: "16進数", v: "0〜9とA〜F。2進4桁＝16進1桁で対応。" },
      { k: "AND / OR", v: "AND=両方1で1（論理積）。OR=どちらか1で1（論理和）。" },
      { k: "XOR", v: "排他的論理和。2つが異なるとき1、同じとき0。" },
      { k: "2の補数", v: "コンピュータでの負数表現。ビット反転して1を足す。" },
      { k: "中央値", v: "順に並べた真ん中の値。外れ値の影響を受けにくい。" },
    ],
    flashcards: [
      { q: "1バイトは何ビットで、何通りを表せるか？", a: "8ビット。2の8乗＝256通り（0〜255）。" },
      { q: "2進数 1101 を10進数にすると？", a: "8+4+0+1＝13。" },
      { q: "論理演算XOR（排他的論理和）の結果が1になるのはどんなとき？", a: "2つの入力が異なるとき（0と1、1と0）。同じなら0。" },
      { q: "AND（論理積）が1になる条件は？", a: "入力が両方とも1のときだけ。" },
      { q: "平均値と中央値の違いは？", a: "平均は総和÷個数、中央値は大きさ順の真ん中。中央値は外れ値の影響を受けにくい。" },
    ],
    quiz: [
      {
        q: "2進数 10110 を10進数で表すといくつか。",
        choices: ["18", "20", "22", "26"],
        answer: 2,
        explain: "各桁の重みは16,8,4,2,1。1・0・1・1・0 → 16+0+4+2+0＝<strong>22</strong>。",
      },
      {
        q: "1バイトで表現できる情報の組合せは何通りか。",
        choices: ["16通り", "128通り", "256通り", "1024通り"],
        answer: 2,
        explain: "1バイト＝8ビット＝2の8乗＝<strong>256通り</strong>。",
      },
      {
        q: "2つの入力が異なるときに1、同じときに0を出力する論理演算はどれか。",
        choices: ["AND（論理積）", "OR（論理和）", "NOT（否定）", "XOR（排他的論理和）"],
        answer: 3,
        explain: "『異なるとき1』は<strong>XOR（排他的論理和）</strong>。",
      },
      {
        q: "データ 3, 5, 5, 8, 100 の中央値（メジアン）はどれか。",
        choices: ["5", "8", "24.2", "100"],
        answer: 0,
        explain: "小さい順に並べた真ん中の値が中央値。5個の真ん中は3番目＝<strong>5</strong>（平均は外れ値100に引っ張られるが中央値は影響小）。",
      },
    ],
  },
  {
    id: "algorithm", domain: "基礎理論", icon: "🧩", title: "アルゴリズムとデータ構造",
    intro: "データのしまい方（スタック・キュー等）と、探索・整列。図で「出入りの順番」をつかむ。",
    understand: [
      {
        h: "データの代表的なしまい方",
        body:
          "<p>データの並べ方・しまい方を<strong>データ構造</strong>といいます。よく出る2つが「スタック」と「キュー」です。</p>" +
          "<ul>" +
          "<li><strong>スタック</strong>：<strong>後入れ先出し（LIFO）</strong>。最後に積んだものから取り出す（積み重ねた皿）。</li>" +
          "<li><strong>キュー</strong>：<strong>先入れ先出し（FIFO）</strong>。先に入れたものから出る（レジの行列）。</li>" +
          "</ul>" +
          "<p>下の図で「出入りの向き」を比べましょう。<strong>取り出す順番が逆</strong>になるのがポイントです。</p>",
        diagram:
          '<svg viewBox="0 0 660 280" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          /* 中央の縦線で分割 */
          '<line x1="330" y1="40" x2="330" y2="250" stroke="#cfc6b2" stroke-width="2" stroke-dasharray="6 5"/>' +
          /* 左：スタック */
          '<text x="165" y="34" fill="#34567a" font-size="15" font-weight="800" text-anchor="middle">スタック（LIFO）</text>' +
          '<text x="165" y="54" fill="#6b6e76" font-size="11" text-anchor="middle">後入れ先出し・出入口は上だけ</text>' +
          '<rect x="95" y="70" width="140" height="40" rx="7" fill="#dce8f3" stroke="#4a7fa8"/><text x="165" y="95" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">C（最後に入れる）</text>' +
          '<rect x="95" y="114" width="140" height="40" rx="7" fill="#eef4f9" stroke="#9db8cd"/><text x="165" y="139" fill="#23252b" font-size="13" text-anchor="middle">B</text>' +
          '<rect x="95" y="158" width="140" height="40" rx="7" fill="#eef4f9" stroke="#9db8cd"/><text x="165" y="183" fill="#23252b" font-size="13" text-anchor="middle">A（最初に入れる）</text>' +
          '<polygon points="150,44 160,62 140,62" fill="#4a7a4e"/><text x="255" y="60" fill="#4a7a4e" font-size="12" font-weight="700">↑Cが最初に出る</text>' +
          '<line x1="165" y1="205" x2="165" y2="234" stroke="#b7ad99" stroke-width="1.5"/>' +
          '<text x="165" y="250" fill="#6b6e76" font-size="11" text-anchor="middle">取り出すと C→B→A</text>' +
          /* 右：キュー */
          '<text x="495" y="34" fill="#8a6a1e" font-size="15" font-weight="800" text-anchor="middle">キュー（FIFO）</text>' +
          '<text x="495" y="54" fill="#6b6e76" font-size="11" text-anchor="middle">先入れ先出し・入口と出口が別</text>' +
          '<rect x="395" y="110" width="60" height="48" rx="7" fill="#f2e7cd" stroke="#b28a2e"/><text x="425" y="139" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">A</text>' +
          '<rect x="459" y="110" width="60" height="48" rx="7" fill="#f7f0dc" stroke="#cbb877"/><text x="489" y="139" fill="#23252b" font-size="13" text-anchor="middle">B</text>' +
          '<rect x="523" y="110" width="60" height="48" rx="7" fill="#f7f0dc" stroke="#cbb877"/><text x="553" y="139" fill="#23252b" font-size="13" text-anchor="middle">C</text>' +
          '<polygon points="392,134 378,127 378,141" fill="#4a7a4e"/><text x="425" y="98" fill="#4a7a4e" font-size="12" font-weight="700" text-anchor="middle">←Aが先に出る</text>' +
          '<text x="553" y="98" fill="#6b6e76" font-size="12" text-anchor="middle">後から入る→</text>' +
          '<text x="489" y="188" fill="#6b6e76" font-size="11" text-anchor="middle">取り出すと A→B→C</text>' +
          "</svg>",
        cap: "スタックは最後のCから出る（LIFO）。キューは最初のAから出る（FIFO）。取り出す順が逆になる。",
      },
      {
        h: "探索と整列、プログラム言語",
        body:
          "<p>データを探すのが<strong>探索</strong>。先頭から順に見る<strong>線形探索</strong>と、<strong>整列済み</strong>データを半分ずつ絞る高速な<strong>2分探索</strong>があります。</p>" +
          "<p>データを並べ替えるのが<strong>整列（ソート）</strong>。隣同士を比べて交換する<strong>バブルソート</strong>などがあります。</p>" +
          "<p>人が書いたコードを機械が動かす方式は2つ。<strong>コンパイラ</strong>（先に全部翻訳）と<strong>インタプリタ</strong>（1行ずつ実行）。また、Webページの構造を書く<strong>HTML</strong>のように、タグで指定する言語を<strong>マークアップ言語</strong>と呼びます。</p>",
      },
    ],
    memorize: [
      { k: "スタック(LIFO)", v: "後入れ先出し。最後に入れたものが最初に出る。" },
      { k: "キュー(FIFO)", v: "先入れ先出し。最初に入れたものが最初に出る（待ち行列）。" },
      { k: "2分探索", v: "整列済みデータを半分ずつ絞る高速探索。前提＝ソート済み。" },
      { k: "線形探索", v: "先頭から順に調べる。整列不要だが遅い。" },
      { k: "コンパイラ/インタプリタ", v: "コンパイラ=全体を先に翻訳。インタプリタ=1行ずつ解釈実行。" },
      { k: "HTML/CSS/XML", v: "マークアップ言語。HTML=構造、CSS=見た目、XML=データ記述。" },
      { k: "制御構造", v: "順次・選択（分岐）・繰返し（ループ）の3つ。" },
    ],
    flashcards: [
      { q: "スタックとキューの取り出し順序の違いは？", a: "スタックはLIFO（後入れ先出し）、キューはFIFO（先入れ先出し）。" },
      { q: "2分探索の前提条件は？", a: "データが整列（ソート）済みであること。半分ずつ範囲を絞るため高速。" },
      { q: "コンパイラ方式とインタプリタ方式の違いは？", a: "コンパイラは全体を事前に機械語へ翻訳、インタプリタは1行ずつ解釈しながら実行。" },
      { q: "HTMLは何をするための言語か？", a: "Webページの構造をタグで記述するマークアップ言語（見た目はCSS）。" },
      { q: "プログラムの3つの基本制御構造は？", a: "順次・選択（分岐）・繰返し（ループ）。" },
    ],
    quiz: [
      {
        q: "データを A, B, C の順に格納し、取り出すと C, B, A の順になるデータ構造はどれか。",
        choices: ["キュー", "スタック", "配列", "木構造"],
        answer: 1,
        explain: "最後に入れたCから出る後入れ先出し（LIFO）は<strong>スタック</strong>。キューはFIFOでA,B,Cの順。",
      },
      {
        q: "整列済みのデータに対して、探索範囲を半分ずつに絞り込みながら目的のデータを探す方法はどれか。",
        choices: ["線形探索", "2分探索", "バブルソート", "ハッシュ法"],
        answer: 1,
        explain: "整列済みを半分ずつ絞るのは<strong>2分探索</strong>。整列が前提。整列不要なのは線形探索。",
      },
      {
        q: "先入れ先出し（FIFO）の性質を持ち、プリンタの印刷待ちなどに使われるデータ構造はどれか。",
        choices: ["スタック", "キュー", "ツリー", "ヒープ"],
        answer: 1,
        explain: "先に入れたものが先に出る待ち行列は<strong>キュー（FIFO）</strong>。",
      },
      {
        q: "ソースプログラムを、実行前に一括して機械語に翻訳する方式はどれか。",
        choices: ["インタプリタ方式", "コンパイラ方式", "エミュレーション", "仮想化"],
        answer: 1,
        explain: "事前に一括翻訳するのは<strong>コンパイラ方式</strong>。1行ずつ解釈実行はインタプリタ方式。",
      },
    ],
  }
);
