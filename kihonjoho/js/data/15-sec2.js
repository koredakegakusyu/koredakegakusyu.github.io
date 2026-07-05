/* =============================================================
   コレダケ基本情報 カリキュラム — 15 セキュリティ管理・攻撃と防御
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "fe-secmgmt", domain: "セキュリティ", icon: "🧯", title: "情報セキュリティ管理",
    intro: "リスクアセスメント、ISMS、BCP、CSIRT、セキュリティポリシー。組織で守る仕組み。",
    understand: [
      {
        h: "リスクマネジメントとISMS",
        body:
          "<p><strong>リスクアセスメント</strong>は、資産・脅威・脆弱性を洗い出し、リスクの大きさを評価する一連の流れ（特定→分析→評価）。その後、<strong>回避・低減・移転・保有</strong>の4対応を選びます。</p>" +
          "<p>組織として情報セキュリティを継続的に管理する仕組みが<strong>ISMS</strong>（ISO/IEC 27001）。方針を定めた<strong>情報セキュリティポリシー</strong>のもと、<strong>PDCA</strong>で運用・改善します。</p>",
      },
      {
        h: "事業継続・事故対応",
        body:
          "<p>災害や大障害でも事業を続ける・早く復旧するための計画が<strong>BCP（事業継続計画）</strong>、その運用管理が<strong>BCM</strong>です。復旧の目標を表す2つの指標が混同されやすいので、<strong>障害発生の瞬間</strong>を基準にした時間軸で区別します。</p>" +
          "<ul>" +
          "<li><strong>RTO（目標復旧時間）</strong>：障害発生から<strong>いつまでに復旧させるか</strong>（＝止まっている時間の許容値）。障害の<strong>後ろ</strong>を見る。</li>" +
          "<li><strong>RPO（目標復旧時点）</strong>：<strong>どの時点までのデータを戻すか</strong>（＝失ってよいデータ量）。障害の<strong>前</strong>を見る。RPOを短くするほどバックアップ頻度を上げる必要がある。</li>" +
          "</ul>" +
          "<p>セキュリティ事故が起きたときに対応する専門チームが<strong>CSIRT</strong>、監視・分析を担うのが<strong>SOC</strong>。事故の原因究明のため証拠を保全・分析する技術が<strong>ディジタルフォレンジックス</strong>です。</p>",
        diagram:
          '<svg viewBox="0 0 560 195" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="280" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">RPO と RTO（障害を挟んだ時間軸）</text>' +
          '<line x1="40" y1="115" x2="520" y2="115" stroke="#8a8f98" stroke-width="2"/><polygon points="520,115 511,110 511,120" fill="#8a8f98"/><text x="516" y="134" fill="#6b6e76" font-size="9" text-anchor="end">時間 →</text>' +
          '<line x1="150" y1="115" x2="150" y2="150" stroke="#c9ccd1" stroke-width="1" stroke-dasharray="3 3"/><circle cx="150" cy="115" r="5" fill="#4a7fa8"/><text x="150" y="103" fill="#34567a" font-size="10" text-anchor="middle">最後のバックアップ</text>' +
          '<line x1="290" y1="72" x2="290" y2="150" stroke="#c26b4a" stroke-width="2.5"/><text x="290" y="63" fill="#b0532f" font-size="11" font-weight="800" text-anchor="middle">⚡ 障害発生</text>' +
          '<line x1="440" y1="115" x2="440" y2="150" stroke="#c9ccd1" stroke-width="1" stroke-dasharray="3 3"/><circle cx="440" cy="115" r="5" fill="#5c9160"/><text x="440" y="103" fill="#3f7a45" font-size="10" text-anchor="middle">復旧完了</text>' +
          '<line x1="150" y1="152" x2="290" y2="152" stroke="#4a7fa8" stroke-width="1.6"/><polygon points="150,152 159,147 159,157" fill="#4a7fa8"/><polygon points="290,152 281,147 281,157" fill="#4a7fa8"/>' +
          '<text x="220" y="170" fill="#34567a" font-size="10.5" font-weight="700" text-anchor="middle">RPO</text><text x="220" y="184" fill="#6b6e76" font-size="8.5" text-anchor="middle">どこまでのデータを戻すか</text>' +
          '<line x1="290" y1="152" x2="440" y2="152" stroke="#5c9160" stroke-width="1.6"/><polygon points="290,152 299,147 299,157" fill="#5c9160"/><polygon points="440,152 431,147 431,157" fill="#5c9160"/>' +
          '<text x="365" y="170" fill="#3f7a45" font-size="10.5" font-weight="700" text-anchor="middle">RTO</text><text x="365" y="184" fill="#6b6e76" font-size="8.5" text-anchor="middle">復旧までの時間</text>' +
          "</svg>",
        cap: "障害発生を基準に、前（データをどこまで戻すか）がRPO、後ろ（いつ復旧するか）がRTO。",
      },
    ],
    memorize: [
      { k: "リスクアセスメント", v: "リスク特定→分析→評価。その後に4対応(回避/低減/移転/保有)。" },
      { k: "ISMS", v: "組織の情報セキュリティ管理の仕組み(ISO/IEC 27001)。PDCAで運用。" },
      { k: "情報セキュリティポリシー", v: "基本方針・対策基準・実施手順の階層で定める。" },
      { k: "BCP / BCM", v: "BCP=事業継続計画、BCM=その運用管理。" },
      { k: "RTO / RPO", v: "RTO=目標復旧時間、RPO=目標復旧時点(どこまで戻すか)。" },
      { k: "CSIRT / SOC", v: "CSIRT=事故対応チーム、SOC=監視・分析。" },
      { k: "ディジタルフォレンジックス", v: "不正・事故の証拠を保全・調査する技術。" },
    ],
    flashcards: [
      { q: "リスクアセスメントの流れは？", a: "リスクの特定→分析→評価。その後、回避・低減・移転・保有の対応を選ぶ。" },
      { q: "BCPとは？", a: "事業継続計画。災害や大障害の際にも重要業務を継続・早期復旧するための計画。" },
      { q: "RTOとRPOの違いは？", a: "RTOは目標復旧時間（いつまでに復旧するか）、RPOは目標復旧時点（どの時点までのデータを戻すか）。" },
      { q: "CSIRTの役割は？", a: "セキュリティインシデントの発生時に、被害拡大防止や原因調査などに対応する専門チーム。" },
    ],
    quiz: [
      {
        q: "情報セキュリティにおいて、資産・脅威・脆弱性を洗い出してリスクの大きさを評価する一連の活動はどれか。",
        choices: ["リスクアセスメント", "ペネトレーションテスト", "ディジタルフォレンジックス", "セキュリティパッチ適用"],
        answer: 0,
        explain: "リスクを特定・分析・評価するのは<strong>リスクアセスメント</strong>。",
      },
      {
        q: "災害や大規模障害が発生しても、重要な事業を継続または早期に復旧するためにあらかじめ策定しておく計画はどれか。",
        choices: ["SLA", "BCP", "ISMS", "RFP"],
        answer: 1,
        explain: "事業継続のための計画は<strong>BCP（事業継続計画）</strong>。",
      },
      {
        q: "不正アクセスや情報漏えいなどの事故が発生した際に、原因究明や証拠保全のために、コンピュータ内のデータを保全・分析する技術はどれか。",
        choices: ["ペネトレーションテスト", "ディジタルフォレンジックス", "リスクアセスメント", "ベンチマーク"],
        answer: 1,
        explain: "証拠の保全・分析は<strong>ディジタルフォレンジックス</strong>。",
      },
    ],
  },
  {
    id: "fe-secattack", domain: "セキュリティ", icon: "⚔️", title: "攻撃手法とネットワーク防御",
    intro: "多様な攻撃手法と、ファイアウォール・IDS/IPS・検疫・ゼロトラストなどの防御。",
    understand: [
      {
        h: "さまざまな攻撃手法",
        body:
          "<p>基本のほか、こんな攻撃も出ます。</p>" +
          "<ul>" +
          "<li><strong>中間者攻撃</strong>：通信の間に割り込んで盗聴・改ざん。</li>" +
          "<li><strong>クロスサイトリクエストフォージェリ(CSRF)</strong>：利用者になりすまして不正なリクエストを送らせる。</li>" +
          "<li><strong>辞書攻撃／パスワードリスト攻撃</strong>：よくある語や漏えいリストでログイン試行。</li>" +
          "<li><strong>ドライブバイダウンロード</strong>：Web閲覧しただけでマルウェアを感染させる。</li>" +
          "<li><strong>DNSキャッシュポイズニング</strong>：DNSに偽の対応を覚えさせ偽サイトへ誘導。</li>" +
          "</ul>",
      },
      {
        h: "ネットワーク防御",
        body:
          "<p><strong>ファイアウォール(FW)</strong>は、通信の可否をルールに従って制御する関所です。ここで重要なのが<strong>DMZ（非武装地帯）</strong>——外部に公開するWebサーバやメールサーバを、<strong>インターネットと内部LANのどちらからも隔離した中間地帯</strong>に置く考え方です。こうすれば、万一公開サーバが乗っ取られても、そこから内部LANへ直接侵入されるのを防げます。下の図の配置がそのまま問われます。</p>" +
          "<p>さらに、Webアプリへの攻撃(SQLi/XSS)を防ぐ<strong>WAF</strong>、侵入を検知する<strong>IDS</strong>・検知して遮断する<strong>IPS</strong>を組み合わせて多層で守ります。社内に入る前に端末の安全性を検査する<strong>検疫ネットワーク</strong>、社内外を問わず全アクセスを都度検証する<strong>ゼロトラスト</strong>、私物端末管理の<strong>MDM</strong>も現代の対策です。</p>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">ファイアウォールとDMZによる多層防御</text>' +
          '<line x1="92" y1="102" x2="108" y2="102" stroke="#8a8f98" stroke-width="1.6"/>' +
          '<line x1="148" y1="102" x2="166" y2="102" stroke="#8a8f98" stroke-width="1.6"/>' +
          '<line x1="316" y1="102" x2="334" y2="102" stroke="#8a8f98" stroke-width="1.6"/>' +
          '<line x1="374" y1="102" x2="392" y2="102" stroke="#8a8f98" stroke-width="1.6"/>' +
          '<rect x="12" y="82" width="80" height="40" rx="8" fill="#f3ddcd" stroke="#c1855c"/><text x="52" y="100" fill="#8a4626" font-size="10.5" font-weight="700" text-anchor="middle">インター</text><text x="52" y="114" fill="#8a4626" font-size="10.5" font-weight="700" text-anchor="middle">ネット</text>' +
          '<rect x="108" y="78" width="40" height="48" rx="5" fill="#f7dfd6" stroke="#c26b4a"/><text x="128" y="106" fill="#b0532f" font-size="12" font-weight="800" text-anchor="middle">FW</text>' +
          '<rect x="166" y="48" width="150" height="122" rx="8" fill="#f7fafc" stroke="#4a7fa8" stroke-dasharray="6 4"/><text x="241" y="65" fill="#34567a" font-size="11" font-weight="800" text-anchor="middle">DMZ（非武装地帯）</text>' +
          '<rect x="178" y="76" width="126" height="32" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="241" y="96" fill="#23252b" font-size="10.5" text-anchor="middle">公開Webサーバ</text>' +
          '<rect x="178" y="120" width="126" height="32" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="241" y="140" fill="#23252b" font-size="10.5" text-anchor="middle">メールサーバ</text>' +
          '<rect x="334" y="78" width="40" height="48" rx="5" fill="#f7dfd6" stroke="#c26b4a"/><text x="354" y="106" fill="#b0532f" font-size="12" font-weight="800" text-anchor="middle">FW</text>' +
          '<rect x="392" y="48" width="176" height="122" rx="8" fill="#f4faf5" stroke="#5c9160" stroke-dasharray="6 4"/><text x="480" y="65" fill="#3f7a45" font-size="11" font-weight="800" text-anchor="middle">内部LAN</text>' +
          '<rect x="404" y="76" width="152" height="32" rx="5" fill="#dcecdd" stroke="#5c9160"/><text x="480" y="96" fill="#23252b" font-size="10.5" text-anchor="middle">社内サーバ</text>' +
          '<rect x="404" y="120" width="152" height="32" rx="5" fill="#dcecdd" stroke="#5c9160"/><text x="480" y="140" fill="#23252b" font-size="10.5" text-anchor="middle">社内PC</text>' +
          '<text x="290" y="188" fill="#6b6e76" font-size="10.5" text-anchor="middle">公開サーバはDMZに隔離。FWが通信を制御し、内部LANへの直接侵入を防ぐ。</text>' +
          "</svg>",
        cap: "外部公開サーバをDMZに置き、内部LANと分離。2段のFWで通信を制御する多層防御。",
      },
    ],
    memorize: [
      { k: "中間者攻撃", v: "通信の間に割り込み盗聴・改ざん。" },
      { k: "CSRF", v: "利用者になりすまし不正リクエストを送らせる。" },
      { k: "ドライブバイダウンロード", v: "Webを見ただけでマルウェア感染。" },
      { k: "ファイアウォール / DMZ", v: "通信可否を制御／公開サーバを内部から隔離。" },
      { k: "IDS / IPS", v: "IDS=侵入検知、IPS=侵入防止。" },
      { k: "WAF", v: "Webアプリへの攻撃(SQLi/XSS等)を防御。" },
      { k: "ゼロトラスト", v: "社内外を問わず全アクセスを都度検証する。" },
      { k: "検疫ネットワーク", v: "社内接続前に端末の安全性を検査・隔離する。" },
    ],
    flashcards: [
      { q: "中間者攻撃とは？", a: "通信を行う2者の間に第三者が割り込み、盗聴や改ざんを行う攻撃。" },
      { q: "IDSとIPSの違いは？", a: "IDSは侵入を検知して知らせる、IPSは検知に加えて通信を遮断して防止する。" },
      { q: "WAFは何を守る？", a: "WebアプリケーションをSQLインジェクションやXSSなどの攻撃から守る。" },
      { q: "ゼロトラストの考え方は？", a: "社内・社外を問わず何も信頼せず、すべてのアクセスをその都度検証する。" },
      { q: "検疫ネットワークとは？", a: "社内ネットワークに接続する前に端末の安全性（ウイルス対策や更新状況）を検査し、問題があれば隔離する仕組み。" },
    ],
    quiz: [
      {
        q: "通信を行っている二者の間に第三者が割り込み、双方になりすまして盗聴や改ざんを行う攻撃はどれか。",
        choices: ["中間者攻撃", "DoS攻撃", "SQLインジェクション", "フィッシング"],
        answer: 0,
        explain: "通信間に割り込むのは<strong>中間者攻撃</strong>。",
      },
      {
        q: "ネットワークへの侵入を検知した際に、その通信を自動的に遮断して被害を防ぐ仕組みはどれか。",
        choices: ["IDS", "IPS", "DMZ", "VPN"],
        answer: 1,
        explain: "検知に加えて遮断まで行うのは<strong>IPS（侵入防止システム）</strong>。検知のみはIDS。",
      },
      {
        q: "社内ネットワークに接続しようとする端末に対し、ウイルス対策やOS更新の状態を検査し、問題があれば接続を制限する仕組みはどれか。",
        choices: ["検疫ネットワーク", "DMZ", "VPN", "プロキシ"],
        answer: 0,
        explain: "接続前に端末を検査・隔離するのは<strong>検疫ネットワーク</strong>。",
      },
    ],
  }
);
