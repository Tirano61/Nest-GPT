import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDiscuserDto } from './dtos/proscons.discuser';
import { Response } from 'express';
import { TranslateDto } from './dtos/translate.dto';

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
  
}
