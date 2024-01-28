import { ApiProperty } from "@nestjs/swagger";
import { TodoListEntity } from "src/todo-list/entities/todoList.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {

    @ApiProperty({ example: '1', description: 'Уникальный id' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'arsen_tigr', description: 'Имя пользователя' })
    @Column()
    name: string

    @ApiProperty({ example: '123451Ra', description: 'Пароль пользователя' })
    @Column()
    password: string

    @OneToMany(() => TodoListEntity, (todo) => todo)
    @JoinColumn({
        name: 'todo_id',
        referencedColumnName: 'todo_id'
    })
    todoes: TodoListEntity[]
}