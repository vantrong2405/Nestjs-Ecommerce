import { plainToInstance } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

config({
    path: '.env'
})
if (!fs.existsSync(path.resolve('.env'))) {
    console.log('Không tìm thấy file .env')
    process.exit(1)
}

class ConfigSchema {
    @IsString()
    DATABASE_URL: string
    @IsString()
    ACCESS_TOKEN_SECRET: string
    @IsString()
    ACCESS_TOKEN_EXPIRES_IN: string
    @IsString()
    REFRESH_TOKEN_SECRET: string
    @IsString()
    REFRESH_TOKEN_EXPIRES_IN: string
    @IsString()
    PORT: number
}

const configServer = plainToInstance(ConfigSchema, process.env)
const e = validateSync(configServer)
if (e.length > 0) {
    console.log('Các giá trị khai báo trong file .env không hợp lệ');
    const errors = e.map((error) => {
        return {
            property: error.property,
            constraints: error.constraints,
            value: error.value
        }
    })
    throw errors
}

console.log("🚀 ~ e:", configServer)

const envConfig = configServer
export default envConfig
