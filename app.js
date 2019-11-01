// Module dependencies.
const express = require('express');
const path = require('path');
const http = require('http');
const mysql = require('mysql');

// Database connection
let db = mysql.createConnection({
  host: 'localhost',
  user: 'manager',
  password: 'excellence',
  database: 'inventory'
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function(req, res){
  let sql = 'select * from products';
  let query = db.query(sql, (err, products) => {
    if(err) throw err;
    console.log(products);
    res.render('index', {
      products: products
    });
  });
});

app.get('/form', function(req, res){
    res.render('addProduct');
});

app.get('/product', function(req, res){
    res.render('product');
});

// Get contents of products table
app.get('/getproducts', function(req, res){
  let sql = 'select * from products';
  let query = db.query(sql, (err, products) => {
    if(err) throw err;
    console.log(products);
    res.render('index', {
      products: products
    });
  });
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
