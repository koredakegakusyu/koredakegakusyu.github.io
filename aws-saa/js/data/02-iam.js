/* =============================================================
   SAA Forge カリキュラム — 02 認証・IAM
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "iam", domain: "認証・IAM", icon: "🔐", title: "IAM の基礎",
    intro: "全操作は『誰が(認証)・何を許されるか(認可)』で制御。最小権限とIAMロールがSAAの王道解答。",
    understand: [
      {
        h: "AWSのすべての操作は『認証』と『認可』を通る",
        body: "<p>AWS上で何かをするとき——S3にファイルを置く、EC2を起動する——その裏では必ず2つのチェックが走る。<strong>認証(あなたは誰か)</strong>と<strong>認可(その操作を許されているか)</strong>だ。この門番が<strong>IAM(Identity and Access Management)</strong>で、AWSセキュリティの心臓部にあたる。</p><p>認可のルールを書いたものが<strong>ポリシー</strong>(JSON形式の文書)で、『誰が・どのサービスの・どの操作を・どのリソースに対して許可/拒否されるか』を定義する。このポリシーを<strong>誰か(主体)に貼り付ける</strong>ことで権限が与えられる。逆に言えば、ポリシーが貼られていない操作はすべて<strong>デフォルトで拒否</strong>される。『明示的に許可されたことだけができる』のがIAMの大原則だ。</p>",
      },
      {
        h: "ユーザー・グループ・ロール——3つの主体と使い分け",
        body: "<p>ポリシーを貼り付ける相手(主体)には3種類ある。</p><ul><li><strong>IAMユーザー</strong>：1人の人間に対応する恒久的なID。パスワードやアクセスキーを持つ。</li><li><strong>IAMグループ</strong>：ユーザーの束。『開発者グループ』にポリシーを付ければ、所属ユーザー全員にまとめて権限が行き渡る。<strong>1人ずつ設定するより管理が楽</strong>で、これが推奨。</li><li><strong>IAMロール</strong>：<strong>一時的な権限の入れ物</strong>。特定の人に固定で紐づくのではなく、サービス(EC2やLambda)・他アカウント・外部IDなどが必要なときに『被って』使う。</li></ul><p>ここで最重要なのが<strong>ロール</strong>だ。例えば『EC2上のアプリがS3にアクセスしたい』とき、アクセスキー(長期の鍵)をコードや設定に書き込むのは<strong>絶対NG</strong>——漏洩すれば誰でもなりすませる。代わりに<strong>S3権限を持つロールをEC2にアタッチ</strong>すれば、EC2は自動で<strong>一時的な認証情報</strong>を受け取り、それが定期的に入れ替わる。鍵を持ち歩かないので安全だ。SAExで『サービスから別サービスへアクセス』ときたら、答えはほぼ<strong>IAMロール</strong>。</p>",
        diagram:
          '<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="22" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">例：EC2 が IAMロール経由で S3 にアクセス</text>\
<rect x="40" y="50" width="150" height="90" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="115" y="80" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">EC2 インスタンス</text><text x="115" y="100" fill="#9aa6bd" font-size="10" text-anchor="middle">アプリが実行中</text><text x="115" y="118" fill="#9aa6bd" font-size="10" text-anchor="middle">(鍵を持たない)</text>\
<rect x="245" y="55" width="150" height="80" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="85" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">IAMロール</text><text x="320" y="105" fill="#9aa6bd" font-size="10" text-anchor="middle">一時認証情報を発行</text>\
<rect x="450" y="55" width="150" height="80" rx="10" fill="#0c1220" stroke="#51cf9b"/><text x="525" y="85" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">S3 バケット</text><text x="525" y="105" fill="#9aa6bd" font-size="10" text-anchor="middle">許可された操作のみ</text>\
<line x1="190" y1="95" x2="243" y2="95" stroke="#9aa6bd" stroke-width="2" marker-end="url(#i)"/><text x="216" y="86" fill="#9aa6bd" font-size="9" text-anchor="middle">アタッチ</text>\
<line x1="395" y1="95" x2="448" y2="95" stroke="#9aa6bd" stroke-width="2" marker-end="url(#i)"/><text x="421" y="86" fill="#9aa6bd" font-size="9" text-anchor="middle">許可</text>\
<text x="320" y="175" fill="#51cf9b" font-size="11" text-anchor="middle">鍵を埋め込まない＝漏洩リスクなし・自動ローテーション</text>\
<defs><marker id="i" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "アクセスキーを埋め込まず、ロールが発行する一時認証情報でアクセスする——これが安全の定石。",
      },
      {
        h: "ポリシーの種類と評価の順序",
        body: "<p>ポリシーには貼る場所で種類がある。</p><ul><li><strong>アイデンティティベースポリシー</strong>：ユーザー/グループ/ロールに付ける(最も一般的)。</li><li><strong>リソースベースポリシー</strong>：リソース側に付ける。S3バケットポリシーやSQS/KMSのポリシーが代表。<strong>別アカウントからのアクセス許可(クロスアカウント)</strong>に特に有効。</li><li><strong>権限境界(Permissions Boundary)</strong>：その主体が<strong>持てる権限の上限</strong>を定める。管理者を委任しても暴走させない仕組み。</li></ul><p>そして複数のポリシーが絡むときの<strong>評価順序</strong>が頻出。<strong>①明示的なDeny(拒否)が最優先で必ず勝つ → ②明示的なAllow(許可) → ③どちらも無ければ暗黙的に拒否</strong>。だから1つでもDenyがあれば、他で許可されていても操作できない。さらに組織のSCPや権限境界も絡む場合、<strong>すべての層で許可されている部分だけ</strong>が実際に使える権限になる。</p>",
      },
    ],
    memorize: [
      { k: "IAMロール", v: "サービス/他アカウント/フェデレーションへの<strong>一時権限</strong>。キー埋め込みの代替＝常に正解。" },
      { k: "グループ活用", v: "権限は<strong>グループに付与</strong>して管理を簡素化(1人ずつ付けない)。" },
      { k: "最小権限の原則", v: "必要な権限だけ。<code>Action:*</code>/<code>Resource:*</code>の濫用は減点。" },
      { k: "評価順", v: "<strong>明示Deny ＞ 明示Allow ＞ 暗黙Deny(既定拒否)</strong>。Denyが1つでもあれば不可。" },
      { k: "アイデンティティベース", v: "ユーザー/グループ/ロールに付与する一般的なポリシー。" },
      { k: "リソースベースポリシー", v: "S3/SQS/SNS/KMS等。<strong>クロスアカウント</strong>許可に有効。" },
      { k: "権限境界", v: "主体が<strong>持てる権限の上限</strong>。委任管理者の暴走を防ぐ。" },
      { k: "ルートユーザー", v: "全能。日常使用禁止・<strong>MFA必須</strong>・アクセスキーは作らない。一部の請求/アカウント操作専用。" },
      { k: "アクセスキーは非推奨", v: "長期キーの埋め込みは漏洩リスク。<strong>ロール(一時認証情報)</strong>へ寄せる。" },
      { k: "IAMはグローバル", v: "リージョン非依存。世界中で同じユーザー/ロールが有効。" },
      { k: "MFA", v: "パスワード＋ワンタイムコードの二要素。重要操作・ルートで有効化。" },
    ],
    flashcards: [
      { q: "EC2/LambdaからS3やDynamoDBへアクセス。安全な方法は？", a: "実行ロール(IAMロール)を付与(キー埋め込みはNG)" },
      { q: "IAMロールを一言で？", a: "一時的な権限の入れ物。サービス等に被せて使う" },
      { q: "権限はユーザーに直接？グループに？", a: "グループに付与して管理を簡素化" },
      { q: "AllowとDeny、強いのは？", a: "明示的Denyが最優先(必ず勝つ)" },
      { q: "S3バケットを別アカウントから読ませたい。使うポリシーは？", a: "リソースベースのバケットポリシー(クロスアカウント)" },
      { q: "委任した管理者が持てる権限に上限を設けたい。", a: "Permissions Boundary(権限境界)" },
      { q: "IAMはリージョン？グローバル？", a: "グローバル" },
    ],
    quiz: [
      {
        q: "EC2上のアプリがS3とDynamoDBにアクセスする。資格情報を安全に扱う最適な実装は？",
        choices: [
          "IAMユーザーのアクセスキーをEC2の設定ファイルに保存",
          "必要な権限を持つIAMロールをEC2インスタンスプロファイルとしてアタッチ",
          "ルートユーザーのキーを使う",
          "S3とDynamoDBを公開する",
        ],
        answer: 1,
        explain: "サービス→サービスは<strong>IAMロール</strong>。一時認証情報が自動でローテーションされ、キー漏洩リスクがない。",
      },
      {
        q: "セキュリティチームが、開発者が自分自身に管理者権限を付与できないように制限しつつ、限られた範囲でIAMユーザーを作成する権限は与えたい。使うべき仕組みは？",
        choices: ["SCPのみ", "Permissions Boundary(権限境界)", "セキュリティグループ", "MFA"],
        answer: 1,
        explain: "委任した主体が<strong>付与できる権限の上限</strong>を縛るのは<strong>権限境界</strong>。これにより自己エスカレーションを防げる。",
      },
      {
        q: "あるIAMユーザーに付与されたポリシーでS3:GetObjectがAllowだが、別途適用されたポリシーで同アクションがDenyになっている。結果は？",
        choices: ["取得できる", "取得できない", "リクエストごとにランダム", "管理者承認が必要"],
        answer: 1,
        explain: "<strong>明示的Denyは常に優先</strong>。複数ポリシーは和集合で評価されるが、Denyが1つでもあれば拒否。",
      },
    ],
  },
  {
    id: "sts-federation", domain: "認証・IAM", icon: "🎫", title: "STS・フェデレーション・Identity Center",
    intro: "一時認証情報(STS)と、既存IDでのログイン(フェデレーション)。SSOやクロスアカウントの中核。",
    understand: [
      {
        h: "STS——『一時的な鍵』を発行する仕組み",
        body: "<p>IAMロールが安全なのは、<strong>STS(Security Token Service)</strong>が<strong>有効期限つきの一時的な認証情報</strong>を発行するからだ。ロールを『引き受ける(AssumeRole)』と、STSが数十分〜数時間で失効する一時キーを返す。失効すれば自動で使えなくなるので、万一漏れても被害が限定される。これが長期アクセスキーより安全な理由だ。</p><p>この仕組みは<strong>クロスアカウントアクセス</strong>でも活躍する。本番アカウントのリソースに開発アカウントのユーザーがアクセスしたいとき、長期キーを共有するのではなく、<strong>本番側にロールを用意し、開発側がそれをAssumeRoleで引き受ける</strong>。鍵の共有も棚卸しも不要で、いつでも引き受けを止められる。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="30" y="70" width="150" height="60" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="105" y="95" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">利用者/外部ID</text><text x="105" y="113" fill="#9aa6bd" font-size="10" text-anchor="middle">社内AD・他アカウント</text>\
<rect x="245" y="70" width="150" height="60" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="95" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">STS</text><text x="320" y="113" fill="#9aa6bd" font-size="10" text-anchor="middle">一時認証情報を発行</text>\
<rect x="460" y="70" width="150" height="60" rx="10" fill="#0c1220" stroke="#51cf9b"/><text x="535" y="95" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">AWSリソース</text><text x="535" y="113" fill="#9aa6bd" font-size="10" text-anchor="middle">ロールの権限で操作</text>\
<line x1="180" y1="100" x2="243" y2="100" stroke="#9aa6bd" stroke-width="2" marker-end="url(#s)"/><text x="211" y="91" fill="#9aa6bd" font-size="9" text-anchor="middle">AssumeRole</text>\
<line x1="395" y1="100" x2="458" y2="100" stroke="#9aa6bd" stroke-width="2" marker-end="url(#s)"/><text x="426" y="91" fill="#9aa6bd" font-size="9" text-anchor="middle">期限付き鍵</text>\
<text x="320" y="165" fill="#51cf9b" font-size="11" text-anchor="middle">鍵は数十分〜数時間で失効＝漏れても被害限定</text>\
<defs><marker id="s" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "ロールをAssumeRoleすると、STSが期限付きの一時認証情報を発行。長期キーを持ち歩かない。",
      },
      {
        h: "フェデレーションと IAM Identity Center——既存IDでログイン",
        body: "<p>従業員が増えるたびにIAMユーザーを作るのは、管理が破綻する。代わりに<strong>会社が既に持っているID(社内のActive Directoryなど)でAWSにlog inさせる</strong>のが<strong>フェデレーション</strong>だ。<strong>SAML/OIDC</strong>という標準規格で外部のIDプロバイダと連携し、ログイン成功後はSTSの一時認証情報でAWSを使う。AWS側にユーザーを量産しなくて済む。</p><p>これを現代的に一元管理するのが<strong>IAM Identity Center(旧 AWS SSO)</strong>だ。<strong>複数のAWSアカウントと多数の業務アプリへのシングルサインオン(SSO)</strong>を1か所で管理できる。Organizationsと組み合わせ、『どの従業員が・どのアカウントで・どの権限を持つか』を集中管理するのが、大企業マルチアカウント構成の定番だ。</p><p>覚え方：<strong>従業員のSSO → IAM Identity Center / アプリのエンドユーザー認証 → Cognito</strong>(次の科目)。混同しやすいので対で押さえる。</p>",
      },
    ],
    memorize: [
      { k: "STS", v: "<strong>一時認証情報</strong>を発行(期限付き)。AssumeRole/クロスアカウント/フェデレーションの基盤。" },
      { k: "一時認証情報の利点", v: "<strong>自動失効</strong>で漏洩時の被害が限定。長期キーより安全。" },
      { k: "クロスアカウント", v: "相手アカウントにロールを作り<strong>AssumeRoleで引き受け</strong>る(長期キー共有はしない)。" },
      { k: "SAML/OIDCフェデレーション", v: "社内AD等の<strong>既存IDでAWSにログイン</strong>。IAMユーザーを量産しない。" },
      { k: "IAM Identity Center", v: "<strong>マルチアカウント＋アプリのSSO</strong>を一元管理(旧AWS SSO)。Organizationsと連携。" },
      { k: "使い分け", v: "<strong>従業員のSSO→Identity Center / アプリ利用者→Cognito</strong>。" },
    ],
    flashcards: [
      { q: "ロールが安全な理由は？(STSの観点)", a: "STSが期限付きの一時認証情報を発行し、自動失効するから" },
      { q: "社内ADのIDでAWSにログインさせたい。仕組みは？", a: "SAMLフェデレーション(またはIAM Identity Center)" },
      { q: "複数AWSアカウントへの従業員SSOを一元管理するのは？", a: "IAM Identity Center(旧AWS SSO)" },
      { q: "クロスアカウントで長期キーを共有すべき？", a: "NG。相手のロールをAssumeRole(STSの一時認証情報)" },
      { q: "従業員SSOはIdentity Center。アプリ利用者は？", a: "Amazon Cognito" },
    ],
    quiz: [
      {
        q: "企業が数十のAWSアカウントを運用しており、従業員には既存の社内IDで全アカウントへシングルサインオンさせたい。最適なサービスは？",
        choices: ["各アカウントにIAMユーザーを作成", "IAM Identity Center をOrganizationsと連携", "Amazon Cognito", "アクセスキーを配布"],
        answer: 1,
        explain: "従業員の<strong>マルチアカウントSSO＝IAM Identity Center</strong>。IAMユーザー量産は管理破綻、Cognitoはアプリ利用者向け。",
      },
      {
        q: "本番アカウントのS3に、別の開発アカウントのアプリから安全に一時的なアクセスを与えたい。推奨される方法は？",
        choices: [
          "本番アカウントのIAMユーザーの長期アクセスキーを開発側に渡す",
          "本番にクロスアカウント用ロールを作り、開発側がAssumeRoleする",
          "S3をパブリックにする",
          "両アカウントでルートユーザーを共有",
        ],
        answer: 1,
        explain: "クロスアカウントは<strong>ロールのAssumeRole(STSの一時認証情報)</strong>。長期キー共有は漏洩・棚卸し困難で不可。",
      },
    ],
  },
  {
    id: "cognito", domain: "認証・IAM", icon: "👤", title: "Cognito — アプリ利用者の認証",
    intro: "Web/モバイルアプリの『エンドユーザー』のサインアップ・ログインを担うマネージド認証。User PoolとIdentity Poolの違いが要点。",
    understand: [
      {
        h: "アプリの『お客さん』の認証は、IAMでは行わない",
        body: "<p>これまでのIAMは、AWSを<strong>操作する側(社内の人・サービス)</strong>の認証だった。一方、あなたが作ったアプリの<strong>エンドユーザー(一般のお客さん)</strong>が数百万人いるとき、その一人ひとりにIAMユーザーを作るのは設計として誤り。ここで使うのが<strong>Amazon Cognito</strong>だ。</p><p>Cognitoは、アプリのサインアップ・ログイン・パスワードリセット・多要素認証・SNSログイン(Google/Apple)などを<strong>マネージドで提供</strong>する。大量ユーザーにスケールし、認証まわりを自前で作らずに済む。</p>",
      },
      {
        h: "User Pool(認証) と Identity Pool(AWS権限) の2段構え",
        body: "<p>Cognitoは役割の異なる2つの部品からなる。混同しやすいので分けて理解する。</p><ul><li><strong>User Pool(ユーザープール)</strong>＝<strong>『誰か』を確かめる認証</strong>。ユーザーディレクトリそのもので、サインアップ/ログイン/MFA/ソーシャルログインを担う。ログインに成功すると<strong>トークン(JWT)</strong>が発行される。API Gatewayの認可(オーソライザー)とも連携できる。</li><li><strong>Identity Pool(アイデンティティプール)</strong>＝<strong>『AWSリソースへの一時権限』を渡す</strong>。User Pool等で認証済みのユーザーに、Identity Poolが<strong>STS経由の一時的なIAM権限</strong>を付与し、各ユーザーが自分のS3フォルダやDynamoDBへ直接アクセスできるようにする。</li></ul><p>つまり<strong>User Poolで『本人確認』→ Identity Poolで『AWSを触る権限』</strong>という2段構え。『ログインだけ』ならUser Pool、『ログイン後にAWSリソースへ直接アクセスさせたい』ならIdentity Poolも使う、と整理する。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="30" y="75" width="130" height="55" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="95" y="100" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">アプリ利用者</text><text x="95" y="117" fill="#9aa6bd" font-size="10" text-anchor="middle">スマホ/Web</text>\
<rect x="215" y="60" width="150" height="40" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="290" y="78" fill="#ff9d3c" font-size="11" font-weight="700" text-anchor="middle">User Pool</text><text x="290" y="92" fill="#9aa6bd" font-size="9" text-anchor="middle">認証(ログイン/MFA)</text>\
<rect x="215" y="110" width="150" height="40" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="290" y="128" fill="#51cf9b" font-size="11" font-weight="700" text-anchor="middle">Identity Pool</text><text x="290" y="142" fill="#9aa6bd" font-size="9" text-anchor="middle">一時AWS権限を付与</text>\
<rect x="430" y="75" width="180" height="55" rx="10" fill="#0c1220" stroke="#51cf9b"/><text x="520" y="100" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">S3 / DynamoDB</text><text x="520" y="117" fill="#9aa6bd" font-size="10" text-anchor="middle">本人のデータへ直接</text>\
<line x1="160" y1="90" x2="213" y2="80" stroke="#9aa6bd" stroke-width="1.5" marker-end="url(#cg)"/>\
<line x1="290" y1="100" x2="290" y2="110" stroke="#9aa6bd" stroke-width="1.5"/>\
<line x1="365" y1="130" x2="428" y2="105" stroke="#9aa6bd" stroke-width="1.5" marker-end="url(#cg)"/>\
<defs><marker id="cg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "User Poolで本人確認→Identity Poolが一時AWS権限を付与→ユーザーが自分のデータへ直接アクセス。",
      },
    ],
    memorize: [
      { k: "Cognito", v: "アプリ<strong>エンドユーザー</strong>の認証をマネージド提供。大量ユーザーにスケール。" },
      { k: "User Pool", v: "<strong>認証</strong>(サインアップ/ログイン/MFA/ソーシャルログイン)。トークン(JWT)発行。" },
      { k: "Identity Pool", v: "認証済み利用者に<strong>一時的なAWS権限(STS)</strong>を付与(S3等へ直接アクセス)。" },
      { k: "2段構え", v: "<strong>User Poolで本人確認 → Identity PoolでAWS権限</strong>。" },
      { k: "API Gateway連携", v: "User Poolを<strong>オーソライザー</strong>にしてAPIの認可に使える。" },
      { k: "対比", v: "従業員SSO→Identity Center / <strong>アプリ利用者→Cognito</strong>。" },
    ],
    flashcards: [
      { q: "モバイルアプリの登録・ログイン・SNSログインを実装したい。", a: "Cognito User Pool" },
      { q: "ログイン済みユーザーにS3への一時権限を直接渡したい。", a: "Cognito Identity Pool" },
      { q: "User PoolとIdentity Poolの役割の違いは？", a: "User Pool=認証(本人確認) / Identity Pool=AWS一時権限の付与" },
      { q: "従業員SSOはIdentity Center。アプリ利用者は？", a: "Amazon Cognito" },
    ],
    quiz: [
      {
        q: "モバイルアプリで、数百万人規模のエンドユーザーのサインアップ/ログイン(ソーシャルログイン含む)をマネージドに実装し、ログイン後はユーザーごとのS3フォルダへ直接アクセスさせたい。最適な構成は？",
        choices: [
          "各ユーザーにIAMユーザーを作成する",
          "Cognito User Poolで認証し、Identity Poolで一時的なAWS権限を付与する",
          "IAM Identity Centerを使う",
          "アクセスキーをアプリに埋め込む",
        ],
        answer: 1,
        explain: "アプリ利用者は<strong>Cognito</strong>。User Poolで認証、Identity Poolで一時IAM権限を付与しS3へ直接アクセス。IAMユーザー量産・キー埋め込みは不可、Identity Centerは従業員向け。",
      },
    ],
  }
);
