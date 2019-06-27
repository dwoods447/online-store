


module.exports = (sequelize, DataTypes) => {
        const Customer = sequelize.define('Customer', {
            first_name: {
                type: DataTypes.STRING
            },
            last_name:{
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            },
            country: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password:{
                type: DataTypes.STRING
            }
        })

        return Customer;
}