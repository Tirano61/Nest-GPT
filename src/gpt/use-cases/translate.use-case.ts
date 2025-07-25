

import OpenAI from "openai";


interface Options{
    prompt: string;
    lang: string;
    
}

export const translateUseCase = async( openAi: OpenAI, options: Options) => {
    const { prompt, lang } = options;


    const response = await openAi.chat.completions.create({
        messages: [{ 
            role: "system", 
            content:`Traduce el siguiente texto al idioma ${lang}:${ prompt }` 
        },
    ],
        model: "gpt-4.1",
        temperature: 0.2,
        //max_completion_tokens: 500,
        /* response_format: {
            type: "json_object",
        } */
    });
    //const jsonResp = JSON.parse(response.choices[0].message.content!);
    return  {message: response.choices[0].message.content};
}