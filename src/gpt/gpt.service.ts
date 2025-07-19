import { Body, Injectable } from '@nestjs/common';
import { orthographyUseCases } from './use-cases/orthography.use-cases';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openAi = new OpenAI({
        apiKey: process.env.API_KEY,
    });

    // Soo va a llamar casos de uso

    async orthographyCheck( orthographyDto: OrthographyDto) {
        return await orthographyUseCases( this.openAi ,{ prompt: orthographyDto.prompt});
    }
}
