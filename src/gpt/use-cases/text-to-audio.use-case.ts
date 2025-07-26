import * as fs from "fs";
import OpenAI from "openai";
import * as path from "path";


interface Options{
    prompt: string;
    voice?: string;
}

export const textToAudioUseCase = async( openAi: OpenAI, options: Options) => {
    const { prompt, voice } = options;

    
    const voices ={
        'nova' : 'nova',
        'alloy' : 'alloy', 
        'ash' : 'ash', 
        'ballad' : 'ballad',  
        'coral' : 'coral', 
        'echo' : 'echo', 
        'fable': 'fable', 
        'onyx': 'onyx', 
        'sage': 'sage', 
        'shimmer': 'shimmer',
        'verse': 'verse',  
    }
    const selectedVoices = voices[voice!] ?? 'nova'; // Default to 'nova' if no voice is provided

    const folderPath = path.resolve(__dirname, `../../../genereted/audios/`);
    const speechFile = path.resolve( `${folderPath}/${new Date().getTime()}.mp3`);

    await fs.promises.mkdir(folderPath, { recursive: true });


    const mp3 = await openAi.audio.speech.create({
        model: 'gpt-4o-mini-tts',
        voice: selectedVoices,
        input: prompt,
        response_format: 'mp3',
    });

    const buffer = Buffer.from( await mp3.arrayBuffer() );
    await fs.promises.writeFile(speechFile, buffer);
 
    return speechFile;
}