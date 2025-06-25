import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { createGoogleSearchAI, searchGoogle, GoogleSearchParams } from "./tools/google-search.js";

// Environment variable validation is now handled in createGoogleSearchAI

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

const googleSearchAI = createGoogleSearchAI();

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "google_search",
        description: "Performs a web search using Google Search (via the Gemini API) and returns the results. This tool is useful for finding information on the internet based on a query.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The search query to find information on the web.",
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

    const result = await searchGoogle(googleSearchAI, searchParams);

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