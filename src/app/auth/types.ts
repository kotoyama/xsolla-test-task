/* eslint-disable import/no-extraneous-dependencies */
import { Request } from 'express'
import { User } from './user.entity'

export interface JwtPayload {
  username: string
}

export interface UserRequest extends Request {
  user: User
}
