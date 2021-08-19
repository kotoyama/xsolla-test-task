import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtPayload } from '../types'
import { UserRepository } from '../user.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.Authentication,
      ]),
      secretOrKey: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
    })
  }

  async validate({ username }: JwtPayload) {
    const user = await this.userRepository.findOne({ username })
    if (!user) throw new UnauthorizedException()
    return user
  }
}
