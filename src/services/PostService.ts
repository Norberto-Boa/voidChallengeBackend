import { prismaClient } from "../prisma/prisma";
import { PostDTO } from '../@types/PostDTO';

export class PostService {
  static async create(user: number, { caption, image }: PostDTO) {
    return await prismaClient.post.create({
      data: {
        caption,
        image,
        userId: user,
      }
    })
  }

  static async getPosts() {
    return await prismaClient.post.findMany({
      include: {
        Likes: {
          select: {
            userId: true
          }
        },
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
  }

  static async getPostById(id: number) {
    return await prismaClient.post.findFirst({
      where: {
        id
      },
      include: {
        _count: {
          select: {
            Likes: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  static async update(postId: number, { caption }: PostDTO) {
    return await prismaClient.post.update({
      where: {
        id: postId
      },
      data: {
        caption
      }
    });
  }

  static async delete(postId: number) {
    return await prismaClient.post.delete({
      where: {
        id: postId
      }
    });
  }
}