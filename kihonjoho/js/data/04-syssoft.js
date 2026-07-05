/* =============================================================
   コレダケ基本情報 カリキュラム — 04 システム構成とOS
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-sysconf", domain: "システム", icon: "🔗", title: "システム構成と稼働率",
    intro: "冗長化・仮想化・RAIDと、稼働率（直列・並列）の計算。FEで毎回のように問われる。",
    understand: [
      {
        h: "システムの構成と信頼性指標",
        body:
          "<p>処理を頼む<strong>クライアント</strong>と応える<strong>サーバ</strong>に分けるのが<strong>クライアントサーバ</strong>。1台の物理機で複数の仮想マシンを動かす<strong>仮想化</strong>、複数台を1台に見せる<strong>クラスタ</strong>、ディスクを冗長化する<strong>RAID</strong>（RAID1＝ミラーリング、RAID5＝パリティ分散）などがあります。</p>" +
          "<p>信頼性は<strong>RASIS</strong>で表し、故障間隔が<strong>MTBF</strong>、修理時間が<strong>MTTR</strong>。<strong>稼働率＝MTBF÷(MTBF+MTTR)</strong>です。</p>" +
          "<p>MTBFとMTTRは、いきなり分かる値ではなく、<strong>実際に稼働させた記録から計算</strong>して求めます。下の図のように、装置は<strong>「動いている時間」と「故障して直している時間」</strong>を繰り返します。</p>" +
          "<ul>" +
          "<li><strong>MTBF（平均故障間隔）</strong> ＝ <strong>稼働時間の合計 ÷ 故障回数</strong>。「平均して何時間動くと1回壊れるか」。長いほど壊れにくく良い。</li>" +
          "<li><strong>MTTR（平均修理時間）</strong> ＝ <strong>修理時間の合計 ÷ 故障回数</strong>。「1回壊れたら平均何時間で直るか」。短いほど良い。</li>" +
          "</ul>" +
          "<p>稼働率は「動いている時間の割合」なので、<strong>稼働率＝MTBF÷(MTBF＋MTTR)</strong>（＝稼働時間÷全体時間）となります。</p>",
        diagram:
          '<svg viewBox="0 0 580 175" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">MTBF・MTTRの求め方（稼働と故障の記録から）</text>' +
          '<rect x="20" y="42" width="130" height="34" fill="#dcecdd" stroke="#5c9160"/><text x="85" y="64" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">稼働 100h</text>' +
          '<rect x="150" y="42" width="30" height="34" fill="#f7dfd6" stroke="#c26b4a"/><text x="165" y="64" fill="#8a4626" font-size="9.5" text-anchor="middle">修理</text>' +
          '<rect x="180" y="42" width="180" height="34" fill="#dcecdd" stroke="#5c9160"/><text x="270" y="64" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">稼働 180h</text>' +
          '<rect x="360" y="42" width="20" height="34" fill="#f7dfd6" stroke="#c26b4a"/><text x="370" y="64" fill="#8a4626" font-size="9" text-anchor="middle">修理</text>' +
          '<rect x="380" y="42" width="160" height="34" fill="#dcecdd" stroke="#5c9160"/><text x="460" y="64" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">稼働 100h</text>' +
          '<text x="165" y="92" fill="#c26b4a" font-size="9" text-anchor="middle">故障1（10h）</text>' +
          '<text x="370" y="92" fill="#c26b4a" font-size="9" text-anchor="middle">故障2（20h）</text>' +
          '<line x1="20" y1="110" x2="540" y2="110" stroke="#c9ccd1" stroke-width="1" stroke-dasharray="3 3"/>' +
          '<text x="290" y="130" fill="#3f7a45" font-size="11.5" font-weight="700" text-anchor="middle">MTBF ＝ 稼働合計(100+180+100=380h) ÷ 故障回数(2回) ＝ 190h</text>' +
          '<text x="290" y="150" fill="#b0532f" font-size="11.5" font-weight="700" text-anchor="middle">MTTR ＝ 修理合計(10+20=30h) ÷ 故障回数(2回) ＝ 15h</text>' +
          '<text x="290" y="168" fill="#6b6e76" font-size="10" text-anchor="middle">稼働率 ＝ 190 ÷ (190+15) ≒ 0.927</text>' +
          "</svg>",
        cap: "稼働時間の合計÷故障回数＝MTBF、修理時間の合計÷故障回数＝MTTR。実際の記録から求める値。",
      },
      {
        h: "稼働率の計算（直列・並列）",
        body:
          "<p>装置を組み合わせると全体の稼働率が変わります。</p>" +
          "<ul>" +
          "<li><strong>直列</strong>（両方必要）：稼働率の<strong>掛け算</strong>。下がる。</li>" +
          "<li><strong>並列</strong>（どちらか動けばよい＝冗長）：<strong>1−(1−a)(1−b)</strong>。上がる。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="140" y="24" fill="#c47f2f" font-size="13" font-weight="800" text-anchor="middle">直列（両方必要）</text>' +
          '<rect x="60" y="44" width="70" height="42" rx="7" fill="#f3ddcd" stroke="#c1855c"/><text x="95" y="70" fill="#23252b" font-size="14" text-anchor="middle">0.9</text>' +
          '<line x1="130" y1="65" x2="170" y2="65" stroke="#8a8577" stroke-width="2"/>' +
          '<rect x="170" y="44" width="70" height="42" rx="7" fill="#f3ddcd" stroke="#c1855c"/><text x="205" y="70" fill="#23252b" font-size="14" text-anchor="middle">0.9</text>' +
          '<text x="150" y="112" fill="#c47f2f" font-size="13" font-weight="800" text-anchor="middle">0.9×0.9 = 0.81（下がる）</text>' +
          '<text x="430" y="24" fill="#5c9160" font-size="13" font-weight="800" text-anchor="middle">並列＝冗長（片方でOK）</text>' +
          '<rect x="395" y="38" width="70" height="38" rx="7" fill="#dcecdd" stroke="#5c9160"/><text x="430" y="62" fill="#23252b" font-size="14" text-anchor="middle">0.9</text>' +
          '<rect x="395" y="90" width="70" height="38" rx="7" fill="#dcecdd" stroke="#5c9160"/><text x="430" y="114" fill="#23252b" font-size="14" text-anchor="middle">0.9</text>' +
          '<text x="430" y="150" fill="#5c9160" font-size="13" font-weight="800" text-anchor="middle">1−0.1×0.1 = 0.99（上がる）</text>' +
          "</svg>",
        cap: "直列は掛け算で下がる。並列（冗長化）は 1−(1−a)(1−b) で上がる。",
      },
    ],
    memorize: [
      { k: "稼働率", v: "<strong>MTBF÷(MTBF+MTTR)</strong>。1に近いほど良い。" },
      { k: "直列の稼働率", v: "掛け算（例 0.9×0.9=0.81）。下がる。" },
      { k: "並列の稼働率", v: "<strong>1−(1−a)(1−b)</strong>。冗長化で上がる。" },
      { k: "RAID", v: "RAID0=ストライピング(高速)、RAID1=ミラーリング(冗長)、RAID5=パリティ分散。" },
      { k: "MTBF / MTTR", v: "MTBF=平均故障間隔(長いほど良い)、MTTR=平均修理時間(短いほど良い)。" },
      { k: "仮想化", v: "1台の物理機で複数の仮想マシンを動かし資源を有効活用。" },
    ],
    flashcards: [
      { q: "稼働率0.8を2台直列にすると全体の稼働率は？", a: "0.8×0.8＝0.64（直列は掛け算で下がる）。" },
      { q: "稼働率0.9を2台並列（冗長）にすると全体は？", a: "1−(1−0.9)(1−0.9)＝0.99。" },
      { q: "RAID1とRAID5の違いは？", a: "RAID1はミラーリング（同じ内容を2台）。RAID5はパリティを分散して冗長化。" },
      { q: "稼働率の式は？", a: "MTBF ÷ (MTBF + MTTR)。" },
    ],
    quiz: [
      {
        q: "稼働率0.9の装置3台を直列に接続したシステム全体の稼働率はおよそいくらか。",
        choices: ["0.73", "0.81", "0.90", "0.99"],
        answer: 0,
        explain: "直列は掛け算。0.9×0.9×0.9＝<strong>0.729≒0.73</strong>。",
      },
      {
        q: "MTBFが480時間、MTTRが20時間の装置の稼働率はいくらか。",
        choices: ["0.90", "0.96", "0.98", "0.99"],
        answer: 1,
        explain: "480÷(480+20)＝480÷500＝<strong>0.96</strong>。",
      },
      {
        q: "2台のディスクに同じ内容を書き込み、片方が故障してもデータを保持するRAIDはどれか。",
        choices: ["RAID0", "RAID1", "RAID5", "RAID6"],
        answer: 1,
        explain: "同じ内容を2台に書くミラーリングは<strong>RAID1</strong>。RAID0は分散で高速だが冗長性なし。",
      },
    ],
  },
  {
    id: "fe-os", domain: "システム", icon: "🪟", title: "OSとタスク管理",
    intro: "OSの役割、タスクのスケジューリング、仮想記憶とページング、割込み。",
    understand: [
      {
        h: "OSの役割とタスクのスケジューリング",
        body:
          "<p><strong>OS</strong>はハードとアプリを仲介し、コンピュータ全体を管理する基本ソフトです。中でも重要なのが、CPUは基本1つしかないのに<strong>複数の処理（タスク）をうまく順番に進める</strong>こと。この割り当ての段取りを<strong>スケジューリング</strong>といいます。</p>" +
          "<p>代表的な方式を押さえましょう。</p>" +
          "<ul>" +
          "<li><strong>FCFS（到着順）</strong>：来た順に処理する。単純だが、長い処理が先だと後ろが待たされる。</li>" +
          "<li><strong>SPT（処理時間順）</strong>：短い処理を優先。全体の平均待ち時間が短くなる。</li>" +
          "<li><strong>ラウンドロビン</strong>：一定時間（タイムスライス）ずつ順番に回す。対話処理で公平。</li>" +
          "<li><strong>優先度順</strong>：優先度の高いタスクを先に処理する。</li>" +
          "</ul>",
      },
      {
        h: "仮想記憶——メモリを「大きく見せる」仕組み",
        body:
          "<p>プログラムを動かすには主記憶（メモリ）が要りますが、大きなプログラムを同時に動かすと足りなくなります。そこで<strong>補助記憶（SSD/HDD）を主記憶の延長として使い、実際より大きなメモリがあるように見せる</strong>のが<strong>仮想記憶</strong>です。</p>" +
          "<p>代表方式が<strong>ページング</strong>。プログラムを固定長の<strong>ページ</strong>に分け、今使うページだけを主記憶に置き、使わないページは補助記憶へ退避します。必要なページが主記憶に<strong>ない</strong>と<strong>ページフォルト</strong>が起き、補助記憶から読み込みます（このとき、どのページを追い出すかを<strong>LRU＝最も長く使われていないものを追い出す</strong>などで決める）。</p>" +
          "<p>退避と読み込みが<strong>多発しすぎて、処理がほとんど進まなくなる</strong>状態が<strong>スラッシング</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 580 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">ページング（今使うページだけ主記憶に置く）</text>' +
          '<rect x="30" y="40" width="180" height="150" rx="10" fill="#dce8f3" stroke="#4a7fa8"/><text x="120" y="60" fill="#34567a" font-size="12" font-weight="800" text-anchor="middle">主記憶（狭い）</text>' +
          (function () {
            var s = "";
            ["ページA", "ページC", "（空き）"].forEach(function (p, i) {
              var y = 72 + i * 36;
              s += '<rect x="48" y="' + y + '" width="144" height="28" rx="5" fill="' + (i < 2 ? "#eef4f9" : "#f6f2e9") + '" stroke="' + (i < 2 ? "#9db8cd" : "#cbc2ae") + '"/>';
              s += '<text x="120" y="' + (y + 19) + '" fill="#23252b" font-size="11" text-anchor="middle">' + p + "</text>";
            });
            return s;
          })() +
          '<rect x="370" y="40" width="180" height="150" rx="10" fill="#efe9dc" stroke="#cbc2ae"/><text x="460" y="60" fill="#5a5346" font-size="12" font-weight="800" text-anchor="middle">補助記憶（広い）</text>' +
          (function () {
            var s = "";
            ["ページB", "ページD", "ページE"].forEach(function (p, i) {
              var y = 72 + i * 36;
              s += '<rect x="388" y="' + y + '" width="144" height="28" rx="5" fill="#f6f2e9" stroke="#cbc2ae"/>';
              s += '<text x="460" y="' + (y + 19) + '" fill="#23252b" font-size="11" text-anchor="middle">' + p + "</text>";
            });
            return s;
          })() +
          '<line x1="212" y1="115" x2="368" y2="115" stroke="#a85733" stroke-width="2"/><polygon points="368,115 358,110 358,120" fill="#a85733"/><polygon points="212,115 222,110 222,120" fill="#a85733"/>' +
          '<text x="290" y="108" fill="#a85733" font-size="10" font-weight="700" text-anchor="middle">必要に応じ</text><text x="290" y="128" fill="#a85733" font-size="10" font-weight="700" text-anchor="middle">入れ替え</text>' +
          "</svg>",
        cap: "今使うページだけ主記憶に置き、残りは補助記憶へ。入れ替えが多発するとスラッシング。",
      },
    ],
    memorize: [
      { k: "スケジューリング", v: "FCFS(到着順)/SPT(短い順)/ラウンドロビン(一定時間ずつ)/優先度順。" },
      { k: "仮想記憶", v: "補助記憶を使い主記憶より大きく見せる。ページング方式が代表。" },
      { k: "ページフォルト", v: "必要なページが主記憶になく、補助記憶から読み込む割込み。" },
      { k: "スラッシング", v: "ページの入れ替えが多発し性能が極端に低下する現象。" },
      { k: "LRU", v: "最も長く参照されていないページを追い出す置換方式。" },
      { k: "割込み", v: "実行中の処理を中断し別処理へ。入出力完了・タイマ・例外など。" },
    ],
    flashcards: [
      { q: "ラウンドロビン方式とは？", a: "各タスクに一定のCPU時間（タイムスライス）を順番に割り当てる方式。" },
      { q: "スラッシングとは？", a: "ページの入れ替え（ページイン/アウト）が多発し、処理がほとんど進まなくなる性能低下現象。" },
      { q: "ページング方式のLRUは何を追い出す？", a: "最も長い間参照されていないページ。" },
      { q: "仮想記憶で必要なページが主記憶にないときに発生するものは？", a: "ページフォルト（補助記憶から読み込む）。" },
    ],
    quiz: [
      {
        q: "OSのタスクスケジューリングで、各タスクに一定時間ずつ順番にCPUを割り当てる方式はどれか。",
        choices: ["FCFS（到着順）", "SPT（処理時間順）", "ラウンドロビン", "優先度順"],
        answer: 2,
        explain: "一定時間ずつ順番に割り当てるのは<strong>ラウンドロビン</strong>。",
      },
      {
        q: "仮想記憶方式で、主記憶と補助記憶の間でページの入れ替えが頻発し、システムの処理能力が著しく低下する現象はどれか。",
        choices: ["フラグメンテーション", "スラッシング", "デッドロック", "ページフォルト"],
        answer: 1,
        explain: "ページ入れ替えの多発で性能が落ちるのは<strong>スラッシング</strong>。",
      },
      {
        q: "ページング方式のページ置換アルゴリズムで、最も長い間参照されていないページを置き換え対象とするものはどれか。",
        choices: ["FIFO", "LRU", "LFU", "ランダム"],
        answer: 1,
        explain: "最も長く参照されていないページを追い出すのは<strong>LRU</strong>（Least Recently Used）。",
      },
    ],
  }
);
