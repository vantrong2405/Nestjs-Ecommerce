import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { RegisterBodyDTO } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly haShingService: HashingService, private readonly prismaService: PrismaService) { }
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
}
