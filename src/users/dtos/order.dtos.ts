import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrdersDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly total_price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly bill: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly provider: string;
}

export class UpdateOrdersDto extends PartialType(CreateOrdersDto) {}
