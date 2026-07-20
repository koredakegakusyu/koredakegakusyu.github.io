/* =============================================================
   コレダケ学習AWS CCP カリキュラム — 18 開発者ツール・アプリ連携
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-devtools", domain: "技術とサービス", icon: "🛠️", title: "開発者ツール・アプリ連携",
    intro: "コードの管理〜自動デプロイ（Code系＝CI/CD）、開発を助けるツール、アプリをつなぐStep Functions・EventBridge。",
    understand: [
      {
        h: "コードを自動でビルド・デプロイ——Code系（CI/CD）",
        body:
          "<p>コードの変更を<strong>自動でテスト・ビルドし本番へ届ける</strong>仕組みが<strong>CI/CD</strong>です。AWSではこれを『Code』で始まる4サービスで実現します。役割を流れで覚えます。</p>" +
          "<ul>" +
          "<li><strong>AWS CodeCommit</strong>：<strong>ソースコードを保管しておく置き場（Gitリポジトリ）</strong>。誰がいつ何行変えたかの履歴が残り、複数人で同じコードを安全に編集できます。<br><strong>試験のキーワード：</strong>「<strong>ソースコードの保管・バージョン管理</strong>」「Gitリポジトリ」→ CodeCommit。</li>" +
          "<li><strong>AWS CodeBuild</strong>：預けたコードを<strong>実行できる形に組み立て（ビルド）、自動テストを走らせる</strong>サービス。ビルド用のサーバーを自前で用意する必要がありません。<br><strong>試験のキーワード：</strong>「<strong>ビルド</strong>」「コンパイル」「<strong>自動テストを実行</strong>」→ CodeBuild。</li>" +
          "<li><strong>AWS CodeDeploy</strong>：出来上がったものを <strong>EC2 や Lambda などの本番環境へ自動で配置（デプロイ）</strong>します。少しずつ切り替えるなど、<strong>停止時間を抑えた配布</strong>ができます。<br><strong>試験のキーワード：</strong>「<strong>デプロイ</strong>」「本番環境へ自動で反映」「リリース作業の自動化」→ CodeDeploy。</li>" +
          "<li><strong>AWS CodePipeline</strong>：上の3つを<strong>1本の流れ（パイプライン）としてつなぎ、コードを変更したら最後まで自動で流す“司令塔”</strong>です。個々の作業ではなく<strong>全体の流れを自動化</strong>する役割だ、という点が問われます。<br><strong>試験のキーワード：</strong>「<strong>CI/CDパイプライン</strong>」「一連の流れを自動化」「コード変更から本番反映まで自動で」→ CodePipeline。</li>" +
          "</ul>" +
          "<p>流れは『<strong>CodeCommit（保管）→ CodeBuild（ビルド・テスト）→ CodeDeploy（デプロイ）</strong>』を <strong>CodePipeline</strong> が一本につないで自動化、というイメージです。CI/CD にすると、コードを変更するたびに<strong>手作業なしで自動的にテスト・リリース</strong>できるため、リリースが速くなり人為ミスも減ります。『毎回、手作業で本番へアップロードする』ような選択肢は CI/CD の考え方に反する、と判断できるようにします。</p>",
        diagram:
          '<svg viewBox="0 0 580 160" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">CI/CDパイプライン（CodePipelineがつなぐ）</text>' +
          (function () {
            var steps = [
              { n: "CodeCommit", d: "コード保管(Git)", c: "#dce8f3", st: "#4a7fa8" },
              { n: "CodeBuild", d: "ビルド・テスト", c: "#f2e7cd", st: "#b28a2e" },
              { n: "CodeDeploy", d: "本番へデプロイ", c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", w = 150, h = 60, gap = 40, x0 = 30, y = 52;
            steps.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 27) + '" fill="#23252b" font-size="12.5" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 46) + '" fill="#5a5346" font-size="9.5" text-anchor="middle">' + p.d + "</text>";
              if (i < steps.length - 1) { var ax = x + w + 6; s += '<line x1="' + ax + '" y1="' + (y + h / 2) + '" x2="' + (ax + gap - 12) + '" y2="' + (y + h / 2) + '" stroke="#8a8f98" stroke-width="2"/><polygon points="' + (ax + gap - 12) + "," + (y + h / 2) + " " + (ax + gap - 20) + "," + (y + h / 2 - 5) + " " + (ax + gap - 20) + "," + (y + h / 2 + 5) + '" fill="#8a8f98"/>'; }
            });
            s += '<rect x="30" y="120" width="' + (w * 3 + gap * 2) + '" height="26" rx="6" fill="#eef4f9" stroke="#9db8cd"/><text x="290" y="138" fill="#34567a" font-size="10.5" font-weight="700" text-anchor="middle">CodePipeline：この流れ全体を1本につないで自動化する</text>';
            return s;
          })() +
          "</svg>",
        cap: "保管(CodeCommit)→ビルド(CodeBuild)→デプロイ(CodeDeploy)を、CodePipelineが1本につないで自動化する。",
      },
      {
        h: "開発を助けるツールと、アプリをつなぐサービス",
        body:
          "<p>開発・運用を楽にするツールと、サービス同士を連携させる仕組みも問われます。</p>" +
          "<ul>" +
          "<li><strong>Cloud9</strong>：ブラウザで使える<strong>統合開発環境（IDE）</strong>。<strong>CloudShell</strong>：ブラウザから使えるコマンドライン。</li>" +
          "<li><strong>X-Ray</strong>：アプリの処理を追跡し<strong>ボトルネックや障害の原因を可視化</strong>する（デバッグ・分析）。</li>" +
          "<li><strong>CloudFormation / CDK</strong>：インフラをコードで自動構築（CDKはプログラミング言語で書ける）。</li>" +
          "<li><strong>Amplify</strong>：Web・モバイルアプリを素早く開発・公開する。</li>" +
          "</ul>" +
          "<p>サービス連携（アプリ統合）では、<strong>Step Functions</strong>が<strong>複数の処理を順序立てて実行するワークフロー</strong>を作り、<strong>EventBridge</strong>が<strong>『あるイベントが起きたら別のサービスを動かす』というイベント連携</strong>を担います。</p>",
      },
    ],
    memorize: [
      { k: "CodeCommit", v: "ソースコードを保管するGitリポジトリ。" },
      { k: "CodeBuild", v: "コードをビルド・テストする。" },
      { k: "CodeDeploy", v: "成果物を本番環境へ自動デプロイする。" },
      { k: "CodePipeline", v: "保管→ビルド→デプロイの流れを1本につなぐCI/CDの司令塔。" },
      { k: "Cloud9 / CloudShell", v: "Cloud9=ブラウザのIDE。CloudShell=ブラウザのコマンドライン。" },
      { k: "X-Ray", v: "アプリの処理を追跡しボトルネック・障害原因を可視化（デバッグ）。" },
      { k: "Step Functions", v: "複数の処理を順序立てて実行するワークフローを作る。" },
      { k: "EventBridge", v: "イベントをきっかけに別サービスを動かすイベント連携基盤。" },
    ],
    flashcards: [
      { q: "CodeCommit・CodeBuild・CodeDeploy・CodePipelineの役割は？", a: "CodeCommitはコード保管(Git)、CodeBuildはビルド・テスト、CodeDeployは本番へデプロイ、CodePipelineはその流れ全体をつないで自動化する司令塔。" },
      { q: "コードの変更を自動でビルド・テスト・デプロイまで流す仕組みを何という？", a: "CI/CD（継続的インテグレーション/継続的デリバリー）。AWSではCodePipelineでつなぐ。" },
      { q: "アプリの処理を追跡してボトルネックや障害の原因を可視化するサービスは？", a: "AWS X-Ray。" },
      { q: "複数の処理を順序立てて実行するワークフローを作るサービスは？", a: "AWS Step Functions。" },
      { q: "『あるイベントが起きたら別のサービスを動かす』イベント連携を担うサービスは？", a: "Amazon EventBridge。" },
    ],
    quiz: [
      {
        q: "ソースコードの変更をきっかけに、ビルド・テスト・デプロイまでの一連の流れを自動化するCI/CDパイプラインを構築するAWSサービスはどれか。",
        choices: ["AWS CodePipeline", "AWS CloudTrail", "Amazon CloudWatch", "AWS Config"],
        answer: 0,
        explain: "CI/CDの流れ全体を1本につないで自動化するのは<strong>AWS CodePipeline</strong>。",
      },
      {
        q: "ソースコードを保管するためのGitベースのリポジトリを提供するAWSサービスはどれか。",
        choices: ["AWS CodeBuild", "AWS CodeCommit", "AWS CodeDeploy", "Amazon S3"],
        answer: 1,
        explain: "コードを保管するGitリポジトリは<strong>AWS CodeCommit</strong>。ビルドはCodeBuild、デプロイはCodeDeploy。",
      },
      {
        q: "分散したアプリケーションのリクエストの流れを追跡・可視化し、性能のボトルネックやエラーの原因を分析するサービスはどれか。",
        choices: ["AWS X-Ray", "AWS CodeDeploy", "Amazon SNS", "AWS Cloud9"],
        answer: 0,
        explain: "アプリの処理を追跡しボトルネック・障害原因を可視化するのは<strong>AWS X-Ray</strong>。",
      },
      {
        q: "複数のAWSサービスを使った処理を、あらかじめ定めた順序やルールに従って実行するワークフローを構築したい。適したサービスはどれか。",
        choices: ["AWS Step Functions", "Amazon EventBridge", "AWS CodeCommit", "AWS Cloud9"],
        answer: 0,
        explain: "処理を順序立てて実行するワークフローは<strong>AWS Step Functions</strong>。イベント起点の連携はEventBridge。",
      },
    ],
  }
);
