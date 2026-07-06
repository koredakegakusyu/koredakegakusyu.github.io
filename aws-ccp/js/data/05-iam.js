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
          "<p>アカウント作成時にできる<strong>ルートユーザー</strong>は<strong>すべての権限を持つ最強の存在</strong>。普段の作業には使わず、<strong>請求設定など一部の作業だけに限定し、厳重に保護</strong>します（日常はIAMユーザーを作って使う）。</p>" +
          "<p>安全の3つの鉄則：</p>" +
          "<ul>" +
          "<li><strong>MFA（多要素認証）</strong>：パスワードに加えてスマホのワンタイムコード等を要求。特にルートユーザーには必ず設定する。</li>" +
          "<li><strong>最小権限の原則</strong>：必要な権限だけを与え、余分な権限は付けない。</li>" +
          "<li><strong>アクセスキーの管理</strong>：プログラム用のアクセスキーを漏らさない。人にはロール、コードにはロールを使うのが安全。</li>" +
          "</ul>",
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
    ],
  }
);
