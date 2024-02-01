import { Body, Controller, Get, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.dto';
import { LoginUserDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: "Создание пользователя"})
    @ApiResponse({ status: 200, type: String, description: 'Возвращает access токен' })
    @UsePipes(new ValidationPipe())
    @Post('create')
    registration(@Res() response: Response, @Body() createUserDto: CreateUserDto) {
        this.authService.registration(response ,createUserDto)
    }

    @ApiOperation({ summary: "Логин пользователя"})
    @ApiResponse({ status: 200, type: String, description: 'Возвращает access токен' })
    @UsePipes(new ValidationPipe())
    @Post('login')
    loginUser(@Res() response: Response, @Body() loginUserDto: LoginUserDto) {
        this.authService.loginUser(response, loginUserDto)
    }

    @ApiOperation({ summary: "Получение access токена, когда истекает срок жизни"})
    @ApiResponse({ status: 200, type: String, description: 'Возвращает access токен' })
    @Get('tokens')
    getAccessToken(@Req() request: Request, @Res() response: Response) {
        return this.authService.getAccessToken(request, response)
    }
}
