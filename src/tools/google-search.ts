import { GoogleGenAI } from "@google/genai";

export interface GoogleSearchParams {
  query: string;
}

export interface GoogleSearchResult {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export function createGoogleSearchAI(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({ apiKey });
}

export async function searchGoogle(ai: GoogleGenAI, params: GoogleSearchParams): Promise<GoogleSearchResult> {
  try {
    if (!params.query || params.query.trim() === '') {
      throw new Error("Search query cannot be empty");
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [
        {
          role: "user",
          parts: [{ text: params.query }]
        }
      ],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    if (!result.text) {
      throw new Error("No response from Gemini model");
    }

    // Extract grounding metadata for sources if available
    let responseText = result.text;
    const groundingMetadata = (result as any).groundingMetadata;
    
    if (groundingMetadata?.groundingChunks) {
      const sources = groundingMetadata.groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any, index: number) => `[${index + 1}] ${chunk.web.title}: ${chunk.web.uri}`)
        .join('\n');
      
      if (sources) {
        responseText += '\n\nSources:\n' + sources;
      }
    }

    return {
      content: [{
        type: "text",
        text: responseText
      }]
    };
  } catch (error) {
    throw new Error(`Google search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}