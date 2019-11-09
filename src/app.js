const express = require('express'); // Importa el paquete express
const morgan = require('morgan'); // Importa el paquete morgan
const multer = require('multer'); // Importa el paquete multer
const path = require('path'); // Importa el paquete path
const exp_hbs = require('express-handlebars'); // Importa el paquete express-handlenars


// Inicializaciones
const app = express();

// Configuraciones handlebars
app.set('views', path.join(__dirname, 'views')); // Ruta de la carpeta vistas
app.engine('.hbs', exp_hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuraciones Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('image'));

// Rutas
app.use(require('./routes/index')); // Configuración global de rutas

module.exports = app;