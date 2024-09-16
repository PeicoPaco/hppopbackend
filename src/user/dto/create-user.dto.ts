import { isNotEmpty, IsNotEmpty, IsUUID } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsUUID()
    staffId: string;

}
