import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.findOne(payload.userId);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException(
        'The authenticated user no longer exists',
      );
    }

    return user;
  }
}
