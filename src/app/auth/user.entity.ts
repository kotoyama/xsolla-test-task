import {
  Column,
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  salt: string

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}