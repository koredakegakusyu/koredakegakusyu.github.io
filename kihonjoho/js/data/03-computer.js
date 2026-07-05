/* =============================================================
   コレダケ基本情報 カリキュラム — 03 コンピュータ構成
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-processor", domain: "コンピュータ構成", icon: "🖥️", title: "プロセッサと性能",
    intro: "CPUの命令実行、クロックとCPI、パイプライン。性能計算はFE頻出の得点源。",
    understand: [
      {
        h: "CPUは命令を「取り出して・読んで・実行」する",
        body:
          "<p><strong>CPU</strong>はコンピュータの頭脳で、プログラムの命令を1つずつ処理します。基本の流れは<strong>命令の取り出し（フェッチ）→解読（デコード）→実行</strong>の繰り返しです。</p>" +
          "<p>この処理のテンポを刻むのが<strong>クロック</strong>。1秒間に刻む回数が<strong>クロック周波数</strong>（Hz）で、たとえば2GHzなら1秒に20億回刻みます。周波数が高いほど、たくさんの処理をこなせます。</p>" +
          "<p>逆に、1回刻む時間（＝1クロックの長さ）が<strong>クロック周期</strong>で、周波数の逆数です。<strong>2GHz なら周期は 1÷(2×10⁹)＝0.5ナノ秒</strong>。</p>",
      },
      {
        h: "性能の計算——CPIとクロック周期",
        body:
          "<p>命令によっては1クロックで終わらず、数クロックかかります。<strong>1命令あたりに必要な平均クロック数</strong>を<strong>CPI</strong>といいます。</p>" +
          "<p>すると、1命令を実行する時間は次の式で求められます。計算問題で必ず使うので、公式ごと覚えましょう。</p>" +
          "<div class='point'><span><strong>1命令の実行時間 ＝ CPI × クロック周期</strong>（＝ CPI ÷ クロック周波数）。周波数が高く、CPIが小さいほど速い。</span></div>" +
          "<p>1秒間に何百万命令を実行できるかを表す<strong>MIPS</strong>も性能指標です。</p>",
      },
      {
        h: "パイプライン——命令を「流れ作業」で重ねる",
        body:
          "<p>命令を1つ完全に終えてから次を始めると、各段階の装置に待ち時間ができて無駄です。そこで<strong>パイプライン</strong>では、命令を「取り出し・解読・実行…」の段階に分け、<strong>複数の命令を少しずつずらして同時並行で流します</strong>。工場のベルトコンベア（流れ作業）と同じ発想で、全体の処理量（スループット）が大きく上がります。</p>" +
          "<p>ただし、分岐命令などで「次に何をするか」が決まらず流れが乱れる<strong>ハザード</strong>が起きると効率が落ちます。さらに、パイプラインを複数本用意して同時に流す<strong>スーパースカラ</strong>で高速化する方式もあります。</p>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">パイプライン（命令を少しずつ重ねて並行処理）</text>' +
          (function () {
            var stages = ["取出", "解読", "実行", "書込"];
            var colors = ["#dce8f3", "#f2e7cd", "#dcecdd", "#f3ddcd"];
            var strokes = ["#4a7fa8", "#b28a2e", "#5c9160", "#c1855c"];
            var s = "", x0 = 120, w = 66, h = 30, gap = 4;
            for (var inst = 0; inst < 3; inst++) {
              var y = 42 + inst * (h + 8);
              s += '<text x="40" y="' + (y + 20) + '" fill="#23252b" font-size="11" font-weight="700">命令' + (inst + 1) + "</text>";
              for (var st = 0; st < 4; st++) {
                var x = x0 + (inst + st) * (w + gap);
                s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="' + colors[st] + '" stroke="' + strokes[st] + '"/>';
                s += '<text x="' + (x + w / 2) + '" y="' + (y + 20) + '" fill="#23252b" font-size="11" text-anchor="middle">' + stages[st] + "</text>";
              }
            }
            return s;
          })() +
          '<text x="120" y="185" fill="#6b6e76" font-size="10">← 時間の流れ →</text>' +
          '<text x="420" y="185" fill="#4a7a4e" font-size="11" font-weight="700">重ねるほど全体が速い</text>' +
          "</svg>",
        cap: "各命令を1段ずつずらして並行処理。前の命令の「解読」中に次の命令の「取出」を進める。",
      },
    ],
    memorize: [
      { k: "クロック周波数", v: "CPUの動作テンポ。1秒間のクロック数(Hz)。高いほど速い。" },
      { k: "クロック周期", v: "1クロックの時間＝1÷周波数。1GHz→1ナノ秒。" },
      { k: "CPI", v: "1命令あたりの平均クロック数。小さいほど速い。" },
      { k: "命令実行時間", v: "<strong>CPI × クロック周期</strong>。" },
      { k: "パイプライン", v: "命令を段階に分け重ねて並行実行。スループット向上。" },
      { k: "MIPS", v: "1秒間に実行できる命令数(百万命令/秒)。性能指標。" },
    ],
    flashcards: [
      { q: "クロック周波数2GHzのクロック周期は何秒か？", a: "1÷(2×10⁹)＝0.5ナノ秒。" },
      { q: "1命令の実行時間はどう求める？", a: "CPI × クロック周期。" },
      { q: "パイプラインとは？", a: "命令を複数の段階に分割し、複数命令を少しずつ重ねて並行処理して高速化する仕組み。" },
      { q: "CPIが小さいほど、CPUは速い？遅い？", a: "速い（1命令に必要なクロック数が少ない）。" },
    ],
    quiz: [
      {
        q: "クロック周波数が 2GHz のCPUで、1クロックの時間（クロック周期）は何秒か。",
        choices: ["0.5ナノ秒", "2ナノ秒", "0.5ミリ秒", "2マイクロ秒"],
        answer: 0,
        explain: "周期＝1÷周波数＝1÷(2×10⁹)＝<strong>0.5ナノ秒</strong>。",
      },
      {
        q: "クロック周波数1GHz、平均CPIが4のCPUで、1命令の平均実行時間は何ナノ秒か。",
        choices: ["1ナノ秒", "2ナノ秒", "4ナノ秒", "0.25ナノ秒"],
        answer: 2,
        explain: "周期＝1ナノ秒。実行時間＝CPI×周期＝4×1＝<strong>4ナノ秒</strong>。",
      },
      {
        q: "パイプライン処理の説明として適切なものはどれか。",
        choices: [
          "1つの命令が完全に終わってから次の命令を開始する",
          "命令を複数の段階に分け、複数の命令を少しずつ重ねて並行実行する",
          "命令をランダムな順序で実行する",
          "命令を暗号化して実行する",
        ],
        answer: 1,
        explain: "命令を段階に分け重ねて並行処理するのが<strong>パイプライン</strong>。分岐でハザードが起きると効率が落ちる。",
      },
    ],
  },
  {
    id: "fe-memory", domain: "コンピュータ構成", icon: "🧠", title: "メモリ・キャッシュと論理回路",
    intro: "記憶階層とキャッシュのヒット率（実効アクセス時間）、論理回路。計算と図がカギ。",
    understand: [
      {
        h: "記憶階層とキャッシュのヒット率",
        body:
          "<p>記憶装置は速い順に <strong>レジスタ→キャッシュ→主記憶→補助記憶</strong> の階層です。CPUと主記憶の速度差を埋めるのが<strong>キャッシュメモリ</strong>。</p>" +
          "<p>目的のデータがキャッシュにある割合が<strong>ヒット率</strong>。平均の速さ＝<strong>実効アクセス時間</strong>は次式で求めます。</p>" +
          "<div class='point'><span><strong>実効アクセス時間 ＝ ヒット率×キャッシュ時間 ＋ (1−ヒット率)×主記憶時間</strong></span></div>",
      },
      {
        h: "論理回路",
        body:
          "<p>0と1を扱う電子回路が<strong>論理回路</strong>。基本は<strong>AND・OR・NOT</strong>ゲートで、これらを組み合わせて計算を実現します。</p>" +
          "<p>1桁の足し算（繰り上がりを出す）を行う<strong>半加算器</strong>は、和をXOR、繰り上がりをANDで作ります。真理値表を読み取る問題が頻出です。</p>",
        diagram:
          '<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">論理ゲートの記号と真理値</text>' +
          '<path d="M60 50 h30 a30 30 0 0 1 0 60 h-30 z" fill="#dce8f3" stroke="#4a7fa8"/><text x="80" y="132" fill="#34567a" font-size="12" font-weight="700" text-anchor="middle">AND</text><text x="80" y="150" fill="#6b6e76" font-size="10" text-anchor="middle">両方1で1</text>' +
          '<path d="M210 50 q 40 30 0 60 q 25 -30 0 -60" fill="#dcecdd" stroke="#5c9160"/><text x="230" y="132" fill="#366b3c" font-size="12" font-weight="700" text-anchor="middle">OR</text><text x="230" y="150" fill="#6b6e76" font-size="10" text-anchor="middle">どちらか1で1</text>' +
          '<path d="M360 50 l40 30 l-40 30 z" fill="#f2e7cd" stroke="#b28a2e"/><circle cx="405" cy="80" r="5" fill="#fff" stroke="#b28a2e"/><text x="380" y="132" fill="#7a5e17" font-size="12" font-weight="700" text-anchor="middle">NOT</text><text x="380" y="150" fill="#6b6e76" font-size="10" text-anchor="middle">0↔1反転</text>' +
          '<rect x="450" y="55" width="90" height="55" rx="6" fill="#f3ddcd" stroke="#c1855c"/><text x="495" y="80" fill="#8a4626" font-size="12" font-weight="700" text-anchor="middle">XOR</text><text x="495" y="100" fill="#6b6e76" font-size="10" text-anchor="middle">異なると1</text>' +
          "</svg>",
        cap: "AND=両方1、OR=どちらか1、NOT=反転、XOR=異なると1。半加算器は和=XOR・桁上げ=AND。",
      },
    ],
    memorize: [
      { k: "記憶階層", v: "レジスタ→キャッシュ→主記憶→補助記憶。上ほど速く高価。" },
      { k: "実効アクセス時間", v: "<strong>ヒット率×キャッシュ + (1−ヒット率)×主記憶</strong>。" },
      { k: "ヒット率", v: "目的データがキャッシュにある割合。高いほど速い。" },
      { k: "半加算器", v: "1桁の加算。和＝XOR、桁上げ＝AND。" },
      { k: "AND/OR/NOT/XOR", v: "AND両方1、ORどちらか1、NOT反転、XOR異なると1。" },
    ],
    flashcards: [
      { q: "実効アクセス時間の求め方は？", a: "ヒット率×キャッシュのアクセス時間 + (1−ヒット率)×主記憶のアクセス時間。" },
      { q: "半加算器で、和と桁上げはそれぞれ何の論理演算で作る？", a: "和＝XOR、桁上げ（キャリー）＝AND。" },
      { q: "記憶装置を速い順に4つ挙げると？", a: "レジスタ→キャッシュ→主記憶→補助記憶。" },
      { q: "キャッシュのヒット率が高いと実効アクセス時間はどうなる？", a: "短くなる（速い）。" },
    ],
    quiz: [
      {
        q: "キャッシュのアクセス時間が10ナノ秒、主記憶のアクセス時間が100ナノ秒、ヒット率が90%のとき、実効アクセス時間は何ナノ秒か。",
        choices: ["19ナノ秒", "55ナノ秒", "90ナノ秒", "100ナノ秒"],
        answer: 0,
        explain: "0.9×10 + 0.1×100 ＝ 9 + 10 ＝ <strong>19ナノ秒</strong>。",
      },
      {
        q: "半加算器において、2つの入力の「和」を表す出力を生成する論理演算はどれか。",
        choices: ["AND", "OR", "XOR", "NOT"],
        answer: 2,
        explain: "半加算器の和は<strong>XOR</strong>、桁上げ（キャリー）はANDで作る。",
      },
      {
        q: "CPUと主記憶装置の間に置かれ、両者の速度差を埋める高速なメモリはどれか。",
        choices: ["補助記憶", "キャッシュメモリ", "仮想記憶", "ROM"],
        answer: 1,
        explain: "速度差を埋めるのは<strong>キャッシュメモリ</strong>。",
      },
    ],
  }
);
