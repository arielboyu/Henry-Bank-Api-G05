const server = require('./src/app.js');
const { conn, User, Account, Contact, Movement } = require('./src/db');


// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    await User.create({
      "email": "admin@admin.com",
      "password": "Qwerty123",
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
      "contactId": "2", 
      "mobile":"32543548" 
    });

    await Contact.create({
      "alias": "Apu",
      "email": "apu@nahasa.com",
      "userId": "1",
      "contactId": "3",
      "mobile": "3265748", 
    });

    await Contact.create({
      "alias": "Bart",
      "email": "bart@simpsons.com",
      "userId": "1",
      "contactId": "4",
      "mobile": "3265444", 
    });

    await Contact.create({
      "alias": "Marge",
      "email": "marge@bouvier.com",
      "userId": "1",
      "contactId": "5",
      "mobile": "3265874", 
    });

    await Contact.create({
      "alias": "Homero",
      "email": "homero@simpsons.com",
      "userId": "1",
      "contactId": "6",
      "mobile": "3265654", 
    });

    await Contact.create({
      "alias": "Lisa",
      "email": "lisa@simpsons.com",
      "userId": "1",
      "contactId": "7",
      "mobile": "3265111", 
    });

    await Movement.create({
			"userId"       : '1',
			"accountId"    : '2',
			"name"         : 'Cualquier',
			"type"         : 'envio',
			"movementType" : 'Transferencia',
			"currency"     : 'pesos',
			"description"  : 'Comprate algo lindo',
			"amount"       : '500',
			"contactId"    : '2'
		});

    await Movement.create({
			"userId"       : '1',
			"accountId"    : '1',
			"name"         : 'Aysa',
			"type"         : 'envio',
			"movementType" : 'Pago',
			"currency"     : 'pesos',
			"description"  : 'Factura N° 4-456151',
			"amount"       : '324',
			"contactId"    : '0'
		});

    await Movement.create({
			"userId"       : '1',
			"accountId"    : '2',
			"name"         : 'Transferencia a Apu',
			"type"         : 'envio',
			"movementType" : 'Transferencia',
			"currency"     : 'pesos',
			"description"  : 'Lo que te debía.',
			"amount"       : '230',
			"contactId"    : '3'
		});

    await Movement.create({
			"userId"       : '1',
			"accountId"    : '2',
			"name"         : 'Carga en RapiPago',
			"type"         : 'recibo',
			"movementType" : 'Carga',
			"currency"     : 'dolares',
			"description"  : 'Recarga de saldo',
			"amount"       : '1500',
			"contactId"    : '0'
		});

    await Movement.create({
			"userId"       : '1',
			"accountId"    : '2',
			"name"         : 'Transferencia de Apu',
			"type"         : 'recibo',
			"movementType" : 'Transferencia',
			"currency"     : 'dolares',
			"description"  : 'Recarga de saldo',
			"amount"       : '350',
			"contactId"    : '0'
		});


    await User.create({
      "email": "dailytinkerer@gmail.com",
      "password": "Qwerty123",
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
      "contactId": "1",
      "mobile": "3216548", 
    });

    await Contact.create({
      "alias": "Apu",
      "email": "apu@nahasa.com",
      "userId": "2",
      "contactId": "3",
      "mobile": "3265748", 
    });

    await Movement.create({
			//Crea el movimiento del que recibe.
			userId       : '2',
			accountId    : '4',
			name         : 'Cualquier',
			type         : 'envio',
			movementType : 'Transferencia',
			currency     : 'pesos',
			description  : 'Comprate algo lindo',
			amount       : '500',
			contactId    : '1'
		});

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
      "contactId": "1", 
      "mobile": "3216548"
    });

    await Movement.create({
			"userId"       : '3',
			"accountId"    : '5',
			"name"         : 'Transferencia a Apu',
			"type"         : 'recibo',
			"movementType" : 'Transferencia',
			"currency"     : 'pesos',
			"description"  : 'Lo que te debía.',
			"amount"       : '230',
			"contactId"    : '1'
		});

    await User.create({
      "email": "bart@simpsons.com",
      "password": "1234",
      "typeDNI": "dni",
      "DNI": "12334564",
      "firstName": "Bart",
      "lastName": "Simpsons",
      "birthdate": "1987-03-28",
      "mobile": "3265444",
      "street": "Av siempreviva",
      "streetNumber": "1234",
      "city": "Springfield",
      "province": "Masachusets",
      "Country": "USA",
      "photoURL": ""
    });

    await User.create({
      "email": "marge@bouvier.com",
      "password": "1234",
      "typeDNI": "dni",
      "DNI": "3456487",
      "firstName": "Marge",
      "lastName": "Bouvier",
      "birthdate": "1958-03-28",
      "mobile": "3265874",
      "street": "Av siempreviva",
      "streetNumber": "1234",
      "city": "Springfield",
      "province": "Masachusets",
      "Country": "USA",
      "photoURL": ""
    });

    await User.create({
      "email": "homero@simpsons.com",
      "password": "1234",
      "typeDNI": "dni",
      "DNI": "15687425",
      "firstName": "Homero",
      "lastName": "Simpsons",
      "birthdate": "1958-03-28",
      "mobile": "3265654",
      "street": "Av siempreviva",
      "streetNumber": "1234",
      "city": "Springfield",
      "province": "Masachusets",
      "Country": "USA",
      "photoURL": ""
    });

    await User.create({
      "email": "lisa@simpsons.com",
      "password": "1234",
      "typeDNI": "dni",
      "DNI": "226874235",
      "firstName": "Lisa",
      "lastName": "Simpsons",
      "birthdate": "1990-11-28",
      "mobile": "3265111",
      "street": "Av siempreviva",
      "streetNumber": "1234",
      "city": "Springfield",
      "province": "Masachusets",
      "Country": "USA",
      "photoURL": ""
    });


  });
});

