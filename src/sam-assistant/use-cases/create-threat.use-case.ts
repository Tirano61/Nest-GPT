import OpenAI from "openai"




export const  CreateThreatUseCase = async (openai: OpenAI) => {
    const { id } = await openai.beta.threads.create();
    return { id };
}