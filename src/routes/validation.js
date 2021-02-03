const server = require("express").Router();
const { Validation } = require('../db.js');


//Validar un usuario con el codigo enviado por mail.
server.put('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const { validationNumber } = req.body;
    const validation = await Validation.destroy({
      where: {
        userId: id,
        validationNumber
      }
    })
    if (validation) {
      res.status(201).json({ Msj: 'Código de validación correcto' });
    } else {
      res.status(404).json({ MsjError: 'Código de validación incorrecto' })
    }
  } catch (error) {
    next(error);
  }
});

module.exports = server;