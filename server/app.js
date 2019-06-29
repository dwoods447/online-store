const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const cors = require('cors');
const {sequelize} = require('./models');



const app = express();
const port = config.port;


app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

const admin = require('./routes/admin');
const books = require('./routes/books');
const categories = require('./routes/categories');
const products = require('./routes/products');
const authors = require('./routes/authors');
const customers = require('./routes/customers');


app.use('/admin', admin);
app.use('/books', books);
app.use('/categories', categories);
app.use('/products', products);
app.use('/authors', authors);
app.use('/customers', customers);

// Catch 404 errors
app.use('*', express.static('./views/404.html'));

app.set('port', process.env.PORT || config.port);

try {
    sequelize.sync().then(() =>{
        console.log(`Connection Successfull.....\r\n\r\n`);
        app.listen(process.env.PORT || config.port, ()=> console.log(`Application started on PORT ${config.port}.\r\n\r\n`))
    })
 } catch(err){
    console.log(`AN ERROR OCCURRED: ${err}`)
}