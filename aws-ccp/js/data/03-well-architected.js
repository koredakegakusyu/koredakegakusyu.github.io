/* =============================================================
   コレダケAWS CCP カリキュラム — 03 Well-Architected と導入形態
   ============================================================= */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push(
  {
    id: "ccp-well-architected", domain: "クラウド概念", icon: "🏛️", title: "Well-Architected フレームワークと導入形態",
    intro: "良いクラウド設計の指針（6本柱）と、クラウドの導入形態（クラウド/ハイブリッド/オンプレ）。",
    understand: [
      {
        h: "Well-Architected フレームワーク——良い設計の6本柱",
        body:
          "<p>AWSが示す<strong>「良いクラウドの設計原則」</strong>をまとめたのが<strong>AWS Well-Architected フレームワーク</strong>です。次の<strong>6つの柱</strong>で構成されます（名前と一言をセットで覚えます）。</p>" +
          "<ul>" +
          "<li><strong>運用上の優秀性（Operational Excellence）</strong>：システムを<strong>動かし続ける“運用”そのものを良くしていく</strong>柱。手作業を自動化し、変更は小さく頻繁に行い、失敗から学んで手順を改善します。<br><strong>試験のキーワード：</strong>「<strong>運用の自動化</strong>」「継続的な改善」「小さな変更を頻繁に」→ 運用上の優秀性。</li>" +
          "<li><strong>セキュリティ（Security）</strong>：<strong>データとシステムを守る</strong>柱。誰が何にアクセスできるかを厳密に管理し（最小権限）、<strong>保管時・転送時の暗号化</strong>、操作の記録（追跡可能性）を徹底します。<br><strong>試験のキーワード：</strong>「<strong>暗号化</strong>」「最小権限」「アクセス管理」「追跡可能にする」→ セキュリティ。</li>" +
          "<li><strong>信頼性（Reliability）</strong>：<strong>障害が起きても止まらない・自動で回復する</strong>柱。複数AZへの分散、自動復旧、需要変化への対応（スケーリング）を設計します。<br><strong>試験のキーワード：</strong>「<strong>障害から自動的に復旧</strong>」「可用性を高める」「マルチAZで冗長化」→ 信頼性。</li>" +
          "<li><strong>パフォーマンス効率（Performance Efficiency）</strong>：<strong>必要な性能を、無駄なく効率的に出す</strong>柱。用途に合ったサービス・インスタンスタイプを選び、需要に応じて増減させます。<br><strong>試験のキーワード：</strong>「<strong>適切なリソースタイプを選ぶ</strong>」「需要に応じて性能を調整」→ パフォーマンス効率。</li>" +
          "<li><strong>コスト最適化（Cost Optimization）</strong>：<strong>払う必要のないお金を払わない</strong>柱。使っていないリソースを止め、過剰なスペックを見直し（適切なサイジング）、割引プランを活用します。<br><strong>試験のキーワード：</strong>「<strong>不要なコストを削減</strong>」「使った分だけ」「未使用リソースの停止」→ コスト最適化。</li>" +
          "<li><strong>持続可能性（Sustainability）</strong>：<strong>環境への負荷を減らす</strong>柱。必要最小限のリソースで動かし、エネルギー消費とその環境影響を小さくします。<br><strong>試験のキーワード：</strong>「<strong>環境への影響</strong>」「エネルギー消費の削減」「サステナビリティ」→ 持続可能性。</li>" +
          "</ul>" +
          "<p>自分の設計がこの6本柱に沿っているかを<strong>無料で診断できる</strong>のが <strong>AWS Well-Architected Tool</strong>です。<strong>取り違え注意</strong>：<strong>Well-Architected は「システムの設計」の指針</strong>、<strong>AWS CAF は「組織としてのクラウド導入」の指針</strong>で対象が違います。問題文が“設計・アーキテクチャ”なら Well-Architected、“組織・人材・ガバナンス”なら CAF です。</p>",
        diagram:
          '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" font-family="\'Noto Sans JP\',sans-serif">' +
          '<text x="290" y="22" fill="#23252b" font-size="14" font-weight="700" text-anchor="middle">Well-Architected フレームワークの6本柱</text>' +
          (function () {
            var items = [
              { t: "運用上の優秀性", c: "#dce8f3", st: "#4a7fa8" },
              { t: "セキュリティ", c: "#f7dfd6", st: "#c26b4a" },
              { t: "信頼性", c: "#dcecdd", st: "#5c9160" },
              { t: "パフォーマンス効率", c: "#f2e7cd", st: "#b28a2e" },
              { t: "コスト最適化", c: "#e7eddb", st: "#8ba25c" },
              { t: "持続可能性", c: "#dcecdd", st: "#5c9160" },
            ];
            var s = "", w = 172, h = 52, gap = 14, x0 = 26, y0 = 40;
            items.forEach(function (p, i) {
              var col = i % 3, row = Math.floor(i / 3);
              var x = x0 + col * (w + gap), y = y0 + row * (h + 18);
              s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" fill="' + p.c + '" stroke="' + p.st + '"/>';
              s += '<text x="' + (x + w / 2) + '" y="' + (y + 31) + '" fill="#23252b" font-size="12.5" font-weight="700" text-anchor="middle">' + p.t + "</text>";
            });
            return s;
          })() +
          "</svg>",
        cap: "運用・セキュリティ・信頼性・パフォーマンス効率・コスト最適化・持続可能性の6本柱。",
      },
      {
        h: "クラウドの導入形態——クラウド／ハイブリッド／オンプレ",
        body:
          "<p>システムをどこで動かすかで3つに分かれます。</p>" +
          "<ul>" +
          "<li><strong>クラウド（オールイン）</strong>：すべてをAWS上で動かす。新規サービスに向く。</li>" +
          "<li><strong>ハイブリッド</strong>：<strong>オンプレミスとクラウドを併用</strong>してつなぐ。既存の社内システムを残しつつ一部をクラウド化する、移行の途中段階などに多い。</li>" +
          "<li><strong>オンプレミス</strong>：すべて自社設備で動かす（プライベートクラウドを含む）。厳しい規制やレイテンシ要件があるとき。</li>" +
          "</ul>" +
          "<p>クラウドの<strong>提供形態</strong>として、<strong>IaaS</strong>（サーバー等の基盤を借りる：EC2）、<strong>PaaS</strong>（アプリの実行環境を借りる：Elastic Beanstalk）、<strong>SaaS</strong>（完成したソフトを使う：メールサービス等）の区別も問われます。上に行くほど自分で管理する範囲が減ります。</p>",
      },
    ],
    memorize: [
      { k: "Well-Architected 6本柱", v: "運用上の優秀性・セキュリティ・信頼性・パフォーマンス効率・コスト最適化・持続可能性。" },
      { k: "Well-Architected Tool", v: "自分の設計を6本柱の観点で無料点検できるツール。" },
      { k: "ハイブリッドクラウド", v: "オンプレミスとクラウドを接続して併用する形態。移行途中や規制対応に多い。" },
      { k: "IaaS / PaaS / SaaS", v: "基盤を借りる(EC2)／実行環境を借りる(Beanstalk)／完成ソフトを使う。上ほど管理範囲が減る。" },
      { k: "クラウド導入戦略の例", v: "リフト＆シフト（そのまま移行）など。まず移すか、作り替えるかで戦略が変わる。" },
    ],
    flashcards: [
      { q: "Well-Architectedフレームワークの6本柱を挙げると？", a: "運用上の優秀性・セキュリティ・信頼性・パフォーマンス効率・コスト最適化・持続可能性。" },
      { q: "ハイブリッドクラウドとは？", a: "オンプレミス環境とクラウドを接続して併用する形態。既存システムを残しつつ一部をクラウド化する場合などに使う。" },
      { q: "IaaS・PaaS・SaaSの違いは？", a: "IaaSは基盤（サーバー等）を借りる、PaaSはアプリ実行環境を借りる、SaaSは完成したソフトを利用する。上位ほど自分の管理範囲が減る。" },
      { q: "自分のクラウド設計を6本柱で点検できる無料ツールは？", a: "AWS Well-Architected Tool。" },
    ],
    quiz: [
      {
        q: "AWS Well-Architectedフレームワークの柱として、適切でないものはどれか。",
        choices: ["セキュリティ", "信頼性", "コスト最適化", "マーケティング効果"],
        answer: 3,
        explain: "6本柱は運用上の優秀性・セキュリティ・信頼性・パフォーマンス効率・コスト最適化・持続可能性。<strong>マーケティング効果</strong>は含まれない。",
      },
      {
        q: "既存のオンプレミスのシステムを残しながら、その一部をAWSクラウドと接続して併用する構成を何と呼ぶか。",
        choices: ["オールインクラウド", "ハイブリッドクラウド", "マルチAZ", "エッジコンピューティング"],
        answer: 1,
        explain: "オンプレとクラウドを併用・接続するのが<strong>ハイブリッドクラウド</strong>。",
      },
      {
        q: "利用者がOSやミドルウェアを意識せずに、アプリケーションの実行環境だけを利用できるクラウドの提供形態はどれか。",
        choices: ["IaaS", "PaaS", "SaaS", "オンプレミス"],
        answer: 1,
        explain: "アプリの実行環境を借りるのは<strong>PaaS</strong>（例：Elastic Beanstalk）。基盤を借りるのがIaaS、完成ソフトを使うのがSaaS。",
      },
    ],
  }
);
