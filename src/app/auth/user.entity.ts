import {
  Column,
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'

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

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
