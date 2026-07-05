/* =============================================================
   コレダケ基本情報 カリキュラム — 08 開発技術・マネジメント
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-dev", domain: "開発とマネジメント", icon: "🛠️", title: "システム開発とテスト",
    intro: "開発工程とV字モデル、オブジェクト指向とUML、テスト技法、アジャイル。FE午前の定番。",
    understand: [
      {
        h: "開発の流れとV字モデル",
        body:
          "<p>システム開発は上流から順に、<strong>要件定義</strong>（何を作るか）→<strong>外部設計</strong>（利用者から見える画面・機能）→<strong>内部設計</strong>（プログラム内部の作り）→<strong>プログラミング</strong>→<strong>テスト</strong>→<strong>運用・保守</strong>と進みます。<strong>上流工程の欠陥ほど、後で直すときの手戻りコストが大きくなる</strong>ため、各工程の終わりに<strong>レビュー</strong>（ウォークスルーやインスペクション）を行い、欠陥を早く見つけることが重要です。</p>" +
          "<p>この流れを「V字」に折り返すと、<strong>各設計工程と、それを検証するテスト工程が対応</strong>していることが見えます。内部設計で決めた作りは<strong>結合テスト</strong>で、外部設計は<strong>システムテスト</strong>で、要件定義は<strong>受入テスト</strong>で確かめる、という具合です。これが<strong>V字モデル</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 580 285" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">V字モデル（設計とテストの対応）</text>' +
          '<line x1="135" y1="59" x2="440" y2="59" stroke="#b0b3ba" stroke-width="1.3" stroke-dasharray="5 4"/>' +
          '<line x1="180" y1="121" x2="395" y2="121" stroke="#b0b3ba" stroke-width="1.3" stroke-dasharray="5 4"/>' +
          '<line x1="225" y1="183" x2="350" y2="183" stroke="#b0b3ba" stroke-width="1.3" stroke-dasharray="5 4"/>' +
          '<line x1="270" y1="245" x2="305" y2="245" stroke="#b0b3ba" stroke-width="1.3" stroke-dasharray="5 4"/>' +
          '<rect x="15" y="42" width="120" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="75" y="64" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">要件定義</text>' +
          '<rect x="60" y="104" width="120" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="120" y="126" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">外部設計</text>' +
          '<rect x="105" y="166" width="120" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="165" y="188" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">内部設計</text>' +
          '<rect x="150" y="228" width="120" height="34" rx="6" fill="#eef4f9" stroke="#4a7fa8"/><text x="210" y="250" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">プログラミング</text>' +
          '<rect x="305" y="228" width="120" height="34" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="365" y="250" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">単体テスト</text>' +
          '<rect x="350" y="166" width="120" height="34" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="410" y="188" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">結合テスト</text>' +
          '<rect x="395" y="104" width="120" height="34" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="455" y="126" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">システムテスト</text>' +
          '<rect x="440" y="42" width="120" height="34" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="500" y="64" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">受入テスト</text>' +
          "</svg>",
        cap: "左の設計工程を下り、右のテスト工程を上る。点線でつながる工程どうしが対応する（例：外部設計↔システムテスト）。",
      },
      {
        h: "オブジェクト指向とUML",
        body:
          "<p><strong>オブジェクト指向</strong>は、データ（属性）とそれを扱う手続き（メソッド）を<strong>オブジェクト</strong>という単位にまとめて設計する考え方です。共通の設計図が<strong>クラス</strong>、そこから作られた実体が<strong>インスタンス</strong>です。3本柱を押さえます。</p>" +
          "<ul>" +
          "<li><strong>カプセル化</strong>：データと操作を1つにまとめ、内部を外から直接いじれないよう隠す。変更に強くなる。</li>" +
          "<li><strong>継承</strong>：既存クラスの性質を引き継いで新しいクラスを作る（共通部分を再利用。汎化・特化の関係）。</li>" +
          "<li><strong>多態性（ポリモーフィズム）</strong>：同じ命令でも、相手のオブジェクトによって異なる動作をする。</li>" +
          "</ul>" +
          "<p>設計を図で表す共通言語が<strong>UML</strong>。クラスの構造を表す<strong>クラス図</strong>、処理の時間的なやり取りを表す<strong>シーケンス図</strong>、利用者と機能の関係を表す<strong>ユースケース図</strong>、状態の遷移を表す<strong>状態遷移図</strong>などがあります。</p>",
      },
      {
        h: "テスト技法——ブラックボックスとホワイトボックス",
        body:
          "<p>テストの「作り方」には2つの視点があります。</p>" +
          "<ul>" +
          "<li><strong>ブラックボックステスト</strong>：内部構造は見ず、<strong>仕様どおりの入出力になるか</strong>を確認する。代表技法が、同じ結果になる入力をグループ化してその代表値を試す<strong>同値分割</strong>と、仕様の境目（上限・下限やその前後）を狙う<strong>境界値分析</strong>。バグは境目に潜みやすいので境界値は特に重要。</li>" +
          "<li><strong>ホワイトボックステスト</strong>：プログラムの<strong>内部構造（命令や分岐）を見て、どれだけ通ったか</strong>＝<strong>網羅率（カバレッジ）</strong>を確認する。命令をすべて通す命令網羅、分岐の真偽を両方通す分岐網羅などがある。</li>" +
          "</ul>" +
          "<p>テストの「段階」は、部品単位の<strong>単体テスト</strong>→部品をつなぐ<strong>結合テスト</strong>→全体の<strong>システムテスト</strong>→利用者が確認する<strong>受入テスト</strong>と広げます。結合の進め方には上位から検証する<strong>トップダウン（下位の代役＝スタブを使う）</strong>と下位から検証する<strong>ボトムアップ（上位の代役＝ドライバを使う）</strong>があります。</p>",
        diagram:
          '<svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<line x1="290" y1="34" x2="290" y2="168" stroke="#d8dbe0" stroke-width="1"/>' +
          '<text x="145" y="24" fill="#34567a" font-size="13" font-weight="800" text-anchor="middle">ブラックボックス</text>' +
          '<text x="145" y="41" fill="#6b6e76" font-size="10" text-anchor="middle">仕様どおりの入出力かを確認</text>' +
          '<text x="30" y="94" fill="#23252b" font-size="11" text-anchor="middle">入力</text>' +
          '<line x1="46" y1="89" x2="92" y2="89" stroke="#4a7fa8" stroke-width="2"/><polygon points="92,89 83,84 83,94" fill="#4a7fa8"/>' +
          '<rect x="95" y="60" width="96" height="58" rx="8" fill="#cdd1d6" stroke="#9aa0a8"/><text x="143" y="95" fill="#4a525c" font-size="24" font-weight="800" text-anchor="middle">?</text>' +
          '<text x="143" y="133" fill="#6b6e76" font-size="9.5" text-anchor="middle">中身は見ない</text>' +
          '<line x1="191" y1="89" x2="238" y2="89" stroke="#4a7fa8" stroke-width="2"/><polygon points="238,89 229,84 229,94" fill="#4a7fa8"/>' +
          '<text x="255" y="94" fill="#23252b" font-size="11" text-anchor="middle">出力</text>' +
          '<text x="145" y="160" fill="#34567a" font-size="10.5" font-weight="700" text-anchor="middle">同値分割・境界値分析</text>' +
          '<text x="435" y="24" fill="#3f7a45" font-size="13" font-weight="800" text-anchor="middle">ホワイトボックス</text>' +
          '<text x="435" y="41" fill="#6b6e76" font-size="10" text-anchor="middle">内部の通り道を網羅する</text>' +
          '<rect x="360" y="52" width="150" height="82" rx="8" fill="#eef7ef" stroke="#5c9160"/>' +
          '<circle cx="435" cy="68" r="6" fill="#5c9160"/>' +
          '<line x1="435" y1="74" x2="435" y2="84" stroke="#5c9160" stroke-width="1.5"/>' +
          '<polygon points="435,84 414,100 435,116 456,100" fill="#dcecdd" stroke="#5c9160"/><text x="435" y="104" fill="#3f7a45" font-size="9" text-anchor="middle">分岐</text>' +
          '<line x1="414" y1="100" x2="388" y2="126" stroke="#5c9160" stroke-width="1.5"/><line x1="456" y1="100" x2="482" y2="126" stroke="#5c9160" stroke-width="1.5"/>' +
          '<text x="435" y="160" fill="#3f7a45" font-size="10.5" font-weight="700" text-anchor="middle">命令網羅・分岐網羅（カバレッジ）</text>' +
          "</svg>",
        cap: "ブラックボックスは入出力（仕様）で、ホワイトボックスは内部の分岐・命令の網羅で確認する。両者は補い合う。",
      },
      {
        h: "開発モデル——ウォーターフォールとアジャイル",
        body:
          "<p><strong>ウォーターフォール</strong>は上流から下流へ順に進め、原則後戻りしないモデル。計画が立てやすい反面、後からの仕様変更に弱いのが弱点です。</p>" +
          "<p><strong>アジャイル</strong>は<strong>短い反復（イテレーション）</strong>で「動くソフトウェア」を少しずつ作り、変化に柔軟に対応します。代表的な進め方が<strong>スクラム</strong>で、要求一覧の<strong>プロダクトバックログ</strong>から優先順に選び、<strong>スプリント</strong>という短い期間で開発を繰り返します。設計改善を続ける<strong>リファクタリング</strong>、2人1組の<strong>ペアプログラミング</strong>、先にテストを書く<strong>テスト駆動開発(TDD)</strong>もよく問われます。</p>" +
          "<p>試作品で確認する<strong>プロトタイピング</strong>、リスク評価を繰り返す<strong>スパイラル</strong>もあります。いずれのモデルでも、修正のたびに既存機能が壊れていないか確認する<strong>回帰テスト（リグレッションテスト）</strong>が欠かせません。</p>",
      },
    ],
    memorize: [
      { k: "開発工程", v: "要件定義→外部設計→内部設計→プログラミング→テスト→運用・保守。" },
      { k: "V字モデル", v: "設計工程とテスト工程が対応（内部設計↔結合、外部設計↔システム、要件↔受入）。" },
      { k: "レビュー", v: "工程末に欠陥を早期発見。ウォークスルー／インスペクション。" },
      { k: "オブジェクト指向3要素", v: "カプセル化・継承・多態性(ポリモーフィズム)。" },
      { k: "クラスとインスタンス", v: "クラス=設計図、インスタンス=そこから作られた実体。" },
      { k: "UML", v: "設計の標準図。クラス図・シーケンス図・ユースケース図・状態遷移図など。" },
      { k: "ブラックボックステスト", v: "仕様観点で入出力を確認。同値分割・境界値分析。" },
      { k: "ホワイトボックステスト", v: "内部構造観点。命令網羅・分岐網羅（カバレッジ）。" },
      { k: "テストの段階", v: "単体→結合→システム→受入。結合はトップダウン（スタブ）／ボトムアップ（ドライバ）。" },
      { k: "スタブ／ドライバ", v: "スタブ=下位モジュールの代役、ドライバ=上位モジュールの代役。" },
      { k: "ウォーターフォール", v: "上流から順に進め原則後戻りしない。計画的だが変更に弱い。" },
      { k: "アジャイル/スクラム", v: "短い反復(スプリント)で開発。プロダクトバックログから優先順に。変化に強い。" },
      { k: "TDD／リファクタリング", v: "TDD=先にテストを書く。リファクタリング=動作を変えず内部構造を改善。" },
      { k: "回帰テスト", v: "修正後、既存機能が壊れていないか再確認（リグレッションテスト）。" },
    ],
    flashcards: [
      { q: "オブジェクト指向のカプセル化・継承・多態性とは？", a: "カプセル化=データと操作をまとめ隠す、継承=性質を引き継ぐ、多態性=同じ操作で異なる動作。" },
      { q: "ブラックボックスとホワイトボックステストの観点は？", a: "ブラックボックスは仕様(入出力)、ホワイトボックスは内部構造(命令・分岐の網羅)。" },
      { q: "境界値分析とは？", a: "仕様の境目（上限・下限やその前後）に着目してテストケースを選ぶブラックボックス技法。" },
      { q: "UMLの代表的な図を2つ挙げると？", a: "クラス図、シーケンス図（ほかにユースケース図など）。" },
    ],
    quiz: [
      {
        q: "オブジェクト指向で、データとそれを操作する手続きを一体化し、外部から内部を隠蔽する考え方はどれか。",
        choices: ["継承", "カプセル化", "多態性", "汎化"],
        answer: 1,
        explain: "データと操作をまとめ隠すのは<strong>カプセル化</strong>。",
      },
      {
        q: "プログラムの内部構造に着目し、命令や分岐が実行されるかを網羅率で確認するテスト技法はどれか。",
        choices: ["ブラックボックステスト", "ホワイトボックステスト", "負荷テスト", "受入テスト"],
        answer: 1,
        explain: "内部構造（命令・分岐の網羅）を確認するのは<strong>ホワイトボックステスト</strong>。",
      },
      {
        q: "短い期間の反復（イテレーション）を繰り返し、動くソフトウェアを少しずつ作りながら要求変化に対応する開発手法はどれか。",
        choices: ["ウォーターフォールモデル", "アジャイル開発", "V字モデル", "ウォークスルー"],
        answer: 1,
        explain: "短い反復で変化に対応するのは<strong>アジャイル開発</strong>。",
      },
      {
        q: "V字モデルにおいて、外部設計（基本設計）で定めた内容が満たされているかを検証する工程はどれか。",
        choices: ["単体テスト", "結合テスト", "システムテスト", "受入テスト"],
        answer: 2,
        explain: "V字モデルでは外部設計は<strong>システムテスト</strong>と対応する。内部設計は結合テスト、要件定義は受入テストと対応。",
      },
      {
        q: "モジュールを結合してテストする際、まだ完成していない下位モジュールの代わりに用いる仮のモジュールはどれか。",
        choices: ["ドライバ", "スタブ", "スケルトン", "ラッパ"],
        answer: 1,
        explain: "下位モジュールの代役が<strong>スタブ</strong>（トップダウンテストで使用）。上位モジュールの代役はドライバ（ボトムアップで使用）。",
      },
    ],
  },
  {
    id: "fe-pm", domain: "開発とマネジメント", icon: "📊", title: "プロジェクト・サービスマネジメント",
    intro: "アローダイアグラムとクリティカルパス、EVM、ITIL/SLA、システム監査。日程計算は頻出。",
    understand: [
      {
        h: "プロジェクトマネジメントとアローダイアグラム",
        body:
          "<p>有期・独自の活動が<strong>プロジェクト</strong>。3制約が<strong>QCD</strong>（品質・費用・納期）、作業分解が<strong>WBS</strong>。</p>" +
          "<p>作業の順序と日数を表す<strong>アローダイアグラム</strong>で、最も日数の長い経路が<strong>クリティカルパス</strong>＝全体の最短完了日数。ここが遅れると全体が遅れます。進捗と費用を金額で管理する<strong>EVM</strong>も出ます。</p>",
        diagram:
          '<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">アローダイアグラム（最長経路＝クリティカルパス）</text>' +
          (function () {
            function node(cx, cy, n) { return '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="#dce8f3" stroke="#4a7fa8"/><text x="' + cx + '" y="' + (cy + 5) + '" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">' + n + "</text>"; }
            var s = node(50, 90, "①") + node(220, 45, "②") + node(220, 135, "③") + node(400, 90, "④");
            s += '<line x1="70" y1="82" x2="200" y2="52" stroke="#c47f2f" stroke-width="2.5"/><text x="130" y="58" fill="#c47f2f" font-size="12" font-weight="700">A:3</text>';
            s += '<line x1="70" y1="98" x2="200" y2="128" stroke="#8a8577" stroke-width="2"/><text x="130" y="128" fill="#6b6e76" font-size="12">B:2</text>';
            s += '<line x1="240" y1="52" x2="382" y2="82" stroke="#c47f2f" stroke-width="2.5"/><text x="320" y="58" fill="#c47f2f" font-size="12" font-weight="700">C:5</text>';
            s += '<line x1="240" y1="128" x2="382" y2="98" stroke="#8a8577" stroke-width="2"/><text x="320" y="128" fill="#6b6e76" font-size="12">D:4</text>';
            s += '<text x="280" y="170" fill="#5c9160" font-size="12" font-weight="800" text-anchor="middle">①→②→④ = 3+5 = 8日（最長）が全体の最短完了日数</text>';
            return s;
          })() +
          "</svg>",
        cap: "各経路の合計を比べ、最も長い経路（クリティカルパス）が全体日数を決める。",
      },
      {
        h: "サービスマネジメントと監査",
        body:
          "<p>運用の良い進め方が<strong>ITIL</strong>、品質を数値で合意した文書が<strong>SLA</strong>。<strong>インシデント管理</strong>（早期復旧）と<strong>問題管理</strong>（根本原因・再発防止）を区別します。窓口が<strong>サービスデスク</strong>。</p>" +
          "<p><strong>システム監査</strong>は独立した第三者が客観的に点検（自作対象は監査不可）。組織の適正を保つ仕組みが<strong>内部統制</strong>で、権限を分ける<strong>職務分掌</strong>が基本です。</p>",
      },
    ],
    memorize: [
      { k: "QCD / WBS", v: "QCD=品質・費用・納期。WBS=作業を階層分解し漏れをなくす。" },
      { k: "クリティカルパス", v: "最長経路＝全体の最短完了日数。遅れると全体が遅れる。" },
      { k: "EVM", v: "出来高（進捗）と費用を金額で評価するプロジェクト管理手法。" },
      { k: "ITIL / SLA", v: "ITIL=運用のベストプラクティス。SLA=サービス品質の数値合意。" },
      { k: "インシデント vs 問題管理", v: "インシデント=早期復旧、問題=根本原因の究明と再発防止。" },
      { k: "システム監査人", v: "独立性・客観性が必須。自作・自運用の対象は監査できない。" },
    ],
    flashcards: [
      { q: "クリティカルパスとは？", a: "所要日数が最も長い経路。プロジェクト全体の最短完了日数を決め、遅れると全体が遅れる。" },
      { q: "インシデント管理と問題管理の目的は？", a: "インシデントは早期のサービス復旧、問題は根本原因の特定と再発防止。" },
      { q: "SLAとは？", a: "サービスレベル合意書。提供者と利用者がサービス品質を数値で取り決めた文書。" },
      { q: "システム監査人に求められる条件は？", a: "独立性・客観性（被監査部門から独立し、自作・自運用の対象は監査しない）。" },
    ],
    quiz: [
      {
        q: "アローダイアグラムで、作業A(2日)→C(6日)の経路と、作業B(4日)→D(3日)の経路が並行して最終工程に合流する。全体の最短完了日数は何日か。",
        choices: ["7日", "8日", "9日", "10日"],
        answer: 1,
        explain: "A+C=8日、B+D=7日。長い方（クリティカルパス）が全体を決めるので<strong>8日</strong>。",
      },
      {
        q: "ITサービスマネジメントで、発生した障害に対しできるだけ早くサービスを復旧させることを主目的とする活動はどれか。",
        choices: ["問題管理", "インシデント管理", "変更管理", "構成管理"],
        answer: 1,
        explain: "早期復旧が目的なのは<strong>インシデント管理</strong>。根本原因の究明は問題管理。",
      },
      {
        q: "システム監査人に求められる要件として最も適切なものはどれか。",
        choices: [
          "監査対象システムの開発者が兼任する",
          "被監査部門から独立した立場で客観的に評価する",
          "経営者の指示どおりに結論を変える",
          "監査対象の運用も担当する",
        ],
        answer: 1,
        explain: "監査人は<strong>独立性・客観性</strong>が必須。自作・自運用対象は監査できない。",
      },
    ],
  }
);
