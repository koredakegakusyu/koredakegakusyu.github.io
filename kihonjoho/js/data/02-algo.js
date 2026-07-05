/* =============================================================
   コレダケ基本情報 カリキュラム — 02 データ構造とアルゴリズム
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-datastruct", domain: "アルゴリズム", icon: "🧱", title: "データ構造",
    intro: "配列・リスト・スタック・キュー・木・ハッシュ。それぞれの得意・不得意を図でつかむ。",
    understand: [
      {
        h: "基本のデータ構造",
        body:
          "<p>データのしまい方が<strong>データ構造</strong>。代表的なものを押さえます。</p>" +
          "<ul>" +
          "<li><strong>配列</strong>：添字で<strong>即アクセス</strong>できるが、途中の挿入・削除は遅い。</li>" +
          "<li><strong>連結リスト</strong>：各要素がポインタで次を指す。挿入・削除が速いが、添字での即アクセスは不可。</li>" +
          "<li><strong>スタック</strong>：後入れ先出し(LIFO)。関数呼び出しの管理など。</li>" +
          "<li><strong>キュー</strong>：先入れ先出し(FIFO)。処理待ち行列など。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 620 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="150" y="24" fill="#34567a" font-size="13" font-weight="800" text-anchor="middle">配列（添字で即アクセス）</text>' +
          (function () {
            var s = "";
            ["0", "1", "2", "3"].forEach(function (idx, i) {
              var x = 40 + i * 62;
              s += '<rect x="' + x + '" y="44" width="58" height="40" rx="5" fill="#dce8f3" stroke="#4a7fa8"/>';
              s += '<text x="' + (x + 29) + '" y="69" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">' + (i * 10 + 10) + "</text>";
              s += '<text x="' + (x + 29) + '" y="98" fill="#6b6e76" font-size="10" text-anchor="middle">[' + idx + "]</text>";
            });
            return s;
          })() +
          '<text x="450" y="24" fill="#5c9160" font-size="13" font-weight="800" text-anchor="middle">連結リスト（ポインタでつなぐ）</text>' +
          (function () {
            var s = "";
            ["A", "B", "C"].forEach(function (v, i) {
              var x = 350 + i * 90;
              s += '<rect x="' + x + '" y="44" width="60" height="40" rx="5" fill="#dcecdd" stroke="#5c9160"/>';
              s += '<text x="' + (x + 30) + '" y="69" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">' + v + "</text>";
              if (i < 2) s += '<line x1="' + (x + 60) + '" y1="64" x2="' + (x + 90) + '" y2="64" stroke="#a85733" stroke-width="2"/><polygon points="' + (x + 90) + ',64 ' + (x + 82) + ',60 ' + (x + 82) + ',68" fill="#a85733"/>';
            });
            return s;
          })() +
          '<text x="310" y="160" fill="#6b6e76" font-size="11" text-anchor="middle">配列＝即アクセス◎／挿入削除△　　リスト＝挿入削除◎／即アクセス×</text>' +
          "</svg>",
        cap: "配列は添字で一発アクセス。リストはポインタでつなぎ、途中の挿入・削除が得意。",
      },
      {
        h: "木構造——枝分かれで階層を表す",
        body:
          "<p><strong>木（ツリー）</strong>は、1つの根（ルート）から枝分かれしていく階層構造です。フォルダの入れ子や組織図のように、親→子の関係でデータを整理します。</p>" +
          "<p>各節点が子を最大2つ持つのが<strong>2分木</strong>。これを「<strong>左の子＜親＜右の子</strong>」の規則で並べたものが<strong>2分探索木</strong>で、根から左右をたどるだけで目的の値を素早く探せます（平均<strong>O(log n)</strong>）。</p>",
        diagram:
          '<svg viewBox="0 0 480 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="240" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">2分探索木（左＜親＜右）</text>' +
          (function () {
            function node(x, y, v, c) { return '<circle cx="' + x + '" cy="' + y + '" r="20" fill="' + (c || "#dce8f3") + '" stroke="#4a7fa8"/><text x="' + x + '" y="' + (y + 5) + '" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">' + v + "</text>"; }
            var s = "";
            // edges
            s += '<line x1="240" y1="55" x2="150" y2="100" stroke="#b7ad99" stroke-width="2"/><line x1="240" y1="55" x2="330" y2="100" stroke="#b7ad99" stroke-width="2"/>';
            s += '<line x1="150" y1="120" x2="100" y2="155" stroke="#b7ad99" stroke-width="2"/><line x1="150" y1="120" x2="200" y2="155" stroke="#b7ad99" stroke-width="2"/>';
            s += '<line x1="330" y1="120" x2="380" y2="155" stroke="#b7ad99" stroke-width="2"/>';
            s += node(240, 45, "50", "#f2e7cd") + node(150, 105, "30") + node(330, 105, "70") + node(100, 165, "20") + node(200, 165, "40") + node(380, 165, "80");
            s += '<text x="405" y="50" fill="#6b6e76" font-size="10">← 根（ルート）</text>';
            return s;
          })() +
          "</svg>",
        cap: "根から「小さければ左・大きければ右」とたどるだけで高速に探索できる（平均O(log n)）。",
      },
      {
        h: "ハッシュ法——計算で場所を一発で求める",
        body:
          "<p><strong>ハッシュ法</strong>は、キー（探したい値）を<strong>ハッシュ関数</strong>で計算し、その結果を格納場所（配列の位置）として使う方法です。1件ずつ探さず<strong>計算だけで場所が分かる</strong>ので、探索が<strong>平均O(1)＝非常に高速</strong>です。</p>" +
          "<p>ただし、異なるキーからたまたま同じ場所が計算される<strong>衝突（シノニム）</strong>が起こり得ます。その場合は、別の場所へずらす、同じ場所にリストでつなぐ、などの対処をします。</p>",
        diagram:
          '<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="260" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">ハッシュ法（キー → 計算 → 格納位置）</text>' +
          '<rect x="20" y="55" width="110" height="40" rx="7" fill="#eef4f9" stroke="#9db8cd"/><text x="75" y="80" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">キー「田中」</text>' +
          '<rect x="180" y="52" width="130" height="46" rx="9" fill="#f3ddcd" stroke="#c1855c"/><text x="245" y="80" fill="#8a4626" font-size="12" font-weight="800" text-anchor="middle">ハッシュ関数</text>' +
          '<line x1="130" y1="75" x2="178" y2="75" stroke="#a85733" stroke-width="2"/><polygon points="178,75 168,70 168,80" fill="#a85733"/>' +
          '<line x1="310" y1="75" x2="360" y2="75" stroke="#a85733" stroke-width="2"/><polygon points="360,75 350,70 350,80" fill="#a85733"/>' +
          (function () {
            var s = "";
            for (var i = 0; i < 4; i++) {
              var y = 40 + i * 26;
              var hit = i === 2;
              s += '<rect x="365" y="' + y + '" width="130" height="24" rx="4" fill="' + (hit ? "#dcecdd" : "#f6f2e9") + '" stroke="' + (hit ? "#5c9160" : "#cbc2ae") + '"/>';
              s += '<text x="372" y="' + (y + 16) + '" fill="#6b6e76" font-size="10">[' + i + "]</text>";
              if (hit) s += '<text x="450" y="' + (y + 16) + '" fill="#366b3c" font-size="11" font-weight="700" text-anchor="middle">田中</text>';
            }
            return s;
          })() +
          '<text x="430" y="150" fill="#6b6e76" font-size="10" text-anchor="middle">計算結果[2]に直接格納・取得</text>' +
          "</svg>",
        cap: "キーを計算して格納位置を直接決めるので平均O(1)。同じ位置になる衝突（シノニム）に注意。",
      },
    ],
    memorize: [
      { k: "配列", v: "添字で即アクセス◎。途中の挿入・削除は要素移動が必要で△。" },
      { k: "連結リスト", v: "ポインタでつなぐ。挿入・削除◎、ランダムアクセス×。" },
      { k: "スタック / キュー", v: "スタック=LIFO（後入れ先出し）、キュー=FIFO（先入れ先出し）。" },
      { k: "2分探索木", v: "左<節点<右 の順に配置。探索が平均O(log n)。" },
      { k: "ハッシュ法", v: "キーから格納位置を計算。平均O(1)で高速。衝突（シノニム）対策が必要。" },
    ],
    flashcards: [
      { q: "配列と連結リストの得意・不得意は？", a: "配列は添字での即アクセスが速く挿入削除が遅い。リストは挿入削除が速く即アクセスができない。" },
      { q: "ハッシュ法の平均探索時間は？", a: "O(1)（キーから直接位置を計算するため非常に高速）。衝突対策が必要。" },
      { q: "スタックとキューのデータの出し方は？", a: "スタックはLIFO、キューはFIFO。" },
      { q: "2分探索木で左の子・右の子の大小関係は？", a: "左の子＜親＜右の子。中間順で並べると昇順になる。" },
      { q: "ハッシュで異なるキーが同じ格納位置になることを何という？", a: "衝突（シノニム）。" },
    ],
    quiz: [
      {
        q: "後入れ先出し(LIFO)の特性をもち、関数の呼び出しと戻りの管理などに利用されるデータ構造はどれか。",
        choices: ["キュー", "スタック", "ハッシュ表", "2分木"],
        answer: 1,
        explain: "LIFOは<strong>スタック</strong>。関数呼び出しの戻り先管理などに使われる。",
      },
      {
        q: "データの探索において、キーの値から格納位置を計算して直接アクセスするため、平均的に非常に高速な方法はどれか。",
        choices: ["線形探索", "2分探索", "ハッシュ法", "深さ優先探索"],
        answer: 2,
        explain: "キーから位置を計算するのは<strong>ハッシュ法</strong>（平均O(1)）。",
      },
      {
        q: "配列と比較した連結リストの特徴として適切なものはどれか。",
        choices: [
          "添字を使って任意の要素へ一定時間でアクセスできる",
          "要素の途中への挿入・削除がポインタの付け替えだけででき、効率がよい",
          "メモリ上に連続して配置される",
          "要素数を後から増やせない",
        ],
        answer: 1,
        explain: "リストは<strong>挿入・削除がポインタ操作だけ</strong>で効率的。ランダムアクセスは苦手。",
      },
    ],
  },
  {
    id: "fe-algorithm", domain: "アルゴリズム", icon: "🧮", title: "アルゴリズムと計算量",
    intro: "探索・整列と、その速さを表す計算量オーダー。擬似言語（科目B）の土台にもなる。",
    understand: [
      {
        h: "探索と整列",
        body:
          "<p><strong>探索</strong>：先頭から順に見る<strong>線形探索（O(n)）</strong>、整列済みを半分ずつ絞る<strong>2分探索（O(log n)）</strong>。</p>" +
          "<p><strong>整列（ソート）</strong>：単純な<strong>バブル・選択・挿入ソート（O(n²)）</strong>と、高速な<strong>クイックソート・マージソート（平均O(n log n)）</strong>。</p>",
      },
      {
        h: "計算量オーダー（速さの目安）",
        body:
          "<p>アルゴリズムの速さは、データ数nに対する処理回数の増え方＝<strong>計算量オーダー O( )</strong> で表します。</p>" +
          "<p>速い順に <strong>O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²)</strong>。nが大きいほど差が開きます。2分探索がO(log n)、単純なソートがO(n²)、というように分類を覚えます。</p>",
        diagram:
          '<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">計算量オーダー（データ数nに対する処理量）</text>' +
          '<line x1="60" y1="170" x2="530" y2="170" stroke="#8a8577"/><line x1="60" y1="40" x2="60" y2="170" stroke="#8a8577"/>' +
          '<text x="525" y="188" fill="#6b6e76" font-size="11" text-anchor="end">データ数 n →</text>' +
          '<path d="M60 168 Q 300 158 520 150" stroke="#5c9160" stroke-width="2.5" fill="none"/><text x="452" y="143" fill="#5c9160" font-size="11" font-weight="700">O(log n) 速い</text>' +
          '<line x1="60" y1="168" x2="520" y2="95" stroke="#4a7fa8" stroke-width="2.5"/><text x="470" y="92" fill="#34567a" font-size="11" font-weight="700">O(n)</text>' +
          '<path d="M60 168 Q 300 165 430 50" stroke="#c47f2f" stroke-width="2.5" fill="none"/><text x="360" y="55" fill="#c47f2f" font-size="11" font-weight="700">O(n²) 遅い</text>' +
          "</svg>",
        cap: "nが増えるほど O(n²) は急激に立ち上がる。O(log n) はほとんど増えない。",
      },
    ],
    memorize: [
      { k: "線形探索 / 2分探索", v: "線形=O(n)。2分=O(log n)（整列済みが前提）。" },
      { k: "単純ソート", v: "バブル・選択・挿入ソート＝O(n²)。" },
      { k: "高速ソート", v: "クイックソート・マージソート＝平均O(n log n)。" },
      { k: "計算量の順", v: "O(1)<O(log n)<O(n)<O(n log n)<O(n²)。小さいほど速い。" },
      { k: "再帰", v: "自分自身を呼び出す。停止条件（ベースケース）が必須。" },
    ],
    flashcards: [
      { q: "2分探索の計算量と前提は？", a: "O(log n)。データが整列済みであることが前提。" },
      { q: "バブルソートとクイックソートの計算量は？", a: "バブルはO(n²)、クイックは平均O(n log n)。" },
      { q: "計算量を速い順に並べると？", a: "O(1) < O(log n) < O(n) < O(n log n) < O(n²)。" },
      { q: "再帰関数に必ず必要なものは？", a: "停止条件（ベースケース）。ないと無限に呼び出す。" },
    ],
    quiz: [
      {
        q: "整列済みのn個のデータに対する2分探索の平均計算量（オーダー）はどれか。",
        choices: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: 1,
        explain: "半分ずつ絞る2分探索は<strong>O(log n)</strong>。線形探索はO(n)。",
      },
      {
        q: "データ数が非常に大きいとき、最も処理時間の増え方が急なオーダーはどれか。",
        choices: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
        answer: 3,
        explain: "nが大きいほど急増するのは<strong>O(n²)</strong>（単純なソートなど）。",
      },
      {
        q: "整列アルゴリズムのうち、平均計算量がO(n log n)で高速なものはどれか。",
        choices: ["バブルソート", "選択ソート", "クイックソート", "挿入ソート"],
        answer: 2,
        explain: "平均O(n log n)は<strong>クイックソート</strong>（マージソートも同様）。他の3つはO(n²)。",
      },
    ],
  }
);
