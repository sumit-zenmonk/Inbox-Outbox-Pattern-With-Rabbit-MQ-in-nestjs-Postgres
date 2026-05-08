import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './infrastructure/rabbit-mq/rabbit-mq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './infrastructure/database/data-source';
import { UserPreferenceModule } from './feature/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...dataSource.options,
      retryAttempts: 10,
      retryDelay: 5000
    }),

    // Modules
    RabbitMQModule,
    UserPreferenceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }