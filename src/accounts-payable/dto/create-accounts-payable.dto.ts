import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountsPayableDto {
  @IsOptional()
  note: string;

  @IsOptional()
  description: string;

  @IsNumber()
  debt: number;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  customer: any;

  @IsString()
  type_account: string;

  @IsString()
  god_state: string;
}
