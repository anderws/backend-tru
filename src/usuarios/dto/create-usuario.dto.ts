import { Funcao } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsIn} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {

    @ApiProperty()
    @IsNotEmpty()
    nome: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    senha: string;

    @ApiProperty({ enum: ['ADMIN', 'CLIENTE']})
    @IsIn([Funcao.ADMIN, Funcao.CLIENTE])
    funcao:string;
}