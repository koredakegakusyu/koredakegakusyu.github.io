/* =============================================================
   コレダケITパスポート — 頻出用語・略語 早見表データ
   window.COMPARE      : 用語一覧（クリックで解説科目へ）
   window.COMPARE_LINK : 用語 → 科目ID
   window.VERSUS       : 紛らわしいペアの決め手
   ============================================================= */
window.COMPARE = [
  /* ストラテジ */
  { n: "CSR", cat: "ストラテジ", role: "企業の社会的責任", sig: "環境・人権・地域貢献", key: "利益追求だけでない責任" },
  { n: "コーポレートガバナンス", cat: "ストラテジ", role: "企業統治", sig: "社外取締役で監視", key: "経営の暴走を防ぐ" },
  { n: "損益分岐点", cat: "ストラテジ", role: "利益0になる売上高", sig: "固定費÷(1−変動費率)", key: "超えれば黒字" },
  { n: "SWOT分析", cat: "ストラテジ", role: "自社の現状分析", sig: "強み/弱み/機会/脅威", key: "内部=SW・外部=OT" },
  { n: "PPM", cat: "ストラテジ", role: "事業の投資判断", sig: "花形/金のなる木/問題児/負け犬", key: "成長率×シェア" },
  { n: "4P", cat: "ストラテジ", role: "マーケティング要素", sig: "Product/Price/Place/Promotion", key: "売り手の視点" },
  { n: "コアコンピタンス", cat: "ストラテジ", role: "中核的な強み", sig: "真似されにくい能力", key: "競争優位の源泉" },
  { n: "MOT", cat: "ストラテジ", role: "技術経営", sig: "技術を利益に結びつける", key: "研究で終わらせない" },
  { n: "PoC", cat: "ストラテジ", role: "概念実証", sig: "小規模に実現性を検証", key: "本格開発の前に試す" },
  { n: "ERP", cat: "ストラテジ", role: "基幹統合システム", sig: "ヒト・モノ・カネを一元管理", key: "経営資源の統合" },
  { n: "SCM", cat: "ストラテジ", role: "供給連鎖管理", sig: "調達→生産→物流→販売", key: "モノの流れの最適化" },
  { n: "CRM", cat: "ストラテジ", role: "顧客関係管理", sig: "満足度・LTV向上", key: "顧客との関係を管理" },
  { n: "POS", cat: "ストラテジ", role: "販売時点情報管理", sig: "レジで販売データ収集", key: "売れ筋・在庫分析" },
  { n: "EDI", cat: "ストラテジ", role: "電子データ交換", sig: "企業間の受発注データ", key: "取引の電子化" },
  { n: "SaaS", cat: "ストラテジ", role: "ソフトを利用", sig: "Webメール等", key: "クラウド・使うだけ" },
  { n: "IaaS", cat: "ストラテジ", role: "基盤を借りる", sig: "サーバ/NW/保管", key: "OSから自分で" },
  { n: "BPR", cat: "ストラテジ", role: "業務の抜本的再構築", sig: "プロセスを作り直す", key: "BPMは継続改善" },
  { n: "RFP", cat: "ストラテジ", role: "提案依頼書", sig: "要件を示し提案・見積り依頼", key: "RFIは情報収集が先" },
  { n: "著作権", cat: "ストラテジ", role: "表現を守る権利", sig: "登録不要・死後70年", key: "アイデア/言語は対象外" },
  { n: "産業財産権", cat: "ストラテジ", role: "発明等を守る権利", sig: "特許/実用新案/意匠/商標", key: "出願・登録が必要" },

  /* マネジメント */
  { n: "QCD", cat: "マネジメント", role: "プロジェクトの3制約", sig: "品質/費用/納期", key: "トレードオフ" },
  { n: "WBS", cat: "マネジメント", role: "作業分解構成図", sig: "作業を階層的に分解", key: "漏れなく洗い出す" },
  { n: "クリティカルパス", cat: "マネジメント", role: "最長経路", sig: "アローダイアグラム", key: "全体日数を決める" },
  { n: "アジャイル", cat: "マネジメント", role: "反復型開発", sig: "スプリントを繰り返す", key: "変化に強い" },
  { n: "スクラム", cat: "マネジメント", role: "アジャイル手法", sig: "PO/スクラムマスター", key: "スプリントで反復" },
  { n: "回帰テスト", cat: "マネジメント", role: "修正の影響確認", sig: "既存機能が壊れてないか", key: "リグレッション" },
  { n: "ITIL", cat: "マネジメント", role: "サービス管理の指針", sig: "ベストプラクティス集", key: "運用のお手本" },
  { n: "SLA", cat: "マネジメント", role: "サービス品質合意", sig: "稼働率・復旧時間", key: "数値で合意" },
  { n: "インシデント管理", cat: "マネジメント", role: "早期復旧が目的", sig: "まず動かす", key: "原因究明は問題管理" },
  { n: "システム監査", cat: "マネジメント", role: "第三者の点検", sig: "独立性・客観性", key: "自作対象は監査不可" },
  { n: "職務分掌", cat: "マネジメント", role: "権限の分散", sig: "発注と承認を分ける", key: "内部統制の基本" },

  /* テクノロジ基礎 */
  { n: "スタック", cat: "基礎・コンピュータ", role: "後入れ先出し", sig: "LIFO", key: "最後が最初に出る" },
  { n: "キュー", cat: "基礎・コンピュータ", role: "先入れ先出し", sig: "FIFO・待ち行列", key: "最初が最初に出る" },
  { n: "2分探索", cat: "基礎・コンピュータ", role: "半分ずつ絞る探索", sig: "整列済みが前提", key: "log2(n)回で高速" },
  { n: "XOR", cat: "基礎・コンピュータ", role: "排他的論理和", sig: "異なるとき1", key: "同じなら0" },
  { n: "コンパイラ", cat: "基礎・コンピュータ", role: "一括翻訳方式", sig: "先に機械語へ", key: "インタプリタは1行ずつ" },
  { n: "キャッシュメモリ", cat: "基礎・コンピュータ", role: "高速な一時記憶", sig: "CPUと主記憶の間", key: "速度差を埋める" },
  { n: "RAM", cat: "基礎・コンピュータ", role: "揮発性メモリ", sig: "電源断で消える", key: "ROMは不揮発" },
  { n: "稼働率", cat: "基礎・コンピュータ", role: "よく動く度合い", sig: "MTBF÷(MTBF+MTTR)", key: "直列=積/並列で上昇" },
  { n: "仮想化", cat: "基礎・コンピュータ", role: "1台で複数の仮想機", sig: "資源の有効活用", key: "コスト削減" },
  { n: "仮想記憶", cat: "基礎・コンピュータ", role: "大きな主記憶に見せる", sig: "補助記憶を利用", key: "OSの機能" },
  { n: "絶対参照", cat: "基礎・コンピュータ", role: "表計算の参照固定", sig: "$A$1", key: "コピーでずれない" },

  /* データベース */
  { n: "主キー", cat: "データベース", role: "行を一意に識別", sig: "重複・NULL不可", key: "外部キーは他表参照" },
  { n: "外部キー", cat: "データベース", role: "他表の主キー参照", sig: "表同士を関連づけ", key: "整合性を保つ" },
  { n: "正規化", cat: "データベース", role: "重複を排除", sig: "第1〜第3正規形", key: "更新矛盾を防ぐ" },
  { n: "ACID", cat: "データベース", role: "トランザクションの性質", sig: "原子性/一貫性/独立性/耐久性", key: "全部か無か" },
  { n: "排他制御", cat: "データベース", role: "同時更新の矛盾防止", sig: "ロック", key: "デッドロックに注意" },
  { n: "コミット", cat: "データベース", role: "処理を確定", sig: "正常終了", key: "取消はロールバック" },

  /* ネットワーク */
  { n: "ルータ", cat: "ネットワーク", role: "NW間を中継", sig: "経路選択・第3層", key: "スイッチは第2層" },
  { n: "DNS", cat: "ネットワーク", role: "名前解決", sig: "ドメイン⇔IP", key: "IP割当はDHCP" },
  { n: "DHCP", cat: "ネットワーク", role: "IP自動割当", sig: "接続時に配布", key: "名前解決はDNS" },
  { n: "NAT", cat: "ネットワーク", role: "IPアドレス変換", sig: "プライベート⇔グローバル", key: "内から外へ" },
  { n: "HTTPS", cat: "ネットワーク", role: "暗号化Web通信", sig: "TLS・ポート443", key: "HTTPは平文" },
  { n: "IPv6", cat: "ネットワーク", role: "次世代IPアドレス", sig: "128ビット", key: "IPv4は32ビット枯渇" },
  { n: "IMAP", cat: "ネットワーク", role: "メール受信(サーバ管理)", sig: "複数端末で管理", key: "POPはDL方式" },

  /* セキュリティ */
  { n: "CIA", cat: "セキュリティ", role: "情報セキュリティ3要素", sig: "機密性/完全性/可用性", key: "バランスが目標" },
  { n: "ランサムウェア", cat: "セキュリティ", role: "身代金要求型", sig: "ファイルを暗号化", key: "復号と引換に金銭要求" },
  { n: "ソーシャルエンジニアリング", cat: "セキュリティ", role: "人の隙を突く", sig: "なりすまし/のぞき見", key: "技術でなく人が標的" },
  { n: "SQLインジェクション", cat: "セキュリティ", role: "不正SQL注入", sig: "入力欄からDB操作", key: "入力値の検証で防ぐ" },
  { n: "公開鍵暗号", cat: "セキュリティ", role: "非対称鍵暗号", sig: "公開鍵で暗号/秘密鍵で復号", key: "鍵配送問題を解決" },
  { n: "共通鍵暗号", cat: "セキュリティ", role: "対称鍵暗号", sig: "同じ鍵・高速", key: "鍵配送問題あり" },
  { n: "デジタル署名", cat: "セキュリティ", role: "本人性・改ざん検知", sig: "秘密鍵で署名/公開鍵で検証", key: "機密性は目的でない" },
  { n: "多要素認証", cat: "セキュリティ", role: "認証の強化", sig: "知識/所持/生体", key: "異なる要素を組合せ" },
  { n: "DMZ", cat: "セキュリティ", role: "緩衝地帯", sig: "公開サーバを隔離", key: "内部LANを守る" },
  { n: "ISMS", cat: "セキュリティ", role: "情報セキュリティ管理", sig: "ISO/IEC 27001", key: "PDCAで運用" },

  /* 最新技術 */
  { n: "機械学習", cat: "最新技術", role: "データから学ぶAI", sig: "教師あり/なし/強化", key: "深層学習はその一種" },
  { n: "生成AI", cat: "最新技術", role: "内容を生み出すAI", sig: "文章・画像・音声", key: "大規模言語モデル等" },
  { n: "IoT", cat: "最新技術", role: "モノのネット接続", sig: "センサーで収集", key: "ビッグデータを生む" },
  { n: "DX", cat: "最新技術", role: "デジタル変革", sig: "事業・組織を変革", key: "単なる電子化ではない" },
  { n: "ブロックチェーン", cat: "最新技術", role: "分散台帳", sig: "改ざん困難", key: "暗号資産の基盤" },
  { n: "RPA", cat: "最新技術", role: "定型作業の自動化", sig: "ソフトのロボット", key: "PC事務を自動化" },
  { n: "ユニバーサルデザイン", cat: "最新技術", role: "誰もが使える設計", sig: "年齢・障害を問わず", key: "アクセシビリティと関連" },
  { n: "エッジコンピューティング", cat: "最新技術", role: "現場側で処理", sig: "端末の近くで計算", key: "遅延・通信量を削減" },
  { n: "5G", cat: "最新技術", role: "第5世代移動通信", sig: "高速・低遅延・多接続", key: "IoT/自動運転を支える" },
  { n: "デジタルツイン", cat: "最新技術", role: "現実を仮想に再現", sig: "シミュレーション", key: "分析・予測に活用" },

  /* 過去問頻出の追加 */
  { n: "BSC", cat: "ストラテジ", role: "バランススコアカード", sig: "財務/顧客/業務/学習成長", key: "4視点で評価" },
  { n: "不正競争防止法", cat: "ストラテジ", role: "営業秘密を保護", sig: "顧客名簿・製法等", key: "3要件で保護" },
  { n: "PL法", cat: "ストラテジ", role: "製造物責任法", sig: "製品欠陥の責任", key: "過失問わず責任" },
  { n: "DFD", cat: "ストラテジ", role: "データフロー図", sig: "データの流れを表す", key: "E-Rは関連を表す" },
  { n: "ガントチャート", cat: "マネジメント", role: "日程・進捗管理", sig: "横棒で表す", key: "前後関係はアロー図" },
  { n: "GPU", cat: "基礎・コンピュータ", role: "並列演算装置", sig: "画像・AI向け", key: "CPUは逐次処理中心" },
  { n: "NoSQL", cat: "データベース", role: "非RDBのDB群", sig: "キーバリュー等", key: "柔軟・大量データ" },
  { n: "MACアドレス", cat: "ネットワーク", role: "機器固有の物理アドレス", sig: "NICに割当", key: "IPは論理アドレス" },
  { n: "VPN", cat: "ネットワーク", role: "仮想専用線", sig: "公衆回線を暗号化", key: "拠点間・在宅で" },
  { n: "サブネットマスク", cat: "ネットワーク", role: "NW部を示す値", sig: "255.255.255.0等", key: "IPの区切り" },
  { n: "Cookie", cat: "ネットワーク", role: "ブラウザ保存データ", sig: "利用者識別", key: "ログイン保持等" },
  { n: "MVNO", cat: "ネットワーク", role: "回線を借りる事業者", sig: "格安SIM", key: "設備を持たない" },
  { n: "リスク対応", cat: "セキュリティ", role: "リスクへの4対応", sig: "回避/低減/移転/保有", key: "移転=保険等" },
  { n: "CSIRT", cat: "セキュリティ", role: "事故対応チーム", sig: "インシデント対応", key: "被害拡大を防ぐ" },
  { n: "ハッシュ関数", cat: "セキュリティ", role: "固定長の値を生成", sig: "一方向・逆算困難", key: "改ざん検知" },
  { n: "ゼロトラスト", cat: "セキュリティ", role: "何も信頼しない", sig: "都度検証", key: "境界防御を見直す" },
  { n: "ペネトレーションテスト", cat: "セキュリティ", role: "侵入テスト", sig: "擬似攻撃で検証", key: "脆弱性を確認" },
  { n: "BYOD", cat: "セキュリティ", role: "私物端末の業務利用", sig: "MDMで管理", key: "紛失・漏えい注意" },

  /* 直近試験(令和6等)の頻出 */
  { n: "フェールセーフ", cat: "基礎・コンピュータ", role: "故障時に安全側へ", sig: "信号機は赤で停止", key: "安全＝セーフ" },
  { n: "フールプルーフ", cat: "基礎・コンピュータ", role: "誤操作に強い設計", sig: "扉を開けると止まる", key: "利用者のミス対策" },
  { n: "フォールトトレラント", cat: "基礎・コンピュータ", role: "故障しても継続", sig: "冗長化で止めない", key: "耐故障" },
  { n: "マーケティングオートメーション", cat: "ストラテジ", role: "MA・営業を自動化", sig: "見込み客の獲得・育成", key: "RPAと区別" },
  { n: "データマイニング", cat: "ストラテジ", role: "規則性を発掘", sig: "大量データを分析", key: "隠れた相関を発見" },
  { n: "フィージビリティスタディ", cat: "ストラテジ", role: "実現可能性の調査", sig: "着手前に検証", key: "技術・採算を確認" },
  { n: "ニューラルネットワーク", cat: "最新技術", role: "脳を模したモデル", sig: "深層学習の基盤", key: "ディープラーニング" },
];

