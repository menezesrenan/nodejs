import fastify from 'fastify';
import { knex } from './database';
import { randomUUID } from 'node:crypto';
import { env } from './env';

const app = fastify();

// GET, POST, PUT, DELETE, PATCH

// http://localhost:3333/hello

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .where('amount', 500)
    .select('*'); // seleciona todos os dados da tabela transactions

  // .select('*'); // seleciona todos os dados da tabela transactions

  // .insert({
  //   id: randomUUID(),
  //   title: 'transação de teste 1',
  //   amount: 500,
  // })
  // .returning('*'); // retorna todos os dados da transação que foi inserida

  return transactions;
});

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running on http://localhost:3333');
});

// como rodar .ts sem criar um .js, instalei o tsx e rodo utilizando npx tsx path/file.ts
// tsx só é recomendado para desenvolvimento, mas em produção é melhor compilar o .ts para .js
