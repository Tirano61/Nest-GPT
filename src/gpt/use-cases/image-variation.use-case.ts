import OpenAI from "openai";



interface Option {
    baseImage: string;
}

export const imageVariationUseCase = async (openAi: OpenAI, option: Option) => {

    const { baseImage } = option;

    return baseImage;

    /* const response = await openAi.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'user',
                content: `Crea una variación de esta imagen: ${baseImage}`
            }
        ]
    });

    return response; */
};