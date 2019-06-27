
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
           price:{
            type: DataTypes.DECIMAL(10,2),  
           },
           qty:{
             type: DataTypes.INTEGER   
           }
    })

    Product.associate = function(models){
      Product.belongsTo(models.Book)
   }

    return Product;    
}