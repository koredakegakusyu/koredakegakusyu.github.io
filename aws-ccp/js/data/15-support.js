/* =============================================================
   コレダケAWS CCP カリキュラム — 15 サポートプランとリソース
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-support", domain: "請求とサポート", icon: "🛎️", title: "サポートプランとリソース",
    intro: "4つのサポートプラン（Basic/Developer/Business/Enterprise）と、TAM・各種学習リソース。",
    understand: [
      {
        h: "4つのサポートプラン——上位ほど手厚い",
        body:
          "<p>AWSには<strong>4段階のサポートプラン</strong>があります。上位ほど対応が手厚く、料金も上がります。境目が問われます。</p>" +
          "<ul>" +
          "<li><strong>ベーシック（Basic）</strong>：<strong>全員が無料</strong>。ドキュメントやフォーラム、請求に関する問い合わせなど。技術的な問い合わせはできない。</li>" +
          "<li><strong>デベロッパー（Developer）</strong>：<strong>技術的な問い合わせ（メール）</strong>ができる。開発・検証向け。</li>" +
          "<li><strong>ビジネス（Business）</strong>：<strong>24時間365日の電話・チャット・メール</strong>対応。<strong>Trusted Advisorの全項目</strong>が使える。本番環境向けの基本ライン。</li>" +
          "<li><strong>エンタープライズ（Enterprise）</strong>：最上位。専任担当の<strong>TAM（テクニカルアカウントマネージャー）</strong>が付き、<strong>最短15分での応答</strong>など最も手厚い。</li>" +
          "</ul>" +
          "<p>ポイント：<strong>『技術問い合わせが必要＝Developer以上』『24/365の電話とTrusted Advisor全項目＝Business以上』『専任TAMが必要＝Enterprise』</strong>。</p>",
        diagram:
          '<svg viewBox="0 0 580 195" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">AWSサポートプラン（上位ほど手厚い）</text>' +
          (function () {
            var rows = [
              { n: "ベーシック", d: "全員無料。技術問い合わせ不可", c: "#eef4f9", st: "#9db8cd", w: 210 },
              { n: "デベロッパー", d: "技術問い合わせ(メール)。開発向け", c: "#dce8f3", st: "#4a7fa8", w: 300 },
              { n: "ビジネス", d: "24/365 電話・チャット。TA全項目", c: "#f2e7cd", st: "#b28a2e", w: 400 },
              { n: "エンタープライズ", d: "専任TAM・最短15分応答。最上位", c: "#dcecdd", st: "#5c9160", w: 500 },
            ];
            var s = "", y0 = 40, h = 32, gap = 6, cx = 290;
            rows.forEach(function (r, i) {
              var y = y0 + i * (h + gap);
              s += '<rect x="' + (cx - r.w / 2) + '" y="' + y + '" width="' + r.w + '" height="' + h + '" rx="6" fill="' + r.c + '" stroke="' + r.st + '"/>';
              s += '<text x="' + cx + '" y="' + (y + 21) + '" fill="#23252b" font-size="11" text-anchor="middle"><tspan font-weight="800">' + r.n + "</tspan>　" + r.d + "</text>";
            });
            s += '<text x="40" y="58" fill="#6b6e76" font-size="10" font-weight="700">安い↑</text>';
            s += '<text x="34" y="186" fill="#a85733" font-size="10" font-weight="700">手厚い↓</text>';
            return s;
          })() +
          "</svg>",
        cap: "無料=ベーシック、技術問い合わせ=Developer以上、24/365電話とTA全項目=Business以上、専任TAM=Enterprise。",
      },
      {
        h: "学習・移行を助けるリソース",
        body:
          "<p>試験では、困ったときに使える公式リソースも問われます。</p>" +
          "<ul>" +
          "<li><strong>AWSドキュメント / ホワイトペーパー</strong>：公式の技術情報。<strong>無料で誰でも</strong>参照できる。</li>" +
          "<li><strong>AWS ナレッジセンター</strong>：<strong>よくある質問と回答</strong>集。『この症状のときどうする？』を調べる場所。</li>" +
          "<li><strong>AWS re:Post</strong>：AWS 公式の <strong>Q&amp;A コミュニティ</strong>。利用者同士や AWS の専門家が質問に回答する。</li>" +
          "<li><strong>AWS 規範ガイダンス（Prescriptive Guidance）</strong>：AWS が推奨する<strong>実装パターン・移行の型（ベストプラクティス集）</strong>。『どう作るのが定石か』を示す。</li>" +
          "<li><strong>AWS Trusted Advisor</strong>：アカウントの改善点を助言（前章）。上位プランで全項目。</li>" +
          "<li><strong>AWS Health Dashboard / AWS Health API</strong>：<strong>AWS 側の障害やメンテナンス、自分のリソースに影響する事象</strong>を確認できる。API 経由で自動取得も可能。『AWS で障害が起きていないか』を見る場所。</li>" +
          "<li><strong>AWS Trust &amp; Safety チーム</strong>：AWS リソースの<strong>不正使用（スパム・攻撃の踏み台など）を報告</strong>する窓口。</li>" +
          "<li><strong>AWS Marketplace</strong>：サードパーティ製のソフトを購入・デプロイできるストア。コスト管理・ガバナンス・資格関連の製品も入手できる。</li>" +
          "<li><strong>AWS パートナーネットワーク（APN）</strong>：<strong>ISV（独立系ソフトウェアベンダー）</strong>＝ソフトを提供する企業、<strong>SI（システムインテグレーター）</strong>＝導入・構築を請け負う企業。パートナーになると<strong>トレーニング・認定・パートナーイベント・ボリュームディスカウント</strong>などの利点がある。</li>" +
          "<li><strong>AWS Professional Services / ソリューションアーキテクト</strong>：AWS 自身の専門家による導入・移行の技術支援。</li>" +
          "</ul>" +
          "<p>使い分けの目安：技術情報を自分で調べるなら<strong>ドキュメント／ホワイトペーパー</strong>（無料）、アカウントの改善点を知るなら <strong>Trusted Advisor</strong>、外部ソフトを導入するなら <strong>AWS Marketplace</strong>、専門家の支援が必要なら <strong>Professional Services／APN パートナー</strong>。『まず公式の無料リソースで調べ、足りなければパートナーに頼る』という流れで押さえます。</p>",
      },
    ],
    memorize: [
      { k: "ベーシックサポート", v: "全員無料。ドキュメント・フォーラム・請求問い合わせ。技術問い合わせ不可。" },
      { k: "デベロッパー", v: "技術的な問い合わせ(メール)が可能。開発・検証向け。" },
      { k: "ビジネス", v: "24時間365日の電話・チャット。Trusted Advisor全項目。本番環境の基本。" },
      { k: "エンタープライズ", v: "最上位。専任TAM・最短15分応答など最も手厚い。" },
      { k: "TAM", v: "テクニカルアカウントマネージャー。Enterpriseに付く専任担当。" },
      { k: "AWS Marketplace", v: "サードパーティ製ソフトを購入・デプロイできるストア。" },
      { k: "AWS ナレッジセンター / re:Post", v: "ナレッジセンター=<strong>よくある質問と回答集</strong>。re:Post=AWS公式の<strong>Q&amp;Aコミュニティ</strong>。" },
      { k: "AWS 規範ガイダンス", v: "AWSが推奨する<strong>実装パターン・移行の型（ベストプラクティス集）</strong>。" },
      { k: "AWS Health Dashboard / Health API", v: "<strong>AWS側の障害・メンテや自分のリソースへの影響</strong>を確認。APIで自動取得も可。" },
      { k: "AWS Trust &amp; Safety", v: "AWSリソースの<strong>不正使用を報告する窓口</strong>。" },
      { k: "ISV / SI", v: "ISV=<strong>独立系ソフトウェアベンダー</strong>（ソフトを提供）、SI=<strong>システムインテグレーター</strong>（導入・構築を請負）。どちらもAPNパートナー。" },
    ],
    flashcards: [
      { q: "全員が無料で利用できるサポートプランは？", a: "ベーシック（Basic）サポート。ドキュメントやフォーラム、請求問い合わせは可能だが技術的な問い合わせはできない。" },
      { q: "24時間365日の電話サポートとTrusted Advisorの全項目が使えるのは、どのプラン以上か？", a: "ビジネス（Business）サポート以上。" },
      { q: "専任のテクニカルアカウントマネージャー（TAM）が付く最上位のプランは？", a: "エンタープライズ（Enterprise）サポート。" },
      { q: "サードパーティ製のソフトウェアを購入・デプロイできるAWSのストアは？", a: "AWS Marketplace。" },
    ],
    quiz: [
      {
        q: "技術的な問い合わせは行わず、ドキュメントやフォーラムのみを利用する。追加料金なしで全ユーザーが利用できるサポートプランはどれか。",
        choices: ["ベーシック", "デベロッパー", "ビジネス", "エンタープライズ"],
        answer: 0,
        explain: "全員が無料で使えるのは<strong>ベーシックサポート</strong>。技術的な問い合わせにはDeveloper以上が必要。",
      },
      {
        q: "本番環境を運用しており、24時間365日の電話サポートとTrusted Advizerの全項目を利用したい。最低限必要なサポートプランはどれか。",
        choices: ["ベーシック", "デベロッパー", "ビジネス", "エンタープライズのみ"],
        answer: 2,
        explain: "24/365の電話・チャットとTrusted Advisor全項目は<strong>ビジネス</strong>以上で利用できる。",
      },
      {
        q: "専任のテクニカルアカウントマネージャー（TAM）による支援や、最も短い応答時間を必要とする大企業に適したサポートプランはどれか。",
        choices: ["ベーシック", "デベロッパー", "ビジネス", "エンタープライズ"],
        answer: 3,
        explain: "専任TAMが付く最上位は<strong>エンタープライズサポート</strong>。",
      },
      {
        q: "利用中の AWS サービスで障害が発生していないか、また自分のアカウントのリソースに影響するメンテナンス予定がないかを確認したい。適したものはどれか。",
        choices: ["AWS Health Dashboard", "AWS Artifact", "Amazon Inspector", "AWS Budgets"],
        answer: 0,
        explain: "<strong>AWS側の障害・メンテナンスや、自分のリソースへの影響</strong>を確認するのが <strong>AWS Health Dashboard</strong>（Health API で自動取得も可能）。Artifact は監査レポート入手、Inspector は脆弱性診断、Budgets は予算管理。",
      },
      {
        q: "AWS への移行にあたり、外部の専門企業に構築作業を委託したい。AWS パートナーネットワーク（APN）における「システムインテグレーター（SI）」の説明として適切なものはどれか。",
        choices: ["AWSが提供する監査レポートのこと", "自社製ソフトウェアをAWS上で提供する企業", "AWSの利用料金を割引する制度", "顧客のシステム導入・構築を請け負う企業"],
        answer: 3,
        explain: "<strong>SI＝システムインテグレーター</strong>は導入・構築を請け負うパートナー。<strong>ISV＝独立系ソフトウェアベンダー</strong>は自社ソフトを提供する企業で、役割が異なる。AWS自身の専門家による支援は Professional Services。",
      },
      {
        q: "AWS が推奨する実装パターンや移行の進め方といったベストプラクティス集を参照したい。最も適した公式リソースはどれか。",
        choices: ["AWS Trusted Advisor", "AWS 規範ガイダンス（Prescriptive Guidance）", "AWS Cost Explorer", "AWS Trust & Safety"],
        answer: 1,
        explain: "AWSが推奨する<strong>実装パターン・移行の型</strong>をまとめた公式リソースが<strong>規範ガイダンス</strong>。Trusted Advisor は自分のアカウントの改善点を助言、Trust & Safety は不正使用の報告窓口。",
      },
      {
        q: "AWS の利用中に発生したよくあるエラーについて、原因と対処方法がまとめられた公式のQ&A形式の情報を無料で参照したい。最も適したリソースはどれか。",
        choices: ["AWS Artifact", "AWS Pricing Calculator", "AWS ナレッジセンター", "AWS Organizations"],
        answer: 2,
        explain: "<strong>よくある質問と回答</strong>をまとめた公式リソースが <strong>AWS ナレッジセンター</strong>。利用者同士が質問できるコミュニティは <strong>AWS re:Post</strong>、推奨の実装パターン集は<strong>規範ガイダンス</strong>と、目的で使い分ける。",
      },
    ],
  }
);
