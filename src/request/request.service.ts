import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestService {

  constructor(private prisma:PrismaService){}

  create(data: CreateRequestDto) {

    return this.prisma.request.create({
      data,
    });
  }

  findAll() {
    return this.prisma.request.findMany({
      where: { is_deleted: false }
    });
  }

  //review 
  async findAllDoctor(doctorId: string) {

    if (!doctorId) {
      throw new BadRequestException('ID is required');
    }
    
    const doctorReq = await this.prisma.staff.findUnique({
      where: { id: doctorId },
    });

    if(!doctorReq) {
      throw new NotFoundException('doctor id provided not found');
    };

    return this.prisma.request.findMany({
      where: {doctor_id: doctorId, is_deleted: false },
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
