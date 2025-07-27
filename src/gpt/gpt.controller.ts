import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDiscuserDto } from './dtos/proscons.discuser';
import e, { Response } from 'express';
import { TranslateDto } from './dtos/translate.dto';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  async orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck( orthographyDto );
  }

  @Post('pros-cons-discusser')
  async prosConsDicusser(@Body() prosConsDiscuserDto: ProsConsDiscuserDto) {
    return this.gptService.prosConsDicusser( prosConsDiscuserDto );
  }
  
  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscuserDto: ProsConsDiscuserDto,
    @Res() res: Response
  ) {
    const stream = await this.gptService.prosConsDicusserStream( prosConsDiscuserDto );
    res.setHeader('Content-Type', 'aplication/json');  
    res.status(HttpStatus.OK);

    for await(const chunk of stream){
      const piece = chunk.choices[0].delta.content || '';
      //console.log(piece);
      res.write(piece);
    }

    res.end();
  }

  @Post('translate')
  async translate(@Body() translateDto: TranslateDto) {
    return this.gptService.translateService( translateDto );
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudioService( textToAudioDto );

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);

  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId: string
  ) {

    const filePath = await this.gptService.textToAudioGetterService( fileId );
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './genereted/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file. originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null, fileName );
        }
      }), 
    })
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 5, message: ' File is bigger than 10Mb' }),
          new FileTypeValidator({ fileType: 'audio/*' }) // 10 MB
        ]
      })
    ) file: Express.Multer.File,
  ) {
    //return await this.gptService.audioToTextService( textToAudioDto );
    return 'Done';
  }
}
