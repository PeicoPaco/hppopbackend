import { IsNotEmpty, IsString, isUUID } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CreateOperationDto {

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    request_id: string;

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    anesthesiologist_id: string;

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    nurseInstrumentista_id: string;

}
