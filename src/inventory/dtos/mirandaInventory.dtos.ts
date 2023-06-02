import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMirandaInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly materialId: number;
}

export class UpdateMirandaInventoryDto extends PartialType(
  CreateMirandaInventoryDto,
) {}
