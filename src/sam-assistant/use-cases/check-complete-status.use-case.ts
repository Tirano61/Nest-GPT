import OpenAI from "openai";

interface Options {
    threadId: string;
    runId: string;
}

export const CheckCompleteStatusUseCase = async (openAi: OpenAI, options: Options) => {
    const { threadId, runId } = options;

    try {
        // La API OpenAI v5.10.1 usa esta estructura exacta
        const runStatus = await openAi.beta.threads.runs.retrieve(           
            runId,
            { thread_id: threadId } // RequestOptions opcional
        );

        console.log({ status: runStatus.status });
        
        if (runStatus.status === 'completed') {
            return runStatus;
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de reintentar
        return await CheckCompleteStatusUseCase(openAi, { threadId, runId });

    } catch (error: any) {
        console.error('Error retrieving run status:', error);
        throw new Error(`Error retrieving run status: ${error?.message || error}`);
    }
}