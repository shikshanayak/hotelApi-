"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const pipes_1 = require("@nestjs/common/pipes");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new pipes_1.ValidationPipe({
        whitelist: true
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map