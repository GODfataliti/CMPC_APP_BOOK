import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePublisherDTO {
  @IsNotEmpty({ message: 'Publisher name is required' })
  @IsString({ message: 'Publisher name must be a string' })
  name: string;

  /*
    @dev-note:
    Este DTO es el mismo que el CreatePublisherDTO, ya que por ahora
    solo se puede actualizar el nombre del publisher.

    Pero si en el futuro se agregan más campos al modelo de Publisher,
    este DTO puede ser modificado para incluir solo los campos que se
    pueden actualizar, sin afectar al CreatePublisherDTO.
  */
}
