import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// enforce these validation rules for any route uses these CreateUserDto
export class CreateUserDto {
  @ApiProperty({ description: 'The name of a user.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The mail of a user.' })
  @IsString()
  readonly email: string;

  // if array :
  //   @IsString({ each: true })
  //   readonly flavors: string[];
}
