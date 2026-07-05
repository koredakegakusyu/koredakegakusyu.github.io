/* =============================================================
   SAA Forge カリキュラム — 07 ネットワーキング
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "vpc", domain: "ネットワーキング", icon: "🌐", title: "VPC の設計",
    intro: "自分専用の仮想ネットワーク。公開/非公開サブネット、NAT、SG vs NACL が超頻出。図で一気に。",
    understand: [
      {
        h: "VPCは『AWS上に作る自分専用のネットワーク』",
        body: "<p><strong>VPC(Virtual Private Cloud)</strong>は、AWSの中に区切られた<strong>自分専用の仮想ネットワーク</strong>だ。社内LANのようなもので、ここに<strong>CIDR(例 10.0.0.0/16)</strong>でIPアドレスの範囲を決め、その中を<strong>サブネット</strong>に分けて使う。重要なのは<strong>1つのサブネットは1つのAZに属する</strong>こと。だから複数AZに冗長化するには、AZごとにサブネットを作る。</p><p>サブネットは役割で2種類に分ける。<strong>パブリックサブネット</strong>＝<strong>インターネットゲートウェイ(IGW)</strong>へのルートを持ち、外部と直接通信できる。Webサーバーやロードバランサーを置く。<strong>プライベートサブネット</strong>＝外部から直接アクセスできない。データベースや内部サーバーを置く。この『公開/非公開の分離』が安全な3層構成(Web/アプリ/DB)の基礎になる。</p>",
        diagram:
          '<svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="40" width="600" height="232" rx="12" fill="none" stroke="#ff9d3c"/><text x="36" y="62" fill="#ff9d3c" font-size="13" font-weight="700">VPC (10.0.0.0/16)</text>\
<rect x="270" y="8" width="100" height="26" rx="8" fill="#0c1220" stroke="#9aa6bd"/><text x="320" y="26" fill="#e9edf5" font-size="11" text-anchor="middle">インターネット</text>\
<rect x="285" y="46" width="70" height="22" rx="6" fill="#161e30" stroke="#51cf9b"/><text x="320" y="62" fill="#51cf9b" font-size="11" text-anchor="middle">IGW</text>\
<line x1="320" y1="34" x2="320" y2="46" stroke="#9aa6bd" stroke-width="2"/>\
<rect x="45" y="88" width="270" height="170" rx="10" fill="none" stroke="#4dabf7" stroke-dasharray="5 4"/><text x="60" y="108" fill="#4dabf7" font-size="12" font-weight="700">パブリックサブネット</text>\
<rect x="75" y="122" width="100" height="30" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="125" y="141" fill="#e9edf5" font-size="11" text-anchor="middle">Web/ELB</text>\
<rect x="190" y="122" width="100" height="30" rx="6" fill="#0c1220" stroke="#ff9d3c"/><text x="240" y="141" fill="#ff9d3c" font-size="11" text-anchor="middle">NAT GW</text>\
<line x1="240" y1="122" x2="305" y2="68" stroke="#9aa6bd" stroke-width="1.5"/>\
<rect x="325" y="88" width="270" height="170" rx="10" fill="none" stroke="#9aa6bd" stroke-dasharray="5 4"/><text x="340" y="108" fill="#9aa6bd" font-size="12" font-weight="700">プライベートサブネット</text>\
<rect x="360" y="122" width="100" height="30" rx="6" fill="#0c1220" stroke="#2a3650"/><text x="410" y="141" fill="#e9edf5" font-size="11" text-anchor="middle">アプリ</text>\
<rect x="475" y="122" width="100" height="30" rx="6" fill="#0c1220" stroke="#2a3650"/><text x="525" y="141" fill="#e9edf5" font-size="11" text-anchor="middle">DB(RDS)</text>\
<line x1="360" y1="185" x2="240" y2="152" stroke="#51cf9b" stroke-width="1.5"/><text x="300" y="205" fill="#51cf9b" font-size="10" text-anchor="middle">外向きはNAT経由</text>\
</svg>',
        cap: "Webは公開、DBは非公開。非公開からの外向き通信はNAT GW経由。",
      },
      {
        h: "外向き通信を可能にするNATゲートウェイ",
        body: "<p>プライベートサブネットのサーバーは外部から守られているが、<strong>自分から外へ出る通信(OSアップデートのダウンロード、外部APIの呼び出しなど)</strong>はしたいことが多い。これを安全に実現するのが<strong>NATゲートウェイ</strong>だ。NATは<strong>『内→外はOK、外→内はNG』の一方通行</strong>を作る。プライベートのサーバーはNAT経由で外に出られるが、外部から直接入ってくることはできない。</p><p>NAT GWはパブリックサブネットに置き、マネージドで自動スケールする(自前のNATインスタンスより<strong>NAT GWが推奨</strong>)。高可用性のためには<strong>各AZにNAT GWを置く</strong>のがベストプラクティス。なお、S3やDynamoDBへの通信ならNATを使わず<strong>VPCエンドポイント(無料/安価)</strong>で済ませる方がコスト効率が良い(次の科目)。</p>",
      },
      {
        h: "セキュリティグループ(SG) と ネットワークACL(NACL)",
        body: "<p>VPC内の通信制御は2層ある。違いが頻出なので表で押さえる。</p><table class='cmp'><tr><th></th><th>セキュリティグループ(SG)</th><th>ネットワークACL(NACL)</th></tr><tr><td>適用先</td><td><strong>インスタンス単位</strong></td><td><strong>サブネット単位</strong></td></tr><tr><td>状態</td><td><strong>ステートフル</strong>(戻りは自動許可)</td><td><strong>ステートレス</strong>(戻りも明示が必要)</td></tr><tr><td>ルール</td><td><strong>許可のみ</strong></td><td>許可と<strong>拒否(Deny)も書ける</strong></td></tr></table><p>使い分けの要点:通常のサーバー単位のアクセス制御は<strong>SG</strong>。『特定のIPアドレスを<strong>拒否(ブロック)</strong>したい』ときは、SGにDenyが書けないので<strong>NACL</strong>を使う。また、NACLはステートレスなので、インバウンドを許可したら<strong>戻り通信(エフェメラルポート1024-65535)のアウトバウンド許可</strong>も忘れずに。VPC内の通信の記録・調査には<strong>VPCフローログ</strong>を使う。</p>",
      },
    ],
    memorize: [
      { k: "VPC/サブネット", v: "自分専用ネットワーク。<strong>1サブネット＝1AZ</strong>。複数AZに分けて冗長化。" },
      { k: "パブリックサブネット", v: "<strong>IGWへのルートあり</strong>。Web/ELBを置く。" },
      { k: "プライベートサブネット", v: "外部から直接不可。DB/内部用。外向きは<strong>NAT GW</strong>経由。" },
      { k: "IGW / NAT GW", v: "IGW=双方向の玄関。NAT=<strong>内→外のみ</strong>の一方通行(マネージド・AZ毎推奨)。" },
      { k: "SG", v: "インスタンス単位・<strong>ステートフル・許可のみ</strong>。" },
      { k: "NACL", v: "サブネット単位・<strong>ステートレス・拒否(Deny)可</strong>。特定IPブロックに。" },
      { k: "NACLの注意", v: "ステートレスゆえ<strong>戻り通信(エフェメラルポート)の許可</strong>も必要。" },
      { k: "VPCフローログ", v: "通信の<strong>記録/調査</strong>(送信元/宛先/許可拒否)。" },
    ],
    flashcards: [
      { q: "DBサーバーはどのサブネットに置く？", a: "プライベートサブネット" },
      { q: "特定IPを『拒否』。SGとNACLどちら？", a: "NACL(Denyを書ける。SGは許可のみ)" },
      { q: "プライベートのサーバーがOS更新を外部から取得。必要なのは？", a: "NAT Gateway(内→外の一方通行)" },
      { q: "SGはステートフル？ステートレス？", a: "ステートフル(戻りは自動許可)" },
      { q: "1つのサブネットがまたがれるAZの数は？", a: "1つ(複数AZには複数サブネットを作る)" },
    ],
    quiz: [
      {
        q: "3層構成でDB層をインターネットから一切到達不能にしたい。最も適切な配置は？",
        choices: ["パブリックに置きSGで全拒否", "プライベートサブネットに配置", "別リージョンに置く", "IGWを削除"],
        answer: 1,
        explain: "基本は<strong>プライベートサブネット配置</strong>で設計レベルに遮断。SG全拒否は脆く、IGW削除は他層も壊す。",
      },
      {
        q: "既知の悪意あるIP範囲からのアクセスを、サブネット全体で明示的にブロックしたい。使うのは？",
        choices: ["SGのDenyルール", "NACLのDenyルール", "IAMポリシー", "ルートテーブル"],
        answer: 1,
        explain: "<strong>SGは許可のみ</strong>でDeny不可。明示的拒否は<strong>NACL</strong>。",
      },
    ],
  },
  {
    id: "vpc-connectivity", domain: "ネットワーキング", icon: "🔌", title: "VPC接続・ハイブリッド・エンドポイント",
    intro: "VPC同士/オンプレ/AWSサービスへの接続。エンドポイント・PrivateLink・TGW・DX・VPNの選び分け。",
    understand: [
      {
        h: "VPCから他へ繋ぐ手段は『相手』で決まる",
        body: "<p>VPCは独立したネットワークなので、外の何かと通信するには専用の接続手段がいる。<strong>相手が誰か</strong>で使うサービスが変わる、と整理すると覚えやすい。相手が①AWSサービス(S3等)②別のVPC③オンプレミス、の3パターンだ。</p>",
        diagram:
          '<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="250" y="80" width="140" height="50" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="110" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">自分のVPC</text>\
<rect x="20" y="30" width="200" height="40" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="120" y="55" fill="#51cf9b" font-size="10" text-anchor="middle">AWSサービス→エンドポイント</text>\
<rect x="420" y="30" width="200" height="40" rx="8" fill="#0c1220" stroke="#4dabf7"/><text x="520" y="55" fill="#4dabf7" font-size="10" text-anchor="middle">別VPC→ピアリング/TGW</text>\
<rect x="220" y="160" width="200" height="40" rx="8" fill="#0c1220" stroke="#b08adf"/><text x="320" y="185" fill="#b08adf" font-size="10" text-anchor="middle">オンプレ→VPN/Direct Connect</text>\
<line x1="220" y1="55" x2="270" y2="90" stroke="#9aa6bd" stroke-width="1.5"/><line x1="420" y1="55" x2="370" y2="90" stroke="#9aa6bd" stroke-width="1.5"/><line x1="320" y1="130" x2="320" y2="160" stroke="#9aa6bd" stroke-width="1.5"/>\
</svg>',
        cap: "接続手段は相手で選ぶ：AWSサービス→エンドポイント / 別VPC→ピアリング・TGW / オンプレ→VPN・DX。",
      },
      {
        h: "AWSサービスへ——VPCエンドポイントとPrivateLink",
        body: "<p>VPCの中からAWSサービスへアクセスする際、通常はインターネット(やNAT)を経由するが、<strong>インターネットを通らずにプライベートに</strong>繋げるのが<strong>VPCエンドポイント</strong>だ。セキュリティが高く、NAT費用も節約できる。2種類ある。</p><ul><li><strong>Gatewayエンドポイント</strong>：対象は<strong>S3とDynamoDBの2つだけ・無料</strong>。ルートテーブルにルートを足すだけで使える。</li><li><strong>Interfaceエンドポイント(PrivateLink)</strong>：S3/DynamoDB以外の<strong>多数のサービス</strong>や、<strong>自社/他社が提供する独自サービス</strong>へプライベート接続する(ENIを作る・有料)。</li></ul><p>『プライベートサブネットからS3へNATなしで』→<strong>Gatewayエンドポイント</strong>、『CloudWatchやSSM等多数サービスへプライベートに』→<strong>Interfaceエンドポイント</strong>。</p>",
      },
      {
        h: "別VPC・オンプレへ——ピアリング/TGW/VPN/Direct Connect",
        body: "<p><strong>別のVPCと繋ぐ</strong>には:<strong>VPCピアリング</strong>＝2つのVPCを1対1で接続(<strong>推移しない</strong>:A-B・B-Cと繋いでもA-Cは通れない)。VPCが増えて接続が複雑化したら<strong>Transit Gateway</strong>＝多数のVPC/オンプレを<strong>ハブ&スポークで一元集約</strong>する(大規模ネットワークの定番)。</p><p><strong>オンプレミスと繋ぐ</strong>には:<strong>Site-to-Site VPN</strong>＝インターネット経由で暗号化、<strong>手軽で即日(数十分)</strong>開通できるが品質はベストエフォート。<strong>Direct Connect(DX)</strong>＝AWSへの<strong>専用線</strong>で、<strong>安定・低遅延・高帯域</strong>。ただし物理工事のため開通に数週間かかる。最高品質が要るならDX、すぐ繋ぎたい/バックアップにはVPN。両方を組み合わせ、<strong>DXを主・VPNをバックアップ</strong>にする冗長構成も頻出だ。</p>",
      },
    ],
    memorize: [
      { k: "Gatewayエンドポイント", v: "<strong>S3/DynamoDB専用・無料</strong>。NAT不要でプライベートにアクセス。" },
      { k: "Interfaceエンドポイント/PrivateLink", v: "多数サービス/独自サービスへ<strong>プライベート接続</strong>(ENI・有料)。" },
      { k: "VPCピアリング", v: "2VPCの1対1接続。<strong>推移しない</strong>。" },
      { k: "Transit Gateway", v: "<strong>多数VPC/オンプレをハブ集約</strong>。大規模ネットワークの定番。" },
      { k: "Site-to-Site VPN", v: "インターネット経由・<strong>暗号化・手軽・即日</strong>。品質はベストエフォート。" },
      { k: "Direct Connect", v: "<strong>専用線で安定・低遅延・高帯域</strong>。開通に数週間。最高品質。" },
      { k: "DX+VPN", v: "DXを主、VPNを<strong>バックアップ</strong>に冗長化。" },
      { k: "選び分け", v: "AWSサービス→エンドポイント / 別VPC多数→TGW / オンプレ高品質→DX / すぐ繋ぐ→VPN。" },
    ],
    flashcards: [
      { q: "プライベートサブネットからS3へNAT不要・無料でアクセス。", a: "S3 Gatewayエンドポイント" },
      { q: "CloudWatchやSSM等の多数サービスへプライベート接続。", a: "Interfaceエンドポイント(PrivateLink)" },
      { q: "多数のVPCとオンプレをまとめてハブ接続したい。", a: "Transit Gateway" },
      { q: "オンプレと専用線で安定・低遅延に繋ぐ。", a: "Direct Connect" },
      { q: "VPCピアリングは推移する？", a: "しない(1対1のみ)" },
    ],
    quiz: [
      {
        q: "オンプレと10以上のVPCが相互に通信する必要があり、接続構成が複雑化している。スケーラブルに一元管理する最適なサービスは？",
        choices: ["VPCピアリングをフルメッシュで張る", "Transit Gateway", "各VPCにNAT GW", "Direct Connectのみ"],
        answer: 1,
        explain: "多数の相互接続は<strong>Transit Gateway</strong>でハブ集約。フルメッシュのピアリングは数が増えると管理不能。",
      },
      {
        q: "オンプレとAWS間で、安定した低遅延・高帯域の専用接続が必要だが、障害時のバックアップ経路も確保したい。最適な構成は？",
        choices: ["VPNのみ2本", "Direct Connectを主、VPNをバックアップ", "ピアリング", "Interfaceエンドポイント"],
        answer: 1,
        explain: "品質重視は<strong>Direct Connect</strong>、障害時バックアップに<strong>VPN</strong>を併用するのが定番の冗長構成。",
      },
      {
        q: "プライベートサブネットのEC2が、NATの費用や運用を避けつつDynamoDBへアクセスしたい。最適なのは？",
        choices: ["NAT Gateway経由", "DynamoDB Gatewayエンドポイント", "Interfaceエンドポイント(有料)", "パブリックサブネットへ移動"],
        answer: 1,
        explain: "S3/DynamoDBは<strong>Gatewayエンドポイント(無料)</strong>でNAT不要・プライベートにアクセスできる。",
      },
    ],
  },
  {
    id: "route53", domain: "ネットワーキング", icon: "🧭", title: "Route 53",
    intro: "DNSに振り分け戦略を持たせる。ルーティングポリシーの選び分けとヘルスチェックが頻出。",
    understand: [
      {
        h: "DNSとは『名前→住所(IP)』の変換。Route 53はそれに戦略を持たせる",
        body: "<p>私たちは<code>example.com</code>のような名前でアクセスするが、コンピュータが実際に通信するにはIPアドレス(住所)が必要だ。この<strong>名前→IPの変換</strong>を行うのが<strong>DNS</strong>で、AWSのDNSサービスが<strong>Route 53</strong>だ。</p><p>Route 53の強みは、単なる変換にとどまらず<strong>『どのサーバーに誘導するか』の戦略(ルーティングポリシー)</strong>を選べること。さらに<strong>ヘルスチェック</strong>(宛先が生きているか監視)と組み合わせると、ダウンした拠点を自動的に避けて健全な拠点へ誘導できる——つまりDNSのレベルで可用性を高められる。AWSリソース(ELB/CloudFront/S3)へ向けるときは<strong>Aliasレコード</strong>を使う(無料で、<strong>頂点ドメイン example.com にも使える</strong>のが利点。CNAMEは頂点に使えない)。</p>",
        diagram:
          '<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="240" y="15" width="160" height="38" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="39" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">Route 53(DNS)</text>\
<rect x="20" y="90" width="135" height="40" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="87" y="108" fill="#51cf9b" font-size="10" text-anchor="middle">フェイルオーバー</text><text x="87" y="122" fill="#6b7691" font-size="8" text-anchor="middle">障害時に待機系へ</text>\
<rect x="165" y="90" width="135" height="40" rx="8" fill="#0c1220" stroke="#4dabf7"/><text x="232" y="108" fill="#4dabf7" font-size="10" text-anchor="middle">レイテンシー</text><text x="232" y="122" fill="#6b7691" font-size="8" text-anchor="middle">最速リージョンへ</text>\
<rect x="340" y="90" width="135" height="40" rx="8" fill="#0c1220" stroke="#ffc955"/><text x="407" y="108" fill="#ffc955" font-size="10" text-anchor="middle">位置情報</text><text x="407" y="122" fill="#6b7691" font-size="8" text-anchor="middle">地域で振り分け</text>\
<rect x="485" y="90" width="135" height="40" rx="8" fill="#0c1220" stroke="#b08adf"/><text x="552" y="108" fill="#b08adf" font-size="10" text-anchor="middle">加重</text><text x="552" y="122" fill="#6b7691" font-size="8" text-anchor="middle">割合で分散</text>\
<line x1="290" y1="53" x2="87" y2="88" stroke="#9aa6bd" stroke-width="1.2"/><line x1="305" y1="53" x2="232" y2="88" stroke="#9aa6bd" stroke-width="1.2"/><line x1="335" y1="53" x2="407" y2="88" stroke="#9aa6bd" stroke-width="1.2"/><line x1="350" y1="53" x2="552" y2="88" stroke="#9aa6bd" stroke-width="1.2"/>\
<text x="320" y="165" fill="#9aa6bd" font-size="10" text-anchor="middle">要件に応じてルーティングポリシーを選ぶ</text>\
</svg>',
        cap: "Route 53は名前解決に『誘導戦略』を持たせられる。要件でポリシーを選ぶ。",
      },
      {
        h: "ルーティングポリシーの選び分け",
        body: "<p>問題文の要件から、どのポリシーかを即答できるようにする。</p><table class='cmp'><tr><th>ポリシー</th><th>用途(キーワード)</th></tr><tr><td><strong>フェイルオーバー</strong></td><td>主系ダウンで<strong>待機系へ自動切替</strong>(Active-Passive DR)</td></tr><tr><td><strong>レイテンシー</strong></td><td><strong>最も応答が速い</strong>リージョンへ誘導(体感速度)</td></tr><tr><td><strong>位置情報(Geo)</strong></td><td>アクセス元の<strong>地域/国</strong>で振り分け(言語別・法規制)</td></tr><tr><td><strong>加重(Weighted)</strong></td><td><strong>割合で分散</strong>(新版に少量流すカナリア/AB)</td></tr><tr><td><strong>複数値</strong></td><td>複数の健全なIPを返す(簡易な負荷分散)</td></tr></table><p>注意:『最速』はレイテンシー、『地域で固定』は位置情報——この2つは混同しやすいので区別する。フェイルオーバーは<strong>ヘルスチェックと必ずセット</strong>で覚える。</p>",
      },
    ],
    memorize: [
      { k: "フェイルオーバー", v: "主系ダウンで<strong>待機系へ自動切替</strong>(＋ヘルスチェック)。Active-Passive DR。" },
      { k: "レイテンシー", v: "ユーザーから見て<strong>最速のリージョン</strong>へ誘導。" },
      { k: "位置情報(Geo)", v: "アクセス元の<strong>地域</strong>で固定の振り分け(言語別/法規制)。" },
      { k: "加重(Weighted)", v: "<strong>割合指定で分散</strong>(カナリア/段階リリース)。" },
      { k: "Aliasレコード", v: "AWSリソースへ(無料)。<strong>頂点ドメインにも使える</strong>(CNAMEは頂点不可)。" },
      { k: "ヘルスチェック", v: "宛先の死活監視。フェイルオーバーと組合せ自動回避。" },
      { k: "混同注意", v: "『最速』→レイテンシー / 『地域で固定』→位置情報。" },
    ],
    flashcards: [
      { q: "主リージョン障害で自動的にDRへ切替えたい。ポリシーは？", a: "フェイルオーバー(＋ヘルスチェック)" },
      { q: "世界中のユーザーを最速リージョンへ。ポリシーは？", a: "レイテンシールーティング" },
      { q: "新版に全体の10%だけ流す。ポリシーは？", a: "加重(Weighted)ルーティング" },
      { q: "国ごとに別サイトへ。ポリシーは？", a: "位置情報(Geolocation)" },
      { q: "頂点ドメイン(example.com)をALBに向ける。使うレコードは？", a: "Aliasレコード(CNAMEは頂点不可)" },
    ],
    quiz: [
      {
        q: "本番をリージョンA、DR待機系をリージョンBに構築済み。Aが障害時に自動でBへ切り替えたい。最適なのは？",
        choices: ["加重ルーティング", "レイテンシールーティング", "フェイルオーバー＋ヘルスチェック", "複数値ルーティング"],
        answer: 2,
        explain: "Active-Passiveの自動切替＝<strong>フェイルオーバー＋ヘルスチェック</strong>。",
      },
      {
        q: "グローバルアプリで、各ユーザーを体感的に最も応答の速いリージョンへ誘導したい。最適なポリシーは？",
        choices: ["位置情報", "レイテンシー", "加重", "シンプル"],
        answer: 1,
        explain: "『最速』＝<strong>レイテンシールーティング</strong>。位置情報は地域で固定の振り分けで最速とは限らない。",
      },
    ],
  },
  {
    id: "cloudfront", domain: "ネットワーキング", icon: "🚀", title: "CloudFront・Global Accelerator",
    intro: "エッジ高速化。静的/動的のキャッシュ配信(CloudFront)と、非HTTP/動的の経路最適化(GA)を区別。",
    understand: [
      {
        h: "ユーザーの近くにキャッシュを置いて高速配信(CDN)",
        body: "<p>遠いリージョンのサーバーから世界中のユーザーへ配信すると、距離の分だけ遅くなる。<strong>CloudFront</strong>は、コンテンツを世界中の<strong>エッジロケーション</strong>(数百の配信拠点)に<strong>キャッシュ</strong>しておき、各ユーザーに<strong>最も近い拠点から配信</strong>する<strong>CDN</strong>だ。これにより<strong>体感速度が大幅に向上</strong>し、元のサーバー(オリジン)へのアクセスも減って<strong>負荷が軽減</strong>される。配信元(オリジン)はS3でもALBでも任意のサーバーでもよく、静的コンテンツだけでなく動的コンテンツやAPIの高速化にも使える。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="40" width="90" height="34" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="65" y="62" fill="#e9edf5" font-size="10" text-anchor="middle">ユーザー(近)</text>\
<rect x="20" y="120" width="90" height="34" rx="6" fill="#0c1220" stroke="#9aa6bd"/><text x="65" y="142" fill="#e9edf5" font-size="10" text-anchor="middle">ユーザー(遠)</text>\
<rect x="180" y="50" width="110" height="34" rx="6" fill="#161e30" stroke="#ff9d3c"/><text x="235" y="72" fill="#ff9d3c" font-size="10" text-anchor="middle">エッジ(東京)</text>\
<rect x="180" y="110" width="110" height="34" rx="6" fill="#161e30" stroke="#ff9d3c"/><text x="235" y="132" fill="#ff9d3c" font-size="10" text-anchor="middle">エッジ(海外)</text>\
<rect x="420" y="80" width="180" height="44" rx="10" fill="#0c1220" stroke="#51cf9b"/><text x="510" y="102" fill="#51cf9b" font-size="11" text-anchor="middle">オリジン(S3/ALB)</text><text x="510" y="116" fill="#6b7691" font-size="9" text-anchor="middle">取得は初回のみ</text>\
<line x1="110" y1="57" x2="178" y2="67" stroke="#9aa6bd" stroke-width="1.5"/><line x1="110" y1="137" x2="178" y2="127" stroke="#9aa6bd" stroke-width="1.5"/>\
<line x1="290" y1="67" x2="418" y2="95" stroke="#9aa6bd" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="290" y1="127" x2="418" y2="105" stroke="#9aa6bd" stroke-width="1.2" stroke-dasharray="4 3"/>\
<text x="320" y="180" fill="#9aa6bd" font-size="10" text-anchor="middle">近くのエッジから配信。オリジンへの取得はキャッシュmiss時のみ</text>\
</svg>',
        cap: "近くのエッジがキャッシュから配信。オリジン取得は初回(miss)のみで高速・低負荷。",
      },
      {
        h: "セキュリティ機能と、Global Acceleratorとの違い",
        body: "<p>CloudFrontはセキュリティ機能も豊富だ。<strong>OAC(Origin Access Control)</strong>でS3を<strong>非公開のまま</strong>CloudFront経由限定で配信(S3直公開を避ける鉄板)。前段に<strong>WAF</strong>でWeb攻撃をブロック。<strong>署名付きURL/署名付きCookie</strong>で有料コンテンツを期限付き・限定配信(URL=単一ファイル、Cookie=複数ファイル)。<strong>Lambda@Edge/CloudFront Functions</strong>でエッジでの認証やリライトも可能。HTTPSは<strong>ACM</strong>証明書(CloudFront用は us-east-1 で作成)。</p><p>混同しやすい<strong>Global Accelerator</strong>との違いも重要。CloudFrontが<strong>コンテンツをキャッシュ</strong>するのに対し、Global Acceleratorは<strong>AWSのバックボーン網で通信経路を最適化</strong>する(キャッシュしない)。<strong>非HTTPのTCP/UDP・動的トラフィック・固定IP・高速フェイルオーバー</strong>が要るとき(ゲーム/IoT/音声)に使う。判断:『静的/動的のキャッシュ配信』→CloudFront、『非HTTP・固定IP・経路最適化』→Global Accelerator。</p>",
      },
    ],
    memorize: [
      { k: "CloudFront", v: "<strong>エッジキャッシュ配信</strong>(静的/動的)のCDN。高速化＋オリジン負荷軽減。" },
      { k: "オリジン", v: "配信元。<strong>S3 / ALB / 任意サーバー</strong>。" },
      { k: "OAC", v: "S3を<strong>非公開のまま</strong>CloudFront経由限定で配信。" },
      { k: "署名付きURL/Cookie", v: "限定・期限付き配信。URL=単一ファイル、Cookie=複数ファイル。" },
      { k: "Lambda@Edge", v: "エッジでリクエスト/レスポンスを加工(認証・A/B・リライト)。" },
      { k: "WAF/ACM連携", v: "前段でWeb攻撃をブロック / ACMで無料HTTPS(CloudFront用は us-east-1)。" },
      { k: "Global Accelerator", v: "<strong>バックボーン経路最適化＋固定IP＋高速フェイルオーバー</strong>。非HTTP/動的に。" },
      { k: "区別", v: "キャッシュ配信→CloudFront / 動的・非HTTP・固定IP→Global Accelerator。" },
    ],
    flashcards: [
      { q: "S3の静的コンテンツを世界に高速配信し、S3は非公開に保つ。構成は？", a: "CloudFront + OAC" },
      { q: "TCP/UDPの動的トラフィックを固定IPで高速化したい。", a: "Global Accelerator" },
      { q: "有料動画を期限付き・限定で配信したい。", a: "CloudFront 署名付きURL/Cookie" },
      { q: "CloudFrontのエッジで認証やリライトを行うには？", a: "Lambda@Edge / CloudFront Functions" },
      { q: "CloudFrontとGlobal Acceleratorの根本的な違いは？", a: "CloudFrontはキャッシュ配信、GAは経路最適化(キャッシュしない)" },
    ],
    quiz: [
      {
        q: "S3の画像/動画を世界中へ高速配信しつつ、S3バケットは非公開に保ちたい。最適な構成は？",
        choices: ["S3を公開", "CloudFront + OAC", "各リージョンにS3複製", "EC2プロキシ"],
        answer: 1,
        explain: "<strong>CloudFront＋OAC</strong>でS3を非公開のまま高速配信＝鉄板。",
      },
      {
        q: "オンラインゲームのTCP/UDP通信で、世界中のプレイヤーに低遅延・固定エンドポイント・高速フェイルオーバーを提供したい。最適なのは？",
        choices: ["CloudFront", "Global Accelerator", "Route 53加重", "ElastiCache"],
        answer: 1,
        explain: "非HTTPの動的トラフィック＋固定IP＋高速フェイルオーバーは<strong>Global Accelerator</strong>。CloudFrontはキャッシュ配信向き。",
      },
    ],
  }
);
