import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./register-user.dto";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { OutboxRepository } from "src/infrastructure/repository/outbox.repo";
import { ExchangeTypeEnum } from "src/infrastructure/rabbit-mq/enum/rabbit-mq.enum";
import type { Request } from "express";

@Injectable()
export class RegisterUserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly outboxRepo: OutboxRepository,
    ) { }

    async registerUser(req: Request, body: RegisterUserDto) {
        //check if already exists using this email
        const isUserExistsWithEmail = await this.userRepo.findByEmail(body.email);
        if (isUserExistsWithEmail.length) {
            throw new BadRequestException('User Already Exists with this Email');
        }

        //register user in DB
        const RegisteredUser = await this.userRepo.register(body);

        const entry = {
            'event_type': ExchangeTypeEnum.DIRECT,
            'exchange_name': 'direct_exchange',
            'routing_key': 'user.registered',
            'message_payload': RegisteredUser,
            'header_payload': req.headers,
        }

        await this.outboxRepo.createEntry(entry);

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