window.COMPARE_LINK = {
  "CSR": "kigyo-katsudo", "コーポレートガバナンス": "kigyo-katsudo", "損益分岐点": "kigyo-katsudo",
  "SWOT分析": "keiei-senryaku", "PPM": "keiei-senryaku", "4P": "keiei-senryaku", "コアコンピタンス": "keiei-senryaku",
  "MOT": "gijutsu-senryaku", "PoC": "gijutsu-senryaku",
  "ERP": "business-industry", "SCM": "business-industry", "CRM": "business-industry", "POS": "business-industry", "EDI": "business-industry",
  "SaaS": "system-senryaku", "IaaS": "system-senryaku", "BPR": "system-senryaku",
  "RFP": "system-kikaku",
  "著作権": "homu", "産業財産権": "homu",
  "QCD": "project-mgmt", "WBS": "project-mgmt", "クリティカルパス": "project-mgmt",
  "アジャイル": "kaihatsu-kanri", "スクラム": "kaihatsu-kanri",
  "回帰テスト": "kaihatsu-gijutsu",
  "ITIL": "service-mgmt", "SLA": "service-mgmt", "インシデント管理": "service-mgmt",
  "システム監査": "kansa", "職務分掌": "kansa",
  "スタック": "algorithm", "キュー": "algorithm", "2分探索": "algorithm", "コンパイラ": "algorithm",
  "XOR": "kiso-riron",
  "キャッシュメモリ": "computer-kosei", "RAM": "computer-kosei",
  "稼働率": "system-kosei", "仮想化": "system-kosei",
  "仮想記憶": "os-software", "絶対参照": "os-software",
  "主キー": "db-kiso", "外部キー": "db-kiso", "正規化": "db-kiso",
  "ACID": "db-transaction", "排他制御": "db-transaction", "コミット": "db-transaction",
  "ルータ": "network-kiso",
  "DNS": "network-protocol", "DHCP": "network-protocol", "NAT": "network-protocol", "HTTPS": "network-protocol", "IPv6": "network-protocol", "IMAP": "network-protocol",
  "CIA": "security-kiso", "ランサムウェア": "security-kiso", "ソーシャルエンジニアリング": "security-kiso", "SQLインジェクション": "security-kiso",
  "公開鍵暗号": "security-taisaku", "共通鍵暗号": "security-taisaku", "デジタル署名": "security-taisaku", "多要素認証": "security-taisaku", "DMZ": "security-taisaku", "ISMS": "security-taisaku",
  "機械学習": "newtech", "生成AI": "newtech", "IoT": "newtech", "DX": "newtech", "ブロックチェーン": "newtech", "RPA": "newtech",
  "エッジコンピューティング": "newtech", "5G": "newtech", "デジタルツイン": "newtech",
  "ユニバーサルデザイン": "hi-multimedia",
  "BSC": "keiei-senryaku", "不正競争防止法": "homu", "PL法": "homu", "DFD": "system-senryaku",
  "ガントチャート": "project-mgmt", "GPU": "computer-kosei", "NoSQL": "db-transaction",
  "MACアドレス": "network-kiso", "VPN": "network-protocol", "サブネットマスク": "network-protocol",
  "Cookie": "network-protocol", "MVNO": "network-protocol",
  "リスク対応": "security-kiso", "CSIRT": "security-kiso",
  "ハッシュ関数": "security-taisaku", "ゼロトラスト": "security-taisaku",
  "ペネトレーションテスト": "security-taisaku", "BYOD": "security-taisaku",
  "フェールセーフ": "system-kosei", "フールプルーフ": "system-kosei", "フォールトトレラント": "system-kosei",
  "マーケティングオートメーション": "keiei-senryaku", "データマイニング": "keiei-senryaku",
  "フィージビリティスタディ": "system-kikaku", "ニューラルネットワーク": "newtech",
};

