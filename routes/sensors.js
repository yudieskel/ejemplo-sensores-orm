const { Router } = require('express');
const Sensor = require('../models/sensor');

const router = Router();

  //Listar todos los sensores activos
router.get('/', async (req, res) => {
  try {
    const sensoresActivos = await Sensor.findAll({
      attributes: ['id', 'name', 'deleted'],
      where: {
        deleted: 'activo'
      }
    });

  return res.json({
    success: true,
    listaSensoresActivos: sensoresActivos
  });
  } catch (error) {
    return res.json({
      success: false,
      sensoresActivos: [],
      error: exception
    })
  };
});

  //Insertar un sensor
router.post('/', async (req, res) => {
  try {
    const { name, deleted } = req.body;

  if (!name || !deleted ) {
      return res.json({
        success: false,
        message: 'Missing data'
      });
    };

  await Sensor.create({
    name, 
    deleted
  });  

  const responseBD = await Sensor.findAll({
    attributes: ['id', 'name', 'deleted'],
  });

  return res.json({ 
    success: true,
    nuevaListaSensores: responseBD
  });
    
  } catch (error) {
    return res.json({
      success: false,
      newSensor: null,
      error: exception
    })
  }
});

  //Dado un ID actualizar el estado de la columna deleted
  router.delete('/:sensor_id', async (req, res) => {
    try {
      const sensor_id = req.params.sensor_id;

      await Sensor.update({deleted: 'activo'}, {
        where: {
          id: sensor_id
        }
      });
  
      const responseSensors = await Sensor.findAll({
        attributes: ['id', 'name', 'deleted']
      });

      return res.json({ 
        success: true,
        listaActualizada: responseSensors
      });
      
    } catch(exception) {
      return res.json({ 
        success: false,
        deletedSensors: [],
        error: exception
      });
    }
  });
  
module.exports = {
  router
}
