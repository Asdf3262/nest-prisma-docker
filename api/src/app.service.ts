import { Injectable } from '@nestjs/common';
import { UserInput } from './types';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(user: UserInput) {
    return this.prismaService.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password
      }
    })
  }
}
