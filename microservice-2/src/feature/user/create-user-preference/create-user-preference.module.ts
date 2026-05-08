import { Module } from "@nestjs/common";
import { UserPreferenceRepository } from "src/infrastructure/repository/user.preference.repo";
import { CreateUserPreferenceController } from "./create-user-preference.controller";
import { CreateUserPreferenceService } from "./create-user-preference.service";

@Module({
    imports: [],
    controllers: [CreateUserPreferenceController],
    providers: [UserPreferenceRepository, CreateUserPreferenceService],
    exports: [CreateUserPreferenceModule],
})

export class CreateUserPreferenceModule { }