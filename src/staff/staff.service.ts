import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {

  constructor(private prisma: PrismaService){}

  create(data: CreateStaffDto) {
    return this.prisma.staff.create({
      data,
    })
  }

  findAll() {
    return this.prisma.staff.findMany();
  }

  findOne(id: string) {
    return this.prisma.staff.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id }, 
      data,
    });
  }

  softDelete(id: string) {
    return this.prisma.staff.update({
      where: { id },
      data: { is_deleted: true},
    });
  }

}
