import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      delete user.password

      return {
        ...user,
        token: this.getJwtToken({ id: user.id, role: 'user', active: true })
      };
      
    } catch (error) {
      this.manjearErrores(error);
    }

  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas - Usuario no encontrado');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      // ...user,
      token: this.getJwtToken({ id: user.id, role: 'user', active: true })
    };
  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;
  }

  manjearErrores(error: any): never {
    if (error.code) {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new BadRequestException('Error desconocido, verifique los logs del servidor');
  }
}
