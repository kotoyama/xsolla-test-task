import { Body, Controller, Post } from '@nestjs/common'
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
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto)
  }
}
