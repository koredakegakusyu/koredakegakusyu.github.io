/* =============================================================
   コレダケAWS SAA — 92 本番想定 実戦ドリル（追加分・オリジナル作問）
   SAA-C03 の高難度シナリオ論点を各科目に concat で追加する。
   すべてオリジナルの作問（標準的なAWSのベストプラクティスを本番形式で出題）。
   index.html では 91-exam-plus.js の後・compare.js の前に読み込む。
   ============================================================= */
(function () {
  var ADD = {
    /* ===== コンピュート：HPC / EFA / ParallelCluster ===== */
    ec2: {
      quiz: [
        {
          q: "創薬シミュレーションを行う研究機関が、数百ノードで<strong>密結合(MPI)</strong>の並列計算をEC2上で実行したい。ノード間通信のレイテンシがボトルネックである。運用の手間を抑えつつ性能を最大化する構成はどれか。",
          choices: [
            "スプレッド配置グループにEC2を分散し、標準ENIで接続する",
            "クラスタ配置グループ＋EFAでノードを構成し、AWS ParallelClusterで管理する",
            "複数リージョンにEC2を分散し、VPCピアリングで接続する",
            "各ノードをLambdaに置き換え、EventBridgeで並列起動する",
          ],
          answer: 1,
          explain: "密結合HPCの鉄板は<strong>クラスタ配置グループ(同一AZ密集)＋EFA(低遅延NW IF)</strong>。クラスタ構築・スケジューラは<strong>AWS ParallelCluster</strong>に任せると運用が軽い。スプレッドは可用性重視で帯域最大化には不向き、リージョン分散は逆に遅延増、MPIはLambdaでは実現しない。",
        },
      ],
    },

    /* ===== Beanstalk・Batch・Lightsail：バッチ処理の最適解 ===== */
    "beanstalk-batch": {
      quiz: [
        {
          q: "オンプレのWindowsバッチ処理(1日1回・最大1時間)をAWSへ移行する。ジョブのキュー管理やインスタンスの起動停止といった運用負荷を極力なくしたい。最適なのはどれか。",
          choices: [
            "常時起動のEC2フリートをAuto Scalingで用意し、cronで実行する",
            "AWS Batch でジョブを定義し、EventBridge の日次スケジュールで起動する",
            "Step Functions で状態遷移を作り、EC2 を常時起動して待機させる",
            "EKSクラスタを常時稼働させ、CronJob で実行する",
          ],
          answer: 1,
          explain: "『キュー管理・コンピュート起動停止まで丸ごと任せたい』バッチは<strong>AWS Batch</strong>が最適。ジョブ実行時だけ計算資源が起動し、<strong>EventBridgeスケジュール</strong>で定期起動できる。EC2/EKSの常時起動は待機コストと運用負荷が無駄。",
        },
        {
          q: "AWS Batch でコンテナ化した短時間ジョブを大量に流したい。EC2インスタンスの管理そのものを無くし、ジョブ単位で必要な分だけ課金される実行環境にしたい。コンピュート環境として選ぶべきは？",
          choices: ["EC2オンデマンドのマネージド型", "Fargate", "専有ホスト(Dedicated Host)", "Lightsailインスタンス"],
          answer: 1,
          explain: "サーバー管理を無くし<strong>ジョブ単位のサーバーレス実行</strong>にするなら AWS Batch の<strong>Fargate</strong>コンピュート環境。EC2型はインスタンス群の管理が残る。",
        },
      ],
    },

    /* ===== RDS：RDS Proxy（Lambda×RDBの接続枯渇対策） ===== */
    rds: {
      quiz: [
        {
          q: "サーバーレスアプリ(Lambda)が RDS for MySQL に大量アクセスする構成で、同時実行が急増すると<strong>DB接続数が枯渇</strong>してエラーになる。アプリ改修を最小限に、接続を効率化する最適解はどれか。",
          choices: [
            "Lambdaの同時実行数の上限を無制限にする",
            "RDS Proxy を構成し、Lambda から Proxy 経由で接続する",
            "毎回リーダーエンドポイントに直接接続する",
            "DBインスタンスを毎回再起動して接続を解放する",
          ],
          answer: 1,
          explain: "Lambdaの接続嵐には<strong>RDS Proxy</strong>。コネクションを<strong>プール・再利用</strong>して枯渇を防ぎ、フェイルオーバー時間の短縮にも効く。同時実行を無制限にすると悪化する。",
        },
      ],
    },

    /* ===== DynamoDB：DAX の保管時暗号化は作成時のみ ===== */
    dynamodb: {
      quiz: [
        {
          q: "既存の DynamoDB Accelerator (DAX) クラスターで<strong>保管データの暗号化(encryption at rest)</strong>が無効のまま運用されている。暗号化を有効にしたい。正しい対応はどれか。",
          choices: [
            "既存クラスターの設定を編集し、暗号化を後から有効化する",
            "暗号化を有効にした DAX クラスターを新規作成し、切り替える",
            "クラスターを一時停止してから設定で暗号化を有効化する",
            "アプリ側で暗号化してから DAX に書き込むよう変更する",
          ],
          answer: 1,
          explain: "DAX の<strong>保管時暗号化はクラスター作成時にしか設定できない</strong>。後から有効化はできないため、<strong>暗号化有効で作り直して移行</strong>するのが正解。停止→編集や後付けは不可。",
        },
      ],
    },

    /* ===== 分析：クリックストリームのリアルタイム収集・分析 ===== */
    "kinesis-mq": {
      quiz: [
        {
          q: "多数のWebサイトから毎日1TBを超える<strong>クリックストリーム</strong>が発生する。ほぼリアルタイムに収集し、S3に蓄積して分析基盤に載せたい。運用負荷を抑えた構成はどれか。",
          choices: [
            "各サーバーからS3へ直接PUTし、日次でEMRを起動して集計する",
            "Kinesis Data Streams で収集し、Firehose 経由で S3 へ配信、以降を分析する",
            "SQSにためて、EC2バッチが定期的に取り出してS3へ書き込む",
            "CloudWatch Logs に出力し、手動でエクスポートする",
          ],
          answer: 1,
          explain: "大量ストリームのリアルタイム収集は<strong>Kinesis Data Streams</strong>、S3等への配信・変換はフルマネージドの<strong>Data Firehose</strong>。サーバー管理不要でスケールする。自前EC2/EMRの定期起動は運用負荷が高い。",
        },
      ],
    },

    /* ===== S3：署名付きURLで一時的な限定アクセス ===== */
    s3: {
      quiz: [
        {
          q: "パブリックアクセスをブロックした S3 バケットの<strong>特定オブジェクト</strong>を、認証済みの特定ユーザーだけに<strong>一定時間だけ</strong>ダウンロードさせたい。アプリ改修を最小に実現する方法はどれか。",
          choices: [
            "そのオブジェクトだけ公開設定にする",
            "S3の事前署名付きURL(pre-signed URL)を発行して渡す",
            "バケットポリシーで全ユーザーのGetObjectを許可する",
            "オブジェクトをEFSにコピーして共有する",
          ],
          answer: 1,
          explain: "『特定オブジェクトに・特定の人だけ・一時的に』アクセスさせるのは<strong>事前署名付きURL</strong>。発行者の権限で<strong>有効期限付き</strong>のURLを作れ、バケットは非公開のままでよい。公開やポリシー全許可は過剰。",
        },
      ],
    },

    /* ===== 疎結合：順序保証＋重複排除 ===== */
    "sqs-sns": {
      quiz: [
        {
          q: "決済処理を非同期化する。メッセージは<strong>送信順に一度だけ</strong>処理される必要があり、重複処理は許されない。適切なキューはどれか。",
          choices: [
            "SQS標準キュー", "SQS FIFOキュー", "SNS標準トピック", "EventBridgeのデフォルトバス",
          ],
          answer: 1,
          explain: "<strong>順序保証＋重複排除(exactly-once)</strong>が要るなら<strong>SQS FIFOキュー</strong>。標準キューはベストエフォート順序・少なくとも1回配信で重複があり得る。",
        },
      ],
    },

    /* ===== DR：RTO/RPO とコストのバランス ===== */
    dr: {
      quiz: [
        {
          q: "基幹システムのDRを設計する。障害時の<strong>復旧を数分</strong>で完了させたいが、フルの本番同等環境を常時二重に動かすコストは避けたい。最もバランスの良い戦略はどれか。",
          choices: [
            "バックアップ&リストア", "パイロットライト", "ウォームスタンバイ", "マルチサイト(アクティブ/アクティブ)",
          ],
          answer: 2,
          explain: "<strong>縮小版を常時稼働</strong>させておき障害時にスケールアップする<strong>ウォームスタンバイ</strong>が、数分RTOと常時フル二重化コストの中間で最適。マルチサイトは最速だが最も高価、パイロットライトはさらに復旧に時間がかかる。",
        },
      ],
    },

    /* ===== コスト最適化：定常＋スパイクの混在 ===== */
    "cost-mgmt": {
      quiz: [
        {
          q: "あるワークロードは<strong>24時間動く定常分</strong>と、日中だけ増える<strong>中断されても良いスパイク分</strong>から成る。全体のEC2コストを最小化する組み合わせはどれか。",
          choices: [
            "すべてオンデマンドで賄う",
            "定常分をSavings Plans/リザーブド、スパイク分をスポットで賄う",
            "すべてスポットインスタンスで賄う",
            "すべて専有ホストで賄う",
          ],
          answer: 1,
          explain: "<strong>定常＝Savings Plans/RI(割引)</strong>、<strong>中断可のスパイク＝スポット(最大級の割引)</strong>の併用がコスト最適。全部スポットは定常分の中断リスクが高く、全部オンデマンドは割高。",
        },
      ],
    },
  };

  var list = window.CURRICULUM || [];
  Object.keys(ADD).forEach(function (id) {
    var m = null;
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) { m = list[i]; break; } }
    if (!m) return;
    var a = ADD[id];
    if (a.memorize) m.memorize = (m.memorize || []).concat(a.memorize);
    if (a.flashcards) m.flashcards = (m.flashcards || []).concat(a.flashcards);
    if (a.quiz) m.quiz = (m.quiz || []).concat(a.quiz);
  });
})();
