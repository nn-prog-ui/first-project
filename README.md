# 市役所申請ガイド

## 📋 概要
個人・法人向けの申請・助成金手続きガイドWebアプリケーション

## 🚀 Render デプロイ用

### 技術スタック
- **Backend**: Node.js + Hono Framework
- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Deployment**: Render (自動デプロイ対応)

### 自動デプロイ設定
```bash
# Render設定
Build Command: (空欄)
Start Command: npm start
Node Version: 18+
```

### 機能
- ✅ 個人向け申請10件 + 法人向け助成金6件
- ✅ 検索・フィルタリング機能
- ✅ レスポンシブデザイン
- ✅ 法人向け詳細ストーリー表示

## 🌐 デプロイURL
デプロイ後、RenderからURLが自動発行されます

## 🔧 ローカル開発
```bash
npm install
npm start
# http://localhost:3000
```