const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');


const app = express();

//Data Base Connection
// const DBconnection = require('./config/db');
// DBconnection();

// db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR", err));



//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.enable("trust proxy");

//Routes autoloading
readdirSync('./routes').map((r) => app.use("/api", require("./routes/" + r)));

//Application start
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is listened on port ${port}`);
});