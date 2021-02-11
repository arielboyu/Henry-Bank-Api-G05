const server = require("express").Router();
const axios = require('axios');
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
  //const { balance } = req.body;
  const user = await User.findByPk(id)

  const CVUars = "222222000022222"
	const CVUusd = "333333111133333"
	const cvus = []
	const numerosRandom = Math.ceil(Math.random()*10000000)
	!cvus.includes(numerosRandom)? cvus.push(numerosRandom): generar()
	const CVU = CVUars + cvus
	const CVUUSD = CVUusd + cvus

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
        tipo: "pesos",
        balance:500,
        cvu: CVU
      })
      await Account.create({
        userId: id,
        email: user.email,
        tipo: "dolares",
        balance:500,
        cvuUS: CVUUSD
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
  catch(error) {
    res.status(400).json(error)
  }
});


//identificar un usuario con su cuenta
server.get('/:email', (req, res,) => {
  const { email } = req.params
  return Account.findOne({
    where: {
      email,
    }
  })
    .then(cuenta => {
      res.json(cuenta);
    })
})

//Obtener todas las cuentas de un usuario
server.get('/all/:email', (req, res,) => {
  const { email } = req.params
  return Account.findAll({
    where: {
      email,
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
    where: { userId: contactId, tipo }       // tipo es dolares o pesos
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

//cambio de dinero
server.put('/cambio/:cotizacion/:tipo/:monto/:email', async (req, res, next) => {
  const { cotizacion, email, monto, tipo } = req.params;

  try {
    
    let valor = tipo === 'compra' ? monto / cotizacion : monto * cotizacion;

    console.log(valor)
    
    const accountPesos = await Account.findOne({
      where: {
        email,
        tipo: 'pesos'
      }
    })
    
    const accountDolar = await Account.findOne({
      where: {
        email,
        tipo: 'dolares'
      }
    })

    if (tipo === 'compra') {
      if (accountPesos.balance >= monto) {
        await accountDolar.update({
          balance: accountDolar.balance + parseInt(valor.toFixed(2))
        }) //FUNCIONA

        await accountPesos.update({
          balance: accountPesos.balance - parseInt(monto)
        }) //FUNCIONA
      } else {
        alert("No tiene saldo suficiente")
      }
    }

    if (tipo === 'venta') {
      if (accountDolar.balance >= monto) {
        await accountPesos.update({
          balance: accountPesos.balance + parseInt(valor.toFixed(2))
        }) //FUNCIONA

        await accountDolar.update({
          balance: accountDolar.balance - parseInt(monto)
        }) //FUNCIONA
      } else {
        alert("No tiene saldo suficiente")
      }
    }
  }
  catch(error) {
    console.log(error)
  }
})

//recargar dinero.
server.put('/recarga/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let { monto } = req.body;
    const account = await Account.findByPk(id); //Busca la cuenta por ID.
    await account.update({
      balance: account.balance + monto // Le suma el Monto.
    })
    res.status(200).json(account); // Devuelve la cuenta actualizada.
  }
  catch(error) {
    next(error)
  }
})



module.exports = server;
