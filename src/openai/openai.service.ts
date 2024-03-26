import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

export interface OenAIResponseType {
  constent: string;
  role: string;
}

@Injectable()
export class OpenaiService {
  private openAIModel: any;
  constructor() {
    this.openAIModel = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  async generateGPTText(prompt: string): Promise<OenAIResponseType> {
    const completion = await this.openAIModel.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Here is the data from a web page, analyze it and provide very fun overview of the details article is : ${prompt}`,
        },
        // {
        //   role: 'assistant',
        //   content: 'The Los Angeles Dodgers won the World Series in 2020.',
        // },
        // { role: 'user', content: 'Where was it played?' },
      ],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0];
  }
}
