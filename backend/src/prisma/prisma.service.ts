import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      if (params.action == 'create' && params.model == 'User') {
        const user = params.args.data;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        params.args.data = user;
      } else if (params.action == 'update' && params.model == 'User') {
        const updateUserDto = params.args.data;
        const salt = bcrypt.genSaltSync(10);
        if (updateUserDto.password) {
          const hash = bcrypt.hashSync(updateUserDto.password, salt);
          updateUserDto.password = hash;
          params.args.data = updateUserDto;
        }
      }
      return next(params);
    });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
