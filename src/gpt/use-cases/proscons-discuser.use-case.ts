import OpenAI from "openai";


interface Options{
    prompt: string;
    
}

export const prosConsDicusserUseCase = async( openAi: OpenAI, options: Options) => {
    const { prompt } = options;


    const response = await openAi.chat.completions.create({
        messages: [{ 
            role: "system", 
            content:`Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
            la respuesta debe de ser en formato markdown,
            los pros y contras deben de estar en una lista,.
            
            

            ` 
        },
        { 
            role: "user", 
            content: prompt 
        }
    ],
        model: "gpt-4.1",
        temperature: 0.8,
        max_completion_tokens: 500,
        /* response_format: {
            type: "json_object",
        } */
    });
    //const jsonResp = JSON.parse(response.choices[0].message.content!);
    return response.choices[0].message;
}
