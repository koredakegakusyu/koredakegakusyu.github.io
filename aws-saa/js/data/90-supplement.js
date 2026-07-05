/* =============================================================
   SAA Forge カリキュラム — 90 補強（追加の本番型問題・境界値の暗記）
   既存ファイルは変更せず、科目IDを指定して quiz/memorize/flashcards を追記する。
   index.html では 11-migration-dr.js の後・app.js の前に読み込む。
   ============================================================= */
(function () {
  var ADD = {
    /* ---------- 土台 ---------- */
    "global-infra": {
      quiz: [
        {
          q: "ある企業が、99.99%の可用性をうたうWebサービスを設計する。コストは抑えたいが、単一AZ障害でサービスが止まることは許されない。最小限で要件を満たす構成は？",
          choices: [
            "1つのAZに冗長なEC2を多数配置する",
            "2つのAZにEC2を分散し、ALBとAuto Scalingで束ねる",
            "3リージョンにフル構成を常時稼働させる",
            "オンプレミスにフェイルオーバーする",
          ],
          answer: 1,
          explain: "単一AZ障害に耐える最小構成は<strong>2つ以上のAZへの分散＋ALB＋Auto Scaling</strong>。マルチリージョン常時稼働は要件に対し過剰でコスト高。",
        },
      ],
    },
    "organizations": {
      quiz: [
        {
          q: "新しく作成される全アカウントで、ルートユーザーによる特定の高リスク操作を組織レベルで一律に禁止したい。最も適切なのは？",
          choices: ["各アカウントのIAMで制御", "SCPで該当操作を拒否(Deny)する", "CloudTrailで検知し事後対応", "Configルールで修復"],
          answer: 1,
          explain: "組織横断で確実に禁止＝<strong>SCP</strong>。SCPはルートユーザーにも効く(管理アカウント自身を除く)。IAMやConfigは抜け・事後対応になりやすい。",
        },
      ],
    },

    /* ---------- 認証・IAM ---------- */
    "iam": {
      memorize: [
        { k: "ポリシー構造", v: "Effect / Action / Resource / Condition。<strong>Condition</strong>でIP・MFA・タグ等の条件付与。" },
        { k: "IAM Access Analyzer", v: "外部から到達可能な<strong>意図しない公開</strong>(S3/ロール等)を検出。" },
      ],
      quiz: [
        {
          q: "特定のS3操作を『社内IPからのアクセス時のみ』許可したい。IAMポリシーで使う要素は？",
          choices: ["Resourceのみで制御", "Condition句(aws:SourceIp)で制限", "NACLで制御", "SCPのみ"],
          answer: 1,
          explain: "条件付き許可は<strong>Condition句</strong>(例 <code>aws:SourceIp</code>)。MFA必須化(<code>aws:MultiFactorAuthPresent</code>)等も同様。",
        },
        {
          q: "オンプレのアプリがAWS APIを呼ぶ。IAMユーザーの長期アクセスキーを使っているが、より安全にしたい。最適な方向性は？",
          choices: [
            "キーをより長く複雑にする",
            "IAM Roles Anywhere等でロールベースの一時認証情報に切り替える",
            "ルートのキーに変更する",
            "キーをコードにハードコードする",
          ],
          answer: 1,
          explain: "長期キーは漏洩・棚卸しが課題。<strong>ロールベースの一時認証情報</strong>へ寄せるのがベストプラクティス。",
        },
      ],
    },

    /* ---------- セキュリティ ---------- */
    "kms": {
      quiz: [
        {
          q: "複数リージョンにまたがるアプリで、同一の鍵マテリアルを使って各リージョンで暗号化/復号したい。最適なKMSの機能は？",
          choices: ["各リージョンで無関係なCMKを作る", "マルチリージョンキー(Multi-Region Keys)", "CloudHSMを各リージョンに", "SSE-S3を使う"],
          answer: 1,
          explain: "リージョン跨ぎで同一鍵を扱うのは<strong>KMSマルチリージョンキー</strong>。通常のCMKはリージョン固有。",
        },
      ],
    },

    /* ---------- コンピューティング ---------- */
    "ec2": {
      memorize: [
        { k: "ユーザーデータ実行", v: "<strong>初回起動時に1回</strong>(既定)。再起動では再実行されない。" },
        { k: "ハイバネーション", v: "メモリ状態を保持して停止/再開。起動の高速化。" },
      ],
      quiz: [
        {
          q: "Auto Scalingで起動する全インスタンスに、最新のアプリと設定を毎回自動で適用したい。最も運用しやすい方法は？",
          choices: [
            "起動のたびに手動でSSHして設定",
            "設定込みのカスタムAMIを作り、起動テンプレートで使う(必要に応じユーザーデータ併用)",
            "各インスタンスにElastic IPを付ける",
            "インスタンスストアに保存する",
          ],
          answer: 1,
          explain: "再現性のある自動構成は<strong>カスタムAMI＋起動テンプレート</strong>(＋初期化のユーザーデータ)。手動SSHはスケールに不向き。",
        },
      ],
    },
    "ec2-pricing": {
      quiz: [
        {
          q: "ステートレスなWebワーカー群を、コストを最大限抑えつつ運用したい。多少のインスタンス中断は他ノードとオートスケールで吸収できる。最適な構成は？",
          choices: [
            "全てオンデマンド",
            "Auto Scalingでスポットインスタンスを主体に運用(複数インスタンスタイプで中断耐性を確保)",
            "全て3年リザーブド",
            "Dedicated Hosts",
          ],
          answer: 1,
          explain: "中断耐性のあるステートレス処理は<strong>スポット主体＋複数タイプで分散</strong>が最安。中断は他ノード/スケールで吸収。",
        },
        {
          q: "リザーブドインスタンスのうち、後からインスタンスファミリーやOSを変更できる柔軟なタイプは？",
          choices: ["Standard RI", "Convertible RI", "スポット", "Dedicated"],
          answer: 1,
          explain: "<strong>Convertible RI</strong>は属性変更が可能(割引率はStandardより低い)。Standard RIは変更不可だが割引率が高い。",
        },
      ],
    },
    "elb-asg": {
      memorize: [
        { k: "NLBの送信元IP", v: "NLBは<strong>クライアントの送信元IPを保持</strong>(ALBはX-Forwarded-Forで伝達)。" },
        { k: "接続ドレイン", v: "<strong>登録解除の遅延(Deregistration Delay)</strong>で処理中リクエストを待ってから外す。" },
        { k: "クールダウン/ウォームアップ", v: "スケール直後の連続増減を抑える待機。ヘルスチェック猶予で起動中の誤検知を防ぐ。" },
      ],
      quiz: [
        {
          q: "デプロイ時に、処理中のリクエストを途切れさせずにインスタンスをAuto Scalingから安全に外したい。設定すべきは？",
          choices: ["可視性タイムアウト", "登録解除の遅延(接続ドレイン)", "スティッキーセッション", "クロスゾーン負荷分散"],
          answer: 1,
          explain: "処理中リクエストを待ってから外すのは<strong>登録解除の遅延(接続ドレイン)</strong>。",
        },
        {
          q: "バックエンドのアプリがクライアントの実際の送信元IPアドレスをそのまま必要とする(L4)。最適なロードバランサーは？",
          choices: ["ALB", "NLB", "Classic LB", "Gateway LB"],
          answer: 1,
          explain: "<strong>NLBは送信元IPを保持</strong>する。ALBはプロキシのためX-Forwarded-Forヘッダー経由でしか伝わらない。",
        },
      ],
    },
    "lambda": {
      memorize: [
        { k: "メモリと制限", v: "メモリ<strong>128MB〜10,240MB</strong>(CPUは比例)。タイムアウト最大<strong>15分</strong>。/tmpは512MB〜10GB。" },
        { k: "同時実行の上限", v: "アカウント既定は地域ごとに上限あり。予約済み同時実行で重要関数の枠を確保。" },
      ],
      quiz: [
        {
          q: "Lambda関数の処理が重く、CPU性能が不足して遅い。コードは変えずに高速化したい。最も簡単な方法は？",
          choices: ["タイムアウトを延ばす", "割り当てメモリを増やす(CPUが比例して増える)", "VPCに入れる", "予約済み同時実行を0にする"],
          answer: 1,
          explain: "Lambdaは<strong>メモリに比例してCPUも増える</strong>。メモリ増で処理が速くなることが多い(短縮で総コストが下がる場合も)。",
        },
        {
          q: "16分かかるバッチ処理をサーバーレスで実行したい。Lambdaの制限に抵触する。代替として最適なのは？",
          choices: ["Lambdaのタイムアウトを延長", "AWS Fargate(コンテナ)やStep Functionsで分割", "EC2スポットでのみ実行", "API Gatewayのタイムアウトを延ばす"],
          answer: 1,
          explain: "Lambdaは<strong>最大15分</strong>。超える処理は<strong>Fargate</strong>等の常駐基盤か、Step Functionsで分割する。",
        },
      ],
    },

    /* ---------- ストレージ ---------- */
    "s3": {
      memorize: [
        { k: "アップロード上限", v: "1オブジェクト最大<strong>5TB</strong>。単一PUTは最大5GB、<strong>大きいファイルはマルチパートアップロード</strong>。" },
        { k: "整合性", v: "<strong>強い読み取り整合性</strong>(書き込み直後も最新を取得)。" },
        { k: "性能", v: "プレフィックス毎に<strong>3,500 PUT / 5,500 GET /秒</strong>。プレフィックス分散でスケール。" },
      ],
      quiz: [
        {
          q: "5GBを超える大きなファイルをS3へ確実かつ高速にアップロードしたい。最適な方法は？",
          choices: ["単一PUTで送る", "マルチパートアップロードを使う", "EBSに保存する", "圧縮して1GB未満にする"],
          answer: 1,
          explain: "大容量は<strong>マルチパートアップロード</strong>(並列・再送可・5GB超で必須)。単一PUTは5GBが上限。",
        },
        {
          q: "あるバケットへの書き込み直後に同じオブジェクトを読み取ると、必ず最新の内容が返ることを保証したい。S3の挙動は？",
          choices: ["結果整合性のため保証されない", "強い読み取り整合性により最新が返る", "バージョニングが必須", "Glacierが必要"],
          answer: 1,
          explain: "現在のS3は<strong>強い読み取り整合性</strong>を提供し、PUT直後のGETでも最新が返る。",
        },
      ],
    },
    "s3-classes": {
      memorize: [
        { k: "最小保管期間", v: "IA=<strong>30日</strong>、Glacier Flexible=90日、Deep Archive=180日(早期削除は日割り課金)。" },
        { k: "取り出し時間", v: "Glacier Instant=即時 / Flexible=数分〜数時間 / Deep Archive=<strong>最大約12時間</strong>。" },
      ],
      quiz: [
        {
          q: "頻繁にアクセスするが、30日後にはほぼ読まれなくなり、1年後は監査時のみ参照されるデータがある。コストを最小化する設定は？",
          choices: [
            "全期間Standardのまま",
            "ライフサイクルで30日後にStandard-IA、その後Glacierへ移行",
            "最初からDeep Archiveに置く",
            "One Zone-IAに固定",
          ],
          answer: 1,
          explain: "アクセス頻度の変化に合わせ<strong>ライフサイクルで段階的にクラス移行</strong>するのがコスト最適。最初からDeep Archiveだと頻繁アクセス期に取り出しコスト/遅延が問題。",
        },
      ],
    },
    "block-file": {
      memorize: [
        { k: "gp3の基準性能", v: "ベースライン<strong>3,000 IOPS / 125 MB/s</strong>。容量と独立してIOPS/スループットを増設可。" },
        { k: "スナップショット", v: "<strong>増分</strong>でS3保存。別AZ/別リージョンへコピー可。暗号化スナップから暗号化ボリューム。" },
        { k: "EBS Multi-Attach", v: "<strong>io1/io2</strong>を同一AZの複数EC2に接続(クラスタ対応アプリ向け)。" },
      ],
      quiz: [
        {
          q: "汎用的なワークロード向けに、コストと性能のバランスが良く、容量とは独立してIOPS/スループットを調整できるEBSタイプは？",
          choices: ["gp2", "gp3", "io2", "sc1"],
          answer: 1,
          explain: "<strong>gp3</strong>は容量と独立してIOPS/スループットを増減でき、gp2よりコスト効率も良い(まずgp3)。",
        },
      ],
    },

    /* ---------- データベース ---------- */
    "rds": {
      memorize: [
        { k: "自動バックアップ保持", v: "最大<strong>35日</strong>。ポイントインタイムリカバリ可。手動スナップショットは任意期間。" },
        { k: "リードレプリカ昇格", v: "リードレプリカは<strong>単独DBへ昇格</strong>可(限定的なDR/移行に活用)。" },
      ],
      quiz: [
        {
          q: "RDSで、誤操作による削除から数日前の任意時点へ復元できるようにしたい。設定すべきは？",
          choices: ["リードレプリカを増やす", "自動バックアップ(保持期間)を有効化しPITRを使う", "Multi-AZにする", "スナップショットを取らない"],
          answer: 1,
          explain: "任意時点復元は<strong>自動バックアップ＋ポイントインタイムリカバリ</strong>。Multi-AZは可用性、リードレプリカは読み取り分散で目的が異なる。",
        },
        {
          q: "グローバル展開アプリで、別リージョンの読み取りを低遅延にしつつ、リージョン障害時のDRも兼ねたい。Auroraで最適なのは？",
          choices: ["Multi-AZのみ", "Aurora Global Database", "リードレプリカを同一リージョンに追加", "DynamoDBに移行"],
          answer: 1,
          explain: "別リージョンへの低遅延複製＋DRは<strong>Aurora Global Database</strong>(高速フェイルオーバー・小さなRPO)。",
        },
      ],
    },
    "dynamodb": {
      memorize: [
        { k: "項目サイズ上限", v: "1項目<strong>400KB</strong>。大きなデータはS3に置きキーを格納。" },
        { k: "読み取り整合性", v: "既定は<strong>結果整合性(安い)</strong>。必要時のみ<strong>強い整合性</strong>(コスト/遅延増)。" },
        { k: "PITR", v: "ポイントインタイムリカバリで35日以内に復元可。" },
      ],
      quiz: [
        {
          q: "DynamoDBのコストを抑えたい。アプリの多くの読み取りは『最新でなくても許容できる』。最適な設定は？",
          choices: ["全て強い整合性読み取り", "結果整合性読み取りを既定にする", "DAXを必ず使う", "GSIを全項目に作る"],
          answer: 1,
          explain: "<strong>結果整合性読み取り</strong>は強い整合性の約半分のコスト。最新が必須の箇所だけ強い整合性にする。",
        },
        {
          q: "DynamoDBに1MBの画像バイナリを項目として保存しようとして失敗する。最適な設計は？",
          choices: ["項目を分割して複数行に", "画像はS3に保存しDynamoDBにはS3キーを格納", "RDSに移行", "圧縮して400KB未満に無理に収める"],
          answer: 1,
          explain: "項目上限は<strong>400KB</strong>。大きなオブジェクトは<strong>S3に置き、DynamoDBには参照(キー)を格納</strong>するのが定石。",
        },
      ],
    },

    /* ---------- ネットワーキング ---------- */
    "vpc": {
      memorize: [
        { k: "NACLは双方向明示", v: "ステートレスゆえ<strong>戻り通信(エフェメラルポート 1024-65535)も許可</strong>が必要。" },
        { k: "SGの既定", v: "インバウンドは<strong>既定で全拒否</strong>、アウトバウンドは全許可。SG同士を参照可。" },
        { k: "サブネットとAZ", v: "1サブネット＝1AZ。複数AZにサブネットを分けて冗長化。" },
      ],
      quiz: [
        {
          q: "NACLでインバウンドのHTTPを許可したのに応答が返らない。ステートレスなNACLで追加で必要な設定は？",
          choices: ["SGを削除する", "アウトバウンドでエフェメラルポート(1024-65535)を許可する", "IGWを再作成", "サブネットを統合"],
          answer: 1,
          explain: "NACLは<strong>ステートレス</strong>のため、<strong>戻り通信(エフェメラルポート)のアウトバウンド許可</strong>が別途必要。SGはステートフルで不要。",
        },
      ],
    },
    "vpc-connectivity": {
      quiz: [
        {
          q: "プライベートサブネットのEC2群が、CloudWatchやSSM等の多数のAWSサービスへ、インターネットを経由せずにアクセスしたい。最適なのは？",
          choices: ["NAT Gatewayを増設", "Interfaceエンドポイント(PrivateLink)を作成", "Elastic IPを付与", "パブリックサブネットへ移動"],
          answer: 1,
          explain: "S3/DynamoDB以外の多数サービスへのプライベート接続は<strong>Interfaceエンドポイント(PrivateLink)</strong>。S3/DynamoDBはGatewayエンドポイント(無料)。",
        },
      ],
    },
    "cloudfront": {
      quiz: [
        {
          q: "動画配信で、有料会員にのみ限られた時間だけアクセスを許可したい。CloudFrontで使う仕組みは？",
          choices: ["バケットを公開", "署名付きURL/署名付きCookie", "ライフサイクルルール", "Route 53加重ルーティング"],
          answer: 1,
          explain: "限定・期限付き配信は<strong>署名付きURL(単一ファイル)/署名付きCookie(複数ファイル)</strong>。",
        },
      ],
    },
    "route53": {
      memorize: [
        { k: "Aliasレコード", v: "<strong>ゾーン頂点(apex, example.com)</strong>でもAWSリソースを指せる(CNAMEはapex不可)。" },
      ],
      quiz: [
        {
          q: "独自ドメインの頂点(example.com)を、ALBに向けたい。CNAMEは頂点に使えない。最適なのは？",
          choices: ["CNAMEレコード", "Aliasレコード(Aレコードのエイリアス)", "TXTレコード", "MXレコード"],
          answer: 1,
          explain: "頂点ドメインをAWSリソースに向けるのは<strong>Aliasレコード</strong>(無料・CNAME制約を回避)。",
        },
      ],
    },

    /* ---------- アプリ統合 ---------- */
    "sqs-sns": {
      memorize: [
        { k: "メッセージ保持", v: "既定<strong>4日</strong>・最大<strong>14日</strong>。メッセージ最大256KB(大きいデータはS3参照)。" },
        { k: "可視性タイムアウト", v: "既定30秒・最大12時間。処理時間より長く設定し二重処理を防ぐ。" },
        { k: "ロングポーリング", v: "最大20秒待機して空受信を減らしコスト削減。" },
      ],
      quiz: [
        {
          q: "SQSのワーカーが処理に時間がかかり、可視性タイムアウトが切れて他のワーカーが同じメッセージを二重処理してしまう。最適な対策は？",
          choices: ["FIFOに変更", "可視性タイムアウトを処理時間より長く設定する", "メッセージ保持を14日にする", "DLQを削除"],
          answer: 1,
          explain: "二重処理は<strong>可視性タイムアウトを処理時間より長く</strong>することで防ぐ。長すぎると失敗時の再処理が遅れる点に注意。",
        },
        {
          q: "繰り返し処理に失敗するメッセージが、キューを滞留させ他の処理を妨げている。最適な対策は？",
          choices: ["メッセージを手動削除", "DLQ(デッドレターキュー)を設定し一定回数失敗を退避", "保持期間を1日に短縮", "標準からFIFOに変更"],
          answer: 1,
          explain: "失敗を繰り返すメッセージは<strong>DLQ</strong>へ退避し、本流を詰まらせず原因調査・再処理する。",
        },
      ],
    },

    /* ---------- 管理・監視 ---------- */
    "observability": {
      quiz: [
        {
          q: "複数アカウント・複数リージョンのCloudTrailログを、改ざんを防ぎつつ一元的に長期保管したい。最適な構成は？",
          choices: [
            "各アカウントのローカルディスクに保存",
            "組織証跡(Organization Trail)で集約用S3に集め、ログファイル検証とObject Lockを有効化",
            "CloudWatch Logsだけに保存",
            "保存しない",
          ],
          answer: 1,
          explain: "組織全体の証跡は<strong>Organization Trail→集約S3</strong>。<strong>ログファイル検証＋Object Lock</strong>で改ざん防止・長期保管。",
        },
      ],
    },

    /* ---------- 移行・DR ---------- */
    "dr": {
      quiz: [
        {
          q: "RPOを数秒、RTOを数分に抑えたいが、Active-Activeのフルコストは避けたい。縮小版を常時稼働させ障害時に拡張する戦略は？",
          choices: ["バックアップ&リストア", "パイロットライト", "ウォームスタンバイ", "マルチサイト"],
          answer: 2,
          explain: "縮小版を常時稼働し障害時にスケールするのは<strong>ウォームスタンバイ</strong>。パイロットライトより速く、マルチサイトより安い。",
        },
      ],
    },
    "migration": {
      quiz: [
        {
          q: "オンプレからAWSへ、数十TBのデータを『継続的に』同期し続け、最終切替時の差分を最小化したい。最適なサービスは？",
          choices: ["Snowball", "DataSync(継続同期)", "S3 CLIで一括", "Storage Gatewayのテープ"],
          answer: 1,
          explain: "回線経由で<strong>継続的に高速同期＝DataSync</strong>。Snowは一括の物理輸送向きで継続同期には不向き。",
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
