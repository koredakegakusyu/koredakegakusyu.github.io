/* =============================================================
   コレダケITパスポート カリキュラム — 09 ネットワーク（テクノロジ系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "network-kiso", domain: "ネットワーク", icon: "🌐", title: "ネットワークの基礎と機器",
    intro: "LAN/WAN、有線・無線、通信速度の計算、ネットワーク機器の役割。土台を固める。",
    understand: [
      {
        h: "LANとWAN、通信の速さ",
        body: "<p>会社や家庭など<strong>狭い範囲</strong>のネットワークが<strong>LAN</strong>、離れた拠点をつなぐ<strong>広い範囲</strong>が<strong>WAN</strong>。無線LANは<strong>Wi-Fi</strong>で、接続にはネットワーク名<strong>SSID</strong>と暗号化（WPA2/WPA3）を使う。</p><p>通信の速さは<strong>bps（ビット毎秒）</strong>で表す。データ量とのやり取りでは単位に注意——データは<strong>バイト（B）</strong>、通信速度は<strong>ビット（b）</strong>で表し、<strong>1バイト＝8ビット</strong>。伝送時間は『データ量(ビット) ÷ 回線速度(bps)』で求める（実際は伝送効率も掛ける）。</p>",
      },
      {
        h: "ネットワーク機器の役割",
        body: "<p>機器の役割を区別する。<strong>ハブ</strong>は複数の機器をつなぐ集線装置。<strong>スイッチ（スイッチングハブ）</strong>は宛先を見て必要なポートにだけ送る賢いハブ。<strong>ルータ</strong>は<strong>異なるネットワーク同士（LANとインターネットなど）を中継し、最適な経路を選ぶ</strong>。プロトコルが異なるネットワークを接続するのが<strong>ゲートウェイ</strong>。電波を中継しWi-Fi接続を提供するのが<strong>アクセスポイント</strong>だ。家庭のブロードバンドルータは、ルータ＋スイッチ＋無線AP＋ファイアウォールを兼ねることが多い。</p>",
      },
      {
        h: "通信の階層モデル",
        body: "<p>複雑な通信を役割ごとに層に分けて考えるのが<strong>階層モデル</strong>。理論的な7階層が<strong>OSI基本参照モデル</strong>（物理→データリンク→ネットワーク→トランスポート→セッション→プレゼンテーション→アプリケーション）。実際のインターネットで使うのが<strong>TCP/IP（4階層）</strong>。層に分けることで、ある層の技術を入れ替えても他の層に影響しにくい、という利点がある。</p>",
        diagram:
          '<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans JP, sans-serif">\
<text x="280" y="22" fill="#2f6d97" font-size="12" font-weight="700" text-anchor="middle">OSI基本参照モデル（7階層・上が応用側）</text>\
<g font-size="10" fill="#23252b">\
<rect x="140" y="34" width="280" height="22" rx="4" fill="#dce8f3" stroke="#4a7a4e"/><text x="150" y="49">7 アプリケーション（HTTP等の応用）</text>\
<rect x="140" y="58" width="280" height="22" rx="4" fill="#dce8f3" stroke="#6b6e76"/><text x="150" y="73">6 プレゼンテーション（表現・変換）</text>\
<rect x="140" y="82" width="280" height="22" rx="4" fill="#dce8f3" stroke="#6b6e76"/><text x="150" y="97">5 セッション（通信の管理）</text>\
<rect x="140" y="106" width="280" height="22" rx="4" fill="#dce8f3" stroke="#c47f2f"/><text x="150" y="121">4 トランスポート（TCP/UDP・信頼性）</text>\
<rect x="140" y="130" width="280" height="22" rx="4" fill="#dce8f3" stroke="#c47f2f"/><text x="150" y="145">3 ネットワーク（IP・ルータ・経路選択）</text>\
<rect x="140" y="154" width="280" height="22" rx="4" fill="#dce8f3" stroke="#6b6e76"/><text x="150" y="169">2 データリンク（スイッチ・MAC）</text>\
<rect x="140" y="178" width="280" height="22" rx="4" fill="#dce8f3" stroke="#6b6e76"/><text x="150" y="193">1 物理（ケーブル・電気信号）</text>\
</g></svg>',
        cap: "OSI7階層。ルータは第3層(ネットワーク)、スイッチは第2層(データリンク)で動く。",
      },
    ],
    memorize: [
      { k: "LAN / WAN", v: "LAN=狭い範囲(社内)。WAN=拠点間の広域。" },
      { k: "ルータ", v: "異なるネットワークを中継し最適経路を選ぶ（第3層）。" },
      { k: "スイッチ", v: "宛先を見て必要なポートだけに送る集線装置（第2層）。" },
      { k: "bps", v: "通信速度の単位(ビット毎秒)。1バイト=8ビットに注意。" },
      { k: "SSID", v: "無線LANのネットワーク識別名。" },
      { k: "OSI 7階層", v: "物理・データリンク・ネットワーク・トランスポート・セッション・プレゼン・アプリ。" },
      { k: "伝送時間", v: "データ量(ビット) ÷ 回線速度(bps) ÷ 伝送効率。" },
    ],
    flashcards: [
      { q: "ルータの役割は？", a: "異なるネットワーク同士を接続・中継し、データの最適な経路を選ぶ（第3層の機器）。" },
      { q: "LANとWANの違いは？", a: "LANは建物内など狭い範囲、WANは地理的に離れた拠点間を結ぶ広域ネットワーク。" },
      { q: "8メガバイトのデータを 8Mbps の回線で送ると、単純計算で何秒かかる？", a: "8MB＝64Mビット。64 ÷ 8＝8秒（バイトをビットに直すのが要点）。" },
      { q: "無線LANのネットワークを識別する名前を何という？", a: "SSID。" },
      { q: "OSI基本参照モデルは何階層か？", a: "7階層。" },
    ],
    quiz: [
      {
        q: "異なるネットワークを相互に接続し、宛先IPアドレスに基づいてデータの最適な転送経路を決定する機器はどれか。",
        choices: ["ハブ", "スイッチ", "ルータ", "リピータ"],
        answer: 2,
        explain: "ネットワーク間を中継し経路選択するのは<strong>ルータ</strong>（第3層）。スイッチは同一LAN内の転送。",
      },
      {
        q: "4メガバイトのファイルを、伝送効率を考慮しない場合、16Mbpsの回線で転送するのにかかる時間はおよそ何秒か。",
        choices: ["0.25秒", "2秒", "4秒", "8秒"],
        answer: 1,
        explain: "4MB＝4×8＝32Mビット。32 ÷ 16＝<strong>2秒</strong>。バイトをビットに換算するのがポイント。",
      },
      {
        q: "通信ネットワークの機能を役割ごとに7つの層に分けて標準化した参照モデルはどれか。",
        choices: ["TCP/IPモデル", "OSI基本参照モデル", "クライアントサーバモデル", "E-Rモデル"],
        answer: 1,
        explain: "7階層に分けた国際標準の参照モデルは<strong>OSI基本参照モデル</strong>。実運用はTCP/IP(4階層)。",
      },
    ],
  },
  {
    id: "network-protocol", domain: "ネットワーク", icon: "📡", title: "プロトコルとインターネット",
    intro: "TCP/IP、IPアドレス、DNS/DHCP、HTTP/メール系プロトコルとポート番号。",
    understand: [
      {
        h: "プロトコルとIPアドレス",
        body: "<p>通信の『共通ルール（約束事）』が<strong>プロトコル</strong>。インターネットの標準が<strong>TCP/IP</strong>。ネット上の各機器を識別する住所が<strong>IPアドレス</strong>で、現在広く使われる<strong>IPv4は32ビット</strong>（例 192.168.0.1）だが数が枯渇し、<strong>IPv6は128ビット</strong>でほぼ無限のアドレスを持つ。社内など閉じた範囲で自由に使えるのが<strong>プライベートIPアドレス</strong>、インターネットで一意なのが<strong>グローバルIPアドレス</strong>。両者を変換して社内から外へ出るのが<strong>NAT</strong>だ。</p>",
      },
      {
        h: "名前解決とアドレス配布——DNSとDHCP",
        body: "<p>人は<code>www.example.com</code>のような<strong>ドメイン名</strong>を使うが、通信にはIPアドレスが必要。この<strong>ドメイン名⇔IPアドレスの変換（名前解決）</strong>を行うのが<strong>DNS</strong>。下の図のように、PCはまずDNSに『この名前のIPは？』と尋ね、教わったIPアドレスへアクセスします。機器がネットに接続したとき<strong>IPアドレスなどを自動で割り当てる</strong>のが<strong>DHCP</strong>だ。この2つは役割が違うので必ず区別する。</p>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">DNSによる名前解決（ドメイン名→IPアドレス）</text>' +
          '<rect x="24" y="92" width="124" height="56" rx="8" fill="#dce8f3" stroke="#4a7fa8"/><text x="86" y="116" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">あなたのPC</text><text x="86" y="134" fill="#6b6e76" font-size="9" text-anchor="middle">www.example.com を開きたい</text>' +
          '<rect x="228" y="24" width="134" height="50" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="295" y="45" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">DNSサーバ</text><text x="295" y="62" fill="#7a5e17" font-size="9" text-anchor="middle">名前とIPの対応表</text>' +
          '<rect x="440" y="92" width="120" height="56" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="500" y="116" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">Webサーバ</text><text x="500" y="134" fill="#3f7a45" font-size="10" text-anchor="middle">203.0.113.5</text>' +
          '<line x1="120" y1="96" x2="232" y2="62" stroke="#4a7fa8" stroke-width="2"/><polygon points="232,62 220,62 226,71" fill="#4a7fa8"/>' +
          '<text x="132" y="74" fill="#34567a" font-size="9.5" font-weight="700">① IPアドレスは？</text>' +
          '<line x1="238" y1="74" x2="128" y2="116" stroke="#5c9160" stroke-width="2" stroke-dasharray="5 3"/><polygon points="128,116 140,113 135,123" fill="#5c9160"/>' +
          '<text x="132" y="104" fill="#3f7a45" font-size="9.5" font-weight="700">② 203.0.113.5 です</text>' +
          '<line x1="148" y1="130" x2="438" y2="130" stroke="#a85733" stroke-width="2"/><polygon points="438,130 427,125 427,135" fill="#a85733"/>' +
          '<text x="293" y="122" fill="#a85733" font-size="10" font-weight="700" text-anchor="middle">③ 教わったIPアドレスへアクセス</text>' +
          "</svg>",
        cap: "PCはドメイン名のIPをDNSに問い合わせ、返ってきたIPアドレスへアクセスする。DHCPはIP自体を自動配布する別の役割。",
      },
      {
        h: "アプリ層のプロトコルとポート番号",
        body: "<p>用途ごとにプロトコルが決まっている。Webは<strong>HTTP</strong>（暗号化版が<strong>HTTPS</strong>）、メール送信は<strong>SMTP</strong>、受信は<strong>POP</strong>（端末にダウンロード）や<strong>IMAP</strong>（サーバに置いたまま管理）、ファイル転送は<strong>FTP</strong>。どのサービスかを識別する番号が<strong>ポート番号</strong>で、HTTP=80、HTTPS=443、SMTP=25、DNS=53などが有名（丸暗記より『ポートでサービスを区別する』考え方が大事）。<code>https://...</code>のような資源の場所を示す表記が<strong>URL</strong>だ。</p>",
      },
    ],
    memorize: [
      { k: "IPv4 / IPv6", v: "IPv4=32ビット。IPv6=128ビット（枯渇対策で桁数が大幅増）。" },
      { k: "DNS", v: "ドメイン名⇔IPアドレスの変換（名前解決）。" },
      { k: "DHCP", v: "接続機器へIPアドレス等を自動割り当て。" },
      { k: "HTTP / HTTPS", v: "Web閲覧。HTTPSはTLSで暗号化（ポート443）。" },
      { k: "SMTP / POP / IMAP", v: "SMTP=送信。POP=受信(DL)。IMAP=受信(サーバ管理)。" },
      { k: "NAT", v: "プライベートIP⇔グローバルIPの変換。" },
      { k: "ポート番号", v: "同一機器上のサービスを識別。HTTP=80/HTTPS=443/SMTP=25/DNS=53。" },
    ],
    flashcards: [
      { q: "DNSの役割は？", a: "ドメイン名とIPアドレスを相互変換する（名前解決）。" },
      { q: "DHCPの役割は？", a: "ネットワークに接続した機器へIPアドレスなどを自動的に割り当てる。" },
      { q: "IPv4とIPv6のビット数は？", a: "IPv4は32ビット、IPv6は128ビット。" },
      { q: "メールの送信・受信に使うプロトコルは？", a: "送信はSMTP、受信はPOPまたはIMAP（IMAPはサーバにメールを残して管理）。" },
      { q: "HTTPSがHTTPと違う点は？", a: "TLSによって通信を暗号化している（ポート443）。" },
    ],
    quiz: [
      {
        q: "ドメイン名（例：www.example.com）とIPアドレスを相互に変換する仕組みはどれか。",
        choices: ["DHCP", "DNS", "NAT", "SMTP"],
        answer: 1,
        explain: "名前解決（ドメイン名⇔IP）は<strong>DNS</strong>。IPの自動割り当てはDHCP。",
      },
      {
        q: "パソコンをネットワークに接続したとき、IPアドレスやサブネットマスクなどを自動的に割り当てるプロトコルはどれか。",
        choices: ["DNS", "DHCP", "HTTP", "FTP"],
        answer: 1,
        explain: "IP等の自動割り当ては<strong>DHCP</strong>。",
      },
      {
        q: "電子メールを受信する際に、メールをサーバ上に残したまま複数の端末から管理・閲覧するのに適したプロトコルはどれか。",
        choices: ["SMTP", "POP", "IMAP", "SNMP"],
        answer: 2,
        explain: "サーバにメールを残して管理するのは<strong>IMAP</strong>。POPは端末にダウンロードする方式。送信はSMTP。",
      },
      {
        q: "IPv6が導入された最も大きな理由はどれか。",
        choices: [
          "通信を暗号化するため",
          "IPv4のアドレスが不足したため、より多くのアドレスを使えるようにするため",
          "通信速度を必ず10倍にするため",
          "ドメイン名を廃止するため",
        ],
        answer: 1,
        explain: "IPv4(32ビット)のアドレス枯渇に対応し、IPv6(128ビット)で膨大なアドレスを確保するため。",
      },
    ],
  }
);
