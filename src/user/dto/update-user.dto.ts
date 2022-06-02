import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// returning types of create-user.dto, mark them as optionnal and inherits all validation rules
// import PartialType from swagger instead of '@nestjs/mapped-types' to feed openApi request parameter

export class UpdateUserDto extends PartialType(CreateUserDto) {}
