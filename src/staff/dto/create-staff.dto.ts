import { IsNotEmpty, IsUUID, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateStaffDto {
    @IsNotBlank({message: "name can't be an empty string"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    healthcenter_id: string;

    @IsUUID()
    role_id: string; 

}
