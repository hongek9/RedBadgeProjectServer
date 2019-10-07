const Sequelize = require('sequelize');

const sequelize = new Sequelize 
(process.env.DATABASE_URL, {
    dialect: 'postgress'
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