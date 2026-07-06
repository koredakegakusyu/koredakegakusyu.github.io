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
          "<li><strong>AWSドキュメント / ホワイトペーパー / ナレッジセンター</strong>：公式の技術情報。無料で誰でも参照できる。</li>" +
          "<li><strong>AWS Trusted Advisor</strong>：アカウントの改善点を助言（前章）。上位プランで全項目。</li>" +
          "<li><strong>AWS Marketplace</strong>：サードパーティ製のソフトを購入・デプロイできるストア。</li>" +
          "<li><strong>AWS Professional Services / パートナーネットワーク（APN）</strong>：導入・移行を支援する専門家やパートナー企業。</li>" +
          "</ul>",
      },
    ],
    memorize: [
      { k: "ベーシックサポート", v: "全員無料。ドキュメント・フォーラム・請求問い合わせ。技術問い合わせ不可。" },
      { k: "デベロッパー", v: "技術的な問い合わせ(メール)が可能。開発・検証向け。" },
      { k: "ビジネス", v: "24時間365日の電話・チャット。Trusted Advisor全項目。本番環境の基本。" },
      { k: "エンタープライズ", v: "最上位。専任TAM・最短15分応答など最も手厚い。" },
      { k: "TAM", v: "テクニカルアカウントマネージャー。Enterpriseに付く専任担当。" },
      { k: "AWS Marketplace", v: "サードパーティ製ソフトを購入・デプロイできるストア。" },
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
    ],
  }
);
