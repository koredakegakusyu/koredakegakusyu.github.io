/* =============================================================
   コレダケAWS CCP カリキュラム — 09 ストレージ
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-storage", domain: "技術とサービス", icon: "🗃️", title: "ストレージ（S3・EBS・EFS）",
    intro: "オブジェクトストレージS3、EC2のディスクEBS、共有ファイルEFS、そしてS3のストレージクラス。",
    understand: [
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
        h: "S3のストレージクラス——アクセス頻度でコストを下げる",
        body:
          "<p>S3は、<strong>データにどれくらいアクセスするか</strong>で保存クラスを選ぶと安くなります。よくアクセスするものは高く、めったに使わないものは安くなります。</p>" +
          "<ul>" +
          "<li><strong>S3 標準（Standard）</strong>：頻繁にアクセスするデータ。標準。</li>" +
          "<li><strong>S3 標準-IA / 1ゾーンIA</strong>：<strong>アクセス頻度が低い</strong>データ。保存は安いが取り出しに料金。</li>" +
          "<li><strong>S3 Glacier 各種</strong>：<strong>アーカイブ（長期保管）</strong>用で最安。取り出しに時間（数分〜数時間）がかかる。</li>" +
          "<li><strong>S3 Intelligent-Tiering</strong>：<strong>アクセス状況を見てAWSが自動で最適なクラスに移動</strong>。迷ったらこれ。</li>" +
          "</ul>" +
          "<p>ルール（ライフサイクルポリシー）で『90日たったらGlacierへ移す』のような自動移動も設定できます。</p>",
      },
    ],
    memorize: [
      { k: "S3", v: "オブジェクトストレージ。大量のファイルを安価・高耐久(イレブンナイン)で保存。静的サイト公開も可。" },
      { k: "EBS", v: "EC2に接続して使うブロックストレージ（ディスク）。基本1台に接続。" },
      { k: "EFS", v: "複数のEC2から同時に共有できるファイルストレージ。" },
      { k: "S3標準-IA", v: "アクセス頻度が低いデータ向け。保存は安いが取り出しに料金。" },
      { k: "S3 Glacier", v: "アーカイブ（長期保管）用で最安。取り出しに時間がかかる。" },
      { k: "Intelligent-Tiering", v: "アクセス状況に応じAWSが自動で最適クラスへ移動。" },
      { k: "ライフサイクルポリシー", v: "『90日後にGlacierへ』など保存クラスの自動移動ルール。" },
    ],
    flashcards: [
      { q: "大量のファイルや画像・バックアップを安価に保存するAWSのストレージは？", a: "Amazon S3（オブジェクトストレージ）。容量実質無制限で非常に高い耐久性。" },
      { q: "S3・EBS・EFSの違いは？", a: "S3は大量のファイル置き場（オブジェクト）、EBSはEC2に接続するディスク（ブロック・1台に接続）、EFSは複数EC2で共有するファイル置き場。" },
      { q: "めったにアクセスしない長期保管データを最も安く保存するS3のクラスは？", a: "S3 Glacier（アーカイブ用・取り出しに時間がかかるが最安）。" },
      { q: "アクセス頻度が読めないデータを、自動で最適なコストのクラスに置きたい。使うS3クラスは？", a: "S3 Intelligent-Tiering。" },
    ],
    quiz: [
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
    ],
  }
);
