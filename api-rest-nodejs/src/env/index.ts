// utilizar o ZOD
import 'dotenv/config'; // Import dotenv to load environment variables
import { z } from 'zod';

// Ferramentas parecidas ao ZOD: Joi, Yup, Superstruct
// Zod é uma biblioteca de validação de dados e esquemas para TypeScript e JavaScript
// process.env é um {}

//enum é um tipo de dado que pode ter um conjunto fixo de valores e escolher um deles

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), // se não existir, ele vai usar o valor padrão dev
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333), // se não existir, ele vai usar o valor padrão 3333
});

// ele vai validar se a variável DATABASE_URL existe e se é uma string
// se não existir, ele vai mandar uma mensagem de erro
// export const env = envSchema.parse(process.env);

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data; // se der erro, ele não vai continuar o código
