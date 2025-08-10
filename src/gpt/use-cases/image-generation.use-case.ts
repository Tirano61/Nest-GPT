
import OpenAI from "openai";
import * as fs from 'fs'
import * as path from 'path';
import { downloadImageAsPng, downloadBase64ImageAsPng } from 'src/helpers/download-image-as-png';

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async ( openAi: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options;

    if( !originalImage || !maskImage) {

        const resp = await openAi.images.generate({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            model: 'dall-e-3',
            quality: 'standard',
            response_format: 'url',
        });
        
        const fileName = await downloadImageAsPng(resp.data![0].url!);
        const url = `${process.env.SERVER_URL}gpt/image-generation/${fileName}`; //localhost:3000/gpt/image-generation/1754247056558.png
    
        return {
            url: url,
            openAiUrl: resp.data![0].url,
            revised_prompt: resp.data![0].revised_prompt ,
        } 
    }

    const pngImagePath = await downloadImageAsPng( originalImage );
    const pngMaskPath = await downloadBase64ImageAsPng( maskImage );    

    const resp = await openAi.images.edit({
        model: 'dall-e-3',
        prompt: prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(pngMaskPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url', 
    });

    const fileName = await downloadImageAsPng(resp.data![0].url!);
    const url = `${process.env.SERVER_URL}gpt/image-generation/${fileName}`; //localhost:3000/gpt/image-generation/1754247056558.png;

    return {
        url: url,
        openAiUrl: resp.data![0].url,
        revised_prompt: resp.data![0].revised_prompt,
        fileName: fileName
    };

}