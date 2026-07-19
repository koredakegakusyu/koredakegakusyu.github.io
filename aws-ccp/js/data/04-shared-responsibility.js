/* =============================================================
   コレダケAWS CCP カリキュラム — 04 責任共有モデル
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-shared-responsibility", domain: "セキュリティ", icon: "🤝", title: "責任共有モデル",
    intro: "AWSと利用者で、セキュリティの責任をどう分担するか。CCPで最も繰り返し問われる超重要テーマ。",
    understand: [
      {
        h: "「クラウドの」責任はAWS、「クラウド内の」責任は利用者",
        body:
          "<p>クラウドのセキュリティは、AWSと利用者が<strong>役割を分担</strong>します。これが<strong>責任共有モデル</strong>です。ざっくり<strong>境界は「AWSが管理する範囲」と「利用者が操作する範囲」</strong>で分かれます。</p>" +
          "<ul>" +
          "<li><strong>AWSの責任＝「クラウドのセキュリティ（Security OF the Cloud）」</strong>：データセンターの物理的な警備、サーバー・ストレージ・ネットワークなどの<strong>ハードウェアと基盤ソフト</strong>を守る。利用者には手が届かない部分。</li>" +
          "<li><strong>利用者の責任＝「クラウド内のセキュリティ（Security IN the Cloud）」</strong>：<strong>自分が置いたデータ、アクセス権（IAM）の設定、OS・アプリの更新、暗号化やファイアウォールの設定</strong>など、自分が操作できる部分。</li>" +
          "</ul>" +
          "<p>覚え方は<strong>「OF＝AWS」「IN＝利用者」</strong>。『データの管理』や『IAMの設定ミス』は<strong>利用者の責任</strong>、『物理サーバーの故障対応』は<strong>AWSの責任</strong>、と即答できるようにします。</p>",
        diagram:
          '<svg viewBox="0 0 580 235" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">責任共有モデル（AWS と 利用者の分担）</text>' +
          '<rect x="30" y="36" width="520" height="86" rx="9" fill="#dce8f3" stroke="#4a7fa8"/>' +
          '<text x="290" y="58" fill="#34567a" font-size="12.5" font-weight="800" text-anchor="middle">利用者の責任 ＝ クラウド「内」のセキュリティ（IN the Cloud）</text>' +
          '<text x="290" y="80" fill="#23252b" font-size="10.5" text-anchor="middle">データ／IAM（アクセス権）／OS・アプリの更新／暗号化／ファイアウォール設定</text>' +
          '<text x="290" y="101" fill="#6b6e76" font-size="10" text-anchor="middle">＝ 自分で設定・操作できる部分は自分が守る</text>' +
          '<rect x="30" y="132" width="520" height="86" rx="9" fill="#f2e7cd" stroke="#b28a2e"/>' +
          '<text x="290" y="154" fill="#7a5e17" font-size="12.5" font-weight="800" text-anchor="middle">AWSの責任 ＝ クラウド「の」セキュリティ（OF the Cloud）</text>' +
          '<text x="290" y="176" fill="#23252b" font-size="10.5" text-anchor="middle">データセンターの物理警備／ハードウェア／基盤ネットワーク／仮想化基盤</text>' +
          '<text x="290" y="197" fill="#6b6e76" font-size="10" text-anchor="middle">＝ 利用者が触れない土台はAWSが守る</text>' +
          "</svg>",
        cap: "OF the Cloud＝AWS（物理・基盤）、IN the Cloud＝利用者（データ・設定・アクセス権）。",
      },
      {
        h: "サービスの種類で利用者の責任範囲は変わる",
        body:
          "<p>利用者の責任範囲は<strong>使うサービスのタイプ（IaaS／PaaS／SaaS）で変わります</strong>。おおまかに、<strong>AWSに管理を任せられる部分が多いサービスほど、利用者が守る範囲は小さく</strong>なります。『責任の“境界線”がサービスによって上下に動く』とイメージすると分かりやすいです。</p>" +
          "<ul>" +
          "<li><strong>IaaS（例：EC2）</strong>：サーバーを“素”で借りる形なので自由度が高い反面、<strong>OSの更新・セキュリティパッチ適用・ミドルウェアやアプリの管理まで利用者の責任</strong>。守る範囲がいちばん広いタイプです。</li>" +
          "<li><strong>PaaS／マネージド型（例：RDS・Lambda）</strong>：土台の<strong>OS・ハードウェア・パッチ適用はAWSが担当</strong>。利用者は主に<strong>データ・アクセス権（IAM）・アプリ設定</strong>に集中できます。『DBのOSにパッチを当てる』ような作業から解放されます。</li>" +
          "<li><strong>SaaS（例：完成したアプリを使うタイプ）</strong>：アプリ本体までAWS側が管理。利用者の責任は<strong>ほぼ自分のデータとアクセス権の管理だけ</strong>に絞られます。</li>" +
          "</ul>" +
          "<p><strong>ここが最重要</strong>：どんなサービスを使っても、<strong>『データそのもの』と『誰にアクセスを許すか（IAMの設定）』は“常に”利用者の責任</strong>です。試験では『S3のバケットを誤って公開してしまった』『IAMで権限を渡しすぎた』といった<strong>設定ミスは利用者の責任</strong>、『データセンターの機器故障への対応』は<strong>AWSの責任</strong>、と即答できるようにします。マネージドサービスを選ぶほど運用の手間（責任）は減りますが、<strong>データとアクセス権の管理からは逃れられない</strong>、と覚えます。</p>",
      },
    ],
    memorize: [
      { k: "責任共有モデル", v: "AWSと利用者でセキュリティ責任を分担。OF=AWS、IN=利用者。" },
      { k: "AWSの責任(OF)", v: "物理施設・ハードウェア・基盤ネットワーク・仮想化基盤（クラウドの土台）。" },
      { k: "利用者の責任(IN)", v: "データ・IAM設定・OSやアプリの更新・暗号化・ファイアウォール設定。" },
      { k: "常に利用者の責任", v: "『データ』と『アクセス権(IAM)の設定』はどのサービスでも利用者側。" },
      { k: "EC2の責任範囲", v: "IaaSなのでOS更新・パッチ適用まで利用者。マネージドサービスより責任が広い。" },
      { k: "マネージドサービス", v: "RDS/Lambda等はOS・ハード管理をAWSが担当。利用者の負担が減る。" },
    ],
    flashcards: [
      { q: "責任共有モデルで、AWSの責任範囲は？", a: "クラウド『の』セキュリティ（OF the Cloud）＝データセンターの物理・ハードウェア・基盤ネットワークなど土台部分。" },
      { q: "責任共有モデルで、利用者の責任範囲は？", a: "クラウド『内』のセキュリティ（IN the Cloud）＝データ、IAM（アクセス権）設定、OS・アプリの更新、暗号化やファイアウォールの設定など。" },
      { q: "どのサービスでも常に利用者の責任になるものは？", a: "自分のデータと、誰にアクセスを許すか（IAMの設定）。" },
      { q: "EC2とRDSでは、OSのパッチ適用は誰の責任？", a: "EC2は利用者、RDS（マネージド）はAWS。マネージドサービスほど利用者の責任が減る。" },
    ],
    quiz: [
      {
        q: "AWSの責任共有モデルにおいて、利用者（お客様）の責任に該当するものはどれか。",
        choices: [
          "データセンターの物理的なセキュリティ",
          "サーバーのハードウェアの保守",
          "IAMによるアクセス権限の設定と自分のデータの管理",
          "AWSのネットワーク基盤の運用",
        ],
        answer: 2,
        explain: "<strong>データとIAMの設定は常に利用者の責任（IN the Cloud）</strong>。物理・ハード・基盤網はAWSの責任（OF the Cloud）。",
      },
      {
        q: "AWSの責任共有モデルにおいて、AWSの責任に該当するものはどれか。",
        choices: [
          "EC2インスタンス上のOSのパッチ適用",
          "S3に保存するデータの暗号化設定",
          "データセンターの建物やハードウェアの物理的保護",
          "IAMユーザーへの権限付与",
        ],
        answer: 2,
        explain: "<strong>物理施設・ハードウェアの保護はAWSの責任（OF the Cloud）</strong>。OSパッチ・暗号化設定・IAMは利用者側。",
      },
      {
        q: "EC2（IaaS）を利用する場合、次のうち利用者の責任となるものはどれか。",
        choices: [
          "物理サーバーの故障対応",
          "ゲストOSのセキュリティパッチ適用",
          "AWSリージョンの電源管理",
          "ハイパーバイザ（仮想化基盤）の保守",
        ],
        answer: 1,
        explain: "EC2ではOSより上は利用者の責任。<strong>ゲストOSのパッチ適用は利用者</strong>。物理・電源・仮想化基盤はAWS。",
      },
    ],
  }
);
