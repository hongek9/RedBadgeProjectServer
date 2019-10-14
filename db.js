const Sequelize = require('sequelize');

const sequelize = new Sequelize('CupOJoy', 'postgres', 'Knights1989!', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to redBadgeProject');
    },
    function(err) {
        console.log(err);
    }
);

module.exports = sequelize;