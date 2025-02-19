import { Module } from '@nestjs/common';
import { CriptomoedasService } from './criptomoedas.service';
import { CriptomoedasController } from './criptomoedas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CriptomoedasService,PrismaService],
  controllers: [CriptomoedasController],
})
export class CriptomoedasModule {}
