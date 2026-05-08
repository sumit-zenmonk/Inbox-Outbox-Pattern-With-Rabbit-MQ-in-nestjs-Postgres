import { Injectable } from "@nestjs/common";
import { UserPreferenceEntity } from "src/domain/user/user-preference/user-preference.entity";
import { DataSource, Not, Repository } from "typeorm";

@Injectable()
export class UserPreferenceRepository extends Repository<UserPreferenceEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserPreferenceEntity, dataSource.createEntityManager());
    }

    async createUserPreference(body: Partial<UserPreferenceEntity>) {
        const user = this.create(body);
        return await this.save(user);
    }

    async findByUserUuid(user_uuid: string) {
        const user = await this.find({
            where: {
                user_uuid: user_uuid
            },
        });
        return user;
    }
}