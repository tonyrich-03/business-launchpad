// src/services/aiService.ts
const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

export interface AIBrandingRequest {
  businessName: string;
  industry: string;
  targetAudience: string;
  brandValues: string[];
  preferences: string;
}

export interface AIBrandingResponse {
  brandName: string;
  tagline: string;
  colorPalette: string[];
  typography: string;
  brandVoice: string;
  logoDescription: string;
}

export class AIService {
  static async getBrandingSuggestions(request: AIBrandingRequest): Promise<AIBrandingResponse> {
    try {
      const prompt = this.createBrandingPrompt(request);
      
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4', // or whatever model you're using
          messages: [
            {
              role: 'system',
              content: 'You are a professional branding expert. Generate creative and practical branding suggestions based on the user input. Return your response as a JSON object with the following structure: { brandName: string, tagline: string, colorPalette: string[], typography: string, brandVoice: string, logoDescription: string }'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Parse the AI response - it might be in the message content
      const aiResponse = data.choices[0]?.message?.content;
      
      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      // Try to parse JSON from the response
      try {
        return JSON.parse(aiResponse);
      } catch (parseError) {
        // If parsing fails, create a structured response from text
        return this.parseTextResponse(aiResponse);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get branding suggestions. Please try again.');
    }
  }

  private static createBrandingPrompt(request: AIBrandingRequest): string {
    return `
      Create branding suggestions for a business with the following details:
      
      Business Name: ${request.businessName}
      Industry: ${request.industry}
      Target Audience: ${request.targetAudience}
      Brand Values: ${request.brandValues.join(', ')}
      Preferences: ${request.preferences}
      
      Please provide a comprehensive branding package including:
      - A creative brand name (if the business name needs enhancement)
      - A catchy tagline
      - A color palette (3-5 colors in hex format)
      - Typography suggestions
      - Brand voice description
      - Logo description
      
      Return your response as valid JSON.
    `;
  }

  private static parseTextResponse(text: string): AIBrandingResponse {
    // Fallback parsing if AI doesn't return proper JSON
    // This is a simple implementation - you might want to make it more robust
    const lines = text.split('\n').filter(line => line.trim());
    
    return {
      brandName: lines.find(line => line.toLowerCase().includes('name:'))?.split(':')[1]?.trim() || 'Creative Brand',
      tagline: lines.find(line => line.toLowerCase().includes('tagline:'))?.split(':')[1]?.trim() || 'Your compelling tagline',
      colorPalette: ['#3B82F6', '#1E40AF', '#93C5FD'], // Default blue palette
      typography: 'Modern sans-serif',
      brandVoice: 'Professional and approachable',
      logoDescription: 'A modern, clean logo representing your business values'
    };
  }

  // Fallback mock data for development or when API is unavailable
  static getMockBrandingSuggestions(request: AIBrandingRequest): AIBrandingResponse {
    return {
      brandName: `${request.businessName} Pro`,
      tagline: `Elevating ${request.industry} for ${request.targetAudience}`,
      colorPalette: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      typography: 'Inter, sans-serif',
      brandVoice: `${request.brandValues[0] || 'Professional'} and ${request.brandValues[1] || 'Innovative'}`,
      logoDescription: `A modern logo combining elements of ${request.industry} with a ${request.brandValues[0] || 'clean'} aesthetic`
    };
  }
}