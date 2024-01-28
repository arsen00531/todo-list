import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TodoListEntity } from 'src/todo-list/entities/todoList.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, TodoListEntity]),
        forwardRef(() => AuthModule)
    ],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
