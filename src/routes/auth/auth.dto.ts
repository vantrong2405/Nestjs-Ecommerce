import { Exclude, Type } from "class-transformer"
import { IsString } from "class-validator"
import { SuccessResDTO } from "src/shared/shared.dto"

export class LoginBodyDTO {
    @IsString()
    email: string

    @IsString()
    password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {

    @IsString()
    name: string

    @IsString()
    confirmPassword: string
}

class RegisterData {
    id: number
    email: string
    name: string
    @Exclude() password: string
    createdAt: Date
    updatedAt: Date

    constructor(partial: Partial<RegisterData>) {
        Object.assign(this, partial);
    }
}

export class RegisterEntity extends SuccessResDTO {
    @Type(() => RegisterData)
    data: RegisterData
}