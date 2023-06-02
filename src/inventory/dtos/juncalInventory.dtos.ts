import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateJuncalInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly materialId: number;
}

export class UpdateJuncalInventoryDto extends PartialType(
  CreateJuncalInventoryDto,
) {}
