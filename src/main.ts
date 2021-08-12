import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { TrimPipe } from './core/pipes/trim'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new TrimPipe())

  const options = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Xsolla School 2021 Test Task API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/swagger', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
