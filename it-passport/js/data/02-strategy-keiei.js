/* =============================================================
   コレダケITパスポート カリキュラム — 02 経営戦略・技術戦略・ビジネス（ストラテジ系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "keiei-senryaku", domain: "経営戦略", icon: "♟️", title: "経営戦略とマーケティング",
    intro: "自社をどう分析し、どこで戦い、どう売るか。SWOT・PPM・3C・4Pなど頻出の枠組みを図でつかむ。",
    understand: [
      {
        h: "まず自社を分析する（SWOT・3C）",
        body:
          "<p>戦略づくりは「今の自分を知る」ことから始まります。</p>" +
          "<p><strong>SWOT分析</strong>は、自社の内側の<strong>強み(S)・弱み(W)</strong>と、外の環境の<strong>機会(O)・脅威(T)</strong>を4つの箱に整理します。</p>" +
          "<p><strong>3C分析</strong>は、<strong>顧客(Customer)・競合(Competitor)・自社(Company)</strong>の3つの視点で市場を見ます。</p>",
      },
      {
        h: "どの事業に力を入れる？——PPM",
        body:
          "<p>いくつも事業を持つ会社が「どれに投資し、どれをやめるか」を判断する図が<strong>PPM</strong>です。</p>" +
          "<p><strong>市場成長率（縦）</strong>と<strong>市場占有率＝シェア（横）</strong>で4つに分けます。</p>" +
          "<div class='point'><span><strong>金のなる木</strong>で稼いだお金を、<strong>花形</strong>や有望な<strong>問題児</strong>に投資するのがセオリー。</span></div>",
        diagram:
          '<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="240" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">PPM（市場成長率 × シェア）</text>' +
          '<line x1="70" y1="44" x2="70" y2="288" stroke="#8a8577"/><line x1="70" y1="288" x2="450" y2="288" stroke="#8a8577"/>' +
          '<text x="40" y="170" fill="#6b6e76" font-size="11" transform="rotate(-90 40 170)">市場成長率 →</text>' +
          '<text x="260" y="308" fill="#6b6e76" font-size="11" text-anchor="middle">市場占有率（シェア）→</text>' +
          '<rect x="80" y="54" width="180" height="112" rx="9" fill="#f2e7cd" stroke="#b28a2e"/><text x="170" y="102" fill="#7a5e17" font-size="15" font-weight="800" text-anchor="middle">問題児</text><text x="170" y="124" fill="#6b6e76" font-size="11" text-anchor="middle">成長：高 ／ シェア：低</text>' +
          '<rect x="264" y="54" width="180" height="112" rx="9" fill="#dcecdd" stroke="#5c9160"/><text x="354" y="102" fill="#366b3c" font-size="15" font-weight="800" text-anchor="middle">花形</text><text x="354" y="124" fill="#6b6e76" font-size="11" text-anchor="middle">成長：高 ／ シェア：高</text>' +
          '<rect x="80" y="170" width="180" height="112" rx="9" fill="#efe9dc" stroke="#cfc6b2"/><text x="170" y="218" fill="#5a5346" font-size="15" font-weight="800" text-anchor="middle">負け犬</text><text x="170" y="240" fill="#6b6e76" font-size="11" text-anchor="middle">成長：低 ／ シェア：低</text>' +
          '<rect x="264" y="170" width="180" height="112" rx="9" fill="#dce8f3" stroke="#4a7fa8"/><text x="354" y="218" fill="#2d5470" font-size="15" font-weight="800" text-anchor="middle">金のなる木</text><text x="354" y="240" fill="#6b6e76" font-size="11" text-anchor="middle">成長：低 ／ シェア：高</text>' +
          "</svg>",
        cap: "PPMの4象限。右下「金のなる木」で稼ぎ、右上「花形」と左上「問題児」を育てる。",
      },
      {
        h: "どう売るか——マーケティングの4P",
        body:
          "<p>商品を売る作戦が<strong>マーケティング</strong>。基本の枠組みが<strong>4P</strong>です。</p>" +
          "<ul>" +
          "<li><strong>Product</strong>（製品）：何を売るか</li>" +
          "<li><strong>Price</strong>（価格）：いくらで売るか</li>" +
          "<li><strong>Place</strong>（流通）：どこで売るか</li>" +
          "<li><strong>Promotion</strong>（販促）：どう知らせるか</li>" +
          "</ul>" +
          "<p>他社が真似できない中核の強みを<strong>コアコンピタンス</strong>といいます。</p>",
      },
    ],
    memorize: [
      { k: "SWOT分析", v: "内部=強み(S)・弱み(W)、外部=機会(O)・脅威(T)の4象限。" },
      { k: "3C分析", v: "Customer(顧客)・Competitor(競合)・Company(自社)。" },
      { k: "PPM", v: "市場成長率×市場占有率。花形/金のなる木/問題児/負け犬。" },
      { k: "4P", v: "Product・Price・Place・Promotion。売り手側の視点。" },
      { k: "コアコンピタンス", v: "他社が真似できない、企業の中核的な強み。" },
      { k: "競争戦略", v: "コストリーダーシップ（安さ）／差別化（独自性）／集中（狭い市場）。" },
      { k: "M&A / アライアンス", v: "M&A=合併・買収。アライアンス=企業間提携（資本を伴わない協業も）。" },
    ],
    flashcards: [
      { q: "SWOT分析の4項目は？内部・外部の区別も。", a: "内部：強み(S)・弱み(W)、外部：機会(O)・脅威(T)。" },
      { q: "PPMの2つの軸は？", a: "市場成長率（縦）と市場占有率＝シェア（横）。" },
      { q: "PPMで『市場成長率は低いがシェアが高い』事業は？", a: "金のなる木（投資が少なく安定収益。ここで得た資金を花形や問題児へ）。" },
      { q: "マーケティングの4Pとは？", a: "Product（製品）・Price（価格）・Place（流通）・Promotion（販売促進）。" },
      { q: "他社が容易に真似できない中核的な強みを何という？", a: "コアコンピタンス。" },
      { q: "3C分析の3つのCは？", a: "Customer（顧客）・Competitor（競合）・Company（自社）。" },
    ],
    quiz: [
      {
        q: "PPMにおいて、市場成長率が高くシェアも高い事業の分類はどれか。",
        choices: ["問題児", "花形", "金のなる木", "負け犬"],
        answer: 1,
        explain: "成長率高×シェア高は<strong>花形</strong>。収益は大きいが競争維持のため投資も必要。",
      },
      {
        q: "内部環境の強み・弱みと、外部環境の機会・脅威を整理して戦略立案に用いる分析手法はどれか。",
        choices: ["PPM", "SWOT分析", "3C分析", "バリューチェーン分析"],
        answer: 1,
        explain: "強み・弱み・機会・脅威の4象限は<strong>SWOT分析</strong>。",
      },
      {
        q: "マーケティングミックスの4Pに含まれないものはどれか。",
        choices: ["Product（製品）", "Price（価格）", "People（人材）", "Promotion（販売促進）"],
        answer: 2,
        explain: "4Pは Product・Price・Place・Promotion。<strong>People</strong>は含まれない（Placeが正しい）。",
      },
      {
        q: "他社にない独自の価値を顧客に提供することで競争優位を得ようとする戦略はどれか。",
        choices: ["コストリーダーシップ戦略", "差別化戦略", "集中戦略", "同質化戦略"],
        answer: 1,
        explain: "独自性で優位に立つのは<strong>差別化戦略</strong>。安さで勝つのがコストリーダーシップ。",
      },
    ],
  },
  {
    id: "gijutsu-senryaku", domain: "経営戦略", icon: "💡", title: "技術戦略とイノベーション",
    intro: "技術で稼ぐMOT、イノベーションの種類、PoC。範囲は狭いが取りこぼさない。",
    understand: [
      {
        h: "技術を「お金」に変える経営",
        body:
          "<p><strong>MOT（技術経営）</strong>は、技術を研究で終わらせず<strong>事業の利益に結びつける</strong>ための経営です。</p>" +
          "<p>革新（<strong>イノベーション</strong>）には2種類あります。</p>" +
          "<ul>" +
          "<li><strong>プロダクトイノベーション</strong>：新しい製品・サービスを生む。</li>" +
          "<li><strong>プロセスイノベーション</strong>：作り方・提供方法を革新する。</li>" +
          "</ul>",
      },
      {
        h: "アイデアを試す——PoC と3つの壁",
        body:
          "<p>新しい技術は、いきなり本格開発せず、まず<strong>PoC（概念実証）</strong>で「本当に実現できるか」を小さく試します。</p>" +
          "<p>技術が事業になるまでには、下の図のように<strong>3つの壁</strong>があります。研究→開発の<strong>魔の川</strong>、開発→事業化の<strong>死の谷</strong>、事業化→産業化の<strong>ダーウィンの海</strong>です。順番と名前の対応が問われます。</p>" +
          "<p>外部の技術も取り込む<strong>オープンイノベーション</strong>も現代のキーワードです。</p>",
        diagram:
          '<svg viewBox="0 0 620 165" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="310" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">技術が事業になるまでの3つの壁</text>' +
          (function () {
            var stages = ["研究", "開発", "事業化", "産業化"];
            var walls = ["魔の川", "死の谷", "ダーウィンの海"];
            var s = "", w = 104, h = 56, y = 50;
            var xs = [18, 176, 334, 492];
            for (var i = 0; i < 3; i++) {
              s += '<line x1="' + (xs[i] + w) + '" y1="' + (y + h / 2) + '" x2="' + xs[i + 1] + '" y2="' + (y + h / 2) + '" stroke="#a85733" stroke-width="2"/>';
              s += '<polygon points="' + xs[i + 1] + "," + (y + h / 2) + " " + (xs[i + 1] - 11) + "," + (y + h / 2 - 5) + " " + (xs[i + 1] - 11) + "," + (y + h / 2 + 5) + '" fill="#a85733"/>';
            }
            stages.forEach(function (t, i) {
              s += '<rect x="' + xs[i] + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" fill="#dce8f3" stroke="#4a7fa8"/>';
              s += '<text x="' + (xs[i] + w / 2) + '" y="' + (y + h / 2 + 5) + '" fill="#23252b" font-size="14" font-weight="800" text-anchor="middle">' + t + "</text>";
            });
            walls.forEach(function (t, i) {
              var wx = (xs[i] + w + xs[i + 1]) / 2;
              s += '<rect x="' + (wx - 5) + '" y="' + (y - 6) + '" width="10" height="' + (h + 12) + '" rx="2" fill="#f7dfd6" stroke="#c26b4a"/>';
              s += '<text x="' + wx + '" y="' + (y + h + 24) + '" fill="#b0532f" font-size="10" font-weight="700" text-anchor="middle">' + t + "</text>";
            });
            return s;
          })() +
          "</svg>",
        cap: "研究→開発→事業化→産業化と進む各段階の間に、魔の川・死の谷・ダーウィンの海という壁がある。",
      },
    ],
    memorize: [
      { k: "MOT", v: "技術経営。技術を事業利益に結びつける経営の考え方。" },
      { k: "プロダクト/プロセスイノベーション", v: "製品・サービスの革新／作り方・提供方法の革新。" },
      { k: "PoC", v: "概念実証。新技術やアイデアが実現可能かを小規模に検証。" },
      { k: "魔の川・死の谷・ダーウィンの海", v: "研究→開発→事業化→産業化で越える3つの壁。" },
      { k: "オープンイノベーション", v: "外部の技術・アイデアも取り込んで革新を起こす。" },
    ],
    flashcards: [
      { q: "MOTとは何か？", a: "技術経営。技術開発を事業の利益・競争力に結びつけるための経営手法。" },
      { q: "新しい技術やアイデアが実現可能かを小規模に試す検証を何という？", a: "PoC（概念実証、Proof of Concept）。" },
      { q: "製品そのものの革新と、製造・提供方法の革新をそれぞれ何という？", a: "プロダクトイノベーション／プロセスイノベーション。" },
      { q: "自社に閉じず外部の技術やアイデアを活用する革新の考え方は？", a: "オープンイノベーション。" },
      { q: "開発された技術が事業化に至れず停滞する状態を表す言葉は？", a: "死の谷（研究→開発は『魔の川』、事業化→産業化は『ダーウィンの海』）。" },
    ],
    quiz: [
      {
        q: "新しい技術やビジネスアイデアが実現可能かどうかを、本格開発の前に小規模な試作・実験で検証することを何というか。",
        choices: ["PoC", "SLA", "BPR", "RFP"],
        answer: 0,
        explain: "本格化の前の小規模検証は<strong>PoC（概念実証）</strong>。",
      },
      {
        q: "技術開発の成果を事業の利益や競争優位に結びつけることを重視する経営はどれか。",
        choices: ["CRM", "MOT", "SCM", "ERP"],
        answer: 1,
        explain: "技術を事業に結びつける経営が<strong>MOT（技術経営）</strong>。",
      },
      {
        q: "製造工程や提供方法を革新して生産性や品質を高めるイノベーションはどれか。",
        choices: ["プロダクトイノベーション", "プロセスイノベーション", "オープンイノベーション", "マーケットイン"],
        answer: 1,
        explain: "作り方・提供方法の革新は<strong>プロセスイノベーション</strong>。製品自体の革新はプロダクトイノベーション。",
      },
    ],
  },
  {
    id: "business-industry", domain: "経営戦略", icon: "🏭", title: "ビジネスシステムと産業",
    intro: "POS・EDI・ERP・SCM・CRMなどの業務システムと、IoT・AIの活用。略語の意味を確実に。",
    understand: [
      {
        h: "会社を動かす業務システム（略語）",
        body:
          "<p>業務で使うシステムは略語だらけ。意味をセットで覚えましょう。</p>" +
          "<ul>" +
          "<li><strong>POS</strong>：レジで販売データを即時に集める（売れ筋分析）。</li>" +
          "<li><strong>EDI</strong>：企業間で受発注データを電子交換。</li>" +
          "<li><strong>ERP</strong>：ヒト・モノ・カネを統合管理する基幹システム。</li>" +
          "<li><strong>SCM</strong>：原材料→生産→物流→販売の流れを最適化。</li>" +
          "<li><strong>CRM</strong>：顧客との関係を管理し満足度・売上を高める。</li>" +
          "</ul>",
      },
      {
        h: "IoTがデータを生み、AIが活かす",
        body:
          "<p>モノにセンサーを付けてネットにつなぐのが<strong>IoT</strong>。そこから集まる大量のデータ（<strong>ビッグデータ</strong>）を<strong>AI</strong>で分析して価値を生みます。</p>" +
          "<p>下の図が、その流れです。</p>",
        diagram:
          '<svg viewBox="0 0 660 170" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="330" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">IoTでデータを集めてAIで活かす</text>' +
          (function () {
            var steps = [
              { t: "モノ＋センサー", c: "#dce8f3", st: "#4a7fa8" },
              { t: "ネットで送信", c: "#f2e7cd", st: "#b28a2e" },
              { t: "ビッグデータ", c: "#f3ddcd", st: "#c1855c" },
              { t: "AIで分析・活用", c: "#dcecdd", st: "#5c9160" },
            ];
            var x0 = 24, w = 140, h = 66, gap = 18, y = 60, s = "";
            steps.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 40) + '" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">' + p.t + "</text>";
              if (i < steps.length - 1) { var ax = x + w + 2; s += '<polygon points="' + ax + ',' + (y + h / 2 - 7) + ' ' + (ax + 13) + ',' + (y + h / 2) + ' ' + ax + ',' + (y + h / 2 + 7) + '" fill="#a85733"/>'; }
            });
            return s;
          })() +
          "</svg>",
        cap: "IoT（モノ＋センサー）が集めたビッグデータを、AIが分析して価値を生む。",
      },
    ],
    memorize: [
      { k: "POS", v: "販売時点情報管理。レジで『いつ・何が・いくつ』売れたかを即時収集。" },
      { k: "ERP", v: "経営資源（ヒト・モノ・カネ）を統合管理する基幹システム。" },
      { k: "SCM", v: "供給連鎖管理。原材料→生産→物流→販売のモノの流れを最適化。" },
      { k: "CRM / SFA", v: "CRM=顧客関係管理（満足度・LTV向上）。SFA=営業支援。" },
      { k: "EDI", v: "企業間で受発注などの取引データを電子的に交換。" },
      { k: "IoT", v: "モノをインターネットに接続。センサーでデータ収集→AIで活用。" },
      { k: "BtoB/BtoC/CtoC", v: "企業間／企業対消費者／消費者間（フリマ等）の取引。" },
    ],
    flashcards: [
      { q: "POSシステムとは何を管理するシステムか？", a: "販売時点情報管理。レジで販売データ（商品・数量・時刻）を即時に収集・分析する。" },
      { q: "ERPの目的は？", a: "企業全体の経営資源（ヒト・モノ・カネ・情報）を統合的に管理し、経営を効率化する。" },
      { q: "SCMとCRMの違いは？", a: "SCMは供給連鎖（モノの流れ）の最適化、CRMは顧客との関係管理。" },
      { q: "あらゆるモノをインターネットに接続する仕組みを何という？", a: "IoT（Internet of Things）。" },
      { q: "フリマアプリのような消費者同士の取引形態を何というか？", a: "CtoC（Consumer to Consumer）。" },
      { q: "企業間で受発注データなどを電子的に交換する仕組みは？", a: "EDI（電子データ交換）。" },
    ],
    quiz: [
      {
        q: "小売店のレジで、商品が販売された時点でその商品名・数量・時刻などの情報を収集し、在庫管理や売れ筋分析に活用するシステムはどれか。",
        choices: ["EDI", "POS", "ERP", "CRM"],
        answer: 1,
        explain: "販売時点の情報を収集するのは<strong>POS</strong>（販売時点情報管理）。",
      },
      {
        q: "原材料の調達から生産・物流・販売に至るモノの流れ全体を管理・最適化する手法はどれか。",
        choices: ["CRM", "SFA", "SCM", "MOT"],
        answer: 2,
        explain: "供給連鎖（サプライチェーン）全体の最適化は<strong>SCM</strong>。",
      },
      {
        q: "企業の会計・人事・生産・販売などの基幹業務を統合し、経営資源を一元管理するパッケージシステムはどれか。",
        choices: ["ERP", "POS", "EDI", "CAD"],
        answer: 0,
        explain: "経営資源を統合管理する基幹システムは<strong>ERP</strong>。",
      },
      {
        q: "IoTの活用事例として最も適切なものはどれか。",
        choices: [
          "紙の書類を金庫に保管する",
          "工場の機械にセンサーを取り付け、稼働状況をネット経由で常時監視して故障を予知する",
          "会議の議事録を手書きで残す",
          "電卓で売上を集計する",
        ],
        answer: 1,
        explain: "モノ（機械）にセンサーを付けネット経由でデータを収集・活用するのが<strong>IoT</strong>の典型例。",
      },
    ],
  }
);
