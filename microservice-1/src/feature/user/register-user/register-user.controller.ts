import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserService } from "./register-user.service";
import { RegisterUserDto } from "./register-user.dto";

@Controller('/register')
export class RegisterUserController {
    constructor(private readonly registerUserService: RegisterUserService) { }

    @Post()
    async registerUser(@Body() body: RegisterUserDto) {
        return this.registerUserService.registerUser(body);
    }
}