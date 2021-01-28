const server = require('./src/app.js');
const { conn, User } = require('./src/db');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});


User.create({
  "email": "admin@admin.com",
  "password": "1234",
  "typeDNI": "dni",
  "DNI": "1234563",
  "firstName": "Maggie",
  "lastName": "Simpson",
  "birthdate": "1988-01-14",
  "mobile":"3216548",
  "street": "Av siempreviva",
  "streetNumber": "1234",
  "city": "Springfield",
  "province": "Masachusets",
  "Country": "USA",
  "photoURL": "",

});

User.create({
  "email": "dailytinkerer@gmail.com",
  "password": "1234",
  "typeDNI": "dni",
  "DNI": "16577763",
  "firstName": "Daley",
  "lastName": "Tinky",
  "birthdate": "1987-01-23",
  "mobile":"32543548",
  "street": "Av siempreviva",
  "streetNumber": "1234",
  "city": "Springfield",
  "province": "Masachusets",
  "Country": "USA",
  "photoURL": "www.google.com"
});

User.create({
  "email": "apu@nahasa.com",
  "password": "1234",
  "typeDNI": "dni",
  "DNI": "5434563",
  "firstName": "Apu",
  "lastName": "Nahasapeemapetilon",
  "birthdate": "1940-01-01",
  "mobile":"3265748",
  "street": "Av siempreviva",
  "streetNumber": "1234",
  "city": "Springfield",
  "province": "Masachusets",
  "Country": "USA",
  "photoURL": ""
}); 