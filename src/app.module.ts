import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoListController } from './todo-list/todo-list.controller';
import { TodoListService } from './todo-list/todo-list.service';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoListEntity } from './todo-list/entities/todoList.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TodoListModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: Number(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [User, TodoListEntity],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
