import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtPayload } from '../../app/auth/types'
import { UserRepository } from '../../app/auth/user.repository'

import { extractCookie } from '../utils'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        extractCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    })
  }

  async validate({ username }: JwtPayload) {
    const user = await this.userRepository.findOne({ username })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
