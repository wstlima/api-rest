import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  product_code: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  batch: string;

  @IsNumber()
  @IsOptional()
  current_stock: number;

  @IsNumber()
  @IsOptional()
  input: number;

  @IsNumber()
  @IsOptional()
  output: number;

  @IsNotEmpty()
  input_price: number;

  @IsNotEmpty()
  output_price: number;

  @IsString()
  @IsNotEmpty()
  expiration_date: Date;

  @IsOptional()
  unit_cost: number;

  createdAt: Date;
  updatedAt: Date;
}
