

module.exports = (sequelize, DataTypes) => {
     const Author = sequelize.define('Author', {
        first_name:{
            type: DataTypes.STRING
        },
        last_name:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        dob:{
            type: DataTypes.DATE
        }
     })  
     
     return Author;    
}