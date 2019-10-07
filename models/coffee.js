const user = require('./user');

module.exports = (sequelize, DataTypes) => {
    const Coffee = sequelize.define('coffee', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roast: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Coffee.belongsto(user)
    return Coffee;

}