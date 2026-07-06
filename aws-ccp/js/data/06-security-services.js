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
        h: "暗号化と秘密情報の管理——KMS・Secrets Manager",
        body:
          "<p>データを守る基本が<strong>暗号化</strong>。その<strong>鍵を安全に作成・管理</strong>するのが<strong>KMS（Key Management Service）</strong>です。S3・EBS・RDSなど多くのサービスと連携し、保存データ（保管時）や通信（転送時）を暗号化します。専用のハードウェアで鍵を管理する<strong>CloudHSM</strong>もあります。</p>" +
          "<p>データベースのパスワードやAPIキーなどの<strong>秘密情報</strong>を安全に保管し、自動でローテーション（定期更新）できるのが<strong>Secrets Manager</strong>。設定値やパラメータの保管には<strong>Systems Manager パラメータストア</strong>も使えます。</p>",
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
