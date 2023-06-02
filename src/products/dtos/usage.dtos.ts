import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsArray,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUsageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly branch: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly quantity: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly productIds: number[];

  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;
}

export class UpdateUsageDto extends PartialType(CreateUsageDto) {}
