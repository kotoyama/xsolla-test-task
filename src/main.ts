import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const options = new DocumentBuilder()
    .setTitle('Xsolla School 2021 Test Task API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/swagger', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
