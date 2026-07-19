/* =============================================================
   コレダケAWS CCP カリキュラム — 06 セキュリティサービス
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-security-services", domain: "セキュリティ", icon: "🛡️", title: "セキュリティサービス",
    intro: "暗号化のKMS、DDoS対策のShield、Web防御のWAF、脅威検知のGuardDutyなど。名前と用途をセットで。",
    understand: [
      {
        h: "セキュリティサービスの補強——Detective・Firewall Manager・Network Firewall",
        body: "<p>基本のセキュリティサービスに加えて、CCP で名前が出る補強サービスです。役割で覚えます。</p><ul><li><strong>Amazon Detective</strong>：GuardDuty などが検知したセキュリティ事象について、<strong>原因や影響範囲を深掘りして調査・分析</strong>します。合言葉は『<strong>検知＝GuardDuty、調査＝Detective</strong>』。</li><li><strong>AWS Firewall Manager</strong>：<strong>複数アカウント・複数リソースの WAF やセキュリティ設定を一元管理</strong>し、ルールを組織全体へ一括適用します。会社全体で防御ルールを統一したいときに使います。</li><li><strong>AWS Network Firewall</strong>：<strong>VPC の境界に置く高度なファイアウォール／IPS</strong>。通信を細かく検査して不正な通信を防ぎます（サーバー単位のセキュリティグループやサブネット単位のネットワークACL より高機能な、VPC 全体の“関所”）。</li></ul>",
        cap: "事象の原因調査＝Detective、複数アカウントのWAF等を一元管理＝Firewall Manager、VPC境界の高度な防御＝Network Firewall。",
      },

      {
        h: "暗号化と秘密情報の管理——KMS・Secrets Manager",
        body:
          "<p>データを守る基本が<strong>暗号化</strong>——中身を鍵がないと読めない状態にすることです。守る対象は 2 種類あり、<strong>保存されているデータ（保管時／at rest）</strong>と<strong>通信中のデータ（転送時／in transit）</strong>の両方を暗号化するのが定石です。この暗号化に使う<strong>鍵を安全に作成・保管・管理</strong>するのが <strong>KMS（Key Management Service）</strong>です。KMS は S3・EBS・RDS など多くのサービスとボタン一つで連携でき、『チェックを入れるだけで暗号化』が実現します。より厳格に、専用の物理ハードウェアで鍵を管理したい場合は <strong>CloudHSM</strong> を使います。</p>" +
          "<p>一方、データベースのパスワードや API キーといった<strong>秘密情報（シークレット）</strong>を安全に保管し、<strong>定期的に自動で更新（ローテーション）</strong>できるのが <strong>Secrets Manager</strong> です。コードに直接パスワードを書かず、Secrets Manager から取り出して使うことで漏えいを防ぎます。単純な設定値や環境変数の保管であれば、無料で使える <strong>Systems Manager パラメータストア</strong>も選べます（自動ローテーションが要るなら Secrets Manager、と使い分けます）。</p>",
      },
      {
        h: "攻撃から守る——Shield・WAF・GuardDuty・Inspector・Macie",
        body:
          "<p>用途別に守るサービスがあります。名前だけで役割を判断できるようにします。</p>" +
          "<ul>" +
          "<li><strong>Shield</strong>：<strong>DDoS攻撃</strong>（大量アクセスでサービスを止める攻撃）から守る。標準のStandardは無料で自動適用、Advancedは有料でより手厚い。</li>" +
          "<li><strong>WAF（Web Application Firewall）</strong>：<strong>Webアプリへの攻撃</strong>（SQLインジェクション等）を、ルールに基づいて防ぐ。</li>" +
          "<li><strong>GuardDuty</strong>：ログを分析して<strong>不審な挙動・脅威を自動で検知</strong>する見張り役。</li>" +
          "<li><strong>Inspector</strong>：EC2やコンテナの<strong>脆弱性（弱点）を自動診断</strong>する。</li>" +
          "<li><strong>Macie</strong>：S3内の<strong>個人情報などの機密データを見つけて</strong>保護を助ける。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 580 210" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">セキュリティサービスの役割で分ける</text>' +
          (function () {
            var items = [
              { n: "KMS", d: "暗号鍵の管理", c: "#dce8f3", st: "#4a7fa8" },
              { n: "Secrets Manager", d: "秘密情報の保管・更新", c: "#dce8f3", st: "#4a7fa8" },
              { n: "Shield", d: "DDoS攻撃から防御", c: "#f7dfd6", st: "#c26b4a" },
              { n: "WAF", d: "Webアプリ攻撃を防御", c: "#f7dfd6", st: "#c26b4a" },
              { n: "GuardDuty", d: "脅威・不審挙動の検知", c: "#f2e7cd", st: "#b28a2e" },
              { n: "Inspector", d: "脆弱性の自動診断", c: "#f2e7cd", st: "#b28a2e" },
              { n: "Macie", d: "S3の機密データ発見", c: "#dcecdd", st: "#5c9160" },
              { n: "CloudHSM", d: "専用HWで鍵管理", c: "#dce8f3", st: "#4a7fa8" },
            ];
            var s = "", w = 130, h = 56, gapx = 8, gapy = 14, x0 = 22, y0 = 38;
            items.forEach(function (p, i) {
              var col = i % 4, row = Math.floor(i / 4);
              var x = x0 + col * (w + gapx), y = y0 + row * (h + gapy);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 24) + '" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 43) + '" fill="#5a5346" font-size="9" text-anchor="middle">' + p.d + "</text>";
            });
            return s;
          })() +
          "</svg>",
        cap: "暗号化=KMS、秘密情報=Secrets Manager、DDoS=Shield、Web攻撃=WAF、脅威検知=GuardDuty、脆弱性=Inspector、機密発見=Macie。",
      },
    ],
    memorize: [
      { k: "Amazon Detective", v: "検知後の<strong>原因・影響範囲の深掘り調査</strong>（検知はGuardDuty）。" },
      { k: "AWS Firewall Manager", v: "<strong>複数アカウントのWAF/セキュリティ設定を一元管理</strong>し一括適用。" },
      { k: "AWS Network Firewall", v: "<strong>VPC境界の高度なファイアウォール/IPS</strong>。" },

      { k: "KMS", v: "暗号鍵の作成・管理。多くのサービスと連携し保存/転送データを暗号化。" },
      { k: "CloudHSM", v: "専用ハードウェアで暗号鍵を厳格に管理する。" },
      { k: "Secrets Manager", v: "DBパスワードやAPIキー等の秘密情報を安全に保管し自動ローテーション。" },
      { k: "Shield", v: "DDoS攻撃から防御。Standardは無料自動、Advancedは有料で手厚い。" },
      { k: "WAF", v: "Webアプリへの攻撃(SQLi/XSS等)をルールで防ぐWebアプリファイアウォール。" },
      { k: "GuardDuty", v: "ログを分析して脅威・不審な挙動を自動検知する。" },
      { k: "Inspector", v: "EC2/コンテナの脆弱性を自動診断する。" },
      { k: "Macie", v: "S3内の個人情報など機密データを発見・保護する。" },
    ],
    flashcards: [
      { q: "暗号化に使う『鍵』を作成・管理するAWSサービスは？", a: "KMS（Key Management Service）。" },
      { q: "DDoS攻撃から守るサービスと、Webアプリへの攻撃（SQLインジェクション等）から守るサービスは？", a: "DDoSはShield、WebアプリはWAF。" },
      { q: "ログを分析して不審な挙動や脅威を自動で検知するサービスは？", a: "GuardDuty。" },
      { q: "S3の中にある個人情報などの機密データを見つけ出すサービスは？", a: "Macie。" },
      { q: "データベースのパスワードなどの秘密情報を安全に保管し自動更新できるサービスは？", a: "Secrets Manager。" },
    ],
    quiz: [
      {
        q: "GuardDutyが検知したセキュリティ上の疑わしい事象について、その原因や影響範囲を深く掘り下げて調査・分析したい。適したサービスはどれか。",
        choices: ["Amazon Detective", "AWS WAF", "AWS Shield", "Amazon Inspector"],
        answer: 0,
        explain: "検知後の<strong>原因・影響の深掘り調査</strong>は<strong>Amazon Detective</strong>。WAF/Shieldは防御、Inspectorは脆弱性診断。『検知＝GuardDuty、調査＝Detective』。",
      },
      {
        q: "多数のAWSアカウントにまたがって、WAFのルールなどのセキュリティ設定を一元的に管理し、組織全体へ一括適用したい。適したサービスはどれか。",
        choices: ["AWS Config", "AWS Firewall Manager", "Amazon Macie", "AWS CloudTrail"],
        answer: 1,
        explain: "複数アカウントの<strong>WAF等を一元管理・一括適用</strong>するのは<strong>AWS Firewall Manager</strong>。Configは構成評価、Macieは機密データ検出、CloudTrailはAPI証跡。",
      },

      {
        q: "Webアプリケーションに対するSQLインジェクションやクロスサイトスクリプティングなどの攻撃を、ルールに基づいて防御するAWSサービスはどれか。",
        choices: ["AWS Shield", "AWS WAF", "Amazon GuardDuty", "AWS KMS"],
        answer: 1,
        explain: "Webアプリへの攻撃を防ぐのは<strong>WAF</strong>。DDoS対策はShield、脅威検知はGuardDuty、暗号鍵管理はKMS。",
      },
      {
        q: "大量のトラフィックを送りつけてサービスを停止させるDDoS攻撃から保護するために設計されたAWSサービスはどれか。",
        choices: ["AWS Shield", "Amazon Inspector", "Amazon Macie", "AWS Secrets Manager"],
        answer: 0,
        explain: "DDoS攻撃対策は<strong>AWS Shield</strong>。",
      },
      {
        q: "データの暗号化に使用する暗号鍵を、一元的に作成・管理・制御できるAWSサービスはどれか。",
        choices: ["Amazon GuardDuty", "AWS KMS", "AWS WAF", "Amazon Inspector"],
        answer: 1,
        explain: "暗号鍵の管理は<strong>KMS（Key Management Service）</strong>。",
      },
    ],
  }
);
