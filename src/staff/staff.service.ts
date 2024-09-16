import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    try {
      const staff = await this.prisma.staff.findUniqueOrThrow({
        where: { id },
      });
      return staff;
    } catch (error) {
      throw new NotFoundException('Staff not found');
    }
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

  async findStaffRoleById(id: string) {
    try {
      const role = await this.prisma.roles.findUniqueOrThrow({
        where: { id },
      });
      return role;
    } catch (error) {
      throw new NotFoundException ('Role not found');
    }
  }

}
