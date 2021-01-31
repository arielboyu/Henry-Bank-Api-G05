const server = require("express").Router();
const { Movement, Account } = require('../db.js');

//obtener todos los movimientos
server.get('/', (req, res, next) => {
  Movement.findAll({
    include: {
      all: true
    }
  })
    .then(movimientos => {
      res.send(movimientos);
    })
    .catch((error) => {
      send(error)
    });
});

//crear un movimiento
server.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { contactId, description, amount, currency } = req.body;
  try {
    const account = await Account.findOne({ //Busca la cuenta del que envia
      where: { userId: id, tipo: currency } //Verifica la moneda.
    })
    const movimiento = await Movement.create({ //Crea el movimiento del que envía.
      userId: id,
      accountId: account.id,
      type: "envio",
      description,
      amount,
      contactId
    })

    const account1 = await Account.findOne({   //Busca la cuenta de quien recibe.
      where: { userId: contactId, tipo: currency } //Verifica la moneda.
    })
    await Movement.create({   //Crea el movimiento del que recibe.
      userId: contactId,
      accountId: account1.id,
      type: "recibo",
      description,
      amount,
      contactId: id,
    })
    res.status(201).json(movimiento) //Retorna el movimiento de quien envió.

  } catch (error) {
    res.status(400).json(error)
  }
})

//obtener los movimientos de un usuario
server.get('/:userId', (req, res,) => {
  const { userId } = req.params
  return Account.findOne({
    where: {
      userId
    }
  })
    .then(movimientos => {
      res.json(movimientos);
    })
})

module.exports = server;
