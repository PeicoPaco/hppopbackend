import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LogInDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { StaffService } from 'src/staff/staff.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, staffId }: RegisterDto) {
    

    await this.userService.create({
      email,
      password: await bcryptjs.hash(password, 10),
      staffId,
    });

    return {
      email,
    };
  }

  async login({ email, password }: LogInDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    //Get staff from user id
    const staff = await this.userService.findStaffById(user.staff_id);
    if(!staff) {
      throw new UnauthorizedException('No staff associated with user');
    }

    //Get role from staff id
    const role = await this.staffService.findStaffRoleById(staff.role_id);
    const healthcareId = staff.healthcenter_id;
    const name = staff.name;

    const payload = { email: user.email, role: role.name };
    const token = await this.jwtService.signAsync(payload);


    return {
      token,
      email,
      role: role.name,
      name,
      healthcareId,
    };
  }

  async profile({ email }: { email: string }) {
    return await this.userService.findOneByEmail(email);
  }
}
