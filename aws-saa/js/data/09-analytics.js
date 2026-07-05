/* =============================================================
   SAA Forge カリキュラム — 09 分析
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "athena-glue", domain: "分析", icon: "🔎", title: "Athena・Glue・データレイク",
    intro: "S3を中心としたサーバーレス分析。Athenaで即クエリ、Glueで変換。役割分担が頻出。",
    understand: [
      {
        h: "データレイク——『まずS3に貯めて、後で分析』",
        body: "<p>近年の分析の基本形が<strong>データレイク</strong>だ。様々な形式のデータをとりあえず安価で無限の<strong>S3に貯めておき</strong>、必要なときに必要なツールで分析する、という考え方。事前に厳格なDB設計をしなくてよいので柔軟だ。このS3データレイクを中心に、AWSは『分析する道具』『変換する道具』を揃えている。役割を区別するのがSAAの要点になる。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="240" y="75" width="160" height="50" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="98" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">S3 データレイク</text><text x="320" y="114" fill="#9aa6bd" font-size="9" text-anchor="middle">何でも貯める</text>\
<rect x="20" y="80" width="150" height="40" rx="8" fill="#0c1220" stroke="#4dabf7"/><text x="95" y="98" fill="#4dabf7" font-size="10" text-anchor="middle">Glue(ETL/カタログ)</text><text x="95" y="112" fill="#6b7691" font-size="8" text-anchor="middle">変換・スキーマ管理</text>\
<rect x="470" y="40" width="150" height="36" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="545" y="62" fill="#51cf9b" font-size="10" text-anchor="middle">Athena(SQLで即分析)</text>\
<rect x="470" y="90" width="150" height="36" rx="8" fill="#0c1220" stroke="#ffc955"/><text x="545" y="112" fill="#ffc955" font-size="10" text-anchor="middle">QuickSight(BI可視化)</text>\
<line x1="170" y1="100" x2="238" y2="100" stroke="#9aa6bd" stroke-width="1.5" marker-end="url(#ag)"/><line x1="400" y1="92" x2="468" y2="62" stroke="#9aa6bd" stroke-width="1.5" marker-end="url(#ag)"/><line x1="400" y1="105" x2="468" y2="108" stroke="#9aa6bd" stroke-width="1.5" marker-end="url(#ag)"/>\
<defs><marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "S3データレイクを中心に、Glueで変換・カタログ化し、Athenaでクエリ、QuickSightで可視化。",
      },
      {
        h: "S3を即SQLで分析する Athena、変換する Glue",
        body: "<ul><li><strong>Athena</strong>＝<strong>S3上のデータをそのままSQLでクエリ</strong>できるサーバーレスサービス。データをDBにロードする必要がなく、サーバー管理も不要。<strong>スキャンしたデータ量に応じた課金</strong>なので、たまに行うアドホックな分析やログ調査に最適でコスト効率が高い。コストを下げるには、データを<strong>列指向(Parquet)に変換し、パーティション分割</strong>してスキャン量を減らすのがコツ。</li><li><strong>Glue</strong>＝サーバーレスの<strong>ETL(抽出・変換・ロード)</strong>サービス。データの形式変換やクレンジングを行う。加えて<strong>データカタログ</strong>(どこに何のデータがどんなスキーマであるか)を管理し、AthenaやRedshift Spectrumがこれを参照する。</li><li><strong>Lake Formation</strong>＝データレイクの<strong>構築ときめ細かなアクセス権限</strong>を一元管理する。</li></ul><p>判断:『S3を移動せずSQLで手早く』→Athena、『変換・カタログ化』→Glue。</p>",
      },
    ],
    memorize: [
      { k: "データレイク", v: "まず<strong>S3に何でも貯め</strong>、必要時に分析する柔軟な基盤。" },
      { k: "Athena", v: "<strong>S3をSQLで直接</strong>クエリ・サーバーレス・<strong>スキャン量課金</strong>。アドホック/ログ分析。" },
      { k: "Athenaのコスト削減", v: "<strong>列指向(Parquet)化＋パーティション分割</strong>でスキャン量を減らす。" },
      { k: "Glue", v: "サーバーレス<strong>ETL＋データカタログ</strong>。スキーマを各分析サービスへ提供。" },
      { k: "Lake Formation", v: "データレイクの<strong>構築＋きめ細かなアクセス制御</strong>を一元管理。" },
      { k: "対比", v: "S3即SQL→Athena / 定常大規模DWH→Redshift / 変換→Glue。" },
    ],
    flashcards: [
      { q: "S3のログをデータ移動なしでSQL分析したい。サーバーレスで。", a: "Amazon Athena" },
      { q: "サーバーレスでETLとスキーマカタログを行うのは？", a: "AWS Glue" },
      { q: "Athenaのコストを下げる工夫は？", a: "列指向(Parquet)化とパーティション分割でスキャン量削減" },
      { q: "データレイクの考え方を一言で？", a: "まずS3に貯めて、必要時に分析する" },
    ],
    quiz: [
      {
        q: "S3に蓄積したアクセスログを、必要なときだけSQLでアドホックに集計したい。インフラ管理を避け、実行クエリの分だけ課金されるのが望ましい。最適なサービスは？",
        choices: ["Redshiftを常時起動", "Amazon Athena", "EC2にHadoop構築", "RDSに取り込む"],
        answer: 1,
        explain: "<strong>S3を直接SQL・サーバーレス・スキャン量課金＝Athena</strong>。常時起動Redshiftは低頻度アドホックには割高。",
      },
      {
        q: "様々な形式で届くデータをS3に集約し、分析用に変換・スキーマ管理したい。サーバー管理は避けたい。最適なサービスは？",
        choices: ["EMRクラスタを常時起動", "AWS Glue", "RDS", "Lambda単体で全部書く"],
        answer: 1,
        explain: "サーバーレスの<strong>ETL＋データカタログ＝Glue</strong>。常時起動のEMRは運用とコストの負担が大きい。",
      },
    ],
  },
  {
    id: "emr-os-qs", domain: "分析", icon: "📊", title: "EMR・OpenSearch・QuickSight",
    intro: "ビッグデータ処理(EMR)、検索/ログ分析(OpenSearch)、BI可視化(QuickSight)。用途を一言で。",
    understand: [
      {
        h: "処理・検索・可視化を担う3サービス",
        body: "<p>データレイク周辺で、Athena/Glue以外に頻出の3つを<strong>役割</strong>で区別する。</p><ul><li><strong>EMR(Elastic MapReduce)</strong>＝<strong>Hadoop/Spark</strong>等のビッグデータフレームワークをマネージドで動かす基盤。ペタバイト級の大規模な変換・機械学習・複雑な分散処理を行う(既存のSparkジョブをAWSで動かす、など)。</li><li><strong>OpenSearch Service</strong>＝<strong>全文検索＋ログ分析・可視化</strong>。大量のログを集約し、キーワード検索やリアルタイムのダッシュボードで運用監視する(検索エンジン/ログ基盤)。</li><li><strong>QuickSight</strong>＝サーバーレスの<strong>BI(ビジネスインテリジェンス)ダッシュボード</strong>。経営/業務データをグラフで可視化し、関係者に共有する。</li></ul>",
        diagram:
          '<svg viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="50" width="190" height="70" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="115" y="80" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">EMR</text><text x="115" y="100" fill="#9aa6bd" font-size="10" text-anchor="middle">Hadoop/Spark処理</text>\
<rect x="225" y="50" width="190" height="70" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="320" y="80" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">OpenSearch</text><text x="320" y="100" fill="#9aa6bd" font-size="10" text-anchor="middle">全文検索・ログ可視化</text>\
<rect x="430" y="50" width="190" height="70" rx="10" fill="#161e30" stroke="#51cf9b"/><text x="525" y="80" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">QuickSight</text><text x="525" y="100" fill="#9aa6bd" font-size="10" text-anchor="middle">BIダッシュボード</text>\
<text x="320" y="148" fill="#9aa6bd" font-size="10" text-anchor="middle">処理→EMR / 検索・ログ→OpenSearch / 経営BI→QuickSight</text>\
</svg>',
        cap: "ビッグデータ処理=EMR、検索・ログ分析=OpenSearch、BI可視化=QuickSight。",
      },
    ],
    memorize: [
      { k: "EMR", v: "<strong>Hadoop/Spark</strong>のマネージド基盤。大規模なビッグデータ処理/変換。" },
      { k: "OpenSearch", v: "<strong>全文検索＋ログ分析・可視化</strong>。ログ集約・検索エンジン。" },
      { k: "QuickSight", v: "サーバーレス<strong>BI可視化</strong>ダッシュボード。" },
      { k: "選び分け", v: "Spark処理→EMR / 検索・ログ可視化→OpenSearch / 経営BI→QuickSight。" },
      { k: "Athenaとの関係", v: "アドホックなSQL集計はAthena、Sparkでの本格処理はEMR。" },
    ],
    flashcards: [
      { q: "Apache Sparkで大規模データ処理を行うマネージド基盤は？", a: "Amazon EMR" },
      { q: "大量ログの全文検索とダッシュボード可視化に使うのは？", a: "Amazon OpenSearch Service" },
      { q: "サーバーレスでBIダッシュボードを作るのは？", a: "Amazon QuickSight" },
    ],
    quiz: [
      {
        q: "既存のApache SparkジョブをAWSで実行し、ペタバイト級データを分散処理したい。最適なサービスは？",
        choices: ["Athena", "Amazon EMR", "QuickSight", "Glue DataBrew"],
        answer: 1,
        explain: "Hadoop/Sparkの分散処理基盤は<strong>EMR</strong>。AthenaはSQLクエリ、QuickSightは可視化。",
      },
      {
        q: "アプリの大量ログを集約し、全文検索とリアルタイムなダッシュボードで運用監視したい。最適なサービスは？",
        choices: ["Redshift", "OpenSearch Service", "Athena", "QuickSight"],
        answer: 1,
        explain: "<strong>ログの全文検索＋可視化＝OpenSearch</strong>。",
      },
    ],
  }
);
