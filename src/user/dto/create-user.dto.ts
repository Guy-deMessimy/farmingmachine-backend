import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
