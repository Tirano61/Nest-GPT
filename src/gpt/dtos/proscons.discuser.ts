import { IsString } from "class-validator";


export class ProsConsDiscuserDto {
    @IsString()
    readonly prompt: string;

}