import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { JwtPayload } from './types'
import { AuthCredentialsDto } from './dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    )
    if (!username) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload: JwtPayload = { username }
    const accessToken = this.jwtService.sign(payload)
    return { accessToken }
  }
}
