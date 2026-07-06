/* =============================================================
   コレダケAWS CCP カリキュラム — 13 アプリ統合・分析
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-integration", domain: "技術とサービス", icon: "🔗", title: "アプリ統合・分析",
    intro: "システムを疎結合にするSQS/SNS、代表的な分析サービス（Athena/Kinesis/QuickSight等）。",
    understand: [
      {
        h: "システムを『疎結合』にする——SQSとSNS",
        body:
          "<p>アプリ同士を直接つなぐと、片方が忙しかったり落ちたりすると、もう片方も巻き込まれて止まります。間に<strong>クッション</strong>を挟んで<strong>互いの依存を弱める（疎結合にする）</strong>のが、次の2つです。</p>" +
          "<ul>" +
          "<li><strong>SQS（Simple Queue Service）</strong>：<strong>メッセージを一時的にためる待ち行列（キュー）</strong>。送る側はキューに入れるだけ、受ける側は自分のペースで取り出す。受ける側が混んでいてもメッセージは失われず、順に処理できる。</li>" +
          "<li><strong>SNS（Simple Notification Service）</strong>：<strong>1つのメッセージを、登録した複数の宛先へ一斉に通知（発行/購読）</strong>する。メール送信やシステム間の通知に使う。</li>" +
          "</ul>" +
          "<p>ざっくり<strong>『ためて1対1で処理＝SQS』『一斉に配る1対多＝SNS』</strong>と対応づけます。</p>",
        diagram:
          '<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">SQS（キューでためる）で疎結合にする</text>' +
          '<rect x="24" y="60" width="118" height="52" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="83" y="82" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">送る側</text><text x="83" y="99" fill="#6b6e76" font-size="9" text-anchor="middle">入れるだけ</text>' +
          '<line x1="142" y1="86" x2="182" y2="86" stroke="#8a8f98" stroke-width="2"/><polygon points="182,86 172,81 172,91" fill="#8a8f98"/>' +
          '<rect x="186" y="52" width="208" height="68" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="290" y="72" fill="#7a5e17" font-size="11.5" font-weight="800" text-anchor="middle">SQS キュー（待ち行列）</text>' +
          (function () { var s = ""; for (var i = 0; i < 4; i++) { var x = 210 + i * 44; s += '<rect x="' + x + '" y="86" width="34" height="22" rx="3" fill="#fbf3e0" stroke="#b28a2e"/><text x="' + (x + 17) + '" y="101" fill="#8a6a1e" font-size="9" text-anchor="middle">msg</text>'; } return s; })() +
          '<line x1="394" y1="86" x2="434" y2="86" stroke="#8a8f98" stroke-width="2"/><polygon points="434,86 424,81 424,91" fill="#8a8f98"/>' +
          '<rect x="438" y="60" width="118" height="52" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="497" y="82" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">受ける側</text><text x="497" y="99" fill="#6b6e76" font-size="9" text-anchor="middle">自分のペースで</text>' +
          '<text x="290" y="140" fill="#6b6e76" font-size="10.5" text-anchor="middle">受ける側が混んでいてもキューにたまるだけ。落ちても巻き込まれない＝疎結合。</text>' +
          "</svg>",
        cap: "SQSはメッセージをためる待ち行列。送る側と受ける側の依存を弱め、片方の障害の影響を減らす。",
      },
      {
        h: "データを分析する代表サービス（広く浅く）",
        body:
          "<p>CCPでは分析系サービスも『名前と用途』レベルで問われます。代表を押さえます。</p>" +
          "<ul>" +
          "<li><strong>Athena</strong>：<strong>S3のデータにSQLで直接クエリ</strong>できる（サーバー不要）。</li>" +
          "<li><strong>Kinesis</strong>：<strong>リアルタイムに流れ込むデータ（ストリーミング）</strong>を収集・処理。</li>" +
          "<li><strong>Glue</strong>：データの抽出・変換（ETL）を行うマネージドサービス。</li>" +
          "<li><strong>QuickSight</strong>：データを<strong>グラフやダッシュボードで可視化</strong>するBIツール。</li>" +
          "<li><strong>Redshift</strong>：大量データを集計・分析するデータウェアハウス（再掲）。</li>" +
          "</ul>",
      },
    ],
    memorize: [
      { k: "SQS", v: "メッセージをためる待ち行列(キュー)。送受信を疎結合にし障害の波及を防ぐ。1対1。" },
      { k: "SNS", v: "1つのメッセージを複数の宛先へ一斉通知(発行/購読)。1対多。メール通知等。" },
      { k: "疎結合", v: "システム間の依存を弱める設計。片方が落ちても全体が止まりにくい。" },
      { k: "Athena", v: "S3のデータにSQLで直接クエリ。サーバー不要。" },
      { k: "Kinesis", v: "リアルタイムのストリーミングデータを収集・処理。" },
      { k: "QuickSight", v: "データをグラフ・ダッシュボードで可視化するBIツール。" },
    ],
    flashcards: [
      { q: "SQSとSNSの違いは？", a: "SQSはメッセージをためる待ち行列（1対1でためて処理）、SNSは1つのメッセージを複数の宛先へ一斉通知（1対多）。" },
      { q: "システムを『疎結合』にする利点は？", a: "片方のシステムが混雑・停止しても、もう片方が巻き込まれて止まりにくくなること。" },
      { q: "S3に置いたデータに、サーバーを立てずSQLで直接問い合わせできるサービスは？", a: "Amazon Athena。" },
      { q: "リアルタイムに流れ込むストリーミングデータを収集・処理するサービスは？", a: "Amazon Kinesis。" },
    ],
    quiz: [
      {
        q: "2つのシステムの間にメッセージをためる待ち行列を置き、送信側と受信側の依存を弱めて（疎結合にして）、一方の障害の影響を減らしたい。用いるAWSサービスはどれか。",
        choices: ["Amazon SQS", "Amazon CloudFront", "AWS CloudFormation", "Amazon Athena"],
        answer: 0,
        explain: "メッセージをためて疎結合にするキューは<strong>Amazon SQS</strong>。",
      },
      {
        q: "1つのメッセージを、登録された複数のあて先（メールや別システム）へ一斉に配信（発行/購読）したい。適したサービスはどれか。",
        choices: ["Amazon SQS", "Amazon SNS", "Amazon Kinesis", "AWS Glue"],
        answer: 1,
        explain: "1対多の一斉通知（発行/購読）は<strong>Amazon SNS</strong>。1対1でためるのがSQS。",
      },
      {
        q: "Amazon S3に保存されたデータに対して、サーバーを構築せずに標準的なSQLで直接クエリを実行できるサービスはどれか。",
        choices: ["Amazon Athena", "Amazon QuickSight", "AWS Glue", "Amazon SNS"],
        answer: 0,
        explain: "S3のデータにSQLで直接クエリできるのは<strong>Amazon Athena</strong>。可視化はQuickSight。",
      },
    ],
  }
);
