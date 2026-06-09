import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppService } from './app.service';
import { jwtConstants } from './data-source';
import { User } from './user';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authservice: AppService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.authservice.validateUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
