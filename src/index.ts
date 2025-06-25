import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { GoogleSearchTool, GoogleSearchParams } from "./tools/google-search.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is required");
  process.exit(1);
}

const server = new Server(
  {
    name: "mcp-gemini-google-search",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const googleSearchTool = new GoogleSearchTool(GEMINI_API_KEY);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "google_search",
        description: "Search Google to get up-to-date information from the web using Gemini's built-in Google Search capability",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The search query to look up on Google",
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "google_search") {
    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${request.params.name}`
    );
  }

  if (!request.params.arguments) {
    throw new McpError(ErrorCode.InvalidParams, "Missing arguments");
  }

  const args = request.params.arguments as Record<string, unknown>;

  if (typeof args.query !== "string") {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Invalid arguments: query must be a string"
    );
  }

  try {
    const searchParams: GoogleSearchParams = {
      query: args.query,
    };

    const result = await googleSearchTool.search(searchParams);

    return {
      content: result.content,
    };
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Search failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Gemini Google Search server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});