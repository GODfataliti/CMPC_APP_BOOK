import joi from 'joi';

const schema = joi
  .object({
    VITE_VERSION: joi.string().default('1.2025.11.06.1'),
    VITE_API_URL: joi.string().required(),
  })
  .unknown(true);

const result = schema.validate({
  VITE_VERSION: import.meta.env.VITE_VERSION,
  VITE_API_URL: import.meta.env.VITE_API_URL,
})
const err = result.error;
const value = result.value;

if (err)
  throw new Error(`⚠️  Problemas al cargar las variables de entorno: ${err.message}`);

export interface ENVIRONMENT {
  VITE_VERSION: string;
  VITE_API_URL: string;
}

export const ENV = {
  VITE_VERSION: value.VITE_VERSION,
  VITE_API_URL: value.VITE_API_URL,
};

export const VITE_VERSION = value.VITE_VERSION;
export const VITE_API_URL = value.VITE_API_URL;
