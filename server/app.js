const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const cors = require('cors');
const {sequelize} = require('./models');
//Bring in express session
const session = require('express-session');
// Brinng in connect-session-sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store)


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
const authentication = require('./routes/authentication')

app.use('/admin', admin);
app.use('/books', books);
app.use('/categories', categories);
app.use('/products', products);
app.use('/authors', authors);
app.use('/customers', customers);
app.use('/auth', authentication)



app.use(session({
    secret: 'keyboard cat',
    store: new SequelizeStore({
      db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
  }))
  
// Catch 404 errors
app.use('*', express.static('./views/404.html'));

app.set('port', process.env.PORT || config.port);

try {
    sequelize.sync().then(() =>{
        console.log(`Connection Successfull.....\r\n\r\n`);
        app.listen(process.env.PORT || port, ()=> console.log(`Application started on PORT ${port}.\r\n\r\n`))
    })
 } catch(err){
    console.log(`AN ERROR OCCURRED: ${err}`)
}