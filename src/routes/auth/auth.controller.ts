import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBodyDTO, RegisterEntity } from './auth.dto';

@Controller('auth')
@SerializeOptions({ type: RegisterEntity })

export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
    async register(@Body() body: RegisterBodyDTO) {
        const result = await this.authService.register(body)
        return result
    }
}
