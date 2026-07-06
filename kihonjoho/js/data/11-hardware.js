/* =============================================================
   コレダケ基本情報 カリキュラム — 11 命令実行・記憶装置・入出力
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-instruction", domain: "コンピュータ構成", icon: "📟", title: "命令実行とアドレッシング・割込み",
    intro: "命令の実行手順、アドレス指定方式、割込みの種類。CPUの動きを深く理解する。",
    understand: [
      {
        h: "命令の実行サイクルとレジスタ",
        body:
          "<p>CPUは命令を <strong>フェッチ（取り出し）→デコード（解読）→実行</strong> の順で処理します。これを支える高速な記憶が<strong>レジスタ</strong>です。</p>" +
          "<ul>" +
          "<li><strong>プログラムカウンタ(PC)</strong>：次に実行する命令のアドレスを保持。</li>" +
          "<li><strong>命令レジスタ(IR)</strong>：取り出した命令を保持。</li>" +
          "<li><strong>アキュムレータ</strong>：演算の途中結果を保持。</li>" +
          "</ul>" +
          "<p>命令は<strong>命令部（何をするか）</strong>と<strong>オペランド部（対象データの場所）</strong>から成ります。CPUはこの3段階を<strong>次々と繰り返し</strong>、1つ実行するたびにPCを進めて次の命令へ移ります。</p>",
        diagram:
          '<svg viewBox="0 0 520 172" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="260" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">命令実行サイクル</text>' +
          '<rect x="30" y="52" width="120" height="52" rx="10" fill="#dce8f3" stroke="#4a7fa8"/><text x="90" y="78" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">① フェッチ</text><text x="90" y="95" fill="#6b6e76" font-size="9.5" text-anchor="middle">命令を取り出す</text>' +
          '<line x1="150" y1="78" x2="195" y2="78" stroke="#8a8f98" stroke-width="2"/><polygon points="195,78 186,73 186,83" fill="#8a8f98"/>' +
          '<rect x="197" y="52" width="120" height="52" rx="10" fill="#f2e7cd" stroke="#b28a2e"/><text x="257" y="78" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">② デコード</text><text x="257" y="95" fill="#6b6e76" font-size="9.5" text-anchor="middle">命令を解読</text>' +
          '<line x1="317" y1="78" x2="362" y2="78" stroke="#8a8f98" stroke-width="2"/><polygon points="362,78 353,73 353,83" fill="#8a8f98"/>' +
          '<rect x="364" y="52" width="120" height="52" rx="10" fill="#dcecdd" stroke="#5c9160"/><text x="424" y="78" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">③ 実行</text><text x="424" y="95" fill="#6b6e76" font-size="9.5" text-anchor="middle">演算・書込み</text>' +
          '<path d="M424,104 C424,150 320,152 260,152 C200,152 90,150 90,104" fill="none" stroke="#8a8f98" stroke-width="1.6" stroke-dasharray="5 4"/><polygon points="90,104 85,114 95,114" fill="#8a8f98"/>' +
          '<text x="258" y="138" fill="#6b6e76" font-size="10" text-anchor="middle">PCを+1して次の命令へ（繰り返し）</text>' +
          "</svg>",
        cap: "取り出し→解読→実行を繰り返す。1命令ごとにプログラムカウンタ(PC)が次の命令を指す。",
      },
      {
        h: "アドレッシング（アドレス指定方式）",
        body:
          "<p>オペランドが「実際のデータの場所（<strong>実効アドレス</strong>）」をどう示すかが<strong>アドレス指定方式</strong>です。同じ「100」という値でも、方式によって最終的に読むデータの場所が変わります。下の図で、番地をどうたどるかを見比べましょう。</p>" +
          "<ul>" +
          "<li><strong>即値</strong>：命令中の値そのものがデータ（メモリを見に行かない）。</li>" +
          "<li><strong>直接</strong>：命令中のアドレスが<strong>そのまま</strong>データの場所。</li>" +
          "<li><strong>間接</strong>：命令中のアドレスが指す先に<strong>本当のアドレス</strong>が入っていて、それをたどる。</li>" +
          "<li><strong>指標（インデックス）</strong>：命令中のアドレスに<strong>指標レジスタの値を足す</strong>。配列の連続アクセスに便利。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 580 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="19" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">アドレス指定方式（実効アドレスの求め方）</text>' +
          '<line x1="197" y1="32" x2="197" y2="198" stroke="#e2e4e8" stroke-width="1"/><line x1="390" y1="32" x2="390" y2="198" stroke="#e2e4e8" stroke-width="1"/>' +
          '<text x="98" y="49" fill="#34567a" font-size="12" font-weight="800" text-anchor="middle">直接</text>' +
          '<rect x="24" y="58" width="148" height="32" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="98" y="78" fill="#23252b" font-size="10.5" text-anchor="middle">命令 アドレス部=100</text>' +
          '<line x1="98" y1="90" x2="98" y2="116" stroke="#4a7fa8" stroke-width="1.8"/><polygon points="98,116 93,107 103,107" fill="#4a7fa8"/><text x="132" y="108" fill="#6b6e76" font-size="9">そのまま</text>' +
          '<rect x="24" y="118" width="148" height="42" rx="6" fill="#dce8f3" stroke="#4a7fa8"/><text x="98" y="136" fill="#23252b" font-size="10.5" text-anchor="middle">番地100</text><text x="98" y="151" fill="#2d5470" font-size="10.5" font-weight="700" text-anchor="middle">＝データ</text>' +
          '<text x="293" y="49" fill="#8a6a1e" font-size="12" font-weight="800" text-anchor="middle">間接</text>' +
          '<rect x="219" y="55" width="148" height="30" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="293" y="74" fill="#23252b" font-size="10.5" text-anchor="middle">命令 アドレス部=100</text>' +
          '<line x1="293" y1="85" x2="293" y2="103" stroke="#b28a2e" stroke-width="1.8"/><polygon points="293,103 288,94 298,94" fill="#b28a2e"/>' +
          '<rect x="219" y="105" width="148" height="30" rx="6" fill="#f2e7cd" stroke="#b28a2e"/><text x="293" y="124" fill="#23252b" font-size="10" text-anchor="middle">番地100の中身＝200</text>' +
          '<line x1="293" y1="135" x2="293" y2="153" stroke="#b28a2e" stroke-width="1.8"/><polygon points="293,153 288,144 298,144" fill="#b28a2e"/><text x="322" y="147" fill="#6b6e76" font-size="9">たどる</text>' +
          '<rect x="219" y="155" width="148" height="34" rx="6" fill="#f2e7cd" stroke="#b28a2e"/><text x="293" y="176" fill="#7a5e17" font-size="10.5" font-weight="700" text-anchor="middle">番地200＝データ</text>' +
          '<text x="486" y="49" fill="#3f7a45" font-size="12" font-weight="800" text-anchor="middle">指標（インデックス）</text>' +
          '<rect x="412" y="56" width="148" height="28" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="486" y="74" fill="#23252b" font-size="10.5" text-anchor="middle">アドレス部=100</text>' +
          '<rect x="412" y="88" width="148" height="26" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="486" y="105" fill="#23252b" font-size="10.5" text-anchor="middle">＋ 指標レジスタ=5</text>' +
          '<line x1="486" y1="114" x2="486" y2="134" stroke="#5c9160" stroke-width="1.8"/><polygon points="486,134 481,125 491,125" fill="#5c9160"/><text x="514" y="128" fill="#6b6e76" font-size="9">足す</text>' +
          '<rect x="412" y="136" width="148" height="42" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="486" y="154" fill="#23252b" font-size="10.5" text-anchor="middle">番地105</text><text x="486" y="169" fill="#3f7a45" font-size="10.5" font-weight="700" text-anchor="middle">＝データ</text>' +
          "</svg>",
        cap: "直接＝番地がそのままデータ。間接＝番地の中身が指す先をたどる。指標＝番地＋指標レジスタ値。",
      },
      {
        h: "割込み",
        body:
          "<p>実行中の処理を中断して別処理へ移るのが<strong>割込み</strong>。原因で2種類に分けます。</p>" +
          "<ul>" +
          "<li><strong>内部割込み</strong>：実行中のプログラムが原因（0除算・オーバーフロー・ページフォルトなど）。</li>" +
          "<li><strong>外部割込み</strong>：プログラム外が原因（入出力完了・タイマ・電源異常など）。</li>" +
          "</ul>",
      },
    ],
    memorize: [
      { k: "命令実行サイクル", v: "フェッチ→デコード→実行。PCが次命令アドレスを保持。" },
      { k: "プログラムカウンタ", v: "次に実行する命令のアドレスを保持するレジスタ。" },
      { k: "直接 / 間接アドレス", v: "直接=アドレスが場所。間接=アドレスの指す先に本当のアドレス。" },
      { k: "指標アドレス指定", v: "アドレス＋指標レジスタ値。配列の連続アクセスに便利。" },
      { k: "内部割込み", v: "実行中プログラムが原因（0除算・オーバーフロー・ページフォルト）。" },
      { k: "外部割込み", v: "プログラム外が原因（入出力完了・タイマ・電源異常）。" },
    ],
    flashcards: [
      { q: "命令の実行サイクルの3段階は？", a: "フェッチ（取り出し）→デコード（解読）→実行。" },
      { q: "プログラムカウンタ(PC)の役割は？", a: "次に実行する命令のアドレスを保持する。" },
      { q: "間接アドレス指定とは？", a: "命令中のアドレスが指す場所に本当のアドレスが入っており、それをたどってデータにアクセスする方式。" },
      { q: "0除算やオーバーフローで起こる割込みは内部・外部どちら？", a: "内部割込み（実行中のプログラムが原因）。" },
      { q: "入出力の完了やタイマで起こる割込みは？", a: "外部割込み。" },
    ],
    quiz: [
      {
        q: "CPU内で、次に実行すべき命令が格納されているアドレスを保持するレジスタはどれか。",
        choices: ["命令レジスタ", "プログラムカウンタ", "アキュムレータ", "指標レジスタ"],
        answer: 1,
        explain: "次命令のアドレスを保持するのは<strong>プログラムカウンタ(PC)</strong>。取り出した命令自体は命令レジスタ。",
      },
      {
        q: "命令のアドレス部に指定された値が指す記憶場所に、実際のデータのアドレスが格納されているアドレス指定方式はどれか。",
        choices: ["即値アドレス指定", "直接アドレス指定", "間接アドレス指定", "指標アドレス指定"],
        answer: 2,
        explain: "アドレスの指す先に本当のアドレスがあるのは<strong>間接アドレス指定</strong>。",
      },
      {
        q: "内部割込みの原因として適切なものはどれか。",
        choices: ["入出力動作の完了", "一定時間の経過（タイマ）", "ゼロによる除算", "電源電圧の異常"],
        answer: 2,
        explain: "実行中のプログラムが原因の<strong>ゼロ除算</strong>は内部割込み。入出力完了・タイマ・電源異常は外部割込み。",
      },
    ],
  },
  {
    id: "fe-storage", domain: "コンピュータ構成", icon: "💾", title: "記憶装置と入出力",
    intro: "半導体メモリ(DRAM/SRAM)、補助記憶(SSD/HDD)、入出力方式(DMA)、インタフェース。",
    understand: [
      {
        h: "記憶装置は「速い＆高い」と「遅い＆安い」の階層",
        body:
          "<p>記憶装置は1種類ではなく、<strong>速いが高価で少量</strong>のものから<strong>遅いが安価で大量</strong>のものまで階層になっています。速いものだけで全部そろえると高すぎるので、役割分担しているのです。</p>" +
          "<p>速い順に <strong>レジスタ → キャッシュメモリ → 主記憶(メモリ) → 補助記憶(SSD/HDD)</strong>。上に行くほど速く高価で少量、下に行くほど遅く安価で大容量です。よく使うデータを上位に置いておくことで、全体を速く動かします。</p>",
        diagram:
          '<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="260" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">記憶階層（上ほど速い・下ほど大容量）</text>' +
          (function () {
            var L = [
              { n: "レジスタ", d: "CPU内・最速", w: 120, c: "#f3ddcd", st: "#c1855c" },
              { n: "キャッシュメモリ(SRAM)", d: "CPUと主記憶の橋渡し", w: 200, c: "#f2e7cd", st: "#b28a2e" },
              { n: "主記憶（DRAM）", d: "プログラム実行の作業場", w: 300, c: "#dce8f3", st: "#4a7fa8" },
              { n: "補助記憶（SSD / HDD）", d: "大容量・電源を切っても残る", w: 400, c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", y0 = 40, h = 36, gap = 6;
            L.forEach(function (x, i) {
              var y = y0 + i * (h + gap), cx = 260;
              s += '<rect x="' + (cx - x.w / 2) + '" y="' + y + '" width="' + x.w + '" height="' + h + '" rx="6" fill="' + x.c + '" stroke="' + x.st + '"/>';
              s += '<text x="' + cx + '" y="' + (y + 16) + '" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">' + x.n + "</text>";
              s += '<text x="' + cx + '" y="' + (y + 30) + '" fill="#6b6e76" font-size="9" text-anchor="middle">' + x.d + "</text>";
            });
            s += '<text x="40" y="60" fill="#a85733" font-size="11" font-weight="700">速い↑</text>';
            s += '<text x="40" y="205" fill="#4a7a4e" font-size="11" font-weight="700">大容量↓</text>';
            return s;
          })() +
          "</svg>",
        cap: "上ほど速い・高価・少量、下ほど遅い・安価・大容量。役割分担で全体を速くする。",
      },
      {
        h: "半導体メモリ（RAMとROM）",
        body:
          "<p>半導体メモリは大きく<strong>RAM</strong>と<strong>ROM</strong>に分かれます。下の図の分類を、上から枝分かれでたどって押さえましょう。</p>" +
          "<p><strong>RAM</strong>は電源を切ると内容が<strong>消える（揮発性）</strong>メモリ。2種類あり、安価・大容量で<strong>主記憶</strong>に使う<strong>DRAM</strong>（コンデンサに電荷を貯める方式のため放っておくと消える→定期的な<strong>リフレッシュ</strong>が必要）と、高速で<strong>キャッシュメモリ</strong>に使う<strong>SRAM</strong>（フリップフロップ回路で保持し、リフレッシュ不要）です。</p>" +
          "<p><strong>ROM</strong>は電源を切っても<strong>消えない（不揮発性）</strong>メモリ。製造時に内容を焼き込む<strong>読み出し専用のマスクROM</strong>と、あとから<strong>書き込めるPROM</strong>があります。PROMには、<strong>紫外線</strong>を当てて消去する<strong>EPROM</strong>、<strong>電圧</strong>をかけて消去する<strong>EEPROM</strong>があり、EEPROMを高速・大容量にした<strong>フラッシュメモリ</strong>がSSD・USBメモリ・SDカードに使われています。</p>",
        diagram:
          '<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="300" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">半導体メモリの分類</text>' +
          (function () {
            var N = {
              root: { x: 12, y: 125, w: 92, h: 38, label: "半導体メモリ", fill: "#dce8f3", st: "#4a7fa8", fs: 11.5 },
              ram: { x: 126, y: 62, w: 84, h: 38, label: "RAM", sub: "揮発性", fill: "#dcecdd", st: "#5c9160", fs: 13 },
              rom: { x: 126, y: 189, w: 84, h: 38, label: "ROM", sub: "不揮発性", fill: "#f3ddcd", st: "#c1855c", fs: 13 },
              dram: { x: 232, y: 36, w: 100, h: 38, label: "DRAM", fill: "#e7f0e8", st: "#5c9160", fs: 12.5, desc: "主記憶・コンデンサに電荷" },
              sram: { x: 232, y: 88, w: 100, h: 38, label: "SRAM", fill: "#e7f0e8", st: "#5c9160", fs: 12.5, desc: "キャッシュ・フリップフロップ回路" },
              mask: { x: 232, y: 150, w: 100, h: 38, label: "マスクROM", fill: "#f3ddcd", st: "#c1855c", fs: 11.5, desc: "読み出しのみ" },
              prom: { x: 232, y: 228, w: 100, h: 38, label: "PROM", sub: "書き込み可能", fill: "#dce8f3", st: "#4a7fa8", fs: 12.5 },
              eprom: { x: 380, y: 202, w: 100, h: 38, label: "EPROM", fill: "#dce8f3", st: "#4a7fa8", fs: 12.5, desc: "紫外線で消去可能" },
              eeprom: { x: 380, y: 254, w: 100, h: 38, label: "EEPROM", fill: "#dce8f3", st: "#4a7fa8", fs: 12, desc: "電圧かけて消去可能" },
              flash: { x: 410, y: 308, w: 150, h: 38, label: "フラッシュメモリ", fill: "#dce8f3", st: "#4a7fa8", fs: 12 },
            };
            function edge(p, c, midx) {
              var px = p.x + p.w, py = p.y + p.h / 2, cx = c.x, cy = c.y + c.h / 2;
              return '<path d="M' + px + "," + py + " H" + midx + " V" + cy + " H" + cx + '" fill="none" stroke="#6f9bd1" stroke-width="1.6"/>';
            }
            function node(n) {
              var s = '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="7" fill="' + n.fill + '" stroke="' + n.st + '" stroke-width="1.5"/>';
              s += '<text x="' + (n.x + n.w / 2) + '" y="' + (n.y + n.h / 2 + 5) + '" fill="#23252b" font-size="' + n.fs + '" font-weight="800" text-anchor="middle">' + n.label + "</text>";
              if (n.sub) s += '<text x="' + (n.x + n.w / 2) + '" y="' + (n.y + n.h + 13) + '" fill="#6b6e76" font-size="10" text-anchor="middle">' + n.sub + "</text>";
              if (n.desc) s += '<text x="' + (n.x + n.w + 8) + '" y="' + (n.y + n.h / 2 + 4) + '" fill="#5a5346" font-size="9.5" text-anchor="start">' + n.desc + "</text>";
              return s;
            }
            var s = "";
            s += edge(N.root, N.ram, 115) + edge(N.root, N.rom, 115);
            s += edge(N.ram, N.dram, 221) + edge(N.ram, N.sram, 221);
            s += edge(N.rom, N.mask, 221) + edge(N.rom, N.prom, 221);
            s += edge(N.prom, N.eprom, 356) + edge(N.prom, N.eeprom, 356);
            s += '<path d="M430,292 V308" fill="none" stroke="#6f9bd1" stroke-width="1.6"/>';
            ["root", "ram", "rom", "dram", "sram", "mask", "prom", "eprom", "eeprom", "flash"].forEach(function (k) { s += node(N[k]); });
            return s;
          })() +
          "</svg>",
        cap: "半導体メモリ＝RAM(揮発性: DRAM/SRAM)＋ROM(不揮発性: マスクROM/PROM)。PROMはEPROM・EEPROMがあり、EEPROMの発展形がフラッシュメモリ。",
      },
      {
        h: "補助記憶と入出力方式（DMA）",
        body:
          "<p>大容量の<strong>補助記憶</strong>には、円盤を機械的に回してデータを読み書きする<strong>HDD</strong>と、フラッシュメモリを使った<strong>SSD</strong>があります。SSDは回転部がないため<strong>高速・耐衝撃・静音・低消費電力</strong>です。</p>" +
          "<p>入出力で重要なのが<strong>DMA</strong>。通常はCPUがデータ転送を仲介しますが、DMAでは<strong>CPUを介さず、メモリと入出力装置が直接データをやり取り</strong>します。これによりCPUは他の処理に専念でき、全体が速くなります。周辺機器の接続規格が<strong>インタフェース</strong>（USB・HDMI・Bluetooth など）です。</p>",
      },
    ],
    memorize: [
      { k: "DRAM / SRAM", v: "DRAM=主記憶・安価・要リフレッシュ(コンデンサ)。SRAM=高速・キャッシュ用(フリップフロップ)。" },
      { k: "RAM / ROM", v: "RAM=揮発性(消える)、ROM=不揮発性(消えない)。" },
      { k: "マスクROM / PROM", v: "マスクROM=製造時に焼込み読み出し専用。PROM=後から書き込める。" },
      { k: "EPROM / EEPROM", v: "EPROM=紫外線で消去。EEPROM=電圧で消去。フラッシュメモリはEEPROMの発展形。" },
      { k: "フラッシュメモリ", v: "不揮発で電気的に書換え可。SSD・USBメモリ・SDカードに使う。" },
      { k: "SSD vs HDD", v: "SSD=フラッシュ・高速・耐衝撃。HDD=円盤回転・安価大容量。" },
      { k: "DMA", v: "CPUを介さずメモリと装置が直接転送。CPU負担を軽減。" },
      { k: "インタフェース", v: "USB(汎用)、HDMI(映像音声)、Bluetooth(近距離無線)。" },
    ],
    flashcards: [
      { q: "DRAMとSRAMの用途の違いは？", a: "DRAMは安価で大容量、主記憶に使う（要リフレッシュ）。SRAMは高速でキャッシュメモリに使う。" },
      { q: "DMAとは何を高速化する仕組みか？", a: "CPUを介さずにメモリと入出力装置が直接データ転送を行い、CPUの負担を減らして入出力を高速化する。" },
      { q: "SSDがHDDより優れる点は？", a: "高速・耐衝撃・静音・低消費電力（機械的な回転部がない）。" },
      { q: "RAMとROMの揮発性の違いは？", a: "RAMは揮発性（電源で消える）、ROMは不揮発性（消えない）。" },
      { q: "EPROMとEEPROMの消去方法の違いは？", a: "EPROMは紫外線を当てて消去、EEPROMは電圧をかけて電気的に消去する。フラッシュメモリはEEPROMの発展形。" },
    ],
    quiz: [
      {
        q: "主記憶装置に用いられ、安価で大容量だが記憶内容の保持に定期的なリフレッシュが必要な半導体メモリはどれか。",
        choices: ["SRAM", "DRAM", "ROM", "フラッシュメモリ"],
        answer: 1,
        explain: "主記憶用で要リフレッシュは<strong>DRAM</strong>。高速でキャッシュに使うのがSRAM。",
      },
      {
        q: "CPUを介さずに、主記憶と入出力装置との間で直接データ転送を行い、CPUの負荷を軽減する方式はどれか。",
        choices: ["ポーリング", "DMA", "割込み", "スプーリング"],
        answer: 1,
        explain: "CPUを介さず直接転送するのは<strong>DMA（Direct Memory Access）</strong>。",
      },
      {
        q: "フラッシュメモリを利用した補助記憶装置で、HDDに比べ高速かつ耐衝撃性に優れるものはどれか。",
        choices: ["SSD", "磁気テープ", "光ディスク", "DRAM"],
        answer: 0,
        explain: "フラッシュメモリの補助記憶は<strong>SSD</strong>。",
      },
      {
        q: "ROMのうち、電気的にデータを消去・再書込みできるものはどれか。",
        choices: ["マスクROM", "EPROM", "EEPROM", "DRAM"],
        answer: 2,
        explain: "電圧をかけて電気的に消去・再書込みできるのは<strong>EEPROM</strong>。EPROMは紫外線で消去、マスクROMは読み出し専用。フラッシュメモリはEEPROMの発展形。",
      },
    ],
  }
);
