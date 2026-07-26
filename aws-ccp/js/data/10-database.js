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
        h: "用途特化データベースの補強——Timestream・Neptune・DocumentDB・Keyspaces",
        body: "<p>AWS には、汎用の RDS や DynamoDB では扱いにくい<strong>特殊なデータ形に“特化”したデータベース</strong>が用意されています。CCP では『<strong>このデータ形＝このサービス</strong>』というキーワード連想がそのまま問われます。互換性（○○互換）が示されたら、そのままサービス名に直結させます。</p><ul>" +
          "<li><strong>Amazon Timestream</strong>：<strong>時系列データ</strong>——IoT センサーの計測値や株価のように、<strong>「時刻」とセットで次々に増えていくデータ</strong>に特化。時間軸での集計が得意です。<br><strong>試験のキーワード：</strong>「<strong>時系列</strong>」「IoT の計測値を時刻付きで蓄積」→ Timestream。</li>" +
          "<li><strong>Amazon Neptune</strong>：<strong>グラフデータベース</strong>——要素どうしの<strong>「つながり（関係性）」</strong>をたどるのが得意。SNS の友人関係、商品のレコメンド（この人が買ったものを買った人は…）、不正検知などに向きます。<br><strong>試験のキーワード：</strong>「<strong>関係性・つながりをたどる</strong>」「グラフ」「レコメンド・不正検知」→ Neptune。</li>" +
          "<li><strong>Amazon DocumentDB</strong>：<strong>MongoDB 互換</strong>のドキュメント（JSON 形式）データベース。すでに MongoDB を使っているシステムを、管理の手間なく AWS へ移したいときに。<br><strong>試験のキーワード：</strong>「<strong>MongoDB 互換</strong>」「JSON ドキュメント」→ DocumentDB。</li>" +
          "<li><strong>Amazon Keyspaces</strong>：<strong>Apache Cassandra 互換</strong>のワイドカラム型データベース。<br><strong>試験のキーワード：</strong>「<strong>Cassandra 互換</strong>」→ Keyspaces。</li>" +
          "</ul><p><strong>汎用DBとの対比</strong>：<strong>RDS/Aurora＝リレーショナル（表）</strong>、<strong>DynamoDB＝キーバリュー（NoSQL）</strong>、<strong>ElastiCache＝インメモリのキャッシュ</strong>、<strong>Redshift＝分析用DWH</strong>。問題文に「時系列」「つながり」「MongoDB/Cassandra 互換」が出たら、迷わず用途特化型を選びます。</p>",
        cap: "時系列＝Timestream、つながり＝Neptune、MongoDB互換＝DocumentDB、Cassandra互換＝Keyspaces。",
      },

      {
        h: "マネージドなリレーショナルDB——RDSとAurora",
        body:
          "<p>従来のDB運用は、サーバー構築・バックアップ・パッチ適用・障害復旧まで手間がかかりました。<strong>Amazon RDS</strong>は、これらの<strong>面倒な管理をAWSが代行してくれるマネージドなリレーショナルデータベース</strong>です。MySQL・PostgreSQL・Oracle・SQL Serverなどが選べ、利用者はデータとアプリに集中できます。</p>" +
          "<p>RDS には、混同しやすい 2 つの仕組みがあります。<strong>役割がまったく違う</strong>ので、キーワードで区別してください。</p>" +
          "<ul>" +
          "<li><strong>マルチ AZ 配置＝“可用性”のため</strong>：別の AZ に<strong>ひかえ（スタンバイ）の複製</strong>を自動で用意し、本番 DB が障害で倒れたら<strong>自動で切り替わり（フェイルオーバー）</strong>ます。ふだんスタンバイは読み書きに使わず、あくまで<strong>“止まらないため”の保険</strong>です。<strong>試験のキーワード：</strong>「<strong>可用性を高める</strong>」「障害時に自動で切り替え」「フェイルオーバー」→ マルチ AZ。</li>" +
          "<li><strong>リードレプリカ＝“性能（読み取り）”のため</strong>：<strong>読み取り専用の複製</strong>を増やして、参照の負荷を分散します。読み取りが多いサービスを速くするためのもので、<strong>可用性のためではありません</strong>。<strong>試験のキーワード：</strong>「<strong>読み取り性能を上げる</strong>」「参照が多い」「負荷分散」→ リードレプリカ。</li>" +
          "</ul>" +
          "<p><strong>ここが頻出のひっかけ</strong>：『可用性を高めたい→<strong>マルチ AZ</strong>』『読み取りを速くしたい→<strong>リードレプリカ</strong>』。取り違えないこと。なお、RDS を AWS が独自に作り直して<strong>高速（一般的なMySQLの数倍）かつ高可用</strong>にしたのが <strong>Amazon Aurora</strong>（MySQL / PostgreSQL 互換）です。</p>",
      },
      {
        h: "用途で選ぶ——DynamoDB・ElastiCache・Redshift",
        body:
          "<p>リレーショナル以外にも、用途特化のデータベースがあります。</p>" +
          "<ul>" +
          "<li><strong>Amazon DynamoDB</strong>：<strong>NoSQL（キーバリュー型）</strong>のデータベース。RDS のような「表（行と列）」の決まった形に縛られず、<strong>1 秒間に数百万件といった超大量のアクセスでも、ミリ秒単位で高速に応答</strong>します。<strong>サーバーレスで、アクセス量に応じて自動でスケール</strong>するため、急なアクセス増にも強いのが特徴。ショッピングカート、ゲームのスコア、SNS の投稿など、大量で高速なデータに向きます。<br><strong>試験のキーワード：</strong>「<strong>NoSQL</strong>」「キーバリュー」「<strong>サーバーレス</strong>で自動スケール」「ミリ秒の応答」「大量アクセスに耐える」→ DynamoDB。</li>" +
          "<li><strong>Amazon ElastiCache</strong>：<strong>よく使うデータを“メモリ”に置いておき、瞬時に取り出せるようにするキャッシュ</strong>サービス（Redis / Memcached）。本来 DB に毎回問い合わせる処理を、手前のキャッシュで肩代わりするので、<strong>DB の負荷が下がり、応答がぐっと速くなります</strong>。<br><strong>試験のキーワード：</strong>「<strong>キャッシュ</strong>」「メモリ上に置いて高速化」「DB の読み取り負荷を下げる」「ミリ秒未満の応答」→ ElastiCache。</li>" +
          "<li><strong>Amazon Redshift</strong>：大量のデータをためて<strong>集計・分析することに特化したデータベース（データウェアハウス／DWH）</strong>。複数システムのデータを集約し、経営分析（BI）のための重い集計を高速に実行します。<br><strong>試験のキーワード：</strong>「<strong>データウェアハウス</strong>」「大量データの分析・集計」「BI・経営ダッシュボードの基盤」→ Redshift。</li>" +
          "</ul>" +
          "<p><strong>取り違えない覚え方</strong>：<strong>『きっちりした表で整合性が大事＝RDS/Aurora』『とにかく大量・高速・サーバーレス＝DynamoDB』『DBの前に置く高速化キャッシュ＝ElastiCache』『ためて分析＝Redshift』</strong>。特に <strong>DynamoDB（データを保存する本体）と ElastiCache（保存はせず高速化するための一時置き場）</strong>は役割が違うので混同しないように。</p>",
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
      { k: "Amazon Timestream", v: "<strong>時系列データ</strong>（IoT計測値等）特化DB。" },
      { k: "Amazon Neptune", v: "<strong>グラフDB</strong>。つながり（関係性）——SNS/レコメンド/不正検知。" },
      { k: "Amazon DocumentDB", v: "<strong>MongoDB互換</strong>のドキュメントDB。" },
      { k: "Amazon Keyspaces", v: "<strong>Cassandra互換</strong>のワイドカラム型DB。" },

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
        q: "IoTセンサーから、時刻とともに絶えず増え続ける計測値（時系列データ）を効率的に格納・分析したい。最も適したデータベースはどれか。",
        choices: ["Amazon Timestream", "Amazon Neptune", "Amazon RDS", "Amazon DynamoDB"],
        answer: 0,
        explain: "<strong>時系列データ</strong>特化DBは<strong>Amazon Timestream</strong>。Neptuneはグラフ、RDSはリレーショナル、DynamoDBはキーバリュー。",
      },
      {
        q: "SNSの友人関係のように、要素どうしの『つながり（関係性）』をたどる分析（レコメンドや不正検知など）に最も適したデータベースはどれか。",
        choices: ["Amazon Redshift", "Amazon Neptune", "Amazon Timestream", "Amazon ElastiCache"],
        answer: 1,
        explain: "つながり（関係性）を扱う<strong>グラフDB</strong>は<strong>Amazon Neptune</strong>。Redshiftは分析用DWH、ElastiCacheはキャッシュ。",
      },

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
      {
        q: "本番の RDS データベースが障害で停止しても、できるだけ短い中断で自動的に処理を引き継げるようにしたい。適した構成はどれか。",
        choices: ["リードレプリカを追加する", "マルチ AZ 配置にする", "インスタンスタイプを大きくする", "ElastiCache を導入する"],
        answer: 1,
        explain: "別 AZ のスタンバイへ<strong>自動でフェイルオーバー</strong>し可用性を高めるのが<strong>マルチ AZ 配置</strong>。リードレプリカは<strong>読み取り性能</strong>のためで可用性目的ではない——この取り違えが頻出。",
      },
      {
        q: "読み取り（参照）リクエストが非常に多い RDS データベースで、参照の負荷を複数に分散して読み取り性能を高めたい。適した仕組みはどれか。",
        choices: ["マルチ AZ 配置", "リードレプリカ", "AWS Backup", "Amazon Redshift"],
        answer: 1,
        explain: "<strong>読み取り専用の複製</strong>を増やして参照負荷を分散するのが<strong>リードレプリカ</strong>。マルチ AZ は可用性（障害時の自動切替）のためで、目的が異なる。",
      },
    ],
  }
);
