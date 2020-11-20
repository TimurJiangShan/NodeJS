const http = require('http');

// server 也是一种 EventEmitter
const server = http.createServer(function(req, res) {
  if(req.url === '/')  {
    res.write('Hello World');
    res.end();
  }

  if(req.url === '/api/courses') {
    res.write(JSON.stringify([1,2,3]));
    res.end();
  }
});


server.listen(3000);



console.log('Listening on port 3000...');

