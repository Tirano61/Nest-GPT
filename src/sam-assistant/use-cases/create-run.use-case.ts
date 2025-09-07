import OpenAI from 'openai';

interface Options {
    threadId: string;
    assistantId?: string;
}

export const createRunUseCase = async (openAi: OpenAI, options: Options) => {
    const { threadId, assistantId } = options;

    // Validar que assistantId esté definido
    const finalAssistantId = assistantId || process.env.ASSISTANT_ID;
    
    if (!finalAssistantId) {
        throw new Error('ASSISTANT_ID is required but not provided in options or environment variables');
    }

    const run = await openAi.beta.threads.runs.create(threadId, {
        assistant_id: finalAssistantId, 
        // instructions: OJO que cambia el asistente
    });

    return run;
};