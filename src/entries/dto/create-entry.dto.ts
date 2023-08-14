import {
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
  isDecimal,
} from 'class-validator';

export class CreateEntryDto {
  @IsString()
  no_invoice_purchase: string;

  @IsString()
  date: Date;

  @IsString()
  product_code: string;

  @IsOptional()
  description: string;

  @IsOptional()
  supplier: any;

  @IsNumber()
  amount: number;

  @IsDecimal()
  price: number;

  @IsString()
  batch: string;
}
