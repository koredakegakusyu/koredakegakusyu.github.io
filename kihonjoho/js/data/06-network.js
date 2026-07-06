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
        h: "IPアドレスの正体——32ビットを8ビットずつ区切った数字",
        body:
          "<p>ネットワーク上の機器を識別する住所が<strong>IPアドレス</strong>です。<strong>IPv4は全部で32ビット</strong>——ただし2進数32桁は人間には読みにくいので、<strong>8ビット（＝0〜255）ずつ4つに区切り、10進数で「.（ドット）」でつないで</strong>表します。「192.168.1.10」のような表記がこれです。</p>" +
          "<p>つまり4つの数字は、それぞれが8ビットの2進数を10進数に直したもの。下の図で対応を見ておくと、この後の計算がぐっと分かりやすくなります。</p>",
        diagram:
          '<svg viewBox="0 0 580 150" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">IPアドレス ＝ 8ビット × 4 ＝ 32ビット</text>' +
          (function () {
            var oct = [{ d: "192", b: "11000000" }, { d: "168", b: "10101000" }, { d: "1", b: "00000001" }, { d: "10", b: "00001010" }];
            var s = "", bw = 118, x0 = 26, gap = 18;
            oct.forEach(function (o, i) {
              var x = x0 + i * (bw + gap);
              s += '<rect x="' + x + '" y="42" width="' + bw + '" height="34" rx="6" fill="#dce8f3" stroke="#4a7fa8"/>';
              s += '<text x="' + (x + bw / 2) + '" y="65" fill="#23252b" font-size="17" font-weight="800" text-anchor="middle">' + o.d + "</text>";
              s += '<text x="' + (x + bw / 2) + '" y="96" fill="#34567a" font-size="12" font-family="monospace" text-anchor="middle">' + o.b + "</text>";
              s += '<text x="' + (x + bw / 2) + '" y="114" fill="#6b6e76" font-size="9" text-anchor="middle">8ビット</text>';
              if (i < 3) s += '<text x="' + (x + bw + gap / 2) + '" y="66" fill="#6b6e76" font-size="18" font-weight="800" text-anchor="middle">.</text>';
            });
            return s;
          })() +
          '<text x="290" y="140" fill="#6b6e76" font-size="11" text-anchor="middle">各数字は0〜255（8ビット）。192を2進数にすると11000000。4つで合計32ビット。</text>' +
          "</svg>",
        cap: "IPv4は32ビット。8ビット(0〜255)ずつ4つに区切って10進数で表す。各数字は8桁の2進数に対応する。",
      },
      {
        h: "ネットワーク部とホスト部——サブネットマスクが境界を決める",
        body:
          "<p>IPアドレスは、<strong>前半＝ネットワーク部</strong>（どのネットワークか）と<strong>後半＝ホスト部</strong>（その中のどの機器か）に分かれます。住所でいえば「〇〇マンション」までがネットワーク部、「△△号室」がホスト部のイメージです。同じネットワーク内の機器は<strong>ネットワーク部が全員共通</strong>で、ホスト部だけが1台ずつ違います。</p>" +
          "<p>どこまでがネットワーク部かを示すのが<strong>サブネットマスク</strong>です。<strong>255の部分がネットワーク部、0の部分がホスト部</strong>を表します。<code>255.255.255.0</code>なら前3つ（24ビット）がネットワーク部、最後（8ビット）がホスト部。この「上位何ビットがネットワーク部か」を<code>/24</code>のように書くのが<strong>CIDR表記</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">サブネットマスク /24（255.255.255.0）の意味</text>' +
          (function () {
            var bw = 96, x0 = 104, gap = 12, rh = 30;
            function cell(x, y, val, net) {
              var fill = net ? "#dce8f3" : "#f2e7cd", st = net ? "#4a7fa8" : "#b28a2e";
              return '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + rh + '" rx="5" fill="' + fill + '" stroke="' + st + '"/><text x="' + (x + bw / 2) + '" y="' + (y + 20) + '" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">' + val + "</text>";
            }
            var ip = ["192", "168", "1", "10"], mask = ["255", "255", "255", "0"];
            var s = "";
            s += '<text x="92" y="68" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="end">IPアドレス</text>';
            ip.forEach(function (v, i) { s += cell(x0 + i * (bw + gap), 50, v, i < 3); });
            s += '<text x="92" y="110" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="end">マスク</text>';
            mask.forEach(function (v, i) { s += cell(x0 + i * (bw + gap), 92, v, i < 3); });
            return s;
          })() +
          '<text x="290" y="150" fill="#34567a" font-size="11" text-anchor="middle">青（255の3つ）＝ネットワーク部：同じネット内の全機器で共通</text>' +
          '<text x="290" y="168" fill="#7a5e17" font-size="11" text-anchor="middle">橙（0の部分）＝ホスト部：機器ごとに 1〜254 を割り当てる</text>' +
          "</svg>",
        cap: "マスクの255＝ネットワーク部（ネット内で共通）、0＝ホスト部（機器ごとの番号）。255.255.255.0 は /24。",
      },
      {
        h: "「255.255.255.192」のような中途半端なマスクは2進数で考える",
        body:
          "<p>試験で差がつくのが、<code>255.255.255.192</code>のように<strong>255でも0でもない数字</strong>が混じるマスクです。これは<strong>その数字を2進数に直し、先頭から「1」が続いている桁数を数える</strong>と解けます。1が続く部分がネットワーク部だからです。</p>" +
          "<p><code>192</code>を2進数にすると<strong>11000000</strong>——先頭の「1」が2個。つまり最後の8ビットのうち<strong>上位2ビットがネットワーク部に食い込み</strong>、<strong>/24＋2＝/26</strong>になります。残る<strong>ホスト部は6ビット</strong>なので、置ける機器数は<strong>2⁶−2＝62台</strong>。下の早見表の「1の数」を覚えておくと即答できます。</p>",
        diagram:
          '<svg viewBox="0 0 580 315" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">255.255.255.192 が /26 になる理由</text>' +
          '<text x="290" y="44" fill="#23252b" font-size="11.5" text-anchor="middle">最後の「192」を2進数にすると…</text>' +
          (function () {
            var bits = [1, 1, 0, 0, 0, 0, 0, 0], cw = 44, x0 = 114, y = 52;
            var s = "";
            bits.forEach(function (b, i) {
              var net = i < 2, fill = net ? "#dce8f3" : "#f2e7cd", st = net ? "#4a7fa8" : "#b28a2e";
              var x = x0 + i * cw;
              s += '<rect x="' + x + '" y="' + y + '" width="' + cw + '" height="34" fill="' + fill + '" stroke="' + st + '"/>';
              s += '<text x="' + (x + cw / 2) + '" y="' + (y + 23) + '" fill="#23252b" font-size="16" font-weight="700" font-family="monospace" text-anchor="middle">' + b + "</text>";
            });
            s += '<text x="' + (x0 + cw) + '" y="' + (y + 52) + '" fill="#34567a" font-size="10" font-weight="700" text-anchor="middle">ネット 2ビット</text>';
            s += '<text x="' + (x0 + 5 * cw) + '" y="' + (y + 52) + '" fill="#7a5e17" font-size="10" font-weight="700" text-anchor="middle">ホスト 6ビット</text>';
            return s;
          })() +
          '<text x="290" y="130" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">→ 24＋2 ＝ /26 ・ ホスト部6ビット → 2⁶−2 ＝ 62台</text>' +
          (function () {
            var rows = [["128", "10000000", "1"], ["192", "11000000", "2"], ["224", "11100000", "3"], ["240", "11110000", "4"], ["248", "11111000", "5"], ["252", "11111100", "6"], ["254", "11111110", "7"], ["255", "11111111", "8"]];
            var head = ["10進", "2進数", "1の数"], w = [70, 130, 60], x0 = 160, y0 = 152, rh = 17;
            var xs = [x0]; for (var i = 0; i < w.length; i++) xs.push(xs[i] + w[i]);
            var s = '<text x="290" y="' + (y0 - 6) + '" fill="#6b6e76" font-size="10.5" text-anchor="middle">早見表：マスクの数字と「1の数（＝足すネットワークビット）」</text>';
            head.forEach(function (h, ci) {
              s += '<rect x="' + xs[ci] + '" y="' + y0 + '" width="' + w[ci] + '" height="' + rh + '" fill="#eceff3" stroke="#c7ccd2"/><text x="' + (xs[ci] + w[ci] / 2) + '" y="' + (y0 + 12) + '" fill="#23252b" font-size="10" font-weight="700" text-anchor="middle">' + h + "</text>";
            });
            rows.forEach(function (row, ri) {
              var y = y0 + (ri + 1) * rh, hi = row[0] === "192";
              row.forEach(function (cell, ci) {
                var fill = hi ? "#dce8f3" : "#ffffff";
                s += '<rect x="' + xs[ci] + '" y="' + y + '" width="' + w[ci] + '" height="' + rh + '" fill="' + fill + '" stroke="#d8dbe0"/>';
                s += '<text x="' + (xs[ci] + w[ci] / 2) + '" y="' + (y + 12) + '" fill="#23252b" font-size="' + (ci === 1 ? 10 : 10.5) + '" ' + (ci === 1 ? 'font-family="monospace" ' : "") + (hi ? 'font-weight="700" ' : "") + 'text-anchor="middle">' + cell + "</text>";
              });
            });
            return s;
          })() +
          "</svg>",
        cap: "マスクの数字を2進数にして「1の数」を数えるとネットワークのビット数が分かる。192=11000000→2→/26→ホスト6ビット→62台。",
      },
      {
        h: "ネットワークアドレスとブロードキャスト——だから「−2」する",
        body:
          "<p>ホスト部のビットが n 個あるとき、値の組合せは2ⁿ通りありますが、<strong>そのうち2つは機器に使えません</strong>。</p>" +
          "<ul>" +
          "<li><strong>ホスト部が全部0</strong>のアドレス＝<strong>ネットワークアドレス</strong>（そのネットワーク自体を指す。個々の機器には付けない）。</li>" +
          "<li><strong>ホスト部が全部1</strong>のアドレス＝<strong>ブロードキャストアドレス</strong>（同じネットワークの全機器へ一斉送信するための特別なアドレス）。</li>" +
          "</ul>" +
          "<p>この2つを除くので、<strong>使える機器数 ＝ 2ⁿ − 2</strong>。/24（ホスト8ビット）なら2⁸−2＝254台、/26（ホスト6ビット）なら2⁶−2＝62台、という計算になります。</p>",
        diagram:
          '<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">192.168.1.x（/24）に置けるアドレス</text>' +
          '<rect x="30" y="50" width="150" height="50" rx="7" fill="#eceff3" stroke="#9aa0a8"/><text x="105" y="72" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">192.168.1.0</text><text x="105" y="90" fill="#6b6e76" font-size="10" text-anchor="middle">ネットワークアドレス</text>' +
          '<rect x="196" y="50" width="188" height="50" rx="7" fill="#dcecdd" stroke="#5c9160"/><text x="290" y="72" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">.1 〜 .254</text><text x="290" y="90" fill="#3f7a45" font-size="10" text-anchor="middle">機器に使える（254台）</text>' +
          '<rect x="400" y="50" width="150" height="50" rx="7" fill="#f7dfd6" stroke="#c26b4a"/><text x="475" y="72" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">192.168.1.255</text><text x="475" y="90" fill="#b0532f" font-size="10" text-anchor="middle">ブロードキャスト</text>' +
          '<text x="105" y="118" fill="#6b6e76" font-size="9.5" text-anchor="middle">ホスト部 all 0</text>' +
          '<text x="475" y="118" fill="#6b6e76" font-size="9.5" text-anchor="middle">ホスト部 all 1</text>' +
          '<text x="290" y="150" fill="#6b6e76" font-size="11" text-anchor="middle">両端の2つは機器に使えない → 256 − 2 ＝ 254台</text>' +
          "</svg>",
        cap: "ホスト部all0=ネットワークアドレス、all1=ブロードキャスト。この2つは機器に使えないので 2ⁿ−2 台。",
      },
    ],
    memorize: [
      { k: "IPv4 / IPv6", v: "IPv4=32ビット(8ビット×4)。IPv6=128ビット。" },
      { k: "ネットワーク部/ホスト部", v: "前半=どのネットワークか(ネット内共通)、後半=その中のどの機器か。境界はマスクで決まる。" },
      { k: "サブネットマスク", v: "255の部分=ネットワーク部、0の部分=ホスト部。255.255.255.0 = /24。" },
      { k: "CIDR表記", v: "/24 = 上位24ビットがネットワーク部。255.255.255.0 と同じ意味。" },
      { k: "マスク値→ビット", v: "2進数の1の数で判断。192=11000000→2→/26。224→/27、240→/28…。" },
      { k: "利用可能ホスト数", v: "<strong>2^(ホスト部ビット数) − 2</strong>（ネットワークとブロードキャストを除く）。" },
      { k: "ネットワークアドレス", v: "ホスト部が全0。ネットワーク自体を指し、機器には使えない。" },
      { k: "ブロードキャストアドレス", v: "ホスト部が全1。同一ネット全機器へ一斉送信。機器には使えない。" },
      { k: "プライベート/グローバル", v: "社内用/インターネット用。変換はNAT。" },
    ],
    flashcards: [
      { q: "サブネットマスク /24 のホスト部は何ビットで、機器は何台置ける？", a: "ホスト部8ビット。2⁸−2＝254台。" },
      { q: "255.255.255.192 は /いくつ？ ホストは何台？", a: "192=11000000で1が2個→24+2=/26。ホスト部6ビット→2⁶−2＝62台。" },
      { q: "利用可能ホスト数が「2ⁿ−2」と−2する理由は？", a: "ホスト部が全0のネットワークアドレスと、全1のブロードキャストアドレスの2つは機器に使えないから。" },
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
        explain: "192を2進数にすると11000000で1が2個（/26）。ホスト部は6ビット→2⁶−2＝<strong>62</strong>。",
      },
      {
        q: "サブネットマスクが 255.255.255.224 のとき、1つのサブネットに置けるホストの最大数はいくつか。",
        choices: ["14", "30", "62", "126"],
        answer: 1,
        explain: "224を2進数にすると11100000で1が3個（/27）。ホスト部は5ビット→2⁵−2＝<strong>30</strong>。",
      },
      {
        q: "IPアドレスにおいて、ホスト部のビットがすべて0であるアドレスは何を表すか。",
        choices: ["ブロードキャストアドレス", "ネットワークアドレス", "デフォルトゲートウェイ", "ループバックアドレス"],
        answer: 1,
        explain: "ホスト部が全0はそのネットワーク自体を指す<strong>ネットワークアドレス</strong>。全1はブロードキャスト。どちらも機器には使えない。",
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
