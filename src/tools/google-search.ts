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

export function createGoogleSearchAI(): GoogleGenAI {
  const provider = process.env.GEMINI_PROVIDER;
  
  if (provider === 'vertex') {
    const projectId = process.env.VERTEX_PROJECT_ID;
    const location = process.env.VERTEX_LOCATION || 'us-central1';
    
    if (!projectId) {
      throw new Error('VERTEX_PROJECT_ID environment variable is required when using Vertex AI');
    }
    
    return new GoogleGenAI({ 
      vertexai: true,
      project: projectId,
      location
    });
  }
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required when using Google AI Studio');
  }
  
  return new GoogleGenAI({ apiKey });
}

function getResponseText(response: any): string | undefined {
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) {
    return undefined;
  }
  const textSegments = parts
    .map((part: any) => part.text)
    .filter((text: string): text is string => typeof text === 'string');

  if (textSegments.length === 0) {
    return undefined;
  }
  return textSegments.join('');
}

export async function searchGoogle(ai: GoogleGenAI, params: GoogleSearchParams): Promise<GoogleSearchResult> {
  try {
    if (!params.query || params.query.trim() === '') {
      throw new Error("Search query cannot be empty");
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model,
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
    
    // Extract response text using the same method as web-search.ts
    const responseText = getResponseText(response);
    
    if (!responseText || responseText.trim() === '') {
      throw new Error("No response from Gemini model");
    }

    // Extract grounding metadata from the first candidate
    const groundingMetadata = response?.candidates?.[0]?.groundingMetadata;
    
    let finalText = responseText;
    
    if (groundingMetadata) {
      const sources = groundingMetadata.groundingChunks || [];
      const supports = groundingMetadata.groundingSupports || [];
      
      // Create source list
      const sourceList: string[] = [];
      sources.forEach((source: any, index: number) => {
        if (source.web) {
          sourceList.push(`[${index + 1}] ${source.web.title} (${source.web.uri})`);
        }
      });
      
      // Insert citation markers based on grounding supports
      if (supports.length > 0 && sources.length > 0) {
        const insertions: Array<{ index: number; text: string }> = [];
        
        supports.forEach((support: any) => {
          if (support.segment && support.groundingChunkIndices) {
            const endIndex = support.segment.endIndex || 0;
            const sourceNumbers = support.groundingChunkIndices
              .map((idx: number) => idx + 1)
              .sort((a: number, b: number) => a - b);
            const citationText = `[${sourceNumbers.join(',')}]`;
            insertions.push({ index: endIndex, text: citationText });
          }
        });
        
        // Sort insertions by index in descending order to avoid index shifting
        insertions.sort((a, b) => b.index - a.index);
        
        // Apply insertions to the text
        let modifiedText = finalText;
        insertions.forEach(insertion => {
          modifiedText = modifiedText.slice(0, insertion.index) + 
                        insertion.text + 
                        modifiedText.slice(insertion.index);
        });
        finalText = modifiedText;
      }
      
      // Append source list if available
      if (sourceList.length > 0) {
        finalText += '\n\nSources:\n' + sourceList.join('\n');
      }
    }

    return {
      content: [{
        type: "text",
        text: finalText
      }]
    };
  } catch (error) {
    throw new Error(`Google search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}