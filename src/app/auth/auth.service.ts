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

  getJwtAccessTokenCookie(username: string) {
    const payload: JwtPayload = { username }
    const accessToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`,
    })
    return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`
  }

  getJwtRefreshTokenCookie(username: string) {
    const payload: JwtPayload = { username }
    const refreshToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`,
    })
    const cookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`
    return {
      cookie,
      refreshToken,
    }
  }

  async signIn(request, authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    )

    if (!username) throw new UnauthorizedException('Invalid credentials')

    const accessTokenCookie = this.getJwtAccessTokenCookie(username)
    const { cookie: refreshTokenCookie, refreshToken } =
      this.getJwtRefreshTokenCookie(username)

    await this.userRepository.setCurrentRefreshToken(refreshToken, username)
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])

    return { message: `Successfully logged in as ${username}.` }
  }
}
