/* =============================================================
   コレダケ基本情報 カリキュラム — 17 会計・OR/IE・業務分析・法務
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-accounting", domain: "ストラテジ", icon: "🧾", title: "会計・財務とOR/IE",
    intro: "財務諸表、減価償却、在庫管理、線形計画などの意思決定手法。数字で経営を見る。",
    understand: [
      {
        h: "財務諸表と会計",
        body:
          "<p>会社の状態を数字で示すのが財務諸表です。代表が3つ：一定<strong>期間</strong>の儲け（収益−費用＝利益）を表す<strong>損益計算書(P/L)</strong>、ある<strong>時点</strong>の財政状態を表す<strong>貸借対照表(B/S)</strong>、現金の出入りを表す<strong>キャッシュフロー計算書</strong>です。</p>" +
          "<p>B/Sは、右側で<strong>お金をどう集めたか（負債＋純資産＝調達）</strong>、左側で<strong>それを何に使っているか（資産＝運用）</strong>を表し、<strong>左右の合計が必ず一致</strong>します（だから「バランスシート」）。設備などの費用を使用年数で分割計上するのが<strong>減価償却</strong>で、毎年同額の<strong>定額法</strong>と、初期ほど多く計上する<strong>定率法</strong>があります。</p>",
        diagram:
          '<svg viewBox="0 0 480 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="240" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">貸借対照表(B/S)：左右がつり合う</text>' +
          '<text x="150" y="42" fill="#34567a" font-size="11" font-weight="800" text-anchor="middle">資産（運用）</text>' +
          '<rect x="90" y="50" width="120" height="60" fill="#dce8f3" stroke="#4a7fa8"/><text x="150" y="85" fill="#23252b" font-size="11" text-anchor="middle">流動資産</text>' +
          '<rect x="90" y="110" width="120" height="70" fill="#dce8f3" stroke="#4a7fa8"/><text x="150" y="149" fill="#23252b" font-size="11" text-anchor="middle">固定資産</text>' +
          '<text x="330" y="42" fill="#8a6a1e" font-size="11" font-weight="800" text-anchor="middle">負債・純資産（調達）</text>' +
          '<rect x="270" y="50" width="120" height="45" fill="#f2e7cd" stroke="#b28a2e"/><text x="330" y="77" fill="#23252b" font-size="11" text-anchor="middle">流動負債</text>' +
          '<rect x="270" y="95" width="120" height="40" fill="#f2e7cd" stroke="#b28a2e"/><text x="330" y="119" fill="#23252b" font-size="11" text-anchor="middle">固定負債</text>' +
          '<rect x="270" y="135" width="120" height="45" fill="#dcecdd" stroke="#5c9160"/><text x="330" y="162" fill="#23252b" font-size="11" text-anchor="middle">純資産</text>' +
          '<text x="240" y="122" fill="#23252b" font-size="22" font-weight="800" text-anchor="middle">＝</text>' +
          '<text x="240" y="197" fill="#6b6e76" font-size="10.5" text-anchor="middle">資産合計 ＝ 負債 ＋ 純資産（必ず一致する）</text>' +
          "</svg>",
        cap: "右で集めたお金（負債＋純資産）を、左で資産として運用する。左右の合計は必ず一致する。",
      },
      {
        h: "OR・IE（意思決定を数字で支える）",
        body:
          "<p>在庫や生産などの最適化を数式で扱うのが<strong>OR</strong>、作業や工程の効率化が<strong>IE</strong>。制約の中で利益最大などを求める<strong>線形計画法</strong>、複数案を利得表で比較する意思決定、需要予測の<strong>移動平均法</strong>などがあります。</p>" +
          "<p>品質管理では<strong>QC7つ道具</strong>（パレート図・特性要因図・散布図・管理図など）でデータを見える化します。代表が下の<strong>パレート図</strong>——件数の多い順に棒を並べ、累積比率を折れ線で重ねた図です。「上位のわずかな項目が全体の大半を占める」ことが多く、そこに管理を集中する<strong>ABC分析</strong>に使います。</p>",
        diagram:
          '<svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="260" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">パレート図（多い順の棒＋累積比率）</text>' +
          '<line x1="50" y1="190" x2="480" y2="190" stroke="#8a8f98" stroke-width="1.5"/>' +
          '<line x1="50" y1="190" x2="50" y2="40" stroke="#8a8f98" stroke-width="1.5"/>' +
          '<line x1="50" y1="50" x2="365" y2="50" stroke="#cdd7e0" stroke-width="1" stroke-dasharray="4 4"/><text x="372" y="54" fill="#34567a" font-size="9" text-anchor="start">累積100%</text>' +
          '<rect x="55" y="50" width="46" height="140" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="121" y="106" width="46" height="84" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="187" y="156" width="46" height="34" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="253" y="176" width="46" height="14" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<rect x="319" y="182" width="46" height="8" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<polyline points="78,120 144,78 210,61 276,54 342,50" fill="none" stroke="#4a7fa8" stroke-width="2"/>' +
          '<circle cx="78" cy="120" r="3.5" fill="#34567a"/><circle cx="144" cy="78" r="3.5" fill="#34567a"/><circle cx="210" cy="61" r="3.5" fill="#34567a"/><circle cx="276" cy="54" r="3.5" fill="#34567a"/><circle cx="342" cy="50" r="3.5" fill="#34567a"/>' +
          '<text x="78" y="204" fill="#6b6e76" font-size="10" text-anchor="middle">A</text>' +
          '<text x="144" y="204" fill="#6b6e76" font-size="10" text-anchor="middle">B</text>' +
          '<text x="210" y="204" fill="#6b6e76" font-size="10" text-anchor="middle">C</text>' +
          '<text x="276" y="204" fill="#6b6e76" font-size="10" text-anchor="middle">D</text>' +
          '<text x="342" y="204" fill="#6b6e76" font-size="10" text-anchor="middle">E</text>' +
          '<text x="465" y="204" fill="#6b6e76" font-size="9" text-anchor="end">← 件数の多い順</text>' +
          '<text x="235" y="223" fill="#3f7a45" font-size="10" font-weight="700" text-anchor="middle">上位少数（A・B）で全体の大半 → ここに管理を集中（ABC分析）</text>' +
          "</svg>",
        cap: "件数の多い順に棒を並べ累積比率を折れ線で重ねる。上位のわずかな項目が大半を占める＝ABC分析で重点管理。",
      },
    ],
    memorize: [
      { k: "P/L と B/S", v: "P/L=期間の儲け。B/S=時点の資産・負債(左右一致)。" },
      { k: "減価償却", v: "設備費用を使用年数で分割計上。定額法/定率法。" },
      { k: "線形計画法", v: "制約条件の下で利益最大などを求める最適化手法。" },
      { k: "移動平均法", v: "直近数期の平均で需要などを予測する。" },
      { k: "パレート図", v: "多い順に棒＋累積折れ線。ABC分析で重要項目を絞る。" },
      { k: "特性要因図", v: "魚の骨図。結果に対する原因を整理する。" },
    ],
    flashcards: [
      { q: "P/LとB/Sの違いは？", a: "P/Lは一定期間の儲け（収益・費用・利益）、B/Sはある時点の資産・負債・純資産。" },
      { q: "減価償却の定額法と定率法の違いは？", a: "定額法は毎年同額を計上、定率法は初期ほど多く計上する。" },
      { q: "線形計画法とは？", a: "複数の制約条件の下で、利益最大やコスト最小などの目的を達成する最適解を求める手法。" },
      { q: "パレート図で使う分析は？", a: "ABC分析（上位の重要項目に管理を集中する）。" },
    ],
    quiz: [
      {
        q: "一定時点における企業の資産・負債・純資産の状態を表し、資産の合計と負債・純資産の合計が一致する財務諸表はどれか。",
        choices: ["損益計算書", "貸借対照表", "キャッシュフロー計算書", "株主資本等変動計算書"],
        answer: 1,
        explain: "ある時点の財政状態を表し左右が一致するのは<strong>貸借対照表(B/S)</strong>。期間の儲けはP/L。",
      },
      {
        q: "複数の制約条件のもとで、利益を最大にするなどの目的を達成する最適な組合せを求める手法はどれか。",
        choices: ["線形計画法", "移動平均法", "回帰分析", "デルファイ法"],
        answer: 0,
        explain: "制約下での最適化は<strong>線形計画法</strong>。",
      },
      {
        q: "多くの項目の中から重要なものを絞り込むため、件数の多い順に棒グラフを並べ、累積比率を折れ線で示す図はどれか。",
        choices: ["特性要因図", "パレート図", "散布図", "管理図"],
        answer: 1,
        explain: "件数順＋累積折れ線は<strong>パレート図</strong>（ABC分析に使う）。",
      },
    ],
  },
  {
    id: "fe-bizlaw", domain: "ストラテジ", icon: "📚", title: "業務分析・法務・標準化",
    intro: "DFD・決定表などの業務分析、知的財産や関連法規の詳細、標準化。取りこぼしを防ぐ。",
    understand: [
      {
        h: "業務分析の図",
        body:
          "<p>業務を「見える化」する図を用途で使い分けます。データの流れを表す<strong>DFD</strong>、状態の移り変わりを表す<strong>状態遷移図</strong>、作業の日程を表す<strong>ガントチャート</strong>、そして条件と行動の組合せを漏れなく整理する<strong>決定表（デシジョンテーブル）</strong>です。</p>" +
          "<p>決定表は、上半分に<strong>条件</strong>（Y/N）、下半分に<strong>行動</strong>（実行するものに X）を書き、列ごとに「条件の組合せ→とるべき行動」を表します。条件の全パターンを列挙するので、<strong>判断の抜け漏れを防げる</strong>のが強みです。</p>",
        diagram:
          '<svg viewBox="0 0 430 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="215" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">決定表（条件の組合せと行動を整理）</text>' +
          (function () {
            var labelW = 176, cellW = 52, rowH = 27, x0 = 22, y0 = 42;
            var header = ["規則1", "規則2", "規則3", "規則4"];
            var data = [
              { c: true, k: "会員である？", v: ["Y", "Y", "N", "N"] },
              { c: true, k: "1万円以上購入？", v: ["Y", "N", "Y", "N"] },
              { c: false, k: "送料を無料にする", v: ["X", "X", "", ""] },
              { c: false, k: "ポイントを2倍にする", v: ["X", "", "X", ""] },
            ];
            var s = "", j;
            s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + labelW + '" height="' + rowH + '" fill="#eceff3" stroke="#b9c0c8"/>';
            s += '<text x="' + (x0 + 8) + '" y="' + (y0 + 18) + '" fill="#6b6e76" font-size="10" font-weight="700">条件 / 行動</text>';
            for (j = 0; j < 4; j++) {
              var cx = x0 + labelW + j * cellW;
              s += '<rect x="' + cx + '" y="' + y0 + '" width="' + cellW + '" height="' + rowH + '" fill="#eceff3" stroke="#b9c0c8"/>';
              s += '<text x="' + (cx + cellW / 2) + '" y="' + (y0 + 18) + '" fill="#23252b" font-size="10" font-weight="700" text-anchor="middle">' + header[j] + "</text>";
            }
            data.forEach(function (row, i) {
              var y = y0 + (i + 1) * rowH;
              var labelFill = row.c ? "#f5f8fb" : "#f3f8f4";
              s += '<rect x="' + x0 + '" y="' + y + '" width="' + labelW + '" height="' + rowH + '" fill="' + labelFill + '" stroke="#b9c0c8"/>';
              s += '<text x="' + (x0 + 8) + '" y="' + (y + 18) + '" fill="#23252b" font-size="10.5">' + row.k + "</text>";
              for (j = 0; j < 4; j++) {
                var cx2 = x0 + labelW + j * cellW, val = row.v[j], fill = "#ffffff";
                if (row.c && val) fill = "#eef4f9";
                if (!row.c && val === "X") fill = "#dcecdd";
                s += '<rect x="' + cx2 + '" y="' + y + '" width="' + cellW + '" height="' + rowH + '" fill="' + fill + '" stroke="#b9c0c8"/>';
                s += '<text x="' + (cx2 + cellW / 2) + '" y="' + (y + 18) + '" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">' + val + "</text>";
              }
            });
            s += '<line x1="' + x0 + '" y1="' + (y0 + 3 * rowH) + '" x2="' + (x0 + labelW + 4 * cellW) + '" y2="' + (y0 + 3 * rowH) + '" stroke="#8a8f98" stroke-width="1.6"/>';
            return s;
          })() +
          "</svg>",
        cap: "上＝条件(Y/N)、下＝行動(X)。列が「この条件ならこの行動」の規則。全組合せを並べ抜け漏れを防ぐ。",
      },
      {
        h: "法務と標準化",
        body:
          "<p>知的財産権は大きく2つに分かれます。作成した時点で自動的に発生し<strong>登録が不要</strong>な<strong>著作権</strong>（プログラムは保護対象だが、その背後の<strong>アルゴリズム・プログラム言語・規約は対象外</strong>）と、特許庁への<strong>出願・登録が必要</strong>な<strong>産業財産権</strong>（特許・実用新案・意匠・商標の4つ）です。下の図で分類を押さえます。この分類（登録の要否・4つの産業財産権）が頻出です。</p>" +
          "<p>関連法規：他人のIDでの侵入を禁じる<strong>不正アクセス禁止法</strong>、<strong>個人情報保護法</strong>、営業秘密を守る<strong>不正競争防止法</strong>、製品欠陥の<strong>PL法</strong>。労働では<strong>派遣（指揮命令は派遣先）</strong>と<strong>請負（指揮命令は請負業者）</strong>を区別。</p>" +
          "<p>ルールを共通化する<strong>標準化</strong>：国際規格<strong>ISO</strong>、日本産業規格<strong>JIS</strong>、商品バーコードの<strong>JANコード</strong>。</p>",
        diagram:
          '<svg viewBox="0 0 560 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">知的財産権の分類</text>' +
          '<rect x="220" y="28" width="120" height="30" rx="6" fill="#eef4f9" stroke="#4a7fa8"/><text x="280" y="48" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">知的財産権</text>' +
          '<line x1="280" y1="58" x2="133" y2="90" stroke="#8a8f98" stroke-width="1.4"/><line x1="280" y1="58" x2="410" y2="90" stroke="#8a8f98" stroke-width="1.4"/>' +
          '<rect x="48" y="90" width="170" height="52" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="133" y="110" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">著作権</text><text x="133" y="128" fill="#34567a" font-size="9.5" text-anchor="middle">登録不要（作成時に発生）</text>' +
          '<rect x="310" y="90" width="200" height="34" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="410" y="105" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">産業財産権</text><text x="410" y="118" fill="#8a6a1e" font-size="9" text-anchor="middle">出願・登録が必要</text>' +
          '<line x1="410" y1="124" x2="332" y2="150" stroke="#b28a2e" stroke-width="1.2"/><line x1="410" y1="124" x2="396" y2="150" stroke="#b28a2e" stroke-width="1.2"/><line x1="410" y1="124" x2="460" y2="150" stroke="#b28a2e" stroke-width="1.2"/><line x1="410" y1="124" x2="524" y2="150" stroke="#b28a2e" stroke-width="1.2"/>' +
          '<rect x="302" y="152" width="60" height="34" rx="5" fill="#fbf5e6" stroke="#b28a2e"/><text x="332" y="173" fill="#23252b" font-size="10" text-anchor="middle">特許権</text>' +
          '<rect x="366" y="152" width="60" height="34" rx="5" fill="#fbf5e6" stroke="#b28a2e"/><text x="396" y="167" fill="#23252b" font-size="9" text-anchor="middle">実用</text><text x="396" y="179" fill="#23252b" font-size="9" text-anchor="middle">新案権</text>' +
          '<rect x="430" y="152" width="60" height="34" rx="5" fill="#fbf5e6" stroke="#b28a2e"/><text x="460" y="173" fill="#23252b" font-size="10" text-anchor="middle">意匠権</text>' +
          '<rect x="494" y="152" width="60" height="34" rx="5" fill="#fbf5e6" stroke="#b28a2e"/><text x="524" y="173" fill="#23252b" font-size="10" text-anchor="middle">商標権</text>' +
          "</svg>",
        cap: "知的財産権＝著作権（登録不要）＋産業財産権（出願・登録が必要）。産業財産権は特許・実用新案・意匠・商標の4つ。",
      },
    ],
    memorize: [
      { k: "DFD", v: "データの流れを表す図(処理・データストア・源泉/吸収)。" },
      { k: "決定表", v: "条件と行動の組合せを表で整理。抜け漏れを防ぐ。" },
      { k: "状態遷移図", v: "状態の移り変わりと、そのきっかけ(イベント)を表す。" },
      { k: "著作権 / 産業財産権", v: "著作権=登録不要。産業財産権=出願・登録が必要。" },
      { k: "不正競争防止法", v: "営業秘密(顧客名簿・製法等)の不正取得・利用を禁止。" },
      { k: "派遣 vs 請負", v: "指揮命令が派遣先＝派遣、請負業者＝請負。" },
      { k: "標準化", v: "ISO=国際規格、JIS=日本産業規格、JANコード=商品バーコード。" },
    ],
    flashcards: [
      { q: "DFDと決定表はそれぞれ何を表す？", a: "DFDはデータの流れ、決定表は条件と行動の組合せを整理した表。" },
      { q: "著作権と産業財産権の登録要否は？", a: "著作権は登録不要（作成時に発生）、産業財産権は特許庁への出願・登録が必要。" },
      { q: "営業秘密を保護する法律は？", a: "不正競争防止法。" },
      { q: "派遣と請負で作業者に指揮命令するのは誰？", a: "派遣は派遣先、請負は請負業者（受託側）。" },
    ],
    quiz: [
      {
        q: "業務におけるデータの流れに着目し、処理・データの蓄積・データの発生源と行き先を記号で表す図はどれか。",
        choices: ["状態遷移図", "DFD", "ガントチャート", "決定表"],
        answer: 1,
        explain: "データの流れを表すのは<strong>DFD</strong>。条件と行動の整理は決定表。",
      },
      {
        q: "いくつかの条件の組合せと、それに対応して実行すべき処理（行動）を、表形式で漏れなく整理する図はどれか。",
        choices: ["決定表（デシジョンテーブル）", "DFD", "E-R図", "状態遷移図"],
        answer: 0,
        explain: "条件と行動の組合せを整理するのは<strong>決定表</strong>。",
      },
      {
        q: "顧客名簿や独自の製造ノウハウなど、企業の営業秘密を不正に取得・使用する行為を規制する法律はどれか。",
        choices: ["個人情報保護法", "不正競争防止法", "不正アクセス禁止法", "著作権法"],
        answer: 1,
        explain: "営業秘密の保護は<strong>不正競争防止法</strong>。",
      },
    ],
  }
);
