import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GeminiService } from './gemini/gemini.service';
import { WebsrapeService } from './websrape/websrape.service';
import { OenAIResponseType, OpenaiService } from './openai/openai.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly aiService: GeminiService,
    private readonly scrapeService: WebsrapeService,
    private readonly openAIService: OpenaiService,
  ) {}

  @Post('openai')
  async getOpenAIResponse(
    @Body() requestBody: { prompt: string },
  ): Promise<OenAIResponseType> {
    return this.scrapeService.scrapeArticleOpenAI(requestBody.prompt);
  }

  //gemini
  // @Post('ai')
  // async getAIResponse(
  //   @Body() requestBody: { prompt: string },
  // ): Promise<string> {
  //   return this.aiService.generateText(requestBody.prompt);
  // }

  // @Post('ai-stream')
  // async getAIResponseStream(
  //   @Body() requestBody: { prompt: string },
  // ): Promise<string> {
  //   return this.aiService.generateStreamText(requestBody.prompt);
  // }

  @Post('gemini')
  async getScrapedResponse(
    @Body() requestBody: { url: string },
  ): Promise<string> {
    return this.scrapeService.scrapeArticle(requestBody.url);
  }
}