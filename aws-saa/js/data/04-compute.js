/* =============================================================
   SAA Forge カリキュラム — 04 コンピューティング
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ec2", domain: "コンピューティング", icon: "🖥️", title: "EC2 の基礎",
    intro: "仮想サーバーEC2の構成要素。インスタンスファミリー・AMI・ユーザーデータ・配置グループ・ENIを押さえる。",
    understand: [
      {
        h: "EC2は『数分で借りられる仮想サーバー』",
        body: "<p><strong>EC2(Elastic Compute Cloud)</strong>は、好きなOS・スペックのサーバーをクラウド上に数分で立て、<strong>使った時間だけ課金</strong>される仮想サーバーだ。物理サーバーを買うと数週間かかり初期投資も大きいが、EC2なら数クリックで起動し、不要になれば消せる。この身軽さがクラウドの基本になる。</p><p>1台のEC2は『OS(AMIで指定)＋サイズ(インスタンスタイプ)＋ストレージ(EBS等)＋ネットワーク(VPC/SG)』の組み合わせでできている。SAAでは、この構成要素のうち特に<strong>『どのインスタンスタイプを選ぶか』『どう自動構成・冗長化するか』</strong>が問われる。</p>",
      },
      {
        h: "インスタンスファミリーは『何が重いワークロードか』で選ぶ",
        body: "<p>EC2のスペックは<strong>インスタンスファミリー</strong>で選ぶ。CPU・メモリ・ネットワーク・GPUのどれを厚くしたいかで使い分ける。試験では細かい型番ではなく『どの系統が適切か』が問われる。</p><ul><li><strong>汎用(T/M系)</strong>：バランス型。Webサーバーや小〜中規模アプリ。T系は普段は安く、必要時にCPUをバースト。</li><li><strong>コンピュート最適化(C系)</strong>：<strong>CPU性能重視</strong>。バッチ処理、科学計算、ゲームサーバー、高トラフィックWeb。</li><li><strong>メモリ最適化(R/X系)</strong>：<strong>大容量メモリ重視</strong>。インメモリDB、大規模キャッシュ、巨大データの分析。</li><li><strong>ストレージ最適化(I/D系)</strong>：高速なローカルディスクIO。NoSQLや大規模データ処理。</li><li><strong>高速コンピューティング(P/G系)</strong>：<strong>GPU</strong>。機械学習の学習/推論、動画レンダリング。</li></ul>",
        diagram:
          '<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="320" y="22" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">インスタンスファミリーの選び分け</text>\
<rect x="20" y="40" width="190" height="46" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="115" y="61" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">汎用 (T/M)</text><text x="115" y="78" fill="#9aa6bd" font-size="10" text-anchor="middle">バランス・Web</text>\
<rect x="225" y="40" width="190" height="46" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="61" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">コンピュート最適化 (C)</text><text x="320" y="78" fill="#9aa6bd" font-size="10" text-anchor="middle">CPU重視・バッチ/HPC</text>\
<rect x="430" y="40" width="190" height="46" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="525" y="61" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">メモリ最適化 (R/X)</text><text x="525" y="78" fill="#9aa6bd" font-size="10" text-anchor="middle">大容量メモリ・DB</text>\
<rect x="120" y="100" width="190" height="46" rx="8" fill="#161e30" stroke="#ffc955"/><text x="215" y="121" fill="#ffc955" font-size="12" font-weight="700" text-anchor="middle">ストレージ最適化 (I/D)</text><text x="215" y="138" fill="#9aa6bd" font-size="10" text-anchor="middle">高速IO・大規模データ</text>\
<rect x="330" y="100" width="190" height="46" rx="8" fill="#161e30" stroke="#b08adf"/><text x="425" y="121" fill="#b08adf" font-size="12" font-weight="700" text-anchor="middle">高速計算 (P/G)</text><text x="425" y="138" fill="#9aa6bd" font-size="10" text-anchor="middle">GPU・ML/レンダリング</text>\
<text x="320" y="178" fill="#9aa6bd" font-size="10" text-anchor="middle">『何が重いか(CPU/メモリ/IO/GPU)』で系統を選ぶ</text>\
</svg>',
        cap: "ボトルネックになる資源(CPU/メモリ/IO/GPU)に合わせてファミリーを選ぶ。",
      },
      {
        h: "起動の自動化(AMI・ユーザーデータ)と配置・ネットワーク",
        body: "<p>EC2を再現性よく立ち上げる仕組みも頻出だ。<strong>AMI(Amazonマシンイメージ)</strong>は、OSや導入済みソフト・設定を丸ごと固めた<strong>テンプレート</strong>。同じAMIから何台でも同一構成のサーバーを起動でき、Auto Scalingの起動元にもなる。<strong>ユーザーデータ</strong>は起動時に一度だけ実行される初期化スクリプト(ソフト導入・設定の自動化)。</p><p>複数台の<strong>物理的な配置</strong>を制御するのが配置グループだ。<strong>クラスタ配置</strong>＝同一AZに密集させ<strong>超低遅延・高帯域</strong>(HPC向き、ただしAZ障害に弱い)。<strong>スプレッド配置</strong>＝別々のハードに分散し<strong>相関障害を回避</strong>(少数の重要サーバー)。<strong>パーティション配置</strong>＝区画に分けた大規模分散システム(Hadoop/Kafka)。ネットワーク面では、仮想NICの<strong>ENI</strong>、固定パブリックIPの<strong>Elastic IP</strong>を押さえる。</p><p>科学計算のような<strong>HPC(ハイパフォーマンスコンピューティング)</strong>で、ノード同士が密に通信する<strong>MPI</strong>ワークロードでは、クラスタ配置グループに加えて<strong>EFA(Elastic Fabric Adapter)</strong>という専用ネットワークインターフェイスを使う。EFAはOSを介さずに通信する仕組みで、ノード間のレイテンシを大きく下げられる。こうしたHPCクラスタ(スケジューラ込み)を丸ごと自動構築・管理してくれるのが<strong>AWS ParallelCluster</strong>で、運用の手間を最小化できる。『密結合HPC＝クラスタ配置＋EFA＋ParallelCluster』とセットで覚えよう。</p>",
      },
    ],
    memorize: [
      { k: "汎用(T/M)", v: "バランス型。Web・小中規模アプリ。T系はバースト課金。" },
      { k: "コンピュート最適化(C)", v: "<strong>CPU重視</strong>。バッチ/科学計算/ゲーム/HPC。" },
      { k: "メモリ最適化(R/X)", v: "<strong>大容量メモリ</strong>。インメモリDB/大規模キャッシュ/大データ処理。" },
      { k: "高速計算(P/G)", v: "<strong>GPU</strong>。機械学習/レンダリング。" },
      { k: "AMI", v: "OS＋設定のテンプレート。同一構成を量産・Auto Scalingの起動元。" },
      { k: "クラスタ配置グループ", v: "同一AZ密集で<strong>超低遅延・高帯域</strong>(HPC)。AZ障害に弱い。" },
      { k: "スプレッド配置グループ", v: "ハードを分けて<strong>相関障害を回避</strong>(少数の重要インスタンス)。" },
      { k: "パーティション配置", v: "区画分割で大規模分散システム(Hadoop/Kafka)。" },
      { k: "EFA", v: "HPC/ML向けの<strong>低遅延ネットワークIF</strong>。OSバイパスで<strong>MPI</strong>等の密結合ノード間通信を高速化。クラスタ配置と併用。" },
      { k: "AWS ParallelCluster", v: "HPCクラスタを<strong>自動構築・管理</strong>するOSSツール。スケジューラ込みでMPIジョブ基盤を最小の手間で用意。" },
      { k: "IMDSv2", v: "メタデータ取得のセキュア方式(SSRF対策)。ロール認証情報もここから。" },
      { k: "Elastic IP", v: "固定パブリックIP。付け替え可能。未使用は課金されうる。" },
    ],
    flashcards: [
      { q: "インメモリDB(Redis等)向けのEC2ファミリーは？", a: "メモリ最適化(R/X系)" },
      { q: "CPU負荷の高いバッチ処理向けのファミリーは？", a: "コンピュート最適化(C系)" },
      { q: "機械学習の学習に使うファミリーは？", a: "高速コンピューティング(P/G系・GPU)" },
      { q: "HPCで超低遅延・高帯域のノード間通信が要る。配置グループは？", a: "クラスタ配置グループ" },
      { q: "密結合HPC(MPI)でノード間通信を最速化する専用ネットワークIFは？", a: "EFA(Elastic Fabric Adapter)。クラスタ配置グループと併用する。" },
      { q: "HPCクラスタ(スケジューラ込み)を自動構築・管理するAWSのツールは？", a: "AWS ParallelCluster" },
      { q: "少数の重要サーバーを別ハードに分け相関障害を避ける配置は？", a: "スプレッド配置グループ" },
      { q: "同一構成のサーバーを量産する元になるテンプレートは？", a: "AMI" },
    ],
    quiz: [
      {
        q: "ノード間で大量データを超低遅延でやり取りするHPCワークロードをEC2で構築する。ネットワーク性能を最大化する配置は？",
        choices: ["スプレッド配置グループ", "クラスタ配置グループ", "パーティション配置グループ", "複数リージョンに分散"],
        answer: 1,
        explain: "ノード間の<strong>低遅延・高帯域＝クラスタ配置グループ</strong>(同一AZ密集)。スプレッドは可用性重視で帯域は最大化されない。",
      },
      {
        q: "大規模なインメモリ分析処理を行うアプリ向けに、最も適したEC2インスタンスファミリーは？",
        choices: ["コンピュート最適化(C)", "メモリ最適化(R/X)", "汎用(T)", "ストレージ最適化(D)"],
        answer: 1,
        explain: "インメモリ処理は<strong>メモリ最適化(R/X)</strong>。CはCPU重視、Tはバースト汎用で大容量メモリ向きではない。",
      },
    ],
  },
  {
    id: "ec2-pricing", domain: "コンピューティング", icon: "💰", title: "EC2 料金モデル",
    intro: "得点源。期間と中断耐性から最安を選ぶ。オンデマンド/リザーブド/SP/スポット/専有の判断。",
    understand: [
      {
        h: "同じEC2でも『契約の仕方』で価格が大きく変わる",
        body: "<p>EC2の料金は、性能だけでなく<strong>どう契約するか</strong>で大きく変わる。同じ性能でも最安と最高で何倍も差がつくため、SAAでは『要件に対して最もコスト効率の良い料金モデルを選ぶ』問題が頻出する。判断材料はシンプルで、問題文の中の<strong>『どれくらいの期間使うか』『常時稼働か』『途中で止まっても良いか』</strong>の3点だ。</p>",
        diagram:
          '<svg viewBox="0 0 640 195" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="30" width="145" height="150" rx="10" fill="#161e30" stroke="#4dabf7"/><text x="92" y="56" fill="#4dabf7" font-size="13" font-weight="700" text-anchor="middle">オンデマンド</text><text x="92" y="90" fill="#e9edf5" font-size="11" text-anchor="middle">短期・予測不能</text><text x="92" y="126" fill="#9aa6bd" font-size="11" text-anchor="middle">基準価格</text>\
<rect x="180" y="30" width="145" height="150" rx="10" fill="#161e30" stroke="#51cf9b"/><text x="252" y="56" fill="#51cf9b" font-size="13" font-weight="700" text-anchor="middle">リザーブド/SP</text><text x="252" y="90" fill="#e9edf5" font-size="11" text-anchor="middle">1〜3年 常時</text><text x="252" y="126" fill="#51cf9b" font-size="11" text-anchor="middle">最大72%引</text>\
<rect x="340" y="30" width="145" height="150" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="412" y="56" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">スポット</text><text x="412" y="90" fill="#e9edf5" font-size="11" text-anchor="middle">中断OKな処理</text><text x="412" y="126" fill="#ff9d3c" font-size="11" text-anchor="middle">最大90%引</text>\
<rect x="500" y="30" width="120" height="150" rx="10" fill="#161e30" stroke="#9aa6bd"/><text x="560" y="56" fill="#9aa6bd" font-size="13" font-weight="700" text-anchor="middle">専有</text><text x="560" y="90" fill="#e9edf5" font-size="11" text-anchor="middle">物理隔離</text><text x="560" y="126" fill="#9aa6bd" font-size="11" text-anchor="middle">最高価格</text>\
</svg>',
        cap: "中断OK→スポット / 長期常時→リザーブド・SP / 読めない短期→オンデマンド / 物理隔離→専有。",
      },
      {
        h: "5つのモデルの使い分けと組み合わせ",
        body: "<ul><li><strong>オンデマンド</strong>：契約縛りなしで割高。<strong>短期・需要が読めない</strong>検証や一時利用に。</li><li><strong>リザーブドインスタンス(RI)</strong>：<strong>1年か3年</strong>のコミットで最大72%引。<strong>常時稼働が確定</strong>の本番向け。属性固定の<strong>Standard</strong>(割引大)と、後からタイプ等を変えられる<strong>Convertible</strong>(柔軟・割引やや小)。</li><li><strong>Savings Plans(SP)</strong>：『1時間あたり$Xを1〜3年使う』というコミットで割引。<strong>Compute SP</strong>ならインスタンスタイプ/リージョン/FargateやLambdaまで横断で効き<strong>最も柔軟</strong>。</li><li><strong>スポット</strong>：AWSの空き枠を<strong>最大90%引</strong>で使うが、AWS都合で<strong>中断され得る</strong>。<strong>中断に耐えられるバッチ/解析/ステートレス</strong>処理向け。</li><li><strong>Dedicated(専有)</strong>：物理サーバーを占有。<strong>物理分離の規制・持ち込みライセンス</strong>用で最も高い。</li></ul><p>実務の定石は<strong>組み合わせ</strong>だ。常時動くベースライン分はRI/SPで割引を確保し、変動・スパイク分はオンデマンドやスポットで補う。これが『安く、かつ安定』の最適解になる。</p>",
      },
    ],
    memorize: [
      { k: "オンデマンド", v: "縛りなし・割高。<strong>短期/需要が読めない</strong>用途。" },
      { k: "リザーブド(RI)", v: "1〜3年コミットで最大72%引。常時稼働確定の本番。Standard/Convertible。" },
      { k: "Standard vs Convertible RI", v: "Standard=割引大・属性固定 / <strong>Convertible=タイプ等を変更可</strong>・割引やや小。" },
      { k: "Savings Plans", v: "$/時コミットで割引。<strong>Compute SP</strong>はタイプ/リージョン/Fargate/Lambda横断で柔軟。" },
      { k: "スポット", v: "最大90%引・<strong>中断あり</strong>。中断耐性のあるバッチ/解析/ステートレスに。" },
      { k: "専有(Dedicated)", v: "物理占有。<strong>物理隔離規制・持込ライセンス</strong>。最も高い。" },
      { k: "ハイブリッド戦略", v: "ベースライン→RI/SP、変動/スパイク→オンデマンド/スポット。" },
      { k: "選び分けの呪文", v: "中断OK→スポット / 長期常時→RI・SP / 読めない短期→オンデマンド / 物理隔離→専有。" },
    ],
    flashcards: [
      { q: "中断しても再開できる夜間バッチ。最安は？", a: "スポット(最大90%引)" },
      { q: "3年間ずっと動かす本番。最もコスト効率が良いのは？", a: "リザーブド/Savings Plans" },
      { q: "タイプやリージョンを跨いで柔軟に割引したい。", a: "Compute Savings Plans" },
      { q: "後からインスタンスタイプを変えられるRIは？", a: "Convertible RI" },
      { q: "物理サーバーを他社と共有できない規制。選ぶのは？", a: "Dedicated Hosts/Instances" },
    ],
    quiz: [
      {
        q: "機械学習の学習ジョブを毎晩バッチ実行する。中断されてもチェックポイントから自動再開でき、完了時刻に厳密な制約はない。コストを最小化する料金モデルは？",
        choices: ["オンデマンド", "3年リザーブドインスタンス", "スポットインスタンス", "Dedicated Hosts"],
        answer: 2,
        explain: "<strong>中断耐性あり＋最安狙い＝スポット</strong>。中断されても自動再開できる処理に最適で最大90%引。",
      },
      {
        q: "基幹システムのWebサーバーを今後3年間24/365稼働させることが確定。最もコスト効率の高い購入方法は？",
        choices: ["オンデマンドのまま", "スポット", "3年のリザーブド/Savings Plans", "毎月オンデマンドを買い直す"],
        answer: 2,
        explain: "<strong>長期・常時稼働が確定＝リザーブド/Savings Plans</strong>。スポットは中断リスクで本番常時稼働に不適。",
      },
    ],
  },
  {
    id: "elb-asg", domain: "コンピューティング", icon: "⚖️", title: "ELB と Auto Scaling",
    intro: "「負荷が増えても落ちない」黄金コンビ。ELBで分散・ASGで台数自動増減。超頻出パターン。",
    understand: [
      {
        h: "1台では『落ちる』『捌けない』——だから分散と自動増減",
        body: "<p>サーバーが1台だと2つの問題が起きる。①その1台が壊れたら<strong>サービス全停止</strong>(単一障害点)。②アクセスが急増したら<strong>処理しきれず遅延・ダウン</strong>。これを解決するのが<strong>ELB</strong>と<strong>Auto Scaling</strong>の組み合わせで、SAAで最も繰り返し出る『鉄板パターン』だ。</p><p><strong>ELB(ロードバランサー)</strong>は、届いたアクセスを複数のサーバーへ<strong>均等に振り分ける受付係</strong>。各サーバーの健康状態を<strong>ヘルスチェック</strong>で監視し、不調なサーバーには振り分けず自動で外す。<strong>Auto Scaling Group(ASG)</strong>は、負荷に応じてサーバーの<strong>台数を自動で増減</strong>する(混雑時は増やし＝スケールアウト、暇なら減らす＝スケールイン)。さらに、ヘルスチェックで落ちたインスタンスを<strong>自動で新品に置き換える</strong>自己修復も担う。</p>",
        diagram:
          '<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="270" y="12" width="100" height="30" rx="8" fill="#0c1220" stroke="#9aa6bd"/><text x="320" y="32" fill="#e9edf5" font-size="12" text-anchor="middle">ユーザー</text>\
<rect x="220" y="64" width="200" height="36" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="320" y="87" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">ELB（負荷分散）</text>\
<line x1="320" y1="42" x2="320" y2="62" stroke="#9aa6bd" stroke-width="2"/>\
<rect x="60" y="135" width="240" height="115" rx="10" fill="none" stroke="#4dabf7" stroke-dasharray="5 4"/><text x="180" y="156" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">AZ-a</text>\
<rect x="340" y="135" width="240" height="115" rx="10" fill="none" stroke="#4dabf7" stroke-dasharray="5 4"/><text x="460" y="156" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">AZ-c</text>\
<rect x="90" y="172" width="80" height="28" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="130" y="191" fill="#e9edf5" font-size="11" text-anchor="middle">EC2</text>\
<rect x="190" y="172" width="80" height="28" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="230" y="191" fill="#e9edf5" font-size="11" text-anchor="middle">EC2</text>\
<rect x="370" y="172" width="80" height="28" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="410" y="191" fill="#e9edf5" font-size="11" text-anchor="middle">EC2</text>\
<rect x="470" y="172" width="80" height="28" rx="6" fill="#0c1220" stroke="#51cf9b" stroke-dasharray="3 3"/><text x="510" y="191" fill="#9aa6bd" font-size="11" text-anchor="middle">+1台</text>\
<text x="320" y="232" fill="#ff9d3c" font-size="12" text-anchor="middle">Auto Scaling Group：負荷で台数を自動増減＋不調を自動置換</text>\
<line x1="270" y1="100" x2="130" y2="170" stroke="#9aa6bd" stroke-width="1.5"/><line x1="300" y1="100" x2="230" y2="170" stroke="#9aa6bd" stroke-width="1.5"/><line x1="360" y1="100" x2="410" y2="170" stroke="#9aa6bd" stroke-width="1.5"/>\
</svg>',
        cap: "ELBが複数AZのEC2へ分散、ASGが台数調整＆自己修復。負荷増にもAZ障害にも強い。",
      },
      {
        h: "ELBの種類を要件で選ぶ",
        body: "<p>ELBには種類があり、扱うプロトコルや要件で選ぶ。問題文のキーワードで判断する。</p><table class='cmp'><tr><th>種類</th><th>レイヤ</th><th>使いどころ</th></tr><tr><td><strong>ALB</strong></td><td>L7(HTTP/S)</td><td><strong>パス/ホスト名で振り分け</strong>・コンテナ・WAF連携。最も一般的</td></tr><tr><td><strong>NLB</strong></td><td>L4(TCP/UDP)</td><td><strong>超低遅延・高スループット・静的IP</strong>。送信元IP保持</td></tr><tr><td><strong>GLB</strong></td><td>L3</td><td>サードパーティ製FW/IDSアプライアンスの集約</td></tr></table><p>『HTTPのURLで振り分け』はALB、『超低遅延・固定IP・TCP』はNLB、と即答できるようにする。</p>",
      },
      {
        h: "スケーリング方式の使い分け",
        body: "<p>Auto Scalingの『いつ・どれだけ増やすか』にも種類がある。</p><ul><li><strong>ターゲット追跡</strong>：『CPU使用率を50%に保つ』のように目標値を維持する。<strong>最も一般的で簡単</strong>。</li><li><strong>ステップスケーリング</strong>：閾値ごとに段階的に増減(CPU70%で+2台、90%で+4台)。</li><li><strong>スケジュールド</strong>：<strong>予測可能な波</strong>(毎朝9時・月初)に時刻指定で事前増強。立ち上がりの遅れを防ぐ。</li></ul><p>そして可用性の鉄則は<strong>複数AZにまたがってELB＋ASGを配置する</strong>こと。これで『負荷急増』にも『AZ障害』にも同時に耐える。SAAのWeb系設問の模範解答だ。</p>",
      },
    ],
    memorize: [
      { k: "ELB", v: "複数サーバーへ<strong>負荷分散</strong>＋<strong>ヘルスチェック</strong>で不調を自動除外。" },
      { k: "Auto Scaling", v: "需要で台数自動増減＋<strong>不調インスタンスの自動置換(自己修復)</strong>。最小/希望/最大を設定。" },
      { k: "ALB(L7)", v: "<strong>パス/ホスト名ルーティング</strong>・HTTP/S・コンテナ・WAF連携。" },
      { k: "NLB(L4)", v: "<strong>超低遅延・高スループット・静的IP</strong>・TCP/UDP・送信元IP保持。" },
      { k: "GLB", v: "サードパーティ仮想アプライアンス(FW/IDS)の透過的集約。" },
      { k: "ターゲット追跡", v: "CPU等を目標値に維持(基本のスケーリング)。" },
      { k: "ステップスケーリング", v: "閾値ごとに段階的に増減。" },
      { k: "スケジュールド", v: "<strong>予測可能な波</strong>に時刻指定で事前増強。" },
      { k: "鉄板構成", v: "<strong>ELB + ASG + 複数AZ</strong>。負荷増にもAZ障害にも耐える。" },
    ],
    flashcards: [
      { q: "HTTPのパス(/api,/img)で振り分けたい。どのELB？", a: "ALB(L7)" },
      { q: "超低遅延・固定IP・TCPが要る。どのELB？", a: "NLB(L4)" },
      { q: "急なアクセス増で台数を自動で増やすのは？", a: "Auto Scaling Group" },
      { q: "毎朝決まって負荷が上がる。最適なスケーリングは？", a: "スケジュールドスケーリング" },
      { q: "ASGのインスタンスが不調になったら？", a: "ヘルスチェックで検知し自動で新品に置換" },
      { q: "可用性を高めるELB+ASGの配置の鉄則は？", a: "複数AZにまたがって配置" },
    ],
    quiz: [
      {
        q: "Webアプリのアクセスが時間帯で大きく変動し、ピーク時はサーバー不足・閑散時は無駄が出ている。可用性とコスト効率を両立する構成は？",
        choices: ["単一の大型インスタンスに変更", "ALBとAuto Scaling Groupを複数AZで構成", "ピーク台数を常時起動", "スポット1台を追加"],
        answer: 1,
        explain: "<strong>ALB+ASG+複数AZ</strong>が王道。自動増減でコストを抑えつつAZ障害にも耐える。",
      },
      {
        q: "ミリ秒単位の低遅延が要求されるTCPベースの金融アプリで、クライアントに提示する固定IPが必要。最適なロードバランサーは？",
        choices: ["ALB", "NLB", "Classic LB", "API Gateway"],
        answer: 1,
        explain: "<strong>超低遅延・L4(TCP)・静的IP＝NLB</strong>。ALBはL7・HTTP向きで標準では固定IPを持たない。",
      },
      {
        q: "毎週月曜の朝に必ずトラフィックが急増する。立ち上がりの遅れなくコストも抑えたい。最適なスケーリングは？",
        choices: ["ターゲット追跡のみ", "スケジュールドスケーリングで事前に増やす", "手動対応", "常時最大台数"],
        answer: 1,
        explain: "<strong>予測可能な波＝スケジュールドスケーリング</strong>。事前増強で立ち上がり遅延を回避し、平常時は減らせる。",
      },
    ],
  },
  {
    id: "lambda", domain: "コンピューティング", icon: "λ", title: "Lambda とサーバーレス基盤",
    intro: "サーバー管理ゼロ・実行分課金。『運用負荷最小』『イベント駆動』ならこれ。周辺(API GW/Step Functions)も。",
    understand: [
      {
        h: "サーバーを持たず『コードだけ』動かす",
        body: "<p>従来はアプリを動かすために常時サーバー(EC2)を起動し、暇な時間も課金され、パッチやスケールも自分で面倒を見ていた。<strong>Lambda</strong>はこれを根本から変える。<strong>関数(コード)を登録しておくと、イベントが起きた時だけ自動で実行</strong>され、<strong>実行した時間とメモリの分だけ課金</strong>される。アイドル時は0円。サーバーの存在自体を意識しない『サーバーレス』の中心だ。</p><p>イベントの例は豊富で、<strong>S3にファイルがアップされた・API Gatewayにリクエストが来た・SQSにメッセージが届いた・EventBridgeのスケジュール(毎日定時)</strong>など。アクセスが増えれば自動で並列実行されてスケールし、運用負荷とコストを大きく下げられる。『運用負荷を最小に』『イベント駆動で』ときたら、まずLambdaを検討する。</p>",
        diagram:
          '<svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="50" width="140" height="50" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="90" y="73" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">イベント発生</text><text x="90" y="90" fill="#9aa6bd" font-size="9" text-anchor="middle">S3/API/SQS/定時</text>\
<rect x="210" y="45" width="170" height="60" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="295" y="70" fill="#ff9d3c" font-size="13" font-weight="700" text-anchor="middle">Lambda 関数</text><text x="295" y="89" fill="#9aa6bd" font-size="9" text-anchor="middle">自動スケール・実行分課金</text>\
<rect x="430" y="50" width="190" height="50" rx="8" fill="#0c1220" stroke="#51cf9b"/><text x="525" y="73" fill="#51cf9b" font-size="11" text-anchor="middle">他サービスを呼ぶ/保存</text><text x="525" y="90" fill="#9aa6bd" font-size="9" text-anchor="middle">DynamoDB / S3 など</text>\
<line x1="160" y1="75" x2="208" y2="75" stroke="#9aa6bd" stroke-width="2" marker-end="url(#la)"/><line x1="380" y1="75" x2="428" y2="75" stroke="#9aa6bd" stroke-width="2" marker-end="url(#la)"/>\
<defs><marker id="la" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "イベント→Lambda→他サービス。サーバー管理不要・アイドル無料のイベント駆動の中核。",
      },
      {
        h: "Lambdaの制約を知っておく",
        body: "<p>万能ではなく、制約を知ることが設計の分かれ目になる。<strong>最大実行時間は15分</strong>——これを超える長い処理(大規模バッチ等)はLambdaに向かず、<strong>Fargate</strong>(コンテナ)やStep Functionsでの分割を選ぶ。メモリは<strong>128MB〜10,240MB</strong>で割り当て、<strong>CPUはメモリに比例</strong>して増えるため、処理が遅いときはメモリを増やすと速くなる(結果的に安くなることも)。VPC内のRDS等へ接続するにはLambdaの<strong>VPC設定</strong>が必要。起動時の遅延(コールドスタート)が気になる場合は<strong>プロビジョンド同時実行</strong>で温めておける。</p>",
      },
      {
        h: "周辺サービスでサーバーレスを組み上げる",
        body: "<p>Lambda単体ではなく、周辺と組み合わせてアプリを作る。</p><ul><li><strong>API Gateway</strong>＝マネージドな<strong>APIの入口</strong>。認証・スロットリング(流量制限)・キャッシュを担い、Lambdaを呼び出す。<strong>API Gateway + Lambda + DynamoDB</strong>が<strong>フルサーバーレスWeb</strong>の定番三点セット。</li><li><strong>Step Functions</strong>＝複数のLambdaを<strong>ワークフロー(順序・分岐・並列・リトライ・待機)</strong>として制御。複雑な処理フローを可視化し信頼性を高める。</li><li><strong>EventBridge</strong>＝イベントバス＋<strong>スケジュール(cron)</strong>でサービス連携・定時実行。</li></ul>",
      },
    ],
    memorize: [
      { k: "Lambda", v: "サーバー管理ゼロ・イベント駆動・<strong>実行分だけ課金</strong>・自動スケール・アイドル無料。" },
      { k: "使う合図", v: "『運用負荷最小』『イベント駆動』『短時間処理』。常駐/15分超→Fargate/EC2。" },
      { k: "実行時間の上限", v: "<strong>最大15分</strong>。超える処理はFargate/Step Functionsへ。" },
      { k: "メモリとCPU", v: "メモリ128MB〜10,240MB。<strong>CPUはメモリに比例</strong>(遅い時はメモリ増)。" },
      { k: "コールドスタート対策", v: "<strong>プロビジョンド同時実行</strong>で温めて遅延を低減。" },
      { k: "VPCアクセス", v: "RDS等VPC内へはLambdaの<strong>VPC設定</strong>が必要。" },
      { k: "API Gateway", v: "マネージドなAPI入口。認証/スロットリング/キャッシュ/ステージ。" },
      { k: "Step Functions", v: "複数Lambdaの<strong>ワークフロー</strong>(順序/分岐/並列/リトライ)。" },
      { k: "定番構成", v: "<strong>API Gateway + Lambda + DynamoDB</strong>＝フルサーバーレス。" },
    ],
    flashcards: [
      { q: "S3アップロードでサムネイル生成。サーバーを持たず実現するには？", a: "S3イベント→Lambda" },
      { q: "Lambdaの最大実行時間は？", a: "15分(超える処理はFargate/Step Functions)" },
      { q: "Lambdaの処理が遅い。コードを変えず速くするには？", a: "割り当てメモリを増やす(CPUが比例して増える)" },
      { q: "サーバーレスでREST APIの入口を提供するのは？", a: "Amazon API Gateway" },
      { q: "複数Lambdaを順序・分岐・リトライ制御したい。", a: "AWS Step Functions" },
    ],
    quiz: [
      {
        q: "新規APIを構築する。トラフィックは大きく変動し、サーバーのプロビジョニング/管理を避け運用負荷を最小化したい。最適な構成は？",
        choices: ["EC2 + 自前Web + RDS", "API Gateway + Lambda + DynamoDB", "ECS on EC2 + Aurora", "単一大型EC2"],
        answer: 1,
        explain: "<strong>フルサーバーレス＝API Gateway + Lambda + DynamoDB</strong>。自動スケールで運用負荷最小。",
      },
      {
        q: "受注処理を「在庫確認→決済→出荷指示」の順で、失敗時はリトライしながら確実に実行したい。複数のLambdaを統制する最適なサービスは？",
        choices: ["SNSで連鎖", "Step Functions", "各Lambdaから次を直接呼ぶ", "CloudWatch Logs"],
        answer: 1,
        explain: "順序・分岐・リトライ・状態管理は<strong>Step Functions</strong>。直接連鎖はエラー処理と可視性が破綻しやすい。",
      },
      {
        q: "16分かかるバッチ処理をサーバーレスで実行したい。Lambdaの制限に抵触する。代替として最適なのは？",
        choices: ["Lambdaのタイムアウトを延長", "AWS Fargate(コンテナ)で実行", "EC2スポットでのみ実行", "API Gatewayのタイムアウトを延ばす"],
        answer: 1,
        explain: "Lambdaは<strong>最大15分</strong>。超える処理はサーバーレスコンテナの<strong>Fargate</strong>等へ。タイムアウトは延ばせない。",
      },
    ],
  },
  {
    id: "containers", domain: "コンピューティング", icon: "📦", title: "コンテナ (ECS/EKS/Fargate)",
    intro: "コンテナの実行基盤。サーバー管理の有無(Fargate vs EC2)と、ECS/EKSの選択が要点。",
    understand: [
      {
        h: "コンテナとは『どこでも同じに動く箱』",
        body: "<p><strong>コンテナ</strong>は、アプリと必要なライブラリ・設定を1つの箱にまとめた実行単位だ。開発環境でも本番でも<strong>『どこでも同じように動く』</strong>ため移植性が高く、起動が速く、軽量。マイクロサービス(機能ごとに小さく分けたサービス群)の実行に広く使われる。コンテナのイメージ(設計図)は<strong>ECR(Elastic Container Registry)</strong>に保管する。</p><p>多数のコンテナを『どのサーバーで何個動かすか』管理する仕組みが<strong>オーケストレーション</strong>で、AWSには2つの選択肢がある。</p>",
        diagram:
          '<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<text x="160" y="24" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">オーケストレーション</text>\
<rect x="40" y="40" width="240" height="44" rx="8" fill="#161e30" stroke="#ff9d3c"/><text x="160" y="61" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">ECS</text><text x="160" y="77" fill="#9aa6bd" font-size="10" text-anchor="middle">AWS独自・シンプル</text>\
<rect x="40" y="92" width="240" height="44" rx="8" fill="#161e30" stroke="#4dabf7"/><text x="160" y="113" fill="#4dabf7" font-size="12" font-weight="700" text-anchor="middle">EKS</text><text x="160" y="129" fill="#9aa6bd" font-size="10" text-anchor="middle">Kubernetes・移植性</text>\
<text x="480" y="24" fill="#e9edf5" font-size="12" font-weight="700" text-anchor="middle">起動タイプ(どこで動かす)</text>\
<rect x="360" y="40" width="240" height="44" rx="8" fill="#161e30" stroke="#51cf9b"/><text x="480" y="61" fill="#51cf9b" font-size="12" font-weight="700" text-anchor="middle">Fargate</text><text x="480" y="77" fill="#9aa6bd" font-size="10" text-anchor="middle">サーバー管理なし(運用最小)</text>\
<rect x="360" y="92" width="240" height="44" rx="8" fill="#161e30" stroke="#9aa6bd"/><text x="480" y="113" fill="#9aa6bd" font-size="12" font-weight="700" text-anchor="middle">EC2起動タイプ</text><text x="480" y="129" fill="#9aa6bd" font-size="10" text-anchor="middle">自分でEC2群を管理</text>\
<text x="320" y="168" fill="#9aa6bd" font-size="10" text-anchor="middle">『ECS or EKS』×『Fargate or EC2』の組み合わせで選ぶ</text>\
</svg>',
        cap: "オーケストレーション(ECS/EKS)と起動タイプ(Fargate/EC2)は別軸。組み合わせて選ぶ。",
      },
      {
        h: "ECS/EKS と Fargate/EC2 の2軸で選ぶ",
        body: "<p>選択は2つの軸で考える。</p><p><strong>軸1：オーケストレーション</strong>。<strong>ECS</strong>＝AWS独自でシンプル、AWSサービスとの統合が容易。<strong>EKS</strong>＝マネージドな<strong>Kubernetes</strong>で、K8s標準に準拠し他環境への<strong>移植性</strong>がある(既にK8sを使っている/マルチクラウドが要件)。</p><p><strong>軸2：起動タイプ(コンテナをどこで動かすか)</strong>。<strong>Fargate</strong>＝<strong>サーバーレス</strong>で、土台のEC2を一切管理しない(パッチもスケールも不要)＝<strong>運用負荷が最小</strong>。<strong>EC2起動タイプ</strong>＝自分でEC2群を用意・管理し、GPUなど特殊要件や細かいコスト最適化が必要なとき。</p><p>SAAの定番:『コンテナを運用負荷なく動かしたい』→<strong>Fargate</strong>、『Kubernetes標準・移植性』→<strong>EKS</strong>、『シンプルにAWS統合』→<strong>ECS</strong>。</p>",
      },
    ],
    memorize: [
      { k: "コンテナ", v: "アプリ＋依存を箱に。<strong>どこでも同じに動く</strong>・軽量・高速起動。" },
      { k: "ECS", v: "AWS独自のオーケストレーション(シンプル・AWS統合)。" },
      { k: "EKS", v: "マネージド<strong>Kubernetes</strong>。K8s標準・マルチクラウド移植性。" },
      { k: "Fargate", v: "<strong>サーバーレスでコンテナ実行</strong>。EC2管理不要・運用最小(ECS/EKS両対応)。" },
      { k: "EC2起動タイプ", v: "EC2群を自分で管理。GPU等の特殊要件・細かいコスト最適化。" },
      { k: "ECR", v: "コンテナ<strong>イメージレジストリ</strong>。" },
      { k: "選び分け", v: "運用負荷最小→Fargate / K8s標準→EKS / シンプルなAWS統合→ECS。" },
    ],
    flashcards: [
      { q: "コンテナをサーバー管理なしで動かしたい。起動タイプは？", a: "Fargate" },
      { q: "Kubernetes標準で移植性が欲しい。使うのは？", a: "Amazon EKS" },
      { q: "コンテナイメージの保管場所は？", a: "Amazon ECR" },
      { q: "AWSに寄せたシンプルなコンテナ管理は？", a: "Amazon ECS" },
      { q: "コンテナ選定の2つの軸は？", a: "オーケストレーション(ECS/EKS)×起動タイプ(Fargate/EC2)" },
    ],
    quiz: [
      {
        q: "コンテナ化したマイクロサービスを、基盤サーバーの管理(パッチ/スケール)を一切行わずに運用したい。最適な構成は？",
        choices: ["ECS on EC2", "ECS/EKS on Fargate", "自前K8sをEC2に構築", "Lambdaのみ"],
        answer: 1,
        explain: "コンテナを<strong>サーバー管理なし＝Fargate</strong>起動タイプ。EC2起動タイプはサーバー運用が残る。",
      },
      {
        q: "既存のKubernetesワークロードを、標準的なK8s APIを保ったままAWSへ移行し、将来の他環境への移植性も確保したい。最適なのは？",
        choices: ["ECS", "EKS", "Elastic Beanstalk", "Lambda"],
        answer: 1,
        explain: "<strong>Kubernetes標準・移植性＝EKS</strong>。ECSはAWS独自仕様で移植性は低い。",
      },
    ],
  },
  {
    id: "beanstalk-batch", domain: "コンピューティング", icon: "🚀", title: "Beanstalk・Batch・Lightsail",
    intro: "アプリのデプロイ簡素化(Beanstalk)、バッチ実行(Batch)、簡易VPS(Lightsail)。役割を一言で。",
    understand: [
      {
        h: "用途特化のコンピュート——『手間をかけずに動かす』選択肢",
        body: "<p>EC2を一から組むのは自由度が高い反面、手間もかかる。特定の用途に絞って『楽に動かす』ためのサービスがある。</p><ul><li><strong>Elastic Beanstalk</strong>＝コードをアップロードするだけで、必要な<strong>EC2・ELB・Auto Scaling・環境設定を自動で構成しデプロイ</strong>してくれる。インフラ構築に詳しくなくても標準的なWebアプリを素早く公開でき、しかも裏側のリソースは<strong>自分で見える・調整できる</strong>(ブラックボックスではない)。</li><li><strong>AWS Batch</strong>＝大量の<strong>バッチジョブ</strong>をキューに積み、最適なインスタンス(スポット活用も可)を自動で確保して実行する。ジョブの並列実行・依存関係の管理に向く。</li><li><strong>Lightsail</strong>＝<strong>定額・最小学習コストの簡易VPS</strong>。小規模サイトや個人プロジェクトを最速で立ち上げたいときに。</li></ul>",
        diagram:
          '<svg viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">\
<rect x="20" y="55" width="120" height="50" rx="8" fill="#0c1220" stroke="#9aa6bd"/><text x="80" y="78" fill="#e9edf5" font-size="11" text-anchor="middle">コードをアップ</text><text x="80" y="94" fill="#6b7691" font-size="9" text-anchor="middle">開発者</text>\
<rect x="190" y="45" width="180" height="70" rx="10" fill="#161e30" stroke="#ff9d3c"/><text x="280" y="70" fill="#ff9d3c" font-size="12" font-weight="700" text-anchor="middle">Elastic Beanstalk</text><text x="280" y="90" fill="#9aa6bd" font-size="9" text-anchor="middle">環境を自動構成</text>\
<rect x="430" y="40" width="180" height="34" rx="6" fill="#0c1220" stroke="#4dabf7"/><text x="520" y="62" fill="#4dabf7" font-size="10" text-anchor="middle">EC2 + ELB + Auto Scaling</text>\
<rect x="430" y="82" width="180" height="34" rx="6" fill="#0c1220" stroke="#51cf9b"/><text x="520" y="104" fill="#51cf9b" font-size="10" text-anchor="middle">監視・デプロイ</text>\
<line x1="140" y1="80" x2="188" y2="80" stroke="#9aa6bd" stroke-width="2" marker-end="url(#bs)"/><line x1="370" y1="70" x2="428" y2="60" stroke="#9aa6bd" stroke-width="1.5" marker-end="url(#bs)"/><line x1="370" y1="90" x2="428" y2="99" stroke="#9aa6bd" stroke-width="1.5" marker-end="url(#bs)"/>\
<defs><marker id="bs" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa6bd"/></marker></defs>\
</svg>',
        cap: "Beanstalkはコードを上げるだけでEC2/ELB/ASGを自動構成。基盤も見える・調整できる。",
      },
    ],
    memorize: [
      { k: "Elastic Beanstalk", v: "コードを上げるだけで<strong>環境(EC2/ELB/ASG)を自動構成しデプロイ</strong>。基盤も調整可。" },
      { k: "AWS Batch", v: "大量<strong>バッチジョブ</strong>のキューイング＋最適インスタンス自動確保(スポット活用)。" },
      { k: "Lightsail", v: "<strong>定額の簡易VPS</strong>。小規模/個人/学習向け・最小学習コスト。" },
      { k: "選び分け", v: "簡単デプロイ→Beanstalk / 大量バッチ→Batch / 簡易固定費→Lightsail。" },
    ],
    flashcards: [
      { q: "標準的なWebアプリを、インフラ構成を意識せず素早くデプロイしたい。", a: "Elastic Beanstalk" },
      { q: "大量のバッチジョブをキュー化し最適インスタンスで処理したい。", a: "AWS Batch" },
      { q: "小規模サイトを定額・最小学習コストで立てたい。", a: "Amazon Lightsail" },
    ],
    quiz: [
      {
        q: "開発チームが、標準的な3層Webアプリを、ロードバランサーやAuto Scalingの細かな構成に時間をかけず素早くデプロイ・更新したい。ただし必要なら基盤リソースも確認・調整したい。最適なサービスは？",
        choices: ["Elastic Beanstalk", "Lightsail", "CloudFormationを手書き", "Lambda"],
        answer: 0,
        explain: "<strong>Elastic Beanstalk</strong>はコードを上げるだけでEC2/ELB/ASGを自動構成しつつ、基盤リソースも可視・調整できる。Lightsailは簡易VPSで本格的なスケール構成には不向き。",
      },
    ],
  }
);
