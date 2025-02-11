import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  getPost() {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postService.createPost(body);
  }

  @Get(':id')
  getPostId() {
    return this.postService.getPostId();
  }
}
