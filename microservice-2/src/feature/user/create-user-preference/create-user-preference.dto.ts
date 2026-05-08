import { IsEnum, IsOptional, IsUUID, } from "class-validator";
import { NotificationPreference, ThemePreference, TimeFormatPreference } from "src/domain/user/user-preference/user-preference.enum";


export class CreateUserPreferenceDto {
    @IsUUID()
    user_uuid: string;

    @IsOptional()
    @IsEnum(ThemePreference)
    theme_preference?: ThemePreference;

    @IsOptional()
    @IsEnum(NotificationPreference)
    notification_preference?: NotificationPreference;

    @IsOptional()
    @IsEnum(TimeFormatPreference)
    timeformat_preference?: TimeFormatPreference;
}