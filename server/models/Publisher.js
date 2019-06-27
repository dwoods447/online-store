
module.exports = (sequelize, DataTypes) => {
    const Publisher = sequelize.define('Publisher', {
        name: {
            type: DataTypes.STRING,
        },
        phone:{
            type: DataTypes.STRING,
        },
        city:{
            type: DataTypes.STRING,
        },
        state:{
            type: DataTypes.STRING,
        },
        zip:{
            type: DataTypes.STRING,
        }
    })

    return Publisher;
}