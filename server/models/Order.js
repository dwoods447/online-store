
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
           order_date:{
            type: DataTypes.DECIMAL(10,2),  
           },
           shipped_date:{
             type: DataTypes.DATE   
           },
           shipping_address: {
            type: DataTypes.STRING  
           },
           shipping_city :{
            type: DataTypes.STRING  
           },
           shipping_country :{
            type: DataTypes.STRING  
           },
           status: {
            type: DataTypes.INTEGER   
           }
    })

    Order.associate = function(models){
        Order.belongsTo(models.Customer)
   }

    return Order;    
}