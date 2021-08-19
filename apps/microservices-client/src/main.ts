import { NestFactory } from '@nestjs/core'
import { MicroservicesClientModule } from './microservices-client.module'

async function bootstrap() {
  const app = await NestFactory.create(MicroservicesClientModule)
  await app.listen(4000)
}
bootstrap()
