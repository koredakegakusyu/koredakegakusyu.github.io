/* =============================================================
   コレダケAWS CCP — サービス早見表データ
   COMPARE: 全サービス一覧 {n:名前, cat:カテゴリ, role:役割(一言), sig:こう来たら選ぶ, key:要点/ひっかけ}
   VERSUS : 紛らわしいペアの決め手 {q:観点, items:[{n,w}], tip:決め手}
   ============================================================= */
window.COMPARE = [
  /* クラウド概念 */
  { n: "リージョン / AZ", cat: "クラウド概念", role: "地域と独立データセンター", sig: "可用性・データ所在地", key: "複数AZ配置が高可用性の基本。1リージョンに2+AZ" },
  { n: "エッジロケーション", cat: "クラウド概念", role: "利用者に近い配信拠点", sig: "配信を高速化したい", key: "CloudFront/Route 53が使う。AZより数が多い" },
  { n: "Well-Architected", cat: "クラウド概念", role: "良い設計の6本柱", sig: "設計方針・ベストプラクティス", key: "運用/セキュリティ/信頼性/性能/コスト/持続可能性" },

  /* セキュリティ */
  { n: "責任共有モデル", cat: "セキュリティ", role: "AWSと利用者の責任分担", sig: "『これは誰の責任？』", key: "OF=AWS(物理/基盤)、IN=利用者(データ/設定/IAM)" },
  { n: "IAM", cat: "セキュリティ", role: "アクセス権の管理", sig: "誰が何にアクセスできるか", key: "無料・グローバル。グループに権限、サービスにはロール" },
  { n: "IAMロール", cat: "セキュリティ", role: "一時権限を貸す", sig: "EC2等サービスに権限を渡す", key: "アクセスキー埋め込みの代替。常に安全な正解" },
  { n: "MFA", cat: "セキュリティ", role: "多要素認証", sig: "ルートユーザー保護", key: "パスワード＋ワンタイムコード" },
  { n: "KMS", cat: "セキュリティ", role: "暗号鍵の管理", sig: "保存/転送データの暗号化", key: "多くのサービスと連携" },
  { n: "Secrets Manager", cat: "セキュリティ", role: "秘密情報の保管", sig: "DBパスワード/APIキー", key: "自動ローテーション対応" },
  { n: "Shield", cat: "セキュリティ", role: "DDoS防御", sig: "大量アクセス攻撃対策", key: "Standardは無料自動、Advancedは有料" },
  { n: "WAF", cat: "セキュリティ", role: "Webアプリ防御", sig: "SQLi/XSSなどWeb攻撃", key: "ルールで不正リクエストを遮断" },
  { n: "GuardDuty", cat: "セキュリティ", role: "脅威検知", sig: "不審な挙動を自動検知", key: "ログを分析する見張り役" },
  { n: "Inspector", cat: "セキュリティ", role: "脆弱性診断", sig: "EC2/コンテナの弱点を診断", key: "自動でスキャン" },
  { n: "Macie", cat: "セキュリティ", role: "機密データ発見", sig: "S3内の個人情報を検出", key: "機械学習で分類" },
  { n: "CloudTrail", cat: "セキュリティ", role: "操作の履歴", sig: "誰が何をしたか(監査)", key: "APIコールを記録" },
  { n: "Config", cat: "セキュリティ", role: "構成の監視", sig: "設定が正しい状態か", key: "変更履歴・ルール逸脱を検出" },
  { n: "Organizations", cat: "セキュリティ", role: "複数アカウント統制", sig: "一括請求・統制", key: "SCPでガードレール" },
  { n: "Artifact", cat: "セキュリティ", role: "監査資料の取得", sig: "ISO/SOCなどの報告書", key: "コンプライアンス証明に" },

  /* コンピューティング */
  { n: "EC2", cat: "コンピューティング", role: "仮想サーバー", sig: "OSごと自由に使いたい", key: "IaaS。OS以上は利用者責任" },
  { n: "Lambda", cat: "コンピューティング", role: "サーバーレス実行", sig: "サーバー管理したくない", key: "実行した分だけ課金・イベント駆動" },
  { n: "Fargate", cat: "コンピューティング", role: "サーバーレスなコンテナ", sig: "コンテナをサーバー管理なしで", key: "ECS/EKSの実行基盤" },
  { n: "Auto Scaling", cat: "コンピューティング", role: "台数の自動増減", sig: "負荷に応じて増減", key: "可用性とコスト効率を両立" },
  { n: "オンデマンド", cat: "コンピューティング", role: "縛りなし課金", sig: "短期・変動負荷", key: "単価は高め・いつでも起動停止" },
  { n: "リザーブド/Savings Plans", cat: "コンピューティング", role: "長期割引", sig: "1〜3年安定して使う", key: "コミットで大幅割引" },
  { n: "スポット", cat: "コンピューティング", role: "格安・中断あり", sig: "中断可なバッチ処理", key: "最大9割引" },

  /* ストレージ */
  { n: "S3", cat: "ストレージ", role: "オブジェクトストレージ", sig: "大量のファイルを安価に", key: "実質無制限・高耐久・静的サイト公開可" },
  { n: "EBS", cat: "ストレージ", role: "EC2のディスク", sig: "サーバーに付けるドライブ", key: "基本1台のEC2に接続(ブロック)" },
  { n: "EFS", cat: "ストレージ", role: "共有ファイル", sig: "複数EC2で同時共有", key: "共有フォルダのイメージ" },
  { n: "S3 Glacier", cat: "ストレージ", role: "アーカイブ最安", sig: "長期保管・滅多に使わない", key: "取り出しに時間がかかる" },
  { n: "Storage Gateway", cat: "ストレージ", role: "オンプレとS3を橋渡し", sig: "ハイブリッドなバックアップ", key: "既存システムからクラウドへ" },

  /* データベース */
  { n: "RDS / Aurora", cat: "データベース", role: "マネージドなRDB", sig: "表形式で厳密なDB", key: "マルチAZで可用性・リードレプリカで性能" },
  { n: "DynamoDB", cat: "データベース", role: "NoSQL", sig: "超大量を高速・自動スケール", key: "サーバーレス・キーバリュー" },
  { n: "ElastiCache", cat: "データベース", role: "キャッシュ", sig: "DB負荷軽減・高速化", key: "メモリ上(Redis/Memcached)" },
  { n: "Redshift", cat: "データベース", role: "データウェアハウス", sig: "大量データの分析・BI", key: "集計・分析向け" },

  /* ネットワーク */
  { n: "VPC", cat: "ネットワーク", role: "専用ネットワーク", sig: "AWS内に自分のNW", key: "パブリック/プライベートサブネットに分ける" },
  { n: "Route 53", cat: "ネットワーク", role: "DNS", sig: "ドメイン⇔IP変換・ドメイン取得", key: "名前解決とルーティング" },
  { n: "CloudFront", cat: "ネットワーク", role: "CDN", sig: "配信を高速化", key: "エッジにキャッシュ" },
  { n: "ELB", cat: "ネットワーク", role: "負荷分散", sig: "複数サーバーへ振り分け", key: "可用性向上" },
  { n: "Direct Connect", cat: "ネットワーク", role: "専用線接続", sig: "オンプレと高速・安定に接続", key: "VPNより高速だが高価" },

  /* 管理・監視 */
  { n: "CloudWatch", cat: "管理・監視", role: "数値の監視", sig: "CPU/アクセス数を監視・通知", key: "メトリクスとアラーム。ログ収集も" },
  { n: "CloudFormation", cat: "管理・監視", role: "インフラ自動構築", sig: "同じ環境を何度も作る", key: "テンプレート(コード)で構築" },
  { n: "Systems Manager", cat: "管理・監視", role: "運用の一括管理", sig: "多数EC2のパッチ/設定", key: "パラメータストアも" },
  { n: "Trusted Advisor", cat: "管理・監視", role: "改善の助言", sig: "コスト/セキュリティ点検", key: "5観点で自動チェック" },

  /* 統合・分析 */
  { n: "SQS", cat: "統合・分析", role: "メッセージキュー", sig: "疎結合・ためて処理", key: "1対1でためる" },
  { n: "SNS", cat: "統合・分析", role: "一斉通知", sig: "複数宛先へ配信", key: "1対多(発行/購読)" },
  { n: "Athena", cat: "統合・分析", role: "S3をSQL照会", sig: "サーバー不要で分析", key: "S3のデータに直接クエリ" },
  { n: "QuickSight", cat: "統合・分析", role: "BI可視化", sig: "グラフ/ダッシュボード", key: "データを見える化" },

  /* 請求・サポート */
  { n: "Cost Explorer", cat: "請求・サポート", role: "コスト可視化", sig: "費用の傾向を分析", key: "グラフで見える化" },
  { n: "AWS Budgets", cat: "請求・サポート", role: "予算アラート", sig: "使いすぎを通知", key: "予算超過で通知" },
  { n: "サポートプラン", cat: "請求・サポート", role: "4段階の支援", sig: "必要な支援レベル", key: "Basic/Developer/Business/Enterprise" },
  { n: "TAM", cat: "請求・サポート", role: "専任担当", sig: "Enterpriseで付く", key: "テクニカルアカウントマネージャー" },
];

