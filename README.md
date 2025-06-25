# MCP Gemini Google Search

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) サーバーで、Gemini の組み込み Google Search 機能を使用して Google 検索を実行します。

## 特徴

- Gemini 2.0 Flash の組み込み Google Search ツールを使用（@google/genai SDK）
- MCP 標準プロトコルに準拠
- TypeScript で実装
- stdio トランスポートをサポート

## 必要条件

- Node.js 18 以降
- Google AI Studio の API キー（[取得はこちら](https://aistudio.google.com/)）

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/yukukotani/mcp-gemini-google-search.git
cd mcp-gemini-google-search

# 依存関係のインストール
npm install

# ビルド
npm run build
```

## 使用方法

### 環境変数の設定

```bash
# Google AI Studio を使用する場合（デフォルト）
export GEMINI_API_KEY="your-api-key-here"
export GEMINI_MODEL="gemini-2.5-flash"  # オプション（デフォルト: gemini-2.5-flash）

# Vertex AI を使用する場合
export GEMINI_PROVIDER="vertex"
export VERTEX_PROJECT_ID="your-gcp-project-id"
export VERTEX_LOCATION="us-central1"  # オプション（デフォルト: us-central1）
export GEMINI_MODEL="gemini-2.5-flash"  # オプション（デフォルト: gemini-2.5-flash）
```

### Claude Desktop での設定

`~/Library/Application Support/Claude/claude_desktop_config.json` に以下を追加：

#### Google AI Studio を使用する場合
```json
{
  "mcpServers": {
    "gemini-google-search": {
      "command": "node",
      "args": ["/path/to/mcp-gemini-google-search/dist/index.js"],
      "env": {
        "GEMINI_API_KEY": "your-api-key-here",
        "GEMINI_MODEL": "gemini-2.5-flash"
      }
    }
  }
}
```

#### Vertex AI を使用する場合
```json
{
  "mcpServers": {
    "gemini-google-search": {
      "command": "node",
      "args": ["/path/to/mcp-gemini-google-search/dist/index.js"],
      "env": {
        "GEMINI_PROVIDER": "vertex",
        "VERTEX_PROJECT_ID": "your-gcp-project-id",
        "VERTEX_LOCATION": "us-central1",
        "GEMINI_MODEL": "gemini-2.5-flash"
      }
    }
  }
}
```

### 利用可能なツール

#### google_search

Google で情報を検索します。

**パラメータ:**
- `query` (string, 必須): 検索クエリ

**使用例:**
```
最新の TypeScript の機能について検索してください
```

## 開発

```bash
# 開発モード（ファイル変更を監視）
npm run dev

# ビルド
npm run build

# 実行
npm run start

# MCPインスペクターでデバッグ
npm run inspect
```

### MCPインスペクターでのデバッグ

`npm run inspect` を実行すると、ブラウザで MCP インスペクターが開きます。これにより：

- 利用可能なツールの確認
- ツールの実行とレスポンスの確認
- リアルタイムでのデバッグ

が可能になります。

## ライセンス

MIT