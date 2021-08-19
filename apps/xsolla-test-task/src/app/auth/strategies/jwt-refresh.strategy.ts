import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { JwtPayload } from '../types'
import { UserRepository } from '../user.repository'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.Refresh,
      ]),
      secretOrKey: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
    })
  }

  async validate(request, { username }: JwtPayload) {
    const refreshToken = request.cookies?.Refresh
    const user = await this.userRepository.getUserIfRefreshTokenMatches(
      refreshToken,
      username,
    )
    return user
  }
}
