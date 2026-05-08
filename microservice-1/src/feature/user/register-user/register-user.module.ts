import { Module } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { RegisterUserController } from "./register-user.controller";
import { RegisterUserService } from "./register-user.service";
import { OutboxRepository } from "src/infrastructure/repository/outbox.repo";

@Module({
    imports: [],
    controllers: [RegisterUserController],
    providers: [UserRepository, OutboxRepository, RegisterUserService],
    exports: [RegisterUserModule],
})

export class RegisterUserModule { }