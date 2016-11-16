const fs = require('fs');
const path = require('path');
const http2 = require('http2');

http2.raw.createServer({}, function onRequest(request, response) {
  const filename = path.join(__dirname, 'assets', request.url);

  // Reading file from disk if it exists and is safe.
  if ((filename.indexOf(__dirname) === 0) && fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    response.writeHead(200);
    const fileStream = fs.createReadStream(filename);
    fileStream.pipe(response);
    fileStream.on('finish', response.end);
  } else {
    response.writeHead(404);
    response.end();
  }
}).listen(process.env.HTTP2_PORT || 8080);
