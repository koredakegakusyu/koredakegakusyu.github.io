/* =============================================================
   コレダケAWS CCP カリキュラム — 05 IAM
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-iam", domain: "セキュリティ", icon: "🔑", title: "IAM（アクセス管理）",
    intro: "誰が・何に・どこまでアクセスできるかを管理するIAM。ユーザー/グループ/ロール/ポリシー、MFA、最小権限。",
    understand: [
      {
        h: "IAMの登場人物——ユーザー・グループ・ロール・ポリシー",
        body:
          "<p><strong>IAM（Identity and Access Management）</strong>は、AWSの中で<strong>「誰が・何に・どこまでアクセスできるか」</strong>を管理する仕組みです。無料で使え、リージョンに依存しないグローバルサービスです。4つの登場人物を区別します。</p>" +
          "<ul>" +
          "<li><strong>ユーザー</strong>：人や個別のアプリに対応する認証情報（1人に1つ）。</li>" +
          "<li><strong>グループ</strong>：ユーザーの<strong>まとまり</strong>。同じ権限をまとめて付与でき、管理が楽になる（例：開発者グループ）。</li>" +
          "<li><strong>ポリシー</strong>：<strong>許可・拒否の内容を書いたルール</strong>（JSON）。これをユーザー・グループ・ロールに割り当てて権限を決める。</li>" +
          "<li><strong>ロール</strong>：<strong>一時的に権限を『借りる』仕組み</strong>。パスワードを持たせず、EC2などのサービスやアプリに権限を付与するときに使う（例：EC2にS3読み取りロールを付ける）。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">IAM：グループでまとめ、ポリシーで権限を決める</text>' +
          '<rect x="24" y="44" width="150" height="120" rx="9" fill="#eef4f9" stroke="#9db8cd" stroke-dasharray="5 3"/><text x="99" y="64" fill="#34567a" font-size="11" font-weight="800" text-anchor="middle">開発者グループ</text>' +
          '<rect x="40" y="76" width="118" height="24" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="99" y="93" fill="#23252b" font-size="10" text-anchor="middle">👤 ユーザーA</text>' +
          '<rect x="40" y="106" width="118" height="24" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="99" y="123" fill="#23252b" font-size="10" text-anchor="middle">👤 ユーザーB</text>' +
          '<rect x="40" y="136" width="118" height="24" rx="5" fill="#dce8f3" stroke="#4a7fa8"/><text x="99" y="153" fill="#23252b" font-size="10" text-anchor="middle">👤 ユーザーC</text>' +
          '<line x1="174" y1="104" x2="236" y2="104" stroke="#8a8f98" stroke-width="1.8"/><polygon points="236,104 226,99 226,109" fill="#8a8f98"/><text x="205" y="96" fill="#6b6e76" font-size="9" text-anchor="middle">付与</text>' +
          '<rect x="238" y="80" width="150" height="48" rx="8" fill="#f2e7cd" stroke="#b28a2e"/><text x="313" y="100" fill="#7a5e17" font-size="11.5" font-weight="800" text-anchor="middle">ポリシー</text><text x="313" y="117" fill="#23252b" font-size="9.5" text-anchor="middle">許可/拒否のルール</text>' +
          '<line x1="388" y1="104" x2="450" y2="104" stroke="#8a8f98" stroke-width="1.8"/><polygon points="450,104 440,99 440,109" fill="#8a8f98"/>' +
          '<rect x="452" y="80" width="104" height="48" rx="8" fill="#dcecdd" stroke="#5c9160"/><text x="504" y="100" fill="#366b3c" font-size="10.5" font-weight="700" text-anchor="middle">S3・EC2</text><text x="504" y="117" fill="#23252b" font-size="9.5" text-anchor="middle">などへの操作</text>' +
          '<text x="290" y="188" fill="#6b6e76" font-size="10.5" text-anchor="middle">個人に付けるより、グループにポリシーを付けてまとめて管理するのが基本。</text>' +
          "</svg>",
        cap: "ユーザーをグループにまとめ、グループにポリシー（許可ルール）を付与して権限を決める。ロールは一時的な権限貸与。",
      },
      {
        h: "安全に使うための鉄則——ルートユーザー・MFA・最小権限",
        body:
          "<p>アカウント作成時にできる <strong>ルートユーザー</strong>は、<strong>そのアカウントのすべてを操作できる最強の存在</strong>です（アカウントの解約や請求設定など、何でもできてしまう）。だからこそ<strong>普段の作業には絶対に使わず</strong>、最初に管理用の IAM ユーザーを作ってそちらを日常使いにし、ルートユーザーは<strong>ごく一部の作業に限定して厳重に保護</strong>します。万一漏れると被害が甚大になるためです。</p>" +
          "<p>安全に使うための 3 つの鉄則：</p>" +
          "<ul>" +
          "<li><strong>MFA（多要素認証）</strong>：パスワードに加えて、スマホアプリのワンタイムコードなど“もう1つの要素”を要求する仕組み。パスワードが漏れても不正ログインを防げます。<strong>特にルートユーザーには必ず設定</strong>します。</li>" +
          "<li><strong>最小権限の原則</strong>：各ユーザーやサービスには<strong>業務に必要な権限だけ</strong>を与え、余分な権限は付けません。渡しすぎた権限は、操作ミスや乗っ取り時の被害を広げてしまいます。</li>" +
          "<li><strong>アクセスキーを埋め込まない</strong>：プログラムから AWS を操作するための<strong>アクセスキー（鍵）はソースコードに書かない・漏らさない</strong>。EC2 などのプログラムには <strong>IAM ロール</strong>を割り当てれば、鍵を持たせずに安全に権限を渡せます。</li>" +
          "</ul>" +
          "<p>まとめると『<strong>ルートは封印、日常は最小権限の IAM ユーザー、認証は MFA、プログラムにはロール</strong>』。試験では『ルートユーザーで日常作業する』『全員に管理者権限を与える』のような選択肢は<strong>誤り</strong>、と判断できるようにします。</p>",
      },
      {
        h: "大人数・複数アカウントの認証——IAMアイデンティティセンターとフェデレーション",
        body:
          "<p>社員が数百人いて AWS アカウントも複数ある——そんなとき、<strong>アカウントごとに IAM ユーザーを作って配る</strong>のは現実的ではありません（退職時の消し忘れも起きます）。公式試験ガイドでも『IAM アイデンティティセンター』『フェデレーテッドなどのアイデンティティ管理のタイプ』が対象知識に挙がっています。</p>" +
          "<ul>" +
          "<li><strong>IAM アイデンティティセンター（旧 AWS Single Sign-On）</strong>：<strong>一度のログインで、複数の AWS アカウントや業務アプリに入れる（シングルサインオン）</strong>仕組み。従業員のアクセスを<strong>一元管理</strong>でき、入退社時の権限付与・剥奪も1か所で済みます。</li>" +
          "<li><strong>フェデレーション（IDフェデレーション）</strong>：<strong>すでに社内にある ID 基盤</strong>（Active Directory や外部の ID プロバイダ）の認証結果を信頼して、AWS へアクセスさせる方式。<strong>AWS 側に個別の IAM ユーザーを作らずに済む</strong>のが最大の利点で、社員は普段の社内アカウントのままログインできます。</li>" +
          "<li><strong>アカウント間の IAM ロール</strong>：別の AWS アカウントのリソースを使わせたいとき、<strong>ロールを引き受けさせる（AssumeRole）</strong>ことで一時的に権限を貸します。相手にキーを渡す必要がありません。</li>" +
          "</ul>" +
          "<p><strong>取り違え注意</strong>：ここまでは<strong>「社内の人（従業員）」</strong>が AWS を操作するための仕組みです。一方、自社が作った<strong>アプリの利用者（顧客）</strong>のサインアップ／サインインを管理するのは <strong>Amazon Cognito</strong> です。『従業員が AWS にログイン＝IAM アイデンティティセンター／フェデレーション』『アプリの一般ユーザーがログイン＝Cognito』と分けて覚えます。</p>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13.5" font-weight="700" fill="#23252b">誰がログインするのか で仕組みが変わる</text><rect x="24" y="36" width="250" height="140" rx="10" fill="#dce8f3" stroke="#4a7fa8"/><text x="149" y="58" text-anchor="middle" font-size="11.5" font-weight="800" fill="#34567a">従業員が AWS を操作する</text><rect x="44" y="70" width="210" height="30" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="149" y="89" text-anchor="middle" font-size="10" fill="#23252b">IAMアイデンティティセンター（SSO）</text><rect x="44" y="106" width="210" height="30" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="149" y="125" text-anchor="middle" font-size="10" fill="#23252b">フェデレーション（社内ADを利用）</text><text x="149" y="158" text-anchor="middle" font-size="9.5" fill="#4a7fa8">個別のIAMユーザーを作らずに一元管理</text><rect x="306" y="36" width="250" height="140" rx="10" fill="#dcecdd" stroke="#5c9160"/><text x="431" y="58" text-anchor="middle" font-size="11.5" font-weight="800" fill="#366b3c">アプリの利用者（顧客）</text><rect x="326" y="70" width="210" height="30" rx="6" fill="#eef7ef" stroke="#a9ccab"/><text x="431" y="89" text-anchor="middle" font-size="10" fill="#23252b">Amazon Cognito</text><text x="431" y="120" text-anchor="middle" font-size="10" fill="#23252b">アプリのサインアップ／サインイン</text><text x="431" y="158" text-anchor="middle" font-size="9.5" fill="#5c9160">一般ユーザー向けの認証基盤</text></svg>',
        cap: "従業員がAWSへ＝IAMアイデンティティセンター／フェデレーション。アプリの顧客が使う＝Cognito。取り違え注意。",
      },
    ],
    memorize: [
      { k: "IAM", v: "誰が何にどこまでアクセスできるかを管理。無料・グローバル（リージョン非依存）。" },
      { k: "IAMユーザー/グループ", v: "ユーザー=個人の認証情報。グループ=ユーザーの束（権限をまとめて付与）。" },
      { k: "IAMポリシー", v: "許可・拒否を記述したルール（JSON）。ユーザー/グループ/ロールに割り当てる。" },
      { k: "IAMロール", v: "一時的に権限を貸与する仕組み。EC2等のサービスやアプリに付与（キー不要で安全）。" },
      { k: "ルートユーザー", v: "全権限を持つ最強アカウント。日常利用は避け、MFAで厳重保護。" },
      { k: "MFA(多要素認証)", v: "パスワード＋ワンタイムコード等。ルートユーザーには必須。" },
      { k: "最小権限の原則", v: "必要最小限の権限だけを与える。余分な権限は付けない。" },
      { k: "IAMアイデンティティセンター", v: "旧AWS SSO。<strong>一度のログインで複数AWSアカウント/アプリ</strong>へ。従業員アクセスを一元管理。" },
      { k: "フェデレーション", v: "<strong>社内AD等の既存ID基盤の認証を信頼</strong>してAWSへ。<strong>個別のIAMユーザーを作らずに済む</strong>。" },
      { k: "アカウント間のIAMロール", v: "別アカウントにロールを引き受けさせ<strong>一時的に権限を貸す</strong>。キーを渡さない。" },
      { k: "Cognito との違い", v: "従業員がAWSへ＝アイデンティティセンター/フェデレーション。<strong>アプリの顧客の認証＝Cognito</strong>。" },
    ],
    flashcards: [
      { q: "IAMのグループを使う利点は？", a: "複数のユーザーに同じ権限をまとめて付与でき、管理が簡単になること。" },
      { q: "IAMロールはどんなときに使う？", a: "EC2などのサービスやアプリに、パスワードやアクセスキーを持たせずに一時的な権限を与えたいとき。" },
      { q: "ルートユーザーの正しい扱い方は？", a: "全権限を持つため日常作業には使わず、MFAを設定して厳重に保護し、必要な一部の作業だけに限定する。" },
      { q: "MFA（多要素認証）とは？", a: "パスワードに加えてスマホのワンタイムコードなど別の要素も要求する認証。ルートユーザーには必ず設定する。" },
      { q: "最小権限の原則とは？", a: "各ユーザーやロールに、業務に必要な最小限の権限だけを与える考え方。" },
    ],
    quiz: [
      {
        q: "複数のIAMユーザーに対して、同じアクセス権限を効率的にまとめて付与したい。最も適切な方法はどれか。",
        choices: [
          "各ユーザーに個別に同じポリシーを1つずつ付与する",
          "IAMグループを作成し、そのグループにポリシーを付与してユーザーを所属させる",
          "ルートユーザーの認証情報を全員で共有する",
          "ユーザーごとに新しいAWSアカウントを作る",
        ],
        answer: 1,
        explain: "同じ権限をまとめて管理するには<strong>IAMグループ</strong>にポリシーを付与する。ルート共有は禁止。",
      },
      {
        q: "EC2インスタンス上で動くアプリケーションからS3にアクセスさせたい。認証情報（アクセスキー）をコードに書かずに安全に権限を与える方法はどれか。",
        choices: ["IAMロールをEC2に割り当てる", "ルートユーザーのパスワードを埋め込む", "アクセスキーをソースコードに直接書く", "MFAデバイスを共有する"],
        answer: 0,
        explain: "サービスに一時的な権限を安全に与えるのは<strong>IAMロール</strong>。キーをコードに書くのは危険。",
      },
      {
        q: "AWSアカウントのセキュリティに関するベストプラクティスとして、最も適切なものはどれか。",
        choices: [
          "日常の操作はすべてルートユーザーで行う",
          "ルートユーザーにMFAを設定し、日常作業は権限を絞ったIAMユーザーで行う",
          "すべてのユーザーに管理者権限を付与する",
          "パスワードは全員で共有する",
        ],
        answer: 1,
        explain: "<strong>ルートユーザーはMFAで保護し日常利用しない</strong>、日常は最小権限のIAMユーザーを使うのが基本。",
      },
      {
        q: "社内の Active Directory で管理している数百名の従業員に AWS へのアクセスを許可したい。AWS 側に従業員ごとの IAM ユーザーを作らずに、既存の社内アカウントでログインさせたい。適切な方式はどれか。",
        choices: ["従業員ごとにアクセスキーを配布する", "ルートユーザーを共有する", "IDフェデレーションを利用する", "全員を1つのIAMユーザーで共有する"],
        answer: 2,
        explain: "既存の ID 基盤（社内 AD 等）の認証を信頼して AWS へアクセスさせるのが<strong>フェデレーション</strong>。<strong>個別の IAM ユーザーを作らずに済み</strong>、退職時も社内側で無効化すれば済む。キーの配布やアカウント共有は重大なアンチパターン。",
      },
      {
        q: "複数の AWS アカウントを運用している企業で、従業員が一度のログインで、権限のある複数アカウントへ切り替えてアクセスできるようにしたい。適したサービスはどれか。",
        choices: ["Amazon Cognito", "AWS Shield", "Amazon Inspector", "AWS IAM アイデンティティセンター"],
        answer: 3,
        explain: "複数 AWS アカウント／アプリへの<strong>シングルサインオン</strong>を提供し従業員アクセスを一元管理するのが <strong>IAM アイデンティティセンター（旧 AWS SSO）</strong>。<strong>Cognito は自社アプリの“顧客”向け</strong>認証で対象が異なる。",
      },
    ],
  }
);
