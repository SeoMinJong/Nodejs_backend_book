import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./he.module";

async function bootstrap() {
    const app = await NestFactory.create(HelloModule);

    await app.listen(3000, () => {console.log("server start!")});
}

bootstrap();