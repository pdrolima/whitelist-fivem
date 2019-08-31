const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router/routes');

const app = express()
app.disable('x-powered-by');

app.use(bodyParser.json());

app.use(cors())
app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API Server listening on ${port}`)
});