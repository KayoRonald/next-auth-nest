import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error' | 'beforeExit'
  >
  implements OnModuleInit
{
  private static instance: PrismaService;

  constructor() {
    super();
  }

  static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
      PrismaService.instance.$connect();
    }
    return PrismaService.instance;
  }

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
  // async onModuleDestroy() {
  //   await this.$disconnect();
  // }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
