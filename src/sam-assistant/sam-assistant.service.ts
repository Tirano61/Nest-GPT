import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateThreatUseCase } from './use-cases/create-threat.use-case';
import { QuestionDto } from './dtos/question.dto';
import { CreateMessageUseCase } from './use-cases/create-message.use-case';
import { createRunUseCase } from './use-cases/create-run.use-case';
import { CheckCompleteStatusUseCase } from './use-cases/check-complete-status.use-case';
import { getMessageListUseCase } from './use-cases/get-message-list.use-case';

@Injectable()
export class SamAssistantService {
    private openAi = new OpenAI({
        apiKey: process.env.API_KEY,
    });

    async createThread() {
        /// Lógica para crear un nuevo hilo de conversación
        return await CreateThreatUseCase( this.openAi );
    }

    async userQuestion( questionDto:  QuestionDto ) {
        const { threadId, question } = questionDto;
        /// Lógica para manejar la pregunta del usuario
        const message = await CreateMessageUseCase( this.openAi, { threadId, question } );

        const run = await createRunUseCase( this.openAi, { threadId } );

        await CheckCompleteStatusUseCase( this.openAi, { threadId, runId: run.id } );

        const messages = await getMessageListUseCase( this.openAi, { threadId } );

        return messages.reverse();
    }

}
