const server = require("express").Router();
const { Movement} = require('../db.js');

//obtener todos los movimientos
server.get('/', (req, res, next) => {
	Movement.findAll({
		include: {
			all: true
		}})
		.then(movimientos => {
			res.send(movimientos);
		})
		.catch((error)=>{
            send(error)
        });
});
//crear un movimiento

server.post("/",  (req, res) => {
    const { type,description, amount,sender, receiver} = req.body;  
     Movement.create({
        type,
        description,
        amount,
        sender,
        receiver,
        
        })
    
    .then(movement=>{
        res.status(200).json(movement)
})
.catch(e=>{
    res.status(400).json(e)
})
})

//obtener los movimientos de un usuario
server.get('/:userId',(req, res,) => {
    const {userId}= req.params
    return	Account.findOne({
            where:{
                userId
            }
        })
        .then(movimientos => {
            res.json(movimientos);
        })
})

module.exports = server;
