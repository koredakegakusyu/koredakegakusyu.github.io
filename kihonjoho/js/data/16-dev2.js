/* =============================================================
   コレダケ基本情報 カリキュラム — 16 開発プロセス・モジュール設計・見積り
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-devproc", domain: "開発とマネジメント", icon: "🧩", title: "モジュール設計とレビュー",
    intro: "モジュールの分割基準（凝集度・結合度）、レビュー、構成管理。良い設計の考え方。",
    understand: [
      {
        h: "良いモジュール分割（凝集度と結合度）",
        body:
          "<p>プログラムを部品（モジュール）に分けるとき、良い設計の基準が2つあります。</p>" +
          "<ul>" +
          "<li><strong>凝集度</strong>：1つのモジュール内の関連の強さ。<strong>高いほど良い</strong>（1つの役割に集中）。</li>" +
          "<li><strong>結合度</strong>：モジュール間の依存の強さ。<strong>低いほど良い</strong>（互いに独立）。</li>" +
          "</ul>" +
          "<p>下の図のように、モジュールどうしが多くつながり合っている（結合度が高い）と、1か所を直すと連鎖的にあちこちへ影響が波及します。逆に依存が少なければ、修正の影響が閉じ込められて保守が楽になります。</p>" +
          "<div class='point'><span>合言葉は<strong>「凝集度は高く、結合度は低く」</strong>。独立性が高く、修正の影響が波及しにくい設計になります。</span></div>",
        diagram:
          '<svg viewBox="0 0 560 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">結合度（モジュール間の依存）の高い・低い</text>' +
          '<line x1="280" y1="34" x2="280" y2="185" stroke="#e2e4e8" stroke-width="1"/>' +
          '<text x="140" y="52" fill="#b0532f" font-size="12" font-weight="800" text-anchor="middle">結合度 高 → 悪い</text>' +
          '<line x1="72" y1="90" x2="198" y2="90" stroke="#c26b4a" stroke-width="1.8"/>' +
          '<line x1="72" y1="90" x2="135" y2="158" stroke="#c26b4a" stroke-width="1.8"/>' +
          '<line x1="198" y1="90" x2="135" y2="158" stroke="#c26b4a" stroke-width="1.8"/>' +
          '<line x1="80" y1="98" x2="190" y2="98" stroke="#c26b4a" stroke-width="1.8"/>' +
          '<rect x="40" y="72" width="64" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="72" y="93" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">A</text>' +
          '<rect x="166" y="72" width="64" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="198" y="93" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">B</text>' +
          '<rect x="103" y="142" width="64" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="135" y="163" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">C</text>' +
          '<text x="140" y="195" fill="#6b6e76" font-size="9.5" text-anchor="middle">依存が多く、修正の影響が波及</text>' +
          '<text x="420" y="52" fill="#3f7a45" font-size="12" font-weight="800" text-anchor="middle">結合度 低 → 良い</text>' +
          '<line x1="352" y1="90" x2="478" y2="90" stroke="#5c9160" stroke-width="1.8"/>' +
          '<line x1="478" y1="90" x2="415" y2="158" stroke="#5c9160" stroke-width="1.8"/>' +
          '<rect x="320" y="72" width="64" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="352" y="93" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">A</text>' +
          '<rect x="446" y="72" width="64" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="478" y="93" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">B</text>' +
          '<rect x="383" y="142" width="64" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="415" y="163" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">C</text>' +
          '<text x="420" y="195" fill="#6b6e76" font-size="9.5" text-anchor="middle">依存が少なく、影響が閉じる</text>' +
          "</svg>",
        cap: "線はモジュール間の依存（結合）。少ないほど独立性が高く保守しやすい。各モジュール内は1役割に集中（高凝集）が理想。",
      },
      {
        h: "結合度の6段階——弱い(内容結合)から強い(データ結合)まで",
        body:
          "<p>「結合度が低いほど良い」だけでは試験には対応できません。FEでは<strong>結合度を強い順に6段階</strong>に分類し、<strong>どのモジュールが何を共有しているか</strong>で見分ける問題が頻出します。強い（悪い）方から順に見ていきます。</p>" +
          "<ul>" +
          "<li><strong>①内容結合</strong>（最も強い＝最悪）：<strong>他のモジュールの内部（内容）を直接参照・変更</strong>する。相手のプログラムの中身に手を突っ込むイメージで、相手を少し直しただけでこちらが壊れる。</li>" +
          "<li><strong>②共通結合</strong>：<strong>共通領域（グローバル変数など）に置いたデータを、複数のモジュールが直接読み書き</strong>する。誰がいつ値を変えたか追いにくく、影響範囲が読めない。</li>" +
          "<li><strong>③外部結合</strong>：<strong>外部宣言された1つのデータ項目を複数モジュールが共有</strong>する。共通結合に似るが、共有するのが特定の少数項目に限られる分やや弱い。</li>" +
          "<li><strong>④制御結合</strong>：呼び出す際に<strong>「どう動くか」を指示する制御パラメータ（フラグ等）</strong>を渡し、相手モジュールの<strong>内部の処理の流れそのものを制御</strong>する。相手の内部構造をある程度知っている必要がある。</li>" +
          "<li><strong>⑤スタンプ結合</strong>：<strong>配列やレコードなどのデータ構造（まとまり）をそのまま引数として渡す</strong>。渡された側は構造の一部しか使わなくても、構造全体を知る必要がある。</li>" +
          "<li><strong>⑥データ結合</strong>（最も弱い＝最良）：<strong>必要なデータ項目だけを単純な引数として渡す</strong>。相手は渡された値だけを見ればよく、内部構造も他のデータも一切知らずに済む。</li>" +
          "</ul>" +
          "<p>見分け方のコツは<strong>「何を・どんな形で渡しているか」</strong>に注目することです。中身を直接いじる＝内容結合、共有領域ごしに触る＝共通・外部結合、動きを指示する＝制御結合、構造ごと渡す＝スタンプ結合、必要な値だけ渡す＝データ結合、という順に<strong>相手への依存が薄くなっていく</strong>と捉えると整理できます。</p>",
        diagram:
          '<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="310" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">結合度の6段階（強い＝悪い ⇄ 弱い＝良い）</text>' +
          (function () {
            var rows = [
              { n: "①内容結合", d: "他のモジュールの内部（内容）を直接参照・変更する", c: "#f7dfd6", st: "#c26b4a", tc: "#8a4626" },
              { n: "②共通結合", d: "共通領域に定義したデータを複数モジュールが直接参照する", c: "#f8e6da", st: "#cf8a5c", tc: "#8a4626" },
              { n: "③外部結合", d: "外部宣言している1つのデータ項目を複数モジュールが共有する", c: "#f9edd9", st: "#cf9d4a", tc: "#7a5e17" },
              { n: "④制御結合", d: "制御パラメータ(フラグ等)を渡し、相手の実行の流れを制御する", c: "#f2e7cd", st: "#b28a2e", tc: "#7a5e17" },
              { n: "⑤スタンプ結合", d: "配列やレコードなどのデータ構造をそのまま引数で渡す", c: "#e7eddb", st: "#8ba25c", tc: "#4d6b2e" },
              { n: "⑥データ結合", d: "必要なデータ項目だけを単純な引数として受け渡す", c: "#dcecdd", st: "#5c9160", tc: "#366b3c" },
            ];
            var x0 = 78, y0 = 44, rowH = 40, nameW = 96, descW = 380;
            var s = "";
            s += '<text x="30" y="' + (y0 - 10) + '" fill="#b0532f" font-size="10.5" font-weight="700" text-anchor="middle">結合度</text>';
            s += '<text x="30" y="' + (y0 + rows.length * rowH + 14) + '" fill="#3f7a45" font-size="10.5" font-weight="700" text-anchor="middle">独立性</text>';
            s += '<line x1="30" y1="' + (y0 + 4) + '" x2="30" y2="' + (y0 + rows.length * rowH - 4) + '" stroke="#c9ccd1" stroke-width="1.4"/>';
            s += '<polygon points="30,' + (y0) + ' 25,' + (y0 + 10) + ' 35,' + (y0 + 10) + '" fill="#b0532f"/>';
            s += '<polygon points="30,' + (y0 + rows.length * rowH) + ' 25,' + (y0 + rows.length * rowH - 10) + ' 35,' + (y0 + rows.length * rowH - 10) + '" fill="#3f7a45"/>';
            s += '<text x="30" y="' + (y0 + 14) + '" fill="#b0532f" font-size="9" text-anchor="middle">強い</text>';
            s += '<text x="30" y="' + (y0 + rows.length * rowH - 6) + '" fill="#3f7a45" font-size="9" text-anchor="middle">高い</text>';
            rows.forEach(function (r, i) {
              var y = y0 + i * rowH;
              s += '<rect x="' + x0 + '" y="' + y + '" width="' + nameW + '" height="' + (rowH - 4) + '" fill="' + r.c + '" stroke="' + r.st + '"/>';
              s += '<text x="' + (x0 + nameW / 2) + '" y="' + (y + (rowH - 4) / 2 + 5) + '" fill="' + r.tc + '" font-size="11.5" font-weight="800" text-anchor="middle">' + r.n + "</text>";
              s += '<rect x="' + (x0 + nameW) + '" y="' + y + '" width="' + descW + '" height="' + (rowH - 4) + '" fill="#ffffff" stroke="' + r.st + '"/>';
              s += '<text x="' + (x0 + nameW + 10) + '" y="' + (y + (rowH - 4) / 2 + 5) + '" fill="#23252b" font-size="10.5">' + r.d + "</text>";
            });
            return s;
          })() +
          "</svg>",
        cap: "内容結合が最も強く(悪く)独立性が低い。データ結合が最も弱く(良く)独立性が高い。試験ではこの順序と各名称の説明の対応を問われる。",
      },
      {
        h: "レビューと構成管理",
        body:
          "<p>成果物の欠陥を早期に見つける<strong>レビュー</strong>：作成者が説明する<strong>ウォークスルー</strong>、進行役を立て公式に行う<strong>インスペクション</strong>があります。上流で欠陥を見つけるほど修正コストは小さくなります。</p>" +
          "<p>ソースコードや文書の版（バージョン）を管理し、変更履歴を追えるようにするのが<strong>構成管理（バージョン管理）</strong>です。</p>",
      },
    ],
    memorize: [
      { k: "凝集度", v: "モジュール内の関連の強さ。<strong>高いほど良い</strong>。" },
      { k: "結合度", v: "モジュール間の依存の強さ。<strong>低いほど良い</strong>。" },
      { k: "良い設計", v: "凝集度は高く、結合度は低く。独立性が高い。" },
      { k: "結合度6段階(強い順)", v: "内容結合＞共通結合＞外部結合＞制御結合＞スタンプ結合＞データ結合。" },
      { k: "内容結合", v: "他のモジュールの<strong>内部（内容）を直接</strong>参照・変更する。最も強い(最悪)。" },
      { k: "共通結合", v: "<strong>共通領域(グローバル変数等)</strong>のデータを複数モジュールが直接読み書き。" },
      { k: "外部結合", v: "外部宣言している<strong>1つのデータ項目</strong>を複数モジュールが共有。" },
      { k: "制御結合", v: "<strong>制御パラメータ(フラグ等)</strong>を渡し、相手モジュールの実行の流れを制御。" },
      { k: "スタンプ結合", v: "<strong>データ構造(配列・レコード)そのもの</strong>を引数として渡す。" },
      { k: "データ結合", v: "<strong>必要なデータ項目だけ</strong>を単純な引数として受け渡す。最も弱い(最良)。" },
      { k: "ウォークスルー", v: "作成者主体で成果物を説明し欠陥を探すレビュー。" },
      { k: "インスペクション", v: "進行役(モデレータ)を立てて公式に行うレビュー。" },
      { k: "構成管理", v: "版(バージョン)や変更履歴を管理し追跡できるようにする。" },
    ],
    flashcards: [
      { q: "良いモジュール設計の基準は？", a: "凝集度は高く（内部の関連が強い）、結合度は低く（モジュール間の依存が弱い）。" },
      { q: "凝集度と結合度、それぞれ高い・低いどちらが良い？", a: "凝集度は高いほど良い、結合度は低いほど良い。" },
      { q: "結合度が最も強い(悪い)のは？最も弱い(良い)のは？", a: "最も強いのは内容結合、最も弱いのはデータ結合。" },
      { q: "内容結合と共通結合の違いは？", a: "内容結合は他モジュールの内部を直接参照・変更する。共通結合は共通領域(グローバル変数等)のデータを複数モジュールが介して共有する。" },
      { q: "制御結合とは？", a: "制御パラメータ(処理の種類を示すフラグなど)を引数として渡し、呼び出し先モジュールの内部の実行の流れを制御する結合。" },
      { q: "スタンプ結合とデータ結合の違いは？", a: "スタンプ結合はデータ構造(配列・レコード等)をそのまま渡す。データ結合は必要なデータ項目だけを単純な値として渡す。" },
      { q: "ウォークスルーとインスペクションの違いは？", a: "ウォークスルーは作成者主体の非公式なレビュー、インスペクションは進行役を立てた公式なレビュー。" },
      { q: "構成管理（バージョン管理）の目的は？", a: "成果物の版と変更履歴を管理し、いつでも過去の状態を追跡・復元できるようにすること。" },
    ],
    quiz: [
      {
        q: "モジュール設計において、望ましいとされる組合せはどれか。",
        choices: [
          "凝集度は低く、結合度は高い",
          "凝集度は高く、結合度は低い",
          "凝集度も結合度も高い",
          "凝集度も結合度も低い",
        ],
        answer: 1,
        explain: "良い設計は<strong>凝集度が高く、結合度が低い</strong>。独立性が高く保守しやすい。",
      },
      {
        q: "ソフトウェアのレビュー技法のうち、モデレータ（進行役）を置き、あらかじめ定めた手順に従って公式に欠陥を検出するものはどれか。",
        choices: ["ウォークスルー", "インスペクション", "デシジョンテーブル", "プロトタイピング"],
        answer: 1,
        explain: "進行役を立て公式に行うレビューは<strong>インスペクション</strong>。作成者主体の非公式なのがウォークスルー。",
      },
      {
        q: "モジュール間の結合度のうち、他のモジュールの内部を直接参照または変更する、最も結合度が強い（独立性が最も低い）ものはどれか。",
        choices: ["データ結合", "スタンプ結合", "内容結合", "制御結合"],
        answer: 2,
        explain: "他モジュールの内部を直接参照・変更するのは<strong>内容結合</strong>で、6段階のうち最も結合度が強い（悪い）。",
      },
      {
        q: "モジュール間で、処理の実行順序などを指示する制御パラメータ（フラグ）を引数として渡し、呼び出し先モジュールの内部の実行の流れを制御する結合度はどれか。",
        choices: ["データ結合", "制御結合", "外部結合", "共通結合"],
        answer: 1,
        explain: "制御パラメータを渡して相手の実行の流れを制御するのは<strong>制御結合</strong>。",
      },
      {
        q: "モジュール間の結合度のうち、必要なデータ項目だけを単純な引数として受け渡す、最も結合度が弱い（独立性が最も高い）ものはどれか。",
        choices: ["データ結合", "スタンプ結合", "内容結合", "共通結合"],
        answer: 0,
        explain: "必要なデータ項目だけを渡すのは<strong>データ結合</strong>で、6段階のうち最も結合度が弱い（良い）。",
      },
      {
        q: "配列やレコードなどのデータ構造そのものを、呼び出し先モジュールへ引数として渡す結合度はどれか。",
        choices: ["データ結合", "スタンプ結合", "制御結合", "共通結合"],
        answer: 1,
        explain: "データ構造をそのまま渡すのは<strong>スタンプ結合</strong>。必要な項目だけならデータ結合。",
      },
    ],
  },
  {
    id: "fe-estimate", domain: "開発とマネジメント", icon: "📐", title: "開発モデルと見積り",
    intro: "ウォーターフォール/アジャイル/スパイラル、プロトタイピング、規模の見積り手法。",
    understand: [
      {
        h: "開発モデル",
        body:
          "<p>開発の進め方は、大きく<strong>「一方向に進める型」</strong>と<strong>「反復する型」</strong>に分かれます。</p>" +
          "<ul>" +
          "<li><strong>ウォーターフォール</strong>：要件→設計→実装→テストと<strong>後戻りせず順に</strong>進める。計画的だが、後からの変更に弱い。</li>" +
          "<li><strong>プロトタイピング</strong>：早い段階で<strong>試作品</strong>を作り利用者に確認してもらい、認識のずれを防ぐ。</li>" +
          "<li><strong>スパイラルモデル</strong>：<strong>リスクを評価しながら反復</strong>し、少しずつ完成に近づける。</li>" +
          "<li><strong>アジャイル</strong>：<strong>短い反復</strong>で動くソフトを少しずつ作り、変化に対応する。</li>" +
          "</ul>" +
          "<p>また、設計から実装・テストへ下る流れと、それぞれに対応するテスト工程を左右対称に対応づけたのが<strong>V字モデル</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">開発モデルの進み方（一方向 と 反復）</text>' +
          '<line x1="280" y1="34" x2="280" y2="168" stroke="#e2e4e8" stroke-width="1"/>' +
          '<text x="140" y="50" fill="#34567a" font-size="12" font-weight="800" text-anchor="middle">ウォーターフォール</text>' +
          '<rect x="34" y="60" width="84" height="22" rx="4" fill="#dce8f3" stroke="#4a7fa8"/><text x="76" y="76" fill="#23252b" font-size="10" text-anchor="middle">要件定義</text>' +
          '<rect x="72" y="86" width="84" height="22" rx="4" fill="#dce8f3" stroke="#4a7fa8"/><text x="114" y="102" fill="#23252b" font-size="10" text-anchor="middle">設計</text>' +
          '<rect x="110" y="112" width="84" height="22" rx="4" fill="#dce8f3" stroke="#4a7fa8"/><text x="152" y="128" fill="#23252b" font-size="10" text-anchor="middle">実装</text>' +
          '<rect x="148" y="138" width="84" height="22" rx="4" fill="#dce8f3" stroke="#4a7fa8"/><text x="190" y="154" fill="#23252b" font-size="10" text-anchor="middle">テスト</text>' +
          '<text x="250" y="172" fill="#6b6e76" font-size="9" text-anchor="middle">後戻りしない</text>' +
          '<text x="420" y="50" fill="#3f7a45" font-size="12" font-weight="800" text-anchor="middle">反復型（アジャイル等）</text>' +
          '<rect x="378" y="62" width="84" height="26" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="420" y="79" fill="#23252b" font-size="10" text-anchor="middle">計画</text>' +
          '<rect x="336" y="118" width="84" height="26" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="378" y="135" fill="#23252b" font-size="10" text-anchor="middle">実装</text>' +
          '<rect x="440" y="118" width="84" height="26" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="482" y="135" fill="#23252b" font-size="10" text-anchor="middle">確認</text>' +
          '<line x1="405" y1="88" x2="380" y2="116" stroke="#5c9160" stroke-width="1.6"/><polygon points="380,116 388,110 383,120" fill="#5c9160"/>' +
          '<line x1="420" y1="144" x2="440" y2="132" stroke="#5c9160" stroke-width="1.6"/><polygon points="440,132 429,131 435,140" fill="#5c9160"/>' +
          '<line x1="470" y1="118" x2="440" y2="90" stroke="#5c9160" stroke-width="1.6"/><polygon points="440,90 442,101 450,93" fill="#5c9160"/>' +
          '<text x="430" y="172" fill="#6b6e76" font-size="9" text-anchor="middle">短い反復を繰り返す</text>' +
          "</svg>",
        cap: "ウォーターフォールは工程を一方向に下る。反復型は計画→実装→確認を短く繰り返して改善する。",
      },
      {
        h: "規模・工数の見積り",
        body:
          "<p>開発規模を見積もる代表手法：機能（画面・帳票・ファイルなど）の数と難易度から求める<strong>ファンクションポイント法(FP法)</strong>、過去の類似案件から見積もる<strong>類推法</strong>、複数の専門家の意見を集約する<strong>デルファイ法</strong>、プログラム行数から見積もる<strong>LOC法</strong>があります。</p>",
      },
    ],
    memorize: [
      { k: "ウォーターフォール", v: "後戻りせず順に進む。計画的だが変更に弱い。" },
      { k: "プロトタイピング", v: "試作品で早期に確認しながら開発。認識のずれを防ぐ。" },
      { k: "スパイラルモデル", v: "リスクを評価しながら反復して開発。" },
      { k: "V字モデル", v: "各設計工程に対応するテスト工程を配置。" },
      { k: "ファンクションポイント法", v: "機能の数と難易度から規模を見積もる。" },
      { k: "デルファイ法", v: "複数の専門家の意見を繰り返し集約して見積もる。" },
    ],
    flashcards: [
      { q: "ファンクションポイント法とは？", a: "画面・帳票・ファイルなどの機能の数と複雑さから、ソフトウェアの規模を見積もる手法。" },
      { q: "プロトタイピングの目的は？", a: "早い段階で試作品を作って利用者に確認してもらい、要求の認識のずれや手戻りを防ぐ。" },
      { q: "V字モデルとは？", a: "開発工程（設計〜実装）と、それに対応するテスト工程を左右対称に配置した開発モデル。" },
      { q: "スパイラルモデルの特徴は？", a: "リスクを評価しながら反復（スパイラル）を繰り返して開発を進める。" },
    ],
    quiz: [
      {
        q: "開発の規模を、画面・帳票・ファイルなどの機能の数とその難易度に基づいて見積もる手法はどれか。",
        choices: ["ファンクションポイント法", "類推法", "デルファイ法", "LOC法"],
        answer: 0,
        explain: "機能の数・難易度から見積もるのは<strong>ファンクションポイント法</strong>。",
      },
      {
        q: "開発の早い段階で試作品を作成し、利用者に確認してもらうことで要求の認識のずれを減らす開発手法はどれか。",
        choices: ["ウォーターフォールモデル", "プロトタイピング", "V字モデル", "リバースエンジニアリング"],
        answer: 1,
        explain: "試作品で確認するのは<strong>プロトタイピング</strong>。",
      },
    ],
  }
);
