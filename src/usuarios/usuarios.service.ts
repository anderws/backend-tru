import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Usuario, Prisma } from '@prisma/client';
import { MensagemDto } from './dto/message.dto';

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService){}

    async createUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario>{
        return this.prisma.usuario.create({
            data
        });

    }

    async getUsuarios(): Promise<Usuario[]>{
        const usuarios = await this.prisma.usuario.findMany();
        if(usuarios?.length){
            return usuarios;
        }
        return []; 
    }

    async getOneUsuario(params: {
        where: Prisma.UsuarioWhereUniqueInput
    } ): Promise<Usuario | MensagemDto> {
        const { where } = params;
        const usuario =  await this.prisma.usuario.findFirst({
            where,
        });
        
        if(!usuario){
            return  { mensagem: `Usuario ${(where).id} não encontrado!` };
        }
        
        return usuario;
    }

    async updatePerfilUsuario(params: {
        where: Prisma.UsuarioWhereUniqueInput;
        data: Prisma.UsuarioUpdateInput;
    }): Promise<Usuario | MensagemDto>{

        const { data, where } = params;

        const usuario = await this.prisma.usuario.findFirst({
            where,
        });

        if(!usuario){
            return  { mensagem: `Usuario ${(where).id} não encontrado!` };
        }

        return this.prisma.usuario.update({
            data,
            where,
        });
    }

    async getUsuarioByPerfil(params: {
        where: Prisma.UsuarioWhereInput;
        orderBy?: Prisma.UsuarioOrderByWithRelationInput;
    }): Promise<Usuario[]>{
        const { where, orderBy } = params;
        return this.prisma.usuario.findMany({
            where,
            orderBy,
    });
    }


    async deleteUsuario(where: Prisma.UsuarioWhereUniqueInput): Promise<MensagemDto >{

        const existUsuario = await this.prisma.usuario.findFirst({
            where,
        });
        console.log(existUsuario);
        if(!existUsuario){
            return  { mensagem: `Usuario ${(where).id} não encontrado!` };
        }

        const usuario = this.prisma.usuario.delete({
            where,
        });
        return  { mensagem: `Usuario ${(await usuario).id} deletado` };

    }
}
