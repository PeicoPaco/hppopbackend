import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.roles.findMany();
  }

}
