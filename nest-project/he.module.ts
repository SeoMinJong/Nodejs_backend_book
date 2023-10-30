import {Module} from "@nestjs/common";
import {HelloController} from "./he.controller";

@Module({
    controllers: [HelloController]
})
export class HelloModule {}