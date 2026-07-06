/* =============================================================
   コレダケAWS CCP カリキュラム — 10 データベース
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-database", domain: "技術とサービス", icon: "🗄️", title: "データベース（RDS・DynamoDB）",
    intro: "リレーショナルのRDS/Aurora、NoSQLのDynamoDB、キャッシュのElastiCache、分析のRedshift。",
    understand: [
      {
        h: "マネージドなリレーショナルDB——RDSとAurora",
        body:
          "<p>従来のDB運用は、サーバー構築・バックアップ・パッチ適用・障害復旧まで手間がかかりました。<strong>Amazon RDS</strong>は、これらの<strong>面倒な管理をAWSが代行してくれるマネージドなリレーショナルデータベース</strong>です。MySQL・PostgreSQL・Oracle・SQL Serverなどが選べ、利用者はデータとアプリに集中できます。</p>" +
          "<p><strong>マルチAZ配置</strong>にすると、別AZに自動で複製（スタンバイ）が作られ、障害時に自動で切り替わり<strong>可用性が上がります</strong>。読み取りを分散する<strong>リードレプリカ</strong>で性能も上げられます。RDSをAWSが独自に高速・高可用にしたのが<strong>Amazon Aurora</strong>です。</p>",
      },
      {
        h: "用途で選ぶ——DynamoDB・ElastiCache・Redshift",
        body:
          "<p>リレーショナル以外にも、用途特化のデータベースがあります。</p>" +
          "<ul>" +
          "<li><strong>DynamoDB</strong>：<strong>NoSQL（キーバリュー型）</strong>。表の形に縛られず、超大量データを高速に、しかも<strong>サーバーレスで自動スケール</strong>。Webやゲームの大規模データ向け。</li>" +
          "<li><strong>ElastiCache</strong>：<strong>よく使うデータをメモリに置いて高速化するキャッシュ</strong>（Redis/Memcached）。DBの負荷を下げ、応答を速くする。</li>" +
          "<li><strong>Redshift</strong>：大量データを集計・分析する<strong>データウェアハウス</strong>。BI（経営分析）向け。</li>" +
          "</ul>" +
          "<p>ざっくり<strong>『表形式で厳密＝RDS/Aurora』『超大量で高速＝DynamoDB』『高速化のキャッシュ＝ElastiCache』『分析＝Redshift』</strong>と対応づけます。</p>",
        diagram:
          '<svg viewBox="0 0 580 185" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">データベースサービスの使い分け</text>' +
          (function () {
            var items = [
              { n: "RDS / Aurora", d: "リレーショナル(表)\nマネージドDB", c: "#dce8f3", st: "#4a7fa8" },
              { n: "DynamoDB", d: "NoSQL・超大量\nサーバーレス高速", c: "#f2e7cd", st: "#b28a2e" },
              { n: "ElastiCache", d: "メモリ上のキャッシュ\n高速化", c: "#f3ddcd", st: "#c1855c" },
              { n: "Redshift", d: "データウェアハウス\n分析・BI", c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", w = 128, h = 96, gap = 12, x0 = 26, y = 40;
            items.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 28) + '" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              var lines = p.d.split("\n");
              lines.forEach(function (ln, li) { s += '<text x="' + (x + w / 2) + '" y="' + (y + 52 + li * 15) + '" fill="#5a5346" font-size="9.5" text-anchor="middle">' + ln + "</text>"; });
            });
            return s;
          })() +
          "</svg>",
        cap: "表形式で厳密＝RDS/Aurora、超大量で高速＝DynamoDB、高速化キャッシュ＝ElastiCache、分析＝Redshift。",
      },
    ],
    memorize: [
      { k: "Amazon RDS", v: "マネージドなリレーショナルDB。構築・バックアップ・パッチ・復旧をAWSが代行。" },
      { k: "RDSマルチAZ", v: "別AZにスタンバイを自動複製し障害時に自動切替。可用性向上（性能目的ではない）。" },
      { k: "リードレプリカ", v: "読み取り専用の複製で読み取り性能を分散。" },
      { k: "Amazon Aurora", v: "AWS独自の高速・高可用なリレーショナルDB（MySQL/PostgreSQL互換）。" },
      { k: "DynamoDB", v: "NoSQL(キーバリュー)。超大量を高速・サーバーレスで自動スケール。" },
      { k: "ElastiCache", v: "メモリ上のキャッシュ(Redis/Memcached)でDB負荷軽減・高速化。" },
      { k: "Redshift", v: "データウェアハウス。大量データの集計・分析(BI)向け。" },
    ],
    flashcards: [
      { q: "バックアップやパッチ適用などの管理をAWSに任せられるリレーショナルデータベースは？", a: "Amazon RDS（マネージドなリレーショナルDB）。" },
      { q: "RDSのマルチAZ配置の目的は？", a: "別AZにスタンバイを自動で複製し、障害時に自動でフェイルオーバーして可用性を高めること。" },
      { q: "表の形に縛られず、超大量データを高速・サーバーレスで扱えるNoSQLデータベースは？", a: "Amazon DynamoDB。" },
      { q: "よくアクセスするデータをメモリに置いて応答を高速化するサービスは？", a: "Amazon ElastiCache（キャッシュ）。" },
      { q: "大量データの集計・分析（データウェアハウス）に使うAWSサービスは？", a: "Amazon Redshift。" },
    ],
    quiz: [
      {
        q: "リレーショナルデータベースを利用したいが、バックアップやOSのパッチ適用などの運用管理はできるだけAWSに任せたい。最も適したサービスはどれか。",
        choices: ["Amazon EC2に自分でDBを構築", "Amazon RDS", "Amazon S3", "Amazon DynamoDB"],
        answer: 1,
        explain: "管理をAWSが代行するマネージドなリレーショナルDBは<strong>Amazon RDS</strong>。",
      },
      {
        q: "表形式にとらわれず、非常に大量のデータを高速に読み書きでき、サーバー管理不要で自動的にスケールするNoSQLデータベースはどれか。",
        choices: ["Amazon Redshift", "Amazon RDS", "Amazon DynamoDB", "Amazon Aurora"],
        answer: 2,
        explain: "サーバーレスで自動スケールするNoSQLは<strong>Amazon DynamoDB</strong>。",
      },
      {
        q: "データベースへの読み取り負荷を減らし、頻繁にアクセスされるデータの応答を高速化したい。用いるサービスはどれか。",
        choices: ["Amazon ElastiCache", "AWS CloudTrail", "Amazon Redshift", "AWS Config"],
        answer: 0,
        explain: "よく使うデータをメモリにキャッシュして高速化するのは<strong>Amazon ElastiCache</strong>。",
      },
    ],
  }
);
