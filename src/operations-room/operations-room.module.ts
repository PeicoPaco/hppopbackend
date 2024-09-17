import { Module } from '@nestjs/common';
import { OperationsRoomService } from './operations-room.service';
import { OperationsRoomController } from './operations-room.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OperationsRoomController],
  providers: [OperationsRoomService, PrismaService],
  exports: [OperationsRoomService]
})
export class OperationsRoomModule {}
