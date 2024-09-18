import { IsNotEmpty, IsUUID } from "class-validator";


export class CreateOperationsRoomDto {

    @IsUUID()
    healthcenter_id: string;

    @IsNotEmpty()
    room_number: number;

}
