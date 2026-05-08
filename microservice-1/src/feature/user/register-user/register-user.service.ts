import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./register-user.dto";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { OutboxRepository } from "src/infrastructure/repository/outbox.repo";
import { ExchangeTypeEnum } from "src/infrastructure/rabbit-mq/enum/rabbit-mq.enum";
import type { Request } from "express";
import { DataSource } from "typeorm";
import { UserEntity } from "src/domain/user/user.entity";
import { OutboxEntity } from "src/domain/outbox/outbox.entity";

@Injectable()
export class RegisterUserService {
    constructor(
        private readonly dataSource: DataSource,
    ) { }

    async registerUser(req: Request, body: RegisterUserDto) {
        return await this.dataSource.transaction(async (manager) => {
            const userRepo = manager.getRepository(UserEntity);
            const outboxRepo = manager.getRepository(OutboxEntity);

            //check if already exists using this email
            const existingUser = await userRepo.findOne({ where: { email: body.email } });
            if (existingUser) {
                throw new BadRequestException("User Already Exists with this Email");
            }

            //register user in DB
            const registeredUser = userRepo.create(body);
            await userRepo.save(registeredUser);

            // create outbox entry
            const outboxEntry = outboxRepo.create({
                event_type: ExchangeTypeEnum.DIRECT,
                exchange_name: "direct_exchange",
                routing_key: "user.registered",
                message_payload: registeredUser,
                header_payload: req.headers,
            });
            await outboxRepo.save(outboxEntry);

            return {
                message: "User Registered Success",
                user: {
                    name: registeredUser.name,
                    email: registeredUser.email,
                    uuid: registeredUser.uuid,
                }
            };
        });
    }
}