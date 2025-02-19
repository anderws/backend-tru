import { Body, Controller, Get, Param, Post, Put, Delete, ParseEnumPipe, BadRequestException, NotFoundException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Funcao as FuncaoModel, Usuario as UsuarioModel} from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdatePerfilUsuarioDto } from './dto/update-perfil-usuario.dto';
import { MensagemDto } from './dto/message.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService){}

    @Get()
    async getUsuarios(): Promise<UsuarioModel[]>{
        return this.usuariosService.getUsuarios();
    }

    @Get('/:id')
    async getOneUsuario(
        @Param('id') id: string
    ): Promise<UsuarioModel | MensagemDto>{
        
        const usuario = await this.usuariosService.getOneUsuario({
            where: { id: Number(id)},
        });

        return usuario;
    }

    @Post()
    async createUsuario(
        @Body() usuarioRequest: CreateUsuarioDto,
    ): Promise<UsuarioModel>{

        const funcaoData = usuarioRequest.funcao as FuncaoModel;

        const usuarioData = {
            nome: usuarioRequest.nome,
            email: usuarioRequest.email,
            senha: usuarioRequest.senha,
            funcao: funcaoData
        }
        return this.usuariosService.createUsuario(usuarioData);
    }

    @Put('/update-perfil-usuario/:id')
    async updatePerfilUsuario(
        @Param('id') id: string,
        @Body() perfilUsuarioRequest: UpdatePerfilUsuarioDto,
    ): Promise<UsuarioModel | any>{

        const funcaoData = perfilUsuarioRequest.funcao as FuncaoModel;
        const usuario = this.usuariosService.updatePerfilUsuario({
            where: { id: Number(id)},
            data: { funcao: funcaoData }
        }); 

        return usuario; 
    }

    @Get('/by-perfil/:perfil')
    async getUsuariosByPerfil(
        @Param('perfil', new ParseEnumPipe(FuncaoModel, {
            exceptionFactory: (valor) => new BadRequestException(`Use "ADMIN" or "CLIENTE".`)
        })) funcaoRequest: FuncaoModel 
    ): Promise<UsuarioModel[]>{

        return this.usuariosService.getUsuarioByPerfil({
            where: { funcao:  funcaoRequest},
        })
    }

    @Delete('/:id')
    async deleteUsuario(@Param('id') id: string): Promise<MensagemDto> {
         return this.usuariosService.deleteUsuario({ id: Number(id) });
    }

}
