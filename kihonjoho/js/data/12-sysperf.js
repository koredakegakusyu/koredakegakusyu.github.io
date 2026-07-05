/* =============================================================
   コレダケ基本情報 カリキュラム — 12 システム構成・性能・信頼性設計
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-sysstruct", domain: "システム", icon: "🏗️", title: "システム構成と信頼性設計",
    intro: "デュアル/デュプレックス、クラスタ、そして信頼性設計（フェールセーフ等）。FE頻出。",
    understand: [
      {
        h: "処理形態とシステム構成",
        body:
          "<p>同じ処理を2系統で行い結果を照合する<strong>デュアルシステム</strong>（高信頼）、主系と待機系を持つ<strong>デュプレックスシステム</strong>（待機系に切替）、複数台を1台に見せる<strong>クラスタ</strong>があります。</p>" +
          "<p>待機系の持ち方：常に電源を入れておく<strong>ホットスタンバイ</strong>（切替が速い）、必要時に起動する<strong>コールドスタンバイ</strong>（安いが遅い）。障害時に待機系へ切り替えるのが<strong>フェールオーバー</strong>です。</p>" +
          "<p>処理方式は、即時応答の<strong>リアルタイム処理</strong>と、まとめて後で処理する<strong>バッチ処理</strong>があります。</p>",
      },
      {
        h: "信頼性設計の考え方（頻出）",
        body:
          "<p>故障やミスにどう備えるかの設計思想。名前と例をセットで覚えます。</p>" +
          "<ul>" +
          "<li><strong>フェールセーフ</strong>：故障時に<strong>安全な側</strong>へ（信号機が赤で停止）。</li>" +
          "<li><strong>フェールソフト</strong>：故障時も<strong>機能を落として稼働継続</strong>（縮退運転）。</li>" +
          "<li><strong>フォールトトレラント</strong>：故障しても<strong>正常動作を続ける</strong>（冗長化）。</li>" +
          "<li><strong>フォールトアボイダンス</strong>：そもそも<strong>故障しにくく</strong>する（高品質化）。</li>" +
          "<li><strong>フールプルーフ</strong>：<strong>誤操作しても危険・故障に至らない</strong>（扉を開けると止まる電子レンジ）。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="300" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">故障・誤操作への備え方</text>' +
          (function () {
            var items = [
              { t: "フェールセーフ", d: "安全側で停止", c: "#dcecdd", st: "#5c9160", tc: "#366b3c" },
              { t: "フェールソフト", d: "機能を落とし継続", c: "#dce8f3", st: "#4a7fa8", tc: "#2d5470" },
              { t: "フォールトトレラント", d: "冗長化で正常継続", c: "#f2e7cd", st: "#b28a2e", tc: "#7a5e17" },
              { t: "フールプルーフ", d: "誤操作に強い", c: "#f3ddcd", st: "#c1855c", tc: "#8a4626" },
            ];
            var s = "", x0 = 30, w = 132, gap = 14, y = 46;
            items.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="80" rx="9" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 32) + '" fill="' + p.tc + '" font-size="12" font-weight="800" text-anchor="middle">' + p.t + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 56) + '" fill="#5a5346" font-size="11" text-anchor="middle">' + p.d + "</text>";
            });
            return s;
          })() +
          '<text x="300" y="152" fill="#6b6e76" font-size="11" text-anchor="middle">「安全に止める」か「動かし続ける」か「ミスに強くする」かで区別</text>' +
          "</svg>",
        cap: "フェールセーフ＝安全に止める、フェールソフト＝落として続ける、フールプルーフ＝誤操作対策。",
      },
    ],
    memorize: [
      { k: "デュアルシステム", v: "2系統で同じ処理をし結果を照合。高信頼。" },
      { k: "デュプレックスシステム", v: "主系＋待機系。障害時に待機系へ切替。" },
      { k: "ホット/コールドスタンバイ", v: "ホット=常時稼働で切替速い、コールド=必要時起動で安いが遅い。" },
      { k: "フェールセーフ", v: "故障時に安全な側へ倒す（信号機は赤で停止）。" },
      { k: "フェールソフト", v: "故障時も機能を落として稼働継続（縮退運転）。" },
      { k: "フォールトトレラント", v: "故障しても正常動作を続ける（冗長化）。" },
      { k: "フールプルーフ", v: "誤操作しても危険・故障に至らない設計。" },
    ],
    flashcards: [
      { q: "デュアルシステムとデュプレックスシステムの違いは？", a: "デュアルは2系統で同じ処理をし結果を照合、デュプレックスは主系と待機系を持ち障害時に切り替える。" },
      { q: "フェールセーフとフールプルーフの違いは？", a: "フェールセーフは故障時に安全側へ、フールプルーフは利用者の誤操作でも危険・故障に至らないようにする。" },
      { q: "故障しても機能を縮小して稼働を続ける設計は？", a: "フェールソフト（縮退運転）。" },
      { q: "ホットスタンバイの利点は？", a: "待機系を常に稼働させておくため、障害時の切替が速い。" },
    ],
    quiz: [
      {
        q: "システムに故障が生じたときに、常に安全な状態になるように制御する設計思想はどれか。",
        choices: ["フェールセーフ", "フールプルーフ", "フォールトトレラント", "フォールトアボイダンス"],
        answer: 0,
        explain: "故障時に安全側へ倒すのは<strong>フェールセーフ</strong>。",
      },
      {
        q: "利用者が誤った操作をしても、システムに異常や危険が生じないようにあらかじめ設計しておく考え方はどれか。",
        choices: ["フェールソフト", "フールプルーフ", "フォールトトレラント", "フェールセーフ"],
        answer: 1,
        explain: "誤操作に備えるのは<strong>フールプルーフ</strong>。",
      },
      {
        q: "2つの系統で全く同じ処理を並行して行い、結果を照合することで高い信頼性を得るシステム構成はどれか。",
        choices: ["デュプレックスシステム", "デュアルシステム", "ホットスタンバイ", "クラスタ"],
        answer: 1,
        explain: "2系統で同処理・結果照合は<strong>デュアルシステム</strong>。主系と待機系はデュプレックス。",
      },
    ],
  },
  {
    id: "fe-perf", domain: "システム", icon: "📈", title: "性能評価と待ち行列",
    intro: "スループット・レスポンスタイム、ベンチマーク、待ち行列(M/M/1)の考え方。",
    understand: [
      {
        h: "性能指標とベンチマーク",
        body:
          "<p>システムの速さは、見る角度で3つの指標に分かれます。混同しやすいので言葉の意味で区別します。</p>" +
          "<ul>" +
          "<li><strong>スループット</strong>：<strong>単位時間あたりの処理量</strong>。まとめてどれだけさばけるか（＝全体の効率）。</li>" +
          "<li><strong>レスポンスタイム</strong>：要求してから<strong>応答が返り始めるまで</strong>の時間（＝反応の速さ）。</li>" +
          "<li><strong>ターンアラウンドタイム</strong>：要求してから<strong>処理が完了して結果がすべて返るまで</strong>の総時間。</li>" +
          "</ul>" +
          "<p>性能を客観的に比べるには、<strong>共通の基準プログラムを実行して測る</strong><strong>ベンチマーク</strong>を使います。CPUの処理速度を表す<strong>MIPS</strong>（1秒あたり百万命令）、科学計算向けの<strong>FLOPS</strong>（1秒あたりの浮動小数点演算数）も指標です。性能が頭打ちになっている箇所（<strong>ボトルネック</strong>）を見つけて改善（チューニング）します。</p>",
      },
      {
        h: "待ち行列の考え方——なぜ混むと急に待たされるか",
        body:
          "<p>銀行や店のレジのように、<strong>処理を待つ行列</strong>ができる状況を数式で分析するのが<strong>待ち行列理論</strong>です。最も基本のモデルが<strong>M/M/1</strong>——到着がランダムで、窓口が1つ、1件ずつ処理する、というモデルです。</p>" +
          "<p>混み具合は<strong>利用率ρ（ロー）</strong>で表します。<strong>ρ ＝ 到着の割合(λ) ÷ 処理できる割合(μ)</strong>で、0〜1の値をとります。ρが小さければ窓口はガラガラ、1に近いと窓口が空く暇がなくなります。</p>",
        diagram:
          '<svg viewBox="0 0 580 170" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">待ち行列モデル（M/M/1）</text>' +
          '<text x="40" y="70" fill="#4a7fa8" font-size="11" font-weight="700" text-anchor="middle">到着 λ</text>' +
          '<line x1="16" y1="90" x2="70" y2="90" stroke="#4a7fa8" stroke-width="2"/><polygon points="70,90 61,85 61,95" fill="#4a7fa8"/>' +
          '<rect x="74" y="66" width="220" height="48" rx="6" fill="#eef4f9" stroke="#9db8cd" stroke-dasharray="5 3"/>' +
          '<text x="184" y="57" fill="#6b6e76" font-size="10" text-anchor="middle">待ち行列（順番待ち）</text>' +
          '<circle cx="112" cy="90" r="12" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<circle cx="152" cy="90" r="12" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<circle cx="192" cy="90" r="12" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<circle cx="232" cy="90" r="12" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<circle cx="272" cy="90" r="12" fill="#f3ddcd" stroke="#c1855c"/>' +
          '<line x1="296" y1="90" x2="322" y2="90" stroke="#4a7fa8" stroke-width="2"/><polygon points="322,90 313,85 313,95" fill="#4a7fa8"/>' +
          '<rect x="326" y="64" width="120" height="52" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="386" y="88" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">窓口（処理 μ）</text><text x="386" y="105" fill="#3f7a45" font-size="9.5" text-anchor="middle">1件ずつ処理</text>' +
          '<line x1="446" y1="90" x2="500" y2="90" stroke="#5c9160" stroke-width="2"/><polygon points="500,90 491,85 491,95" fill="#5c9160"/>' +
          '<text x="528" y="94" fill="#3f7a45" font-size="11" font-weight="700" text-anchor="middle">完了</text>' +
          '<text x="290" y="150" fill="#6b6e76" font-size="11" text-anchor="middle">利用率 ρ = 到着の割合 λ ÷ 処理できる割合 μ（0〜1）。ρが1に近いほど行列が伸びる。</text>' +
          "</svg>",
        cap: "到着した処理は行列に並び、窓口で1件ずつ処理されて完了する。混み具合が利用率ρ＝λ÷μ。",
      },
      {
        h: "利用率が上がると待ち時間は急増する",
        body:
          "<p>試験で最も問われるのが、<strong>利用率ρが1に近づくと、平均待ち時間が急激に増える</strong>という性質です。平均待ち時間はおおよそ<strong>ρ ÷ (1 − ρ)</strong>に比例して伸びます。ρが0.5なら待ちは処理1回分程度でも、0.9になると9倍にもなります。</p>" +
          "<p>直感的には、窓口に空き時間があるうちは行列がすぐ解消しますが、ρが1に近いと<strong>窓口が処理を終える前に次々と到着</strong>してしまい、行列がどんどん伸びるためです。だから性能設計では利用率を上げすぎない（余裕を残す）ことが大切になります。</p>",
        diagram:
          '<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="260" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">利用率ρと平均待ち時間</text>' +
          '<line x1="60" y1="210" x2="470" y2="210" stroke="#8a8f98" stroke-width="1.5"/>' +
          '<line x1="60" y1="210" x2="60" y2="35" stroke="#8a8f98" stroke-width="1.5"/>' +
          '<line x1="440" y1="210" x2="440" y2="42" stroke="#c26b4a" stroke-width="1.3" stroke-dasharray="5 4"/><text x="440" y="228" fill="#c26b4a" font-size="11" font-weight="700" text-anchor="middle">ρ=1</text>' +
          '<polyline points="60,210 136,206 212,198 250,192 288,183 326,168 364,138 383,108 402,60 414,42" fill="none" stroke="#4a7fa8" stroke-width="2.5"/>' +
          '<text x="300" y="66" fill="#c26b4a" font-size="11.5" font-weight="700" text-anchor="middle">ρ→1で急増</text>' +
          '<text x="255" y="240" fill="#6b6e76" font-size="11" text-anchor="middle">利用率 ρ （0 → 1）</text>' +
          '<text x="20" y="122" fill="#6b6e76" font-size="11" text-anchor="middle" transform="rotate(-90 20 122)">平均待ち時間</text>' +
          "</svg>",
        cap: "待ち時間はρ/(1−ρ)に比例。ρが1に近づくと曲線が跳ね上がる（ハンドルの効かない領域）。",
      },
    ],
    memorize: [
      { k: "スループット", v: "単位時間あたりに処理できる仕事量。" },
      { k: "レスポンスタイム", v: "要求してから応答が返り始めるまでの時間。" },
      { k: "ターンアラウンドタイム", v: "要求してから処理完了・出力までの総時間。" },
      { k: "ベンチマーク", v: "共通プログラムで性能を測定・比較する手法。" },
      { k: "利用率ρ", v: "待ち行列の混み具合。1に近いほど待ち時間が急増。" },
      { k: "MIPS / FLOPS", v: "MIPS=1秒あたり百万命令、FLOPS=1秒あたり浮動小数点演算数。" },
    ],
    flashcards: [
      { q: "スループットとレスポンスタイムの違いは？", a: "スループットは単位時間の処理量、レスポンスタイムは要求から応答開始までの時間。" },
      { q: "待ち行列で利用率が1に近づくと待ち時間はどうなる？", a: "急激に増大する。" },
      { q: "ベンチマークとは？", a: "共通の基準プログラムを実行して、システムの性能を測定・比較する手法。" },
      { q: "ターンアラウンドタイムとは？", a: "処理を要求してから、その結果が完全に得られるまでの総時間。" },
    ],
    quiz: [
      {
        q: "コンピュータシステムの性能指標で、単位時間あたりに処理できる仕事量を表すものはどれか。",
        choices: ["レスポンスタイム", "ターンアラウンドタイム", "スループット", "利用率"],
        answer: 2,
        explain: "単位時間の処理量は<strong>スループット</strong>。",
      },
      {
        q: "M/M/1の待ち行列モデルにおいて、窓口の利用率が高くなるにつれて平均待ち時間はどう変化するか。",
        choices: [
          "一定のまま変わらない",
          "利用率が1に近づくほど急激に増加する",
          "利用率が高いほど短くなる",
          "利用率とは無関係である",
        ],
        answer: 1,
        explain: "利用率が1に近づくほど<strong>待ち時間は急増</strong>する。混雑するほど待たされる。",
      },
      {
        q: "システムの性能を、共通の基準となるプログラムを実行させて測定・比較する手法はどれか。",
        choices: ["モニタリング", "ベンチマーク", "シミュレーション", "チューニング"],
        answer: 1,
        explain: "共通プログラムで測定・比較するのは<strong>ベンチマーク</strong>。",
      },
    ],
  }
);
