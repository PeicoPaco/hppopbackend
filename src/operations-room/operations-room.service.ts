import { Injectable } from '@nestjs/common';
import { CreateOperationsRoomDto } from './dto/create-operations-room.dto';
import { UpdateOperationsRoomDto } from './dto/update-operations-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperationsRoomService {

  constructor(private prisma: PrismaService){}

  findAll() {
    return this.prisma.operationsroom.findMany();
  }

}
