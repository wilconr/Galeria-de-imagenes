// -------Entorno------------

process.env.NODE_ENV = process.env.NODE_ENV || process.env.DEV_ENV;

// -------Base de datos------------

let urlDB;
if (process.env.NODE_ENV === process.env.DEV_ENV) {
    urlDB = process.env.URLDB;
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// -------Vencimiento del Token------------

process.env.CADUCIDAD_TOKEN;

// -------SEED de autenticación------------

process.env.SEED;



const config = {
    appConfig: {
        port: process.env.PORT
    },
    dbConfig: {
        urlDB
    }
}

module.exports = config;