/* =============================================================
   コレダケAWS CCP カリキュラム — 07 コンプライアンスとガバナンス
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-compliance", domain: "セキュリティ", icon: "📋", title: "コンプライアンスとガバナンス",
    intro: "監査ログのCloudTrail、構成監視のConfig、複数アカウント統制のOrganizations、監査資料のArtifact。",
    understand: [
      {
        h: "『誰が何をしたか』と『設定が正しいか』——CloudTrailとConfig",
        body:
          "<p>クラウドを安全に運用するには、記録と監視が欠かせません。名前が似た2つを区別します。</p>" +
          "<ul>" +
          "<li><strong>CloudTrail</strong>：<strong>『誰が・いつ・何の操作をしたか』というAPI操作の履歴</strong>を記録する。監査や不正調査に使う（＝<strong>操作ログ</strong>）。</li>" +
          "<li><strong>Config</strong>：<strong>リソースの設定（構成）が、決めたルールに従っているかを継続的に監視・記録</strong>する。設定変更の履歴も追える（＝<strong>構成の監視</strong>）。</li>" +
          "</ul>" +
          "<p>混同注意：<strong>『操作の履歴』＝CloudTrail</strong>、<strong>『設定の状態と変化』＝Config</strong>。あわせて、リソースの状態を数値で監視するのが後の章で学ぶ<strong>CloudWatch</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">CloudTrail と Config の違い</text>' +
          '<rect x="28" y="42" width="252" height="98" rx="9" fill="#dce8f3" stroke="#4a7fa8"/>' +
          '<text x="154" y="66" fill="#34567a" font-size="13" font-weight="800" text-anchor="middle">CloudTrail</text>' +
          '<text x="154" y="92" fill="#23252b" font-size="11" text-anchor="middle">「誰が・いつ・何をしたか」</text>' +
          '<text x="154" y="112" fill="#23252b" font-size="11" text-anchor="middle">＝ 操作（API）の履歴を記録</text>' +
          '<text x="154" y="130" fill="#6b6e76" font-size="9.5" text-anchor="middle">監査・不正調査に使う</text>' +
          '<rect x="300" y="42" width="252" height="98" rx="9" fill="#dcecdd" stroke="#5c9160"/>' +
          '<text x="426" y="66" fill="#366b3c" font-size="13" font-weight="800" text-anchor="middle">Config</text>' +
          '<text x="426" y="92" fill="#23252b" font-size="11" text-anchor="middle">「設定は正しい状態か」</text>' +
          '<text x="426" y="112" fill="#23252b" font-size="11" text-anchor="middle">＝ 構成を監視し変更履歴を記録</text>' +
          '<text x="426" y="130" fill="#6b6e76" font-size="9.5" text-anchor="middle">ルール逸脱を検出</text>' +
          "</svg>",
        cap: "CloudTrail＝操作（誰が何をした）の履歴。Config＝設定（構成）が正しいかの監視。混同注意。",
      },
      {
        h: "複数アカウントの統制と監査資料——OrganizationsとArtifact",
        body:
          "<p>会社では部署ごとに複数のAWSアカウントを持つことが多く、これを<strong>まとめて管理・統制</strong>するのが<strong>AWS Organizations</strong>です。<strong>請求をまとめて一括支払い（コスト削減にも有効）</strong>し、<strong>SCP（サービスコントロールポリシー）</strong>で「このアカウントでは特定の操作を禁止」といった<strong>上限のガードレール</strong>を全体にかけられます。</p>" +
          "<p>第三者認証（ISO、SOCなど）の<strong>コンプライアンス報告書・監査資料をダウンロード</strong>できるのが<strong>AWS Artifact</strong>。監査や取引先への提出に使います。マネジメントコンソール上で総合的なセキュリティ状態を確認する<strong>Security Hub</strong>もあります。</p>",
      },
    ],
    memorize: [
      { k: "CloudTrail", v: "『誰が・いつ・何の操作をしたか』API操作の履歴を記録。監査・不正調査。" },
      { k: "Config", v: "リソースの設定（構成）がルールに従うか継続監視し変更履歴を記録。" },
      { k: "Organizations", v: "複数アカウントを統合管理。一括請求とSCPによる統制。" },
      { k: "SCP", v: "サービスコントロールポリシー。アカウントに操作の上限（ガードレール）を設定。" },
      { k: "Artifact", v: "ISO/SOC等のコンプライアンス報告書・監査資料をダウンロードできる。" },
      { k: "Security Hub", v: "セキュリティの状態を一元的に集約・確認する。" },
    ],
    flashcards: [
      { q: "CloudTrailとConfigの違いは？", a: "CloudTrailは『誰が何の操作をしたか』というAPI操作の履歴、Configは『リソースの設定が正しい状態か』という構成の監視。" },
      { q: "複数のAWSアカウントをまとめて管理し、一括請求やSCPによる統制を行うサービスは？", a: "AWS Organizations。" },
      { q: "SCP（サービスコントロールポリシー）の役割は？", a: "Organizations配下のアカウントに対し、許可できる操作の上限（ガードレール）を設定する。" },
      { q: "ISOやSOCなどの第三者認証の監査報告書を入手できるサービスは？", a: "AWS Artifact。" },
    ],
    quiz: [
      {
        q: "AWSアカウント内で『誰が・いつ・どのAPI操作を行ったか』を記録し、監査や不正調査に利用できるサービスはどれか。",
        choices: ["AWS Config", "AWS CloudTrail", "Amazon CloudWatch", "AWS Artifact"],
        answer: 1,
        explain: "API操作の履歴（誰が何をしたか）を記録するのは<strong>CloudTrail</strong>。設定の監視はConfig。",
      },
      {
        q: "複数のAWSアカウントを一元管理し、請求をまとめたり、SCPで操作を制限したりできるサービスはどれか。",
        choices: ["AWS Organizations", "AWS IAM", "Amazon Inspector", "AWS Trusted Advisor"],
        answer: 0,
        explain: "複数アカウントの統合管理・一括請求・SCPによる統制は<strong>AWS Organizations</strong>。",
      },
      {
        q: "ISO 27001やSOCレポートなど、AWSの第三者認証やコンプライアンスに関する報告書をオンラインで取得できるサービスはどれか。",
        choices: ["AWS Artifact", "AWS Config", "Amazon Macie", "AWS Shield"],
        answer: 0,
        explain: "コンプライアンス報告書・監査資料の入手は<strong>AWS Artifact</strong>。",
      },
    ],
  }
);
