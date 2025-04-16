export function extractQueryParams(url) {
  const queryString = url.split('?')[1]; // ?id=1&name=Lucas
  const queryParams = new URLSearchParams(queryString); // id=1&name=Lucas
  const params = Object.fromEntries(queryParams); // { id: '1', name: 'Lucas' }

  return params;
}

// outra forma de fazer

// export function extractQueryParams(query) {
// return query
//   .substring(1) // remove o ?
//   .split('&') // separa os parametros
//   .reduce((queryParams, param) => {
//     const [key, value] = param.split('='); // separa o key e value
//     queryParams[key] = value; // decodifica o valor
//     return queryParams;
//   }, {}); // retorna um objeto com os parametros
// }
