// buffer é um módulo do Node.js que fornece uma maneira de trabalhar com dados binários
// buffer é uma classe que representa um bloco de memória alocada, ele le e escreve dados binários da memória

const buf = Buffer.from('Hello World');

console.log(buf);
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>

console.log(buf.toJSON());

// {
//   type: 'Buffer',
//   data: [
//      72, 101, 108, 108,
//     111,  32,  87, 111,
//     114, 108, 100
//   ]
// }
