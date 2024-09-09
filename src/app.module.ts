import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [AuthModule, UserModule, StaffModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
