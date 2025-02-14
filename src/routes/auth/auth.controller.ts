import { Body, Controller, Post, SerializeOptions, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO, LoginEntity, RefreshTokenBodyDTO, RegisterBodyDTO, RegisterEntity } from './auth.dto';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@Controller('auth')


export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @SerializeOptions({ type: RegisterEntity })
    @Post('register')
    async register(@Body() body: RegisterBodyDTO) {
        return await this.authService.register(body)
    }

    @SerializeOptions({ type: LoginEntity })
    @Post('login')
    async login(@Body() body: LoginBodyDTO) {
        return await this.authService.login(body)
    }

    @UseGuards(AccessTokenGuard)
    @Post('refresh-token')
    async refreshToken(@Body() body: RefreshTokenBodyDTO) {
        return await this.authService.refreshToken(body.refreshToken)
    }
}
