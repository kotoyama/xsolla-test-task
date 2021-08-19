import { Module } from '@nestjs/common'
import { MicroservicesClientController } from './microservices-client.controller'
import { MicroservicesClientService } from './microservices-client.service'

@Module({
  imports: [],
  controllers: [MicroservicesClientController],
  providers: [MicroservicesClientService],
})
export class MicroservicesClientModule {}
