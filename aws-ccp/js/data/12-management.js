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
    ],
  }
);
