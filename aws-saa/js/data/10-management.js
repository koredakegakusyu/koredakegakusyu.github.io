/* =============================================================
   SAA Forge カリキュラム — 10 管理・監視
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "observability", domain: "管理・監視", icon: "📈", title: "CloudWatch・CloudTrail・Config",
    intro: "『見える化』3兄弟。性能/ログ・操作記録・設定準拠で役割が違う。名前で一発で言えるように。",
    understand: [
      {
        h: "『何を見たいか』で3つを使い分ける",
        body: "<p>システムを運用するには『見える化』が欠かせないが、AWSの3大サービスは<strong>見る対象がそれぞれ違う</strong>。混同が典型的な失点源なので、対象で明確に分ける。<strong>CloudWatch=リソースの調子(性能・ログ)</strong>、<strong>CloudTrail=誰が何をしたか(操作の記録)</strong>、<strong>Config=設定が正しいか(構成の状態)</strong>。この3つを名前から即座に言えるようにするのが目標だ。</p>",
        diagram:
          '<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="50" width="190" height="80" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="115" y="78" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">CloudWatch</text><text x="115" y="98" fill="#9aa6bd" font-size="10" text-anchor="middle">性能(メトリクス)・ログ</text><text x="115" y="114" fill="#9aa6bd" font-size="10" text-anchor="middle">アラーム→自動対応</text>\
<rect x="225" y="50" width="190" height="80" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="78" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">CloudTrail</text><text x="320" y="98" fill="#9aa6bd" font-size="10" text-anchor="middle">誰が・いつ・何を</text><text x="320" y="114" fill="#9aa6bd" font-size="10" text-anchor="middle">API操作の監査ログ</text>\
<rect x="430" y="50" width="190" height="80" rx="10" fill="#161e30" stroke="#51cf9b"/><text x="525" y="78" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">Config</text><text x="525" y="98" fill="#9aa6bd" font-size="10" text-anchor="middle">設定の変更履歴</text><text x="525" y="114" fill="#9aa6bd" font-size="10" text-anchor="middle">準拠の評価</text>\
<text x="320" y="160" fill="#9aa6bd" font-size="10" text-anchor="middle">性能/ログ→CW / 操作の追跡→CloudTrail / 設定の準拠→Config</text>\
</svg>',
        cap: "見る対象で区別。性能/ログ=CloudWatch、操作=CloudTrail、設定=Config。",
      },
      {
        h: "それぞれの役割と使いどころ",
        body: "<ul><li><strong>CloudWatch</strong>＝リソースの<strong>メトリクス(CPU使用率など)とログ</strong>を監視し、<strong>アラーム</strong>で閾値超過を検知して通知(SNS)や自動アクションを起こす。<strong>Auto Scalingの発火元</strong>でもある。注意点として、EC2の<strong>メモリやディスク使用率は標準では取れず、CloudWatchエージェント</strong>の導入が必要(標準メトリクスはCPU等のみ)。</li><li><strong>CloudTrail</strong>＝アカウント内の<strong>すべてのAPI操作(誰が・いつ・どのリソースに・何をしたか)を記録</strong>する監査ログ。『誰がこのS3バケットを削除したのか』を後から追跡する、セキュリティ調査やコンプライアンスの基盤。組織全体を集約する<strong>Organization Trail</strong>や、改ざん防止のログ検証もある。</li><li><strong>AWS Config</strong>＝リソースの<strong>設定の変更履歴を記録し、あるべき基準(ルール)に準拠しているか継続評価</strong>する。『EBSは必ず暗号化』『SGで全開放を禁止』などのルール違反を検知し、自動修復もできる。</li></ul>",
      },
    ],
    memorize: [
      { k: "CloudWatch", v: "<strong>メトリクス＋ログ＋アラーム＋ダッシュボード</strong>。Auto Scalingの起点。" },
      { k: "CloudWatchエージェント", v: "EC2の<strong>メモリ/ディスク等のOS内メトリクス</strong>取得に必要(標準はCPU等のみ)。" },
      { k: "CloudTrail", v: "<strong>API操作の監査ログ</strong>(誰が/いつ/何を)。セキュリティ調査・コンプラ。" },
      { k: "Organization Trail", v: "組織全体のCloudTrailを<strong>集約S3</strong>に一元化。ログ検証で改ざん防止。" },
      { k: "AWS Config", v: "<strong>設定変更履歴と準拠評価</strong>。望ましくない構成を検知/自動修復。" },
      { k: "見分け", v: "性能/ログ→CloudWatch / 操作追跡→CloudTrail / 設定準拠→Config。" },
      { k: "通知連携", v: "CloudWatchアラーム→<strong>SNS</strong>でメール/自動処理。" },
    ],
    flashcards: [
      { q: "誰がS3バケットを削除したか追跡したい。使うのは？", a: "CloudTrail" },
      { q: "EC2のCPU高で通知し台数を自動で増やす起点は？", a: "CloudWatch(アラーム＋メトリクス)" },
      { q: "リソース設定がポリシー準拠か継続評価したい。", a: "AWS Config" },
      { q: "EC2のメモリ使用率を監視したい。必要なのは？", a: "CloudWatchエージェントの導入" },
      { q: "CloudWatchアラームの通知先によく使うのは？", a: "SNS" },
    ],
    quiz: [
      {
        q: "セキュリティ監査で『誰が、いつ、どのリソースに、どのAPI操作をしたか』を追跡する必要がある。使うべきサービスは？",
        choices: ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "VPC Flow Logs"],
        answer: 1,
        explain: "API操作の証跡＝<strong>CloudTrail</strong>。CloudWatchは性能/ログ、Configは設定準拠で役割が異なる。",
      },
      {
        q: "全リソースが社内基準(例: EBSは必ず暗号化)に準拠しているか継続評価し、違反を検知・自動修復したい。最適なサービスは？",
        choices: ["CloudTrail", "AWS Config", "CloudWatch Logs", "GuardDuty"],
        answer: 1,
        explain: "<strong>設定の準拠評価/自動修復＝AWS Config</strong>。",
      },
      {
        q: "EC2のメモリ使用率に基づいてアラームを上げたいが、標準メトリクスに表示されない。必要な対応は？",
        choices: ["CloudTrailを有効化", "CloudWatchエージェントを導入してカスタムメトリクスを送る", "Configルールを作る", "再起動"],
        answer: 1,
        explain: "メモリ/ディスク等のOS内メトリクスは<strong>CloudWatchエージェント</strong>で取得・送信する必要がある(標準はCPU等のみ)。",
      },
    ],
  },
  {
    id: "ssm", domain: "管理・監視", icon: "🛠️", title: "Systems Manager と運用自動化",
    intro: "サーバー群の運用を一元化。パッチ・コマンド・踏み台レスアクセス・パラメータ管理が頻出。",
    understand: [
      {
        h: "多数のサーバーを安全・効率的に運用する道具箱",
        body: "<p>サーバーが増えると、1台ずつSSHでログインしてパッチを当てたりコマンドを打ったりするのは現実的でない。<strong>AWS Systems Manager(SSM)</strong>は、多数のインスタンスの運用を<strong>一元化・自動化</strong>する『道具箱』だ。中でもSAAで頻出の機能を押さえる。</p>",
        diagram:
          '<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="240" y="20" width="160" height="40" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="44" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">Systems Manager</text>\
<rect x="20" y="95" width="140" height="50" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="90" y="116" fill="#51cf9b" font-size="10" text-anchor="middle">Session Manager</text><text x="90" y="132" fill="#6b7691" font-size="8" text-anchor="middle">踏み台/鍵なしアクセス</text>\
<rect x="175" y="95" width="140" height="50" rx="8" fill="#0c1220" stroke="#4dabf7"/><text x="245" y="116" fill="#4dabf7" font-size="10" text-anchor="middle">Patch Manager</text><text x="245" y="132" fill="#6b7691" font-size="8" text-anchor="middle">パッチ自動適用</text>\
<rect x="330" y="95" width="140" height="50" rx="8" fill="#0c1220" stroke="#ffc955"/><text x="400" y="116" fill="#ffc955" font-size="10" text-anchor="middle">Run Command</text><text x="400" y="132" fill="#6b7691" font-size="8" text-anchor="middle">一斉コマンド実行</text>\
<rect x="485" y="95" width="135" height="50" rx="8" fill="#0c1220" stroke="#b08adf"/><text x="552" y="116" fill="#b08adf" font-size="10" text-anchor="middle">Parameter Store</text><text x="552" y="132" fill="#6b7691" font-size="8" text-anchor="middle">設定/秘密の保管</text>\
<line x1="300" y1="60" x2="90" y2="93" stroke="#9aa6bd" stroke-width="1.2"/><line x1="312" y1="60" x2="245" y2="93" stroke="#9aa6bd" stroke-width="1.2"/><line x1="328" y1="60" x2="400" y2="93" stroke="#9aa6bd" stroke-width="1.2"/><line x1="340" y1="60" x2="552" y2="93" stroke="#9aa6bd" stroke-width="1.2"/>\
</svg>',
        cap: "Systems Managerは踏み台レスアクセス・パッチ・一斉実行・パラメータ管理を一元提供。",
      },
      {
        h: "主要機能と使いどころ",
        body: "<ul><li><strong>Session Manager</strong>＝<strong>SSHキーも踏み台(bastion)サーバーも不要</strong>で、ポートを開けずに安全にシェルアクセスする。通信はAWS内で完結し、操作内容を<strong>監査</strong>できる。SSHポート(22)を閉じてセキュリティを高めたいときの定番解答。</li><li><strong>Patch Manager</strong>＝OSやアプリの<strong>パッチ適用を自動化</strong>(スケジュール・パッチベースライン)。多数のサーバーのパッチ運用を一括管理。</li><li><strong>Run Command</strong>＝多数のインスタンスへ<strong>コマンドを一斉実行</strong>(SSHせずに)。</li><li><strong>Parameter Store</strong>＝設定値や秘密(SecureStringでKMS暗号化)の階層的な保管(標準は無料)。</li></ul><p>『踏み台なしで安全にEC2へ』→Session Manager、『一括パッチ』→Patch Manager、『一斉コマンド』→Run Command。</p>",
      },
    ],
    memorize: [
      { k: "Session Manager", v: "<strong>SSHキー/踏み台/ポート開放なし</strong>で安全にシェル。操作は監査可。" },
      { k: "Patch Manager", v: "<strong>パッチ適用の自動化</strong>(スケジュール・ベースライン)。" },
      { k: "Run Command", v: "多数インスタンスへ<strong>コマンド一斉実行</strong>(SSH不要)。" },
      { k: "Parameter Store", v: "設定/秘密の階層管理(標準無料・SecureStringでKMS暗号化)。" },
      { k: "用途", v: "踏み台レスアクセス→Session Manager / 一括運用→Run Command/Patch Manager。" },
    ],
    flashcards: [
      { q: "踏み台サーバーやSSHキーなしでEC2に安全にアクセスしたい。", a: "Systems Manager Session Manager" },
      { q: "多数のEC2へOSパッチを自動適用したい。", a: "Patch Manager" },
      { q: "多数インスタンスへ同じコマンドを一斉実行したい。", a: "Run Command" },
      { q: "SSHポート22を閉じても運用アクセスを残す方法は？", a: "Session Manager(ポート開放不要)" },
    ],
    quiz: [
      {
        q: "セキュリティ強化のため、EC2へのSSHポート(22)を閉じ、踏み台サーバーも廃止したい。それでも運用担当は必要時にシェルアクセスでき、操作は監査したい。最適なのは？",
        choices: ["Elastic IPで直接SSH", "Systems Manager Session Manager", "NAT Gateway", "VPN必須化"],
        answer: 1,
        explain: "<strong>Session Manager</strong>はポート開放/踏み台/SSHキー不要で安全にアクセスでき、操作ログも残せる。",
      },
    ],
  },
  {
    id: "cost-mgmt", domain: "管理・監視", icon: "💵", title: "コスト管理と最適化ツール",
    intro: "可視化・予算・推奨。Cost Explorer/Budgets/Trusted Advisor/Compute Optimizerの役割。",
    understand: [
      {
        h: "コストを『見る・止める・最適化する』ツール群",
        body: "<p>クラウドは使った分だけ課金されるため、コストの管理が重要になる。AWSにはコストを<strong>『見る(可視化)・止める(予算超過の通知)・最適化する(推奨)』</strong>ためのツールが揃っている。役割で区別するのがSAAの要点だ。</p>",
        diagram:
          '<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="50" width="145" height="80" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="92" y="78" fill="#4dabf7" font-size="11" font-weight="700" text-anchor="middle">Cost Explorer</text><text x="92" y="98" fill="#9aa6bd" font-size="9" text-anchor="middle">可視化・傾向分析</text>\
<rect x="178" y="50" width="145" height="80" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="250" y="78" fill="#ff9d3c" font-size="11" font-weight="700" text-anchor="middle">Budgets</text><text x="250" y="98" fill="#9aa6bd" font-size="9" text-anchor="middle">予算アラート/アクション</text>\
<rect x="336" y="50" width="145" height="80" rx="10" fill="#161e30" stroke="#51cf9b"/><text x="408" y="74" fill="#51cf9b" font-size="11" font-weight="700" text-anchor="middle">Trusted Advisor</text><text x="408" y="94" fill="#9aa6bd" font-size="9" text-anchor="middle">5観点の点検</text>\
<rect x="494" y="50" width="126" height="80" rx="10" fill="#161e30" stroke="#b08adf"/><text x="557" y="74" fill="#b08adf" font-size="11" font-weight="700" text-anchor="middle">Compute</text><text x="557" y="90" fill="#b08adf" font-size="11" font-weight="700" text-anchor="middle">Optimizer</text><text x="557" y="108" fill="#9aa6bd" font-size="9" text-anchor="middle">適正サイズ推奨</text>\
<text x="320" y="160" fill="#9aa6bd" font-size="10" text-anchor="middle">見る→Cost Explorer / 止める→Budgets / 点検→Trusted Advisor / 適正化→Compute Optimizer</text>\
</svg>',
        cap: "コストツールの役割地図。可視化・予算・点検・適正サイズで使い分ける。",
      },
      {
        h: "各ツールの役割",
        body: "<ul><li><strong>Cost Explorer</strong>＝コストと使用量の<strong>可視化・傾向分析</strong>(どのサービスにいくらかかっているか)。</li><li><strong>AWS Budgets</strong>＝<strong>予算を設定し、超過(または超過予測)時にアラート</strong>を出す。アクションで自動対応も可能。</li><li><strong>Cost & Usage Report(CUR)</strong>＝最も詳細な請求明細。S3に出力し、AthenaやQuickSightで深掘り分析する。</li><li><strong>Trusted Advisor</strong>＝<strong>コスト最適化・セキュリティ・パフォーマンス・耐障害性・サービス上限</strong>の5観点でベストプラクティスを点検し推奨を出す(未使用リソースや、上限への接近を検知)。</li><li><strong>Compute Optimizer</strong>＝EC2/EBS/Lambda等の使用状況を分析し、<strong>過剰/不足のない適正サイズ(rightsizing)を推奨</strong>する。</li></ul>",
      },
    ],
    memorize: [
      { k: "Cost Explorer", v: "コストの<strong>可視化・傾向分析</strong>。" },
      { k: "Budgets", v: "<strong>予算アラート/アクション</strong>(超過/超過予測で通知・自動対応)。" },
      { k: "Trusted Advisor", v: "5観点(コスト/セキュリティ/<strong>性能/耐障害性/サービス上限</strong>)の点検・推奨。" },
      { k: "Compute Optimizer", v: "リソースの<strong>適正サイズ(rightsizing)推奨</strong>。" },
      { k: "CUR", v: "最も詳細な請求明細。S3→Athena/QuickSightで分析。" },
      { k: "見分け", v: "見る→Cost Explorer / 止める→Budgets / 点検→Trusted Advisor / 適正化→Compute Optimizer。" },
    ],
    flashcards: [
      { q: "予算を超えそうなときに通知を受けたい。使うのは？", a: "AWS Budgets" },
      { q: "コストの内訳と傾向を可視化したい。", a: "Cost Explorer" },
      { q: "EC2が過剰スペックか診断し適正サイズを知りたい。", a: "Compute Optimizer" },
      { q: "セキュリティ/コスト/サービス上限のベストプラクティス点検は？", a: "Trusted Advisor" },
    ],
    quiz: [
      {
        q: "月次のAWS利用料が予算を超えそうなときに自動で通知を受け取り、必要なら対応をトリガーしたい。最適なサービスは？",
        choices: ["Cost Explorer", "AWS Budgets", "CloudWatchのみ", "Trusted Advisor"],
        answer: 1,
        explain: "<strong>予算アラート/アクション＝AWS Budgets</strong>。Cost Explorerは可視化・分析が主。",
      },
      {
        q: "稼働中のEC2やLambdaが過剰スペックで無駄なコストが出ていないか分析し、適正なサイズの推奨を得たい。最適なサービスは？",
        choices: ["Trusted Advisor", "Compute Optimizer", "Cost Explorer", "Budgets"],
        answer: 1,
        explain: "リソースの<strong>適正サイズ(rightsizing)推奨＝Compute Optimizer</strong>。Trusted Advisorは広範な点検だが詳細なrightsizingはCompute Optimizerが専門。",
      },
    ],
  }
);
