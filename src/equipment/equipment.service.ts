import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipmentService {

  constructor(private prisma:PrismaService) {}
  
  findAll() {
    return this.prisma.equipment.findMany({
      where: {
        is_deleted: false,
      },
    });
  }

}
