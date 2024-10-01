import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/rol.enum';


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
  @Get('doctor/:id')
  findAllDoctor(@Param('id', ParseUUIDPipe) id: string) {
    return this.requestService.findAllDoctor(id);
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
