import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { StaffModule } from 'src/staff/staff.module';

const secret = process.env.JWT_SECRET;

@Module({
  imports: [
    UserModule,
    StaffModule,
    JwtModule.register({
      global: true,
      secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
