import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client'
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { BaseResponse, UserInput, UserLoginResponse } from './types';
import { resolve } from 'path';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users/add')
  createUser(@Body() user: UserInput): Promise<BaseResponse> | BaseResponse {
    try {
      if(!user.email || !user.password) throw "400"
    } catch(er) { return new BaseResponse( false, `Bad Request`) }
    return this.appService.createUser(user)
  }
  
  @Post('users/login')
  async loginUser(@Body() user: UserInput): Promise<UserLoginResponse | BaseResponse>{
    try {
      if(!user.email || !user.password) throw "400"
    } catch(er) { return new BaseResponse( false, `Bad Request`) }
    return await this.appService.loginUser(user)
  }


  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
