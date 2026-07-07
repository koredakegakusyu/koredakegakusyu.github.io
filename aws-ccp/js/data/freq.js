/* =============================================================
   コレダケAWS CCP — 科目の頻出度（CLF-C02の出題傾向をもとに）
   3 = 頻出（必ず得点したい） / 2 = 標準 / 1 = 出題は少なめ
   ============================================================= */
window.FREQ = {
  // クラウド概念
  "ccp-cloud-value": 3,
  "ccp-global-infra": 3,
  "ccp-well-architected": 2,
  // セキュリティ（出題比率が最も高い分野）
  "ccp-shared-responsibility": 3,
  "ccp-iam": 3,
  "ccp-security-services": 3,
  "ccp-compliance": 2,
  // 技術とサービス
  "ccp-compute": 3,
  "ccp-storage": 3,
  "ccp-database": 2,
  "ccp-network": 3,
  "ccp-management": 3,
  "ccp-integration": 2,
  "ccp-migration": 2,
  "ccp-ai-ml": 2,
  "ccp-devtools": 1,
  // 請求とサポート
  "ccp-billing": 3,
  "ccp-support": 2,
};
