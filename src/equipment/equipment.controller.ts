import { Controller, Get, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('equipment')
@UseGuards(AuthGuard)
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  findAll() {
    return this.equipmentService.findAll();
  }

}
