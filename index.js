const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const processHelloRequest  = (name = 'world') => {
    return [ 200, `Hello, ${name}!` ]
}

const processGoodbyeRequest  = (name) => {
    return [ 200, `Goodbye${(name) ? `, ${name}!` : '.'}` ]
}

const server = http.createServer((req, res) => {

    const reqURL = new URL(`http://${hostname}:${port}${req.url}`);

    const name = reqURL.searchParams.get('name')
    let statusCode, response
    
    ;[statusCode, response] = [404, 'Path is not correct.']

    if(req.method == 'GET'){
       switch( reqURL.pathname ){
        case '/hello':
            ;[statusCode, response] = processHelloRequest( (name) ? name : undefined )
            break
        case '/goodbye':
            ;[statusCode, response] = processGoodbyeRequest( (name) ? name : undefined )
            break
        }
    }

    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response);

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
