/* =============================================================
   コレダケAWS CCP カリキュラム — 11 ネットワーク
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-network", domain: "技術とサービス", icon: "🌐", title: "ネットワーク（VPC・Route 53・CloudFront）",
    intro: "AWS内の専用ネットワークVPC、DNSのRoute 53、CDNのCloudFront、オンプレ接続（VPN・Direct Connect）。",
    understand: [
      {
        h: "NATゲートウェイ——プライベートのサーバーが『外へ出る』ための出口",
        body:
          "<p>プライベートサブネットに置いたサーバー（データベースやバックエンド処理など）は、インターネットから直接アクセスされないので安全です。しかしその代わり、<strong>自分から外（インターネット）へ出ていくこともできません</strong>。一方で、OS やソフトウェアのセキュリティ更新プログラムをダウンロードするなど、<strong>外向き（アウトバウンド）の通信だけは必要</strong>になる場面がよくあります。</p>" +
          "<p>この「内側から外へ出ていくための出口」が <strong>NATゲートウェイ</strong> です。プライベートサブネットのサーバーは、NATゲートウェイを経由してインターネットへアクセスできるようになります。ポイントは<strong>一方通行</strong>であること——<strong>外部からプライベートのサーバーへ入ってくる通信は受け付けません</strong>。つまり「サーバーの姿は外から隠したまま、必要な外向き通信だけを許す」ことができます。</p>" +
          "<p>使い方のポイントは 2 つ。①NATゲートウェイ自身は<strong>パブリックサブネットに置く</strong>。②プライベートサブネットのルートテーブルで「インターネット向けの通信は NATゲートウェイへ」と設定する。マネージド型なので冗長化や性能拡張は自動です（自前で EC2 に用意する『NATインスタンス』もありますが、CCP では基本マネージドの NATゲートウェイを選びます）。料金は稼働時間と処理データ量に応じてかかります。</p>" +
          "<p><strong>比較して覚える</strong>：外部から VPC 内へ入る入口は<strong>インターネットゲートウェイ（IGW）</strong>で双方向。NATゲートウェイは<strong>内→外の一方向</strong>。「入口＝IGW（双方向）／出口＝NAT（内から外だけ）」と対にすると混同しません。CCP では『プライベートのサーバーがソフト更新のため外へ出たい』→ NATゲートウェイ、が定番です。</p>",
        diagram:
          '<svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#23252b">NATゲートウェイ＝内側から外へ出る一方通行の出口</text><rect x="30" y="40" width="330" height="120" rx="10" fill="#f6f9fb" stroke="#4a7fa8" stroke-dasharray="6 4"/><text x="44" y="58" font-size="10" font-weight="800" fill="#34567a">VPC</text><rect x="50" y="72" width="150" height="70" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="125" y="90" text-anchor="middle" font-size="10" font-weight="700" fill="#366b3c">プライベートサブネット</text><rect x="70" y="100" width="110" height="30" rx="5" fill="#eef7ef" stroke="#a9ccab"/><text x="125" y="119" text-anchor="middle" font-size="10" fill="#23252b">サーバー(EC2)</text><rect x="222" y="80" width="120" height="54" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="282" y="101" text-anchor="middle" font-size="10.5" font-weight="800" fill="#7a5e17">NATゲートウェイ</text><text x="282" y="117" text-anchor="middle" font-size="8.5" fill="#8a6a1e">パブリックサブネット</text><rect x="432" y="82" width="118" height="48" rx="8" fill="#f6e4e0" stroke="#c0392b"/><text x="491" y="110" text-anchor="middle" font-size="11" font-weight="700" fill="#8a2b20">インターネット</text><line x1="180" y1="115" x2="222" y2="107" stroke="#2f9e6f" stroke-width="2"/><polygon points="222,107 212,104 214,113" fill="#2f9e6f"/><line x1="342" y1="106" x2="432" y2="106" stroke="#2f9e6f" stroke-width="2"/><polygon points="432,106 422,101 422,111" fill="#2f9e6f"/><text x="387" y="99" text-anchor="middle" font-size="9" fill="#2f9e6f">外向きOK</text><text x="290" y="172" text-anchor="middle" font-size="10" fill="#c0392b">外部→サーバーの向きは通さない（一方通行）</text></svg>',
        cap: "プライベートのサーバーが『外へ出る』ための一方通行の出口＝NATゲートウェイ。パブリックサブネットに置く。",
      },
      {
        h: "VPCエンドポイント——AWSサービスへ『インターネットを通らず』つなぐ（Gateway型／Interface型／PrivateLink）",
        body:
          "<p>ふつう、VPC 内の EC2 から S3 などの AWS サービスへアクセスすると、その通信は<strong>いったんインターネットを経由</strong>します。しかし「社外のインターネットを一切通したくない」「通信を AWS の内部だけで完結させたい」という要件はよくあります。これを実現するのが <strong>VPCエンドポイント</strong>——VPC と AWS サービスを、<strong>インターネットを経由せずプライベートに直結</strong>する仕組みです。安全性が高く、NATゲートウェイ経由の通信料も節約できます。</p>" +
          "<p>種類は 2 つあり、CCP ではこの区別が問われます。</p>" +
          "<ul>" +
          "<li><strong>ゲートウェイ型（Gateway Endpoint）</strong>：対象は <strong>Amazon S3 と DynamoDB の 2 つだけ</strong>。VPC のルートテーブルに宛先を追加する方式で、<strong>追加料金なし</strong>。『EC2 から S3 へインターネットを経由せずアクセス』はこれ。</li>" +
          "<li><strong>インターフェイス型（Interface Endpoint）</strong>：S3・DynamoDB 以外の<strong>多数の AWS サービス</strong>（さらに他社製サービスや自社サービス）向け。VPC 内に専用の接続口（ネットワークインターフェイス）を作る方式です。</li>" +
          "</ul>" +
          "<p>このインターフェイス型を支える技術が <strong>AWS PrivateLink</strong> です。PrivateLink とは、VPC と（AWS／サードパーティ／自社の）サービスを、<strong>インターネットを通さずプライベートに接続する</strong>技術の総称。試験では「<strong>インターフェイス型 VPCエンドポイント ＝ PrivateLink</strong>」と結びつけて覚えれば十分です。</p>" +
          "<p><strong>まとめ</strong>：<strong>S3・DynamoDB はゲートウェイ型</strong>、<strong>それ以外はインターフェイス型（PrivateLink）</strong>。どちらも狙いは同じ——「インターネットを通らずに AWS サービスへ安全につなぐ」。EC2 側は IAM ロールで権限を渡すと、鍵情報を埋め込まずに安全にアクセスできます。</p>",
        diagram:
          '<svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#23252b">VPCエンドポイント＝インターネットを通らずAWSサービスへ直結</text><rect x="30" y="40" width="330" height="120" rx="10" fill="#f6f9fb" stroke="#4a7fa8" stroke-dasharray="6 4"/><text x="44" y="58" font-size="10" font-weight="800" fill="#34567a">VPC</text><rect x="55" y="82" width="110" height="50" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="110" y="103" text-anchor="middle" font-size="10" font-weight="700" fill="#366b3c">EC2</text><text x="110" y="119" text-anchor="middle" font-size="8.5" fill="#6b6e76">IAMロール</text><rect x="212" y="80" width="132" height="54" rx="8" fill="#e6ddf3" stroke="#7a55c9"/><text x="278" y="101" text-anchor="middle" font-size="10.5" font-weight="800" fill="#5a3a9a">VPCエンドポイント</text><text x="278" y="117" text-anchor="middle" font-size="8.5" fill="#6a4aaa">VPC内の接続口</text><rect x="432" y="82" width="118" height="48" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="491" y="103" text-anchor="middle" font-size="10.5" font-weight="700" fill="#34567a">S3 / DynamoDB</text><text x="491" y="119" text-anchor="middle" font-size="8.5" fill="#6b6e76">AWSサービス</text><line x1="165" y1="106" x2="212" y2="106" stroke="#7a55c9" stroke-width="2"/><polygon points="212,106 202,101 202,111" fill="#7a55c9"/><line x1="344" y1="106" x2="432" y2="106" stroke="#7a55c9" stroke-width="2"/><polygon points="432,106 422,101 422,111" fill="#7a55c9"/><text x="290" y="172" text-anchor="middle" font-size="10" fill="#7a55c9">通信はAWS内部で完結（インターネットを経由しない）</text></svg>',
        cap: "AWSサービスへ内側から直結＝VPCエンドポイント。S3/DynamoDB＝ゲートウェイ型、その他＝インターフェイス型（PrivateLink）。",
      },
      {
        h: "拠点をまとめる・最適経路で届ける——Transit Gateway と Global Accelerator",
        body:
          "<p><strong>Transit Gateway</strong>：多数の VPC やオンプレ拠点（VPN／Direct Connect 接続）を、<strong>1 つのハブ</strong>に集約して相互接続する仕組みです。VPC が増えるたびに 1 対 1 で配線（VPC ピアリング）していくと組合せが爆発しますが、Transit Gateway に集約すれば配線がシンプルになり管理しやすくなります。「たくさんの拠点を束ねる中央ハブ」と覚えます。</p>" +
          "<p><strong>Global Accelerator</strong>：AWS の高速な基幹ネットワークとエッジロケーションを使い、世界中の利用者を<strong>最寄りの入口から最適な経路で</strong>アプリケーションへ届けて遅延を下げるサービスです。固定の IP アドレスも提供します。</p>" +
          "<p><strong>混同しやすい対比</strong>：CloudFront は<strong>コンテンツをエッジにキャッシュして配信</strong>を速くする（CDN）。Global Accelerator は<strong>通信の経路そのものを最適化</strong>して到達を速くする。目的の似た 2 つですが、キャッシュか経路最適化かで区別します。</p>",
        cap: "多数の拠点を束ねる＝Transit Gateway、最適経路で低遅延に届ける＝Global Accelerator（CloudFrontはキャッシュ配信）。",
      },

      {
        h: "VPC——AWSの中の『自分専用のネットワーク』",
        body:
          "<p><strong>Amazon VPC（Virtual Private Cloud）</strong>は、AWSクラウドの中に作る<strong>自分専用の仮想ネットワーク</strong>です。他の利用者から論理的に隔離された“自分だけの区画”で、この中に EC2 や RDS などを配置します。オンプレミスのネットワークを AWS 上に再現するイメージで、使う IP アドレスの範囲（CIDR）を決めて構築します。</p>" +
          "<p>VPC の中は<strong>サブネット</strong>に分けます。インターネットからアクセスさせる<strong>パブリックサブネット</strong>（Web サーバー等）と、外から直接アクセスさせない<strong>プライベートサブネット</strong>（DB 等）に分けるのが基本です。サブネットは<strong>アベイラビリティゾーン（AZ）ごと</strong>に作れるため、複数の AZ にまたがって配置すれば<strong>可用性（耐障害性）</strong>が高まります。外部との出入口には<strong>インターネットゲートウェイ（IGW）</strong>を付け、<strong>ルートテーブル</strong>で「どの通信をどこへ送るか」を決めます。</p>" +
          "<p>通信を制御する“ファイアウォール”は 2 段階あります。<strong>セキュリティグループ</strong>は<strong>サーバー（インスタンス）単位</strong>で、<strong>許可ルールだけ</strong>を書きます（戻りの通信は自動で通す）。<strong>ネットワークACL</strong>は<strong>サブネット単位</strong>で、<strong>許可と拒否の両方</strong>を書けます。『インスタンスを守る細かい設定＝セキュリティグループ』『サブネット全体のおおまかな関所＝ネットワークACL』と役割で分けて覚えると混同しません。</p>",
        diagram:
          '<svg viewBox="0 0 580 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">VPC＝自分専用ネットワーク（公開/非公開に分ける）</text>' +
          '<rect x="90" y="32" width="470" height="140" rx="10" fill="#f6f9fb" stroke="#4a7fa8" stroke-dasharray="6 4"/><text x="106" y="52" fill="#34567a" font-size="11" font-weight="800">VPC（仮想ネットワーク）</text>' +
          '<rect x="112" y="64" width="200" height="92" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="212" y="84" fill="#34567a" font-size="11" font-weight="800" text-anchor="middle">パブリックサブネット</text><rect x="132" y="96" width="160" height="26" rx="5" fill="#eef4f9" stroke="#9db8cd"/><text x="212" y="113" fill="#23252b" font-size="10" text-anchor="middle">Webサーバー（EC2）</text><text x="212" y="142" fill="#6b6e76" font-size="9" text-anchor="middle">外部からアクセス可</text>' +
          '<rect x="338" y="64" width="200" height="92" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="438" y="84" fill="#366b3c" font-size="11" font-weight="800" text-anchor="middle">プライベートサブネット</text><rect x="358" y="96" width="160" height="26" rx="5" fill="#eef7ef" stroke="#a9ccab"/><text x="438" y="113" fill="#23252b" font-size="10" text-anchor="middle">データベース（RDS）</text><text x="438" y="142" fill="#6b6e76" font-size="9" text-anchor="middle">外部から直接アクセス不可</text>' +
          '<text x="40" y="106" fill="#a85733" font-size="18">🌐</text><line x1="60" y1="110" x2="110" y2="110" stroke="#a85733" stroke-width="2"/><polygon points="110,110 100,105 100,115" fill="#a85733"/>' +
          '<line x1="312" y1="110" x2="338" y2="110" stroke="#8a8f98" stroke-width="1.6"/>' +
          "</svg>",
        cap: "VPC内をサブネットに分け、公開するもの（Web）はパブリック、隠すもの（DB）はプライベートに置く。",
      },
      {
        h: "つなぐ・速くする・振り分ける——Route 53・CloudFront・ELB",
        body:
          "<p>ネットワーク系の代表サービスを役割で覚えます。</p>" +
          "<ul>" +
          "<li><strong>Amazon Route 53 ＝ DNS（住所案内）</strong>：<strong>ドメイン名（例 example.com）を、実際のサーバーの IP アドレスに変換</strong>する DNS サービス。ドメインの取得もでき、『一番近い拠点へ』『健康なサーバーへ』といった<strong>賢いルーティング制御</strong>もできます。名前の由来は DNS の標準ポート番号 53。<br><strong>試験のキーワード：</strong>「<strong>DNS</strong>」「ドメイン名を IP に変換」「ドメインの登録」→ Route 53。</li>" +
          "<li><strong>Amazon CloudFront ＝ CDN（コンテンツの高速配信）</strong>：画像・動画・Web ページなどを<strong>世界中のエッジロケーションにキャッシュ</strong>し、利用者の<strong>最寄りから配信して表示を高速化</strong>します。<br><strong>試験のキーワード：</strong>「<strong>CDN</strong>」「エッジにキャッシュ」「世界中の利用者に画像・動画を速く配信」→ CloudFront。※後述の Global Accelerator と混同注意（CloudFront＝<strong>キャッシュ配信</strong>、Global Accelerator＝<strong>経路の最適化</strong>）。</li>" +
          "<li><strong>ELB（Elastic Load Balancing）＝ 交通整理（負荷分散）</strong>：届いたアクセスを<strong>複数のサーバーへ自動で振り分け</strong>ます。1 台に集中させず分散するので、<strong>負荷分散と可用性の向上</strong>につながります（Auto Scaling とセットで使うのが定番）。<br><strong>試験のキーワード：</strong>「<strong>負荷分散</strong>」「複数のサーバーにトラフィックを振り分ける」→ ELB。</li>" +
          "</ul>" +
          "<p><strong>オンプレミスと AWS をつなぐ 2 つの方法</strong>も、対比で問われます。</p>" +
          "<ul>" +
          "<li><strong>AWS VPN ＝ インターネット経由で暗号化してつなぐ</strong>：<strong>手軽・低コスト</strong>ですぐ使えますが、通信はインターネットを通るため<strong>速度や安定性は環境次第</strong>。<br><strong>試験のキーワード：</strong>「<strong>手軽・低コストで接続</strong>」「インターネット経由・暗号化」→ VPN。</li>" +
          "<li><strong>AWS Direct Connect ＝ 専用線でつなぐ</strong>：AWS と自社を<strong>物理的な専用線</strong>で結びます。<strong>高速・低遅延・安定</strong>する代わりに、開通に時間と費用がかかります。<br><strong>試験のキーワード：</strong>「<strong>専用線</strong>」「インターネットを経由しない安定・高速な接続」「一貫した低遅延」→ Direct Connect。</li>" +
          "</ul>",
      },
    ],
    memorize: [
      { k: "NATゲートウェイ", v: "プライベートサブネットのサーバが<strong>外へ出る（アウトバウンド）</strong>出口。パブリックサブネットに配置。外からは接続不可。" },
      { k: "VPCエンドポイント", v: "EC2等から<strong>AWSサービスへネット経由せずVPC内から直結</strong>。S3/DynamoDB＝ゲートウェイ型、その他＝インターフェイス型（PrivateLink）。" },
      { k: "Transit Gateway", v: "多数のVPC・拠点を<strong>ハブに集約</strong>して相互接続。" },
      { k: "Global Accelerator", v: "エッジと基幹網で<strong>最適経路にして低遅延化</strong>（固定IPも提供）。" },

      { k: "VPC", v: "AWS内に作る自分専用の仮想ネットワーク。中にEC2/RDS等を配置。" },
      { k: "パブリック/プライベートサブネット", v: "公開する(Web)/外部から隠す(DB)にサブネットを分ける。" },
      { k: "セキュリティグループ", v: "サーバー(インスタンス)単位の仮想ファイアウォール。許可ルールのみ。" },
      { k: "Route 53", v: "DNSサービス。ドメイン名⇔IPの変換、ドメイン取得、ルーティング制御。" },
      { k: "CloudFront", v: "CDN。エッジにキャッシュし利用者の近くから配信して高速化。" },
      { k: "ELB", v: "アクセスを複数サーバーへ自動で振り分け（負荷分散・可用性向上）。" },
      { k: "VPN / Direct Connect", v: "VPN=ネット経由で暗号化接続(安い)。Direct Connect=専用線(高速・安定・高価)。" },
    ],
    flashcards: [
      { q: "VPCとは何か？", a: "AWSクラウド内に作る、自分専用の仮想ネットワーク。中にEC2やRDSなどを配置する。" },
      { q: "Route 53の主な役割は？", a: "DNSサービス。ドメイン名とIPアドレスの変換や、ドメイン取得、トラフィックのルーティング制御。" },
      { q: "CloudFrontの役割は？", a: "CDN。世界中のエッジロケーションにコンテンツをキャッシュし、利用者の近くから配信して表示を高速化する。" },
      { q: "オンプレとAWSを専用線で高速・安定に接続するサービスは？", a: "AWS Direct Connect（手軽で安いのはVPN接続）。" },
      { q: "アクセスを複数のEC2に自動で振り分けるサービスは？", a: "ELB（Elastic Load Balancing）。" },
    ],
    quiz: [
      {
        q: "プライベートサブネットで稼働するEC2から、Amazon S3へインターネットを経由せず安全にアクセスしたい。利用すべき機能はどれか。",
        choices: ["NATゲートウェイ", "VPCエンドポイント（ゲートウェイ型）", "インターネットゲートウェイ", "AWS Direct Connect"],
        answer: 1,
        explain: "AWSサービスへVPC内から<strong>インターネットを経由せず</strong>直結するのは<strong>VPCエンドポイント</strong>（S3/DynamoDBはゲートウェイ型）。NATは外へ出る出口、Direct Connectはオンプレとの専用線。",
      },
      {
        q: "プライベートサブネットのEC2が、インターネットからソフト更新をダウンロード（外向き通信）できるようにしたい。ただし外部からEC2への接続は受けたくない。適切なものはどれか。",
        choices: ["VPCエンドポイント", "NATゲートウェイ", "セキュリティグループの追加のみ", "Amazon Route 53"],
        answer: 1,
        explain: "内部を隠したまま『外へ出ていく』出口が<strong>NATゲートウェイ</strong>（パブリックサブネットに配置）。外からの接続は受けない。",
      },

      {
        q: "AWSクラウド内に、利用者が論理的に分離された専用の仮想ネットワークを構築できるサービスはどれか。",
        choices: ["Amazon VPC", "Amazon Route 53", "Amazon CloudFront", "AWS Direct Connect"],
        answer: 0,
        explain: "自分専用の仮想ネットワークを作るのは<strong>Amazon VPC</strong>。",
      },
      {
        q: "世界中の利用者に対して、Webサイトの画像や動画を近くの拠点からキャッシュ配信し、表示速度を高めるAWSサービスはどれか。",
        choices: ["Amazon Route 53", "Amazon CloudFront", "Amazon VPC", "Elastic Load Balancing"],
        answer: 1,
        explain: "エッジからキャッシュ配信して高速化するCDNは<strong>Amazon CloudFront</strong>。",
      },
      {
        q: "オンプレミスのデータセンターとAWSを、インターネットを介さない専用線で接続し、安定した高速通信を実現するサービスはどれか。",
        choices: ["AWS VPN", "AWS Direct Connect", "Amazon CloudFront", "AWS Transit Gateway"],
        answer: 1,
        explain: "専用線で接続するのは<strong>AWS Direct Connect</strong>。VPNはインターネット経由で暗号化する手軽な方式。",
      },
    ],
  }
);
