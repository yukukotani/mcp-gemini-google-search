import { GoogleGenAI, FunctionDeclaration, Type, Chat } from "@google/genai";

export interface GoogleSearchParams {
  query: string;
}

export interface GoogleSearchResult {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export function createGoogleSearchModel(apiKey: string): Chat {
  const ai = new GoogleGenAI({ apiKey });
  
  const googleSearchTool: FunctionDeclaration = {
    name: "googleSearch",
    parameters: {
      type: Type.OBJECT,
      description: "Search Google to get up-to-date information from the web",
      properties: {
        query: {
          type: Type.STRING,
          description: "Search query"
        }
      },
      required: ["query"]
    }
  };

  return ai.chat({
    model: "gemini-2.0-flash-exp",
    tools: [googleSearchTool]
  });
}

export async function searchGoogle(chat: Chat, params: GoogleSearchParams): Promise<GoogleSearchResult> {
  try {
    const prompt = `Search for: ${params.query}. Provide comprehensive information from web search results.`;
    
    const result = await chat.sendMessage(prompt);
    
    if (!result.response) {
      throw new Error("No response from Gemini model");
    }

    const text = result.response.text();
    
    return {
      content: [{
        type: "text",
        text: text || "No results found"
      }]
    };
  } catch (error) {
    throw new Error(`Google search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}