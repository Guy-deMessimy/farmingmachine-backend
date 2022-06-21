import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'The title of a post.' })
  @IsString()
  readonly title: string;
  @ApiProperty({ description: 'The description of a post.' })
  @IsString()
  readonly content?: string;
  @ApiProperty({ description: 'The description of a post.' })
  @IsString()
  readonly authorEmail: string;
}
