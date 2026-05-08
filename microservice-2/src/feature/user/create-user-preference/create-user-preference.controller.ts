import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserPreferenceService } from "./create-user-preference.service";
import { CreateUserPreferenceDto } from "./create-user-preference.dto";

@Controller('/preference')
export class CreateUserPreferenceController {
    constructor(private readonly CreateUserPreferenceService: CreateUserPreferenceService) { }

    @Post()
    async CreateUserPreference(@Body() body: CreateUserPreferenceDto) {
        return this.CreateUserPreferenceService.CreateUserPreference(body);
    }
}