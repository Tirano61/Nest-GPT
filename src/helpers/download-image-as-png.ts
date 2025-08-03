import { InternalServerErrorException } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';



export const  downloadImageAsPng = async(url: string) => {

    const response = await fetch(url);
    
    if(!response.ok) {
        throw new InternalServerErrorException(`Failed to download image: ${response.statusText}`);
    }

    const folderPath = path.resolve('./', './genereted/image/');
    const fileName = `${ new Date().getTime() }.png`;
    fs.mkdirSync(folderPath, { recursive: true });

    const buffer = Buffer.from(await response.arrayBuffer());

    fs.writeFileSync( `${folderPath}/${fileName}`, buffer);



}