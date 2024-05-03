const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const port = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'));

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'API is available at /api/v1',
    data: null
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: err.message,
    data: null
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `${req.method} ${req.url} is not available`,
    data: null
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
