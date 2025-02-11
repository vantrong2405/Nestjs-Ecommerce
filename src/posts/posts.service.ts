import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getPosts() {
    return 'All Posts';
  }
}
