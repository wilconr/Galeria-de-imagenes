const { Router } = require('express'); // Importa el enrutador de express
const router = Router();

router.use(require('./home'));
router.use(require('./image'));

module.exports = router;