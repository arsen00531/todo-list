import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength, MinLength, NotContains } from "class-validator"

export class LoginUserDto {

    @ApiProperty({ example: 'arsen_tigr', description: 'Имя пользователя' })
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @NotContains(' ', { message: 'name should not contain any spaces' })
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '123451Ra', description: 'Пароль пользователя' })
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @NotContains(' ', { message: 'password should not contain any spaces' })
    @IsNotEmpty()
    password: string
}