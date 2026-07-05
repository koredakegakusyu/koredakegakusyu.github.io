/* =============================================================
   コレダケ基本情報 — 90 補強（追加の本番型問題）
   ============================================================= */
(function () {
  var ADD = {
    "fe-radix": { quiz: [
      { q: "2進数 1111 を10進数で表すといくらか。", choices: ["14", "15", "16", "31"], answer: 1,
        explain: "8+4+2+1＝<strong>15</strong>。" },
      { q: "10進数 255 を16進数で表したものはどれか。", choices: ["FF", "F0", "AA", "100"], answer: 0,
        explain: "255＝15×16+15＝<strong>FF</strong>（2進11111111）。" },
    ]},
    "fe-logic": { quiz: [
      { q: "8ビットの2進数 11001010 を右に1ビット論理シフトした結果はどれか。", choices: ["01100101", "10010100", "11100101", "00110010"], answer: 0,
        explain: "全体を右へ1つずらし左端に0を入れる → <strong>01100101</strong>（値は約1/2）。" },
      { q: "ビット列の特定ビットだけを1にしたい。用いる論理演算はどれか。", choices: ["AND", "OR", "XOR", "NOT"], answer: 1,
        explain: "1にしたいビットを1にした値と<strong>OR</strong>すると、そのビットが1になる。" },
    ]},
    "fe-datastruct": { quiz: [
      { q: "先に格納したデータから順に取り出され、プリンタの印刷待ちなどに使われるデータ構造はどれか。", choices: ["スタック", "キュー", "木", "ヒープ"], answer: 1,
        explain: "先入れ先出し(FIFO)の待ち行列は<strong>キュー</strong>。" },
    ]},
    "fe-algorithm": { quiz: [
      { q: "n個の整列済みデータに対して線形探索を行うときの最悪の比較回数はどれか。", choices: ["1回", "log₂n回", "n回", "n²回"], answer: 2,
        explain: "先頭から順に見る線形探索は最悪<strong>n回</strong>（O(n)）。2分探索ならlog₂n回。" },
    ]},
    "fe-processor": { quiz: [
      { q: "1命令あたり平均4クロック、クロック周波数2GHzのCPUで、1命令の平均実行時間は何ナノ秒か。", choices: ["0.5", "1", "2", "4"], answer: 2,
        explain: "周期＝1÷(2×10⁹)＝0.5ナノ秒。実行時間＝CPI×周期＝4×0.5＝<strong>2ナノ秒</strong>。" },
      { q: "CPUの性能指標で、1秒間に実行できる命令数を百万単位で表すものはどれか。", choices: ["MIPS", "CPI", "クロック周波数", "スループット"], answer: 0,
        explain: "1秒あたりの実行命令数(百万)は<strong>MIPS</strong>。" },
    ]},
    "fe-memory": { quiz: [
      { q: "キャッシュのアクセス時間20ナノ秒、主記憶100ナノ秒、ヒット率80%のときの実効アクセス時間は何ナノ秒か。", choices: ["36", "60", "80", "84"], answer: 0,
        explain: "0.8×20 + 0.2×100 ＝ 16 + 20 ＝ <strong>36ナノ秒</strong>。" },
    ]},
    "fe-sysconf": { quiz: [
      { q: "稼働率0.9の装置を2台並列（冗長）にしたシステム全体の稼働率はいくらか。", choices: ["0.81", "0.90", "0.99", "1.80"], answer: 2,
        explain: "1−(1−0.9)(1−0.9)＝1−0.01＝<strong>0.99</strong>。" },
      { q: "複数の磁気ディスクにデータを分散して書き込み、読み書きを高速化するが冗長性を持たないRAIDはどれか。", choices: ["RAID0", "RAID1", "RAID5", "RAID6"], answer: 0,
        explain: "分散(ストライピング)で高速だが冗長性なしは<strong>RAID0</strong>。" },
    ]},
    "fe-os": { quiz: [
      { q: "実行中のプログラムを一時中断し、入出力完了やタイマなどの要因で別の処理へ切り替える仕組みはどれか。", choices: ["割込み", "ポーリング", "スワッピング", "デッドロック"], answer: 0,
        explain: "処理を中断して別処理へ移すのは<strong>割込み</strong>。" },
    ]},
    "fe-db": { quiz: [
      { q: "関係データベースで、2つの表を共通する列の値をもとに1つの表にまとめる関係演算はどれか。", choices: ["選択", "射影", "結合", "差"], answer: 2,
        explain: "共通列で表をまとめるのは<strong>結合</strong>。" },
      { q: "SQLで、抽出結果を指定した列の値で昇順・降順に並べ替える句はどれか。", choices: ["WHERE", "GROUP BY", "ORDER BY", "HAVING"], answer: 2,
        explain: "並べ替えは<strong>ORDER BY</strong>（ASC昇順/DESC降順）。" },
    ]},
    "fe-transaction": { quiz: [
      { q: "トランザクションの結果を確定してデータベースに反映させる操作はどれか。", choices: ["ロールバック", "コミット", "ロック", "チェックポイント"], answer: 1,
        explain: "結果を確定するのは<strong>コミット</strong>。取消はロールバック。" },
    ]},
    "fe-network": { quiz: [
      { q: "OSI基本参照モデルのデータリンク層で動作し、MACアドレスに基づいてフレームを転送する機器はどれか。", choices: ["ルータ", "スイッチングハブ", "リピータ", "ゲートウェイ"], answer: 1,
        explain: "第2層でMACにより転送するのは<strong>スイッチングハブ</strong>。ルータは第3層。" },
      { q: "電子メールの送信に使われるプロトコルはどれか。", choices: ["POP3", "IMAP", "SMTP", "SNMP"], answer: 2,
        explain: "メール送信は<strong>SMTP</strong>。受信はPOP/IMAP。" },
    ]},
    "fe-ipaddr": { quiz: [
      { q: "サブネットマスクが 255.255.255.224 のとき、1つのサブネットに割り当てられるホストの最大数はいくつか。", choices: ["14", "30", "62", "126"], answer: 1,
        explain: "224は上位3ビットが1(/27)。ホスト部5ビット→2⁵−2＝<strong>30</strong>。" },
    ]},
    "fe-sec-threat": { quiz: [
      { q: "利用者を装った電子メールで偽サイトへ誘導し、IDやパスワードを盗み取る攻撃はどれか。", choices: ["フィッシング", "DoS攻撃", "SQLインジェクション", "ゼロデイ攻撃"], answer: 0,
        explain: "偽メール・偽サイトで認証情報を盗むのは<strong>フィッシング</strong>。" },
      { q: "Webページに悪意のあるスクリプトを埋め込み、閲覧した利用者のブラウザ上で実行させる攻撃はどれか。", choices: ["SQLインジェクション", "クロスサイトスクリプティング(XSS)", "ブルートフォース攻撃", "標的型攻撃"], answer: 1,
        explain: "利用者のブラウザで実行させるのは<strong>XSS</strong>。DBを操作するのがSQLインジェクション。" },
    ]},
    "fe-sec-measure": { quiz: [
      { q: "利用者が一度の認証で複数のサービスを利用できるようにする仕組みはどれか。", choices: ["多要素認証", "シングルサインオン", "ワンタイムパスワード", "生体認証"], answer: 1,
        explain: "一度の認証で複数サービスを使えるのは<strong>シングルサインオン(SSO)</strong>。" },
      { q: "インターネットと社内ネットワークの境界に置き、公開サーバを内部から隔離する区画はどれか。", choices: ["VPN", "DMZ", "VLAN", "NAT"], answer: 1,
        explain: "公開サーバを隔離する緩衝地帯は<strong>DMZ</strong>。" },
    ]},
    "fe-dev": { quiz: [
      { q: "オブジェクト指向で、上位クラスの性質を下位クラスが引き継ぐ仕組みはどれか。", choices: ["カプセル化", "継承", "多態性", "委譲"], answer: 1,
        explain: "性質を引き継ぐのは<strong>継承</strong>。" },
      { q: "仕様の境界値やその前後に着目してテストケースを設計するブラックボックステスト技法はどれか。", choices: ["境界値分析", "命令網羅", "分岐網羅", "条件網羅"], answer: 0,
        explain: "境界に着目するのは<strong>境界値分析</strong>（ブラックボックス）。網羅系はホワイトボックス。" },
    ]},
    "fe-pm": { quiz: [
      { q: "プロジェクトで実施すべき作業を、成果物を基準に階層的に細分化して漏れなく洗い出す手法はどれか。", choices: ["WBS", "PPM", "EVM", "SWOT"], answer: 0,
        explain: "作業を階層分解するのは<strong>WBS</strong>。" },
    ]},
    "fe-strategy": { quiz: [
      { q: "PPMにおいて、市場成長率は低いが市場占有率が高い事業の分類はどれか。", choices: ["花形", "金のなる木", "問題児", "負け犬"], answer: 1,
        explain: "成長率低×シェア高は<strong>金のなる木</strong>（安定収益）。" },
      { q: "顧客名簿や独自の製法など、企業の営業秘密を不正取得・利用する行為を規制する法律はどれか。", choices: ["個人情報保護法", "不正競争防止法", "不正アクセス禁止法", "著作権法"], answer: 1,
        explain: "営業秘密の保護は<strong>不正競争防止法</strong>。" },
    ]},
    "fe-syskikaku": { quiz: [
      { q: "情報システムの調達で、要件・予算・納期を示して提案書と見積りを求める文書はどれか。", choices: ["RFI", "RFP", "SLA", "検収書"], answer: 1,
        explain: "提案・見積りを求めるのは<strong>RFP</strong>。情報収集はRFI。" },
      { q: "定型的なパソコン上の事務作業を、ソフトウェアのロボットで自動化する技術はどれか。", choices: ["RPA", "IoT", "EDI", "VR"], answer: 0,
        explain: "PC上の定型作業の自動化は<strong>RPA</strong>。" },
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
