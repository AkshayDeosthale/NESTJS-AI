import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private geminiModel: any;

  constructor() {
    const geminiApiKey = process.env.GEMINI_KEY;

    const googleAI = new GoogleGenerativeAI(geminiApiKey);

    const generationConfig = {
      temperature: 0.9, // Adjust for desired creativity vs. accuracy
      topP: 1, // Probability distribution
      topK: 1, // How many beams to use during search
      maxOutputTokens: 4096, // Maximum output length
    };

    this.geminiModel = googleAI.getGenerativeModel({
      model: 'gemini-pro', // Specify the Gemini model (can be other models)
      //   generationConfig,
    });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.geminiModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      throw new Error('Error generating text with Gemini API: ' + error);
    }
  }

  async generateStreamText(prompt: string): Promise<string> {
    try {
      // For text-only input

      const result = await this.geminiModel.generateContentStream(prompt);

      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
      }
      return text;
    } catch (error) {
      throw new Error('Error generating text with Gemini API: ' + error);
    }
  }
}
