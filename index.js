const bodyParser = require('body-parser');
const express = require('express');


const app = express();

require('./db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: true}));

app.get('/', (req,res)=> {
  res.send('Hola')
})

app.listen(3001, ()=> {
  console.log('Server up')
});