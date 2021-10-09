//Crear una clase para definir el modelo
const Sequelize = require('sequelize');
const { sequelize: db } = require('../db');

const Sensor = db.define('sensor', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deleted: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
 module.exports = Sensor