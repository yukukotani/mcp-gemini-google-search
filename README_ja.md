# MCP Gemini Google Search

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) サーバーで、Gemini の組み込み [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search) 機能を使用して Google 検索を実行します。

このプロジェクトは [gemini-cli](https://github.com/google-gemini/gemini-cli/blob/9897a2b80a6f371363faf1345f406ea581b841db/docs/tools/web-search.md) の GoogleSearch ツールにインスパイアされています。

## 特徴

- Gemini の組み込み [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search) 機能を使用
- ソース引用付きのリアルタイム Web 検索結果を提供
- MCP 標準プロトコルに準拠
- stdio トランスポートをサポート
- Google AI Studio と Vertex AI の両方をサポート

## 必要条件

- Node.js 18 以降
- Google AI Studio の API キー（[取得はこちら](https://aistudio.google.com/)）または Vertex AI が有効な Google Cloud プロジェクト

## インストール

```bash
npm install -g mcp-gemini-google-search
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

### Claude Code での設定

CLIを使用してMCPサーバーを設定できます：

#### Google AI Studio を使用する場合
```bash
# userスコープに追加（全プロジェクトで利用可能）
claude mcp add gemini-google-search \
  -s user \
  -e GEMINI_API_KEY="your-api-key-here" \
  -e GEMINI_MODEL="gemini-2.5-flash" \
  -- npx mcp-gemini-google-search

# またはプロジェクトスコープに追加（チームで共有）
claude mcp add gemini-google-search \
  -s project \
  -e GEMINI_API_KEY="your-api-key-here" \
  -e GEMINI_MODEL="gemini-2.5-flash" \
  -- npx mcp-gemini-google-search
```

#### Vertex AI を使用する場合
```bash
# userスコープに追加（全プロジェクトで利用可能）
claude mcp add gemini-google-search \
  -s user \
  -e GEMINI_PROVIDER="vertex" \
  -e VERTEX_PROJECT_ID="your-gcp-project-id" \
  -e VERTEX_LOCATION="us-central1" \
  -e GEMINI_MODEL="gemini-2.5-flash" \
  -- npx mcp-gemini-google-search

# またはプロジェクトスコープに追加（チームで共有）
claude mcp add gemini-google-search \
  -s project \
  -e GEMINI_PROVIDER="vertex" \
  -e VERTEX_PROJECT_ID="your-gcp-project-id" \
  -e VERTEX_LOCATION="us-central1" \
  -e GEMINI_MODEL="gemini-2.5-flash" \
  -- npx mcp-gemini-google-search
```

#### Windows ユーザー
Windowsでは、npxコマンドを`cmd /c`でラップしてください：

```bash
claude mcp add gemini-google-search \
  -e GEMINI_API_KEY="your-api-key-here" \
  -- cmd /c npx mcp-gemini-google-search
```

### 利用可能なツール

#### google_search

Google で情報を検索します。

**パラメータ:**
- `query` (string, 必須): 検索クエリ

**使用例:**
```
最新の TypeScript の機能
```

<details>
<summary>レスポンス例</summary>

```
It appears you're asking about the latest features in TypeScript. Here's a summary of recent updates and key features, based on the provided search results:

**Key Features in Recent TypeScript Updates:**

*   **Satisfies Operator:** This operator lets you specify that a value conforms to a specific type without fully enforcing it.[1,2]
*   **Const Type Parameters:** Using `const` with type parameters provides more precision with function generics, helping specify literal types and prevent unwanted transformations.[2] This ensures arrays are treated as immutable, maintaining their literal types.[2]
*   **Improved Enum Types:** Enums are more robust, especially `const enum`, which optimizes enums by inlining their values at compile time.[2] From version 5.0, all enums are treated as a type union, even with calculated values.[1]
*   **Template Literal Types:** Template literal types are more expressive, allowing you to create types that build on literals, similar to JavaScript template strings.[2]
*   **Unions and Intersections with Discriminated Unions:** TypeScript offers better handling for union and intersection types, which are frequently used to build flexible types.[2] Discriminated unions allow you to create complex structures with ease and clear type guards.[2]
*   **New ECMAScript Set Methods:** Support for new methods like `union`, `intersection`, and `difference` for more powerful set operations.[3]

**TypeScript 5.8 Highlights (March 2025):**

*   **Module Node18 Flag:** Provides a stable reference point for users fixed on Node.js 18, without incorporating certain behaviors of `--module nodenext`.[4]
*   **Optimizations:** Introduces optimizations that improve the time to build up a program and update it based on file changes, especially in `--watch` mode or editor scenarios.[4] This includes avoiding array allocations during path normalization.[4]
*   **Import Assertions:**  `--module nodenext` in TypeScript 5.8 will issue an error if it encounters an import assertion, as Node.js 22 no longer accepts them using the `assert` syntax, recommending `with` instead.[4]

**Other Notable Features & Improvements:**

*   **Inferred Type Predicates:** Improved type inference, especially with arrays and filtering.[3]
*   **Control Flow Narrowing for Constant Indexed Accesses:** Better type narrowing for accessing object properties.[3]
*   **Regular Expression Syntax Checking:** Basic syntax checks are performed on regular expressions, flagging errors like unclosed parentheses.[3]
*   **Array filter Fixes:** Properly filters the type of arrays when you use the filter function.
*   **Object Key Inference Fixes:** Improves type inference.

**Performance Enhancements:**

*   **Go Rewrite:**  A full rewrite of TypeScript in Go has been promised for version 7.0, which has demonstrated significant speed improvements (up to 10x-15x in some cases).[5] This will affect the compiler (`tsc`) and IDE performance (loading, hovers, errors, etc.).[5] The team chose Go for its structural similarity to the current JavaScript implementation.[5]
*   **TypeScript 5.0:** This update aimed to accelerate coding processes and simplify development by refining code, data structures, and streamlining import/export operations.[6]

In summary, TypeScript is continuously evolving with new features and improvements aimed at enhancing developer productivity, code quality, and performance.[6]


Sources:
[1] edicomgroup.com (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFILdgh_4-Yh0OuwzDOqwCfvLGHdhm_PGhdAIzMK_DFwW38X9qK8b3Tj_ws2VZ2VLxWW_NJtuzot8B_wYYH4rOHBY_1HYZ7PyCHOCR3GzQpwQUi71ufAf6izU13O3W6GzjQAQnVjnheeRLLLf4mD7uueIS-g0yeivFo2XWZKJF4wtRtDfdTYjtHvRYmB7rY6Q==)
[2] dev.to (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFMJOcmJDu8TUJsc6cKjVMDTR7ggjQMUc1aMAIVKRhbTq7Zjzh5f_h-UpZn6LE6xB-nTqUmQwHCiUmhvAZ_uYmzXIzNmJvtoDUjDcB9hJDw_aPPvJjd411APwVfiNvd3yhlrB7MFsnxH25-hxNetmoZJrriZ0mGm6ZaYbm0yMeiruDqC5mnqXJwuyGLMdrg-M3LpRAGrxVAT9b1veE)
[3] dev.to (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFfDcb-2QNwLZ0TpjSkNCWCvh-dvslYtllEMyyTXCSu-3jbOBD4vvq0j5Hqyuw8BcmEpKjBBeBZS83E-GCKax48hg5Oc1Fam6GQy296DxQkEQOfg7pvmnRhE3tdDbDCBqXKdYPonoR_AVLBAlGdKg==)
[4] microsoft.com (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWKA9uZsB7lcOGcnOLveyjImsqVwNItCj3n3QiCrCkyL6iY4rA16Wp37FecAoKgX58lcDcBOuXye97fgw5SAbLwDkl3M-vCUK0I0HxtCx8qMaBVM42sxyFEQjn1iz4Qgzud3P7pDlc4frHf6Wkgs8nNcoIlMriePVOb0l9vmY=)
[5] totaltypescript.com (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFysE6zFlg_XiXfGqAiDapTIj2bsVWlkuq3Trpfacjd1a7gMDrUh35MKW-No9qdSKti68W3M2b1j6VqlnZ7v_yBOjE8hK_3d57U7UePyjMOUDdbBBGRK8CZeUug3hBOFsZjbnQoDdoL446oZL1R38gJrc9JvGmlWQno)
[6] rabitsolutions.com (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEY1brKmgxI5YOA1HrB89SnHNPyhm3Dlz-zumJMoi-wBegLSOjto360JJrA29TwVB8A02qHWZBtwua0QHn8NxAjWUCCkLxD7lZa_xW4Mtp8diiAXl1ppIWEHq6T7B1Mm6_dMs3lWoOKOJSjCUrk6-P4ao40V-nYULfPtA==)
```

</details>

## 開発

このプロジェクトに貢献するには:

```bash
# リポジトリのクローン
git clone https://github.com/yukukotani/mcp-gemini-google-search.git
cd mcp-gemini-google-search

# 依存関係のインストール
npm install

# 開発モード（ファイル変更を監視）
npm run dev

# ビルド
npm run build

# ローカルで実行
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

Apache License 2.0