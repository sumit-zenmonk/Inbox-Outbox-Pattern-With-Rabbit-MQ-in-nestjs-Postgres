import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./register-user.dto";
import { UserRepository } from "src/infrastructure/repository/user.repo";

@Injectable()
export class RegisterUserService {
    constructor(
        private readonly userRepo: UserRepository,
    ) { }

    async registerUser(body: RegisterUserDto) {
        //check if already exists using this email
        const isUserExistsWithEmail = await this.userRepo.findByEmail(body.email);
        if (isUserExistsWithEmail.length) {
            throw new BadRequestException('User Already Exists with this Email');
        }

        //register user in DB
        const RegisteredUser = await this.userRepo.register(body);

        return {
            message: "User Registered Success",
            user: {
                name: RegisteredUser.name,
                email: RegisteredUser.email,
                uuid: RegisteredUser.uuid,
            }
        }
    }
}