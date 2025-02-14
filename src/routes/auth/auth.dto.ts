import { Exclude, Expose } from "class-transformer"
import { IsString } from "class-validator"

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

export class RegisterEntity {
    id: number
    email: string
    name: string
    @Exclude() password: string
    createdAt: Date
    updatedAt: Date

    // Thêm trường vào dữ liệu trả về
    @Expose()
    fullName() {
        return this.name + ' - ' + this.email
    }

    constructor(partial: Partial<RegisterEntity>) {
        Object.assign(this, partial);
    }
}