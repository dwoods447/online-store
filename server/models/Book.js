


module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        isbn: {
            type: DataTypes.STRING,
        },
        title:{
            type: DataTypes.STRING,
        },
        image:{
            type: DataTypes.STRING,
        },
        copyright:{
            type: DataTypes.BIGINT
        },
        synposis:{
            type: DataTypes.TEXT
        },
        pages:{
            type: DataTypes.BIGINT
        },

    })

     Book.associate = function(models){
        Book.belongsTo(models.Publisher)
     }

    return Book;    
}