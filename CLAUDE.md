# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `npm run build` - TypeScript をビルド（ESM と CJS の両方を生成）
- `npm run dev` - ファイル変更を監視してビルド
- `npm run start` - ビルドされたサーバーを実行
- `npm run inspect` - MCP インスペクターでデバッグ
- `npm run prepublishOnly` - リリース前の自動ビルド

## アーキテクチャ

このプロジェクトは Model Context Protocol (MCP) サーバーで、Gemini 2.0 Flash の組み込み Google Search 機能を提供する。

### 主要コンポーネント

- **src/index.ts**: MCP サーバーのメインエントリポイント
  - stdio トランスポートを使用
  - `google_search` ツールを登録・処理
  - GEMINI_API_KEY 環境変数が必須

- **src/tools/google-search.ts**: Google Search 実装
  - `@google/genai` SDK を使用して Gemini 2.0 Flash にアクセス
  - `ai.models.generateContent` で `googleSearch` ツールを有効化
  - レスポンスから grounding metadata を抽出して引用情報を追加
  - 参考実装: https://github.com/google-gemini/gemini-cli/blob/main/packages/core/src/tools/web-search.ts

### 技術スタック

- TypeScript + Node.js 18+
- @google/genai (Google の統合 GenAI SDK)
- @modelcontextprotocol/sdk
- tsup でデュアル ESM/CJS ビルド

### 型エラー対応時の注意点

- `@google/genai` の API は `ai.models.generateContent` を使用
- tools パラメータは `config: { tools: [{ googleSearch: {} }] }` の形式
- レスポンスアクセスは `response.candidates[0].content.parts` 構造
- grounding metadata は `response.candidates[0].groundingMetadata` にある

### 環境変数

**Google AI Studio の場合（デフォルト）:**
- `GEMINI_API_KEY`: Google AI Studio の API キー（必須）
- `GEMINI_MODEL`: 使用するモデル（オプション、デフォルト: gemini-2.5-flash）

**Vertex AI の場合:**
- `GEMINI_PROVIDER`: "vertex" に設定
- `VERTEX_PROJECT_ID`: GCP プロジェクト ID（必須）
- `VERTEX_LOCATION`: リージョン（オプション、デフォルト: us-central1）
- `GEMINI_MODEL`: 使用するモデル（オプション、デフォルト: gemini-2.5-flash）