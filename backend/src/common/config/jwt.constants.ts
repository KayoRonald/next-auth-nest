import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants = {
  secret: 'zjP9h6ZI5LoSKCRj',
};

export const jwtOptions: JwtModuleOptions = {
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '5m' },
};
