/* =============================================================
   コレダケITパスポート カリキュラム — 05 プロジェクト・サービス・監査（マネジメント系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "project-mgmt", domain: "マネジメント", icon: "📊", title: "プロジェクトマネジメント",
    intro: "QCDの管理、WBS、アローダイアグラムとクリティカルパス。日程計算は毎回のように出る得点源。",
    understand: [
      {
        h: "プロジェクトとQCD、WBS",
        body: "<p><strong>プロジェクト</strong>とは『<strong>期限があり、一度きり</strong>の目標を持つ活動』（毎日繰り返す定常業務ではない）。管理の指針をまとめた知識体系が<strong>PMBOK</strong>。プロジェクトで守るべき3本柱が<strong>QCD</strong>——<strong>Quality（品質）・Cost（費用）・Delivery（納期）</strong>。この3つはトレードオフの関係にあり、バランスを取る。</p><p>作業を漏れなく洗い出すために、成果物や作業を階層的に分解した図が<strong>WBS（作業分解構成図）</strong>。大きな仕事を小さな作業（ワークパッケージ）に分けることで、見積り・担当割り当て・進捗管理がしやすくなる。</p>",
      },
      {
        h: "アローダイアグラムとクリティカルパス",
        body: "<p>作業の順序と所要日数を矢印で表した図が<strong>アローダイアグラム（PERT図）</strong>。ここで最重要なのが<strong>クリティカルパス</strong>——開始から終了までの経路のうち<strong>所要日数が最も長い経路</strong>で、これが<strong>プロジェクト全体の最短完了日数</strong>を決める。クリティカルパス上の作業が1日でも遅れると全体が遅れるため、重点的に管理する。</p><p>下図では、A→B→D（2+4+3=9日）と A→C→D（2+2+3=7日）を比べると、長いA→B→Dの<strong>9日</strong>がクリティカルパス＝全体の最短完了日数になる。</p>",
        diagram:
          '<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans JP, sans-serif">\
<circle cx="60" cy="100" r="22" fill="#dce8f3" stroke="#6b6e76"/><text x="60" y="105" fill="#23252b" font-size="12" text-anchor="middle">①</text>\
<circle cx="250" cy="50" r="22" fill="#dce8f3" stroke="#6b6e76"/><text x="250" y="55" fill="#23252b" font-size="12" text-anchor="middle">②</text>\
<circle cx="250" cy="150" r="22" fill="#dce8f3" stroke="#6b6e76"/><text x="250" y="155" fill="#23252b" font-size="12" text-anchor="middle">③</text>\
<circle cx="460" cy="100" r="22" fill="#dce8f3" stroke="#4a7a4e"/><text x="460" y="105" fill="#23252b" font-size="12" text-anchor="middle">④</text>\
<line x1="80" y1="92" x2="230" y2="58" stroke="#c47f2f" stroke-width="2.5"/><text x="150" y="66" fill="#c47f2f" font-size="11" font-weight="700">A:2</text>\
<line x1="80" y1="108" x2="230" y2="142" stroke="#6b6e76" stroke-width="2"/><text x="150" y="140" fill="#6b6e76" font-size="11">— </text>\
<line x1="272" y1="58" x2="440" y2="92" stroke="#c47f2f" stroke-width="2.5"/><text x="360" y="66" fill="#c47f2f" font-size="11" font-weight="700">B:4</text>\
<line x1="272" y1="142" x2="440" y2="108" stroke="#6b6e76" stroke-width="2"/><text x="360" y="140" fill="#6b6e76" font-size="11">C:2</text>\
<line x1="250" y1="72" x2="250" y2="128" stroke="#6b6e76" stroke-width="1.5" stroke-dasharray="3 3"/>\
<text x="300" y="185" fill="#4a7a4e" font-size="11" font-weight="700" text-anchor="middle">クリティカルパス ①→②→④ = 2+4+... 最長経路が全体日数を決める</text>\
</svg>',
        cap: "アローダイアグラム。最も日数の長い経路（クリティカルパス）が全体の最短完了日数を決める。",
      },
    ],
    memorize: [
      { k: "QCD", v: "Quality(品質)・Cost(費用)・Delivery(納期)。プロジェクトの3制約。" },
      { k: "WBS", v: "作業分解構成図。作業を階層的に細分化し漏れをなくす。" },
      { k: "クリティカルパス", v: "最も所要日数が長い経路＝全体の最短完了日数。遅れると全体が遅れる。" },
      { k: "アローダイアグラム", v: "作業の順序と日数を矢印で表す（PERT図）。" },
      { k: "PMBOK", v: "プロジェクトマネジメントの知識体系（標準的な手引き）。" },
      { k: "プロジェクト", v: "有期・独自の活動。定常的な繰り返し業務ではない。" },
    ],
    flashcards: [
      { q: "プロジェクトの3大制約QCDとは？", a: "Quality（品質）・Cost（費用）・Delivery（納期）。互いにトレードオフ。" },
      { q: "クリティカルパスとは何か？なぜ重要か？", a: "所要日数が最も長い経路。これがプロジェクト全体の最短完了日数を決め、遅れると全体が遅れるため重点管理する。" },
      { q: "作業を漏れなく洗い出すために階層的に分解した図は？", a: "WBS（作業分解構成図）。" },
      { q: "作業の順序と所要日数を矢印で表現する図は？", a: "アローダイアグラム（PERT図）。" },
      { q: "プロジェクトと定常業務の違いは？", a: "プロジェクトは期限があり一度きりの独自な活動。定常業務は日常的に繰り返す活動。" },
    ],
    quiz: [
      {
        q: "下図のアローダイアグラムで、作業A(3日)→作業C(5日)の経路と、作業B(4日)→作業D(2日)の経路が並行して最終工程へ合流する。全体の所要日数（最短完了日数）は何日か。",
        choices: ["6日", "7日", "8日", "9日"],
        answer: 2,
        explain: "各経路の合計はA+C=8日、B+D=6日。長い方（クリティカルパス）が全体を決めるので<strong>8日</strong>。",
      },
      {
        q: "プロジェクトマネジメントにおける制約条件QCDの組合せとして適切なものはどれか。",
        choices: [
          "Quality・Cost・Delivery",
          "Quality・Customer・Data",
          "Quantity・Cost・Design",
          "Quality・Control・Development",
        ],
        answer: 0,
        explain: "QCDは<strong>Quality(品質)・Cost(費用)・Delivery(納期)</strong>。",
      },
      {
        q: "プロジェクトで実施すべき作業を、成果物を基準に階層的に細分化して漏れなく洗い出す手法はどれか。",
        choices: ["WBS", "PPM", "SWOT", "DFD"],
        answer: 0,
        explain: "作業を階層分解して洗い出すのは<strong>WBS（作業分解構成図）</strong>。",
      },
      {
        q: "クリティカルパスに関する記述として適切なものはどれか。",
        choices: [
          "最も費用が安い作業経路のことである",
          "最も所要日数が短い作業経路のことである",
          "所要日数が最も長い作業経路で、プロジェクト全体の完了日数を左右する",
          "並行作業が存在しない場合にだけ現れる",
        ],
        answer: 2,
        explain: "<strong>最長経路＝クリティカルパス</strong>が全体日数を決める。ここが遅れると全体が遅れる。",
      },
    ],
  },
  {
    id: "service-mgmt", domain: "マネジメント", icon: "🛎️", title: "サービスマネジメントとファシリティ",
    intro: "ITILの考え方、SLA/SLM、サービスデスク、そしてデータセンターの設備（UPSなど）。",
    understand: [
      {
        h: "ITサービスマネジメントとSLA",
        body: "<p>作ったシステムを『安定して使い続けられる』ように運用する活動が<strong>ITサービスマネジメント</strong>。その良い進め方をまとめたベストプラクティス集が<strong>ITIL</strong>。提供者と利用者が<strong>サービスの品質水準を数値で合意した文書</strong>が<strong>SLA（サービスレベル合意書）</strong>（例：稼働率99.9%以上、障害復旧2時間以内）。SLAを継続的に管理・改善する活動が<strong>SLM（サービスレベル管理）</strong>だ。</p><p>利用者の問い合わせや障害の窓口を一本化するのが<strong>サービスデスク（ヘルプデスク）</strong>。運用では、下の図のように、まず<strong>インシデント管理</strong>で『とにかく早くサービスを復旧』させ、<strong>問題管理</strong>で『根本原因を突き止め再発を防ぐ』。この2つの役割の違いが問われる。</p>",
        diagram:
          '<svg viewBox="0 0 580 175" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">インシデント管理と問題管理の役割分担</text>' +
          '<rect x="20" y="66" width="92" height="52" rx="8" fill="#f7dfd6" stroke="#c26b4a"/><text x="66" y="90" fill="#8a4626" font-size="12" font-weight="800" text-anchor="middle">⚡障害</text><text x="66" y="107" fill="#8a4626" font-size="10" text-anchor="middle">発生</text>' +
          '<line x1="112" y1="92" x2="148" y2="92" stroke="#8a8f98" stroke-width="2"/><polygon points="148,92 138,87 138,97" fill="#8a8f98"/>' +
          '<rect x="150" y="58" width="184" height="68" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="242" y="82" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">① インシデント管理</text><text x="242" y="102" fill="#34567a" font-size="10" text-anchor="middle">とにかく早く復旧</text><text x="242" y="117" fill="#6b6e76" font-size="9" text-anchor="middle">（応急処置・目的は早期復旧）</text>' +
          '<line x1="334" y1="92" x2="370" y2="92" stroke="#8a8f98" stroke-width="2"/><polygon points="370,92 360,87 360,97" fill="#8a8f98"/>' +
          '<rect x="372" y="58" width="192" height="68" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="468" y="82" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">② 問題管理</text><text x="468" y="102" fill="#3f7a45" font-size="10" text-anchor="middle">根本原因を究明し再発防止</text><text x="468" y="117" fill="#6b6e76" font-size="9" text-anchor="middle">（恒久対策・目的は二度と起こさない）</text>' +
          '<text x="290" y="158" fill="#6b6e76" font-size="10.5" text-anchor="middle">まず復旧（インシデント管理）→ あとで原因究明と再発防止（問題管理）</text>' +
          "</svg>",
        cap: "インシデント管理は「まず早く復旧」、問題管理は「根本原因を突き止め再発を防ぐ」。目的が違う。",
      },
      {
        h: "ファシリティマネジメント（設備）",
        body: "<p>システムを止めないための<strong>建物・電源・空調などの設備管理</strong>が<strong>ファシリティマネジメント</strong>。停電時に一時的に電力を供給し安全にシャットダウンする時間を稼ぐ装置が<strong>UPS（無停電電源装置）</strong>。地震の揺れを抑える<strong>免震・耐震</strong>設備、複数系統の電源、適切な空調（サーバは熱に弱い）などがデータセンターの信頼性を支える。</p>",
      },
    ],
    memorize: [
      { k: "ITIL", v: "ITサービスマネジメントのベストプラクティス集（成功事例の手引き）。" },
      { k: "SLA", v: "サービス品質の水準を数値で合意した文書（稼働率・復旧時間など）。" },
      { k: "SLM", v: "SLAで定めた品質を維持・改善する管理活動。" },
      { k: "サービスデスク", v: "利用者からの問い合わせ・障害受付を一元化する窓口。" },
      { k: "インシデント管理 vs 問題管理", v: "インシデント=早期復旧が目的。問題=根本原因の究明と再発防止。" },
      { k: "UPS", v: "無停電電源装置。停電時に一時給電し安全に停止する時間を確保。" },
    ],
    flashcards: [
      { q: "SLAとは何か？", a: "サービスレベル合意書。提供者と利用者がサービス品質の水準（稼働率・復旧時間など）を数値で合意した文書。" },
      { q: "ITILとは？", a: "ITサービスマネジメントを効果的に行うためのベストプラクティス（成功事例）を体系化したもの。" },
      { q: "インシデント管理と問題管理の目的の違いは？", a: "インシデント管理は迅速なサービス復旧、問題管理は根本原因の特定と再発防止。" },
      { q: "利用者からの問い合わせや障害を受け付ける単一の窓口を何という？", a: "サービスデスク（ヘルプデスク）。" },
      { q: "停電時に一時的に電力を供給する装置は？", a: "UPS（無停電電源装置）。" },
    ],
    quiz: [
      {
        q: "ITサービスの提供者と利用者の間で、サービスの品質（稼働率や障害復旧時間など）を明確な数値で取り決めた文書はどれか。",
        choices: ["SLA", "RFP", "WBS", "NDA"],
        answer: 0,
        explain: "サービス品質の水準を合意する文書は<strong>SLA（サービスレベル合意書）</strong>。",
      },
      {
        q: "ITサービスマネジメントにおいて、発生した障害に対して『まずサービスをできるだけ早く復旧させること』を主な目的とする活動はどれか。",
        choices: ["問題管理", "インシデント管理", "変更管理", "容量管理"],
        answer: 1,
        explain: "早期復旧を目的とするのは<strong>インシデント管理</strong>。根本原因の究明・再発防止は問題管理。",
      },
      {
        q: "停電が発生したときに、サーバなどへ一時的に電力を供給し、正常にシャットダウンするための時間を確保する装置はどれか。",
        choices: ["UPS", "RAID", "NAS", "PoE"],
        answer: 0,
        explain: "停電時に一時給電するのは<strong>UPS（無停電電源装置）</strong>。",
      },
    ],
  },
  {
    id: "kansa", domain: "マネジメント", icon: "🔍", title: "システム監査と内部統制",
    intro: "システム監査の役割と独立性、内部統制、ITガバナンス。範囲は狭いが1問取りに行く。",
    understand: [
      {
        h: "システム監査——第三者が客観的に点検",
        body: "<p><strong>システム監査</strong>は、情報システムが適切・安全・効率的に運用されているかを、<strong>被監査部門から独立した第三者（システム監査人）</strong>が客観的に点検・評価し、問題があれば改善を助言する活動。ポイントは<strong>独立性・客観性</strong>——自分が作った・運用しているシステムを自分で監査してはいけない。監査は<strong>監査計画→予備調査→本調査→評価・結論→報告（監査報告書）→フォローアップ</strong>の流れで進む。証拠となる記録を残せること（<strong>可監査性</strong>）も重要だ。</p>",
      },
      {
        h: "内部統制とITガバナンス",
        body: "<p><strong>内部統制</strong>は、業務が適正に行われるよう組織自身が整える仕組み。不正やミスを防ぐ代表策が<strong>職務分掌</strong>（担当を分けて一人に権限を集中させない。例：発注する人と支払う人を分ける）。下の図のように、一人に権限が集中すると不正が起きやすく、担当を分ければ相互にけん制が働きます。組織がITを適切に活用し、リスクを管理して価値を生み出すよう統制する枠組みが<strong>ITガバナンス</strong>だ。</p>",
        diagram:
          '<svg viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">職務分掌（権限を分けて相互けん制）</text>' +
          '<line x1="280" y1="34" x2="280" y2="170" stroke="#e2e4e8" stroke-width="1"/>' +
          '<text x="140" y="50" fill="#b0532f" font-size="12" font-weight="800" text-anchor="middle">権限が集中 → 危険</text>' +
          '<rect x="70" y="62" width="140" height="46" rx="8" fill="#f7dfd6" stroke="#c26b4a"/><text x="140" y="82" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">担当者A（1人）</text><text x="140" y="99" fill="#8a4626" font-size="9.5" text-anchor="middle">発注 も 支払承認 も</text>' +
          '<text x="140" y="140" fill="#b0532f" font-size="10.5" font-weight="700" text-anchor="middle">一人で不正ができてしまう</text>' +
          '<text x="420" y="50" fill="#3f7a45" font-size="12" font-weight="800" text-anchor="middle">担当を分ける → 安全</text>' +
          '<rect x="318" y="62" width="110" height="46" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="373" y="82" fill="#23252b" font-size="11.5" font-weight="700" text-anchor="middle">発注担当</text><text x="373" y="99" fill="#34567a" font-size="9.5" text-anchor="middle">発注する</text>' +
          '<rect x="440" y="62" width="110" height="46" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="495" y="82" fill="#23252b" font-size="11.5" font-weight="700" text-anchor="middle">承認担当</text><text x="495" y="99" fill="#3f7a45" font-size="9.5" text-anchor="middle">支払を承認</text>' +
          '<line x1="428" y1="118" x2="440" y2="118" stroke="#8a8f98" stroke-width="1.5"/>' +
          '<text x="434" y="132" fill="#6b6e76" font-size="9" text-anchor="middle">相互チェック</text>' +
          '<text x="434" y="152" fill="#3f7a45" font-size="10.5" font-weight="700" text-anchor="middle">互いにけん制し不正を防ぐ</text>' +
          "</svg>",
        cap: "発注と承認を同じ人が担うと不正が起きやすい。担当を分けて相互けん制させるのが職務分掌。",
      },
    ],
    memorize: [
      { k: "システム監査人の独立性", v: "被監査部門から独立した第三者が行う。自作・自運用の対象は監査できない。" },
      { k: "監査の流れ", v: "計画→予備調査→本調査→評価→監査報告書→フォローアップ。" },
      { k: "内部統制", v: "業務の適正を保つ組織内の仕組み。不正・誤りの防止。" },
      { k: "職務分掌", v: "権限を分散し相互けん制。発注者と承認者を分ける等。" },
      { k: "可監査性", v: "監査できるよう証跡（ログ・記録）を残せる状態。" },
    ],
    flashcards: [
      { q: "システム監査で最も重視される監査人の条件は？", a: "独立性・客観性。被監査部門から独立した第三者であること（自作・自運用対象は監査不可）。" },
      { q: "内部統制で、一人に権限を集中させないよう担当を分ける原則は？", a: "職務分掌（相互けん制）。" },
      { q: "組織がITを適切に活用・統制し価値を生む枠組みを何という？", a: "ITガバナンス。" },
      { q: "システム監査の最終的な成果物は？", a: "監査報告書（その後フォローアップで改善を確認）。" },
    ],
    quiz: [
      {
        q: "システム監査人に求められる要件として最も適切なものはどれか。",
        choices: [
          "監査対象システムの開発担当者が兼任する",
          "被監査部門から独立した立場で客観的に評価する",
          "経営者の指示どおりに結論を変更する",
          "監査対象の運用も同時に担当する",
        ],
        answer: 1,
        explain: "システム監査人は<strong>独立性・客観性</strong>が必須。自分が作った・運用する対象は監査できない。",
      },
      {
        q: "内部統制の観点から、購買業務における不正を防ぐ対策として適切なものはどれか。",
        choices: [
          "発注担当者が支払承認も一人で行えるようにする",
          "発注する担当者と支払を承認する担当者を分ける",
          "取引記録を残さないようにする",
          "全員に全権限を付与する",
        ],
        answer: 1,
        explain: "権限を分け相互けん制する<strong>職務分掌</strong>が内部統制の基本。一人に集中させない。",
      },
    ],
  }
);
