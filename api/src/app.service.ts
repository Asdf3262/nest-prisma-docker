import { Injectable } from '@nestjs/common';
import { BaseResponse, LoginError, UserInput, UserLoginResponse } from './types';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  getHello(): string {
    return 'Hello from the Otherside!';
  }

  async createUser(user: UserInput) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(user.password, salt)
    const newuser = await this.prismaService.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPass
      }
    })
    return new BaseResponse(true, "Succesfully added user " + user.email)
  }

  async loginUser(user: UserInput) {
    const u = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
      }
    })
    const foundUser: UserInput = u.email ? { email: u.email, username: u.username } : undefined

    if (!foundUser) return new UserLoginResponse(foundUser, false, `User ${u.email} not found!`, LoginError.USER_NOT_FOUND)

    const isMatch = await bcrypt.compare(user.password, u.password)

    if (isMatch) {
      return new UserLoginResponse(foundUser, true, `User ${u.email} successfully logged in!`)
    }
    else {
      return new UserLoginResponse(foundUser, false, "Passwords don't match", LoginError.PASS_NO_MATCH)
    }
  }
}
