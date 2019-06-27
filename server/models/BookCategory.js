
module.exports = (sequelize, DataTypes) => {
        const BookCategory = sequelize.define('BookCategory', {
        })

        BookCategory.associate = function(models){
            BookCategory.belongsTo(models.Category)
            BookCategory.belongsTo(models.Book)
         }

      return BookCategory;  
}