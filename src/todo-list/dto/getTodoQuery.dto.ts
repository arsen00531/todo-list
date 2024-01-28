import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class GetTodoQueryDto {

    @ApiProperty({ example: '1', description: 'Уникальный id задачи' })
    @Transform(({ value }) => Number.parseInt(value))
    @IsNotEmpty()
    todoId: number
}