import { PartialType } from '@nestjs/mapped-types';
import { CreateCriptomoedaDto } from './create-criptomoeda.dto';

export class UpdateCriptomoedaDto extends PartialType(CreateCriptomoedaDto) {}
