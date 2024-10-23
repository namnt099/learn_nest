import {
  Delete,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileDTO } from './dto/profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  async getProfile(req: ProfileDTO) {
    const user =
      await this.prismaService.user.findUnique({
        where: {
          email: req.email,
        },
        select: {
          id: true,
          email: true,
          lastName: true,
          firstName: true,
          bookmarks: true,
        },
      });
    if (!user) {
      throw new NotFoundException(
        'No user available',
      );
    }

    return user;
  }
  async updateProfile(
    id: number,
    req: ProfileDTO,
  ) {
    const user =
      await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });
    if (!user) {
      throw new NotFoundException(
        'No user available',
      );
    }
    const updateUser =
      await this.prismaService.user.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          bookmarks: true,
        },
      });

    return updateUser;
  }
  async getAllUser() {
    const users =
      this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          bookmarks: true,
        },
      });
    return users;
  }
}
