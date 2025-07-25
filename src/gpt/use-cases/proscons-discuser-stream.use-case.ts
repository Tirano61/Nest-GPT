import OpenAI from "openai";


interface Options{
    prompt: string;
    
}

export const prosConsDicusserStreamUseCase = async( openAi: OpenAI, options: Options) => {
    const { prompt } = options;


    return await openAi.chat.completions.create({
        messages: [{ 
            role: "system", 
            content:`Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
            la respuesta debe de ser en formato markdown,
            los pros y contras deben de estar en una lista.
            ` 
        },
        { 
            role: "user", 
            content: prompt 
        }
    ],
        stream: true,
        model: "gpt-4.1",
        temperature: 0.8,
        max_completion_tokens: 500,
        /* response_format: {
            type: "json_object",
        } */
    });
    
}
