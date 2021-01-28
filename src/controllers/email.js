const server = require('express').Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
/* const xoauth2 = require('xoauth2'); */

server.post('/', async (req, res, next) => { 

const {email} = req.body;

const { GMAIL_USER, GMAIL_PASS} = process.env ;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'treehenrybank@gmail.com' ,
    pass: 'epA6ugrj4pfyCpu', 
    clientId: '461410365933-dnta1kqb2r49249ibmtl6oosfn997j8l.apps.googleusercontent.com',
    clientSecret: 'jhd3cCHUMbKlV9rRBKO4HYbX',
    refreshToken: '1//04VxHShDcfrl7CgYIARAAGAQSNwF-L9IrV_RrpBUVSqetwHbxD_5SLZHxg59WV22YJEk7A0nmDexyAlyOkAPp1INLZ_8BCjPRO84',
    
  }
});


let mailOptions = {
  from: 'TreeBANK <treehenrybank@gmail.com>',
  to: email,
  subject: 'Confirme su email',
  text: 'codigo de seguridad: 113056',
  html: `<h3> codigo de seguridad: 113056</h3>`
};


transporter.sendMail(mailOptions, function(err, data) {
  if(err) {
    console.log('Error', err)
  } else {
    console.log('Email sent !')
  }
})
 }); 

module.exports = server; 