import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { LoginUserDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly jwtService: JwtService,
        private readonly usersService: UserService
    ) {}

    async registration(response: Response ,createUserDto: CreateUserDto) {
        const candidate = await this.usersService.findOneByName(createUserDto.name)
        if(candidate) {
            return response.send(new BadRequestException('User already exists'))
        }

        const hashPassword = await hash(createUserDto.password, 5)
        const user = await this.usersService.createUser(createUserDto, hashPassword)

        const tokens = await this.issueTokenPair(user.id, user.name)
        response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })

        response.send(tokens.accessToken);
    }

    async loginUser(response: Response, loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto.name, loginUserDto.password)
        if(!user) {
            return response.send(new UnauthorizedException('User does not exists or password is invalid'))
        }
        const tokens = await this.issueTokenPair(user.id, user.name)
        response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })

        response.send(tokens.accessToken)
    }

    async getAccessToken(request: Request, response: Response) {
        const refreshToken = request.cookies.refreshToken
        const payload = await this.jwtService.verifyAsync(refreshToken)
        if(!refreshToken || !payload) {
            return new UnauthorizedException("User is not login")
        }
        
        const newAccessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '24h'
        })
        response.send({
            accessToken: newAccessToken
        })
    }

    async validateUser(name: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOneByName(name);
        if (user && compare(password, user.password)) {
          return user
        }
        return null;
    }

    async issueTokenPair(id: number, name: string) {
        const payload = { id, name }

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '15d'
        })

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '24h'
        })

        return { accessToken, refreshToken }
    }
}
