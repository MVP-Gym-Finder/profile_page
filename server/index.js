const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const port = 8000;
const expressGraphQL = require('express-graphql');
const Schema = require('./schema.js');
const fileUpload = require('./fileUpload.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/upload', fileUpload);
app.use('/ct/graphql', expressGraphQL({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`\u001b[1;34mMVP Server listening on port ${port}\u001B[37m`));
