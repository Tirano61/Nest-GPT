import OpenAI from "openai";

interface Options {
    threadId: string;
}

export const getMessageListUseCase = async (openAi: OpenAI, options: Options) => {
    const { threadId } = options;

    try {
        // La API OpenAI v5.10.1 usa esta estructura exacta
        const messagesList = await openAi.beta.threads.messages.list(
            threadId 
        );

        console.log(messagesList)

        const messages = messagesList.data.map(msg => ({
            id: msg.id,
            role: msg.role,
            content: msg.content.map( c => (c as any).text.value ),
            
        }));

        return messages;

    } catch (error: any) {
        console.error('Error retrieving message list:', error);
        throw new Error(`Error retrieving message list: ${error?.message || error}`);
    }

}