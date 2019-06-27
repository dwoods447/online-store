


module.exports = (sequelize, DataTypes) => {
        const Category = sequelize.define('Category', {
            name: {
                type: DataTypes.STRING,
            }
        })

        return Category;
}