/* =============================================================
   コレダケ基本情報 カリキュラム — 14 プロトコル詳細・誤り制御・無線
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-protocol", domain: "ネットワーク", icon: "🔌", title: "プロトコルとアドレス変換",
    intro: "ARP、NAT/NAPT、プロキシ、主要プロトコルの役割。通信の仕組みを深く理解する。",
    understand: [
      {
        h: "2種類の住所——IPアドレスとMACアドレス",
        body:
          "<p>ネットワーク上の機器には<strong>2種類の住所</strong>があります。</p>" +
          "<ul>" +
          "<li><strong>IPアドレス</strong>：通信のための<strong>論理的な住所</strong>。接続する場所によって変わることがある（引っ越すと住所が変わるイメージ）。</li>" +
          "<li><strong>MACアドレス</strong>：機器(NIC)に製造時に付けられた<strong>変わらない物理的な住所</strong>（世界で一意）。</li>" +
          "</ul>" +
          "<p>実際にデータを隣の機器へ渡すにはMACアドレスが必要です。そこで「このIPアドレスの相手のMACアドレスは？」と問い合わせる仕組みが<strong>ARP</strong>です。</p>",
      },
      {
        h: "アドレス変換——NATとNAPT",
        body:
          "<p>社内などで自由に使える<strong>プライベートIP</strong>は、そのままではインターネットに出られません。インターネットで通用する<strong>グローバルIP</strong>へ<strong>変換</strong>する必要があります。</p>" +
          "<p>この変換が<strong>NAT</strong>（1対1で変換）。さらに<strong>ポート番号も併用して、社内の複数機器で1個のグローバルIPを共有</strong>できるようにしたのが<strong>NAPT（IPマスカレード）</strong>です。家庭のルータもこれで、複数の端末が1本の回線でネットにつながっています。</p>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">NAPT（複数機器で1つのグローバルIPを共有）</text>' +
          '<rect x="20" y="45" width="150" height="130" rx="10" fill="#eef4f9" stroke="#9db8cd" stroke-dasharray="5 4"/><text x="95" y="64" fill="#34567a" font-size="11" font-weight="700" text-anchor="middle">社内（プライベートIP）</text>' +
          '<rect x="38" y="78" width="115" height="26" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="95" y="95" fill="#23252b" font-size="10" text-anchor="middle">PC1  192.168.0.2</text>' +
          '<rect x="38" y="110" width="115" height="26" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="95" y="127" fill="#23252b" font-size="10" text-anchor="middle">PC2  192.168.0.3</text>' +
          '<rect x="38" y="142" width="115" height="26" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="95" y="159" fill="#23252b" font-size="10" text-anchor="middle">PC3  192.168.0.4</text>' +
          '<rect x="235" y="90" width="110" height="45" rx="8" fill="#f3ddcd" stroke="#c1855c"/><text x="290" y="110" fill="#8a4626" font-size="12" font-weight="800" text-anchor="middle">ルータ</text><text x="290" y="126" fill="#6b6e76" font-size="9" text-anchor="middle">NAPTで変換</text>' +
          '<line x1="153" y1="112" x2="233" y2="112" stroke="#a85733" stroke-width="2"/><polygon points="233,112 223,107 223,117" fill="#a85733"/>' +
          '<line x1="345" y1="112" x2="425" y2="112" stroke="#a85733" stroke-width="2"/><polygon points="425,112 415,107 415,117" fill="#a85733"/>' +
          '<rect x="425" y="88" width="135" height="48" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="492" y="108" fill="#366b3c" font-size="11" font-weight="700" text-anchor="middle">インターネット</text><text x="492" y="126" fill="#23252b" font-size="10" text-anchor="middle">203.0.113.5（1個）</text>' +
          '<text x="290" y="192" fill="#6b6e76" font-size="11" text-anchor="middle">3台とも同じ1個のグローバルIPで外に出る（ポート番号で区別）</text>' +
          "</svg>",
        cap: "社内の複数のプライベートIPを、ルータが1個のグローバルIPに変換（ポート番号で識別）。",
      },
      {
        h: "主要プロトコルとプロキシ",
        body:
          "<p>用途別プロトコル：Webの<strong>HTTP/HTTPS</strong>、メール送信<strong>SMTP</strong>・受信<strong>POP/IMAP</strong>、ファイル転送<strong>FTP</strong>、名前解決<strong>DNS</strong>、IP自動割当<strong>DHCP</strong>、時刻同期<strong>NTP</strong>、機器監視<strong>SNMP</strong>。</p>" +
          "<p>内部と外部の間に立って通信を<strong>代理・中継</strong>するのが<strong>プロキシサーバ</strong>。社員のPCの代わりに外部へアクセスし、<strong>アクセス制御・ログ記録・キャッシュ（同じページを高速化）・匿名化</strong>を行います。</p>",
      },
    ],
    memorize: [
      { k: "ARP", v: "IPアドレスから対応するMACアドレスを問い合わせる。" },
      { k: "MACアドレス", v: "機器(NIC)固有の物理アドレス。IPは論理アドレス。" },
      { k: "NAT / NAPT", v: "NAT=IPを1対1変換。NAPT=ポートも使い複数機器で1つのグローバルIPを共有。" },
      { k: "プロキシサーバ", v: "内外の通信を代理・中継。アクセス制御・キャッシュ・匿名化。" },
      { k: "DHCP / DNS", v: "DHCP=IP自動割当、DNS=名前解決(ドメイン⇔IP)。" },
      { k: "NTP / SNMP", v: "NTP=時刻同期、SNMP=ネットワーク機器の監視・管理。" },
    ],
    flashcards: [
      { q: "ARPの役割は？", a: "IPアドレスから、対応する機器のMACアドレスを問い合わせて調べる。" },
      { q: "NATとNAPTの違いは？", a: "NATはIPアドレスを1対1で変換、NAPTはポート番号も使い複数機器で1つのグローバルIPを共有する。" },
      { q: "プロキシサーバの主な用途は？", a: "内部と外部の通信を中継し、アクセス制御・ログ・キャッシュ・匿名化を行う。" },
      { q: "時刻を同期するプロトコルは？", a: "NTP。" },
    ],
    quiz: [
      {
        q: "IPアドレスから、それに対応するMACアドレスを取得するために使われるプロトコルはどれか。",
        choices: ["DNS", "ARP", "DHCP", "ICMP"],
        answer: 1,
        explain: "IP→MACの問い合わせは<strong>ARP</strong>。ドメイン⇔IPはDNS。",
      },
      {
        q: "1つのグローバルIPアドレスを、ポート番号を用いて社内の複数の機器で共有できるようにする技術はどれか。",
        choices: ["NAT", "NAPT（IPマスカレード）", "DNS", "VLAN"],
        answer: 1,
        explain: "ポート番号も使い複数機器で共有するのは<strong>NAPT（IPマスカレード）</strong>。単純な1対1変換がNAT。",
      },
      {
        q: "社内から外部Webサーバへのアクセスを中継し、アクセス制御やキャッシュ、ログ記録を行うサーバはどれか。",
        choices: ["DNSサーバ", "プロキシサーバ", "DHCPサーバ", "ファイルサーバ"],
        answer: 1,
        explain: "通信を代理・中継するのは<strong>プロキシサーバ</strong>。",
      },
    ],
  },
  {
    id: "fe-transmission", domain: "ネットワーク", icon: "📶", title: "誤り制御・伝送と無線LAN",
    intro: "パリティ・CRC・ハミング符号、CSMA/CD、無線LANとその暗号。伝送の信頼性を学ぶ。",
    understand: [
      {
        h: "誤り検出・訂正",
        body:
          "<p>通信中に電気的ノイズなどでビットが化けることがあります。これを見つける最も基本的な仕組みが<strong>パリティチェック</strong>です。データの<strong>1の個数が偶数（または奇数）になるように、1ビットの検査ビット（パリティビット）を付け加えて</strong>送ります。受信側で1の個数を数え、偶数のはずが奇数になっていれば「途中で誤りが起きた」と分かります。</p>" +
          "<p>ただしパリティは<strong>1ビットの誤りを『検出』できるだけで、どのビットが誤ったかは分からず訂正はできません</strong>（2ビット同時に化けると見逃します）。より強力に検出できるのが<strong>CRC（巡回冗長検査）</strong>で、連続した誤りも捕まえられます。さらに<strong>ハミング符号</strong>は、検査ビットを複数付けることで<strong>1ビット誤りの『訂正』までできる</strong>のが特徴です。この「検出だけ／訂正までできる」の違いが頻出です。</p>",
        diagram:
          '<svg viewBox="0 0 470 195" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="235" y="19" fill="#23252b" font-size="13.5" font-weight="700" text-anchor="middle">偶数パリティ（1の個数を偶数にそろえて誤りを検出）</text>' +
          '<text x="200" y="44" fill="#34567a" font-size="9.5" font-weight="700" text-anchor="middle">データ（7ビット）</text>' +
          '<text x="351" y="44" fill="#8a6a1e" font-size="9.5" font-weight="700" text-anchor="middle">パリティ</text>' +
          (function () {
            function rowCells(x, y, bits, flip) {
              var s = "", cw = 34, i;
              for (i = 0; i < bits.length; i++) {
                var isP = i === bits.length - 1;
                var fill = isP ? "#f2e7cd" : "#dce8f3", st = isP ? "#b28a2e" : "#4a7fa8";
                if (flip === i) { fill = "#f7dfd6"; st = "#c26b4a"; }
                var cx = x + i * cw;
                s += '<rect x="' + cx + '" y="' + y + '" width="' + cw + '" height="34" fill="' + fill + '" stroke="' + st + '"/>';
                s += '<text x="' + (cx + cw / 2) + '" y="' + (y + 23) + '" fill="#23252b" font-size="15" font-weight="700" text-anchor="middle">' + bits[i] + "</text>";
              }
              return s;
            }
            var s = "";
            s += '<text x="46" y="70" fill="#6b6e76" font-size="10" font-weight="700" text-anchor="middle">送信</text>';
            s += rowCells(96, 50, [1, 0, 1, 1, 0, 0, 1, 0], -1);
            s += '<text x="235" y="99" fill="#3f7a45" font-size="10.5" text-anchor="middle">1の個数を偶数にそろえる → パリティビット＝0</text>';
            s += '<text x="46" y="138" fill="#6b6e76" font-size="10" font-weight="700" text-anchor="middle">受信</text>';
            s += rowCells(96, 118, [1, 0, 0, 1, 0, 0, 1, 0], 2);
            s += '<text x="235" y="167" fill="#c26b4a" font-size="10.5" font-weight="700" text-anchor="middle">1ビット反転で個数が奇数に → 誤りを検出（訂正はできない）</text>';
            return s;
          })() +
          "</svg>",
        cap: "1の個数を偶数にそろえる検査ビットを付加。受信側で奇数になれば誤りと分かる（検出のみ・訂正不可）。",
      },
      {
        h: "アクセス制御と無線LAN",
        body:
          "<p>有線LAN（イーサネット）で、送信前に回線が空いているか確認し、衝突したら待って再送するのが<strong>CSMA/CD</strong>。無線LANでは衝突を避ける<strong>CSMA/CA</strong>を使います。</p>" +
          "<p>無線LAN(<strong>Wi-Fi</strong>)はネットワーク名<strong>SSID</strong>で識別し、暗号化は<strong>WPA2/WPA3</strong>を使います（古いWEPは危険で非推奨）。誰でも入れる状態を避けるのが安全対策です。</p>",
      },
    ],
    memorize: [
      { k: "パリティチェック", v: "1の個数を偶数/奇数にそろえ、1ビット誤りを検出（訂正不可）。" },
      { k: "CRC", v: "巡回冗長検査。連続する誤りも検出できる強力な誤り検出。" },
      { k: "ハミング符号", v: "1ビット誤りの検出＋訂正ができる。" },
      { k: "CSMA/CD", v: "有線LAN。送信前に確認し衝突したら再送。" },
      { k: "CSMA/CA", v: "無線LAN。衝突を避ける方式。" },
      { k: "SSID / WPA2・WPA3", v: "SSID=無線LAN識別名。暗号化はWPA2/WPA3（WEPは非推奨）。" },
    ],
    flashcards: [
      { q: "パリティチェックとハミング符号の違いは？", a: "パリティは1ビット誤りの検出のみ、ハミング符号は検出に加えて訂正もできる。" },
      { q: "CSMA/CDとCSMA/CAの使われる場所は？", a: "CSMA/CDは有線LAN（イーサネット）、CSMA/CAは無線LAN。" },
      { q: "無線LANで使うべき暗号化方式は？", a: "WPA2またはWPA3（古いWEPは脆弱で非推奨）。" },
      { q: "CRCとは？", a: "巡回冗長検査。誤り検出用の値を付加し、連続するビット誤りも検出できる。" },
    ],
    quiz: [
      {
        q: "データ転送における誤り制御方式のうち、1ビットの誤りの検出だけでなく、その訂正もできるものはどれか。",
        choices: ["パリティチェック", "チェックサム", "ハミング符号", "CRC"],
        answer: 2,
        explain: "検出＋訂正ができるのは<strong>ハミング符号</strong>。パリティやCRCは検出のみ。",
      },
      {
        q: "有線LAN(イーサネット)で、送信前に伝送路の空きを確認し、衝突が起きたら一定時間待って再送するアクセス制御方式はどれか。",
        choices: ["CSMA/CD", "CSMA/CA", "トークンパッシング", "ポーリング"],
        answer: 0,
        explain: "有線LANの衝突検出・再送方式は<strong>CSMA/CD</strong>。無線はCSMA/CA。",
      },
      {
        q: "無線LANのセキュリティ対策として最も適切なものはどれか。",
        choices: [
          "暗号化を行わず誰でも接続できるようにする",
          "WPA2やWPA3による暗号化を設定する",
          "SSIDを最も推測しやすい名前にする",
          "古いWEPを使い続ける",
        ],
        answer: 1,
        explain: "無線LANは<strong>WPA2/WPA3</strong>で暗号化するのが適切。WEPは脆弱で非推奨。",
      },
    ],
  }
);
