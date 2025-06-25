import { GoogleGenerativeAI, FunctionDeclarationsTool, SchemaType } from "@google/generative-ai";

export interface GoogleSearchParams {
  query: string;
}

export interface GoogleSearchResult {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export class GoogleSearchTool {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    const googleSearchTool: FunctionDeclarationsTool = {
      functionDeclarations: [{
        name: "googleSearch",
        description: "Search Google to get up-to-date information from the web",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            query: {
              type: SchemaType.STRING,
              description: "Search query"
            }
          },
          required: ["query"]
        }
      }]
    };

    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      tools: [googleSearchTool]
    });
  }

  async search(params: GoogleSearchParams): Promise<GoogleSearchResult> {
    try {
      const prompt = `Search for: ${params.query}. Provide comprehensive information from web search results.`;
      
      const result = await this.model.generateContent(prompt);
      
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
}