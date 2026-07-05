/* =============================================================
   SAA Forge — サービス早見表データ
   COMPARE: 全サービス一覧 {n:名前, cat:カテゴリ, role:役割(一言), sig:こう来たら選ぶ, key:要点/ひっかけ}
   VERSUS : 紛らわしいペアの決め手 {q:観点, items:[{n,w}], tip:決め手}
   ============================================================= */
window.COMPARE = [
  /* 土台 */
  { n: "リージョン / AZ", cat: "土台", role: "地理拠点と独立DC", sig: "可用性・データ所在地", key: "複数AZ配置が高可用性の基本。1リージョン2+AZ" },
  { n: "Outposts", cat: "土台", role: "オンプレに置くAWS", sig: "データ所在地+低遅延のハイブリッド", key: "ラックをオンプレ設置" },
  { n: "Local Zones", cat: "土台", role: "大都市近接の拠点", sig: "超低遅延(1桁ms)が要る", key: "ゲーム/動画編集" },
  { n: "Organizations", cat: "土台", role: "複数アカウント統制", sig: "一括請求・割引共有・統制", key: "OUで階層化" },
  { n: "SCP", cat: "土台", role: "権限の上限(ガードレール)", sig: "組織全体で操作を強制禁止", key: "許可は与えず上限を絞る。IAMより強い" },
  { n: "Control Tower", cat: "土台", role: "マルチアカウント自動構築", sig: "ベストプラクティスで土台を作る", key: "ランディングゾーン" },

  /* IAM */
  { n: "IAMロール", cat: "IAM", role: "一時権限の入れ物", sig: "サービス→サービス/他アカウント", key: "アクセスキー埋め込みの代替=常に正解" },
  { n: "IAMユーザー/グループ", cat: "IAM", role: "人のID/その束", sig: "人にログイン権限", key: "権限はグループに付与" },
  { n: "STS", cat: "IAM", role: "一時認証情報を発行", sig: "AssumeRole/クロスアカウント", key: "自動失効で安全" },
  { n: "IAM Identity Center", cat: "IAM", role: "従業員SSO(旧AWS SSO)", sig: "複数アカウントへSSO", key: "Organizations連携" },
  { n: "Cognito", cat: "IAM", role: "アプリ利用者の認証", sig: "Web/アプリのエンドユーザー", key: "User Pool=認証 / Identity Pool=AWS権限" },

  /* セキュリティ */
  { n: "KMS", cat: "セキュリティ", role: "暗号鍵の一元管理", sig: "保存時暗号化・鍵を制御/監査", key: "CloudTrailで監査。エンベロープ暗号化" },
  { n: "CloudHSM", cat: "セキュリティ", role: "専有物理HSM", sig: "鍵を自社で完全管理(規制)", key: "最も厳格" },
  { n: "ACM", cat: "セキュリティ", role: "TLS証明書を無料発行/自動更新", sig: "HTTPS化", key: "ELB/CloudFront/API GW(EC2直は不可)" },
  { n: "Secrets Manager", cat: "セキュリティ", role: "機密保管+自動ローテ", sig: "DBパスワードを自動更新", key: "有料・RDS連携" },
  { n: "Parameter Store", cat: "セキュリティ", role: "設定値/秘密の保管", sig: "安価に設定値管理", key: "標準無料・ローテなし" },
  { n: "WAF", cat: "セキュリティ", role: "L7のWeb攻撃を防ぐ", sig: "SQLi/XSS/不正IP/レート制限", key: "CloudFront/ALB/API GWに付ける" },
  { n: "Shield", cat: "セキュリティ", role: "DDoS防御", sig: "DDoS攻撃対策", key: "Standard無料 / Advanced有料+補償+DRT" },
  { n: "GuardDuty", cat: "セキュリティ", role: "脅威検知", sig: "不審な通信/侵害の兆候", key: "ログ分析・エージェント不要" },
  { n: "Inspector", cat: "セキュリティ", role: "脆弱性スキャン", sig: "EC2/コンテナのCVE", key: "脆弱性" },
  { n: "Macie", cat: "セキュリティ", role: "S3の機密データ発見", sig: "S3内の個人情報(PII)", key: "発見・分類" },
  { n: "Security Hub", cat: "セキュリティ", role: "検出結果の集約/準拠評価", sig: "セキュリティ状況の一元化", key: "ダッシュボード" },

  /* コンピュート */
  { n: "EC2", cat: "コンピュート", role: "仮想サーバー", sig: "OS/スペックを自由に", key: "ファミリーで選ぶ(C/R/P等)" },
  { n: "オンデマンド", cat: "コンピュート", role: "縛りなし課金", sig: "短期・予測不能", key: "割高" },
  { n: "リザーブド/SP", cat: "コンピュート", role: "1-3年コミット割引", sig: "長期・常時稼働が確定", key: "最大72%引。SPは柔軟" },
  { n: "スポット", cat: "コンピュート", role: "余剰枠を激安", sig: "中断OKなバッチ/解析", key: "最大90%引・中断あり" },
  { n: "Auto Scaling", cat: "コンピュート", role: "台数を自動増減", sig: "負荷変動・急増", key: "+不調インスタンスを自動置換" },
  { n: "ALB", cat: "コンピュート", role: "L7ロードバランサー", sig: "HTTPのパス/ホスト名で振り分け", key: "Web標準・コンテナ・WAF連携" },
  { n: "NLB", cat: "コンピュート", role: "L4ロードバランサー", sig: "超低遅延・固定IP・TCP/UDP", key: "送信元IP保持" },
  { n: "Lambda", cat: "コンピュート", role: "サーバーレス関数", sig: "イベント駆動・運用負荷最小", key: "最大15分・メモリ比例CPU" },
  { n: "API Gateway", cat: "コンピュート", role: "マネージドAPI入口", sig: "サーバーレスAPI", key: "認証/スロットリング。+Lambda+DynamoDB" },
  { n: "Step Functions", cat: "コンピュート", role: "ワークフロー制御", sig: "複数Lambdaを順序/分岐/リトライ", key: "状態機械・可視化" },
  { n: "ECS", cat: "コンピュート", role: "コンテナ管理(AWS独自)", sig: "シンプルなコンテナ運用", key: "AWS統合が容易" },
  { n: "EKS", cat: "コンピュート", role: "マネージドKubernetes", sig: "K8s標準・移植性", key: "他環境互換" },
  { n: "Fargate", cat: "コンピュート", role: "サーバーレスでコンテナ", sig: "コンテナを運用負荷なく", key: "EC2管理不要(ECS/EKS両対応)" },
  { n: "Elastic Beanstalk", cat: "コンピュート", role: "アプリ自動デプロイ", sig: "標準Webアプリを手早く", key: "EC2/ELB/ASGを自動構成" },
  { n: "Batch", cat: "コンピュート", role: "バッチジョブ実行基盤", sig: "大量バッチをキュー実行", key: "スポット活用" },

  /* ストレージ */
  { n: "S3", cat: "ストレージ", role: "オブジェクトストレージ", sig: "ファイル/バックアップ/静的サイト", key: "イレブンナイン・最大5TB" },
  { n: "S3 Intelligent-Tiering", cat: "ストレージ", role: "自動コスト最適化クラス", sig: "アクセス頻度が読めない", key: "迷ったらこれ" },
  { n: "S3 Glacier Deep Archive", cat: "ストレージ", role: "最安アーカイブ", sig: "長期保管・取り出し遅くてOK", key: "取り出し最大~12h" },
  { n: "EBS", cat: "ストレージ", role: "EC2用の永続ディスク", sig: "1台のOS/DB", key: "原則同一AZ。gp3が標準/io2は高IOPS" },
  { n: "EFS", cat: "ストレージ", role: "共有ファイル(NFS)", sig: "複数EC2から同時アクセス", key: "Linux・自動伸縮" },
  { n: "FSx", cat: "ストレージ", role: "専用共有ファイル", sig: "Windows共有/HPC", key: "for Windows / for Lustre" },
  { n: "インスタンスストア", cat: "ストレージ", role: "揮発の高速ローカル", sig: "消えてよい一時データ", key: "停止/終了で消える" },
  { n: "Storage Gateway", cat: "ストレージ", role: "ハイブリッドストレージ", sig: "オンプレ連携/段階移行", key: "File/Volume/Tape" },
  { n: "AWS Backup", cat: "ストレージ", role: "バックアップ一元管理", sig: "複数サービスをポリシー統制", key: "クロスリージョンコピー" },

  /* DB */
  { n: "RDS", cat: "DB", role: "マネージドSQL DB", sig: "リレーショナル/結合・集計", key: "Multi-AZ(可用性)/リードレプリカ(性能)" },
  { n: "Aurora", cat: "DB", role: "高性能なRDS互換", sig: "高可用・高性能なSQL", key: "6コピー・最大15レプリカ・Global DB" },
  { n: "DynamoDB", cat: "DB", role: "サーバーレスNoSQL", sig: "超高速・大規模・キー検索", key: "1桁ms・項目400KB・結果整合性既定" },
  { n: "DAX", cat: "DB", role: "DynamoDB専用キャッシュ", sig: "DynamoDBの読取をマイクロ秒", key: "インメモリ" },
  { n: "ElastiCache", cat: "DB", role: "インメモリキャッシュ", sig: "DB読取高速化/セッション", key: "Redis(高機能)/Memcached(単純)" },
  { n: "Redshift", cat: "DB", role: "データウェアハウス", sig: "大規模集計・BI(DWH)", key: "列指向。OLTPはRDS" },
  { n: "Neptune", cat: "DB", role: "グラフDB", sig: "関係/レコメンド/不正検知", key: "つながりをたどる" },
  { n: "Timestream", cat: "DB", role: "時系列DB", sig: "IoT/メトリクス", key: "時系列特化" },
  { n: "QLDB", cat: "DB", role: "台帳DB", sig: "改ざん不能な監査証跡", key: "暗号的に検証可能" },

  /* ネットワーク */
  { n: "VPC", cat: "ネットワーク", role: "自分専用ネットワーク", sig: "ネットワーク設計", key: "公開/非公開サブネット・1サブネット=1AZ" },
  { n: "NAT Gateway", cat: "ネットワーク", role: "内→外の一方通行", sig: "プライベートの外向き通信", key: "外→内は不可・AZ毎推奨" },
  { n: "セキュリティグループ", cat: "ネットワーク", role: "インスタンスの壁", sig: "サーバー単位の許可", key: "ステートフル・許可のみ" },
  { n: "ネットワークACL", cat: "ネットワーク", role: "サブネットの壁", sig: "特定IPを拒否(ブロック)", key: "ステートレス・Deny可" },
  { n: "Gatewayエンドポイント", cat: "ネットワーク", role: "S3/DynamoDBへ私的接続", sig: "プライベートからS3へNATなし", key: "無料・S3/DynamoDB専用" },
  { n: "Interfaceエンドポイント", cat: "ネットワーク", role: "多数サービスへ私的接続", sig: "S3/DDB以外へプライベート", key: "PrivateLink・ENI・有料" },
  { n: "Transit Gateway", cat: "ネットワーク", role: "VPC/オンプレのハブ", sig: "多数VPCを一元集約", key: "大規模・推移的" },
  { n: "VPCピアリング", cat: "ネットワーク", role: "2VPCの1対1接続", sig: "少数VPCの直結", key: "推移しない" },
  { n: "Site-to-Site VPN", cat: "ネットワーク", role: "暗号化トンネル", sig: "オンプレと手早く接続", key: "即日・ベストエフォート" },
  { n: "Direct Connect", cat: "ネットワーク", role: "専用線接続", sig: "安定・低遅延・高帯域", key: "開通に数週間・最高品質" },
  { n: "Route 53", cat: "ネットワーク", role: "DNS+ルーティング戦略", sig: "ドメイン・フェイルオーバー等", key: "Aliasは頂点ドメイン可" },
  { n: "CloudFront", cat: "ネットワーク", role: "CDN(エッジキャッシュ)", sig: "静的/動的を世界へ高速配信", key: "S3はOACで非公開のまま" },
  { n: "Global Accelerator", cat: "ネットワーク", role: "経路最適化+固定IP", sig: "非HTTP/動的/固定IP", key: "キャッシュしない(CloudFrontと別)" },

  /* 統合 */
  { n: "SQS", cat: "統合", role: "メッセージキュー(1対1)", sig: "貯めて非同期処理・疎結合", key: "標準/FIFO・DLQ・可視性タイムアウト" },
  { n: "SNS", cat: "統合", role: "通知(1対多 Pub/Sub)", sig: "1イベントを複数へ同時配信", key: "ファンアウト(+SQS)" },
  { n: "EventBridge", cat: "統合", role: "イベントバス", sig: "賢い振り分け・定時(cron)", key: "SaaS連携・高度フィルタ" },
  { n: "Kinesis", cat: "統合", role: "リアルタイムストリーミング", sig: "大量データを連続取り込み", key: "順序/複数読み手/再生。Firehose→S3" },
  { n: "Amazon MQ", cat: "統合", role: "標準プロトコルのMQ", sig: "既存ActiveMQ/RabbitMQ移行", key: "互換目的(新規はSQS/SNS)" },

  /* 分析 */
  { n: "Athena", cat: "分析", role: "S3をSQLで直接分析", sig: "アドホック/ログ分析・サーバーレス", key: "スキャン量課金" },
  { n: "Glue", cat: "分析", role: "サーバーレスETL+カタログ", sig: "データ変換・スキーマ管理", key: "Athena/Redshiftが参照" },
  { n: "EMR", cat: "分析", role: "Hadoop/Spark基盤", sig: "大規模ビッグデータ処理", key: "既存Sparkジョブ" },
  { n: "OpenSearch", cat: "分析", role: "全文検索+ログ可視化", sig: "ログ集約・検索", key: "ダッシュボード" },
  { n: "QuickSight", cat: "分析", role: "BI可視化", sig: "経営/業務ダッシュボード", key: "サーバーレスBI" },

  /* 監視 */
  { n: "CloudWatch", cat: "監視", role: "性能/ログ監視+アラーム", sig: "CPU等の監視・自動対応", key: "Auto Scalingの起点。メモリはエージェント要" },
  { n: "CloudTrail", cat: "監視", role: "API操作の監査ログ", sig: "誰が・いつ・何をしたか", key: "セキュリティ調査" },
  { n: "AWS Config", cat: "監視", role: "設定の変更履歴/準拠評価", sig: "設定がポリシー準拠か", key: "違反検知・自動修復" },
  { n: "Systems Manager", cat: "監視", role: "サーバー運用の一元化", sig: "踏み台レス/一括パッチ", key: "Session Manager/Patch/Run Command" },
  { n: "Trusted Advisor", cat: "監視", role: "ベストプラクティス点検", sig: "コスト/セキュリティ/上限 等", key: "5観点" },
  { n: "Cost Explorer / Budgets", cat: "監視", role: "コスト可視化/予算アラート", sig: "費用を見る/超過通知", key: "Budgets=アラート" },
  { n: "Compute Optimizer", cat: "監視", role: "適正サイズ推奨", sig: "過剰スペックの是正", key: "rightsizing" },

  /* 移行DR */
  { n: "Snow Family", cat: "移行DR", role: "物理デバイスで大量輸送", sig: "超大量×細回線×期限", key: "ペタバイト級" },
  { n: "DataSync", cat: "移行DR", role: "大量ファイル高速同期", sig: "回線で継続的に同期", key: "オンプレ⇔AWS" },
  { n: "DMS", cat: "移行DR", role: "DB移行", sig: "稼働中DBを最小停止で移行", key: "異種エンジンはSCT併用" },
  { n: "S3 Transfer Acceleration", cat: "移行DR", role: "S3アップ高速化", sig: "遠距離からのアップロード", key: "エッジ経由" },
];

