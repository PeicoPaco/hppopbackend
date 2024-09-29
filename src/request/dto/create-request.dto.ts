import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CreateRequestDto {

    @IsUUID()
    doctor_id: string;

    initTime: Date;

    endTime: Date;

    @IsUUID()
    operations_room_id: string;

    @IsNotEmpty()
    @IsNotBlank()
    @IsString()
    description: string;

}
