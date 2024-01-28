import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTodoDto } from './dto/createTodo.dto';
import { TodoListService } from './todo-list.service';
import { GetTodoQueryDto } from './dto/getTodoQuery.dto';
import { GetTodoesQueryDto } from './dto/getTodoesQuery.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TodoListEntity } from './entities/todoList.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('todo-list')
export class TodoListController {
    constructor(private readonly todoListService: TodoListService) {}

    @ApiOperation({ summary: "Создание Задачи"})
    @ApiResponse({ status: 200, type: TodoListEntity, description: 'Возвращает сущность созданной задачи' })
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    @Post('create')
    createTodo(@Body() createTodoDto: createTodoDto) {
        return this.todoListService.createTodo(createTodoDto)
    }

    @ApiOperation({ summary: "Получение отдельной задачи"})
    @ApiResponse({ status: 200, type: TodoListEntity, description: 'Возвращает сущность искомой задачи по id' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuard)
    @Get('get-one')
    getTodo(@Query() getTodoQueryDto: GetTodoQueryDto) {
        return this.todoListService.getOneTodoByName(getTodoQueryDto)
    }

    @ApiOperation({ summary: "Получение всех задач конкретного пользователя"})
    @ApiResponse({ status: 200, type: [TodoListEntity], description: 'Возвращает сущности всех задач пользователя' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuard)
    @Get('get-all')
    getTodoes(@Query() getTodoesQueryDto: GetTodoesQueryDto) {
        return this.todoListService.getTodoes(getTodoesQueryDto)
    }
}
