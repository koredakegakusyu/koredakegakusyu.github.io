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
        h: "分析・データ統合の補強——Kinesis Data Firehose・EMR・Glue・Data Exchange",
        body: "<ul><li><strong>Kinesis Data Firehose</strong>：リアルタイムに流れ込むストリーミングデータを、<strong>S3やRedshift等へそのまま配送（ロード）</strong>。『ストリーミングの転送・ロード』はFirehose。収集はKinesis Data Streams。</li><li><strong>Amazon EMR</strong>：<strong>Hadoop / Apache Spark</strong> などのビッグデータ処理基盤をマネージドで提供。大規模データの分散処理・分析。</li><li><strong>AWS Glue</strong>：サーバーレスの<strong>ETL（抽出・変換・ロード）</strong>。バラバラな形式のデータを整え統合・変換する。</li><li><strong>AWS Data Exchange</strong>：<strong>サードパーティ（第三者）が提供するデータセット</strong>を見つけて購読・利用できるマーケット。</li></ul>",
        cap: "ストリーミング配送＝Firehose、Spark等のビッグデータ基盤＝EMR、ETL＝Glue、外部データ購入＝Data Exchange。",
      },

      {
        h: "システムを『疎結合』にする——SQSとSNS",
        body:
          "<p>アプリ同士を直接つなぐと、片方が忙しかったり落ちたりすると、もう片方も巻き込まれて止まります。間に<strong>クッション</strong>を挟んで<strong>互いの依存を弱める（疎結合にする）</strong>のが、次の2つです。</p>" +
          "<ul>" +
          "<li><strong>Amazon SQS（Simple Queue Service）</strong>：<strong>メッセージを一時的にためておく“待ち行列（キュー）”</strong>です。送る側はキューに入れたら仕事は終わり、受ける側は<strong>自分の処理できるペースで1件ずつ取り出します</strong>。注文が殺到しても、いったんキューにたまるだけなので<strong>取りこぼしが起きず</strong>、受け側のサーバーが一時的に落ちてもメッセージは消えません。<br><strong>試験のキーワード：</strong>「<strong>キュー／待ち行列</strong>」「アクセス急増でも取りこぼさない」「処理を後回しにして順番にさばく」「送る側と受ける側を切り離す」→ SQS。</li>" +
          "<li><strong>Amazon SNS（Simple Notification Service）</strong>：<strong>1つのメッセージを、登録済みの複数の宛先へ一斉に配る通知サービス</strong>です（発行／購読＝Pub/Sub）。「システムに異常が出たら、担当者へメール＋別システムへも同時に連絡」といった<strong>1対多の同報</strong>が得意です。<br><strong>試験のキーワード：</strong>「<strong>通知</strong>」「複数の宛先へ一斉に」「アラートをメールで送る」「Pub/Sub」→ SNS。</li>" +
          "</ul>" +
          "<p><strong>取り違え注意（頻出）</strong>：<strong>『ためて、1件ずつ処理させる＝SQS』／『一斉に配って知らせる＝SNS』</strong>。“順番に処理”“取りこぼさない”と来たら SQS、“通知”“複数へ同時に”と来たら SNS、と反射で選べるようにします。なお <strong>CloudWatch のアラームが SNS 経由で通知を送る</strong>、という組み合わせも定番です。</p>",
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
          "<p>分析系は『データが<strong>どの段階</strong>にあるか』で使うサービスが変わります。<strong>集める→整える→ためる→調べる→見せる</strong>という流れで捉えると、問題文のどのキーワードがどのサービスを指すのかが一本につながります。</p>" +
          "<ul>" +
          "<li><strong>Amazon Kinesis</strong>：<strong>次々と絶え間なく流れ込んでくるデータ（ストリーミングデータ）を、発生したそばからリアルタイムに収集・処理</strong>します。IoTセンサーの計測値、Webサイトのクリックログ、アプリの動作ログなどが対象です。<br><strong>試験のキーワード：</strong>「<strong>リアルタイム</strong>」「ストリーミングデータ」「センサーから絶え間なく送られてくる」→ Kinesis。</li>" +
          "<li><strong>AWS Glue</strong>：バラバラな形式のデータを<strong>抽出し、使える形に変換・整形して、保存先へ流し込む（ETL）</strong>サーバーレスのサービスです。「日付の書式がファイルごとに違う」「列名が揃っていない」といったデータを分析できる形に揃えます。<br><strong>試験のキーワード：</strong>「<strong>ETL</strong>」「データの変換・整形」「形式の異なるデータを統合したい」→ Glue。</li>" +
          "<li><strong>Amazon Athena</strong>：<strong>S3 に置いてあるファイルに対して、そのまま SQL で問い合わせできる</strong>サービス。データベースにデータを移したり、サーバーを立てたりする必要が<strong>一切ありません</strong>（サーバーレス）。実行したクエリの量だけ課金されます。<br><strong>試験のキーワード：</strong>「<strong>S3 のデータに直接 SQL</strong>」「サーバーを用意せずに分析」「データを移さずそのまま問い合わせ」→ Athena。</li>" +
          "<li><strong>Amazon Redshift</strong>：<strong>大量のデータをためて、集計・分析することに特化したデータベース（データウェアハウス／DWH）</strong>です。複数のシステムから集めた何年分ものデータを、まとめて高速に集計するのに向きます。<br><strong>試験のキーワード：</strong>「<strong>データウェアハウス</strong>」「大量データの集計・分析基盤」「BIのためにデータを集約」→ Redshift。※<strong>Athenaは“S3にそのまま問い合わせ”、Redshiftは“DWHにためてから分析”</strong>という違いが問われます。</li>" +
          "<li><strong>Amazon QuickSight</strong>：分析した結果を<strong>グラフやダッシュボードにして「見える化」する BI ツール</strong>です。経営層や現場が数字を一目で把握できる画面を作れます。<br><strong>試験のキーワード：</strong>「<strong>可視化</strong>」「ダッシュボード」「グラフで見せたい」「BI」→ QuickSight。</li>" +
          "</ul>" +
          "<p>用途で結びつけて覚えます：『<strong>S3 のファイルにそのまま SQL＝Athena</strong>』『<strong>リアルタイムに流れ込むデータ＝Kinesis</strong>』『<strong>データの変換・整形(ETL)＝Glue</strong>』『<strong>グラフで見える化(BI)＝QuickSight</strong>』『<strong>大量データをまとめて集計・分析(DWH)＝Redshift</strong>』。CCP では作り込みの詳細より『どのサービスが何をするか』の対応が問われます。</p>",
      },
    ],
    memorize: [
      { k: "Kinesis Data Firehose", v: "ストリーミングを<strong>S3/Redshift等へそのまま配送</strong>。収集はData Streams。" },
      { k: "Amazon EMR", v: "<strong>Hadoop/Apache Spark</strong> のビッグデータ処理基盤（マネージド）。" },
      { k: "AWS Glue", v: "サーバーレスの<strong>ETL（抽出・変換・ロード）</strong>。" },
      { k: "AWS Data Exchange", v: "<strong>第三者のデータセット</strong>を購読・利用するマーケット。" },

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
        q: "リアルタイムに流れ込むストリーミングデータを、変換せずそのままAmazon S3へ継続的にロード（配送）したい。最も適したサービスはどれか。",
        choices: ["Amazon Athena", "Amazon Kinesis Data Firehose", "AWS Glue", "Amazon QuickSight"],
        answer: 1,
        explain: "ストリーミングをS3/Redshift等へ<strong>そのまま配送・ロード</strong>するのは<strong>Kinesis Data Firehose</strong>。AthenaはSQLクエリ、GlueはETL、QuickSightは可視化。",
      },
      {
        q: "Apache Spark や Hadoop を用いて大規模データの分散処理・分析を行う基盤をマネージドで利用したい。適したサービスはどれか。",
        choices: ["Amazon EMR", "Amazon Redshift", "AWS Glue", "Amazon Kinesis"],
        answer: 0,
        explain: "<strong>Hadoop/Apache Spark</strong> のビッグデータ処理基盤は<strong>Amazon EMR</strong>。Redshiftは分析用DWH、GlueはETL、Kinesisはストリーミング。",
      },

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
