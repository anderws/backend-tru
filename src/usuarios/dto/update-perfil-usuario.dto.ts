import { Funcao } from '@prisma/client';
import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePerfilUsuarioDto {

    @ApiProperty({ enum: ['ADMIN', 'CLIENTE']})
    @IsIn([Funcao.ADMIN, Funcao.CLIENTE])
    funcao:string;
}