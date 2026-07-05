/* =============================================================
   SAA Forge カリキュラム — 01 土台
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "global-infra", domain: "土台", icon: "🌏", title: "グローバルインフラと可用性",
    intro: "リージョン/AZ/エッジの違いと、可用性設計の出発点。SAAで最も繰り返し問われる土台。",
    understand: [
      {
        h: "クラウドとは「世界中のデータセンターを借りる」こと",
        body: "<p>従来、サービスを公開するには自分でサーバーを買い、置き場所(データセンター)を確保し、電源・空調・故障対応まで面倒を見る必要があった。AWSは、その<strong>巨大なデータセンター群を『必要な分だけ・使った分だけ』借りられる</strong>ようにしたものだ。サーバー1台を数分で立て、不要になれば消し、使った時間だけ課金される。</p><p>この『所有から利用へ』の転換が、後で学ぶすべての設計判断の前提になる。<strong>初期投資なしに始め、需要に応じて増減でき、世界中に即座に展開できる</strong>——この身軽さこそクラウドの本質だ。</p><p>そしてAWSの物理的な置き場所は、世界中の<strong>リージョン(地域)</strong>に分かれている。東京・大阪・バージニア・ロンドンなど、地理的に離れた拠点だ。どのリージョンを使うかは自分で選ぶ。</p>",
      },
      {
        h: "リージョンの中に複数のAZ——これが可用性の土台",
        body: "<p>1つのリージョンの中には、<strong>アベイラビリティゾーン(AZ)</strong>と呼ばれる独立したデータセンター群が<strong>2つ以上(多くは3つ以上)</strong>ある。各AZは数km〜数十km離れた別の建物にあり、電源・ネットワークも独立している。だから<strong>1つのAZが地震・火災・停電で全滅しても、別のAZは生き残る</strong>。</p><p>同時に、同一リージョン内のAZ同士は<strong>専用の超高速・低遅延の回線</strong>で結ばれているため、AZをまたいでデータを同期しても遅延はごくわずか。つまり『離れているのに、すぐ隣のように使える』。</p><p>ここから導かれるSAAの最重要原則が——<strong>『重要なものは必ず複数AZに置く』</strong>。サーバーもデータベースも1つのAZに固めると、そのAZの障害でサービス全体が止まる(これを単一障害点という)。複数AZに分散すれば、片方が落ちても動き続ける。試験では『可用性を高めたい』『AZ障害に耐えたい』ときの答えは、ほぼ必ず<strong>複数AZ配置</strong>だ。</p>",
        diagram:
          '<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="18" width="600" height="196" rx="12" fill="none" stroke="#4dabf7" stroke-dasharray="5 4"/><text x="36" y="42" fill="#4dabf7" font-size="14" font-weight="700">リージョン（例: 東京 ap-northeast-1）</text>\
<rect x="50" y="62" width="170" height="130" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="135" y="84" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">AZ-a</text><rect x="70" y="98" width="130" height="28" rx="6" fill="#0c1220" stroke="#2a3650"/><text x="135" y="117" fill="#e9edf5" font-size="11" text-anchor="middle">サーバー/DB(主)</text><text x="135" y="160" fill="#6b7691" font-size="10" text-anchor="middle">独立した電源/網</text>\
<rect x="250" y="62" width="170" height="130" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="335" y="84" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">AZ-c</text><rect x="270" y="98" width="130" height="28" rx="6" fill="#0c1220" stroke="#2a3650"/><text x="335" y="117" fill="#e9edf5" font-size="11" text-anchor="middle">複製(冗長化)</text><text x="335" y="160" fill="#6b7691" font-size="10" text-anchor="middle">片方落ちても継続</text>\
<rect x="450" y="62" width="150" height="130" rx="10" fill="#161e30" stroke="#2a3650"/><text x="525" y="84" fill="#9aa6bd" font-size="13" font-weight="700" text-anchor="middle">AZ-d…</text><text x="525" y="130" fill="#6b7691" font-size="10" text-anchor="middle">必要に応じ拡張</text>\
<line x1="220" y1="112" x2="250" y2="112" stroke="#51cf9b" stroke-width="2"/><text x="235" y="104" fill="#51cf9b" font-size="10" text-anchor="middle">高速・低遅延で接続</text>\
</svg>',
        cap: "1リージョン＝複数AZ。AZは独立しつつ高速回線で接続。AZをまたぐ冗長化が可用性設計の出発点。",
      },
      {
        h: "エッジと特殊ロケーション——『もっと近く』への拡張",
        body: "<p>リージョン/AZだけでは届かない『ユーザーのすぐ近く』のニーズに応えるのが、以下の拠点だ。</p><ul><li><strong>エッジロケーション</strong>：世界中に数百あるキャッシュ/配信拠点。CloudFront(CDN)やRoute 53が使い、コンテンツをユーザーの近くから配信して体感速度を上げる。AZよりはるかに数が多い。</li><li><strong>Local Zones</strong>：大都市のすぐ近くに計算資源を置き、<strong>1桁ミリ秒の超低遅延</strong>を提供(ゲーム・動画編集など)。</li><li><strong>Outposts</strong>：AWSのハードウェアを<strong>自社のデータセンターに設置</strong>する。データを社外に出せない規制や、オンプレと超低遅延で繋ぎたいハイブリッド用途に。</li><li><strong>Wavelength</strong>：通信会社の5Gネットワークのエッジに置き、モバイル端末へ超低遅延で届ける。</li></ul><p>『どこで動かすか』の選択肢が、用途(規制・遅延・モバイル)に応じて段階的に用意されている、と理解すればよい。</p>",
      },
    ],
    memorize: [
      { k: "AZ", v: "1リージョンに<strong>2つ以上(多くは3+)</strong>。独立した電源/網。<strong>複数AZ配置</strong>で単一AZ障害に耐える。" },
      { k: "AZ間接続", v: "同一リージョンのAZ同士は<strong>高速・低遅延の専用回線</strong>。同期しても遅延は小さい。" },
      { k: "単一障害点(SPOF)", v: "1箇所の故障で全体が止まる構成。複数AZ/冗長化で排除するのが鉄則。" },
      { k: "リージョン選定基準", v: "①コンプライアンス/データ所在地 ②ユーザーへの近さ(遅延) ③サービス提供の有無 ④価格。" },
      { k: "データの所在", v: "データは<strong>原則そのリージョンに留まる</strong>(明示的にコピーしない限り他リージョンへ出ない)。" },
      { k: "エッジロケーション", v: "CloudFront/Route 53/Global Acceleratorが使う配信拠点。数百。AZより多い。" },
      { k: "Local Zones", v: "大都市近接で<strong>1桁ミリ秒</strong>の超低遅延。" },
      { k: "Outposts", v: "<strong>オンプレにAWSを設置</strong>。データ所在地・低遅延ハイブリッド。" },
      { k: "Wavelength", v: "5Gエッジ。モバイル端末への超低遅延。" },
      { k: "グローバルサービス", v: "IAM/Route 53/CloudFront/Organizations等は<strong>リージョン非依存</strong>。" },
      { k: "マルチAZ vs マルチリージョン", v: "通常の高可用性は<strong>マルチAZ</strong>で足りる。マルチリージョンは広域災害対策(DR)や全世界低遅延のときだけ。" },
    ],
    flashcards: [
      { q: "AZ障害に耐える最も基本的な設計は？", a: "複数AZにまたがって配置する" },
      { q: "同一リージョンのAZ同士はどう繋がっている？", a: "高速・低遅延の専用回線(同期しても遅延小)" },
      { q: "オンプレに物理的にAWSを置きたい(データ所在地要件)。使うのは？", a: "AWS Outposts" },
      { q: "大都市の利用者に超低遅延で提供したい。使うのは？", a: "AWS Local Zones" },
      { q: "通常の高可用性はマルチAZ。ではマルチリージョンはいつ？", a: "広域災害対策(DR)や全世界規模の低遅延が要るとき" },
      { q: "リージョン非依存(グローバル)なサービスを3つ", a: "IAM / Route 53 / CloudFront" },
      { q: "単一障害点(SPOF)とは？", a: "1箇所の故障で全体が止まる構成。冗長化で排除する" },
    ],
    quiz: [
      {
        q: "金融規制により、特定の国の地理的範囲内にデータを保持することが求められている。一部のワークロードはオンプレミスのデータセンターで低遅延に動かす必要もある。最も適切な構成は？",
        choices: [
          "全ワークロードを最寄りのリージョンに移行する",
          "規制対象データは該当リージョンに置き、低遅延が要る部分はAWS Outpostsをオンプレに設置する",
          "CloudFrontのエッジに全データをキャッシュする",
          "Local Zonesに全データベースを配置する",
        ],
        answer: 1,
        explain: "データ所在地＋オンプレ低遅延の両立は<strong>Outposts</strong>(オンプレにAWS基盤を設置)が適切。エッジキャッシュやLocal Zonesはデータ所在地の根本要件を満たさない。",
      },
      {
        q: "高可用性のため、Webアプリを「単一障害点なし」で設計したい。最低限満たすべきことは？",
        choices: [
          "1つのAZ内でインスタンスを2台にする",
          "2つ以上のAZにインスタンスを分散し、ロードバランサーで束ねる",
          "より大きなインスタンスに変更する",
          "リージョンを2つ使う",
        ],
        answer: 1,
        explain: "単一障害点排除の基本は<strong>複数AZ分散＋ロードバランサー</strong>。同一AZ内の複数台はAZ障害で全滅する。マルチリージョンは要件次第で過剰。",
      },
    ],
  },
  {
    id: "well-architected", domain: "土台", icon: "🏛️", title: "Well-Architected と責任共有",
    intro: "試験の判断軸＝設計の6本柱。問題文のキーワードから『どの柱が問われているか』を見抜くのが合格の核心。",
    understand: [
      {
        h: "SAAは『最適な設計を選ぶ』試験——その物差しが6本柱",
        body: "<p>SAAは知識を問うだけのクイズではない。多くの問題は<strong>『この要件なら、どの構成が一番良いか』</strong>を選ばせる。だから、何をもって『良い』とするかの<strong>共通の物差し</strong>が必要になる。それがAWSの<strong>Well-Architected Framework(優れた設計の枠組み)</strong>であり、6本の柱で構成される。</p><p>重要なのは、問題文には必ず<strong>『どの柱を重視しているか』のヒント</strong>が埋め込まれている、ということ。『最もコストを抑えて』ならコスト最適化、『運用の手間を最小に』なら運用上の優秀性、『落ちないように』なら信頼性、というように。<strong>問われている柱を読み取れれば、機能的に正しくても柱に合わない選択肢を切れる</strong>。これが合格の核心テクニックだ。</p>",
        diagram:
          '<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="26" fill="#e9edf5" font-size="13" font-weight="700" text-anchor="middle">Well-Architected Framework — 6本の柱</text>\
<rect x="25" y="45" width="190" height="46" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="120" y="66" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">運用上の優秀性</text><text x="120" y="82" fill="#9aa6bd" font-size="10" text-anchor="middle">自動化・監視・改善</text>\
<rect x="225" y="45" width="190" height="46" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="66" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">セキュリティ</text><text x="320" y="82" fill="#9aa6bd" font-size="10" text-anchor="middle">最小権限・暗号化</text>\
<rect x="425" y="45" width="190" height="46" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="520" y="66" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">信頼性</text><text x="520" y="82" fill="#9aa6bd" font-size="10" text-anchor="middle">落ちない・復旧</text>\
<rect x="25" y="103" width="190" height="46" rx="8" fill="#161e30" stroke="#ffc955"/><text x="120" y="124" fill="#ffc955" font-size="12" font-weight="700" text-anchor="middle">パフォーマンス効率</text><text x="120" y="140" fill="#9aa6bd" font-size="10" text-anchor="middle">速さ・適切な選択</text>\
<rect x="225" y="103" width="190" height="46" rx="8" fill="#161e30" stroke="#b08adf"/><text x="320" y="124" fill="#b08adf" font-size="12" font-weight="700" text-anchor="middle">コスト最適化</text><text x="320" y="140" fill="#9aa6bd" font-size="10" text-anchor="middle">無駄を削る</text>\
<rect x="425" y="103" width="190" height="46" rx="8" fill="#161e30" stroke="#4dd4c4"/><text x="520" y="124" fill="#4dd4c4" font-size="12" font-weight="700" text-anchor="middle">持続可能性</text><text x="520" y="140" fill="#9aa6bd" font-size="10" text-anchor="middle">環境負荷の最小化</text>\
<text x="320" y="180" fill="#e9edf5" font-size="11" text-anchor="middle">問題文のキーワード→どの柱が主眼か を見抜く</text>\
</svg>',
        cap: "6本の柱。問題文の言い回しから『どの柱が問われているか』を読み取るのが解法の鍵。",
      },
      {
        h: "各柱の中身と『キーワード→柱』の変換",
        body: "<p>それぞれの柱が何を目指すかと、問題文での典型的な言い回しを対応づけて覚えると一気に解きやすくなる。</p><ul><li><strong>運用上の優秀性</strong>：運用を自動化・監視し改善し続ける。『<strong>運用負荷を最小に</strong>』『管理の手間を減らす』→マネージド/サーバーレス、IaC(CloudFormation)。</li><li><strong>セキュリティ</strong>：最小権限・暗号化・多層防御。『安全に』『機密を守る』→IAMロール、KMS、プライベートサブネット。</li><li><strong>信頼性</strong>：障害から守り・復旧する。『<strong>落ちない</strong>』『耐障害性』『復旧』→Multi-AZ、Auto Scaling、バックアップ、疎結合。</li><li><strong>パフォーマンス効率</strong>：適切な資源で速く。『<strong>速く</strong>』『遅延』『スループット』→キャッシュ、CDN、適切なインスタンス/DB選択。</li><li><strong>コスト最適化</strong>：必要なだけに絞り無駄を削る。『<strong>最も安く</strong>』『コスト効率』→料金モデル、ストレージクラス、不要資源の停止、サーバーレス。</li><li><strong>持続可能性</strong>：環境負荷を抑える。リソース効率の最大化。</li></ul>",
      },
      {
        h: "責任共有モデル——『どこまでがAWSの責任か』",
        body: "<p>セキュリティの責任は、AWSと利用者で分担される。これが<strong>責任共有モデル</strong>だ。</p><p><strong>AWSはクラウド『の』セキュリティ</strong>を担う——データセンターの物理セキュリティ、サーバーのハードウェア、仮想化基盤、マネージドサービスの土台。<strong>利用者はクラウド『内』のセキュリティ</strong>を担う——自分のデータ、OS/アプリの設定、IAMでのアクセス管理、暗号化、ネットワーク(SG/サブネット)の設定。</p><p>ポイントは、<strong>サービスによって境界が動く</strong>こと。EC2は仮想マシンを自分で使うので<strong>OSのパッチ適用まで利用者の責任</strong>。一方、RDSやS3のようなマネージドサービスは、パッチや基盤の冗長化を<strong>AWSが担い</strong>、利用者はデータとアクセス制御に集中できる。『マネージドに寄せるほど、利用者の運用責任は減る』と理解すればよい。</p>",
      },
    ],
    memorize: [
      { k: "6本柱", v: "運用上の優秀性/セキュリティ/<strong>信頼性</strong>/パフォーマンス効率/<strong>コスト最適化</strong>/持続可能性。" },
      { k: "運用負荷の合図", v: "「運用負荷最小/管理不要」→<strong>マネージド/サーバーレス</strong>(Lambda/Fargate/RDS/DynamoDB)・IaC。" },
      { k: "信頼性の合図", v: "「落ちない/復旧/耐障害」→<strong>Multi-AZ・Auto Scaling・バックアップ・疎結合</strong>。" },
      { k: "性能の合図", v: "「速く/遅延/スループット」→<strong>キャッシュ・CDN・適切なインスタンス/DB</strong>。" },
      { k: "コストの合図", v: "「最も安く/コスト効率」→<strong>料金モデル・ストレージクラス・サーバーレス・不要資源停止</strong>。" },
      { k: "セキュリティの合図", v: "「安全/機密」→<strong>IAMロール・最小権限・KMS暗号化・プライベート配置</strong>。" },
      { k: "解法のコツ", v: "機能的に正しくても<strong>問われている柱に合わない選択肢は切る</strong>。" },
      { k: "責任共有", v: "AWS=『の』(物理/基盤)、利用者=『内』(データ/設定/IAM)。" },
      { k: "EC2の責任", v: "<strong>OSパッチ適用まで利用者</strong>の責任(自前の仮想マシンのため)。" },
      { k: "マネージドの責任", v: "RDS/S3等はパッチ・基盤冗長化を<strong>AWSが担う</strong>。利用者はデータ/アクセス制御。" },
    ],
    flashcards: [
      { q: "「運用負荷を最小に」と来たら方向性は？", a: "マネージド/サーバーレスを選ぶ(Lambda/Fargate/RDS/DynamoDB)" },
      { q: "「落ちないように」の定番解答群は？", a: "Multi-AZ・Auto Scaling・バックアップ・疎結合(SQS)" },
      { q: "「最もコスト効率が良いのは」の判断は？", a: "要件を満たす中で最も安い選択肢" },
      { q: "EC2のOSパッチ適用は誰の責任？", a: "利用者(クラウド『内』の責任)" },
      { q: "S3/RDSの基盤パッチや冗長化は誰の責任？", a: "AWS(マネージドサービスとして基盤側が担う)" },
      { q: "SAAの解法の核心テクニックは？", a: "問題文から『どの柱が主眼か』を読み取り、合わない選択肢を切る" },
    ],
    quiz: [
      {
        q: "あるアーキテクトが複数の設計案を比較している。設問は『運用上のオーバーヘッドを最小にする』ことを求めている。どの案を選ぶべきか？",
        choices: [
          "自前でEC2上にすべてを構築し細かく制御する案",
          "可能な限りマネージド/サーバーレスサービスを使う案",
          "最も高性能なインスタンスを使う案",
          "最も安価なリージョンを使う案",
        ],
        answer: 1,
        explain: "『運用負荷最小』が主眼なら<strong>マネージド/サーバーレス</strong>を選ぶ。パッチ/スケール/可用性をAWSに任せられる。",
      },
      {
        q: "RDSを利用している。データベースエンジンのマイナーバージョンパッチ適用の基盤作業は、責任共有モデル上どちらの責任か？",
        choices: ["利用者", "AWS(マネージドサービスとして基盤側が担う)", "両者半々", "第三者ベンダー"],
        answer: 1,
        explain: "RDSはマネージドのため<strong>パッチ等の基盤運用はAWS側</strong>。利用者はデータ・アクセス制御・パラメータ設定等を担う(EC2上の自前DBとはここが異なる)。",
      },
    ],
  },
  {
    id: "organizations", domain: "土台", icon: "🏢", title: "Organizations と複数アカウント管理",
    intro: "複数アカウントの統制・一括請求・ガードレール。大企業シナリオで頻出。SCPによる制限が重要論点。",
    understand: [
      {
        h: "なぜアカウントを複数に分けるのか",
        body: "<p>規模が大きくなると、1つのAWSアカウントにすべてを詰め込むのは危険で不便になる。そこで<strong>用途や部門ごとにアカウントを分ける</strong>(本番用・開発用・経理用…)のが定石だ。理由は3つ。</p><ul><li><strong>影響範囲(ブラストradius)の分離</strong>：開発アカウントでの事故が本番に波及しない。</li><li><strong>請求の分離</strong>：アカウント単位でコストが分かれ、部門ごとの費用が見える。</li><li><strong>権限の分離</strong>：チームごとに独立した権限境界を持てる。</li></ul><p>この『多数のアカウント』を、バラバラにせず<strong>一元的に統制する</strong>ための仕組みが<strong>AWS Organizations</strong>だ。アカウントを<strong>OU(組織単位)</strong>という入れ物でグループ化し、ツリー状に管理する。</p>",
        diagram:
          '<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="240" y="20" width="160" height="40" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="38" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">管理アカウント</text><text x="320" y="53" fill="#9aa6bd" font-size="9" text-anchor="middle">一括請求・SCP適用元</text>\
<line x1="320" y1="60" x2="320" y2="80" stroke="#9aa6bd" stroke-width="1.5"/><line x1="160" y1="80" x2="480" y2="80" stroke="#9aa6bd" stroke-width="1.5"/>\
<line x1="160" y1="80" x2="160" y2="100" stroke="#9aa6bd" stroke-width="1.5"/><line x1="480" y1="80" x2="480" y2="100" stroke="#9aa6bd" stroke-width="1.5"/>\
<rect x="70" y="100" width="180" height="36" rx="8" fill="#0c1220" stroke="#4dabf7"/><text x="160" y="123" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">OU: 本番</text>\
<rect x="390" y="100" width="180" height="36" rx="8" fill="#0c1220" stroke="#4dabf7"/><text x="480" y="123" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">OU: 開発</text>\
<rect x="80" y="150" width="75" height="32" rx="6" fill="#161e30" stroke="#2a3650"/><text x="117" y="170" fill="#e9edf5" font-size="10" text-anchor="middle">アカウント</text>\
<rect x="165" y="150" width="75" height="32" rx="6" fill="#161e30" stroke="#2a3650"/><text x="202" y="170" fill="#e9edf5" font-size="10" text-anchor="middle">アカウント</text>\
<rect x="400" y="150" width="75" height="32" rx="6" fill="#161e30" stroke="#2a3650"/><text x="437" y="170" fill="#e9edf5" font-size="10" text-anchor="middle">アカウント</text>\
<rect x="485" y="150" width="75" height="32" rx="6" fill="#161e30" stroke="#2a3650"/><text x="522" y="170" fill="#e9edf5" font-size="10" text-anchor="middle">アカウント</text>\
<rect x="160" y="200" width="320" height="28" rx="6" fill="none" stroke="#a8412f" stroke-dasharray="4 3"/><text x="320" y="219" fill="#d9745f" font-size="10" text-anchor="middle">SCP = OU/アカウントの権限の上限(ガードレール)</text>\
</svg>',
        cap: "管理アカウントの下にOUでアカウントを階層化。SCPで配下の権限上限を強制する。",
      },
      {
        h: "一括請求でコストを最適化する",
        body: "<p>Organizationsの大きな利点が<strong>一括請求(Consolidated Billing)</strong>だ。複数アカウントの請求を1つにまとめると、次の効果がある。</p><ul><li><strong>ボリューム割引の合算</strong>：使用量がアカウント横断で合算され、段階割引が効きやすくなる。</li><li><strong>リザーブドインスタンス/Savings Plansの共有</strong>：あるアカウントで購入した割引枠の余りを、<strong>組織内の他アカウントが自動で利用</strong>できる。無駄なく割引を使い切れる。</li></ul><p>つまり、アカウントを分けて管理性を上げつつ、コスト面では『1つの大口顧客』として扱われる、いいとこ取りができる。</p>",
      },
      {
        h: "SCPは『権限の上限』——許可ではなく制限",
        body: "<p>複数アカウントを統制する上で最重要なのが<strong>SCP(サービスコントロールポリシー)</strong>だ。SCPはアカウントやOUに対して<strong>『ここまでしか許さない』という権限の上限(ガードレール)</strong>を設定する。</p><p>勘違いしやすいのは、<strong>SCPは権限を『与えない』</strong>こと。あくまで上限を絞るだけで、実際の許可はIAMで行う。<strong>実効的な権限＝SCPで許された範囲 ∩ IAMで許された範囲</strong>(両方で許可された部分だけ)。だから<strong>SCPで禁止された操作は、たとえIAMで管理者権限を与えても実行できない</strong>。例えば『開発OUでは特定リージョン以外を使わせない』『誰もCloudTrailを無効化できない』といった<strong>組織全体の鉄壁ルール</strong>を、各アカウントの設定ミスに関係なく強制できる。</p><p>関連して、<strong>Control Tower</strong>はこうしたベストプラクティス(SCPガードレール、ログ集約、アカウント発行の標準化)を<strong>自動でセットアップ</strong>してくれるサービスだと押さえておく。</p>",
      },
    ],
    memorize: [
      { k: "アカウント分割の利点", v: "<strong>影響範囲の分離・請求の分離・権限の分離</strong>。本番/開発/経理などで分ける。" },
      { k: "Organizations", v: "複数アカウントを<strong>OU(組織単位)</strong>で階層的に統制。アカウント発行も可。" },
      { k: "一括請求", v: "請求を統合し<strong>ボリューム割引合算・RI/SP共有</strong>でコスト最適化。" },
      { k: "SCP", v: "アカウント/OUの<strong>権限の上限(ガードレール)</strong>。<strong>許可は与えず上限を絞る</strong>だけ。" },
      { k: "実効権限", v: "<strong>SCP ∩ IAM</strong>(両方で許可された部分のみ)。SCP拒否はIAM許可より強い。" },
      { k: "SCPはルートにも効く", v: "アカウント内のルートユーザーにも適用(ただし管理アカウント自身は対象外)。" },
      { k: "管理アカウント", v: "Organizationsの親。一括請求とSCP適用の元。<strong>SCPの制限対象外</strong>。" },
      { k: "Control Tower", v: "マルチアカウント環境を<strong>ベストプラクティスで自動構築</strong>(ガードレール/ログ集約)。" },
    ],
    flashcards: [
      { q: "なぜAWSアカウントを複数に分ける？", a: "影響範囲・請求・権限を分離するため" },
      { q: "組織全体でRI/割引を共有しコストを下げたい。使うのは？", a: "Organizationsの一括請求(Consolidated Billing)" },
      { q: "特定OUで『絶対にやらせない操作』を強制したい。使うのは？", a: "SCP(サービスコントロールポリシー)" },
      { q: "SCPで拒否、IAMで許可。操作できる？", a: "できない(実効権限はSCP ∩ IAM)" },
      { q: "SCPはルートユーザーに効く？", a: "効く(ただし管理アカウント自身は対象外)" },
      { q: "ベストプラクティスな複数アカウント環境を自動構築するのは？", a: "AWS Control Tower" },
    ],
    quiz: [
      {
        q: "ある企業は数十のAWSアカウントを運用し、開発用OUのアカウントでは『特定リージョン以外でのリソース作成を一切禁止』したい。IAMの設定に関わらず確実に強制する方法は？",
        choices: [
          "各アカウントのIAMポリシーで個別に拒否する",
          "対象OUにSCPを適用しリージョンを制限する",
          "Security Groupで制御する",
          "CloudTrailで監視して事後に削除する",
        ],
        answer: 1,
        explain: "アカウント横断の確実なガードレールは<strong>SCP</strong>。IAM任せだと各アカウントの設定ミスで抜ける。SCPで許可しない操作はIAMで許可されても実行不可。",
      },
      {
        q: "複数のAWSアカウントを持つ企業が、リザーブドインスタンスの割引を全社で無駄なく活用し、請求も一本化したい。最適な仕組みは？",
        choices: ["各アカウントで個別にRIを購入", "Organizationsの一括請求でRI/割引を共有", "全アカウントを1つに統合する", "Cost Explorerで按分する"],
        answer: 1,
        explain: "<strong>Organizationsの一括請求</strong>はRI/Savings Plansの割引を組織内で共有し、ボリューム割引も効く。アカウント統合は管理性・分離の利点を失う。",
      },
    ],
  }
);
