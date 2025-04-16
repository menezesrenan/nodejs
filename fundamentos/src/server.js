// const http = require('http');
// CommonJs => require
// ESModule => import/export node não suporta precisa add no package.json

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
import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';
// import { Database } from './database.js';
// import { randomUUID } from 'node:crypto'; // gera um id unico para cada usuario
// UUID (Universally Unique Identifier) é um padrão de identificação que fornece um identificador único para objetos ou entidades em sistemas distribuídos. Os UUIDs são amplamente utilizados em bancos de dados, sistemas de arquivos e protocolos de rede para garantir que cada entidade tenha um identificador exclusivo, mesmo quando criados em diferentes locais ou momentos.

// const database = new Database();

// const users = [];

// 3 formas do frontend enviar informações

// 1 e 2 - Ambos fica na url então não podemos enviar informações sensíveis

// 1 - Query Parameters: URL Stateful  => Filtros, paginação, não obrigatório
// 2 - Route Parameters: Identificação de recurso

// 3 - Request Body: Envio de informações de um formulário

// Exemplos

// 1 - http://localhost:3333/users?userId=1 (chave e valor e se adicionar & podemos adicionar mais parametros)
// 2 - GET http://localhost:3333/users/1 (id do usuario)
// 2 - DELETE http://localhost:3333/users/1

// 3 - POST http://localhost:3333/users (body)

// Edição e remoção de usuários

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
  // Middleware para ler o corpo da requisição

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path); // retorna um array com o primeiro elemento sendo a url e o segundo elemento sendo o id

    // console.log(routeParams.groups); // [Object: null prototype] { query: '?search=John' }

    // console.log(extractQueryParams(routeParams.groups.query)); // { search: 'John' }

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {}; // se não tiver query string, retorna um objeto vazio

    return route.handler(req, res);
  }
});

server.listen(3333);
