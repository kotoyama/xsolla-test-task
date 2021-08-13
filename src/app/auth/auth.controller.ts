import { Req, Get, Body, Controller, Post, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto'
import JwtAuthRefreshGuard from './guards/jwt-auth-refresh.guard'
import { UserRequest } from './types'

@Controller('auth')
@ApiTags('auth')
@ApiCreatedResponse()
@ApiBadRequestResponse()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiConflictResponse()
  @ApiOperation({ summary: 'Sign up' })
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/login')
  @ApiUnauthorizedResponse()
  @ApiOperation({ summary: 'Sign in' })
  signIn(@Req() request, @Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(request, authCredentialsDto)
  }

  @Get('/refresh')
  @UseGuards(JwtAuthRefreshGuard)
  @ApiUnauthorizedResponse()
  @ApiOperation({ summary: 'Refresh token' })
  refresh(@Req() request: UserRequest) {
    const accessTokenCookie = this.authService.getJwtAccessTokenCookie(
      request.user.username,
    )
    request.res.setHeader('Set-Cookie', accessTokenCookie)
    return { message: 'Access token refreshed.' }
  }
}
