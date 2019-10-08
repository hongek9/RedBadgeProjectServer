const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
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

User = sequelize.import('./models/user');
Review = sequelize.import('./models/review');
Coffee = sequelize.import('./models/coffee');

User.hasMany(Review);
Review.belongsTo(User);

Coffee.hasMany(Review);
Review.belongsTo(Coffee);

User.hasMany(Coffee);
Coffee.belongsTo(User);

module.exports = sequelize;