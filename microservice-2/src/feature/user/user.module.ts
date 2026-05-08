import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { CreateUserPreferenceModule } from "./create-user-preference/create-user-preference.module";

@Module({
    imports: [
        CreateUserPreferenceModule,
        RouterModule.register([
            {
                path: 'user',
                children: [
                    { path: '/', module: CreateUserPreferenceModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [UserPreferenceModule],
})

export class UserPreferenceModule { }