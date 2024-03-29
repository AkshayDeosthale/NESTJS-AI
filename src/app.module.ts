import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiService } from './gemini/gemini.service';
import { OpenaiService } from './openai/openai.service';
import { User, UserSchema } from './shemas/userlog.schema';
import { UserMiddleware } from './user.middleware';
import { WebsrapeService } from './websrape/websrape.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, GeminiService, WebsrapeService, OpenaiService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(AppController);
  }
}
