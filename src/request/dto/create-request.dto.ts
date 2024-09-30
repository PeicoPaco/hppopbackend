import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CreateRequestDto {

    @IsUUID()
    doctor_id: string;

    @IsNotEmpty()
    @IsNotBlank()
    @IsDateString()
    initTime: Date;

    @IsNotEmpty()
    @IsNotBlank()
    @IsDateString()
    endTime: Date;

    @IsUUID()
    operations_room_id: string;

    @IsNotEmpty()
    @IsNotBlank()
    @IsString()
    description: string;

}
