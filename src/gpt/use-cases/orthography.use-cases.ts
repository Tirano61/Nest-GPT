import OpenAI from "openai";
import { OrthographyDto } from "../dtos/orthography.dto"
import { Completions } from "openai/resources/chat/completions";

interface Options{
    prompt: string;
    
}

export const orthographyUseCases = async( openAi: OpenAI, options: Options) => {
    const { prompt } = options;


    const response = await openAi.chat.completions.create({
        messages: [{ 
            role: "system", 
            content:`Te serán proveidos textos en español con posibles errores ortográficos y gramaticales.
            Las palabras usadas deberan existir en el diccionario de la real academia española,
            Debes responder en formato JSON y el JSON siempre debe estar completo, 
            Tu tarea es corregirlos y retornar información soluciones,
            tambien debes dar un porcentaje de acirto por el usuario,
            si no hay errores, debes retornar un mensaje de felicitaciones.
            
            Ejemplo de salida:
            {
                "userScore": number,
                "errors": string[] // [error -> solucion],
                "message: string // usa emojis para felicitar usuarios
            }

            ` 
        },
        { 
            role: "user", 
            content: prompt 
        }
    ],
        model: "gpt-4.1",
        temperature: 0.3,
        max_completion_tokens: 100,
        response_format: {
            type: "json_object",
        }
    });
    const jsonResp = JSON.parse(response.choices[0].message.content!);
    return jsonResp;
}

