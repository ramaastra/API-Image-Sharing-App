const { Router } = require('express');
const {
  getAll,
  getById,
  create,
  update,
  deleteRecord
} = require('../controllers/image.controller');
const upload = require('../middlewares/upload');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', upload.single('file'), create);
router.patch('/:id', upload.single('file'), update);
router.delete('/:id', upload.single('file'), deleteRecord);

module.exports = router;
