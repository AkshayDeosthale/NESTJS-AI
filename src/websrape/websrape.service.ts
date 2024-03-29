import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GeminiService } from 'src/gemini/gemini.service';
import { OenAIResponseType, OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class WebsrapeService {
  constructor(
    private readonly aiService: GeminiService,
    private readonly openAiService: OpenaiService,
  ) {}
  async scrapeArticle(url: string): Promise<string> {
    try {
      const response = await axios.get(url);

      const html = response.data;
      const $ = cheerio.load(html);
      let articleText = '';
      const articleExists = $('article').length > 0;

      // Extract text content from all <p> elements within the <article> tag
      if (!articleExists) {
        articleText = $('p').text(); // Adjust the selector as needed
      } else {
        articleText = $('article p').text(); // Adjust the selector as needed
      }

      const aiResponse = this.aiService
        .generateText(`This is an Wiki article ,  Please make very fun and readable overview mentioning all important points
        ${articleText}
        `);
      // Return the scraped text
      return aiResponse;
    } catch (error) {
      console.error('Error fetching and parsing data:', error);
      return null;
    }
  }

  async scrapeArticleOpenAI(url: string): Promise<OenAIResponseType> {
    try {
      const response = await axios.get(url);

      const html = response.data;
      const $ = cheerio.load(html);
      let articleText = '';
      const articleExists = $('article').length > 0;

      // Extract text content from all <p> elements within the <article> tag
      if (!articleExists) {
        articleText = $('p').text(); // Adjust the selector as needed
      } else {
        articleText = $('article p').text(); // Adjust the selector as needed
      }

      const aiResponse = this.openAiService.generateGPTText(articleText);
      // Return the scraped text
      return aiResponse;
    } catch (error) {
      console.error('Error fetching and parsing data:', error);
      return null;
    }
  }
}
