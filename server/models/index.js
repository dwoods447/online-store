// Bring in sequelize module
const Sequelize = require('sequelize');
// Bring in path module
const path = require('path');
//Bring in file system module
const fs = require('fs');
// Bring in config module
const config = require('../config/config');
//Initialize empty db object
const db = {};


// Sequielize connection
const sequelize  = new Sequelize(
    config.db.production.database, 
    config.db.production.username, 
    config.db.production.password,
    config.db.production.dialect
)

      // Loop through each file in the current directory excluding index.js and import model into empty db object
        fs.readdirSync(__dirname)
        .filter((file)=>
            file !== 'index.js'
        )
        .forEach((file) => {
            const model = sequelize.import(path.join(__dirname, file))
            db[model.name] = model
        })
      
        
        Object.keys(db).forEach((model)=>{
            if('associate' in db[model]) db[model].associate(db);
        })

// Give access to sequelize  and Sequelize and export db object
db.sequelize  = sequelize;
db.Sequelize = Sequelize;
    
module.exports = db;
