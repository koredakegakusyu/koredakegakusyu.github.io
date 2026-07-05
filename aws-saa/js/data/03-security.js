/* =============================================================
   SAA Forge カリキュラム — 03 セキュリティ
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "kms", domain: "セキュリティ", icon: "🔑", title: "KMS と暗号化",
    intro: "保存時/転送時の暗号化と鍵管理。KMSの鍵種別とエンベロープ暗号化、各サービスの暗号化設定が頻出。",
    understand: [
      {
        h: "暗号化には『保存時』と『転送時』の2種類がある",
        body: "<p>データを守る暗号化は、場面で2つに分かれる。<strong>保存時(at rest)</strong>＝ディスクやストレージに置かれた状態の暗号化。<strong>転送時(in transit)</strong>＝ネットワークを流れる間の暗号化(TLS/HTTPS)。SAAでは両方が問われる。</p><p>保存時暗号化の鍵を一元管理するのが<strong>KMS(Key Management Service)</strong>だ。S3・EBS・RDS・DynamoDB・EFSなど、ほとんどのサービスは『暗号化を有効にする』チェック1つでKMSの鍵を使って自動的に暗号化される。利用者は鍵そのものを触らずに、強力な暗号化を得られる。しかも<strong>鍵がいつ・誰に使われたかはCloudTrailに記録</strong>されるため、監査もできる。</p>",
      },
      {
        h: "エンベロープ暗号化と鍵の種類",
        body: "<p>大きなデータを毎回KMSに送って暗号化するのは非効率だ。そこでKMSは<strong>エンベロープ暗号化</strong>という方式を使う。①KMSが<strong>データキー</strong>を生成 → ②そのデータキーで<strong>本体データを高速に暗号化</strong> → ③データキー自体をKMSの<strong>マスターキー(KMSキー)</strong>で暗号化して一緒に保存。復号時は逆順。本体は手元の速い処理で、鍵だけをKMSで守る『二重の封筒』方式だ。</p><p>鍵には種類がある。<strong>AWSマネージドキー</strong>はAWSが自動管理(手軽)。<strong>カスタマーマネージドキー(CMK)</strong>は自分でポリシー・<strong>年1回の自動ローテーション</strong>・無効化・削除を制御できる。最も厳格に、鍵を<strong>専有の物理デバイスで完全に自社管理</strong>したいなら<strong>CloudHSM</strong>を使う。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="22" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">エンベロープ暗号化</text>\
<rect x="40" y="70" width="150" height="60" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="115" y="95" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">KMSキー</text><text x="115" y="113" fill="#9aa6bd" font-size="10" text-anchor="middle">データキーを暗号化</text>\
<rect x="245" y="70" width="150" height="60" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="320" y="95" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">データキー</text><text x="320" y="113" fill="#9aa6bd" font-size="10" text-anchor="middle">本体を高速に暗号化</text>\
<rect x="450" y="70" width="160" height="60" rx="10" fill="#0c1220" stroke="#51cf9b"/><text x="530" y="95" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">暗号化データ</text><text x="530" y="113" fill="#9aa6bd" font-size="10" text-anchor="middle">+暗号化済データキー</text>\
<line x1="190" y1="100" x2="243" y2="100" stroke="#9aa6bd" stroke-width="2" marker-end="url(#k)"/><line x1="395" y1="100" x2="448" y2="100" stroke="#9aa6bd" stroke-width="2" marker-end="url(#k)"/>\
<text x="320" y="165" fill="#9aa6bd" font-size="10" text-anchor="middle">本体は速い処理で暗号化、鍵だけKMSで厳重に守る</text>\
<defs><marker id="k" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "データ本体はデータキーで高速暗号化し、そのデータキーをKMSキーで暗号化して守る。",
      },
      {
        h: "転送時の暗号化と証明書(ACM)",
        body: "<p>転送時は<strong>TLS/HTTPS</strong>で暗号化する。そのために必要なTLS証明書を<strong>無料で発行・自動更新</strong>してくれるのが<strong>ACM(Certificate Manager)</strong>だ。証明書の期限切れによる事故を防げる。</p><p>ACMの証明書は<strong>ELB・CloudFront・API Gateway</strong>に紐づけて使う(<strong>EC2に直接は付けられない</strong>点に注意)。また、<strong>CloudFrontで使う証明書はバージニア北部(us-east-1)で作成</strong>する必要がある——これは試験の細かい頻出ポイント。S3の暗号化方式も整理しておくと、<strong>SSE-S3</strong>(AWS管理鍵)/<strong>SSE-KMS</strong>(KMS鍵で監査・制御)/<strong>SSE-C</strong>(自分で鍵を持ち込む)の3つだ。</p>",
      },
    ],
    memorize: [
      { k: "KMS", v: "鍵の一元管理＋各サービスの保存時暗号化。鍵操作は<strong>CloudTrailで監査</strong>。" },
      { k: "保存時 vs 転送時", v: "保存時=ストレージ上(KMS) / 転送時=ネットワーク上(TLS/ACM)。" },
      { k: "エンベロープ暗号化", v: "データキーで本体を暗号化し、データキーをKMSキーで暗号化。大容量を高速に。" },
      { k: "CMK vs マネージド", v: "ポリシー/ローテーション/無効化の制御が要る→<strong>カスタマーマネージドキー</strong>。" },
      { k: "自動ローテーション", v: "CMKは<strong>年1回</strong>の自動ローテ設定可。" },
      { k: "CloudHSM", v: "<strong>専有物理HSMで鍵を完全自社管理</strong>。最も厳格な規制要件。" },
      { k: "ACM", v: "TLS証明書を<strong>無料発行・自動更新</strong>。ELB/CloudFront/API GWに付与(<strong>EC2直は不可</strong>)。" },
      { k: "CloudFront証明書", v: "<strong>us-east-1(バージニア北部)</strong>に作成する必要。" },
      { k: "S3暗号化方式", v: "SSE-S3(AWS管理) / <strong>SSE-KMS</strong>(鍵管理・監査) / SSE-C(自前鍵持込)。" },
      { k: "マルチリージョンキー", v: "リージョン跨ぎで<strong>同一鍵マテリアル</strong>を使いたいとき(通常CMKはリージョン固有)。" },
    ],
    flashcards: [
      { q: "S3保存データを暗号化し、鍵の使用を監査・自分で制御したい。方式は？", a: "SSE-KMS(カスタマーマネージドキー)" },
      { q: "ELBにHTTPS証明書を無料で付け自動更新したい。", a: "ACM(Certificate Manager)" },
      { q: "規制で鍵を専有の物理デバイスで完全管理したい。", a: "CloudHSM" },
      { q: "大容量データを効率よく暗号化するKMSの方式は？", a: "エンベロープ暗号化" },
      { q: "CloudFront用のACM証明書はどのリージョンに作る？", a: "us-east-1(バージニア北部)" },
      { q: "保存時暗号化と転送時暗号化、それぞれの主役は？", a: "保存時=KMS / 転送時=TLS(証明書はACM)" },
    ],
    quiz: [
      {
        q: "RDSとS3に保存される個人情報を暗号化し、暗号鍵へのアクセスを監査ログで追跡し、鍵のローテーションも管理したい。最適なのは？",
        choices: ["SSE-S3(AWSマネージドキー)のみ", "KMSのカスタマーマネージドキーで暗号化", "アプリ側で独自暗号化", "暗号化せずSGで制限"],
        answer: 1,
        explain: "鍵の<strong>制御・監査・ローテーション</strong>が要件なら<strong>KMSのカスタマーマネージドキー</strong>。鍵使用はCloudTrailで追跡できる。",
      },
      {
        q: "ALB配下のWebアプリをHTTPS化したい。証明書の管理コストと更新作業を最小化する方法は？",
        choices: [
          "自己署名証明書を各EC2に配置",
          "ACMで証明書を発行しALBに紐づける(自動更新)",
          "サードパーティ証明書を毎年手動更新",
          "CloudHSMで証明書を生成",
        ],
        answer: 1,
        explain: "<strong>ACM</strong>は証明書を無料発行・自動更新し、ALB/CloudFront/API GWに統合できる。手動更新や自己署名は運用負荷・信頼性で劣る。",
      },
    ],
  },
  {
    id: "secrets", domain: "セキュリティ", icon: "🗝️", title: "Secrets Manager と Parameter Store",
    intro: "DBパスワード等の機密や設定値の安全な保管。自動ローテーションの有無で選び分ける。",
    understand: [
      {
        h: "機密情報をコードに書いてはいけない",
        body: "<p>DBのパスワードやAPIキーを、ソースコードや設定ファイル、環境変数に直接書く——これは典型的な事故の原因だ。コードがGitに漏れたり、誰でも読めたりすれば即座に侵害される。正しいのは、機密を<strong>専用の安全な保管庫に預け、アプリが実行時に取り出す</strong>方式。AWSにはこの保管庫が2つあり、用途で使い分ける。</p>",
      },
      {
        h: "Secrets Manager(自動ローテーション) と Parameter Store(安価)",
        body: "<p><strong>Secrets Manager</strong>は機密情報(特に<strong>DB資格情報</strong>)の保管に特化し、最大の特長が<strong>自動ローテーション</strong>だ。RDS等と連携し、『90日ごとにパスワードを自動で新しいものに差し替える』を人手なしで実現できる。漏洩時の影響を時間で区切れるのが強み(有料)。</p><p>一方、<strong>Systems Manager Parameter Store</strong>は、設定値や秘密を階層的に保管する汎用ストア。<strong>標準利用は無料</strong>で、<strong>SecureString</strong>型ならKMSで暗号化できる。ただし<strong>ネイティブな自動ローテーション機能は持たない</strong>。</p><p>判断は単純。『DBパスワードを定期的に自動更新したい』→<strong>Secrets Manager</strong>。『大量の設定値や、ローテーション不要な秘密を安価に管理したい』→<strong>Parameter Store</strong>。</p>",
        diagram:
          '<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="40" y="40" width="250" height="120" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="165" y="64" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">Secrets Manager</text>\
<text x="165" y="90" fill="#e9edf5" font-size="11" text-anchor="middle">機密(DB資格情報/APIキー)</text>\
<text x="165" y="112" fill="#51cf9b" font-size="11" text-anchor="middle">自動ローテーション ◎</text>\
<text x="165" y="134" fill="#9aa6bd" font-size="10" text-anchor="middle">有料 / RDS連携</text>\
<rect x="350" y="40" width="250" height="120" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="475" y="64" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">Parameter Store</text>\
<text x="475" y="90" fill="#e9edf5" font-size="11" text-anchor="middle">設定値/秘密(SecureString)</text>\
<text x="475" y="112" fill="#9aa6bd" font-size="11" text-anchor="middle">自動ローテーション ✕(標準)</text>\
<text x="475" y="134" fill="#51cf9b" font-size="10" text-anchor="middle">標準は無料</text>\
</svg>',
        cap: "自動ローテーションが要る機密→Secrets Manager / 安価に設定値→Parameter Store。",
      },
    ],
    memorize: [
      { k: "原則", v: "機密は<strong>コード/環境変数に直書きせず</strong>、保管庫に預けて実行時に取得。" },
      { k: "Secrets Manager", v: "機密保管＋<strong>自動ローテーション</strong>(RDS等連携)。有料。" },
      { k: "Parameter Store", v: "設定値/秘密の階層管理。<strong>標準無料</strong>・SecureStringでKMS暗号化。自動ローテは非対応(標準)。" },
      { k: "選び分け", v: "自動ローテーションが要る機密→<strong>Secrets Manager</strong> / 安価な設定値→<strong>Parameter Store</strong>。" },
      { k: "アクセス制御", v: "どちらもIAMで取得権限を制御。最小権限で必要なアプリ/ロールだけに。" },
    ],
    flashcards: [
      { q: "DBの認証情報を保管し90日ごとに自動ローテーションしたい。", a: "Secrets Manager" },
      { q: "大量のアプリ設定値を安価に一元管理したい。", a: "Parameter Store(標準は無料)" },
      { q: "Parameter StoreでKMS暗号化して秘密を保管する型は？", a: "SecureString" },
      { q: "機密をソースコードに書くのは？", a: "禁止(保管庫に預け実行時に取得)" },
    ],
    quiz: [
      {
        q: "アプリがRDSの認証情報を使用する。資格情報をコードに書かず、定期的に自動でローテーションしたい。最適なサービスは？",
        choices: ["Parameter Store(標準)", "Secrets Manager", "S3に暗号化保存", "EC2のユーザーデータに記述"],
        answer: 1,
        explain: "<strong>自動ローテーションが必要なDB資格情報＝Secrets Manager</strong>。Parameter Storeは安価だが標準でローテーション機能を持たない。",
      },
    ],
  },
  {
    id: "edge-protection", domain: "セキュリティ", icon: "🛡️", title: "WAF・Shield・Firewall",
    intro: "境界防御。Web攻撃(WAF)・DDoS(Shield)・ネットワーク防御の役割を区別する。多層防御の考え方。",
    understand: [
      {
        h: "多層防御——入口から段階的に守る",
        body: "<p>攻撃は外側(インターネット)からやってくる。だから防御も<strong>外側から順に層を重ねる(多層防御)</strong>のが基本だ。ユーザーのリクエストがアプリに届くまでの間に、複数の関所を置いて段階的にふるい落とす。代表的な3つの関所を役割で区別できれば、SAAの境界防御問題はほぼ解ける。</p>",
        diagram:
          '<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="70" width="110" height="44" rx="8" fill="#0c1220" stroke="#9aa6bd"/><text x="75" y="90" fill="#e9edf5" font-size="11" text-anchor="middle">ユーザー</text><text x="75" y="105" fill="#6b7691" font-size="9" text-anchor="middle">(攻撃含む)</text>\
<rect x="165" y="65" width="120" height="54" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="225" y="86" fill="#ff9d3c" font-size="11" font-weight="700" text-anchor="middle">Shield</text><text x="225" y="103" fill="#9aa6bd" font-size="9" text-anchor="middle">DDoSを吸収</text>\
<rect x="320" y="65" width="120" height="54" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="380" y="86" fill="#4dabf7" font-size="11" font-weight="700" text-anchor="middle">WAF</text><text x="380" y="103" fill="#9aa6bd" font-size="9" text-anchor="middle">SQLi/XSS/不正IP</text>\
<rect x="475" y="65" width="140" height="54" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="545" y="86" fill="#51cf9b" font-size="11" font-weight="700" text-anchor="middle">CloudFront/ALB</text><text x="545" y="103" fill="#9aa6bd" font-size="9" text-anchor="middle">→アプリへ</text>\
<line x1="130" y1="92" x2="163" y2="92" stroke="#9aa6bd" stroke-width="2"/><line x1="285" y1="92" x2="318" y2="92" stroke="#9aa6bd" stroke-width="2"/><line x1="440" y1="92" x2="473" y2="92" stroke="#9aa6bd" stroke-width="2"/>\
<text x="320" y="150" fill="#9aa6bd" font-size="10" text-anchor="middle">外側から DDoS→Web攻撃 を段階的にふるい落とす(多層防御)</text>\
</svg>',
        cap: "外側から Shield(DDoS)→WAF(Web攻撃)→アプリ、と段階的に守るのが多層防御。",
      },
      {
        h: "WAF・Shield・Network Firewall の役割分担",
        body: "<ul><li><strong>WAF(Web Application Firewall)</strong>＝<strong>L7(アプリ層)のWeb攻撃</strong>を防ぐ。SQLインジェクション・XSS、特定IPや国のブロック、レート制限(過剰アクセス)などをルールで弾く。<strong>CloudFront/ALB/API Gateway</strong>に付ける。</li><li><strong>Shield</strong>＝<strong>DDoS攻撃(大量トラフィックでサービスを潰す攻撃)</strong>を防ぐ。<strong>Standard</strong>は全利用者に無料で自動適用。<strong>Advanced</strong>は有料で、より高度な防御＋攻撃時のスケーリング費用補償＋専門対応チーム(DRT)が付く。</li><li><strong>Network Firewall</strong>＝VPC全体の<strong>ネットワーク層</strong>を守るステートフルなファイアウォール。<strong>AWS Firewall Manager</strong>＝Organizations配下の多数アカウントでWAF/Shield/SGルールを<strong>一元管理</strong>。</li></ul><p>判断：『SQLi/XSS等のWeb攻撃』→WAF、『DDoS(＋補償・専門対応)』→Shield(Advanced)、『組織横断で防御ルールを統一』→Firewall Manager。</p>",
      },
    ],
    memorize: [
      { k: "多層防御", v: "外側から段階的に関所を置く。Shield→WAF→アプリ。" },
      { k: "WAF", v: "<strong>L7のWeb攻撃</strong>(SQLi/XSS)・不正IP/国・レート制限。CloudFront/ALB/API GWに付与。" },
      { k: "Shield Standard", v: "<strong>無料・自動</strong>のDDoS防御(全AWS利用者)。" },
      { k: "Shield Advanced", v: "<strong>有料</strong>。高度なDDoS防御＋<strong>費用補償＋DRT(対応チーム)</strong>。" },
      { k: "Firewall Manager", v: "Organizations全体でWAF/Shield/SGを<strong>一元管理</strong>。" },
      { k: "Network Firewall", v: "VPCの<strong>ネットワーク層</strong>の高度なファイアウォール。" },
      { k: "区別", v: "Web攻撃→WAF / DDoS→Shield / 組織横断ルール→Firewall Manager。" },
    ],
    flashcards: [
      { q: "SQLインジェクションやXSSを防ぐサービスは？", a: "AWS WAF" },
      { q: "大規模DDoSへの高度な防御と費用補償が欲しい。", a: "AWS Shield Advanced" },
      { q: "組織内の多数アカウントでWAFルールを一元適用したい。", a: "AWS Firewall Manager" },
      { q: "WAFを付けられる対象は？", a: "CloudFront / ALB / API Gateway" },
      { q: "多層防御の考え方を一言で？", a: "外側から段階的に関所を重ねて守る" },
    ],
    quiz: [
      {
        q: "CloudFront配信のアプリがSQLインジェクションと特定国からの不正リクエストを受けている。アプリ改修なしで防御層を追加したい。最適なのは？",
        choices: ["Shield Standard", "AWS WAF(CloudFrontに適用)", "GuardDuty", "Security Group"],
        answer: 1,
        explain: "<strong>L7のWeb攻撃・地理/IPフィルタ＝WAF</strong>。Shieldは主にDDoS、GuardDutyは検知(ブロックではない)、SGはL3/4で内容を見られない。",
      },
      {
        q: "オンライン取引所が過去に大規模DDoSを受けており、攻撃時のスケーリング費用の補償と専門チームの支援も受けたい。適切なサービスは？",
        choices: ["Shield Standard", "Shield Advanced", "WAFのレート制限のみ", "CloudWatch"],
        answer: 1,
        explain: "費用補償・DDoS対応チーム(DRT)・高度防御は<strong>Shield Advanced</strong>(有料)。Standardは基本的な自動防御のみ。",
      },
    ],
  },
  {
    id: "threat-detection", domain: "セキュリティ", icon: "🕵️", title: "脅威検知・コンプライアンス",
    intro: "GuardDuty/Inspector/Macie/Security Hub。『何を見張るか』で使い分ける。検知系の頻出問題。",
    understand: [
      {
        h: "『防ぐ』だけでなく『気づく』——検知系サービス",
        body: "<p>WAFやShieldが攻撃を『防ぐ』のに対し、ここで扱うのは異常や弱点に『気づく(検知する)』サービス群だ。完璧に防ぎ切ることは不可能なので、侵害の兆候・脆弱性・情報漏えいリスクを<strong>早期に検知</strong>する層が欠かせない。4つのサービスを<strong>『何を見張るか』</strong>で区別するのが攻略法だ。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="25" y="40" width="285" height="50" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="50" y="62" fill="#ff9d3c" font-size="12" font-weight="700">GuardDuty</text><text x="50" y="80" fill="#9aa6bd" font-size="10">不審な通信/侵害の兆候を検知</text>\
<rect x="330" y="40" width="285" height="50" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="355" y="62" fill="#4dabf7" font-size="12" font-weight="700">Inspector</text><text x="355" y="80" fill="#9aa6bd" font-size="10">EC2/コンテナ/Lambdaの脆弱性</text>\
<rect x="25" y="100" width="285" height="50" rx="8" fill="#161e30" stroke="#ffc955"/><text x="50" y="122" fill="#ffc955" font-size="12" font-weight="700">Macie</text><text x="50" y="140" fill="#9aa6bd" font-size="10">S3内の個人情報(PII)を発見</text>\
<rect x="330" y="100" width="285" height="50" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="355" y="122" fill="#51cf9b" font-size="12" font-weight="700">Security Hub</text><text x="355" y="140" fill="#9aa6bd" font-size="10">検出結果を集約・準拠評価</text>\
<text x="320" y="178" fill="#9aa6bd" font-size="10" text-anchor="middle">『何を見張るか』で使い分ける</text>\
</svg>',
        cap: "脅威の通信→GuardDuty / 脆弱性→Inspector / S3の機密→Macie / 集約→Security Hub。",
      },
      {
        h: "4サービスの役割と使い分け",
        body: "<ul><li><strong>GuardDuty</strong>＝VPC Flow Logs/DNS/CloudTrailを機械学習で分析する<strong>脅威検知</strong>。エージェント不要・<strong>有効化するだけ</strong>で、不審なAPI呼び出しや既知の悪性IPとの通信、マルウェアの兆候を見つける。</li><li><strong>Inspector</strong>＝EC2/コンテナ/Lambdaの<strong>脆弱性(CVE)スキャン</strong>。既知の弱点や、外部から到達可能な危険な設定を継続的にチェック。</li><li><strong>Macie</strong>＝<strong>S3内の機密データ(個人情報/PII)を発見・分類</strong>。どのバケットに何の機密が眠っているかを可視化。</li><li><strong>Security Hub</strong>＝GuardDuty/Inspector/Macie等の<strong>検出結果を一元集約</strong>し、セキュリティ基準への準拠状況をダッシュボードで評価。さらに<strong>Detective</strong>は検知後の<strong>原因の深掘り調査</strong>を支援する。</li></ul>",
      },
    ],
    memorize: [
      { k: "GuardDuty", v: "ログ分析による<strong>脅威検知</strong>(不審通信/侵害兆候)。エージェント不要・有効化のみ。" },
      { k: "Inspector", v: "EC2/コンテナ/Lambdaの<strong>脆弱性(CVE)スキャン</strong>。" },
      { k: "Macie", v: "<strong>S3の機密データ(PII)発見・分類</strong>。" },
      { k: "Security Hub", v: "セキュリティ検出結果の<strong>集約・準拠評価ダッシュボード</strong>。" },
      { k: "Detective", v: "検知後の<strong>原因の深掘り調査(根本分析)</strong>を支援。" },
      { k: "区別", v: "脅威通信→GuardDuty / 脆弱性→Inspector / S3機密→Macie / 集約→Security Hub。" },
      { k: "防ぐ vs 気づく", v: "WAF/Shieldは『防ぐ』、GuardDuty等は『気づく(検知)』。両方で多層に。" },
    ],
    flashcards: [
      { q: "不審なAPI呼び出しや通信を自動検知したい。", a: "Amazon GuardDuty" },
      { q: "EC2やコンテナのCVE脆弱性を継続スキャンしたい。", a: "Amazon Inspector" },
      { q: "S3バケット内に個人情報が無いか発見したい。", a: "Amazon Macie" },
      { q: "複数のセキュリティ検出結果を一元集約したい。", a: "AWS Security Hub" },
      { q: "GuardDutyはエージェント導入が必要？", a: "不要(ログを分析、有効化するだけ)" },
    ],
    quiz: [
      {
        q: "セキュリティ責任者が、AWSアカウント内で侵害された可能性のある不審なアクティビティ(異常なAPI呼び出しや既知の悪性IPとの通信)を、エージェント導入なしで継続的に検知したい。最適なサービスは？",
        choices: ["Amazon Inspector", "Amazon GuardDuty", "Amazon Macie", "AWS Config"],
        answer: 1,
        explain: "ログ分析ベースの<strong>脅威検知＝GuardDuty</strong>(エージェント不要)。Inspectorは脆弱性、Macieはデータ機密、Configは設定準拠。",
      },
      {
        q: "大量のS3バケットに個人情報(PII)が誤って保存されていないかを自動的に発見・分類したい。最適なサービスは？",
        choices: ["GuardDuty", "Macie", "Inspector", "WAF"],
        answer: 1,
        explain: "<strong>S3内の機密データ(PII)の発見・分類＝Macie</strong>。",
      },
    ],
  }
);
