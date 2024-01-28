import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TodoListEntity {

    @ApiProperty({ example: '1', description: 'Уникальный id' })
    @PrimaryGeneratedColumn({ name: 'todo_id' })
    id: number

    @ApiProperty({ example: 'Похавать', description: 'Название списка задач' })
    @Column({ name: 'todo_name' })
    todoName: string

    @ApiProperty({ example: 'Открыть холодос и вмазать сыр с хлебом', description: 'Информация задачи' })
    @Column({ name: 'todo_info' })
    todoInfo: string

    @ManyToOne(() => User, (user) => user.todoes)
    user: User
}