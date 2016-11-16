const http2 = require('http2');
const onFinished = require('on-finished');

const numberOfRequestsToDo = 20;
let numberOfRequestsCompleted = 0;

for (let i = 0; i < numberOfRequestsToDo; i += 1) {
  let request = http2.raw.get(`http://localhost:${process.env.HTTP2_PORT || 8080}/index.html`);
  // Receiving the response
  request.on('response', function (response) {
    onFinished(response, function (err, res) {
      console.log('ON-FINISHED');
    });
    response.pipe(process.stdout);
    response.on('end', finish);
  });
}

// Quitting when all requests completed
function finish () {
  numberOfRequestsCompleted += 1;
  if (numberOfRequestsCompleted === numberOfRequestsToDo) {
    process.exit();
  }
}
