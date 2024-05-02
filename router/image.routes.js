const { Router } = require('express');
const { getAll, create } = require('../controllers/image.controller');
const upload = require('../middlewares/upload');

const router = Router();

router.get('/', getAll);
router.post('/', upload.single('file'), create);

module.exports = router;
