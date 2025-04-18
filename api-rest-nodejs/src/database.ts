// ZOD
// import 'dotenv/config'; // Import dotenv to load environment variables
import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';

// temporario para não dar erro de importação
// Removi por usar agora ZOD
// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not defined in .env file');
// }

console.log(process.env.DATABASE_URL); // Log the DATABASE_URL to verify it's loaded correctly

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL, // Use the DATABASE_URL from the environment variables
  },
  useNullAsDefault: true, // SQLite requires this option to be set to true when using the 'sqlite' client
  migrations: {
    directory: './db/migrations',
    extension: 'ts',
  },
};

// This file is used to setup the database connection
export const knex = setupKnex(config);

// npx knex migrate:make create-documents cria uma pasta migrations com um arquivo de migração
// npx knex migrate:latest roda todas as migrações
