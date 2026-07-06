/* =============================================================
   コレダケAWS CCP カリキュラム — 08 コンピューティング
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-compute", domain: "技術とサービス", icon: "🖥️", title: "コンピューティング（EC2・Lambda）",
    intro: "仮想サーバーEC2とその購入オプション、サーバーレスのLambda、コンテナ、オートスケーリング。",
    understand: [
      {
        h: "EC2——AWS上の仮想サーバー",
        body:
          "<p><strong>Amazon EC2（Elastic Compute Cloud）</strong>は、AWS上に<strong>仮想サーバーを立てて使う</strong>基本サービスです（IaaS）。数分で起動でき、CPU・メモリの大きさ（インスタンスタイプ）を用途に合わせて選べます。OS以上は利用者が管理します。</p>" +
          "<p>アクセスの急増に自動で対応する仕組みが2つ。台数を自動で増減する<strong>Auto Scaling</strong>と、アクセスを複数サーバーに振り分ける<strong>ロードバランサー（ELB）</strong>。この2つを組み合わせると『混んだら自動で増え、空いたら減る』構成になり、可用性とコスト効率が両立します。</p>",
      },
      {
        h: "EC2の購入オプション——安くする4つの選択肢",
        body:
          "<p>EC2は使い方に応じて<strong>料金プラン</strong>を選べます。CCP頻出です。</p>" +
          "<ul>" +
          "<li><strong>オンデマンド</strong>：使った分だけ支払う標準プラン。<strong>いつでも起動・停止でき縛りがない</strong>が単価は高め。短期・予測できない負荷向け。</li>" +
          "<li><strong>リザーブドインスタンス（RI）</strong>：<strong>1年or3年の利用を約束する代わりに大幅割引</strong>。長期に安定して使うサーバー向け。</li>" +
          "<li><strong>Savings Plans</strong>：一定の使用量（1年or3年）をコミットして割引。RIより柔軟。</li>" +
          "<li><strong>スポットインスタンス</strong>：AWSの<strong>余剰リソースを最大9割引</strong>で使えるが、<strong>AWS都合で中断されることがある</strong>。中断されても平気なバッチ処理向け。</li>" +
          "</ul>" +
          "<p>他に、物理サーバーを専有する<strong>Dedicated Hosts</strong>（ライセンス要件等）もあります。</p>",
        diagram:
          '<svg viewBox="0 0 580 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">EC2 購入オプションの使い分け</text>' +
          (function () {
            var head = ["プラン", "割引", "特徴／向くケース"];
            var rows = [
              ["オンデマンド", "なし", "縛りなし・いつでも起動停止。短期/変動負荷"],
              ["リザーブド(RI)", "大", "1〜3年の利用を約束。長期安定のサーバー"],
              ["Savings Plans", "大", "使用量をコミット。RIより柔軟"],
              ["スポット", "最大", "余剰を格安。中断あり。中断可なバッチ向け"],
            ];
            var w = [120, 66, 320], x0 = 32, y0 = 34, rh = 30;
            var xs = [x0]; for (var i = 0; i < w.length; i++) xs.push(xs[i] + w[i]);
            var s = "";
            head.forEach(function (h, ci) {
              s += '<rect x="' + xs[ci] + '" y="' + y0 + '" width="' + w[ci] + '" height="' + rh + '" fill="#eceff3" stroke="#c7ccd2"/><text x="' + (xs[ci] + (ci === 2 ? 10 : w[ci] / 2)) + '" y="' + (y0 + 19) + '" fill="#23252b" font-size="11" font-weight="700" text-anchor="' + (ci === 2 ? "start" : "middle") + '">' + h + "</text>";
            });
            rows.forEach(function (row, ri) {
              var y = y0 + (ri + 1) * rh;
              row.forEach(function (cell, ci) {
                var big = ci === 1 && (cell === "大" || cell === "最大");
                var fill = big ? "#dcecdd" : "#ffffff";
                s += '<rect x="' + xs[ci] + '" y="' + y + '" width="' + w[ci] + '" height="' + rh + '" fill="' + fill + '" stroke="#d8dbe0"/>';
                s += '<text x="' + (xs[ci] + (ci === 2 ? 10 : w[ci] / 2)) + '" y="' + (y + 19) + '" fill="' + (big ? "#366b3c" : "#23252b") + '" font-size="10.5" ' + (ci === 0 ? 'font-weight="700" ' : "") + 'text-anchor="' + (ci === 2 ? "start" : "middle") + '">' + cell + "</text>";
              });
            });
            return s;
          })() +
          "</svg>",
        cap: "縛りなし=オンデマンド、長期割引=RI/Savings Plans、格安だが中断あり=スポット。用途で選ぶ。",
      },
      {
        h: "サーバー管理から解放される——LambdaとFargate",
        body:
          "<p>EC2はOSの管理が必要ですが、<strong>サーバーの管理そのものをAWSに任せる</strong>のが<strong>サーバーレス</strong>という考え方です。</p>" +
          "<ul>" +
          "<li><strong>AWS Lambda</strong>：<strong>コードを書いて置くだけで、実行された分だけ課金</strong>される。サーバーの起動・管理・スケールは一切不要。イベント（ファイル到着・APIリクエスト等）に反応して動く。</li>" +
          "<li><strong>コンテナ（ECS / EKS）</strong>：アプリを箱（コンテナ）にまとめて動かす。そのコンテナを<strong>サーバー管理なしで動かす</strong>のが<strong>Fargate</strong>。</li>" +
          "</ul>" +
          "<p>『サーバーの管理をしたくない』『使った分だけ払いたい』ならLambdaやFargate、と判断します。</p>",
      },
    ],
    memorize: [
      { k: "EC2", v: "AWS上の仮想サーバー(IaaS)。インスタンスタイプでCPU/メモリを選ぶ。OS以上は利用者管理。" },
      { k: "Auto Scaling", v: "負荷に応じてEC2の台数を自動で増減。可用性とコスト効率を両立。" },
      { k: "ELB(ロードバランサー)", v: "アクセスを複数サーバーへ自動で振り分ける。" },
      { k: "オンデマンド", v: "縛りなしで使った分だけ。短期・変動負荷向け。単価は高め。" },
      { k: "リザーブド(RI)/Savings Plans", v: "1〜3年の利用をコミットして大幅割引。長期安定利用向け。" },
      { k: "スポットインスタンス", v: "余剰を最大9割引。中断ありでバッチ向け。" },
      { k: "Lambda", v: "サーバーレス。コードを置くだけ、実行した分だけ課金。管理不要。" },
      { k: "Fargate", v: "コンテナをサーバー管理なしで実行するサーバーレスなコンテナ基盤。" },
    ],
    flashcards: [
      { q: "EC2とは何か？", a: "AWS上に仮想サーバーを立てて使うサービス（IaaS）。数分で起動でき、CPU・メモリの大きさを選べる。" },
      { q: "長期間安定して使うサーバーを安くする購入オプションは？", a: "リザーブドインスタンス（RI）またはSavings Plans（1〜3年のコミットで割引）。" },
      { q: "中断されても構わないバッチ処理を最安で動かすなら？", a: "スポットインスタンス（余剰リソースを最大9割引だが中断あり）。" },
      { q: "サーバーの管理をせず、コードを実行した分だけ払いたい。使うサービスは？", a: "AWS Lambda（サーバーレス）。" },
      { q: "アクセス急増に自動で対応する2つの仕組みは？", a: "Auto Scaling（台数の自動増減）とELB（ロードバランサーによる振り分け）。" },
    ],
    quiz: [
      {
        q: "アクセスの少ない夜間に自動的にサーバー台数を減らし、混雑する日中に自動的に増やしたい。用いるべきAWSの仕組みはどれか。",
        choices: ["Auto Scaling", "リザーブドインスタンス", "AWS Artifact", "CloudTrail"],
        answer: 0,
        explain: "負荷に応じてEC2台数を自動増減するのは<strong>Auto Scaling</strong>。",
      },
      {
        q: "中断されても問題のないバッチ処理を、できるだけ低コストで実行したい。最も適したEC2の購入オプションはどれか。",
        choices: ["オンデマンドインスタンス", "リザーブドインスタンス", "スポットインスタンス", "Dedicated Hosts"],
        answer: 2,
        explain: "余剰リソースを最大9割引で使えるが中断ありの<strong>スポットインスタンス</strong>が最適。中断可なバッチ向け。",
      },
      {
        q: "サーバーのプロビジョニングや管理を一切行わず、コードを実行した時間・回数に対してのみ料金を支払うAWSサービスはどれか。",
        choices: ["Amazon EC2", "AWS Lambda", "Amazon RDS", "Amazon EBS"],
        answer: 1,
        explain: "サーバー管理不要・実行した分だけ課金のサーバーレスは<strong>AWS Lambda</strong>。",
      },
    ],
  }
);
