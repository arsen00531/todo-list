import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: "Получение всех пользователей"})
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(AuthGuard)
    @Get('all')
    findAll() {
        return this.userService.findAll()
    }
}
