import { Body, Injectable } from '@nestjs/common';
import { orthographyUseCases } from './use-cases/orthography.use-cases';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';
import { ProsConsDiscuserDto } from './dtos/proscons.discuser';
import { prosConsDicusserUseCase } from './use-cases/proscons-discuser.use-case';
import { prosConsDicusserStreamUseCase } from './use-cases/proscons-discuser-stream.use-case';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate.use-case';

@Injectable()
export class GptService {

    private openAi = new OpenAI({
        apiKey: process.env.API_KEY,
    });

    // Soo va a llamar casos de uso

    async orthographyCheck( orthographyDto: OrthographyDto) {
        return await orthographyUseCases( this.openAi ,{ prompt: orthographyDto.prompt});
    }

    async prosConsDicusser({ prompt }: ProsConsDiscuserDto) {
        return await prosConsDicusserUseCase(this.openAi, { prompt });
    }

    async prosConsDicusserStream({ prompt }: ProsConsDiscuserDto) {
        return await prosConsDicusserStreamUseCase(this.openAi, { prompt });
    }

    async translateService({ prompt, lang }: TranslateDto) {
        return await translateUseCase(this.openAi, { prompt, lang });
    }
}
