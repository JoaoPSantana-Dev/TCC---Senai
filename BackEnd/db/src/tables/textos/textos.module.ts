import { Module } from "@nestjs/common";
import { TextosController } from "./textos.controller";
import { TextosService } from "./textos.service";

@Module({
    controllers: [TextosController],
    providers: [TextosService]
})
export class TextosModule{}