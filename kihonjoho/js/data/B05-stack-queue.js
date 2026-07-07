/* =============================================================
   コレダケ学習 基本情報 科目B — 05 スタックとキュー
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "feb-stack-queue", domain: "【科目B】アルゴリズム", icon: "🥞", title: "スタックとキュー",
    intro: "『最後に入れたものが先に出る』スタックと『先に入れたものが先に出る』キュー。出る順番を正確に追う。",
    understand: [
      {
        h: "スタック（LIFO）とキュー（FIFO）——出る順番が正反対",
        body:
          "<p>データを一時的にためて取り出すしくみが2つあります。<strong>出る順番</strong>が正反対なのがポイントです。</p>" +
          "<ul>" +
          "<li><strong>スタック（stack）</strong>：<strong>後に入れたものが先に出る（LIFO：Last-In First-Out）</strong>。皿を積み上げて上から取るイメージ。入れるのが<strong>push</strong>、取り出すのが<strong>pop</strong>。</li>" +
          "<li><strong>キュー（queue）</strong>：<strong>先に入れたものが先に出る（FIFO：First-In First-Out）</strong>。行列に並ぶイメージ。入れるのが<strong>enqueue</strong>、取り出すのが<strong>dequeue</strong>。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 580 210" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">スタック(LIFO) と キュー(FIFO)</text>' +
          '<line x1="290" y1="34" x2="290" y2="200" stroke="#e2e4e8" stroke-width="1"/>' +
          '<text x="140" y="48" fill="#34567a" font-size="12.5" font-weight="800" text-anchor="middle">スタック（後入れ先出し）</text>' +
          (function () {
            var s = "";
            var items = ["C（最後）", "B", "A（最初）"];
            items.forEach(function (t, i) {
              var y = 62 + i * 30;
              s += '<rect x="70" y="' + y + '" width="140" height="26" rx="4" fill="' + (i === 0 ? "#dce8f3" : "#eef4f9") + '" stroke="#4a7fa8"/><text x="140" y="' + (y + 18) + '" fill="#23252b" font-size="11" text-anchor="middle">' + t + "</text>";
            });
            s += '<text x="140" y="176" fill="#4a7fa8" font-size="10.5" font-weight="700" text-anchor="middle">push/pop は上から</text>';
            s += '<text x="140" y="194" fill="#6b6e76" font-size="10" text-anchor="middle">popすると C → B → A の順</text>';
            return s;
          })() +
          '<text x="440" y="48" fill="#3f7a45" font-size="12.5" font-weight="800" text-anchor="middle">キュー（先入れ先出し）</text>' +
          (function () {
            var s = "";
            var items = ["A", "B", "C"];
            items.forEach(function (t, i) {
              var x = 330 + i * 74;
              s += '<rect x="' + x + '" y="92" width="66" height="30" rx="4" fill="' + (i === 0 ? "#dcecdd" : "#eef7ef") + '" stroke="#5c9160"/><text x="' + (x + 33) + '" y="112" fill="#23252b" font-size="11" text-anchor="middle">' + t + "</text>";
            });
            s += '<text x="330" y="84" fill="#3f7a45" font-size="9" text-anchor="middle">↑先頭(出る)</text>';
            s += '<text x="478" y="84" fill="#6b6e76" font-size="9" text-anchor="middle">末尾(入る)↑</text>';
            s += '<text x="440" y="150" fill="#5c9160" font-size="10.5" font-weight="700" text-anchor="middle">dequeueすると A → B → C の順</text>';
            s += '<text x="440" y="176" fill="#6b6e76" font-size="10" text-anchor="middle">入れた順に出ていく</text>';
            return s;
          })() +
          "</svg>",
        cap: "スタックは後入れ先出し（popでC→B→A）、キューは先入れ先出し（dequeueでA→B→C）。",
      },
      {
        h: "スタックの動きを追う——push と pop",
        body:
          "<p>スタックに push（積む）と pop（取り出す）を行うと、値の出入りは次のようになります。<strong>pop で出てくるのは常に一番最後に push したもの</strong>です。</p>" +
          PCODE(
            "push(1)     // スタック: [1]\n" +
            "push(2)     // スタック: [1, 2]  （2が一番上）\n" +
            "push(3)     // スタック: [1, 2, 3]\n" +
            "x ← pop()   // 3 が出る → スタック: [1, 2]\n" +
            "y ← pop()   // 2 が出る → スタック: [1]\n" +
            "// x = 3, y = 2",
            "後に入れた3、2の順にpopで出てくる（LIFO）。残るのは最初に入れた1。"
          ),
      },
      {
        h: "キューの動きを追う——enqueue と dequeue",
        body:
          "<p>キューは<strong>入れた順にそのまま出ていきます</strong>。dequeue で出てくるのは常に一番古い（先に入れた）ものです。</p>" +
          PCODE(
            "enqueue(1)     // キュー: [1]\n" +
            "enqueue(2)     // キュー: [1, 2]\n" +
            "enqueue(3)     // キュー: [1, 2, 3]\n" +
            "x ← dequeue()  // 1 が出る → キュー: [2, 3]\n" +
            "y ← dequeue()  // 2 が出る → キュー: [3]\n" +
            "// x = 1, y = 2",
            "先に入れた1、2の順にdequeueで出てくる（FIFO）。残るのは最後に入れた3。"
          ),
      },
    ],
    memorize: [
      { k: "スタック(LIFO)", v: "後入れ先出し。push=積む、pop=一番上を取り出す。" },
      { k: "キュー(FIFO)", v: "先入れ先出し。enqueue=末尾に入れる、dequeue=先頭を取り出す。" },
      { k: "スタックの用途", v: "関数呼び出しの管理、逆順処理、括弧の対応チェック、逆ポーランド計算など。" },
      { k: "キューの用途", v: "処理待ち行列、幅優先探索、印刷ジョブなど到着順の処理。" },
      { k: "push/pop", v: "1・2・3をpushして3回popすると 3→2→1 の順で出る。" },
      { k: "enqueue/dequeue", v: "1・2・3をenqueueして3回dequeueすると 1→2→3 の順で出る。" },
    ],
    flashcards: [
      { q: "スタックとキューの『出る順番』の違いは？", a: "スタックは後入れ先出し（LIFO、最後に入れたものが先に出る）、キューは先入れ先出し（FIFO、先に入れたものが先に出る）。" },
      { q: "スタックに1,2,3の順でpushし、3回popすると出てくる順は？", a: "3, 2, 1（後入れ先出し）。" },
      { q: "キューに1,2,3の順でenqueueし、3回dequeueすると出てくる順は？", a: "1, 2, 3（先入れ先出し）。" },
      { q: "スタックが使われる代表例を1つ挙げると？", a: "関数（手続）の呼び出し管理、括弧の対応チェック、逆ポーランド記法の計算など。" },
    ],
    quiz: [
      {
        q:
          "空のスタックに対して次の操作を順に行った。最後に変数 y に入る値はどれか。（push=積む、pop=一番上を取り出す）" +
          PCODE(
            "push(4)\n" +
            "push(7)\n" +
            "push(2)\n" +
            "x ← pop()\n" +
            "push(9)\n" +
            "y ← pop()"
          ),
        choices: ["2", "7", "9", "4"],
        answer: 2,
        explain: "push後[4,7,2]→pop で2が出る[4,7]→push9で[4,7,9]→pop で<strong>9</strong>が出る（一番上）。",
      },
      {
        q:
          "空のキューに対して次の操作を順に行った。最後に変数 y に入る値はどれか。（enqueue=末尾に入れる、dequeue=先頭を取り出す）" +
          PCODE(
            "enqueue(4)\n" +
            "enqueue(7)\n" +
            "enqueue(2)\n" +
            "x ← dequeue()\n" +
            "enqueue(9)\n" +
            "y ← dequeue()"
          ),
        choices: ["4", "7", "2", "9"],
        answer: 1,
        explain: "enqueue後[4,7,2]→dequeueで先頭4が出る[7,2]→enqueue9で[7,2,9]→dequeueで先頭<strong>7</strong>が出る。",
      },
      {
        q: "先に到着した処理から順番に実行したい『処理待ち行列』の管理に最も適したデータ構造はどれか。",
        choices: ["スタック", "キュー", "2分探索木", "ハッシュ表"],
        answer: 1,
        explain: "到着順（先入れ先出し）で処理するのは<strong>キュー</strong>が適切。",
      },
      {
        q:
          "空のスタックに 1, 2, 3, 4 の順に push し、その後 pop を2回行った。スタックに残っている要素（下から上の順）はどれか。",
        choices: ["1, 2", "3, 4", "1, 2, 3", "2, 3"],
        answer: 0,
        explain: "push後は[1,2,3,4]。popを2回すると4と3が出て、残りは下から<strong>1, 2</strong>。",
      },
    ],
  }
);
