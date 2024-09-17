import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { StaffModule } from './staff/staff.module';
import { RolesModule } from './roles/roles.module';
import { OperationsRoomModule } from './operations-room/operations-room.module';

@Module({
  imports: [AuthModule, UserModule, StaffModule, RolesModule, OperationsRoomModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
