import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configuración de la documentación
  const config = new DocumentBuilder()
    .setTitle('API de Usuarios ADSO')
    .setDescription('Documentación interactiva para el CRUD de usuarios')
    .setVersion('1.0')
    .addTag('users') // Permite agrupar los endpoints bajo esta etiqueta [1]
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // Establece la ruta donde se verá la documentación (ej. http://localhost:3000/api)
  SwaggerModule.setup('api', app, document); 


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
