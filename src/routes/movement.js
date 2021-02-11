const server = require("express").Router();
const { Movement, Account, User } = require('../db.js');

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

//crear un movimiento de transferencia
server.post("/transferencia/:id", async (req, res) => {
  const { id } = req.params;
  const { contactId, description, amount, currency } = req.body;
  try {
    const account = await Account.findOne({ //Busca la cuenta del que envia
      where: { userId: id, tipo: currency } //Verifica la moneda.
    })
    const receiver = await User.findOne({
      where: { id: contactId}
    })
    const movimiento = await Movement.create({ //Crea el movimiento del que envía.
      userId: id,
      name: `Transferencia a ${receiver.firstName}`,
      accountId: account.id,
      type: "envio",
      movementType: "Transferencia",
      currency,
      description,
      amount,
      contactId
    })

    const account1 = await Account.findOne({   //Busca la cuenta de quien recibe.
      where: { userId: contactId, tipo: currency } //Verifica la moneda.
    })
    const sender = await User.findOne({
      where: { id }
    })

    await Movement.create({   //Crea el movimiento del que recibe.
      userId: contactId,
      name: `Transferencia de ${sender.firstName}`,
      accountId: account1.id,
      type: "recibo",
      movementType: "Transferencia",
      currency,
      description,
      amount,
      contactId: id,
    })
    res.status(201).json(movimiento) //Retorna el movimiento de quien envió.

  } catch (error) {
    res.status(400).json(error)
  }
})

//Crea un movimiento de compra o pago
server.post("/envio/:id", async (req, res) => {
  const { id } = req.params;
  const { name, movementType, description, amount, currency } = req.body;
  try {
    const account = await Account.findOne({ //Busca la cuenta del usuario
      where: { userId: id, tipo: currency } //Verifica la moneda
    })
    const movimiento = await Movement.create({ //Crea el movimiento 
      userId: id,
      name,
      accountId: account.id,
      type: "envio",
      movementType,
      currency,
      description,
      amount
    })
    res.status(201).json(movimiento) //Retorna el movimiento

  } catch (error) {
    res.status(400).json(error)
  }
})

//Crea un movimiento de carga
server.post("/carga/:id", async (req, res) => {
  const { id } = req.params;
 // const { description, amount, currency } = req.body;
  try {
    const account = await Account.findOne({
      where: { userId: id, tipo: "dolares" }
    })
    const movimiento = await Movement.create({
      userId: id,
      name: "Rapipago",
      accountId: 2,
      type: "recibo",
      movementType: "Carga",
      currency: "dolares",
      description: "Recarga de saldo Rapipgo",
      amount: "1300"
    })
    res.status(201).json(movimiento) //Retorna el movimiento

  } catch (error) {
    res.status(400).json(error)
  }
})

//obtener los movimientos de un usuario
server.get('/:userId', (req, res,) => {
  const { userId } = req.params
  return Movement.findAll({
    where: {
      userId
    }
  })
  .then(movimientos => {
    res.json(movimientos);
  })
/*   .catch(error => {
    res.send(error)
  }) */
})

module.exports = server;
