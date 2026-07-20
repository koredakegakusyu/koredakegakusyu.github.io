/* =============================================================
   コレダケAWS CCP カリキュラム — 08 コンピューティング
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-compute", domain: "技術とサービス", icon: "🖥️", title: "コンピューティング（EC2・Lambda）",
    intro: "仮想サーバーEC2とその購入オプション、サーバーレスのLambda、コンテナ、オートスケーリング。",
    understand: [
      {
        h: "コンピュートの補強——Lightsail・AWS Batch・プレイスメントグループ・エッジ/ハイブリッド",
        body: "<ul><li><strong>Amazon Lightsail</strong>：<strong>簡単・定額・低価格</strong>で小規模サーバやWebサイトを手軽に立てられる入門向け。個人ブログや小さなアプリに最適。</li><li><strong>AWS Batch</strong>：<strong>大量のバッチ処理（一括処理）ジョブ</strong>を、必要な計算資源を自動確保して並列実行するマネージドサービス。夜間の大量計算等。</li><li><strong>プレイスメントグループ</strong>：EC2の<strong>物理配置を制御</strong>。クラスター＝近くに固めて低遅延（HPC向け）、スプレッド＝別ハードに分散して同時障害を回避。</li><li><strong>エッジ/ハイブリッド</strong>：<strong>Outposts</strong>＝AWS機器を自社データセンターに設置、<strong>Local Zones</strong>＝大都市近くで低遅延、<strong>Wavelength</strong>＝<strong>5G</strong>網内に置きモバイルへ超低遅延。</li></ul>",
        cap: "手軽な定額＝Lightsail、大量一括処理＝Batch、配置制御＝プレイスメントグループ、5G超低遅延＝Wavelength。",
      },

      {
        h: "EC2——AWS上の仮想サーバー",
        body:
          "<p><strong>Amazon EC2（Elastic Compute Cloud）</strong>は、AWS 上に<strong>仮想サーバーを立てて使う</strong>最も基本的なサービスです（IaaS）。物理サーバーを買う代わりに、必要なスペックのサーバーを<strong>数分で起動</strong>でき、不要になれば止めて課金を止められます。用途に応じて <strong>CPU・メモリの大きさ（インスタンスタイプ）</strong>を選び、汎用・計算重視・メモリ重視といった“ファミリー”から最適なものを選べます。OS とその上のアプリは利用者が管理します（責任共有モデルの IaaS）。起動時の OS・ソフト構成は <strong>AMI（マシンイメージ＝テンプレート）</strong>から選んで揃えます。</p>" +
          "<p>アクセスの増減に自動で対応する仕組みが 2 つあります。台数を自動で増減する <strong>Auto Scaling</strong> と、アクセスを複数のサーバーへ振り分ける <strong>ロードバランサー（ELB）</strong>です。この 2 つを組み合わせると『混んだら自動で増え、空いたら自動で減る』構成になり、<strong>可用性（止まりにくさ）とコスト効率</strong>が両立します。さらに、使い方に合わせて料金プラン（オンデマンド／リザーブド／スポット等・次項）を選べば、同じ性能でもコストを大きく下げられます。</p>",
      },
      {
        h: "インスタンスタイプの選び方——用途に合わせて「形」を選ぶ",
        body:
          "<p>EC2 は「サーバーの大きさ」だけでなく、<strong>用途に合わせた“形（ファミリー）”</strong>を選べます。同じ料金を払うなら、仕事に合った形を選んだほうが速く・安くなります。公式試験ガイドでも『さまざまな EC2 インスタンスタイプの適切な使用方法』が対象スキルに挙がっています。</p>" +
          "<ul>" +
          "<li><strong>汎用</strong>：CPU・メモリ・ネットワークがバランス型。Web サーバーや小〜中規模アプリなど<strong>迷ったらまずここ</strong>。</li>" +
          "<li><strong>コンピューティング最適化</strong>：<strong>CPU の性能が高い</strong>タイプ。動画のエンコード、科学技術計算、機械学習の推論など<strong>計算がとにかく重い</strong>処理向け。</li>" +
          "<li><strong>メモリ最適化</strong>：<strong>メモリが大きい</strong>タイプ。大規模データベースや、大量データをメモリ上に載せて処理する用途向け。</li>" +
          "<li><strong>ストレージ最適化</strong>：<strong>ディスクの読み書きが速い</strong>タイプ。データウェアハウスや大量のログ処理など<strong>ディスクI/Oが多い</strong>処理向け。</li>" +
          "<li><strong>高速コンピューティング</strong>：<strong>GPU</strong> を積んだタイプ。機械学習の学習処理や 3D レンダリング向け。</li>" +
          "</ul>" +
          "<p><strong>選び方の考え方</strong>：まず汎用で動かし、<strong>どこが足りないか（CPU なのかメモリなのか）を見てから</strong>専用タイプへ変える、が基本です。過剰なスペックは無駄なコストになるため、実際の使用状況に合わせてサイズを見直す<strong>「適切なサイジング（ライトサイジング）」</strong>がコスト最適化の要になります（AWS Compute Optimizer が最適なサイズを提案してくれます）。</p>",
        diagram:
          '<svg viewBox="0 0 580 190" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13.5" font-weight="700" fill="#23252b">インスタンスタイプ＝用途に合わせた「形」を選ぶ</text><rect x="20" y="36" width="106" height="120" rx="9" fill="#dce8f3" stroke="#4a7fa8"/><text x="73" y="58" text-anchor="middle" font-size="11.5" font-weight="800" fill="#34567a">汎用</text><text x="73" y="80" text-anchor="middle" font-size="9.5" fill="#6b6e76">バランス型</text><text x="73" y="104" text-anchor="middle" font-size="10" fill="#23252b">Webサーバー</text><text x="73" y="120" text-anchor="middle" font-size="10" fill="#23252b">一般的なアプリ</text><text x="73" y="142" text-anchor="middle" font-size="9.5" fill="#4a7fa8">迷ったらここ</text><rect x="134" y="36" width="106" height="120" rx="9" fill="#f2e7cd" stroke="#b28a2e"/><text x="187" y="58" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5e17">コンピューティング</text><text x="187" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5e17">最適化</text><text x="187" y="92" text-anchor="middle" font-size="9.5" fill="#6b6e76">CPUが強い</text><text x="187" y="116" text-anchor="middle" font-size="10" fill="#23252b">動画エンコード</text><text x="187" y="132" text-anchor="middle" font-size="10" fill="#23252b">科学技術計算</text><rect x="248" y="36" width="106" height="120" rx="9" fill="#dcecdd" stroke="#5c9160"/><text x="301" y="58" text-anchor="middle" font-size="11.5" font-weight="800" fill="#366b3c">メモリ最適化</text><text x="301" y="80" text-anchor="middle" font-size="9.5" fill="#6b6e76">メモリが大きい</text><text x="301" y="104" text-anchor="middle" font-size="10" fill="#23252b">大規模DB</text><text x="301" y="120" text-anchor="middle" font-size="10" fill="#23252b">インメモリ処理</text><rect x="362" y="36" width="106" height="120" rx="9" fill="#e6ddf3" stroke="#7a55c9"/><text x="415" y="58" text-anchor="middle" font-size="11.5" font-weight="800" fill="#5a3a9a">ストレージ最適化</text><text x="415" y="80" text-anchor="middle" font-size="9.5" fill="#6b6e76">ディスクが速い</text><text x="415" y="104" text-anchor="middle" font-size="10" fill="#23252b">データウェアハウス</text><text x="415" y="120" text-anchor="middle" font-size="10" fill="#23252b">大量ログ処理</text><rect x="476" y="36" width="84" height="120" rx="9" fill="#f6e4e0" stroke="#c0392b"/><text x="518" y="58" text-anchor="middle" font-size="11.5" font-weight="800" fill="#8a2b20">高速</text><text x="518" y="74" text-anchor="middle" font-size="11.5" font-weight="800" fill="#8a2b20">コンピューティング</text><text x="518" y="94" text-anchor="middle" font-size="9.5" fill="#6b6e76">GPU搭載</text><text x="518" y="118" text-anchor="middle" font-size="10" fill="#23252b">機械学習の学習</text><text x="290" y="178" text-anchor="middle" font-size="10" fill="#6b6e76">まず汎用→足りない資源（CPU/メモリ/ディスク）に合わせて専用タイプへ。過剰スペックは無駄＝適切なサイジング</text></svg>',
        cap: "汎用／CPU重視＝コンピューティング最適化／メモリ重視／ディスク重視＝ストレージ最適化／GPU＝高速コンピューティング。過剰スペックを見直すのが適切なサイジング。",
      },
      {
        h: "EC2の購入オプション——安くする4つの選択肢",
        body:
          "<p>EC2は使い方に応じて<strong>料金プラン</strong>を選べます。CCP頻出です。</p>" +
          "<ul>" +
          "<li><strong>オンデマンド</strong>：使った分だけ支払う標準プラン。<strong>いつでも起動・停止でき縛りがない</strong>が単価は高め。短期・予測できない負荷向け。</li>" +
          "<li><strong>リザーブドインスタンス（RI）</strong>：<strong>1年or3年の利用を約束する代わりに大幅割引</strong>。長期に安定して使うサーバー向け。</li>" +
          "<li><strong>Savings Plans</strong>：一定の使用量（1年or3年）をコミットして割引。RIより柔軟。</li>" +
          "<li><strong>スポットインスタンス</strong>：AWSの<strong>余剰リソースを最大9割引</strong>で使えるが、<strong>AWS都合で中断されることがある</strong>。中断されても平気なバッチ処理向け。</li>" +
          "</ul>" +
          "<p>さらに、公式試験ガイドに挙がっている<strong>「専有」と「予約」</strong>の選択肢もあります。</p>" +
          "<ul>" +
          "<li><strong>Dedicated Hosts（専有ホスト）</strong>：<strong>物理サーバーを丸ごと専有</strong>します。物理コア数まで把握できるため、<strong>「サーバー単位」で数える既存ソフトのライセンス（BYOL）を持ち込みたい</strong>場合や、法令で物理的な分離が必要な場合に使います。</li>" +
          "<li><strong>Dedicated Instances（ハードウェア専有インスタンス）</strong>：<strong>他の顧客と物理ハードウェアを共有しない</strong>インスタンス。専有ホストと違い物理サーバーそのものは指定・可視化されません。『他社と同居したくない』という分離要件だけならこちら。</li>" +
          "<li><strong>キャパシティーの予約（On-Demand Capacity Reservations）</strong>：特定の AZ で<strong>必要な台数分の“空き”を確保</strong>しておく仕組み。『セール当日に確実に起動できないと困る』ときに使います。<strong>割引が目的ではなく“確保”が目的</strong>である点が、割引目的の RI／Savings Plans との違いです。</li>" +
          "</ul>" +
          "<p><strong>取り違え注意</strong>：<strong>安くしたい＝RI／Savings Plans／スポット</strong>、<strong>物理的に分離したい＝専有ホスト／専有インスタンス</strong>、<strong>確実に起動したい＝キャパシティー予約</strong>。目的が違うので混同しないようにします。</p>",
        diagram:
          '<svg viewBox="0 0 580 205" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">EC2 購入オプションの使い分け</text>' +
          (function () {
            var head = ["プラン", "割引", "特徴／向くケース"];
            var rows = [
              ["オンデマンド", "なし", "縛りなし・いつでも起動停止。短期/変動負荷"],
              ["リザーブド(RI)", "大", "1〜3年の利用を約束。長期安定のサーバー"],
              ["Savings Plans", "大", "使用量をコミット。RIより柔軟"],
              ["スポット", "最大", "余剰を格安。中断あり。中断可なバッチ向け"],
            ];
            var w = [120, 66, 320], x0 = 32, y0 = 34, rh = 30;
            var xs = [x0]; for (var i = 0; i < w.length; i++) xs.push(xs[i] + w[i]);
            var s = "";
            head.forEach(function (h, ci) {
              s += '<rect x="' + xs[ci] + '" y="' + y0 + '" width="' + w[ci] + '" height="' + rh + '" fill="#eceff3" stroke="#c7ccd2"/><text x="' + (xs[ci] + (ci === 2 ? 10 : w[ci] / 2)) + '" y="' + (y0 + 19) + '" fill="#23252b" font-size="11" font-weight="700" text-anchor="' + (ci === 2 ? "start" : "middle") + '">' + h + "</text>";
            });
            rows.forEach(function (row, ri) {
              var y = y0 + (ri + 1) * rh;
              row.forEach(function (cell, ci) {
                var big = ci === 1 && (cell === "大" || cell === "最大");
                var fill = big ? "#dcecdd" : "#ffffff";
                s += '<rect x="' + xs[ci] + '" y="' + y + '" width="' + w[ci] + '" height="' + rh + '" fill="' + fill + '" stroke="#d8dbe0"/>';
                s += '<text x="' + (xs[ci] + (ci === 2 ? 10 : w[ci] / 2)) + '" y="' + (y + 19) + '" fill="' + (big ? "#366b3c" : "#23252b") + '" font-size="10.5" ' + (ci === 0 ? 'font-weight="700" ' : "") + 'text-anchor="' + (ci === 2 ? "start" : "middle") + '">' + cell + "</text>";
              });
            });
            return s;
          })() +
          "</svg>",
        cap: "縛りなし=オンデマンド、長期割引=RI/Savings Plans、格安だが中断あり=スポット。用途で選ぶ。",
      },
      {
        h: "サーバー管理から解放される——LambdaとFargate",
        body:
          "<p>EC2 は便利ですが、OS の更新やサーバー台数の調整など<strong>“サーバーのお守り”は利用者の仕事</strong>です。この管理そのものを AWS に任せ、<strong>アプリのコードだけに集中する</strong>考え方が <strong>サーバーレス</strong>です（サーバーが無いのではなく、『サーバーの存在を意識しなくてよい』という意味）。</p>" +
          "<ul>" +
          "<li><strong>AWS Lambda</strong>：<strong>コードを書いて置くだけ</strong>で動くサービス。サーバーの起動・管理・台数調整（スケール）は<strong>一切不要</strong>で、<strong>実行された回数と時間の分だけ課金</strong>されます（使わなければ料金ゼロ）。ファイルのアップロードや API リクエストなどの<strong>イベントに反応して短時間だけ動く</strong>処理が得意です。</li>" +
          "<li><strong>コンテナ（ECS／EKS）</strong>：アプリを必要なものごと“箱（コンテナ）”に詰めて、どこでも同じように動かす技術です。AWS 独自の管理サービスが <strong>ECS</strong>、Kubernetes（業界標準）で動かすのが <strong>EKS</strong>。そして、その<strong>コンテナをサーバー管理なしで動かす</strong>実行基盤が <strong>Fargate</strong> です。</li>" +
          "</ul>" +
          "<p>判断の目安：『<strong>サーバーの管理をしたくない・使った分だけ払いたい</strong>』なら Lambda や Fargate。『OS レベルまで自分で細かく制御したい・既存のソフトをそのまま動かしたい』なら EC2、と選び分けます。</p>",
      },
    ],
    memorize: [
      { k: "Amazon Lightsail", v: "<strong>簡単・定額・低価格</strong>で小規模サーバ/Webサイト。個人・入門向け。" },
      { k: "AWS Batch", v: "<strong>大量のバッチ処理ジョブ</strong>を資源自動確保で並列実行。" },
      { k: "プレイスメントグループ", v: "EC2の物理配置制御。<strong>クラスター＝低遅延</strong>、スプレッド＝分散で同時障害回避。" },
      { k: "Outposts / Local Zones / Wavelength", v: "Outposts＝自社DCにAWS、Local Zones＝大都市で低遅延、Wavelength＝<strong>5G</strong>で超低遅延。" },

      { k: "EC2", v: "AWS上の仮想サーバー(IaaS)。インスタンスタイプでCPU/メモリを選ぶ。OS以上は利用者管理。" },
      { k: "インスタンスタイプの種類", v: "<strong>汎用</strong>=バランス／<strong>コンピューティング最適化</strong>=CPU重視／<strong>メモリ最適化</strong>=大規模DB／<strong>ストレージ最適化</strong>=ディスクI/O重視／<strong>高速コンピューティング</strong>=GPU。" },
      { k: "適切なサイジング(ライトサイジング)", v: "使用状況に合わせ<strong>過剰スペックを見直す</strong>コスト最適化。<strong>Compute Optimizer</strong>が最適サイズを提案。" },
      { k: "Dedicated Hosts / Dedicated Instances", v: "専有ホスト=<strong>物理サーバーを丸ごと専有</strong>(BYOLライセンス持込・物理分離)。専有インスタンス=<strong>他顧客とハード非共有</strong>(物理サーバーは指定不可)。" },
      { k: "キャパシティーの予約", v: "特定AZで<strong>必要台数の空きを確保</strong>。<strong>割引ではなく“確実に起動”が目的</strong>（RI/Savings Plansは割引目的）。" },
      { k: "Auto Scaling", v: "負荷に応じてEC2の台数を自動で増減。可用性とコスト効率を両立。" },
      { k: "ELB(ロードバランサー)", v: "アクセスを複数サーバーへ自動で振り分ける。" },
      { k: "オンデマンド", v: "縛りなしで使った分だけ。短期・変動負荷向け。単価は高め。" },
      { k: "リザーブド(RI)/Savings Plans", v: "1〜3年の利用をコミットして大幅割引。長期安定利用向け。" },
      { k: "スポットインスタンス", v: "余剰を最大9割引。中断ありでバッチ向け。" },
      { k: "Lambda", v: "サーバーレス。コードを置くだけ、実行した分だけ課金。管理不要。" },
      { k: "Fargate", v: "コンテナをサーバー管理なしで実行するサーバーレスなコンテナ基盤。" },
    ],
    flashcards: [
      { q: "EC2とは何か？", a: "AWS上に仮想サーバーを立てて使うサービス（IaaS）。数分で起動でき、CPU・メモリの大きさを選べる。" },
      { q: "長期間安定して使うサーバーを安くする購入オプションは？", a: "リザーブドインスタンス（RI）またはSavings Plans（1〜3年のコミットで割引）。" },
      { q: "中断されても構わないバッチ処理を最安で動かすなら？", a: "スポットインスタンス（余剰リソースを最大9割引だが中断あり）。" },
      { q: "サーバーの管理をせず、コードを実行した分だけ払いたい。使うサービスは？", a: "AWS Lambda（サーバーレス）。" },
      { q: "アクセス急増に自動で対応する2つの仕組みは？", a: "Auto Scaling（台数の自動増減）とELB（ロードバランサーによる振り分け）。" },
    ],
    quiz: [
      {
        q: "個人が、簡単な操作で低価格・定額料金の小規模Webサイトやサーバーを短時間で立ち上げたい。最も適したサービスはどれか。",
        choices: ["Amazon EC2", "AWS Batch", "Amazon Lightsail", "Amazon EMR"],
        answer: 2,
        explain: "簡単・定額・低価格で小規模サーバを手軽に立てるのは<strong>Amazon Lightsail</strong>。EC2は柔軟だが設定項目が多い。",
      },
      {
        q: "夜間に発生する大量のデータ処理ジョブを、必要な計算リソースを自動確保して並列に実行したい。適したサービスはどれか。",
        choices: ["AWS Lambda", "AWS Batch", "Amazon Lightsail", "AWS Step Functions"],
        answer: 1,
        explain: "大量の<strong>バッチ処理ジョブ</strong>を資源を自動確保して並列実行するのは<strong>AWS Batch</strong>。Lambdaは短時間イベント処理、Step Functionsは処理の流れの制御。",
      },

      {
        q: "アクセスの少ない夜間に自動的にサーバー台数を減らし、混雑する日中に自動的に増やしたい。用いるべきAWSの仕組みはどれか。",
        choices: ["Auto Scaling", "リザーブドインスタンス", "AWS Artifact", "CloudTrail"],
        answer: 0,
        explain: "負荷に応じてEC2台数を自動増減するのは<strong>Auto Scaling</strong>。",
      },
      {
        q: "中断されても問題のないバッチ処理を、できるだけ低コストで実行したい。最も適したEC2の購入オプションはどれか。",
        choices: ["オンデマンドインスタンス", "リザーブドインスタンス", "スポットインスタンス", "Dedicated Hosts"],
        answer: 2,
        explain: "余剰リソースを最大9割引で使えるが中断ありの<strong>スポットインスタンス</strong>が最適。中断可なバッチ向け。",
      },
      {
        q: "サーバーのプロビジョニングや管理を一切行わず、コードを実行した時間・回数に対してのみ料金を支払うAWSサービスはどれか。",
        choices: ["Amazon EC2", "AWS Lambda", "Amazon RDS", "Amazon EBS"],
        answer: 1,
        explain: "サーバー管理不要・実行した分だけ課金のサーバーレスは<strong>AWS Lambda</strong>。",
      },
      {
        q: "動画のエンコード処理のように、CPU の演算能力を非常に多く必要とするワークロードを EC2 で実行したい。最も適したインスタンスタイプのカテゴリはどれか。",
        choices: ["メモリ最適化", "ストレージ最適化", "汎用", "コンピューティング最適化"],
        answer: 3,
        explain: "<strong>CPU の性能が求められる</strong>処理には<strong>コンピューティング最適化</strong>。メモリ最適化は大規模DB、ストレージ最適化はディスクI/Oが多い処理、汎用はバランス型。",
      },
      {
        q: "大規模セールの当日に、特定のアベイラビリティーゾーンで必要な台数の EC2 を「確実に起動できる」ようにしておきたい。割引を得ることが目的ではない。適した仕組みはどれか。",
        choices: ["オンデマンドキャパシティーの予約", "リザーブドインスタンス", "スポットインスタンス", "Savings Plans"],
        answer: 0,
        explain: "指定 AZ で<strong>必要な台数の空きを確保</strong>するのが<strong>キャパシティーの予約</strong>。RI や Savings Plans は<strong>割引</strong>が目的、スポットは中断ありで確実性がない。目的（確保か割引か）で選び分ける。",
      },
      {
        q: "コンテナ化したアプリケーションを、サーバー（EC2インスタンス）の管理を一切せずに実行したい。最も適した組み合わせはどれか。",
        choices: ["EC2 に Docker を自分でインストールする", "Amazon EC2 Auto Scaling", "Amazon ECS または Amazon EKS を AWS Fargate で実行する", "AWS Batch のみを使用する"],
        answer: 2,
        explain: "コンテナの管理サービスが <strong>ECS（AWS独自）</strong>と <strong>EKS（Kubernetes）</strong>で、その実行基盤としてサーバー管理不要の <strong>Fargate</strong> を選ぶとサーバーレスにコンテナを動かせる。",
      },
      {
        q: "既存の商用ソフトウェアのライセンスを AWS へ持ち込む（BYOL）にあたり、物理サーバーのコア数を把握できる形で EC2 を専有したい。適したオプションはどれか。",
        choices: ["スポットインスタンス", "Dedicated Hosts（専有ホスト）", "オンデマンドインスタンス", "Savings Plans"],
        answer: 1,
        explain: "<strong>物理サーバーを丸ごと専有</strong>し、ソケット/コア数を把握できるのが <strong>Dedicated Hosts</strong>。サーバー単位で数えるライセンスの持ち込み（BYOL）に向く。<strong>ハードウェア専有インスタンス（Dedicated Instances）</strong>は「他顧客とハードを共有しない」だけで物理サーバーの指定・可視化はできない点が違う。",
      },
    ],
  }
);
