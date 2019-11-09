require('dotenv').config();

const { appConfig, dbConfig } = require('./src/config/config');

const mongoose = require('mongoose'); // Importa el paquete mongoose
const app = require('./src/app'); // Trae express

// Conexion a la base de datos
let connectDB = (db) => {

    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {

        if (err) {
            return console.log(`Error al conectarse a la base de datos: ${err}`);
        }
        console.log('Base de datos ONLINE');

        // Ejecuta el servidor
        let connectServer = (port) => app.listen(port, () => console.log(`Servidor Corriendo en el puerto: ${port}`));
        connectServer(appConfig.port);

    });
}
connectDB(dbConfig.urlDB);