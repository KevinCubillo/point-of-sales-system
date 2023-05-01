//imports
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
//------------------------------------------------

//Configuración
app.set("port",process.env.PORT || 3000);
//------------------------------------------------

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//------------------------------------------------

//Routas utilizadas
app.use(require("./routes/inventory"));
//------------------------------------------------

//Export
module.exports = app;
