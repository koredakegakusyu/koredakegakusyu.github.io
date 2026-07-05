# SAA Forge — AWS SAA 合格サイト

AWS認定ソリューションアーキテクト アソシエイト(SAA-C03)に、**このサイト一つで**合格することを狙った学習サイト。
「理解する(青)」と「暗記する(橙)」を切り分け、図解と要点で理解、本番想定の確認テストで仕上げる。

## カバー範囲（全38科目 / 約60サービス）

| ドメイン | 主な科目・サービス |
|---|---|
| 土台 | グローバルインフラ(Region/AZ/Edge/Outposts) ／ Well-Architected・責任共有 ／ Organizations・SCP |
| 認証・IAM | IAM ／ STS・フェデレーション・IAM Identity Center ／ Cognito |
| セキュリティ | KMS・暗号化・ACM ／ Secrets Manager・Parameter Store ／ WAF・Shield・Firewall ／ GuardDuty・Inspector・Macie・Security Hub |
| コンピューティング | EC2・配置グループ ／ 料金モデル ／ ELB・Auto Scaling ／ Lambda ／ ECS/EKS/Fargate ／ Beanstalk・Batch・Lightsail |
| ストレージ | S3・機能 ／ ストレージクラス・ライフサイクル ／ EBS・EFS・FSx ／ Storage Gateway・AWS Backup |
| データベース | RDS・Aurora ／ DynamoDB ／ ElastiCache ／ Redshift・Neptune・Timestream・QLDB等 |
| ネットワーキング | VPC ／ エンドポイント・PrivateLink・TGW・DX・VPN ／ Route 53 ／ CloudFront・Global Accelerator |
| アプリ統合 | SQS・SNS ／ EventBridge・Step Functions ／ Kinesis・Amazon MQ |
| 分析 | Athena・Glue・Lake Formation ／ EMR・OpenSearch・QuickSight |
| 管理・監視 | CloudWatch・CloudTrail・Config ／ Systems Manager ／ コスト管理(Budgets/Cost Explorer/Trusted Advisor) |
| 移行・DR | Snow・DataSync・DMS・Transfer Acceleration ／ DR戦略・RTO/RPO |

各科目に **図解・要点暗記・フラッシュカード・本番型確認テスト** を収録（確認テスト計75問／フラッシュカード計155枚）。

## 方針

- **シックなライトテーマ**（ミルクホワイト基調）。落ち着いて学べる見た目
- **ゲーミフィケーション無し**。合格に必要なことだけを提供
- **本番そっくりの出題**：シナリオ型・「最も〜なのは」・もっともらしいダミー選択肢。即採点＋ひっかけの理由まで解説
- **ビルド不要・依存ゼロ**。そのまま開ける

## 表示する

```
npx serve .
```
または Claude Code の `/run` / プレビューで表示。URL例: http://localhost:4321/

## 構成

```
aws-saa-master/
├── index.html        ← シェル＋各データファイルを読み込む
├── css/style.css     ← ライトテーマ・レイアウト
└── js/
    ├── data/         ← ★カリキュラム本体（ドメイン別ファイル）
    │   ├── 01-foundation.js ... 11-migration-dr.js
    └── app.js        ← ナビ生成・ルーティング・カード・採点
```

## 科目を追加・編集するには

該当ドメインの `js/data/NN-*.js` の `window.CURRICULUM.push({...})` に1ブロック足すだけ。
新ドメインを増やすときは新ファイルを作り、`index.html` に `<script>` を1行追加。書式は各ファイル冒頭コメント参照。

## 今後の任意拡張

- **模試モード**：全科目からランダム出題し、スコアと弱点ドメインを表示（本番の総仕上げ）
- 説明文のさらなる簡潔化（網羅を優先したため、要点を保ちつつ短縮可能）
- 学習の最終確認には、本サイト＋公式模擬試験の併用が確実です。
