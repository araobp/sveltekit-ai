import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mcpClient;

const getMcpClient = async () => {
  if (!mcpClient) {
    const serverPath = path.resolve(__dirname, "./mcpServer.js");

    const transport = new StdioClientTransport({
      command: "node",
      args: [serverPath]
    });

    mcpClient = new Client(
      {
        name: "example-client",
        version: "1.0.0"
      });

    await mcpClient.connect(transport);
  }
  return mcpClient;
}

export async function POST({ request }) {
  const { type, payload } = await request.json();
  const client = await getMcpClient();

  try {
    let response;
    if (type === "prompt") {
      response = await client.prompt(payload.name, payload.args);
    } else if (type === "tool") {
      response = await client.tool(payload.name, payload.args);
    } else {
      return new Response(JSON.stringify({ error: "Invalid request type" }), { status: 400 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("MCP Client error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET({ url }) {
  const client = await getMcpClient();
  const type = url.searchParams.get('type');

  try {
    let response;
    if (type === 'prompts') {
      response = await client.listPrompts();
    } else if (type === 'tools') {
      response = await client.listTools();
    } else if (type === 'resources') {
      response = await client.listResources();
    } else if (type === 'resourceTemplates') {
      response = await client.listResourceTemplates();
    } else if (type === 'readResource') {
      const uri = url.searchParams.get('uri');
      if (!uri) {
        return new Response(JSON.stringify({ error: "Missing 'uri' parameter for readResource" }), { status: 400 });
      }
      response = await client.readResource({ uri });
    } else {
      response = await client.getCapabilities();
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("MCP Client error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
