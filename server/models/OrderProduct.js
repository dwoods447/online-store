
module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define('OrderProduct', {
         
           qty: {
            type: DataTypes.INTEGER   
           },
           price: {
            type: DataTypes.INTEGER   
           }

    })

    OrderProduct.associate = function(models){
        OrderProduct.belongsTo(models.Order);
        OrderProduct.belongsTo(models.Product);
   }

    return OrderProduct;    
}