window.COMPARE_LINK = {
  "リージョン / AZ": "ccp-global-infra",
  "エッジロケーション": "ccp-global-infra",
  "Well-Architected": "ccp-well-architected",
  "責任共有モデル": "ccp-shared-responsibility",
  "IAM": "ccp-iam",
  "IAMロール": "ccp-iam",
  "MFA": "ccp-iam",
  "KMS": "ccp-security-services",
  "Secrets Manager": "ccp-security-services",
  "Shield": "ccp-security-services",
  "WAF": "ccp-security-services",
  "GuardDuty": "ccp-security-services",
  "Inspector": "ccp-security-services",
  "Macie": "ccp-security-services",
  "CloudTrail": "ccp-compliance",
  "Config": "ccp-compliance",
  "Organizations": "ccp-compliance",
  "Artifact": "ccp-compliance",
  "EC2": "ccp-compute",
  "Lambda": "ccp-compute",
  "Fargate": "ccp-compute",
  "Auto Scaling": "ccp-compute",
  "オンデマンド": "ccp-compute",
  "リザーブド/Savings Plans": "ccp-compute",
  "スポット": "ccp-compute",
  "S3": "ccp-storage",
  "EBS": "ccp-storage",
  "EFS": "ccp-storage",
  "S3 Glacier": "ccp-storage",
  "RDS / Aurora": "ccp-database",
  "DynamoDB": "ccp-database",
  "ElastiCache": "ccp-database",
  "Redshift": "ccp-database",
  "VPC": "ccp-network",
  "Route 53": "ccp-network",
  "CloudFront": "ccp-network",
  "ELB": "ccp-network",
  "Direct Connect": "ccp-network",
  "CloudWatch": "ccp-management",
  "CloudFormation": "ccp-management",
  "Systems Manager": "ccp-management",
  "Trusted Advisor": "ccp-management",
  "SQS": "ccp-integration",
  "SNS": "ccp-integration",
  "Athena": "ccp-integration",
  "QuickSight": "ccp-integration",
  "Cost Explorer": "ccp-billing",
  "AWS Budgets": "ccp-billing",
  "サポートプラン": "ccp-support",
  "TAM": "ccp-support",
};