/* 各サービス名 → 解説しているカリキュラム科目ID（ハッシュ） */
window.COMPARE_LINK = {
  "リージョン / AZ": "global-infra", "Outposts": "global-infra", "Local Zones": "global-infra",
  "Organizations": "organizations", "SCP": "organizations", "Control Tower": "organizations",
  "IAMロール": "iam", "IAMユーザー/グループ": "iam", "STS": "sts-federation",
  "IAM Identity Center": "sts-federation", "Cognito": "cognito",
  "KMS": "kms", "CloudHSM": "kms", "ACM": "kms",
  "Secrets Manager": "secrets", "Parameter Store": "secrets",
  "WAF": "edge-protection", "Shield": "edge-protection",
  "GuardDuty": "threat-detection", "Inspector": "threat-detection", "Macie": "threat-detection", "Security Hub": "threat-detection",
  "EC2": "ec2", "オンデマンド": "ec2-pricing", "リザーブド/SP": "ec2-pricing", "スポット": "ec2-pricing",
  "Auto Scaling": "elb-asg", "ALB": "elb-asg", "NLB": "elb-asg",
  "Lambda": "lambda", "API Gateway": "lambda", "Step Functions": "eventbridge",
  "ECS": "containers", "EKS": "containers", "Fargate": "containers",
  "Elastic Beanstalk": "beanstalk-batch", "Batch": "beanstalk-batch",
  "S3": "s3", "S3 Intelligent-Tiering": "s3-classes", "S3 Glacier Deep Archive": "s3-classes",
  "EBS": "block-file", "EFS": "block-file", "FSx": "block-file", "インスタンスストア": "block-file",
  "Storage Gateway": "storage-gateway", "AWS Backup": "storage-gateway",
  "RDS": "rds", "Aurora": "rds", "DynamoDB": "dynamodb", "DAX": "dynamodb",
  "ElastiCache": "caching-db", "Redshift": "redshift-purpose", "Neptune": "redshift-purpose",
  "Timestream": "redshift-purpose", "QLDB": "redshift-purpose",
  "VPC": "vpc", "NAT Gateway": "vpc", "セキュリティグループ": "vpc", "ネットワークACL": "vpc",
  "Gatewayエンドポイント": "vpc-connectivity", "Interfaceエンドポイント": "vpc-connectivity",
  "Transit Gateway": "vpc-connectivity", "VPCピアリング": "vpc-connectivity",
  "Site-to-Site VPN": "vpc-connectivity", "Direct Connect": "vpc-connectivity",
  "Route 53": "route53", "CloudFront": "cloudfront", "Global Accelerator": "cloudfront",
  "SQS": "sqs-sns", "SNS": "sqs-sns", "EventBridge": "eventbridge",
  "Kinesis": "kinesis-mq", "Amazon MQ": "kinesis-mq",
  "Athena": "athena-glue", "Glue": "athena-glue",
  "EMR": "emr-os-qs", "OpenSearch": "emr-os-qs", "QuickSight": "emr-os-qs",
  "CloudWatch": "observability", "CloudTrail": "observability", "AWS Config": "observability",
  "Systems Manager": "ssm",
  "Trusted Advisor": "cost-mgmt", "Cost Explorer / Budgets": "cost-mgmt", "Compute Optimizer": "cost-mgmt",
  "Snow Family": "migration", "DataSync": "migration", "DMS": "migration", "S3 Transfer Acceleration": "migration",
};

