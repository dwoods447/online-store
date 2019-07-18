const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')
const morgan  = require('morgan');
const cors = require('cors');
const {sequelize} = require('./models');
//Bring in express session
const session = require('express-session');
// Brinng in connect-session-sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const bcrypt = require('bcryptjs');
module.exports.bcrypt = bcrypt;
const app = express();
const port = config.port;
const csrfProtection = require('./middleware/csrf');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

const admin = require('./routes/admin');
const books = require('./routes/books');
const categories = require('./routes/categories');
const products = require('./routes/products');
const authors = require('./routes/authors');
const customers = require('./routes/customers');
const authentication = require('./routes/authentication');
const orders = require('./routes/orders')
// const csrf = require('./routes/csrf');

app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  proxy: true,
  saveUninitialized: false
}))

// app.use(csrfProtection, function (req, res, next) {
//   const token = req.csrfToken();
//   console.log('\r\n\r\n');
//   console.log(`Token generated: ${JSON.stringify(token)}`);
//   console.log('\r\n\r\n');
//   res.cookie('XSRF-TOKEN', token);     
//   res.locals._csrf = req.csrfToken();
//   next();
// });


// Front-End Client 
 app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/admin', admin);
app.use('/books', books);
app.use('/categories', categories);
app.use('/products', products);
app.use('/authors', authors);
app.use('/customers', customers);
app.use('/auth', authentication)
app.use('/orders', orders);
// Catch 404 errors
app.use('*', express.static('./views/404.html'));

app.set('port', process.env.PORT || config.port);

try {
    sequelize.sync().then(() =>{
        console.log(`Connection Successfull.....\r\n\r\n`);
        app.listen(process.env.PORT || port, ()=> console.log(`Application started on PORT ${port}.\r\n\r\n`));
    })
 } catch(err){
    console.log(`AN ERROR OCCURRED: ${err}`);
}