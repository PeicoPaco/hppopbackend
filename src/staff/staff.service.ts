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

  //Implemented pagination
  async findAll(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.staff.findMany({
        where: { is_deleted: false },
        skip: skip,
        take: limit,
        orderBy: {
          name: 'asc',
        }
      }),
      this.prisma.staff.count({
        where: { is_deleted: false },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
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

  async update(id: string, data: UpdateStaffDto) {
    const staffToUpdate = await this.prisma.staff.findUnique({
      where: { id }
    });

    if(!staffToUpdate) {
      throw new NotFoundException('Staff not found');
    }

    return this.prisma.staff.update({
      where: { id }, 
      data,
    });

  }

  async softDelete(id: string) {
    const staffToDelete = await this.prisma.staff.findUnique({
      where : { id },
    });

    if(!staffToDelete) {
      throw new NotFoundException('Staff not found');
    }

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
