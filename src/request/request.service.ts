import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestService {

  constructor(private prisma:PrismaService){}

  create(data: CreateRequestDto) {

    const pendingApprovalStatusId = '3d75cbb7-18e7-41b6-94a1-9c40404b8888';

    return this.prisma.request.create({
      data: {
        ...data,
        status_id: pendingApprovalStatusId,
      },
    });
  }

  findAll() {
    return this.prisma.request.findMany({
      where: { is_deleted: false }
    });
  }

  //review 
  async findAllDoctor(id: string) {

    if (!id) {
      throw new BadRequestException('ID is required');
    }
    
    const doctorReq = await this.prisma.staff.findUnique({
      where: { id },
    });

    if(!doctorReq) {
      throw new NotFoundException('doctor id provided not found');
    };

    //retunr where is_deleted: false ?
    return this.prisma.request.findMany({
      where: {doctor_id: id},
    });
  }

  async findOne(id: string) {
    const request = await this.prisma.request.findUnique({
      where: { id },
    });

    if(!request) {
      throw new NotFoundException('request not found');
    }

    return request;
  }

  async update(id: string, data: UpdateRequestDto) {
    const reqToUptdate = await this.prisma.request.findUnique({
      where: { id },
    });

    if(!reqToUptdate) {
      throw new NotFoundException('request not found');
    }

    return this.prisma.request.update({
      where: { id },
      data,
    })
  }

  async softDelete(id: string) {
    const reqToDelete = await this.prisma.request.findUnique({
      where: { id },
    });

    if(!reqToDelete){
      throw new NotFoundException('request not found')
    };

    return this.prisma.request.update({
      where: { id },
      data: { is_deleted: true },
    });
  }


}
