import {
  Injectable,
  OnModuleInit,
  INestApplication,
  Logger,
} from '@nestjs/common';
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
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
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
    this.$on('error', ({ message }) => {
      this.logger.error(message);
    });
    this.$on('warn', ({ message }) => {
      this.logger.warn(message);
    });
    this.$on('info', ({ message }) => {
      this.logger.debug(message);
    });
    this.$on('query', ({ query, params }) => {
      this.logger.log(`${query}; ${params}`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
