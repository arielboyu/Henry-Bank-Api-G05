const server = require("express").Router();
const { Account, User } = require('../db.js');


//obtener todas las cuentas
server.get('/', (req, res, next) => {
  Account.findAll({
    include: {
      all: true
    }
  })
    .then(account => {
      res.send(account);
    })
    .catch((error) => {
      send(error)
    });
});


//crear cuenta a un usuario
server.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;
  const user = await User.findByPk(id)
  try {
    const userAccount = await Account.findOne({ //Busca una cuenta del usuario.
      where: {
        userId: id
      }
    });
    if (!userAccount) {   //Si no tiene se le crea una en dolares y una en pesos.

      await Account.create({
        userId: id,
        email: user.email,
        DNI: user.DNI,
        tipo: "pesos",
        balance
      })
      await Account.create({
        userId: id,
        email: user.email,
        DNI: user.DNI,
        tipo: "dolares",
        balance
      })
      const cuentas = await Account.findAll({ //Se buscan las 2 cuentas creadas.
        where: {
          userId: id
        }
      })
      res.status(200).json(cuentas) // Se devuelven las cuentas.
    } else {
      res.status(400).send({ msg: "El usuario ya tiene una cuenta" })
    }
  }
  catch {
    res.status(400).json(e)
  }
});


//identificar un usuario con su cuenta
server.get('/:email/:DNI', (req, res,) => {
  const { email, DNI } = req.params
  return Account.findOne({
    where: {
      email,
      DNI
    }
  })
    .then(cuenta => {
      res.json(cuenta);
    })
})

//enviar/recibir dinero
server.put('/:id', async (req, res) => {
  const { id } = req.params;
  let { contactId, monto, tipo } = req.body;
 
  const sender = await Account.findOne({     //Busca la cuenta de quien envia.
    where: { userId: id, tipo }
  })
  await Account.update(                       // Le resta el monto
    {
      balance: (Number(sender.balance) - Number(monto))
    },
    { where: { userId: id, tipo } }
  )

  const reciber = await Account.findOne({    // Busca la cuenta de quien recibe.
    where: { userId: contactId, tipo }
  })
  await Account.update(                      // Le suma el Monto.
    {
      balance: (Number(reciber.balance) + Number(monto))
    },
    { where: { userId: contactId, tipo } }
  )

  await Account.findOne({         //Busca la cuenta actualizada de quien envió.
    where: { userId: id, tipo }
    })
    .then((updatedUser) => {
      res.status(201).json(updatedUser) //responde con la cuenta actualizada.
    }).catch(e => {
      res.status(400).json({ MjsError: "Llene los campos obligatorios" })
    })
});


module.exports = server;