import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperationService {

  constructor(private prisma: PrismaService){}


  create(data: CreateOperationDto) {
    return this.prisma.operation.create({
      data,
    });
  }

  findAll() {
    return this.prisma.operation.findMany({
      where: { is_deleted: false ,}
    });
  }

  findOne(id: string) {
    return this.prisma.operation.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateOperationDto) {
    return this.prisma.operation.update({
      where: { id },
      data,
    });
  }

  softDelete(id: string) {
    return this.prisma.operation.update({
      where: { id },
      data: { is_deleted: true},
    });
  }
}
