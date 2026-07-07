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
          "<p>AWSのAI/MLサービスは、大きく2階層で考えます。</p>" +
          "<ul>" +
          "<li><strong>Amazon SageMaker</strong>：機械学習モデルを<strong>自分で構築・学習・デプロイ</strong>するための総合サービス。データ準備からモデル運用まで一通りできる（作り込みたい人向け）。</li>" +
          "<li><strong>用途特化のAIサービス</strong>：機械学習の知識がなくても、<strong>APIを呼ぶだけで完成したAI機能を使える</strong>。画像・音声・言語など目的別に用意されている。</li>" +
          "</ul>" +
          "<p>試験では<strong>『モデルを自作＝SageMaker』『すぐ使える機能＝用途特化AI』</strong>の区別と、各サービスの用途（入力→出力）が問われます。</p>",
      },
      {
        h: "用途特化AIサービス——入力と出力で覚える",
        body:
          "<p>『何を入れて何が出るか』で覚えると迷いません。</p>" +
          "<ul>" +
          "<li><strong>Rekognition</strong>：<strong>画像・動画</strong>を分析（顔認識・物体検出）。</li>" +
          "<li><strong>Polly</strong>：<strong>テキスト→音声</strong>（読み上げ）。</li>" +
          "<li><strong>Transcribe</strong>：<strong>音声→テキスト</strong>（文字起こし）。</li>" +
          "<li><strong>Translate</strong>：<strong>言語→別の言語</strong>（翻訳）。</li>" +
          "<li><strong>Comprehend</strong>：<strong>文章を解析</strong>（感情分析・キーワード抽出などの自然言語処理）。</li>" +
          "<li><strong>Lex</strong>：<strong>会話（チャットボット・音声ボット）</strong>を作る。</li>" +
          "<li><strong>Textract</strong>：<strong>書類・画像から文字やデータを抽出</strong>（OCR＋）。</li>" +
          "<li><strong>Amazon Q / Bedrock</strong>：<strong>生成AI</strong>（対話アシスタントや、基盤モデルでのアプリ構築）。</li>" +
          "</ul>",
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
