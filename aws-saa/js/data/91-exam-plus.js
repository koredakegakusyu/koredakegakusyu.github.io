/* =============================================================
   コレダケAWS SAA — 91 本番型問題バンク（実務レベル・追加分）
   既存科目に quiz を concat して問題数を増やす。難易度は本番以上を狙う。
   index.html では 90-supplement.js の後・app.js の前に読み込む。
   ============================================================= */
(function () {
  var ADD = {
    /* ================= 土台 ================= */
    "global-infra": {
      quiz: [
        {
          q: "グローバル展開するアプリで、各国のユーザーに最も近い場所から静的・動的コンテンツを配信し、TLS終端もエッジで行いたい。基盤として最適なのは？",
          choices: [
            "リージョンを1つだけ使い、EC2を増やす",
            "CloudFront（エッジロケーション）を前段に置く",
            "全リージョンにEC2を常時起動",
            "Direct Connectを各国に敷設",
          ],
          answer: 1,
          explain: "世界中の<strong>エッジロケーション</strong>から配信しTLS終端もエッジで行うのは<strong>CloudFront</strong>。全リージョン常時起動は過剰コスト。",
        },
        {
          q: "1つのリージョン内で、コンポーネントを物理的に離れた電源・ネットワークの独立した施設に分散して可用性を確保したい。分散の単位は？",
          choices: ["複数リージョン", "複数アベイラビリティゾーン(AZ)", "複数エッジロケーション", "複数VPC"],
          answer: 1,
          explain: "リージョン内で電源・NWが独立した障害分離単位は<strong>AZ</strong>。マルチAZ配置が高可用性の基本。",
        },
      ],
    },
    "well-architected": {
      quiz: [
        {
          q: "Well-Architected フレームワークで『使わない時間帯にリソースを止め、需要に応じて自動増減させる』のは主にどの柱の実践か？",
          choices: ["セキュリティ", "コスト最適化と持続可能性", "信頼性のみ", "運用上の優秀性のみ"],
          answer: 1,
          explain: "需要に応じた供給・不要リソースの停止は<strong>コスト最適化</strong>（および持続可能性）の代表的実践。",
        },
      ],
    },
    "organizations": {
      quiz: [
        {
          q: "開発アカウント群では特定リージョン以外の利用を全面禁止したい。本番アカウントには適用したくない。最適な実装は？",
          choices: [
            "全アカウントの管理者に口頭で周知",
            "開発用OUにSCPを適用し、許可リージョン外のアクションをDenyする",
            "各IAMユーザーにインラインポリシー",
            "CloudWatchで検知して手動停止",
          ],
          answer: 1,
          explain: "特定範囲だけに強制するなら<strong>OU単位のSCP</strong>。<code>aws:RequestedRegion</code>条件でリージョン制限をDenyできる。",
        },
        {
          q: "複数アカウントの請求をまとめ、RIやSavings Plansの割引を組織全体で共有してコストを下げたい。前提となる仕組みは？",
          choices: ["各アカウントで個別契約", "AWS Organizationsの一括請求(Consolidated Billing)", "アカウントを1つに統合", "サポートプランの変更"],
          answer: 1,
          explain: "<strong>一括請求</strong>により使用量が合算され、RI/SP割引が組織全体で共有される。",
        },
      ],
    },

    /* ================= 認証・IAM ================= */
    "iam": {
      quiz: [
        {
          q: "EC2上のアプリがS3へアクセスする。認証情報をどう持たせるのがベストプラクティスか？",
          choices: [
            "アクセスキーをEC2内の設定ファイルに保存",
            "IAMロールをEC2にアタッチ（インスタンスプロファイル）",
            "ルートのキーを環境変数に設定",
            "ユーザーごとにキーを配布",
          ],
          answer: 1,
          explain: "EC2には<strong>IAMロール（インスタンスプロファイル）</strong>を付与し、一時認証情報を自動供給する。長期キーの埋め込みは厳禁。",
        },
        {
          q: "別チームのアプリに、S3バケットの読み取りだけを許可したい。相手はクロスアカウントのロールを引き受ける。付与すべき権限の考え方は？",
          choices: [
            "相手にIAMユーザーとパスワードを渡す",
            "リソースベースのバケットポリシー＋相手ロールにsts:AssumeRoleを許可し、最小権限(s3:GetObject)のみ付与",
            "バケットを公開する",
            "ルート権限を貸与",
          ],
          answer: 1,
          explain: "クロスアカウントは<strong>ロールの引き受け＋最小権限</strong>が基本。読み取りのみなら<code>s3:GetObject</code>だけを許可する。",
        },
        {
          q: "監査で『誰が何にアクセスできるか』の過剰権限を洗い出したい。最適なサービス/機能は？",
          choices: ["CloudTrailのみ", "IAM Access Analyzer と 最終アクセス情報(Last Accessed)", "Configのみ", "GuardDuty"],
          answer: 1,
          explain: "外部公開の検出は<strong>IAM Access Analyzer</strong>、未使用権限の削減は<strong>Last Accessed 情報</strong>で最小権限化する。",
        },
      ],
    },
    "sts-federation": {
      quiz: [
        {
          q: "社内の既存ADで認証済みの社員に、AWSマネジメントコンソールへSSOでログインさせたい。都度IAMユーザーは作りたくない。最適解は？",
          choices: [
            "全員にIAMユーザーを作成",
            "IAMアイデンティティセンター(SSO)やSAML2.0フェデレーションでADと連携し一時認証を発行",
            "ルートを共有",
            "アクセスキーを配布",
          ],
          answer: 1,
          explain: "既存IdPと連携し一時認証でログインさせるのが<strong>フェデレーション（SAML / IAM Identity Center）</strong>。IAMユーザーの量産を避けられる。",
        },
      ],
    },
    "cognito": {
      quiz: [
        {
          q: "モバイルアプリで、ユーザーのサインアップ/サインインを管理し、認証後に一時的なAWS認証情報でS3へ直接アップロードさせたい。組み合わせは？",
          choices: [
            "User Poolsのみ",
            "User Pools（認証）＋ Identity Pools（AWS一時認証情報の発行）",
            "IAMユーザーを配布",
            "Identity Poolsのみでパスワード管理",
          ],
          answer: 1,
          explain: "サインイン管理は<strong>User Pools</strong>、AWSリソースへの一時認証情報の払い出しは<strong>Identity Pools</strong>。役割が違う点が頻出。",
        },
      ],
    },

    /* ================= セキュリティ ================= */
    "kms": {
      quiz: [
        {
          q: "コンプライアンス要件で『暗号鍵の生成・保管を単一テナントの専有HSMで、FIPS 140-2 Level 3で行う』ことが求められた。最適なのは？",
          choices: ["KMSのAWSマネージドキー", "KMSのカスタマーマネージドキー", "CloudHSM", "S3のSSE-S3"],
          answer: 2,
          explain: "専有ハードウェア・FIPS 140-2 Level 3・鍵の完全な自己管理が要件なら<strong>CloudHSM</strong>。通常はKMSで十分だが専有要件時はHSM。",
        },
        {
          q: "大きなファイルを暗号化する際、KMSに毎回データ本体を送らずに効率良く暗号化したい。KMSが用いる方式は？",
          choices: ["データを丸ごとKMSへ送信", "エンベロープ暗号化（データキーで本体を暗号化し、データキー自体をKMSで暗号化）", "鍵を使わない", "クライアントで鍵を生成し共有"],
          answer: 1,
          explain: "<strong>エンベロープ暗号化</strong>：データキーで本体を暗号化、そのデータキーをCMKで暗号化。KMSに大きなデータを送らずに済む。",
        },
        {
          q: "リージョン間でレプリケーションするデータを、両リージョンで同一の鍵素材を用いて復号可能にしたい。適切なKMSの機能は？",
          choices: ["自動ローテーション", "マルチリージョンキー", "グラント", "エイリアス"],
          answer: 1,
          explain: "複数リージョンで同一鍵素材を共有するのは<strong>マルチリージョンキー</strong>。DRやグローバルテーブルの暗号化で有効。",
        },
      ],
    },
    "secrets": {
      quiz: [
        {
          q: "RDSのDBパスワードを、コードに書かずに保管し、かつ定期的に自動でローテーションしたい。最適なサービスは？",
          choices: ["Parameter Store（標準・String）", "Secrets Manager（RDS自動ローテーション）", "S3に暗号化して保存", "環境変数に直書き"],
          answer: 1,
          explain: "資格情報の保管＋<strong>自動ローテーション</strong>は<strong>Secrets Manager</strong>。単なる設定値の無料保管ならParameter Storeで足りる。",
        },
      ],
    },
    "edge-protection": {
      quiz: [
        {
          q: "ALBの背後のWebアプリがSQLインジェクションとXSSを受けている。特定IPからの大量リクエストもブロックしたい。最適な組み合わせは？",
          choices: [
            "NACLだけで対応",
            "AWS WAFのマネージドルール＋レートベースルールをALB/CloudFrontに適用",
            "セキュリティグループでL7フィルタ",
            "GuardDutyで自動遮断",
          ],
          answer: 1,
          explain: "SQLi/XSSなどL7攻撃とレート制限は<strong>AWS WAF</strong>。マネージドルールで既知攻撃、<strong>レートベースルール</strong>で大量リクエストを抑止。",
        },
        {
          q: "大規模なL3/L4のDDoS攻撃に対し、24/7のサポートと攻撃時のコスト保護（スケール課金の払い戻し）が欲しい。適切なのは？",
          choices: ["Shield Standard", "Shield Advanced", "WAFのみ", "NACL"],
          answer: 1,
          explain: "高度なDDoS対策・DRT支援・スケール課金の保護は<strong>Shield Advanced</strong>。Standardは自動で無料の基本保護のみ。",
        },
      ],
    },
    "threat-detection": {
      quiz: [
        {
          q: "S3バケットに個人情報(PII)やクレジットカード番号が誤って保存されていないか継続的に検出したい。最適なサービスは？",
          choices: ["GuardDuty", "Macie", "Inspector", "Config"],
          answer: 1,
          explain: "S3内の<strong>機密データ(PII)の検出・分類</strong>は<strong>Macie</strong>。GuardDutyは脅威検知、Inspectorは脆弱性スキャン。",
        },
        {
          q: "EC2やコンテナイメージのソフトウェア脆弱性(CVE)と意図しないネットワーク到達性を自動で継続評価したい。最適なのは？",
          choices: ["Amazon Inspector", "Amazon Macie", "AWS Config", "CloudTrail"],
          answer: 0,
          explain: "ワークロードの<strong>脆弱性スキャン</strong>は<strong>Inspector</strong>。GuardDutyはログからの脅威検知で役割が異なる。",
        },
      ],
    },

    /* ================= コンピューティング ================= */
    "ec2": {
      quiz: [
        {
          q: "HPCジョブで、ノード間を極めて低レイテンシ・高帯域で通信させたい。同一AZ内に密集配置したい。使うべき仕組みは？",
          choices: ["スプレッドプレイスメントグループ", "クラスタープレイスメントグループ", "パーティションプレイスメントグループ", "Auto Scaling"],
          answer: 1,
          explain: "低レイテンシ・高帯域でノードを密集させるのは<strong>クラスタープレイスメントグループ</strong>（単一AZ）。EFAと併用でさらに高速化。",
        },
        {
          q: "重要な少数インスタンスを、ハードウェア障害の巻き添えを避けるため物理的に別ハードウェアへ分散したい。最適なのは？",
          choices: ["クラスター", "スプレッドプレイスメントグループ", "パーティション", "専有ホスト"],
          answer: 1,
          explain: "個々を別ハードウェアへ分離するのは<strong>スプレッドプレイスメントグループ</strong>（AZあたり最大7）。相関障害を避ける用途。",
        },
      ],
    },
    "ec2-pricing": {
      quiz: [
        {
          q: "24時間365日ずっと稼働する定常的なベースライン負荷がある。インスタンスタイプの変更やリージョン移動の柔軟性も欲しい。最もコスト効率が良いのは？",
          choices: ["オンデマンド", "スポット", "Compute Savings Plans", "スタンダードRI(インスタンス固定)"],
          answer: 2,
          explain: "常時稼働かつ<strong>柔軟性重視</strong>なら<strong>Compute Savings Plans</strong>（ファミリー/サイズ/リージョン/OSをまたいで割引）。固定ならStandard RIが最大割引。",
        },
        {
          q: "夜間バッチや、中断されても再実行できる画像処理をできるだけ安く動かしたい。最適な購入オプションは？",
          choices: ["オンデマンド", "スポットインスタンス", "全額前払いRI", "専有ホスト"],
          answer: 1,
          explain: "中断耐性のあるステートレス/バッチは<strong>スポット</strong>で最大約90%割引。中断通知(2分)を扱える設計が前提。",
        },
        {
          q: "ライセンス上『物理ソケット単位で課金され、同じ物理サーバに固定する』必要があるソフトを持ち込む。最適なのは？",
          choices: ["専有ホスト(Dedicated Hosts)", "専有インスタンス(Dedicated Instances)", "スポット", "通常のオンデマンド"],
          answer: 0,
          explain: "ソケット/コア単位のBYOLや物理サーバ可視性が要るなら<strong>Dedicated Hosts</strong>。Dedicated Instancesは物理は専有だがホスト可視性はない。",
        },
      ],
    },
    "elb-asg": {
      quiz: [
        {
          q: "URLのパス(/api, /img)やホスト名でバックエンドのターゲットグループを振り分けたい。適切なロードバランサは？",
          choices: ["NLB", "ALB", "CLB", "Gateway Load Balancer"],
          answer: 1,
          explain: "L7でパス/ホストベースのルーティングは<strong>ALB</strong>。L4の超低遅延・静的IPは<strong>NLB</strong>。",
        },
        {
          q: "数百万接続を捌き、クライアントに固定IP(Elastic IP)を提示し、超低レイテンシが必要なTCPサービス。最適なのは？",
          choices: ["ALB", "NLB", "CloudFront", "API Gateway"],
          answer: 1,
          explain: "静的IP・超低遅延・大量接続のL4は<strong>NLB</strong>。ALBは静的IPを持たない（DNS名）。",
        },
        {
          q: "Auto Scalingで、平均CPU使用率を常に50%付近に保つようにインスタンス数を自動調整したい。最も簡単で推奨されるポリシーは？",
          choices: ["シンプルスケーリング", "ステップスケーリング", "ターゲット追跡スケーリング", "手動"],
          answer: 2,
          explain: "指標を目標値に保つのは<strong>ターゲット追跡</strong>ポリシー（例：平均CPU 50%）。設定が簡単で推奨。",
        },
        {
          q: "毎朝9時にアクセスが急増するのが分かっている。増加の前に容量を確保したい。最適なのは？",
          choices: ["ターゲット追跡だけに任せる", "スケジュールドスケーリングで事前に増やす", "手動で毎日操作", "スポットに切替"],
          answer: 1,
          explain: "時刻が既知の需要には<strong>スケジュールドスケーリング</strong>で先回り。予測が難しいなら予測スケーリングも併用。",
        },
        {
          q: "ALB配下でユーザーのセッションが特定インスタンスに紐づいてしまい、スケールイン時にログアウトが発生する。スケーラブルな最適解は？",
          choices: [
            "スティッキーセッションを強化",
            "セッションをElastiCache/DynamoDB等の外部ストアに外出しし、インスタンスをステートレスにする",
            "インスタンスを固定",
            "ASGを停止",
          ],
          answer: 1,
          explain: "水平スケールの基本は<strong>ステートレス化</strong>。セッションは<strong>ElastiCacheやDynamoDB</strong>へ外出しする。",
        },
      ],
    },
    "lambda": {
      quiz: [
        {
          q: "LambdaがリレーショナルDBへ接続するが、同時実行が急増すると接続数が枯渇する。最適な対策は？",
          choices: [
            "Lambdaのタイムアウトを延ばす",
            "RDS Proxyを挟んで接続をプールする",
            "メモリを最大にする",
            "同時実行を無制限にする",
          ],
          answer: 1,
          explain: "サーバレスのDB接続枯渇は<strong>RDS Proxy</strong>で接続プーリングして解決。フェイルオーバーも速くなる。",
        },
        {
          q: "コールドスタートのレイテンシを抑え、応答時間を安定させたい。Lambdaの機能は？",
          choices: ["予約された同時実行のみ", "プロビジョンド同時実行(Provisioned Concurrency)", "メモリ削減", "VPC接続の削除"],
          answer: 1,
          explain: "初期化済みの実行環境を用意してコールドスタートを抑えるのは<strong>プロビジョンド同時実行</strong>。",
        },
        {
          q: "Lambdaの実行時間が15分を超えるバッチ処理を実装したい。設計として最適なのは？",
          choices: [
            "Lambdaのタイムアウトを延長",
            "Step Functionsで分割、またはFargate/ECSやBatchなど長時間実行に適したサービスへ移す",
            "メモリを増やす",
            "再帰呼び出しで無限に延ばす",
          ],
          answer: 1,
          explain: "Lambdaの上限は<strong>15分</strong>。超える処理は<strong>Step Functionsで分割</strong>するかFargate/Batchへ。",
        },
        {
          q: "毎分・毎時など決まったスケジュールでLambdaを起動したい。最適なトリガーは？",
          choices: ["SQS", "EventBridge Scheduler（またはルールのスケジュール式）", "S3イベント", "手動"],
          answer: 1,
          explain: "定期実行は<strong>EventBridge のスケジュール</strong>（cron/rate式）でLambdaを起動するのが標準。",
        },
      ],
    },
    "containers": {
      quiz: [
        {
          q: "コンテナを動かしたいが、EC2の管理・パッチ・スケーリングを一切したくない。サーバレスで動かす最適な選択は？",
          choices: ["ECS on EC2", "ECS/EKS on Fargate", "自前でDockerをEC2に導入", "Lambdaのみ"],
          answer: 1,
          explain: "ホスト管理不要のサーバレスコンテナは<strong>Fargate</strong>。EC2起動タイプは自分でホストを管理する。",
        },
        {
          q: "Kubernetesの標準APIとエコシステムをそのまま使いたい。AWSのマネージド選択は？",
          choices: ["ECS", "EKS", "Lightsail", "Beanstalk"],
          answer: 1,
          explain: "マネージドKubernetesは<strong>EKS</strong>。AWS独自のシンプルなオーケストレータが<strong>ECS</strong>。",
        },
      ],
    },
    "beanstalk-batch": {
      quiz: [
        {
          q: "既存のWebアプリ(言語ランタイム標準構成)を、インフラ詳細を意識せず素早くデプロイし、容量管理やロードバランサも自動で用意したい。最適なのは？",
          choices: ["Elastic Beanstalk", "CloudFormationを手書き", "EC2を手動構築", "Lightsailのみ"],
          answer: 0,
          explain: "定型的なWebアプリを最短でデプロイ＋自動で環境構築するのは<strong>Elastic Beanstalk</strong>（PaaS的、基盤は自分の管理下）。",
        },
      ],
    },

    /* ================= ストレージ ================= */
    "s3": {
      quiz: [
        {
          q: "S3の静的サイトを、CloudFront経由でのみ配信し、バケットへの直接アクセスは禁止したい。現行の推奨方式は？",
          choices: [
            "バケットを公開する",
            "Origin Access Control(OAC)でCloudFrontからのみ許可し、バケットはブロックパブリックアクセスのまま",
            "署名なしで全公開",
            "IAMユーザーを配布",
          ],
          answer: 1,
          explain: "S3オリジンをCloudFront限定にするのは現行<strong>OAC</strong>（旧OAIの後継）。バケットは非公開のまま安全に配信できる。",
        },
        {
          q: "誤削除や上書きから重要オブジェクトを守り、規制対応で『一定期間は誰も消せない』ようにしたい。組み合わせは？",
          choices: [
            "バージョニングのみ",
            "バージョニング＋S3 Object Lock（コンプライアンス/ガバナンスモード）",
            "ライフサイクルで即削除",
            "静的公開",
          ],
          answer: 1,
          explain: "改ざん/削除防止のWORMは<strong>Object Lock</strong>。誤操作対策の<strong>バージョニング</strong>と併用する。",
        },
        {
          q: "他部門アカウントが書き込んだオブジェクトの所有権で権限管理が複雑化している。運用を単純化する現行の推奨設定は？",
          choices: [
            "全オブジェクトを公開",
            "S3 Object Ownership を Bucket owner enforced にしACLを無効化",
            "各オブジェクトにACLを手動設定",
            "バケットを分けない",
          ],
          answer: 1,
          explain: "ACLを無効化しバケット所有者に一元化するのが現行推奨（<strong>Bucket owner enforced</strong>）。ポリシーベースで簡潔に管理できる。",
        },
        {
          q: "世界中のユーザーから大容量ファイルをS3へアップロードする際、遠距離ユーザーの速度を上げたい。最適な機能は？",
          choices: ["マルチパートアップロードだけ", "S3 Transfer Acceleration（エッジ経由）", "リージョンを増やす", "Snowball"],
          answer: 1,
          explain: "遠距離からのアップロード高速化は<strong>Transfer Acceleration</strong>（CloudFrontエッジ経由）。大きなファイルはマルチパートも併用。",
        },
      ],
    },
    "s3-classes": {
      quiz: [
        {
          q: "アクセス頻度が読めず変動するデータを、手間なく最適なコストで置きたい。取り出しコストや最小保持での事故も避けたい。最適なストレージクラスは？",
          choices: ["Standard固定", "S3 Intelligent-Tiering", "Glacier Deep Archive", "One Zone-IA"],
          answer: 1,
          explain: "アクセスパターンが読めない場合は<strong>Intelligent-Tiering</strong>が自動で階層移動。取り出し手数料なしで最適化される。",
        },
        {
          q: "コンプライアンス保管で、ほぼ取り出さないが最長で数時間の取り出し許容、7年保管でコスト最小にしたい。最適なのは？",
          choices: ["Standard-IA", "Glacier Instant Retrieval", "Glacier Flexible Retrieval", "Glacier Deep Archive"],
          answer: 3,
          explain: "最安・長期アーカイブは<strong>Glacier Deep Archive</strong>（取り出し数時間、最低180日）。即時取り出しが要るならInstant Retrieval。",
        },
        {
          q: "再生成可能なサムネイル画像を、可用性は多少犠牲でも良いので安く保存したい。最適なのは？",
          choices: ["Standard", "One Zone-IA", "Glacier Deep Archive", "Intelligent-Tiering"],
          answer: 1,
          explain: "単一AZで安く、消えても再生成できるデータは<strong>One Zone-IA</strong>。AZ障害で失われる点を許容できる場合に限る。",
        },
        {
          q: "90日を過ぎたログをStandardからIAへ、1年でGlacierへ自動移動し、7年で削除したい。最適な仕組みは？",
          choices: ["手動でコピー", "S3ライフサイクルルール", "レプリケーション", "バージョニング"],
          answer: 1,
          explain: "経過日数でクラス移行・失効させるのは<strong>ライフサイクルルール</strong>。運用不要で自動最適化できる。",
        },
      ],
    },
    "block-file": {
      quiz: [
        {
          q: "複数のLinux EC2から同時にマウントして共有する、伸縮自在なファイルシステムが欲しい。最適なのは？",
          choices: ["EBS(gp3)", "Amazon EFS", "インスタンスストア", "S3 Standard"],
          answer: 1,
          explain: "複数Linuxから同時アクセスできるマネージドNFSは<strong>EFS</strong>（マルチAZ、自動伸縮）。EBSは基本1インスタンスにアタッチ。",
        },
        {
          q: "機械学習/HPCで、S3のデータセットに対し数百GB/秒級のスループットでアクセスする高性能ファイルシステムが欲しい。最適なのは？",
          choices: ["FSx for Windows", "FSx for Lustre", "EFS", "EBS st1"],
          answer: 1,
          explain: "HPC/ML向けの超高速並列FSは<strong>FSx for Lustre</strong>。S3と連携してデータをロード/エクスポートできる。",
        },
        {
          q: "Windowsアプリ群が、SMBプロトコルとActive Directory統合の共有ファイルストレージを要求している。最適なのは？",
          choices: ["EFS", "FSx for Windows File Server", "FSx for Lustre", "S3"],
          answer: 1,
          explain: "SMB＋AD統合のWindows共有は<strong>FSx for Windows File Server</strong>。EFSはLinux(NFS)向け。",
        },
        {
          q: "大容量の連続シーケンシャルI/O（ビッグデータ/ログ処理）に最もコスト効率が良いEBSは？",
          choices: ["gp3", "io2 Block Express", "st1（スループット最適化HDD）", "sc1（コールドHDD）"],
          answer: 2,
          explain: "大きな順次スループット重視は<strong>st1</strong>。ランダムI/Oや低レイテンシが要るなら<code>gp3</code>/<code>io2</code>を選ぶ。",
        },
      ],
    },
    "storage-gateway": {
      quiz: [
        {
          q: "オンプレのバックアップソフトが物理テープ装置を前提にしている。テープ運用のままクラウドへ退避したい。最適なのは？",
          choices: ["File Gateway", "Volume Gateway", "Tape Gateway(VTL)", "DataSync"],
          answer: 2,
          explain: "既存テープバックアップをそのままクラウドへ退避するのは<strong>Tape Gateway(VTL)</strong>。GlacierへアーカイブしTCO削減。",
        },
        {
          q: "オンプレのアプリからNFS/SMBで書き込んだファイルを、実体はS3オブジェクトとして保存し、頻繁アクセス分だけローカルにキャッシュしたい。最適なのは？",
          choices: ["File Gateway", "Tape Gateway", "Volume Gateway(stored)", "Direct Connect"],
          answer: 0,
          explain: "ファイルをS3オブジェクトとして格納しローカルキャッシュするのは<strong>File Gateway</strong>。",
        },
      ],
    },

    /* ================= データベース ================= */
    "rds": {
      quiz: [
        {
          q: "RDSで、AZ障害時にも自動フェイルオーバーで数分以内に復旧する高可用性が欲しい。読み取り負荷分散は今回の要件ではない。適切な構成は？",
          choices: [
            "リードレプリカを増やす",
            "マルチAZ配置（同期スタンバイ）",
            "単一AZでスナップショット頻度を上げる",
            "DynamoDBへ移行",
          ],
          answer: 1,
          explain: "HA/自動フェイルオーバーは<strong>マルチAZ</strong>（同期レプリケーション）。読み取りスケールが目的なら<strong>リードレプリカ</strong>と役割が違う。",
        },
        {
          q: "読み取りが非常に多く、参照クエリを複数ノードへ分散したい。可能なら別リージョンにも読み取りを置きたい。適切なのは？",
          choices: ["マルチAZ", "リードレプリカ（クロスリージョン可）", "スナップショット", "スケールアップのみ"],
          answer: 1,
          explain: "読み取りスケールは<strong>リードレプリカ</strong>（非同期、クロスリージョンも可）。HAのマルチAZとは目的が異なる。",
        },
        {
          q: "MySQL/PostgreSQL互換で、ストレージが自動拡張し、6つのコピーを3AZに分散、フェイルオーバーが高速なマネージドDBが欲しい。最適なのは？",
          choices: ["RDS for MySQL(単体)", "Amazon Aurora", "DynamoDB", "Redshift"],
          answer: 1,
          explain: "3AZ×6コピー・自動拡張・高速フェイルオーバーのクラウドネイティブは<strong>Aurora</strong>。",
        },
        {
          q: "使用量が断続的で、アイドル時は課金を抑え、急なスパイクに自動で追随するAuroraの構成は？",
          choices: ["プロビジョンド固定", "Aurora Serverless v2", "リードレプリカ多数", "オンデマンドEC2上のMySQL"],
          answer: 1,
          explain: "断続的/予測困難な負荷は<strong>Aurora Serverless v2</strong>で自動スケール＆アイドル節約。",
        },
        {
          q: "本番RDSの負荷を上げずに、月末だけ本番同等データで分析クエリを試したい。破壊もしたくない。最適なのは？",
          choices: ["本番で直接実行", "スナップショットから復元した別インスタンスで実行", "テーブルロックして実行", "リードレプリカを削除"],
          answer: 1,
          explain: "本番影響なしの検証は<strong>スナップショットから復元</strong>して隔離環境で行う。読み取りだけなら<strong>リードレプリカ</strong>も可。",
        },
      ],
    },
    "dynamodb": {
      quiz: [
        {
          q: "トラフィックが予測不能で急増・急減する。キャパシティ管理をせず、来た分だけ支払いたい。DynamoDBの設定は？",
          choices: ["プロビジョンド固定", "オンデマンドキャパシティ", "Auto Scalingを無効化", "RDSへ移行"],
          answer: 1,
          explain: "予測不能なスパイクは<strong>オンデマンドキャパシティ</strong>。安定した高負荷が読めるならプロビジョンド＋Auto Scalingが安い。",
        },
        {
          q: "読み取りをマイクロ秒級まで高速化したい（DynamoDB単体はミリ秒）。最適な追加コンポーネントは？",
          choices: ["ElastiCache Redisを自前実装", "DynamoDB Accelerator(DAX)", "リードレプリカ", "グローバルテーブル"],
          answer: 1,
          explain: "DynamoDB専用のインメモリキャッシュは<strong>DAX</strong>でマイクロ秒読み取り。汎用キャッシュはElastiCacheだが実装が増える。",
        },
        {
          q: "複数リージョンで低遅延の読み書きを両方提供し、リージョン障害にも耐えたい。最適なのは？",
          choices: ["クロスリージョンのバックアップ", "DynamoDB グローバルテーブル（マルチリージョン・マルチアクティブ）", "単一リージョン＋CloudFront", "リードレプリカ"],
          answer: 1,
          explain: "多リージョンでアクティブ-アクティブに読み書きするのは<strong>グローバルテーブル</strong>。",
        },
        {
          q: "セッションデータを一定時間後に自動で消したい。追加コストや掃除バッチを避けたい。最適な機能は？",
          choices: ["ライフサイクル", "DynamoDB TTL（有効期限属性）", "手動DeleteItem", "ストリーム"],
          answer: 1,
          explain: "期限切れ項目の自動削除は<strong>TTL</strong>。掃除バッチ不要でセッションやキャッシュ的用途に最適。",
        },
      ],
    },
    "caching-db": {
      quiz: [
        {
          q: "読み取りの多いRDBの前段にキャッシュを置き、レイテンシとDB負荷を下げたい。永続化やレプリケーション、Pub/Subなど高機能も欲しい。最適なのは？",
          choices: ["ElastiCache for Memcached", "ElastiCache for Redis", "DynamoDB", "S3"],
          answer: 1,
          explain: "レプリケーション/永続化/Pub-Sub等の高機能キャッシュは<strong>Redis</strong>。純粋なマルチスレッド単純キャッシュはMemcached。",
        },
        {
          q: "キャッシュを単純な水平分割でスケールさせ、マルチスレッドで捌ければ十分。永続化やレプリカは不要。最適なのは？",
          choices: ["Redis", "Memcached", "DAX", "Aurora"],
          answer: 1,
          explain: "シンプル・マルチスレッド・水平分割で足りるなら<strong>Memcached</strong>。高機能が要るならRedis。",
        },
      ],
    },
    "redshift-purpose": {
      quiz: [
        {
          q: "全社のトランザクションデータを集約し、列指向でペタバイト級の複雑な集計・BI分析を高速に行いたい。最適なのは？",
          choices: ["RDS", "Redshift", "DynamoDB", "ElastiCache"],
          answer: 1,
          explain: "大規模OLAP/データウェアハウスは<strong>Redshift</strong>（列指向・MPP）。トランザクション(OLTP)はRDS/Auroraの役割。",
        },
        {
          q: "S3上のデータレイクに対し、サーバを立てずSQLでアドホックに問い合わせ、スキャン量課金で使いたい。最適なのは？",
          choices: ["Redshift常時起動", "Athena", "EMR常時起動", "RDS"],
          answer: 1,
          explain: "S3を直接SQLで、サーバレス・スキャン課金は<strong>Athena</strong>。定常的な大規模DWHはRedshiftが向く。",
        },
      ],
    },

    /* ================= ネットワーキング ================= */
    "vpc": {
      quiz: [
        {
          q: "プライベートサブネットのEC2から、インターネット上のパッケージ更新へアウトバウンド接続したい。インバウンドは受けたくない。適切なのは？",
          choices: ["インターネットゲートウェイをアタッチ", "NAT Gateway をパブリックサブネットに配置", "パブリックIPを付与", "VPCピアリング"],
          answer: 1,
          explain: "プライベートからのアウトバウンド専用は<strong>NAT Gateway</strong>。IGW直付けやパブリックIPはインバウンドを晒すので不可。",
        },
        {
          q: "サブネット全体に対してステートレスで特定ポートを遮断し、明示的なDenyも書きたい。使うのは？",
          choices: ["セキュリティグループ", "ネットワークACL(NACL)", "WAF", "ルートテーブル"],
          answer: 1,
          explain: "サブネット境界でステートレス・Deny可能なのは<strong>NACL</strong>。インスタンス単位でステートフルなのはセキュリティグループ。",
        },
      ],
    },
    "vpc-connectivity": {
      quiz: [
        {
          q: "プライベートサブネットのEC2から、NAT経由のインターネットを使わずにS3へアクセスし、データ転送料も避けたい。最適なのは？",
          choices: ["インターフェースエンドポイント", "ゲートウェイVPCエンドポイント(S3)", "NAT Gateway", "IGW"],
          answer: 1,
          explain: "S3/DynamoDBへはルート追加で使える<strong>ゲートウェイエンドポイント</strong>（無料）。他のサービスはPrivateLinkのインターフェース型。",
        },
        {
          q: "数十のVPCとオンプレを、フルメッシュのピアリングを避けてハブ&スポークで一元接続したい。最適なのは？",
          choices: ["VPCピアリングを全対全で", "Transit Gateway", "VPNを各VPCに個別", "PrivateLinkのみ"],
          answer: 1,
          explain: "多数VPC/オンプレのハブ接続は<strong>Transit Gateway</strong>。ピアリングは非推移的でメッシュが爆発する。",
        },
        {
          q: "オンプレ-AWS間で、帯域が安定し一貫した低レイテンシの専用線接続が必要（インターネット非経由）。最適なのは？",
          choices: ["Site-to-Site VPN", "Direct Connect", "Transit Gateway単体", "CloudFront"],
          answer: 1,
          explain: "専用線で一貫した性能は<strong>Direct Connect</strong>。素早く安価なのはVPN（暗号化・ただしインターネット経由）。両者併用でDXの暗号化+冗長も可。",
        },
        {
          q: "Direct Connectを敷設したが、障害時のバックアップ経路も安価に確保したい。最適な構成は？",
          choices: [
            "2本目のDXのみ",
            "Direct Connect＋Site-to-Site VPNをバックアップに",
            "パブリックIPで直接",
            "バックアップ不要",
          ],
          answer: 1,
          explain: "DXの安価なバックアップは<strong>Site-to-Site VPN</strong>を併用。可用性最優先なら2本目のDXだがコスト高。",
        },
        {
          q: "自社のサービスを、相手VPCへIGWやピアリングなしにプライベートに公開したい（相手はENI経由で到達）。最適なのは？",
          choices: ["VPCピアリング", "AWS PrivateLink（インターフェースエンドポイント/エンドポイントサービス）", "Transit Gateway", "パブリックALB"],
          answer: 1,
          explain: "特定サービスだけをプライベート公開するのは<strong>PrivateLink</strong>。VPC全体を結ぶピアリング/TGWとは粒度が違う。",
        },
      ],
    },
    "route53": {
      quiz: [
        {
          q: "プライマリのリージョンが落ちたら、Route 53で自動的にDR用リージョンへ切り替えたい。ヘルスチェックと連動させる。最適なルーティングは？",
          choices: ["加重ルーティング", "フェイルオーバールーティング", "位置情報ルーティング", "複数値回答"],
          answer: 1,
          explain: "ヘルスチェック連動のアクティブ/スタンバイ切替は<strong>フェイルオーバールーティング</strong>。",
        },
        {
          q: "新バージョンへ徐々にトラフィックを10%→50%→100%と移すカナリアリリースをDNSで行いたい。最適なのは？",
          choices: ["加重ルーティング", "レイテンシルーティング", "位置情報ルーティング", "フェイルオーバー"],
          answer: 0,
          explain: "割合でトラフィック配分するのは<strong>加重ルーティング</strong>。カナリア/ブルーグリーンに使える。",
        },
        {
          q: "世界中のユーザーを、最も応答が速いAWSリージョンのエンドポイントへ振り分けたい。最適なのは？",
          choices: ["位置情報ルーティング", "レイテンシベースルーティング", "加重ルーティング", "シンプルルーティング"],
          answer: 1,
          explain: "最小レイテンシのリージョンへ振るのは<strong>レイテンシベースルーティング</strong>。国で固定するなら位置情報ルーティング。",
        },
      ],
    },
    "cloudfront": {
      quiz: [
        {
          q: "有料会員だけに動画を配信し、URLを共有されても一定時間で無効化したい。CloudFrontで使うのは？",
          choices: ["OACだけ", "署名付きURL/署名付きCookie", "パブリックバケット", "WAFのみ"],
          answer: 1,
          explain: "限定配信・期限付きは<strong>署名付きURL/Cookie</strong>。単一ファイルはURL、複数ファイル/セッションはCookieが向く。",
        },
        {
          q: "APIの動的レスポンスにおいて、Cookieやクエリ文字列ごとにキャッシュ挙動を細かく制御したい。現行の推奨は？",
          choices: [
            "Legacyキャッシュ設定のみ",
            "キャッシュポリシー／オリジンリクエストポリシー",
            "TTLを0に固定",
            "CloudFrontを使わない",
          ],
          answer: 1,
          explain: "現行は<strong>キャッシュポリシー/オリジンリクエストポリシー</strong>でヘッダ/Cookie/クエリのキャッシュキーと転送を制御する。",
        },
        {
          q: "エッジで軽量なリクエスト書き換え（ヘッダ付与・URL正規化・A/B振り分け）を低コストで実行したい。最適なのは？",
          choices: ["Lambda@Edge(重い処理)", "CloudFront Functions(軽量・高頻度)", "EC2をエッジに", "API Gateway"],
          answer: 1,
          explain: "超軽量・高頻度のエッジ処理は<strong>CloudFront Functions</strong>。重い処理やネットワークアクセスが要るならLambda@Edge。",
        },
      ],
    },

    /* ================= アプリ統合 ================= */
    "sqs-sns": {
      quiz: [
        {
          q: "1件のイベントを、複数の独立したシステム（在庫・通知・分析）へ同時に配信し、それぞれが自分のペースで処理したい。最適な構成は？",
          choices: [
            "1本のSQSを共有",
            "SNSトピックにパブリッシュし、各システムのSQSをファンアウトでサブスクライブ",
            "Lambdaから順番に呼ぶ",
            "EventBridge Scheduler",
          ],
          answer: 1,
          explain: "1対多の配信＋各自バッファは<strong>SNS→複数SQSのファンアウト</strong>。疎結合で耐障害性が高い。",
        },
        {
          q: "決済処理で、メッセージの順序保証と重複排除（厳密に1回処理）が必須。最適なのは？",
          choices: ["標準キュー", "FIFOキュー", "SNS標準", "Kinesis"],
          answer: 1,
          explain: "順序保証・重複排除は<strong>FIFOキュー</strong>。標準キューは高スループットだが順序はベストエフォート＆最低1回配信。",
        },
        {
          q: "受信側の処理能力を超えるバーストが来てもコンポーネントを守りたい（ロードレベリング）。基本パターンは？",
          choices: ["同期呼び出しを増やす", "SQSでキューイングし、ワーカーが自分のペースで消費", "タイムアウトを短縮", "SNSで即時プッシュ"],
          answer: 1,
          explain: "急増を吸収してバックエンドを守る<strong>ロードレベリング</strong>はSQSの代表用途。ワーカーはAuto Scalingで追随。",
        },
      ],
    },
    "eventbridge": {
      quiz: [
        {
          q: "SaaSやAWSサービスのイベントを、内容(パターン)に応じて複数のターゲットへルーティングし、疎結合なイベント駆動を実現したい。最適なのは？",
          choices: ["SQSポーリング", "EventBridge（イベントバス＋ルール）", "SNSのみ", "CloudTrail"],
          answer: 1,
          explain: "イベントの内容ベースのルーティング/フィルタは<strong>EventBridge</strong>。多数のAWS/SaaSソースと統合できる。",
        },
      ],
    },
    "kinesis-mq": {
      quiz: [
        {
          q: "IoT/クリックストリームを毎秒大量に取り込み、複数のコンシューマが同じストリームを別々に再生・再処理できるようにしたい。最適なのは？",
          choices: ["SQS標準", "Kinesis Data Streams", "SNS", "SES"],
          answer: 1,
          explain: "大量ストリームの取り込み＋複数コンシューマの独立再生（保持期間内の再読み取り）は<strong>Kinesis Data Streams</strong>。",
        },
        {
          q: "既存アプリがRabbitMQ/ActiveMQ（AMQP/MQTT等の標準プロトコル）を使っている。コード変更を最小にAWSへ移したい。最適なのは？",
          choices: ["SQSへ書き換え", "Amazon MQ", "Kinesis", "SNS"],
          answer: 1,
          explain: "標準プロトコルの既存メッセージブローカを最小改修で移すなら<strong>Amazon MQ</strong>。新規はSQS/SNSが基本。",
        },
      ],
    },

    /* ================= 分析 ================= */
    "athena-glue": {
      quiz: [
        {
          q: "S3の生ログをカタログ化してスキーマを自動推定し、サーバレスETLで変換したい。組み合わせとして最適なのは？",
          choices: ["EMRを常時起動", "Glue（クローラでカタログ化＋サーバレスETL）", "Redshiftへ全ロード", "Lambdaのみで全処理"],
          answer: 1,
          explain: "サーバレスETL＋データカタログは<strong>AWS Glue</strong>。クローラでスキーマ推定し、AthenaやRedshift Spectrumから参照できる。",
        },
        {
          q: "Athenaのクエリコスト（スキャン量課金）とレイテンシを下げたい。データ側の最適化として最も効果的なのは？",
          choices: [
            "CSVのまま保存",
            "列指向(Parquet/ORC)へ変換し、パーティション化・圧縮する",
            "1つの巨大ファイルにまとめる",
            "全カラムを常にSELECT *",
          ],
          answer: 1,
          explain: "スキャン量を減らすには<strong>列指向(Parquet)＋パーティション＋圧縮</strong>。必要列だけ読むのでコストと速度が改善。",
        },
      ],
    },
    "emr-os-qs": {
      quiz: [
        {
          q: "既存のSpark/Hadoopジョブ資産を大規模にAWSで動かしたい。マネージドなビッグデータ基盤として最適なのは？",
          choices: ["Athena", "Amazon EMR", "Glueのみ", "Redshift"],
          answer: 1,
          explain: "Spark/Hadoop/Hive/Prestoなどのフレームワークを大規模運用するのは<strong>EMR</strong>。アドホックSQLだけならAthena。",
        },
      ],
    },

    /* ================= 管理・監視 ================= */
    "observability": {
      quiz: [
        {
          q: "EC2のメモリ使用率やアプリのカスタム指標をCloudWatchで監視したい。標準では取れない指標を送るには？",
          choices: [
            "標準メトリクスで十分",
            "CloudWatch Agent（またはカスタムメトリクスのPut）を導入",
            "CloudTrailで取得",
            "Configで取得",
          ],
          answer: 1,
          explain: "メモリ/ディスク等のOS内部やアプリ独自値は<strong>CloudWatch Agent／カスタムメトリクス</strong>で送る。標準ではメモリは取れない。",
        },
        {
          q: "『いつ・誰が・どのAPIを呼んだか』の監査証跡が必要。リソース構成変更の履歴とは区別して、API操作の記録を残すのは？",
          choices: ["CloudWatch Logs", "CloudTrail", "AWS Config", "X-Ray"],
          answer: 1,
          explain: "API操作の監査は<strong>CloudTrail</strong>（誰が何を）。構成の状態/変更履歴・準拠評価は<strong>Config</strong>と役割が異なる。",
        },
        {
          q: "マイクロサービス間の呼び出しでどこがボトルネックか、分散トレースで可視化したい。最適なのは？",
          choices: ["CloudTrail", "AWS X-Ray", "Config", "Macie"],
          answer: 1,
          explain: "分散トレーシングでレイテンシのボトルネックを追うのは<strong>X-Ray</strong>。",
        },
      ],
    },
    "ssm": {
      quiz: [
        {
          q: "プライベートサブネットのEC2に、SSHの22番ポートやbastionを開けずに安全にシェルアクセスし、操作を監査ログに残したい。最適なのは？",
          choices: ["キーペアでSSH", "Systems Manager Session Manager", "パスワードでRDP開放", "パブリックIP付与"],
          answer: 1,
          explain: "ポートを開けずに接続・監査できるのは<strong>Session Manager</strong>。踏み台/22番不要でセキュア。",
        },
        {
          q: "多数のEC2へOSパッチを定期的に一括適用し、準拠状況をレポートしたい。最適なのは？",
          choices: ["手動でログインして更新", "Systems Manager Patch Manager", "AMIを毎回作り直す", "Configルールのみ"],
          answer: 1,
          explain: "パッチの一括適用と準拠レポートは<strong>Patch Manager</strong>（メンテナンスウィンドウで自動化）。",
        },
      ],
    },
    "cost-mgmt": {
      quiz: [
        {
          q: "予算を超えそうなときにメール/アクションで知らせ、部門タグ別に費用を追跡したい。組み合わせとして最適なのは？",
          choices: [
            "請求書を毎月手で確認",
            "AWS Budgets（しきい値アラート）＋コスト配分タグ／Cost Explorer",
            "CloudWatchメトリクスのみ",
            "Trusted Advisorのみ",
          ],
          answer: 1,
          explain: "予算超過アラートは<strong>Budgets</strong>、内訳分析は<strong>Cost Explorer＋コスト配分タグ</strong>。",
        },
        {
          q: "EC2/Fargate/Lambdaにまたがる定常使用へ、1〜3年コミットで柔軟に割引を効かせたい。最適なのは？",
          choices: ["スタンダードRI", "Compute Savings Plans", "スポット", "オンデマンド"],
          answer: 1,
          explain: "EC2/Fargate/Lambda横断で柔軟に効くのは<strong>Compute Savings Plans</strong>。特定インスタンス固定の最大割引はStandard RI。",
        },
      ],
    },

    /* ================= 移行・DR ================= */
    "migration": {
      quiz: [
        {
          q: "OracleからAurora PostgreSQLへ、エンジンをまたいで移行したい。スキーマ変換と継続レプリケーションが必要。組み合わせは？",
          choices: [
            "手動でエクスポート/インポート",
            "AWS SCT（スキーマ変換）＋DMS（データ移行・継続レプリケーション）",
            "Snowball",
            "DataSync",
          ],
          answer: 1,
          explain: "異種DB移行は<strong>SCTでスキーマ変換＋DMSでデータ移行</strong>。同種ならSCT不要でDMS単体。",
        },
        {
          q: "回線が細く、100TBを短期間でAWSへ入れたい。オンライン転送では間に合わない。最適なのは？",
          choices: ["DataSyncでオンライン転送", "Snowball Edge（物理輸送）", "S3 CLIで並列アップロード", "Transfer Family"],
          answer: 1,
          explain: "大容量×細い回線は<strong>Snow ファミリー（物理輸送）</strong>。回線が十分ならDataSyncのオンライン転送。",
        },
        {
          q: "オンプレの多数の仮想サーバを、アプリを作り直さずそのままAWSへ（リホスト/リフト&シフト）移行したい。最適なのは？",
          choices: ["DMS", "AWS Application Migration Service(MGN)", "Glue", "CodeDeploy"],
          answer: 1,
          explain: "サーバの<strong>リフト&シフト（リホスト）</strong>は<strong>Application Migration Service(MGN)</strong>。DBの移行はDMS。",
        },
      ],
    },
    "dr": {
      quiz: [
        {
          q: "コストを最優先し、RTO/RPOは数時間〜半日でも許容できるDR戦略は？",
          choices: ["マルチサイトActive-Active", "ウォームスタンバイ", "パイロットライト", "バックアップ&リストア"],
          answer: 3,
          explain: "最も安いがRTO/RPOが長いのは<strong>バックアップ&リストア</strong>。ほぼ無停止が要るならActive-Active（高コスト）。",
        },
        {
          q: "コアDBだけ最小構成で別リージョンに常時稼働・複製しておき、災害時にアプリ層を起動・拡張して復旧する戦略は？",
          choices: ["バックアップ&リストア", "パイロットライト", "ウォームスタンバイ", "マルチサイト"],
          answer: 1,
          explain: "重要要素（DB等）だけ常時複製し、災害時に残りを起こすのが<strong>パイロットライト</strong>。縮小版フルスタックを常時動かすのがウォームスタンバイ。",
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
    if (a.memorize) m.memorize = m.memorize.concat(a.memorize);
    if (a.flashcards) m.flashcards = m.flashcards.concat(a.flashcards);
    if (a.quiz) m.quiz = m.quiz.concat(a.quiz);
  });
})();
