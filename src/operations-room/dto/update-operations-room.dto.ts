import { PartialType } from '@nestjs/mapped-types';
import { CreateOperationsRoomDto } from './create-operations-room.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateOperationsRoomDto extends PartialType(CreateOperationsRoomDto) {

    @IsOptional()
    @IsBoolean()
    is_deleted: boolean;
    
}
