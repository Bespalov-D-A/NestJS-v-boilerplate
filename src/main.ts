import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api');

    const config  = new DocumentBuilder()
    .setTitle('Ulbi tv course backend')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('ULBI BACKEND')
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api', app, document)
    

    await app.listen(PORT, () => console.log('Server is starting'))
}

start();
