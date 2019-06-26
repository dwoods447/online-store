const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const app = express();
const port = config.port;


app.use(bodyParser.json());


const admin = require('./routes/admin');
const books = require('./routes/books')
const categories = require('./routes/categories')


app.use('/admin', admin);
app.use('/books', books)
app.use('/categories', categories)

// Catch 404 errors
app.use('*', express.static('./views/404.html'));

app.listen(port, ()=> console.log(`Application started on PORT ${port}.`))