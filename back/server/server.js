require('dotenv').config();
const express = require('express');
const apiRouter = require('./routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', apiRouter);


app.listen(process.env.PORT || '9000', () => {
    console.log(`server is running on port: ${process.env.PORT || '9000'}`);
});