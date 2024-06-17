import { ExecutionContext } from '@nestjs/common';
import { AccessLevel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

async function canActivate(
  prismaService: PrismaService,
  context: ExecutionContext,
  allowed: AccessLevel[],
) {
  const http = context.switchToHttp();
  const request = http.getRequest();
  if (request.user) {
    const { id } = request.user;

    return isRightSessionRole(prismaService, allowed, id);
  }

  return false;
}

async function isRightSessionRole(
  prismaService: PrismaService,
  allowed: AccessLevel[],
  id?: string,
) {
  if (!id) return false;

  const session = await prismaService.user.findUnique({
    where: { id },
  });
  console.log(session)
  if (allowed.some((permission) => permission === session.accessLevel)) {
    return true;
  }
  return false;
}

export { canActivate };
