import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class createTodoDto {

    @ApiProperty({ example: 'arsen_tigr', description: 'Имя пользователя' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: 'Похавать', description: 'Название списка задач' })
    @IsString()
    @IsNotEmpty()
    todoName: string

    @ApiProperty({ example: 'Открыть холодос и вмазать сыр с хлебом', description: 'Информация задачи' })
    @IsString()
    @IsNotEmpty()
    todoInfo: string
}