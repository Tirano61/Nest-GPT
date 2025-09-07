

interface Option {
    threadId: string;
    question: string;
}


export const CreateMessageUseCase = async ( openAi: any, option: Option ) => {

    const { threadId, question } = option;

    const message = await openAi.beta.threads.messages.create(  threadId, {
        role: 'user',
        content: question,
    });

    return message;

}