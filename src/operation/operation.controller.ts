import { Controller, Get, Post, Body, Patch, Param, UseGuards, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('operation')
@UseGuards(AuthGuard, RolesGuard)
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body(ValidationPipe) createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get()
  findAll() {
    return this.operationService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.operationService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateOperationDto: UpdateOperationDto) {
    return this.operationService.update(id, updateOperationDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch('delete/:id')
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.operationService.softDelete(id);
  }
}
