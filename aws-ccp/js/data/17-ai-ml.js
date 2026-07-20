/* =============================================================
   コレダケ学習AWS CCP カリキュラム — 17 AI・機械学習サービス
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-ai-ml", domain: "技術とサービス", icon: "🤖", title: "AI・機械学習サービス",
    intro: "自分でモデルを作るSageMakerと、すぐ使える用途特化AI（画像・音声・言語・生成AI）。名前と用途を対応づける。",
    understand: [
      {
        h: "自分で作るなら SageMaker、すぐ使うなら用途特化AI",
        body:
          "<p>AWS の AI/ML サービスは、大きく<strong>2 階層</strong>で考えると整理できます。</p>" +
          "<ul>" +
          "<li><strong>Amazon SageMaker</strong>：機械学習モデルを<strong>自分で構築・学習・デプロイ</strong>するための総合サービス。データ準備からモデルの学習・運用まで一通りできます。『オリジナルの予測モデルを作り込みたい人向け』の土台です。</li>" +
          "<li><strong>用途特化の AI サービス</strong>：機械学習の知識がなくても、<strong>API を呼ぶだけで“完成した AI 機能”をすぐ使える</strong>タイプ。目的別に用意されています——<strong>Rekognition</strong>（画像・動画の認識）、<strong>Transcribe</strong>（音声→文字起こし）、<strong>Polly</strong>（文字→音声読み上げ）、<strong>Translate</strong>（翻訳）、<strong>Comprehend</strong>（文章の感情・キーワード分析）、<strong>Textract</strong>（書類から文字抽出）、<strong>Lex</strong>（チャットボット）、<strong>Amazon Bedrock</strong>（生成 AI を API で利用）など。</li>" +
          "</ul>" +
          "<p>試験では<strong>『モデルを自作＝SageMaker』『すぐ使える完成機能＝用途特化 AI』</strong>の区別と、各サービスの用途（入力→出力：例『音声を文字に＝Transcribe』『画像から物体を検出＝Rekognition』）が問われます。</p>",
      },
      {
        h: "用途特化AIサービス——入力と出力で覚える",
        body:
          "<p>この分野は<strong>『何を入れたら、何が出てくるか』</strong>さえ押さえれば確実に得点できます。問題文には毎回ほぼ同じ言い回し（キーワード）が出るので、<strong>そのキーワードとサービス名を直結</strong>させて覚えましょう。各項目の最後に、実際に問われる言い方を挙げてあります。</p>" +
          "<ul>" +
          "<li><strong>Amazon Rekognition</strong>：<strong>画像や動画をAIが分析</strong>し、写っている<strong>物体・シーン・人物の顔・文字・不適切なコンテンツ</strong>を自動で検出します。SNS投稿画像の自動チェック、オフィスの入退室での顔認証、防犯カメラ映像から特定の人物を探す、といった使い方をします。<br><strong>試験のキーワード：</strong>「画像から物体を検出」「<strong>顔認識・顔の比較</strong>」「動画の分析」「不適切な画像を自動で検閲」→ Rekognition。</li>" +
          "<li><strong>Amazon Polly</strong>：<strong>文章（テキスト）を、人間のような自然な音声に変換して読み上げ</strong>ます。ニュース記事の音声版、eラーニング教材のナレーション自動生成、視覚に障がいのある方向けの読み上げ機能などに使います。<br><strong>試験のキーワード：</strong>「<strong>テキストを音声に</strong>」「読み上げる」「ナレーションを自動生成」→ Polly。※次の Transcribe と<strong>向きが逆</strong>なので必ずセットで覚えます。</li>" +
          "<li><strong>Amazon Transcribe</strong>：<strong>音声を文字に起こします（文字起こし）</strong>。コールセンターの通話内容の記録、会議の議事録作成、動画への字幕付けなどに使われます。<br><strong>試験のキーワード：</strong>「<strong>音声を文字に</strong>」「文字起こし」「通話内容を記録・分析したい」「動画に字幕」→ Transcribe。</li>" +
          "<li><strong>Amazon Translate</strong>：<strong>ある言語の文章を別の言語へ自動翻訳</strong>します。ECサイトの商品説明の多言語化や、問い合わせメールの翻訳などに使います。<br><strong>試験のキーワード：</strong>「多言語に対応させたい」「<strong>翻訳</strong>」「海外の利用者向けにコンテンツを変換」→ Translate。</li>" +
          "<li><strong>Amazon Comprehend</strong>：<strong>文章の“意味”をAIが解析</strong>する自然言語処理サービス。文章が<strong>肯定的か否定的か（感情分析）</strong>、重要な<strong>キーワードや人名・地名</strong>は何か、何語で書かれているかなどを判定します。商品レビューの評判分析や、問い合わせ内容の自動分類に使います。<br><strong>試験のキーワード：</strong>「<strong>感情分析</strong>」「口コミ・レビューの評判を分析」「文章からキーワードを抽出」→ Comprehend。</li>" +
          "<li><strong>Amazon Lex</strong>：<strong>会話するボット（チャットボット・音声ボット）を作る</strong>サービス。Alexa と同じ技術が使われています。よくある問い合わせにボットが自動応答する窓口を作れ、コールセンターの Amazon Connect と組み合わせることも多いです。<br><strong>試験のキーワード：</strong>「<strong>チャットボット</strong>」「会話型の自動応答」「問い合わせにボットで対応」→ Lex。</li>" +
          "<li><strong>Amazon Kendra</strong>：<strong>社内に散らばった大量の文書を、普段の言葉（自然言語）で検索できる</strong>AI検索サービス。「経費精算の締め日は？」のように<strong>質問文のまま聞ける</strong>のが特徴で、単語一致のキーワード検索より賢く探せます。<br><strong>試験のキーワード：</strong>「<strong>社内ドキュメントの検索</strong>」「自然な言葉で質問して答えを探す」→ Kendra。</li>" +
          "<li><strong>Amazon Textract</strong>：<strong>請求書・申込書・帳票などの書類画像から、文字だけでなく“表”や“入力欄”の項目まで構造を保ったまま抽出</strong>します。ただ文字を読むだけの OCR より一歩進んでおり、紙書類のデータ入力を自動化できます。<br><strong>試験のキーワード：</strong>「<strong>書類・帳票からデータを抽出</strong>」「スキャンした申込書の入力を自動化」「OCR」→ Textract。</li>" +
          "<li><strong>Amazon Bedrock / Amazon Q</strong>：<strong>生成AI</strong>のサービス。<strong>Bedrock</strong> は各社の<strong>基盤モデル（大規模言語モデル）をAPI経由で呼び出し、自社アプリに生成AIを組み込む</strong>ためのもの。<strong>Amazon Q</strong> は業務で使える<strong>対話型アシスタント</strong>です。<br><strong>試験のキーワード：</strong>「<strong>生成AI</strong>」「基盤モデルを使ってアプリを作る」→ Bedrock、「業務を手伝う対話アシスタント」→ Amazon Q。</li>" +
          "</ul>" +
          "<p><strong>取り違えやすい組み合わせ</strong>：<strong>Polly（テキスト→音声）とTranscribe（音声→テキスト）は向きが逆</strong>。<strong>Comprehend は“意味の解析”、Translate は“翻訳”、Textract は“書類からの抽出”</strong>で、どれも文章を扱うため混同しがちです。『入力は何か・出力は何か』で切り分けてください。</p>",
        diagram:
          '<svg viewBox="0 0 580 210" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="20" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">用途特化AIサービス（入力→出力で覚える）</text>' +
          (function () {
            var items = [
              { n: "Rekognition", d: "画像・動画を分析", c: "#dce8f3", st: "#4a7fa8" },
              { n: "Polly", d: "テキスト→音声", c: "#dce8f3", st: "#4a7fa8" },
              { n: "Transcribe", d: "音声→テキスト", c: "#f2e7cd", st: "#b28a2e" },
              { n: "Translate", d: "翻訳", c: "#f2e7cd", st: "#b28a2e" },
              { n: "Comprehend", d: "文章の解析(感情等)", c: "#dcecdd", st: "#5c9160" },
              { n: "Lex", d: "チャットボット", c: "#dcecdd", st: "#5c9160" },
              { n: "Textract", d: "書類から文字抽出", c: "#f3ddcd", st: "#c1855c" },
              { n: "Q / Bedrock", d: "生成AI", c: "#f3ddcd", st: "#c1855c" },
            ];
            var s = "", w = 130, h = 56, gapx = 8, gapy = 14, x0 = 22, y0 = 38;
            items.forEach(function (p, i) {
              var col = i % 4, row = Math.floor(i / 4);
              var x = x0 + col * (w + gapx), y = y0 + row * (h + gapy);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 23) + '" fill="#23252b" font-size="11.5" font-weight="800" text-anchor="middle">' + p.n + "</text>";
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 42) + '" fill="#5a5346" font-size="9" text-anchor="middle">' + p.d + "</text>";
            });
            s += '<text x="290" y="200" fill="#6b6e76" font-size="10.5" text-anchor="middle">モデルを自作したいなら Amazon SageMaker を使う。</text>';
            return s;
          })() +
          "</svg>",
        cap: "画像=Rekognition、読み上げ=Polly、文字起こし=Transcribe、翻訳=Translate、感情分析=Comprehend、会話=Lex、書類抽出=Textract、生成AI=Q/Bedrock。",
      },
    ],
    memorize: [
      { k: "SageMaker", v: "機械学習モデルを自分で構築・学習・デプロイする総合サービス。" },
      { k: "Rekognition", v: "画像・動画の分析（顔認識・物体検出）。" },
      { k: "Polly / Transcribe", v: "Polly=テキスト→音声（読み上げ）。Transcribe=音声→テキスト（文字起こし）。" },
      { k: "Translate", v: "言語間の翻訳。" },
      { k: "Comprehend", v: "自然言語処理。感情分析・キーワード抽出など文章の解析。" },
      { k: "Lex", v: "チャットボット・音声ボット（会話）を作る。Alexaと同じ技術。" },
      { k: "Textract", v: "書類・画像から文字やデータを抽出（OCR＋）。" },
      { k: "Amazon Q / Bedrock", v: "生成AI。Q=対話アシスタント、Bedrock=基盤モデルでアプリ構築。" },
    ],
    flashcards: [
      { q: "機械学習モデルを自分で構築・学習・デプロイしたい。使う総合サービスは？", a: "Amazon SageMaker。" },
      { q: "画像や動画から顔や物体を検出したい。使うサービスは？", a: "Amazon Rekognition。" },
      { q: "PollyとTranscribeの違いは？", a: "Pollyはテキストを音声に変換（読み上げ）、Transcribeは音声をテキストに変換（文字起こし）。逆の関係。" },
      { q: "文章の感情分析やキーワード抽出などの自然言語処理を行うサービスは？", a: "Amazon Comprehend。" },
      { q: "チャットボット（会話型の対話）を作るサービスは？", a: "Amazon Lex。" },
    ],
    quiz: [
      {
        q: "機械学習の専門知識を持つチームが、独自のモデルを一から構築・学習・デプロイできる、AWSの総合的な機械学習サービスはどれか。",
        choices: ["Amazon Rekognition", "Amazon SageMaker", "Amazon Comprehend", "Amazon Polly"],
        answer: 1,
        explain: "モデルを自分で構築・学習・デプロイする総合サービスは<strong>Amazon SageMaker</strong>。他は完成済みの用途特化AI。",
      },
      {
        q: "アップロードされた画像に写っている物体や人物の顔を自動的に検出・分析したい。適したAWSサービスはどれか。",
        choices: ["Amazon Polly", "Amazon Rekognition", "Amazon Translate", "Amazon Lex"],
        answer: 1,
        explain: "画像・動画の分析（顔認識・物体検出）は<strong>Amazon Rekognition</strong>。",
      },
      {
        q: "会議の録音音声を、自動的に文字起こし（テキスト化）したい。適したAWSサービスはどれか。",
        choices: ["Amazon Polly", "Amazon Transcribe", "Amazon Comprehend", "Amazon Textract"],
        answer: 1,
        explain: "音声→テキスト（文字起こし）は<strong>Amazon Transcribe</strong>。逆にテキスト→音声はPolly。",
      },
      {
        q: "問い合わせ対応のために、音声やテキストで会話できるチャットボットを構築したい。適したAWSサービスはどれか。",
        choices: ["Amazon Lex", "Amazon Kendra", "Amazon SageMaker", "Amazon Rekognition"],
        answer: 0,
        explain: "会話型のチャットボット・音声ボットを作るのは<strong>Amazon Lex</strong>。",
      },
      {
        q: "スキャンした請求書などの書類の画像から、文字やフォーム・表のデータを自動抽出したい。適したサービスはどれか。",
        choices: ["Amazon Textract", "Amazon Polly", "Amazon Translate", "Amazon Comprehend"],
        answer: 0,
        explain: "書類・画像から文字やデータを抽出（OCR＋）するのは<strong>Amazon Textract</strong>。",
      },
    ],
  }
);
