import { ConflictException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from './user.entity'
import { AuthCredentialsDto } from './dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ username, password }: AuthCredentialsDto) {
    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashData(password, user.salt)
    user.refreshToken = null
    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      }
    }
  }

  private async hashData(data: string, salt: string) {
    return bcrypt.hash(data, salt)
  }

  async validateUserPassword({ username, password }: AuthCredentialsDto) {
    const user = await this.findOne({ username })
    if (user && (await user.validatePassword(password))) {
      return user.username
    }
    return null
  }

  async setCurrentRefreshToken(refreshToken: string, username: string) {
    const user = await this.findOne({ username })
    const hashedRefreshToken = await this.hashData(refreshToken, user.salt)
    await this.update(user, { refreshToken: hashedRefreshToken })
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.findOne({ username })
    if (user && user.refreshToken) {
      const isMatching = await bcrypt.compare(refreshToken, user.refreshToken)
      return isMatching ? user : null
    }
    return null
  }
}
