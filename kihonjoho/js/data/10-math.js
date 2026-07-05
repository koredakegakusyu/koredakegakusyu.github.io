/* =============================================================
   コレダケ基本情報 カリキュラム — 10 集合・確率統計・情報の表現
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-math", domain: "基礎理論", icon: "🎲", title: "集合・確率・統計",
    intro: "集合とベン図、順列・組合せ、確率、統計の代表値。計算問題の得点源をやさしく。",
    understand: [
      {
        h: "集合とベン図",
        body:
          "<p>ものの集まりが<strong>集合</strong>。両方に共通する部分が<strong>積集合（A∩B）</strong>、どちらかに属す全体が<strong>和集合（A∪B）</strong>、Aに属さない部分が<strong>補集合</strong>です。</p>" +
          "<p>要素数の関係は <strong>|A∪B| ＝ |A| ＋ |B| − |A∩B|</strong>（重なりを1回引く）。ベン図で考えると確実です。論理演算のAND＝積集合、OR＝和集合と対応します。</p>",
        diagram:
          '<svg viewBox="0 0 460 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="230" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">ベン図（A と B）</text>' +
          '<circle cx="185" cy="105" r="65" fill="#dce8f3" fill-opacity="0.7" stroke="#4a7fa8"/>' +
          '<circle cx="275" cy="105" r="65" fill="#dcecdd" fill-opacity="0.6" stroke="#5c9160"/>' +
          '<text x="150" y="110" fill="#34567a" font-size="14" font-weight="700" text-anchor="middle">A</text>' +
          '<text x="310" y="110" fill="#366b3c" font-size="14" font-weight="700" text-anchor="middle">B</text>' +
          '<text x="230" y="110" fill="#a85733" font-size="12" font-weight="700" text-anchor="middle">A∩B</text>' +
          '<text x="230" y="182" fill="#6b6e76" font-size="11" text-anchor="middle">|A∪B| = |A| + |B| − |A∩B|（重なりを1回引く）</text>' +
          "</svg>",
        cap: "重なり（積集合A∩B）を2回数えないよう1回引くのがポイント。",
      },
      {
        h: "順列・組合せと確率",
        body:
          "<p>並べ方が<strong>順列</strong>（順序を区別）、選び方が<strong>組合せ</strong>（順序を区別しない）。n個からr個の順列は n×(n−1)×…、組合せは順列÷r!。</p>" +
          "<p><strong>確率</strong>は「その事象の場合の数 ÷ 全体の場合の数」。独立な事象が両方起こる確率は<strong>掛け算</strong>、どちらか起こる（排反）確率は<strong>足し算</strong>。期待値は「値×その確率」の合計です。</p>",
      },
      {
        h: "統計の代表値とばらつき",
        body:
          "<p>データの中心を表すのが<strong>平均値</strong>、大きさ順の真ん中の<strong>中央値</strong>、最も多い<strong>最頻値</strong>。ばらつきを表すのが<strong>分散</strong>と、その平方根の<strong>標準偏差</strong>です。</p>" +
          "<p><strong>中央値</strong>は極端な外れ値の影響を受けにくいのが平均値との違いです。</p>",
      },
    ],
    memorize: [
      { k: "積集合 / 和集合", v: "積(A∩B)=両方に共通、和(A∪B)=どちらか。AND=積、OR=和。" },
      { k: "包除の公式", v: "|A∪B| = |A| + |B| − |A∩B|。" },
      { k: "順列 / 組合せ", v: "順列=順序を区別、組合せ=区別しない(順列÷r!)。" },
      { k: "確率の計算", v: "両方(独立)=掛け算、どちらか(排反)=足し算。" },
      { k: "期待値", v: "Σ(値 × その確率)。" },
      { k: "中央値", v: "大きさ順の真ん中。外れ値の影響を受けにくい。" },
      { k: "標準偏差", v: "分散の平方根。ばらつきの大きさ。" },
    ],
    flashcards: [
      { q: "|A∪B| を要素数で表すと？", a: "|A| + |B| − |A∩B|（重なりを1回引く）。" },
      { q: "順列と組合せの違いは？", a: "順列は順序を区別する並べ方、組合せは順序を区別しない選び方（順列÷r!）。" },
      { q: "独立な2つの事象が両方起こる確率は？", a: "それぞれの確率の掛け算。" },
      { q: "期待値の求め方は？", a: "起こりうる値に、その値が出る確率を掛けて全部足す。" },
      { q: "平均値と中央値で、外れ値に強いのは？", a: "中央値（大きさ順の真ん中なので極端な値の影響を受けにくい）。" },
    ],
    quiz: [
      {
        q: "A={2,4,6,8}、B={4,8,12} のとき、和集合 A∪B の要素数はいくつか。",
        choices: ["3", "4", "5", "7"],
        answer: 2,
        explain: "|A|=4、|B|=3、共通{4,8}で|A∩B|=2。4+3−2＝<strong>5</strong>（要素は{2,4,6,8,12}）。",
      },
      {
        q: "赤玉2個、白玉3個が入った袋から1個取り出し、戻さずにもう1個取り出す。2個とも赤である確率はどれか。",
        choices: ["1/10", "2/25", "1/5", "4/25"],
        answer: 0,
        explain: "1個目が赤＝2/5、2個目も赤＝残り1/4。2/5×1/4＝<strong>1/10</strong>（戻さないので分母が減る）。",
      },
      {
        q: "サイコロを1回振るとき、出る目の期待値はいくらか。",
        choices: ["3", "3.5", "4", "4.5"],
        answer: 1,
        explain: "各目1/6。(1+2+3+4+5+6)/6＝21/6＝<strong>3.5</strong>。",
      },
      {
        q: "5個の異なる要素から3個を選んで一列に並べる方法は何通りか。",
        choices: ["10", "15", "60", "120"],
        answer: 2,
        explain: "順列（順序を区別）。5×4×3＝<strong>60通り</strong>。組合せなら60÷3!＝10通り。",
      },
    ],
  },
  {
    id: "fe-info", domain: "基礎理論", icon: "🔡", title: "情報の表現・符号化と言語理論",
    intro: "文字コード、標本化と符号化、情報量、BNFと逆ポーランド記法。FE午前の理論分野。",
    understand: [
      {
        h: "文字コードとデータ量",
        body:
          "<p>文字を数値で表す規則が<strong>文字コード</strong>。英数字中心の<strong>ASCII</strong>、多言語を統一的に扱う<strong>Unicode（UTF-8等）</strong>があります。</p>" +
          "<p>データ量の単位は <strong>1バイト＝8ビット</strong>、<strong>1KB＝1024バイト</strong>、以降1024倍でMB・GB・TB。画像なら「画素数×1画素の色ビット数」でデータ量を求めます。</p>",
      },
      {
        h: "アナログのデジタル化（標本化・量子化・符号化）",
        body:
          "<p>音や画像などの<strong>なめらかに変化するアナログ情報</strong>を、コンピュータが扱える0と1に変換する流れが <strong>標本化（サンプリング）→量子化→符号化</strong>です。下の図の3ステップを順に見ていきます。</p>" +
          "<ul>" +
          "<li><strong>標本化</strong>：波形から<strong>一定の時間間隔で値を取り出す</strong>。間隔が短い（＝標本化周波数が高い）ほど原音に忠実になる。</li>" +
          "<li><strong>量子化</strong>：取り出した値を<strong>決まった段階（レベル）に丸める</strong>。段階数を決めるのがビット数で、多いほどきめ細かい。</li>" +
          "<li><strong>符号化</strong>：各段階を<strong>0と1のビット列</strong>に置き換える。</li>" +
          "</ul>" +
          "<p>関連して<strong>標本化定理</strong>——元の信号に含まれる<strong>最高周波数の2倍より高い周波数で標本化すれば、元の波形を復元できる</strong>——も押さえます。標本化を細かく・量子化のビット数を増やすほど音質（画質）は上がりますが、その分<strong>データ量も増える</strong>というトレードオフがあります。</p>",
        diagram:
          '<svg viewBox="0 0 580 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="19" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">アナログ→デジタル（標本化→量子化→符号化）</text>' +
          '<text x="104" y="40" fill="#34567a" font-size="11.5" font-weight="800" text-anchor="middle">① 標本化</text>' +
          '<text x="285" y="40" fill="#8a6a1e" font-size="11.5" font-weight="800" text-anchor="middle">② 量子化</text>' +
          '<text x="471" y="40" fill="#3f7a45" font-size="11.5" font-weight="800" text-anchor="middle">③ 符号化</text>' +
          '<rect x="18" y="48" width="172" height="132" rx="6" fill="#f6f9fb" stroke="#dbe2e9"/>' +
          '<polyline points="28,138 45,112 75,82 105,72 135,102 165,138 182,146" fill="none" stroke="#4a7fa8" stroke-width="2"/>' +
          '<line x1="45" y1="112" x2="45" y2="168" stroke="#9db8cd" stroke-width="1" stroke-dasharray="3 3"/>' +
          '<line x1="75" y1="82" x2="75" y2="168" stroke="#9db8cd" stroke-width="1" stroke-dasharray="3 3"/>' +
          '<line x1="105" y1="72" x2="105" y2="168" stroke="#9db8cd" stroke-width="1" stroke-dasharray="3 3"/>' +
          '<line x1="135" y1="102" x2="135" y2="168" stroke="#9db8cd" stroke-width="1" stroke-dasharray="3 3"/>' +
          '<line x1="165" y1="138" x2="165" y2="168" stroke="#9db8cd" stroke-width="1" stroke-dasharray="3 3"/>' +
          '<circle cx="45" cy="112" r="3.5" fill="#34567a"/><circle cx="75" cy="82" r="3.5" fill="#34567a"/><circle cx="105" cy="72" r="3.5" fill="#34567a"/><circle cx="135" cy="102" r="3.5" fill="#34567a"/><circle cx="165" cy="138" r="3.5" fill="#34567a"/>' +
          '<text x="104" y="176" fill="#6b6e76" font-size="8.5" text-anchor="middle">一定間隔で値を取り出す</text>' +
          '<rect x="202" y="48" width="166" height="132" rx="6" fill="#fdfaf3" stroke="#e6dcc4"/>' +
          '<line x1="208" y1="112" x2="362" y2="112" stroke="#ecdfbf" stroke-width="1"/><line x1="208" y1="128" x2="362" y2="128" stroke="#ecdfbf" stroke-width="1"/><line x1="208" y1="144" x2="362" y2="144" stroke="#ecdfbf" stroke-width="1"/><line x1="208" y1="160" x2="362" y2="160" stroke="#ecdfbf" stroke-width="1"/>' +
          '<rect x="212" y="136" width="20" height="32" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="244" y="120" width="20" height="48" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="276" y="112" width="20" height="56" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="308" y="128" width="20" height="40" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="340" y="152" width="20" height="16" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<text x="285" y="176" fill="#6b6e76" font-size="8.5" text-anchor="middle">段階（レベル）に丸める</text>' +
          '<rect x="380" y="48" width="182" height="132" rx="6" fill="#f4faf5" stroke="#cfe3d3"/>' +
          '<text x="471" y="74" fill="#3f7a45" font-size="11" font-weight="700" text-anchor="middle">各段階を3ビットに</text>' +
          '<text x="471" y="104" fill="#23252b" font-size="15" font-weight="700" text-anchor="middle" font-family="monospace">100 110 111</text>' +
          '<text x="471" y="130" fill="#23252b" font-size="15" font-weight="700" text-anchor="middle" font-family="monospace">101 010 …</text>' +
          '<text x="471" y="166" fill="#6b6e76" font-size="8.5" text-anchor="middle">0と1のビット列にする</text>' +
          '<line x1="190" y1="114" x2="200" y2="114" stroke="#b0b3ba" stroke-width="1.5"/><polygon points="202,114 193,109 193,119" fill="#b0b3ba"/>' +
          '<line x1="368" y1="114" x2="378" y2="114" stroke="#b0b3ba" stroke-width="1.5"/><polygon points="380,114 371,109 371,119" fill="#b0b3ba"/>' +
          "</svg>",
        cap: "波形を一定間隔で標本化→値を段階に量子化→各段階をビット列に符号化。細かくするほど高品質だがデータ量は増える。",
      },
      {
        h: "BNFと逆ポーランド記法",
        body:
          "<p><strong>BNF</strong>は、プログラム言語などの<strong>構文規則を定義する記法</strong>です（<code>::=</code>で定義、<code>|</code>で選択）。与えられた文字列が規則に合うかを判定する問題が出ます。</p>" +
          "<p><strong>逆ポーランド記法（後置記法）</strong>は、演算子を数値の後ろに書く方式。<code>A＋B</code> は <code>AB＋</code> と書きます。カッコが不要で、スタックで計算できます。</p>",
      },
    ],
    memorize: [
      { k: "文字コード", v: "ASCII=英数字中心、Unicode(UTF-8)=多言語を統一的に扱う。" },
      { k: "データ量の単位", v: "1バイト=8ビット、1KB=1024バイト、以降1024倍。" },
      { k: "デジタル化の流れ", v: "標本化(サンプリング)→量子化→符号化。" },
      { k: "標本化定理", v: "元の最高周波数の2倍より高い周波数で標本化すれば復元できる。" },
      { k: "BNF", v: "構文を定義する記法。::=で定義、|で選択。" },
      { k: "逆ポーランド記法", v: "演算子を後ろに置く（A+B→AB+）。カッコ不要でスタック計算向き。" },
    ],
    flashcards: [
      { q: "アナログをデジタル化する3ステップは？", a: "標本化（サンプリング）→量子化→符号化。" },
      { q: "逆ポーランド記法で A＋B×C はどう書く？", a: "ABC×+（先に B×C＝BC×、次に A と足すので ABC×+）。" },
      { q: "BNFの ::= と | の意味は？", a: "::= は「〜と定義する」、| は「または（選択）」。" },
      { q: "1KBは何バイト？", a: "1024バイト（2の10乗）。" },
      { q: "多言語の文字を統一的に扱う文字コードは？", a: "Unicode（UTF-8など）。" },
    ],
    quiz: [
      {
        q: "式 (A + B) × C を逆ポーランド記法（後置記法）で表したものはどれか。",
        choices: ["AB+C×", "ABC+×", "A+BC×", "AB×C+"],
        answer: 0,
        explain: "先に(A+B)＝AB+、それにCを掛けるので<strong>AB+C×</strong>。",
      },
      {
        q: "アナログ信号をデジタル化する処理で、一定の時間間隔で信号の値を取り出す操作はどれか。",
        choices: ["量子化", "標本化", "符号化", "変調"],
        answer: 1,
        explain: "一定間隔で値を取り出すのは<strong>標本化（サンプリング）</strong>。段階で表すのが量子化、ビット列にするのが符号化。",
      },
      {
        q: "1画素あたり24ビットの色情報をもつ、横1000画素×縦500画素の画像1枚のデータ量はおよそ何メガバイトか（1MB=1024×1024バイトとする）。",
        choices: ["約1.4MB", "約12MB", "約0.5MB", "約120MB"],
        answer: 0,
        explain: "画素数500,000×24ビット＝12,000,000ビット＝1,500,000バイト÷(1024×1024)＝<strong>約1.4MB</strong>。",
      },
      {
        q: "プログラム言語の構文規則を形式的に定義するために用いられる記法はどれか。",
        choices: ["BNF", "逆ポーランド記法", "フローチャート", "決定表"],
        answer: 0,
        explain: "構文を定義する記法は<strong>BNF</strong>。",
      },
    ],
  }
);