window.VERSUS = [
  {
    q: "可用性 vs 性能（RDS） — 最頻出のひっかけ", tip: "落ちない→Multi-AZ / 読みが重い→リードレプリカ",
    items: [
      { n: "Multi-AZ", w: "可用性。同期の待機系→自動フェイルオーバー。待機系は読めない" },
      { n: "リードレプリカ", w: "性能。非同期で読み取りを肩代わり。別リージョン可" },
    ],
  },
  {
    q: "SG vs NACL", tip: "特定IPを拒否したい→NACL（SGはDeny不可）",
    items: [
      { n: "セキュリティグループ", w: "インスタンス単位・ステートフル・許可のみ" },
      { n: "ネットワークACL", w: "サブネット単位・ステートレス・拒否(Deny)も可" },
    ],
  },
  {
    q: "SQS vs SNS vs Kinesis", tip: "貯めて処理→SQS / 同時通知→SNS / 連続ストリーム→Kinesis",
    items: [
      { n: "SQS", w: "1対1キュー。貯めて1回処理・取りこぼし防止" },
      { n: "SNS", w: "1対多通知。複数宛先へ同時(ファンアウト)" },
      { n: "Kinesis", w: "リアルタイムストリーミング。順序/複数読み手/再生" },
    ],
  },
  {
    q: "ALB vs NLB", tip: "HTTPのURLで振り分け→ALB / 超低遅延・固定IP→NLB",
    items: [
      { n: "ALB (L7)", w: "パス/ホスト名ルーティング・HTTP/S・コンテナ" },
      { n: "NLB (L4)", w: "超低遅延・高スループット・固定IP・送信元IP保持" },
    ],
  },
  {
    q: "EBS vs EFS vs インスタンスストア", tip: "1台に永続→EBS / 共有→EFS / 消えてOK→インスタンスストア",
    items: [
      { n: "EBS", w: "1台のEC2の永続ディスク(原則同一AZ)" },
      { n: "EFS", w: "複数EC2から同時マウントの共有ファイル(Linux)" },
      { n: "インスタンスストア", w: "高速だが停止/終了で消える(揮発)" },
    ],
  },
  {
    q: "EC2 料金モデル", tip: "中断OK→スポット / 長期常時→リザーブド・SP / 読めない短期→オンデマンド",
    items: [
      { n: "オンデマンド", w: "縛りなし・割高・短期" },
      { n: "リザーブド/SP", w: "1-3年で最大72%引・常時稼働" },
      { n: "スポット", w: "最大90%引・中断あり・バッチ向け" },
    ],
  },
  {
    q: "CloudWatch vs CloudTrail vs Config", tip: "性能/ログ→CW / 操作の追跡→CloudTrail / 設定の準拠→Config",
    items: [
      { n: "CloudWatch", w: "メトリクス/ログ/アラーム。Auto Scalingの起点" },
      { n: "CloudTrail", w: "誰が・いつ・何のAPI操作をしたか(監査)" },
      { n: "AWS Config", w: "設定の変更履歴と準拠評価" },
    ],
  },
  {
    q: "Secrets Manager vs Parameter Store", tip: "自動ローテが要る機密→Secrets Manager / 安価な設定値→Parameter Store",
    items: [
      { n: "Secrets Manager", w: "機密+自動ローテーション(有料)" },
      { n: "Parameter Store", w: "設定値/秘密・標準無料・ローテなし" },
    ],
  },
  {
    q: "CloudFront vs Global Accelerator", tip: "静的/動的のキャッシュ配信→CloudFront / 非HTTP・固定IP・経路最適化→GA",
    items: [
      { n: "CloudFront", w: "エッジでキャッシュして配信(CDN)" },
      { n: "Global Accelerator", w: "バックボーンで経路最適化+固定IP(キャッシュしない)" },
    ],
  },
  {
    q: "VPCエンドポイント：Gateway vs Interface", tip: "S3/DynamoDB→Gateway(無料) / その他多数→Interface(PrivateLink)",
    items: [
      { n: "Gatewayエンドポイント", w: "S3/DynamoDB専用・無料・ルート追加" },
      { n: "Interfaceエンドポイント", w: "多数サービス/独自サービス・ENI・有料" },
    ],
  },
  {
    q: "VPN vs Direct Connect", tip: "すぐ繋ぐ/暗号化→VPN / 安定・低遅延・高帯域→Direct Connect",
    items: [
      { n: "Site-to-Site VPN", w: "インターネット経由・即日・ベストエフォート" },
      { n: "Direct Connect", w: "専用線・安定/低遅延/高帯域・開通数週間" },
    ],
  },
  {
    q: "移行：Snow vs DataSync vs DMS", tip: "超大量×細回線→Snow / 継続ファイル同期→DataSync / DB→DMS",
    items: [
      { n: "Snow Family", w: "ペタバイト級を物理輸送" },
      { n: "DataSync", w: "大量ファイルを回線で高速・継続同期" },
      { n: "DMS", w: "DBを最小停止で移行(+SCT)" },
    ],
  },
  {
    q: "Cognito vs IAM Identity Center", tip: "アプリ利用者→Cognito / 従業員SSO→Identity Center",
    items: [
      { n: "Cognito", w: "Web/アプリのエンドユーザー認証" },
      { n: "IAM Identity Center", w: "従業員のマルチアカウントSSO" },
    ],
  },
  {
    q: "脅威系：GuardDuty vs Inspector vs Macie", tip: "不審通信→GuardDuty / 脆弱性→Inspector / S3機密→Macie",
    items: [
      { n: "GuardDuty", w: "ログ分析による脅威検知" },
      { n: "Inspector", w: "EC2/コンテナの脆弱性(CVE)スキャン" },
      { n: "Macie", w: "S3内の個人情報(PII)発見" },
    ],
  },
  {
    q: "分析：Athena vs Redshift vs RDS", tip: "S3を即SQL→Athena / 大規模DWH→Redshift / トランザクション→RDS",
    items: [
      { n: "Athena", w: "S3を直接SQL・サーバーレス・アドホック" },
      { n: "Redshift", w: "列指向DWH・大規模集計/BI" },
      { n: "RDS/Aurora", w: "OLTP(日々の読み書き・結合)" },
    ],
  },
  {
    q: "DR戦略（コスト↔復旧速度）", tip: "RTO/RPOが厳しいほど高コスト。要件とコストで選ぶ",
    items: [
      { n: "バックアップ&リストア", w: "最安・最も遅い" },
      { n: "パイロットライト", w: "コア(DB)だけ常時稼働" },
      { n: "ウォームスタンバイ", w: "縮小版を常時稼働・速い" },
      { n: "マルチサイト", w: "常時フル稼働・RTO/RPOほぼ0・最高コスト" },
    ],
  },
];
