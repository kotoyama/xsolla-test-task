import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import * as helmet from 'helmet'

import { isProduction } from './config/typeorm.config'

import { AppModule } from './app.module'
import { TrimPipe, ValidationPipe } from './core/pipes'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    credentials: true,
    origin: isProduction
      ? `${process.env.PROD_CORS_ORIGIN}`
      : `${process.env.CORS_ORIGIN}`,
  })

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new TrimPipe())
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet())

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

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
