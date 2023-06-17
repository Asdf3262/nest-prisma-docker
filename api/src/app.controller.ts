import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client'
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserInput } from './types';

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

  @Post('users')
  async createUser(@Body() user: UserInput): Promise<User> {
    return await this.appService.createUser(user)
  }


  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
