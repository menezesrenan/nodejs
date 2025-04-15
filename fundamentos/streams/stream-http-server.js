import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  // le o stream de entrada por completo, antes de enviar

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);

  // return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);
