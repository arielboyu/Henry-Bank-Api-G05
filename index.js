const server = require('./src/app.js');
const { conn, User, Account, Contact, Movement } = require('./src/db');


// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    await User.create({
      "email": "admin@admin.com",
      "password": "1234",
      "typeDNI": "dni",
      "DNI": "1234563",
      "firstName": "Maggie",
      "lastName": "Simpson",
      "birthdate": "1988-01-14",
      "mobile": "3216548",
      "street": "Av siempreviva",
      "streetNumber": "1234",
      "city": "Springfield",
      "province": "Masachusets",
      "Country": "USA",
      "photoURL": "",

    });
    await Account.create({
      "userId": "1",
      "email": "admin@admin.com",
      "tipo": "pesos",
      "balance": "500",
      "cvu": "2222220000222226952588"
    })

    await Account.create({
      "userId": "1",
      "email": "admin@admin.com",
      "tipo": "dolares",
      "balance": "500",
      "cvuUS": "3333331111333336952588"
    })

   await Contact.create({
      "alias": "Daley",
      "email": "dailytinkerer@gmail.com",
      "userId": "1",
      "contactId": "2" 
    });

    await Contact.create({
      "alias": "Apu",
      "email": "apu@nahasa.com",
      "userId": "1",
      "contactId": "3" 
    });

    await Movement.create({   //Crea el movimiento del que recibe.
      "userId": "1",
      "accountId": "2",
      "type": "recibo",
      "description": "Comprate algo lindo",
      "amount": "500",
      "contactId": "2",
    })


    await User.create({
      "email": "dailytinkerer@gmail.com",
      "password": "1234",
      "typeDNI": "dni",
      "DNI": "16577763",
      "firstName": "Daley",
      "lastName": "Tinky",
      "birthdate": "1987-01-23",
      "mobile": "32543548",
      "street": "Av siempreviva",
      "streetNumber": "1234",
      "city": "Springfield",
      "province": "Masachusets",
      "Country": "USA",
      "photoURL": "www.google.com"
    });

    await Account.create({
      "userId": "2",
      "email": "dailytinkerer@gmail.com",
      "tipo": "pesos",
      "balance": "500",
      "cvu": "2222220000222226952599"
    })

    await Account.create({
      "userId": "2",
      "email": "dailytinkerer@gmail.com",
      "tipo": "dolares",
      "balance": "500",
      "cvuUS": "3333331111333336952599"
    })

    await Contact.create({
      "alias": "admin",
      "email": "admin@admin.com",
      "userId": "2",
      "contactId": "1" 
    });

    await Contact.create({
      "alias": "Apu",
      "email": "apu@nahasa.com",
      "userId": "2",
      "contactId": "3" 
    });

    await Movement.create({   //Crea el movimiento del que recibe.
      "userId": "2",
      "accountId": "4",
      "type": "envio",
      "description": "Comprate algo lindo",
      "amount": "500",
      "contactId": "1",
    })

    await User.create({
      "email": "apu@nahasa.com",
      "password": "1234",
      "typeDNI": "dni",
      "DNI": "5434563",
      "firstName": "Apu",
      "lastName": "Nahasapeemapetilon",
      "birthdate": "1940-01-01",
      "mobile": "3265748",
      "street": "Av siempreviva",
      "streetNumber": "1234",
      "city": "Springfield",
      "province": "Masachusets",
      "Country": "USA",
      "photoURL": ""
    });

    await Account.create({
      "userId": "3",
      "email": "apu@nahasa.com",
      "tipo": "pesos",
      "balance": "3500",
      "cvu": "2222220000222226952100"
    })

    await Account.create({
      "userId": "3",
      "email": "apu@nahasa.com",
      "tipo": "dolares",
      "balance": "15500",
      "cvuUS": "3333331111333336952100"
    })

    await Contact.create({
      "alias": "admin",
      "email": "admin@admin.com",
      "userId": "3",
      "contactId": "1" 
    });

  });
});