window.VERSUS = [
  {
    q: "CloudWatch / CloudTrail / Config",
    items: [
      { n: "CloudWatch", w: "数値（CPU・アクセス数）の監視とアラーム" },
      { n: "CloudTrail", w: "誰が何の操作をしたかの履歴（監査）" },
      { n: "Config", w: "設定（構成）が正しい状態かの監視" },
    ],
    tip: "数値=CloudWatch、操作=CloudTrail、設定=Config",
  },
  {
    q: "責任共有モデル：OF と IN",
    items: [
      { n: "OF the Cloud（AWS）", w: "物理施設・ハードウェア・基盤ネットワーク" },
      { n: "IN the Cloud（利用者）", w: "データ・IAM設定・OS更新・暗号化" },
    ],
    tip: "データとIAMは常に利用者の責任",
  },
  {
    q: "SQS / SNS",
    items: [
      { n: "SQS", w: "メッセージをためる待ち行列（1対1で処理）" },
      { n: "SNS", w: "複数の宛先へ一斉通知（1対多）" },
    ],
    tip: "ためて処理=SQS、一斉に配る=SNS",
  },
  {
    q: "Cost Explorer / Budgets",
    items: [
      { n: "Cost Explorer", w: "過去〜現在のコストをグラフで可視化・分析" },
      { n: "AWS Budgets", w: "予算を決め、超過しそうなときに通知" },
    ],
    tip: "分析=Cost Explorer、通知=Budgets",
  },
  {
    q: "EC2 購入オプション",
    items: [
      { n: "オンデマンド", w: "縛りなし・短期/変動負荷。単価高め" },
      { n: "リザーブド/Savings Plans", w: "1〜3年コミットで大幅割引。長期安定" },
      { n: "スポット", w: "最大9割引だが中断あり。中断可なバッチ" },
    ],
    tip: "短期=オンデマンド、長期=RI、格安中断可=スポット",
  },
  {
    q: "S3 / EBS / EFS",
    items: [
      { n: "S3", w: "大量のファイルを安価に（オブジェクト）" },
      { n: "EBS", w: "EC2に付けるディスク（1台に接続）" },
      { n: "EFS", w: "複数EC2で同時共有するファイル置き場" },
    ],
    tip: "ファイル大量=S3、EC2のディスク=EBS、共有=EFS",
  },
];
