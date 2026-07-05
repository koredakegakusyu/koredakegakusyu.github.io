/* =============================================================
   SAA Forge カリキュラム — 06 データベース
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "rds", domain: "データベース", icon: "🗄️", title: "RDS と Aurora",
    intro: "マネージドSQL DB。最重要『Multi-AZ(可用性) vs リードレプリカ(性能)』を完全分離。AuroraとRDS Proxyも。",
    understand: [
      {
        h: "RDSは『運用をAWSに任せるSQLデータベース』",
        body: "<p><strong>RDS(Relational Database Service)</strong>は、MySQL・PostgreSQL・MariaDB・Oracle・SQL ServerといったリレーショナルDBを、<strong>バックアップ・パッチ適用・障害時の復旧をAWSが代行</strong>してくれる形で使えるサービスだ。EC2上に自分でDBを立てると、これらの運用をすべて自分でやる必要があるが、RDSなら本来の『データ設計とクエリ』に集中できる。</p><p>SAAでは、RDSの<strong>可用性と性能をどう高めるか</strong>が中心論点になる。そして次に説明する2つの仕組み——Multi-AZとリードレプリカ——の<strong>目的の違い</strong>が、試験で最も繰り返し問われる超重要ポイントだ。</p>",
      },
      {
        h: "【最重要】Multi-AZ(可用性) と リードレプリカ(性能) は別物",
        body: "<p>この2つは似て見えるが<strong>目的がまったく違う</strong>。混同が最大の失点源なので、目的で完全に分けて覚える。</p><ul><li><strong>Multi-AZ ＝ 可用性(落ちない)</strong>。別のAZに<strong>同期</strong>コピーの待機系(スタンバイ)を常に持ち、主系が障害を起こすと<strong>自動でフェイルオーバー</strong>(待機系が昇格)する。重要なのは、この待機系は<strong>普段は読み取りに使えない</strong>——あくまで障害時の保険だ。</li><li><strong>リードレプリカ ＝ 性能(読み取り負荷の分散)</strong>。<strong>非同期</strong>でコピーを増やし、<strong>読み取り(参照)クエリを肩代わり</strong>させる。主系は書き込みに専念でき、参照が重いアプリの性能が上がる。別リージョンにも作れる。</li></ul><p>判断:『<strong>落ちないように/AZ障害に耐える/自動復旧</strong>』→Multi-AZ。『<strong>読み取りが重い/参照を速く</strong>』→リードレプリカ。両者は併用もできる。</p>",
        diagram:
          '<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="160" y="24" fill="#4dabf7" font-size="13" font-weight="700" text-anchor="middle">Multi-AZ（可用性）</text>\
<rect x="60" y="42" width="90" height="38" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="105" y="66" fill="#51cf9b" font-size="11" text-anchor="middle">主(AZ-a)</text>\
<rect x="170" y="42" width="90" height="38" rx="8" fill="#0c1220" stroke="#9aa6bd" stroke-dasharray="3 3"/><text x="215" y="58" fill="#9aa6bd" font-size="10" text-anchor="middle">待機(AZ-c)</text><text x="215" y="73" fill="#6b7691" font-size="9" text-anchor="middle">読取不可</text>\
<line x1="150" y1="61" x2="170" y2="61" stroke="#51cf9b" stroke-width="2"/><text x="160" y="104" fill="#51cf9b" font-size="10" text-anchor="middle">同期複製</text>\
<text x="160" y="124" fill="#e9edf5" font-size="10" text-anchor="middle">障害時に自動フェイルオーバー</text>\
<line x1="320" y1="18" x2="320" y2="200" stroke="#232c40"/>\
<text x="480" y="24" fill="#ffc955" font-size="13" font-weight="700" text-anchor="middle">リードレプリカ（性能）</text>\
<rect x="370" y="42" width="90" height="38" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="415" y="66" fill="#51cf9b" font-size="11" text-anchor="middle">主(書込)</text>\
<rect x="480" y="32" width="90" height="28" rx="8" fill="#0c1220" stroke="#ffc955"/><text x="525" y="51" fill="#ffc955" font-size="10" text-anchor="middle">複製1(読取)</text>\
<rect x="480" y="72" width="90" height="28" rx="8" fill="#0c1220" stroke="#ffc955"/><text x="525" y="91" fill="#ffc955" font-size="10" text-anchor="middle">複製2(読取)</text>\
<line x1="460" y1="57" x2="480" y2="48" stroke="#ffc955" stroke-width="1.5"/><line x1="460" y1="62" x2="480" y2="86" stroke="#ffc955" stroke-width="1.5"/>\
<text x="470" y="122" fill="#ffc955" font-size="10" text-anchor="middle">非同期・読み取りを肩代わり</text>\
</svg>',
        cap: "Multi-AZ=同期・待機・自動切替で『落ちない』。リードレプリカ=非同期・複数・『読み取りを速く』。",
      },
      {
        h: "Aurora と RDS Proxy——さらに上の可用性・性能・接続管理",
        body: "<p><strong>Aurora</strong>はAWSが独自に作ったMySQL/PostgreSQL互換の高性能DBだ。データを<strong>3つのAZにそれぞれ2つ、計6コピー</strong>自動保持して自己修復し、リードレプリカは最大15、フェイルオーバーも高速。標準RDSより一段上の可用性・性能を持つ。派生として、断続的/予測不能な負荷に自動スケールする<strong>Aurora Serverless</strong>、別リージョンへ低遅延複製しDRも兼ねる<strong>Aurora Global Database</strong>がある。</p><p>もう一つ重要なのが<strong>RDS Proxy</strong>。Lambdaのように<strong>大量の接続</strong>を一気に張るクライアントがあると、DBの接続数が枯渇してエラーになる。RDS Proxyは<strong>接続をプール(再利用)</strong>して集約し、枯渇を防ぐとともにフェイルオーバーも高速化する。バックアップは<strong>自動バックアップ(最大35日保持)</strong>＋手動スナップショットで、ポイントインタイムリカバリ(任意時点復元)も可能だ。</p>",
      },
    ],
    memorize: [
      { k: "Multi-AZ", v: "<strong>可用性</strong>。同期待機→<strong>自動フェイルオーバー</strong>。待機系は読めない。" },
      { k: "リードレプリカ", v: "<strong>読み取り性能</strong>。非同期・別リージョン可。読み取りを肩代わり。" },
      { k: "合言葉", v: "落ちない→Multi-AZ / 読みが重い→リードレプリカ。混同が最大の罠。" },
      { k: "Aurora", v: "互換・<strong>6コピー(3AZ×2)</strong>・自己修復・高性能・最大15レプリカ。" },
      { k: "Aurora Serverless", v: "<strong>断続/予測不能な負荷</strong>に自動スケール。" },
      { k: "Aurora Global DB", v: "<strong>別リージョンへ低遅延複製＋DR</strong>(小さなRPO・高速フェイルオーバー)。" },
      { k: "RDS Proxy", v: "<strong>接続プール</strong>。Lambda等の大量接続を集約・枯渇防止・フェイルオーバー高速化。" },
      { k: "バックアップ", v: "自動バックアップ<strong>最大35日</strong>＋スナップショット＋ポイントインタイムリカバリ。" },
      { k: "暗号化", v: "KMSで保存時暗号化は<strong>作成時に有効化</strong>(後付け不可)。" },
    ],
    flashcards: [
      { q: "DBが落ちないようにしたい(可用性)。RDSの機能は？", a: "Multi-AZ(同期・自動フェイルオーバー)" },
      { q: "参照クエリが重い。RDSの対策は？", a: "リードレプリカ追加(読み取り分散)" },
      { q: "Multi-AZの待機系は読み取りに使える？", a: "使えない(障害時の保険)" },
      { q: "断続的で予測できない負荷のDBを自動スケールさせたい。", a: "Aurora Serverless" },
      { q: "Lambdaが大量にRDSへ接続して枯渇する。対策は？", a: "RDS Proxy(接続プール)" },
      { q: "RDSの自動バックアップの最大保持日数は？", a: "35日(ポイントインタイムリカバリ可)" },
    ],
    quiz: [
      {
        q: "ミッションクリティカルなRDS(MySQL)で、AZ障害時に最小ダウンタイムで自動復旧させたい。設定すべきは？",
        choices: ["リードレプリカを追加", "Multi-AZ配置を有効化", "インスタンス拡大", "バックアップ頻度を上げる"],
        answer: 1,
        explain: "<strong>可用性・自動フェイルオーバー＝Multi-AZ</strong>。リードレプリカは読み取り分散が目的。",
      },
      {
        q: "分析の参照クエリが集中しDBの読み取りが遅い。書き込み性能は維持したい。最適策は？",
        choices: ["Multi-AZ化", "リードレプリカを追加し参照を振り分け", "DBを再起動", "NACLで制限"],
        answer: 1,
        explain: "<strong>読み取り負荷分散＝リードレプリカ</strong>。Multi-AZの待機系は読めない。",
      },
      {
        q: "グローバル展開アプリで、別リージョンの読み取りを低遅延にしつつ、リージョン障害時のDRも兼ねたい。Auroraで最適なのは？",
        choices: ["Multi-AZのみ", "Aurora Global Database", "リードレプリカを同一リージョンに追加", "DynamoDBに移行"],
        answer: 1,
        explain: "別リージョンへの低遅延複製＋DRは<strong>Aurora Global Database</strong>(高速フェイルオーバー・小さなRPO)。",
      },
    ],
  },
  {
    id: "dynamodb", domain: "データベース", icon: "⚡", title: "DynamoDB",
    intro: "サーバーレス・ミリ秒・自動スケールのNoSQL。インデックス/ストリーム/容量モード/DAX/グローバルテーブルまで。",
    understand: [
      {
        h: "運用ゼロで桁違いにスケールするNoSQL",
        body: "<p><strong>DynamoDB</strong>は、テーブル設計が柔軟(スキーマレス)な<strong>NoSQL</strong>データベースだ。最大の特徴は、サーバーの管理が<strong>一切不要</strong>で、<strong>1桁ミリ秒</strong>の応答を、どれだけアクセスが増えても<strong>自動でスケール</strong>して返せること。モバイル・ゲーム・IoT・広告・セッション管理など、大量アクセスを超高速にさばく用途に圧倒的に強い。</p><p>RDS(複雑な結合・集計が得意なSQL)との対比で問われる。<strong>『サーバーレスで・超高速・超大規模・キーで引く』ならDynamoDB</strong>、複雑なJOINや柔軟な集計が要るならRDS、と切り分ける。データは<strong>パーティションキー</strong>で分散保存され、これを使った検索が最速になる。</p>",
      },
      {
        h: "検索を広げるインデックスと、容量モード",
        body: "<p>DynamoDBはキー検索が基本だが、別の属性でも検索したいときは<strong>インデックス</strong>を足す。<strong>GSI(グローバルセカンダリインデックス)</strong>＝別のパーティションキーで検索可能にする(最もよく使う)。<strong>LSI</strong>＝同じパーティション内で別のソートキーを使う。</p><p>料金に関わる<strong>容量モード</strong>も頻出。<strong>オンデマンド</strong>＝事前設定不要で、<strong>予測不能/スパイクする</strong>トラフィックに自動追従(キャパ管理が要らない)。<strong>プロビジョンド</strong>＝必要な読み書き性能をあらかじめ指定し(Auto Scaling併用可)、<strong>安定した負荷</strong>でコストを抑える。読み取りは既定で<strong>結果整合性(安い)</strong>、最新が必須の箇所だけ<strong>強い整合性</strong>にする。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="220" y="70" width="200" height="60" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="95" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">DynamoDB</text><text x="320" y="114" fill="#9aa6bd" font-size="10" text-anchor="middle">1桁ミリ秒・自動スケール</text>\
<rect x="20" y="78" width="150" height="44" rx="8" fill="#0c1220" stroke="#4dabf7"/><text x="95" y="100" fill="#4dabf7" font-size="11" text-anchor="middle">DAX(キャッシュ)</text><text x="95" y="114" fill="#6b7691" font-size="9" text-anchor="middle">読取をマイクロ秒</text>\
<rect x="470" y="40" width="150" height="40" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="545" y="64" fill="#51cf9b" font-size="10" text-anchor="middle">Streams→Lambda</text>\
<rect x="470" y="120" width="150" height="40" rx="8" fill="#0c1220" stroke="#b08adf"/><text x="545" y="144" fill="#b08adf" font-size="10" text-anchor="middle">グローバルテーブル</text>\
<line x1="170" y1="100" x2="218" y2="100" stroke="#9aa6bd" stroke-width="2"/><line x1="420" y1="90" x2="468" y2="65" stroke="#9aa6bd" stroke-width="1.5"/><line x1="420" y1="110" x2="468" y2="135" stroke="#9aa6bd" stroke-width="1.5"/>\
</svg>',
        cap: "DynamoDB中心に、DAX(高速読取)・Streams(イベント連携)・グローバルテーブル(多地域)を組み合わせる。",
      },
      {
        h: "速くする・広げる・自動化する追加機能",
        body: "<p>DynamoDBには周辺機能が揃う。<strong>DAX</strong>＝DynamoDB専用のインメモリキャッシュで、読み取りを<strong>マイクロ秒</strong>級に高速化(人気アイテムへの集中アクセスに有効)。<strong>DynamoDB Streams</strong>＝テーブルの変更を捕捉し<strong>Lambdaを起動</strong>(イベント駆動・他システムへの連携)。<strong>グローバルテーブル</strong>＝複数リージョンに<strong>双方向レプリケーション</strong>し、世界中で低遅延＆DR。<strong>TTL</strong>＝項目に有効期限を設定して<strong>自動削除</strong>(セッション切れデータ等)。なお、1項目の最大サイズは<strong>400KB</strong>なので、画像など大きなデータは<strong>S3に置いてキーだけ格納</strong>するのが定石だ。</p>",
      },
    ],
    memorize: [
      { k: "DynamoDB", v: "<strong>サーバーレスNoSQL</strong>・1桁ミリ秒・自動スケール。複雑なJOIN/集計はRDS。" },
      { k: "合言葉", v: "サーバーレス/超高速/超大規模/スキーマ自由/キー検索＝DynamoDB。" },
      { k: "オンデマンド容量", v: "<strong>予測不能/スパイク</strong>に自動追従(キャパ管理不要)。" },
      { k: "プロビジョンド容量", v: "安定負荷で指定(Auto Scaling併用)。コスト最適。" },
      { k: "GSI", v: "別パーティションキーで検索を追加。LSIは同一パーティション内の別ソートキー。" },
      { k: "DAX", v: "DynamoDB専用キャッシュ→<strong>マイクロ秒</strong>読み取り。" },
      { k: "Streams", v: "変更データを<strong>Lambdaへ</strong>(イベント駆動・レプリケーション元)。" },
      { k: "グローバルテーブル", v: "<strong>マルチリージョン双方向複製</strong>(世界規模低遅延＆DR)。" },
      { k: "TTL", v: "項目の<strong>自動期限切れ削除</strong>(セッション/一時データ)。" },
    ],
    flashcards: [
      { q: "サーバー管理なし・ミリ秒・自動スケールのDBは？", a: "DynamoDB" },
      { q: "DynamoDBの読み取りをマイクロ秒にするには？", a: "DAX" },
      { q: "DynamoDBの変更を契機にLambdaを動かす機能は？", a: "DynamoDB Streams" },
      { q: "世界中に低遅延・双方向でDynamoDBを提供する機能は？", a: "グローバルテーブル" },
      { q: "予測不能なスパイク負荷に最適な容量モードは？", a: "オンデマンドキャパシティ" },
      { q: "別の属性で検索したい。使うのは？", a: "GSI(グローバルセカンダリインデックス)" },
    ],
    quiz: [
      {
        q: "急成長するモバイルゲームで、数百万人のプレイヤー状態をキーで超高速に読み書きし、トラフィックは予測不能、サーバー運用は避けたい。最適なDBは？",
        choices: ["RDS for MySQL", "DynamoDB(オンデマンド)", "Redshift", "EC2上のMongoDB"],
        answer: 1,
        explain: "<strong>サーバーレス・超高速・大規模・キー検索・予測不能＝DynamoDB(オンデマンド)</strong>。",
      },
      {
        q: "DynamoDBへの新規アイテム登録を契機に、自動でメール通知や集計処理を行いたい。サーバー管理は避けたい。最適な構成は？",
        choices: ["定期的にテーブルをスキャン", "DynamoDB Streams + Lambda", "RDSトリガー", "CloudWatchで監視"],
        answer: 1,
        explain: "変更契機のイベント駆動は<strong>DynamoDB Streams→Lambda</strong>。定期スキャンは非効率でリアルタイム性も低い。",
      },
    ],
  },
  {
    id: "caching-db", domain: "データベース", icon: "⏱️", title: "ElastiCache",
    intro: "DB手前のインメモリキャッシュで読み取り高速化＆DB負荷軽減。Redis/Memcachedの使い分け。",
    understand: [
      {
        h: "よく読むデータをメモリに置いてDBを守る",
        body: "<p>同じデータが何度も読まれるアプリ(人気記事・商品情報・ランキング・セッション)では、毎回データベースに問い合わせるのは無駄で、DBの負荷も上がる。<strong>ElastiCache</strong>はDBの手前に<strong>インメモリ(メモリ上)のキャッシュ</strong>を置き、一度読んだ結果をメモリから即座に返す。これにより<strong>レイテンシーが劇的に短縮</strong>され、同時に<strong>DBへの問い合わせが減って負荷も下がる</strong>。</p><p>代表的な使い方が<strong>キャッシュアサイド</strong>:アプリはまずキャッシュを見て、<strong>あればそれを返し(キャッシュヒット)</strong>、なければDBから取得してキャッシュに保存する。これで2回目以降が速くなる。</p>",
        diagram:
          '<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="30" y="65" width="130" height="50" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="95" y="95" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">アプリ</text>\
<rect x="245" y="65" width="150" height="50" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="89" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">ElastiCache</text><text x="320" y="105" fill="#9aa6bd" font-size="9" text-anchor="middle">①まず見る(高速)</text>\
<rect x="470" y="65" width="150" height="50" rx="10" fill="#0c1220" stroke="#51cf9b"/><text x="545" y="89" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">RDS</text><text x="545" y="105" fill="#9aa6bd" font-size="9" text-anchor="middle">②無い時だけ</text>\
<line x1="160" y1="90" x2="243" y2="90" stroke="#9aa6bd" stroke-width="2" marker-end="url(#ca)"/>\
<line x1="395" y1="90" x2="468" y2="90" stroke="#9aa6bd" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ca)"/>\
<text x="320" y="150" fill="#9aa6bd" font-size="10" text-anchor="middle">キャッシュにあれば返す→DBへの問い合わせを削減</text>\
<defs><marker id="ca" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "アプリはまずキャッシュを見て、無い時だけDBへ。読み取りを高速化しDB負荷を軽減。",
      },
      {
        h: "Redis と Memcached の使い分け",
        body: "<p>ElastiCacheには2つのエンジンがあり、要件で選ぶ。</p><ul><li><strong>Redis</strong>：<strong>高機能</strong>。<strong>永続化・レプリケーション・自動フェイルオーバー(可用性)・Pub/Sub・ソート集合(ランキング)・地理空間</strong>などを備える。データを失いたくない、可用性が要る、複雑なデータ構造を扱う——なら Redis。</li><li><strong>Memcached</strong>：<strong>シンプル・マルチスレッドで水平スケール</strong>しやすい。単純なキャッシュだけが目的なら Memcached。永続化やフェイルオーバーは持たない。</li></ul><p>判断:『可用性/永続化/ランキング等の高機能が要る』→<strong>Redis</strong>、『単純キャッシュを水平スケールしたいだけ』→<strong>Memcached</strong>。なお、<strong>DynamoDBのキャッシュは専用のDAX</strong>を使い、ElastiCacheは主にRDS等のリレーショナルDBの前段に置く。</p>",
      },
    ],
    memorize: [
      { k: "ElastiCache", v: "インメモリキャッシュ。<strong>読み取り高速化＋DB負荷軽減</strong>・セッション管理。" },
      { k: "キャッシュアサイド", v: "まずキャッシュ→無ければDB→キャッシュに保存。2回目以降が速い。" },
      { k: "Redis", v: "<strong>高機能・可用性(レプリ/フェイルオーバー)・永続化・ランキング</strong>。" },
      { k: "Memcached", v: "<strong>シンプル・水平スケール</strong>。単純キャッシュ。永続化/可用性なし。" },
      { k: "DynamoDBなら", v: "キャッシュは<strong>DAX</strong>(専用)。ElastiCacheは主にRDS等の前段。" },
      { k: "選び分け", v: "高機能/可用性→Redis / 単純で水平スケール→Memcached。" },
    ],
    flashcards: [
      { q: "RDSへの繰り返し読み取りを速くしDB負荷も下げる。使うのは？", a: "ElastiCache" },
      { q: "永続化・フェイルオーバー・ランキングが要る。Redis?Memcached?", a: "Redis" },
      { q: "単純なキャッシュを水平スケールしたいだけ。どちら？", a: "Memcached" },
      { q: "DynamoDB専用のキャッシュは？", a: "DAX" },
    ],
    quiz: [
      {
        q: "ニュースサイトで人気記事へのDB読み取りが集中し、RDSの負荷と遅延が問題。コード大改修なしで改善したい。最適策は？",
        choices: ["RDSを拡大し続ける", "ElastiCacheで頻繁な読み取りをキャッシュ", "リードレプリカを20台", "S3に保存"],
        answer: 1,
        explain: "繰り返し読み取りは<strong>ElastiCacheでキャッシュ</strong>。遅延短縮とDB負荷軽減を同時達成。",
      },
      {
        q: "セッションストアとして、レプリケーションによる可用性と、ランキング機能(ソート集合)が必要。ElastiCacheのエンジンは？",
        choices: ["Memcached", "Redis", "どちらでも同じ", "ElastiCacheでは不可能"],
        answer: 1,
        explain: "永続化・レプリケーション・ソート集合などの高機能は<strong>Redis</strong>。Memcachedは単純キャッシュ用途。",
      },
    ],
  },
  {
    id: "redshift-purpose", domain: "データベース", icon: "🧮", title: "Redshift と目的特化型DB",
    intro: "DWHのRedshiftと、用途特化DB(グラフ/時系列/台帳/ドキュメント)。『どのデータモデルか』で選ぶ。",
    understand: [
      {
        h: "用途に最適なDBを選ぶ——『万能DBは無い』",
        body: "<p>AWSは『1つのDBで何でも』ではなく、<strong>用途ごとに最適化されたDB(目的特化型/purpose-built)</strong>を多数用意している。SAAでは、シナリオの<strong>データの形と使い方</strong>から最適なDBを選ぶ問題が出る。リレーショナル(RDS/Aurora)・キーバリュー(DynamoDB)に加え、以下を押さえる。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="40" width="195" height="44" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="40" y="62" fill="#ff9d3c" font-size="11" font-weight="700">Redshift</text><text x="40" y="78" fill="#9aa6bd" font-size="9">大規模集計・BI(DWH)</text>\
<rect x="225" y="40" width="195" height="44" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="245" y="62" fill="#4dabf7" font-size="11" font-weight="700">Neptune</text><text x="245" y="78" fill="#9aa6bd" font-size="9">グラフ(関係/レコメンド)</text>\
<rect x="430" y="40" width="190" height="44" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="450" y="62" fill="#51cf9b" font-size="11" font-weight="700">Timestream</text><text x="450" y="78" fill="#9aa6bd" font-size="9">時系列(IoT/メトリクス)</text>\
<rect x="20" y="98" width="195" height="44" rx="8" fill="#161e30" stroke="#ffc955"/><text x="40" y="120" fill="#ffc955" font-size="11" font-weight="700">QLDB</text><text x="40" y="136" fill="#9aa6bd" font-size="9">台帳(改ざん不能)</text>\
<rect x="225" y="98" width="195" height="44" rx="8" fill="#161e30" stroke="#b08adf"/><text x="245" y="120" fill="#b08adf" font-size="11" font-weight="700">DocumentDB</text><text x="245" y="136" fill="#9aa6bd" font-size="9">MongoDB互換(文書)</text>\
<rect x="430" y="98" width="190" height="44" rx="8" fill="#161e30" stroke="#4dd4c4"/><text x="450" y="120" fill="#4dd4c4" font-size="11" font-weight="700">Keyspaces</text><text x="450" y="136" fill="#9aa6bd" font-size="9">Cassandra互換</text>\
<text x="320" y="175" fill="#9aa6bd" font-size="10" text-anchor="middle">データの形・使い方から最適なDBを選ぶ</text>\
</svg>',
        cap: "用途特化型DBの地図。シナリオのデータモデルから最適なものを選ぶ。",
      },
      {
        h: "各DBの役割",
        body: "<ul><li><strong>Redshift</strong>＝ペタバイト級の<strong>データウェアハウス(DWH)</strong>。列指向で<strong>大規模な集計/BI分析</strong>に最適(日々のトランザクション処理=OLTPはRDS/Auroraの役割)。<strong>Redshift Spectrum</strong>でS3上のデータを直接クエリできる。</li><li><strong>Neptune</strong>＝<strong>グラフDB</strong>。SNSの友達関係、レコメンド、不正検知など『つながり』をたどる用途。</li><li><strong>Timestream</strong>＝<strong>時系列DB</strong>。IoTセンサーやメトリクスの時系列データ。</li><li><strong>QLDB</strong>＝改ざん不能な<strong>台帳DB</strong>。暗号的に検証できる監査証跡。</li><li><strong>DocumentDB</strong>＝MongoDB互換のドキュメントDB。<strong>Keyspaces</strong>＝Cassandra互換。</li></ul><p>判断:『大規模集計/BI』→Redshift、『関係をたどる』→Neptune、『時系列』→Timestream、『改ざん不能な台帳』→QLDB。</p>",
      },
    ],
    memorize: [
      { k: "Redshift", v: "<strong>DWH(列指向)・大規模集計/BI</strong>。OLTPはRDS/Aurora。" },
      { k: "Redshift Spectrum", v: "<strong>S3上のデータを直接</strong>クエリ(ロード不要)。" },
      { k: "Neptune", v: "<strong>グラフDB</strong>(関係/レコメンド/不正検知)。" },
      { k: "Timestream", v: "<strong>時系列DB</strong>(IoT/メトリクス)。" },
      { k: "QLDB", v: "改ざん不能な<strong>台帳DB</strong>(暗号的に検証可能な監査証跡)。" },
      { k: "DocumentDB / Keyspaces", v: "MongoDB互換(文書) / Cassandra互換。" },
      { k: "選び分け", v: "集計/BI→Redshift / 関係→Neptune / 時系列→Timestream / 台帳→QLDB。" },
    ],
    flashcards: [
      { q: "テラバイト級データを定常的に集計・BI分析するDWHは？", a: "Amazon Redshift" },
      { q: "ソーシャルグラフやレコメンドの関係性を扱うDBは？", a: "Amazon Neptune(グラフDB)" },
      { q: "IoTセンサーの時系列データに最適なDBは？", a: "Amazon Timestream" },
      { q: "改ざんできない監査用の台帳DBは？", a: "Amazon QLDB" },
      { q: "RedshiftでS3を直接クエリする機能は？", a: "Redshift Spectrum" },
    ],
    quiz: [
      {
        q: "全社のトランザクションデータを集約し、複雑な集計クエリで大規模なBIレポートを高速生成したい。最適なサービスは？",
        choices: ["RDS for PostgreSQL", "Amazon Redshift", "DynamoDB", "ElastiCache"],
        answer: 1,
        explain: "大規模集計・BIの<strong>DWH＝Redshift</strong>(列指向)。RDSはOLTP向きで大規模分析集計には非効率。",
      },
      {
        q: "不正取引の検出のため、口座間の複雑な関係性(つながり)を高速にたどってクエリしたい。最適なDBは？",
        choices: ["Redshift", "Neptune(グラフDB)", "Timestream", "DynamoDB"],
        answer: 1,
        explain: "関係性をたどるクエリは<strong>グラフDB＝Neptune</strong>が最適。",
      },
    ],
  }
);
