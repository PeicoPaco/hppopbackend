import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto): Promise<User> {

    //check if the email is already registered
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email
      },
    });

    //If user exists, throw a bad request exception
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    //create new user
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

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {

    const userToUpdate = await this.prisma.user.findUnique({
      where: { id }
    });

    if(!userToUpdate) {
      throw new NotFoundException('User not found');
    };

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const userToDelete = await this.prisma.user.findUnique({
      where: { id }
    });

    if(!userToDelete) {
      throw new NotFoundException('User not found');
    };

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }

  //method to get the staff and his id durign log in process
  findStaffById(id: string) {
    const staff = this.prisma.staff.findUnique({
      where: { id },
    });
    return staff;
  }

}
