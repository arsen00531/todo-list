import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class GetTodoesQueryDto {

    @ApiProperty({ example: '1', description: 'Уникальный id' })
    @Transform(({ value }) => Number.parseInt(value))
    @IsNotEmpty()
    id: number
}