import { Test, TestingModule } from '@nestjs/testing';
import { CriptomoedasController } from './criptomoedas.controller';
import { CriptomoedasService } from './criptomoedas.service';
import { PrismaService } from '../prisma.service';

import { mockCriptomoedas } from '../mocks/criptomoedas.mock';

describe('CriptomoedasController', () => {
  let controller: CriptomoedasController;
  let service: CriptomoedasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriptomoedasController],
      providers: [
        CriptomoedasService,
        {
          provide: PrismaService,
          useValue: {},  
        },
      ],
    }).compile();

    controller = module.get<CriptomoedasController>(CriptomoedasController);
    service = module.get<CriptomoedasService>(CriptomoedasService);
  });

  it('deve retornar um array de criptomoedas', async () => {
    jest.spyOn(service, 'getCriptos').mockResolvedValue(mockCriptomoedas);
    const result = await controller.getCriptos();
    
    expect(result).toEqual(mockCriptomoedas);
    expect(service.getCriptos).toHaveBeenCalled();
  });

  it('deve buscar uma criptomoeda pelo simbolo', async () => {
        jest.spyOn(service, 'findBySimbolo').mockResolvedValue(mockCriptomoedas[0]);
        const result = await controller.findBySimbolo("btc");
        
        expect(result).toEqual(mockCriptomoedas[0]);
        expect(service.findBySimbolo).toHaveBeenCalledWith({"where": {"simbolo": "btc"}});      
  });

  it('deve informar uma mensagem quando nao encontrar uma criptomoeda na busca por simbolo', async () => {
    
    const expectedResponse = { message: `Criptomoeda não encontrada!`  };
    jest.spyOn(service, 'findBySimbolo').mockResolvedValue(expectedResponse);
    const result = await controller.findBySimbolo("xtc");
    
    expect(result).toEqual(expectedResponse);
    expect(service.findBySimbolo).toHaveBeenCalledWith({"where": {"simbolo": "xtc"}});      
});


  it('deve deletar todas a criptomoedas', async () => {
    const total = 100;
    const expectedResponse = { message: `Total registros excluídos: ${total}` };

    jest.spyOn(service, 'deleteAll').mockResolvedValue(expectedResponse);

    const result = await controller.deleteAll();

    expect(result).toEqual(expectedResponse);
    expect(service.deleteAll).toHaveBeenCalledWith();
  });
});
