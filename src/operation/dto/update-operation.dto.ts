import { PartialType } from '@nestjs/mapped-types';
import { CreateOperationDto } from './create-operation.dto';
import { IsBoolean, isBoolean, IsOptional } from 'class-validator';

export class UpdateOperationDto extends PartialType(CreateOperationDto) {

    @IsOptional()
    @IsBoolean()
    is_deleted: boolean;

}
