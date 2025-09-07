import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateThreatUseCase } from './use-cases/create-threat.use-case';

@Injectable()
export class SamAssistantService {
    private openAi = new OpenAI({
        apiKey: process.env.API_KEY,
    });

    async createThread() {
        /// Lógica para crear un nuevo hilo de conversación
        return await CreateThreatUseCase( this.openAi );
    }

    async userQuestion(
        questionDto: { threadId: string; question: string }
    ) {
        // Lógica para manejar la pregunta del usuario
        return { answer: 'Respuesta a la pregunta del usuario' };
    }
}
