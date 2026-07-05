/* =============================================================
   コレダケITパスポート カリキュラム — 03 システム戦略・システム企画（ストラテジ系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "system-senryaku", domain: "システム戦略", icon: "🧭", title: "情報システム戦略と業務改善",
    intro: "経営戦略に沿ってITをどう使うか。BPR/BPM、クラウド（SaaS/PaaS/IaaS）を、初心者にもやさしく図で。",
    understand: [
      {
        h: "ITは「目的」ではなく「経営の道具」",
        body:
          "<p>会社がITを導入するのは、システムを持つこと自体が目的ではありません。</p>" +
          "<p><strong>売上を伸ばす・コストを下げる・お客様を増やす</strong>といった<strong>経営の目標を実現するための道具</strong>として使います。この方針を全社で決めたものが<strong>情報システム戦略</strong>です。</p>" +
          "<p>会社の業務とシステムの全体像を「あるべき姿」に整理する考え方が<strong>EA（エンタープライズアーキテクチャ）</strong>。今の姿（As-Is）と理想（To-Be）を並べ、その差を埋めていきます。</p>",
      },
      {
        h: "業務のムダをなくす——BPR・BPM・BPO",
        body:
          "<p>仕事のやり方そのものを見直す取り組みには、よく似た3つの略語があります。区別して覚えましょう。</p>" +
          "<ul>" +
          "<li><strong>BPR</strong>：業務のやり方を<strong>根本から作り直す</strong>（一度きりの大改革）。</li>" +
          "<li><strong>BPM</strong>：作り直して終わりでなく、<strong>継続的に改善し続ける</strong>（PDCAを回す）。</li>" +
          "<li><strong>BPO</strong>：自社業務の一部を<strong>外部の専門会社に任せる</strong>（コールセンター等）。</li>" +
          "</ul>" +
          "<div class='point'><span><strong>覚え方：</strong>R=リエンジニアリング（作り直す）、M=マネジメント（回し続ける）、O=アウトソーシング（外に出す）。</span></div>",
      },
      {
        h: "クラウドの3種類——SaaS・PaaS・IaaS",
        body:
          "<p>今は、システムを<strong>自分で全部持たず、インターネット越しに借りて使う</strong>のが主流です。これが<strong>クラウド</strong>。</p>" +
          "<p>借りる範囲によって3種類に分かれます。下の図のように、<strong>青い部分（自分で管理する所）が多いほど自由</strong>、<strong>オレンジ（事業者が管理する所）が多いほど手軽</strong>です。</p>" +
          "<ul>" +
          "<li><strong>IaaS</strong>：サーバなどの<strong>土台だけ</strong>借りる。OSより上は自分で用意（自由だが手間）。</li>" +
          "<li><strong>PaaS</strong>：<strong>開発・実行環境まで</strong>借りる。アプリだけ自分で作る。</li>" +
          "<li><strong>SaaS</strong>：<strong>完成したソフトを使うだけ</strong>（Web版のメールや表計算など）。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 660 470" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="330" y="24" fill="#23252b" font-size="15" font-weight="700" text-anchor="middle">IaaS・PaaS・SaaS の責任範囲</text>' +
          '<line x1="60" y1="44" x2="600" y2="44" stroke="#b7ad99" stroke-width="1.5"/>' +
          '<polygon points="60,44 72,39 72,49" fill="#34567a"/><polygon points="600,44 588,39 588,49" fill="#d99a52"/>' +
          '<text x="70" y="38" fill="#34567a" font-size="12" font-weight="700">自由度：高</text>' +
          '<text x="590" y="38" fill="#c47f2f" font-size="12" font-weight="700" text-anchor="end">手軽さ（利便性）：高</text>' +
          /* 列ヘッダー */
          '<text x="145" y="72" fill="#34567a" font-size="15" font-weight="800" text-anchor="middle">IaaS</text>' +
          '<text x="330" y="72" fill="#8a6a1e" font-size="15" font-weight="800" text-anchor="middle">PaaS</text>' +
          '<text x="515" y="72" fill="#4a7a4e" font-size="15" font-weight="800" text-anchor="middle">SaaS</text>' +
          /* 各層を関数的に描く：navy=ユーザー管轄, orange=事業者管轄 */
          (function () {
            var layers = ["データ", "アプリケーション", "ミドルウェア", "OS", "サーバ", "ストレージ", "ネットワーク"];
            var cols = [
              { x: 60, userTop: 4 },   // IaaS: 上4つがユーザー
              { x: 245, userTop: 2 },  // PaaS: 上2つがユーザー
              { x: 430, userTop: 1 },  // SaaS: 上1つがユーザー
            ];
            var w = 170, h = 40, gap = 4, y0 = 84;
            var s = "";
            cols.forEach(function (c) {
              for (var i = 0; i < 7; i++) {
                var y = y0 + i * (h + gap);
                var isUser = i < c.userTop;
                var fill = isUser ? "#34567a" : "#f4d3ac";
                var stroke = isUser ? "#2a4864" : "#dda85f";
                var tcol = isUser ? "#ffffff" : "#6b4a24";
                s += '<rect x="' + c.x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="' + fill + '" stroke="' + stroke + '"/>';
                s += '<text x="' + (c.x + w / 2) + '" y="' + (y + 25) + '" fill="' + tcol + '" font-size="12" font-weight="600" text-anchor="middle">' + layers[i] + "</text>";
              }
            });
            return s;
          })() +
          /* 凡例 */
          '<rect x="120" y="420" width="20" height="16" rx="3" fill="#34567a"/><text x="147" y="433" fill="#23252b" font-size="12">ユーザーが管理</text>' +
          '<rect x="330" y="420" width="20" height="16" rx="3" fill="#f4d3ac" stroke="#dda85f"/><text x="357" y="433" fill="#23252b" font-size="12">サービス提供事業者が管理</text>' +
          "</svg>",
        cap: "青い「自分で管理」が多いIaaSほど自由、オレンジの「事業者が管理」が多いSaaSほど手軽。",
      },
    ],
    memorize: [
      { k: "SaaS", v: "完成したソフトを利用（例：Web版メール／表計算）。使うだけ。" },
      { k: "PaaS", v: "アプリの開発・実行環境（プラットフォーム）を借りる。アプリは自作。" },
      { k: "IaaS", v: "サーバ・ストレージ・ネットワークなど基盤（インフラ）を借りる。OSから自分で。" },
      { k: "オンプレミス", v: "自社で機器を保有・設置して運用する形態（クラウドの対義）。" },
      { k: "BPR / BPM", v: "BPR=業務を抜本的に作り直す。BPM=継続的に改善（PDCA）。" },
      { k: "BPO", v: "業務の一部を外部の専門企業へ委託（コールセンター等）。" },
      { k: "EA", v: "業務とシステムの全体最適を図る設計思想。As-Is→To-Beで差を埋める。" },
    ],
    flashcards: [
      { q: "SaaS・PaaS・IaaSの提供範囲の違いは？", a: "SaaS＝ソフトまで、PaaS＝開発/実行環境まで、IaaS＝サーバ等の基盤まで。SaaSが最も手軽、IaaSが最も自由。" },
      { q: "自社の設備で情報システムを保有・運用する形態を何という？", a: "オンプレミス。" },
      { q: "業務のやり方を根本から作り直す改革を何という？", a: "BPR（ビジネスプロセスリエンジニアリング）。" },
      { q: "業務の一部を外部の専門業者へ継続的に委託することは？", a: "BPO（ビジネスプロセスアウトソーシング）。" },
      { q: "継続的に業務プロセスを改善し続ける管理手法とその代表的サイクルは？", a: "BPM。PDCA（Plan-Do-Check-Act）を回す。" },
    ],
    quiz: [
      {
        q: "利用者がインターネット経由で、電子メールや表計算などの完成したアプリケーションソフトウェアを利用できるクラウドサービスの形態はどれか。",
        choices: ["IaaS", "PaaS", "SaaS", "オンプレミス"],
        answer: 2,
        explain: "完成したソフトウェアを使う形態は<strong>SaaS</strong>。開発環境はPaaS、基盤はIaaS。",
      },
      {
        q: "アプリケーションを自社で開発したいので、OSやミドルウェアを含む実行・開発環境だけをクラウドから借りたい。適切なサービス形態はどれか。",
        choices: ["SaaS", "PaaS", "IaaS", "ハウジング"],
        answer: 1,
        explain: "開発・実行環境（プラットフォーム）を借りるのは<strong>PaaS</strong>。アプリは自社で作る。",
      },
      {
        q: "コスト削減や専門性向上のため、自社の給与計算業務やコールセンター業務を外部の専門企業に一括して委託することを何というか。",
        choices: ["BPR", "BPO", "BPM", "EA"],
        answer: 1,
        explain: "業務プロセスを外部委託するのは<strong>BPO</strong>。BPRは再構築、BPMは継続改善。",
      },
      {
        q: "既存の業務手順を前提とせず、業務プロセスを抜本的に見直して再設計する取組みはどれか。",
        choices: ["BPO", "BPR", "SLA", "PoC"],
        answer: 1,
        explain: "抜本的な業務プロセスの再構築は<strong>BPR</strong>。",
      },
    ],
  },
  {
    id: "system-kikaku", domain: "システム戦略", icon: "📝", title: "システム企画と調達",
    intro: "システムを作る前の企画・要件定義・調達。RFI/RFPの順番を図で押さえる。",
    understand: [
      {
        h: "作る前に「何が欲しいか」を決める",
        body:
          "<p>システム開発は、いきなり作り始めません。</p>" +
          "<p>まず<strong>企画</strong>で「何のために作るか（目的）」を固め、次に<strong>要件定義</strong>で「何ができればよいか（利用者の要望）」をはっきりさせます。</p>" +
          "<p>要件には2種類あります。</p>" +
          "<ul>" +
          "<li><strong>機能要件</strong>：何ができるか（例：受注データを登録できる）。</li>" +
          "<li><strong>非機能要件</strong>：性能・信頼性・使いやすさなど（例：3秒以内に表示する）。</li>" +
          "</ul>" +
          "<p>ここが曖昧だと、後の工程で大きな手戻りになります。</p>",
      },
      {
        h: "外部に発注する流れ——RFI と RFP",
        body:
          "<p>開発を外部の会社（ベンダー）に頼むときは、順番が決まっています。</p>" +
          "<p>まず<strong>RFI</strong>で各社の<strong>実績や技術の情報を集め</strong>、次に有力な会社へ<strong>RFP</strong>を出して<strong>提案書と見積り</strong>をもらいます。</p>" +
          "<div class='point'><span><strong>順番が命：</strong>RFI（情報集め）→ RFP（提案依頼）。「I=インフォメーション（情報）が先、P=プロポーザル（提案）が後」。</span></div>",
        diagram:
          '<svg viewBox="0 0 660 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="330" y="26" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">システム調達の流れ</text>' +
          (function () {
            var steps = [
              { t: "RFI", s: "情報を集める", c: "#dce8f3", st: "#4a7fa8", tc: "#2d5470" },
              { t: "RFP", s: "提案を依頼", c: "#f2e7cd", st: "#b28a2e", tc: "#7a5e17" },
              { t: "提案・見積り", s: "各社が回答", c: "#f3ddcd", st: "#c1855c", tc: "#8a4626" },
              { t: "選定・契約", s: "発注先を決定", c: "#dcecdd", st: "#5c9160", tc: "#366b3c" },
            ];
            var x0 = 30, w = 138, h = 74, gap = 20, y = 62;
            var s = "";
            steps.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 32) + '" fill="' + p.tc + '" font-size="14" font-weight="800" text-anchor="middle">' + p.t + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 54) + '" fill="#5a5346" font-size="11" text-anchor="middle">' + p.s + "</text>";
              if (i < steps.length - 1) {
                var ax = x + w + 3;
                s += '<polygon points="' + ax + ',' + (y + h / 2 - 7) + ' ' + (ax + 14) + ',' + (y + h / 2) + ' ' + ax + ',' + (y + h / 2 + 7) + '" fill="#a85733"/>';
              }
            });
            return s;
          })() +
          '<text x="330" y="168" fill="#6b6e76" font-size="12" text-anchor="middle">情報収集（RFI）が先、提案依頼（RFP）が後。この順番が頻出。</text>' +
          "</svg>",
        cap: "調達は RFI →（情報収集）→ RFP →（提案依頼）→ 提案・見積り → 選定・契約 の順で進む。",
      },
    ],
    memorize: [
      { k: "RFI", v: "情報提供依頼書。ベンダーの実績・技術情報を<strong>集める</strong>。調達の最初。" },
      { k: "RFP", v: "提案依頼書。要件・予算・納期を示し<strong>提案書と見積り</strong>を求める。" },
      { k: "調達の流れ", v: "RFI → RFP → 提案・見積り → 評価・選定 → 契約。" },
      { k: "機能要件 / 非機能要件", v: "機能=何ができるか。非機能=性能・信頼性・使いやすさ等。" },
      { k: "要件定義", v: "利用者が『何を実現したいか』を明確化する工程。曖昧だと手戻り大。" },
    ],
    flashcards: [
      { q: "RFIとRFPの違いは？", a: "RFI＝情報提供依頼（実績・技術の情報収集）。RFP＝提案依頼（要件を示し提案書・見積りを求める）。" },
      { q: "システム調達の一般的な順序は？", a: "RFI → RFP → 提案・見積り → 評価・選定 → 契約。" },
      { q: "『応答時間3秒以内』『99.9%稼働』のような要件は機能要件か非機能要件か？", a: "非機能要件（性能・信頼性など）。機能そのものは機能要件。" },
      { q: "システム開発で最初に『何を実現したいか』を明確にする工程は？", a: "要件定義。" },
    ],
    quiz: [
      {
        q: "システム調達において、ベンダーに具体的なシステム要件・予算・納期を提示し、提案書と見積書の提出を求める文書はどれか。",
        choices: ["RFI", "RFP", "SLA", "NDA"],
        answer: 1,
        explain: "提案書・見積りを求めるのは<strong>RFP（提案依頼書）</strong>。RFIは事前の情報収集用。",
      },
      {
        q: "システムに求める要件のうち、非機能要件に該当するものはどれか。",
        choices: [
          "受注データを登録できること",
          "月次売上を集計して表示できること",
          "ピーク時でも応答時間を3秒以内に保つこと",
          "顧客情報を検索できること",
        ],
        answer: 2,
        explain: "応答時間などの性能は<strong>非機能要件</strong>。登録・集計・検索といった『何ができるか』は機能要件。",
      },
      {
        q: "調達先の選定に先立ち、複数のベンダーから技術力や実績などの情報を収集するために発行する文書はどれか。",
        choices: ["RFP", "RFI", "検収書", "提案書"],
        answer: 1,
        explain: "情報収集のために出すのは<strong>RFI（情報提供依頼書）</strong>。この後にRFPを出す。",
      },
    ],
  }
);
