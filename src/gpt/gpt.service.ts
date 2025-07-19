import { Body, Injectable } from '@nestjs/common';
import { orthographyUseCases } from './use-cases/orthography.use-cases';
import { OrthographyDto } from './dtos/orthography.dto';

@Injectable()
export class GptService {
    // Soo va a llamar casos de uso
   
    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyUseCases(orthographyDto);
    }
}
