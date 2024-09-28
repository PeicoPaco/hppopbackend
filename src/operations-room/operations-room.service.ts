import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperationsRoomService {

  constructor(private prisma: PrismaService){}

  findAll() {
    return this.prisma.operationsroom.findMany({
      where: {
        is_deleted: false,
      },
    });
  }

}
