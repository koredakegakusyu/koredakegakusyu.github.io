/* =============================================================
   コレダケAWS CCP カリキュラム — 14 料金・請求
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-billing", domain: "請求とサポート", icon: "💰", title: "料金モデルと請求ツール",
    intro: "AWSの料金の考え方（3本柱）と、コストを見える化・管理するツール（Cost Explorer・Budgets等）。",
    understand: [
      {
        h: "AWS料金の3本柱と『使わなければ無料』の考え方",
        body:
          "<p>AWSの料金は、ざっくり<strong>3つの要素</strong>で決まります。</p>" +
          "<ul>" +
          "<li><strong>コンピューティング（実行時間）</strong>：EC2などを動かした時間。</li>" +
          "<li><strong>ストレージ（保存量）</strong>：S3などに保存したデータ量。</li>" +
          "<li><strong>データ転送（外向き）</strong>：AWSから<strong>インターネットへ出ていく通信</strong>には料金がかかる。逆に<strong>AWSへ入ってくる通信（インバウンド）は基本無料</strong>。</li>" +
          "</ul>" +
          "<p>基本は<strong>従量課金（使った分だけ）</strong>で、使わなければ課金されません。さらに、新規利用者向けに一定枠まで無料で試せる<strong>無料利用枠（Free Tier）</strong>があります。多く使うほど単価が下がる<strong>ボリュームディスカウント</strong>もポイントです。</p>",
        diagram:
          '<svg viewBox="0 0 580 160" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">AWS 料金の3本柱</text>' +
          (function () {
            var items = [
              { n: "コンピューティング", d: "動かした時間\n(EC2等)", c: "#dce8f3", st: "#4a7fa8" },
              { n: "ストレージ", d: "保存したデータ量\n(S3等)", c: "#f2e7cd", st: "#b28a2e" },
              { n: "データ転送(外向き)", d: "ネットへ出る通信\n※入るのは無料", c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", w = 168, h = 84, gap = 18, x0 = 30, y = 42;
            items.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 30) + '" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              var lines = p.d.split("\n");
              lines.forEach(function (ln, li) { s += '<text x="' + (x + w / 2) + '" y="' + (y + 52 + li * 15) + '" fill="#5a5346" font-size="9.5" text-anchor="middle">' + ln + "</text>"; });
            });
            return s;
          })() +
          "</svg>",
        cap: "料金は「実行時間・保存量・外向きのデータ転送」で決まる。AWSへ入る通信は基本無料。",
      },
      {
        h: "コストを見える化・管理するツール",
        body:
          "<p>使いすぎを防ぐには、コストの<strong>見える化と管理</strong>が大切です。名前と役割を区別します。</p>" +
          "<ul>" +
          "<li><strong>Cost Explorer</strong>：過去〜現在のコストを<strong>グラフで可視化・分析</strong>し、傾向を把握する。</li>" +
          "<li><strong>AWS Budgets</strong>：<strong>予算を決め、超えそうになったら通知（アラート）</strong>を受け取る。使いすぎ防止。</li>" +
          "<li><strong>Cost and Usage Report（CUR）</strong>：最も詳細な<strong>コスト・使用量のレポート</strong>を出力する。</li>" +
          "<li><strong>請求ダッシュボード / Billing</strong>：今月の請求額を確認する画面。</li>" +
          "<li><strong>コスト配分タグ</strong>：リソースにタグを付け、部門・用途ごとにコストを集計する。</li>" +
          "</ul>" +
          "<p>混同注意：<strong>『分析＝Cost Explorer』『予算超過の通知＝Budgets』</strong>。Organizationsの<strong>一括請求</strong>でボリュームディスカウントを効かせるのも重要です。</p>",
      },
    ],
    memorize: [
      { k: "料金の3本柱", v: "コンピューティング(時間)・ストレージ(保存量)・データ転送(外向き)。" },
      { k: "データ転送料金", v: "AWSから外へ出る通信は課金。AWSへ入る(インバウンド)は基本無料。" },
      { k: "従量課金 / 無料利用枠", v: "使った分だけ。Free Tierで一定枠まで無料で試せる。" },
      { k: "Cost Explorer", v: "コストをグラフで可視化・分析し傾向を把握する。" },
      { k: "AWS Budgets", v: "予算を設定し超過しそうなときに通知。使いすぎ防止。" },
      { k: "Cost and Usage Report", v: "最も詳細なコスト・使用量のレポート。" },
      { k: "一括請求(Organizations)", v: "複数アカウントの請求をまとめ、ボリュームディスカウントを効かせる。" },
    ],
    flashcards: [
      { q: "AWSの料金を決める3つの主な要素は？", a: "コンピューティング（実行時間）、ストレージ（保存量）、データ転送（外向きの通信）。" },
      { q: "AWSのデータ転送料金の原則は？", a: "AWSから外部（インターネット）へ出る通信には課金され、AWSへ入ってくる通信は基本無料。" },
      { q: "Cost ExplorerとAWS Budgetsの違いは？", a: "Cost Explorerはコストをグラフで可視化・分析するツール、Budgetsは予算を設定して超過しそうなときに通知するツール。" },
      { q: "新規利用者が一定の範囲まで無料でAWSを試せる仕組みは？", a: "無料利用枠（AWS Free Tier）。" },
      { q: "複数アカウントの請求をまとめて割引を受けられる仕組みは？", a: "AWS Organizationsの一括請求（Consolidated Billing）。" },
    ],
    quiz: [
      {
        q: "AWSの料金に関する記述として適切なものはどれか。",
        choices: [
          "AWSへデータを転送（アップロード）する通信には常に高額な料金がかかる",
          "AWSから外部インターネットへ出るデータ転送には料金がかかるが、AWSへ入る通信は基本無料である",
          "使用していないEC2でも毎月固定料金が必ずかかる",
          "料金は毎月定額制でしか選べない",
        ],
        answer: 1,
        explain: "<strong>外向き（アウトバウンド）のデータ転送は課金、内向き（インバウンド）は基本無料</strong>。基本は従量課金。",
      },
      {
        q: "月々のAWS利用料が設定した予算額を超えそうになったときに、通知（アラート）を受け取りたい。用いるべきサービスはどれか。",
        choices: ["AWS Cost Explorer", "AWS Budgets", "AWS Trusted Advisor", "AWS CloudTrail"],
        answer: 1,
        explain: "予算を設定し超過しそうなときに通知するのは<strong>AWS Budgets</strong>。可視化・分析はCost Explorer。",
      },
      {
        q: "過去数か月のAWSのコストの推移をグラフで可視化し、どのサービスに費用がかかっているかを分析したい。適したツールはどれか。",
        choices: ["AWS Budgets", "AWS Cost Explorer", "AWS Config", "Amazon CloudWatch"],
        answer: 1,
        explain: "コストを可視化・分析するのは<strong>AWS Cost Explorer</strong>。",
      },
    ],
  }
);
