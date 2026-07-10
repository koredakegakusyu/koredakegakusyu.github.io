/* =============================================================
   コレダケ学習AWS CCP — 20 本番想定 実戦ドリル（追加分・オリジナル作問）
   CLF-C02 の4分野を横断する判断問題を各モジュールに concat で追加する。
   すべてオリジナルの作問（標準的なAWSの考え方を本番形式で出題）。
   index.html では 19-exam-plus.js の後・compare.js の前に読み込む。
   ============================================================= */
(function () {
  var ADD = {
    /* ===== クラウドの価値 ===== */
    "ccp-cloud-value": {
      quiz: [
        {
          q: "オンプレミスでは需要ピークに備えてサーバーを多めに買っておく必要があった。クラウドで『使った分だけ払い、需要に応じて増減する』ことで実現される主なメリットはどれか。",
          choices: [
            "物理データセンターを自社所有できる",
            "資本的支出(CapEx)を変動費(OpEx)化し、過剰調達を避けられる",
            "リージョンを物理的に移動できる",
            "OSのライセンスが常に無料になる",
          ],
          answer: 1,
          explain: "先行投資(CapEx)を<strong>従量課金の変動費(OpEx)</strong>に変え、ピークに合わせた<strong>過剰調達を回避</strong>できるのがクラウドの中心的な価値。",
        },
      ],
    },

    /* ===== 責任共有モデル ===== */
    "ccp-shared-responsibility": {
      quiz: [
        {
          q: "責任共有モデルにおいて、EC2インスタンス上で稼働する<strong>ゲストOSのセキュリティパッチ適用</strong>は誰の責任か。",
          choices: ["AWS", "利用者（顧客）", "リージョンの管理者", "AWSサポート"],
          answer: 1,
          explain: "EC2の<strong>ゲストOS・ミドルウェア・アプリの管理／パッチは利用者の責任</strong>（Security “in” the Cloud）。物理・ハイパーバイザ等の基盤側はAWSの責任（Security “of” the Cloud）。",
        },
        {
          q: "責任共有モデルで、常に<strong>AWS側</strong>の責任に含まれるものはどれか。",
          choices: [
            "IAMユーザーへの適切な権限付与",
            "データセンターの物理セキュリティ",
            "S3バケットを公開しない設定",
            "保存するデータの暗号化の実施判断",
          ],
          answer: 1,
          explain: "<strong>物理施設・ハードウェア・グローバルインフラ</strong>はAWSの責任。IAM権限・公開設定・暗号化の実施は利用者側の責任。",
        },
      ],
    },

    /* ===== 料金・請求ツール ===== */
    "ccp-billing": {
      quiz: [
        {
          q: "まだAWSを契約していない段階で、これから構築する構成の<strong>月額見積り</strong>を事前に算出したい。使うべきツールはどれか。",
          choices: ["Cost Explorer", "AWS Pricing Calculator", "AWS Budgets", "Cost and Usage Report"],
          answer: 1,
          explain: "契約前の<strong>事前見積り</strong>は<strong>AWS Pricing Calculator</strong>。Cost Explorerは実績の可視化、Budgetsは予算超過アラート、CURは詳細な実績データ。",
        },
        {
          q: "複数のAWSアカウントを運用する組織が、請求を1つにまとめ、使用量を合算して<strong>ボリューム割引</strong>を受けたい。適切な仕組みはどれか。",
          choices: [
            "各アカウントで個別に支払う",
            "AWS Organizations の一括請求(Consolidated Billing)",
            "アカウントを1つに統合する",
            "リザーブドインスタンスを各アカウントで別々に買う",
          ],
          answer: 1,
          explain: "複数アカウントの請求集約と使用量合算による割引は<strong>Organizationsの一括請求</strong>。アカウントは分けたまま管理でき、RI/SPの共有メリットも得られる。",
        },
      ],
    },

    /* ===== サポートプラン ===== */
    "ccp-support": {
      quiz: [
        {
          q: "本番ワークロードを運用する企業が、<strong>専任のテクニカルアカウントマネージャー(TAM)</strong>による積極的な支援と、最短の応答時間を求めている。最低限必要なサポートプランはどれか。",
          choices: ["ベーシック", "デベロッパー", "ビジネス", "エンタープライズ"],
          answer: 3,
          explain: "<strong>TAM</strong>が付くのは<strong>エンタープライズ</strong>プラン（およびEnterprise On-Ramp）。ビジネスは24/365の技術サポートはあるがTAMは付かない。",
        },
      ],
    },

    /* ===== セキュリティサービス ===== */
    "ccp-security-services": {
      quiz: [
        {
          q: "AWSアカウント内の不審なAPIコールや悪意ある挙動を、機械学習で<strong>自動的に脅威検知</strong>したい。マネージドなサービスはどれか。",
          choices: ["AWS WAF", "Amazon GuardDuty", "AWS Shield", "Amazon Inspector"],
          answer: 1,
          explain: "ログを分析して脅威を自動検知するのは<strong>GuardDuty</strong>。WAFはWeb攻撃の防御、ShieldはDDoS対策、InspectorはEC2/コンテナ等の脆弱性診断。",
        },
      ],
    },

    /* ===== IAM ===== */
    "ccp-iam": {
      quiz: [
        {
          q: "AWSアカウントのセキュリティのベストプラクティスとして、<strong>ルートユーザー</strong>の扱いで正しいものはどれか。",
          choices: [
            "日常の作業はルートユーザーで行う",
            "ルートユーザーにMFAを設定し、日常はIAMユーザー/ロールを使う",
            "ルートユーザーのアクセスキーを全開発者に配布する",
            "ルートユーザーのパスワードを無効化する",
          ],
          answer: 1,
          explain: "ルートは<strong>MFAで保護し普段は使わない</strong>。日常作業は必要最小限の権限を持つ<strong>IAMユーザー/ロール</strong>で行うのが鉄則。ルートのアクセスキーは作らない・配布しない。",
        },
      ],
    },

    /* ===== コンピューティング ===== */
    "ccp-compute": {
      quiz: [
        {
          q: "サーバーの管理をせず、コードを<strong>イベント発生時にだけ実行</strong>し、実行時間に対してのみ課金される方式を使いたい。適切なサービスはどれか。",
          choices: ["Amazon EC2", "AWS Lambda", "Amazon EBS", "AWS Direct Connect"],
          answer: 1,
          explain: "サーバー管理不要・イベント駆動・実行時間課金の<strong>サーバーレス</strong>実行は<strong>AWS Lambda</strong>。EC2は仮想サーバーで運用管理が伴う。",
        },
      ],
    },

    /* ===== ストレージ ===== */
    "ccp-storage": {
      quiz: [
        {
          q: "アクセス頻度が低く、数か月に一度しか参照しないログを<strong>できるだけ安価に長期保管</strong>したい。適切なS3ストレージクラスはどれか。",
          choices: [
            "S3 標準",
            "S3 Glacier 系（アーカイブ向け）",
            "S3 標準-IA を高頻度アクセスで",
            "EBS ボリューム",
          ],
          answer: 1,
          explain: "めったにアクセスしない<strong>長期アーカイブは Glacier 系</strong>が最安。標準は高頻度向けで割高、EBSはEC2にアタッチするブロックストレージで用途が違う。",
        },
      ],
    },

    /* ===== データベース ===== */
    "ccp-database": {
      quiz: [
        {
          q: "スキーマが固定的で、<strong>SQLと表結合</strong>を使う既存アプリのデータベースをマネージドで運用したい。適切なサービスはどれか。",
          choices: ["Amazon DynamoDB", "Amazon RDS", "Amazon S3", "Amazon Redshift"],
          answer: 1,
          explain: "SQL・リレーショナル(表結合)のマネージドDBは<strong>RDS</strong>。DynamoDBはキーバリュー/NoSQL、Redshiftはデータウェアハウス(分析)向け。",
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
