const server = require('express').Router();
const { Contact, User } = require('../db.js');

//Crear un contacto
server.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { contactId } = req.body;
  try {
    const contact = await User.findByPk(contactId)  //Busca el contacto
    const result = await Contact.create({
      alias: contact.firstName + " " + contact.lastName,  // Lo nombra por defecto.
      email: contact.email,
      userId: id,
      mobile: contact.mobile,
      contactId
    });
    res.status(201).json(result);   //devuelve el contacto creado.
  } catch (error) {
    next(error);
  }
});


// Borrar un contacto.
server.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { contactId } = req.body;
  try {

    const result = await Contact.destroy({ //elimina el contacto.
      where: { userId: id, contactId }
    });
    if (result) {   //si lo encuentra devuelve 201
      res.status(201).json({ Msj: 'contacto eliminado' });
    } else {        //sino 404
      res.status(404).json({ MsjError: 'contacto inexistente' })
    }
  } catch (error) {
    next(error);
  }
})

//Buscar un contacto y sus movimientos en comun
server.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { contactId } = req.body;
  try {
    const contact = await Contact.findOne({
      where: { userId: id, contactId }
    });
    if (contact) {
      res.status(200).send(contact);
    } else {
      res.status(404).json({ MsjError: 'contacto inexistente' })
    }
  } catch (error) {
    next(error);
  }
})

//Cambiar el nombre de un contacto
server.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { contactId, alias } = req.body;
  try {
    const contact = await Contact.update( //Cambia el nombre al contacto
      {alias},
      { 
      where: { userId: id, contactId }
    });
    if (contact) {
      res.status(200).send(contact);  //devuelve el contacto modificado.

    } else {
      res.status(404).json({ MsjError: 'contacto inexistente' })
    }
  } catch (error) {
    next(error);
  }
})

module.exports = server;