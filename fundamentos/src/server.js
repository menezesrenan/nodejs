// const http = require('http');
// CommonJs => require
// ESModule => import/export node não suporta precisa add no package.json
import http from 'node:http';
import { json } from './middlewares/json.js';

// - Criar usuários
// - Listagem de usuários
// - Atualizar usuários
// - Deletar usuários

// - HTTP
// - Metodo HTTP
// - URL

// GET, POST, PUT, DELETE, PATCH
// GET => Buscar recurso no backend
// POST => Criar recurso no backend
// PUT => Atualizar recurso no backend
// DELETE => Deletar recurso no backend
// PATCH => Atualizar uma informação específica de um recurso no backend

// Exemplo Patch: Aceitar notificação de um recurso ou não usamos o Patch

// GET / users => buscando usuários do backend
// POST / users => criando usuários no backend

// Stateful - Stateless
// Stateful => Um sistema ou componente stateful mantém o estado entre interações. Ou seja, ele lembra os dados ou informações de interações anteriores e usa esses dados para influenciar o comportamento subsequente.
// Stateless => Um sistema ou componente stateless não mantém qualquer tipo de estado entre interações. Ou seja, ele não lembra dados ou variáveis de interações anteriores. Cada vez que o sistema recebe uma nova solicitação ou interação, ele a processa como se fosse a primeira vez, sem qualquer conhecimento sobre o que aconteceu antes.

// JSON == JavaScript Object Notation
// JSON é um formato de troca de dados leve e fácil de ler e escrever. STRINGS, NUMBERS, BOOLEAN, NULL, ARRAY, OBJECT
// JSON é um formato de troca de dados leve e fácil de ler e escrever. É baseado em texto e é independente de linguagem, o que significa que pode ser usado em diferentes linguagens de programação. O JSON é amplamente utilizado para transmitir dados entre um servidor e um cliente, especialmente em aplicações web.

// req => Requisição
// res => Resposta
// Cabeçalho => Header => Metadata

// HTTP STATUS CODE
// 200 => OK
// 201 => Created
// 204 => No Content
// 400 => Bad Request
// 401 => Unauthorized
// 403 => Forbidden
// 404 => Not Found
// 500 => Internal Server Error
// 503 => Service Unavailable
// 502 => Bad Gateway
// 301 => Moved Permanently
// 302 => Found
// 304 => Not Modified
// 307 => Temporary Redirect
// 308 => Permanent Redirect
// 100 => Continue

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
  // Middleware para ler o corpo da requisição

  if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users));
  }
  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });
    return res.writeHead(201).end('Criando usuários');
  }
  if (method === 'PUT' && url === '/users') {
    return res.end('Atualizando usuários');
  }
  if (method === 'DELETE' && url === '/users') {
    return res.end('Deletando usuários');
  }
  if (method === 'PATCH' && url === '/users') {
    return res.end('Atualizando uma informação específica de um usuário');
  }
  return res.writeHead(404).end('Not Found');
});

server.listen(3333);
