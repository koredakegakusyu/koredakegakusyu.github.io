/* =============================================================
   コレダケAWS CCP カリキュラム — 02 グローバルインフラ
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-global-infra", domain: "クラウド概念", icon: "🌏", title: "グローバルインフラ（リージョン・AZ・エッジ）",
    intro: "リージョン・アベイラビリティゾーン（AZ）・エッジロケーションの違い。可用性の考え方の土台。",
    understand: [
      {
        h: "リージョンの中に複数のAZ——これが可用性の土台",
        body:
          "<p>AWSの物理的な設備は世界中の<strong>リージョン（地域）</strong>に分かれています（東京・大阪・バージニアなど）。どのリージョンを使うかは自分で選びます。</p>" +
          "<p>1つのリージョンの中には、<strong>アベイラビリティゾーン（AZ）</strong>という独立したデータセンター群が<strong>2つ以上（多くは3つ以上）</strong>あります。各AZは離れた別の建物にあり、電源もネットワークも独立。だから<strong>1つのAZが災害・停電でダウンしても、別のAZは生き残ります</strong>。同時に、同一リージョン内のAZ同士は<strong>高速・低遅延の専用回線</strong>で結ばれています。</p>" +
          "<p>ここから導かれる最重要原則が<strong>「重要なものは複数のAZに置く（マルチAZ）」</strong>。1つのAZに固めると、そのAZ障害で全体が止まります（＝単一障害点）。複数AZに分散すれば、片方が落ちても動き続けます。</p>",
        diagram:
          '<svg viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="300" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">1リージョン ＝ 複数のAZ（独立＋高速接続）</text>' +
          '<rect x="24" y="36" width="552" height="150" rx="12" fill="#f6f9fb" stroke="#4a7fa8" stroke-dasharray="6 4"/>' +
          '<text x="40" y="58" fill="#34567a" font-size="12" font-weight="800">リージョン（例：東京 ap-northeast-1）</text>' +
          '<rect x="48" y="72" width="150" height="96" rx="9" fill="#dce8f3" stroke="#4a7fa8"/><text x="123" y="94" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">AZ-a</text><rect x="64" y="104" width="118" height="26" rx="5" fill="#eef4f9" stroke="#9db8cd"/><text x="123" y="121" fill="#23252b" font-size="10" text-anchor="middle">サーバー/DB（主）</text><text x="123" y="152" fill="#6b6e76" font-size="9" text-anchor="middle">独立した電源・網</text>' +
          '<rect x="225" y="72" width="150" height="96" rx="9" fill="#dcecdd" stroke="#5c9160"/><text x="300" y="94" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">AZ-c</text><rect x="241" y="104" width="118" height="26" rx="5" fill="#eef7ef" stroke="#a9ccab"/><text x="300" y="121" fill="#23252b" font-size="10" text-anchor="middle">複製（冗長化）</text><text x="300" y="152" fill="#6b6e76" font-size="9" text-anchor="middle">片方落ちても継続</text>' +
          '<rect x="402" y="72" width="150" height="96" rx="9" fill="#f2e7cd" stroke="#b28a2e"/><text x="477" y="94" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">AZ-d …</text><text x="477" y="128" fill="#7a5e17" font-size="10" text-anchor="middle">必要に応じ拡張</text>' +
          '<line x1="198" y1="120" x2="225" y2="120" stroke="#a85733" stroke-width="2"/><line x1="375" y1="120" x2="402" y2="120" stroke="#a85733" stroke-width="2"/>' +
          '<text x="300" y="200" fill="#a85733" font-size="10.5" font-weight="700" text-anchor="middle">AZ同士は高速・低遅延で接続 → AZをまたぐ冗長化が可用性設計の出発点</text>' +
          "</svg>",
        cap: "1リージョンに複数AZ。各AZは独立しつつ高速回線で接続。マルチAZ配置が可用性の基本。",
      },
      {
        h: "エッジロケーション——『ユーザーのすぐ近く』への配信",
        body:
          "<p>リージョンや AZ よりも<strong>さらに利用者に近い場所</strong>に置かれた、世界中に数百ある配信専用の拠点が <strong>エッジロケーション</strong>です。目的は可用性ではなく<strong>“速さ（低遅延）”</strong>。遠くのリージョンにある大もと（オリジン）まで毎回データを取りに行くと時間がかかりますが、一度アクセスされたコンテンツを近くのエッジに<strong>キャッシュ（一時保存）</strong>しておけば、次からはその近くのエッジから配信でき、表示が速くなります。</p>" +
          "<p>これを使う代表が <strong>CloudFront（CDN）</strong>で、画像・動画・Web ページなどを利用者の最寄りのエッジから配信します。<strong>Route 53（DNS）</strong>もエッジの拠点網を使い、世界中どこからでも高速に名前解決（ドメイン名→IP）を行います。エッジロケーションは AZ よりも<strong>はるかに数が多い</strong>のが特徴です。</p>" +
          "<p>混同を防ぐ覚え方：『<strong>AZ ＝ 可用性のための独立データセンター</strong>（止まりにくくする）』『<strong>エッジ ＝ 速さのための配信拠点</strong>（速く届ける）』と、役割で分けて覚えます。</p>",
      },
    ],
    memorize: [
      { k: "リージョン", v: "地理的に離れた地域（東京・大阪等）。利用者が選ぶ。データは原則そのリージョンに留まる。" },
      { k: "アベイラビリティゾーン(AZ)", v: "1リージョンに<strong>2つ以上</strong>ある独立データセンター群。電源・網が独立。" },
      { k: "マルチAZ", v: "複数AZに分散配置して単一AZ障害に耐える。<strong>高可用性の基本</strong>。" },
      { k: "単一障害点(SPOF)", v: "1箇所の故障で全体が止まる構成。冗長化で排除する。" },
      { k: "エッジロケーション", v: "利用者に近い配信拠点。CloudFront/Route 53が使う。AZより数が多い。" },
      { k: "グローバルサービス", v: "IAM・Route 53・CloudFront・Organizations等はリージョンに依存しない。" },
    ],
    flashcards: [
      { q: "AZ障害に耐える最も基本的な設計は？", a: "複数のAZにまたがって配置する（マルチAZ）。" },
      { q: "リージョンとAZの関係は？", a: "1つのリージョンの中に複数（2つ以上）の独立したAZがある。" },
      { q: "エッジロケーションは何のためにある？", a: "利用者に近い場所からコンテンツを配信して体感速度を上げるため（CloudFront等が使う）。" },
      { q: "単一障害点（SPOF）とは？", a: "1箇所が故障するとシステム全体が止まってしまう構成のこと。冗長化で排除する。" },
      { q: "リージョンを選ぶときの主な基準を挙げると？", a: "法令・データ所在地、利用者への近さ（遅延）、使いたいサービスの有無、価格。" },
    ],
    quiz: [
      {
        q: "システムの可用性を高め、単一のデータセンター障害に耐えられるようにするための、最も基本的なAWSの設計手法はどれか。",
        choices: [
          "1つのアベイラビリティゾーンにすべてのサーバーを集約する",
          "複数のアベイラビリティゾーン（AZ）にまたがってリソースを配置する",
          "1台の高性能サーバーだけを使う",
          "エッジロケーションにデータベースを置く",
        ],
        answer: 1,
        explain: "AZ障害に耐えるには<strong>複数AZ（マルチAZ）配置</strong>が基本。1つのAZに集約すると単一障害点になる。",
      },
      {
        q: "アベイラビリティゾーン（AZ）に関する記述として適切なものはどれか。",
        choices: [
          "1つのリージョンには必ず1つだけ存在する",
          "1つのリージョン内にある、電源やネットワークが独立した1つ以上のデータセンター群である",
          "世界中に数百あるコンテンツ配信専用の拠点である",
          "利用者のオフィス内に設置する機器である",
        ],
        answer: 1,
        explain: "AZは<strong>リージョン内の独立したデータセンター群</strong>（2つ以上）。数百ある配信拠点はエッジロケーション。",
      },
      {
        q: "CloudFrontなどが利用者の近くからコンテンツを配信して表示を高速化するために使う、世界中に多数あるAWSの拠点はどれか。",
        choices: ["アベイラビリティゾーン", "エッジロケーション", "リージョン", "VPC"],
        answer: 1,
        explain: "利用者に近い配信拠点は<strong>エッジロケーション</strong>。可用性のための独立DCがAZ。",
      },
    ],
  }
);
