import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {  Prisma } from '@prisma/client';

import axios from 'axios';

@Injectable()
export class CriptomoedasService {

  private readonly apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h,7d&per_page=100';
  private readonly apiKey = process.env.COINGECKO_API_KEY;

  constructor(private prisma: PrismaService){}

  async loadCriptos(): Promise<any>{
    try {
      const response = await axios.get(this.apiUrl, {
        headers: {
          'x-cg-demo-api-key': this.apiKey,
        },
      });

      const criptomoedas = response.data;
      
      const dadosFormatados = criptomoedas.map((cripto)=>({
        codigo: cripto.id,
        nome: cripto.name,
        simbolo: cripto.symbol,
        precoAtual: cripto.current_price,
        marketCap: BigInt(cripto.market_cap),
        variacao24h: cripto.price_change_percentage_24h_in_currency,
        variacao7d: cripto.price_change_percentage_7d_in_currency | 0,
        ath: cripto.ath,
        atl: cripto.atl,
      }));
      await this.prisma.criptoMoeda.createMany({
        data: dadosFormatados,
      });
      return { message: 'Dados salvos com sucesso! ', count: dadosFormatados.length };
    } catch (error) {
      throw new Error(`Erro ao buscar dados da API: ${error.message}`);
    }
    
  }


  async getCriptos(): Promise<any[]>{
    const criptos = await this.prisma.criptoMoeda.findMany();
    return criptos.map(cripto => ({
      ...cripto,
      marketCap: Number(cripto.marketCap),
    }));
  }

  async findBySimbolo(params: {  where: Prisma.CriptoMoedaWhereInput; }): Promise<any>{
      const { where } = params;
      const cripto = await this.prisma.criptoMoeda.findFirst({ where });
      if(cripto){
        return {...cripto, marketCap: Number(cripto?.marketCap)};
      }
      return { message: `Criptomoeda não encontrada!` };
  }

  async deleteAll(): Promise<any>{
    const total = await this.prisma.criptoMoeda.deleteMany({ });
    return { message: `Total registros excluídos: ${total.count}` };
  }

}
