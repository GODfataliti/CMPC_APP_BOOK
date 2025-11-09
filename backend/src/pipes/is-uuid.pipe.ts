import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class IsUUIDPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (metadata.type !== 'param') {
      return value;
    }

    // console.log('Validating UUID for value:', value);
    if (!isUUID(value)) {
      throw new BadRequestException(
        'El ID proporcionado no es un identificador UUID válido.',
      );
    }

    return value;
  }
}
