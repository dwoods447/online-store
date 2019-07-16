
module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define('OrderProduct', {
         
           qty: {
            type: DataTypes.INTEGER   
           },
           price: {
            type: DataTypes.DECIMAL(10,2)  
           }

    })

    OrderProduct.associate = function(models){
        OrderProduct.belongsTo(models.Order);
        OrderProduct.belongsTo(models.Product);
   }

    return OrderProduct;    
}