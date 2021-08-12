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
    user.password = await this.hashPassword(password, user.salt)
    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      }
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt)
  }

  async validateUserPassword({ username, password }: AuthCredentialsDto) {
    const user = await this.findOne({ username })
    if (user && (await user.validatePassword(password))) {
      return user.username
    }
    return null
  }
}
