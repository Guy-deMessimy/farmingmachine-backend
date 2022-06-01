import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log('metadata', metadata);
    const val = parseInt(value, 10);
    const message = `Validation failed: ${val} is not an integer`;
    if (isNaN(val)) {
      throw new BadRequestException(message);
    }
    return val;
  }
}
