import { Controller, Get, Post, Body, Patch, Param, ValidationPipe, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { RequestService } from './request.service';


@Controller('request')
@UseGuards(AuthGuard, RolesGuard)
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body(ValidationPipe) createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get()
  findAll() {
    return this.requestService.findAll();
  }

  @Roles(Role.DOCTOR)
  @Get('doctor')
  findAllDoctor(@Req() req: Request) {
    const user = req.user;
    const doctorId = user.staffId;

    return this.requestService.findAllDoctor(doctorId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.requestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(id, updateRequestDto)
  }

  @Patch('delete/:id')
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.requestService.softDelete(id);
  }
}
