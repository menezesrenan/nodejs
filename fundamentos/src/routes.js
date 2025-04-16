import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import path from 'node:path';
import { buildRoutePath } from './utils/build-route-path.js';
// import { database } from './database.js'; // se usar o export default, não precisa usar chaves

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { search } = request.query; // { search: 'name' }

      const users = database.select(
        'users',
        search ? { name: search, email: search } : null
      ); // se não tiver search, retorna todos os usuarios

      return response.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { name, email } = request.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return response.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'), // : informação dinamica :id => id do usuario
    handler: (request, response) => {
      const { id } = request.params;
      const { name, email } = request.body;

      database.update('users', id, {
        name,
        email,
      });
      return response.writeHead(204).end(); // 204 No Content
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'), // : informação dinamica :id => id do usuario
    handler: (request, response) => {
      const { id } = request.params;

      database.delete('users', id);
      return response.writeHead(204).end(); // 204 No Content
    },
  },
];
