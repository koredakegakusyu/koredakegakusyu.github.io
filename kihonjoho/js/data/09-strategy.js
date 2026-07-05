/* =============================================================
   コレダケ基本情報 カリキュラム — 09 ストラテジ系
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-strategy", domain: "ストラテジ", icon: "♟️", title: "経営戦略・会計・法務",
    intro: "SWOT/PPM/BSC、損益分岐点、知的財産権と関連法規。ストラテジ系の得点源をまとめて。",
    understand: [
      {
        h: "経営戦略のフレームワークと業務システム",
        body:
          "<p>現状分析の<strong>SWOT</strong>（強み・弱み・機会・脅威）、事業の投資判断の<strong>PPM</strong>（花形・金のなる木・問題児・負け犬）、多面評価の<strong>BSC</strong>（財務・顧客・業務プロセス・学習と成長）。競争戦略は<strong>コストリーダーシップ・差別化・集中</strong>。</p>" +
          "<p>業務システムの略語：経営資源統合の<strong>ERP</strong>、供給連鎖の<strong>SCM</strong>、顧客関係の<strong>CRM</strong>、販売時点の<strong>POS</strong>、企業間データ交換の<strong>EDI</strong>。</p>",
      },
      {
        h: "会計（損益分岐点）",
        body:
          "<p>費用は2種類に分けて考えます。売上に比例して増える<strong>変動費</strong>（材料費など）と、売上に関係なく一定でかかる<strong>固定費</strong>（家賃など）です。</p>" +
          "<p>売上を上げていくと、最初は費用のほうが多くて赤字ですが、あるところで<strong>売上と費用がちょうど等しく（利益0に）</strong>なります。この売上高が<strong>損益分岐点</strong>で、ここを超えると黒字になります。</p>" +
          "<div class='point'><span><strong>損益分岐点売上高 ＝ 固定費 ÷ (1 − 変動費率)</strong>（変動費率＝変動費÷売上高）</span></div>",
        diagram:
          '<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">損益分岐点のしくみ</text>' +
          '<line x1="60" y1="185" x2="520" y2="185" stroke="#8a8577" stroke-width="1.5"/><line x1="60" y1="40" x2="60" y2="185" stroke="#8a8577" stroke-width="1.5"/>' +
          '<text x="52" y="44" fill="#6b6e76" font-size="11" text-anchor="end">金額</text><text x="518" y="205" fill="#6b6e76" font-size="11" text-anchor="end">売上高 →</text>' +
          '<path d="M280 118 L500 55 L500 80 Z" fill="#dcecdd" opacity="0.7"/>' +
          '<line x1="60" y1="185" x2="500" y2="55" stroke="#4a7fa8" stroke-width="3"/><text x="460" y="52" fill="#34567a" font-size="12" font-weight="700">売上高</text>' +
          '<line x1="60" y1="130" x2="500" y2="80" stroke="#c47f2f" stroke-width="3"/><text x="455" y="95" fill="#c47f2f" font-size="12" font-weight="700">総費用</text>' +
          '<line x1="60" y1="130" x2="500" y2="130" stroke="#b7ad99" stroke-width="1.3" stroke-dasharray="4 3"/><text x="70" y="125" fill="#8a6a1e" font-size="11" font-weight="700">固定費</text>' +
          '<circle cx="280" cy="118" r="7" fill="#4a7a4e"/><text x="292" y="114" fill="#4a7a4e" font-size="13" font-weight="800">損益分岐点</text><text x="292" y="132" fill="#6b6e76" font-size="11">売上＝費用（利益0）</text>' +
          '<text x="420" y="72" fill="#4a7a4e" font-size="12" font-weight="800">ここより右＝黒字</text>' +
          "</svg>",
        cap: "売上高の線と総費用の線が交わる点が損益分岐点。右へ行くほど利益（黒字）が広がる。",
      },
      {
        h: "法務（知的財産権・関連法規）",
        body:
          "<p><strong>著作権</strong>は登録不要で作成時に発生（プログラムも対象、ただしアルゴリズム・言語は対象外）。<strong>産業財産権</strong>（特許・実用新案・意匠・商標）は出願・登録が必要。</p>" +
          "<p>関連法規：<strong>不正アクセス禁止法</strong>、<strong>個人情報保護法</strong>、<strong>不正競争防止法</strong>（営業秘密）。派遣と請負は指揮命令者の違い（派遣＝派遣先、請負＝請負業者）で区別します。</p>",
      },
    ],
    memorize: [
      { k: "SWOT / PPM / BSC", v: "SWOT=強弱機脅。PPM=成長率×シェア。BSC=財務/顧客/業務/学習成長。" },
      { k: "ERP/SCM/CRM", v: "ERP=経営資源統合、SCM=供給連鎖、CRM=顧客関係管理。" },
      { k: "損益分岐点", v: "固定費 ÷ (1 − 変動費率)。超えれば黒字。" },
      { k: "著作権", v: "登録不要・作成時に発生。プログラムは対象、アルゴリズム/言語は対象外。" },
      { k: "産業財産権", v: "特許/実用新案/意匠/商標。出願・登録が必要。" },
      { k: "派遣 vs 請負", v: "指揮命令が派遣先＝派遣、請負業者＝請負。注文主の直接指示は偽装請負。" },
    ],
    flashcards: [
      { q: "損益分岐点売上高の求め方は？", a: "固定費 ÷ (1 − 変動費率)。変動費率＝変動費÷売上高。" },
      { q: "BSCの4つの視点は？", a: "財務・顧客・業務プロセス・学習と成長。" },
      { q: "著作権で保護されない対象は？", a: "アイデア・アルゴリズム・プログラム言語（表現は保護されるが考え方は対象外）。" },
      { q: "ERP・SCM・CRMの違いは？", a: "ERPは経営資源の統合管理、SCMは供給連鎖の最適化、CRMは顧客関係の管理。" },
    ],
    quiz: [
      {
        q: "固定費が600万円、変動費率が0.4のとき、損益分岐点売上高はいくらか。",
        choices: ["840万円", "1,000万円", "1,200万円", "1,500万円"],
        answer: 1,
        explain: "600 ÷ (1 − 0.4) ＝ 600 ÷ 0.6 ＝ <strong>1,000万円</strong>。",
      },
      {
        q: "企業の業績を、財務・顧客・業務プロセス・学習と成長の4つの視点から評価する手法はどれか。",
        choices: ["SWOT分析", "バランススコアカード(BSC)", "PPM", "3C分析"],
        answer: 1,
        explain: "4つの視点で評価するのは<strong>BSC（バランススコアカード）</strong>。",
      },
      {
        q: "著作権法に関する記述として適切なものはどれか。",
        choices: [
          "著作権を得るには登録が必要である",
          "プログラムは著作物だが、アルゴリズムやプログラム言語自体は保護されない",
          "保護期間は出願から20年である",
          "アイデアそのものが保護される",
        ],
        answer: 1,
        explain: "著作権は表現を守り<strong>プログラムは対象・アルゴリズム/言語は対象外</strong>。登録不要（作成時に発生）。",
      },
    ],
  },
  {
    id: "fe-syskikaku", domain: "ストラテジ", icon: "🧭", title: "システム戦略と最新技術",
    intro: "クラウド(SaaS/PaaS/IaaS)、BPR、調達、AI・DX・IoTなどの新技術。",
    understand: [
      {
        h: "システム戦略とクラウド",
        body:
          "<p>全社のIT方針が<strong>情報システム戦略</strong>、全体最適の設計思想が<strong>EA</strong>、業務を抜本再構築する<strong>BPR</strong>、外部委託の<strong>BPO</strong>。調達は情報収集の<strong>RFI</strong>→提案依頼の<strong>RFP</strong>の順です。</p>" +
          "<p>クラウドは借りる範囲で3種類。下図のとおり、<strong>IaaS</strong>（基盤）＜<strong>PaaS</strong>（開発環境）＜<strong>SaaS</strong>（完成ソフト）の順に事業者が用意する範囲が広がります。</p>",
        diagram:
          '<svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="310" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">IaaS・PaaS・SaaS の責任範囲</text>' +
          '<text x="145" y="52" fill="#34567a" font-size="14" font-weight="800" text-anchor="middle">IaaS</text>' +
          '<text x="310" y="52" fill="#8a6a1e" font-size="14" font-weight="800" text-anchor="middle">PaaS</text>' +
          '<text x="475" y="52" fill="#4a7a4e" font-size="14" font-weight="800" text-anchor="middle">SaaS</text>' +
          (function () {
            var layers = ["アプリ", "ミドルウェア", "OS", "サーバ/基盤"];
            var cols = [{ x: 60, userTop: 4 }, { x: 245, userTop: 1 }, { x: 430, userTop: 0 }];
            var w = 170, h = 36, gap = 4, y0 = 62, s = "";
            cols.forEach(function (c) {
              for (var i = 0; i < 4; i++) {
                var y = y0 + i * (h + gap);
                var isUser = i < c.userTop;
                s += '<rect x="' + c.x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" fill="' + (isUser ? "#34567a" : "#f4d3ac") + '" stroke="' + (isUser ? "#2a4864" : "#dda85f") + '"/>';
                s += '<text x="' + (c.x + w / 2) + '" y="' + (y + 23) + '" fill="' + (isUser ? "#fff" : "#6b4a24") + '" font-size="12" font-weight="600" text-anchor="middle">' + layers[i] + "</text>";
              }
            });
            return s;
          })() +
          '<rect x="130" y="222" width="18" height="14" rx="3" fill="#34567a"/><text x="154" y="234" fill="#23252b" font-size="11">利用者が管理</text>' +
          '<rect x="330" y="222" width="18" height="14" rx="3" fill="#f4d3ac" stroke="#dda85f"/><text x="354" y="234" fill="#23252b" font-size="11">事業者が管理</text>' +
          "</svg>",
        cap: "青（利用者管理）が多いIaaSほど自由、オレンジ（事業者管理）が多いSaaSほど手軽。",
      },
      {
        h: "AI・DXなどの最新技術",
        body:
          "<p><strong>AI</strong>の<strong>機械学習</strong>は、正解付きで学ぶ<strong>教師あり</strong>、構造を見つける<strong>教師なし</strong>、試行錯誤の<strong>強化学習</strong>。多層の<strong>ディープラーニング</strong>は<strong>ニューラルネットワーク</strong>を基盤とします。文章や画像を作る<strong>生成AI</strong>は誤り（ハルシネーション）に注意。</p>" +
          "<p>ほかに<strong>IoT</strong>（モノのネット接続）、<strong>ビッグデータ</strong>、<strong>DX</strong>（デジタルで事業変革）、<strong>RPA</strong>（定型作業の自動化）、<strong>ブロックチェーン</strong>など。</p>",
      },
    ],
    memorize: [
      { k: "SaaS/PaaS/IaaS", v: "SaaS=完成ソフト、PaaS=開発環境、IaaS=基盤。SaaSほど手軽、IaaSほど自由。" },
      { k: "RFI → RFP", v: "RFI=情報収集が先、RFP=提案依頼が後。" },
      { k: "BPR / BPO", v: "BPR=業務の抜本再構築、BPO=業務の外部委託。" },
      { k: "機械学習3分類", v: "教師あり(正解付き)/教師なし(構造発見)/強化学習(試行錯誤)。" },
      { k: "ディープラーニング", v: "多層ニューラルネットワーク。画像・音声認識で高精度。" },
      { k: "DX", v: "デジタル技術で事業・組織を変革し新たな価値を生む(単なる電子化ではない)。" },
    ],
    flashcards: [
      { q: "SaaS・PaaS・IaaSの提供範囲は？", a: "SaaSは完成ソフトまで、PaaSは開発環境まで、IaaSは基盤まで。SaaSが最も手軽、IaaSが最も自由。" },
      { q: "機械学習の教師ありと教師なしの違いは？", a: "教師ありは正解ラベル付きで学ぶ、教師なしはラベルなしでデータの構造・グループを見つける。" },
      { q: "ディープラーニングの基盤技術は？", a: "ニューラルネットワーク（脳の神経回路を模したモデル）。" },
      { q: "調達でRFIとRFPの順序は？", a: "RFI（情報収集）が先、RFP（提案依頼）が後。" },
    ],
    quiz: [
      {
        q: "利用者がOSやミドルウェアを含む開発・実行環境を借り、その上で自社アプリケーションを開発・運用するクラウドサービスの形態はどれか。",
        choices: ["SaaS", "PaaS", "IaaS", "オンプレミス"],
        answer: 1,
        explain: "開発・実行環境（プラットフォーム）を借りるのは<strong>PaaS</strong>。基盤のみはIaaS、完成ソフトはSaaS。",
      },
      {
        q: "正解となるラベルが付いた大量のデータを用いて学習し、入力に対する正しい出力を予測する機械学習の手法はどれか。",
        choices: ["教師なし学習", "教師あり学習", "強化学習", "転移学習"],
        answer: 1,
        explain: "ラベル付きデータで学ぶのは<strong>教師あり学習</strong>。",
      },
      {
        q: "DX（デジタルトランスフォーメーション）の説明として最も適切なものはどれか。",
        choices: [
          "紙の書類をスキャンして保存すること",
          "デジタル技術を活用して製品・サービスやビジネスモデルを変革し、新たな価値を生み出すこと",
          "社内PCを最新機種に置き換えること",
          "表計算ソフトで集計すること",
        ],
        answer: 1,
        explain: "DXは<strong>事業・組織の変革による価値創出</strong>。単なる電子化とは区別される。",
      },
    ],
  }
);
