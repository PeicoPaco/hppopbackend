import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateStaffDto {
    @IsNotEmpty()
    name: string;

    @IsUUID()
    healthcenter_id: string;

    @IsUUID()
    role_id: string; 

}
