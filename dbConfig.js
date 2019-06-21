const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://lnuwhfzmzhvktu:b4bea142cacb14de5c205a314b52f67d340be9bf469535f140ba51f2d2969a57@ec2-176-34-184-174.eu-west-1.compute.amazonaws.com:5432/d430a5n1bcltet', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define: {
        timestamps: false
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    sequelize.sync();

module.exports= sequelize;