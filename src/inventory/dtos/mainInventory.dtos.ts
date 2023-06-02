import { IsNotEmpty, IsPositive, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMainInventoryDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly materialId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateMainInventoryDto extends PartialType(
  CreateMainInventoryDto,
) {}
