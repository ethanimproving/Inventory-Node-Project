// Module dependencies.
const express = require('express');
const path = require('path');
const http = require('http');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function(req, res){
    res.render('index');
  });

app.get('/form', function(req, res){
    res.render('addProduct');
});

app.get('/product', function(req, res){
    res.render('product');
});


// Set port.
let port = '8081';
app.set('port', port);

// Create http server.
let server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => {
  console.log('Server started on ' + '\x1b[36m' + `http://localhost:${port}` + '\x1b[0m');
});
