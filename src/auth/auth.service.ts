import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import authConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
  ) {}

  sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions,
  ): string {
    return jwt.sign(payload, secretOrPrivateKey, options);
  }

  login(user: User) {
    const payload = { ...user };

    return this.sign(payload, this.config.jwtSecret, {
      expiresIn: '30d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.config.jwtSecret) as (jwt.JwtPayload | string) &
        User;
      const { id, email } = payload;

      return {
        id: id,
        email: email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
