const express = require('express');
require('dotenv').config();

const { router: sensorsRouter } = require('./routes/sensors');
const { router: measuresRouter } = require('./routes/measures');
const { sequelize } = require('./db');

const app = express();
const PORT =  4000;

app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );

app.use('/sensors', sensorsRouter);
app.use('/measures', measuresRouter);

app.listen(PORT, async () => {
  console.log(`Server listening al port ${PORT}`);
  try {
    //Testar si está funcionando sequelize
    await sequelize.authenticate();
      console.log('DataBase connected...');

    //Sincronizar sequelize.sync({ alter: true }) ó sequelize.sync({ force: true } para crear tablas)
    await sequelize.sync({ alter: true });  
    console.log('All models were synchronized successfully.');

    } catch (error) {
    console.log('Error connecting Sequelize:', error)
  }
});
