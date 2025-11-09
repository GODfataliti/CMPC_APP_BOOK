import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherDTO {
  @IsNotEmpty({ message: 'Publisher name is required' })
  @IsString({ message: 'Publisher name must be a string' })
  name: string;
}
