const { Router } = require('express');
const imageRoutes = require('./image.routes');

const router = Router();

router.use('/images', imageRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Successfully connected to server',
    data: null
  });
});

module.exports = router;
