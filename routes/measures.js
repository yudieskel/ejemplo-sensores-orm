const { Router } = require('express');
const Measure = require('../models/measure');
const Sensor = require('../models/sensor');

const router = Router();

  //Listar las medidas de un sensor por un id dado
router.get('/:sensorId', async (req, res) => {
    try {
        const sensorId = req.params.sensorId;

        const responseBD = await Measure.findAll({
          attributes: ['id', 'temperature', 'hour'],
          where: {
            sensor_id: sensorId
          }
        });

          return res.json({ 
            success: true,
            measuresList: responseBD
          });
    
      } catch(exception) {
        return res.json({
          success: false,
          measures: [],
          error: exception
        });
      }
});

 //Agregar  medida a sensores
 router.post('/', async (req, res) => {
    try {
        const { temperature, hour, sensor_id } = req.body;

        if (!temperature || !hour || !sensor_id) {
          return res.json({
            success: false,
            message: 'Missing data'
          });
        };

        await Measure.create({
          temperature, 
          hour,
          sensor_id
        });  

        const responseMeasures = await Measure.findAll({
          attributes: ['id', 'temperature', 'hour', 'sensor_id'],
        });

        return res.json({ 
          success: true,
          ListaMedidaSensores: responseMeasures
        });
  } catch (error) {
    return res.json({
      success: false,
      newSensor: null,
      error: error
    })
  };
});

 //Agregar una medida a un sensor para un id dado
router.post('/:sensorId', async (req, res) => {
    try {
        const { temperature, hour } = req.body;

        const sensorId = req.params.sensorId;

        if (!temperature || !hour) {
            return res.json({
              success: false,
              message: 'Missing data'
            });
          }

        await Measure.create({
          temperature, 
          hour,
          sensor_id: sensorId
        });  

        const responseMeasures = await Measure.findAll({
          attributes: ['id', 'temperature', 'hour'],
                where: {
                  sensor_id: sensorId
                }
        })

        return res.json({ 
          success: true,
          measuresList: responseMeasures
        });
      } catch (error) {
        return res.json({
          success: false,
          newSensor: null,
          error: error
        })
      }; 
});

 //Listar las medidas de la BD indicando de cada una el sensor al que pertenece
 router.get('/', async (req, res) => {
    try {
        const responseBD = await Measure.findAll({
          attributes: ['temperature', 'hour'],
          include: {
            model: Sensor,
            attributes: ['name'],
          }
        }) ;

          return res.json({ 
            success: true,
            measuresList: responseBD
          })
      } catch(exception) {
        return res.json({
          success: false,
          measures: [],
          error: exception
        });
      }
});

module.exports = {
  router
}