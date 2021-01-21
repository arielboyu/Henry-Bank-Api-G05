const server = require('express').Router();
const  { User } = require('../db.js');

server.get('/', (req, res,) => {
	
	
		return	User.findAll({
				include: 
				{all:true}
			})
			.then(users => {
				res.send(users);
			})
	


});
server.post("/", (req, res) => {
    const {name,email, mobile, adress, birthdate} = req.body
       User.create({
        name,
        email,
        mobile,
        adress,
        birthdate
        })
            .then((newUser)=>{
                res.status(201)
                res.send(newUser)
            }).catch(()=>{
				res.status(400)
			})
})


module.exports = server;