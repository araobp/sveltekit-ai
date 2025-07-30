import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

await client.connect(transport);

// List prompts
const prompts = await client.listPrompts();
console.log(prompts);

// Get a prompt
const prompt = await client.getPrompt({
  name: "hello-world",
  arguments: {
    name: "araobp"
  }
});
console.log(prompt);

// List resources
const resources = await client.listResources();
console.log(resources);

// Read a static resource
const staticResource = await client.readResource({
  uri: "config://app"
});
console.log(staticResource);

// List dynamic resource templates
const resourceTemplates = await client.listResourceTemplates();
console.log(resourceTemplates);

// Read a dynamic resource
const resource = await client.readResource({
  uri: "greeting://araobp"
});
console.log(resource);

// List tools
const tools = await client.listTools();
console.log(tools);

// Call a tool
const result = await client.callTool({
  name: "add",
  arguments: {
    a: 3, b: 5
  }
});
console.log(result);
