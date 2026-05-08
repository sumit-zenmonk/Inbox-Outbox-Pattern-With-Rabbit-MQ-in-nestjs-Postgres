import { Module } from "@nestjs/common";
import { RegisterUserModule } from "./register-user/register-user.module";
import { RouterModule } from "@nestjs/core";

@Module({
    imports: [
        RegisterUserModule,
        RouterModule.register([
            {
                path: 'user',
                children: [
                    { path: '/', module: RegisterUserModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [UserModule],
})

export class UserModule { }