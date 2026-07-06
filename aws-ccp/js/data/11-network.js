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
        h: "VPC——AWSの中の『自分専用のネットワーク』",
        body:
          "<p><strong>Amazon VPC（Virtual Private Cloud）</strong>は、AWSクラウドの中に作る<strong>自分専用の仮想ネットワーク</strong>です。この中にEC2やRDSを置きます。VPCの中を<strong>サブネット</strong>に分け、インターネットからアクセスさせる<strong>パブリックサブネット</strong>（Webサーバー等）と、外から直接アクセスさせない<strong>プライベートサブネット</strong>（DB等）に分けるのが基本です。</p>" +
          "<p>通信を制御する仕組みが2つ。サーバー単位の<strong>セキュリティグループ</strong>（許可ルールのみ）と、サブネット単位の<strong>ネットワークACL</strong>。これらで『どの通信を通すか』を決めます。</p>",
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
          "<li><strong>Route 53</strong>：<strong>DNS（ドメイン名⇔IPアドレスの変換）</strong>サービス。ドメインの取得やルーティング制御もできる。</li>" +
          "<li><strong>CloudFront</strong>：<strong>CDN</strong>。世界中のエッジロケーションにコンテンツをキャッシュし、利用者の近くから配信して<strong>表示を高速化</strong>する。</li>" +
          "<li><strong>ELB（Elastic Load Balancing）</strong>：アクセスを<strong>複数のサーバーへ自動で振り分ける</strong>。負荷分散と可用性向上。</li>" +
          "</ul>" +
          "<p>オンプレとAWSをつなぐには、暗号化してインターネット経由で結ぶ<strong>VPN</strong>（手軽・安い）と、<strong>専用線</strong>で結ぶ<strong>Direct Connect</strong>（高速・安定だが高価）があります。</p>",
      },
    ],
    memorize: [
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
