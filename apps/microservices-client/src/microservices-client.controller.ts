import { Controller, Get } from '@nestjs/common'
import { MicroservicesClientService } from './microservices-client.service'

@Controller()
export class MicroservicesClientController {
  constructor(
    private readonly microservicesClientService: MicroservicesClientService,
  ) {}

  @Get()
  getHello(): string {
    return this.microservicesClientService.getHello()
  }
}
