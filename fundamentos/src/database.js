// { "users": [...]}

import fs from 'node:fs/promises';

// _dirname nao utiliza no module

const databasePath = new URL('db.json', import.meta.url); // tipo um cd..

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist(); // se não existir o arquivo, cria um novo vazio
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database)); // esta sendo criado o db.json na pasta onde está o database.js
  }

  select(table, search) {
    let data = this.#database[table] ?? []; // se nao existir

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          // Object.entries converte em um objeto  { name: "fulano" , email: "fulano@email.com" } => [ ['name', 'fulano'],['email' , 'fulano@email.com']] e .some verifica se existe algum valor igual no array
          return row[key].toLowerCase().includes(value.toLowerCase()); // verifica se o valor existe no array
        });
      });
    }
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      // ele retorna -1 se não encontrar o id
      this.#database[table][rowIndex] = { id, ...data }; // atualiza o objeto com mesmo id
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      // ele retorna -1 se não encontrar o id
      this.#database[table].splice(rowIndex, 1); // splice para remover o elemento
      this.#persist();
    }
  }
}
