import 'dotenv/config';
import * as joi from 'joi';

// -- Validación de las variables de entorno.
export interface Environment {
  PORT: number;
}

const schema = joi
  .object<Environment>({
    PORT: joi.number().default(8080),
  })
  .unknown(true);

// -- Validations.
const result: joi.ValidationResult<Environment> = schema.validate(process.env);

if (result.error) {
  const { error } = result;

  throw new Error(
    `[🫠] Problema al cargar las variables de entorno: ${error.message}`,
  );
}

// -- Exportación 🚀.
export const env: Environment = result.value;
