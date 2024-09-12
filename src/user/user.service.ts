import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateUserDto): Promise <User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        staff: {
          connect: { id: data.staffId },
        }
      }
    })
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    try{
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
      return user;
    } 
    catch(error) {
      throw new NotFoundException('User not found');
    }  
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
        include: {
          staff: true,
        }
      });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  //method to get the staff and his id durign log in process
  async findStaffById(id: string) {
    try {
      const staff = await this.prisma.staff.findUniqueOrThrow({
        where: { id },
      });
      return staff;
    } catch (error) {
      throw new NotFoundException('Staff id not found');
    }
  }

}
