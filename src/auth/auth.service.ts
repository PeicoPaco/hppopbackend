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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, staffId }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email); 

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.usersService.create({
      email,
      password: await bcryptjs.hash(password, 10),
      staffId,
    });

    return {
      email,
    };
  }

  async login({ email, password }: LogInDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }

  async profile({ email }: { email: string }) {
    return await this.usersService.findOneByEmail(email);
  }
}
