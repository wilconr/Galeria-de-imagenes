const { Router } = require('express'); // Importa el enrutador de express
const router = Router();
const imageController = require('../controllers/image'); // Importa el controlador del image

router.get('/image', imageController.getImageAdd);
router.post('/image', imageController.postImageAdd);
router.get('/image/:photo_id', imageController.deleteImage);

module.exports = router;