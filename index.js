const express = require('express');
const morgan = require('morgan');
const port = 3000;

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Successfully connected to server',
    data: null
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
