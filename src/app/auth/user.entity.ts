import {
  Column,
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { Role } from './types'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string

  @Column({ type: 'enum', array: true, enum: Role, default: [Role.CONSUMER] })
  roles: Role[]

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
