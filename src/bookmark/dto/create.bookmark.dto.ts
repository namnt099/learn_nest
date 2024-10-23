import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDTO {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description: string | undefined;
  @IsString()
  link: string ;
  @IsNumber()
  userId: number;
}
