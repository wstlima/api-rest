import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDepartureDto {
  @IsString()
  @IsNotEmpty()
  sales_invoice_code: string;

  @IsString()
  @IsNotEmpty()
  product_code: string;

  @IsOptional()
  description: string;

  @IsOptional()
  batch: string;

  @IsOptional()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  price: number;
}
