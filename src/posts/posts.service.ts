import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    getPosts() {
        return 'All Posts';
    }

    createPost(body: any) {
        return body;
    }

    getPostId() {
        return 'Post with ID';
    }
}
