import { Injectable } from '@nestjs/common'

@Injectable()
export class MicroservicesClientService {
  getHello(): string {
    return 'Hello World!'
  }
}
