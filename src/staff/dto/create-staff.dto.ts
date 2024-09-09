import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateStaffDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsUUID()
    healthcenter_id: string;

    @IsUUID()
    role_id: string; 
}
