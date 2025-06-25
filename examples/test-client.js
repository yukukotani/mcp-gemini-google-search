#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY environment variable is required");
    process.exit(1);
  }

  const serverPath = new URL("../dist/index.js", import.meta.url).pathname;
  
  const transport = new StdioClientTransport({
    command: "node",
    args: [serverPath],
  });

  const client = new Client({
    name: "test-client",
    version: "1.0.0",
  }, {
    capabilities: {}
  });

  await client.connect(transport);
  
  console.log("Connected to MCP server");

  const tools = await client.listTools();
  console.log("Available tools:", tools.tools);

  console.log("\nTesting Google Search...");
  const result = await client.callTool("google_search", {
    query: "TypeScript 5.0 new features"
  });

  console.log("\nSearch Results:");
  console.log(result.content);

  await client.close();
}

main().catch(console.error);