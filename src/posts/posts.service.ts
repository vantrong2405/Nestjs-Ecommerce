import { Injectable } from '@nestjs/common'

@Injectable()
export class PostsService {
  getPosts() {
    return 'All Posts'
  }

  createPost(body: any) {
    return body
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
