import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashingService {
    hash(value: string) {
        return hash(value, 10);
    }
    compare(value: string, hash: string) {
        return compare(value, hash);
    }
}
