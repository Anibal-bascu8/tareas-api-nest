import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { UserRoleGuard } from './guards/user-role.guard';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {

    
  constructor(private authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRout( ) {
    
    return {
      ok: true,
      message: 'hola mundo, entraste a una ruta privada'
    }
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser)
  @UseGuards( AuthGuard(), UserRoleGuard )
  testingPrivateRout2(
    @GetUser() user: User
  ) {
    
    return {
      ok: true,
      message: 'hola mundo, entraste a una ruta privada'
    }
  }

  
  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  testingPrivateRout3(
    @GetUser() user: User
  ) {
    
    return {
      ok: true,
      message: 'hola mundo, entraste a una ruta privada'
    }
  }
}
