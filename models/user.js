

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allownull: false
        },
        password: {
            type: DataTypes.STRING,
            allownull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allownull: false
        }
        
    })


    return User;
}