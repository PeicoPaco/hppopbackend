import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";


export class CreateUserDto {
    @IsNotBlank()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsUUID()
    staffId: string;

}
