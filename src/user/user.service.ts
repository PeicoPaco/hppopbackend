import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    });
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

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        staff: true,
      },
    });
  }
}
