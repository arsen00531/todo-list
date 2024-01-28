import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(createUserDto: CreateUserDto, hashPassword: string): Promise<User> {
        return await this.userRepository.save({
            ...createUserDto,
            password: hashPassword
        })
    }

    async findOneByName(name: string): Promise<User | undefined> {
        if(!name) return undefined
        return await this.userRepository.findOneBy({ name });
    }

    async findOneById(id: number): Promise<User | undefined> {
        if(!id) return undefined
        return await this.userRepository.findOneBy({ id });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }
}
