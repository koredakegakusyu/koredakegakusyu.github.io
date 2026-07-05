/* =============================================================
   SAA Forge カリキュラム — 08 アプリ統合
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "sqs-sns", domain: "アプリ統合", icon: "🔗", title: "SQS・SNS — 疎結合",
    intro: "サービス間にクッションを挟む疎結合。スパイクや部分障害に強い設計の核。SQS/SNSの役割を区別。",
    understand: [
      {
        h: "なぜ『疎結合』が必要か——直接呼び出しの危うさ",
        body: "<p>サービスAがサービスB(ワーカー)を<strong>直接呼ぶ</strong>構成(密結合)には弱点がある。Bが処理に詰まったり落ちたりすると、Aもそれを待って止まり、<strong>障害が連鎖</strong>する。アクセスが急増(スパイク)すれば、Bが捌ききれず<strong>リクエストを取りこぼす</strong>。</p><p>そこで、AとBの間に<strong>『クッション』を挟む</strong>のが<strong>疎結合(loose coupling)</strong>だ。具体的には<strong>SQS(メッセージキュー)</strong>を間に置く。Aは依頼をキューに<strong>入れるだけ</strong>で完了し、Bはキューから<strong>自分のペースで取り出して</strong>処理する。これにより、①Bが詰まってもAは影響を受けず②スパイクはキューが吸収し③Bが落ちてもメッセージはキューに残るので<strong>取りこぼさない</strong>。さらにキューの溜まり具合(メッセージ数)に応じてBをAuto Scalingすれば、急増に自動対応できる。これがSAAの設計思想の核心だ。</p>",
        diagram:
          '<svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="30" y="55" width="110" height="46" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="85" y="83" fill="#4dabf7" font-size="12" text-anchor="middle">送信側</text>\
<rect x="230" y="50" width="180" height="56" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="74" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">SQS キュー</text><text x="320" y="92" fill="#9aa6bd" font-size="10" text-anchor="middle">依頼を一時的に貯める</text>\
<rect x="500" y="32" width="110" height="38" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="555" y="55" fill="#51cf9b" font-size="11" text-anchor="middle">ワーカー</text>\
<rect x="500" y="86" width="110" height="38" rx="8" fill="#0c1220" stroke="#51cf9b" stroke-dasharray="3 3"/><text x="555" y="109" fill="#9aa6bd" font-size="11" text-anchor="middle">+自動増加</text>\
<line x1="140" y1="78" x2="228" y2="78" stroke="#9aa6bd" stroke-width="2"/><line x1="412" y1="74" x2="498" y2="54" stroke="#9aa6bd" stroke-width="2"/><line x1="412" y1="86" x2="498" y2="104" stroke="#9aa6bd" stroke-width="2"/>\
<text x="320" y="145" fill="#9aa6bd" font-size="10" text-anchor="middle">スパイク吸収・障害でも消えない・キュー長でAuto Scaling</text>\
</svg>',
        cap: "送信側とワーカーをSQSで分離。負荷を吸収し、障害でもメッセージは保持される。",
      },
      {
        h: "SQS(1対1のキュー) と SNS(1対多の通知)",
        body: "<p>メッセージング系の2大サービスを役割で区別する。</p><ul><li><strong>SQS</strong>＝<strong>1対1のキュー</strong>。メッセージを貯めて、1つのワーカー群が取り出して処理する。負荷平準化・取りこぼし防止が目的。</li><li><strong>SNS</strong>＝<strong>1対多の通知(Pub/Sub)</strong>。1つのメッセージを<strong>複数の宛先(メール・Lambda・SQS・HTTP等)へ同時配信(ファンアウト)</strong>する。</li></ul><p>判断:『処理を貯めて順に捌く』→SQS、『1つのイベントを複数システムに知らせる』→SNS。両者を組み合わせる<strong>SNS+SQSのファンアウト</strong>(SNSが複数のSQSキューへ配り、各処理が独立に進む)も頻出の重要パターンだ。</p>",
      },
      {
        h: "標準/FIFO・可視性タイムアウト・DLQ",
        body: "<p>SQSの細部も問われる。<strong>標準キュー</strong>は高スループットだが<strong>順序は保証されず、最低1回配信(まれに重複)</strong>。<strong>FIFOキュー</strong>は<strong>順序保証＋重複排除</strong>(決済など順序・重複が致命的な処理に)。<strong>可視性タイムアウト</strong>は、あるワーカーが取り出したメッセージを一定時間<strong>他から見えなくする</strong>仕組みで、<strong>処理時間より長く設定</strong>しないと二重処理が起きる。処理に繰り返し失敗するメッセージは<strong>DLQ(デッドレターキュー)</strong>へ退避させ、本流を詰まらせず原因調査・再処理する。空の受信を減らしてコストを下げる<strong>ロングポーリング</strong>も覚えておく。</p>",
      },
    ],
    memorize: [
      { k: "疎結合の効果", v: "スパイク吸収・障害の波及防止・<strong>取りこぼし防止</strong>。可用性とスケーラビリティ向上。" },
      { k: "SQS", v: "<strong>1対1のキュー</strong>。貯めて非同期処理。障害でも消えない。" },
      { k: "SNS", v: "<strong>1対多のPub/Sub</strong>。複数宛先へ<strong>ファンアウト</strong>。" },
      { k: "SNS+SQSファンアウト", v: "1イベントを複数キューへ配り、各処理を独立に。" },
      { k: "標準 vs FIFO", v: "標準=高スループット・順不同・最低1回 / <strong>FIFO=順序保証＋重複排除</strong>。" },
      { k: "可視性タイムアウト", v: "処理中を一時的に隠す。<strong>処理時間より長く</strong>設定して二重処理を防ぐ。" },
      { k: "DLQ", v: "<strong>処理失敗メッセージの退避先</strong>。本流を詰まらせず調査・再処理。" },
      { k: "キュー連動スケール", v: "キューの<strong>メッセージ数</strong>でワーカーをAuto Scaling。" },
    ],
    flashcards: [
      { q: "1つの注文イベントを在庫・通知・分析へ同時に。使うのは？", a: "SNS(1対多ファンアウト)" },
      { q: "重い処理を貯めてワーカーが順に捌く。使うのは？", a: "SQS" },
      { q: "順序を守り重複を避けたい。SQSの種類は？", a: "FIFOキュー" },
      { q: "処理に繰り返し失敗するメッセージの退避先は？", a: "DLQ(デッドレターキュー)" },
      { q: "SQSで二重処理を防ぐ設定の勘所は？", a: "可視性タイムアウトを処理時間より長く" },
    ],
    quiz: [
      {
        q: "ECサイトでセール時に注文が殺到し、決済処理が詰まって注文が失われる。可用性と取りこぼし防止を両立する設計は？",
        choices: ["決済サーバーを最大スペック化", "注文をSQSに入れワーカーが処理しキュー長でAuto Scaling", "RDSをMulti-AZ化", "CloudFront導入"],
        answer: 1,
        explain: "<strong>SQSで疎結合</strong>しスパイク吸収・取りこぼし防止。キュー長連動のAuto Scalingで急増に自動対応。",
      },
      {
        q: "1件のアップロード完了を、サムネ生成・通知・監査ログの独立した3処理へ同時に届けたい。最適な構成は？",
        choices: ["SQS1本", "SNSトピックへ発行し複数サブスクライバーへファンアウト", "Route 53", "EFS共有"],
        answer: 1,
        explain: "1対多の同時配信＝<strong>SNSのファンアウト</strong>。各サブスクライバーが独立に受信。",
      },
      {
        q: "決済イベントは重複処理が許されず、発生順に処理する必要がある。SQSの適切な選択は？",
        choices: ["標準キュー", "FIFOキュー", "SNS標準", "キュー不使用"],
        answer: 1,
        explain: "<strong>順序保証＋重複排除＝FIFOキュー</strong>。標準は順不同・最低1回(重複あり)。",
      },
    ],
  },
  {
    id: "eventbridge", domain: "アプリ統合", icon: "📨", title: "EventBridge・Step Functions",
    intro: "イベント駆動の連携(EventBridge)とワークフロー制御(Step Functions)。SNSとの違いも整理。",
    understand: [
      {
        h: "EventBridge——イベントを賢く振り分けるバス",
        body: "<p><strong>EventBridge</strong>は、AWSの各サービス・SaaS・自作アプリから発生する<strong>イベント</strong>を受け取り、<strong>ルールに基づいて適切な宛先へ振り分ける</strong>イベントバスだ。例えば『EC2が停止したら通知』『S3に特定種類のファイルが来たら処理を起動』『毎日朝9時にバッチを実行(<strong>cronスケジュール</strong>)』といった連携を、コードを書かずに構成できる。</p><p>SNSと似ているが、EventBridgeは<strong>イベントの中身に応じた高度なフィルタリング</strong>・多数のAWS/SaaSとの連携・スキーマ管理に優れ、<strong>『イベント駆動アーキテクチャ』の中核</strong>になる。単純で超高スループットなPub/SubはSNS、賢い振り分け・SaaS連携・定時実行ならEventBridge、と使い分ける。</p>",
        diagram:
          '<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="40" width="120" height="34" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="80" y="62" fill="#e9edf5" font-size="10" text-anchor="middle">AWS/SaaS/アプリ</text>\
<rect x="20" y="100" width="120" height="34" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="80" y="122" fill="#e9edf5" font-size="10" text-anchor="middle">スケジュール(cron)</text>\
<rect x="230" y="65" width="170" height="50" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="315" y="86" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">EventBridge</text><text x="315" y="103" fill="#9aa6bd" font-size="9" text-anchor="middle">ルールで振り分け</text>\
<rect x="470" y="35" width="150" height="30" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="545" y="55" fill="#51cf9b" font-size="10" text-anchor="middle">Lambda</text>\
<rect x="470" y="75" width="150" height="30" rx="6" fill="#0c1220" stroke="#4dabf7"/><text x="545" y="95" fill="#4dabf7" font-size="10" text-anchor="middle">SQS / SNS</text>\
<rect x="470" y="115" width="150" height="30" rx="6" fill="#0c1220" stroke="#b08adf"/><text x="545" y="135" fill="#b08adf" font-size="10" text-anchor="middle">Step Functions 等</text>\
<line x1="140" y1="57" x2="228" y2="80" stroke="#9aa6bd" stroke-width="1.5"/><line x1="140" y1="117" x2="228" y2="100" stroke="#9aa6bd" stroke-width="1.5"/>\
<line x1="400" y1="85" x2="468" y2="50" stroke="#9aa6bd" stroke-width="1.2"/><line x1="400" y1="90" x2="468" y2="90" stroke="#9aa6bd" stroke-width="1.2"/><line x1="400" y1="95" x2="468" y2="130" stroke="#9aa6bd" stroke-width="1.2"/>\
</svg>',
        cap: "様々なイベントをEventBridgeが受け、ルールに応じて多様な宛先へ振り分ける。",
      },
      {
        h: "Step Functions——複数処理を『ワークフロー』として制御",
        body: "<p>複数のLambdaや処理を、決まった順序・条件・リトライで確実に実行したいとき、各Lambdaから次を直接呼ぶと、エラー処理や状態管理が複雑になり可視性も失われる。<strong>Step Functions</strong>は、これらを<strong>ワークフロー(状態機械)</strong>として定義し、<strong>順序・分岐・並列・リトライ・待機・タイムアウト</strong>を宣言的に制御する。処理の流れが図で可視化され、どこで失敗したかも分かりやすい。</p><p>例:『在庫確認→(在庫あり)決済→出荷指示／(在庫なし)入荷待ち』のような<strong>長時間・複雑なビジネスフロー</strong>に最適。注文処理、データパイプライン、承認フローなどで使う。</p>",
      },
    ],
    memorize: [
      { k: "EventBridge", v: "<strong>イベントバス</strong>。AWS/SaaS/独自イベントをルールで振り分け＋<strong>cronスケジュール</strong>。" },
      { k: "EventBridge vs SNS", v: "高度なフィルタ/多彩な連携/スキーマ/定時実行→EventBridge。単純・高スループットPub/Sub→SNS。" },
      { k: "Step Functions", v: "<strong>ワークフロー(状態機械)</strong>。順序/分岐/並列/リトライ/待機を可視化。" },
      { k: "Step Functionsの用途", v: "長時間・複雑なビジネスフロー(注文処理/データパイプライン/承認)。" },
      { k: "用途整理", v: "イベント連携・定時→EventBridge / 複雑な処理フロー→Step Functions。" },
    ],
    flashcards: [
      { q: "多様なAWSイベントを条件で振り分け、定時実行もしたい。", a: "Amazon EventBridge" },
      { q: "複数Lambdaを順序・分岐・リトライ制御する。", a: "AWS Step Functions" },
      { q: "高度なイベントフィルタやSaaS連携が要る。SNS?EventBridge?", a: "EventBridge" },
      { q: "毎日定時にサーバーレスで処理を起動するには？", a: "EventBridge(スケジュールルール)" },
    ],
    quiz: [
      {
        q: "SaaSや複数AWSサービスからの多様なイベントを、内容に応じて異なる処理へルーティングし、一部は毎日定時にも起動したい。最適なサービスは？",
        choices: ["SNS", "Amazon EventBridge", "SQS", "Kinesis"],
        answer: 1,
        explain: "高度なフィルタ・多彩な連携・スケジュールを備えるイベントバスは<strong>EventBridge</strong>。SNSは単純なPub/Sub向き。",
      },
      {
        q: "受注処理を「在庫確認→決済→出荷」の順に、分岐とリトライを伴って確実に実行し、流れを可視化したい。最適なのは？",
        choices: ["各Lambdaから次を直接呼ぶ", "Step Functions", "SQSのみ", "CloudWatch Events単体"],
        answer: 1,
        explain: "順序・分岐・リトライ・可視化は<strong>Step Functions</strong>。直接連鎖は状態管理とエラー処理が破綻しやすい。",
      },
    ],
  },
  {
    id: "kinesis-mq", domain: "アプリ統合", icon: "🌊", title: "Kinesis・Amazon MQ",
    intro: "リアルタイムストリーミング(Kinesis)と、既存メッセージング資産の移行(MQ)。SQSとの違いも。",
    understand: [
      {
        h: "Kinesis——大量データを『流れ』として扱う",
        body: "<p>センサー・クリックログ・アプリのイベントなど、<strong>絶え間なく大量に発生し続けるデータ(ストリーム)</strong>をリアルタイムに取り込み・処理するのが<strong>Kinesis</strong>だ。SQSが『1つずつ処理して消す箱』なのに対し、Kinesisは『<strong>流れ続けるデータを複数の処理系が同時に読め、後から再生(再処理)もできる</strong>』のが特徴。順序も保持される。</p><ul><li><strong>Kinesis Data Streams</strong>：リアルタイムにデータを取り込む本体。複数のコンシューマが同じデータを読める。</li><li><strong>Kinesis Data Firehose</strong>：ストリームをバッファしながら<strong>S3/Redshift/OpenSearch等へ自動配送</strong>(管理不要・ニアリアルタイム)。</li><li><strong>Managed Service for Apache Flink</strong>：ストリームをリアルタイムに分析。</li></ul>",
        diagram:
          '<svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="58" width="120" height="44" rx="8" fill="#0c1220" stroke="#9aa6bd"/><text x="80" y="80" fill="#e9edf5" font-size="10" text-anchor="middle">IoT/ログ</text><text x="80" y="94" fill="#6b7691" font-size="9" text-anchor="middle">大量・連続</text>\
<rect x="180" y="50" width="170" height="60" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="265" y="74" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">Kinesis</text><text x="265" y="92" fill="#9aa6bd" font-size="9" text-anchor="middle">リアルタイム取り込み</text>\
<rect x="400" y="35" width="220" height="32" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="510" y="56" fill="#51cf9b" font-size="10" text-anchor="middle">Firehose→S3/Redshift</text>\
<rect x="400" y="75" width="220" height="32" rx="6" fill="#0c1220" stroke="#4dabf7"/><text x="510" y="96" fill="#4dabf7" font-size="10" text-anchor="middle">Flink→リアルタイム分析</text>\
<line x1="140" y1="80" x2="178" y2="80" stroke="#9aa6bd" stroke-width="2"/><line x1="350" y1="75" x2="398" y2="55" stroke="#9aa6bd" stroke-width="1.5"/><line x1="350" y1="85" x2="398" y2="90" stroke="#9aa6bd" stroke-width="1.5"/>\
</svg>',
        cap: "連続する大量データをKinesisで取り込み、Firehoseで蓄積・Flinkで分析。",
      },
      {
        h: "Amazon MQ と、SQS/Kinesisの使い分け",
        body: "<p><strong>Amazon MQ</strong>は<strong>ActiveMQ/RabbitMQ互換</strong>のマネージドメッセージブローカーだ。新規にAWSで作るなら通常はSQS/SNSが推奨だが、<strong>オンプレで既にJMS/AMQP等の標準プロトコルを使う既存アプリを、コードをほぼ変えずにAWSへ移行したい</strong>ときにMQを選ぶ(互換性が目的)。</p><p>3つの使い分けを整理:<strong>SQS</strong>＝AWSネイティブな1対1キュー(貯めて1回処理)。<strong>Kinesis</strong>＝リアルタイムストリーミング(順序・複数読み手・再処理・分析)。<strong>Amazon MQ</strong>＝既存メッセージング資産の移行(標準プロトコル互換)。『リアルタイム/複数処理系/再生』ならKinesis、『既存のActiveMQ/RabbitMQ移行』ならMQ、と即答する。</p>",
      },
    ],
    memorize: [
      { k: "Kinesis Data Streams", v: "<strong>リアルタイムストリーミング</strong>取り込み。順序保持・複数読み手・再処理可。" },
      { k: "Data Firehose", v: "ストリームを<strong>S3/Redshift/OpenSearchへ自動配送</strong>(管理不要・ニアリアルタイム)。" },
      { k: "Kinesis vs SQS", v: "順序/複数コンシューマ/再生/分析→Kinesis。単純な1回処理キュー→SQS。" },
      { k: "Amazon MQ", v: "<strong>ActiveMQ/RabbitMQ互換</strong>。既存メッセージング資産の移行用(標準プロトコル)。" },
      { k: "新規なら", v: "AWSネイティブの<strong>SQS/SNS</strong>を優先(MQは移行・互換目的)。" },
    ],
    flashcards: [
      { q: "IoTの大量データをリアルタイムに取り込み、S3へ自動配送したい。", a: "Kinesis Data Streams + Data Firehose" },
      { q: "複数の処理系が同じストリームを読み、再処理もしたい。SQS?Kinesis?", a: "Kinesis(順序・複数読み手・再生)" },
      { q: "既存のRabbitMQアプリをプロトコルそのままで移行したい。", a: "Amazon MQ" },
      { q: "ストリームをS3へ手間なく蓄積するKinesisのサービスは？", a: "Kinesis Data Firehose" },
    ],
    quiz: [
      {
        q: "工場の多数センサーから毎秒大量に届くデータを、リアルタイムに取り込みつつ、ほぼそのままS3へ蓄積したい。運用負荷は最小にしたい。最適な組み合わせは？",
        choices: [
          "SQSに入れてEC2で処理",
          "Kinesis Data StreamsとData Firehoseで取り込み・S3配送",
          "RDSに直接書き込む",
          "SNSで各センサーから通知",
        ],
        answer: 1,
        explain: "<strong>リアルタイムストリーミング＝Kinesis</strong>。Firehoseがバッファしつつ<strong>S3へ自動配送</strong>し運用最小。",
      },
      {
        q: "オンプレのアプリがJMS(標準プロトコル)でメッセージングしている。コードを大きく変えずにAWSへ移行したい。最適なサービスは？",
        choices: ["SQS", "Amazon MQ", "Kinesis", "EventBridge"],
        answer: 1,
        explain: "標準プロトコル互換で既存資産を移行＝<strong>Amazon MQ</strong>。SQS/SNSはAWS独自APIで移行にコード改修が必要。",
      },
    ],
  }
);
