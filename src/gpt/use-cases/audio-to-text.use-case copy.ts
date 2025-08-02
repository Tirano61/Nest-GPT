import OpenAI from "openai";
import * as fs from 'fs'

interface Options {
    prompt?: string;
    audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async ( openAi: OpenAI, options: Options) => {
    const { prompt, audioFile } = options;

    const resp = await openAi.audio.transcriptions.create({
        model: 'gpt-4o-transcribe',
        file: fs.createReadStream( audioFile.path ),
        prompt: prompt, // mismo idioma del audio
        language: 'es',
        response_format: 'json',
    });

    return resp || 'No se pudo transcribir el audio, intente de nuevo más tarde';

}