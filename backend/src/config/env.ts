import 'dotenv/config';
import * as joi from 'joi';

// -- Validación de las variables de entorno.
export interface Environment {
  // * -- Global.
  PORT: number;

  // * -- JWT.
  JWT_SECRET: string;

  // * -- Database.
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
}

const schema = joi
  .object<Environment>({
    // -- Global.
    PORT: joi.number().default(8080),

    // -- JWT.
    JWT_SECRET: joi.string().required(),

    // -- Database.
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.number().default(5432),
    DATABASE_NAME: joi.string().required(),
    DATABASE_USER: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
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
