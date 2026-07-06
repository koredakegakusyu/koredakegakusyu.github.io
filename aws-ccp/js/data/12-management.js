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
        h: "監視の3兄弟——CloudWatch・CloudTrail・Config",
        body:
          "<p>名前が似ていて混同しやすい3つを、はっきり区別します。ここはCCPの頻出ポイントです。</p>" +
          "<ul>" +
          "<li><strong>CloudWatch</strong>：CPU使用率やアクセス数などの<strong>数値（メトリクス）を監視</strong>し、しきい値を超えたら<strong>アラームで通知</strong>する。ログの収集もできる（＝<strong>健康状態の監視</strong>）。</li>" +
          "<li><strong>CloudTrail</strong>：<strong>『誰が何の操作をしたか』の履歴</strong>を記録（＝<strong>操作の監査</strong>）。</li>" +
          "<li><strong>Config</strong>：<strong>設定（構成）が正しい状態かを監視</strong>し変更履歴を記録（＝<strong>設定の監視</strong>）。</li>" +
          "</ul>" +
          "<p>合言葉は<strong>『数値＝CloudWatch、操作＝CloudTrail、設定＝Config』</strong>です。</p>",
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
          "<p>手作業のミスを減らし、運用を楽にするサービスです。</p>" +
          "<ul>" +
          "<li><strong>CloudFormation</strong>：<strong>インフラ構成をコード（テンプレート）で定義し、自動で構築・複製</strong>する（Infrastructure as Code）。同じ環境を何度でもボタン一つで作れる。</li>" +
          "<li><strong>Systems Manager</strong>：多数のEC2の<strong>パッチ適用や設定を一括管理</strong>する運用ツール。パラメータストアで設定値も管理。</li>" +
          "<li><strong>Trusted Advisor</strong>：アカウントを自動点検し、<strong>コスト削減・セキュリティ・パフォーマンス・耐障害性・サービス上限の5観点で改善を助言</strong>してくれる。</li>" +
          "</ul>",
      },
    ],
    memorize: [
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
