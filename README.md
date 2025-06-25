# MCP Gemini Google Search

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that provides Google Search functionality using Gemini's built-in Grounding with Google Search feature.

This project is inspired by the GoogleSearch tool from [gemini-cli](https://github.com/google-gemini/gemini-cli/blob/9897a2b80a6f371363faf1345f406ea581b841db/docs/tools/web-search.md).

## Features

- Uses Gemini's built-in Grounding with Google Search feature
- Provides real-time web search results with source citations
- Compliant with MCP standard protocol
- Written in TypeScript
- Supports stdio transport
- Supports both Google AI Studio and Vertex AI

## Requirements

- Node.js 18 or later
- Google AI Studio API key ([Get one here](https://aistudio.google.com/)) or Google Cloud Project with Vertex AI enabled

## Installation

```bash
npm install -g mcp-gemini-google-search
```

## Usage

### Environment Variables

```bash
# For Google AI Studio (default)
export GEMINI_API_KEY="your-api-key-here"
export GEMINI_MODEL="gemini-2.5-flash"  # Optional (default: gemini-2.5-flash)

# For Vertex AI
export GEMINI_PROVIDER="vertex"
export VERTEX_PROJECT_ID="your-gcp-project-id"
export VERTEX_LOCATION="us-central1"  # Optional (default: us-central1)
export GEMINI_MODEL="gemini-2.5-flash"  # Optional (default: gemini-2.5-flash)
```

### Claude Code Configuration

Add the following to your Claude Code settings:

#### For Google AI Studio
```json
{
  "mcpServers": {
    "gemini-google-search": {
      "command": "npx",
      "args": ["mcp-gemini-google-search"],
      "env": {
        "GEMINI_API_KEY": "your-api-key-here",
        "GEMINI_MODEL": "gemini-2.5-flash"
      }
    }
  }
}
```

#### For Vertex AI
```json
{
  "mcpServers": {
    "gemini-google-search": {
      "command": "npx",
      "args": ["mcp-gemini-google-search"],
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

### Available Tools

#### google_search

Search Google for information.

**Parameters:**
- `query` (string, required): Search query

**Example:**
```
Search for the latest TypeScript features
```

## Development

To contribute to this project:

```bash
# Clone the repository
git clone https://github.com/yukukotani/mcp-gemini-google-search.git
cd mcp-gemini-google-search

# Install dependencies
npm install

# Development mode (watch for file changes)
npm run dev

# Build
npm run build

# Run locally
npm run start

# Debug with MCP Inspector
npm run inspect
```

### Debugging with MCP Inspector

Running `npm run inspect` will open the MCP Inspector in your browser. This allows you to:

- View available tools
- Execute tools and see responses
- Debug in real-time

## License

MIT