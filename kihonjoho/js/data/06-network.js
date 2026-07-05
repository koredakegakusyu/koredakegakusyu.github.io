/* =============================================================
   コレダケ基本情報 カリキュラム — 06 ネットワーク
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-network", domain: "ネットワーク", icon: "🌐", title: "ネットワークの基礎とTCP/IP",
    intro: "OSI参照モデル、機器の役割、TCP/IPとプロトコル。土台を固める。",
    understand: [
      {
        h: "なぜ「層（レイヤ）」に分けるのか",
        body:
          "<p>ネットワーク通信は「ケーブルに電気を流す」ことから「メールを表示する」ことまで、やることが山ほどあります。これを一度に考えると複雑すぎるので、<strong>役割ごとに層（レイヤ）に分けて整理</strong>します。</p>" +
          "<p>層に分ける最大のメリットは、<strong>ある層の技術を入れ替えても、他の層に影響しない</strong>こと。たとえば下位の「有線→無線」を変えても、上位のWebやメールはそのまま動きます。</p>" +
          "<p>この考え方を7つの層で整理した標準が<strong>OSI基本参照モデル</strong>です。下位（物理に近い）から上位（人が使う応用に近い）へ積み上がります。</p>",
        diagram:
          '<svg viewBox="0 0 580 250" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">OSI 7階層と、対応するネットワーク機器</text>' +
          (function () {
            var layers = [
              { n: "7 アプリケーション", d: "HTTP・メールなど応用", c: "#dcecdd", st: "#5c9160" },
              { n: "6 プレゼンテーション", d: "文字コード・暗号化など表現", c: "#e6efe6", st: "#8fb492" },
              { n: "5 セッション", d: "通信の開始〜終了の管理", c: "#e6efe6", st: "#8fb492" },
              { n: "4 トランスポート", d: "TCP/UDP・信頼性・ポート", c: "#f2e7cd", st: "#b28a2e" },
              { n: "3 ネットワーク", d: "IPアドレス・経路選択", c: "#dce8f3", st: "#4a7fa8" },
              { n: "2 データリンク", d: "MACアドレス・隣接転送", c: "#dce8f3", st: "#4a7fa8" },
              { n: "1 物理", d: "ケーブル・電気信号", c: "#efe9dc", st: "#cbc2ae" },
            ];
            var dev = { 0: "", 2: "", 4: "ルータ", 5: "スイッチ/ブリッジ", 6: "リピータ/ハブ" };
            var s = "", y0 = 34, h = 28, gap = 2;
            layers.forEach(function (L, i) {
              var y = y0 + i * (h + gap);
              s += '<rect x="30" y="' + y + '" width="330" height="' + h + '" rx="5" fill="' + L.c + '" stroke="' + L.st + '"/>';
              s += '<text x="42" y="' + (y + 18) + '" fill="#23252b" font-size="11" font-weight="700">' + L.n + "</text>";
              s += '<text x="200" y="' + (y + 18) + '" fill="#6b6e76" font-size="10">' + L.d + "</text>";
              if (dev[i]) {
                s += '<rect x="390" y="' + y + '" width="160" height="' + h + '" rx="5" fill="#fbf3e9" stroke="#e0c9a8"/>';
                s += '<text x="470" y="' + (y + 18) + '" fill="#8a4626" font-size="11" font-weight="700" text-anchor="middle">← ' + dev[i] + "</text>";
              }
            });
            return s;
          })() +
          '<text x="290" y="242" fill="#6b6e76" font-size="11" text-anchor="middle">ルータ＝第3層(IP)、スイッチ＝第2層(MAC)、リピータ／ハブ＝第1層(信号)</text>' +
          "</svg>",
        cap: "下位（物理）から上位（応用）へ7層。機器がどの層で働くか（ルータ=3層・スイッチ=2層）が頻出。",
      },
      {
        h: "実運用のTCP/IPと、TCP・UDPの違い",
        body:
          "<p>OSIは理論上のモデルで、実際のインターネットでは<strong>TCP/IP（4階層）</strong>が使われます。層は「アプリケーション／トランスポート／インターネット／ネットワークインタフェース」の4つにまとめられています。</p>" +
          "<p>トランスポート層には2つのプロトコルがあり、用途で使い分けます。</p>" +
          "<ul>" +
          "<li><strong>TCP</strong>：届いたか確認し、順序を保証し、失敗すれば再送する<strong>信頼性重視</strong>。Webやメールなど「確実に届けたい」通信に使う。</li>" +
          "<li><strong>UDP</strong>：確認や再送をしない代わりに<strong>高速・軽量</strong>。多少欠けても困らない<strong>動画・音声・オンラインゲーム</strong>に向く。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 580 175" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">TCP と UDP の違い</text>' +
          '<rect x="30" y="40" width="255" height="120" rx="10" fill="#dce8f3" stroke="#4a7fa8"/>' +
          '<text x="157" y="64" fill="#34567a" font-size="14" font-weight="800" text-anchor="middle">TCP（確実さ重視）</text>' +
          '<text x="50" y="90" fill="#23252b" font-size="11">・届いたか確認する</text>' +
          '<text x="50" y="112" fill="#23252b" font-size="11">・順序を保証／失敗は再送</text>' +
          '<text x="50" y="134" fill="#23252b" font-size="11">・少し遅いが信頼できる</text>' +
          '<text x="50" y="152" fill="#6b6e76" font-size="10">用途：Web・メール・ファイル転送</text>' +
          '<rect x="295" y="40" width="255" height="120" rx="10" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<text x="422" y="64" fill="#7a5e17" font-size="14" font-weight="800" text-anchor="middle">UDP（速さ重視）</text>' +
          '<text x="315" y="90" fill="#23252b" font-size="11">・確認や再送をしない</text>' +
          '<text x="315" y="112" fill="#23252b" font-size="11">・軽くて速い</text>' +
          '<text x="315" y="134" fill="#23252b" font-size="11">・多少欠けてもOK</text>' +
          '<text x="315" y="152" fill="#6b6e76" font-size="10">用途：動画・音声・ゲーム</text>' +
          "</svg>",
        cap: "確実に届けたいならTCP、速さ優先ならUDP。この使い分けが頻出。",
      },
      {
        h: "用途ごとのプロトコルとポート番号",
        body:
          "<p>アプリケーション層では、用途ごとに使うプロトコル（約束事）が決まっています。Web＝<strong>HTTP／HTTPS</strong>、メール送信＝<strong>SMTP</strong>・受信＝<strong>POP／IMAP</strong>、名前解決＝<strong>DNS</strong>、IP自動割当＝<strong>DHCP</strong>、ファイル転送＝<strong>FTP</strong>。</p>" +
          "<p>1台のサーバは複数のサービスを同時に動かせるため、「どのサービス宛てか」を区別する番号が必要です。これが<strong>ポート番号</strong>。代表例は <strong>HTTP=80、HTTPS=443、SMTP=25、POP=110、DNS=53、FTP=20/21</strong> です。</p>",
      },
    ],
    memorize: [
      { k: "OSI 7階層", v: "物理・データリンク・ネットワーク・トランスポート・セッション・プレゼン・アプリ。" },
      { k: "機器と層", v: "リピータ=物理、スイッチ/ブリッジ=第2層(MAC)、ルータ=第3層(IP)。" },
      { k: "TCP / UDP", v: "TCP=信頼性(順序保証・再送)、UDP=高速だが保証なし(動画/音声)。" },
      { k: "DNS / DHCP", v: "DNS=名前解決(ドメイン⇔IP)、DHCP=IP自動割当。" },
      { k: "ポート番号", v: "HTTP=80、HTTPS=443、SMTP=25、DNS=53、FTP=20/21。" },
    ],
    flashcards: [
      { q: "ルータとスイッチが動作するOSIの層は？", a: "ルータは第3層(ネットワーク層・IP)、スイッチは第2層(データリンク層・MAC)。" },
      { q: "TCPとUDPの違いは？", a: "TCPは信頼性重視(順序保証・再送)、UDPは高速だが保証なし(ストリーミング等)。" },
      { q: "DNSとDHCPの役割は？", a: "DNSは名前解決(ドメイン⇔IP)、DHCPはIPアドレスの自動割当。" },
      { q: "HTTPSのポート番号は？", a: "443（HTTPは80）。" },
    ],
    quiz: [
      {
        q: "OSI基本参照モデルのネットワーク層で動作し、IPアドレスに基づいて経路を選択する機器はどれか。",
        choices: ["リピータ", "ブリッジ", "ルータ", "スイッチングハブ"],
        answer: 2,
        explain: "第3層でIPにより経路選択するのは<strong>ルータ</strong>。スイッチは第2層(MAC)。",
      },
      {
        q: "信頼性よりもリアルタイム性が求められる音声・動画の配信に適した、コネクションレスなトランスポート層プロトコルはどれか。",
        choices: ["TCP", "UDP", "HTTP", "IP"],
        answer: 1,
        explain: "高速だが保証なしの<strong>UDP</strong>がストリーミングに向く。信頼性重視はTCP。",
      },
      {
        q: "ドメイン名とIPアドレスを相互に変換するプロトコル（サービス）はどれか。",
        choices: ["DHCP", "DNS", "SMTP", "ARP"],
        answer: 1,
        explain: "名前解決は<strong>DNS</strong>。IP自動割当はDHCP。",
      },
    ],
  },
  {
    id: "fe-ipaddr", domain: "ネットワーク", icon: "📡", title: "IPアドレスとサブネット",
    intro: "IPv4/IPv6、サブネットマスク、ホスト数の計算。FEの計算頻出テーマ。",
    understand: [
      {
        h: "IPアドレスとサブネットマスク",
        body:
          "<p><strong>IPv4は32ビット</strong>で、<strong>ネットワーク部</strong>と<strong>ホスト部</strong>に分かれます。どこまでがネットワーク部かを示すのが<strong>サブネットマスク</strong>（例 255.255.255.0）。</p>" +
          "<p><strong>/24</strong> のような表記（CIDR）は「上位24ビットがネットワーク部」の意味。残りの<strong>ホスト部ビット数</strong>から、そのネットワークに置ける機器数が決まります。</p>",
        diagram:
          '<svg viewBox="0 0 580 160" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">IPv4アドレス（/24 の例）</text>' +
          '<rect x="40" y="44" width="360" height="40" rx="7" fill="#dce8f3" stroke="#4a7fa8"/><text x="220" y="69" fill="#34567a" font-size="13" font-weight="800" text-anchor="middle">ネットワーク部（24ビット）</text>' +
          '<rect x="400" y="44" width="140" height="40" rx="7" fill="#f2e7cd" stroke="#b28a2e"/><text x="470" y="69" fill="#7a5e17" font-size="13" font-weight="800" text-anchor="middle">ホスト部（8）</text>' +
          '<text x="220" y="104" fill="#6b6e76" font-size="11" text-anchor="middle">192.168.1 が共通</text>' +
          '<text x="470" y="104" fill="#6b6e76" font-size="11" text-anchor="middle">1〜254 が機器</text>' +
          '<rect x="120" y="120" width="340" height="30" rx="7" fill="#dcecdd" stroke="#5c9160"/><text x="290" y="140" fill="#366b3c" font-size="13" font-weight="800" text-anchor="middle">利用可能ホスト数 = 2⁸ − 2 = 254</text>' +
          "</svg>",
        cap: "ホスト部がnビットなら、使える機器数は 2ⁿ−2（全0=ネットワーク、全1=ブロードキャストを除く）。",
      },
    ],
    memorize: [
      { k: "IPv4 / IPv6", v: "IPv4=32ビット。IPv6=128ビット。" },
      { k: "サブネットマスク", v: "ネットワーク部を示す。255.255.255.0 = /24。" },
      { k: "利用可能ホスト数", v: "<strong>2^(ホスト部ビット数) − 2</strong>（ネットワークとブロードキャストを除く）。" },
      { k: "プライベート/グローバル", v: "社内用/インターネット用。変換はNAT。" },
      { k: "ブロードキャスト", v: "ホスト部が全1のアドレス。同一ネット全体へ送信。" },
    ],
    flashcards: [
      { q: "サブネットマスク /24 のホスト部は何ビットで、機器は何台置ける？", a: "ホスト部8ビット。2⁸−2＝254台。" },
      { q: "利用可能ホスト数の求め方は？", a: "2^(ホスト部ビット数)−2（全0と全1を除く）。" },
      { q: "IPv4とIPv6のビット数は？", a: "IPv4は32ビット、IPv6は128ビット。" },
      { q: "255.255.255.0 はCIDR表記で何？", a: "/24（上位24ビットがネットワーク部）。" },
    ],
    quiz: [
      {
        q: "サブネットマスクが 255.255.255.0 のネットワークに接続できるホスト（機器）の最大数はいくつか。",
        choices: ["254", "255", "256", "128"],
        answer: 0,
        explain: "ホスト部8ビット→2⁸=256から、ネットワークアドレスとブロードキャストの2を引いて<strong>254</strong>。",
      },
      {
        q: "サブネットマスクが 255.255.255.192 のとき、1つのサブネットに置けるホストの最大数はいくつか。",
        choices: ["30", "62", "126", "254"],
        answer: 1,
        explain: "192は上位2ビットが1（/26）。ホスト部は6ビット→2⁶−2＝<strong>62</strong>。",
      },
      {
        q: "IPv6が導入された最大の理由はどれか。",
        choices: [
          "通信を暗号化するため",
          "IPv4アドレスの枯渇に対応し、より多くのアドレスを使えるようにするため",
          "通信速度を必ず上げるため",
          "ドメイン名を不要にするため",
        ],
        answer: 1,
        explain: "IPv4(32ビット)の枯渇に対応し、IPv6(128ビット)で膨大なアドレスを確保するため。",
      },
    ],
  }
);
