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

  select(table) {
    const data = this.#database[table] ?? []; // se nao existir

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
}
