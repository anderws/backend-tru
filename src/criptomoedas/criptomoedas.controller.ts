import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CriptomoedasService } from './criptomoedas.service';

@Controller('criptomoedas')
export class CriptomoedasController {
  constructor(private readonly criptomoedasService: CriptomoedasService) {}


  @Get('/load')
  loadCriptos(){
    return this.criptomoedasService.loadCriptos();
  }

  @Get()
  getCriptos() {
    return this.criptomoedasService.getCriptos();
  }

  @Get(':simbolo')
  findBySimbolo(@Param('simbolo') simbolo: string) {
    return this.criptomoedasService.findBySimbolo({
        where: { simbolo:  simbolo},
    })
  }

  @Delete()
  deleteAll(){
    return this.criptomoedasService.deleteAll();
  }



}
