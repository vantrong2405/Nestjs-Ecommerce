import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { LoginBodyDTO, RegisterBodyDTO } from './auth.dto';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly haShingService: HashingService,
        private readonly prismaService: PrismaService,
        private readonly tokenService: TokenService
    ) { }
    async register(body: RegisterBodyDTO) {
        try {
            const hashedPassword = await this.haShingService.hash(body.password)
            const user = await this.prismaService.user.create({
                data: {
                    email: body.email,
                    password: hashedPassword,
                    name: body.name
                }
            })
            return user
        } catch (error) {
            console.log("🚀 ~ AuthService ~ register ~ error:", error)
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Email already exists')
            }
            throw error
        }
    }

    async login(body: LoginBodyDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Email not found')
        }

        const isPasswordMatch = await this.haShingService.compare(body.password, user.password)
        if (!isPasswordMatch) {
            throw new UnauthorizedException([
                {
                    field: 'password',
                    error: 'Password is incorrect'
                }
            ])
        }
        const tokens = await this.generateTokens({ userId: user.id })
        return tokens
    }

    async generateTokens(payload: { userId: number }) {
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenService.signAccessToken(payload),
            this.tokenService.signRefreshToken(payload)
        ])

        // khi giải mã thì nó sẽ trả về 1 object data người khi đăng ký lúc đầu là userId + thêm 2 field tự jwt tự tạo là exp và iat
        const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)

        await this.prismaService.refreshToken.create({
            data: {
                token: refreshToken,
                userId: payload.userId,
                expiresAt: new Date(decodedRefreshToken.exp * 1000)
            }
        })
        return { accessToken, refreshToken }
    }
}
