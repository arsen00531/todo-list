import { BadRequestException, Injectable } from '@nestjs/common';
import { createTodoDto } from './dto/createTodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListEntity } from './entities/todoList.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { GetTodoQueryDto } from './dto/getTodoQuery.dto';
import { GetTodoesQueryDto } from './dto/getTodoesQuery.dto';

@Injectable()
export class TodoListService {
    constructor(
        @InjectRepository(TodoListEntity)
        private readonly todoListRepository: Repository<TodoListEntity>,
        private readonly userService: UserService
    ) {}

    async createTodo(createTodoDto: createTodoDto) {
        const user = await this.userService.findOneByName(createTodoDto.name)
        if(!user) throw new BadRequestException("User was not found")

        return await this.todoListRepository.save({
            todoName: createTodoDto.todoName,
            todoInfo: createTodoDto.todoInfo,
            user: user
        })
    }

    async getOneTodoByName(getTodoQueryDto: GetTodoQueryDto) {
        const todo = await this.todoListRepository.findOneBy({ id: getTodoQueryDto.todoId })
        if(!todo) {
            return new BadRequestException("Todo was not found")
        }
        return todo
    }

    async getTodoes(getTodoesQueryDto: GetTodoesQueryDto) {
        const user = await this.userService.findOneById(getTodoesQueryDto.id)
        if(!user) throw new BadRequestException("User was not found")

        return await this.todoListRepository.find({ where: {
            user
        } })
    }
}
