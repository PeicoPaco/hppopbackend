import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateUserDto): Promise <User> {

    //check if the email is already registered
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email
      },
    });

    //If user exists, throw a bad request exception
    if(existingUser) {
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

  findOne(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id },
    });
    return user; 
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
    const user = this.prisma.user.findUnique({
      where: { email }
    });
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
