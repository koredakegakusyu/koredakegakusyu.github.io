/* =============================================================
   コレダケ基本情報 カリキュラム — 07 情報セキュリティ
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-sec-threat", domain: "セキュリティ", icon: "🛡️", title: "脅威とリスクマネジメント",
    intro: "FE最重要分野。守るべきCIA、リスクの正体（資産・脅威・脆弱性）、リスク対応の4分類、マルウェアと攻撃手法を、図で一つずつ押さえる。",
    understand: [
      {
        h: "そもそも何を守る？——情報セキュリティの3要素（CIA）",
        body:
          "<p>情報セキュリティとは、ひとことでいえば<strong>「情報資産を安全に保つこと」</strong>です。では「安全」とは具体的に何がそろった状態か——それを3つの目標にまとめたものが<strong>CIA</strong>（それぞれの英語の頭文字）です。</p>" +
          "<ul>" +
          "<li><strong>機密性(Confidentiality)</strong>：許可された人だけが情報を見られる状態。<em>漏らさない</em>こと。例：暗号化、アクセス権の設定、パスワード。</li>" +
          "<li><strong>完全性(Integrity)</strong>：情報が正確で、勝手に書き換えられたり欠けたりしていない状態。<em>改ざんさせない</em>こと。例：デジタル署名、ハッシュ値による検証、バックアップ。</li>" +
          "<li><strong>可用性(Availability)</strong>：使いたいときにいつでも使える状態。<em>止めない</em>こと。例：機器の二重化（冗長化）、DoS攻撃対策、予備電源。</li>" +
          "</ul>" +
          "<p>この3つは時に対立します。機密性を上げようと手続きを厳しくしすぎると、今度は使いにくくなって可用性が落ちる、といった具合です。だから<strong>3つのバランスを取る</strong>ことが大切です。近年は、なりすましでない<strong>真正性</strong>、誰が操作したか追える<strong>責任追跡性</strong>、後で「やっていない」と言わせない<strong>否認防止</strong>、意図どおり動く<strong>信頼性</strong>を加えた<strong>7要素</strong>で語られることもあります。</p>",
        diagram:
          '<svg viewBox="0 0 580 300" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="24" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">情報セキュリティの3要素（CIA）</text>' +
          '<polygon points="290,102 118,240 462,240" fill="#eef4f9" stroke="#9db8cd" stroke-width="2"/>' +
          '<text x="290" y="200" fill="#6b6e76" font-size="12" font-weight="800" text-anchor="middle">情報資産を守る</text>' +
          '<rect x="198" y="40" width="184" height="56" rx="9" fill="#dce8f3" stroke="#4a7fa8"/>' +
          '<text x="290" y="62" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">機密性 (Confidentiality)</text>' +
          '<text x="290" y="82" fill="#34567a" font-size="10.5" text-anchor="middle">許可された人だけ見られる（漏らさない）</text>' +
          '<rect x="18" y="244" width="196" height="52" rx="9" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<text x="116" y="266" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">完全性 (Integrity)</text>' +
          '<text x="116" y="285" fill="#8a6a1e" font-size="10.5" text-anchor="middle">正確・改ざんされない</text>' +
          '<rect x="366" y="244" width="196" height="52" rx="9" fill="#dcecdd" stroke="#5c9160"/>' +
          '<text x="464" y="266" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">可用性 (Availability)</text>' +
          '<text x="464" y="285" fill="#3f7a45" font-size="10.5" text-anchor="middle">使いたいとき使える（止めない）</text>' +
          "</svg>",
        cap: "機密性・完全性・可用性の3つがそろって初めて「安全」。どれかを上げすぎると他が下がることもあり、バランスが要る。",
      },
      {
        h: "リスクの正体——情報資産・脅威・脆弱性",
        body:
          "<p>セキュリティの話に出てくる用語は、次の関係で整理すると一気に分かりやすくなります。</p>" +
          "<ul>" +
          "<li><strong>情報資産</strong>：守るべき対象。データやシステムだけでなく、<strong>紙の書類・人・設備</strong>も含みます。</li>" +
          "<li><strong>脅威</strong>：資産に損害を与える原因。<strong>物理的脅威</strong>（災害・故障・盗難）、<strong>技術的脅威</strong>（不正アクセス・マルウェア・盗聴）、<strong>人的脅威</strong>（操作ミス・内部不正・紛失）に分けられます。</li>" +
          "<li><strong>脆弱性</strong>：資産側にある弱点・欠陥。ソフトのバグ、弱いパスワード、施錠されていない部屋、教育不足などです。</li>" +
          "</ul>" +
          "<p>ここが肝心です。<strong>リスク</strong>とは「損害が実際に起きてしまう可能性」のことで、<strong>脅威が脆弱性を突いたときに初めて生まれます</strong>。強力な脅威があっても弱点（脆弱性）がなければ被害は出ませんし、弱点があっても狙う脅威がなければ損害は起きません。<strong>両方がそろって初めてリスク</strong>——だから対策は「脆弱性をふさぐ」か「脅威を遠ざける」のどちらか（または両方）になります。</p>",
        diagram:
          '<svg viewBox="0 0 580 175" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">リスクの成り立ち（脅威 × 脆弱性）</text>' +
          '<rect x="20" y="55" width="130" height="66" rx="8" fill="#f3ddcd" stroke="#c1855c"/>' +
          '<text x="85" y="82" fill="#23252b" font-size="13" font-weight="800" text-anchor="middle">脅威</text>' +
          '<text x="85" y="103" fill="#8a4626" font-size="10" text-anchor="middle">攻撃・災害・ミス</text>' +
          '<text x="186" y="80" fill="#a85733" font-size="10.5" font-weight="700" text-anchor="middle">突く</text>' +
          '<line x1="150" y1="90" x2="222" y2="90" stroke="#a85733" stroke-width="2"/><polygon points="222,90 212,85 212,95" fill="#a85733"/>' +
          '<rect x="225" y="55" width="150" height="66" rx="8" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<text x="300" y="82" fill="#23252b" font-size="13" font-weight="800" text-anchor="middle">脆弱性</text>' +
          '<text x="300" y="103" fill="#8a6a1e" font-size="10" text-anchor="middle">情報資産の弱点・欠陥</text>' +
          '<text x="411" y="80" fill="#c26b4a" font-size="10.5" font-weight="700" text-anchor="middle">生じる</text>' +
          '<line x1="375" y1="90" x2="447" y2="90" stroke="#c26b4a" stroke-width="2"/><polygon points="447,90 437,85 437,95" fill="#c26b4a"/>' +
          '<rect x="450" y="52" width="112" height="72" rx="8" fill="#f7dfd6" stroke="#c26b4a"/>' +
          '<text x="506" y="80" fill="#23252b" font-size="13" font-weight="800" text-anchor="middle">リスク</text>' +
          '<text x="506" y="100" fill="#b0532f" font-size="10" text-anchor="middle">損害が起きる</text>' +
          '<text x="506" y="113" fill="#b0532f" font-size="10" text-anchor="middle">可能性</text>' +
          '<text x="290" y="152" fill="#6b6e76" font-size="11" text-anchor="middle">脅威と脆弱性が「両方そろって」初めてリスクになる。片方だけなら損害は生じない。</text>' +
          "</svg>",
        cap: "脅威が脆弱性を突くとリスク（損害の可能性）が生まれる。対策は脆弱性をふさぐか脅威を遠ざけること。",
      },
      {
        h: "リスクマネジメントとリスク対応の4分類",
        body:
          "<p>洗い出したリスクにどう向き合うかを組織として管理するのが<strong>リスクマネジメント</strong>です。まず<strong>リスクアセスメント</strong>——<strong>リスク特定</strong>（洗い出す）→<strong>リスク分析</strong>（大きさ＝<em>発生確率×影響度</em>を見積る）→<strong>リスク評価</strong>（基準と照らして優先度をつける）——を行い、そのうえで<strong>リスク対応</strong>を選びます。</p>" +
          "<p>リスク対応は次の<strong>4分類</strong>です。どれを選ぶかは、下の図のように<strong>「影響度」と「発生確率」の組み合わせ</strong>で考えると分かりやすいです。</p>" +
          "<ul>" +
          "<li><strong>回避</strong>：リスクの原因そのものをやめる（危険な業務・技術を使わない）。影響も確率も大きいとき。</li>" +
          "<li><strong>低減（軽減）</strong>：対策を打って発生確率や影響を下げる。確率が高いが影響は限定的なとき。</li>" +
          "<li><strong>移転（共有）</strong>：保険や外部委託で損失を他者に引き受けてもらう。めったに起きないが起きると大打撃なとき。</li>" +
          "<li><strong>保有（受容）</strong>：許容範囲として受け入れる。影響も確率も小さいとき。</li>" +
          "</ul>" +
          "<p>対策をしても完全にはゼロにできず残るリスクを<strong>残留リスク</strong>といい、これは保有するのが基本です。</p>",
        diagram:
          '<svg viewBox="0 0 540 300" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="270" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">リスク対応の4分類（影響度 × 発生確率）</text>' +
          '<text x="34" y="62" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="middle">影響</text><text x="34" y="76" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="middle">大</text>' +
          '<text x="34" y="236" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="middle">影響</text><text x="34" y="250" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="middle">小</text>' +
          '<rect x="70" y="45" width="220" height="105" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<text x="180" y="90" fill="#23252b" font-size="16" font-weight="800" text-anchor="middle">移転</text>' +
          '<text x="180" y="113" fill="#8a6a1e" font-size="10.5" text-anchor="middle">保険・委託で他者へ</text>' +
          '<rect x="290" y="45" width="180" height="105" fill="#f7dfd6" stroke="#c26b4a"/>' +
          '<text x="380" y="90" fill="#23252b" font-size="16" font-weight="800" text-anchor="middle">回避</text>' +
          '<text x="380" y="113" fill="#b0532f" font-size="10.5" text-anchor="middle">原因をやめる・断つ</text>' +
          '<rect x="70" y="150" width="220" height="105" fill="#dcecdd" stroke="#5c9160"/>' +
          '<text x="180" y="195" fill="#23252b" font-size="16" font-weight="800" text-anchor="middle">保有</text>' +
          '<text x="180" y="218" fill="#3f7a45" font-size="10.5" text-anchor="middle">許容して受け入れる</text>' +
          '<rect x="290" y="150" width="180" height="105" fill="#dce8f3" stroke="#4a7fa8"/>' +
          '<text x="380" y="195" fill="#23252b" font-size="16" font-weight="800" text-anchor="middle">低減</text>' +
          '<text x="380" y="218" fill="#34567a" font-size="10.5" text-anchor="middle">対策で確率・影響を下げる</text>' +
          '<text x="180" y="278" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="middle">発生確率 低</text>' +
          '<text x="380" y="278" fill="#6b6e76" font-size="11" font-weight="700" text-anchor="middle">発生確率 高</text>' +
          "</svg>",
        cap: "影響度と発生確率の組み合わせで対応を選ぶ。影響大×確率高＝回避、影響大×確率低＝移転、影響小×確率高＝低減、影響小×確率低＝保有。",
      },
      {
        h: "マルウェア——悪意のあるソフトウェア",
        body:
          "<p>攻撃に使われる悪意あるソフトの総称が<strong>マルウェア</strong>です。感染・増殖のしかたで区別されます。</p>" +
          "<ul>" +
          "<li><strong>ウイルス</strong>：他のファイルやプログラムに<strong>寄生</strong>して感染・増殖する。単体では動けない。</li>" +
          "<li><strong>ワーム</strong>：寄生せず<strong>単体で自己増殖</strong>し、ネットワークを介して次々に広がる。</li>" +
          "<li><strong>トロイの木馬</strong>：便利なソフトを<strong>装って</strong>侵入し、裏で情報窃取や遠隔操作を行う。自己増殖はしない。</li>" +
          "<li><strong>ランサムウェア</strong>：ファイルを<strong>暗号化</strong>して使えなくし、復号と引き換えに<strong>身代金</strong>を要求する。</li>" +
          "<li><strong>スパイウェア</strong>：気づかれずに<strong>情報を盗み</strong>外部へ送信する。</li>" +
          "<li><strong>ボット</strong>：感染したPCを<strong>遠隔操作</strong>し踏み台化。多数集めた<strong>ボットネット</strong>でDDoS等に悪用する。</li>" +
          "<li><strong>ルートキット／バックドア</strong>：侵入の<strong>痕跡を隠す</strong>／再侵入用の<strong>裏口</strong>を作る。</li>" +
          "</ul>" +
          "<p>基本対策は、<strong>ウイルス対策ソフト＋定義ファイル（パターンファイル）の更新</strong>、<strong>OS・ソフトを最新に保つ</strong>、<strong>不審な添付・リンクを開かない</strong>こと。既知パターンに頼らず「怪しい振る舞い」で検知する<strong>ビヘイビア法（動的ヒューリスティック）</strong>もあります。</p>",
      },
      {
        h: "代表的な攻撃手法と、DoS/DDoSの仕組み",
        body:
          "<p>攻撃手法は数が多いので、<strong>ねらい別</strong>に整理すると覚えやすいです。</p>" +
          "<ul>" +
          "<li><strong>だます系</strong>：偽サイトへ誘導する<strong>フィッシング</strong>、特定組織を執拗に狙う<strong>標的型攻撃（APT）</strong>、人の隙・思い込みを突く<strong>ソーシャルエンジニアリング</strong>（肩越しの<em>ショルダーハック</em>やなりすまし電話など）。</li>" +
          "<li><strong>Webアプリを突く系</strong>：入力からDBを操作する<strong>SQLインジェクション</strong>、罠スクリプトを利用者に実行させる<strong>クロスサイトスクリプティング(XSS)</strong>、ログイン中の利用者になりすまして操作させる<strong>クロスサイトリクエストフォージェリ(CSRF)</strong>。</li>" +
          "<li><strong>パスワードを破る系</strong>：総当たりの<strong>ブルートフォース</strong>、よく使われる語を試す<strong>辞書攻撃</strong>、他所で漏れたID・パスワードの使い回しを突く<strong>パスワードリスト攻撃</strong>。</li>" +
          "<li><strong>盗み見る系</strong>：通信を傍受する<strong>盗聴</strong>、間に割り込む<strong>中間者攻撃(MITM)</strong>。</li>" +
          "<li><strong>そのほか</strong>：修正前の穴を突く<strong>ゼロデイ攻撃</strong>、取引先経由で本命を狙う<strong>サプライチェーン攻撃</strong>。</li>" +
          "</ul>" +
          "<p>サービスを止める攻撃が<strong>DoS攻撃</strong>で、大量のアクセスを送りつけてサーバを過負荷でダウンさせます。これを<strong>多数の乗っ取り端末（ボット）から一斉に</strong>行うのが<strong>DDoS攻撃</strong>です。攻撃者は直接手を下さず、感染させた大量のPC群（ボットネット）に指令を出すため、発信元をたどりにくいのが特徴です。</p>",
        diagram:
          '<svg viewBox="0 0 580 210" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">DDoS攻撃（ボットネットによる一斉攻撃）</text>' +
          '<rect x="18" y="82" width="96" height="52" rx="8" fill="#f3ddcd" stroke="#c1855c"/>' +
          '<text x="66" y="105" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">攻撃者</text>' +
          '<text x="66" y="123" fill="#8a4626" font-size="10" text-anchor="middle">指令を出す</text>' +
          '<line x1="114" y1="100" x2="228" y2="57" stroke="#c1855c" stroke-width="1.5"/>' +
          '<line x1="114" y1="107" x2="228" y2="107" stroke="#c1855c" stroke-width="1.5"/>' +
          '<line x1="114" y1="114" x2="228" y2="157" stroke="#c1855c" stroke-width="1.5"/>' +
          '<rect x="230" y="40" width="132" height="34" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="296" y="62" fill="#23252b" font-size="10.5" text-anchor="middle">🖥 乗っ取られたPC</text>' +
          '<rect x="230" y="90" width="132" height="34" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="296" y="112" fill="#23252b" font-size="10.5" text-anchor="middle">🖥 乗っ取られたPC</text>' +
          '<rect x="230" y="140" width="132" height="34" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="296" y="162" fill="#23252b" font-size="10.5" text-anchor="middle">🖥 乗っ取られたPC</text>' +
          '<text x="296" y="192" fill="#6b6e76" font-size="10" text-anchor="middle">ボットネット（多数の踏み台）</text>' +
          '<line x1="362" y1="57" x2="450" y2="98" stroke="#c26b4a" stroke-width="2"/><polygon points="450,98 440,95 443,105" fill="#c26b4a"/>' +
          '<line x1="362" y1="107" x2="450" y2="107" stroke="#c26b4a" stroke-width="2"/><polygon points="450,107 441,102 441,112" fill="#c26b4a"/>' +
          '<line x1="362" y1="157" x2="450" y2="118" stroke="#c26b4a" stroke-width="2"/><polygon points="450,118 440,113 443,123" fill="#c26b4a"/>' +
          '<rect x="452" y="74" width="110" height="66" rx="8" fill="#f7dfd6" stroke="#c26b4a"/>' +
          '<text x="507" y="100" fill="#23252b" font-size="12" font-weight="800" text-anchor="middle">標的サーバ</text>' +
          '<text x="507" y="120" fill="#b0532f" font-size="10" text-anchor="middle">過負荷で停止</text>' +
          "</svg>",
        cap: "攻撃者が多数の乗っ取り端末（ボット）に指令し、一斉に大量アクセスを送って標的をダウンさせるのがDDoS攻撃。",
      },
    ],
    memorize: [
      { k: "CIA（3要素）", v: "<strong>機密性</strong>(漏らさない)・<strong>完全性</strong>(改ざんさせない)・<strong>可用性</strong>(止めない)。" },
      { k: "拡張の4要素", v: "真正性・責任追跡性・否認防止・信頼性。CIAに加えると7要素。" },
      { k: "リスクの3要素", v: "情報資産・脅威・脆弱性。脅威が脆弱性を突くとリスク（損害の可能性）。" },
      { k: "脅威の分類", v: "物理的（災害・盗難）／技術的（不正アクセス・マルウェア）／人的（ミス・内部不正）。" },
      { k: "リスクアセスメント", v: "リスク特定→分析（発生確率×影響度）→評価（優先度づけ）。" },
      { k: "リスク対応4分類", v: "回避（原因をやめる）／低減（対策で下げる）／移転（保険等で他者へ）／保有（受容）。" },
      { k: "残留リスク", v: "対策後にも残るリスク。ゼロにできず、基本は保有する。" },
      { k: "ウイルス／ワーム", v: "ウイルス=他ファイルに寄生して感染。ワーム=単体で自己増殖して拡散。" },
      { k: "トロイの木馬", v: "正規ソフトを装って侵入し裏で悪事。自己増殖はしない。" },
      { k: "ランサムウェア", v: "ファイルを暗号化し身代金を要求。" },
      { k: "スパイウェア", v: "気づかれずに情報を盗み外部へ送信する。" },
      { k: "ボット／ボットネット", v: "遠隔操作される踏み台。多数集めてDDoS等に悪用。" },
      { k: "ルートキット／バックドア", v: "侵入の痕跡を隠す／再侵入用の裏口を作る。" },
      { k: "フィッシング", v: "偽サイトへ誘導しID・パスワード等をだまし取る。" },
      { k: "標的型攻撃(APT)", v: "特定の組織を狙い、多くはメールを起点に執拗に侵入する。" },
      { k: "SQLインジェクション", v: "入力欄に不正なSQLを注入しDBを不正操作。入力値の検証で防ぐ。" },
      { k: "XSS", v: "Webページに罠のスクリプトを埋め込み利用者のブラウザで実行させる。" },
      { k: "CSRF", v: "ログイン中の利用者になりすまし、意図しない操作を実行させる。" },
      { k: "パスワードリスト攻撃", v: "他所で漏れたID・パスワードの使い回しを突く。ブルートフォースとは別。" },
      { k: "DoS／DDoS", v: "大量アクセスでサービス停止。多数のボットから一斉に行うのがDDoS。" },
      { k: "ゼロデイ攻撃", v: "修正プログラム提供前の脆弱性を突く攻撃。" },
      { k: "サプライチェーン攻撃", v: "取引先・委託先など弱い所を経由して本命の組織を狙う。" },
      { k: "ソーシャルエンジニアリング", v: "技術でなく人の隙を突く（のぞき見・なりすまし電話など）。" },
    ],
    flashcards: [
      { q: "情報セキュリティの3要素CIAとは？", a: "機密性（許可された人だけ見られる）・完全性（改ざんされない）・可用性（使いたいとき使える）。" },
      { q: "リスクを構成する3要素と、リスクが生まれる条件は？", a: "情報資産・脅威・脆弱性。脅威が脆弱性を突いたときに損害の可能性＝リスクが生まれる。" },
      { q: "リスク対応の4分類は？", a: "回避（原因をやめる）・低減（対策で下げる）・移転（保険等で他者へ）・保有（受容）。" },
      { q: "リスクアセスメントの流れは？", a: "リスク特定→リスク分析（発生確率×影響度）→リスク評価（優先度づけ）。" },
      { q: "ウイルス・ワーム・トロイの木馬の違いは？", a: "ウイルスは他ファイルに寄生して感染、ワームは単体で自己増殖、トロイの木馬は正規ソフトを装い自己増殖しない。" },
      { q: "SQLインジェクションとXSSとCSRFの違いは？", a: "SQLインジェクションは入力からDBを不正操作、XSSは利用者ブラウザで罠スクリプト実行、CSRFはログイン中の利用者になりすまして操作させる。" },
      { q: "ブルートフォースとパスワードリスト攻撃の違いは？", a: "ブルートフォースは総当たり、パスワードリスト攻撃は他所で漏れたID・パスワードの使い回しを突く。" },
      { q: "DoSとDDoSの違いは？", a: "どちらも大量アクセスでサービスを止める攻撃。DDoSは多数の乗っ取り端末（ボットネット）から一斉に行う。" },
    ],
    quiz: [
      {
        q: "情報セキュリティのリスク対応のうち、保険への加入によって損失発生時の負担を第三者に引き受けてもらう方法はどれか。",
        choices: ["リスク回避", "リスク低減", "リスク移転", "リスク保有"],
        answer: 2,
        explain: "保険などで損失を他者へ移すのは<strong>リスク移転</strong>。",
      },
      {
        q: "Webアプリケーションの入力欄に不正な命令文を入力して、データベースを不正に操作する攻撃はどれか。",
        choices: ["クロスサイトスクリプティング", "SQLインジェクション", "DoS攻撃", "フィッシング"],
        answer: 1,
        explain: "入力からDBを不正操作するのは<strong>SQLインジェクション</strong>。入力値の検証（エスケープ）で防ぐ。",
      },
      {
        q: "ソフトウェアの脆弱性が発見されてから修正プログラムが提供されるまでの間に、その脆弱性を突いて行われる攻撃はどれか。",
        choices: ["ブルートフォース攻撃", "ゼロデイ攻撃", "リプレイ攻撃", "標的型攻撃"],
        answer: 1,
        explain: "修正提供前を突くのは<strong>ゼロデイ攻撃</strong>。",
      },
      {
        q: "情報セキュリティの3要素のうち、「必要なときにいつでもシステムやデータを利用できる」性質はどれか。",
        choices: ["機密性", "完全性", "可用性", "真正性"],
        answer: 2,
        explain: "止めずに使える性質は<strong>可用性(Availability)</strong>。冗長化やDoS対策で確保する。機密性=漏らさない、完全性=改ざんさせない。",
      },
      {
        q: "多数のコンピュータを不正に乗っ取ってボットネットを構成し、それらから標的のサーバへ一斉に大量のアクセスを送ってサービスを停止させる攻撃はどれか。",
        choices: ["SQLインジェクション", "DDoS攻撃", "フィッシング", "ゼロデイ攻撃"],
        answer: 1,
        explain: "多数の踏み台（ボットネット）から一斉に負荷をかけてサービスを止めるのは<strong>DDoS攻撃</strong>。単一発信元の場合はDoS攻撃。",
      },
      {
        q: "他のサイトから漏えいした利用者IDとパスワードの一覧を使い、利用者が同じ組合せを使い回している別のサイトへ不正ログインを試みる攻撃はどれか。",
        choices: ["ブルートフォース攻撃", "辞書攻撃", "パスワードリスト攻撃", "レインボーテーブル攻撃"],
        answer: 2,
        explain: "使い回しを突くのが<strong>パスワードリスト攻撃</strong>。総当たりのブルートフォースや辞書攻撃とは異なり、対策はパスワードの使い回しをやめ多要素認証を使うこと。",
      },
    ],
  },
  {
    id: "fe-sec-measure", domain: "セキュリティ", icon: "🔑", title: "暗号・認証とセキュリティ対策",
    intro: "共通鍵・公開鍵、デジタル署名、認証、ファイアウォール、ISMS。対策側の重要テーマ。",
    understand: [
      {
        h: "そもそも「暗号」とは？——平文・暗号文・鍵",
        body:
          "<p>そのまま読める文章を<strong>平文（ひらぶん）</strong>、他人に読めないよう変換したものを<strong>暗号文</strong>といいます。平文を暗号文にすることが<strong>暗号化</strong>、元に戻すことが<strong>復号</strong>です。</p>" +
          "<p>このとき変換のカギになる秘密の値が<strong>鍵（かぎ）</strong>。鍵を知らない人は、たとえ暗号文を盗み見ても中身が分かりません。</p>" +
          "<p>暗号には大きく<strong>2つの方式</strong>があります。<strong>「暗号化と復号で同じ鍵を使う」共通鍵暗号</strong>と、<strong>「別々の鍵を使う」公開鍵暗号</strong>です。まずこの違いを、鍵の使い方の図でしっかり押さえましょう。</p>",
        diagram:
          '<svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<rect x="30" y="55" width="120" height="46" rx="8" fill="#eef4f9" stroke="#9db8cd"/><text x="90" y="75" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">平文</text><text x="90" y="92" fill="#6b6e76" font-size="10" text-anchor="middle">読める文章</text>' +
          '<text x="222" y="60" fill="#a85733" font-size="11" font-weight="700" text-anchor="middle">🔑暗号化</text><line x1="150" y1="78" x2="290" y2="78" stroke="#a85733" stroke-width="2"/><polygon points="290,78 280,73 280,83" fill="#a85733"/>' +
          '<rect x="290" y="55" width="120" height="46" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="350" y="75" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">暗号文</text><text x="350" y="92" fill="#6b6e76" font-size="10" text-anchor="middle">読めない</text>' +
          '<text x="482" y="60" fill="#4a7a4e" font-size="11" font-weight="700" text-anchor="middle">🔑復号</text><line x1="410" y1="78" x2="470" y2="78" stroke="#4a7a4e" stroke-width="2"/><polygon points="470,78 460,73 460,83" fill="#4a7a4e"/>' +
          '<rect x="470" y="55" width="80" height="46" rx="8" fill="#eef4f9" stroke="#9db8cd"/><text x="510" y="82" fill="#23252b" font-size="13" font-weight="700" text-anchor="middle">平文</text>' +
          '<text x="280" y="128" fill="#6b6e76" font-size="11" text-anchor="middle">鍵を持つ人だけが暗号化・復号できる。「どんな鍵を使うか」で方式が分かれる。</text>' +
          "</svg>",
        cap: "平文→（暗号化）→暗号文→（復号）→平文。カギになるのが「鍵」。",
      },
      {
        h: "① 共通鍵暗号（対称鍵）——同じ鍵で施錠・解錠",
        body:
          "<p><strong>共通鍵暗号</strong>は、暗号化にも復号にも<strong>まったく同じ1本の鍵</strong>を使います（対称鍵ともいう）。仕組みが単純なので<strong>処理が速く</strong>、大量のデータの暗号化に向きます。代表例が<strong>AES</strong>です。</p>" +
          "<p>ただし弱点があります。受信者にも同じ鍵が必要なので、<strong>その鍵をどうやって安全に相手へ渡すか</strong>が問題になります。鍵を盗まれたら誰でも復号できてしまうからです。これを<strong>鍵配送問題</strong>といいます。</p>" +
          "<p>さらに、通信相手が増えるほど<strong>相手ごとに別々の鍵</strong>が必要になり、鍵の数が急増して管理が大変になります。</p>",
        diagram:
          '<svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#8a6a1e" font-size="14" font-weight="800" text-anchor="middle">共通鍵暗号（両者が同じ鍵）</text>' +
          '<rect x="20" y="55" width="110" height="60" rx="8" fill="#f3ddcd" stroke="#c1855c"/><text x="75" y="80" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">送信者</text><text x="75" y="100" fill="#8a6a1e" font-size="16" text-anchor="middle">🔑 鍵A</text>' +
          '<text x="200" y="72" fill="#8a6a1e" font-size="11" font-weight="700" text-anchor="middle">鍵Aで暗号化</text><line x1="130" y1="85" x2="255" y2="85" stroke="#b28a2e" stroke-width="2"/><polygon points="255,85 245,80 245,90" fill="#b28a2e"/>' +
          '<rect x="235" y="60" width="110" height="50" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="290" y="90" fill="#23252b" font-size="12" text-anchor="middle">暗号文</text>' +
          '<text x="405" y="72" fill="#8a6a1e" font-size="11" font-weight="700" text-anchor="middle">鍵Aで復号</text><line x1="345" y1="85" x2="450" y2="85" stroke="#b28a2e" stroke-width="2"/><polygon points="450,85 440,80 440,90" fill="#b28a2e"/>' +
          '<rect x="450" y="55" width="110" height="60" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="505" y="80" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">受信者</text><text x="505" y="100" fill="#8a6a1e" font-size="16" text-anchor="middle">🔑 鍵A</text>' +
          '<text x="290" y="150" fill="#a85733" font-size="11" font-weight="700" text-anchor="middle">⚠ 同じ鍵Aを相手にどう安全に渡すかが課題（＝鍵配送問題）</text>' +
          "</svg>",
        cap: "暗号化も復号も同じ鍵A。高速だが、その鍵を安全に共有する方法が課題（鍵配送問題）。",
      },
      {
        h: "② 公開鍵暗号（非対称鍵）——鍵配送問題を解決",
        body:
          "<p><strong>公開鍵暗号</strong>は、<strong>ペアになった2つの鍵</strong>を使います。<strong>公開鍵</strong>（誰に配ってもよい）と<strong>秘密鍵</strong>（本人だけが持つ）です。この2つは対応していて、<strong>公開鍵で施錠したものは、対応する秘密鍵でしか開けられません</strong>（その逆も）。代表例が<strong>RSA</strong>です。</p>" +
          "<p>これで鍵配送問題が解決します。送りたい人は<strong>受信者が公開している公開鍵</strong>で暗号化して送るだけ。復号できるのは<strong>秘密鍵を持つ受信者本人だけ</strong>なので、途中で暗号文を盗まれても安全です。公開鍵は盗まれても問題ありません（復号には使えないから）。</p>" +
          "<p>弱点は<strong>処理が遅い</strong>こと。そこで実際の通信では、次のハイブリッド方式で使い分けます。</p>",
        diagram:
          '<svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#34567a" font-size="14" font-weight="800" text-anchor="middle">公開鍵暗号（受信者の鍵ペアを使う）</text>' +
          '<rect x="20" y="55" width="110" height="60" rx="8" fill="#f3ddcd" stroke="#c1855c"/><text x="75" y="80" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">送信者</text><text x="75" y="100" fill="#34567a" font-size="13" text-anchor="middle">🔑受信者の公開鍵</text>' +
          '<text x="200" y="72" fill="#34567a" font-size="11" font-weight="700" text-anchor="middle">公開鍵で暗号化</text><line x1="130" y1="85" x2="255" y2="85" stroke="#4a7fa8" stroke-width="2"/><polygon points="255,85 245,80 245,90" fill="#4a7fa8"/>' +
          '<rect x="235" y="60" width="110" height="50" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="290" y="90" fill="#23252b" font-size="12" text-anchor="middle">暗号文</text>' +
          '<text x="405" y="72" fill="#34567a" font-size="11" font-weight="700" text-anchor="middle">秘密鍵で復号</text><line x1="345" y1="85" x2="450" y2="85" stroke="#4a7fa8" stroke-width="2"/><polygon points="450,85 440,80 440,90" fill="#4a7fa8"/>' +
          '<rect x="450" y="55" width="110" height="60" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="505" y="80" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">受信者</text><text x="505" y="100" fill="#34567a" font-size="13" text-anchor="middle">🔑本人の秘密鍵</text>' +
          '<text x="290" y="150" fill="#4a7a4e" font-size="11" font-weight="700" text-anchor="middle">✓ 公開鍵は配ってOK。復号できるのは秘密鍵を持つ受信者だけ</text>' +
          "</svg>",
        cap: "受信者の公開鍵で暗号化→受信者の秘密鍵でのみ復号。鍵を安全に配れる（鍵配送問題を解決）。",
      },
      {
        h: "③ ハイブリッド方式（SSL/TLS）——いいとこ取り",
        body:
          "<p>共通鍵は<strong>速いが鍵配送が課題</strong>、公開鍵は<strong>安全に鍵を配れるが遅い</strong>。そこで両方の長所を組み合わせたのが<strong>ハイブリッド方式</strong>で、Webの<strong>HTTPS（SSL/TLS）</strong>で使われています。</p>" +
          "<p>手順は2段階です。まず<strong>公開鍵暗号を使って「共通鍵」を安全に相手へ渡し</strong>、その後は<strong>速い共通鍵暗号で本文を大量にやり取り</strong>します。鍵配送だけ公開鍵、本文は共通鍵、という賢い使い分けです。</p>",
        diagram:
          '<svg viewBox="0 0 580 175" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">ハイブリッド方式（HTTPSの仕組み）</text>' +
          '<rect x="40" y="45" width="500" height="52" rx="9" fill="#dce8f3" stroke="#4a7fa8"/><text x="60" y="66" fill="#34567a" font-size="12" font-weight="800">① 公開鍵暗号で</text><text x="60" y="86" fill="#23252b" font-size="12">「共通鍵」を安全に相手へ渡す（遅いが安全）</text>' +
          '<rect x="40" y="105" width="500" height="52" rx="9" fill="#f2e7cd" stroke="#b28a2e"/><text x="60" y="126" fill="#7a5e17" font-size="12" font-weight="800">② 以後は共通鍵暗号で</text><text x="60" y="146" fill="#23252b" font-size="12">本文を高速に大量にやり取りする（速い）</text>' +
          "</svg>",
        cap: "鍵の受け渡しだけ公開鍵（安全）、本文は共通鍵（高速）。両者の長所を活かす。",
      },
      {
        h: "④ ハッシュ関数——改ざんを見抜く一方向の変換",
        body:
          "<p><strong>ハッシュ関数</strong>は、どんな長さのデータからでも<strong>決まった長さの短い値（ハッシュ値）</strong>を作り出す関数です。同じ入力からは必ず同じ値が出ますが、<strong>ハッシュ値から元のデータは復元できません（一方向）</strong>。また、入力が1文字でも変わると値が大きく変わります。</p>" +
          "<p>この性質を使い、送信前と受信後のハッシュ値を比べれば<strong>途中で改ざんされていないか</strong>を確認できます。パスワードを平文で保存せず<strong>ハッシュ値で保存</strong>する用途にも使われます（漏れても元のパスワードが分からない）。暗号と違い、ハッシュは<strong>元に戻すことが目的ではない</strong>点に注意します。</p>",
        diagram:
          '<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">ハッシュ関数（一方向・固定長）</text>' +
          '<rect x="20" y="45" width="150" height="30" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="95" y="65" fill="#23252b" font-size="11" text-anchor="middle">短い文（数十文字）</text>' +
          '<rect x="20" y="82" width="150" height="44" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="95" y="108" fill="#23252b" font-size="11" text-anchor="middle">長い文書（数万文字）</text>' +
          '<rect x="220" y="60" width="120" height="50" rx="9" fill="#f3ddcd" stroke="#c1855c"/><text x="280" y="90" fill="#8a4626" font-size="12" font-weight="800" text-anchor="middle">ハッシュ関数</text>' +
          '<line x1="170" y1="60" x2="218" y2="80" stroke="#a85733" stroke-width="2"/><line x1="170" y1="104" x2="218" y2="90" stroke="#a85733" stroke-width="2"/>' +
          '<line x1="340" y1="85" x2="410" y2="85" stroke="#a85733" stroke-width="2"/><polygon points="410,85 400,80 400,90" fill="#a85733"/>' +
          '<rect x="410" y="62" width="150" height="46" rx="6" fill="#dcecdd" stroke="#5c9160"/><text x="485" y="82" fill="#23252b" font-size="11" font-weight="700" text-anchor="middle">固定長のハッシュ値</text><text x="485" y="99" fill="#6b6e76" font-size="10" text-anchor="middle">例: a1b2c3…（常に同じ長さ）</text>' +
          '<text x="290" y="150" fill="#a85733" font-size="11" font-weight="700" text-anchor="middle">→ 戻せない（一方向）。1文字違えば値が激変 → 改ざん検知に使う</text>' +
          "</svg>",
        cap: "入力の長さに関係なく固定長の値を生成。元に戻せず、改ざん検知やパスワード保存に使う。",
      },
      {
        h: "⑤ デジタル署名——「本人が作った・改ざんされていない」の証明",
        body:
          "<p><strong>デジタル署名</strong>は公開鍵暗号の応用で、<strong>鍵の使い方が暗号と逆</strong>になります。送信者は<strong>自分の秘密鍵</strong>で文書に署名し、受信者は<strong>送信者の公開鍵</strong>で検証します。</p>" +
          "<p>秘密鍵を持つのは本人だけなので、公開鍵で正しく検証できれば<strong>「確かにその人が作った」（真正性）</strong>と分かります。さらに署名にはハッシュ値が使われ、<strong>「途中で改ざんされていない」（完全性）</strong>も確認できます。ただし<strong>中身を隠す（機密性）は目的ではない</strong>点に注意（暗号とは目的が違う）。</p>" +
          "<p>その公開鍵が本当に本人のものかを第三者機関<strong>認証局(CA)</strong>が<strong>デジタル証明書</strong>で保証します。この仕組み全体が<strong>PKI（公開鍵基盤）</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 580 175" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">デジタル署名（暗号と鍵が逆）</text>' +
          '<rect x="20" y="50" width="120" height="66" rx="8" fill="#f3ddcd" stroke="#c1855c"/><text x="80" y="74" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">送信者</text><text x="80" y="94" fill="#a85733" font-size="12" text-anchor="middle">🔑自分の秘密鍵</text><text x="80" y="110" fill="#6b6e76" font-size="10" text-anchor="middle">で署名</text>' +
          '<line x1="140" y1="83" x2="240" y2="83" stroke="#a85733" stroke-width="2"/><polygon points="240,83 230,78 230,88" fill="#a85733"/>' +
          '<rect x="230" y="58" width="120" height="50" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="290" y="80" fill="#23252b" font-size="11" text-anchor="middle">署名付き文書</text><text x="290" y="97" fill="#6b6e76" font-size="10" text-anchor="middle">文書＋署名</text>' +
          '<line x1="350" y1="83" x2="440" y2="83" stroke="#4a7a4e" stroke-width="2"/><polygon points="440,83 430,78 430,88" fill="#4a7a4e"/>' +
          '<rect x="440" y="50" width="120" height="66" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="500" y="74" fill="#23252b" font-size="12" font-weight="700" text-anchor="middle">受信者</text><text x="500" y="94" fill="#4a7a4e" font-size="12" text-anchor="middle">🔑送信者の公開鍵</text><text x="500" y="110" fill="#6b6e76" font-size="10" text-anchor="middle">で検証</text>' +
          '<text x="290" y="150" fill="#4a7a4e" font-size="11" font-weight="700" text-anchor="middle">✓ 検証OK＝本人が作った（真正性）＋改ざんなし（完全性）。※中身は隠さない</text>' +
          "</svg>",
        cap: "送信者の秘密鍵で署名→公開鍵で検証。本人性と改ざん検知を保証（機密性は対象外）。",
      },
      {
        h: "認証——「本人であること」を確かめる",
        body:
          "<p>利用者が本人かどうかを確かめるのが<strong>認証</strong>。確かめ方は3つの要素に分けられます。</p>" +
          "<ul>" +
          "<li><strong>知識</strong>：本人だけが知っていること（パスワード・暗証番号）。</li>" +
          "<li><strong>所持</strong>：本人だけが持っているもの（ICカード・スマホ・ワンタイムパスワード）。</li>" +
          "<li><strong>生体</strong>：本人の身体的特徴（指紋・顔・虹彩）。</li>" +
          "</ul>" +
          "<p>これらのうち<strong>異なる2つ以上を組み合わせる</strong>のが<strong>多要素認証</strong>で、1つより格段に安全です（パスワードが漏れても、スマホや指紋がなければ突破できない）。一度の認証で複数のサービスを使える<strong>シングルサインオン(SSO)</strong>もよく問われます。</p>",
      },
      {
        h: "ネットワーク防御とISMS",
        body:
          "<p>通信の出入りを制御する<strong>ファイアウォール</strong>、外部に公開するサーバを内部LANから隔離する緩衝地帯<strong>DMZ</strong>、Webアプリへの攻撃(SQLインジェクション等)を防ぐ<strong>WAF</strong>、侵入を検知する<strong>IDS</strong>・検知して遮断する<strong>IPS</strong>で多層的に守ります。</p>" +
          "<p>技術だけでなく組織として守る仕組みが<strong>ISMS</strong>（ISO/IEC 27001）。基本方針を定めた<strong>情報セキュリティポリシー</strong>のもと<strong>PDCA</strong>を回して継続的に改善します。事故発生時に対応する専門チームが<strong>CSIRT</strong>です。</p>",
      },
    ],
    memorize: [
      { k: "平文 / 暗号文", v: "平文=読める文章。暗号文=変換して読めなくしたもの。戻すのが復号。" },
      { k: "共通鍵暗号", v: "暗号化・復号が<strong>同じ鍵</strong>。高速だが<strong>鍵配送問題</strong>。例:AES。" },
      { k: "公開鍵暗号", v: "<strong>公開鍵で暗号化→秘密鍵で復号</strong>。鍵配送問題を解決・低速。例:RSA。" },
      { k: "鍵配送問題", v: "共通鍵をどう安全に相手へ渡すかという課題。公開鍵暗号で解決。" },
      { k: "ハイブリッド方式", v: "公開鍵で共通鍵を渡し、以後は共通鍵で通信(SSL/TLS/HTTPS)。" },
      { k: "ハッシュ関数", v: "任意長→固定長、<strong>一方向(戻せない)</strong>。改ざん検知・パスワード保存。" },
      { k: "デジタル署名", v: "送信者の<strong>秘密鍵で署名→公開鍵で検証</strong>。本人性・改ざん検知（機密性ではない）。" },
      { k: "PKI / 認証局(CA)", v: "公開鍵の正当性をCAが<strong>デジタル証明書</strong>で保証する仕組み。" },
      { k: "認証の3要素", v: "知識(パスワード)・所持(ICカード)・生体(指紋)。2つ以上で多要素認証。" },
      { k: "多要素認証", v: "異なる要素を組合せ。1要素より格段に安全。" },
      { k: "シングルサインオン(SSO)", v: "一度の認証で複数のサービスを利用できる。" },
      { k: "DMZ", v: "公開サーバを内部LANから隔離する緩衝地帯。" },
      { k: "IDS / IPS / WAF", v: "IDS=侵入検知、IPS=検知＋遮断、WAF=Webアプリ防御。" },
      { k: "ISMS", v: "組織の情報セキュリティ管理の仕組み(ISO/IEC 27001)。PDCAで運用。" },
    ],
    flashcards: [
      { q: "共通鍵暗号と公開鍵暗号の鍵の使い方の違いは？", a: "共通鍵は暗号化・復号に同じ鍵1本。公開鍵は受信者の公開鍵で暗号化し、受信者の秘密鍵で復号する（別々の鍵）。" },
      { q: "鍵配送問題とは？どの方式が解決する？", a: "共通鍵を相手にどう安全に渡すかという課題。公開鍵暗号（公開鍵は配ってよい）が解決する。" },
      { q: "ハイブリッド方式(SSL/TLS)の仕組みは？", a: "公開鍵暗号で共通鍵を安全に渡し、以後は高速な共通鍵暗号で本文をやり取りする。" },
      { q: "デジタル署名で使う鍵と、保証できることは？", a: "送信者の秘密鍵で署名し、送信者の公開鍵で検証。本人性(真正性)と改ざん検知(完全性)を保証する（機密性は目的でない）。" },
      { q: "ハッシュ関数の性質と用途は？", a: "任意長のデータから固定長の値を生成し、元に戻せない（一方向）。改ざん検知やパスワード保存に使う。" },
      { q: "認証の3要素とは？", a: "知識（パスワード）・所持（ICカード等）・生体（指紋等）。2つ以上を組み合わせると多要素認証。" },
      { q: "ISMSとは？", a: "組織の情報セキュリティを継続的に管理する仕組み（ISO/IEC 27001）。PDCAで運用。" },
    ],
    quiz: [
      {
        q: "公開鍵暗号方式で、受信者だけが復号できるように送信者がデータを暗号化するときに使う鍵はどれか。",
        choices: ["送信者の秘密鍵", "送信者の公開鍵", "受信者の公開鍵", "受信者の秘密鍵"],
        answer: 2,
        explain: "受信者だけが復号できるようにするには<strong>受信者の公開鍵</strong>で暗号化（復号は受信者の秘密鍵）。",
      },
      {
        q: "デジタル署名によって確認できることとして適切なものはどれか。",
        choices: [
          "通信内容が第三者に読まれないこと",
          "送信者が本人であり、内容が改ざんされていないこと",
          "通信経路が最短であること",
          "サーバの処理が速いこと",
        ],
        answer: 1,
        explain: "デジタル署名は<strong>本人性(真正性)と改ざん検知(完全性)</strong>を保証する。機密性は目的でない。",
      },
      {
        q: "任意の長さのデータから固定長の値を生成し、元のデータの復元が困難で、改ざん検知に利用される関数はどれか。",
        choices: ["共通鍵", "ハッシュ関数", "公開鍵", "乱数"],
        answer: 1,
        explain: "固定長の値を生成し逆算困難なのは<strong>ハッシュ関数</strong>。",
      },
    ],
  }
);
