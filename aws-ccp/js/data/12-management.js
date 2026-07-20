/* =============================================================
   コレダケAWS CCP カリキュラム — 12 管理・モニタリング・自動化
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-management", domain: "技術とサービス", icon: "📈", title: "管理・モニタリング・自動化",
    intro: "監視のCloudWatch、構成の自動化CloudFormation、運用のSystems Manager、助言のTrusted Advisor。",
    understand: [
      {
        h: "ガバナンス・最適化の補強——Service Catalog・License Manager・Control Tower・Compute Optimizer",
        body: "<ul><li><strong>AWS Service Catalog</strong>：管理者が<strong>承認済みの構成（テンプレート）だけを一覧化</strong>し、利用者はそこから選んで展開。使えるリソースを統制（ガバナンス）できる。</li><li><strong>AWS License Manager</strong>：ソフトウェアの<strong>ライセンスを一元管理</strong>。持ち込みライセンス（BYOL/BYOS）の利用状況を追跡し超過を防ぐ。</li><li><strong>AWS Control Tower</strong>：<strong>複数アカウントのセキュアな環境を、ベストプラクティスに沿って自動でセットアップ・統制</strong>（ランディングゾーン）。</li><li><strong>AWS Compute Optimizer</strong>：機械学習で<strong>EC2などの適正なサイズ（過剰/過小）を提案</strong>し、コストと性能を最適化。</li></ul>",
        cap: "承認済み構成の統制＝Service Catalog、ライセンス管理＝License Manager、複数アカウント自動統制＝Control Tower、適正サイズ提案＝Compute Optimizer。",
      },

      {
        h: "監視の3兄弟——CloudWatch・CloudTrail・Config",
        body:
          "<p>名前が似ていて混同しやすい 3 つを、はっきり区別します。ここは CCP の<strong>頻出ポイント</strong>で、シナリオ問題で『どれを使うか』が問われます。</p>" +
          "<ul>" +
          "<li><strong>CloudWatch</strong>：CPU 使用率・メモリ・アクセス数などの<strong>数値（メトリクス）を継続的に監視</strong>し、しきい値を超えたら<strong>アラームで通知</strong>したり Auto Scaling を起動したりします。ログの収集・可視化（ダッシュボード）もできます。ひとことで言えば<strong>システムの“健康状態”の監視</strong>です。</li>" +
          "<li><strong>CloudTrail</strong>：<strong>『いつ・誰が・何の操作（API 呼び出し）をしたか』の履歴を記録</strong>します。『誰が EC2 を削除したのか』『不審なログインはないか』を後から追跡でき、<strong>操作の監査</strong>に使います。</li>" +
          "<li><strong>Config</strong>：リソースの<strong>設定（構成）が“あるべき状態”になっているかを監視</strong>し、変更の履歴を記録します。『S3 が暗号化されているか』といったルール準拠のチェックに使う、<strong>設定の監視</strong>です。</li>" +
          "</ul>" +
          "<p>合言葉は<strong>『数値＝CloudWatch、操作＝CloudTrail、設定＝Config』</strong>。『誰が消したか調べたい→CloudTrail』『CPU が高い時に通知→CloudWatch』『設定違反を検知→Config』と即答できるようにします。</p>",
        diagram:
          '<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">監視の3兄弟の使い分け</text>' +
          (function () {
            var cards = [
              { n: "CloudWatch", k: "数値", d: "CPU・アクセス数など\nを監視＋アラーム", c: "#dce8f3", st: "#4a7fa8" },
              { n: "CloudTrail", k: "操作", d: "誰が何をしたかの\n履歴を記録(監査)", c: "#f2e7cd", st: "#b28a2e" },
              { n: "Config", k: "設定", d: "構成が正しいか\n監視＋変更履歴", c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", w = 168, h = 108, gap = 18, x0 = 30, y = 38;
            cards.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 28) + '" fill="#23252b" font-size="13.5" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 50) + '" fill="' + p.st + '" font-size="12" font-weight="800" text-anchor="middle">「' + p.k + "」</text>";
              var lines = p.d.split("\n");
              lines.forEach(function (ln, li) { s += '<text x="' + (x + w / 2) + '" y="' + (y + 72 + li * 15) + '" fill="#5a5346" font-size="9.5" text-anchor="middle">' + ln + "</text>"; });
            });
            return s;
          })() +
          "</svg>",
        cap: "数値の監視＝CloudWatch、操作の監査＝CloudTrail、設定の監視＝Config。3つを取り違えない。",
      },
      {
        h: "AWSの操作方法——コンソール・CLI／SDK・そしてIaC",
        body:
          "<p>AWS を操作する方法は 1 つではありません。公式試験ガイドでも『プログラムによるアクセス（API・SDK・CLI）、マネジメントコンソール、Infrastructure as Code などのオプションの決定』が対象スキルに挙がっています。<strong>やりたいことによって使い分ける</strong>のがポイントです。</p>" +
          "<ul>" +
          "<li><strong>マネジメントコンソール</strong>：ブラウザで操作する<strong>画面（GUI）</strong>。クリックで分かりやすく、<strong>学習や一度きりの作業</strong>に向きます。</li>" +
          "<li><strong>AWS CLI</strong>：<strong>コマンドで操作</strong>する方法。手順をスクリプトにまとめて<strong>繰り返し自動実行</strong>できます。ブラウザからすぐ CLI を使える <strong>AWS CloudShell</strong> も用意されています。</li>" +
          "<li><strong>SDK</strong>：Python や Java などの<strong>プログラムのコードから AWS を操作</strong>するための開発キット。アプリに AWS の機能を組み込むときに使います。</li>" +
          "<li><strong>API</strong>：上記すべての<strong>土台</strong>。コンソールも CLI も SDK も、最終的には API を呼んで AWS を動かしています。</li>" +
          "</ul>" +
          "<p>そしてもう一段上の考え方が <strong>IaC（Infrastructure as Code＝コードとしてのインフラ）</strong>です。サーバーやネットワークの構成を<strong>コード（テンプレート）に書いておき、そこから自動で環境を構築</strong>します（AWS では <strong>CloudFormation</strong>）。手作業と違って<strong>何度でも同じ環境を寸分違わず再現でき</strong>、変更履歴もコードとして残ります。</p>" +
          "<p><strong>判断の軸</strong>：<strong>1 回限りの操作</strong>なら手軽なコンソールでよい。しかし<strong>同じ構成を何度も作る・複数環境（開発／本番）を揃える・監査で再現性を示す</strong>必要があるなら <strong>IaC（CloudFormation）</strong>を選ぶ——これが試験で問われる考え方です。</p>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13.5" font-weight="700" fill="#23252b">AWSの操作方法と使い分け</text><rect x="18" y="34" width="126" height="86" rx="9" fill="#dce8f3" stroke="#4a7fa8"/><text x="81" y="56" text-anchor="middle" font-size="11" font-weight="800" fill="#34567a">コンソール</text><text x="81" y="74" text-anchor="middle" font-size="9.5" fill="#6b6e76">ブラウザのGUI</text><text x="81" y="96" text-anchor="middle" font-size="10" fill="#23252b">学習・1回限り</text><rect x="152" y="34" width="126" height="86" rx="9" fill="#f2e7cd" stroke="#b28a2e"/><text x="215" y="56" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5e17">CLI</text><text x="215" y="74" text-anchor="middle" font-size="9.5" fill="#6b6e76">コマンド操作</text><text x="215" y="96" text-anchor="middle" font-size="10" fill="#23252b">スクリプトで自動化</text><rect x="286" y="34" width="126" height="86" rx="9" fill="#dcecdd" stroke="#5c9160"/><text x="349" y="56" text-anchor="middle" font-size="11" font-weight="800" fill="#366b3c">SDK</text><text x="349" y="74" text-anchor="middle" font-size="9.5" fill="#6b6e76">プログラムから</text><text x="349" y="96" text-anchor="middle" font-size="10" fill="#23252b">アプリに組み込む</text><rect x="420" y="34" width="142" height="86" rx="9" fill="#e6ddf3" stroke="#7a55c9"/><text x="491" y="56" text-anchor="middle" font-size="11" font-weight="800" fill="#5a3a9a">IaC (CloudFormation)</text><text x="491" y="74" text-anchor="middle" font-size="9.5" fill="#6b6e76">構成をコード化</text><text x="491" y="96" text-anchor="middle" font-size="10" fill="#23252b">同じ環境を何度でも</text><rect x="18" y="134" width="544" height="30" rx="7" fill="#f7f2ea" stroke="#cbb79a"/><text x="290" y="153" text-anchor="middle" font-size="10.5" fill="#5a5346">すべての土台は <tspan font-weight="700">API</tspan>（コンソールもCLIもSDKも、最後はAPIを呼んでいる）</text><text x="290" y="186" text-anchor="middle" font-size="10" fill="#6b6e76">1回限り→コンソール／繰り返し・再現性が要る→IaC（CloudFormation）</text></svg>',
        cap: "GUI＝コンソール、コマンド＝CLI、プログラム＝SDK、土台＝API。繰り返し・再現性が要るならIaC（CloudFormation）。",
      },
      {
        h: "自動化と運用支援——CloudFormation・Systems Manager・Trusted Advisor",
        body:
          "<p>手作業を減らしてミスを防ぎ、運用を楽にするサービス群です。『同じ環境構築の繰り返し』や『たくさんのサーバーの一括管理』を自動化します。</p>" +
          "<ul>" +
          "<li><strong>CloudFormation</strong>：<strong>インフラ構成をコード（テンプレート）で定義し、自動で構築・複製・削除</strong>できます（Infrastructure as Code）。同じ環境（VPC＋EC2＋RDS 一式など）を<strong>何度でも同じ品質で</strong>ボタン一つで作れるため、手作業の設定ミスがなくなります。</li>" +
          "<li><strong>Systems Manager</strong>：多数の EC2 に対する<strong>パッチ適用・コマンド実行・設定の一括管理</strong>を行う運用ツール。パラメータストアで設定値やパスワードのような情報も安全に管理できます。</li>" +
          "<li><strong>Trusted Advisor</strong>：アカウントを自動で点検し、<strong>①コスト最適化 ②セキュリティ ③パフォーマンス ④耐障害性 ⑤サービス上限</strong>の 5 観点で<strong>改善点を助言</strong>してくれる“健康診断”サービス。使っていない高額リソースや、危険な公開設定などを教えてくれます。</li>" +
          "</ul>" +
          "<p>覚え方：『<strong>環境をコードで自動構築＝CloudFormation</strong>』『<strong>多数のサーバーを一括運用＝Systems Manager</strong>』『<strong>5観点で改善提案＝Trusted Advisor</strong>』。</p>",
      },
    ],
    memorize: [
      { k: "AWS Service Catalog", v: "<strong>承認済み構成だけを一覧化</strong>し利用者に提供＝ガバナンス。" },
      { k: "AWS License Manager", v: "ソフトウェア<strong>ライセンスの一元管理</strong>（BYOL/BYOS追跡）。" },
      { k: "AWS Control Tower", v: "<strong>複数アカウントのセキュア環境を自動セットアップ・統制</strong>。" },
      { k: "AWS Compute Optimizer", v: "MLで<strong>適正なリソースサイズを提案</strong>（過剰/過小の是正）。" },

      { k: "CloudWatch", v: "CPU・アクセス数など数値(メトリクス)を監視しアラーム通知。ログ収集も。" },
      { k: "3兄弟の区別", v: "数値=CloudWatch、操作履歴=CloudTrail、設定監視=Config。" },
      { k: "CloudFormation", v: "インフラをコード(テンプレート)で自動構築・複製(Infrastructure as Code)。" },
      { k: "Systems Manager", v: "多数のEC2のパッチ適用や設定を一括管理する運用ツール。" },
      { k: "Trusted Advisor", v: "コスト・セキュリティ・パフォーマンス・耐障害性・サービス上限の5観点で助言。" },
      { k: "操作方法の使い分け", v: "GUI=<strong>マネジメントコンソール</strong>／コマンド=<strong>CLI</strong>／プログラム=<strong>SDK</strong>／土台=<strong>API</strong>。ブラウザでCLIが使える<strong>CloudShell</strong>も。" },
      { k: "IaC(Infrastructure as Code)", v: "構成を<strong>コードで定義し自動構築</strong>。<strong>1回限り→コンソール／繰り返し・再現性→IaC(CloudFormation)</strong>。" },
    ],
    flashcards: [
      { q: "CloudWatch・CloudTrail・Configの違いは？", a: "CloudWatchは数値（CPU等）の監視とアラーム、CloudTrailは操作履歴の記録（監査）、Configは設定（構成）の監視。" },
      { q: "インフラの構成をコードで定義し、自動で構築・複製できるサービスは？", a: "AWS CloudFormation（Infrastructure as Code）。" },
      { q: "Trusted Advisorが助言する5つの観点は？", a: "コスト最適化・セキュリティ・パフォーマンス・耐障害性（フォールトトレランス）・サービスの上限。" },
      { q: "EC2の使用率が一定値を超えたら通知を受け取りたい。使うサービスは？", a: "Amazon CloudWatch（メトリクス監視＋アラーム）。" },
    ],
    quiz: [
      {
        q: "管理者が、あらかじめ承認した構成のリソースだけを一覧として用意し、利用者にはその中から選んで展開させることで利用リソースを統制したい。適したサービスはどれか。",
        choices: ["AWS CloudFormation", "AWS Config", "AWS Service Catalog", "AWS Organizations"],
        answer: 2,
        explain: "承認済み構成だけを一覧化し利用者に提供して統制するのは<strong>AWS Service Catalog</strong>。CloudFormationは構築の仕組み、Configは構成の記録・評価。",
      },
      {
        q: "自社で購入済みのソフトウェアライセンス（BYOL）をAWS上で活用しつつ、利用状況を追跡して上限超過を防ぎたい。適したサービスはどれか。",
        choices: ["AWS License Manager", "AWS Marketplace", "AWS Service Catalog", "AWS Config"],
        answer: 0,
        explain: "持ち込みライセンス（BYOL/BYOS）を含む<strong>ライセンスの一元管理・追跡</strong>は<strong>AWS License Manager</strong>。Marketplaceは購入・調達の場。",
      },

      {
        q: "EC2インスタンスのCPU使用率などのメトリクスを監視し、しきい値を超えたときにアラームで通知するAWSサービスはどれか。",
        choices: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "AWS Trusted Advisor"],
        answer: 1,
        explain: "数値（メトリクス）の監視とアラームは<strong>Amazon CloudWatch</strong>。操作履歴はCloudTrail、設定監視はConfig。",
      },
      {
        q: "同じ構成のAWS環境を、テンプレート（コード）から何度でも自動的に構築・複製できるサービスはどれか。",
        choices: ["AWS CloudFormation", "Amazon CloudWatch", "AWS Systems Manager", "AWS Config"],
        answer: 0,
        explain: "インフラをコードで自動構築するのは<strong>AWS CloudFormation</strong>。",
      },
      {
        q: "AWSアカウントを自動的に点検し、コスト削減・セキュリティ・パフォーマンス・耐障害性などの観点から改善策を提案してくれるサービスはどれか。",
        choices: ["AWS Trusted Advisor", "Amazon Inspector", "AWS Config", "Amazon Macie"],
        answer: 0,
        explain: "5観点で改善を助言するのは<strong>AWS Trusted Advisor</strong>。",
      },
      {
        q: "開発・検証・本番で「まったく同じ構成」の環境を何度も構築し直す必要がある。手作業による設定ミスをなくし、構成を再現可能にしたい。最も適した方法はどれか。",
        choices: ["マネジメントコンソールで毎回手動作成する", "作業手順書を作り担当者が実行する", "スクリーンショットを残して同じ手順を繰り返す", "AWS CloudFormation でテンプレート化する（IaC）"],
        answer: 3,
        explain: "構成を<strong>コード（テンプレート）で定義して自動構築</strong>するのが <strong>IaC＝CloudFormation</strong>。何度でも同じ環境を再現でき、手作業の設定ミスがなくなる。1回限りの作業ならコンソールでよいが、繰り返し・再現性が必要ならIaCを選ぶ。",
      },
      {
        q: "複数の AWS アカウントを新規に展開するにあたり、セキュリティのベースラインやガードレールを備えた環境を自動でセットアップし、統制したい。適したサービスはどれか。",
        choices: ["Amazon Inspector", "AWS Control Tower", "AWS Config", "Amazon CloudWatch"],
        answer: 1,
        explain: "<strong>複数アカウントのセキュアな環境を自動セットアップし統制</strong>するのが <strong>AWS Control Tower</strong>。Config は設定の監視、Inspector は脆弱性診断、CloudWatch は数値監視で役割が異なる。",
      },
      {
        q: "稼働中の EC2 インスタンスが過剰なスペックになっていないかを分析し、機械学習に基づいて適切なサイズを提案してほしい。適したサービスはどれか。",
        choices: ["AWS Budgets", "AWS CloudTrail", "AWS Compute Optimizer", "AWS Artifact"],
        answer: 2,
        explain: "使用状況を分析して<strong>適切なリソースサイズを提案</strong>するのが <strong>Compute Optimizer</strong>。過剰スペックの是正＝<strong>適切なサイジング（ライトサイジング）</strong>はコスト最適化の基本。",
      },
      {
        q: "毎週決まった手順で行っている AWS の定型作業を、スクリプトにまとめて自動実行できるようにしたい。最も適した操作方法はどれか。",
        choices: ["AWS CLI（コマンドラインインターフェイス）", "AWS マネジメントコンソールで毎回クリック操作する", "AWS Artifact", "AWS Health Dashboard"],
        answer: 0,
        explain: "コマンドで操作でき<strong>スクリプト化して繰り返し自動実行</strong>できるのが <strong>AWS CLI</strong>（ブラウザから使える CloudShell もある）。コンソールはGUIで学習や1回限りの作業向き、プログラムへの組み込みは SDK、これらの土台が API。",
      },
    ],
  }
);
