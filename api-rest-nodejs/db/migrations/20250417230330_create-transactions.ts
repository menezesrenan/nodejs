import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table.text('title').notNullable(); // não pode ser nulo ou vazio
    table.decimal('amount', 10, 2).notNullable(); // valor com 10 dígitos no total e 2 dígitos depois da vírgula
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable(); // data e hora de criação
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions');
  // Se der erro, pode ser que a tabela não exista
}

// caso suba algo no banco de dados e não foi enviado para produção ou para outra pessoa do outro time, npm run knex -- migrate:rollback
// para voltar a migração, ou seja, ele vai desfazer a migração
// e depois npm run knex -- migrate:latest para rodar a migração novamente
