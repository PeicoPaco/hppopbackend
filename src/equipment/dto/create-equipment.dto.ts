import { IsUUID, IsNotEmpty } from "class-validator";

export class CreateEquipmentDto {

    @IsUUID()
    healthcare_id: string;

    @IsNotEmpty()
    equipment_name: string;

}
