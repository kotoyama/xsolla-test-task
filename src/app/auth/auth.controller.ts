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

import { ValidationPipe } from '../../core/pipes'

@Controller('auth')
@ApiTags('auth')
@ApiCreatedResponse()
@ApiBadRequestResponse()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiConflictResponse()
  @ApiOperation({ summary: 'Sign up' })
  signUp(@Body(new ValidationPipe()) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/login')
  @ApiUnauthorizedResponse()
  @ApiOperation({ summary: 'Sign in' })
  signIn(@Body(new ValidationPipe()) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto)
  }
}
