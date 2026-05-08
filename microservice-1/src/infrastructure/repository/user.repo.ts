import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/user/user.entity";
import { DataSource, Not, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async register(body: Partial<UserEntity>) {
        const user = this.create(body);
        return await this.save(user);
    }

    async findByEmail(email: string) {
        const user = await this.find({
            where: {
                email: email
            },
        });
        return user;
    }
}