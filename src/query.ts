import { IsOptional } from 'class-validator';

export class InventoryQuery {
  @IsOptional()
  name!: string;
}
