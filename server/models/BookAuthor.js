
module.exports = (sequelize, DataTypes) => {
    const BookAuthor = sequelize.define('BookAuthor', {

    })

    BookAuthor.associate = function(models){
        BookAuthor.belongsTo(models.Author)
        BookAuthor.belongsTo(models.Book)
     }
    return BookAuthor;
}