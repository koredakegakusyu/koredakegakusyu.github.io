/* =============================================================
   SAA Forge カリキュラム — 11 移行・DR
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "migration", domain: "移行・DR", icon: "🚚", title: "データ移行・転送",
    intro: "オンプレからの移行。回線で送るか物理輸送か、DBはどうするか。量と回線速度で選ぶ。",
    understand: [
      {
        h: "移行の判断軸——『データ量』『回線速度』『何を移すか』",
        body: "<p>オンプレミスからAWSへデータを移すとき、最適な手段は<strong>データ量と回線速度</strong>で決まる。少量なら回線で送ればよいが、回線が細いのに数百TBもあると、回線転送では何ヶ月もかかってしまう。その場合は<strong>物理的にデバイスを輸送</strong>する方が速い。また、対象が<strong>ファイルなのかデータベースなのか</strong>でも使うサービスが変わる。この3つの軸で整理すると迷わない。</p>",
        diagram:
          '<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="22" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">移行手段の選び分け</text>\
<rect x="20" y="45" width="195" height="50" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="117" y="66" fill="#ff9d3c" font-size="11" font-weight="700" text-anchor="middle">Snow Family</text><text x="117" y="83" fill="#9aa6bd" font-size="9" text-anchor="middle">超大量×細回線→物理輸送</text>\
<rect x="225" y="45" width="195" height="50" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="322" y="66" fill="#4dabf7" font-size="11" font-weight="700" text-anchor="middle">DataSync</text><text x="322" y="83" fill="#9aa6bd" font-size="9" text-anchor="middle">大量ファイルを回線で同期</text>\
<rect x="430" y="45" width="190" height="50" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="525" y="66" fill="#51cf9b" font-size="11" font-weight="700" text-anchor="middle">DMS</text><text x="525" y="83" fill="#9aa6bd" font-size="9" text-anchor="middle">DBを最小停止で移行</text>\
<rect x="120" y="110" width="195" height="44" rx="8" fill="#161e30" stroke="#ffc955"/><text x="217" y="131" fill="#ffc955" font-size="11" font-weight="700" text-anchor="middle">Transfer Acceleration</text><text x="217" y="147" fill="#9aa6bd" font-size="9" text-anchor="middle">遠距離→S3アップ高速化</text>\
<rect x="325" y="110" width="195" height="44" rx="8" fill="#161e30" stroke="#b08adf"/><text x="422" y="131" fill="#b08adf" font-size="11" font-weight="700" text-anchor="middle">Storage Gateway</text><text x="422" y="147" fill="#9aa6bd" font-size="9" text-anchor="middle">ハイブリッド/段階移行</text>\
</svg>',
        cap: "超大量×細回線→Snow、継続ファイル同期→DataSync、DB→DMS、で選ぶ。",
      },
      {
        h: "各サービスの役割",
        body: "<ul><li><strong>Snow Family(Snowball等)</strong>＝<strong>テラ〜ペタバイト級を物理デバイスで輸送</strong>。回線が細い/期限が厳しい大量移行の定番(回線では数ヶ月かかる場合)。</li><li><strong>DataSync</strong>＝オンプレ⇔AWS間の<strong>大量ファイルを高速・自動で同期</strong>(回線経由)。継続的な転送や、移行後の差分同期にも向く。</li><li><strong>DMS(Database Migration Service)</strong>＝<strong>データベースの移行</strong>。稼働中のDBを継続レプリケーションで<strong>最小停止</strong>で移せる。異種エンジン間(Oracle→Aurora等)は<strong>SCT(Schema Conversion Tool)</strong>を併用。</li><li><strong>S3 Transfer Acceleration</strong>＝遠隔地からS3への<strong>アップロードを、エッジ経由で高速化</strong>。</li><li><strong>Storage Gateway</strong>＝オンプレからAWSストレージをローカル同様に使うハイブリッド(段階移行・バックアップ)。</li></ul>",
      },
    ],
    memorize: [
      { k: "Snow Family", v: "<strong>ペタバイト級を物理輸送</strong>。細回線/厳しい期限の大量移行。" },
      { k: "DataSync", v: "オンプレ⇔AWSの<strong>大量ファイル高速同期</strong>(回線・継続)。" },
      { k: "DMS(+SCT)", v: "<strong>DB移行</strong>。最小停止。異種エンジンはSCTでスキーマ変換。" },
      { k: "Transfer Acceleration", v: "遠距離→S3の<strong>アップロード高速化</strong>(エッジ経由)。" },
      { k: "Storage Gateway", v: "ハイブリッド(段階移行/バックアップ)。" },
      { k: "選び方", v: "超大量×細回線→Snow / 継続ファイル同期→DataSync / DB→DMS / 遠距離S3アップ→Transfer Acceleration。" },
    ],
    flashcards: [
      { q: "細い回線で100TBを期限内にAWSへ。最適なのは？", a: "Snow Family(物理輸送)" },
      { q: "オンプレの大量ファイルを継続的に高速同期したい。", a: "AWS DataSync" },
      { q: "稼働中Oracleを最小停止でAuroraへ移行したい。", a: "AWS DMS(＋SCT)" },
      { q: "遠隔地から大きなファイルをS3へ速くアップしたい。", a: "S3 Transfer Acceleration" },
    ],
    quiz: [
      {
        q: "オンプレの500TBのデータを、回線が細い拠点から30日以内にAWSへ移行する必要がある。最も現実的な方法は？",
        choices: ["インターネット経由でS3へ直接アップ", "Snowball(Snow Family)で物理輸送", "DataSyncで回線同期", "Storage Gatewayで都度転送"],
        answer: 1,
        explain: "<strong>超大量×細回線×期限＝Snow Family(物理輸送)</strong>。細回線で500TBは数ヶ月かかり間に合わない。",
      },
      {
        q: "オンプレのOracleを、ダウンタイムを最小限にAmazon Auroraへ移行したい。最適なサービスは？",
        choices: ["DataSync", "DMS(＋SCT)", "Snowball", "Transfer Acceleration"],
        answer: 1,
        explain: "<strong>DB移行＝DMS</strong>。継続レプリケーションで最小停止、異種エンジン間はSCTでスキーマ変換。",
      },
    ],
  },
  {
    id: "dr", domain: "移行・DR", icon: "🛟", title: "災害対策(DR)戦略 と RTO/RPO",
    intro: "事業継続の設計。RTO/RPOと4つのDR戦略のコスト/復旧速度のトレードオフが頻出。",
    understand: [
      {
        h: "RTOとRPO——DRを測る2つのものさし",
        body: "<p>災害(リージョン障害など)に備える設計が<strong>DR(Disaster Recovery)</strong>だ。どこまで備えるかを測るのが2つの指標。<strong>RTO(Recovery Time Objective)</strong>＝障害発生から<strong>復旧までにかかってよい時間</strong>(どれだけ早く戻すか)。<strong>RPO(Recovery Point Objective)</strong>＝<strong>許容できるデータ損失の量</strong>(どの時点まで遡れるか＝最後のバックアップからどれだけ失ってよいか)。</p><p>原則は<strong>『RTO/RPOを小さく(厳しく)するほど、コストは高くなる』</strong>。常にフル稼働の予備を持てば一瞬で切り替わるが高い。バックアップだけなら安いが復旧に時間がかかる。SAAでは、要件(どれだけの停止/損失を許容できるか)と<strong>コストのトレードオフ</strong>から最適な戦略を選ばせる。</p>",
        diagram:
          '<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="22" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">4つのDR戦略（左=安い/遅い → 右=高い/速い）</text>\
<rect x="15" y="50" width="150" height="70" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="90" y="74" fill="#51cf9b" font-size="11" font-weight="700" text-anchor="middle">バックアップ</text><text x="90" y="89" fill="#51cf9b" font-size="11" font-weight="700" text-anchor="middle">&リストア</text><text x="90" y="107" fill="#9aa6bd" font-size="8" text-anchor="middle">最安/最遅</text>\
<rect x="175" y="50" width="150" height="70" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="250" y="78" fill="#4dabf7" font-size="11" font-weight="700" text-anchor="middle">パイロットライト</text><text x="250" y="100" fill="#9aa6bd" font-size="8" text-anchor="middle">コアだけ常時</text>\
<rect x="335" y="50" width="150" height="70" rx="8" fill="#161e30" stroke="#ffc955"/><text x="410" y="78" fill="#ffc955" font-size="11" font-weight="700" text-anchor="middle">ウォーム</text><text x="410" y="93" fill="#ffc955" font-size="11" font-weight="700" text-anchor="middle">スタンバイ</text><text x="410" y="110" fill="#9aa6bd" font-size="8" text-anchor="middle">縮小版を常時</text>\
<rect x="495" y="50" width="135" height="70" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="562" y="78" fill="#ff9d3c" font-size="11" font-weight="700" text-anchor="middle">マルチサイト</text><text x="562" y="100" fill="#9aa6bd" font-size="8" text-anchor="middle">常時フル/最速</text>\
<text x="90" y="150" fill="#6b7691" font-size="9" text-anchor="middle">RTO/RPO 大</text><text x="562" y="150" fill="#6b7691" font-size="9" text-anchor="middle">RTO/RPO ほぼ0</text>\
<text x="320" y="175" fill="#9aa6bd" font-size="10" text-anchor="middle">要件(許容停止/損失)とコストのトレードオフで選ぶ</text>\
</svg>',
        cap: "右へ行くほど復旧は速い(RTO/RPO小)がコスト高。要件とコストで選ぶ。",
      },
      {
        h: "4つのDR戦略",
        body: "<p>コストと復旧速度のトレードオフで、4段階の戦略がある。</p><ul><li><strong>バックアップ&リストア</strong>：データを別リージョンにバックアップしておき、障害時に環境を一から構築・復元。<strong>最も安いが復旧は最も遅い</strong>(RTO/RPO大)。多少の停止・損失を許容できる場合。</li><li><strong>パイロットライト</strong>：DBなど<strong>中核部分だけを最小構成で常時稼働</strong>させ、障害時に残りのサーバーを起動・拡張。</li><li><strong>ウォームスタンバイ</strong>：本番の<strong>縮小版を常時稼働</strong>させておき、障害時にスケールアップして本番を引き継ぐ。パイロットライトより<strong>速く復旧</strong>できる。</li><li><strong>マルチサイト(Active-Active)</strong>：複数リージョンで<strong>常にフル稼働</strong>。障害時はほぼ瞬時に切り替わる(<strong>RTO/RPOほぼ0</strong>)が<strong>最もコストが高い</strong>。</li></ul><p>判断:『コスト最優先・多少の停止OK』→バックアップ&リストア、『ほぼ無停止が絶対要件』→マルチサイト、その中間で速さとコストのバランス→ウォームスタンバイ/パイロットライト。</p>",
      },
    ],
    memorize: [
      { k: "RTO", v: "<strong>復旧までの目標時間</strong>(どれだけ早く戻すか)。" },
      { k: "RPO", v: "<strong>許容できるデータ損失量</strong>(どの時点まで遡れるか)。" },
      { k: "原則", v: "RTO/RPOを<strong>小さくするほどコストは高い</strong>。要件とのトレードオフで選ぶ。" },
      { k: "バックアップ&リストア", v: "<strong>最安・最も遅い</strong>。RTO/RPOが緩いとき。" },
      { k: "パイロットライト", v: "<strong>コア(DB)だけ常時</strong>、障害時に周辺を起動。" },
      { k: "ウォームスタンバイ", v: "<strong>縮小版を常時稼働</strong>、障害時にスケールアップ(速い)。" },
      { k: "マルチサイト(Active-Active)", v: "常時フル稼働で<strong>RTO/RPOほぼ0・最高コスト</strong>。" },
    ],
    flashcards: [
      { q: "RTOとRPOの違いは？", a: "RTO=復旧までの時間 / RPO=許容データ損失(遡れる時点)" },
      { q: "コスト最優先で多少の停止とデータ損失は許容。DR戦略は？", a: "バックアップ&リストア" },
      { q: "ほぼ無停止(RTO≒0)が要件。DR戦略は？", a: "マルチサイト(Active-Active)" },
      { q: "DBなど中核だけ常時稼働し障害時に拡張する戦略は？", a: "パイロットライト" },
      { q: "RTO/RPOを小さくすると、コストは？", a: "高くなる(トレードオフ)" },
    ],
    quiz: [
      {
        q: "基幹システムで、災害時でもRTO/RPOをほぼゼロにすることが絶対要件で、コストは許容できる。最適なDR戦略は？",
        choices: ["バックアップ&リストア", "パイロットライト", "ウォームスタンバイ", "マルチサイト(Active-Active)"],
        answer: 3,
        explain: "RTO/RPOをほぼゼロにするには<strong>マルチサイト(Active-Active)</strong>で常時フル稼働。コストは最も高いが要件が最優先。",
      },
      {
        q: "社内の分析用システムで、災害時は数時間〜半日かけて復旧できればよく、コストを最小化したい。最適なDR戦略は？",
        choices: ["マルチサイト", "ウォームスタンバイ", "バックアップ&リストア", "パイロットライト"],
        answer: 2,
        explain: "RTO/RPOが緩くコスト最優先なら<strong>バックアップ&リストア</strong>が最安で妥当。",
      },
      {
        q: "RPOを数秒、RTOを数分に抑えたいが、Active-Activeのフルコストは避けたい。縮小版を常時稼働させ障害時に拡張する戦略は？",
        choices: ["バックアップ&リストア", "パイロットライト", "ウォームスタンバイ", "マルチサイト"],
        answer: 2,
        explain: "縮小版を常時稼働し障害時にスケールするのは<strong>ウォームスタンバイ</strong>。パイロットライトより速く、マルチサイトより安い。",
      },
    ],
  }
);
