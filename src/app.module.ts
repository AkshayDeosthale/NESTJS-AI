import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiService } from './gemini/gemini.service';
import { ConfigModule } from '@nestjs/config';
import { WebsrapeService } from './websrape/websrape.service';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, GeminiService, WebsrapeService, OpenaiService],
})
export class AppModule {}
