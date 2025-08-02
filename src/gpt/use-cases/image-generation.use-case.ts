


import OpenAI from "openai";
import * as fs from 'fs'

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async ( openAi: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options;
    const resp = await openAi.images.generate({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        model: 'dall-e-3',
        quality: 'standard',
        response_format: 'url',
    });
   
    console.log(resp);
    return {
        url: resp.data![0].url,
        localPath: '',
        revised_prompt: resp.data![0].revised_prompt ,
    } 


}