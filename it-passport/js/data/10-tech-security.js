/* =============================================================
   コレダケITパスポート カリキュラム — 10 情報セキュリティ（テクノロジ系）
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "security-kiso", domain: "セキュリティ", icon: "🛡️", title: "情報セキュリティの脅威",
    intro: "iパス最重要分野。CIA、マルウェア、代表的な攻撃手法、リスクマネジメントを完全網羅。",
    understand: [
      {
        h: "情報セキュリティの3要素（CIA）",
        body: "<p>情報セキュリティが守るべき基本が<strong>CIA</strong>——<strong>機密性（Confidentiality：許可された人だけが見られる）・完全性（Integrity：情報が改ざんされず正しい）・可用性（Availability：使いたいときに使える）</strong>。この3つのバランスを保つことが目標だ。守る対象の価値ある情報が<strong>情報資産</strong>、それを脅かすものが<strong>脅威</strong>、脅威につけ込まれる弱点が<strong>脆弱性</strong>。『脅威が脆弱性を突いて情報資産に損害を与える可能性』が<strong>リスク</strong>だ。</p>",
        diagram:
          '<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans JP, sans-serif">\
<text x="260" y="24" fill="#2f6d97" font-size="12" font-weight="700" text-anchor="middle">情報セキュリティの3要素（CIA）</text>\
<rect x="30" y="50" width="150" height="120" rx="10" fill="#dce8f3" stroke="#4a7a4e"/><text x="105" y="80" fill="#4a7a4e" font-size="13" font-weight="700" text-anchor="middle">機密性</text><text x="105" y="104" fill="#23252b" font-size="10" text-anchor="middle">許可された人だけ</text><text x="105" y="122" fill="#23252b" font-size="10" text-anchor="middle">が閲覧できる</text><text x="105" y="150" fill="#6b6e76" font-size="9" text-anchor="middle">例:アクセス制御/暗号化</text>\
<rect x="188" y="50" width="150" height="120" rx="10" fill="#dce8f3" stroke="#c47f2f"/><text x="263" y="80" fill="#c47f2f" font-size="13" font-weight="700" text-anchor="middle">完全性</text><text x="263" y="104" fill="#23252b" font-size="10" text-anchor="middle">改ざんされず</text><text x="263" y="122" fill="#23252b" font-size="10" text-anchor="middle">正確である</text><text x="263" y="150" fill="#6b6e76" font-size="9" text-anchor="middle">例:ハッシュ/デジタル署名</text>\
<rect x="346" y="50" width="150" height="120" rx="10" fill="#dce8f3" stroke="#2f6d97"/><text x="421" y="80" fill="#2f6d97" font-size="13" font-weight="700" text-anchor="middle">可用性</text><text x="421" y="104" fill="#23252b" font-size="10" text-anchor="middle">使いたいときに</text><text x="421" y="122" fill="#23252b" font-size="10" text-anchor="middle">使える</text><text x="421" y="150" fill="#6b6e76" font-size="9" text-anchor="middle">例:冗長化/バックアップ</text>\
</svg>',
        cap: "CIA：機密性・完全性・可用性。3つのバランスを保つのが情報セキュリティの目標。",
      },
      {
        h: "マルウェアと不正アクセス",
        body: "<p>悪意あるソフトの総称が<strong>マルウェア</strong>。自己増殖してファイルに感染する<strong>ウイルス</strong>、単独で増殖し広がる<strong>ワーム</strong>、無害を装って侵入する<strong>トロイの木馬</strong>、キー入力を盗む<strong>キーロガー</strong>、感染するとファイルを暗号化して身代金を要求する<strong>ランサムウェア</strong>、活動を隠す<strong>スパイウェア</strong>など。人の心理的な隙を突いて情報を盗む手口が<strong>ソーシャルエンジニアリング</strong>（なりすまし電話・肩越しののぞき見・ゴミ箱あさりなど）で、技術ではなく人が標的だ。</p>",
      },
      {
        h: "代表的な攻撃手法",
        body: "<p>実在の企業を装ったメールで偽サイトへ誘導し情報を盗む<strong>フィッシング</strong>、特定の組織を狙い巧妙なメールで侵入する<strong>標的型攻撃</strong>、大量のアクセスでサービスを停止させる<strong>DoS/DDoS攻撃</strong>、Webの入力欄に不正なSQLを送りDBを操作する<strong>SQLインジェクション</strong>、掲示板等に罠のスクリプトを仕込む<strong>クロスサイトスクリプティング（XSS）</strong>、総当たりでパスワードを破る<strong>ブルートフォース攻撃</strong>、脆弱性が公表される前に突く<strong>ゼロデイ攻撃</strong>。手口と目的をセットで覚える。</p>",
      },
    ],
    memorize: [
      { k: "CIA", v: "機密性・完全性・可用性。情報セキュリティの3要素。" },
      { k: "リスクの3要素", v: "情報資産・脅威・脆弱性。脅威が脆弱性を突くとリスク顕在化。" },
      { k: "ランサムウェア", v: "ファイルを暗号化し身代金を要求するマルウェア。" },
      { k: "ソーシャルエンジニアリング", v: "技術でなく人の隙を突く（なりすまし・のぞき見・ゴミ箱あさり）。" },
      { k: "フィッシング", v: "偽メール・偽サイトで認証情報などを盗む。" },
      { k: "SQLインジェクション", v: "入力欄に不正なSQLを注入しDBを不正操作。" },
      { k: "DoS/DDoS", v: "大量アクセスでサービスを停止させる。可用性への攻撃。" },
    ],
    flashcards: [
      { q: "情報セキュリティの3要素CIAとは？", a: "機密性（Confidentiality）・完全性（Integrity）・可用性（Availability）。" },
      { q: "ランサムウェアの特徴は？", a: "感染するとファイルを暗号化し、復号と引き換えに金銭（身代金）を要求する。" },
      { q: "ソーシャルエンジニアリングとは？", a: "技術的手段ではなく、人の心理的な隙や行動につけ込んで情報を盗む手口。" },
      { q: "Webの入力欄から不正なSQL文を送り込みデータベースを操作する攻撃は？", a: "SQLインジェクション。" },
      { q: "リスクを構成する3要素は？", a: "情報資産・脅威・脆弱性。" },
    ],
    quiz: [
      {
        q: "情報セキュリティの3要素のうち、『情報が改ざんされず、正確かつ完全な状態に保たれていること』を表すものはどれか。",
        choices: ["機密性", "完全性", "可用性", "責任追跡性"],
        answer: 1,
        explain: "改ざんされず正確＝<strong>完全性(Integrity)</strong>。見られない=機密性、使える=可用性。",
      },
      {
        q: "感染したコンピュータ内のファイルを勝手に暗号化し、元に戻すことと引き換えに金銭を要求するマルウェアはどれか。",
        choices: ["ワーム", "スパイウェア", "ランサムウェア", "キーロガー"],
        answer: 2,
        explain: "暗号化して身代金を要求するのは<strong>ランサムウェア</strong>。",
      },
      {
        q: "パスワードを書いた紙をゴミ箱から拾ったり、入力を肩越しにのぞき見たりして情報を盗む行為の総称はどれか。",
        choices: ["フィッシング", "ソーシャルエンジニアリング", "SQLインジェクション", "DoS攻撃"],
        answer: 1,
        explain: "人の隙を突く非技術的な手口は<strong>ソーシャルエンジニアリング</strong>。",
      },
      {
        q: "多数のコンピュータから大量のアクセスを集中させ、標的のサーバをサービス停止に追い込む攻撃はどれか。",
        choices: ["SQLインジェクション", "クロスサイトスクリプティング", "DDoS攻撃", "フィッシング"],
        answer: 2,
        explain: "大量アクセスで可用性を奪うのは<strong>DDoS攻撃</strong>（分散型DoS）。",
      },
    ],
  },
  {
    id: "security-taisaku", domain: "セキュリティ", icon: "🔑", title: "暗号・認証とセキュリティ対策",
    intro: "共通鍵と公開鍵、デジタル署名、認証、ファイアウォール、ISMS。対策側の重要テーマ。",
    understand: [
      {
        h: "暗号——共通鍵と公開鍵",
        body: "<p>暗号方式は2種類。<strong>共通鍵暗号（対称鍵）</strong>は暗号化と復号に<strong>同じ鍵</strong>を使う。高速だが、相手にどう鍵を安全に渡すか（<strong>鍵配送問題</strong>）が課題。<strong>公開鍵暗号（非対称鍵）</strong>は<strong>公開鍵と秘密鍵のペア</strong>を使う。<strong>相手の公開鍵で暗号化すれば、対応する秘密鍵を持つ本人しか復号できない</strong>ので鍵配送問題を解決できる（ただし処理は遅い）。実際のSSL/TLSは、公開鍵で共通鍵を安全に渡し、以後は高速な共通鍵で通信する<strong>ハイブリッド方式</strong>だ。</p>",
        diagram:
          '<svg viewBox="0 0 580 170" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans JP, sans-serif">\
<text x="290" y="22" fill="#2f6d97" font-size="12" font-weight="700" text-anchor="middle">公開鍵暗号（受信者の鍵ペアを使う）</text>\
<rect x="30" y="60" width="110" height="50" rx="8" fill="#dce8f3" stroke="#c47f2f"/><text x="85" y="82" fill="#23252b" font-size="11" text-anchor="middle">送信者</text><text x="85" y="100" fill="#6b6e76" font-size="9" text-anchor="middle">相手の公開鍵で暗号化</text>\
<line x1="140" y1="85" x2="240" y2="85" stroke="#4a7a4e" stroke-width="2"/><text x="190" y="76" fill="#4a7a4e" font-size="10" text-anchor="middle">暗号文</text>\
<rect x="240" y="45" width="120" height="80" rx="8" fill="#dce8f3" stroke="#6b6e76"/><text x="300" y="70" fill="#23252b" font-size="10" text-anchor="middle">🔓公開鍵で暗号化</text><text x="300" y="92" fill="#23252b" font-size="10" text-anchor="middle">🔑秘密鍵で復号</text><text x="300" y="112" fill="#6b6e76" font-size="9" text-anchor="middle">ペアで対応</text>\
<line x1="360" y1="85" x2="450" y2="85" stroke="#4a7a4e" stroke-width="2"/>\
<rect x="450" y="60" width="110" height="50" rx="8" fill="#dce8f3" stroke="#2f6d97"/><text x="505" y="82" fill="#23252b" font-size="11" text-anchor="middle">受信者</text><text x="505" y="100" fill="#6b6e76" font-size="9" text-anchor="middle">自分の秘密鍵で復号</text>\
</svg>',
        cap: "公開鍵で暗号化→対応する秘密鍵でのみ復号。鍵を公開できるので配送問題を解決する。",
      },
      {
        h: "デジタル署名と認証",
        body: "<p><strong>デジタル署名</strong>は暗号の応用で、鍵の使い方が暗号と『逆』——<strong>送信者が自分の秘密鍵で署名し、受信者は送信者の公開鍵で検証</strong>する。これにより『確かに本人が送った（<strong>真正性</strong>）』『改ざんされていない（<strong>完全性</strong>）』を保証する（※中身を隠す＝機密性は目的ではない）。公開鍵が本物であることを第三者機関（<strong>認証局CA</strong>）が保証する仕組みが<strong>PKI（公開鍵基盤）</strong>だ。</p><p>本人確認が<strong>認証</strong>。<strong>知識（パスワード）・所持（ICカード・スマホ）・生体（指紋・顔）</strong>の異なる要素を組み合わせるのが<strong>多要素認証</strong>で、1要素より安全。一度の認証で複数サービスを使える<strong>シングルサインオン（SSO）</strong>、指紋・顔などの<strong>生体認証（バイオメトリクス）</strong>も頻出だ。</p>",
      },
      {
        h: "ネットワーク防御とISMS",
        body: "<p>不正な通信を遮断する<strong>ファイアウォール</strong>、外部公開サーバを内部LANから隔離する緩衝地帯<strong>DMZ</strong>、Webアプリへの攻撃を防ぐ<strong>WAF</strong>、侵入を検知する<strong>IDS</strong>／防ぐ<strong>IPS</strong>。組織として情報セキュリティを継続的に管理する仕組みが<strong>ISMS</strong>（国際規格ISO/IEC 27001）で、方針を定めた<strong>情報セキュリティポリシー</strong>のもとPDCAで運用する。人の不正は『動機・機会・正当化』がそろうと起きるという<strong>不正のトライアングル</strong>も押さえる。</p>",
      },
    ],
    memorize: [
      { k: "共通鍵暗号", v: "暗号化・復号が同じ鍵。高速だが鍵配送問題あり（例:AES）。" },
      { k: "公開鍵暗号", v: "公開鍵で暗号化→秘密鍵で復号。鍵配送問題を解決（例:RSA）。遅い。" },
      { k: "デジタル署名", v: "送信者の<strong>秘密鍵で署名</strong>→<strong>公開鍵で検証</strong>。真正性・完全性を保証（機密性ではない）。" },
      { k: "多要素認証", v: "知識・所持・生体の異なる要素を組み合わせる。" },
      { k: "PKI / 認証局(CA)", v: "公開鍵が本物だと第三者(CA)がデジタル証明書で保証。" },
      { k: "DMZ", v: "公開サーバを内部LANから隔離する緩衝地帯。" },
      { k: "ISMS", v: "組織の情報セキュリティ管理の仕組み(ISO/IEC 27001)。PDCAで運用。" },
    ],
    flashcards: [
      { q: "共通鍵暗号と公開鍵暗号の違いは？", a: "共通鍵は暗号化・復号に同じ鍵（高速・鍵配送問題）。公開鍵は公開鍵で暗号化・秘密鍵で復号（配送問題を解決・低速）。" },
      { q: "デジタル署名で使う鍵は？何を保証する？", a: "送信者の秘密鍵で署名し、受信者は送信者の公開鍵で検証。本人性（真正性）と改ざん検知（完全性）を保証する。" },
      { q: "多要素認証の『3要素』とは？", a: "知識（パスワード）・所持（ICカード等）・生体（指紋・顔）。" },
      { q: "公開鍵が本物であることを証明する第三者機関を何という？", a: "認証局（CA）。その仕組み全体がPKI（公開鍵基盤）。" },
      { q: "外部に公開するサーバを内部ネットワークから隔離する区画を何という？", a: "DMZ（非武装地帯）。" },
    ],
    quiz: [
      {
        q: "公開鍵暗号方式を用いて、送信者が受信者だけに読める形でデータを送りたい。暗号化に使う鍵として正しいものはどれか。",
        choices: ["送信者の秘密鍵", "送信者の公開鍵", "受信者の公開鍵", "受信者の秘密鍵"],
        answer: 2,
        explain: "受信者だけが復号できるようにするには<strong>受信者の公開鍵</strong>で暗号化する（復号は受信者の秘密鍵）。",
      },
      {
        q: "デジタル署名によって確認できることとして、適切なものはどれか。",
        choices: [
          "通信内容が第三者に読まれないこと（機密性）",
          "送信者が本人であり、内容が改ざんされていないこと",
          "サーバの処理速度が速いこと",
          "通信経路が最短であること",
        ],
        answer: 1,
        explain: "デジタル署名は<strong>真正性（本人性）と完全性（改ざん検知）</strong>を保証する。機密性（内容秘匿）は目的ではない。",
      },
      {
        q: "認証を強化するために、パスワード（知識）に加えてICカード（所持）と指紋（生体）を組み合わせる方式を何というか。",
        choices: ["シングルサインオン", "多要素認証", "共通鍵認証", "総当たり認証"],
        answer: 1,
        explain: "異なる種類の要素を組み合わせるのは<strong>多要素認証</strong>。1要素より安全性が高い。",
      },
      {
        q: "組織が情報セキュリティを継続的に維持・改善するためのマネジメントシステムを表すものはどれか。",
        choices: ["ISMS", "SLA", "MOT", "RPA"],
        answer: 0,
        explain: "情報セキュリティマネジメントの仕組みは<strong>ISMS</strong>（ISO/IEC 27001）。PDCAで運用する。",
      },
    ],
  }
);
