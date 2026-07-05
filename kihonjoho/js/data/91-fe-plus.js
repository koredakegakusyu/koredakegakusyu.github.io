/* =============================================================
   コレダケ基本情報 — 91 追加問題（拡充分の本番型）
   ============================================================= */
(function () {
  var ADD = {
    "fe-math": { quiz: [
      { q: "40人のクラスで、英語の合格者が25人、数学の合格者が20人、両方合格が12人のとき、少なくとも一方に合格した人数は何人か。",
        choices: ["28人", "33人", "37人", "45人"], answer: 1,
        explain: "|A∪B|=|A|+|B|−|A∩B|＝25+20−12＝<strong>33人</strong>。" },
      { q: "当たりが3本入った10本のくじから1本引くとき、当たる確率はどれか。",
        choices: ["1/10", "3/10", "3/7", "1/3"], answer: 1,
        explain: "当たり3 ÷ 全10＝<strong>3/10</strong>。" },
    ]},
    "fe-info": { quiz: [
      { q: "式 A × (B + C) を逆ポーランド記法で表したものはどれか。",
        choices: ["ABC+×", "AB+C×", "ABC×+", "A×BC+"], answer: 0,
        explain: "先に(B+C)＝BC+、それにAを掛けるので<strong>ABC+×</strong>。" },
    ]},
    "fe-instruction": { quiz: [
      { q: "命令のオペランド部に指定された値そのものを、演算の対象データとして扱うアドレス指定方式はどれか。",
        choices: ["即値アドレス指定", "直接アドレス指定", "間接アドレス指定", "指標アドレス指定"], answer: 0,
        explain: "値そのものがデータなのは<strong>即値アドレス指定</strong>。" },
    ]},
    "fe-storage": { quiz: [
      { q: "高速で主にキャッシュメモリに用いられ、リフレッシュ動作が不要な半導体メモリはどれか。",
        choices: ["DRAM", "SRAM", "フラッシュメモリ", "マスクROM"], answer: 1,
        explain: "高速・リフレッシュ不要でキャッシュ用は<strong>SRAM</strong>。主記憶はDRAM。" },
    ]},
    "fe-sysstruct": { quiz: [
      { q: "主系と待機系を用意し、待機系を普段は停止しておいて障害時に起動して切り替える構成はどれか。",
        choices: ["デュアルシステム", "ホットスタンバイ", "コールドスタンバイ", "ロードバランシング"], answer: 2,
        explain: "待機系を普段停止し必要時に起動するのは<strong>コールドスタンバイ</strong>（安いが切替は遅い）。" },
    ]},
    "fe-perf": { quiz: [
      { q: "処理を要求してから、その結果の出力が完了するまでの時間を表す性能指標はどれか。",
        choices: ["スループット", "ターンアラウンドタイム", "利用率", "MIPS"], answer: 1,
        explain: "要求から完了までの総時間は<strong>ターンアラウンドタイム</strong>。" },
    ]},
    "fe-sql": { quiz: [
      { q: "SQLで、複数の表を共通する列の値をもとに1つの結果にまとめる操作はどれか。",
        choices: ["UNION", "JOIN（結合）", "GROUP BY", "ORDER BY"], answer: 1,
        explain: "共通列で表をまとめるのは<strong>JOIN（結合）</strong>。" },
    ]},
    "fe-dbapp": { quiz: [
      { q: "蓄積された大量データを多次元的に集計・分析し、切り口を変えながら対話的に分析する仕組みはどれか。",
        choices: ["OLAP", "OLTP", "ETL", "DDL"], answer: 0,
        explain: "多次元で対話的に集計・分析するのは<strong>OLAP</strong>。日々の取引処理はOLTP。" },
    ]},
    "fe-protocol": { quiz: [
      { q: "ネットワークに接続した機器へ、IPアドレスやサブネットマスクなどを自動的に割り当てるプロトコルはどれか。",
        choices: ["DNS", "DHCP", "ARP", "NTP"], answer: 1,
        explain: "IP等の自動割当は<strong>DHCP</strong>。IP→MACはARP、時刻同期はNTP。" },
    ]},
    "fe-transmission": { quiz: [
      { q: "送信するデータの1の個数が偶数になるように1ビットを付加し、受信側で誤りを検出する方式はどれか。",
        choices: ["偶数パリティチェック", "ハミング符号", "CRC", "チェックディジット"], answer: 0,
        explain: "1の個数を偶数にそろえて1ビット誤りを検出するのは<strong>偶数パリティチェック</strong>（訂正はできない）。" },
    ]},
    "fe-secmgmt": { quiz: [
      { q: "情報セキュリティポリシーの構成として、最上位に位置づけられるものはどれか。",
        choices: ["実施手順", "対策基準", "基本方針", "運用記録"], answer: 2,
        explain: "ポリシーは<strong>基本方針</strong>→対策基準→実施手順の階層。最上位は基本方針。" },
      { q: "災害時の復旧目標のうち、「どの時点のデータまで復旧させるか」を表すものはどれか。",
        choices: ["RTO", "RPO", "MTBF", "SLA"], answer: 1,
        explain: "復旧させるデータの時点は<strong>RPO</strong>。復旧までの時間はRTO。" },
    ]},
    "fe-secattack": { quiz: [
      { q: "利用者がログイン中であることを悪用し、本人の意図しない操作を勝手に実行させる攻撃はどれか。",
        choices: ["クロスサイトリクエストフォージェリ(CSRF)", "SQLインジェクション", "DoS攻撃", "ゼロデイ攻撃"], answer: 0,
        explain: "ログイン状態を悪用し意図しない操作をさせるのは<strong>CSRF</strong>。" },
    ]},
    "fe-devproc": { quiz: [
      { q: "モジュールの独立性を高めるうえで望ましいのは、凝集度と結合度をそれぞれどうすることか。",
        choices: ["凝集度を低く、結合度を高く", "凝集度を高く、結合度を低く", "両方高く", "両方低く"], answer: 1,
        explain: "独立性を高めるには<strong>凝集度を高く、結合度を低く</strong>。" },
    ]},
    "fe-estimate": { quiz: [
      { q: "複数の専門家に意見を求め、その結果を匿名でフィードバックしながら繰り返し、意見を収束させて見積もる手法はどれか。",
        choices: ["ファンクションポイント法", "類推見積法", "デルファイ法", "LOC法"], answer: 2,
        explain: "専門家の意見を繰り返し集約して収束させるのは<strong>デルファイ法</strong>。" },
    ]},
    "fe-accounting": { quiz: [
      { q: "設備などの固定資産の取得費用を、使用できる期間にわたって分割して費用計上する会計処理はどれか。",
        choices: ["減価償却", "損益分岐点分析", "キャッシュフロー", "引当金"], answer: 0,
        explain: "取得費用を使用期間で分割計上するのは<strong>減価償却</strong>。" },
    ]},
    "fe-bizlaw": { quiz: [
      { q: "条件の組合せと、それに応じて実行する処理を表形式で漏れなく整理するために用いる図はどれか。",
        choices: ["DFD", "決定表", "状態遷移図", "E-R図"], answer: 1,
        explain: "条件と行動の組合せの整理は<strong>決定表（デシジョンテーブル）</strong>。" },
    ]},
  };

  var list = window.CURRICULUM || [];
  var byId = {};
  list.forEach(function (m) { byId[m.id] = m; });
  Object.keys(ADD).forEach(function (id) {
    var m = byId[id]; if (!m) return;
    var a = ADD[id];
    if (a.memorize) m.memorize = m.memorize.concat(a.memorize);
    if (a.flashcards) m.flashcards = m.flashcards.concat(a.flashcards);
    if (a.quiz) m.quiz = m.quiz.concat(a.quiz);
  });
})();
