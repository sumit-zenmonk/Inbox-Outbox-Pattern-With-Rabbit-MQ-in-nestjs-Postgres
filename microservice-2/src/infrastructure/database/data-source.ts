//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

//Entities
import { OutboxEntity } from "src/domain/outbox/outbox.entity";
import { InboxEntity } from "src/domain/inbox/inbox.entity";
import { UserPreferenceEntity } from "src/domain/user/user-preference/user-preference.entity";

const options: DataSourceOptions = {
    type: process.env.DB_POSTGRES_TYPE as any,
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT as any,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    entities: [
        OutboxEntity, InboxEntity, UserPreferenceEntity
    ],
    synchronize: false,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export { dataSource, options };