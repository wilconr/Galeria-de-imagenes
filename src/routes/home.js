const { Router } = require('express'); // Importa el enrutador de express
const router = Router();
const homeController = require('../controllers/home'); // Importa el controlador del home

router.get('/', homeController.getImages);

module.exports = router;