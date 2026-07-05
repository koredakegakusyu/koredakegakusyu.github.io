/* =============================================================
   コレダケITパスポート カリキュラム — 91 本番型問題バンク（追加分）
   全体で150問以上を確保。計算問題・区別問題を厚くする。
   ============================================================= */
(function () {
  var ADD = {
    "kigyo-katsudo": { quiz: [
      { q: "ある商品の販売単価が1,000円、1個あたりの変動費が600円、固定費が200,000円のとき、損益分岐点となる販売数量は何個か。",
        choices: ["200個", "334個", "500個", "1,000個"], answer: 2,
        explain: "1個あたりの利益(限界利益)＝1000−600＝400円。固定費200,000÷400＝<strong>500個</strong>で損益0。" },
      { q: "複数の作業員の作業時間のばらつきを把握するために、データの分布を柱状のグラフで表す図はどれか。",
        choices: ["パレート図", "ヒストグラム", "散布図", "レーダチャート"], answer: 1,
        explain: "分布・ばらつきを柱状で見るのは<strong>ヒストグラム</strong>。" },
    ]},
    "homu": { quiz: [
      { q: "企業が法令や社会規範、企業倫理を守って活動することを表す言葉はどれか。",
        choices: ["コンプライアンス", "コーポレートガバナンス", "ディスクロージャ", "アカウンタビリティ"], answer: 0,
        explain: "法令遵守・倫理の遵守は<strong>コンプライアンス</strong>。" },
      { q: "特許権の存続期間として正しいものはどれか。",
        choices: ["出願から10年", "出願から20年", "登録から25年", "著作者の死後70年"], answer: 1,
        explain: "特許権は<strong>出願から20年</strong>。意匠は25年、商標は更新可、著作権は死後70年。" },
    ]},
    "keiei-senryaku": { quiz: [
      { q: "市場を細分化し、狙う顧客層を定め、その中での自社の立ち位置を決める一連の流れを何というか。",
        choices: ["PDCA", "STP", "PPM", "SWOT"], answer: 1,
        explain: "セグメンテーション→ターゲティング→ポジショニングの流れは<strong>STP</strong>。" },
    ]},
    "gijutsu-senryaku": { quiz: [
      { q: "自社技術だけに頼らず、他社や大学など外部の技術やアイデアを取り込んで革新を進める考え方はどれか。",
        choices: ["オープンイノベーション", "プロセスイノベーション", "リーンスタートアップ", "デファクトスタンダード"], answer: 0,
        explain: "外部の知を活用する革新は<strong>オープンイノベーション</strong>。" },
    ]},
    "business-industry": { quiz: [
      { q: "実世界のモノにセンサーや通信機能を組み込み、収集したデータをネットワーク経由で活用する仕組みはどれか。",
        choices: ["EDI", "IoT", "POS", "SFA"], answer: 1,
        explain: "モノをネットにつなぎデータ活用するのは<strong>IoT</strong>。" },
    ]},
    "system-senryaku": { quiz: [
      { q: "業務プロセスを継続的に監視・分析し、PDCAを回して改善し続ける管理手法はどれか。",
        choices: ["BPR", "BPM", "BPO", "SLA"], answer: 1,
        explain: "継続的改善(PDCA)は<strong>BPM</strong>。抜本再構築はBPR、外部委託はBPO。" },
    ]},
    "system-kikaku": { quiz: [
      { q: "情報システムの調達で、要件・予算・納期を提示して複数ベンダーから提案書と見積りを求める文書はどれか。",
        choices: ["RFI", "RFP", "SLA", "検収書"], answer: 1,
        explain: "提案・見積りを求めるのは<strong>RFP</strong>。事前の情報収集はRFI。" },
    ]},
    "kaihatsu-gijutsu": { quiz: [
      { q: "単体テスト→結合テスト→システムテストと進める開発において、複数のモジュールを組み合わせて相互の連携を確認するテストはどれか。",
        choices: ["単体テスト", "結合テスト", "システムテスト", "運用テスト"], answer: 1,
        explain: "モジュールをつないで連携を確認するのは<strong>結合テスト</strong>。" },
    ]},
    "kaihatsu-kanri": { quiz: [
      { q: "プログラムの外部から見た動作を変えずに、内部の構造を整理して保守性を高める作業はどれか。",
        choices: ["リファクタリング", "リバースエンジニアリング", "リグレッション", "リリース"], answer: 0,
        explain: "動作を変えず内部を改善するのは<strong>リファクタリング</strong>。" },
    ]},
    "project-mgmt": { quiz: [
      { q: "作業A(4日)→B(3日)、A(4日)→C(6日)、BとCの完了後にD(2日)を行う。全体の最短完了日数は何日か。",
        choices: ["9日", "11日", "12日", "15日"], answer: 2,
        explain: "A→C→D＝4+6+2＝12、A→B→D＝4+3+2＝9。長い方（クリティカルパス）＝<strong>12日</strong>。" },
    ]},
    "service-mgmt": { quiz: [
      { q: "利用者からの問い合わせや障害連絡を受け付ける単一の窓口として機能する組織はどれか。",
        choices: ["サービスデスク", "データセンター", "PMO", "SOC"], answer: 0,
        explain: "問い合わせ・障害の一元窓口は<strong>サービスデスク</strong>。" },
    ]},
    "kansa": { quiz: [
      { q: "システム監査人が監査の結果として作成し、経営者へ提出する文書はどれか。",
        choices: ["監査計画書", "監査報告書", "RFP", "SLA"], answer: 1,
        explain: "監査結果をまとめて提出するのは<strong>監査報告書</strong>。その後フォローアップを行う。" },
    ]},
    "kiso-riron": { quiz: [
      { q: "10進数の 25 を2進数で表すとどれか。",
        choices: ["11001", "10101", "11011", "10011"], answer: 0,
        explain: "25＝16+8+1＝2進<strong>11001</strong>（16,8,0,0,1）。" },
      { q: "袋の中に赤玉3個・白玉2個が入っている。1個取り出したとき赤玉である確率はどれか。",
        choices: ["1/5", "2/5", "3/5", "1/2"], answer: 2,
        explain: "赤3 ÷ 全5＝<strong>3/5</strong>。" },
    ]},
    "algorithm": { quiz: [
      { q: "隣り合う要素を比較し、大小が逆なら交換する操作を繰り返してデータを並べ替える整列法はどれか。",
        choices: ["2分探索", "バブルソート", "線形探索", "ハッシュ法"], answer: 1,
        explain: "隣接要素の比較交換を繰り返すのは<strong>バブルソート</strong>。" },
    ]},
    "computer-kosei": { quiz: [
      { q: "周辺機器を接続するインタフェースのうち、映像と音声をまとめて1本のケーブルでデジタル伝送する規格はどれか。",
        choices: ["USB", "HDMI", "RS-232C", "Bluetooth"], answer: 1,
        explain: "映像・音声のデジタル一括伝送は<strong>HDMI</strong>。" },
    ]},
    "system-kosei": { quiz: [
      { q: "2台の磁気ディスクに同じ内容を書き込み、片方が故障してもデータを失わないようにするRAIDの方式はどれか。",
        choices: ["ストライピング(RAID0)", "ミラーリング(RAID1)", "パリティ(RAID5)", "スパニング"], answer: 1,
        explain: "同じ内容を2台に書くのは<strong>ミラーリング(RAID1)</strong>。RAID0は分散で高速だが冗長性なし。" },
      { q: "システムの性能指標のうち、単位時間あたりに処理できる仕事量を表すものはどれか。",
        choices: ["レスポンスタイム", "ターンアラウンドタイム", "スループット", "稼働率"], answer: 2,
        explain: "単位時間の処理量は<strong>スループット</strong>。応答の速さはレスポンスタイム。" },
    ]},
    "os-software": { quiz: [
      { q: "表計算で、条件を満たす場合と満たさない場合で異なる値を返す関数はどれか。",
        choices: ["SUM", "IF", "AVERAGE", "COUNT"], answer: 1,
        explain: "条件で処理を分けるのは<strong>IF</strong>関数。" },
    ]},
    "db-kiso": { quiz: [
      { q: "関係データベースの表から、条件を満たす『行』だけを取り出す関係演算はどれか。",
        choices: ["射影", "選択", "結合", "和"], answer: 1,
        explain: "条件に合う『行』を取り出すのは<strong>選択</strong>。特定の『列』を取り出すのが射影。" },
    ]},
    "db-transaction": { quiz: [
      { q: "データベースの障害発生時に、ログを用いて未完了のトランザクションを取り消して整合性を保つ処理はどれか。",
        choices: ["ロールフォワード", "ロールバック", "コミット", "チェックポイント"], answer: 1,
        explain: "未完了処理を取り消すのは<strong>ロールバック</strong>。完了済みを再実行するのがロールフォワード。" },
    ]},
    "network-kiso": { quiz: [
      { q: "1Gバイトのデータを、実効速度200Mbpsの回線で転送するのに必要なおおよその時間はどれか。（1Gバイト＝8Gビットとする）",
        choices: ["約4秒", "約8秒", "約40秒", "約80秒"], answer: 2,
        explain: "8Gビット＝8000Mビット。8000 ÷ 200＝<strong>40秒</strong>。" },
    ]},
    "network-protocol": { quiz: [
      { q: "HTTPで用いられる代表的なポート番号はどれか。",
        choices: ["20", "25", "80", "443"], answer: 2,
        explain: "HTTPは<strong>80番</strong>。HTTPSは443、SMTPは25。" },
    ]},
    "security-kiso": { quiz: [
      { q: "ソフトウェアの脆弱性が発見されてから、修正プログラムが提供される前にその脆弱性を突く攻撃はどれか。",
        choices: ["ブルートフォース攻撃", "ゼロデイ攻撃", "フィッシング", "総当たり攻撃"], answer: 1,
        explain: "修正提供前の脆弱性を突くのは<strong>ゼロデイ攻撃</strong>。" },
      { q: "考えられるすべての文字の組合せを機械的に試してパスワードを破ろうとする攻撃はどれか。",
        choices: ["標的型攻撃", "ブルートフォース(総当たり)攻撃", "SQLインジェクション", "DoS攻撃"], answer: 1,
        explain: "総当たりでパスワードを破るのは<strong>ブルートフォース攻撃</strong>。桁数を増やすと有効な対策。" },
    ]},
    "security-taisaku": { quiz: [
      { q: "外部に公開するWebサーバを、社内ネットワークから隔離した緩衝地帯に設置する構成の名称はどれか。",
        choices: ["VPN", "DMZ", "VLAN", "NAT"], answer: 1,
        explain: "公開サーバを隔離する緩衝地帯は<strong>DMZ</strong>。内部LANへの侵入を防ぐ。" },
      { q: "指紋・顔・虹彩など、身体的特徴を用いて本人を確認する認証方式はどれか。",
        choices: ["知識認証", "所持認証", "生体認証", "ワンタイムパスワード"], answer: 2,
        explain: "身体的特徴による認証は<strong>生体認証(バイオメトリクス)</strong>。" },
    ]},
    "newtech": { quiz: [
      { q: "正解ラベルのないデータから、似た特徴を持つグループを自動的に見つけ出す機械学習の手法はどれか。",
        choices: ["教師あり学習", "教師なし学習", "強化学習", "深層強化学習"], answer: 1,
        explain: "ラベルなしで構造・グループを見つけるのは<strong>教師なし学習</strong>（クラスタリング）。" },
    ]},
    "hi-multimedia": { quiz: [
      { q: "写真画像を高い圧縮率で保存できるが、圧縮すると元の画質には完全には戻せない画像形式はどれか。",
        choices: ["PNG", "BMP", "JPEG", "GIF"], answer: 2,
        explain: "写真向けの非可逆圧縮は<strong>JPEG</strong>。PNGは可逆で透過に対応。" },
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
