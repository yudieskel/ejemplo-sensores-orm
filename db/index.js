const { Sequelize } =require("sequelize");

//Crear una nueva instancia de Sequelize('database', 'username', 'password', options{})
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres'
} );

module.exports = {
  sequelize
}