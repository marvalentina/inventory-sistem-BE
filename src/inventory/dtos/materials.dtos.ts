import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly unit: string;
}

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}
