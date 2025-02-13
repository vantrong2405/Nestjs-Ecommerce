import { Injectable } from '@nestjs/common'
import envConfig from 'src/shared/config';
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) { }
  getPosts() {
    console.log(envConfig.ACCESS_TOKEN_EXPIRES_IN);
    return this.prismaService.post.findMany()
  }

  createPost(body: any) {
    const userId = 1
    return this.prismaService.post.create({
      data: {
        content: body.content,
        title: body.title,
        authorId: userId
      }
    })
  }

  getPostId(id: string) {
    return 'Post with ID : ' + id
  }

  updatePost(id: string, body: any) {
    return 'Post with ID : ' + id + ' has been updated, data post: ' + body
  }

  deletePost(id: string) {
    return 'Post with ID : ' + id + ' has been deleted'
  }
}
