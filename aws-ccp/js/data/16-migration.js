/* =============================================================
   コレダケ学習AWS CCP カリキュラム — 16 移行と転送・導入戦略
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-migration", domain: "技術とサービス", icon: "🚚", title: "移行と転送・導入戦略",
    intro: "オンプレからクラウドへ移す手段（Snowファミリー・DMS・DataSync）と、移行戦略（7つのR）、CAF。",
    understand: [
      {
        h: "移行の可視化・計画の補強——Migration Hub・Application Discovery Service",
        body: "<ul><li><strong>AWS Application Discovery Service</strong>：移行の<strong>計画段階</strong>で、オンプレのサーバー構成や依存関係・性能などの<strong>情報を自動収集</strong>する。何をどう移すか決める材料になる。</li><li><strong>AWS Migration Hub</strong>：複数の移行ツールを使った<strong>移行の進捗状況を1か所でまとめて可視化・追跡</strong>する。どのアプリがどこまで移行できたかを一元管理。</li></ul><p>『まず調べる＝Application Discovery Service』『進捗を束ねて見る＝Migration Hub』。既習のDMS（DB移行）・Snow family（大容量物理搬送）と合わせて押さえる。</p>",
        cap: "移行前の情報収集＝Application Discovery Service、移行の進捗を一元可視化＝Migration Hub。",
      },

      {
        h: "大量データをどう運ぶ？——ネット転送 と 物理デバイス",
        body:
          "<p>オンプレミスの大量データをAWSへ移す方法は、データ量と回線速度で選びます。</p>" +
          "<ul>" +
          "<li><strong>DataSync</strong>：オンプレとAWS（S3/EFS等）の間で<strong>ネットワーク経由の大量データ転送を高速・自動化</strong>する。回線がそれなりに使えるとき。</li>" +
          "<li><strong>Storage Gateway</strong>：オンプレの既存システムから<strong>クラウドのストレージを継続利用</strong>できるよう橋渡しする（ハイブリッド運用・バックアップ）。</li>" +
          "<li><strong>Snowファミリー</strong>：回線では現実的でないほど<strong>大量のデータを、物理デバイスに入れて郵送</strong>する。小型の<strong>Snowcone</strong>、標準の<strong>Snowball</strong>、トラック級の<strong>Snowmobile</strong>（数十PB）と、データ量で使い分ける。</li>" +
          "</ul>" +
          "<p>判断の軸は<strong>『回線で送れる量ならDataSync、送りきれない量ならSnow（物理郵送）』</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">データ量で選ぶ移行手段</text>' +
          (function () {
            var items = [
              { n: "DataSync", d: "ネット経由で\n高速転送", c: "#dce8f3", st: "#4a7fa8" },
              { n: "Snowcone", d: "小型デバイス\n〜数TB", c: "#f2e7cd", st: "#b28a2e" },
              { n: "Snowball", d: "標準デバイス\n数十TB級", c: "#f3ddcd", st: "#c1855c" },
              { n: "Snowmobile", d: "トラック\n数十PB", c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", w = 128, h = 84, gap = 12, x0 = 26, y = 44;
            items.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 28) + '" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              var lines = p.d.split("\n");
              lines.forEach(function (ln, li) { s += '<text x="' + (x + w / 2) + '" y="' + (y + 50 + li * 15) + '" fill="#5a5346" font-size="9.5" text-anchor="middle">' + ln + "</text>"; });
            });
            s += '<text x="290" y="150" fill="#6b6e76" font-size="10.5" text-anchor="middle">回線で送れる＝DataSync、送りきれない大量＝Snow（物理デバイスを郵送）</text>';
            return s;
          })() +
          "</svg>",
        cap: "回線で送れる量ならDataSync、送りきれない大量データはSnowファミリー（デバイスを郵送）。",
      },
      {
        h: "データベース移行と、移行戦略（7つのR）・CAF",
        body:
          "<p>データベースをAWSへ移すには<strong>DMS（Database Migration Service）</strong>を使います。移行元を動かしたまま移行でき、種類の違うDBへ移すときは<strong>SCT（Schema Conversion Tool）</strong>でスキーマを変換します。</p>" +
          "<p>アプリをどう移すかの戦略が<strong>『7つのR』</strong>です。代表を押さえます。</p>" +
          "<ul>" +
          "<li><strong>リホスト（Rehost / リフト＆シフト）</strong>：そのままEC2などへ移す。最も速く簡単で、移行の第一歩として最多。</li>" +
          "<li><strong>リプラットフォーム</strong>：少し手を加えて最適化して移す（例：DBをRDSに）。</li>" +
          "<li><strong>リファクタリング</strong>：クラウド向けに作り替える（サーバーレス化など）。効果大だが手間も大。</li>" +
          "<li>ほかに 再購入（Repurchase／SaaSへ）、保持（Retain）、廃止（Retire）など。</li>" +
          "</ul>" +
          "<p>組織全体でクラウド導入を進める指針が<strong>CAF（クラウド導入フレームワーク）</strong>。移行コストの試算には<strong>料金計算ツール（Pricing Calculator）</strong>を使い、オンプレとの総保有コスト（TCO）を比較します。</p>",
      },
    ],
    memorize: [
      { k: "Application Discovery Service", v: "移行<strong>計画のためオンプレ構成・依存関係を自動収集</strong>。" },
      { k: "AWS Migration Hub", v: "複数ツールの<strong>移行進捗を1か所で可視化・追跡</strong>。" },

      { k: "DataSync", v: "オンプレ⇔AWS間のネットワーク経由の大量データ転送を高速・自動化。" },
      { k: "Storage Gateway", v: "オンプレの既存システムからクラウドストレージを継続利用する橋渡し。" },
      { k: "Snowファミリー", v: "物理デバイスで大量データを郵送。Snowcone(小)/Snowball/Snowmobile(数十PB)。" },
      { k: "DMS", v: "データベース移行サービス。稼働させたまま移行できる。" },
      { k: "SCT", v: "スキーマ変換ツール。異種DB間の移行でスキーマを変換。" },
      { k: "リホスト(リフト&シフト)", v: "そのまま移す。最も速く簡単で移行の第一歩に最多。" },
      { k: "リプラットフォーム/リファクタリング", v: "少し最適化して移す／クラウド向けに作り替える。" },
      { k: "CAF / Pricing Calculator", v: "クラウド導入の指針／料金の見積り(TCO比較)。" },
    ],
    flashcards: [
      { q: "回線では送りきれないほど大量のデータをAWSへ移したい。使うサービスは？", a: "AWS Snowファミリー（Snowball等）。物理デバイスにデータを入れて郵送する。" },
      { q: "オンプレとAWSの間で、ネットワーク経由の大量データ転送を高速・自動化するサービスは？", a: "AWS DataSync。" },
      { q: "データベースを（種類が違っても）AWSへ移行するサービスと、スキーマを変換するツールは？", a: "DMS（Database Migration Service）とSCT（Schema Conversion Tool）。" },
      { q: "既存システムを大きく変えず、そのままEC2などへ移す移行戦略を何と呼ぶ？", a: "リホスト（リフト＆シフト）。最も速く簡単で移行の第一歩に多い。" },
      { q: "クラウド移行のコストをオンプレと比較検討するために使うツールは？", a: "AWS Pricing Calculator（料金計算ツール）でTCOを試算する。" },
    ],
    quiz: [
      {
        q: "複数の移行ツールを併用しながら進めているクラウド移行について、各アプリケーションの移行の進捗状況を1か所でまとめて把握したい。適したサービスはどれか。",
        choices: ["AWS Migration Hub", "AWS Application Discovery Service", "AWS Database Migration Service", "AWS Snowball"],
        answer: 0,
        explain: "移行の<strong>進捗を1か所で可視化・追跡</strong>するのは<strong>AWS Migration Hub</strong>。Application Discovery Serviceは移行前の情報収集、DMSはDB移行、Snowは物理搬送。",
      },

      {
        q: "オンプレミスにある数十テラバイトのデータを、回線が細くネット転送では非現実的なためAWSへ移したい。最も適した方法はどれか。",
        choices: ["AWS DataSync", "AWS Snowball", "Amazon CloudFront", "AWS DMS"],
        answer: 1,
        explain: "回線で送りきれない大量データは、物理デバイスを郵送する<strong>Snowファミリー（Snowball）</strong>が適する。回線で送れるならDataSync。",
      },
      {
        q: "オンプレミスのデータベースを、できるだけ稼働を止めずにAWSへ移行したい。用いるべきサービスはどれか。",
        choices: ["AWS DataSync", "AWS Database Migration Service（DMS）", "Amazon S3", "AWS CloudFormation"],
        answer: 1,
        explain: "データベースの移行は<strong>DMS</strong>。異種DB間はSCTでスキーマを変換する。",
      },
      {
        q: "既存のアプリケーションをほとんど変更せず、そのままAWSのEC2上へ移行する戦略を何と呼ぶか。",
        choices: ["リファクタリング", "リホスト（リフト＆シフト）", "リタイア", "リプラットフォーム"],
        answer: 1,
        explain: "変更せずそのまま移すのは<strong>リホスト（リフト＆シフト）</strong>。最も速く簡単で移行の第一歩に多い。",
      },
      {
        q: "オンプレミスの既存サーバーから、AWSのクラウドストレージをシームレスに利用できるようにし、ハイブリッドなバックアップを実現するサービスはどれか。",
        choices: ["AWS Storage Gateway", "Amazon Redshift", "AWS Snowmobile", "Amazon EFS"],
        answer: 0,
        explain: "オンプレとクラウドストレージを橋渡しするのは<strong>AWS Storage Gateway</strong>。",
      },
      {
        q: "クラウド移行の総保有コスト（TCO）をオンプレミスと比較し、費用を見積もるために利用できるツールはどれか。",
        choices: ["AWS Pricing Calculator", "Amazon CloudWatch", "AWS Config", "AWS Trusted Advisor"],
        answer: 0,
        explain: "移行コスト・TCOの試算は<strong>AWS Pricing Calculator</strong>。",
      },
      {
        q: "組織がクラウド移行を進めるにあたり、ビジネス・人材・ガバナンス・プラットフォーム・セキュリティ・運用といった観点から、組織全体の準備状況を体系的に評価したい。用いるべきAWSのフレームワークはどれか。",
        choices: ["AWS Well-Architected フレームワーク", "AWS 責任共有モデル", "AWS クラウド導入フレームワーク（AWS CAF）", "AWS Trusted Advisor"],
        answer: 2,
        explain: "<strong>組織としてのクラウド導入の準備を体系的に評価・計画</strong>するのが <strong>AWS CAF（クラウド導入フレームワーク）</strong>。ビジネスリスクの軽減・ESG・収益増大・運用効率の向上といった成果を狙う。<strong>Well-Architected は「システム設計」の指針</strong>で対象が異なる（組織＝CAF／設計＝Well-Architected）。",
      },
    ],
  }
);
