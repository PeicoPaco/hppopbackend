import { Controller, Get, Post, Body, Patch, Param, UseGuards, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('staff')
@UseGuards(AuthGuard, RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Roles(Role.SUPERADMIN)
  @Post()
  create(@Body(ValidationPipe) createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffService.findOne(id);
  }

  @Roles(Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Roles(Role.SUPERADMIN)
  @Patch(':id/delete')
  softDelete(@Param('id') id:string) {
    return this.staffService.softDelete(id);
  }
}
