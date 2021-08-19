import { SetMetadata } from '@nestjs/common'
import { Role } from '../types'

export const RolesAllowed = (...roles: Role[]) => SetMetadata('roles', roles)
