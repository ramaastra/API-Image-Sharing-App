const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const handler = require('./handler');
const port = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'));

app.use('/api/v1', router);
app.use(handler.serverError);
app.use(handler.clientError);

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'API is available at /api/v1',
    data: null
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
