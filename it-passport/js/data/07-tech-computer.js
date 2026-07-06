/* =============================================================
   コレダケITパスポート カリキュラム — 07 コンピュータ・システム構成（テクノロジ系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "computer-kosei", domain: "コンピュータ", icon: "🖥️", title: "コンピュータの構成要素",
    intro: "CPU・メモリ・記憶階層・入出力インタフェース。ハードの基本用語を確実に。",
    understand: [
      {
        h: "5大装置とCPU",
        body: "<p>コンピュータは<strong>5大装置</strong>——<strong>制御装置・演算装置（この2つがCPU）・記憶装置・入力装置・出力装置</strong>から成る。頭脳が<strong>CPU（中央処理装置）</strong>で、命令を解釈し計算する。速さの目安が<strong>クロック周波数</strong>（Hz、高いほど速い）と<strong>コア数</strong>（同時処理できる数。デュアル/クアッドコア）。CPUが一度に扱えるデータ幅（32ビット/64ビット）も性能に関わる。</p>",
      },
      {
        h: "記憶階層——速い順・高い順",
        body: "<p>記憶装置は『速いが高価で少量』と『遅いが安価で大量』の階層になっている。速い順に<strong>レジスタ → キャッシュメモリ → 主記憶（メインメモリ）→ 補助記憶（SSD/HDD）</strong>。CPUと主記憶の速度差を埋めるのが<strong>キャッシュメモリ</strong>（よく使うデータを一時保持）だ。上に行くほど速く高価で少量、下に行くほど遅く安価で大容量になる。</p><p>メモリの種類も区別する。<strong>RAM</strong>は読み書きでき電源を切ると消える<strong>揮発性</strong>（主記憶に使う<strong>DRAM</strong>、高速な<strong>SRAM</strong>）。<strong>ROM</strong>は主に読み出し専用で電源を切っても<strong>消えない不揮発性</strong>。データを保存するSSD・USBメモリ（フラッシュメモリ）も不揮発性だ。</p>",
        diagram:
          '<svg viewBox="0 0 520 215" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="260" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">記憶階層（上ほど速い・下ほど大容量）</text>' +
          (function () {
            var L = [
              { n: "レジスタ", d: "CPU内・最速", w: 130, c: "#f3ddcd", st: "#c1855c" },
              { n: "キャッシュメモリ(SRAM)", d: "CPUと主記憶の橋渡し", w: 210, c: "#f2e7cd", st: "#b28a2e" },
              { n: "主記憶（DRAM）", d: "プログラム実行の作業場", w: 300, c: "#dce8f3", st: "#4a7fa8" },
              { n: "補助記憶（SSD / HDD）", d: "大容量・不揮発（電源を切っても残る）", w: 410, c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", y0 = 40, h = 36, gap = 6, cx = 260;
            L.forEach(function (x, i) {
              var y = y0 + i * (h + gap);
              s += '<rect x="' + (cx - x.w / 2) + '" y="' + y + '" width="' + x.w + '" height="' + h + '" rx="6" fill="' + x.c + '" stroke="' + x.st + '"/>';
              s += '<text x="' + cx + '" y="' + (y + 16) + '" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">' + x.n + "</text>";
              s += '<text x="' + cx + '" y="' + (y + 30) + '" fill="#6b6e76" font-size="9" text-anchor="middle">' + x.d + "</text>";
            });
            s += '<text x="40" y="60" fill="#a85733" font-size="11" font-weight="700">速い↑</text>';
            s += '<text x="40" y="200" fill="#4a7a4e" font-size="11" font-weight="700">大容量↓</text>';
            return s;
          })() +
          "</svg>",
        cap: "上ほど速い・高価・少量、下ほど遅い・安価・大容量。キャッシュがCPUと主記憶の速度差を埋める。",
      },
      {
        h: "入出力インタフェース",
        body: "<p>周辺機器をつなぐ規格が<strong>インタフェース</strong>。汎用的な有線接続の<strong>USB</strong>、映像・音声用の<strong>HDMI</strong>、無線の<strong>Bluetooth</strong>（近距離）や<strong>Wi-Fi</strong>、電源も供給できる<strong>PoE</strong>、ケーブル1本で給電も可能な<strong>USB Type-C</strong>など。用途（映像・データ・無線）で使い分ける。</p>",
      },
    ],
    memorize: [
      { k: "5大装置", v: "制御・演算（=CPU）・記憶・入力・出力。" },
      { k: "クロック周波数", v: "CPUの動作テンポ。高いほど高速（GHz）。" },
      { k: "記憶階層(速い順)", v: "レジスタ→キャッシュ→主記憶→補助記憶。上ほど速く高価で少量。" },
      { k: "キャッシュメモリ", v: "CPUと主記憶の速度差を埋める高速な一時記憶。" },
      { k: "RAM / ROM", v: "RAM=揮発性(電源切ると消える)。ROM=不揮発性(消えない・読出中心)。" },
      { k: "USB / HDMI / Bluetooth", v: "USB=汎用有線。HDMI=映像音声。Bluetooth=近距離無線。" },
    ],
    flashcards: [
      { q: "CPUを構成する2つの装置は？", a: "制御装置と演算装置。5大装置のうちの2つ。" },
      { q: "CPUと主記憶の速度差を埋めるために置かれる高速な記憶装置は？", a: "キャッシュメモリ。" },
      { q: "RAMとROMの揮発性の違いは？", a: "RAMは揮発性（電源を切ると内容が消える）、ROMは不揮発性（消えない）。" },
      { q: "記憶装置を速い順に並べると？", a: "レジスタ→キャッシュメモリ→主記憶→補助記憶（SSD/HDD）。" },
      { q: "CPUの処理速度の目安となる、1秒あたりの動作回数を表す指標は？", a: "クロック周波数（Hz、GHz）。" },
    ],
    quiz: [
      {
        q: "CPUと主記憶装置の間に置かれ、両者の処理速度の差を埋めるために頻繁に使うデータを一時的に保持する高速なメモリはどれか。",
        choices: ["補助記憶", "キャッシュメモリ", "ROM", "仮想記憶"],
        answer: 1,
        explain: "CPUと主記憶の速度差を埋めるのが<strong>キャッシュメモリ</strong>。",
      },
      {
        q: "電源を切ると記憶内容が失われる揮発性のメモリはどれか。",
        choices: ["ROM", "RAM", "フラッシュメモリ", "SSD"],
        answer: 1,
        explain: "揮発性（電源断で消える）は<strong>RAM</strong>。ROMやフラッシュメモリ、SSDは不揮発性。",
      },
      {
        q: "CPUの性能に関する記述として適切なものはどれか。",
        choices: [
          "クロック周波数が低いほど処理は速い",
          "コア数が多いほど、複数の処理を同時に実行しやすい",
          "ビット幅は性能に無関係である",
          "キャッシュメモリはCPUの性能に一切影響しない",
        ],
        answer: 1,
        explain: "コアが多いほど並列処理に有利。クロックは高いほど速く、ビット幅やキャッシュも性能に関わる。",
      },
    ],
  },
  {
    id: "system-kosei", domain: "コンピュータ", icon: "🔗", title: "システム構成と信頼性（稼働率）",
    intro: "クライアントサーバ・仮想化・冗長化と、稼働率の計算（直列・並列）。計算問題が頻出。",
    understand: [
      {
        h: "システムの構成と仮想化",
        body: "<p>処理を頼む<strong>クライアント</strong>と、応える<strong>サーバ</strong>に役割を分けるのが<strong>クライアントサーバシステム</strong>。1台の物理サーバ上に複数の仮想的なコンピュータを動かす<strong>仮想化</strong>は、機器を有効活用しコストを下げる。信頼性を高めるため機器を二重化する<strong>冗長化</strong>、複数台を連携させ全体を1台のように見せる<strong>クラスタリング</strong>、待機系に切り替える<strong>フェイルオーバー</strong>も重要だ。同じデータを複数台に持つ<strong>RAID</strong>（ミラーリングRAID1など）はディスク故障に備える。</p>",
      },
      {
        h: "信頼性の指標と稼働率の計算",
        body: "<p>信頼性は<strong>RASIS</strong>（信頼性・可用性・保守性・完全性・安全性）で総合的に見る。故障の間隔が<strong>MTBF（平均故障間隔）</strong>、修理にかかる時間が<strong>MTTR（平均修理時間）</strong>。<strong>稼働率＝MTBF ÷ (MTBF＋MTTR)</strong>で、1に近いほど『よく動いている』。</p><p>複数装置をつなぐと稼働率は変わる。<strong>直列（両方動かないとダメ）</strong>なら稼働率は<strong>掛け算</strong>（例：0.9×0.9＝0.81）で下がる。<strong>並列（どちらか動けばOK＝冗長化）</strong>なら<strong>1−(1−a)(1−b)</strong>で上がる（例：1−0.1×0.1＝0.99）。冗長化すると全体の稼働率が上がる、というのが結論だ。</p>",
        diagram:
          '<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans JP, sans-serif">\
<text x="150" y="24" fill="#c47f2f" font-size="12" font-weight="700" text-anchor="middle">直列（両方必要）</text>\
<rect x="70" y="40" width="70" height="40" rx="6" fill="#e7eef5" stroke="#c47f2f"/><text x="105" y="65" fill="#23252b" font-size="12" text-anchor="middle">0.9</text>\
<line x1="140" y1="60" x2="180" y2="60" stroke="#6b6e76" stroke-width="2"/>\
<rect x="180" y="40" width="70" height="40" rx="6" fill="#e7eef5" stroke="#c47f2f"/><text x="215" y="65" fill="#23252b" font-size="12" text-anchor="middle">0.9</text>\
<text x="160" y="110" fill="#c47f2f" font-size="12" font-weight="700" text-anchor="middle">0.9×0.9 = 0.81（下がる）</text>\
<text x="450" y="24" fill="#4a7a4e" font-size="12" font-weight="700" text-anchor="middle">並列＝冗長化（どちらか動けばOK）</text>\
<rect x="410" y="35" width="70" height="36" rx="6" fill="#e7eef5" stroke="#4a7a4e"/><text x="445" y="58" fill="#23252b" font-size="12" text-anchor="middle">0.9</text>\
<rect x="410" y="90" width="70" height="36" rx="6" fill="#e7eef5" stroke="#4a7a4e"/><text x="445" y="113" fill="#23252b" font-size="12" text-anchor="middle">0.9</text>\
<text x="450" y="150" fill="#4a7a4e" font-size="12" font-weight="700" text-anchor="middle">1−0.1×0.1 = 0.99（上がる）</text>\
</svg>',
        cap: "直列は稼働率の掛け算で下がる。並列（冗長化）は 1−(1−a)(1−b) で上がる。",
      },
    ],
    memorize: [
      { k: "稼働率", v: "<strong>MTBF ÷ (MTBF＋MTTR)</strong>。1に近いほど良い。" },
      { k: "MTBF / MTTR", v: "MTBF=平均故障間隔（長いほど良い）。MTTR=平均修理時間（短いほど良い）。" },
      { k: "直列の稼働率", v: "掛け算。全部動いて初めて稼働（例 0.9×0.9=0.81）。下がる。" },
      { k: "並列の稼働率", v: "<strong>1−(1−a)(1−b)</strong>。冗長化。どれか動けば稼働。上がる。" },
      { k: "RASIS", v: "信頼性・可用性・保守性・完全性・安全性。" },
      { k: "仮想化", v: "1台の物理機に複数の仮想マシンを動かす。資源を有効活用。" },
      { k: "RAID", v: "複数ディスクで冗長化。RAID1=ミラーリング（同じ内容を2台に）。" },
    ],
    flashcards: [
      { q: "稼働率の計算式は？", a: "MTBF ÷ (MTBF + MTTR)。MTBF=平均故障間隔、MTTR=平均修理時間。" },
      { q: "稼働率0.9の装置を2つ直列につないだ全体の稼働率は？", a: "0.9×0.9＝0.81（直列は掛け算で下がる）。" },
      { q: "稼働率0.9の装置を2つ並列（冗長）にした全体の稼働率は？", a: "1−(1−0.9)(1−0.9)＝1−0.01＝0.99（冗長化で上がる）。" },
      { q: "MTBFが長く、MTTRが短いと稼働率はどうなる？", a: "高くなる（よく動き、壊れてもすぐ直る）。" },
      { q: "1台の物理サーバ上で複数の仮想的なコンピュータを動かす技術は？", a: "仮想化。" },
    ],
    quiz: [
      {
        q: "MTBFが90時間、MTTRが10時間の装置の稼働率はいくらか。",
        choices: ["0.10", "0.50", "0.90", "0.99"],
        answer: 2,
        explain: "稼働率 = MTBF ÷ (MTBF+MTTR) = 90 ÷ (90+10) = 90/100 = <strong>0.90</strong>。",
      },
      {
        q: "稼働率が0.8の装置を2台直列に接続したシステム全体の稼働率はいくらか。",
        choices: ["0.64", "0.80", "0.96", "1.00"],
        answer: 0,
        explain: "直列は掛け算。0.8×0.8＝<strong>0.64</strong>（両方動かないと稼働しないので下がる）。",
      },
      {
        q: "稼働率0.9の装置を2台並列（冗長構成）にしたときのシステム全体の稼働率はいくらか。",
        choices: ["0.81", "0.90", "0.99", "1.80"],
        answer: 2,
        explain: "並列は 1−(1−0.9)(1−0.9)＝1−0.01＝<strong>0.99</strong>。冗長化で稼働率が上がる。",
      },
      {
        q: "システムの信頼性を表す指標MTBFの説明として適切なものはどれか。",
        choices: [
          "故障してから修理が完了するまでの平均時間",
          "故障が発生してから次の故障までの平均間隔（平均故障間隔）",
          "1年間の総稼働時間",
          "システムの導入費用",
        ],
        answer: 1,
        explain: "<strong>MTBF＝平均故障間隔</strong>（長いほど故障しにくい）。修理時間はMTTR。",
      },
    ],
  },
  {
    id: "os-software", domain: "コンピュータ", icon: "🪟", title: "OSとソフトウェア",
    intro: "OSの役割、仮想記憶、ファイルの管理、バックアップ、表計算。図でイメージをつかめば得点源になります。",
    understand: [
      {
        h: "OSは「ハードとアプリの仲立ち役」",
        body:
          "<p>パソコンを動かす一番土台のソフトが<strong>OS（オペレーティングシステム）</strong>です。<strong>基本ソフトウェア</strong>とも呼びます。</p>" +
          "<p>下の図のように、OSは<strong>ハードウェア（機械）とアプリ（応用ソフト）の間に立つ仲立ち役</strong>。アプリは「印刷して」「保存して」とOSに頼むだけでよく、機械の細かい違いを気にせずにすみます。</p>" +
          "<p>代表的なOSに Windows・macOS・Linux・Android・iOS があります。表計算やブラウザなどの<strong>アプリ（応用ソフト）</strong>とは役割が違います。</p>",
        diagram:
          '<svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="260" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">OSは仲立ち役（サンドイッチの真ん中）</text>' +
          '<rect x="140" y="40" width="240" height="42" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="260" y="66" fill="#366b3c" font-size="13" font-weight="700" text-anchor="middle">アプリ（表計算・ブラウザ等）</text>' +
          '<rect x="140" y="98" width="240" height="42" rx="8" fill="#34567a" stroke="#2a4864"/><text x="260" y="124" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">OS（基本ソフト）</text>' +
          '<rect x="140" y="156" width="240" height="42" rx="8" fill="#efe9dc" stroke="#cfc6b2"/><text x="260" y="182" fill="#5a5346" font-size="13" font-weight="700" text-anchor="middle">ハードウェア（機械）</text>' +
          '<text x="405" y="94" fill="#a85733" font-size="18">⇅</text><text x="405" y="152" fill="#a85733" font-size="18">⇅</text>' +
          '<text x="100" y="123" fill="#6b6e76" font-size="11" text-anchor="end">橋渡し</text>' +
          "</svg>",
        cap: "アプリはOSに頼み、OSがハードを操作する。だからアプリは機械の違いを気にせず動く。",
      },
      {
        h: "仮想記憶——メモリを「見かけ上」大きくする",
        body:
          "<p>プログラムを動かすには主記憶（メモリ）が要りますが、足りなくなることがあります。</p>" +
          "<p>そこでOSは、しばらく使わないデータを<strong>補助記憶（SSD/HDD）に一時退避</strong>し、空いた主記憶に必要なものを載せます。これで<strong>主記憶より大きなメモリがあるように見せる</strong>のが<strong>仮想記憶</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">仮想記憶のしくみ</text>' +
          '<rect x="40" y="50" width="150" height="90" rx="10" fill="#dce8f3" stroke="#4a7fa8"/><text x="115" y="44" fill="#2d5470" font-size="12" font-weight="700" text-anchor="middle">主記憶（速いが小さい）</text>' +
          '<rect x="55" y="66" width="120" height="24" rx="4" fill="#eef4f9" stroke="#9db8cd"/><text x="115" y="83" fill="#23252b" font-size="11" text-anchor="middle">今使う部分</text>' +
          '<rect x="370" y="50" width="150" height="90" rx="10" fill="#efe9dc" stroke="#cfc6b2"/><text x="445" y="44" fill="#5a5346" font-size="12" font-weight="700" text-anchor="middle">補助記憶（大きい）</text>' +
          '<rect x="385" y="66" width="120" height="24" rx="4" fill="#f6f2e9" stroke="#cbc2ae"/><text x="445" y="83" fill="#23252b" font-size="11" text-anchor="middle">使わない部分を退避</text>' +
          '<line x1="192" y1="100" x2="368" y2="100" stroke="#a85733" stroke-width="2"/><polygon points="368,100 356,94 356,106" fill="#a85733"/><polygon points="192,100 204,94 204,106" fill="#a85733"/>' +
          '<text x="280" y="94" fill="#a85733" font-size="11" font-weight="700" text-anchor="middle">必要に応じて入れ替え</text>' +
          '<text x="280" y="160" fill="#6b6e76" font-size="11" text-anchor="middle">これで「大きなメモリがあるように」見せる</text>' +
          "</svg>",
        cap: "使わないデータを補助記憶へ退避し、主記憶を空ける。見かけ上メモリが大きくなる。",
      },
      {
        h: "ファイルの住所——絶対パスと相対パス",
        body:
          "<p>ファイルは<strong>フォルダ（ディレクトリ）</strong>で階層的に管理します。目的のファイルまでの「道順」の書き方が2つあります。</p>" +
          "<ul>" +
          "<li><strong>絶対パス</strong>：一番上（ルート <code>/</code>）からの道順。どこから見ても同じ。</li>" +
          "<li><strong>相対パス</strong>：今いる場所からの道順。<code>../</code> は1つ上の階層。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">フォルダの階層と「パス（住所）」</text>' +
          (function () {
            function folder(x, y, label) {
              return '<path d="M' + x + " " + (y + 6) + " h13 l3 4 h16 a3 3 0 0 1 3 3 v15 a3 3 0 0 1 -3 3 h-32 a3 3 0 0 1 -3 -3 v-19 a3 3 0 0 1 3 -3 z\" fill=\"#f0c674\" stroke=\"#b8891f\"/>" +
                '<text x="' + (x + 44) + '" y="' + (y + 24) + '" fill="#23252b" font-size="13" font-weight="700">' + label + "</text>";
            }
            function file(x, y, label) {
              return '<path d="M' + x + " " + y + " h15 l7 7 v21 a2 2 0 0 1 -2 2 h-20 a2 2 0 0 1 -2 -2 v-26 a2 2 0 0 1 2 -2 z\" fill=\"#ffffff\" stroke=\"#9db8cd\"/>" +
                '<path d="M' + (x + 15) + " " + y + " l7 7 h-7 z\" fill=\"#dce8f3\"/>" +
                '<text x="' + (x + 30) + '" y="' + (y + 23) + '" fill="#8a4626" font-size="13" font-weight="700">' + label + "</text>";
            }
            var s = "";
            // ツリーの接続線（エルボー）
            s += '<path d="M52 68 V96 h14 M82 96 V124 h14 M112 124 V152 h14" fill="none" stroke="#cbc2ae" stroke-width="1.5"/>';
            s += folder(40, 40, "/ （ルート）");
            s += folder(70, 68, "home");
            s += folder(100, 96, "user");
            s += file(130, 128, "file.txt");
            return s;
          })() +
          '<rect x="40" y="182" width="480" height="34" rx="8" fill="#fbf3e9" stroke="#e0c9a8"/>' +
          '<text x="58" y="204" fill="#8a4626" font-size="13" font-weight="800">絶対パス：/home/user/file.txt</text>' +
          '<text x="435" y="204" fill="#6b6e76" font-size="11">（ルートからの道順）</text>' +
          '<text x="280" y="236" fill="#6b6e76" font-size="11" text-anchor="middle">user フォルダにいるときの相対パスは「file.txt」だけ。1つ上の階層へは ../ </text>' +
          "</svg>",
        cap: "フォルダ（黄）を上からたどるのが絶対パス。今いる場所からたどるのが相対パス。",
      },
      {
        h: "バックアップ——フル・差分・増分",
        body:
          "<p>障害に備えてデータの複製を取るのが<strong>バックアップ</strong>。取り方が3種類あり、違いが頻出です。</p>" +
          "<ul>" +
          "<li><strong>フル</strong>：毎回すべてを複製（安心だが時間・容量大）。</li>" +
          "<li><strong>差分</strong>：<strong>前回のフルから</strong>変わった分を毎回まとめて複製。</li>" +
          "<li><strong>増分</strong>：<strong>前回のバックアップから</strong>変わった分だけ複製（毎回は速いが、復元はフル＋全増分が必要）。</li>" +
          "</ul>" +
          "<div class='point'><span>ひっかけ注意：<strong>差分は「前回フルから」</strong>、<strong>増分は「前回バックアップから」</strong>。基準が違う点が問われます。</span></div>",
        diagram:
          '<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">差分と増分の違い（月＝フル取得後）</text>' +
          (function () {
            var days = ["火", "水", "木"];
            // 差分行
            var s = '<text x="60" y="70" fill="#2d5470" font-size="12" font-weight="700" text-anchor="end">差分</text>';
            days.forEach(function (d, i) {
              var x = 90 + i * 150, w = 60 + i * 45;
              s += '<rect x="' + x + '" y="52" width="' + w + '" height="30" rx="5" fill="#dce8f3" stroke="#4a7fa8"/>';
              s += '<text x="' + (x + w / 2) + '" y="72" fill="#23252b" font-size="10" text-anchor="middle">' + d + ':フル以降ぜんぶ</text>';
            });
            // 増分行
            s += '<text x="60" y="135" fill="#7a5e17" font-size="12" font-weight="700" text-anchor="end">増分</text>';
            days.forEach(function (d, i) {
              var x = 90 + i * 150, w = 60;
              s += '<rect x="' + x + '" y="118" width="' + w + '" height="30" rx="5" fill="#f2e7cd" stroke="#b28a2e"/>';
              s += '<text x="' + (x + w / 2) + '" y="138" fill="#23252b" font-size="10" text-anchor="middle">' + d + ':前日分だけ</text>';
            });
            return s;
          })() +
          "</svg>",
        cap: "差分は日ごとに増えていく（フルからの累積）。増分は毎回一定（前回からの変化だけ）。",
      },
      {
        h: "表計算——相対参照と絶対参照",
        body:
          "<p>表計算ソフトはiパスの定番。特に<strong>参照のずれ</strong>が問われます。</p>" +
          "<p><strong>相対参照</strong>（例 <code>A1</code>）は、数式をコピーすると参照先も<strong>ずれます</strong>。<strong>絶対参照</strong>（例 <code>$A$1</code>）は<strong>$</strong>で固定され、コピーしても<strong>ずれません</strong>。</p>" +
          "<p>関数は、合計 <strong>SUM</strong>、平均 <strong>AVERAGE</strong>、条件分岐 <strong>IF</strong>、条件に合う件数 <strong>COUNTIF</strong> などの意味を押さえます。</p>",
      },
    ],
    memorize: [
      { k: "OS", v: "基本ソフトウェア。ハードとアプリを仲介し全体を管理。" },
      { k: "仮想記憶", v: "補助記憶を使い、主記憶より大きなメモリがあるように見せる。" },
      { k: "絶対パス / 相対パス", v: "絶対=ルートからの道順。相対=現在地からの道順。" },
      { k: "フル/差分/増分", v: "差分=前回フルからの変更。増分=前回バックアップからの変更(復元は全増分必要)。" },
      { k: "絶対参照", v: "表計算で $ を付けて参照を固定。コピーしてもずれない。" },
      { k: "デバイスドライバ", v: "OSが周辺機器を制御するためのソフト。" },
    ],
    flashcards: [
      { q: "OSの主な役割は？", a: "ハードとアプリを仲介し、タスク管理・メモリ管理・入出力管理などコンピュータ全体を制御する基本ソフトウェア。" },
      { q: "差分バックアップと増分バックアップの違いは？", a: "差分は前回のフルからの変更分、増分は前回のバックアップからの変更分。増分は復元にフル＋全増分が必要。" },
      { q: "表計算の絶対参照とは？記号は？", a: "コピーしてもセル参照がずれない指定。$を付ける（例 $A$1）。" },
      { q: "主記憶より大きな記憶があるように見せるOSの仕組みは？", a: "仮想記憶。" },
      { q: "ファイルの位置をルートから示す道順を何という？", a: "絶対パス（現在地からは相対パス）。" },
    ],
    quiz: [
      {
        q: "OS（オペレーティングシステム）の役割として適切なものはどれか。",
        choices: [
          "表計算やワープロなどの個別業務を直接処理する",
          "ハードウェアとアプリケーションの仲介を行い、資源管理やタスク管理を担う",
          "文書を印刷する専用の装置である",
          "インターネット上のWebページを表示する専用ソフトである",
        ],
        answer: 1,
        explain: "OSはハードとアプリを仲介し全体を管理する<strong>基本ソフトウェア</strong>。表計算等は応用ソフト。",
      },
      {
        q: "毎日、前回のバックアップ以降に変更・追加されたデータだけを保存する方式はどれか。",
        choices: ["フルバックアップ", "差分バックアップ", "増分バックアップ", "ミラーリング"],
        answer: 2,
        explain: "『前回のバックアップ以降の変更分だけ』は<strong>増分バックアップ</strong>。差分は『前回のフル以降』。",
      },
      {
        q: "表計算で、セルB1に「=$A$1*2」と入力し、これをB2にコピーした。B2の数式はどうなるか。",
        choices: ["=$A$1*2", "=$A$2*2", "=A1*2", "=B1*2"],
        answer: 0,
        explain: "$付きの絶対参照はコピーしてもずれない。よってB2も<strong>=$A$1*2</strong>のまま。",
      },
    ],
  }
);
