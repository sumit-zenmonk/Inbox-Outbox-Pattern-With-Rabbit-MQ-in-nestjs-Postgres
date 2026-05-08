import { Module } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { RegisterUserController } from "./register-user.controller";
import { RegisterUserService } from "./register-user.service";

@Module({
    imports: [],
    controllers: [RegisterUserController],
    providers: [UserRepository, RegisterUserService],
    exports: [RegisterUserModule],
})

export class RegisterUserModule { }