window.VERSUS = [
  { q: "SaaS / PaaS / IaaS", items: [
      { n: "SaaS", w: "完成したソフトを使う（Webメール等）" },
      { n: "PaaS", w: "開発・実行環境を借りる（アプリは自作）" },
      { n: "IaaS", w: "サーバ等の基盤を借りる（OSから自分で）" },
    ], tip: "提供範囲が広い順に SaaS>PaaS>IaaS。自分で作る範囲は逆。" },
  { q: "共通鍵暗号 / 公開鍵暗号", items: [
      { n: "共通鍵", w: "暗号化・復号が同じ鍵。高速だが鍵配送問題" },
      { n: "公開鍵", w: "公開鍵で暗号化→秘密鍵で復号。配送問題を解決・低速" },
    ], tip: "SSL/TLSは両者を組み合わせるハイブリッド方式。" },
  { q: "デジタル署名の鍵の使い方", items: [
      { n: "署名する側", w: "送信者の秘密鍵で署名" },
      { n: "検証する側", w: "送信者の公開鍵で検証" },
    ], tip: "暗号化と鍵が逆。目的は真正性・完全性（機密性ではない）。" },
  { q: "インシデント管理 / 問題管理", items: [
      { n: "インシデント管理", w: "とにかく早くサービスを復旧" },
      { n: "問題管理", w: "根本原因を究明し再発を防止" },
    ], tip: "『まず復旧』か『再発防止』かで判断。" },
  { q: "派遣 / 請負", items: [
      { n: "派遣", w: "指揮命令は派遣先が行う" },
      { n: "請負", w: "指揮命令は請負業者が行う（注文主は成果を求める）" },
    ], tip: "注文主が請負作業者へ直接指示すると偽装請負(違法)。" },
  { q: "スタック / キュー", items: [
      { n: "スタック", w: "後入れ先出し(LIFO)。積んだ皿" },
      { n: "キュー", w: "先入れ先出し(FIFO)。待ち行列" },
    ], tip: "取り出す順序が逆。C,B,Aで出ればスタック。" },
  { q: "RFI / RFP", items: [
      { n: "RFI", w: "情報提供依頼（実績・技術の情報収集）" },
      { n: "RFP", w: "提案依頼（要件を示し提案書・見積り依頼）" },
    ], tip: "順序は RFI → RFP。RFIが先。" },
  { q: "ウォーターフォール / アジャイル", items: [
      { n: "ウォーターフォール", w: "後戻りせず順に。計画的だが変更に弱い" },
      { n: "アジャイル", w: "短い反復で動くものを育てる。変化に強い" },
    ], tip: "仕様変更が多いならアジャイル。" },
  { q: "POP / IMAP", items: [
      { n: "POP", w: "メールを端末にダウンロードして管理" },
      { n: "IMAP", w: "メールをサーバに残し複数端末で管理" },
    ], tip: "複数端末で見るならIMAP。送信は両方SMTP。" },
  { q: "DNS / DHCP", items: [
      { n: "DNS", w: "ドメイン名⇔IPアドレスの変換" },
      { n: "DHCP", w: "接続機器へIPアドレスを自動割当" },
    ], tip: "『名前解決』はDNS、『IP配布』はDHCP。" },
  { q: "著作権 / 産業財産権", items: [
      { n: "著作権", w: "無方式主義。登録不要で自動発生（死後70年）" },
      { n: "産業財産権", w: "方式主義。特許庁へ出願・登録が必要" },
    ], tip: "プログラムは著作権で保護、言語・アルゴリズムは対象外。" },
  { q: "MTBF / MTTR", items: [
      { n: "MTBF", w: "平均故障間隔（長いほど良い）" },
      { n: "MTTR", w: "平均修理時間（短いほど良い）" },
    ], tip: "稼働率 = MTBF ÷ (MTBF + MTTR)。" },
];
