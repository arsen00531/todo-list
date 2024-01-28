import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if(!token) {
            throw new UnauthorizedException("User is not autorized")
        }
        try {
            const payload = await this.jwtService.verifyAsync(token)
            request['user'] = payload
        } catch {
            throw new UnauthorizedException("User is not autorized")
        }
        return true
    }

    extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}