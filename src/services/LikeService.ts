import { prismaClient } from "../prisma/prisma";

export class LikeService {
  static create(postId: number, userId: number) {
    return prismaClient.likes.create({
      data: {
        postId,
        userId
      }
    });
  }

  static getLikeByKey(postId: number, userId: number) {
    return prismaClient.likes.findFirst({
      where: {
        postId,
        userId
      }
    })
  }

  static delete(postId: number, userId: number) {
    return prismaClient.likes.delete({
      where: {
        userId_postId: {
          postId,
          userId
        }
      }
    });
  }
}