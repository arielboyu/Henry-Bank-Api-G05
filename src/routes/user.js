const server = require('express').Router();
const { User,Account } = require('../db.js');
const multer = require('multer');

//obtener todos los usuarios
server.get('/', (req, res) => {
	/* if (req.user) { */
		return User.findAll({
			include : { all: true }
		}).then((users) => {
			res.send(users);
		});
/* 	} else { */
		res.sendStatus(401);
	/* } */
});

//crear un usuario
server.post("/", async (req, res, next) => {

  const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ Error: 'Must fill all the fields' });

  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

//traer los datos de un usuario.
server.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await User.findByPk(id, 
      {include :{
        model: Account,
      }})
    ;
		if (result) return res.json(result);
		return res.status(404).json({ Error: 'User not found' });
	} catch (error) {
		return next(error);
	}
});

//editar información de un usuario
//el dni, nombre y fecha de nacimiento no deben poder actualizar
server.put('/:id', (req, res) => {
	const { id } = req.params;
	const { email, mobile, adress } = req.body;
	User.update(
		{
			email,
			mobile,
			adress,
			password,
			street,
			streetNumber,
			city,
			province,
			country
		},
		{ returning: true, where: { id } }
	)
		.then((updatedUser) => {
			res.status(201).json(updatedUser);
		})
		.catch((e) => {
			res.status(400).json({ MjsError: 'Llene los campos obligatorios' });
		});
});

//resetear contraseña de un usuario en particular
server.post('/:id/passwordReset', async (req, res) => {
	const { id } = req.params;
	const { password } = req.body;
	const hash = await bcript.hash(password, 10);

	User.findOne({ where: { id: id } }).then((user) => {
		if (!user) {
			res.status(400).json({ msg: 'No existe dicho usuario ' });
		} else {
			user
				.update({ password: hash })
				.then((userUp) => {
					res.status(200).json({ msg: 'Contraseña actualizada correctametne ' });
				})
				.catch((e) => {
					res.json(e);
				});
		}
	});
});

//DAR DE ALTA UN USER
/* const upload = multer(); */
server.put('/alta/:id', /* upload.single('file'), */ async (req, res) => {
	const { id } = req.params;
	const {
		firstName,
		lastName,
		mobile,
		street,
		streetNumber,
		city,
		province,
		country,
		birthdate,
		typeDNI,
/* 		photoURL, */
		DNI
	} = req.body; //Valida que esten todos los campos completos

	 await User.update(
		{
			firstName,
			lastName,
			mobile,
			street,
			streetNumber,
			city,
			province,
			country,
			birthdate,
			typeDNI,
			DNI
		},
		{ where: { id } }
	)
	await Account.findByPk(id)
	.then((updatedUser)=>{
	res.status(201).json(updatedUser)
	}).catch((e) => {
      console.log("ERROR >>>>", e)
			res.status(400).json({ MjsError: 'Llene los campos obligatorios' });
		});
});

module.exports = server;
