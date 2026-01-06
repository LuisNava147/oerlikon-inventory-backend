import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';
import { Res } from '@nestjs/common';
import { Cookies } from './decorators/cookie.decorator';
import { TOKEN_NAME } from './constants/jwt.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/:id')
  registerUser( @Body() createUserDto: CreateUserDto, @Param("id") id:string) {
   
      return this.authService.registerUser(id, createUserDto)
    
  }

  @Post('login')
  async login(@Body()loginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response, @Cookies() cookies: any){
    const token = await this.authService.loginUser(loginUserDto)
    let expireDate = new Date()
    expireDate.setHours(expireDate.getHours()+8)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: expireDate,
      maxAge: 1000 * 60 * 60 *8
    })
    return token;
  }
}
