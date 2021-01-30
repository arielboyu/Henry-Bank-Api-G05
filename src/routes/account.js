const server = require("express").Router();
const { Account, User } = require('../db.js');

//obtener todas las cuentas

server.get('/', (req, res, next) => {
	Account.findAll({
		include: {
			all: true
		}})
		.then(account => {
			res.send(account);
		})
		.catch((error)=>{
            send(error)
        });
});
//crear cuenta a un usuario
server.post("/",  (req, res) => {
    const { tipo, balance,email,DNI } = req.body;  
     Account.create({
         email,
         DNI,
         tipo,
         balance
        })
    
    .then(cuenta=>{
        res.status(200).json(cuenta)
})
.catch(e=>{
    res.status(400).json(e)
})
})

//identificar un usuario con su cuenta

    server.get('/:email/:DNI',(req, res,) => {
        const {email,DNI}= req.params
        return	Account.findOne({
                where:{
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
	const {id} = req.params;
    let { monto} = req.body;
	await Account.update(
		{
			balance: monto
		},
		{  where: { id }}
    )
       await Account.findByPk(id)
        .then((updatedUser)=>{
        res.status(201).json(updatedUser)
    }).catch(e => {
		res.status(400).json( { MjsError: "Llene los campos obligatorios"} )
	})
});


  module.exports = server;