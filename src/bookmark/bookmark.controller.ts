import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto/create.bookmark.dto';
import { EditBookmarkDTO } from './dto/edit.bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private service: BookmarkService) {}

  @Post('create')
  createBookmark(
    @Body() body: CreateBookmarkDTO,
  ) {
    return this.service.createBookmark(body);
  }
  @Patch('edit')
  editBookmark(
    @Query('userId') userId: number,
    @Query('id') id: number,
    @Body() body: EditBookmarkDTO,
  ) {
    
    return this.service.editBookmark(
      userId,
      id,
      body,
    );
  }
}
