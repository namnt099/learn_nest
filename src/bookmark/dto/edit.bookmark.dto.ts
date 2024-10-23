import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditBookmarkDTO {
  @IsString()
  @IsOptional()
  title: string | undefined;
  @IsString()
  @IsOptional()
  description: string | undefined;
  @IsString()
  @IsOptional()
  link: string | undefined;
}
