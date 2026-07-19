/* =============================================================
   コレダケAWS CCP カリキュラム — 21 エンドユーザー・アプリ向けサービス
   ※ 本番問題集（CLF-C02）の論点マップ（docs/ccp-question-topics-reference.md）と照合し、
     既存の分野別モジュールに収まらない「エンドユーザー／アプリ提供系」サービスを集約。
     ネットワーク/コンピュート/DB/分析/管理/請求/セキュリティ/移行の各補強は、
     それぞれ本来の既存モジュール（11/08/10/13/12/14/06/16 等）に追加済み。すべて完全オリジナル。
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-enduser-apps", domain: "技術とサービス", icon: "🧑‍💻", title: "エンドユーザー・アプリ向けサービス",
    intro: "利用者（人）に近いサービスを集約。コールセンター（Connect）、仮想デスクトップ（WorkSpaces/AppStream）、メール（SES）、実機アプリ試験（Device Farm）、Webアプリの構築・配信（Amplify）。名前と用途をひも付けて覚える。",
    understand: [
      {
        h: "『人』に近いサービス——Connect・WorkSpaces・AppStream・SES・Device Farm",
        body:
          "<p>CCPでは、利用者に直接関わるサービスも『名前と用途』で問われます。似た名前に惑わされず、何をするものかで覚えます。</p>" +
          "<ul>" +
          "<li><strong>Amazon Connect</strong>：<strong>クラウド型のコールセンター（コンタクトセンター）</strong>を、物理設備なしで素早く構築。電話・チャットでの顧客対応窓口。</li>" +
          "<li><strong>Amazon WorkSpaces</strong>：<strong>クラウド上の仮想デスクトップ（DaaS）</strong>。どこからでも同じ業務用デスクトップにアクセスでき、データを端末に残さないので安全。テレワークに向く。</li>" +
          "<li><strong>Amazon AppStream 2.0</strong>：<strong>特定のアプリだけをストリーミング配信</strong>。端末にインストールせずブラウザ等でアプリを利用。（デスクトップ全体＝WorkSpaces、アプリ単体＝AppStream）</li>" +
          "<li><strong>Amazon SES（Simple Email Service）</strong>：アプリからの<strong>大量のメール送受信</strong>（通知・お知らせ・確認メール等）を行うサービス。</li>" +
          "<li><strong>AWS Device Farm</strong>：<strong>実際に出回っている多数のスマホ・タブレットの実機上でアプリをテスト</strong>。端末ごとの表示崩れや動作差を確認できる。</li>" +
          "</ul>" +
          "<p>『<strong>コールセンター＝Connect</strong>』『<strong>仮想デスクトップ＝WorkSpaces</strong>』『<strong>アプリ配信＝AppStream</strong>』『<strong>メール＝SES</strong>』『<strong>多数の実機で試験＝Device Farm</strong>』。</p>",
        cap: "人に近いサービス群。名前が似ていても『何をするか』で区別する（デスクトップ全体＝WorkSpaces／アプリ単体＝AppStream）。",
      },
      {
        h: "Webアプリを手早く作って公開する——Amplify と S3 静的ホスティング",
        body:
          "<ul>" +
          "<li><strong>AWS Amplify</strong>：Web／モバイルアプリの<strong>フロントエンドの構築・公開（ホスティング）・バックエンド連携</strong>をまとめて手早く行える。開発者がアプリを素早く世に出すのに向く。</li>" +
          "<li><strong>Amazon S3 の静的ウェブサイトホスティング</strong>：HTML/CSS/画像だけの<strong>静的サイトを、サーバーを立てずにS3から低コストで公開</strong>できる。CloudFrontを前に置くと高速・HTTPS化。</li>" +
          "</ul>" +
          "<p>『動的な機能つきアプリを素早く＝Amplify』『サーバー不要の静的サイトを安価に＝S3ホスティング（＋CloudFront）』。手軽な小規模サーバなら Lightsail（コンピュート章）も選択肢。</p>",
        cap: "アプリを素早く構築・公開＝Amplify、サーバー不要の静的サイトを安価に公開＝S3静的ホスティング（＋CloudFront）。",
      },
    ],
    memorize: [
      { k: "Amazon Connect", v: "<strong>クラウド型コールセンター（コンタクトセンター）</strong>。電話・チャット窓口。" },
      { k: "Amazon WorkSpaces", v: "<strong>クラウド仮想デスクトップ（DaaS）</strong>。端末にデータを残さず安全、テレワーク向き。" },
      { k: "Amazon AppStream 2.0", v: "<strong>特定アプリだけをストリーミング配信</strong>（デスクトップ全体はWorkSpaces）。" },
      { k: "Amazon SES", v: "アプリからの<strong>大量メール送受信</strong>サービス。" },
      { k: "AWS Device Farm", v: "<strong>多数の実機（スマホ/タブレット）でアプリをテスト</strong>。" },
      { k: "AWS Amplify", v: "Web/モバイルアプリの<strong>構築・公開・バックエンド連携</strong>を手早く。" },
      { k: "S3 静的ウェブサイトホスティング", v: "<strong>サーバー不要で静的サイトを安価に公開</strong>（＋CloudFrontで高速・HTTPS）。" },
    ],
    flashcards: [
      { q: "電話やチャットでの顧客対応を行うコールセンターを、物理設備なしでクラウドに構築するサービスは？", a: "Amazon Connect。" },
      { q: "社外の様々な場所から同一の業務用デスクトップに安全にアクセスできる（端末にデータを残さない）サービスは？", a: "Amazon WorkSpaces（仮想デスクトップ／DaaS）。特定アプリのみ配信ならAppStream 2.0。" },
      { q: "アプリから大量の通知メールを送受信するサービスは？", a: "Amazon SES（Simple Email Service）。" },
      { q: "多数の実機のスマホ・タブレット上でアプリの動作をテストするサービスは？", a: "AWS Device Farm。" },
      { q: "サーバーを立てずに、静的なWebサイトを低コストで公開する方法は？", a: "Amazon S3 の静的ウェブサイトホスティング（＋CloudFrontで高速化・HTTPS化）。動的アプリを素早く出すならAmplify。" },
    ],
    quiz: [
      {
        q: "電話やチャットでの顧客対応を行うコールセンター（コンタクトセンター）を、物理的な設備を持たずにクラウド上で素早く構築したい。適したサービスはどれか。",
        choices: ["Amazon Chime", "Amazon Connect", "Amazon Lex", "Amazon SES"],
        answer: 1,
        explain: "クラウド型の<strong>コンタクトセンター</strong>を提供するのは<strong>Amazon Connect</strong>。Lexはチャットボットの対話エンジン、Chimeは会議、SESはメール送信。",
      },
      {
        q: "従業員が社外の様々な場所から、同一の業務用デスクトップ環境に安全にアクセスできるようにしたい。端末側にデータを残さない構成が望ましい。適したサービスはどれか。",
        choices: ["Amazon EC2", "Amazon Lightsail", "Amazon WorkSpaces", "AWS AppConfig"],
        answer: 2,
        explain: "クラウド上の<strong>仮想デスクトップ（DaaS）</strong>は<strong>Amazon WorkSpaces</strong>。処理・データはクラウド側にあり端末に残らない。特定アプリのみ配信ならAppStream 2.0。",
      },
      {
        q: "開発したモバイルアプリを、実際に市場に出回っている多数の異なるスマートフォンやタブレットの実機上でテストしたい。適したサービスはどれか。",
        choices: ["AWS Device Farm", "Amazon WorkSpaces", "AWS CodeBuild", "Amazon Connect"],
        answer: 0,
        explain: "<strong>多数の実機上でアプリをテスト</strong>できるのは<strong>AWS Device Farm</strong>。端末ごとの表示崩れや動作差を確認できる。CodeBuildはビルドの自動化。",
      },
      {
        q: "アプリケーションから、利用者への確認メールやお知らせメールなどを大量に送信する機能を実装したい。適したサービスはどれか。",
        choices: ["Amazon SNS", "Amazon Connect", "Amazon SES", "Amazon SQS"],
        answer: 2,
        explain: "アプリからの<strong>大量のメール送受信</strong>は<strong>Amazon SES（Simple Email Service）</strong>。SNSは通知（プッシュ/SMS等）、SQSはメッセージキューで、メール配信そのものはSES。",
      },
      {
        q: "動的なサーバー処理を必要としない、HTMLと画像だけの静的なWebサイトを、サーバーを構築せず低コストで公開したい。最も適した方法はどれか。",
        choices: ["Amazon EC2 にWebサーバーを構築する", "Amazon S3 の静的ウェブサイトホスティングを利用する", "AWS Batch を利用する", "Amazon RDS を利用する"],
        answer: 1,
        explain: "サーバー不要で<strong>静的サイトを安価に公開</strong>するのは<strong>S3 の静的ウェブサイトホスティング</strong>（前段にCloudFrontを置くと高速・HTTPS化）。EC2構築は過剰、Batchは一括処理、RDSはDB。",
      },
    ],
  }
);
