import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { GoogleGenAI, FunctionCallingConfigMode, mcpToTool } from '@google/genai';

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL = "gemini-2.5-flash";
const ai = new GoogleGenAI({});

var mcpClient;

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

  const client = await getMcpClient();
  const { prompt, b64Image } = await request.json();
  var contents;

  if (b64Image) {
    contents = [
      {
        inlineData: {
          mimeType: b64Image.mimeType,
          data: b64Image.data,
        },
      },
      { text: prompt },
    ];
  } else {
    contents = prompt;
  }

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: contents,
    config: {
      tools: [mcpToTool(client)],  // uses the session, will automatically call the tool
      // Uncomment if you **don't** want the sdk to automatically call the tool
      // automaticFunctionCalling: {
      //   disable: true,
      // },
    },
  });

  return new Response(response.text, {
    headers: {
      "Content-Type": "plain/text",
    },
  });
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
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("MCP Client error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
