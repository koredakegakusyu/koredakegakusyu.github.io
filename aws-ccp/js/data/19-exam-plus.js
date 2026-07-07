/* =============================================================
   コレダケ学習AWS CCP — 19 本番型 追加問題・暗記（既存モジュールへ concat で追記）
   出題範囲を広げ、この1サイトで合格に挑めるボリュームにする。
   ============================================================= */
(function () {
  var ADD = {
    /* ---- クラウド概念 ---- */
    "ccp-cloud-value": {
      memorize: [
        { k: "俊敏性の具体例", v: "新しいサーバーやサービスを数分で用意でき、失敗してもすぐやり直せる。" },
        { k: "クラウドの弾力性", v: "需要に合わせてリソースを自動で増減（スケール）できる。" },
      ],
      quiz: [
        {
          q: "クラウドコンピューティングにおける『俊敏性（アジリティ）』を最もよく表す例はどれか。",
          choices: [
            "サーバー購入に数か月の稟議と納品を要する",
            "新しい実験用のサーバーを数分で用意し、不要になれば削除できる",
            "一度契約すると3年間は解約できない",
            "リソースの追加に必ず物理工事が必要になる",
          ],
          answer: 1,
          explain: "数分でリソースを用意し試してすぐ消せる<strong>俊敏性（アジリティ）</strong>がクラウドの利点。",
        },
        {
          q: "オンプレミスからクラウドへ移行することで一般的に得られる財務上の効果はどれか。",
          choices: ["初期の設備投資（固定費）が増える", "先行投資を抑え、使用量に応じた変動費に変わる", "料金が完全に無料になる", "毎月必ず定額になる"],
          answer: 1,
          explain: "設備投資（CapEx）から使った分だけの変動費（OpEx）へ変わる。",
        },
      ],
    },
    "ccp-global-infra": {
      quiz: [
        {
          q: "特定のリージョンに属さず、世界規模で動作する『グローバルサービス』に該当するものはどれか。",
          choices: ["Amazon EC2", "Amazon RDS", "AWS IAM", "Amazon EBS"],
          answer: 2,
          explain: "IAM・Route 53・CloudFront・Organizationsは<strong>グローバルサービス</strong>（リージョン非依存）。EC2/RDS/EBSはリージョン内。",
        },
        {
          q: "AWSのリージョンとデータの所在に関する記述として適切なものはどれか。",
          choices: [
            "データは自動的に世界中の全リージョンに複製される",
            "保存したデータは、利用者が明示的にコピーしない限り原則そのリージョンに留まる",
            "リージョンは利用者が選べない",
            "1つのリージョンは1つのデータセンターだけで構成される",
          ],
          answer: 1,
          explain: "データは<strong>原則そのリージョンに留まる</strong>。リージョンは利用者が選び、中に複数AZがある。",
        },
      ],
    },
    "ccp-well-architected": {
      quiz: [
        {
          q: "Well-Architectedフレームワークの『持続可能性』の柱が主に扱うものはどれか。",
          choices: ["売上の最大化", "環境負荷（エネルギー消費）の低減", "画面デザインの美しさ", "契約期間の長さ"],
          answer: 1,
          explain: "持続可能性の柱は<strong>環境への影響（エネルギー消費など）を減らす</strong>ことを扱う。",
        },
      ],
    },
    /* ---- セキュリティ ---- */
    "ccp-shared-responsibility": {
      quiz: [
        {
          q: "Amazon S3に保存するデータを暗号化するかどうかの設定は、責任共有モデル上で誰の責任か。",
          choices: ["AWSの責任", "利用者（お客様）の責任", "どちらの責任でもない", "リージョンごとに自動で決まる"],
          answer: 1,
          explain: "データの保護・暗号化の設定は<strong>利用者の責任（IN the Cloud）</strong>。",
        },
        {
          q: "AWS Lambda（マネージドサービス）を利用する場合、実行環境のOSへのパッチ適用は誰の責任か。",
          choices: ["利用者の責任", "AWSの責任", "利用者とAWSが毎回交渉する", "第三者機関の責任"],
          answer: 1,
          explain: "マネージドサービスではOS・基盤の管理は<strong>AWSの責任</strong>。利用者はデータとアクセス権に責任を持つ。",
        },
      ],
    },
    "ccp-iam": {
      memorize: [
        { k: "IAM Identity Center", v: "複数アカウント/アプリへのシングルサインオン(SSO)を提供（旧AWS SSO）。" },
        { k: "Cognito", v: "Web/モバイルアプリの利用者（エンドユーザー）の認証を担う。" },
        { k: "パスワードポリシー", v: "最小文字数や複雑さ、定期変更などをIAMで強制できる。" },
      ],
      quiz: [
        {
          q: "IAMポリシーで許可も拒否も明示されていない操作は、デフォルトでどう扱われるか。",
          choices: ["自動的に許可される", "暗黙的に拒否される", "管理者に確認が求められる", "ルートユーザーだけ許可される"],
          answer: 1,
          explain: "IAMは<strong>明示的に許可されない限り拒否（暗黙的な拒否）</strong>が原則。明示的な拒否は許可より優先される。",
        },
        {
          q: "従業員が複数のAWSアカウントや業務アプリへ、1組の認証情報でシングルサインオン（SSO）できるようにしたい。適したサービスはどれか。",
          choices: ["Amazon Cognito", "AWS IAM Identity Center", "AWS KMS", "Amazon GuardDuty"],
          answer: 1,
          explain: "従業員向けの複数アカウントSSOは<strong>IAM Identity Center</strong>。アプリのエンドユーザー認証はCognito。",
        },
      ],
    },
    "ccp-security-services": {
      quiz: [
        {
          q: "EC2インスタンスやコンテナに既知の脆弱性がないかを自動的にスキャン・診断するサービスはどれか。",
          choices: ["Amazon Inspector", "Amazon Macie", "AWS Shield", "AWS KMS"],
          answer: 0,
          explain: "脆弱性の自動診断は<strong>Amazon Inspector</strong>。S3の機密データ発見はMacie。",
        },
        {
          q: "Amazon S3バケット内に、クレジットカード番号や個人情報などの機密データが保存されていないかを検出するサービスはどれか。",
          choices: ["Amazon GuardDuty", "Amazon Macie", "AWS WAF", "AWS Config"],
          answer: 1,
          explain: "S3の機密データを発見・保護するのは<strong>Amazon Macie</strong>。",
        },
      ],
    },
    "ccp-compliance": {
      quiz: [
        {
          q: "複数のAWSアカウントのセキュリティアラートやコンプライアンス状態を1か所に集約して確認できるサービスはどれか。",
          choices: ["AWS Security Hub", "AWS CloudTrail", "Amazon Inspector", "AWS Artifact"],
          answer: 0,
          explain: "セキュリティ状態を一元的に集約するのは<strong>AWS Security Hub</strong>。",
        },
        {
          q: "AWS Organizationsで、配下のアカウントが特定のリージョンやサービスを使えないよう組織全体で制限したい。用いる仕組みはどれか。",
          choices: ["IAMユーザーポリシー", "サービスコントロールポリシー（SCP）", "セキュリティグループ", "ネットワークACL"],
          answer: 1,
          explain: "アカウントに操作の上限（ガードレール）をかけるのは<strong>SCP</strong>。",
        },
      ],
    },
    /* ---- 技術とサービス ---- */
    "ccp-compute": {
      memorize: [
        { k: "Elastic Beanstalk", v: "コードをアップロードするだけでEC2/ELB等を自動構築・デプロイ(PaaS的)。" },
        { k: "ECS / EKS / ECR", v: "ECS/EKS=コンテナ実行、ECR=コンテナイメージの保管庫。" },
      ],
      quiz: [
        {
          q: "アプリケーションのコードをアップロードするだけで、必要なEC2・ロードバランサー・Auto Scalingなどを自動的に構築・デプロイしてくれるサービスはどれか。",
          choices: ["AWS Elastic Beanstalk", "Amazon EC2", "AWS Lambda", "Amazon S3"],
          answer: 0,
          explain: "コードを上げるだけで環境を自動構築するPaaS的サービスは<strong>Elastic Beanstalk</strong>。",
        },
        {
          q: "受信するトラフィックを複数のEC2インスタンスに自動的に分散させ、可用性を高めるサービスはどれか。",
          choices: ["Auto Scaling", "Elastic Load Balancing（ELB）", "Amazon Route 53", "AWS Lambda"],
          answer: 1,
          explain: "複数サーバーへ振り分けるのは<strong>ELB</strong>。台数を増減するのはAuto Scaling（両者を組み合わせる）。",
        },
      ],
    },
    "ccp-storage": {
      quiz: [
        {
          q: "Amazon S3で、同じオブジェクトの複数の版を保持し、誤削除や上書きから復元できるようにする機能はどれか。",
          choices: ["バージョニング", "ライフサイクルポリシー", "レプリケーション", "暗号化"],
          answer: 0,
          explain: "版を保持して復元できるのは<strong>バージョニング</strong>。古い版を自動移動するのはライフサイクル。",
        },
        {
          q: "アクセス頻度が予測できないデータを、利用状況に応じてAWSが自動で最適なコストの階層へ移動してくれるS3のストレージクラスはどれか。",
          choices: ["S3 標準", "S3 Glacier Deep Archive", "S3 Intelligent-Tiering", "S3 1ゾーン-IA"],
          answer: 2,
          explain: "自動で最適クラスへ移動するのは<strong>S3 Intelligent-Tiering</strong>。",
        },
      ],
    },
    "ccp-database": {
      quiz: [
        {
          q: "読み取り処理が非常に多いアプリケーションで、RDSデータベースの読み取り性能を分散・向上させたい。用いる仕組みはどれか。",
          choices: ["マルチAZ配置", "リードレプリカ", "スナップショット", "Auto Scaling"],
          answer: 1,
          explain: "読み取り性能の分散は<strong>リードレプリカ</strong>。マルチAZは可用性のための自動フェイルオーバー（性能目的ではない）。",
        },
        {
          q: "AWSが独自に開発した、MySQLやPostgreSQLと互換性を持つ高性能・高可用なリレーショナルデータベースはどれか。",
          choices: ["Amazon DynamoDB", "Amazon Aurora", "Amazon Redshift", "Amazon ElastiCache"],
          answer: 1,
          explain: "AWS独自の高速・高可用なRDBは<strong>Amazon Aurora</strong>。",
        },
      ],
    },
    "ccp-network": {
      memorize: [
        { k: "API Gateway", v: "APIの作成・公開・管理を行う入口。サーバーレスと相性がよい。" },
        { k: "Global Accelerator", v: "AWSの高速網を使い世界中からの通信を高速・安定化。" },
      ],
      quiz: [
        {
          q: "VPC内で、EC2インスタンス単位で通信の許可ルールを設定する仮想ファイアウォールはどれか。",
          choices: ["セキュリティグループ", "Amazon Route 53", "AWS WAF", "インターネットゲートウェイ"],
          answer: 0,
          explain: "インスタンス単位の仮想ファイアウォールは<strong>セキュリティグループ</strong>（許可ルールのみ）。サブネット単位はネットワークACL。",
        },
        {
          q: "外部から直接アクセスさせたくないデータベースサーバーは、VPC内のどこに配置するのが適切か。",
          choices: ["パブリックサブネット", "プライベートサブネット", "エッジロケーション", "インターネットゲートウェイ"],
          answer: 1,
          explain: "外部に公開しないものは<strong>プライベートサブネット</strong>に置く。公開するWebサーバー等はパブリックサブネット。",
        },
      ],
    },
    "ccp-management": {
      memorize: [
        { k: "AWS Health Dashboard", v: "AWS側の障害や自分のリソースに影響するイベントを通知・確認できる。" },
        { k: "Control Tower", v: "複数アカウントの安全な土台(ランディングゾーン)をベストプラクティスで自動構築。" },
      ],
      quiz: [
        {
          q: "AWSサービス自体の障害状況や、自分のアカウントのリソースに影響する予定メンテナンスなどを確認できるサービスはどれか。",
          choices: ["AWS Health Dashboard", "AWS CloudTrail", "Amazon Inspector", "AWS Artifact"],
          answer: 0,
          explain: "AWS側の障害や自分への影響イベントを確認するのは<strong>AWS Health Dashboard</strong>。",
        },
        {
          q: "多数のEC2インスタンスに対して、OSのパッチ適用や設定変更を一括で自動化・管理したい。適したサービスはどれか。",
          choices: ["AWS Systems Manager", "Amazon CloudWatch", "AWS CloudTrail", "AWS Budgets"],
          answer: 0,
          explain: "多数のサーバーの運用（パッチ・設定）を一括管理するのは<strong>AWS Systems Manager</strong>。",
        },
      ],
    },
    "ccp-integration": {
      quiz: [
        {
          q: "1つのメッセージを、複数のSQSキューやメール・Lambdaなど多数のあて先へ同時に配信（ファンアウト）したい。適したサービスはどれか。",
          choices: ["Amazon SQS", "Amazon SNS", "AWS Step Functions", "Amazon Athena"],
          answer: 1,
          explain: "1対多で一斉配信（ファンアウト）するのは<strong>Amazon SNS</strong>。ためて1対1で処理するのがSQS。",
        },
      ],
    },
    /* ---- 請求とサポート ---- */
    "ccp-billing": {
      memorize: [
        { k: "コスト配分タグ", v: "リソースにタグを付け、部門・用途ごとにコストを集計・分析できる。" },
        { k: "Compute Optimizer", v: "使用状況を分析し、無駄のないインスタンスサイズなどを推奨する。" },
      ],
      quiz: [
        {
          q: "AWS Organizationsの一括請求（Consolidated Billing）を利用する主な利点はどれか。",
          choices: [
            "各アカウントが個別に高い料金を支払う",
            "複数アカウントの使用量を合算し、ボリューム割引を受けやすくなる",
            "請求書が各アカウントに別々に届き管理が複雑になる",
            "無料利用枠が使えなくなる",
          ],
          answer: 1,
          explain: "一括請求で使用量を合算すると<strong>ボリューム割引</strong>が効きやすく、請求管理も一元化できる。",
        },
        {
          q: "新規のAWS利用者が、一定の範囲内であれば無料で多くのサービスを試せる仕組みはどれか。",
          choices: ["リザーブドインスタンス", "AWS無料利用枠（Free Tier）", "Savings Plans", "スポットインスタンス"],
          answer: 1,
          explain: "一定枠まで無料で試せるのは<strong>AWS無料利用枠（Free Tier）</strong>。",
        },
      ],
    },
    "ccp-support": {
      memorize: [
        { k: "AWS re:Post", v: "AWS公式のコミュニティQ&A（無料の知識共有）。" },
        { k: "AWS Marketplace", v: "サードパーティ製ソフトを購入・デプロイできるオンラインストア。" },
      ],
      quiz: [
        {
          q: "AWS Trusted Advisorの『全項目』のチェックを利用できるのは、どのサポートプラン以上か。",
          choices: ["ベーシック", "デベロッパー", "ビジネス", "無料の全プラン"],
          answer: 2,
          explain: "Trusted Advisorの全項目は<strong>ビジネス</strong>以上で利用できる（ベーシックは一部のみ）。",
        },
        {
          q: "他の利用者やAWSの専門家に質問して回答を得られる、無料のAWS公式コミュニティサービスはどれか。",
          choices: ["AWS re:Post", "AWS Artifact", "AWS Config", "Amazon Inspector"],
          answer: 0,
          explain: "公式のコミュニティQ&Aは<strong>AWS re:Post</strong>。",
        },
      ],
    },
    /* ---- 追加モジュール ---- */
    "ccp-migration": {
      quiz: [
        {
          q: "データセンターの閉鎖に伴い、数十ペタバイト（PB）という極めて大量のデータをAWSへ移送したい。最も適した手段はどれか。",
          choices: ["AWS DataSync", "AWS Snowmobile", "AWS DMS", "Amazon S3への直接アップロード"],
          answer: 1,
          explain: "数十PB級の超大量データはトラック型の<strong>Snowmobile</strong>で物理移送する。",
        },
      ],
    },
    "ccp-ai-ml": {
      quiz: [
        {
          q: "Webサイトのユーザーレビューを大量に分析し、肯定的か否定的か（感情）や頻出キーワードを自動で把握したい。適したサービスはどれか。",
          choices: ["Amazon Comprehend", "Amazon Polly", "Amazon Rekognition", "Amazon Translate"],
          answer: 0,
          explain: "文章の感情分析・キーワード抽出などの自然言語処理は<strong>Amazon Comprehend</strong>。",
        },
      ],
    },
    "ccp-devtools": {
      quiz: [
        {
          q: "スケジュールや他サービスのイベントをきっかけに、Lambda関数などを自動的に起動させる連携を実現したい。適したサービスはどれか。",
          choices: ["Amazon EventBridge", "AWS CodeCommit", "AWS X-Ray", "AWS Cloud9"],
          answer: 0,
          explain: "イベントを起点に別サービスを動かすイベント連携は<strong>Amazon EventBridge</strong>。",
        },
      ],
    },
  };

  var list = window.CURRICULUM || [];
  var byId = {};
  list.forEach(function (m) { byId[m.id] = m; });
  Object.keys(ADD).forEach(function (id) {
    var m = byId[id];
    if (!m) return;
    var a = ADD[id];
    if (a.memorize) m.memorize = (m.memorize || []).concat(a.memorize);
    if (a.flashcards) m.flashcards = (m.flashcards || []).concat(a.flashcards);
    if (a.quiz) m.quiz = (m.quiz || []).concat(a.quiz);
  });
})();
