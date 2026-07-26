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
          "<p><strong>Amazon EC2（Elastic Compute Cloud）</strong>は、AWS 上に<strong>仮想サーバーを立てて使う</strong>最も基本的なサービスです（IaaS）。物理サーバーを買う代わりに、必要なスペックのサーバーを<strong>数分で起動</strong>でき、不要になれば止めて課金を止められます。用途に応じて <strong>CPU・メモリの大きさ（インスタンスタイプ）</strong>を選び、汎用・計算重視・メモリ重視といった“ファミリー”から最適なものを選べます。OS とその上のアプリは利用者が管理します（責任共有モデルの IaaS）。</p>" +
          "<p><strong>AMI（Amazon マシンイメージ）＝サーバーの“ひな形（テンプレート）”</strong>：EC2 を起動するときは、<strong>OS の種類・初期設定・入れておくソフトを丸ごと1枚にまとめた「AMI」を選んで</strong>立ち上げます。同じ AMI から起動すれば<strong>まったく同じ構成のサーバーを何台でも一瞬で複製</strong>でき、Auto Scaling で自動的に増える台も同じ AMI から作られます。自分で構築し終えたサーバーを<strong>AMI として保存して使い回し</strong>たり、AWS Marketplace で提供される<strong>既製の AMI</strong>（ソフト導入済みのサーバー）を使ったりもできます。<br><strong>試験のキーワード：</strong>「<strong>OS やソフトを含んだサーバーのテンプレート／イメージ</strong>」「同じ構成の EC2 を複製・量産する元」→ AMI。（“サーバーの大きさ・形”＝インスタンスタイプ、“ディスクのバックアップ”＝EBS スナップショット、とは別物です。）</p>" +
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
          "</ul>" +
          "<p><strong>試験のキーワード：</strong>「サーバーの管理をしたくない」「<strong>実行した分だけ課金（使わなければ無料）</strong>」「ファイルがアップされたら自動で処理」「<strong>イベント駆動</strong>」→ Lambda。逆に『OS レベルまで自分で細かく設定したい』『常時動かし続ける』なら EC2 が向きます。</p>",
      },
      {
        h: "コンテナの4兄弟——ECR・ECS・EKS・Fargate の関係をつかむ",
        body:
          "<p><strong>コンテナ</strong>とは、アプリを「動かすのに必要なもの一式（プログラム・ライブラリ・設定）」をひとつの<strong>“箱”に詰めた</strong>もの。箱ごと運ぶので、<strong>開発PCでもクラウドでも“まったく同じように動く”</strong>のが利点です。AWS でコンテナを扱うとき、名前の似た 4 つが登場します。<strong>それぞれ役割が違い、組み合わせて使う</strong>ので、関係を押さえるのが最重要です。</p>" +
          "<ul>" +
          "<li><strong>Amazon ECR（Elastic Container Registry）＝箱の“保管庫”</strong>：作ったコンテナイメージ（箱の設計図）を保管しておく置き場です。ここから取り出して動かします。<strong>試験のキーワード：</strong>「コンテナイメージの保管・レジストリ」→ ECR。</li>" +
          "<li><strong>Amazon ECS（Elastic Container Service）＝箱を動かす“AWS独自の司令塔”</strong>：どの箱を何個、どこで動かすかを管理（オーケストレーション）します。<strong>AWS独自でシンプル</strong>なのが特徴。<strong>試験のキーワード：</strong>「コンテナのオーケストレーション」「AWS独自のコンテナ管理」→ ECS。</li>" +
          "<li><strong>Amazon EKS（Elastic Kubernetes Service）＝“Kubernetes版”の司令塔</strong>：役割は ECS と同じ（コンテナの管理）ですが、業界標準の <strong>Kubernetes</strong> をそのまま使えます。<strong>すでに Kubernetes を使っている／他社クラウドと揃えたい</strong>場合に選びます。<strong>試験のキーワード：</strong>「<strong>Kubernetes</strong>」→ EKS。</li>" +
          "<li><strong>AWS Fargate＝箱を動かす“サーバーレスな土台”</strong>：ECS/EKS が箱を動かすとき、その<strong>下で実際に動かすサーバーを AWS が肩代わり</strong>してくれます。利用者は EC2 の台数管理・パッチから解放されます（＝サーバーレス）。<strong>試験のキーワード：</strong>「コンテナを<strong>サーバー管理なしで</strong>動かす」→ Fargate。</li>" +
          "</ul>" +
          "<p><strong>関係を一言で</strong>：<strong>ECR</strong>（保管庫）に置いた箱を、<strong>ECS または EKS</strong>（司令塔）が指示して動かす。その動かす土台は、<strong>Fargate</strong>（サーバー管理なし）か <strong>EC2 起動タイプ</strong>（自分でサーバーを持つ）から選べます。つまり『<strong>ECS か EKS か</strong>＝管理方式（AWS独自か Kubernetes か）』『<strong>Fargate か EC2 か</strong>＝サーバーを自分で持つか持たないか』という、<strong>2つの独立した選択</strong>だと理解すると混乱しません。</p>",
        diagram:
          '<svg viewBox="0 0 580 250" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13.5" font-weight="700" fill="#23252b">コンテナ4兄弟の関係（保管庫→司令塔→土台）</text>' +
          '<rect x="20" y="40" width="120" height="76" rx="9" fill="#dce8f3" stroke="#4a7fa8"/><text x="80" y="62" text-anchor="middle" font-size="12" font-weight="800" fill="#34567a">ECR</text><text x="80" y="82" text-anchor="middle" font-size="9.5" fill="#6b6e76">イメージの保管庫</text><text x="80" y="102" text-anchor="middle" font-size="9.5" fill="#23252b">箱を保管</text>' +
          '<line x1="140" y1="78" x2="180" y2="78" stroke="#8a8f98" stroke-width="2"/><polygon points="180,78 170,73 170,83" fill="#8a8f98"/>' +
          '<rect x="184" y="34" width="212" height="90" rx="9" fill="#f2e7cd" stroke="#b28a2e"/><text x="290" y="52" text-anchor="middle" font-size="10.5" font-weight="800" fill="#7a5e17">司令塔（オーケストレーション）</text><rect x="196" y="60" width="94" height="52" rx="6" fill="#fbf3e0" stroke="#b28a2e"/><text x="243" y="80" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5e17">ECS</text><text x="243" y="98" text-anchor="middle" font-size="8.5" fill="#8a6a1e">AWS独自</text><rect x="296" y="60" width="94" height="52" rx="6" fill="#fbf3e0" stroke="#b28a2e"/><text x="343" y="80" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5e17">EKS</text><text x="343" y="98" text-anchor="middle" font-size="8.5" fill="#8a6a1e">Kubernetes</text>' +
          '<line x1="290" y1="124" x2="290" y2="150" stroke="#8a8f98" stroke-width="2"/><polygon points="290,150 285,140 295,140" fill="#8a8f98"/>' +
          '<text x="290" y="168" text-anchor="middle" font-size="10.5" font-weight="700" fill="#23252b">動かす土台をどちらか選ぶ</text>' +
          '<rect x="120" y="178" width="150" height="56" rx="9" fill="#dcecdd" stroke="#5c9160"/><text x="195" y="200" text-anchor="middle" font-size="11.5" font-weight="800" fill="#366b3c">Fargate</text><text x="195" y="220" text-anchor="middle" font-size="9" fill="#366b3c">サーバー管理なし（サーバーレス）</text>' +
          '<rect x="310" y="178" width="150" height="56" rx="9" fill="#f6e4e0" stroke="#c0392b"/><text x="385" y="200" text-anchor="middle" font-size="11.5" font-weight="800" fill="#8a2b20">EC2 起動タイプ</text><text x="385" y="220" text-anchor="middle" font-size="9" fill="#8a2b20">自分でサーバーを持つ</text>' +
          '</svg>',
        cap: "保管庫=ECR／司令塔=ECS(AWS独自)・EKS(Kubernetes)／土台=Fargate(サーバー管理なし)・EC2(自分で持つ)。ECS↔EKSは管理方式、Fargate↔EC2はサーバーを持つか、の別々の選択。",
      },
      {
        h: "サーバーの管理はどこまで自分で？——EC2・Beanstalk・コンテナ・Lambda の管理範囲",
        body:
          "<p>これまで出てきた実行方法を『<strong>自分でどこまで面倒を見るか（管理範囲）</strong>』の一直線に並べると、選び方がすっきりします。<strong>右へ行くほど AWS に任せる範囲が増え、利用者はアプリに集中</strong>できます（そのぶん細かい制御は減ります）。</p>" +
          "<ul>" +
          "<li><strong>EC2（IaaS）＝いちばん自分で管理</strong>：OS もミドルウェアも台数も自分で面倒を見ます。自由度は最大ですが手間も最大。『<strong>OS レベルで細かく設定したい／既存ソフトをそのまま動かしたい</strong>』ならこれ。</li>" +
          "<li><strong>AWS Elastic Beanstalk（PaaS）＝コードを渡せば環境は自動</strong>：<strong>アプリのコードをアップロードするだけ</strong>で、その裏で必要な <strong>EC2・ロードバランサー(ELB)・Auto Scaling などを AWS が自動で構築・デプロイ</strong>してくれます。サーバーは存在しますが構築の手間が省け、<strong>あとから細かい設定変更もできる</strong>のが特徴。『<strong>インフラ構築に詳しくないが、普通の Web アプリを手早く動かしたい</strong>』人向け。<strong>試験のキーワード：</strong>「コードをアップロードするだけで環境を自動構築・デプロイ」→ Elastic Beanstalk。</li>" +
          "<li><strong>コンテナ（ECS/EKS ＋ Fargate）＝箱で動かす</strong>：アプリを箱に詰めて動かす方式。<strong>Fargate</strong> を使えばサーバー管理からも解放されます（前項）。</li>" +
          "<li><strong>AWS Lambda（サーバーレス／FaaS）＝コードだけ、実行した分だけ</strong>：サーバーの存在を一切意識せず、<strong>イベントに反応して動いた分だけ課金</strong>。管理範囲は最小。</li>" +
          "</ul>" +
          "<p><strong>“サーバーレスか、サーバーが要るか”</strong>で言うと、<strong>Lambda と Fargate はサーバーレス</strong>（サーバーを意識しない）、<strong>EC2・Beanstalk・ECS/EKSのEC2起動タイプはサーバーが要る</strong>（存在を意識する）側です。混同しやすい <strong>Beanstalk と Lambda</strong> は、『<strong>いつものWebアプリまるごとを楽にデプロイ＝Beanstalk</strong>』『<strong>小さな処理をイベントで実行＝Lambda</strong>』と区別します。</p>",
        diagram:
          '<svg viewBox="0 0 580 170" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13.5" font-weight="700" fill="#23252b">管理範囲のグラデーション（左＝自分で管理／右＝AWSに任せる）</text>' +
          '<defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6e4e0"/><stop offset="1" stop-color="#dcecdd"/></linearGradient></defs>' +
          '<rect x="20" y="52" width="540" height="30" rx="6" fill="url(#g1)" stroke="#cbb79a"/><text x="40" y="98" font-size="9.5" fill="#8a2b20">自分で管理が多い</text><text x="560" y="98" text-anchor="end" font-size="9.5" fill="#366b3c">AWSに任せる（アプリに集中）</text>' +
          (function(){var items=[["EC2","IaaS"],["Beanstalk","PaaS"],["コンテナ+Fargate","箱"],["Lambda","サーバーレス"]];var s="";var xs=[70,210,355,500];items.forEach(function(it,i){var x=xs[i];s+='<line x1="'+x+'" y1="52" x2="'+x+'" y2="82" stroke="#8a8f98" stroke-width="1.5"/>';s+='<rect x="'+(x-58)+'" y="112" width="116" height="42" rx="7" fill="#faf7f1" stroke="#d9d2c6"/>';s+='<text x="'+x+'" y="130" text-anchor="middle" font-size="11" font-weight="800" fill="#23252b">'+it[0]+'</text>';s+='<text x="'+x+'" y="146" text-anchor="middle" font-size="9" fill="#6b6e76">'+it[1]+'</text>';});return s;})() +
          '<text x="290" y="46" text-anchor="middle" font-size="9.5" fill="#6b6e76">Lambda / Fargate ＝ サーバーレス（サーバーを意識しない）</text>' +
          '</svg>',
        cap: "EC2(全部自分)→Beanstalk(コードを渡せば環境自動)→コンテナ+Fargate→Lambda(コードだけ)。右ほどAWSに任せる。Lambda/Fargateはサーバーレス。",
      },
    ],
    memorize: [
      { k: "Amazon Lightsail", v: "<strong>簡単・定額・低価格</strong>で小規模サーバ/Webサイト。個人・入門向け。" },
      { k: "AWS Batch", v: "<strong>大量のバッチ処理ジョブ</strong>を資源自動確保で並列実行。" },
      { k: "プレイスメントグループ", v: "EC2の物理配置制御。<strong>クラスター＝低遅延</strong>、スプレッド＝分散で同時障害回避。" },
      { k: "Outposts / Local Zones / Wavelength", v: "Outposts＝自社DCにAWS、Local Zones＝大都市で低遅延、Wavelength＝<strong>5G</strong>で超低遅延。" },

      { k: "EC2", v: "AWS上の仮想サーバー(IaaS)。インスタンスタイプでCPU/メモリを選ぶ。OS以上は利用者管理。" },
      { k: "AMI（Amazonマシンイメージ）", v: "EC2起動時に選ぶ<strong>OS・設定・ソフトを丸ごと含んだサーバーのテンプレート（ひな形）</strong>。同じ構成のEC2を複製・量産できる（Auto Scalingの増設もこれ基準）。自作保存やMarketplace既製も。" },
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
      { k: "コンテナとは", v: "アプリ+必要な一式を“箱”に詰める技術。<strong>開発PCでもクラウドでも同じように動く</strong>。" },
      { k: "Amazon ECR", v: "コンテナイメージの<strong>保管庫（レジストリ）</strong>。ここから取り出して動かす。" },
      { k: "Amazon ECS", v: "コンテナを動かす<strong>AWS独自の司令塔（オーケストレーション）</strong>。シンプル。" },
      { k: "Amazon EKS", v: "同じくコンテナの司令塔だが<strong>Kubernetes（業界標準）</strong>を使う。他社クラウドと揃えたい時。" },
      { k: "Fargate", v: "コンテナを<strong>サーバー管理なしで実行</strong>するサーバーレスな土台（ECS/EKSの下で動く）。EC2起動タイプは自分でサーバーを持つ。" },
      { k: "Elastic Beanstalk", v: "<strong>コードをアップするだけでEC2/ELB/Auto Scalingを自動構築・デプロイ(PaaS)</strong>。あとから設定変更も可。BeanstalkはWebアプリ丸ごと、Lambdaは小さな処理をイベントで。" },
      { k: "管理範囲(サーバーレスか)", v: "EC2(全部自分)→Beanstalk→コンテナ+Fargate→Lambda(コードだけ)。<strong>Lambda/Fargateはサーバーレス</strong>。" },
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
      {
        q: "EC2 インスタンスを起動する際に、OS の種類・初期設定・インストール済みソフトウェアを1つにまとめた“テンプレート”を選ぶ。同じ構成のサーバーを繰り返し作成できるこのテンプレートを何というか。",
        choices: ["インスタンスタイプ", "セキュリティグループ", "EBS スナップショット", "AMI（Amazon マシンイメージ）"],
        answer: 3,
        explain: "OS・設定・ソフトを丸ごと含んだ<strong>サーバーのテンプレート（ひな形）</strong>が <strong>AMI</strong>。同じ AMI から同一構成の EC2 を何台でも複製でき、Auto Scaling で増える台も同じ AMI から作られる。インスタンスタイプは“サーバーの大きさ・形”、EBS スナップショットは“ディスクのバックアップ”で別物。",
      },
    ],
  }
);
