const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connection = require('./db/config');
// const publicRouter = require('./routes/public/publicRouter');
const router = require('./routes/routes');
app.use(cors());
dotenv.config();

app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
    res.send("hello world");
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port http://localhost:${process.env.PORT}`);
});
