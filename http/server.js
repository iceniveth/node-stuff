const http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!'); //write a response to the client
  res.write(req.url);
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

console.log('app listening at http://localhost:8080')