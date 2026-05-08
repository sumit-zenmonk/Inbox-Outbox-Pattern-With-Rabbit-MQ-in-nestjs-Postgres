import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserPreferenceDto } from "./create-user-preference.dto";
import { UserPreferenceRepository } from "src/infrastructure/repository/user.preference.repo";

@Injectable()
export class CreateUserPreferenceService {
    constructor(
        private readonly userPreferenceRepo: UserPreferenceRepository,
    ) { }

    async CreateUserPreference(body: CreateUserPreferenceDto) {
        //check if preference already exists using this user_uuid
        const isUserPreferenceExistsWithUserUuid = await this.userPreferenceRepo.findByUserUuid(body.user_uuid);
        if (isUserPreferenceExistsWithUserUuid.length) {
            throw new BadRequestException('User Preference Already Exists');
        }

        //create user preference in DB
        const userPreference = await this.userPreferenceRepo.createUserPreference(body);

        return {
            message: "User Preference Created Suceess",
            user_preference: {
                uuid: userPreference.uuid,
                user_uuid: userPreference.user_uuid,
                notification_preference: userPreference.notification_preference,
                theme_preference: userPreference.theme_preference,
                timeformat_preference: userPreference.timeformat_preference
            }
        }
    }
}