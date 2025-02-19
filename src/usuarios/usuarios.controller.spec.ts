import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../prisma.service';
import { mockUsuarios, mockUsuariosAdmin } from '../mocks/usuarios.mock';

import { Funcao } from '@prisma/client';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [        
          UsuariosService,
          {
            provide: PrismaService,
            useValue: {},  
          },                  
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('deve retornar um array de usuarios', async () => {
    jest.spyOn(service, 'getUsuarios').mockResolvedValue(mockUsuarios);
    const result = await controller.getUsuarios();
    
    expect(result).toEqual(mockUsuarios);
    expect(service.getUsuarios).toHaveBeenCalled();
  });

  it('deve criar um usuario', async () => {
    const novoUsuario = {
      nome: 'Jhony Mars',
      email: 'jm@oi.com',
      senha: 'jjjmmmee',
      funcao: Funcao.ADMIN,
    };

    const usuarioCriado = { id: 9, ...novoUsuario };

    jest.spyOn(service, 'createUsuario').mockResolvedValue(usuarioCriado);

    const result = await controller.createUsuario(novoUsuario);

    expect(result).toEqual(usuarioCriado);
    expect(service.createUsuario).toHaveBeenCalledWith(novoUsuario);
  });

  it('deve buscar um usuario pelo id', async () => {
    jest.spyOn(service, 'getOneUsuario').mockResolvedValue(mockUsuarios[0]);
    const result = await controller.getOneUsuario("1");
    
    expect(result).toEqual(mockUsuarios[0]);
    expect(service.getOneUsuario).toHaveBeenCalledWith({"where": {"id": 1}});
  });


  it('deve deletar um usuario pelo id', async () => {
    const userId = 2;
    const expectedResponse = { mensagem: `Usuario ${userId} deletado` };

    jest.spyOn(service, 'deleteUsuario').mockResolvedValue(expectedResponse);

    const result = await controller.deleteUsuario(userId.toString());

    expect(result).toEqual(expectedResponse);
    expect(service.deleteUsuario).toHaveBeenCalledWith({ id: Number(2) });
  });

  it('deve informar uma mensagem quando nao encontrar o usuario pelo id ao tentar deletar', async () => {
    const userId = 1200;
    const expectedResponse = { mensagem: `Usuario ${userId} não encontrado!` };

    jest.spyOn(service, 'deleteUsuario').mockResolvedValue(expectedResponse);

    const result = await controller.deleteUsuario(userId.toString());

    expect(result).toEqual(expectedResponse);
    expect(service.deleteUsuario).toHaveBeenCalledWith({ id: Number(userId) });
  });

  it('deve atualizar um perfil de usuario pelo id', async () => {
    const usuarioAtualizado = {
      nome: 'Jhony Mars',
      email: 'jm@oi.com',
      senha: 'jjjmmmee',
      funcao: Funcao.ADMIN,
    };

    const usuario = { id: 9, ...usuarioAtualizado };

    jest.spyOn(service, 'updatePerfilUsuario').mockResolvedValue(usuario);

    const result = await controller.updatePerfilUsuario("9", { "funcao": "ADMIN" });

    expect(result).toEqual(usuario);
    expect(service.updatePerfilUsuario).toHaveBeenCalledWith({"where": {"id": 9}, "data": {"funcao": "ADMIN"}});
  });

  it('deve informar uma mensagem quando nao encontrar o usuario pelo id ao tentar atualizar o perfil', async () => {
    const userId = 1200;
    const expectedResponse = { mensagem: `Usuario ${userId} não encontrado!` }

    jest.spyOn(service, 'updatePerfilUsuario').mockResolvedValue(expectedResponse);

    const result = await controller.updatePerfilUsuario(userId.toString(), { "funcao": "ADMIN" });

    expect(result).toEqual(expectedResponse);
    expect(service.updatePerfilUsuario).toHaveBeenCalledWith({"where": {"id": userId}, "data": {"funcao": "ADMIN"}});
  });

  it('deve retornar um array de usuarios pelo perfil', async () => {
    jest.spyOn(service, 'getUsuarioByPerfil').mockResolvedValue(mockUsuariosAdmin);
    const result = await controller.getUsuariosByPerfil("ADMIN");
    
    expect(result).toEqual(mockUsuariosAdmin);
    expect(service.getUsuarioByPerfil).toHaveBeenCalledWith({"where": {"funcao": "ADMIN"}});
  });

});
