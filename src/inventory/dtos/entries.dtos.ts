import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateEntriesDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly materialId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly branch: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;
}

export class UpdateEntriesDto extends PartialType(CreateEntriesDto) {}
