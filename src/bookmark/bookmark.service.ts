import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDTO } from './dto/create.bookmark.dto';
import { EditBookmarkDTO } from './dto/edit.bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  async createBookmark(data: CreateBookmarkDTO) {
    const bookmark =
      await this.prismaService.bookmark.create({
        data: {
          title: data.title,
          description: data.description,
          link: data.link,
          userId: data.userId,
        },
      });
    return bookmark;
  }
  async editBookmark(
    userId: number,
    bookmarId: number,
    data: EditBookmarkDTO,
  ) {
    const bookmark =
      await this.prismaService.bookmark.findUnique(
        {
          where: {
            id: Number(bookmarId),
          },
        },
      );

    // check if user owns the bookmark
    console.log(bookmark.userId);
    console.log(userId);
    if (!bookmark || bookmark.userId !== Number(userId))
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prismaService.bookmark.update({
      where: {
        id: Number(bookmarId),
      },
      data: {
        ...data,
      },
    });
  }
}
