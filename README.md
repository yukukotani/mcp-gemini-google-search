# MCP Gemini Google Search

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) サーバーで、Gemini の組み込み Google Search 機能を使用して Google 検索を実行します。

## 特徴

- Gemini 2.0 Flash の組み込み Google Search ツールを使用
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
pnpm install

# ビルド
pnpm run build
```

## 使用方法

### 環境変数の設定

```bash
export GEMINI_API_KEY="your-api-key-here"
```

### Claude Desktop での設定

`~/Library/Application Support/Claude/claude_desktop_config.json` に以下を追加：

```json
{
  "mcpServers": {
    "gemini-google-search": {
      "command": "node",
      "args": ["/path/to/mcp-gemini-google-search/dist/index.js"],
      "env": {
        "GEMINI_API_KEY": "your-api-key-here"
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
pnpm run dev

# ビルド
pnpm run build

# 実行
pnpm run start

# MCPインスペクターでデバッグ
pnpm run inspect
```

### MCPインスペクターでのデバッグ

`pnpm run inspect` を実行すると、ブラウザで MCP インスペクターが開きます。これにより：

- 利用可能なツールの確認
- ツールの実行とレスポンスの確認
- リアルタイムでのデバッグ

が可能になります。

## ライセンス

MIT