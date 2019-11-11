const config = {
    appConfig: {
        port: process.env.PORT, // Puerto del servidor
        expirationToken: process.env.CADUCIDAD_TOKEN, // Vencimiento del Token
        seed: process.env.SEED // SEED de autenticación
    },
    dbConfig: {
        urlDB: process.env.MONGO_URI // Url base de datos
    }
}

module.exports = config;