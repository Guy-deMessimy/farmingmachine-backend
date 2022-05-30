import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// returning types of create-user.dto, mark them as optionnal and inherits all validation rules

export class UpdateUserDto extends PartialType(CreateUserDto) {}
