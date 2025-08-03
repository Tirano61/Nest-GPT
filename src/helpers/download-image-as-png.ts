import { InternalServerErrorException } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';
import * as sharp from 'sharp'; 




export const  downloadImageAsPng = async(url: string) => {

    const response = await fetch(url);
    
    if(!response.ok) {
        throw new InternalServerErrorException(`Failed to download image: ${response.statusText}`);
    }

    const folderPath = path.resolve('./', './genereted/image/');
    const fileName = `${ new Date().getTime() }.png`;
    fs.mkdirSync(folderPath, { recursive: true });

    const buffer = Buffer.from(await response.arrayBuffer());

    //fs.writeFileSync( `${folderPath}/${fileName}`, buffer);

    await sharp(buffer)
        .png()  
        .ensureAlpha()
        .toFile(path.join(folderPath, fileName));

    return path.join(folderPath, fileName);
    


}


export const downloadBase64ImageAsPng = async (base64Image: string) => {

  // Remover encabezado
  base64Image = base64Image.split(';base64,').pop()!;
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${ new Date().getTime() }-64.png`;
  

  // Transformar a RGBA, png // Así lo espera OpenAI
  await sharp(imageBuffer)
    .png()
    .ensureAlpha()
    .toFile(path.join(folderPath, imageNamePng));

  return path.join(folderPath, imageNamePng);

}