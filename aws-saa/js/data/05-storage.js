/* =============================================================
   SAA Forge カリキュラム — 05 ストレージ
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "s3", domain: "ストレージ", icon: "🪣", title: "S3 の基礎と機能",
    intro: "無限・超高耐久のオブジェクトストレージ。バージョニング・レプリケーション・セキュリティ機能まで広く問われる。",
    understand: [
      {
        h: "S3は『容量無限・超高耐久のファイル置き場』",
        body: "<p><strong>S3(Simple Storage Service)</strong>は、画像・動画・バックアップ・ログなどの<strong>ファイル(オブジェクト)</strong>を、容量無制限で保管できるストレージだ。データは自動的に<strong>複数AZに複製</strong>され、耐久性は<strong>イレブンナイン(99.999999999%)</strong>——1000万個のファイルを1万年保管しても1個失うかどうか、という途方もない堅牢さ。サーバーの管理は不要で、各ファイルはURLでアクセスできる。</p><p>ファイルは<strong>バケット</strong>(入れ物)に格納する。バケット名は<strong>全世界で一意</strong>でなければならない。1オブジェクトの最大サイズは<strong>5TB</strong>。EBS(サーバーに繋ぐディスク)とは別物で、S3は<strong>ネットワーク越しにアクセスする独立したストレージサービス</strong>だと理解する。静的Webサイトのホスティングにも使える。</p>",
      },
      {
        h: "データを守る機能——バージョニング・レプリケーション・Object Lock",
        body: "<p>S3には、データを失わない・改ざんさせないための機能が揃っている。</p><ul><li><strong>バージョニング</strong>：オブジェクトを上書き・削除しても<strong>過去の版が残る</strong>。誤操作からの復元に必須で、後述のレプリケーションの前提にもなる。<strong>MFA Delete</strong>を併用すると削除に多要素認証を要求できる。</li><li><strong>レプリケーション</strong>：別の場所へ自動コピー。<strong>CRR(クロスリージョン)</strong>＝<strong>別リージョンへ</strong>複製し、災害対策(DR)や遠隔地ユーザーの低遅延に。<strong>SRR(同一リージョン)</strong>＝ログ集約等。どちらも<strong>バージョニングが前提</strong>。</li><li><strong>Object Lock</strong>：<strong>WORM(Write Once Read Many)</strong>。一度書いたら保持期間中は<strong>誰も(管理者でも)変更・削除できない</strong>。改ざん防止・規制対応の保管に。</li></ul>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="22" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">クロスリージョンレプリケーション(CRR)</text>\
<rect x="40" y="55" width="230" height="100" rx="10" fill="none" stroke="#4dabf7" stroke-dasharray="5 4"/><text x="155" y="78" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">リージョンA(東京)</text>\
<rect x="80" y="92" width="150" height="44" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="155" y="119" fill="#ff9d3c" font-size="11" text-anchor="middle">S3バケット(主)</text>\
<rect x="370" y="55" width="230" height="100" rx="10" fill="none" stroke="#51cf9b" stroke-dasharray="5 4"/><text x="485" y="78" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">リージョンB(大阪)</text>\
<rect x="410" y="92" width="150" height="44" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="485" y="119" fill="#51cf9b" font-size="11" text-anchor="middle">S3バケット(複製)</text>\
<line x1="230" y1="114" x2="408" y2="114" stroke="#9aa6bd" stroke-width="2" marker-end="url(#cr)"/><text x="320" y="106" fill="#9aa6bd" font-size="10" text-anchor="middle">自動複製(要バージョニング)</text>\
<text x="320" y="180" fill="#9aa6bd" font-size="10" text-anchor="middle">別リージョンへ複製＝DR・遠隔地の低遅延</text>\
<defs><marker id="cr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "CRRで別リージョンへ自動複製しDRや低遅延を実現(バージョニングが前提)。",
      },
      {
        h: "セキュリティ——公開制御・暗号化・プライベートアクセス",
        body: "<p>S3は<strong>デフォルトで非公開</strong>だが、設定ミスによる<strong>情報漏えい</strong>が現実に多発している。これを防ぐのが<strong>Block Public Access</strong>で、誤って公開設定にしても一括でブロックする(基本ONにする)。公開配信が必要なら、S3を直接公開せず<strong>CloudFront＋OAC</strong>経由にするのがベストプラクティス。</p><p>保存時の暗号化は<strong>SSE-S3</strong>(AWS管理鍵)/<strong>SSE-KMS</strong>(KMS鍵で監査・制御)/<strong>SSE-C</strong>(自前鍵持込)の3方式。一時的に限定アクセスさせたいなら<strong>署名付きURL</strong>(期限付きで非公開のまま配布)。VPC内のサーバーがインターネットを経由せずS3へアクセスするには<strong>S3 Gatewayエンドポイント(無料)</strong>を使う。さらに、PUT等を契機に<strong>イベント通知</strong>でLambda/SQS/SNSを起動できる(画像アップ→サムネ生成など)。</p>",
      },
    ],
    memorize: [
      { k: "耐久性/サイズ", v: "<strong>イレブンナイン</strong>・複数AZ自動複製。1オブジェクト最大<strong>5TB</strong>。" },
      { k: "バケット名", v: "<strong>全世界で一意</strong>。" },
      { k: "バージョニング", v: "上書き/削除から保護。<strong>レプリケーションの前提</strong>。MFA Deleteで削除に多要素。" },
      { k: "CRR / SRR", v: "<strong>CRR=別リージョン複製(DR/低遅延)</strong> / SRR=同一リージョン。要バージョニング。" },
      { k: "Object Lock(WORM)", v: "<strong>書込後の変更/削除を禁止</strong>。規制・改ざん防止保存。" },
      { k: "Block Public Access", v: "誤公開を一括ブロック(基本ON)。公開配信はCloudFront(OAC)経由。" },
      { k: "暗号化方式", v: "SSE-S3 / <strong>SSE-KMS</strong>(鍵管理・監査) / SSE-C(自前鍵)。" },
      { k: "署名付きURL", v: "一時的・期限付きで限定アクセス(非公開のまま配布)。" },
      { k: "S3 Gatewayエンドポイント", v: "VPCから<strong>インターネット経由せず</strong>S3へ(無料・NAT不要)。" },
      { k: "イベント通知", v: "PUT等を契機に<strong>Lambda/SQS/SNS</strong>を起動。" },
    ],
    flashcards: [
      { q: "S3を別リージョンに複製しDR/低遅延に使う機能は？", a: "クロスリージョンレプリケーション(CRR)" },
      { q: "規制で『書込後一切変更不可』のログ保管。機能は？", a: "S3 Object Lock(WORM)" },
      { q: "非公開のまま期限付きで特定ファイルをダウンロードさせたい。", a: "署名付きURL(presigned URL)" },
      { q: "S3への誤公開を防ぐ設定は？", a: "Block Public Access" },
      { q: "プライベートサブネットからインターネット経由せずS3へ。", a: "S3 Gatewayエンドポイント(無料)" },
      { q: "S3のレプリケーションに必要な前提設定は？", a: "バージョニングの有効化" },
    ],
    quiz: [
      {
        q: "コンプライアンス上、保存した監査ログを保持期間中は誰も(管理者でも)変更・削除できないようにしたい。最適なS3機能は？",
        choices: ["バージョニングのみ", "S3 Object Lock(コンプライアンスモード)", "SSE-KMS", "ライフサイクルルール"],
        answer: 1,
        explain: "<strong>変更/削除を禁止＝Object Lock(WORM)</strong>。コンプライアンスモードではルート含め保持期間中の削除が不可。",
      },
      {
        q: "プライベートサブネットのEC2が、NAT Gatewayの費用をかけずにS3へアクセスしたい。最適な方法は？",
        choices: ["NAT Gateway経由", "S3 Gatewayエンドポイントを作成", "Elastic IPを付与", "S3を公開する"],
        answer: 1,
        explain: "<strong>S3 Gatewayエンドポイント</strong>はVPCからインターネット/NATを介さずS3へ到達でき、NAT費用も不要。",
      },
      {
        q: "東京リージョンのS3データを、災害対策として大阪リージョンにも自動で保持したい。最適な構成は？",
        choices: ["スナップショットを手動コピー", "バージョニングを有効化しクロスリージョンレプリケーション(CRR)を設定", "Glacierに移す", "Block Public Accessを有効化"],
        answer: 1,
        explain: "別リージョンへの自動複製は<strong>CRR</strong>。前提として<strong>バージョニング</strong>が必要。",
      },
    ],
  },
  {
    id: "s3-classes", domain: "ストレージ", icon: "🧊", title: "S3 ストレージクラスとライフサイクル",
    intro: "コスト最適化の主役。アクセス頻度でクラスを選び、ライフサイクルで自動移行。数値感も少し暗記。",
    understand: [
      {
        h: "『どれくらいアクセスするか』で保管料金が変わる",
        body: "<p>同じS3でも、<strong>アクセス頻度</strong>に応じて複数の<strong>ストレージクラス</strong>があり、料金が大きく異なる。原則は『よく読むデータは取り出しが速く保管料が高い』『めったに読まないデータは保管料が安い代わりに取り出しに時間や料金がかかる』。コスト最適化のためにこの選び分けが重要になる。</p><table class='cmp'><tr><th>クラス</th><th>用途</th></tr><tr><td><strong>Standard</strong></td><td>頻繁にアクセス。標準</td></tr><tr><td><strong>Intelligent-Tiering</strong></td><td><strong>頻度が読めない</strong>→自動で最適クラスへ移動。迷ったらこれ</td></tr><tr><td><strong>Standard-IA</strong></td><td>たまに読む(取り出し有料・複数AZ)</td></tr><tr><td><strong>One Zone-IA</strong></td><td>1AZのみ・安いが冗長性低(再生成できるデータ)</td></tr><tr><td><strong>Glacier Instant</strong></td><td>アーカイブだが<strong>即時取り出し</strong></td></tr><tr><td><strong>Glacier Flexible</strong></td><td>数分〜数時間で取り出し</td></tr><tr><td><strong>Glacier Deep Archive</strong></td><td><strong>最安</strong>・取り出し最大約12h・長期保管</td></tr></table>",
        diagram:
          '<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="22" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">アクセス頻度 ↔ コストのスペクトラム</text>\
<rect x="20" y="50" width="140" height="50" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="90" y="72" fill="#4dabf7" font-size="11" font-weight="700" text-anchor="middle">Standard</text><text x="90" y="89" fill="#9aa6bd" font-size="9" text-anchor="middle">頻繁/即時/高め</text>\
<rect x="175" y="50" width="140" height="50" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="245" y="72" fill="#51cf9b" font-size="11" font-weight="700" text-anchor="middle">Standard-IA</text><text x="245" y="89" fill="#9aa6bd" font-size="9" text-anchor="middle">低頻度/取出有料</text>\
<rect x="330" y="50" width="140" height="50" rx="8" fill="#161e30" stroke="#ffc955"/><text x="400" y="72" fill="#ffc955" font-size="11" font-weight="700" text-anchor="middle">Glacier</text><text x="400" y="89" fill="#9aa6bd" font-size="9" text-anchor="middle">アーカイブ/遅い</text>\
<rect x="485" y="50" width="135" height="50" rx="8" fill="#161e30" stroke="#b08adf"/><text x="552" y="72" fill="#b08adf" font-size="11" font-weight="700" text-anchor="middle">Deep Archive</text><text x="552" y="89" fill="#9aa6bd" font-size="9" text-anchor="middle">最安/最大12h</text>\
<text x="90" y="128" fill="#6b7691" font-size="10" text-anchor="middle">← 高頻度・高コスト</text><text x="552" y="128" fill="#6b7691" font-size="10" text-anchor="middle">低頻度・低コスト →</text>\
<text x="320" y="158" fill="#9aa6bd" font-size="10" text-anchor="middle">頻度不明なら Intelligent-Tiering(自動最適化)</text>\
</svg>',
        cap: "右へ行くほど保管は安いが取り出しが遅い/有料。頻度不明はIntelligent-Tiering。",
      },
      {
        h: "ライフサイクルで自動的にコスト最適化する",
        body: "<p>データのアクセス頻度は時間とともに下がるのが普通だ(新しいログはよく見るが、古くなると見ない)。これを手動で移し替えるのは大変なので、<strong>ライフサイクルルール</strong>で<strong>経過日数に応じてクラスを自動移行・自動削除</strong>する。例:『作成30日後にStandard-IAへ → 90日後にGlacierへ → 1年後に削除』。これで人手なしにコストを最小化できる。</p><p>細かいが頻出の注意点として、各クラスには<strong>最小保管期間</strong>がある(IA=30日、Glacier Flexible=90日、Deep Archive=180日)。これより早く削除すると<strong>残り期間分が課金</strong>されるため、すぐ消すデータを安いクラスに入れるとかえって割高になることがある。",
      },
    ],
    memorize: [
      { k: "Intelligent-Tiering", v: "アクセス頻度が<strong>不明/変動</strong>→自動でクラス移動。迷ったらこれ。" },
      { k: "Standard-IA", v: "低頻度・複数AZ。<strong>取り出しに課金</strong>。最小保管30日。" },
      { k: "One Zone-IA", v: "1AZのみで安い。<strong>消えても再生成できるデータ</strong>向け。" },
      { k: "Glacier Deep Archive", v: "<strong>最安</strong>・取り出し最大約12時間。長期コンプラ保管。最小180日。" },
      { k: "ライフサイクル", v: "経過日数で<strong>自動クラス移動・自動削除</strong>。" },
      { k: "最小保管期間", v: "IA=30日/Glacier=90日/Deep Archive=180日。早期削除は残期間課金。" },
      { k: "選び方", v: "不明→Intelligent / 低頻度→IA / 長期保管→Glacier系 / 再生成可→One Zone-IA。" },
    ],
    flashcards: [
      { q: "アクセス頻度が読めない。自動でコスト最適化するクラスは？", a: "S3 Intelligent-Tiering" },
      { q: "7年保管・普段読まない・取り出しに時間OK。最安は？", a: "Glacier Deep Archive" },
      { q: "消えても再生成できる低頻度データを安く置きたい。", a: "One Zone-IA" },
      { q: "古いデータを自動で安いクラスへ移すには？", a: "ライフサイクルルール" },
      { q: "Standard-IAの最小保管期間は？", a: "30日(早期削除は残期間が課金)" },
    ],
    quiz: [
      {
        q: "規制で取引ログを10年保管する。普段アクセスせず、監査時に数時間以内に取り出せれば十分。最もコスト効率が高いのは？",
        choices: ["S3 Standard", "S3 Standard-IA", "S3 Glacier Deep Archive", "EBS"],
        answer: 2,
        explain: "<strong>長期・低頻度・取り出し遅延許容＝Glacier Deep Archive</strong>が最安。",
      },
      {
        q: "新サービスのデータで、今後のアクセスパターンが全く予測できない。運用の手間をかけずにストレージコストを最適化したい。最適なクラスは？",
        choices: ["S3 Standard固定", "S3 Intelligent-Tiering", "S3 One Zone-IA", "定期的に手動でクラス変更"],
        answer: 1,
        explain: "<strong>アクセス頻度が不明＝Intelligent-Tiering</strong>。アクセス状況に応じ自動でクラスを移動し手動運用が不要。",
      },
      {
        q: "頻繁にアクセスするが30日後にはほぼ読まれず、1年後は監査時のみ参照されるデータがある。コストを最小化する設定は？",
        choices: ["全期間Standard", "ライフサイクルで30日後IA→その後Glacierへ移行", "最初からDeep Archive", "One Zone-IAに固定"],
        answer: 1,
        explain: "アクセス頻度の変化に合わせ<strong>ライフサイクルで段階移行</strong>。最初からDeep Archiveだと頻繁アクセス期に取り出しコスト/遅延が問題。",
      },
    ],
  },
  {
    id: "block-file", domain: "ストレージ", icon: "💽", title: "EBS・EFS・FSx・インスタンスストア",
    intro: "サーバーに繋ぐディスク群。ブロック/共有ファイル/揮発を区別し、EBSのボリュームタイプも押さえる。",
    understand: [
      {
        h: "3種類のストレージを混同しない",
        body: "<p>S3(オブジェクト)とは別に、EC2に『ディスク』として繋ぐストレージがある。用途で明確に区別する。</p><ul><li><strong>EBS(Elastic Block Store)</strong>＝1台のEC2に繋ぐ<strong>仮想ハードディスク</strong>。OSやデータベースを置く。EC2を停止してもデータは残る(永続)。基本的に<strong>同一AZ内</strong>でのみ接続できる。</li><li><strong>EFS(Elastic File System)</strong>＝<strong>複数のEC2から同時にマウント</strong>できる共有ファイルシステム(NFS/Linux)。容量は自動で伸縮。複数サーバーで同じファイルを共有したいときに使う。</li><li><strong>インスタンスストア</strong>＝EC2に物理的に直結した高速ディスク。非常に速いが、<strong>インスタンスを停止/終了するとデータが消える(揮発性)</strong>。キャッシュや一時データ専用。</li></ul><p>判断:『複数サーバーで共有』→<strong>EFS</strong>、『1台に永続ディスク』→<strong>EBS</strong>、『Windows向け共有』→<strong>FSx for Windows</strong>、『消えてよい高速一時領域』→<strong>インスタンスストア</strong>。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="160" y="22" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">EBS = 1台専用</text>\
<rect x="60" y="40" width="90" height="34" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="105" y="62" fill="#e9edf5" font-size="10" text-anchor="middle">EC2</text>\
<rect x="60" y="95" width="90" height="34" rx="6" fill="#161e30" stroke="#4dabf7"/><text x="105" y="117" fill="#4dabf7" font-size="10" text-anchor="middle">EBS(永続)</text>\
<line x1="105" y1="74" x2="105" y2="95" stroke="#9aa6bd" stroke-width="2"/>\
<line x1="320" y1="20" x2="320" y2="180" stroke="#232c40"/>\
<text x="480" y="22" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">EFS = 複数で共有</text>\
<rect x="370" y="40" width="70" height="30" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="405" y="60" fill="#e9edf5" font-size="10" text-anchor="middle">EC2</text>\
<rect x="455" y="40" width="70" height="30" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="490" y="60" fill="#e9edf5" font-size="10" text-anchor="middle">EC2</text>\
<rect x="540" y="40" width="70" height="30" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="575" y="60" fill="#e9edf5" font-size="10" text-anchor="middle">EC2</text>\
<rect x="410" y="110" width="160" height="34" rx="6" fill="#161e30" stroke="#51cf9b"/><text x="490" y="132" fill="#51cf9b" font-size="10" text-anchor="middle">EFS(共有/自動伸縮)</text>\
<line x1="405" y1="70" x2="470" y2="110" stroke="#9aa6bd" stroke-width="1.5"/><line x1="490" y1="70" x2="490" y2="110" stroke="#9aa6bd" stroke-width="1.5"/><line x1="575" y1="70" x2="510" y2="110" stroke="#9aa6bd" stroke-width="1.5"/>\
</svg>',
        cap: "EBSは1台のEC2に専用接続。EFSは複数EC2から同時に共有マウントできる。",
      },
      {
        h: "EBSのボリュームタイプとスナップショット",
        body: "<p>EBSには性能特性の違うタイプがあり、ワークロードで選ぶ。</p><ul><li><strong>gp3 / gp2(汎用SSD)</strong>：バランス型の標準。<strong>gp3</strong>は容量と独立してIOPS/スループットを増設でき、まずこれを選ぶ。</li><li><strong>io2 / io1(プロビジョンドIOPS SSD)</strong>：<strong>高IOPS・低遅延</strong>。本番DBなどミッションクリティカル用途。</li><li><strong>st1(スループット最適化HDD)</strong>：大きな連続アクセス(ログ/ビッグデータ)。<strong>sc1(コールドHDD)</strong>：低頻度・最安。</li></ul><p><strong>スナップショット</strong>はEBSのバックアップで、<strong>S3に増分保存</strong>される。EBS自体はAZに固定されるが、スナップショット経由なら<strong>別AZ・別リージョンへ復元/コピー</strong>でき、これがAZ跨ぎの移行やDRの手段になる。Windows向け共有は<strong>FSx for Windows</strong>、HPCの高速並列ファイルは<strong>FSx for Lustre</strong>。</p>",
      },
    ],
    memorize: [
      { k: "EBS", v: "<strong>1台のEC2の永続ブロック</strong>(OS/DB)。原則同一AZ。" },
      { k: "EFS", v: "<strong>複数EC2から同時マウント</strong>の共有ファイル(NFS/Linux)・自動伸縮。" },
      { k: "FSx", v: "<strong>Windows共有→for Windows</strong> / <strong>HPC高速→for Lustre</strong>。" },
      { k: "インスタンスストア", v: "物理直結で高速だが<strong>停止/終了で消える(揮発)</strong>。一時データのみ。" },
      { k: "gp3", v: "汎用SSDの標準。容量と独立してIOPS/スループット増設可(まずこれ)。" },
      { k: "io2/io1", v: "<strong>高IOPS・低遅延</strong>。本番DB等ミッションクリティカル。" },
      { k: "st1 / sc1", v: "HDD。st1=スループット重視(ログ/大容量)、sc1=最安/低頻度。" },
      { k: "EBSスナップショット", v: "S3に増分保存。<strong>別AZ/別リージョンへ復元/コピー</strong>＝DR・移行。" },
      { k: "区別の呪文", v: "共有→EFS / 1台に永続→EBS / Windows共有→FSx / 消えてOK→インスタンスストア。" },
    ],
    flashcards: [
      { q: "複数のWebサーバーが同じファイル群を同時に読み書き。何を使う？", a: "EFS" },
      { q: "高IOPS・低遅延が要る本番DBのEBSタイプは？", a: "io2 / io1" },
      { q: "Windows向け共有ファイルストレージは？", a: "FSx for Windows File Server" },
      { q: "EBSを別リージョンに複製するには？", a: "スナップショットを取り別リージョンへコピー" },
      { q: "汎用でまず選ぶEBSタイプは？", a: "gp3(容量と独立してIOPS/スループット増設可)" },
    ],
    quiz: [
      {
        q: "Auto Scalingで増減する複数EC2が、ユーザーがアップロードした同一のファイル群へ同時に読み書きする。最適なストレージは？",
        choices: ["各EC2に個別のEBS", "Amazon EFS", "インスタンスストア", "S3を標準FSとしてマウント"],
        answer: 1,
        explain: "<strong>複数サーバーからの同時共有＝EFS</strong>。EBSは原則1台・同一AZ、インスタンスストアは揮発。",
      },
      {
        q: "本番のリレーショナルDBを稼働させるEC2に、低遅延で安定した高IOPSが要求される。最適なEBSボリュームタイプは？",
        choices: ["gp2", "sc1", "io2", "st1"],
        answer: 2,
        explain: "<strong>高IOPS・低遅延・ミッションクリティカル＝io2/io1</strong>。st1/sc1はHDDで低遅延DBに不適。",
      },
    ],
  },
  {
    id: "storage-gateway", domain: "ストレージ", icon: "🌉", title: "Storage Gateway・AWS Backup",
    intro: "ハイブリッドストレージと一元バックアップ。オンプレ連携と、複数サービスのバックアップ統合が論点。",
    understand: [
      {
        h: "オンプレとAWSを橋渡しする Storage Gateway",
        body: "<p><strong>Storage Gateway</strong>は、オンプレミスのサーバーから<strong>AWSのストレージをローカルのディスクのように使える</strong>ハイブリッドサービスだ。クラウド移行を一気に行わず、既存システムを動かしながら段階的にデータをAWSへ寄せたいときや、オンプレのバックアップ先をクラウドにしたいときに使う。3つのタイプを用途で区別する。</p><ul><li><strong>File Gateway</strong>：オンプレからNFS/SMBの共有として使い、実体は<strong>S3</strong>に保存。</li><li><strong>Volume Gateway</strong>：iSCSIのブロックストレージとして使い、<strong>S3にバックアップ</strong>(よく使う分を手元にキャッシュ/全データを手元に保管の2方式)。</li><li><strong>Tape Gateway</strong>：<strong>仮想テープ</strong>として既存のバックアップソフトから使い、実体は<strong>Glacier</strong>。物理テープ運用の置き換えに最適。</li></ul>",
        diagram:
          '<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="30" y="55" width="160" height="70" rx="10" fill="none" stroke="#9aa6bd" stroke-dasharray="5 4"/><text x="110" y="78" fill="#9aa6bd" font-size="11" font-weight="700" text-anchor="middle">オンプレミス</text><text x="110" y="100" fill="#e9edf5" font-size="10" text-anchor="middle">既存サーバー</text>\
<rect x="240" y="65" width="160" height="50" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="86" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">Storage Gateway</text><text x="320" y="103" fill="#9aa6bd" font-size="9" text-anchor="middle">ローカル同様に使う</text>\
<rect x="450" y="50" width="160" height="34" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="530" y="72" fill="#51cf9b" font-size="10" text-anchor="middle">S3 (File/Volume)</text>\
<rect x="450" y="96" width="160" height="34" rx="6" fill="#0c1220" stroke="#b08adf"/><text x="530" y="118" fill="#b08adf" font-size="10" text-anchor="middle">Glacier (Tape)</text>\
<line x1="190" y1="90" x2="238" y2="90" stroke="#9aa6bd" stroke-width="2"/><line x1="400" y1="85" x2="448" y2="70" stroke="#9aa6bd" stroke-width="1.5"/><line x1="400" y1="95" x2="448" y2="110" stroke="#9aa6bd" stroke-width="1.5"/>\
</svg>',
        cap: "オンプレから見ればローカルストレージ、実体はS3/Glacier。段階移行・バックアップに。",
      },
      {
        h: "複数サービスのバックアップを統合する AWS Backup",
        body: "<p>EBS・RDS・DynamoDB・EFS・Storage Gatewayなど、サービスごとに個別にバックアップを運用すると管理が煩雑になる。<strong>AWS Backup</strong>は、これらの<strong>バックアップをポリシーで一元管理</strong>するサービスだ。『毎日深夜にバックアップ、35日保持、別リージョンにもコピー』といったルール(バックアッププラン)を作れば、対象リソースに横断的に適用できる。<strong>クロスリージョン/クロスアカウントのコピー</strong>にも対応し、DRやコンプライアンス要件(集中管理・証跡)に応えられる。</p>",
      },
    ],
    memorize: [
      { k: "File Gateway", v: "オンプレのNFS/SMB共有を<strong>S3</strong>にバックエンド。" },
      { k: "Volume Gateway", v: "iSCSIブロックを<strong>S3にバックアップ</strong>(キャッシュ型/保管型)。" },
      { k: "Tape Gateway", v: "<strong>仮想テープ→Glacier</strong>。既存テープバックアップの置換。" },
      { k: "Storage Gatewayの用途", v: "<strong>段階的クラウド移行・オンプレのバックアップ先</strong>。" },
      { k: "AWS Backup", v: "複数サービスの<strong>バックアップをポリシー一元管理</strong>＋クロスリージョン/アカウントコピー。" },
      { k: "使い分け", v: "オンプレ連携→Storage Gateway / 全社バックアップ統制→AWS Backup。" },
    ],
    flashcards: [
      { q: "オンプレのファイルサーバーをS3にバックエンドし徐々にクラウド化したい。", a: "Storage Gateway(File Gateway)" },
      { q: "既存のテープバックアップ運用をAWSへ置き換えたい。", a: "Storage Gateway(Tape Gateway)→Glacier" },
      { q: "EBS/RDS/DynamoDB等のバックアップを一元的にポリシー管理したい。", a: "AWS Backup" },
      { q: "AWS Backupで災害対策に有効な機能は？", a: "クロスリージョン/クロスアカウントのバックアップコピー" },
    ],
    quiz: [
      {
        q: "オンプレのアプリがNFS共有に書き込むが、データはS3に保管してクラウド移行を進めたい。既存アプリはそのまま使いたい。最適なのは？",
        choices: ["DataSyncのみ", "Storage Gateway(File Gateway)", "Snowball", "S3 CLIで定期アップロード"],
        answer: 1,
        explain: "オンプレからNFS/SMBで使いつつS3にバックエンド＝<strong>File Gateway</strong>。アプリ変更なしでハイブリッド移行できる。",
      },
      {
        q: "EBS・RDS・DynamoDBのバックアップを、統一したスケジュールと保持ポリシーで管理し、別リージョンにもコピーしたい。最適なサービスは？",
        choices: ["各サービスで個別にスナップショット運用", "AWS Backup", "S3ライフサイクル", "CloudFormation"],
        answer: 1,
        explain: "複数サービス横断の<strong>バックアップ一元管理＝AWS Backup</strong>。ポリシーでスケジュール/保持/クロスリージョンコピーを統制できる。",
      },
    ],
  }
);
