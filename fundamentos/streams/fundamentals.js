// Streams no Node.js
// Streams são uma abstração para trabalhar com dados que estão sendo transferidos de forma contínua.
// Eles permitem que você leia ou escreva dados em partes, em vez de carregar tudo na memória de uma só vez. Isso é especialmente útil para lidar com grandes volumes de dados, como arquivos, redes ou bancos de dados.

// Netflix e Spotify => writable

// Upload de arquivos => readable
// 1gb = 1.000.000 linhas
// POST /upload import.csv

// 10mb/s => 10.000 linhas/s

// process.stdin.pipe(process.stdout);

import { Readable, Transform, Writable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

// chunk é o pedaço de dado que está sendo lido
// encoding é a codificação do dado
// callback é uma função que deve ser chamada quando o dado for lido

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * 10;
    console.log(result);
    callback();
  }
}

new OneToHundredStream() // readable
  .pipe(new InverseNumberStream()) // transform
  .pipe(new MultiplyByTenStream()); // writable
