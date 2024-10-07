import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {

    @IsOptional()
    @IsUUID()
    approved_by: string;

    @IsOptional()
    @IsBoolean()
    is_deleted: boolean;
}
