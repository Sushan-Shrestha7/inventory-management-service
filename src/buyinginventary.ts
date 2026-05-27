import { IsNumber, Min } from 'class-validator';

export class BuyInventoryDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  inventoryId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
