/* =============================================================
   コレダケAWS CCP カリキュラム — 09 ストレージ
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-storage", domain: "技術とサービス", icon: "🗃️", title: "ストレージ（S3・EBS・EFS・FSx）",
    intro: "オブジェクトストレージS3、EC2のディスクEBS、共有ファイルEFS／FSx（Windows・Lustre）、そしてS3のストレージクラス。",
    understand: [
      {
        h: "データ転送・大容量移行の補強——Transfer Acceleration・Transfer Family・DataSync・Snowball Edge・Storage Gateway",
        body: "<ul><li><strong>S3 Transfer Acceleration</strong>：遠隔地からのS3アップロードを<strong>エッジロケーション経由で高速化</strong>。長距離転送の速度改善。</li><li><strong>AWS Transfer Family</strong>：<strong>SFTP/FTPS/FTP</strong>でS3やEFSへファイル転送。既存のFTP運用をそのままクラウドへ。</li><li><strong>AWS DataSync</strong>：オンプレとAWS間の<strong>大量ファイルの同期・移行を高速・自動化</strong>。</li><li><strong>AWS Snowball Edge</strong>：<strong>大容量データを物理デバイスで搬送してオフライン移行</strong>。回線が細い/量が膨大なときに有効。簡単な計算も可能。</li><li><strong>AWS Storage Gateway</strong>：オンプレの機器からクラウドストレージ（S3等）を<strong>手元のストレージのように使える</strong>ようにするハイブリッド接続。<strong>よく使うデータは手元にキャッシュ</strong>されるので普段は高速に扱えます。</li><li><strong>AWS Backup</strong>：EBS・RDS・DynamoDB・EFS・FSx など<strong>複数サービスのバックアップを1か所でまとめて管理・自動化</strong>するサービス。『いつ・何を・何日保管するか』をポリシーで決めれば自動で取得・保持され、サービスごとにバラバラに設定する手間がなくなります。『<strong>バックアップの一元管理＝AWS Backup</strong>』。</li></ul>",
        cap: "遠距離アップロード高速化＝Transfer Acceleration、FTP系転送＝Transfer Family、大量同期＝DataSync、物理搬送＝Snowball Edge。",
      },

      {
        h: "3種類のストレージ——S3・EBS・EFS",
        body:
          "<p>AWSのストレージは大きく3種類。<strong>『何を・どう置くか』</strong>で使い分けます。</p>" +
          "<ul>" +
          "<li><strong>Amazon S3（オブジェクトストレージ）</strong>：写真・動画・バックアップ・ログなど<strong>あらゆるファイルを大量・安価に保存</strong>。容量は実質無制限で、非常に高い耐久性（99.999999999%＝イレブンナイン）。インターネット経由でアクセスでき、静的Webサイトの公開もできる。</li>" +
          "<li><strong>Amazon EBS（ブロックストレージ）</strong>：<strong>EC2にくっつけて使うディスク</strong>（Cドライブのようなもの）。基本1つのEC2に接続し、OSやデータベースを置く。</li>" +
          "<li><strong>Amazon EFS（ファイルストレージ）</strong>：<strong>複数のEC2から同時にマウントして共有</strong>できるファイル置き場。共有フォルダのイメージ。</li>" +
          "</ul>",
        diagram:
          '<svg viewBox="0 0 580 175" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">S3・EBS・EFS の使い分け</text>' +
          (function () {
            var cards = [
              { n: "S3", t: "オブジェクト", d: "大量のファイルを\n安価に保存", c: "#dce8f3", st: "#4a7fa8" },
              { n: "EBS", t: "ブロック", d: "EC2に付ける\nディスク(1台に接続)", c: "#f2e7cd", st: "#b28a2e" },
              { n: "EFS", t: "ファイル", d: "複数EC2から\n同時に共有", c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", w = 168, h = 100, gap = 18, x0 = 30, y = 40;
            cards.forEach(function (p, i) {
              var x = x0 + i * (w + gap);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 30) + '" fill="#23252b" font-size="16" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 50) + '" fill="#6b6e76" font-size="10" text-anchor="middle">' + p.t + "ストレージ</text>";
              var lines = p.d.split("\n");
              lines.forEach(function (ln, li) { s += '<text x="' + (x + w / 2) + '" y="' + (y + 70 + li * 15) + '" fill="#23252b" font-size="10.5" text-anchor="middle">' + ln + "</text>"; });
            });
            return s;
          })() +
          "</svg>",
        cap: "S3=大量のファイル置き場、EBS=EC2のディスク（1台に接続）、EFS=複数EC2で共有するファイル置き場。",
      },
      {
        h: "Amazon FSx——用途特化のフルマネージド共有ファイル（Windows／Lustre）",
        body:
          "<p>前項の <strong>EFS</strong> は、複数の EC2 からファイルを共有できる便利な仕組みでしたが、これは <strong>Linux 系（NFS プロトコル）</strong>を前提としたものでした。しかし現実の業務では『<strong>Windows のファイルサーバーをそのままクラウドで使いたい</strong>』『<strong>スーパーコンピュータ級の超高速な処理をさせたい</strong>』といった、より特化した要件があります。これに応えるのが <strong>Amazon FSx</strong>——世の中で広く使われている高性能なファイルシステムを、AWS が<strong>フルマネージド（構築・パッチ適用・バックアップまで AWS 任せ）</strong>で提供するサービスです。用途に合った『種類』を選んで使います。</p>" +
          "<p>CCP で押さえておきたい主要な 2 種類は次のとおりです。</p>" +
          "<ul>" +
          "<li><strong>FSx for Windows File Server</strong>：<strong>Windows ネイティブの共有ファイルストレージ</strong>です。Windows でおなじみの <strong>SMB プロトコル</strong>でアクセスでき、<strong>Active Directory（AD）と統合</strong>して既存の Windows のユーザー／アクセス権をそのまま利用できます。『社内で使っている Windows のファイルサーバー（共有フォルダ）をクラウドへ移したい』というときの定番です。EFS（Linux 向け）では Windows の共有要件を満たせない、という対比で問われます。</li>" +
          "<li><strong>FSx for Lustre</strong>：<strong>超高速・高スループット</strong>を狙った並列ファイルシステムで、<strong>HPC（ハイパフォーマンスコンピューティング）・機械学習（ML）の学習処理・大規模データ分析・動画/メディア処理</strong>など、計算集約型のワークロード向けです。<strong>Amazon S3 と連携</strong>でき、S3 上に置いた大量データを高速に読み書きして処理できます。『大量データを、とにかく高速に計算処理したい』ならこれです。</li>" +
          "</ul>" +
          "<p><strong>使い分けの決め手</strong>：共有ファイルが必要で、①<strong>Linux（NFS）なら EFS</strong>、②<strong>Windows（SMB・AD 連携）なら FSx for Windows File Server</strong>、③<strong>超高速な計算処理（HPC/ML）なら FSx for Lustre</strong>。試験では「<strong>Windows の共有ファイル＝FSx for Windows</strong>」「<strong>高性能計算＝FSx for Lustre</strong>」の 2 つをキーワードで結びつけておけば十分に解けます。（FSx にはこのほか NetApp ONTAP・OpenZFS 向けもありますが、CCP ではまず Windows と Lustre を押さえます。）</p>",
        diagram:
          '<svg viewBox="0 0 580 185" xmlns="http://www.w3.org/2000/svg"><text x="290" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="#23252b">共有ファイルの使い分け（EFS／FSx for Windows／FSx for Lustre）</text><rect x="24" y="42" width="170" height="110" rx="10" fill="#dcecdd" stroke="#5c9160"/><text x="109" y="70" text-anchor="middle" font-size="14" font-weight="800" fill="#366b3c">EFS</text><text x="109" y="90" text-anchor="middle" font-size="10" fill="#6b6e76">Linux 共有（NFS）</text><text x="109" y="113" text-anchor="middle" font-size="10.5" fill="#23252b">複数のLinux EC2で</text><text x="109" y="128" text-anchor="middle" font-size="10.5" fill="#23252b">ファイル共有</text><rect x="205" y="42" width="170" height="110" rx="10" fill="#dce8f3" stroke="#4a7fa8"/><text x="290" y="70" text-anchor="middle" font-size="12.5" font-weight="800" fill="#34567a">FSx for Windows</text><text x="290" y="90" text-anchor="middle" font-size="10" fill="#6b6e76">Windows 共有（SMB）</text><text x="290" y="113" text-anchor="middle" font-size="10.5" fill="#23252b">Active Directory連携</text><text x="290" y="128" text-anchor="middle" font-size="10.5" fill="#23252b">Windowsファイルサーバー</text><rect x="386" y="42" width="170" height="110" rx="10" fill="#e6ddf3" stroke="#7a55c9"/><text x="471" y="70" text-anchor="middle" font-size="12.5" font-weight="800" fill="#5a3a9a">FSx for Lustre</text><text x="471" y="90" text-anchor="middle" font-size="10" fill="#6b6e76">超高速・並列</text><text x="471" y="113" text-anchor="middle" font-size="10.5" fill="#23252b">HPC・機械学習・分析</text><text x="471" y="128" text-anchor="middle" font-size="10.5" fill="#23252b">S3と連携</text><text x="290" y="173" text-anchor="middle" font-size="10" fill="#6b6e76">Linux共有＝EFS／Windows共有＝FSx for Windows／高速計算＝FSx for Lustre</text></svg>',
        cap: "用途特化のマネージド共有ファイル＝FSx。Windows(SMB・AD)＝FSx for Windows、高速計算(HPC/ML・S3連携)＝FSx for Lustre。",
      },
      {
        h: "S3のストレージクラス——アクセス頻度でコストを下げる",
        body:
          "<p>S3 は 1 種類ではなく、<strong>データにどれくらいアクセスするか（アクセス頻度）</strong>に応じて<strong>ストレージクラス</strong>を選べます。<strong>よく使うものは保存料が高め・取り出しは無料</strong>、<strong>めったに使わないものは保存料が激安・取り出しに料金や時間</strong>、という関係です。用途に合わせて選ぶ（または自動で移す）ことでコストを大きく下げられます。</p>" +
          "<ul>" +
          "<li><strong>S3 標準（Standard）</strong>：<strong>頻繁にアクセスする</strong>データ用の基本クラス。データは<strong>複数の AZ（3つ以上）に自動複製</strong>され、非常に高い耐久性。取り出し料金なし。Web サイトの画像や稼働中のデータ向け。</li>" +
          "<li><strong>S3 標準-IA（Standard-Infrequent Access）</strong>：<strong>アクセス頻度は低いが、いざという時すぐ取り出したい</strong>データ用。<strong>複数の AZ に複製</strong>される点は標準と同じで<strong>可用性・耐久性は高いまま</strong>、<strong>保存料が安い</strong>代わりに<strong>取り出し（読み出し）に料金</strong>がかかります。最低保存期間 30 日。バックアップや月次でしか見ないデータ向け。</li>" +
          "<li><strong>S3 One Zone-IA（1 ゾーン-IA）</strong>：標準-IA とほぼ同じですが、<strong>データを 1 つの AZ にしか置きません</strong>。そのぶん<strong>さらに安い</strong>反面、<strong>その AZ が災害等で失われるとデータも失われます</strong>。だから<strong>“消えても再作成できるデータ”</strong>（別の場所にもある複製、サムネイル画像など）に限って使います。<strong>ここが最頻出の区別：標準-IA＝複数 AZ／One Zone-IA＝1 AZ のみ</strong>。</li>" +
          "<li><strong>S3 Intelligent-Tiering（自動階層化）</strong>：<strong>アクセス状況を AWS が見張って、自動で最適なクラスへ移動</strong>してくれます。アクセス頻度が読めない・管理の手間をかけたくないなら<strong>迷わずこれ</strong>。取り出し料金なし。</li>" +
          "<li><strong>S3 Glacier 各種（アーカイブ用・最安）</strong>：<strong>めったにアクセスしない長期保管</strong>用で最安。取り出しに時間がかかり、その速さで 3 段階——<strong>Glacier Instant Retrieval</strong>（すぐ取り出せる）／<strong>Glacier Flexible Retrieval</strong>（数分〜数時間）／<strong>Glacier Deep Archive</strong>（最安・十数時間、法令で数年保管する書類など）。</li>" +
          "</ul>" +
          "<p><strong>ライフサイクルポリシー</strong>を設定すれば、『作成 30 日後に標準-IA へ、90 日後に Glacier へ、1 年後に削除』のように<strong>時間の経過に合わせて自動でクラスを移動・削除</strong>できます。手作業で移し替える必要はありません。</p>" +
          "<p><strong>試験のキーワードで選ぶ：</strong>「頻繁にアクセス」→ 標準／「たまにアクセス・でもすぐ出したい・重要」→ 標準-IA／「<strong>消えても作り直せる・とにかく安く</strong>」→ One Zone-IA／「<strong>アクセス頻度が読めない・自動でおまかせ</strong>」→ Intelligent-Tiering／「<strong>数年しまうだけ・最安</strong>」→ Glacier Deep Archive。</p>",
        diagram:
          '<svg viewBox="0 0 580 230" xmlns="http://www.w3.org/2000/svg"><text x="290" y="20" text-anchor="middle" font-size="13.5" font-weight="700" fill="#23252b">S3ストレージクラス（アクセス頻度でコストが下がる）</text>' +
          (function(){var head=["クラス","アクセス頻度","AZ","保存料","取り出し"];var rows=[["標準","高い","複数AZ","高め","無料・即時"],["標準-IA","低い","複数AZ","安い","料金あり・即時"],["One Zone-IA","低い","1 AZ のみ","もっと安い","料金あり・即時"],["Intelligent-Tiering","読めない","複数AZ","自動最適化","無料"],["Glacier 各種","めったに","複数AZ","最安","時間がかかる"]];var w=[132,84,92,96,104],x0=16,y0=34,rh=34;var xs=[x0];for(var i=0;i<w.length;i++)xs.push(xs[i]+w[i]);var s="";head.forEach(function(h,ci){s+='<rect x="'+xs[ci]+'" y="'+y0+'" width="'+w[ci]+'" height="'+rh+'" fill="#eceff3" stroke="#c7ccd2"/><text x="'+(xs[ci]+w[ci]/2)+'" y="'+(y0+21)+'" text-anchor="middle" font-size="10.5" font-weight="700" fill="#23252b">'+h+'</text>';});rows.forEach(function(row,ri){var y=y0+(ri+1)*rh;row.forEach(function(cell,ci){var hl=(ci===2&&cell==="1 AZ のみ");s+='<rect x="'+xs[ci]+'" y="'+y+'" width="'+w[ci]+'" height="'+rh+'" fill="'+(hl?"#f6e4e0":"#ffffff")+'" stroke="#d8dbe0"/>';s+='<text x="'+(xs[ci]+w[ci]/2)+'" y="'+(y+21)+'" text-anchor="middle" font-size="'+(ci===0?10.5:9.8)+'" '+(ci===0?'font-weight="700" ':(hl?'font-weight="800" ':''))+'fill="'+(hl?"#8a2b20":"#23252b")+'">'+cell+'</text>';});});return s;})() +
          '<text x="290" y="222" text-anchor="middle" font-size="9.5" fill="#c0392b">最重要：標準-IA＝複数AZ（安全）／One Zone-IA＝1 AZのみ（さらに安いが消失リスク）</text>' +
          '</svg>',
        cap: "頻繁=標準、たまに・重要=標準-IA(複数AZ)、消えても平気で最安=One Zone-IA(1 AZ)、読めない=Intelligent-Tiering、長期保管=Glacier。",
      },
    ],
    memorize: [
      { k: "S3 Transfer Acceleration", v: "<strong>遠距離からのS3アップロードをエッジ経由で高速化</strong>。" },
      { k: "AWS Transfer Family", v: "<strong>SFTP/FTPS/FTP</strong>でS3/EFSへ転送。" },
      { k: "AWS DataSync", v: "オンプレ〜AWS間の<strong>大量ファイル同期・移行を自動化</strong>。" },
      { k: "AWS Snowball Edge", v: "<strong>大容量データを物理デバイスで搬送</strong>してオフライン移行。" },
      { k: "AWS Storage Gateway", v: "オンプレから<strong>クラウドストレージを手元のように使う</strong>ハイブリッド接続（よく使うデータはキャッシュ）。" },
      { k: "AWS Backup", v: "EBS/RDS/DynamoDB/EFS/FSx等<strong>複数サービスのバックアップを一元管理・自動化</strong>。ポリシーで取得と保持を自動化。" },

      { k: "S3", v: "オブジェクトストレージ。大量のファイルを安価・高耐久(イレブンナイン)で保存。静的サイト公開も可。" },
      { k: "EBS", v: "EC2に接続して使うブロックストレージ（ディスク）。基本1台に接続。" },
      { k: "EFS", v: "複数のEC2から同時に共有できるファイルストレージ（Linux／NFS）。" },
      { k: "Amazon FSx", v: "用途特化のフルマネージド共有ファイル。Windows向け・Lustre(高性能)などから種類を選ぶ。" },
      { k: "FSx for Windows File Server", v: "Windowsネイティブの共有ファイル。<strong>SMB＋Active Directory統合</strong>。既存Windowsファイルサーバーの移行に。" },
      { k: "FSx for Lustre", v: "<strong>HPC・機械学習・大規模分析</strong>向けの超高速並列ファイルシステム。<strong>S3と連携</strong>。" },
      { k: "S3標準-IA", v: "低頻度アクセス向け。<strong>複数AZに複製（可用性は高いまま）</strong>、保存安い/取り出し料金あり。最低30日。" },
      { k: "S3 One Zone-IA", v: "<strong>1つのAZのみ</strong>に保存＝さらに安いが<strong>AZ障害でデータ喪失</strong>。消えても再作成できるデータ向け。" },
      { k: "標準-IA と One Zone-IA の違い", v: "<strong>標準-IA=複数AZ（安全）／One Zone-IA=1 AZのみ（安いが消失リスク）</strong>。最頻出の区別。" },
      { k: "S3 Glacier 各種", v: "長期保管で最安。取り出し速度で <strong>Instant Retrieval / Flexible Retrieval / Deep Archive(最安・十数時間)</strong>。" },
      { k: "Intelligent-Tiering", v: "アクセス状況に応じAWSが<strong>自動で最適クラスへ移動</strong>。頻度が読めない時に。取り出し料金なし。" },
      { k: "ライフサイクルポリシー", v: "『90日後にGlacierへ』など保存クラスの自動移動ルール。" },
    ],
    flashcards: [
      { q: "大量のファイルや画像・バックアップを安価に保存するAWSのストレージは？", a: "Amazon S3（オブジェクトストレージ）。容量実質無制限で非常に高い耐久性。" },
      { q: "S3・EBS・EFSの違いは？", a: "S3は大量のファイル置き場（オブジェクト）、EBSはEC2に接続するディスク（ブロック・1台に接続）、EFSは複数EC2で共有するファイル置き場。" },
      { q: "めったにアクセスしない長期保管データを最も安く保存するS3のクラスは？", a: "S3 Glacier（アーカイブ用・取り出しに時間がかかるが最安）。" },
      { q: "アクセス頻度が読めないデータを、自動で最適なコストのクラスに置きたい。使うS3クラスは？", a: "S3 Intelligent-Tiering。" },
      { q: "Windowsのファイルサーバー（SMB・Active Directory連携）をマネージドでクラウド提供するサービスは？", a: "Amazon FSx for Windows File Server。EFSはLinux（NFS）向けなので用途が異なる。" },
      { q: "HPCや機械学習など高速な計算処理向けで、S3と連携する超高速な並列ファイルシステムは？", a: "Amazon FSx for Lustre。" },
    ],
    quiz: [
      {
        q: "地理的に遠く離れた拠点から大きなファイルをAmazon S3へアップロードする際の転送速度を改善したい。適した機能はどれか。",
        choices: ["S3 バージョニング", "S3 Transfer Acceleration", "S3 ライフサイクルルール", "S3 クロスリージョンレプリケーション"],
        answer: 1,
        explain: "遠距離からのS3アップロードを<strong>エッジ経由で高速化</strong>するのは<strong>S3 Transfer Acceleration</strong>。他は保護・コスト最適化の機能。",
      },
      {
        q: "回線が細く、数十テラバイト規模の大容量データをネットワーク経由で移行するのが現実的でない。物理デバイスにデータを入れて搬送しAWSへ移行したい。適したサービスはどれか。",
        choices: ["AWS DataSync", "S3 Transfer Acceleration", "AWS Snowball Edge", "AWS Direct Connect"],
        answer: 2,
        explain: "大容量データを<strong>物理デバイスで搬送してオフライン移行</strong>するのは<strong>AWS Snowball Edge</strong>。DataSync等は回線を使う転送。",
      },

      {
        q: "写真や動画、ログファイルなど大量のデータを、容量無制限で安価かつ高い耐久性で保存できるAWSのストレージサービスはどれか。",
        choices: ["Amazon EBS", "Amazon S3", "Amazon EFS", "AWS Storage Gateway"],
        answer: 1,
        explain: "大量のファイルを安価・高耐久で保存するオブジェクトストレージは<strong>Amazon S3</strong>。",
      },
      {
        q: "複数のEC2インスタンスから同時にマウントして、同じファイルを共有したい。最も適したストレージはどれか。",
        choices: ["Amazon EBS", "Amazon EFS", "Amazon S3 Glacier", "インスタンスストア"],
        answer: 1,
        explain: "複数EC2で同時共有できるファイルストレージは<strong>Amazon EFS</strong>。EBSは基本1台に接続。",
      },
      {
        q: "数年に一度しかアクセスしないバックアップデータを、最も低コストで長期保管したい。適したS3のストレージクラスはどれか。",
        choices: ["S3 標準", "S3 Glacier", "S3 標準-IA", "S3 Intelligent-Tiering"],
        answer: 1,
        explain: "長期アーカイブ用で最安なのは<strong>S3 Glacier</strong>（取り出しに時間はかかる）。",
      },
      {
        q: "オンプレミスの Windows ファイルサーバー（SMB プロトコル、Active Directory でアクセス権を管理）を、マネージドサービスとして AWS へ移行したい。最も適したサービスはどれか。",
        choices: ["Amazon EFS", "Amazon S3", "Amazon EBS", "Amazon FSx for Windows File Server"],
        answer: 3,
        explain: "Windows ネイティブ（SMB・Active Directory 統合）の共有ファイルをマネージドで提供するのは <strong>Amazon FSx for Windows File Server</strong>。EFS は Linux（NFS）向けで Windows の共有要件には合わない。",
      },
      {
        q: "機械学習の学習処理や HPC（高性能計算）で、Amazon S3 上にある大量のデータを超高速に読み書きして処理したい。適したファイルシステムはどれか。",
        choices: ["Amazon FSx for Lustre", "Amazon EFS", "Amazon S3 Glacier", "Amazon EBS"],
        answer: 0,
        explain: "HPC・機械学習・大規模分析向けの<strong>超高速な並列ファイルシステム</strong>で、S3 と連携できるのは <strong>Amazon FSx for Lustre</strong>。EFS は汎用の共有、Glacier は長期保管用。",
      },
      {
        q: "EBS・RDS・DynamoDB・EFS など複数のサービスのバックアップについて、取得スケジュールと保持期間をポリシーで定めて一元的に管理・自動化したい。適したサービスはどれか。",
        choices: ["Amazon S3 Glacier", "AWS Storage Gateway", "AWS Backup", "S3 バージョニング"],
        answer: 2,
        explain: "複数サービスの<strong>バックアップを1か所でまとめて管理・自動化</strong>するのが <strong>AWS Backup</strong>。Glacier は長期保管用のストレージクラス、Storage Gateway はオンプレとのハイブリッド接続で目的が異なる。",
      },
      {
        q: "別の場所にも複製が存在し、万一失われても再作成できるサムネイル画像を、できるだけ低コストで S3 に保存したい。最も適したストレージクラスはどれか。",
        choices: ["S3 標準", "S3 標準-IA", "S3 One Zone-IA", "S3 Glacier Deep Archive"],
        answer: 2,
        explain: "<strong>データを1つのAZにしか置かない</strong>ぶん安いのが <strong>S3 One Zone-IA</strong>。AZ障害で失われるため<strong>“消えても再作成できるデータ”</strong>に向く。標準-IAは複数AZで安全だがその分割高、Deep Archiveは取り出しに十数時間かかり用途が違う。",
      },
      {
        q: "アクセス頻度は低いものの、いざ必要になったら即座に取り出したい重要なバックアップデータを、複数のアベイラビリティーゾーンで保護しつつ保存料を抑えたい。適したクラスはどれか。",
        choices: ["S3 One Zone-IA", "S3 標準-IA", "S3 Glacier Flexible Retrieval", "S3 標準"],
        answer: 1,
        explain: "<strong>複数AZに複製され可用性は高いまま、保存料が安い</strong>のが <strong>S3 標準-IA</strong>（取り出しに料金）。One Zone-IA は1 AZのみで重要データには不向き、Glacier は取り出しに時間がかかる。",
      },
      {
        q: "オブジェクトへのアクセス頻度が予測できず、手間をかけずに自動でコスト最適なクラスへ移動させたい。適した S3 のストレージクラスはどれか。",
        choices: ["S3 Intelligent-Tiering", "S3 標準", "S3 Glacier Deep Archive", "S3 One Zone-IA"],
        answer: 0,
        explain: "アクセス状況を監視して<strong>自動で最適なクラスへ移動</strong>するのが <strong>S3 Intelligent-Tiering</strong>。頻度が読めない・管理の手間を避けたい場合の定番。",
      },
    ],
  }
);
