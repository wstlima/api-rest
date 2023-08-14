import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContributionDto {
  @IsNotEmpty()
  @IsString()
  contribution_date: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  createdAt: Date;
  updatedAt: Date;

  @IsOptional()
  accounts_receivable: any;
}
