import { Controller, Get, UseGuards } from '@nestjs/common';
import { OperationsRoomService } from './operations-room.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('operations-room')
@UseGuards(AuthGuard)
export class OperationsRoomController {
  constructor(private readonly operationsRoomService: OperationsRoomService) {}

  @Get()
  findAll() {
    return this.operationsRoomService.findAll();
  }

}
