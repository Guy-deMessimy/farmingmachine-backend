import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  // if array :
  //   @IsString({ each: true })
  //   readonly flavors: string[];
}
