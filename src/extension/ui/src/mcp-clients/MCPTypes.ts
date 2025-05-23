import { DOCKER_MCP_COMMAND } from "../Constants";
import { v1 } from "@docker/extension-api-client-types";
export type MCPClient = {
    name: string;
    url: string;
    readConfig: (client: v1.DockerDesktopClient) => Promise<{ content: string | null | undefined, path: string }>; // Reads the config content from the MCP client
    connect: (client: v1.DockerDesktopClient) => Promise<void>; // Connects catalog to the MCP client
    disconnect: (client: v1.DockerDesktopClient) => Promise<void>; // Disconnects catalog from the MCP client
    validateConfig: (content: string) => boolean; // Parses the config content and returns true if it is valid and connected
    expectedConfigPath?: { [key in 'win32' | 'darwin' | 'linux']: string }; // Path to the config file, if applicable
    manualConfigSteps: string[];
}

export const SAMPLE_MCP_CONFIG = {
    mcpServers: {
        MCP_DOCKER: {
            "command": DOCKER_MCP_COMMAND.split(' ')[0],
            "args": DOCKER_MCP_COMMAND.split(' ').slice(1),
        }
    }
}
