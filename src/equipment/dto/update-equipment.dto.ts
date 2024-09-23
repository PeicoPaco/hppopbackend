import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentDto } from './create-equipment.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
    @IsOptional()
    @IsBoolean()
    is_deleted: boolean;
}
