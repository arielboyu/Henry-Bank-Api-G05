const server = require('express').Router();
const  { User } = require('../db.js');
const multer = require('multer')
//obtener todos los usuarios
server.get('/', (req, res,) => {
		return	User.findAll({
				include: 
				{all:true}
			})
			.then(users => {
				res.send(users);
			})
	
});

//crear un usuario
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

//editar información de un usuario
//el dni, nombre y fecha de nacimiento no deben poder actualizar
server.put('/:id' , (req, res) => {
	const {id} = req.params;
	const {email,mobile,adress,} = req.body;
	User.update(
		{
            email,
            mobile,
            adress,
		},
		{ returning: true, where: { id }}
	).then(updatedUser => {
		res.status(201).json(updatedUser)
	}).catch(e => {
		res.status(400).json( { MjsError: "Llene los campos obligatorios"} )
	})
});

//resetear contraseña de un usuario en particular
server.post('/:id/passwordReset',  async(req, res) => {
	const { id } = req.params;
	const { password } = req.body;
	const hash = await bcript.hash(password, 10);

	User.findOne({ where: { id: id} })
		.then(user => {
			if(!user) {
				res.status(400).json({ msg: "No existe dicho usuario "});
			} else {
				user.update({ password: hash }).then(userUp => {
					res.status(200).json({ msg: "Contraseña actualizada correctametne "});
				}).catch(e => {
					res.json(e);
				})
			}
		})
});

//DAR DE ALTA UN USER 
const upload= multer() 
server.put('/alta/:id', upload.single('file'),async  (req, res) => {
	const {id} = req.params;
    const { name,mobile,adress,birthdate,typeDNI,photoURL,DNI} = req.body;
    	//Procesar archivo de imagen recibido
	const {file} = req;	
	if (file.detectedFileExtension != ".jpg" && file.detectedFileExtension != ".png") next(new Error("Invalid file type"));
	const fileName = 'userimg' + '_' + Date.now() + file.detectedFileExtension;
	var img = `http://localhost:3001/img-user/${fileName}`;//definiendo la url de la imagen que se va a guardar en la base de datos
	//guardar archivo de imagen en el servidor 
	const pipeline = promisify(require("stream").pipeline);
	await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../upload/img-user/${fileName}`)).catch(e=>{console.log(e)});
	User.update(
		{
		    name,
            mobile,
            adress,
            birthdate,
            photoURL: img,
            typeDNI,
            DNI
		},
		{ returning: true, where: { id }}
	).then(updatedUser => {
		res.status(201).json(updatedUser)
	}).catch(e => {
		res.status(400).json( { MjsError: "Llene los campos obligatorios"} )
	})
});


module.exports = server;