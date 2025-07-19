import { OrthographyDto } from "../dtos/orthography.dto"

interface Options{
    prompt: string;
    
}

export const orthographyUseCases = async( options: Options) => {
    const { prompt } = options;
    
    return {
        msg: prompt,
    }
}