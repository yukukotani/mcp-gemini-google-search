# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run build` - Build TypeScript (generates both ESM and CJS)
- `npm run dev` - Watch for file changes and rebuild
- `npm run start` - Run the built server
- `npm run inspect` - Debug with MCP Inspector
- `npm run prepublishOnly` - Automatic build before release

## Architecture

This project is a Model Context Protocol (MCP) server that provides Google Search functionality using Gemini 2.0 Flash's built-in Google Search feature.

### Key Components

- **src/index.ts**: Main entry point for the MCP server
  - Uses stdio transport
  - Registers and handles the `google_search` tool
  - Environment variable validation is handled in createGoogleSearchAI

- **src/tools/google-search.ts**: Google Search implementation
  - Uses `@google/genai` SDK to access Gemini 2.0 Flash
  - Enables the `googleSearch` tool via `ai.models.generateContent`
  - Extracts grounding metadata from responses to add citation information
  - Reference implementation: https://github.com/google-gemini/gemini-cli/blob/main/packages/core/src/tools/web-search.ts

### Tech Stack

- TypeScript + Node.js 18+
- @google/genai (Google's unified GenAI SDK)
- @modelcontextprotocol/sdk
- tsup for dual ESM/CJS build

### Type Error Resolution Notes

- The `@google/genai` API uses `ai.models.generateContent`
- Tools parameter format: `config: { tools: [{ googleSearch: {} }] }`
- Response access structure: `response.candidates[0].content.parts`
- Grounding metadata is located at `response.candidates[0].groundingMetadata`

### Environment Variables

**For Google AI Studio (default):**
- `GEMINI_API_KEY`: Google AI Studio API key (required)
- `GEMINI_MODEL`: Model to use (optional, default: gemini-2.5-flash)

**For Vertex AI:**
- `GEMINI_PROVIDER`: Set to "vertex"
- `VERTEX_PROJECT_ID`: GCP project ID (required)
- `VERTEX_LOCATION`: Region (optional, default: us-central1)
- `GEMINI_MODEL`: Model to use (optional, default: gemini-2.5-flash)